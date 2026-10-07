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

  // Mobile test: iPhone 14
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(500);

  const mobileHeroPath = path.join(PUBLIC_DIR, "hero_mobile_top.png");
  const mobileHeroArtifact = path.join(ARTIFACT_DIR, "hero_mobile_top.png");
  await mobilePage.screenshot({ path: mobileHeroPath });
  fs.copyFileSync(mobileHeroPath, mobileHeroArtifact);
  console.log("✓ Saved hero_mobile_top.png");

  // Tablet test: iPad Air
  const tabletCtx = await browser.newContext({
    viewport: { width: 820, height: 1180 },
    deviceScaleFactor: 2,
  });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await tabletPage.waitForTimeout(500);

  const tabletHeroPath = path.join(PUBLIC_DIR, "hero_tablet_top.png");
  const tabletHeroArtifact = path.join(ARTIFACT_DIR, "hero_tablet_top.png");
  await tabletPage.screenshot({ path: tabletHeroPath });
  fs.copyFileSync(tabletHeroPath, tabletHeroArtifact);
  console.log("✓ Saved hero_tablet_top.png");

  await browser.close();
}

run();
