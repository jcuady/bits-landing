/**
 * Negative test for image-sizes.selfcheck.mjs.
 *
 * Injects `quality={95}` — the exact defect §34 found — into a real <Image>
 * element, asserts the gate goes red, then restores the file byte-for-byte.
 *
 * §95 — WHY THIS NO LONGER USES THE SHIPPED STRING AS ITS ANCHOR
 * --------------------------------------------------------------
 * The first version did `original.replace("quality={90}", "quality={95}")`.
 * That worked only while `hero.tsx` still carried `quality={90}`. §34 was fixed
 * by REMOVING the prop — the correct modern fix, since `quality` need not be
 * set at all — so the anchor disappeared, `replace()` returned the string
 * unchanged, and the suite printed:
 *
 *     FAIL  could not inject quality={95} — the anchor changed
 *
 * and exited 1. It has been failing for exactly as long as it has been
 * unwired. This is §93's rule with the fixture demonstrating it: a negative
 * test whose fixture IS the bug it exists to catch is alive only until the bug
 * is fixed, and it then fails in the one direction nobody runs.
 *
 * The mutation is now SYNTHETIC: the anchor is `<Image` itself, which the file
 * cannot do without, and the injected prop is written fresh. The negative test
 * no longer depends on a defect staying broken.
 *
 * The "could not inject" guard is retained deliberately — a silent no-op
 * injection that reported PASS would be the §70 failure mode — and the anchor
 * is asserted to be present before anything is written.
 *
 * Run: node scripts/image-sizes-negative.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const TARGET = join(ROOT, "components", "sections", "hero.tsx");
const original = readFileSync(TARGET, "utf8");

const run = () => {
  try {
    execFileSync("node", [join(ROOT, "lib", "site", "image-sizes.selfcheck.mjs")], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { code: 0, out: "" };
  } catch (e) {
    return { code: e.status, out: `${e.stdout || ""}${e.stderr || ""}` };
  }
};

/* Insert `quality={95}` as the FIRST PROP of the first <Image …> element. The
 * quality must be inside the tag's prop list, not after it, or it is not a prop
 * at all and the gate is being asked about the wrong thing. */
const ANCHOR = "<Image";
const INJECTED = '<Image quality={95}';

let failed = false;
try {
  const baseline = run();
  console.log(`${baseline.code === 0 ? "PASS" : "FAIL"}  control: gate passes on the fixed tree`);
  if (baseline.code !== 0) failed = true;

  const anchorPresent = original.includes(ANCHOR);
  console.log(`${anchorPresent ? "PASS" : "FAIL"}  anchor <Image is present in hero.tsx`);
  if (!anchorPresent) failed = true;

  const mutated = original.replace(ANCHOR, INJECTED);
  if (mutated === original) {
    console.log("FAIL  could not inject quality={95} — the anchor changed");
    failed = true;
  } else {
    writeFileSync(TARGET, mutated, "utf8");
    const { code, out } = run();
    writeFileSync(TARGET, original, "utf8");
    const ok = code !== 0;
    if (!ok) failed = true;
    const line = out.split("\n").find((l) => l.includes("quality={95}"))?.trim();
    console.log(`${ok ? "PASS" : "FAIL"}  quality={95} reinstated  -> exit ${code}${line ? `  [${line}]` : ""}`);
    console.log(`${out.includes("quality={95}") ? "PASS" : "FAIL"}  the gate NAMES the injected defect`);
    if (!out.includes("quality={95}")) failed = true;
  }
} finally {
  writeFileSync(TARGET, original, "utf8");
}

const restored = readFileSync(TARGET, "utf8") === original;
console.log(`${restored ? "PASS" : "FAIL"}  hero.tsx restored byte-for-byte`);
if (!restored) failed = true;

process.exit(failed ? 1 : 0);