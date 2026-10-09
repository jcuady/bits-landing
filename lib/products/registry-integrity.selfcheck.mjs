/**
 * Registry integrity check.
 *
 * Guarantees that every engine in PRODUCT_REGISTRY can actually be reached:
 *   - its marketingUrl resolves to a real page or product slug
 *   - its demoPath either exists as a route OR the product is listed in
 *     LIVE_SANDBOX_ROUTES (so the matrix does not link to a 404 sandbox)
 *
 * This is the guard that stops a registered-but-unimplemented engine from
 * advertising a "Live MVP" that 404s.
 *
 * Run: node lib/products/registry-integrity.selfcheck.mjs
 */

import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const registryPath = join(ROOT, "lib", "products", "registry.ts");
const demoPagePath = join(ROOT, "app", "demo", "page.tsx");

const src = readFileSync(registryPath, "utf8");

// ---- Parse registry entries ------------------------------------------------
const entries = [];
const entryRe = /^  "([a-z0-9-]+)": \{([\s\S]*?)^  \},/gm;
let m;
while ((m = entryRe.exec(src)) !== null) {
  const [, id, body] = m;
  entries.push({
    id,
    demoPath: (body.match(/demoPath: "([^"]+)"/) || [])[1],
    marketingUrl: (body.match(/marketingUrl: "([^"]+)"/) || [])[1],
    sandboxStatus: (body.match(/sandboxStatus: "(live|planned)"/) || [])[1],
  });
}

// Discover routes, but ALSO track which route groups produced them. This lets
// the checker tell a real sandbox ("/(products)/bitsagent" is absent) from a
// same-named marketing page ("app/(marketing)/bitsagent/page.tsx" -> "/bitsagent").
const routes = new Set();
const productsRoutes = new Set();
(function visit(dir, segments = [], inProducts = false) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      const nextInProducts = inProducts || entry === "(products)";
      visit(full, entry.startsWith("(") ? segments : [...segments, entry], nextInProducts);
      continue;
    }
    if (!entry.endsWith("page.tsx")) continue;
    const tail = entry.replace(/page\.tsx$/, "").replace(/\/$/, "");
    const p = `/${[...segments, tail].filter(Boolean).join("/")}`;
    const norm = p === "/" ? "/" : p.replace(/\/$/, "");
    routes.add(norm);
    if (inProducts) productsRoutes.add(norm);
  }
})(join(ROOT, "app"));

// ---- Products with real interactive sandboxes ------------------------------
const demoSrc = readFileSync(demoPagePath, "utf8");
const liveMap = {};
const liveBlock = demoSrc.match(/LIVE_SANDBOX_ROUTES[^=]*=\s*\{([\s\S]*?)\};/);
if (liveBlock) {
  for (const mm of liveBlock[1].matchAll(/"([a-z0-9-]+)":\s*"([^"]+)"/g)) {
    liveMap[mm[1]] = mm[2];
  }
}

const liveIds = new Set(["operations-360", ...Object.keys(liveMap)]);

// ---- Product slugs known to /products/[slug] ------------------------------
// NOTE: `bitsProducts` entries expose their slug as the `id` field, not `slug`.
// Scoped to the bitsProducts array so unrelated `id:` fields elsewhere in the
// file cannot pollute the set.
const siteSrc = readFileSync(join(ROOT, "lib", "site.ts"), "utf8");
const arrayStart = siteSrc.indexOf("bitsProducts");
const arrayBody =
  arrayStart >= 0
    ? siteSrc.slice(arrayStart, siteSrc.indexOf("\n];", arrayStart))
    : "";
const slugs = new Set(
  [...arrayBody.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)].map((x) => x[1])
);

// Extra slugs hard-coded by generateStaticParams().
for (const extra of ["service", "sports-ai", "white-label"]) slugs.add(extra);

const failures = [];

if (entries.length === 0) {
  failures.push("Registry parsing produced 0 entries — the parser needs updating.");
}

for (const e of entries) {
  // Every entry must declare a sandboxStatus.
  if (!e.sandboxStatus) {
    failures.push(`${e.id}: missing sandboxStatus ("live" | "planned").`);
    continue;
  }

  const clean = e.demoPath ? e.demoPath.replace("/(products)", "") || "/" : "";
  // A "route exists" check alone is not enough: a planned product's demoPath may
  // resolve to its own MARKETING page (e.g. bitsagent demoPath "/bitsagent" is
  // the marketing lander, not a sandbox). A demoPath is treated as a sandbox only
  // when it is namespaced under a "(products)" route group or points at the
  // CRM workspace ("/app").
  const isSandboxShaped =
    Boolean(e.demoPath) &&
    (e.demoPath.includes("/(products)/") || clean === "/app");
  // For "(products)" demo paths, require the route to live in the (products)
  // group — otherwise a marketing page with the same name would be mistaken for
  // a sandbox.
  const hasRoute = isSandboxShaped &&
    (clean === "/app" ? routes.has("/app") : productsRoutes.has(clean));

  if (e.sandboxStatus === "live") {
    // A live claim must be backed by a real route (or be the CRM workspace).
    const isWorkspace = e.id === "operations-360" && clean === "/app";
    if (!hasRoute && !isWorkspace) {
      failures.push(
        `${e.id}: sandboxStatus is "live" but "${e.demoPath}" has no matching route — the matrix would advertise a 404 sandbox.`
      );
    }
    if (!isWorkspace && hasRoute && !liveMap[e.id]) {
      failures.push(
        `${e.id}: a real route exists at "${clean}" but it is missing from LIVE_SANDBOX_ROUTES in app/demo/page.tsx, so the matrix sends users to /login instead of the sandbox.`
      );
    }
  } else if (hasRoute) {
    // `crm-collections` intentionally shares the CRM workspace route with
    // operations-360, so a real route without its own sandbox is fine there.
    // Any OTHER planned product with a route is a classification bug.
    const sharesWorkspace = e.id === "crm-collections" && clean === "/app";
    if (!sharesWorkspace) {
      failures.push(
        `${e.id}: sandboxStatus is "planned" but a route exists at "${clean}" — either promote it to "live" + LIVE_SANDBOX_ROUTES, or repoint demoPath.`
      );
    }
  }

  if (e.marketingUrl) {
    const path = e.marketingUrl.split("?")[0].replace(/\/$/, "") || "/";
    const known =
      routes.has(path) ||
      slugs.has(path.replace("/products/", "")) ||
      path === "/" ||
      path.startsWith("/#") ||
      existsSync(join(ROOT, path.replace(/^\//, "")));
    if (!known) {
      failures.push(
        `${e.id}: marketingUrl "${e.marketingUrl}" does not resolve to a route or known product slug.`
      );
    }
  }
}

const count = entries.length;
if (failures.length > 0) {
  console.error(`✖ registry-integrity FAILED (${count} engines):\n`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(
  `✔ registry-integrity passed (${count} engines, ${liveIds.size} with live sandboxes, ${routes.size} routes)`
);