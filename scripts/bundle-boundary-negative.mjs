/**
 * Negative test for the bundle-boundary gate (SYSTEM_AUDIT.md §42).
 *
 * Restores the §42 defect — the static `import { gsap } from "gsap"` — and
 * asserts the gate goes red, then puts the file back byte-for-byte.
 *
 * The second case is the interesting one: it removes the feature entirely. A
 * gate that only checks "no static import" would call that PASS, which would
 * make "delete the animation" look like a performance win. The gate asserts the
 * dynamic import still exists for exactly that reason.
 *
 * Run: node scripts/bundle-boundary-negative.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = join(ROOT, "components", "sections", "hero-product.tsx");
const GATE = join(ROOT, "lib", "site", "bundle-boundary.selfcheck.mjs");

const original = readFileSync(TARGET);

const run = () => {
  try {
    execFileSync("node", [GATE], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    return { code: 0, out: "" };
  } catch (e) {
    return { code: e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
};

/** Apply a mutation, refusing to proceed if the anchor did not match. */
const inject = (label, from, to) => {
  const occurrences = original.toString("utf8").split(from).length - 1;
  if (occurrences !== 1) {
    throw new Error(
      `[${label}] anchor matched ${occurrences} time(s), expected exactly 1. ` +
        `The source has moved; update this case rather than letting a no-op mutation ` +
        `report itself as a detector failure.`
    );
  }
  const mutated = original.toString("utf8").replace(from, to);
  if (mutated === original.toString("utf8")) throw new Error(`[${label}] mutation was a no-op`);
  writeFileSync(TARGET, Buffer.from(mutated, "utf8"));
};

const CASES = [
  [
    "restore the static gsap import (§42)",
    () =>
      inject(
        "static gsap import",
        'import { motion, AnimatePresence } from "motion/react";',
        'import { motion, AnimatePresence } from "motion/react";\nimport { gsap } from "gsap";'
      ),
  ],
  [
    "restore a static gsap/ScrollTrigger import",
    () =>
      inject(
        "static ScrollTrigger import",
        'import { motion, AnimatePresence } from "motion/react";',
        'import { motion, AnimatePresence } from "motion/react";\nimport { ScrollTrigger } from "gsap/ScrollTrigger";'
      ),
  ],
  [
    "remove the dynamic import entirely — deleting the feature must NOT read as a fix",
    () =>
      inject(
        "feature removed",
        'import("gsap"),',
        'Promise.resolve({ gsap: {} }),'
      ),
  ],
];

let failed = false;
let skipped = false;

try {
  const baseline = run();
  console.log(`${baseline.code === 0 ? "PASS" : "FAIL"}  control: gate passes on the fixed tree`);
  if (baseline.code !== 0) failed = true;

  for (const [label, mutate] of CASES) {
    mutate();
    const applied = !readFileSync(TARGET).equals(original);
    const { code, out } = run();
    writeFileSync(TARGET, original);

    if (!applied) {
      failed = true;
      console.log(`FAIL  ${label}  -> mutation was a no-op, so this proves nothing`);
      continue;
    }
    const ok = code !== 0;
    if (!ok) failed = true;
    const first = out.split("\n").find((l) => l.startsWith("FAIL"))?.trim();
    console.log(`${ok ? "PASS" : "FAIL"}  ${label}  -> exit ${code}${first ? `  [${first.slice(0, 92)}]` : ""}`);
  }
} catch (e) {
  skipped = true;
  console.error(`\nSKIPPED — a mutation could not be applied:\n${e.message}`);
} finally {
  writeFileSync(TARGET, original);
}

const restored = readFileSync(TARGET).equals(original);
console.log(`${restored ? "PASS" : "FAIL"}  ${relative(ROOT, TARGET)} restored byte-for-byte`);
if (!restored) failed = true;

if (skipped) {
  console.log("\nBundle-boundary negative test SKIPPED — anchors stale, tree left intact.");
  process.exit(1);
}
console.log(failed ? "\n✖ a guard did not catch a restored defect" : "\n✔ every restored defect was caught");
process.exit(failed ? 1 : 0);