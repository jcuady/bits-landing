/**
 * §95 — which checks in this repository are NEVER RUN?
 *
 * `gate-execution-audit.mjs` asserts "every gate in test:unit exits 0 and prints
 * stdout". It is silent about a check that exists but was never wired in — and
 * an unwired negative suite is not a weak test, it is not a test. §75's failure
 * was a gate that did nothing; this is the adjacent shape, a test that is never
 * invoked at all.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const scriptBlob = JSON.stringify(pkg.scripts);

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.mjs$/.test(e.name)) out.push(relative(ROOT, p).replace(/\\/g, "/"));
  }
  return out;
}

const files = [...walk(join(ROOT, "scripts")), ...walk(join(ROOT, "lib"))];

/* A file is a CHECK if it is a selfcheck, a gate, or a negative suite — i.e. it
 * can be run directly and assert.
 *
 * The first version classified by PATH alone and reported `security-claims.mjs`
 * and `encoding.mjs` as unwired checks. They are libraries — imported by seven
 * gates, invoked by nothing, and correct to be invoked by nothing. Calling an
 * importable module "unwired" is the mirror of §92's error: it makes the report
 * wrong in the direction that produces noise, and a report that cries wolf is
 * turned off.
 *
 * So the classifier asks what the file DOES: a runnable check reports and exits.
 * Both libraries have neither. */
function isCheck(f) {
  const src = readFileSync(join(ROOT, f), "utf8");
  if (!/process\.exit|process\.exitCode/.test(src) && !/console\.log/.test(src)) return false;
  return (
    /\.selfcheck\.mjs$/.test(f) ||
    /-negative\.mjs$/.test(f) ||
    /^(?:lib|scripts)\/(?:site|security|products)\//.test(f) ||
    /guard-test\.mjs$/.test(f)
  );
}

const wired = [];
const unwired = [];
const unit = pkg.scripts["test:unit"];
/* §105 — the bucket that must not exist silently.
 *
 * `isCheck()` classifies by PATH SHAPE. That fixed §95's real problem (two
 * libraries reported as checks, which trains readers to ignore the report), but
 * it opened the opposite hole: a check whose filename does not match one of the
 * four shapes is not reported as UNWIRED — it is not reported AT ALL.
 *
 * `history-secret-scan.mjs` has been unwired since §39, exits 1 on every run, and
 * was invisible to this inventory for exactly that reason. An inventory that
 * silently omits entries is not an inventory; it is a report that happens to be
 * accurate about the subset it happened to look at.
 *
 * So the third bucket is explicit and counted: runnable (prints AND exits), not a
 * library, and not shape-matched. Whether each belongs in `test:unit` is an
 * ADJUDICATION — most are one-off utilities — but "we did not look" and "we
 * looked and it is fine" are different answers and must not print the same. */
const unclassified = [];
for (const f of files) {
  const src = readFileSync(join(ROOT, f), "utf8");
  const runnable = /process\.exit|process\.exitCode/.test(src) && /console\.log/.test(src);
  if (isCheck(f)) {
    (scriptBlob.includes(f.split("/").pop()) ? wired : unwired).push(f);
  } else if (runnable) {
    unclassified.push({ file: f, inTestUnit: unit.includes(f), anywhere: scriptBlob.includes(f.split("/").pop()) });
  }
}

const negatives = files.filter((f) => /-negative\.mjs$/.test(f));
const unwiredNegatives = negatives.filter((f) => unwired.includes(f));

/* §95 declared ONE check deliberately unwired, with a stated reason.
 *
 * `production-write-guard-negative.mjs` restored three defects in
 * `apply-schema.mjs`, `seed-supabase.mjs` and `test-marketing-automation.mjs` by
 * WRITING them in place. Wiring that into `test:unit` put three production
 * scripts inside the blast radius of an interrupted `&&` chain.
 *
 * §100 applied the §91 sandbox and the reason no longer holds: the suite now
 * copies `scripts/` and `lib/` into %TEMP% and mutates only the copy. The gate
 * under test needed no change at all — `production-write-guard-test.mjs` derives
 * ROOT from its own location, so the sandbox copy resolves ROOT to the sandbox.
 *
 * The declaration is kept rather than deleted, because it is now a REGRESSION
 * GUARD rather than a live exemption: an empty table means "every check that
 * exists is wired", and the next check added without a wire should be visible
 * here as UNDECLARED. §100's measurement — 0 filesystem events across a 70-second
 * suite run, with the watcher itself validated by a positive control — is what
 * justifies clearing it. */
const DELIBERATELY_UNWIRED = {};

console.log("=== UNWIRED CHECKS (§95) ===\n");
console.log(`  .mjs files under scripts/ + lib/      ${files.length}`);
console.log(`  of those, shaped as a check            ${wired.length + unwired.length}`);
console.log(`  referenced by ANY npm script           ${wired.length}`);
console.log(`  referenced by NO npm script            ${unwired.length}\n`);

/* §105 — printed unconditionally, including when empty. A bucket that only shows
 * up when it has contents is a bucket that looks identical to no bucket. */
const ucInUnit = unclassified.filter((e) => e.inTestUnit);
const ucElsewhere = unclassified.filter((e) => !e.inTestUnit && e.anywhere);
const ucNowhere = unclassified.filter((e) => !e.inTestUnit && !e.anywhere);
console.log(`  runnable but NOT shape-matched          ${unclassified.length}`);
console.log(`    already run in test:unit              ${ucInUnit.length}  (gate-execution-audit witnesses these)`);
console.log(`    run only on demand                    ${ucElsewhere.length}`);
console.log(`    invoked by no npm script              ${ucNowhere.length}\n`);
for (const e of unclassified) {
  const where = e.inTestUnit ? "in test:unit" : e.anywhere ? "on demand only" : "never wired";
  console.log(`      ${e.file}  (${where})`);
}
console.log(
  "\n  NOT a verdict. isCheck() classifies by path shape, so these were never counted\n" +
  "  as checks at all. Most are one-off utilities. `history-secret-scan.mjs` was in\n" +
  "  this list from §39 until §105: unwired, red on every run, and invisible here.\n",
);

const accidental = [];
for (const f of unwired.sort()) {
  if (DELIBERATELY_UNWIRED[f]) {
    console.log(`  UNWIRED (declared)  ${f}`);
    console.log(`      reason: ${DELIBERATELY_UNWIRED[f]}\n`);
  } else {
    accidental.push(f);
    console.log(`  UNWIRED             ${f}  (${statSync(join(ROOT, f)).size} bytes)`);
  }
}

console.log(`  negative suites total ${negatives.length}; unwired ${unwiredNegatives.length}`);
for (const f of unwiredNegatives.sort()) {
  console.log(`    - ${f}${DELIBERATELY_UNWIRED[f] ? "  (declared — see above)" : "  ← UNDECLARED"}`);
}
console.log(
  `\n  ${accidental.length} UNDECLARED unwired check(s).` +
    `${accidental.length === 0 ? "  Every check that exists is either run or has a stated reason." : ""}`
);

/* Which gates have a negative suite at all? A gate with no negative suite has
 * never been shown to fail by anything in this repository.
 *
 * The denominator is DERIVED from `test:unit`. §95 first printed "of 28" here
 * after §95 itself had changed the gate count to 31 — a hand-typed count that
 * went stale the moment it was written, which is §88's defect reproduced in the
 * very tool built to inventory checks. Same rule, same fix: compute it. */
const gateEntries = [...new Set(pkg.scripts["test:unit"].match(/[\w./-]+\.mjs/g) || [])];
const wiredGates = gateEntries.filter((g) => !/-negative\.mjs$/.test(g));
const negativeFor = (g) => {
  const base = g.replace(/^.*\//, "").replace(/\.selfcheck\.mjs$|\.mjs$/, "");
  return negatives.find((n) => n.includes(base));
};
const orphanGates = [...wiredGates].sort().filter((g) => !negativeFor(g));
console.log(`\n  gates in test:unit WITHOUT a negative suite:`);
for (const g of orphanGates) console.log(`    - ${g}`);
console.log(
  `  (${orphanGates.length} of ${wiredGates.length} gates have no dedicated negative suite; ` +
    `${wiredGates.length - orphanGates.length} do)`
);