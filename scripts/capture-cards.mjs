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

  // 1. DEMO PAGE CARDS SCROLLED
  await page.goto("http://localhost:3847/demo", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const cookieBtn = page.getByRole("button", { name: "Accept All" });
  if (await cookieBtn.count()) {
    await cookieBtn.click();
    await page.waitForTimeout(300);
  }

  // Demo Light Mode Cards
  await page.emulateMedia({ colorScheme: "light" });
  await page.evaluate(() => {
    localStorage.setItem("bits_theme", "light");    document.documentElement.classList.remove("dark");
    window.scrollBy(0, 380);
  });
  await page.waitForTimeout(600);

  const demoLightCards = path.join(PUBLIC_DIR, "demo_cards_light_mode.png");
  const demoLightCardsArtifact = path.join(ARTIFACT_DIR, "demo_cards_light_mode.png");
  await page.screenshot({ path: demoLightCards });
  fs.copyFileSync(demoLightCards, demoLightCardsArtifact);
  console.log("✓ Saved Demo Light Cards screenshot");

  // Demo Dark Mode Cards
  await page.emulateMedia({ colorScheme: "dark" });
  await page.evaluate(() => {
    localStorage.setItem("bits_theme", "dark");    document.documentElement.classList.add("dark");
  });
  await page.waitForTimeout(600);

  const demoDarkCards = path.join(PUBLIC_DIR, "demo_cards_dark_mode.png");
  const demoDarkCardsArtifact = path.join(ARTIFACT_DIR, "demo_cards_dark_mode.png");
  await page.screenshot({ path: demoDarkCards });
  fs.copyFileSync(demoDarkCards, demoDarkCardsArtifact);
  console.log("✓ Saved Demo Dark Cards screenshot");

  await browser.close();
}

run().catch(console.error);
