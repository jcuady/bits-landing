/**
 * Sitemap coverage check.
 *
 * Verifies two directions against the running route tree:
 *   1. Every URL the sitemap advertises maps to a real, indexable route.
 *   2. Every indexable public route appears in the sitemap (no orphaned pages).
 *
 * Private/auth/demo sandboxes are intentionally excluded — they must NOT be
 * advertised to search engines.
 *
 * Run: node lib/site/sitemap-coverage.selfcheck.mjs
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

const sitemapSrc = readFileSync(join(ROOT, "app", "sitemap.ts"), "utf8");
const siteSrc = readFileSync(join(ROOT, "lib", "site.ts"), "utf8");
const blogSrc = readFileSync(join(ROOT, "lib", "blog-data.ts"), "utf8");

// ---- Routes the sitemap will advertise ------------------------------------
const productIds = (() => {
  const start = siteSrc.indexOf("export const bitsProducts");
  const end = siteSrc.indexOf("\nexport const", start + 10);
  const body = siteSrc.slice(start, end === -1 ? undefined : end);
  return [...body.matchAll(/^\s+id: "([^"]+)"/gm)].map((m) => m[1]);
})();

const blogSlugs = [...blogSrc.matchAll(/^\s+slug: "([^"]+)"/gm)].map((m) => m[1]);

const staticUrls = [...sitemapSrc.matchAll(/url: `\$\{site\.url\}(\/[^`]*)?`/g)]
  .map((m) => m[1] || "/")
  // Drop template placeholders such as `/products/${p.id}` and
  // `/blog/${post.slug}`. They are produced by `.map()` calls and are expanded
  // separately below from the real catalog/blog arrays, so counting the raw
  // placeholder both inflated the total and let a phantom path satisfy
  // `routeExists` — `${p.id}` is a perfectly well-formed dynamic segment as far
  // as the route matcher is concerned.
  //
  // The `?` on the capture group matters: `url: `${site.url}`` (the homepage)
  // has no trailing slash, so a mandatory `\/` silently dropped the homepage
  // from the advertised set — and `/` is excluded from the indexable check, so
  // nothing noticed the hole.
  .filter((u) => !u.includes("${"));

const advertised = new Set([
  ...staticUrls,
  ...productIds.map((id) => `/products/${id}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
]);

// ---- Real routes on disk ---------------------------------------------------
// Dynamic segments ([slug]) are recorded so that an expanded concrete path
// (/products/<id>, /blog/<slug>) can be matched against its pattern.
const routes = new Set();
const dynamicPatterns = [];
(function visit(dir, segments = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      visit(full, entry.startsWith("(") ? segments : [...segments, entry]);
      continue;
    }
    if (!entry.endsWith("page.tsx")) continue;
    const tail = entry.replace(/page\.tsx$/, "").replace(/\/$/, "");
    const segs = [...segments, tail].filter(Boolean);
    const p = `/${segs.join("/")}`;
    if (p === "/" || !p.includes("[")) {
      routes.add(p === "/" ? "/" : p.replace(/\/$/, ""));
    } else {
      // e.g. "/products/[slug]" -> pattern ^\/products\/[^/]+$
      const pattern = new RegExp(
        "^/" +
          segs
            .map((sg) => (sg.startsWith("[") ? "[^/]+" : sg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")))
            .join("/") +
          "$"
      );
      dynamicPatterns.push({ raw: `/${segs.join("/")}`, pattern });
    }
  }
})(join(ROOT, "app"));

/** True when a concrete URL matches a real (static or dynamic) route. */
function routeExists(path) {
  if (routes.has(path)) return true;
  return dynamicPatterns.some((d) => d.pattern.test(path));
}

// ---- Routes that must never be indexed ------------------------------------
const PRIVATE_PREFIXES = ["/app", "/login", "/forgot-password", "/demo", "/crm-sales", "/crm-support", "/crm-marketing", "/crm-commerce"];

const indexable = [...routes].filter(
  (r) => r !== "/" && !PRIVATE_PREFIXES.some((p) => r === p || r.startsWith(`${p}/`))
);

// Dynamic patterns are represented by their concrete expansions from the
// catalog arrays, so they are not reported as "missing".
const missingFromSitemap = indexable.filter((r) => !advertised.has(r));

const failures = [];

// 0. The homepage must be advertised. It is excluded from `indexable` (a route
//    is never "missing from" itself) and from check 1, so without this explicit
//    assertion a sitemap that dropped `/` entirely would still pass — verified
//    by removing the entry and re-running this gate.
if (!advertised.has("/")) {
  failures.push('sitemap does not advertise the homepage "/"');
}

// 1. Advertised but non-existent (matched against static + dynamic routes).
for (const url of advertised) {
  if (url === "/" || url === "/brandbook") continue; // rewrite/static
  if (!routeExists(url)) {
    failures.push(`sitemap advertises "${url}" but no such route exists`);
  }
}

// 2. Real but unadvertised indexable routes.
for (const r of missingFromSitemap) {
  failures.push(`route "${r}" is indexable but missing from the sitemap`);
}

// 3. Private sandboxes must not be advertised.
for (const url of advertised) {
  if (PRIVATE_PREFIXES.some((p) => url === p || url.startsWith(`${p}/`))) {
    failures.push(`sitemap advertises private route "${url}"`);
  }
}

if (failures.length > 0) {
  console.error(`✖ sitemap-coverage FAILED (${advertised.size} advertised, ${routes.size} routes):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `✔ sitemap-coverage passed (${advertised.size} URLs advertised, all resolve; ${indexable.length} indexable routes all covered)`
);