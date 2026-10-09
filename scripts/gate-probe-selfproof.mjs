/**
 * §94 — is the falsifiability probe itself falsifiable?
 *
 * §93's rule applied to the auditor: a checker that cannot report a bad result
 * is §70's vacuous pass. This copies the probe, NEUTERS cases in the copy, and
 * asserts the copy reports them and exits non-zero. The real probe is never
 * modified — the copy is written to %TEMP% and run with cwd = the repo.
 */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const SRC = join(ROOT, "scripts/gate-falsifiability-probe.mjs");
const original = readFileSync(SRC, "utf8");

/* §99 — this file was SILENTLY RED for three phases and nothing said so.
 *
 * The second mutation below used to pin a live count: it rewrote the probe's
 * `from: "All **forty-two** are dependency-free",`. That is the docs-claims-drift
 * case's anchor, and the count moves every time a gate is wired. It broke at
 * 42 -> 43 -> 45 and this file went red on the first break — but it is not in
 * `test:unit` (§95: each case runs a whole probe, so minutes each), so nothing
 * reported it. §95's pattern exactly: a check that existed, and was never run.
 *
 * The fix is structural rather than another re-typed number, but it took a
 * second pass to get right. §99 made the probe importable, so this file first
 * READ the anchor from `CASES` and then tried to string-replace that literal in
 * the probe's source — which no longer contains it, because §99.8 changed the
 * probe to derive the clause at runtime (`from: DOCS_COUNT_CLAUSE,`). The
 * self-proof went red on its own fix: the value is real, the literal is not.
 *
 * So the mutation targets the STRUCTURE instead — the variable reference, whose
 * name does not change when the count does. */
const { CASES } = await import(pathToFileURL(SRC).href);
const driftCase = CASES.find((c) => c.gate === "scripts/docs-claims-drift.mjs");
if (!driftCase) throw new Error("no docs-claims-drift case to mutate — the probe's shape changed");

const MUTATIONS = [
  {
    label: "a case whose mutation does not change the file (from === to)",
    find: 'from: "let score = 70;", to: "let score = 0;", ts: true,',
    repl: 'from: "let score = 70;", to: "let score = 70;", ts: true,',
    expect: /not proven|inconclusive/,
  },
  {
    label: "a case aimed at an anchor that does not exist",
    find: "from: DOCS_COUNT_CLAUSE,",
    repl: 'from: DOCS_COUNT_CLAUSE + "-zzz-absent",',
    expect: /anchor not found/,
  },
  {
    label: "a case aimed at a file that is not in the sandbox",
    find: 'file: "lib/email/outcome.ts",',
    repl: 'file: "lib/email/zzz-not-mirrored.ts",',
    expect: /not present in sandbox/,
  },
];

let bad = 0;
let checks = 0;
for (const m of MUTATIONS) {
  checks++;
  if (!original.includes(m.find)) {
    console.log(`  SKIP  ${m.label}\n          anchor for the MUTATION itself not found: ${m.find.slice(0, 60)}`);
    bad++;
    continue;
  }
  const copy = join(tmpdir(), `bits-probe-selfproof-${bad}.mjs`);
  writeFileSync(copy, original.replace(m.find, m.repl), "utf8");
  const r = spawnSync("node", [copy], { cwd: ROOT, encoding: "utf8" });
  const out = ((r.stdout || "") + (r.stderr || "")).trim();

  const reported = m.expect.test(out);
  const nonZero = r.status !== 0;
  const coverageShrunk = /UNKNOWN, never observed to fail\s+[1-9]/.test(out);

  console.log(`  ${reported && nonZero ? "OK  " : "MISS"}  ${m.label}`);
  console.log(`          reported the bad case : ${reported ? "yes" : "NO"}`);
  console.log(`          exited non-zero        : ${nonZero ? "yes" : "NO"}`);
  console.log(`          coverage shrank to >0  : ${coverageShrunk ? "yes" : "no"}`);
  const summary = out.split("\n").filter((l) => /falsifiability:|UNKNOWN|✖ falsifiability/.test(l));
  for (const l of summary) console.log("          | " + l.trim());
  rmSync(copy, { force: true });

  if (!(reported && nonZero && coverageShrunk)) bad++;
}

console.log(
  bad === 0
    ? "\n✔ the probe reports a case it cannot prove, exits non-zero, and stops claiming coverage for it."
    : `\n✖ ${bad} self-proof(s) failed — the probe may be reporting success while measuring nothing.`
);

/* ── §99 — the junction guard, which source mutation cannot prove ────────────
 *
 * A probe that cannot fail is §70's vacuous pass, and the sandbox's
 * node_modules junction is the one guard that was INVISIBLE to the mutation
 * loop above: Windows creates a junction to a non-existent target without
 * complaint, so `buildSandbox()`'s `catch` could not fire for the failure it was
 * written to detect. The sandbox dangled, gates importing zod/motion failed to
 * load, and the probe reported nothing. That survived seven phases because the
 * code reads correctly and the platform does not behave like the reading.
 *
 * It cannot be proved by editing source: removing the check makes the probe
 * SILENT, so a mutation asserting "the message appears" would fail for the right
 * reason and teach nothing. What has to be reproduced is the ENVIRONMENT.
 *
 * `ROOT` is `process.cwd()`, so a directory holding a package.json but no
 * node_modules is the failure exactly. Note the exit code is NOT the evidence
 * there — an empty sandbox leaves all 34 gates unwitnessed and the probe exits
 * non-zero either way. The message is the evidence, and the control below is
 * what gives it meaning. */
{
  const { mkdtempSync, cpSync } = await import("node:fs");
  /* Deliberately NOT named "…junction…": the first version of this control
   * matched on /junction/i and the blinded copy still "passed", because the
   * probe file's own path contains the word. A control that cannot distinguish
   * the two outcomes is decoration — it proved the temp path, not the guard.
   * The regex below is the guard's exact message for the same reason. */
  const broken = mkdtempSync(join(tmpdir(), "bits-sbx-selfproof-"));
  cpSync(join(ROOT, "package.json"), join(broken, "package.json"));

  const GUARD_RE = /sandbox node_modules junction FAILED/;
  const reportsJunction = (src) => {
    const copy = join(broken, "probe.mjs");
    writeFileSync(copy, src, "utf8");
    const r = spawnSync("node", [copy], { cwd: broken, encoding: "utf8", timeout: 120000 });
    return GUARD_RE.test(((r.stdout || "") + (r.stderr || "")));
  };

  /* Positive: the shipped guard must notice a dangling junction. */
  checks++;
  const sawIt = reportsJunction(original);
  console.log(`  ${sawIt ? "OK  " : "MISS"}  a sandbox with no node_modules is reported as a broken junction`);
  console.log(`          the probe named the junction failure: ${sawIt ? "yes" : "NO"}`);
  if (!sawIt) bad++;

  /* Control: with `statSync` removed, the same environment must go SILENT. If it
   * still reported, the guard would be doing nothing and the positive above
   * would prove nothing either.
   *
   * It is only meaningful if the positive above actually fired. Without this
   * guard the control passed VACUOUSLY once already: both copies crashed on
   * import for an unrelated reason, so "the blinded copy was silent" was true
   * and meant nothing. A control that cannot distinguish the outcomes is
   * decoration — it reported success while measuring nothing. */
  const FIND = '    statSync(join(SANDBOX, "node_modules"));';
  checks++;
  if (!sawIt) {
    console.log(`  MISS  CONTROL — INVALID: the guard did not fire above, so "the blinded copy is`);
    console.log(`          silent" would be vacuously true and proves nothing.`);
    bad++;
  } else if (!original.includes(FIND)) {
    console.log(`  MISS  CONTROL — the junction guard's own source line not found: ${FIND}`);
    bad++;
  } else {
    const blinded = original.replace(FIND, "    /* §99 selfproof: guard blinded */");
    const wentSilent = !reportsJunction(blinded);
    console.log(`  ${wentSilent ? "OK  " : "MISS"}  CONTROL — blinding that guard makes the same failure silent`);
    console.log(`          blinded copy reported nothing: ${wentSilent ? "yes" : "NO"}`);
    if (!wentSilent) bad++;
  }
  rmSync(broken, { recursive: true, force: true });
}

console.log(
  bad === 0
    ? `\n✔ ${checks}/${checks} self-proofs — including the junction guard, which source mutation cannot reach.`
    : `\n✖ ${bad} of ${checks} self-proof(s) failed — the probe may be reporting success while measuring nothing.`,
);
process.exit(bad === 0 ? 0 : 1);