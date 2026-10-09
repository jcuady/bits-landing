#!/usr/bin/env node
/**
 * Anchor + route integrity self-check.
 *
 * Guards against re-introducing dead in-app links. Reads the anchor/link
 * configuration and the rendered section tree, then asserts that every
 * in-page anchor resolves to a rendered `id` and every internal href resolves
 * to a real route.
 *
 * Run: node lib/site/link-integrity.selfcheck.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

function read(rel) {
  return readFileSync(join(ROOT, rel), "utf8");
}

/** "FloorShowcase" -> "floor-showcase" */
function kebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(entry)) out.push(full);
  }
  return out;
}

// --- 1. Discover real routes ------------------------------------------------
/**
 * Route groups in parentheses do NOT contribute a URL segment, EXCEPT when the
 * folder inside them does. `app/(crm)/app/leads/page.tsx` -> `/app/leads`.
 * `app/(marketing)/pricing/page.tsx` -> `/pricing`.
 */
function discoverRoutes() {
  const routes = new Map();
  const visit = (dir, segments = []) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        // A "(group)" folder is transparent: it adds no path segment.
        const next = entry.startsWith("(") ? segments : [...segments, entry];
        visit(full, next);
        continue;
      }
      if (!entry.endsWith("page.tsx")) continue;
      const tail = entry.replace(/page\.tsx$/, "").replace(/\/$/, "");
      const path = `/${[...segments, tail].filter(Boolean).join("/")}`;
      routes.set(path === "/" ? "/" : path.replace(/\/$/, ""), full);
    }
  };
  visit(join(ROOT, "app"));
  return routes;
}

const routes = discoverRoutes();

// Routes that are legitimately served by a rewrite/static file rather than a
// page.tsx. Keep in sync with next.config.ts rewrites + public/.
const REWRITE_ROUTES = new Set(["/brandbook", "/brandbook.html"]);

// --- 2. Discover rendered anchors -------------------------------------------
const renderedFiles = walk(join(ROOT, "app")).concat(
  walk(join(ROOT, "components"))
);
const renderedSource = renderedFiles.map((f) => readFileSync(f, "utf8")).join("\n");

const landingPage = read("app/(marketing)/page.tsx");

// Sections actually rendered on the landing page.
const renderedComponents = [
  ...landingPage.matchAll(/<([A-Z][A-Za-z0-9]*)\s*\/>/g),
].map((m) => m[1]);

// Resolve each component name to its file and collect its section ids.
const anchorIds = new Set();
for (const name of new Set(renderedComponents)) {
  for (const f of walk(join(ROOT, "components"))) {
    const base = f.split(/[\\/]/).pop().replace(/\.tsx$/, "");
    if (base !== kebab(name)) continue;
    const src = readFileSync(f, "utf8");
    for (const m of src.matchAll(/id="([a-z0-9-]+)"/g)) anchorIds.add(m[1]);
    // Marketing layout (header/footer) is present on every marketing page.
  }
}
// Header/footer anchors are part of the marketing layout.
for (const f of walk(join(ROOT, "components", "layout"))) {
  const src = readFileSync(f, "utf8");
  for (const m of src.matchAll(/id="([a-z0-9-]+)"/g)) anchorIds.add(m[1]);
}
// Section wrapper ids rendered via <Section id="..."> inside rendered components
for (const id of ["features", "features-hero", "product-families", "solution-finder"]) {
  if (renderedSource.includes(`id="${id}"`)) anchorIds.add(id);
}

// --- 3. Collect in-app links ------------------------------------------------
const linkSources = [
  "lib/site.ts",
  "components/layout/footer.tsx",
  "components/layout/header.tsx",
  // Also scan the demo shells — <Link href="..."> (next/link) was previously
  // missed because the check only matched `href: "..."` object literals.
  "components/products/product-shell.tsx",
  "components/products/demo-toolbar.tsx",
  "components/products/demo-ui.tsx",
  "app/demo/page.tsx",
  "app/(auth)/login/page.tsx",
];

const failures = [];

for (const rel of linkSources) {
  const src = read(rel);
  // Match BOTH object-literal config (`href: "/x"`) and JSX Link/router usage
  // (`href="/x"`). Missing the second form let a broken `/contact` CTA through.
  const re =
    /href:\s*"(\/#[a-z0-9-]+|\/[a-z0-9-]*)"|href="(\/#[a-z0-9-]+|\/[a-z0-9-]*)"|href:\s*'([^']+)'|href=\{["']([^"']+)["']\}/g;
  let m2;
  while ((m2 = re.exec(src)) !== null) {
    const target = m2[1] ?? m2[2] ?? m2[3] ?? m2[4];
    if (!target || !target.startsWith("/")) continue;
    // Skip dynamic/non-literal targets.
    if (target.includes("${") || target.includes("{")) continue;
    if (target.startsWith("/#")) {
      const id = target.slice(2);
      if (!anchorIds.has(id)) {
        failures.push(`${rel}: anchor "${target}" has no matching rendered section id`);
      }
    } else {
      const clean = target.split("#")[0].replace(/\/$/, "") || "/";
      if (
        clean !== "/" &&
        !routes.has(clean) &&
        !REWRITE_ROUTES.has(clean) &&
        !clean.startsWith("/blog/")
      ) {
        failures.push(`${rel}: route "${clean}" does not exist`);
      }
    }
  }
}

// --- 4. Product-detail links must match the real catalog -------------------
// Hardcoded "/products/<slug>" strings in sections drift from `bitsProducts`
// (this caught /products/sports-venue and /products/custom-engineering).
const siteSrc = readFileSync(join(ROOT, "lib", "site.ts"), "utf8");
const catStart = siteSrc.indexOf("export const bitsProducts");
const catEnd = siteSrc.indexOf("\nexport const", catStart + 10);
const catalogBody = siteSrc.slice(catStart, catEnd === -1 ? undefined : catEnd);
const knownSlugs = new Set(
  [...catalogBody.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1])
);
// generateStaticParams adds these beyond bitsProducts.
for (const extra of ["service", "sports-ai", "white-label"]) knownSlugs.add(extra);

// Some product URLs are dedicated routes (their own page.tsx) rather than
// catalog slugs — e.g. /products/crm is a standalone BITScrm Suite page.
const STANDALONE_PRODUCT_ROUTES = new Set(["crm"]);

for (const rel of [...linkSources, "components/sections/product-families.tsx"]) {
  const src = read(rel);
  for (const m of src.matchAll(/["'`]\/products\/([a-z0-9-]+)["'`]/g)) {
    const slug = m[1];
    if (STANDALONE_PRODUCT_ROUTES.has(slug)) continue;
    if (!knownSlugs.has(slug)) {
      failures.push(
        `${rel}: "/products/${slug}" is not in the bitsProducts catalog (known: ${[...knownSlugs].sort().join(", ")})`
      );
    }
  }
}

// --- 5. Assert CRM links point at real CRM routes ---------------------------
const crmFiles = walk(join(ROOT, "app"));
for (const f of crmFiles) {
  const src = readFileSync(f, "utf8");
  for (const m of src.matchAll(/href="(\/app\/[a-z0-9-]*)"/g)) {
    const target = m[1].replace(/\/$/, "");
    if (!routes.has(target)) {
      failures.push(`${f.replace(ROOT + "\\", "")}: CRM link "${m[1]}" has no matching route`);
    }
  }
}

// --- 6. Cross-page fragment targets must exist on the target page ------------
// A `/legal#form-terms` link passed the route check above because `/legal`
// exists — but the fragment had no matching element, so it silently did
// nothing. Resolve each `/page#frag` against the ids actually reachable from
// that page's module graph (page file + local imports + layout chain).
const RESOLVE_EXT = [".tsx", ".ts", ".jsx", ".js"];
const importCache = new Map();

function resolveImport(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) base = join(ROOT, spec.slice(2));
  else if (spec.startsWith(".")) base = resolve(dirname(fromFile), spec);
  else return null; // package import — not our module graph
  for (const ext of RESOLVE_EXT) {
    if (existsSync(base + ext)) return base + ext;
  }
  for (const ext of RESOLVE_EXT) {
    const idx = join(base, "index" + ext);
    if (existsSync(idx)) return idx;
  }
  return null;
}

function reachableIds(startFile) {
  if (importCache.has(startFile)) return importCache.get(startFile);
  const ids = new Set();
  const seen = new Set();
  const queue = [startFile];
  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file) || !existsSync(file)) continue;
    seen.add(file);
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
    for (const m of src.matchAll(/from\s+["']([^"']+)["']/g)) {
      const dep = resolveImport(m[1], file);
      if (dep) queue.push(dep);
    }
  }
  importCache.set(startFile, ids);
  return ids;
}

const pageIdCache = new Map();
function idsForRoute(path) {
  if (pageIdCache.has(path)) return pageIdCache.get(path);
  const pageFile = routes.get(path);
  const ids = pageFile ? reachableIds(pageFile) : null;
  pageIdCache.set(path, ids);
  return ids;
}

const allScanned = [...linkSources, ...renderedFiles.map((f) => f.replace(ROOT + "\\", ""))];
for (const rel of allScanned) {
  if (!existsSync(join(ROOT, rel))) continue;
  const src = read(rel);
  for (const m of src.matchAll(/href[=:]\s*["'`]([^"'`]*#[a-z0-9-]+)["'`]/g)) {
    const target = m[1];
    // §79 — `/#frag` used to `continue` here with the note "handled by the
    // landing-page check". That check only runs over `linkSources`, which is 7
    // files. Every OTHER app/ and components/ file was therefore scanned and
    // then skipped for exactly this link shape, so `app/(marketing)/products/
    // crm/page.tsx` shipped two `href="/#products-suite"` links to a section
    // that no longer renders — and the gate was green.
    //
    // The delegation was never wrong in principle, only incomplete in coverage.
    // Both loops now validate `/#frag` against `anchorIds`, so the shape is
    // checked everywhere rather than in the 7 files somebody remembered.
    if (target.startsWith("/#")) {
      const id = target.slice(2);
      if (!anchorIds.has(id)) {
        failures.push(`${rel}: anchor "${target}" has no matching rendered section id`);
      }
      continue;
    }
    const [path, frag] = target.split("#");
    const clean = path.replace(/\/$/, "") || "/";
    if (target.includes("${") || target.includes("{")) continue;
    if (clean === "/" || !routes.has(clean)) continue; // non-page target
    const ids = idsForRoute(clean);
    if (ids && !ids.has(frag)) {
      failures.push(`${rel}: "${target}" — page "${clean}" renders no element with id="${frag}"`);
    }
  }
}

// --- 7. Skip links must exist AND must resolve (WCAG 2.4.1) ------------------
// The check in section 6 skips bare fragments (`href="#content"`), because
// `clean` resolves to "/" and hits the `continue`. That silently exempted
// every skip link in the codebase — which is how `/demo` shipped with no skip
// link and no bypass target at all, despite rendering its own sticky header,
// a hero, 7 category pills and a search field before the engine grid.
//
// Two rules are enforced here:
//   A. Every route exposes an `id="content"` bypass target reachable from its
//      page module graph OR its layout chain (shells supply their own).
//   B. Every skip link that IS present resolves to a real id on that route.
//      A skip link pointing at nothing is worse than no skip link.
function reachableFiles(startFiles) {
  const files = new Set();
  const seen = new Set();
  const queue = [...startFiles];
  while (queue.length) {
    const file = queue.pop();
    if (seen.has(file) || !existsSync(file)) continue;
    seen.add(file);
    files.add(file);
    const src = readFileSync(file, "utf8");
    for (const m of src.matchAll(/from\s+["']([^"']+)["']/g)) {
      const dep = resolveImport(m[1], file);
      if (dep) queue.push(dep);
    }
  }
  return files;
}

/** Walk from a page file up through every layout.tsx that wraps it. */
function layoutChainFor(pageFile) {
  const out = [pageFile];
  const appRoot = join(ROOT, "app");
  let dir = dirname(pageFile);
  while (dir.startsWith(appRoot)) {
    const lf = join(dir, "layout.tsx");
    if (existsSync(lf)) out.push(lf);
    if (dir === appRoot) break;
    dir = dirname(dir);
  }
  return out;
}

let skipLinksChecked = 0;

for (const [path, pageFile] of routes) {
  // Dynamic-only routes ([slug], [id]) have no single concrete page file.
  if (!existsSync(pageFile)) continue;

  const files = reachableFiles(layoutChainFor(pageFile));
  let ids = new Set();
  let frags = new Set();
  for (const f of files) {
    const src = readFileSync(f, "utf8");
    for (const m of src.matchAll(/\sid="([^"]+)"/g)) ids.add(m[1]);
    for (const m of src.matchAll(/href[=:]\s*["'`]#([a-z0-9_-]+)["'`]/g)) frags.add(m[1]);
  }

  // Rule A — a bypass target must exist somewhere on the route.
  if (!ids.has("content")) {
    failures.push(
      `${path}: no bypass target — nothing in the page or its layout chain renders id="content" (WCAG 2.4.1)`
    );
  }

  // Rule B — every skip link present must resolve on this route.
  for (const frag of frags) {
    skipLinksChecked++;
    if (!ids.has(frag)) {
      failures.push(
        `${path}: skip link href="#${frag}" does not resolve — no element with id="${frag}" in the page or its layout chain`
      );
    }
  }
}

// --- 8. Report --------------------------------------------------------------
if (failures.length > 0) {
  console.error("✖ link-integrity selfcheck FAILED:\n");
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `✔ link-integrity selfcheck passed (${routes.size} routes, ${anchorIds.size} anchors, ${skipLinksChecked} skip links)`
);