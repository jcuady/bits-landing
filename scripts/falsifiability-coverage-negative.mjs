/**
 * §99 — is `falsifiability-coverage.mjs` able to report a bad result?
 *
 *   Run:  node scripts/falsifiability-coverage-negative.mjs
 *
 * §93's rule applied to the auditor: a checker that cannot fail is §70's vacuous
 * pass. This builds SYNTHETIC trees in %TEMP% and runs the real gate against them
 * with `BITS_ROOT` / `BITS_CASES` pointing at the fixtures — §98's pattern, and
 * for §98's reason: a negative test that edits a tracked `package.json` is a
 * write window. Nothing in this repository is modified.
 *
 * The cases are synthetic MUTATIONS injected into a fixture, never the shipped
 * case table read back. A negative test whose fixture is the bug it exists to
 * catch dies the day the bug is fixed.
 */
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const GATE = join(ROOT, "scripts/falsifiability-coverage.mjs");

/* The real probe, imported rather than re-typed: the gate under test reads the
 * same array, and a fixture that disagreed with it would test a fiction. */
const { CASES } = await import(
  pathToFileURL(join(ROOT, "scripts", "gate-falsifiability-probe.mjs")).href
);

/* One real gate name and one real negative-suite name are enough to make a
 * fixture tree look real. */
const { CASES: REAL_GATE_CASES } = await import(
  pathToFileURL(join(ROOT, "scripts", "gate-falsifiability-probe.mjs")).href
);
const { CASES: REAL_SUITE_CASES } = await import(
  pathToFileURL(join(ROOT, "scripts", "negative-suite-falsifiability.mjs")).href
);
const REAL_GATE = REAL_GATE_CASES[0].gate;
const REAL_SUITE = REAL_SUITE_CASES[0].suite;

function makeTree({ testUnit, cases, suiteCases = [SUITE_CASE(REAL_SUITE)] }) {
  const dir = mkdtempSync(join(tmpdir(), "bits-falsifiability-cov-"));
  writeFileSync(
    join(dir, "package.json"),
    JSON.stringify({ name: "fixture", scripts: { "test:unit": testUnit } }, null, 2),
    "utf8",
  );
  const casesPath = join(dir, "cases.mjs");
  writeFileSync(casesPath, `export const CASES = ${JSON.stringify(cases, null, 2)};\n`, "utf8");
  const suiteCasesPath = join(dir, "suite-cases.mjs");
  writeFileSync(suiteCasesPath, `export const CASES = ${JSON.stringify(suiteCases, null, 2)};\n`, "utf8");
  return { dir, casesPath, suiteCasesPath };
}

function run(tree) {
  const r = spawnSync("node", [GATE], {
    cwd: ROOT,
    encoding: "utf8",
    env: {
      ...process.env,
      BITS_ROOT: tree.dir,
      BITS_CASES: tree.casesPath,
      BITS_SUITE_CASES: tree.suiteCasesPath,
    },
  });
  return { code: r.status, out: ((r.stdout || "") + (r.stderr || "")) };
}

const CASE = (gate, extra = {}) => ({ gate, rule: `fixture rule for ${gate}`, file: "a.js", from: "a", to: "b", ...extra });
const SUITE_CASE = (suite, extra = {}) => ({ suite, rule: `fixture rule for ${suite}`, file: "a.js", from: "a", to: "b", ...extra });

let pass = 0;
let fail = 0;

function check(label, tree, expect) {
  const { code, out } = run(tree);
  const ok = code !== 0 && expect.test(out);
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${label}`);
  console.log(`          exit ${code}; matched ${expect}: ${expect.test(out) ? "yes" : "NO"}`);
  const line = out.split("\n").filter((l) => /✖|VACUOUS|not in test:unit|no falsifiability witness|cannot run/.test(l));
  for (const l of line.slice(0, 3)) console.log(`          | ${l.trim().slice(0, 120)}`);
  rmSync(tree.dir, { recursive: true, force: true });
  if (ok) pass++;
  else fail++;
}

console.log("=== falsifiability-coverage NEGATIVE (§99/§100) ===\n");

/* CONTROL 1 — the fixtures are well-formed. Every other case below asserts the
 * gate fails; without this one, a gate that failed on EVERY input would pass all
 * of them and this suite would be worth nothing. §98's rule: a control that
 * proves the rule does NOT fire is load-bearing. */
/* Every fixture's `test:unit` contains BOTH a real gate and the real negative
 * suite. §100 added the negative-side directions, and a fixture listing only a
 * gate would now trip the new "witness names a suite that is NOT in test:unit"
 * rule on every single case — which is a correct complaint about a fixture, not
 * a failure, but it would drown the real ones. */
const BASE = `${REAL_GATE} && ${REAL_SUITE}`;
{
  const tree = makeTree({ testUnit: BASE, cases: [CASE(REAL_GATE)] });
  const { code, out } = run(tree);
  const ok = code === 0 && /falsifiability-coverage: OK/.test(out);
  console.log(`  ${ok ? "PASS" : "FAIL"}  CONTROL — a fully covered tree passes`);
  console.log(`          exit ${code} (want 0); printed OK: ${/falsifiability-coverage: OK/.test(out) ? "yes" : "NO"}`);
  rmSync(tree.dir, { recursive: true, force: true });
  if (ok) pass++; else fail++;
}

/* 1 — a gate in the suite with no witness. The core rule. */
check(
  "a gate in test:unit with no falsifiability witness",
  makeTree({ testUnit: `${BASE} && scripts/brand-new-gate.mjs`, cases: [CASE(REAL_GATE)] }),
  /no falsifiability witness[\s\S]*brand-new-gate/,
);

/* 2 — §95's shape, one level up: a witness for a gate that no longer runs.
 * A one-way check would call this 100% covered while proving a dead file. */
check(
  "a witness case naming a gate that is NOT in test:unit",
  makeTree({ testUnit: BASE, cases: [CASE(REAL_GATE), CASE("scripts/deleted-gate.mjs")] }),
  /NOT in test:unit[\s\S]*deleted-gate/,
);

/* 3 — a case that cannot run, wearing a gate's name. */
check(
  "a witness case with no file/from/to triple",
  makeTree({ testUnit: BASE, cases: [{ gate: REAL_GATE, rule: "no target at all" }] }),
  /cannot run/,
);

/* 4 — §98's defect again: a gate reading an empty list must refuse to report a
 * pass. Without this the gate would print "0/0" and exit 0 on a `test:unit` that
 * had lost every entry. */
check(
  "a test:unit with no gate entries at all is refused, not passed",
  makeTree({ testUnit: "echo nothing-here", cases: [CASE(REAL_GATE)] }),
  /VACUOUS/,
);

/* CONTROL 2 — `to: ""` is a legal delete-mutation, and the real a11y case uses
 * it. A truthiness check would report that correct case as malformed, so the
 * gate would fail on the real repository while this file reported success. */
{
  const deleteCase = CASE("lib/security/a11y-static.selfcheck.mjs", { to: "" });
  const tree = makeTree({
    testUnit: `${deleteCase.gate} && ${REAL_SUITE}`,
    cases: [deleteCase],
    suiteCases: [SUITE_CASE(REAL_SUITE)],
  });
  const { code, out } = run(tree);
  const ok = code === 0 && !/cannot run/.test(out);
  console.log(`  ${ok ? "PASS" : "FAIL"}  CONTROL — to: "" is a valid delete-mutation, not a malformed case`);
  console.log(`          exit ${code} (want 0); wrongly flagged malformed: ${/cannot run/.test(out) ? "YES" : "no"}`);
  rmSync(tree.dir, { recursive: true, force: true });
  if (ok) pass++; else fail++;
}

/* ── §100 — the negative-suite directions ──────────────────────────────────
 *
 * The whole reason this gate exists for gates was §95's shape: a check nobody
 * ran. The same gap was open for the negative tests, and measurement found two
 * of them sitting in it. These three cases exist so the new directions cannot
 * be quietly removed. */
check(
  "a negative suite in test:unit with no falsifiability witness",
  makeTree({
    testUnit: `${REAL_GATE} && scripts/brand-new-negative.mjs`,
    cases: [CASE(REAL_GATE)],
    suiteCases: [SUITE_CASE(REAL_SUITE)],
  }),
  /negative suite\(s\) in test:unit have no falsifiability witness[\s\S]*brand-new-negative/,
);

check(
  "a witness case naming a negative suite that is NOT in test:unit",
  makeTree({
    testUnit: BASE,
    cases: [CASE(REAL_GATE)],
    suiteCases: [SUITE_CASE(REAL_SUITE), SUITE_CASE("scripts/deleted-negative.mjs")],
  }),
  /negative suite that is NOT in test:unit[\s\S]*deleted-negative/,
);

check(
  "a negative-suite witness case with no file/from/to triple",
  makeTree({
    testUnit: BASE,
    cases: [CASE(REAL_GATE)],
    suiteCases: [{ suite: REAL_SUITE, rule: "nothing to blind" }],
  }),
  /negative-suite witness case\(s\) cannot run/,
);

console.log(
  fail === 0
    ? `\n✔ ${pass}/${pass + fail} — the gate fails on every drift direction, and passes on a clean tree.`
    : `\n✖ ${fail} of ${pass + fail} — the gate may be reporting success while measuring nothing.`,
);
process.exit(fail === 0 ? 0 : 1);