import { chromium } from "playwright";
import path from "path";
import fs from "fs";

const ARTIFACT_DIR = "C:\\Users\\jcuad\\.gemini\\antigravity-ide\\brain\\5bd04611-7565-45f0-9f7e-2c449b5f6c25";
const PUBLIC_DIR = "c:\\Users\\jcuad\\OneDrive\\Documents\\BITS\\public\\screenshots";

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});

const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});

const errors = [];
page.on("pageerror", (err) => errors.push(String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto("http://localhost:3847", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// Check if redundant bar is present
const hasRedundantBar = await page.evaluate(() => {
  return document.body.innerText.includes("Ready to modernize your collections floor with OPERATIONS 360?");
});
console.log("Has redundant bar:", hasRedundantBar);

// Screenshot the hero
const heroScreenshot = path.join(PUBLIC_DIR, "hero_cloud_particles.png");
await page.screenshot({ path: heroScreenshot, fullPage: false });
fs.copyFileSync(heroScreenshot, path.join(ARTIFACT_DIR, "hero_cloud_particles.png"));
console.log("Hero screenshot saved to:", heroScreenshot);

// Scroll down to the cockpit device showcase and screenshot
await page.evaluate(() => {
  document.getElementById("cockpit")?.scrollIntoView({ behavior: "instant" });
});
await page.waitForTimeout(1000);

const cockpitScreenshot = path.join(PUBLIC_DIR, "cockpit_clean_bottom.png");
await page.screenshot({ path: cockpitScreenshot, fullPage: false });
fs.copyFileSync(cockpitScreenshot, path.join(ARTIFACT_DIR, "cockpit_clean_bottom.png"));
console.log("Cockpit screenshot saved to:", cockpitScreenshot);

console.log("Console errors:", errors);

await browser.close();
