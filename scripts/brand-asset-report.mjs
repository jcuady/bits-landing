/** Report brand-asset duplication, real dimensions, and delivered bytes. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const dir = "public/brand";
const files = readdirSync(dir).filter((f) => /\.(png|jpe?g|webp|svg)$/i.test(f));

/* PNG/JPEG intrinsic dimensions from the header, no image library needed. */
function dimensions(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
      }
      i += 2 + len;
    }
  }
  return null;
}

const rows = files.map((f) => {
  const buf = readFileSync(join(dir, f));
  const d = dimensions(buf);
  return {
    file: f,
    kb: Math.round(statSync(join(dir, f)).size / 1024),
    px: d ? `${d.w}x${d.h}` : "svg/unknown",
    megapixels: d ? +(d.w * d.h / 1e6).toFixed(1) : 0,
    sha: createHash("sha256").update(buf).digest("hex").slice(0, 12),
  };
});

/* Group byte-identical files. */
const byHash = new Map();
for (const r of rows) {
  if (!byHash.has(r.sha)) byHash.set(r.sha, []);
  byHash.get(r.sha).push(r);
}
const dupes = [...byHash.values()].filter((g) => g.length > 1);

console.log(`public/brand: ${rows.length} files, ${Math.round(rows.reduce((n, r) => n + r.kb, 0))} KB total\n`);

console.log("BYTE-IDENTICAL GROUPS");
let wastedKb = 0;
for (const g of dupes) {
  const keep = g[0];
  const waste = g.length - 1;
  wastedKb += waste * keep.kb;
  console.log(`  ${g.map((r) => r.file).join("  ==  ")}   (${keep.kb} KB each, ${waste} redundant -> ${waste * keep.kb} KB wasted)`);
}
console.log(`\n  redundant bytes recoverable: ${wastedKb} KB\n`);

console.log("LARGEST BY DIMENSION");
for (const r of rows.sort((a, b) => b.kb - a.kb).slice(0, 14)) {
  console.log(`  ${String(r.kb).padStart(5)} KB  ${r.px.padEnd(12)} ${r.megapixels ? r.megapixels + " MP" : "     "}  ${r.file}`);
}

const used = ["/brand/logo-horizontal.png", "/brand/logo-reverse.png"];
const usedRows = rows.filter((r) => used.some((u) => u.endsWith(r.file)));
const usedKb = usedRows.reduce((n, r) => n + r.kb, 0);
console.log(`\nUSED BY THE SITE: ${usedRows.map((r) => `${r.file} ${r.kb}KB ${r.px}`).join(", ")} = ${usedKb} KB`);
console.log(`A logo is text on a flat field. At ${usedRows[0]?.px} that is roughly ` +
  `${((usedRows[0]?.megapixels || 0) / 0.25).toFixed(0)}x more pixels than a 500px display slot needs.`);