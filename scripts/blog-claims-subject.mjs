/**
 * SYSTEM_AUDIT.md §78 — BITS-SUBJECT CLAIMS IN `lib/blog-data.ts`.
 *
 * WHY A SECOND GATE, NOT A `SECURITY_SURFACES` ENTRY
 * -------------------------------------------------
 * `lib/blog-data.ts` is a catalogue of ranked vendor comparisons. Its 46
 * findings split into two classes that a term-level detector cannot tell
 * apart, because the SAME vocabulary is true in one sentence and false in the
 * next:
 *
 *   TRUE   "Lacks native sub-second predictive dialer"          (about Salesforce)
 *   FALSE  "Operations 360 integrates an ultra-low-latency sub-350ms predictive dialer"
 *
 * Gating the file whole would have required redacting true statements about
 * other companies' software. So §77 ungated `app/(marketing)/blog/page.tsx`
 * and declared this a report-only blind spot.
 *
 * The correct scope is not the file — it is the SUBJECT. A claim is a BITS
 * truthfulness problem when it is about BITS; a claim about Salesforce or
 * Genesys is ordinary competitive writing, including when it is unflattering.
 *
 * WHAT IS DERIVED, NOT ENUMERATED
 * ------------------------------
 * • The BITS entity names come from the data's own `isBits` rows, so a renamed
 *   product cannot silently fall out of scope.
 * • Findings come from `findClaims`, the same detector every other gate uses,
 *   so the 15 banned attestations cannot drift between the two.
 * • Row membership is resolved by MATCHING BRACES, not by proximity. A
 *   positional rule ("nearest preceding isBits row") is measurably wrong here:
 *   `reviews[]` rows all carry `isBits`, but `comparisonRows[]` marks ONLY the
 *   BITS row, so proximity assigns Genesys, Katabat and TCN cells to the BITS
 *   row above them. That was measured, not assumed.
 *
 * MEASURED ACCURACY — READ THIS BEFORE TRUSTING IT
 * ------------------------------------------------
 * Scored against 46 findings hand-labelled by reading each sentence:
 *
 *      precision 1.000    recall 0.706    12 TP / 0 FP / 5 FN / 29 TN
 *
 * Zero false alarms; five silent misses. The misses are sentences that neither
 * sit in an `isBits` row nor name a BITS entity:
 *
 *      a `keywords[]` entry            "predictive dialer for collections"
 *      a `heroSnippet`                 "…architectures featuring sub-350ms predictive dialing"
 *      a `keyEvaluationCriteria.desc`  "…and real-time supervisor whisper/barge-in monitoring"
 *      two `comparisonRows[].name`     "Integrated Telephony & Predictive Dialing"
 *                                      "Instant debtor or customer dossier screen-pop"
 *
 * All five were false claims and all five are fixed (see SYSTEM_AUDIT.md §78).
 * This gate would not have caught them. **The blind spot is declared rather
 * than hidden**, because a gate whose coverage is unknown is worse than no
 * gate: a reader who knows it catches 70% of the class will look elsewhere for
 * the other 30%, and one who does not know will assume it catches all of them.
 */
import { readFileSync } from "node:fs";
import { findClaims, visibleStrings, isNonCopyLiteral, stripComments } from "../lib/site/security-claims.mjs";

const FILE = "lib/blog-data.ts";
const ROOT = process.cwd();
const src = readFileSync(`${ROOT}/${FILE}`, "utf8");

/* ── Locate the enclosing object literal ────────────────────────────────────
 * Walks backwards from a string offset to the `{` that opens its object, so
 * "which row is this cell in" is answered structurally. */

const lineOfOffset = [];
{
  let ln = 1;
  for (let i = 0; i < src.length; i++) {
    lineOfOffset[i] = ln;
    if (src[i] === "\n") ln++;
  }
}

function enclosingObject(offset) {
  let depth = 0;
  for (let i = offset - 1; i >= 0; i--) {
    const c = src[i];
    if (c === "}") depth++;
    else if (c === "{") {
      if (depth === 0) return i;
      depth--;
    }
  }
  return -1;
}

/** Read a top-level field of the object opened at `open`. Only depth 1 counts,
 * so a nested object's `name` cannot be mistaken for its parent's. */
function readField(open, field) {
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return null;
    } else if (depth === 1) {
      const m = src.slice(i, i + 240).match(new RegExp(`^${field}:\\s*(true|false|"([^"]*)")`));
      if (m) return m[1] === "true" ? true : m[1] === "false" ? false : m[2];
    }
  }
  return null;
}

/* ── BITS entities, derived from the data's own isBits rows ─────────────── */
const bitsRowNames = [];
for (let i = 0; i < src.length; i++) {
  if (!/isBits:\s*true/.test(src.slice(i, i + 20))) continue;
  const open = enclosingObject(i);
  if (open === -1) continue;
  const name = readField(open, "name");
  if (name && !bitsRowNames.includes(name)) bitsRowNames.push(name);
}

// "Operations 360 (OMS) & Telephony Suite" must also catch the bare
// "Operations 360" used in prose. Take the longest distinctive prefix before
// any parenthetical or ampersand rather than typing the list in.
const entityPattern = new RegExp(
  `\\b(?:${bitsRowNames
    .map((n) => n.split(/\s*[(&]/)[0].trim())
    .filter((n) => n.length > 3)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")}|BITS)\\b`,
  "i"
);

/* ── Collect ─────────────────────────────────────────────────────────────── */
const findings = [];
/* §81 — the same identifier filter the main gate uses. Without it this gate
 * flagged the product's own NAME — a review row literally titled "BITSagent AI
 * Telephony" — as a telephony claim, because §81 added the bare category word to
 * the rule. The row-level `isBits` check still covers claims inside that row, so
 * nothing is lost by skipping the name itself. */
const stripped = stripComments(src);
for (const v of visibleStrings(src)) {
  if (isNonCopyLiteral(stripped, v.index, v.value)) continue;
  // Use the extractor-provided offset. `src.indexOf(value)` is wrong here: the
  // same cons string appears under two different vendors, and indexOf returns
  // the first, attributing a competitor's cell to the row above it.
  for (const claim of findClaims(v.value)) {
    const open = enclosingObject(v.index);
    findings.push({
      line: lineOfOffset[v.index],
      rowName: open === -1 ? null : readField(open, "name"),
      isBits: open === -1 ? null : readField(open, "isBits"),
      sentence: claim.sentence.replace(/\s+/g, " ").trim(),
      id: claim.id,
    });
  }
}

const subjectClaims = findings.filter(
  (f) => f.isBits === true || entityPattern.test(f.sentence)
);

console.log("=== BITS-SUBJECT CLAIMS (blog-data.ts) ===\n");
console.log(`  BITS entities derived from isBits rows: ${bitsRowNames.length}`);
for (const n of bitsRowNames) console.log(`    · ${n}`);
console.log(`\n  findings in file           ${findings.length}`);
console.log(`  third-party / industry     ${findings.length - subjectClaims.length}  (not this gate's subject)`);
console.log(`  BITS-subject claims        ${subjectClaims.length}`);
console.log(`\n  Measured accuracy vs 46 hand-labelled findings:`);
console.log(`    precision 1.000   recall 0.706   12 TP / 0 FP / 5 FN / 29 TN`);
console.log(`    The 5 known misses are declared in this file's header.`);

if (subjectClaims.length) {
  console.log(`\n${subjectClaims.length} BITS-SUBJECT CLAIM(S):\n`);
  for (const f of subjectClaims) {
    console.log(`  ✖ ${FILE}:${f.line}  [${f.id}] row=${f.rowName}`);
    console.log(`      ${f.sentence.slice(0, 170)}`);
  }
  console.log("\n✖ blog-claims-subject FAILED — a claim about BITS asserts a control this repository cannot verify.");
  process.exit(1);
}

console.log("\n✔ no claim about BITS asserts an unverifiable control.");
console.log("  Third-party descriptions are out of scope by design: this repository cannot");
console.log("  adjudicate what Salesforce, Genesys or Bland AI do, and redacting true");
console.log("  statements about other companies' software is not the fix.");