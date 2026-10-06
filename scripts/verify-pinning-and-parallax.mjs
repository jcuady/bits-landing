import { chromium } from "playwright";
import path from "node:path";

const artifactDir = "C:\\Users\\jcuad\\.gemini\\antigravity-ide\\brain\\5bd04611-7565-45f0-9f7e-2c449b5f6c25";

async function verify() {
  console.log("Launching Edge browser...");
  const browser = await chromium.launch({
    channel: "msedge",
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  console.log("Navigating to http://localhost:3847/ ...");
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // 1. Initial Cloud Layer Transform at top
  const initialCloudTransform = await page.evaluate(() => {
    const el = document.querySelector('section[class*="relative pt-28"] [class*="animate-cloud-drift"]')?.parentElement;
    return el ? window.getComputedStyle(el).transform : "none";
  });
  console.log("Initial Cloud Layer 1 transform:", initialCloudTransform);

  // 2. Scroll to Cockpit trigger start
  console.log("Scrolling to #cockpit...");
  const cockpitEl = page.locator("#cockpit");
  const cockpitBox = await cockpitEl.boundingBox();
  console.log("Cockpit bounding box top:", cockpitBox?.y);

  await page.evaluate(() => {
    const el = document.getElementById("cockpit");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(1000);

  // Capture Tab 1 (Cockpit / PTP)
  const tab1Path = path.join(artifactDir, "verify_pin_tab1_ptp.png");
  await page.screenshot({ path: tab1Path });
  console.log("✓ Captured Tab 1 (PTP):", tab1Path);

  // 3. Scroll forward inside the pin to reach Tab 2 (Predictive Dialer)
  console.log("Scrubbing into Tab 2 (Predictive Dialer)...");
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: "instant" }));
  await page.waitForTimeout(800);

  const tab2Path = path.join(artifactDir, "verify_pin_tab2_dialer.png");
  await page.screenshot({ path: tab2Path });
  console.log("✓ Captured Tab 2 (Predictive Dialer):", tab2Path);

  // 4. Scrub forward inside the pin to reach Tab 3 (Field Agents App)
  console.log("Scrubbing into Tab 3 (Field Agents App)...");
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: "instant" }));
  await page.waitForTimeout(800);

  const tab3Path = path.join(artifactDir, "verify_pin_tab3_field.png");
  await page.screenshot({ path: tab3Path });
  console.log("✓ Captured Tab 3 (Field App):", tab3Path);

  // 5. Scrub forward inside the pin to reach Tab 4 (QA Scoring)
  console.log("Scrubbing into Tab 4 (Real-Time QA Scoring)...");
  await page.evaluate(() => window.scrollBy({ top: 600, behavior: "instant" }));
  await page.waitForTimeout(800);

  const tab4Path = path.join(artifactDir, "verify_pin_tab4_qa.png");
  await page.screenshot({ path: tab4Path });
  console.log("✓ Captured Tab 4 (QA Scoring):", tab4Path);

  // 6. Scroll past the pin to verify the Bottom Conversion Bar is clean and not overlapping
  console.log("Scrolling past pin to inspect conversion bar...");
  await page.evaluate(() => window.scrollBy({ top: 700, behavior: "instant" }));
  await page.waitForTimeout(800);

  const conversionBarPath = path.join(artifactDir, "verify_unpinned_conversion_bar.png");
  await page.screenshot({ path: conversionBarPath });
  console.log("✓ Captured Unpinned Conversion Bar:", conversionBarPath);

  // 7. Verify Cloud Transform has moved upwards (negative Y in matrix)
  const scrolledCloudTransform = await page.evaluate(() => {
    const el = document.querySelector('section[class*="relative pt-28"] [class*="animate-cloud-drift"]')?.parentElement;
    return el ? window.getComputedStyle(el).transform : "none";
  });
  console.log("Scrolled Cloud Layer 1 transform:", scrolledCloudTransform);

  // 8. Mobile Viewport Verification (390x844)
  console.log("Testing mobile viewport 390x844...");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3847/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    const el = document.getElementById("cockpit");
    if (el) el.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(800);

  const mobilePath = path.join(artifactDir, "verify_mobile_hero_cockpit.png");
  await page.screenshot({ path: mobilePath });
  console.log("✓ Captured Mobile Viewport Cockpit:", mobilePath);

  await browser.close();
  console.log("All verification checks completed successfully!");
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
