import { chromium } from "playwright";

async function capture() {
  const browser = await chromium.launch({
    channel: "msedge",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  console.log("Navigating to http://localhost:3847/#deployment ...");
  await page.goto("http://localhost:3847/#deployment", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Locate the new cloud hardware scoping container
  const scopingSection = page.locator("div.relative.overflow-hidden.rounded-\\[2\\.5rem\\]").first();
  if (await scopingSection.count() > 0) {
    await scopingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await scopingSection.screenshot({
      path: "newlogo/screenshot_hardware_scoping_cloud.png",
    });
    console.log("✓ Captured newlogo/screenshot_hardware_scoping_cloud.png");
  } else {
    console.log("Scoping container not found, taking full page screenshot");
    await page.screenshot({ path: "newlogo/screenshot_hardware_fallback.png" });
  }

  // Also capture the Header unscrolled & scrolled
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: "newlogo/screenshot_header_glass_top.png",
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });
  console.log("✓ Captured newlogo/screenshot_header_glass_top.png");

  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: "newlogo/screenshot_header_glass_scrolled.png",
    clip: { x: 0, y: 0, width: 1440, height: 120 },
  });
  console.log("✓ Captured newlogo/screenshot_header_glass_scrolled.png");

  await browser.close();
  console.log("All captures completed.");
}

capture().catch(console.error);
