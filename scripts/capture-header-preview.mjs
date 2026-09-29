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
    clip: { x: 0, y: 0, width: 1440, height: 180 },
  });
  console.log("✓ Captured screenshot_header_unscrolled.png");

  // 2. Scroll down 250px and capture Header (scrolled state)
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: "newlogo/screenshot_header_scrolled.png",
    clip: { x: 0, y: 0, width: 1440, height: 180 },
  });
  console.log("✓ Captured screenshot_header_scrolled.png");

  // 3. Capture Features Hero / Command Center section
  const featuresHero = page.locator("#features");
  if (await featuresHero.count() > 0) {
    await featuresHero.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "newlogo/screenshot_features_hero.png",
      clip: { x: 0, y: 0, width: 1440, height: 750 },
    });
    console.log("✓ Captured screenshot_features_hero.png");
  }

  // 4. Capture Footer
  const footer = page.locator("footer").first();
  if (await footer.count() > 0) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await footer.screenshot({
      path: "newlogo/screenshot_footer.png",
    });
    console.log("✓ Captured screenshot_footer.png");
  }

  // 5. Mobile Viewport (iPhone 14 / 390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: "newlogo/screenshot_mobile_unscrolled.png",
    clip: { x: 0, y: 0, width: 390, height: 160 },
  });
  console.log("✓ Captured screenshot_mobile_unscrolled.png");

  // Open mobile menu
  const menuButton = page.locator('button[aria-label="Open menu"]');
  if (await menuButton.count() > 0) {
    await menuButton.click();
    await page.waitForTimeout(300);
    await page.screenshot({
      path: "newlogo/screenshot_mobile_menu_open.png",
    });
    console.log("✓ Captured screenshot_mobile_menu_open.png");
  }

  await browser.close();
  console.log("All screenshots captured successfully.");
}

capture().catch(console.error);
