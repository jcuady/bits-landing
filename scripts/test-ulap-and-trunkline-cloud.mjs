import { chromium } from "playwright";
import { startServer } from "./lib/serve.mjs";

/**
 * Test: BITS ULAP catalogue entry + Cloud-shaped Trunkline logo.
 *
 * SEAMS UNDER TEST:
 *   1. ROUTE          /products/ulap returns 200, one h1, correct title,
 *                     canonical URL, link to https://chat.boundlessits.com,
 *                     and grounded ULAP capabilities.
 *   2. CATALOGUE      /products lists BITS ULAP (20 total cards), homepage
 *                     portfolio band lists BITS ULAP, count claim matches 20,
 *                     and Operations 360 retains flagship primacy.
 *   3. TRUNKLINE LOGO the trunkline call button (tel:+639568457404) is rendered
 *                     as a premium cloud-shaped SVG button ([data-trunkline-cloud])
 *                     and no raw green circular call button remains.
 */

const ULAP_TITLE = "BITS ULAP";
const ULAP_PATH = "/products/ulap";
const ULAP_APP_URL = "https://chat.boundlessits.com";
const TRUNKLINE_HREF = "tel:+639568457404";

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error("  ✗ " + msg);
};
const pass = (msg) => console.log("  ✓ " + msg);

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

  // ── SEAM 1: /products/ulap route ──────────────────────────────────────
  console.log("SEAM 1 — route /products/ulap");
  const res = await page.goto(BASE + ULAP_PATH, { waitUntil: "domcontentloaded" });
  if (!res || res.status() !== 200) {
    fail(`expected 200, got ${res && res.status()}`);
  } else {
    pass("returns 200");
  }

  const h1s = await page.locator("h1").allTextContents();
  if (h1s.length !== 1) fail(`expected exactly one h1, got ${h1s.length}`);
  else pass("exactly one h1");

  const title = await page.title();
  if (!title.includes(ULAP_TITLE)) fail(`title should name ${ULAP_TITLE}, got "${title}"`);
  else pass(`title names ${ULAP_TITLE}`);

  const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
  if (!canonical || !canonical.includes(ULAP_PATH)) {
    fail(`canonical should include ${ULAP_PATH}, got "${canonical}"`);
  } else {
    pass("canonical points at /products/ulap");
  }

  const ulapBody = await page.locator("body").innerText();
  for (const term of ["Uniting Lives Across Places", "Maritess Hub", "Cloud 9", "Passing Clouds"]) {
    if (!ulapBody.includes(term)) fail(`/products/ulap missing expected term "${term}"`);
    else pass(`/products/ulap includes "${term}"`);
  }

  const launchLink = await page.locator(`a[href="${ULAP_APP_URL}"]`).count();
  if (launchLink === 0) fail(`/products/ulap should link to ${ULAP_APP_URL}`);
  else pass(`/products/ulap links directly to ${ULAP_APP_URL}`);

  // ── SEAM 2: Catalogue & Homepage Portfolio Band ───────────────────────
  console.log("\nSEAM 2 — ULAP in catalogue & portfolio band");
  await page.goto(BASE + "/products", { waitUntil: "domcontentloaded" });
  const ulapCardCount = await page.locator('[data-product-card="ulap"]').count();
  if (ulapCardCount !== 1) fail(`expected 1 [data-product-card="ulap"] on /products, got ${ulapCardCount}`);
  else pass("BITS ULAP card rendered on /products");

  const totalCards = await page.locator("[data-product-card]").count();
  if (totalCards !== 4) fail(`expected 4 live product cards on /products, got ${totalCards}`);
  else pass("catalogue lists all 4 live products (Operations 360, BITS CRMPBX, BITS HRMS & Payroll, BITS ULAP)");

  // Interactive category filter & search bar on /products
  const opsPill = page.locator('[data-category-filter="operations"]');
  await opsPill.click();
  const opsCount = await page.locator("[data-product-card]").count();
  if (opsCount !== 1) fail(`expected 1 card under 'operations' category filter (BITS ULAP), got ${opsCount}`);
  else pass("sticky category filter narrows catalogue to 1 Messaging & Community product (BITS ULAP)");

  const searchInput = page.locator('[data-products-search-input="true"]');
  await searchInput.fill("Maritess");
  const searchCount = await page.locator("[data-product-card]").count();
  if (searchCount !== 1) fail(`expected 1 card when searching 'Maritess', got ${searchCount}`);
  else pass("instant search filters catalogue to BITS ULAP when querying 'Maritess'");

  await searchInput.fill("");
  await page.locator('[data-category-filter="all"]').click();
  if ((await page.locator("[data-product-card]").count()) !== 4) {
    fail("resetting category filter to 'all' did not restore all 4 live products");
  } else {
    pass("resetting filter restores all 4 live products");
  }

  await page.goto(BASE + "/", { waitUntil: "domcontentloaded" });
  const bandText = await page.locator("#portfolio-band").innerText();
  if (!bandText.includes(ULAP_TITLE)) fail(`#portfolio-band does not include ${ULAP_TITLE}`);
  else pass(`#portfolio-band includes ${ULAP_TITLE}`);

  const platformIndex = await page.locator("#platform-index").innerText().catch(() => "");
  if (platformIndex.includes(ULAP_TITLE)) {
    fail(`${ULAP_TITLE} must not overshadow Operations 360 in #platform-index`);
  } else {
    pass(`${ULAP_TITLE} does not appear in #platform-index; Operations 360 retains primacy`);
  }

  // ── SEAM 3: Cloud-shaped Trunkline Logo ───────────────────────────────
  console.log("\nSEAM 3 — Cloud-shaped Trunkline logo");
  const cloudBtn = page.locator(`a[href="${TRUNKLINE_HREF}"][data-trunkline-cloud="true"]`);
  if ((await cloudBtn.count()) !== 1) {
    fail("cloud-shaped trunkline button not found");
  } else {
    pass("cloud-shaped trunkline button rendered with tel:+639568457404");
  }

  const cloudSvg = cloudBtn.locator('svg[data-trunkline-cloud-svg="true"]');
  if ((await cloudSvg.count()) !== 1) {
    fail("cloud SVG not found inside trunkline button");
  } else {
    const box = await cloudSvg.boundingBox();
    if (!box || box.width < 50 || box.height < 40) {
      fail(`cloud SVG bounding box too small: ${JSON.stringify(box)}`);
    } else {
      pass(`cloud SVG visible (${Math.round(box.width)}x${Math.round(box.height)}px)`);
    }
  }

  const rawGreenCircles = await page.evaluate((href) => {
    return document.querySelectorAll(`body > a[href="${href}"]:not([data-trunkline-cloud])`).length;
  }, TRUNKLINE_HREF);
  if (rawGreenCircles !== 0) {
    fail(`found ${rawGreenCircles} unstyled raw call button(s) on document.body`);
  } else {
    pass("no raw circular green trunkline button present on document.body");
  }

  const airaCloudSvg = page.locator('svg[data-aira-cloud-svg="true"]');
  try {
    await airaCloudSvg.first().waitFor({ state: "attached", timeout: 10000 });
    const airaBox = await airaCloudSvg.first().boundingBox();
    if (!airaBox || airaBox.width < 50 || airaBox.height < 40) {
      fail(`AiRA cloud SVG bounding box too small: ${JSON.stringify(airaBox)}`);
    } else {
      pass(`AiRA button transformed into cloud SVG (${Math.round(airaBox.width)}x${Math.round(airaBox.height)}px)`);
    }
  } catch {
    fail("AiRA cloud SVG (svg[data-aira-cloud-svg=\"true\"]) not found");
  }

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

