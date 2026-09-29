import { chromium } from "playwright";

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

  const footer = page.locator("footer").first();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  // 1. Full Footer
  await footer.screenshot({
    path: "newlogo/screenshot_footer_full.png",
  });
  console.log("✓ Captured newlogo/screenshot_footer_full.png");

  // 2. Bedrock Footer (Part 2 with clouds, logo, socials)
  const bedrock = footer.locator("div.relative.overflow-hidden.bg-\\[\\#020614\\]").first();
  if (await bedrock.count() > 0) {
    await bedrock.screenshot({
      path: "newlogo/screenshot_footer_bedrock.png",
    });
    console.log("✓ Captured newlogo/screenshot_footer_bedrock.png");
  }

  // 3. Mobile Viewport (iPhone 14 / 390x844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(400);
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  await footer.screenshot({
    path: "newlogo/screenshot_footer_mobile.png",
  });
  console.log("✓ Captured newlogo/screenshot_footer_mobile.png");

  await browser.close();
  console.log("All footer captures completed.");
}

capture().catch(console.error);
