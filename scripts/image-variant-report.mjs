/** Every <Image> usage of a given source, with the props that split the optimizer cache. */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const TARGET = process.argv[2] || "hero-sky-bg.jpg";

function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx$/.test(p)) out.push(p);
  }
  return out;
}

const files = [...walk("app"), ...walk("components")];
const hits = [];

for (const f of files) {
  const src = readFileSync(f, "utf8");
  let idx = 0;
  while (true) {
    const at = src.indexOf(TARGET, idx);
    if (at === -1) break;
    idx = at + 1;
    // Walk forward to the closing "/>" of this <Image .../> tag
    const open = src.lastIndexOf("<Image", at);
    const close = src.indexOf("/>", at);
    if (open === -1 || close === -1) continue;
    const tag = src.slice(open, close + 2);
    const line = src.slice(0, open).split("\n").length;
    hits.push({
      file: f,
      line,
      quality: (tag.match(/quality=\{?(\d+)\}?/) || [])[1] || "default(75)",
      sizes: (tag.match(/sizes="([^"]*)"/) || [])[1] || "NONE",
      fill: /\bfill\b/.test(tag),
      unoptimized: /unoptimized/.test(tag),
      opacity: (tag.match(/opacity-(\d+)/) || [])[1] || "100",
    });
  }
}

console.log(`<Image src containing "${TARGET}"> — ${hits.length} usage(s)\n`);
for (const h of hits) {
  console.log(`  ${h.file}:${h.line}`);
  console.log(`      quality=${h.quality}  sizes=${h.sizes}  fill=${h.fill}  opacity=${h.opacity}${h.unoptimized ? "  UNOPTIMIZED" : ""}`);
}

/* The optimizer cache key is (url, w, q). Count distinct keys per src. */
const keys = new Map();
for (const h of hits) {
  const k = `${TARGET}|${h.quality}`;
  keys.set(k, (keys.get(k) || 0) + 1);
}
console.log(`\ndistinct optimizer variants produced: ${keys.size}`);
for (const [k, n] of keys) console.log(`  ${k}  x${n} usage(s)`);
if (keys.size > 1) {
  console.log(`\n  Each variant is a separate download of the same source image.`);
}