import { chromium } from "playwright";

async function capture() {
  const browser = await chromium.launch({
    channel: "msedge",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 960 },
    deviceScaleFactor: 2,
  });

  console.log("Navigating to http://localhost:3847/blog ...");
  await page.goto("http://localhost:3847/blog", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "newlogo/screenshot_blog_hub.png", fullPage: false });
  console.log("✓ Captured newlogo/screenshot_blog_hub.png");

  console.log("Navigating to blog post article ...");
  await page.goto("http://localhost:3847/blog/best-collections-oms-debt-recovery-software-2026", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "newlogo/screenshot_blog_article.png", fullPage: false });
  console.log("✓ Captured newlogo/screenshot_blog_article.png");

  // Also scroll a bit down in the article to see the comparative matrix and callout
  await page.evaluate(() => window.scrollTo(0, 1100));
  await page.waitForTimeout(400);
  await page.screenshot({ path: "newlogo/screenshot_blog_matrix.png", fullPage: false });
  console.log("✓ Captured newlogo/screenshot_blog_matrix.png");

  await browser.close();
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
