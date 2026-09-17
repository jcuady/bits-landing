import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = new URL("../qa/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3847", { waitUntil: "networkidle" });
await page.locator("#contact").scrollIntoViewIfNeeded();
await page.waitForTimeout(1200);

// Empty submit -> inline zod errors
await page.getByRole("button", { name: "Request a Demo" }).click();
await page.waitForTimeout(900);
const errors = await page.locator("text=Please").allTextContents();
await page.screenshot({ path: `${OUT}form-errors.png` });

// Invalid email format
await page.locator("#name").fill("QA Tester");
await page.locator("#email").fill("not-an-email");
await page.locator("#company").fill("QA Co");
await page.locator("#interest").selectOption("Core Collections");
await page.getByRole("button", { name: "Request a Demo" }).click();
await page.waitForTimeout(900);
const emailError = await page.locator("#email-error").textContent().catch(() => null);

// Fix and submit -> success (refill all in case of form reset)
await page.locator("#name").fill("QA Tester");
await page.locator("#email").fill("qa@example.com");
await page.locator("#company").fill("QA Co");
await page.locator("#interest").selectOption("Core Collections");
await page.getByRole("button", { name: "Request a Demo" }).click();
await page.waitForTimeout(1500);
const success = await page.locator("text=Message received.").count();
await page.screenshot({ path: `${OUT}form-success.png` });

console.log(JSON.stringify({ emptySubmitErrors: errors, emailError, success }));
await browser.close();
