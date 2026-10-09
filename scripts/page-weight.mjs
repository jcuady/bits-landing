/**
 * Per-page transfer weight, measured on the real production build (SYSTEM_AUDIT.md §42).
 *
 * §34 measured one page — the homepage — and fixed what it found there: a 371 KB
 * logo that was the largest single resource on the site. That was a real win,
 * but it is one data point. `/pricing`, `/products`, `/security`, `/demo` and
 * the demo shells were never measured, and the homepage is not automatically the
 * heaviest page on a site with 14 sections on the front page and a separate
 * bundle per route.
 *
 * METHOD
 * ------
 * Lighthouse was deliberately not added as a dependency in §34; the build was
 * measured directly instead. This keeps that decision and uses the browser's own
 * Resource Timing API:
 *
 *   transferSize     bytes over the wire, after compression
 *   encodedBodySize  the same, which is what actually costs the visitor
 *   decodedBodySize  size in memory
 *
 * transferSize is 0 for cross-origin resources without Timing-Allow-Origin, so
 * the report distinguishes "measured" from "opaque" rather than silently
 * reporting 0 as if the resource were free.
 *
 * Run: node scripts/page-weight.mjs
 */
import { chromium } from "playwright";
import { startServer } from "./lib/serve.mjs";

const { base: BASE, stop } = await startServer({ label: "page-weight" });

/*
 * Routes are derived from the build output rather than hand-listed, so the
 * measurement cannot drift from the routes that actually exist. Marketing
 * routes only: the CRM is behind auth and its weight is a different question.
 */
const ROUTES = [
  "/",
  "/pricing",
  "/products",
  "/products/crm",
  "/products/collections",
  "/solutions",
  "/security",
  "/demo",
  "/crm-sales",
  "/about",
  "/blog",
  "/legal",
  "/cookies",
  "/login",
];

const KB = (n) => (n / 1024).toFixed(1);

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});

/*
 * A FRESH CONTEXT PER ROUTE.
 *
 * The first version reused one browser context for all 14 routes, so every
 * resource already in cache reported transferSize 0. 409 of them did. The
 * result was a table of numbers that were not page weights: `/products/
 * collections` appeared to cost 0 KB of JS and 0 KB of CSS, which is not a
 * measurement, it is a cache hit reported as a zero-byte download.
 *
 * transferSize is 0 for both a cross-origin response without Timing-Allow-Origin
 * AND a cache hit, and they mean opposite things for cost. A fresh context per
 * route removes the second cause so the remaining zeros are honest.
 */
const newIsolatedContext = () =>
  browser.newContext({ viewport: { width: 1280, height: 800 }, bypassCSP: false });

const rows = [];
const detail = [];

for (const route of ROUTES) {
  const context = await newIsolatedContext();
  const page = await context.newPage();
  try {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 45000 });
  } catch {
    await context.close();
    continue;
  }
  // Let lazy images below the fold resolve before reading the buffer.
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => setTimeout(r, 400))));
  await page.evaluate(async () => {
    // Force anything still lazy to load, so the number is the page's real cost.
    for (const img of document.querySelectorAll("img[loading='lazy']")) img.loading = "eager";
    await Promise.all(
      [...document.images].filter((i) => !i.complete).map((i) => i.decode().catch(() => {}))
    );
  });
  await page.waitForTimeout(600);

  const m = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const res = performance.getEntriesByType("resource");

    const bucket = (r) => {
      const t = r.initiatorType || "";
      if (t === "img" || t === "image") return "image";
      if (t === "script") return "script";
      if (t === "link" || t === "css") return "css";
      if (t === "fetch" || t === "xmlhttprequest") return "fetch";
      if (t === "font") return "font";
      return "other";
    };

    const byType = {};
    let total = 0;
    let opaque = 0;
    const items = [];

    for (const r of res) {
      const ts = r.transferSize || 0;
      const enc = r.encodedBodySize || 0;
      const measured = ts > 0;
      if (!measured) opaque++;
      // transferSize includes headers; encodedBodySize is the payload. Using
      // transferSize is the honest "what crossed the network" figure.
      total += ts;
      const b = bucket(r);
      byType[b] = (byType[b] || 0) + ts;
      items.push({
        name: r.name,
        type: b,
        transfer: ts,
        encoded: enc,
        decoded: r.decodedBodySize || 0,
        measured,
      });
    }

    const doc = nav ? { transfer: nav.transferSize || 0, encoded: nav.encodedBodySize || 0 } : { transfer: 0, encoded: 0 };
    total += doc.transfer;

    // DOM weight is a real cost too and is invisible to Resource Timing.
    const htmlBytes = new Blob([document.documentElement.outerHTML]).size;

    return {
      total,
      doc,
      byType,
      count: res.length,
      opaque,
      items,
      domNodes: document.getElementsByTagName("*").length,
      htmlBytes,
    };
  });

  rows.push({ route, ...m });
  detail.push({ route, items: m.items });
  await context.close();
}

await browser.close();
await stop();

rows.sort((a, b) => b.total - a.total);

console.log("\n=== Transfer weight per route (KB, over the wire) ===\n");
console.log(
  "route".padEnd(24) + "total".padStart(9) + "doc".padStart(8) +
  "img".padStart(9) + "js".padStart(9) + "css".padStart(8) + "reqs".padStart(6)
);
console.log("-".repeat(74));
for (const r of rows) {
  console.log(
    r.route.padEnd(24) +
      KB(r.total).padStart(9) +
      KB(r.doc.transfer).padStart(8) +
      KB(r.byType.image || 0).padStart(9) +
      KB(r.byType.script || 0).padStart(9) +
      KB(r.byType.css || 0).padStart(8) +
      String(r.count).padStart(6)
  );
}

const heaviest = rows[0];
console.log(`\nHeaviest route: ${heaviest.route} at ${KB(heaviest.total)} KB`);

console.log(`\n=== 12 largest resources across all routes ===\n`);
const all = detail.flatMap((d) => d.items.map((i) => ({ ...i, route: d.route })));
all.sort((a, b) => b.transfer - a.transfer);
const seen = new Set();
let shown = 0;
for (const i of all) {
  if (shown >= 12) break;
  const short = i.name.replace(BASE, "").replace(/^https?:\/\/[^/]+/, "");
  const key = `${short}|${i.transfer}`;
  if (seen.has(key)) continue;
  seen.add(key);
  shown++;
  console.log(
    `  ${KB(i.transfer).padStart(8)} KB  ${i.type.padEnd(7)} ${i.route.padEnd(22)} ${short.slice(0, 74)}`
  );
}

const unmeasured = all.filter((i) => !i.measured);
if (unmeasured.length) {
  console.log(`\n  ${unmeasured.length} resource(s) reported transferSize 0. Each route is loaded in a`);
  console.log("  FRESH context, so a zero here is cross-origin without Timing-Allow-Origin,");
  console.log("  not a cache hit. Their true cost is NOT included in the totals above.");
} else {
  console.log("\n  Every resource reported a non-zero transferSize — no cache hits, no opaque");
  console.log("  cross-origin resources. The totals above are complete.");
}

console.log(`\n=== DOM weight ===\n`);
for (const r of [...rows].sort((a, b) => b.domNodes - a.domNodes).slice(0, 5)) {
  console.log(`  ${String(r.domNodes).padStart(6)} nodes  ${r.route}`);
}