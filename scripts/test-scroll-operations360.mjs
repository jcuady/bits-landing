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

  // Pre-seed cookie consent
  await page.addInitScript(() => {
    localStorage.setItem(
      "bits_cookie_consent_v1",
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
  });

  console.log("Navigating to http://localhost:3847/ ...");
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // 1. Scroll into cockpit start
  console.log("Scrolling to cockpit entry...");
  const cockpitBox = await page.evaluate(() => {
    const el = document.getElementById("cockpit");
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top + window.scrollY, height: el.offsetHeight };
  });

  console.log("Cockpit bounds:", cockpitBox);
  if (!cockpitBox) {
    console.error("Cockpit not found!");
    process.exit(1);
  }

  // Scroll to start of cockpit
  await page.evaluate((top) => {
    window.scrollTo({ top: top - 80, behavior: "instant" });
  }, cockpitBox.top);
  await page.waitForTimeout(600);

  // Capture Step 1: Cockpit CRM & PTP
  console.log("Capturing Step 1 (CRM & PTP)...");
  const step1Path = path.join(PUBLIC_DIR, "scroll_step1_crm_ptp.png");
  await page.screenshot({ path: step1Path });
  fs.copyFileSync(step1Path, path.join(ARTIFACT_DIR, "scroll_step1_crm_ptp.png"));

  // Scroll to Step 2: Predictive Dialer (approx 35% through track)
  console.log("Scrolling to Step 2 (Predictive Dialer)...");
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 450, behavior: "instant" });
  }, cockpitBox.top);
  await page.waitForTimeout(700);

  const step2Path = path.join(PUBLIC_DIR, "scroll_step2_dialer.png");
  await page.screenshot({ path: step2Path });
  fs.copyFileSync(step2Path, path.join(ARTIFACT_DIR, "scroll_step2_dialer.png"));

  // Scroll to Step 3: Field Agents App (approx 65% through track)
  console.log("Scrolling to Step 3 (Field Agents App Mockup)...");
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 950, behavior: "instant" });
  }, cockpitBox.top);
  await page.waitForTimeout(700);

  const step3Path = path.join(PUBLIC_DIR, "scroll_step3_field_app.png");
  await page.screenshot({ path: step3Path });
  fs.copyFileSync(step3Path, path.join(ARTIFACT_DIR, "scroll_step3_field_app.png"));

  // Scroll to Step 4: Real-Time QA Scoring (approx 90% through track)
  console.log("Scrolling to Step 4 (Real-Time QA Scoring)...");
  await page.evaluate((top) => {
    window.scrollTo({ top: top + 1450, behavior: "instant" });
  }, cockpitBox.top);
  await page.waitForTimeout(700);

  const step4Path = path.join(PUBLIC_DIR, "scroll_step4_qa_scoring.png");
  await page.screenshot({ path: step4Path });
  fs.copyFileSync(step4Path, path.join(ARTIFACT_DIR, "scroll_step4_qa_scoring.png"));

  // Test interactive click to return to Predictive Dialer
  console.log("Testing click jump back to Predictive Dialer...");
  const dialerTab = page.getByRole("button", { name: "Predictive Dialer", exact: true });
  await dialerTab.click();
  await page.waitForTimeout(700);

  const clickJumpPath = path.join(PUBLIC_DIR, "scroll_click_jump_dialer.png");
  await page.screenshot({ path: clickJumpPath });
  fs.copyFileSync(clickJumpPath, path.join(ARTIFACT_DIR, "scroll_click_jump_dialer.png"));

  console.log("✓ All 4 scroll steps and click jump captured successfully!");
  await browser.close();
}

run().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
