/**
 * Static asset integrity check.
 *
 * Verifies that every local asset referenced from source (`src="/..."`,
 * `href="/..."` for files, next/image src, CSS url()) actually exists in
 * `public/` (or is an external URL / API route).
 *
 * A missing asset renders as a broken image at runtime and does not fail the
 * TypeScript build, so it needs its own guard.
 *
 * Run: node lib/site/asset-integrity.selfcheck.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const PUBLIC = join(ROOT, "public");

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?|css)$/.test(entry)) out.push(full);
  }
  return out;
}

const files = [
  ...walk(join(ROOT, "app")),
  ...walk(join(ROOT, "components")),
  ...walk(join(ROOT, "lib")),
];

// Extensions we treat as asset files (not routes).
const ASSET_EXT =
  /\.(png|jpe?g|svg|webp|avif|gif|ico|mp4|webm|woff2?|ttf|otf|json|txt|xml|html|pdf|csv)$/i;

// Paths served by Next.js itself rather than from public/.
const ROUTE_ENDPOINTS = new Set([
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.webmanifest",
]);

const failures = [];
const seen = new Set();

function rel(p) {
  return p.replace(ROOT + "\\", "").replace(ROOT + "/", "");
}

for (const f of files) {
  const src = readFileSync(f, "utf8");

  // src="/..." and href="/..." only when the value looks like a file.
  const re = /(?:src|href)\s*=\s*["'`](\/[^"'`\s]+)["'`]/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    let target = m[1].split("#")[0].split("?")[0];
    if (!target || !ASSET_EXT.test(target)) continue;
    if (ROUTE_ENDPOINTS.has(target)) continue;
    // Absolute public asset
    if (target.startsWith("/api/")) continue;

    const onDisk = join(PUBLIC, target.replace(/^\//, ""));
    if (existsSync(onDisk)) continue;

    // /products/<slug> is a dynamic route rendered from the catalog; not a file.
    if (target.startsWith("/products/")) continue;
    if (target.startsWith("/blog/")) continue;

    const key = `${rel(f)} -> ${target}`;
    if (seen.has(key)) continue;
    seen.add(key);
    failures.push(`${rel(f)}: references missing asset "${target}"`);
  }

  // CSS url(...) references
  if (f.endsWith(".css")) {
    const cre = /url\(\s*["']?(\/[^"')]+)["']?\s*\)/g;
    while ((m = cre.exec(src)) !== null) {
      const target = m[1].split("#")[0].split("?")[0];
      if (target.startsWith("/api/")) continue;
      const onDisk = join(PUBLIC, target.replace(/^\//, ""));
      if (existsSync(onDisk)) continue;
      const key = `${rel(f)} -> ${target}`;
      if (seen.has(key)) continue;
      seen.add(key);
      failures.push(`${rel(f)}: CSS references missing asset "${target}"`);
    }
  }
}

if (failures.length > 0) {
  console.error(`✖ asset-integrity FAILED (${failures.length} missing):\n`);
  for (const f of failures.slice(0, 40)) console.error(`  - ${f}`);
  if (failures.length > 40) console.error(`  … and ${failures.length - 40} more`);
  process.exit(1);
}

console.log(
  `✔ asset-integrity passed (${files.length} source files scanned, all referenced public assets exist)`
);