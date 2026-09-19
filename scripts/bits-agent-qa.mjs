import { chromium } from "playwright";
import { mkdirSync, readdirSync, renameSync } from "node:fs";
import { join } from "node:path";

const BASE = process.env.BITS_BASE || "http://localhost:3847";
const OUT = new URL("../qa/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});

const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: OUT, size: { width: 1440, height: 900 } },
});

const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(String(error)));

await page.goto(BASE, { waitUntil: "networkidle" });
await page.locator("#bitsagent").scrollIntoViewIfNeeded();
await page.waitForTimeout(2200);
await page.locator("#bitsagent").screenshot({ path: `${OUT}bitsagent-home.png` });
await page.locator("#bitsagent figure").screenshot({ path: `${OUT}bitsagent-specimen.png` });

const sectionTone = await page.locator("#bitsagent").evaluate((section) => {
  const color = getComputedStyle(section).backgroundColor;
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  const [r, g, b] = match ? match.slice(1).map(Number) : [0, 0, 0];
  return { color, luminance: (r + g + b) / 3 };
});

const heightAnimated = await page.locator("#bitsagent").evaluate((section) =>
  Boolean(section.querySelector('[class*="animate-ping"], [class*="animate-float"]'))
);

for (const tab of ["Customer Support", "Surveys & Feedback", "Debt Collections"]) {
  await page.getByRole("tab", { name: tab }).click();
  await page.waitForTimeout(700);
}
await page.screenshot({ path: `${OUT}bitsagent-home-tabs.png` });

await page.goto(`${BASE}/bitsagent`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const pageBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
await page.screenshot({ path: `${OUT}bitsagent-page.png`, fullPage: true });

const freePilot = await page.locator("text=/14-day|risk-free pilot|start free pilot|start free trial/i").count();

await context.close();
await browser.close();

const videos = readdirSync(OUT).filter((name) => name.endsWith(".webm") && name !== "bitsagent-qa.webm");
if (videos.length) {
  renameSync(join(OUT, videos.sort().at(-1)), join(OUT, "bitsagent-qa.webm"));
}

const report = { errors, sectionTone, heightAnimated, pageBg, freePilot };
console.log(JSON.stringify(report, null, 2));

if (errors.length || sectionTone.luminance < 200 || heightAnimated || freePilot > 0) {
  console.error("BITSagent QA failed.");
  process.exit(1);
}

console.log("BITSagent QA passed.");
