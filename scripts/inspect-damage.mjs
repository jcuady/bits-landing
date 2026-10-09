/**
 * Inspect the raw bytes behind a U+FFFD, to decide whether the original
 * character is recoverable or was destroyed.
 *
 * Splits the BUFFER (not a decoded string) so invalid UTF-8 survives intact.
 * Run: node scripts/inspect-damage.mjs <file> <line> [line ...]
 */
import { readFileSync } from "node:fs";

const [file, ...lineNo] = process.argv.slice(2);
const lines = readFileSync(file).toString("latin1").split(/\r?\n/);

for (const n of lineNo.map(Number)) {
  const raw = lines[n - 1];
  const buf = Buffer.from(raw, "latin1");
  console.log(`\n--- line ${n} ---`);
  let firstHit = true;
  for (let i = 0; i < buf.length; i++) {
    if (buf[i] < 0x80) continue;
    const ctx = buf
      .slice(Math.max(0, i - 14), i + 15)
      .toString("latin1")
      .replace(/[^\x20-\x7e]/g, ".");
    const cp = buf[i];
    const asCp1252 =
      cp >= 0x80 ? String.fromCharCode(cp) : "";
    // A UTF-8 continuation/lead byte: if the sequence decodes cleanly it is real
    // UTF-8; if it yields U+FFFD the file contains an invalid byte.
    let decoded = "";
    try {
      decoded = new TextDecoder("utf-8", { fatal: true }).decode(buf.subarray(i, i + 3));
    } catch {
      decoded = "<invalid utf-8>";
    }
    console.log(
      `  off ${String(i).padStart(4)}  byte 0x${cp.toString(16).padStart(2, "0")}` +
        `  cp1252=${JSON.stringify(asCp1252)}` +
        `  utf8=${decoded}` +
        `   ...${ctx}...`
    );
    firstHit = false;
  }
  if (firstHit) console.log("  (no non-ASCII bytes on this line)");
}