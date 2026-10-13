/**
 * Encoding-damage detection, derived from the Windows-1252 decoder.
 *
 * WHY THIS EXISTS
 * ---------------
 * Two different defects need two different detectors, and conflating them is how
 * this audit nearly shipped a scanner that flags its own documentation.
 *
 *   1. MOJIBAKE - UTF-8 bytes were decoded as Windows-1252, then re-encoded as
 *      UTF-8. The file "looks" like UTF-8 and passes any encoding check, but
 *      contains the three-character sequence E2 80 93 (read as cp1252: a-hat,
 *      euro sign, right-double-quote) where it should contain U+2013 EN DASH.
 *      RECOVERABLE.
 *
 *   2. U+FFFD  - the original character was destroyed at write time and replaced
 *      by U+FFFD (the bytes EF BF BD). There is nothing left to round-trip.
 *      NOT RECOVERABLE; it must be restored from context by hand.
 *
 * WHY NOT A CHARACTER CLASS
 * --------------------------
 * The obvious implementation is "match 2+ characters that a cp1252 decoder could
 * have produced". That is wrong, and it was the defect in scripts/repair-mojibake.mjs
 * (SYSTEM_AUDIT.md §33) and in the first draft of the scan script.
 *
 * That class contains U+2014 (byte 0x97), U+2013 (0x96), U+00A7 (0xA7), U+00B7
 * (0xB7), U+2026 (0x85), U+2019 (0x92) - all legitimately used in this repo's
 * prose. A run of EN DASH + SECTION SIGN matches it. So the scanner reported
 * ordinary punctuation as corruption, and its "N residual runs still damaged"
 * line could be believed.
 *
 *   Measured: on the tree as it stood, that class flagged 6 ordinary en-dash /
 *   section references in docs/SYSTEM_AUDIT.md (for example a section-range
 *   reference written EN DASH SECTION SIGN) while detecting nothing the correct
 *   rule missed - because it was not measuring corruption at all.
 *
 * THE ACTUAL PROPERTY
 * -------------------
 * Mojibake is not "these characters look odd". Mojibake is: encode the run back
 * to cp1252 bytes, and those bytes form VALID UTF-8 naming a different,
 * more plausible character. That is a round-trip test, so it is derived from the
 * decoder rather than enumerated by hand, and it cannot fire on legitimate text:
 *
 *   EN DASH + SECTION SIGN -> 96 A7  -> invalid UTF-8, no lead byte    -> clean
 *   EM DASH                 -> 94     -> invalid UTF-8 on its own      -> clean
 *   3 chars                 -> E2 80 93 -> valid UTF-8 -> U+2013      -> MOJIBAKE
 *   3 chars                 -> E2 80 94 -> valid UTF-8 -> U+2014      -> MOJIBAKE
 *   4 chars                 -> F0 9F 8C B1 -> valid UTF-8 -> U+1F331  -> MOJIBAKE
 *
 * No character list is written anywhere in this file. Change the decoder and the
 * rules change with it.
 *
 * This file describes damage in BYTES rather than reproducing it. A detector that
 * embeds the mojibake it detects flags its own source, and a check that always
 * fails on itself is a check nobody runs.
 */

/** byte -> char, exactly as Windows-1252 decodes it. */
const CP1252 = new TextDecoder("windows-1252");

/** char -> byte, the inverse map. Built from the decoder, never hand-written. */
export const CHAR_TO_BYTE = (() => {
  const m = new Map();
  for (let b = 0; b < 256; b++) {
    const ch = CP1252.decode(Uint8Array.of(b));
    if (ch.length === 1 && !m.has(ch)) m.set(ch, b);
  }
  return m;
})();

const CTRL = (s) =>
  [...s].filter((c) => {
    const n = c.charCodeAt(0);
    return n < 9 || (n > 13 && n < 32);
  }).length;

/**
 * Try to read one run as mis-decoded UTF-8.
 * Returns the recovered string, or null when the run is legitimate.
 */
export function repairRun(run) {
  // Every character must be something a cp1252 byte could have produced,
  // otherwise the run contains a character that was never mis-decoded.
  const bytes = [];
  for (const ch of run) {
    const b = CHAR_TO_BYTE.get(ch);
    if (b === undefined) return null;
    bytes.push(b);
  }

  let decoded;
  try {
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
  } catch {
    return null; // not valid UTF-8 once re-encoded -> legitimate text
  }

  if (decoded === run) return null;
  // A repair must not invent more control characters than it removed.
  if (CTRL(decoded) > CTRL(run)) return null;
  // Every mojibake run decodes to at least one non-ASCII character. A run that
  // decodes to pure ASCII was not mojibake.
  if (!/[^\x00-\x7F]/.test(decoded)) return null;

  return decoded;
}

/** Maximal runs of 2+ non-ASCII characters. Mojibake never contains ASCII. */
const RUN = /[^\x00-\x7F]{2,}/g;

/** Every mojibake run in `text`, with what it should be. */
export function findMojibake(text) {
  const out = [];
  for (const m of text.matchAll(RUN)) {
    const fixed = repairRun(m[0]);
    if (fixed !== null) {
      out.push({ run: m[0], fixed, index: m.index, length: m[0].length });
    }
  }
  return out;
}

/** Count of mojibake runs. Zero means clean. */
export function countMojibake(text) {
  return findMojibake(text).length;
}

/**
 * U+FFFD is unrecoverable data loss, so it is reported separately from mojibake
 * and never "repaired" automatically.
 */
/* Built from the code point, never written as a literal: this module exists to
 * find that character, and embedding it in its own source makes the module fail
 * its own gate. Same reasoning as the BOM below. */
export const REPLACEMENT_CHAR = String.fromCharCode(0xfffd);
export function findReplacementChars(text) {
  const out = [];
  let i = text.indexOf(REPLACEMENT_CHAR);
  while (i !== -1) {
    out.push({ index: i, context: text.slice(Math.max(0, i - 30), i + 30) });
    i = text.indexOf(REPLACEMENT_CHAR, i + 1);
  }
  return out;
}

/* U+FEFF written as an escape, never as a literal: an invisible character in
 * source is exactly the kind of thing this module exists to catch. */
export const BOM = String.fromCharCode(0xfeff);

export function hasBom(buf) {
  const b = Buffer.isBuffer(buf) ? buf : Buffer.from(buf, "utf8");
  return b.length >= 3 && b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf;
}

/** Strip a leading BOM. Returns the string unchanged when there is none. */
export function stripBom(text) {
  return text.startsWith(BOM) ? text.slice(1) : text;
}

/**
 * Decodes a buffer as UTF-8 and reports whether it contains bytes that are not
 * valid UTF-8. A file with invalid UTF-8 cannot round-trip through any editor,
 * so it is damage even though Node will silently substitute U+FFFD for us.
 */
export function invalidUtf8Bytes(buf) {
  try {
    new TextDecoder("utf-8", { fatal: true }).decode(buf);
    return 0;
  } catch (e) {
    // Count how much of it is broken by comparing lengths of lossy vs strict read.
    const lossy = Buffer.from(buf.toString("utf8"), "utf8").length;
    return Math.max(1, buf.length - lossy);
  }
}

/* ── Project scope ─────────────────────────────────────────────────────────
 * One definition, used by both the report script and the gate. Two copies of
 * "which files do we check" is how a gate ends up checking nothing: the list
 * drifts, the narrower copy wins, and the run reports clean.
 */
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/*
 * Third-party trees are excluded on purpose. .agents and .h3-source ship their
 * own lossy encodings and vendored bundles; a scanner that flags them trains you
 * to ignore the scanner. Measured on an unscoped walk: 64 damaged files, of which
 * 1 was ours and 63 were a Python virtualenv, a HuggingFace tokenizer, and a
 * Playwright bundle.
 */
export const SKIP_DIRS = new Set([
  "node_modules", ".git", ".next", "out", ".vercel", ".agents", ".h3-source",
  "coverage", ".turbo", "dist",
]);

export const TEXT_EXTS = new Set([
  ".md", ".mdx", ".tsx", ".ts", ".mjs", ".cjs", ".js", ".json",
  ".css", ".txt", ".yml", ".yaml", ".webmanifest",
]);

export const MAX_FILE_BYTES = 4_000_000;

/** Recursively yield project text files under `dir`. */
export function* walkProjectText(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walkProjectText(p);
    else if (TEXT_EXTS.has(extnameOf(e.name))) {
      try {
        if (statSync(p).size < MAX_FILE_BYTES) yield p;
      } catch {}
    }
  }
}

function extnameOf(name) {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
}

/** Every text file the gate is responsible for. */
export function listProjectTextFiles(root) {
  return [...walkProjectText(root)];
}

/**
 * All four defects for one buffer, in one pass.
 * Returns a plain object so callers can report whichever fields they care about.
 */
export function scanBuffer(buf) {
  const text = buf.toString("utf8");
  return {
    bom: hasBom(buf),
    invalidBytes: invalidUtf8Bytes(buf),
    replacementChars: findReplacementChars(text),
    mojibake: findMojibake(text),
  };
}

export function isClean(scan) {
  return (
    !scan.bom &&
    scan.invalidBytes === 0 &&
    scan.replacementChars.length === 0 &&
    scan.mojibake.length === 0
  );
}