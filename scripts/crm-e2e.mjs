/**
 * CRM interaction smoke (Playwright).
 * Run: npm run test:crm
 */
import { chromium } from "playwright";
import { spawn } from "child_process";
import http from "http";

const PORT = 3110;
const BASE = `http://127.0.0.1:${PORT}`;

function waitForServer(ms = 45000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(BASE + "/login", (res) => {
        res.resume();
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - start > ms) reject(new Error("Server did not start"));
        else setTimeout(tick, 400);
      });
    };
    tick();
  });
}

async function main() {
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: process.cwd(),
    shell: true,
    stdio: "pipe",
  });
  let failed = false;
  const fail = (msg) => {
    console.error("FAIL:", msg);
    failed = true;
  };

  try {
    await waitForServer();
    const browser = await chromium.launch({
      headless: true,
      channel: process.env.PW_CHANNEL || "msedge",
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto(BASE + "/app/dashboard", { waitUntil: "networkidle" });
    if (!page.url().includes("/login")) fail("Unauthed /app should redirect to /login");

    await page.getByRole("button", { name: "Enter demo" }).click();
    await page.waitForURL("**/app/dashboard");
    await page.getByRole("heading", { name: "Dashboard" }).waitFor();

    await page.getByRole("button", { name: "Notifications" }).click();
    await page.getByRole("dialog", { name: "Notifications" }).waitFor();
    await page.getByRole("button", { name: "Dismiss" }).click();
    await page.getByRole("dialog", { name: "Notifications" }).waitFor({ state: "detached" });

    const routes = [
      ["Leads", "/app/leads"],
      ["Contacts", "/app/contacts"],
      ["Companies", "/app/companies"],
      ["Opportunities", "/app/opportunities"],
      ["Pipelines", "/app/pipelines"],
      ["Tasks", "/app/tasks"],
      ["Conversations", "/app/conversations"],
      ["Campaigns", "/app/campaigns"],
      ["Automations", "/app/automations"],
      ["Funnels", "/app/funnels"],
      ["Forms", "/app/forms"],
      ["Templates", "/app/templates"],
      ["Reports", "/app/reports"],
      ["Team", "/app/team"],
      ["Settings", "/app/settings"],
    ];
    for (const [label, path] of routes) {
      await page.getByRole("navigation", { name: "CRM" }).getByRole("link", { name: label }).click();
      await page.waitForURL(`**${path}`);
      const len = await page.evaluate(() => document.body.innerText.length);
      if (len < 20) fail(`${path} rendered empty`);
    }

    await page.goto(BASE + "/app/leads/ld-1");
    await page.getByRole("button", { name: "qualified", exact: true }).click();
    await page.locator("span.uppercase").filter({ hasText: /^qualified$/i }).first().waitFor();

    await page.goto(BASE + "/app/tasks");
    await page.getByRole("button", { name: "Complete" }).first().click();
    await page.getByRole("button", { name: "Reopen" }).first().waitFor();

    await page.goto(BASE + "/app/pipelines");
    await page.getByRole("button", { name: "Move" }).first().click();

    await page.goto(BASE + "/app/campaigns");
    const pause = page.getByRole("button", { name: "Pause" }).first();
    if ((await pause.count()) > 0) {
      await pause.click();
      await page.getByRole("button", { name: "Enable" }).first().waitFor();
    }

    await page.goto(BASE + "/app/automations");
    await page.getByRole("button", { name: "Pause" }).first().click();
    await page.getByRole("button", { name: "Enable" }).first().waitFor();

    await page.goto(BASE + "/app/settings");
    const sw = page.getByRole("switch").first();
    const before = await sw.getAttribute("aria-checked");
    await sw.click();
    const after = await sw.getAttribute("aria-checked");
    if (before === after) fail("Settings switch did not toggle");

    await page.goto(BASE + "/app/conversations");
    await page.getByText("Demo follow-up").click();
    await page.getByText("Recording and intake").waitFor();

    await page.goto(BASE + "/app/contacts/ct-1");
    await page.getByRole("heading", { name: "Elise Navarro" }).waitFor();
    await page.goto(BASE + "/app/companies/co-1");
    await page.getByRole("heading", { name: "Harborline Logistics" }).waitFor();
    await page.goto(BASE + "/app/opportunities/op-1");
    await page.getByRole("button", { name: "proposal" }).click();

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + "/app/dashboard");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page.getByRole("dialog", { name: "CRM navigation" }).waitFor();
    await page.getByRole("navigation", { name: "Mobile CRM" }).getByRole("link", { name: "Reports" }).click();
    await page.waitForURL("**/app/reports");

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE + "/app/dashboard");
    await page.getByRole("button", { name: /Log out/i }).click();
    await page.waitForURL("**/login");
    await page.goto(BASE + "/app/dashboard");
    if (!page.url().includes("/login")) fail("Logout did not clear session gate");

    await page.goto(BASE + "/");
    await page.getByRole("link", { name: "CRM Sign in" }).first().click();
    await page.waitForURL("**/login");

    await browser.close();
  } catch (err) {
    fail(String(err && err.stack ? err.stack : err));
  } finally {
    server.kill("SIGTERM");
  }

  if (failed) process.exit(1);
  console.log("CRM e2e smoke: PASS");
}

main();
