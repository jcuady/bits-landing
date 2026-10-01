import { chromium } from "playwright";
import path from "node:path";

async function capture() {
  const browser = await chromium.launch({
    channel: "msedge",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  console.log("Navigating to http://localhost:3847/ ...");
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });

  // 1. Capture Header at top (unscrolled)
  await page.screenshot({
    path: "newlogo/screenshot_header_unscrolled.png",
    clip: { x: 0, y: 0, width: 1440, height: 160 },
  });
  console.log("✓ Captured screenshot_header_unscrolled.png");

  // 2. Scroll down and capture Header (scrolled state)
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "newlogo/screenshot_header_scrolled.png",
    clip: { x: 0, y: 0, width: 1440, height: 160 },
  });
  console.log("✓ Captured screenshot_header_scrolled.png");

  // 3. Hover Platform dropdown and capture
  const platformButton = page.locator('button:has-text("Platform")').first();
  if (await platformButton.count() > 0) {
    await platformButton.hover();
    await page.waitForTimeout(400);
    await page.screenshot({
      path: "newlogo/screenshot_header_dropdown.png",
      clip: { x: 0, y: 0, width: 1440, height: 600 },
    });
    console.log("✓ Captured screenshot_header_dropdown.png");
  }

  // 4. Inner Page (Products CRM) Header
  await page.goto("http://localhost:3847/products/crm", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: "newlogo/screenshot_header_product_crm.png",
    clip: { x: 0, y: 0, width: 1440, height: 160 },
  });
  console.log("✓ Captured screenshot_header_product_crm.png");

  // 5. Mobile Viewport (iPhone 14 / 390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "newlogo/screenshot_header_mobile_scrolled.png",
    clip: { x: 0, y: 0, width: 390, height: 120 },
  });
  console.log("✓ Captured screenshot_header_mobile_scrolled.png");

  await browser.close();
  console.log("All header previews successfully captured!");
}

capture().catch(console.error);
