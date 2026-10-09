/**
 * Guard tests for the production-write scripts (SYSTEM_AUDIT.md §33).
 *
 * The property that matters is not "the script has a flag" but "importing or
 * running it cannot write to a database by accident". These assert that
 * directly.
 *
 * Run: node scripts/production-write-guard-test.mjs
 */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

/* §103 — this file used to carry its OWN `stripComments`, and that copy contained
 * the same defect §103 fixed in `security-claims.mjs`: a `//` guard that skipped
 * only the FIRST occurrence after a colon, so a second `//` on the same line
 * deleted everything to end-of-line — before any assertion ran.
 *
 * Measured on the three files this gate actually checks, the two copies produce
 * BYTE-IDENTICAL output and all seven stripped-source assertions give the same
 * verdict. So it was latent here too, with no current impact — in the one gate
 * that stands between a production script and a live database write.
 *
 * It is now imported rather than re-declared. Two copies of a scanner is how §96
 * found three `escapeHtml`es and how §102 found a gate testing a dead duplicate;
 * the only durable answer is one implementation. `security-claims.mjs` has no
 * imports of its own, so this costs nothing. */
import { stripComments } from "../lib/site/security-claims.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

let failed = 0;
function check(name, cond, detail = "") {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond ? "" : `  [${detail}]`}`);
  if (!cond) failed++;
}

/*
 * Scan CODE, not prose.
 *
 * apply-schema.mjs documents the old defect in a header comment, including the
 * literal text `await import("./seed-supabase.mjs")` and the literal string
 * "Run seed separately". Scanning the raw file made both assertions match the
 * documentation of the bug rather than the bug — a detector reporting the
 * comment explaining the fix as evidence the fix is missing.
 *
 * Same lesson as ai-disclosure stripping comments before extracting literals.
 */
const seed = read("scripts/seed-supabase.mjs");
const applyFile = read("scripts/apply-schema.mjs");
const seedCode = stripComments(seed);
const applyCode = stripComments(applyFile);

/* -- 1. Importing the seed must be inert ---------------------------------- */
try {
  execFileSync(
    "node",
    [
      "--input-type=module",
      "-e",
      `await import(${JSON.stringify(join(ROOT, "scripts", "seed-supabase.mjs"))});`,
    ],
    {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NEXT_PUBLIC_SUPABASE_URL: "https://probe123.supabase.co" },
      timeout: 20000,
    }
  );
  check("importing seed-supabase.mjs does not throw or write", true);
} catch (e) {
  const out = `${e.stdout || ""}${e.stderr || ""}`;
  const attemptedWrite =
    /seedDemoUser|seedLeads|Supabase seed complete|unauthorized|DRY RUN/i.test(out);
  check(
    "importing seed-supabase.mjs does not write",
    !attemptedWrite || /DRY RUN/.test(out),
    out.slice(0, 200)
  );
}

/* -- 2. The seed guard ---------------------------------------------------- */
check("seed is guarded by an explicit --apply flag", seed.includes('process.argv.includes("--apply")'));
check("seed requires a confirmed project ref", seed.includes("--confirm-project"));
check(
  "seed's writing IIFE sits inside a conditional branch",
  /else\s*\{\s*\(async \(\) => \{[\s\S]*seedDemoUser\(\)/.test(seedCode)
);

/*
 * Multiplicity. A placement assertion alone is weak: `[\s\S]*` is greedy, so a
 * SECOND unguarded IIFE anywhere below the guard still satisfies "the writing
 * IIFE is inside an else". The negative test proved exactly that - hoisting a
 * copy out of the else branch left the suite green.
 *
 * So assert the counts instead. One IIFE, one call to each seeding function.
 * A duplicate, a hoisted copy, or a refactor that adds a second entry point
 * breaks a number rather than a pattern.
 */
const countOf = (re, s) => (s.match(re) || []).length;
check(
  "seed has exactly one async IIFE",
  countOf(/\(async\s*\(\s*\)\s*=>/g, seedCode) === 1,
  `found ${countOf(/\(async\s*\(\s*\)\s*=>/g, seedCode)}`
);
check(
  "seedDemoUser is called exactly once",
  countOf(/await seedDemoUser\(\)/g, seedCode) === 1,
  `found ${countOf(/await seedDemoUser\(\)/g, seedCode)}`
);
check(
  "seedLeads is called exactly once",
  countOf(/await seedLeads\(\)/g, seedCode) === 1,
  `found ${countOf(/await seedLeads\(\)/g, seedCode)}`
);

const beforeGuard = seedCode.slice(0, seedCode.indexOf('process.argv.includes("--apply")'));
check(
  "no unguarded IIFE precedes the guard",
  !/\(async\s*\(\s*\)\s*=>\s*\{[\s\S]*?seedDemoUser\(/.test(beforeGuard),
  "an unguarded IIFE exists above the guard"
);
check(
  "seed warns against running against real enquiries",
  /NEVER run this against a database holding real enquiries/i.test(seed)
);

/* -- 3. apply-schema must not chain the seed ------------------------------- */
check(
  "apply-schema does not import the seed module",
  !/import\(\s*["'`]\.\/seed-supabase\.mjs["'`]\s*\)/.test(applyCode)
);
check("apply-schema never destructures a seed default export", !/default:\s*seed/.test(applyCode));
check(
  "apply-schema points the operator at a separate seed command",
  /Seeding is a separate, explicit step/.test(applyCode)
);

/* -- 4. apply-schema safety model ----------------------------------------- */
check("apply-schema derives the project ref from the URL", /new URL\(SUPABASE_URL\)\.hostname/.test(applyCode));
check("apply-schema has no hardcoded project ref", !/const PROJECT_REF = "[a-z0-9]{15,}"/.test(applyCode));
check("apply-schema defaults to a dry run", /if \(!APPLY\)/.test(applyCode));
check("apply-schema requires --confirm-project to match", /CONFIRMED_REF !== PROJECT_REF/.test(applyCode));
check("apply-schema aborts when table creation fails", /Table creation failed[\s\S]*?process\.exit\(1\)/.test(applyCode));
check("apply-schema aborts when policy creation fails", /RLS policy creation failed[\s\S]*?process\.exit\(1\)/.test(applyCode));
const checkedCalls = (applyCode.match(/if \(!\(await runSQL/g) || []).length;
check(
  "every runSQL call site checks its result",
  checkedCalls === 2,
  `found ${checkedCalls} checked call sites, expected 2`
);

/* -- 5. Executable code must not lie -------------------------------------- */
check(
  "'Run seed separately' appears only in comments, never in output",
  !/console\.[a-z]+\([^)]*Run seed separately/.test(applyCode),
  "the misleading message is still printed by code"
);

/* -- 6. The marketing-automation script: sends real email ───────────────── */
const mkt = read("scripts/test-marketing-automation.mjs");
const mktCode = stripComments(mkt);

check("marketing-automation is guarded by an explicit --apply flag", mkt.includes('process.argv.includes("--apply")'));
check("marketing-automation requires a confirmed project ref", mkt.includes("--confirm-project"));
check("marketing-automation refuses when the ref does not match", /CONFIRMED_REF !== PROJECT_REF/.test(mktCode));
check("marketing-automation derives the ref from the URL", /new URL\(SUPABASE_URL\)\.hostname/.test(mktCode));
check("marketing-automation defaults to a dry run", /DRY RUN/.test(mktCode));
check(
  "marketing-automation warns it sends real email",
  /real emails will be sent|2 real emails/i.test(mkt),
  "the live-run warning is missing"
);
check(
  "marketing-automation labels its lead SYNTHETIC",
  /SYNTHETIC/.test(mkt) && /source:\s*"[^"]*SYNTHETIC/.test(mktCode),
  "the test lead is not labelled synthetic"
);

/*
 * Two ways this script used to report success while failing:
 *   1. `runTest().catch(console.error)` exited 0 on an unhandled rejection.
 *   2. The summary printed "PIPELINE VERIFIED" unconditionally.
 */
check(
  "marketing-automation does not swallow rejections with .catch(console.error)",
  !/\.catch\(\s*console\.error\s*\)/.test(mktCode)
);
check(
  "a failure sets a non-zero exit code",
  /process\.exitCode\s*=\s*1/.test(mktCode) || /process\.exit\(1\)/.test(mktCode)
);
check(
  "the VERIFIED summary is guarded by a failure count",
  /if \(failures === 0\)/.test(mktCode),
  "the summary is printed unconditionally"
);
/*
 * There is deliberately NO "no VERIFIED string anywhere" assertion.
 *
 * An earlier version of this gate banned the success banner outright and went
 * red on the FIXED script, because the banner is correct when it sits inside
 * `if (failures === 0)`. Distinguishing guarded from unguarded requires
 * tracking brace nesting, and the property that actually matters is already
 * asserted directly above.
 *
 * Same lesson as §33's placement-vs-multiplicity fix: assert the property, not
 * a proxy for it that cannot tell the two cases apart.
 */
check(
  "each step registers its failure",
  countOf(/fail\(\s*"/g, mktCode) >= 4,
  `found ${countOf(/fail\(\s*"/g, mktCode)} fail() calls, expected at least 4`
);

/*
 * `if (failures === 0)` only guards anything if `failures` can become non-zero.
 * If the fail() helper stopped incrementing it, every guard above would still be
 * satisfied - the call sites are still there, the summary is still inside an
 * `if` - and the script would report VERIFIED on a run where all four steps
 * failed. That is the §36 defect wearing a different hat, so the counter's
 * initialisation and its single increment are asserted directly.
 */
check("the failure counter is initialised to numeric zero", /let failures = 0;/.test(mktCode));
check(
  "the fail() helper increments the failure counter",
  /(const|function) fail\s*=\s*[\s\S]{0,200}?failures\+\+|function fail\([^)]*\)\s*\{[\s\S]{0,200}?failures\+\+/.test(
    mktCode
  ),
  "fail() never increments the counter the summary is guarded by"
);
check(
  "no shadow reassignment of the failure counter",
  countOf(/failures\s*(?:\+\+|--|\+=[^=]|-=[^=])/g, mktCode) === countOf(/failures\+\+;?/g, mktCode),
  "the counter is mutated somewhere other than the single ++ in fail()"
);

/* -- 7. Encoding ----------------------------------------------------------- */
/*
 * Mojibake detection is delegated to lib/site/encoding.mjs rather than
 * reimplemented here.
 *
 * Two earlier versions of this file carried their own character class, derived
 * from the cp1252 decoder. That class is also used for REPAIR - where matching
 * any cp1252-representable character is correct, because the repair round-trips
 * it and discards the result if the bytes are not valid UTF-8. Used as a
 * DETECTOR it is wrong in the opposite direction: it matches EM DASH, EN DASH,
 * SECTION SIGN and MIDDLE DOT, which this repository's prose uses legitimately.
 * On docs/SYSTEM_AUDIT.md it reported 8 runs where 4 existed, flagging
 * "§16–§29" as corruption.
 *
 * A check that must be kept honest about ordinary punctuation ends up tuned
 * until it is quiet, and then it has stopped checking. See SYSTEM_AUDIT.md
 * §33.6 for the measurement and §37 for the rule that replaced it.
 */
const { findMojibake, findReplacementChars, hasBom } = await import("../lib/site/encoding.mjs");

for (const p of [
  "scripts/seed-supabase.mjs",
  "scripts/apply-schema.mjs",
  "scripts/test-marketing-automation.mjs",
]) {
  const raw = readFileSync(join(ROOT, p));
  const text = raw.toString("utf8");
  const moji = findMojibake(text);
  check(
    `${p} has no mojibake`,
    moji.length === 0,
    `${moji.length} run(s), first: ${JSON.stringify(moji[0]?.run)} should be ${JSON.stringify(moji[0]?.fixed)}`
  );
  const repl = findReplacementChars(text);
  check(
    `${p} has no U+FFFD`,
    repl.length === 0,
    `${repl.length} unrecoverable character(s), first near: ${JSON.stringify(repl[0]?.context ?? "")}`
  );
  check(`${p} has no UTF-8 BOM`, !hasBom(raw));
}

console.log(failed === 0 ? "\n✔ production-write guards verified" : `\n✖ ${failed} guard assertion(s) failed`);
process.exit(failed === 0 ? 0 : 1);