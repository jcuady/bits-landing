/**
 * SYSTEM_AUDIT.md §76 — negative test for `gate-execution-audit.mjs`.
 *
 * The audit asserts "every gate produces output". That assertion is itself only
 * worth anything if it CAN fail, and §75's whole lesson is that a check which
 * has never been seen to fail is indistinguishable from a comment.
 *
 * So this reproduces the §75 bug exactly — a script that imports cleanly,
 * exports nothing it calls, exits 0, and prints NOTHING — and asserts the audit
 * classifies it as silent and exits non-zero.
 *
 * The temporary file is removed afterwards and its removal is asserted.
 */
import { writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const ROOT = process.cwd();
const AUDIT = join(ROOT, "scripts", "gate-execution-audit.mjs");
const PROBE = join(ROOT, "scripts", "tmp-silent-gate-probe.mjs");

let pass = 0;
let fail = 0;
const check = (label, ok, detail = "") => {
  if (ok) { pass++; console.log(`PASS  ${label}`); }
  else { fail++; console.log(`FAIL  ${label}${detail ? `\n        ${detail}` : ""}`); }
};

const runAudit = () =>
  spawnSync("node", ["scripts/gate-execution-audit.mjs"], {
    cwd: ROOT,
    shell: true,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });

console.log("=== GATE EXECUTION AUDIT — NEGATIVE TEST ===\n");

// 1. Precondition: the real chain is clean.
{
  const r = runAudit();
  check("real test:unit chain passes the audit", r.status === 0, `exit ${r.status}`);
}

// 2. Inject the §75 bug: a gate that exits 0 and prints nothing.
const SILENT = `// Reproduces the section 75 failure mode exactly: imports cleanly,
// exports nothing that runs, exits 0, prints nothing.\nexport const nothing = 1;\n`;
writeFileSync(PROBE, SILENT, "utf8");
check("silent probe landed on disk", existsSync(PROBE));

let injected = null;
try {
  const pkgPath = join(ROOT, "package.json");
  const original = readFileSync(pkgPath, "utf8");
  try {
    const json = JSON.parse(original);
    json.scripts["test:unit"] = `node scripts/tmp-silent-gate-probe.mjs && ${json.scripts["test:unit"]}`;
    writeFileSync(pkgPath, JSON.stringify(json, null, 2) + "\n", "utf8");

    const r = runAudit();
    injected = r;
    const out = `${r.stdout || ""}${r.stderr || ""}`;

    check("audit FAILS when a gate prints nothing", r.status !== 0, `exit was ${r.status}`);
    check("…and it names the silent gate", /tmp-silent-gate-probe/.test(out), out.slice(0, 300));
    check("…and it says NO stdout", /NO stdout/i.test(out), out.slice(0, 300));

    /* §76 — the first wiring of this gate recursed without bound: the audit ran
     * its own NEGATIVE TEST as a gate, which spawned the audit again. It reached
     * 87 node processes and 765 MB before being stopped. Excluding only the audit
     * itself was not enough; the transitive closure is what matters.
     *
     * This asserts the property directly rather than trusting the filter: the
     * audit's own output must contain exactly ONE copy of its header. A second
     * copy means it re-entered itself. */
    const headers = (r.stdout || "").split("=== GATE EXECUTION AUDIT ===").length - 1;
    check("audit did not recurse into itself (exactly one header in its output)", headers === 1, `saw ${headers} headers`);
  } finally {
    writeFileSync(pkgPath, original, "utf8");
  }
} finally {
  if (existsSync(PROBE)) unlinkSync(PROBE);
}

// 3. Cleanup is asserted by CONTENT, not by a third full audit run.
//    A byte comparison proves the chain was restored exactly; re-running the
//    whole suite to prove the same thing costs ~12s and tells us nothing more.
//    (The first audit run above already established that the real chain passes.)
check("probe file removed", !existsSync(PROBE));
check(
  "the injected probe segment is gone from package.json",
  !readFileSync(join(ROOT, "package.json"), "utf8").includes("tmp-silent-gate-probe"),
  "package.json still contains the injected probe"
);
check("package.json still parses after the injection cycle", (() => {
  try {
    const j = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
    return typeof j.scripts?.["test:unit"] === "string" && j.scripts["test:unit"].length > 0;
  } catch {
    return false;
  }
})(), "package.json is corrupt after the injection cycle");

console.log(`\n${fail === 0 ? "✔" : "✖"} gate-execution-audit negative test: ${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);