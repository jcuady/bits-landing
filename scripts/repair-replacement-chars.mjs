/**
 * Repair U+FFFD in a Markdown file.
 *
 * U+FFFD is unrecoverable by definition: the bytes EF BF BD replaced a character
 * that is no longer in the file. Every replacement here is therefore INFERRED
 * FROM CONTEXT, which is why this script refuses to run without --apply and
 * prints every line it touches.
 *
 * The rules below are the three shapes that actually occur in this document. Each
 * is stated as a rule, not as a hand-listed line number, so the script keeps
 * working as the file is edited:
 *
 *   <digit> <FFFD> <digit>      a range          -> EN DASH   (1.00-1.43)
 *   <FFFD> <digit>              a section ref    -> SECTION SIGN (§12.5)
 *   anything else               a parenthetical -> EM DASH
 *
 * Dry run by default.
 * Usage: node scripts/repair-replacement-chars.mjs <file> [--apply]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { findReplacementChars, REPLACEMENT_CHAR } from "../lib/site/encoding.mjs";

const R = REPLACEMENT_CHAR;
const APPLY = process.argv.includes("--apply");
const file = process.argv.slice(2).find((a) => !a.startsWith("--"));

if (!file) {
  console.error("usage: node scripts/repair-replacement-chars.mjs <file> [--apply]");
  process.exit(1);
}

const before = readFileSync(file, "utf8");
const found = findReplacementChars(before);
if (!found.length) {
  console.log(`${file}: no U+FFFD, nothing to repair`);
  process.exit(0);
}

/** Decide the replacement for one occurrence from its immediate context. */
function decide(text, i) {
  const before_ = text[i - 1] ?? "";
  const after_ = text[i + 1] ?? "";
  const isDigit = (c) => c >= "0" && c <= "9";

  // A range: 184-384, 1.00-1.43
  if (isDigit(before_) && isDigit(after_)) return "\u2013";
  // A section reference: "in §12.5", "than the §8 note"
  if (isDigit(after_) && !isDigit(before_)) return "\u00a7";
  // Everything else in this document is a parenthetical em dash.
  return "\u2014";
}

let out = "";
let last = 0;
const used = { enDash: 0, section: 0, emDash: 0 };
for (const hit of found) {
  out += before.slice(last, hit.index);
  const ch = decide(before, hit.index);
  out += ch;
  if (ch === "\u2013") used.enDash++;
  else if (ch === "\u00a7") used.section++;
  else used.emDash++;
  last = hit.index + 1;
}
out += before.slice(last);

const lines = before.split(/\r?\n/);
const changedLines = [];
const outLines = out.split(/\r?\n/);
for (let i = 0; i < lines.length; i++) {
  if (lines[i] !== outLines[i]) {
    changedLines.push({ n: i + 1, from: lines[i], to: outLines[i] });
  }
}

console.log(`${file}: ${found.length} U+FFFD`);
console.log(
  `  inferred: ${used.emDash} em dash, ${used.enDash} en dash (range), ${used.section} section sign`
);
console.log(`  ${changedLines.length} line(s) affected\n`);
for (const c of changedLines) {
  console.log(`  line ${c.n}`);
  console.log(`    - ${c.from.trim()}`);
  console.log(`    + ${c.to.trim()}`);
}

if (!APPLY) {
  console.log("\nDRY RUN - nothing written. Re-run with --apply to apply.");
  process.exit(0);
}

writeFileSync(file, out, "utf8");
console.log(`\nApplied. ${file} re-read to confirm.`);
const after = readFileSync(file, "utf8");
const left = findReplacementChars(after);
console.log(left.length === 0 ? "verified: 0 U+FFFD remain" : `STILL ${left.length} U+FFFD remain`);
process.exit(left.length ? 1 : 0);