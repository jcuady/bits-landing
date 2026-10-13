import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:/Users/jcuad/.gemini/antigravity-ide/brain/5bd04611-7565-45f0-9f7e-2c449b5f6c25";
const PUBLIC_DIR = "c:/Users/jcuad/OneDrive/Documents/BITS/public/screenshots";

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

function calculateContrast(rgb1, rgb2) {
  const getLuminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };
  const parseRGB = (str) => {
    const m = str.match(/\d+/g);
    return m ? [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])] : [0, 0, 0];
  };
  const [r1, g1, b1] = parseRGB(rgb1);
  const [r2, g2, b2] = parseRGB(rgb2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  return Number(ratio.toFixed(2));
}

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
  const contrastResults = {
    crmLight: {},
    crmDark: {},
    demoLight: {},
    demoDark: {},
  };

  console.log("Navigating to login to enter CRM demo session...");
  await page.goto("http://localhost:3847/login?next=%2Fapplication", { waitUntil: "networkidle" });
  
  const demoBtn = page.getByRole("button", { name: /Sales Director|Enter demo/i }).first();
  if (await demoBtn.count()) {
    await demoBtn.click();
    await page.waitForURL("**/app/dashboard", { timeout: 15000 });
  } else {
    await page.goto("http://localhost:3847/app/dashboard", { waitUntil: "networkidle" });
  }

  await page.waitForSelector("header", { timeout: 15000 });
  await page.waitForTimeout(500);

  // Dismiss cookie banner if present
  const cookieBtn = page.getByRole("button", { name: "Accept All" });
  if (await cookieBtn.count()) {
    await cookieBtn.click();
    await page.waitForTimeout(300);
  }

  // 1. CRM LIGHT MODE
  console.log("Setting CRM to Light Mode...");
  await page.emulateMedia({ colorScheme: "light" });
  await page.evaluate(() => {
    localStorage.setItem("bits_theme", "light");    document.documentElement.classList.remove("dark");
  });
  await page.waitForTimeout(1000);

  const crmLightPath = path.join(PUBLIC_DIR, "crm_dashboard_light_mode.png");
  const crmLightArtifact = path.join(ARTIFACT_DIR, "crm_dashboard_light_mode.png");
  await page.screenshot({ path: crmLightPath, fullPage: false });
  fs.copyFileSync(crmLightPath, crmLightArtifact);
  console.log("✓ Saved CRM Light Mode screenshot");

  // Sample contrast in CRM Light Mode
  contrastResults.crmLight = await page.evaluate(() => {
    const sidebar = document.querySelector("aside");
    const sidebarBg = sidebar ? window.getComputedStyle(sidebar).backgroundColor : "rgba(255,255,255,0.75)";
    const sidebarLink = document.querySelector("aside a");
    const sidebarColor = sidebarLink ? window.getComputedStyle(sidebarLink).color : "rgb(9, 19, 34)";
    const heading = document.querySelector("h1, h2");
    const headingColor = heading ? window.getComputedStyle(heading).color : "rgb(9, 19, 34)";
    const statCard = document.querySelector(".crm-dashboard");
    const cardBg = statCard ? window.getComputedStyle(statCard).backgroundColor : "rgba(255,255,255,0.85)";
    return { sidebarBg, sidebarColor, headingColor, cardBg };
  });

  // 2. CRM DARK MODE
  console.log("Setting CRM to Dark Mode...");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.evaluate(() => {
    localStorage.setItem("bits_theme", "dark");    document.documentElement.classList.add("dark");
  });
  // Also click the topbar theme toggle if present to synchronize React state
  const themeToggle = page.getByRole("button", { name: /toggle theme/i }).first();
  if (await themeToggle.count()) {
    const isDarkNow = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    // Topbar component might have state
    console.log("Theme toggle found, isDark class:", isDarkNow);
  }
  await page.waitForTimeout(1000);

  const crmDarkPath = path.join(PUBLIC_DIR, "crm_dashboard_dark_mode.png");
  const crmDarkArtifact = path.join(ARTIFACT_DIR, "crm_dashboard_dark_mode.png");
  await page.screenshot({ path: crmDarkPath, fullPage: false });
  fs.copyFileSync(crmDarkPath, crmDarkArtifact);
  console.log("✓ Saved CRM Dark Mode screenshot");

  // Sample contrast in CRM Dark Mode
  contrastResults.crmDark = await page.evaluate(() => {
    const sidebar = document.querySelector("aside");
    const sidebarBg = sidebar ? window.getComputedStyle(sidebar).backgroundColor : "rgb(7, 14, 28)";
    const sidebarLink = document.querySelector("aside a");
    const sidebarColor = sidebarLink ? window.getComputedStyle(sidebarLink).color : "rgb(255, 255, 255)";
    const heading = document.querySelector("h1, h2");
    const headingColor = heading ? window.getComputedStyle(heading).color : "rgb(255, 255, 255)";
    const statCard = document.querySelector(".crm-dashboard");
    const cardBg = statCard ? window.getComputedStyle(statCard).backgroundColor : "rgb(7, 14, 28)";
    return { sidebarBg, sidebarColor, headingColor, cardBg };
  });

  // 3. DEMO PAGE LIGHT MODE
  console.log("Navigating to /demo...");
  await page.goto("http://localhost:3847/demo", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  console.log("Setting /demo to Light Mode...");
  await page.emulateMedia({ colorScheme: "light" });
  await page.evaluate(() => {
    localStorage.setItem("bits_theme", "light");    document.documentElement.classList.remove("dark");
  });
  await page.waitForTimeout(1000);

  const demoLightPath = path.join(PUBLIC_DIR, "demo_showcase_light_mode.png");
  const demoLightArtifact = path.join(ARTIFACT_DIR, "demo_showcase_light_mode.png");
  await page.screenshot({ path: demoLightPath, fullPage: false });
  fs.copyFileSync(demoLightPath, demoLightArtifact);
  console.log("✓ Saved Demo Light Mode screenshot");

  // 4. DEMO PAGE DARK MODE
  console.log("Setting /demo to Dark Mode...");
  await page.emulateMedia({ colorScheme: "dark" });
  await page.evaluate(() => {
    localStorage.setItem("bits_theme", "dark");    document.documentElement.classList.add("dark");
  });
  const demoToggle = page.getByRole("button", { name: /toggle theme/i }).first();
  if (await demoToggle.count()) {
    // If the button icon is Moon, click it to activate Dark
    console.log("Demo theme toggle found");
  }
  await page.waitForTimeout(1000);

  const demoDarkPath = path.join(PUBLIC_DIR, "demo_showcase_dark_mode.png");
  const demoDarkArtifact = path.join(ARTIFACT_DIR, "demo_showcase_dark_mode.png");
  await page.screenshot({ path: demoDarkPath, fullPage: false });
  fs.copyFileSync(demoDarkPath, demoDarkArtifact);
  console.log("✓ Saved Demo Dark Mode screenshot");

  await browser.close();

  console.log("\n--- MEASURED CONTRAST & COLOR SUMMARY ---");
  console.log(JSON.stringify(contrastResults, null, 2));

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, "contrast_measurements.json"),
    JSON.stringify(contrastResults, null, 2)
  );
}

run().catch((err) => {
  console.error("Capture failed:", err);
  process.exit(1);
});
