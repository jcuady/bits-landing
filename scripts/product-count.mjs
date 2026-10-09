/**
 * How many products does this site actually have?
 *
 * SYSTEM_AUDIT.md §43. The number 18 is asserted across a dozen documents and in
 * user-facing copy. Two catalogs exist — `bitsProducts` in lib/site.ts (the
 * marketing catalog the routes are generated from) and the registry in
 * lib/products/registry.ts (the product-line catalog the integrity gate checks).
 *
 * If those two disagree, then "18" is wrong for one of them and every document
 * citing it is wrong in the same direction, which is the hardest kind of
 * documentation error to notice.
 *
 * Run: node scripts/product-count.mjs
 */
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Slice out one `export const X = [...]` block from a TS source file. */
function sliceArray(src, name) {
  const start = src.indexOf(`export const ${name}`);
  if (start === -1) return null;
  const open = src.indexOf("[", start);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "[") depth++;
    else if (src[i] === "]") {
      depth--;
      if (depth === 0) return src.slice(open, i + 1);
    }
  }
  return src.slice(open);
}

/** Same, for an object literal. PRODUCT_REGISTRY is `{ "key": {...}, ... }`. */
function sliceObject(src, name) {
  const start = src.indexOf(`export const ${name}`);
  if (start === -1) return null;
  const open = src.indexOf("{", start);
  if (open === -1) return null;
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === "{") depth++;
    else if (src[i] === "}") {
      depth--;
      if (depth === 0) return src.slice(open, i + 1);
    }
  }
  return src.slice(open);
}

const countBy = (arr) =>
  arr.reduce((acc, v) => ((acc[v] = (acc[v] || 0) + 1), acc), {});

const siteSrc = readFileSync(join(ROOT, "lib", "site.ts"), "utf8");
const regSrc = readFileSync(join(ROOT, "lib", "products", "registry.ts"), "utf8");

const catalog = sliceArray(siteSrc, "bitsProducts");
const registry = sliceObject(regSrc, "PRODUCT_REGISTRY");

const idsOf = (block) => (block ? [...block.matchAll(/^\s+id:\s*"([^"]+)"/gm)].map((m) => m[1]) : []);
const keysOf = (block) => (block ? [...block.matchAll(/^\s{2}"?([a-z0-9_-]+)"?:\s*\{/gm)].map((m) => m[1]) : []);

const catalogIds = idsOf(catalog);
const registryIds = keysOf(registry);

console.log(`\nbitsProducts      (lib/site.ts, marketing catalog) : ${catalogIds.length}`);
console.log(`PRODUCT_REGISTRY  (lib/products/registry.ts, demo)  : ${registryIds.length}`);

/*
 * These two are not two answers to one question, and treating them as such is
 * the mistake this script was first written to catch.
 *
 *   bitsProducts      — what the site sells. 18 entries. `/products/<id>` is
 *                      generated from it and the sitemap advertises it.
 *   PRODUCT_REGISTRY  — what the /demo sandbox can be entered as. It adds
 *                      `sandboxStatus`, a demo path, and test personas. 19
 *                      entries, of which 6 are live and 14 planned.
 *
 * So "18 products" and "19 engines" are both true about different sets, and the
 * apparent contradiction is a naming problem, not a data problem.
 *
 * An earlier version of this script asserted that every `marketingUrl` must be
 * a `bitsProducts` slug, and reported three "dangling" URLs. All three were fine:
 * `/#operations-360` is a homepage anchor (id="operations-360" is present on the
 * rendered page) and `/bitsagent` is a real route at app/(marketing)/bitsagent.
 * Resolving links against the real route tree is `link-integrity.selfcheck`'s
 * job, and duplicating it here with a weaker rule only manufactures false
 * findings. The counts below are this script's actual contribution.
 */
console.log(`\n=== The two catalogs, side by side ===\n`);
console.log(`  marketing catalog (what the site sells) : ${catalogIds.length}`);
console.log(`  demo registry  (what /demo offers)      : ${registryIds.length}`);

const sandboxStatuses = [...regSrc.matchAll(/sandboxStatus:\s*"([^"]+)"/g)].map((m) => m[1]);
console.log(`  sandboxStatus breakdown                 : ${JSON.stringify(countBy(sandboxStatuses))}`);

/* Are the counts in user-facing copy true? */
console.log(`\n=== Claims in code and documentation ===\n`);

const surfaces = [
  ["app/layout.tsx", join(ROOT, "app", "layout.tsx")],
  ["public/index.md", join(ROOT, "public", "index.md")],
  ["public/llms.txt", join(ROOT, "public", "llms.txt")],
  ["README.md", join(ROOT, "README.md")],
];

const CLAIM = /\b(\d{1,2})\s+(?:business applications|products|product families|apps|engines|applications|tools)\b/gi;
const seen = new Map();

for (const [label, p] of surfaces) {
  let text;
  try {
    text = readFileSync(p, "utf8");
  } catch {
    continue;
  }
  for (const m of text.matchAll(CLAIM)) {
    const n = Number(m[1]);
    if (n < 5 || n > 40) continue;
    const line = text.slice(0, m.index).split("\n").length;
    if (!seen.has(n)) seen.set(n, []);
    seen.get(n).push(`${label}:${line}`);
  }
}

for (const [n, where] of [...seen.entries()].sort((a, b) => a[0] - b[0])) {
  console.log(`  "${n}"  ->  ${where.length} place(s): ${where.slice(0, 6).join(", ")}`);
}

console.log(`\n  actual catalog size: ${catalogIds.length}`);
console.log(
  [...seen.keys()]
    .filter((n) => n !== catalogIds.length)
    .length
    ? "  ==> At least one of these numbers is WRONG."
    : "  ==> Every number above matches the catalog."
);