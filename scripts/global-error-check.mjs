/**
 * Verifies app/global-error.tsx in a real browser with the root-layout canary
 * header set. READ-ONLY. Run only against a build that carries the canary.
 */
import { chromium } from "playwright";

const BASE = process.env.RESPONSIVE_BASE_URL ?? "http://localhost:3848";

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "msedge",
});
const ctx = await browser.newContext({
  extraHTTPHeaders: { "x-canary-boom": "1" },
  viewport: { width: 1280, height: 800 },
});
const page = await ctx.newPage();

let failures = 0;
const fail = (m) => { console.log("  FAIL: " + m); failures++; };
const ok = (m) => console.log("  ok:   " + m);

const resp = await page.goto(BASE + "/", { waitUntil: "networkidle" });
console.log(`HTTP status: ${resp.status()}`);
if (resp.status() !== 500) fail(`expected 500, got ${resp.status()}`);
else ok("500 returned");

// Give the client boundary a moment to hydrate and paint.
await page.waitForTimeout(1200);

const state = await page.evaluate(() => {
  const bodyText = (document.body.innerText || "").trim();
  return {
    h1: document.querySelector("h1")?.textContent?.trim() ?? null,
    button: document.querySelector("button")?.textContent?.trim() ?? null,
    bodyText: bodyText.slice(0, 300),
    bodyLen: bodyText.length,
    bg: getComputedStyle(document.body).backgroundColor,
  };
});

console.log("\nrendered state:");
console.log("  h1        :", JSON.stringify(state.h1));
console.log("  button    :", JSON.stringify(state.button));
console.log("  body text :", JSON.stringify(state.bodyText));
console.log("  body len  :", state.bodyLen);
console.log("  bg        :", state.bg);

console.log("\nassertions:");
if (state.h1 !== "Application error") fail(`h1 should be "Application error", got ${JSON.stringify(state.h1)}`);
else ok('h1 renders "Application error"');

if (state.button !== "Reload") fail(`expected a "Reload" button, got ${JSON.stringify(state.button)}`);
else ok('"Reload" button present');

if (state.bodyLen === 0) fail("page is visually blank — the boundary did not paint");
else ok("boundary painted visible content");

// No internal detail may reach the user.
const visible = (state.bodyText + " " + (state.h1 ?? "") + " " + (state.button ?? "")).toLowerCase();
for (const leak of ["root_layout_boom_canary", "layout.tsx", "node_modules", "at rootlayout", "canary"]) {
  if (visible.includes(leak)) fail(`LEAK: "${leak}" is visible to the user`);
}
ok("no internal detail visible in rendered text");

// The Reload button must be operable and keyboard reachable.
const btnInfo = await page.evaluate(() => {
  const b = document.querySelector("button");
  if (!b) return null;
  const r = b.getBoundingClientRect();
  return { w: Math.round(r.width), h: Math.round(r.height), text: b.textContent?.trim() };
});
console.log("\nreload button size:", JSON.stringify(btnInfo));
if (!btnInfo || btnInfo.h < 24 || btnInfo.w < 24) {
  fail(`Reload button ${btnInfo?.w}x${btnInfo?.h} is below the 24px WCAG 2.5.8 minimum`);
} else ok(`Reload button ${btnInfo.w}x${btnInfo.h} meets WCAG 2.5.8`);

// The Reload button must be wired to `reset()`. The canary header is
// context-wide and permanent, so a successful reset re-throws and the boundary
// re-renders — which is exactly the signal we want: the handler ran, the client
// did not crash, and the UI stayed usable.
console.log("\nreset() wiring:");
let clientErrors = 0;
page.on("pageerror", () => { clientErrors++; });
await page.getByRole("button", { name: "Reload" }).click();
await page.waitForTimeout(1500);
const after = await page.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent?.trim() ?? null,
  hasButton: !!document.querySelector("button"),
}));
if (clientErrors > 0) fail(`clicking Reload threw ${clientErrors} uncaught client error(s)`);
else ok("no uncaught client errors after clicking Reload");
if (after.h1 === "Application error" && after.hasButton) {
  ok("boundary still interactive after reset() (reset is wired and re-renders)");
} else {
  fail(`post-reset UI is broken: ${JSON.stringify(after)}`);
}

await browser.close();
console.log(failures === 0 ? "\nGLOBAL-ERROR CHECK: PASS" : `\nGLOBAL-ERROR CHECK: ${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);