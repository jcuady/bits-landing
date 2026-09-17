import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3847";
const OUT = new URL("../qa/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

const viewports = [
  { name: "mobile-375", width: 375, height: 812 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1280", width: 1280, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "wide-1920", width: 1920, height: 1080 },
];

const browser = await chromium.launch({ channel: "chrome" });
const results = [];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);

  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    return { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, overflow: de.scrollWidth > de.clientWidth };
  });

  for (const section of await page.locator("main section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}${vp.name}.png`, fullPage: true });
  results.push({ viewport: vp.name, ...overflow, consoleErrors: errors });
  await page.close();
}

// Mobile nav open state
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}mobile-nav.png` });
  await page.close();
}

// Contact form: empty submit shows errors, valid submit shows success
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);

  await page.getByRole("button", { name: "Request a Demo" }).click();
  await page.waitForTimeout(800);
  const errorCount = await page.locator("text=Please").count();
  await page.screenshot({ path: `${OUT}form-errors.png` });

  await page.locator("#name").fill("QA Tester");
  await page.locator("#email").fill("qa@example.com");
  await page.locator("#company").fill("QA Co");
  await page.locator("#interest").selectOption("Core Collections");
  await page.getByRole("button", { name: "Request a Demo" }).click();
  await page.waitForTimeout(1500);
  const success = await page.locator("text=Message received.").count();
  await page.screenshot({ path: `${OUT}form-success.png` });
  results.push({ formErrorsShown: errorCount, formSuccess: success });
  await page.close();
}

console.log(JSON.stringify(results, null, 2));
await browser.close();
