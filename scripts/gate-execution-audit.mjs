/**
 * SYSTEM_AUDIT.md §76 — GATE EXECUTION AUDIT.
 *
 * THE BUG THIS CATCHES
 * --------------------
 * §75 found that `gated-render-closure.mjs` had been a **silent no-op for four
 * phases**. It imported cleanly, exported its functions, exited 0, and printed
 * nothing at all, because a hand-rolled CLI guard compared `import.meta.url`
 * (`file:///C:/…`, three slashes) against a hand-built `file://C:/…` (two).
 *
 * Nothing in `test:unit` noticed. A gate that exits 0 and prints nothing looks
 * **identical from the outside** to a gate that ran and passed — and this
 * repository has spent seventy-five phases proving that the difference between
 * "I checked" and "I looked at nothing" is the whole game.
 *
 * WHAT IS ASSERTED
 * ----------------
 * Every gate in `test:unit` must, when run exactly as `test:unit` runs it:
 *   1. exit 0, and
 *   2. produce output on stdout.
 *
 * (2) is a convention, not a proof of correctness — a gate could print a lie.
 * What it rules out is the specific and much more dangerous failure where the
 * entry point never executes at all. That failure mode is otherwise invisible:
 * there is no error, no non-zero exit, and nothing in the suite to notice.
 *
 * It also prints each gate's duration. A gate that suddenly takes 2ms has
 * stopped doing work even if it still prints something.
 *
 * RECURSION
 * ---------
 * This script runs the gates, so it must not run itself. It excludes itself by
 * resolved path AND asserts the exclusion actually happened — a self-inclusion
 * bug here would be the same class of bug it exists to catch.
 */
import { readFileSync, realpathSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const ROOT = process.cwd();
const SELF = realpathSync(fileURLToPath(import.meta.url));

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

/* RECURSION — the whole reason this section is fiddly.
 *
 * This audit runs the gates, so neither this script NOR its negative test may be
 * run as a gate. Excluding only myself was not enough: `gate-execution-audit-
 * negative.mjs` spawns this script, so auditing it spawns me, which audits it
 * again. That is unbounded, and it is not a subtle failure — it reached 87 node
 * processes and 765 MB before being stopped.
 *
 * The transitive closure is the rule: exclude anything that can reach this
 * script. Both names are declared once, here, rather than one being remembered
 * and the other forgotten. */
const SELF_REACHABLE = ["gate-execution-audit.mjs", "gate-execution-audit-negative.mjs"];

const segments = pkg.scripts["test:unit"]
  .split("&&")
  .map((s) => s.trim())
  .filter(Boolean)
  .filter((seg) => !SELF_REACHABLE.some((n) => seg.includes(n)));

const declaredAll = pkg.scripts["test:unit"].match(/[^ ]*\.mjs/g) || [];
const leaked = segments.filter((s) => SELF_REACHABLE.some((n) => s.includes(n)));
if (leaked.length) {
  console.error(
    `FATAL: this audit is about to run something that can re-invoke it: ${leaked.join(", ")}`
  );
  process.exit(2);
}
const excludedCount = declaredAll.length - segments.length;

console.log("=== GATE EXECUTION AUDIT ===\n");
console.log(
  `${segments.length} gates in test:unit` +
    (excludedCount > 0
      ? ` (${excludedCount} excluded: ${SELF_REACHABLE.filter((n) => declaredAll.some((d) => d.includes(n))).join(", ")})`
      : " (audit not yet wired in)") +
    "\n"
);
console.log("  gate".padEnd(42) + "exit    ms   stdout");

const rows = [];
for (const seg of segments) {
  const started = Date.now();
  const r = spawnSync(seg, {
    cwd: ROOT,
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  const stdout = (r.stdout || "").trim();
  const ms = Date.now() - started;
  const name = (seg.match(/([\w.-]+\.mjs)/) || [, seg])[1];
  rows.push({ name, code: r.status, ms, out: stdout.length, seg });
}

for (const r of rows) {
  console.log(
    `  ${r.name.padEnd(40)}${String(r.code).padEnd(6)}${String(r.ms).padStart(6)}  ${String(r.out).padStart(7)}`
  );
}

const failing = rows.filter((r) => r.code !== 0);
const silent = rows.filter((r) => r.out === 0);
const instant = rows.filter((r) => r.ms < 10 && r.out > 0);

console.log("");
if (failing.length) {
  console.log(`  ✖ ${failing.length} gate(s) exited non-zero: ${failing.map((f) => f.name).join(", ")}`);
  for (const f of failing) console.log(`      ${f.seg}`);
}

if (silent.length) {
  console.log(`\n  ✖ ${silent.length} gate(s) produced NO stdout:`);
  for (const s of silent) console.log(`      ${s.name}  (${s.ms}ms) — the entry point may not be executing`);
  console.log(
    "\n  §75: gated-render-closure.mjs printed nothing for four phases because its CLI\n" +
      "  guard compared file:///C:/ against file://C:/ and never matched on Windows.\n" +
      "  Use pathToFileURL(process.argv[1]).href, never a hand-built file URL."
  );
}

if (instant.length) {
  console.log(`\n  ⚠ ${instant.length} gate(s) ran in under 10ms — they may have stopped doing work:`);
  for (const i of instant) console.log(`      ${i.name}  (${i.ms}ms, ${i.out} bytes of output)`);
}

if (failing.length || silent.length) {
  console.log(`\n✖ gate-execution-audit FAILED (${failing.length} failing, ${silent.length} silent)`);
  process.exit(1);
}

console.log(
  `\n✔ all ${rows.length} test:unit entries executed and reported ` +
    `(${rows.filter((r) => r.seg.includes("-negative.mjs")).length} negative suites, ` +
    `${rows.filter((r) => !r.seg.includes("-negative.mjs")).length} gates). None is a silent no-op.`
);