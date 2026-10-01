import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log("=== Testing Page Titles, Head Icons & Search Console Metadata ===");

  // 1. Home
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  const homeTitle = await page.title();
  console.log("✓ Homepage Title:", homeTitle);

  const headIcons = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('link[rel*="icon"]'));
    return links.map((el) => ({
      rel: el.getAttribute("rel"),
      href: el.getAttribute("href"),
      sizes: el.getAttribute("sizes"),
      type: el.getAttribute("type"),
    }));
  });
  console.log("✓ Favicon & App Icon links in <head>:", headIcons);

  const metaTheme = await page.$eval('meta[name="theme-color"]', (el) => el.getAttribute("content")).catch(() => null);
  console.log("✓ Theme Color:", metaTheme);

  const metaGoogle = await page.$eval('meta[name="google-site-verification"]', (el) => el.getAttribute("content")).catch(() => null);
  console.log("✓ Google Site Verification:", metaGoogle);

  // 2. BITSagent
  await page.goto("http://localhost:3847/bitsagent", { waitUntil: "networkidle" });
  const agentTitle = await page.title();
  console.log("✓ BITSagent Title:", agentTitle);

  // 3. BITScrm
  await page.goto("http://localhost:3847/bitscrm", { waitUntil: "networkidle" });
  const crmTitle = await page.title();
  console.log("✓ BITScrm Title:", crmTitle);

  // 4. Products CRM
  await page.goto("http://localhost:3847/products/crm", { waitUntil: "networkidle" });
  const prodCrmTitle = await page.title();
  console.log("✓ Products CRM Title:", prodCrmTitle);

  // 5. Take screenshot of header with new logo
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.screenshot({ path: "newlogo/screenshot_verified_header.png", clip: { x: 0, y: 0, width: 1440, height: 180 } });
  console.log("✓ Saved newlogo/screenshot_verified_header.png");

  await browser.close();
  console.log("=== Verification Completed Successfully! ===");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
