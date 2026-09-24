/**
 * CRM interaction smoke (Playwright).
 * Run: npm run test:crm
 */
import { chromium } from "playwright";
import { spawn } from "child_process";
import { createRequire } from "module";
import http from "http";
import net from "net";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");

function getFreePort() {
  return new Promise((resolve, reject) => {
    const s = net.createServer();
    s.listen(0, "127.0.0.1", () => {
      const addr = s.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      s.close((err) => (err ? reject(err) : resolve(port)));
    });
    s.on("error", reject);
  });
}

function waitForServer(base, ms = 45000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      const req = http.get(base + "/login", (res) => {
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
  const PORT = await getFreePort();
  const BASE = `http://127.0.0.1:${PORT}`;
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT), "-H", "127.0.0.1"], {
    cwd: process.cwd(),
    stdio: "pipe",
  });
  let failed = false;
  const fail = (msg) => {
    console.error("FAIL:", msg);
    failed = true;
  };

  try {
    await waitForServer(BASE);
    const browser = await chromium.launch({
      headless: true,
      channel: process.env.PW_CHANNEL || "msedge",
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("dialog", async (d) => d.accept());

    await page.goto(BASE + "/app/dashboard", { waitUntil: "networkidle" });
    if (!page.url().includes("/login")) fail("Unauthed /app should redirect to /login");

    await page.goto(BASE + "/login?next=%2Fapplication");
    await page.getByRole("button", { name: "Enter demo" }).click();
    await page.waitForURL("**/app/dashboard");
    await page.getByRole("heading", { name: /Dashboard/i }).waitFor({ timeout: 15000 });

    await page.getByRole("button", { name: "Notifications" }).click();
    await page.getByRole("dialog", { name: "Notifications" }).waitFor();
    await page.getByRole("button", { name: "Dismiss" }).click();

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
    }

    await page.goto(BASE + "/app/leads");
    await page.locator("select").selectOption("qualified");
    await page.getByText("Marcus Sterling").first().waitFor();

    await page.goto(BASE + "/app/leads/ld-1");
    await page.getByRole("button", { name: "qualified", exact: true }).click();

    await page.goto(BASE + "/app/tasks");
    await page.getByRole("button", { name: "Complete" }).first().click();
    await page.getByRole("button", { name: "Reopen" }).first().waitFor();

    await page.goto(BASE + "/app/pipelines");
    await page.getByRole("button", { name: "Move" }).first().click();

    await page.goto(BASE + "/app/conversations");
    await page.getByPlaceholder("Type a reply…").fill("Thanks — looping in ops.");
    await page.getByRole("button", { name: "Send" }).click();
    await page.getByText("Thanks — looping in ops.").waitFor();

    await page.goto(BASE + "/app/forms");
    await page.getByRole("button", { name: "Unpublish" }).first().click();
    await page.getByRole("button", { name: "Publish" }).first().waitFor();

    await page.goto(BASE + "/app/templates");
    await page.getByRole("button", { name: "Preview" }).first().click();
    await page.getByRole("dialog").waitFor();
    await page.getByRole("button", { name: "Close" }).click();

    await page.goto(BASE + "/app/campaigns");
    const pause = page.getByRole("button", { name: "Pause" }).first();
    if ((await pause.count()) > 0) {
      await pause.click();
      await page.getByRole("button", { name: "Enable" }).first().waitFor();
    }

    await page.goto(BASE + "/app/automations");
    await page.getByRole("button", { name: "Pause" }).first().click();

    await page.goto(BASE + "/app/settings");
    const sw = page.getByRole("switch").first();
    const before = await sw.getAttribute("aria-checked");
    await sw.click();
    const after = await sw.getAttribute("aria-checked");
    if (before === after) fail("Settings switch did not toggle");
    await page.getByLabel("Display name").fill("QA Lead");
    await page.getByLabel("Display name").blur();
    await page.getByText("QA Lead").first().waitFor();

    await page.goto(BASE + "/app/team");
    await page.getByRole("button", { name: "Invite member" }).click();

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
    await page.waitForURL("**/login**");
    if (!page.url().includes("/login")) fail("Logout did not clear session gate");

    await page.locator("#email").fill("not-an-email");
    await page.locator("#password").fill("123456");
    await page.getByRole("button", { name: "Sign in" }).click();
    await page.getByRole("alert").waitFor();

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
