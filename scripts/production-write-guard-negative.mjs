/**
 * Negative test for production-write-guard-test.mjs.
 *
 * §100 — this used to mutate THREE PRODUCTION SCRIPTS IN PLACE and restore them
 * in a `finally`, which is why §95 declared it deliberately unwired and left it
 * as the one check in this repository that never runs.
 *
 * The reasoning was sound and the cost was real: a Ctrl-C between a mutation and
 * its restore leaves `apply-schema.mjs`, `seed-supabase.mjs` or
 * `test-marketing-automation.mjs` modified in the working tree, and the `finally`
 * that would put it back is exactly what does not run when you press Ctrl-C.
 *
 * It now runs in the §91 sandbox: a copy of `scripts/` and `lib/` in %TEMP%, with
 * the mutation targets pointing INTO that copy. No change to the gate was needed
 * — `production-write-guard-test.mjs` derives ROOT from its own location, so the
 * sandbox copy resolves ROOT to the sandbox, which is the whole trick.
 *
 * Run: node scripts/production-write-guard-negative.mjs
 */
import { readFileSync, writeFileSync, cpSync, rmSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { createHash } from "node:crypto";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ── Build the sandbox ─────────────────────────────────────────────────────
 *
 * Per-process, for §99's reason: a fixed %TEMP% path is a shared resource and two
 * concurrent runs corrupt each other's tree. */
const SANDBOX = join(tmpdir(), `bits-pwg-sandbox-${process.pid}`);
rmSync(SANDBOX, { recursive: true, force: true });
mkdirSync(SANDBOX, { recursive: true });
for (const entry of ["scripts", "lib"]) cpSync(join(ROOT, entry), join(SANDBOX, entry), { recursive: true });

const APPLY = join(SANDBOX, "scripts", "apply-schema.mjs");
const SEED = join(SANDBOX, "scripts", "seed-supabase.mjs");
const MKT = join(SANDBOX, "scripts", "test-marketing-automation.mjs");

/* The invariant this file exists to protect, stated as code rather than as
 * intent: every write target must be inside the sandbox. If someone repoints
 * ROOT here again, this throws before a single production byte is written. */
for (const [name, p] of [["APPLY", APPLY], ["SEED", SEED], ["MKT", MKT]]) {
  const rel = relative(SANDBOX, p);
  if (!rel || rel.startsWith("..") || isAbsolute(rel)) {
    throw new Error(`§100: ${name} (${p}) is NOT inside the sandbox ${SANDBOX} — refusing to mutate it.`);
  }
}

const applyOriginal = readFileSync(APPLY, "utf8");
const seedOriginal = readFileSync(SEED, "utf8");
const mktOriginal = readFileSync(MKT, "utf8");

/* The real files, hashed before anything happens. The old version's closing check
 * was `readFileSync(realFile) === original` — which only proves restoration. This
 * proves the property that actually matters: they were never written at all. */
const REAL = ["scripts/apply-schema.mjs", "scripts/seed-supabase.mjs", "scripts/test-marketing-automation.mjs"];
const realHashesBefore = new Map(REAL.map((f) => [f, createHash("sha256").update(readFileSync(join(ROOT, f))).digest("hex")]));

const run = () => {
  try {
    execFileSync("node", [join(SANDBOX, "scripts", "production-write-guard-test.mjs")], {
      cwd: SANDBOX,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NEXT_PUBLIC_SUPABASE_URL: "https://probe123.supabase.co" },
      timeout: 120000,
    });
    return { code: 0, out: "" };
  } catch (e) {
    return { code: e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
};

/**
 * Apply a mutation and PROVE it landed.
 *
 * `String.prototype.replace` with a string anchor silently returns the input
 * unchanged when the anchor is absent. A no-op mutation leaves the suite green,
 * and this harness would report "FAIL - the guard did not catch the defect",
 * which is a lie: the defect was never injected. A stale anchor after a
 * refactor looks exactly like a weak check.
 *
 * So an unmatched anchor throws here, loudly, naming the case - instead of
 * masquerading downstream as a detector failure.
 *
 * `count` also rejects a replace that matched nothing, and guards against a
 * single-anchor replace silently hitting only the first of several occurrences
 * when the case intends to restore every one.
 */
const inject = (label, file, original, from, to) => {
  const occurrences = original.split(from).length - 1;
  if (occurrences !== 1) {
    throw new Error(
      `[${label}] anchor matched ${occurrences} time(s), expected exactly 1.\n` +
        `  anchor: ${JSON.stringify(from.slice(0, 90))}\n` +
        `  The source has moved or been refactored. Update this case; do not let a\n` +
        `  no-op mutation report itself as a detector failure.`
    );
  }
  const mutated = original.replace(from, to);
  if (mutated === original) {
    throw new Error(`[${label}] replace() produced identical content - mutation is a no-op.`);
  }
  writeFileSync(file, mutated, "utf8");
};

const CASES = [
  [
    "re-chain the seed import (the original production-seeding defect)",
    () =>
      inject(
        "re-chain seed",
        APPLY,
        applyOriginal,
        '  await import("./apply-marketing-schema.mjs");',
        '  await import("./apply-marketing-schema.mjs");\n  const { default: seed } = await import("./seed-supabase.mjs").catch(() => ({ default: null }));'
      ),
    () => writeFileSync(APPLY, applyOriginal, "utf8"),
  ],
  [
    "bypass the URL-derived project ref",
    () =>
      inject(
        "hardcode project ref",
        APPLY,
        applyOriginal,
        "const host = new URL(SUPABASE_URL).hostname;",
        'const host = "jvseyttzlobelrnzmfyf.supabase.co";'
      ),
    () => writeFileSync(APPLY, applyOriginal, "utf8"),
  ],
  [
    "hoist the seed IIFE back to top level",
    () =>
      inject(
        "hoist seed IIFE",
        SEED,
        seedOriginal,
        "} else {\n  (async () => {",
        "} else {\n  (async () => { /* moved */ })\n}\nif (true) {\n  (async () => {"
      ),
    () => writeFileSync(SEED, seedOriginal, "utf8"),
  ],
  [
    "print the VERIFIED summary unconditionally (§36)",
    () =>
      inject(
        "unguarded VERIFIED summary",
        MKT,
        mktOriginal,
        '  if (failures === 0) {\n    console.log("\\nMARKETING AUTOMATION & EMAIL DELIVERY PIPELINE VERIFIED.\\n");\n  } else {',
        '  {\n    console.log("\\nMARKETING AUTOMATION & EMAIL DELIVERY PIPELINE VERIFIED.\\n");\n  }\n  if (false) {'
      ),
    () => writeFileSync(MKT, mktOriginal, "utf8"),
  ],
  [
    "restore .catch(console.error) so a rejection exits 0 (§36)",
    () =>
      inject(
        "swallowed rejection",
        MKT,
        mktOriginal,
        "runTest().catch((err) => {",
        "runTest().catch(console.error) && (() => {"
      ),
    () => writeFileSync(MKT, mktOriginal, "utf8"),
  ],
  [
    "drop the failure counter so steps cannot register a failure (§36)",
    () =>
      inject(
        "no failure counter",
        MKT,
        mktOriginal,
        'const fail = (step, detail) => {\n  failures++;',
        'const fail = (step, detail) => {\n  console.error(`STEP FAILED - ${step}:`, detail ?? "(no detail returned)");'
      ),
    () => writeFileSync(MKT, mktOriginal, "utf8"),
  ],
];

let failed = false;
let skipped = false;
let caught = 0;

console.log(`sandbox: ${SANDBOX}`);
console.log("real repository is never a write target (enforced above, re-verified below)\n");

try {
  const baseline = run();
  console.log(`${baseline.code === 0 ? "PASS" : "FAIL"}  control: guards pass on the fixed tree`);
  if (baseline.code !== 0) {
    failed = true;
    console.log(baseline.out.split("\n").filter((l) => l.startsWith("FAIL")).slice(0, 5).join("\n"));
  }

  for (const [label, mutate, restore] of CASES) {
    mutate();
    const { code, out } = run();
    restore();
    const ok = code !== 0;
    if (!ok) failed = true;
    else caught++;
    const first = out.split("\n").find((l) => l.startsWith("FAIL"))?.trim();
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}  -> exit ${code}${first ? `  [${first}]` : ""}`);
  }
} catch (e) {
  // An anchor did not match: the mutation was never applied, so these results
  // are meaningless. Say so instead of reporting a detector failure.
  skipped = true;
  console.error(`\nSKIPPED - a mutation could not be applied:\n${e.message}`);
} finally {
  rmSync(SANDBOX, { recursive: true, force: true });
}

/* The property, checked on the REAL tree. Not "was it restored" — "was it ever
 * written". Restoring proves the happy path; this holds even if the run was
 * killed, because the writes never targeted these paths at all. */
const touched = REAL.filter(
  (f) => createHash("sha256").update(readFileSync(join(ROOT, f))).digest("hex") !== realHashesBefore.get(f),
);
console.log(`${touched.length === 0 ? "PASS" : "FAIL"}  the 3 production scripts were never written (byte-identical)`);
if (touched.length) {
  failed = true;
  for (const f of touched) console.log(`    ✖ ${f} differs from its pre-run hash`);
}

if (skipped) {
  console.log("\nProduction-write negative test SKIPPED - anchors stale, real tree never touched.");
  process.exit(1);
}
console.log(
  failed
    ? "\n✖ a guard did not catch a restored defect"
    : `\n✔ ${caught}/${CASES.length} restored defects caught, in a sandbox — the working tree was never a write target`
);
process.exit(failed ? 1 : 0);