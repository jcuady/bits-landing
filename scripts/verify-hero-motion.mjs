/**
 * Does the homepage hero animation still work after GSAP became a dynamic import?
 *
 * §42 moved GSAP out of the shared bundle to save 43 KB on every non-homepage
 * route. That is only worth anything if the animation still runs. A lazy import
 * can silently never resolve, can resolve after the user has scrolled past, or
 * can register the plugin too late for ScrollTrigger to measure correctly — and
 * none of those show up as an error.
 *
 * So this drives the real behaviour: load the homepage at a viewport that
 * satisfies the matchMedia query, scroll through the hero, and assert the deck
 * actually advances.
 *
 * Run: node scripts/verify-hero-motion.mjs
 */
import { chromium } from "playwright";
import { startServer } from "./lib/serve.mjs";

const { base: BASE, stop } = await startServer({ label: "hero-motion" });

let failed = 0;
const check = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${cond ? "" : `  [${detail}]`}`);
  if (!cond) failed++;
};

const browser = await chromium.launch({ headless: true, channel: process.env.PW_CHANNEL || "msedge" });

/* -- 1. The animation actually advances ---------------------------------- */
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await context.newPage();
const errors = [];
page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
page.on("pageerror", (e) => errors.push(String(e)));

await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 45000 });

// The chunk loads asynchronously; give it room before asserting on behaviour.
await page.waitForTimeout(1500);

const progress = new Set();
const height = await page.evaluate(() => document.body.scrollHeight);
check("hero section is scrollable (has the 2400px pin height)", height > 3000, `page height ${height}`);

// Scroll INSIDE the hero's own range.
//
// The ScrollTrigger spans `start: "top 72px"` to `end: "bottom bottom"` of a
// 2400px hero sitting at the top of a much longer page. Scrolling the whole page
// in ten jumps overshoots that range almost immediately, so only the start and
// end states are ever sampled — which reads as "the scrub did not run" when it
// ran perfectly well.
const heroBox = await page.evaluate(() => {
  const el = [...document.querySelectorAll("div")].find(
    (n) => n.className.includes("lg:h-[2400px]") && n.className.includes("relative")
  );
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { top: r.top + window.scrollY, height: r.height };
});
check("the 2400px hero container is present", !!heroBox, "could not locate the hero element");

const heroTop = heroBox ? heroBox.top : 0;
const heroSpan = heroBox ? heroBox.height : 2000;

for (let i = 0; i <= 12; i++) {
  const y = Math.round(heroTop - 72 + (heroSpan + 800 - 72) * (i / 12));
  await page.evaluate((v) => window.scrollTo(0, v), y);
  await page.waitForTimeout(300);
  // The only signal that exists in the DOM is the --tab-progress custom
  // property, which the ScrollTrigger's onUpdate writes and which the progress
  // bar's width is bound to. An earlier version of this test looked for a
  // data-active-tab attribute that the component never renders, so it would
  // have reported "no tabs observed" and looked like a broken animation.
  const p = await page.evaluate(() => {
    const el = [...document.querySelectorAll("*")].find((n) =>
      (n.getAttribute("style") || "").includes("--tab-progress")
    );
    return el ? el.style.getPropertyValue("--tab-progress").trim() : null;
  });
  if (p) progress.add(p);
}

check(
  "the --tab-progress custom property advances during scroll (the scrub is alive)",
  progress.size >= 3,
  `distinct values seen: ${[...progress].join(", ") || "none"}`
);

const numeric = [...progress]
  .map((v) => parseFloat(v))
  .filter((n) => Number.isFinite(n));
check(
  "the progress spans a real range, not a constant",
  numeric.length > 0 && Math.max(...numeric) - Math.min(...numeric) >= 20,
  `range ${numeric.length ? `${Math.min(...numeric)}% - ${Math.max(...numeric)}%` : "n/a"}`
);

check("no console or page errors on the homepage", errors.length === 0, errors.slice(0, 2).join(" | "));

await context.close();

/* -- 2. Reduced motion still suppresses it ------------------------------- */
const rmContext = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  reducedMotion: "reduce",
});
const rmPage = await rmContext.newPage();
await rmPage.goto(BASE + "/", { waitUntil: "networkidle", timeout: 45000 });
await rmPage.waitForTimeout(1200);
const rmHeight = await rmPage.evaluate(() => document.body.scrollHeight);
for (let i = 0; i <= 6; i++) {
  await rmPage.evaluate((v) => window.scrollTo(0, v), Math.round((rmHeight - 800) * (i / 6)));
  await rmPage.waitForTimeout(200);
}
const rmProgress = await rmPage.evaluate(() => {
  const el = document.querySelector('[style*="--tab-progress"]');
  return el ? el.style.getPropertyValue("--tab-progress") : null;
});
// The matchMedia query requires no-preference, so ScrollTrigger must NOT be
// created and --tab-progress must be left at the value the component renders
// inline: "25%" (hero-product.tsx sets it on the deck element's style).
// An earlier version of this assertion expected 14% and failed on a correctly
// working page - 14% is the clamp floor inside the scrub callback, not the
// initial value.
check(
  "prefers-reduced-motion suppresses the scrub (progress stays at its initial 25%)",
  !rmProgress || rmProgress.trim() === "" || rmProgress.trim() === "25%",
  `--tab-progress = ${rmProgress}`
);
await rmContext.close();

/* -- 3. GSAP is NOT downloaded by a page with no hero --------------------- */
const loginContext = await browser.newContext();
const loginPage = await loginContext.newPage();
const loginJs = [];
loginPage.on("response", (r) => {
  if (/\/_next\/static\/chunks\/.*\.js$/.test(r.url())) loginJs.push(r.url());
});
await loginPage.goto(BASE + "/login", { waitUntil: "networkidle", timeout: 45000 });
await loginPage.waitForTimeout(500);
const loginChunkCount = loginJs.length;
await loginContext.close();

const homeContext = await browser.newContext();
const homePage = await homeContext.newPage();
const homeJs = [];
homePage.on("response", (r) => {
  if (/\/_next\/static\/chunks\/.*\.js$/.test(r.url())) homeJs.push(r.url());
});
await homePage.goto(BASE + "/", { waitUntil: "networkidle", timeout: 45000 });
await homePage.waitForTimeout(1500);
const homeChunkCount = homeJs.length;
await homeContext.close();

await browser.close();
await stop();

check(
  "the homepage downloads more JS than /login (GSAP arrives only there)",
  homeChunkCount > loginChunkCount,
  `home ${homeChunkCount} chunks, login ${loginChunkCount} chunks`
);

console.log(failed === 0 ? "\n✔ hero motion verified" : `\n✖ ${failed} hero motion assertion(s) failed`);
process.exit(failed ? 1 : 0);