/**
 * Compare the §33 character-class detector against the §37 round-trip detector
 * on the same file, so the correction to §33.5 rests on measurement.
 *
 * Run: node scripts/compare-detectors.mjs <file>
 */
import { readFileSync } from "node:fs";
import { findMojibake } from "../lib/site/encoding.mjs";

const CP = new TextDecoder("windows-1252");
const file = process.argv[2];
const text = readFileSync(file, "utf8");

/* The §33 approach: a class derived from the decoder, matched for 2+ chars. */
const CLASS =
  "[" +
  Array.from({ length: 128 }, (_, i) => {
    const c = CP.decode(Uint8Array.of(i + 0x80));
    return c.length === 1 && c.charCodeAt(0) >= 0x80
      ? "\\u" + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
      : "";
  }).join("") +
  "\\u0080-\\u00FF]";
const old = [...text.matchAll(new RegExp(`${CLASS}{2,}`, "g"))].map((m) => m[0]);
const real = findMojibake(text).map((f) => f.run);

const realSet = new Set(real);
const falsePositives = old.filter((r) => !realSet.has(r));

console.log(`file: ${file}\n`);
console.log(`§33 class-based detector : ${old.length} run(s)`);
console.log(`§37 round-trip detector  : ${real.length} run(s)`);
console.log(`false positives in §33  : ${falsePositives.length}`);

const tp = old.filter((r) => realSet.has(r));
console.log(`true positives in §33   : ${tp.length}`);

console.log(`\nreal mojibake (both agree):`);
for (const r of tp) console.log(`  ${JSON.stringify(r)}`);

console.log(`\nFALSE POSITIVES - ordinary prose flagged as corruption:`);
const counts = new Map();
for (const fp of falsePositives) counts.set(fp, (counts.get(fp) || 0) + 1);
for (const [run, n] of [...counts].sort((a, b) => b[1] - a[1])) {
  const cps = [...run].map((c) => "U+" + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, "0"));
  console.log(`  ${JSON.stringify(run)} x${n}  ${cps.join(" ")}`);
}

// Show one false positive in its sentence, so it is obviously legitimate.
if (falsePositives.length) {
  const i = text.indexOf(falsePositives[0]);
  console.log(`\nfirst false positive in context:\n  ${JSON.stringify(text.slice(i - 60, i + 40))}`);
}