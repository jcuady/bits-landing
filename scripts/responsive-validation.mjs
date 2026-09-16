import { chromium } from "playwright";

const BASE = "http://localhost:3847";
const viewports = [
  { name: "iphone-se", width: 375, height: 667, touch: true },
  { name: "iphone-15", width: 393, height: 852, touch: true },
  { name: "iphone-15-pro-max", width: 430, height: 932, touch: true },
  { name: "ipad-mini", width: 768, height: 1024, touch: true },
  { name: "ipad-pro", width: 1024, height: 1366, touch: true },
  { name: "laptop", width: 1280, height: 800, touch: false },
  { name: "desktop", width: 1440, height: 900, touch: false },
  { name: "wide", width: 1920, height: 1080, touch: false },
  { name: "phone-landscape", width: 667, height: 375, touch: true },
  { name: "tablet-landscape", width: 1024, height: 768, touch: true },
  // 1280 × 800 display at 200% browser zoom exposes a 640 × 400 CSS viewport.
  { name: "zoom-200", width: 640, height: 400, touch: false },
];

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});

const results = [];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    hasTouch: viewport.touch,
    isMobile: viewport.touch && viewport.width < 768,
    deviceScaleFactor: viewport.touch ? 2 : 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(250);

  const audit = await page.evaluate(({ touch }) => {
    const root = document.documentElement;
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        Number(style.opacity) > 0 &&
        rect.width > 0 &&
        rect.height > 0
      );
    };
    const label = (element) =>
      (
        element.getAttribute("aria-label") ||
        element.textContent ||
        element.getAttribute("name") ||
        element.tagName
      )
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 80);

    const interactive = [...document.querySelectorAll("a, button, input, select, textarea")].filter(
      (element) =>
        visible(element) &&
        !element.classList.contains("sr-only") &&
        !element.closest('[aria-hidden="true"]')
    );
    const smallTargets = touch
      ? interactive
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return {
              label: label(element),
              tag: element.tagName.toLowerCase(),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            };
          })
          .filter(({ width, height }) => width < 44 || height < 44)
      : [];

    const smallFormText = [...document.querySelectorAll("input, select, textarea")]
      .filter(visible)
      .map((element) => ({
        label: label(element),
        size: Number.parseFloat(getComputedStyle(element).fontSize),
      }))
      .filter(({ size }) => size < 16);

    const clipped = [...document.querySelectorAll("main section")]
      .filter(visible)
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left < -1 || rect.right > root.clientWidth + 1;
      })
      .map((element) => element.id || element.tagName.toLowerCase());

    return {
      scrollWidth: root.scrollWidth,
      clientWidth: root.clientWidth,
      overflow: root.scrollWidth > root.clientWidth + 1,
      smallTargets,
      smallFormText,
      clipped,
      sectionCount: document.querySelectorAll("main section").length,
      h1Count: document.querySelectorAll("h1").length,
      contactVisible: visible(document.querySelector("#contact")),
    };
  }, { touch: viewport.touch });

  if (viewport.width < 1024) {
    const menu = page.getByRole("button", { name: "Open menu" });
    await menu.click();
    const close = page.getByRole("button", { name: "Close menu" });
    const menuAudit = await page.evaluate(() => ({
      bodyLocked: getComputedStyle(document.body).overflow === "hidden",
      dialogVisible: Boolean(document.querySelector('[role="dialog"]')),
    }));
    audit.mobileMenu = {
      ...menuAudit,
      closeTarget: await close.evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { width: Math.round(rect.width), height: Math.round(rect.height) };
      }),
    };
    await close.click();
  }

  results.push({ viewport: viewport.name, ...audit, errors });
  await context.close();
}

console.log(JSON.stringify(results, null, 2));

const failures = results.filter(
  (result) =>
    result.overflow ||
    result.smallTargets.length ||
    result.smallFormText.length ||
    result.clipped.length ||
    result.errors.length ||
    result.sectionCount !== 13 ||
    result.h1Count !== 1 ||
    !result.contactVisible ||
    (result.mobileMenu &&
      (!result.mobileMenu.bodyLocked ||
        !result.mobileMenu.dialogVisible ||
        result.mobileMenu.closeTarget.width < 44 ||
        result.mobileMenu.closeTarget.height < 44))
);

await browser.close();

if (failures.length) {
  console.error(`Responsive validation failed for ${failures.length} viewport(s).`);
  process.exit(1);
}

console.log(`Responsive validation passed for ${results.length} viewport and zoom profiles.`);
