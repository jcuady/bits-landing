import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = new URL("../qa/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3847", { waitUntil: "networkidle" });
await page.locator("#contact").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);

await page.getByRole("button", { name: "Send inquiry" }).click();
await page.waitForTimeout(900);
const errors = await page.locator("#contact p").evaluateAll((nodes) =>
  nodes.map((node) => node.textContent?.trim() ?? "").filter((text) => /enter|choose|add a short/i.test(text))
);
await page.screenshot({ path: `${OUT}form-errors.png` });

await page.locator("#name").fill("QA Tester");
await page.locator("#email").fill("not-an-email");
await page.locator("#company").fill("QA Co");
await page.locator("#interest").selectOption("Core Collections");
await page.locator("#message").fill("Need a collections workspace walkthrough for a 40-seat floor.");
await page.getByRole("button", { name: "Send inquiry" }).click();
await page.waitForTimeout(900);
const emailError = await page.locator("#email-error").textContent().catch(() => null);

await page.locator("#name").fill("QA Tester");
await page.locator("#email").fill("qa@example.com");
await page.locator("#company").fill("QA Co");
await page.locator("#interest").selectOption("Core Collections");
await page.locator("#message").fill("Need a collections workspace walkthrough for a 40-seat floor.");
await page.getByRole("button", { name: "Send inquiry" }).click();
await page.waitForTimeout(2500);
const success = await page.locator("text=We have your note.").count();
const inbox = await page.locator("text=bits_inquiries@boundlessits.com").count();
await page.screenshot({ path: `${OUT}form-success.png` });

console.log(JSON.stringify({ emptySubmitErrors: errors, emailError, success, inbox }));
if (!success) process.exit(1);
await browser.close();
