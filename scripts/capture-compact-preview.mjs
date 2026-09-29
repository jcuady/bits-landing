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

  console.log("Navigating to http://localhost:3847/ ...");
  await page.goto("http://localhost:3847/", { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2000);

  // Capture FAQ Section
  console.log("Looking for #faq...");
  await page.waitForSelector("#faq", { timeout: 10000 });
  const faqSection = page.locator("#faq");
  await faqSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await faqSection.screenshot({
    path: "newlogo/screenshot_faq_compact.png",
  });
  console.log("✓ Captured screenshot_faq_compact.png");

  // Capture Contact Section
  console.log("Looking for #contact...");
  await page.waitForSelector("#contact", { timeout: 10000 });
  const contactSection = page.locator("#contact");
  await contactSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await contactSection.screenshot({
    path: "newlogo/screenshot_contact_compact.png",
  });
  console.log("✓ Captured screenshot_contact_compact.png");

  // 2. Mobile Viewport (390 x 844)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(500);

  await faqSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await faqSection.screenshot({
    path: "newlogo/screenshot_faq_mobile.png",
  });
  console.log("✓ Captured screenshot_faq_mobile.png");

  await contactSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await contactSection.screenshot({
    path: "newlogo/screenshot_contact_mobile.png",
  });
  console.log("✓ Captured screenshot_contact_mobile.png");

  await browser.close();
  console.log("Capture completed successfully.");
}

capture().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
