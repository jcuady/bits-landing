/**
 * Full SEO metadata sweep across every indexable public route.
 *
 * Earlier passes spot-checked ~20 routes. This walks the entire sitemap plus the
 * auth routes and asserts, per URL:
 *   - HTTP 200
 *   - exactly one <h1>
 *   - a non-empty <title> of sane length
 *   - a non-empty meta description
 *   - a canonical link resolving to an absolute URL
 *   - an og:image
 *   - no browser console errors
 *
 * READ-ONLY. Run against a production build.
 * Usage: node scripts/metadata-sweep.mjs   (RESPONSIVE_BASE_URL overrides base)
 */
import { chromium } from "playwright";

const BASE = process.env.RESPONSIVE_BASE_URL ?? "http://localhost:3847";

let failures = 0;
const rows = [];

// Discover the indexable surface from the live sitemap so this sweep cannot
// silently fall behind the site's own SEO output.
const sitemapRes = await fetch(`${BASE}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`FATAL: /sitemap.xml returned ${sitemapRes.status}`);
  process.exit(2);
}
const sitemapXml = await sitemapRes.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

// Auth routes are deliberately not in the sitemap but must still be well-formed.
const extra = [`${BASE}/login`, `${BASE}/forgot-password`];

// The sitemap advertises ABSOLUTE production URLs (https://www.boundlessits.com/…),
// which do not match the local origin. Map every path onto the running base,
// and assert that we actually swept as many routes as the sitemap advertises —
// a sweep that silently covers 2 of 38 routes while reporting PASS is worse
// than no sweep at all.
const toLocal = (u) => {
  try {
    const p = new URL(u).pathname + new URL(u).search;
    return `${BASE}${p}`;
  } catch {
    return u.startsWith("/") ? `${BASE}${u}` : u;
  }
};

const urls = [...new Set([...sitemapUrls.map(toLocal), ...extra])];

if (urls.length !== sitemapUrls.length + extra.length) {
  console.error(
    `FATAL: expected ${sitemapUrls.length + extra.length} routes but built ${urls.length} — refusing to report a partial sweep as a pass`
  );
  process.exit(2);
}

console.log(`sweeping ${urls.length} routes (${sitemapUrls.length} sitemap URLs, ${extra.length} auth)\n`);

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});

for (const url of urls) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text().slice(0, 120));
  });
  page.on("pageerror", (e) => consoleErrors.push("pageerror: " + String(e).slice(0, 120)));

  let status = 0;
  const problems = [];
  let info = {};

  try {
    const resp = await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
    status = resp?.status() ?? 0;
    if (status !== 200) problems.push(`status ${status}`);

    info = await page.evaluate(() => {
      const title = document.title?.trim() ?? "";
      const desc =
        document.querySelector('meta[name="description"]')?.getAttribute("content")?.trim() ?? "";
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "";
      const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";
      const h1s = [...document.querySelectorAll("h1")].map((h) => h.textContent?.trim() ?? "");
      return { title, desc, canonical, ogImage, h1Count: h1s.length, h1s };
    });

    if (info.h1Count !== 1) {
      problems.push(`h1 count ${info.h1Count} ${JSON.stringify(info.h1s).slice(0, 60)}`);
    }
    if (!info.title) problems.push("missing <title>");
    else if (info.title.length < 10 || info.title.length > 70)
      // 70 is a HEURISTIC, not a published Google limit — SERP truncation is
      // pixel-based (~600px) and varies with the font, so no character count is
      // authoritative. 70 is the point past which truncation is reliable for
      // typical title fonts, so it is a useful tripwire without being false.
      problems.push(`title length ${info.title.length} (over 70 — expect SERP truncation)`);
    // A page that already carries the brand suffix gets the layout template
    // ("%s | BITS") appended on top, producing "| BITS | BITS" or
    // "| BITS Intelligence Labs | BITS". Always wrong, and it also inflates
    // the length so the character budget check alone never catches it.
    else if (/(?:\|\s*BITS)\s*(?:\|\s*BITS)/i.test(info.title)) {
      problems.push(`duplicated brand suffix: "${info.title}"`);
    }
    if (!info.desc) problems.push("missing meta description");
    else if (info.desc.length < 50) problems.push(`description only ${info.desc.length} chars`);
    if (!info.canonical) problems.push("missing canonical");
    else if (!/^https?:\/\//.test(info.canonical))
      problems.push(`canonical not absolute: ${info.canonical}`);
    if (!info.ogImage) problems.push("missing og:image");
    if (consoleErrors.length) problems.push(`${consoleErrors.length} console error(s)`);
  } catch (err) {
    const msg = String(err?.message ?? err);
    // An infrastructure failure is NOT a metadata defect. A dead server would
    // otherwise be reported as "29/38 routes have problems", which is both
    // wrong and alarming. Stop immediately with a clear cause.
    if (/ERR_CONNECTION_REFUSED|ERR_CONNECTION_RESET|ERR_EMPTY_RESPONSE|Timeout/i.test(msg)) {
      console.error(
        `\nABORT: lost the server while sweeping ${path}.\n` +
          `       ${msg.slice(0, 140)}\n` +
          `       This is an infrastructure failure, not a page defect — re-run against a healthy server.`
      );
      console.error(`       ${rows.length} routes were checked before the failure.`);
      await browser.close().catch(() => {});
      process.exit(3);
    }
    problems.push("threw: " + msg.slice(0, 100));
  }

  const path = url.replace(BASE, "") || "/";
  const verdict = problems.length === 0 ? "PASS" : "FAIL";
  if (problems.length) failures++;
  rows.push({ path, status, title: info.title?.slice(0, 40) ?? "", problems });

  console.log(
    `${verdict.padEnd(5)} ${String(status).padEnd(4)} ${path.padEnd(46)}` +
      (problems.length ? `\n        ${problems.join("\n        ")}` : "")
  );
  if (consoleErrors.length && problems.length) {
    console.log(`        first console error: ${consoleErrors[0]}`);
  }
  await page.close();
}

await browser.close();

console.log(
  failures === 0
    ? `\nMETADATA SWEEP: PASS — ${urls.length} routes clean`
    : `\nMETADATA SWEEP: ${failures}/${urls.length} routes have problems`
);
process.exit(failures === 0 ? 0 : 1);