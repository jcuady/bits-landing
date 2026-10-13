/*
 * SYSTEM_AUDIT.md §45 — negative test for scripts/stack-version-drift.mjs.
 *
 * A gate that has only ever been seen to PASS is not evidence of anything. Each
 * case below mutates a REAL declaration in a REAL file, proves the mutation
 * actually landed (an anchor matching !=1 time throws rather than silently
 * reporting a detector failure for a no-op), runs the gate, asserts it failed,
 * then restores the file byte-for-byte.
 *
 * The anti-vacuity case matters most: if a doc restructure renamed every stack
 * row, the gate would match nothing, report zero drift, and exit 0. A check that
 * cannot fail for the reason it exists is decoration.
 *
 * Run: node scripts/stack-version-drift-negative.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execFileSync } from "child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GATE = join(ROOT, "scripts", "stack-version-drift.mjs");

let failures = 0;
function assert(cond, label) {
  if (cond) console.log(`PASS  ${label}`);
  else {
    failures += 1;
    console.log(`FAIL  ${label}`);
  }
}

/**
 * Run `mutate` against `file`, then the gate, then restore.
 * `expectFail` true means the gate MUST exit non-zero.
 */
function runCase(label, file, anchor, replacement, expectFail, expectMessage) {
  const path = join(ROOT, file);
  const original = readFileSync(path, "utf8");

  const hits = original.split(anchor).length - 1;
  if (hits !== 1) {
    failures += 1;
    console.log(`FAIL  ${label} — anchor occurs ${hits} times in ${file}, expected exactly 1`);
    console.log(`      A stale anchor makes every case below meaningless.`);
    return;
  }

  writeFileSync(path, original.replace(anchor, replacement), "utf8");
  let exitCode = 0;
  let output = "";
  try {
    output = execFileSync(process.execPath, [GATE], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  } catch (err) {
    exitCode = err.status ?? 1;
    output = `${err.stdout ?? ""}${err.stderr ?? ""}`;
  } finally {
    writeFileSync(path, original, "utf8");
  }

  const restored = readFileSync(path, "utf8") === original;
  assert(restored, `${label} — file restored byte-for-byte`);

  if (expectFail) {
    assert(exitCode !== 0, `${label} — gate FAILED as expected`);
    assert(
      expectMessage.test(output),
      `${label} — failure explains itself (${expectMessage})`
    );
  } else {
    assert(exitCode === 0, `${label} — gate passed as expected`);
  }
}

/* A version mismatch must name package.json as the authority. */
const NAMES_TRUTH = /package\.json says/;
/* A missing declaration must name the slot that stopped being checked. */
const NAMES_SLOT = /"Styling" stack row is missing/;

/* 1. A wrong version in the README table must be caught. */
runCase(
  "README Framework downgraded",
  "README.md",
  "| **Framework** | Next.js (App Router) | `16.3.8` |",
  "| **Framework** | Next.js (App Router) | `16.3.0` |",
  true,
  NAMES_TRUTH
);

/* 2. The SYSTEM_AUDIT header is a different shape — a pipe-delimited line.
 *    Anchored on the dated header prefix, not on "| React 19.3.0 |": §45.1 quotes
 *    the OLD header inside a fenced block, and a naive anchor count would find
 *    two and report a stale-anchor error rather than testing the gate. */
runCase(
  "SYSTEM_AUDIT header React version",
  "docs/SYSTEM_AUDIT.md",
  "> **Stack (verified 8 Oct 2026):** Next.js 16.3.8 | React 19.3.0 |",
  "> **Stack (verified 8 Oct 2026):** Next.js 16.3.8 | React 19.9.9 |",
  true,
  NAMES_TRUTH
);

/* 3. PROJECT_STATUS uses the bullet shape. */
runCase(
  "PROJECT_STATUS Framework version",
  "PROJECT_STATUS.md",
  "* **Framework**: Next.js 16.3.8",
  "* **Framework**: Next.js 16.3.5",
  true,
  NAMES_TRUTH
);

/* 4. Anti-vacuity, PER SLOT. Renaming one of four rows must be noticed.
 *    The first attempt at this case renamed the Framework row and expected a
 *    failure; the gate passed, because it only checked "did ANY row match this
 *    file". Three rows were still there, so `next` simply stopped being checked
 *    in README with nothing reported. */
runCase(
  "single stack row renamed (anti-vacuity)",
  "README.md",
  "| **Styling** | Tailwind CSS |",
  "| ~~Styling~~ | Tailwind CSS |",
  true,
  NAMES_SLOT
);

const driftOutput = (() => {
  try {
    execFileSync(process.execPath, [GATE], { cwd: ROOT, encoding: "utf8" });
    return "";
  } catch (err) {
    return `${err.stdout ?? ""}${err.stderr ?? ""}`;
  }
})();
assert(driftOutput === "", "unmutated repository produces no drift output");

/* 5. Control: unmutated repo must be clean. If the drift gate fails here, every
 *    case above "passed" for the wrong reason. */
runCase(
  "unmutated repository (control)",
  "README.md",
  "| **Framework** | Next.js (App Router) | `16.3.8` |",
  "| **Framework** | Next.js (App Router) | `16.3.8` |",
  false
);

console.log("");
if (failures > 0) {
  console.error(`FAILED  ${failures} assertion(s)`);
  process.exitCode = 1;
} else {
  console.log("stack-version-drift negative test verified (5 cases)");
}
