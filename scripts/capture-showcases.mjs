import { chromium } from "playwright";
import fs from "fs";
import path from "path";

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

  // 1. Capture Collections Command Center (features-hero)
  const featuresHeroEl = page.locator("#collections-command-center, #features-hero, [id*='collections']").first();
  await featuresHeroEl.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(PUBLIC_DIR, "live_features_hero_collections.png") });
  console.log("✓ Saved live_features_hero_collections.png");

  // 2. Capture Floor Showcase (tab: dialer)
  const floorShowcase = page.locator("#floor-showcase");
  await floorShowcase.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(PUBLIC_DIR, "live_floor_dialer.png") });
  console.log("✓ Saved live_floor_dialer.png");

  // Click QA tab
  const qaTab = page.locator("#floor-showcase button:has-text('QA Scorecards')").first();
  if (await qaTab.count()) {
    await qaTab.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(PUBLIC_DIR, "live_floor_qa.png") });
    console.log("✓ Saved live_floor_qa.png");
  }

  // Click Messaging tab
  const msgTab = page.locator("#floor-showcase button:has-text('Omnichannel Messaging')").first();
  if (await msgTab.count()) {
    await msgTab.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(PUBLIC_DIR, "live_floor_messaging.png") });
    console.log("✓ Saved live_floor_messaging.png");
  }

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
