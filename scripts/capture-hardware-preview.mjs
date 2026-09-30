import { chromium } from "playwright";

async function capture() {
  const browser = await chromium.launch({
    channel: "msedge",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  console.log("Navigating to http://localhost:3847/#hardware-scoping ...");
  await page.goto("http://localhost:3847/#hardware-scoping", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const hardwareSection = page.locator("#hardware-scoping").first();
  await hardwareSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // 1. Capture Full Hardware Scoping Section (Desktop)
  await hardwareSection.screenshot({
    path: "newlogo/screenshot_hardware_scoping_desktop.png",
  });
  console.log("✓ Captured newlogo/screenshot_hardware_scoping_desktop.png");

  // 2. Click Tier 2 (Enterprise) and capture interactive state
  const enterpriseButton = page.locator('button:has-text("100+ Seats")').first();
  if (await enterpriseButton.count() > 0) {
    await enterpriseButton.click();
    await page.waitForTimeout(400);
    await hardwareSection.screenshot({
      path: "newlogo/screenshot_hardware_scoping_enterprise_active.png",
    });
    console.log("✓ Captured newlogo/screenshot_hardware_scoping_enterprise_active.png");
  }

  // 3. Mobile Viewport (iPhone 14 / 390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3847/#hardware-scoping", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await hardwareSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await hardwareSection.screenshot({
    path: "newlogo/screenshot_hardware_scoping_mobile.png",
  });
  console.log("✓ Captured newlogo/screenshot_hardware_scoping_mobile.png");

  await browser.close();
  console.log("Hardware section captures completed successfully.");
}

capture().catch(console.error);
