/**
 * Repair mojibake: text that is valid UTF-8 which was decoded as Windows-1252.
 *
 * The general repair, rather than a hand-listed table of broken sequences:
 *
 *   1. Build a reverse map from the Windows-1252 decoder: for every byte
 *      0x00-0xFF, decode it to the character cp1252 would have produced.
 *   2. Encode each mojibake character back through that map to its byte.
 *   3. Decode the resulting byte run as UTF-8.
 *
 * That recovers the original characters for ANY sequence, including ones no
 * hand-written table would think to include.
 *
 * Usage: node scripts/repair-mojibake.mjs <file> [...]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { CHAR_TO_BYTE } from "../lib/site/encoding.mjs";

/*
 * The suspect class is DERIVED from the Windows-1252 decoder, not written by
 * hand.
 *
 * Hand-maintaining it is how this tool failed the first time: the list omitted
 * U+201D (byte 0x94), so every run containing a curly quote broke apart there,
 * matched two characters at a time, and repaired nothing — while the verifier,
 * built from the same list, cheerfully reported "52 runs still damaged". An
 * incomplete character class and a detector that reports nothing because its own
 * pattern fails are indistinguishable from "the file is fine".
 *
 * That is the eighth instance of this failure shape in this audit, and the lesson
 * is the same every time: derive the rule from the source of truth, never
 * enumerate it.
 *
 * IMPORTANT: this class is correct for REPAIR and wrong for DETECTION.
 *
 * Every character it matches is a CANDIDATE for round-tripping, which is exactly
 * what repair needs — repair tries the bytes and throws the result away unless
 * they are valid UTF-8. But the class also matches EM DASH, EN DASH, SECTION
 * SIGN and MIDDLE DOT, which is a large share of the punctuation in any
 * well-written Markdown file.
 *
 * The verifier in the previous version of this file used the class as a detector
 * and reported 8 damaged runs in a document that contained 4, flagging the
 * section range U+00A7 U+2013 U+00A7 as corruption. Detection is therefore no
 * longer done here: it lives in lib/site/encoding.mjs and this script imports it.
 * See SYSTEM_AUDIT.md §33.6 for the measurement and §37 for the replacement rule.
 */
const CP1252_CLASS = (() => {
  const chars = new Set();
  for (let b = 0x80; b < 0x100; b++) chars.add(CP1252_DECODE(b));
  const escaped = [...chars]
    .filter((c) => c.length === 1 && c.charCodeAt(0) >= 0x80)
    .map((c) => "\\u" + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0"))
    .sort();
  return `[${[...new Set(escaped)].join("")}]`;
})();

function CP1252_DECODE(byte) {
  return new TextDecoder("windows-1252").decode(Uint8Array.of(byte));
}

const SUSPECT_RUN = new RegExp(`${CP1252_CLASS}+`, "g");

const CTRL = (s) =>
  [...s].filter((c) => {
    const n = c.charCodeAt(0);
    return n < 9 || (n > 13 && n < 32);
  }).length;

function tryRepair(run) {
  const bytes = [];
  for (const ch of run) {
    const b = CHAR_TO_BYTE.get(ch);
    if (b === undefined) return null; // not a cp1252 artefact
    bytes.push(b);
  }

  let decoded;
  try {
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
  } catch {
    return null; // not valid UTF-8 once re-encoded, so not mojibake
  }

  if (decoded === run) return null;
  if (CTRL(decoded) > CTRL(run)) return null;
  return decoded;
}

function repairFile(file) {
  const before = readFileSync(file, "utf8");
  const changes = [];
  const after = before.replace(SUSPECT_RUN, (run) => {
    const fixed = tryRepair(run);
    if (fixed !== null && fixed !== run) {
      changes.push({ run, fixed });
      return fixed;
    }
    return run;
  });

  if (!changes.length) {
    console.log(`${file}: nothing to repair`);
    return false;
  }

  writeFileSync(file, after, "utf8");
  console.log(`${file}: ${changes.length} run(s) repaired`);
  for (const c of changes) {
    console.log(`  ${JSON.stringify(c.run)}  ->  ${JSON.stringify(c.fixed)}`);
  }
  return true;
}

const files = process.argv.slice(2);
if (!files.length) {
  console.error("usage: node scripts/repair-mojibake.mjs <file> [...]");
  process.exit(1);
}

let changed = 0;
for (const f of files) if (repairFile(f)) changed++;
console.log(`\n${changed} file(s) changed`);

/*
 * Verify with the round-trip detector, not with the repair class.
 *
 * This is the change that matters in this file. The old verifier asked "are there
 * 2+ cp1252-representable characters in a row", which is true of ordinary
 * punctuation, so it could report damage in a clean file and be believed.
 */
const { findMojibake } = await import("../lib/site/encoding.mjs");
let bad = 0;
for (const f of files) {
  const hits = findMojibake(readFileSync(f, "utf8"));
  if (hits.length) {
    bad += hits.length;
    console.log(`  RESIDUAL in ${f}: ${hits.length} run(s)`);
    for (const h of hits.slice(0, 5)) {
      console.log(`    ${JSON.stringify(h.run)} should be ${JSON.stringify(h.fixed)}`);
    }
  }
}
console.log(bad === 0 ? "verified: no residual mojibake" : `${bad} run(s) still damaged`);
process.exit(bad === 0 ? 0 : 1);