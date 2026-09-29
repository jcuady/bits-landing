import { chromium } from "playwright";

async function capture() {
  const browser = await chromium.launch({
    channel: "msedge",
  });
  
  // 1. Desktop Viewport (1440 x 900)
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  console.log("Navigating to http://localhost:3847/bitsagent ...");
  await page.goto("http://localhost:3847/bitsagent", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // Hover over the Platform button in header
  console.log("Hovering over Platform button...");
  const platformBtn = page.getByRole("button", { name: "Platform" });
  await platformBtn.hover();
  await page.waitForTimeout(500);

  // Take screenshot of header and the modal popup
  await page.screenshot({
    path: "newlogo/screenshot_platform_modal_hover.png",
    clip: { x: 0, y: 0, width: 1440, height: 580 },
  });
  console.log("✓ Captured screenshot_platform_modal_hover.png");

  // Also take full viewport screenshot to prove it doesn't overflow
  await page.screenshot({
    path: "newlogo/screenshot_platform_modal_full.png",
  });
  console.log("✓ Captured screenshot_platform_modal_full.png");

  // 2. Mobile Viewport (390 x 844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);

  // Click hamburger menu
  const menuBtn = page.getByLabel("Open menu");
  if (await menuBtn.count() > 0) {
    await menuBtn.click();
    await page.waitForTimeout(500);

    // Platform is expanded by default (expandedMobileSection === 'platform')
    await page.screenshot({
      path: "newlogo/screenshot_platform_modal_mobile.png",
    });
    console.log("✓ Captured screenshot_platform_modal_mobile.png");
  }

  await browser.close();
  console.log("All captures completed successfully.");
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
