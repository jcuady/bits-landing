import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  channel: "msedge",
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});

await page.goto("http://localhost:3847", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

// Capture Hero section
const hero = page.locator("section").first();
await hero.screenshot({ path: "qa/hero-visual.png" });

// Scroll to bottom to view contact and footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(600);

// Capture contact and footer
const contact = page.locator("#contact");
await contact.screenshot({ path: "qa/contact-section.png" });

const footer = page.locator("footer");
await footer.screenshot({ path: "qa/footer-redesigned.png" });

await page.screenshot({ path: "qa/bottom-page-seamless.png" });

await browser.close();
console.log("Screenshots captured successfully!");
