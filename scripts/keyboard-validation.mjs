/**
 * Keyboard / bypass-blocks verification. READ-ONLY: navigates and presses keys,
 * clicks nothing that mutates data, submits nothing.
 *
 * Verifies on real routes:
 *  1. The first Tab stop is a skip link (WCAG 2.4.1)
 *  2. Activating it actually moves focus to the #content target
 *  3. Counts the tab stops a keyboard user must traverse BEFORE main content
 *  4. Footer pill links resolve to real targets on non-home pages
 *
 * Starts its own `next start` on a free port, like scripts/crm-e2e.mjs. Set
 * RESPONSIVE_BASE_URL to point it at an instance you are managing yourself.
 */
import { chromium } from "playwright";
import { startServer } from "./lib/serve.mjs";

const { base: BASE, stop } = await startServer({
  explicitBase: process.env.RESPONSIVE_BASE_URL,
  label: "keyboard",
});

const ROUTES = [
  "/",
  "/demo",
  "/pricing",
  "/products",
  "/blog",
  "/security",
  "/legal",
  "/cookies",
  "/crm-sales",
  "/login",
];

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let failures = 0;
console.log("route".padEnd(14) + "skipFirst".padEnd(11) + "focusMoves".padEnd(12) + "tabStopsBeforeMain");
console.log("-".repeat(70));

for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: "networkidle" });

  // Tab once from the top of the document.
  await page.evaluate(() => document.body.focus());
  await page.keyboard.press("Tab");

  const first = await page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    return {
      tag: el.tagName,
      text: (el.textContent || "").trim().slice(0, 40),
      href: el.getAttribute("href"),
    };
  });

  const isSkip = !!first && /skip/i.test(first.text || "");

  // Activate it, then Tab once more. Browsers implement fragment navigation by
  // moving the SEQUENTIAL FOCUS NAVIGATION STARTING POINT rather than by
  // changing `document.activeElement`, so checking activeElement immediately
  // after Enter produces a false negative. What actually matters is where the
  // NEXT Tab lands.
  let moved = false;
  if (isSkip) {
    await page.keyboard.press("Enter");
    await page.waitForTimeout(350);
    await page.keyboard.press("Tab");
    moved = await page.evaluate(() => {
      const el = document.activeElement;
      const target = document.getElementById("content");
      if (!target) return false;
      return el === target || !!el?.closest?.("#content") || target.contains(el);
    });
  }

  // Count tab stops before the main content region.
  const before = await page.evaluate(() => {
    const main = document.getElementById("content");
    if (!main) return -1;
    const sel =
      'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';
    const all = [...document.querySelectorAll(sel)].filter((e) => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });
    let n = 0;
    for (const e of all) {
      if (main.contains(e)) break;
      n++;
    }
    return n;
  });

  // A route passes if EITHER the skip link works, OR there is nothing to
  // bypass (zero focusable stops before main content). A bare `/login` form
  // with no header needs no skip link — WCAG 2.4.1 targets repeated blocks.
  const pass = (isSkip && moved) || before === 0;
  if (!pass) failures++;
  console.log(
    route.padEnd(14) +
      String(isSkip).padEnd(11) +
      String(moved).padEnd(12) +
      String(before).padEnd(16) +
      (pass ? "PASS" : "FAIL")
  );
}

// Footer pill targets on a non-home page
console.log("\nfooter pills on /pricing (must resolve to real targets):");
await page.goto(BASE + "/pricing", { waitUntil: "networkidle" });
const pills = await page.evaluate(() => {
  const out = [];
  for (const a of document.querySelectorAll("footer a[href*='#']")) {
    const href = a.getAttribute("href");
    const label = (a.textContent || "").trim();
    if (!href || href === "#") continue;

    let resolves;
    if (href.startsWith("/#")) {
      // Absolute home anchor: resolved statically by link-integrity.selfcheck
      // against the homepage's real section ids. Not queryable from here.
      resolves = true;
    } else if (href.startsWith("#")) {
      resolves = !!document.getElementById(href.slice(1));
    } else {
      // e.g. "/legal#privacy" — a different page; validated statically.
      resolves = true;
    }
    out.push({ label, href, resolves });
  }
  return out;
});
for (const p of pills) {
  if (!p.resolves) failures++;
  console.log(`  ${p.resolves ? "OK  " : "DEAD"} ${p.label.padEnd(12)} -> ${p.href}`);
}

await browser.close();
await stop();

console.log(failures === 0 ? "\nKEYBOARD CHECK: PASS" : `\nKEYBOARD CHECK: ${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);