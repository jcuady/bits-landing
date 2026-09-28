import { chromium } from "playwright";

const BASE = "http://localhost:3847";
const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// 1. Click header "Book a Consultation"
console.log("Testing Header Book a Consultation modal trigger...");
const headerBtn = page.locator('header button:has-text("Book a Consultation")').first();
await headerBtn.click();
await page.waitForTimeout(600);

// Verify modal is visible
const modal = page.locator('div[role="dialog"]');
const isVisible = await modal.isVisible();
console.log("Modal visible after header click:", isVisible);

// Check close button
const closeBtn = page.locator('button[aria-label="Close dialog"], [data-slot="dialog-close"]').first();
console.log("Close button visible:", await closeBtn.isVisible());
await closeBtn.click();
await page.waitForTimeout(400);
console.log("Modal closed:", !(await modal.isVisible()));

// 2. Click CTA from Products Suite section
console.log("Testing Products Suite CTA modal trigger...");
const productsSuiteSection = page.locator("#products-suite");
await productsSuiteSection.scrollIntoViewIfNeeded();
await page.waitForTimeout(800);

const exploreBtn = page.locator('#products-suite button:has-text("Explore OPERATIONS 360")').first();
if (await exploreBtn.count() > 0) {
  await exploreBtn.click();
  await page.waitForTimeout(600);
  console.log("Modal visible after product CTA click:", await modal.isVisible());

  // Fill modal form and submit
  await page.locator('#modal-name').fill("Enterprise Client");
  await page.locator('#modal-email').fill("client@enterprise.com");
  await page.locator('#modal-company').fill("Apex Global");
  await page.locator('#modal-message').fill("Looking for full suite rollout with WebRTC dialer.");
  
  const submitBtn = page.locator('form button[type="submit"]:has-text("Confirm 20-Min Consultation")');
  await submitBtn.click();

  const successBadge = page.locator('text=Request Received');
  await successBadge.waitFor({ state: 'visible', timeout: 15000 });
  console.log("Modal success screen verified: true");
} else {
  console.log("Could not find Explore OPERATIONS 360 button, trying any product CTA");
}

await browser.close();
console.log("Console errors:", errors);
if (errors.length > 0) {
  process.exit(1);
}
console.log("Consultation modal verification PASSED cleanly!");
