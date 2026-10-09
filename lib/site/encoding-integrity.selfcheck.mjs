/**
 * Encoding-integrity gate (SYSTEM_AUDIT.md §37) — the 18th gate.
 *
 * Four distinct defects, four distinct checks. They are not merged because they
 * have different causes and different fixes:
 *
 *   mojibake          UTF-8 read as Windows-1252      recoverable by round trip
 *   U+FFFD            character destroyed at write     NOT recoverable
 *   UTF-8 BOM         3 stray bytes prepended          removable
 *   invalid UTF-8     bytes no encoder produced        truncates on any re-save
 *
 * WHY THIS GATE EXISTS
 * --------------------
 * Not because encoding damage is dramatic. Because it had already happened, in
 * the audit document itself: 57 U+FFFD across 49 lines, each one a destroyed
 * character, invisible to every other check in this repository. And because the
 * detector that was supposed to catch it (a character class derived from the
 * cp1252 decoder) reported 8 damaged runs where 4 existed — flagging the section
 * range U+00A7 U+2013 U+00A7 as corruption.
 *
 * PROVING THE DETECTOR FIRES
 * --------------------------
 * A gate that reports nothing on a clean tree is indistinguishable from a gate
 * that cannot fail. So the first block below corrupts known-good strings through
 * the same code path real damage takes, and asserts each one is caught. If the
 * rule is weakened, this goes red before the gate ever reaches the tree.
 *
 * Run: node lib/site/encoding-integrity.selfcheck.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  scanBuffer,
  isClean,
  listProjectTextFiles,
  CHAR_TO_BYTE,
  REPLACEMENT_CHAR,
  BOM,
} from "./encoding.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

let failed = 0;
const check = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond ? "" : `  [${detail}]`}`);
  if (!cond) failed++;
};

/* ── 1. The detector must fire ────────────────────────────────────────────
 * Corruption is produced here, not pasted. If the string constants below were
 * hand-written the way the documentation examples were, this block would be
 * testing the same thing the real damage is: a literal.
 */

/** Take correct UTF-8 text and produce the exact corruption a bad write makes. */
function corrupt(text) {
  const bytes = Buffer.from(text, "utf8");
  // Decode each byte the way Windows-1252 would, then re-encode as UTF-8.
  const CP = new TextDecoder("windows-1252");
  let out = "";
  for (const b of bytes) out += CP.decode(Uint8Array.of(b));
  return out;
}

const EM_DASH = "—"; // em dash
const EN_DASH = "–"; // en dash
const SECTION = "§"; // section sign
const MIDDOT = "·"; // middle dot
const TREE = "🌱"; // seedling

// Each of these must be detected.
const CORRUPTIONS = [
  ["em dash mis-read as cp1252", corrupt(EM_DASH)],
  ["en dash mis-read as cp1252", corrupt(EN_DASH)],
  ["seedling emoji, 4-byte UTF-8", corrupt(TREE)],
  ["two em dashes in a row", corrupt(`${EM_DASH}${EM_DASH}`)],
  ["curly quote", corrupt("’")],
  ["ellipsis", corrupt("…")],
];

for (const [label, bad] of CORRUPTIONS) {
  const scan = scanBuffer(Buffer.from(bad, "utf8"));
  check(
    `detector fires: ${label}`,
    scan.mojibake.length > 0,
    `produced ${JSON.stringify(bad)} which was not flagged`
  );
}

// The round trip must also be CORRECT, not merely present. A detector that flags
// everything would pass the block above.
const expected = [
  ["em dash", EM_DASH],
  ["en dash", EN_DASH],
  ["seedling", TREE],
];
for (const [label, want] of expected) {
  const scan = scanBuffer(Buffer.from(corrupt(want), "utf8"));
  check(
    `detector recovers the right character: ${label}`,
    scan.mojibake.length === 1 && scan.mojibake[0].fixed === want,
    `got ${JSON.stringify(scan.mojibake[0]?.fixed)}`
  );
}

// And it must NOT fire on the punctuation it used to flag.
const LEGITIMATE = [
  ["en dash + section sign (a section range)", `${EN_DASH}${SECTION}`],
  ["em dash alone", EM_DASH],
  ["em dash + middle dot", `${EM_DASH}${MIDDOT}`],
  ["three middle dots in a row", `${MIDDOT}${MIDDOT}${MIDDOT}`],
  ["a full sentence with dashes", `Clean ${EM_DASH} prose ${EN_DASH} stays clean.`],
  ["right single quote", "’"],
  ["ellipsis", "…"],
  ["degrees and multiplication signs", "45° × 3"],
  ["check and cross marks", "✓ ✗"],
];
for (const [label, text] of LEGITIMATE) {
  const scan = scanBuffer(Buffer.from(text, "utf8"));
  check(
    `detector stays quiet on legitimate text: ${label}`,
    isClean(scan),
    `false positive: ${JSON.stringify(scan.mojibake.map((m) => m.run))}`
  );
}

// The other three defects.
check("detector finds U+FFFD", scanBuffer(Buffer.from(`a${REPLACEMENT_CHAR}b`, "utf8")).replacementChars.length === 1);
check("detector finds a UTF-8 BOM", scanBuffer(Buffer.concat([Buffer.from([0xef, 0xbb, 0xbf]), Buffer.from("x")])).bom);
check("detector finds invalid UTF-8", scanBuffer(Buffer.from([0x61, 0xff, 0xfe, 0x62])).invalidBytes > 0);
check("detector accepts clean UTF-8", isClean(scanBuffer(Buffer.from("plain ascii", "utf8"))));

/* ── 2. The reverse map is real ─────────────────────────────────────────── */
check(
  "the cp1252 reverse map is derived, not empty",
  CHAR_TO_BYTE.size > 90 && CHAR_TO_BYTE.get(EM_DASH) === 0x97,
  `size=${CHAR_TO_BYTE.size} emdash=${CHAR_TO_BYTE.get(EM_DASH)}`
);
check("the replacement-character constant is U+FFFD", REPLACEMENT_CHAR.charCodeAt(0) === 0xfffd);
check("the BOM constant is U+FEFF", BOM.charCodeAt(0) === 0xfeff);

/* ── 3. The tree ─────────────────────────────────────────────────────────── */
const files = listProjectTextFiles(ROOT);
check("the gate actually reads files", files.length > 50, `found ${files.length}`);

const damaged = [];
for (const f of files) {
  let scan;
  try {
    scan = scanBuffer(readFileSync(f));
  } catch {
    continue; // vanished mid-scan; not an encoding problem
  }
  if (!isClean(scan)) damaged.push({ file: relative(ROOT, f), scan });
}

for (const { file, scan } of damaged.slice(0, 10)) {
  const why = [
    scan.bom && "UTF-8 BOM",
    scan.invalidBytes && `${scan.invalidBytes} invalid byte(s)`,
    scan.replacementChars.length && `${scan.replacementChars.length} U+FFFD`,
    scan.mojibake.length &&
      `${scan.mojibake.length} mojibake run(s): ${JSON.stringify(scan.mojibake[0].run)} -> ${JSON.stringify(scan.mojibake[0].fixed)}`,
  ]
    .filter(Boolean)
    .join("; ");
  console.log(`  ${file}: ${why}`);
}

check(
  `no encoding damage in ${files.length} project text file(s)`,
  damaged.length === 0,
  `${damaged.length} damaged file(s)`
);

console.log(
  failed === 0
    ? "\n✔ encoding integrity verified"
    : `\n✖ ${failed} encoding assertion(s) failed`
);
process.exit(failed === 0 ? 0 : 1);