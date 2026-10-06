import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:/Users/jcuad/.gemini/antigravity-ide/brain/5bd04611-7565-45f0-9f7e-2c449b5f6c25";
const PUBLIC_DIR = "c:/Users/jcuad/OneDrive/Documents/BITS/public/screenshots";

async function run() {
  const browser = await chromium.launch({
    channel: process.env.PW_CHANNEL || "msedge",
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  await page.addInitScript(() => {
    localStorage.setItem(
      "bits_cookie_consent_v1",
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
  });

  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  await page.evaluate(() => {
    document.getElementById("cockpit")?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(600);

  const fieldTab = page.locator('button:has-text("Field Agents App")').first();
  await fieldTab.click();
  await page.waitForTimeout(800);

  const outPath = path.join(PUBLIC_DIR, "verify_field_app_text.png");
  await page.screenshot({ path: outPath });
  fs.copyFileSync(outPath, path.join(ARTIFACT_DIR, "verify_field_app_text.png"));
  console.log("✓ Successfully saved verify_field_app_text.png");

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
