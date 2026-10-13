/**
 * Strip a leading UTF-8 BOM.
 *
 * Run: node scripts/strip-bom.mjs <file> [...]
 *
 * Writes bytes, not text. Writing the decoded string back through any tool that
 * defaults to "UTF-8 with BOM" puts the BOM straight back, which is how it got
 * there in the first place.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { hasBom } from "../lib/site/encoding.mjs";

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node scripts/strip-bom.mjs <file> [...]");
  process.exit(1);
}

let fixed = 0;
for (const f of files) {
  const buf = readFileSync(f);
  if (!hasBom(buf)) {
    console.log(`${f}: no BOM`);
    continue;
  }
  writeFileSync(f, buf.subarray(3));
  // Re-read from disk: a claim that the write worked is worth nothing without it.
  const after = readFileSync(f);
  if (hasBom(after)) {
    console.error(`${f}: FAILED - BOM still present after write`);
    process.exit(1);
  }
  console.log(`${f}: BOM stripped (${buf.length} -> ${after.length} bytes)`);
  fixed++;
}

console.log(`\n${fixed} file(s) fixed`);