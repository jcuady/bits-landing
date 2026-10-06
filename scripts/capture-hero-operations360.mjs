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

  // Pre-seed cookie consent so banner never obscures UI
  await page.addInitScript(() => {
    localStorage.setItem(
      "bits_cookie_consent_v1",
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
  });

  console.log("Navigating to http://localhost:3847/ ...");
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Dismiss cookie banner cleanly
  try {
    const cookieBtn = page.getByRole("button", { name: "Accept All" });
    if (await cookieBtn.count()) {
      await cookieBtn.click();
      await page.waitForTimeout(500);
    }
  } catch (e) {
    // Continue
  }

  // 1. Capture Hero Top Section
  console.log("Capturing Hero Top Section...");
  const heroTopPath = path.join(PUBLIC_DIR, "hero_redesigned_top.png");
  const heroTopArtifact = path.join(ARTIFACT_DIR, "hero_redesigned_top.png");
  await page.screenshot({ path: heroTopPath });
  fs.copyFileSync(heroTopPath, heroTopArtifact);
  console.log("✓ Saved hero_redesigned_top.png");

  // 2. Scroll to Cockpit (OPERATIONS 360 Feature Showcase)
  console.log("Scrolling to OPERATIONS 360 Cockpit...");
  await page.evaluate(() => {
    document.getElementById("cockpit")?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(800);

  const cockpitPtpPath = path.join(PUBLIC_DIR, "hero_operations360_ptp.png");
  const cockpitPtpArtifact = path.join(ARTIFACT_DIR, "hero_operations360_ptp.png");
  await page.screenshot({ path: cockpitPtpPath });
  fs.copyFileSync(cockpitPtpPath, cockpitPtpArtifact);
  console.log("✓ Saved hero_operations360_ptp.png");

  // 2b. Click Predictive Dialer Tab
  console.log("Clicking Predictive Dialer tab...");
  const dialerTab = page.getByRole("button", { name: /Predictive Dialer/i }).first();
  if (await dialerTab.count()) {
    await dialerTab.click();
    await page.waitForTimeout(600);
    const dialerPath = path.join(PUBLIC_DIR, "hero_operations360_softphone.png");
    const dialerArtifact = path.join(ARTIFACT_DIR, "hero_operations360_softphone.png");
    await page.screenshot({ path: dialerPath });
    fs.copyFileSync(dialerPath, dialerArtifact);
    console.log("✓ Saved hero_operations360_softphone.png");
  }

  // 3. Click Field Agents App Tab
  console.log("Clicking Field Agents App tab...");
  const fieldTab = page.getByRole("button", { name: /Field Agents App/i }).first();
  if (await fieldTab.count()) {
    await fieldTab.click();
    await page.waitForTimeout(600);
    const fieldPath = path.join(PUBLIC_DIR, "hero_operations360_field.png");
    const fieldArtifact = path.join(ARTIFACT_DIR, "hero_operations360_field.png");
    await page.screenshot({ path: fieldPath });
    fs.copyFileSync(fieldPath, fieldArtifact);
    console.log("✓ Saved hero_operations360_field.png");
  }

  // 4. Click Real-Time QA Scoring Tab
  console.log("Clicking Real-Time QA Scoring tab...");
  const qaTab = page.getByRole("button", { name: /Real-Time QA Scoring/i }).first();
  if (await qaTab.count()) {
    await qaTab.click();
    await page.waitForTimeout(600);
    const qaPath = path.join(PUBLIC_DIR, "hero_operations360_qa.png");
    const qaArtifact = path.join(ARTIFACT_DIR, "hero_operations360_qa.png");
    await page.screenshot({ path: qaPath });
    fs.copyFileSync(qaPath, qaArtifact);
    console.log("✓ Saved hero_operations360_qa.png");
  }

  // 5. Test GSAP Scroll Parallax on Clouds
  console.log("Scrolling smoothly to test GSAP parallax on clouds...");
  await page.evaluate(async () => {
    window.scrollTo({ top: 350, behavior: "instant" });
  });
  await page.waitForTimeout(600);

  const parallaxPath = path.join(PUBLIC_DIR, "hero_gsap_clouds_parallax.png");
  const parallaxArtifact = path.join(ARTIFACT_DIR, "hero_gsap_clouds_parallax.png");
  await page.screenshot({ path: parallaxPath });
  fs.copyFileSync(parallaxPath, parallaxArtifact);
  console.log("✓ Saved hero_gsap_clouds_parallax.png");

  await browser.close();
  console.log("All Hero & OPERATIONS 360 captures completed successfully.");
}

run().catch((err) => {
  console.error("Capture script error:", err);
  process.exit(1);
});
