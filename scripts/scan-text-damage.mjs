/**
 * Report encoding damage across the project (SYSTEM_AUDIT.md §37).
 *
 * This is the human-readable front end for the 18th gate. The gate is the
 * authority; this script exists so the gate's output can be explored without
 * reading a pass/fail line. Both import the detector AND the project scope from
 * lib/site/encoding.mjs, so the set of files reported here and the set of files
 * that fail the gate cannot drift apart.
 *
 * Run: node scripts/scan-text-damage.mjs [path ...]
 */
import { readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import {
  scanBuffer,
  isClean,
  listProjectTextFiles,
  walkProjectText,
} from "../lib/site/encoding.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
const files = args.length
  ? args
      .map((a) => {
        const p = join(ROOT, a);
        if (!existsSync(p)) return null;
        return statSync(p).isDirectory() ? [...walkProjectText(p)] : [p];
      })
      .flat()
      .filter(Boolean)
  : listProjectTextFiles(ROOT);

let damaged = 0;
const totals = { moji: 0, repl: 0, bom: 0, invalid: 0 };

for (const f of files) {
  let buf;
  try {
    buf = readFileSync(f);
  } catch {
    continue;
  }
  const scan = scanBuffer(buf);
  if (isClean(scan)) continue;

  damaged++;
  totals.moji += scan.mojibake.length;
  totals.repl += scan.replacementChars.length;
  totals.bom += scan.bom ? 1 : 0;
  totals.invalid += scan.invalidBytes;

  const text = buf.toString("utf8");
  const lineOf = (idx) => text.slice(0, idx).split("\n").length;
  const lines = text.split(/\r?\n/);

  console.log(`\n${relative(ROOT, f)}`);
  if (scan.bom) console.log("   UTF-8 BOM present (3 leading bytes EF BB BF)");
  if (scan.invalidBytes) console.log(`   ${scan.invalidBytes} byte(s) are not valid UTF-8`);

  if (scan.replacementChars.length) {
    console.log(`   ${scan.replacementChars.length} U+FFFD (unrecoverable - restore from context):`);
    const seen = new Set();
    for (const r of scan.replacementChars) {
      const ln = lineOf(r.index);
      if (seen.has(ln)) continue;
      seen.add(ln);
      console.log(`     line ${ln}: ${lines[ln - 1].trim().slice(0, 150)}`);
    }
  }
  if (scan.mojibake.length) {
    console.log(`   ${scan.mojibake.length} mojibake run(s) (recoverable):`);
    for (const m of scan.mojibake) {
      console.log(
        `     line ${lineOf(m.index)}: ${JSON.stringify(m.run)} should be ${JSON.stringify(m.fixed)}`
      );
    }
  }
}

console.log(
  `\n${files.length} file(s) scanned · ${damaged} damaged · ` +
    `${totals.moji} mojibake · ${totals.repl} U+FFFD · ${totals.bom} BOM · ${totals.invalid} invalid byte(s)`
);
process.exit(damaged ? 1 : 0);