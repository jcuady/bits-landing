/**
 * §99 — every gate in `test:unit` must have a falsifiability WITNESS.
 *
 *   Run:  node scripts/falsifiability-coverage.mjs
 *
 * THE GAP THIS CLOSES
 * -------------------
 * `gate-falsifiability-probe.mjs` proves every gate can fail. It is NOT in
 * `test:unit`, and cannot be: it copies the whole tree and invokes every gate
 * once more, which is minutes of work on every `npm run test:unit`. So the
 * probe's coverage number lived only in its own output, produced when a human
 * remembered to run it.
 *
 * That is the same shape as §95's `production-write-guard-test.mjs` — a check
 * that existed, passed, and was never run — one level up. A gate added on a
 * Friday afternoon would have shipped with nobody ever having tried to break it,
 * and nothing would have said so.
 *
 * So: the probe exports its case table, and this gate reads it. Same array, not
 * a second list that could disagree — §93's rule, and the reason this is a
 * twenty-line gate rather than a re-typed inventory.
 *
 * WHAT THIS GATE DOES NOT CLAIM
 * -----------------------------
 * It checks that a witness EXISTS. It does NOT check that the witness WORKS;
 * only `gate-falsifiability-probe.mjs` can do that, by running it. Printing
 * "33/33 covered" from here would be §92's error — converting an unknown into a
 * confident claim — because a case can be aimed at a file that moved and prove
 * nothing while this gate still counts it. So this file says "witness", never
 * "proven", and says so in its own output where a reader cannot miss it.
 */
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

/* §98 established the override pattern, and §98's reason applies verbatim: a
 * negative test that edits a tracked `package.json` is a write window. The
 * negative suite points this at a synthetic tree in %TEMP% and writes nothing
 * here. */
const ROOT = process.env.BITS_ROOT || process.cwd();

/* Importing the probe is side-effect-free since §99 put the run behind a CLI
 * guard — verified by the fact this gate runs in milliseconds. */
const CASES_MODULE = process.env.BITS_CASES || join(ROOT, "scripts", "gate-falsifiability-probe.mjs");
const SUITE_CASES_MODULE =
  process.env.BITS_SUITE_CASES || join(ROOT, "scripts", "negative-suite-falsifiability.mjs");

/* An absolute Windows path is not a valid ESM specifier; it must be a file://
 * URL. Getting this wrong throws ERR_UNSUPPORTED_ESM_URL_SCHEME, which looks
 * like a broken gate rather than a path bug. */
const { CASES } = await import(pathToFileURL(resolve(CASES_MODULE)).href);

/* §100 — negative suites too, for the same reason.
 *
 * §99 closed this hole for gates and left it open for the negative tests. Two of
 * thirteen had no falsifiability witness, and `negative-suite-falsifiability.mjs`
 * was printing "✔ every negative suite in test:unit detects its gate stopping
 * working" on the very run that listed them as undemonstrated: its failure list
 * only covered suites that HAD a case, so a suite with no case could not appear
 * in it. §99 fixed the coverage gate and did not extend it here, so the same
 * blind spot was re-created one file over.
 *
 * That file also needed §100's CLI guard before this import was possible at all. */
const { CASES: SUITE_CASES } = await import(pathToFileURL(resolve(SUITE_CASES_MODULE)).href);

const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const entries = [...new Set(pkg.scripts?.["test:unit"]?.match(/[\w./-]+\.mjs/g) || [])];

/* A negative test is the deliberate attempt to make a gate fail, not a gate.
 * Counting one as a gate would demand a witness for the machinery being
 * audited. §100 also needs the negative side of the split, so both are named
 * here rather than importing the probe's own `coverage()` helper. */
const gates = entries.filter((e) => !e.endsWith("-negative.mjs")).sort();
const negativeSuites = entries.filter((e) => e.endsWith("-negative.mjs")).sort();

const failures = [];

/* §98's defect, in a new place: a gate that reads a list and finds nothing has
 * proved nothing. `test:unit` silently losing every entry — a bad edit, a
 * renamed key — would make this file report a clean 0-of-0. */
if (gates.length === 0) {
  console.log("=== FALSIFIABILITY COVERAGE (§99) ===\n");
  console.log("  ✖ VACUOUS: no gates parsed out of package.json \"test:unit\".");
  console.log("    This gate cannot report coverage of an empty set. Check that the");
  console.log("    script key still exists and still references .mjs files.");
  console.error("\n✖ falsifiability-coverage: nothing to cover — refusing to report a pass.");
  process.exit(1);
}

const witnessedGates = new Set(CASES.map((c) => c.gate));
const witnessedSuites = new Set(SUITE_CASES.map((c) => c.suite));

/* DIRECTION 1 — a gate that runs in the suite with nobody able to break it. */
const unwitnessed = gates.filter((g) => !witnessedGates.has(g));

/* DIRECTION 2 — §95's shape, one level up.
 *
 * A case for a gate that is no longer in `test:unit` is a witness for something
 * that never runs. The probe would happily `node <that gate>` and report PASS,
 * so the coverage number would stay at 100% while proving a check the suite does
 * not execute. That is precisely how `production-write-guard-test.mjs` sat
 * green and unwired for phases. Drift in this direction is invisible to a
 * one-way check, so it is checked too. */
const orphanedCases = [...witnessedGates].filter((g) => !gates.includes(g)).sort();

/* DIRECTION 3 — a case that cannot run, wearing a gate's name.
 *
 * Every case needs a gate and a stated rule, plus either a `creates` target (a
 * gate proved by making the thing it hunts) or a file/from/to triple.
 *
 * `to: ""` is legal and load-bearing — deleting an attribute is how several
 * cases fire — so the predicate tests the TYPE, not truthiness. An earlier
 * version of this check used `c.to` and reported a11y-static as malformed,
 * which was the check being wrong about a correct case. */
const malformed = CASES.filter(
  (c) =>
    !c.gate || !c.rule ||
    !(c.creates || (c.file && typeof c.from === "string" && typeof c.to === "string")),
);

/* ── §100 — the same four directions, for negative suites ─────────────────── */

const unwitnessedSuites = negativeSuites.filter((s) => !witnessedSuites.has(s));
const orphanedSuiteCases = [...witnessedSuites].filter((s) => !negativeSuites.includes(s)).sort();
const malformedSuites = SUITE_CASES.filter(
  (c) => !c.suite || !c.rule || !c.file || typeof c.from !== "string" || typeof c.to !== "string",
);

console.log("=== FALSIFIABILITY COVERAGE (§99/§100) ===\n");
console.log(`  gates parsed from package.json "test:unit"   ${gates.length}`);
console.log(`  witness cases exported by the probe           ${CASES.length}`);
console.log(`  gates with a witness                          ${gates.length - unwitnessed.length}/${gates.length}`);
console.log(`  negative suites parsed from "test:unit"       ${negativeSuites.length}`);
console.log(`  witness cases from the negative audit         ${SUITE_CASES.length}`);
console.log(`  negative suites with a witness                ${negativeSuites.length - unwitnessedSuites.length}/${negativeSuites.length}\n`);

if (unwitnessed.length) {
  failures.push(`${unwitnessed.length} gate(s) in test:unit have no falsifiability witness:`);
  for (const g of unwitnessed) failures.push(`    ✖ ${g}`);
}
if (orphanedCases.length) {
  failures.push(`${orphanedCases.length} witness case(s) name a gate that is NOT in test:unit:`);
  for (const g of orphanedCases) failures.push(`    ✖ ${g}`);
}
if (malformed.length) {
  failures.push(`${malformed.length} witness case(s) cannot run:`);
  for (const c of malformed) failures.push(`    ✖ ${c.gate} — ${c.rule ?? "(no rule stated)"}`);
}
if (unwitnessedSuites.length) {
  failures.push(`${unwitnessedSuites.length} negative suite(s) in test:unit have no falsifiability witness:`);
  for (const s of unwitnessedSuites) failures.push(`    ✖ ${s}`);
}
if (orphanedSuiteCases.length) {
  failures.push(`${orphanedSuiteCases.length} witness case(s) name a negative suite that is NOT in test:unit:`);
  for (const s of orphanedSuiteCases) failures.push(`    ✖ ${s}`);
}
if (malformedSuites.length) {
  failures.push(`${malformedSuites.length} negative-suite witness case(s) cannot run:`);
  for (const c of malformedSuites) failures.push(`    ✖ ${c.suite} — ${c.rule ?? "(no rule stated)"}`);
}

const clean = failures.length === 0;
if (clean) {
  console.log("  Every gate and every negative suite in the suite has a witness that can be aimed at it.");
  console.log("  NOT VERIFIED HERE: that the witness actually makes its subject fail.");
  console.log("  That is gate-falsifiability-probe.mjs and negative-suite-falsifiability.mjs,");
  console.log("  which are deliberately not in test:unit — they copy the tree and re-run");
  console.log("  every gate and suite respectively.");
}

if (!clean) {
  console.error(`\n✖ falsifiability-coverage:`);
  for (const f of failures) console.error(`  ${f}`);
  console.error("\n  For a gate, add a case to CASES in scripts/gate-falsifiability-probe.mjs");
  console.error("  naming the rule it breaks. For a negative suite, add a case to CASES in");
  console.error("  scripts/negative-suite-falsifiability.mjs naming what it blinds. Then run");
  console.error("  the corresponding auditor to confirm the witness is actually aimed.");
  process.exit(1);
}

console.log("\n  falsifiability-coverage: OK");