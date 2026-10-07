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

  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  // Scroll to trust strip transition
  console.log("Scrolling to TrustStrip transition...");
  await page.evaluate(() => {
    document.getElementById("trust-strip")?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(500);

  const trustPath = path.join(PUBLIC_DIR, "hero_transition_to_trust.png");
  const trustArtifact = path.join(ARTIFACT_DIR, "hero_transition_to_trust.png");
  await page.screenshot({ path: trustPath });
  fs.copyFileSync(trustPath, trustArtifact);
  console.log("✓ Saved hero_transition_to_trust.png");

  await browser.close();
}

run();
