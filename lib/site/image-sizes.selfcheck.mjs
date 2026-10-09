#!/usr/bin/env node
/**
 * Image-delivery selfcheck.
 *
 * Lighthouse had never been run, so §34 measured the production build directly
 * with Playwright and found two defects that no gate in the repo could see:
 *
 *   1. `quality={95}` on the homepage hero. next.config.ts allows
 *      `images.qualities: [70, 75, 90]`. Next clamps an unlisted quality during
 *      SSR instead of erroring, so **no q=95 URL was ever emitted, the page
 *      rendered fine, and zero console errors were logged.** The setting was
 *      silently inert — the author believed they were getting q=95.
 *
 *   2. One decorative background (`/images/hero-sky-bg.jpg`) is used 12 times
 *      across the site at FOUR different qualities (70, 75, 90, 95). The image
 *      optimizer's cache key is (url, w, q), so each distinct quality is a
 *      distinct download of the same source file.
 *
 * This gate fails on (1) and reports on (2). It reads the allowed qualities
 * FROM next.config.ts rather than restating them — a duplicated list is a list
 * that drifts, which is how the two lists came to disagree in the first place.
 *
 * Run: node lib/site/image-sizes.selfcheck.mjs
 */

import { readFileSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const read = (p) => readFileSync(join(ROOT, p), "utf8");

const failures = [];
const report = [];

/* ── The configured quality allow-list, read from its source ─────────────── */
const nextConfig = read("next.config.ts");
const qualitiesBlock = nextConfig.match(/qualities:\s*\[([^\]]*)\]/);
if (!qualitiesBlock) {
  console.error("✖ could not read images.qualities from next.config.ts — refusing to guess");
  process.exit(1);
}
const ALLOWED = qualitiesBlock[1]
  .split(",")
  .map((s) => Number(s.trim()))
  .filter((n) => Number.isFinite(n));

/* ── Walk the source ─────────────────────────────────────────────────────── */
function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.tsx$/.test(p)) out.push(p);
  }
  return out;
}

const files = [...walk(join(ROOT, "app")), ...walk(join(ROOT, "components"))];

/**
 * Strip comments so a quality discussed in prose is not read as a setting.
 *
 * §104 — this carried §103's defective `//` guard, which skipped the first `//`
 * after a colon but not the second. Measured on the files it scans it truncated
 * lines such as `code: "FAMILY 01 // RECOVERY & VOICE"`, deleting the rest of the
 * line before any `<Image>` could be matched — a setting on the same line would
 * have been invisible. Now the shared implementation.
 */
import { stripComments } from "./security-claims.mjs";

/** Pull the props of every <Image .../> tag, keyed by its src. */
function imageTags(src) {
  const code = stripComments(src);
  const tags = [];
  const re = /<Image\b([\s\S]*?)\/>/g;
  for (const m of code.matchAll(re)) {
    const props = m[1];
    const s = (props.match(/src=\{?"([^"]+)"\}?/) || [])[1];
    if (!s) continue;
    tags.push({
      src: s,
      quality: props.match(/quality=\{?(\d+)\}?/)?.[1],
      sizes: props.match(/sizes="([^"]*)"/)?.[1],
      unoptimized: /(^|\s)unoptimized(\s|$|=)/.test(props),
      line: code.slice(0, m.index).split("\n").length,
    });
  }
  return tags;
}

/* ── Rule 1: every quality must be configured ───────────────────────────── */
const bySource = new Map();
let imageCount = 0;

for (const file of files) {
  const rel = file.replace(ROOT + "\\", "").replace(/\\/g, "/");
  for (const tag of imageTags(readFileSync(file, "utf8"))) {
    imageCount++;
    if (!bySource.has(tag.src)) bySource.set(tag.src, []);
    bySource.get(tag.src).push({ ...tag, file: rel });

    if (tag.quality !== undefined && !ALLOWED.includes(Number(tag.quality))) {
      failures.push(
        `${rel} (line ${tag.line}): quality={${tag.quality}} is not in next.config.ts ` +
          `images.qualities [${ALLOWED.join(", ")}]. Next clamps it during SSR, so the ` +
          `setting is silently ignored — no error, no effect. Use one of the configured ` +
          `values, or add ${tag.quality} to images.qualities deliberately.`
      );
    }
  }
}

/* ── Rule 2: report optimizer variants per source ───────────────────────── */
for (const [src, uses] of bySource) {
  const qualities = new Set(uses.map((u) => u.quality ?? "75"));
  const sizes = new Set(uses.map((u) => u.sizes ?? "(none)"));
  // `unoptimized` is CORRECT for SVG — the optimizer rasterises, and a vector
  // seal or mark should stay a vector. Flagging it would be crying wolf.
  const isVector = /\.svg$/i.test(src);
  const unoptimized = isVector ? 0 : uses.filter((u) => u.unoptimized).length;

  if (qualities.size > 1 || sizes.size > 1 || unoptimized > 0) {
    report.push({
      src,
      uses: uses.length,
      qualities: [...qualities].sort(),
      sizes: sizes.size,
      unoptimized,
      isVector,
      files: [...new Set(uses.map((u) => u.file))],
    });
  }
}

report.sort((a, b) => b.uses - a.uses);

if (failures.length) {
  console.error("✖ image-sizes selfcheck FAILED:\n");
  for (const f of failures) console.error(`  - ${f}`);
  console.error("");
  process.exit(1);
}

console.log(
  `✔ image-sizes selfcheck passed (${imageCount} <Image> across ${files.length} files; ` +
    `qualities [${ALLOWED.join(", ")}] read from next.config.ts)`
);

if (report.length) {
  console.log(
    `\n⚠ ${report.length} source image(s) split into multiple optimizer variants. ` +
      `The cache key is (url, w, q), so each extra combination is a separate download of the same file:`
  );
  for (const r of report.slice(0, 8)) {
    console.log(`\n  ${r.src}  —  ${r.uses} use(s)`);
    console.log(`      qualities: ${r.qualities.join(", ")}   sizes variants: ${r.sizes}`);
    if (r.unoptimized) console.log(`      ${r.unoptimized} unoptimized use(s) bypass the optimizer entirely`);
    if (r.isVector && r.unoptimized === 0) console.log(`      vector — unoptimized is correct, rasterising would be a downgrade`);
    console.log(`      ${r.files.join(", ")}`);
  }
}