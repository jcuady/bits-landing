import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const BASE = "http://localhost:3100";
const OUT = new URL("../qa/sections/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

const targets = [
  { sel: null, name: "hero" }, // top of page
  { sel: "#problem", name: "problem" },
  { sel: "#solutions", name: "solutions" },
  { sel: "#automation", name: "automation" },
  { sel: "#industries", name: "industries" },
  { sel: "#about", name: "about" },
  { sel: "#security", name: "security" },
  { sel: "#product", name: "product" },
  { sel: "#custom", name: "custom" },
  { sel: "#process", name: "process" },
  { sel: "#contact", name: "contact" },
];

const width = Number(process.argv[2] || 1440);
const height = Number(process.argv[3] || 900);

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width, height } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

for (const t of targets) {
  if (t.sel) {
    await page.locator(t.sel).first().scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -70)); // clear the fixed header
  } else {
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${OUT}${width}-${t.name}.png` });
}

// Footer
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1100);
await page.screenshot({ path: `${OUT}${width}-footer.png` });

await browser.close();
console.log("done");
