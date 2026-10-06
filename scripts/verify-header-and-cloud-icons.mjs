import { chromium } from "playwright";
import path from "node:path";

const artifactDir = "C:\\Users\\jcuad\\.gemini\\antigravity-ide\\brain\\5bd04611-7565-45f0-9f7e-2c449b5f6c25";

async function verify() {
  console.log("Launching Edge browser...");
  const browser = await chromium.launch({
    channel: "msedge",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });

  console.log("Navigating to http://localhost:3847/ ...");
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Capture Header at top
  const headerPath = path.join(artifactDir, "verify_header_contact_us.png");
  await page.screenshot({
    path: headerPath,
    clip: { x: 0, y: 0, width: 1440, height: 140 },
  });
  console.log("✓ Captured header:", headerPath);

  // Verify header button text
  const headerBtnText = await page.locator("header button").last().textContent();
  console.log("Header right button text:", headerBtnText);

  // 2. Scroll to Product Families section
  console.log("Scrolling to #product-families...");
  const section = page.locator("#product-families");
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  // Capture product families section
  const familiesPath = path.join(artifactDir, "verify_product_families_cloud_icons.png");
  await section.screenshot({
    path: familiesPath,
  });
  console.log("✓ Captured Product Families section:", familiesPath);

  // Also capture a close-up of the first row of cards
  const cardsPath = path.join(artifactDir, "verify_product_families_cards_closeup.png");
  const firstCard = page.locator("#product-families .grid").first();
  await firstCard.screenshot({
    path: cardsPath,
  });
  console.log("✓ Captured Cards close-up:", cardsPath);

  await browser.close();
  console.log("Verification finished successfully!");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
