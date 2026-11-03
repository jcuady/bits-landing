import { chromium } from "playwright";
import { startServer } from "./lib/serve.mjs";

/**
 * Test: the portfolio breadth band, and brandbook glassmorphism on cards.
 *
 * SEAMS UNDER TEST (public interfaces only):
 *
 *   1. HOMEPAGE  a portfolio band exists, names the three current
 *                products (Operations 360, BITS CRMPBX, HRMS), and every
 *                product it names links to a live page.
 *   2. GLASS     homepage cards carry the brandbook glass treatment —
 *                a backdrop blur, a translucent white fill, and the
 *                brandbook's own shadow tokens rather than ad-hoc values.
 *   3. NO DUP    the pricing section no longer repeats a product pill
 *                band, which would duplicate the new section.
 *   4. PREMIUM   Operations 360 keeps primacy: it is still the flagship
 *                and still leads the page.
 *
 * Expected values are literals from the product owner's brief and the
 * brandbook, not recomputed from the implementation.
 */

const CURRENT_PRODUCTS = ["Operations 360", "BITS CRMPBX", "BITS HRMS"];
const BRAND_GLASS_TOKENS = ["shadow-glass-card", "shadow-glass-lift"];

let failures = 0;
const fail = (m) => {
  failures++;
  console.error("  ✗ " + m);
};
const pass = (m) => console.log("  ✓ " + m);

async function run() {
  const { base: BASE, stop } = await startServer({});
  console.log(`  server: ${BASE}\n`);

  const browser = await chromium.launch({
    channel: process.env.PW_CHANNEL || "msedge",
    headless: true,
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  await context.addInitScript(() => {
    localStorage.setItem(
      "bits_cookie_consent_v1",
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() }),
    );
  });
  const page = await context.newPage();
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1500);

  // ── SEAM 1: the portfolio band ────────────────────────────────────────
  console.log("SEAM 1 — portfolio breadth band");
  const band = page.locator("#portfolio-band");
  if ((await band.count()) === 0) {
    fail("#portfolio-band does not exist on the homepage");
  } else {
    pass("#portfolio-band exists");
    const text = await band.innerText();
    for (const p of CURRENT_PRODUCTS) {
      if (!text.includes(p)) fail(`the band does not name ${p}`);
      else pass(`names ${p}`);
    }

    const hrefs = await band.locator("a[href]").evaluateAll((els) =>
      els.map((e) => e.getAttribute("href")),
    );
    const dead = [];
    for (const href of [...new Set(hrefs)]) {
      const r = await page.request.get(BASE + href, { maxRedirects: 0 });
      if (![200, 308].includes(r.status())) dead.push(`${href} -> ${r.status()}`);
    }
    if (dead.length) fail(`dead links in the band: ${dead.join(", ")}`);
    else pass(`all ${new Set(hrefs).size} band links resolve`);
  }

  // ── SEAM 2: brandbook glass on the cards ─────────────────────────────
  console.log("\nSEAM 2 — brandbook glassmorphism on cards");
  const cards = await page.locator("[data-glass-card]").count();
  if (cards === 0) fail("no cards carry the data-glass-card marker");
  else pass(`${cards} cards carry the glass treatment`);

  const glassAudit = await page.evaluate(() => {
    // Tailwind v4 renders opacity modifiers as `oklab(... / 0.4)`, not
    // `rgba(...)`. The alpha is whatever follows the last "/" in any modern
    // colour function, so parse it that way rather than assuming a format.
    const alphaOf = (color) => {
      if (!color) return 1;
      const slash = color.lastIndexOf("/");
      if (slash > -1) {
        const tail = color.slice(slash + 1).replace(")", "").trim();
        const a = parseFloat(tail);
        if (!Number.isNaN(a)) return a;
      }
      const m = color.match(/rgba?\(([^)]+)\)/);
      if (m) {
        const parts = m[1].split(",").map((x) => parseFloat(x));
        if (parts.length === 4) return parts[3];
      }
      return 1;
    };

    const out = { blur: 0, translucent: 0, total: 0, brandShadow: 0 };
    document.querySelectorAll("[data-glass-card]").forEach((el) => {
      out.total++;
      const cs = getComputedStyle(el);
      if (cs.backdropFilter && cs.backdropFilter !== "none") out.blur++;
      const a = alphaOf(cs.backgroundColor);
      if (a > 0 && a < 1) out.translucent++;
      // the brandbook glass card is 0 8px 32px -8px with a 1px inset highlight
      if (cs.boxShadow.includes("8px 32px -8px") && cs.boxShadow.includes("inset")) {
        out.brandShadow++;
      }
    });
    return out;
  });

  if (glassAudit.blur < glassAudit.total)
    fail(`${glassAudit.total - glassAudit.blur} glass cards have no backdrop blur`);
  else pass(`all ${glassAudit.total} glass cards have a backdrop blur`);

  if (glassAudit.translucent < glassAudit.total)
    fail(`${glassAudit.total - glassAudit.translucent} glass cards are not translucent`);
  else pass(`all ${glassAudit.total} glass cards have a translucent fill`);

  if (glassAudit.brandShadow < glassAudit.total)
    fail(
      `${glassAudit.total - glassAudit.brandShadow} glass cards do not use the brandbook glass shadow`,
    );
  else pass("glass cards use the brandbook glass shadow (0 8px 32px -8px + inset)");

  // ── SEAM 3: no duplication with pricing ───────────────────────────────
  console.log("\nSEAM 3 — no duplicated product band");
  await page.goto(BASE + "/pricing", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  const pricingText = await page.locator("body").innerText();
  if (pricingText.includes("Connected Software Products"))
    fail("the pricing page still carries a product pill band");
  else
    pass("the pricing product pill band is gone");

  // ── SEAM 4: Operations 360 keeps primacy ─────────────────────────────
  console.log("\nSEAM 4 — Operations 360 keeps primacy");
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  const homeText = await page.locator("body").innerText();
  if (!homeText.includes("Operations 360")) fail("Operations 360 must remain on the homepage");
  else pass("Operations 360 still on the homepage");

  const order = await page.evaluate(() => {
    const ids = [...document.querySelectorAll("main > section, main section[id]")]
      .map((el) => el.id)
      .filter(Boolean);
    return ids;
  });
  const bandAt = order.indexOf("portfolio-band");
  const platformAt = order.indexOf("platform-index");
  if (bandAt < 0) fail("portfolio band is not in the section order");
  else if (platformAt < 0 || bandAt < platformAt)
    fail("the portfolio band must come after the platform index, not before");
  else pass("portfolio band sits after the platform index");

  await browser.close();
  await stop();

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exit(1);
  }
  console.log("\nAll checks passed.");
}

run().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
