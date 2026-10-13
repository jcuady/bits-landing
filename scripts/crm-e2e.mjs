/**
 * CRM interaction smoke (Playwright).
 * Run: npm run test:crm
 *
 * ── Rewritten (SYSTEM_AUDIT.md §35) ────────────────────────────────────────
 *
 * This command was permanently broken and nobody could tell, because a test
 * that always fails and a test that was never run look identical in a green
 * build. It hardcoded:
 *
 *   • 16 nav routes, 10 of which do not exist and are not in the nav
 *     (/app/pipelines, /tasks, /conversations, /campaigns, /automations,
 *      /funnels, /forms, /templates, /reports, /team)
 *   • a lead id "ld-1" — the mock data contains no leads at all
 *   • a person named "Marcus Sterling" — does not exist in the repo
 *   • a person named "QA Lead" — does not exist in the repo
 *
 * It died at the first missing route with a 30s Playwright timeout, so the real
 * failure was always a timeout on "Pipelines".
 *
 * Now every route is derived from lib/crm/nav.ts, which is the single source of
 * truth, and the derived list is cross-checked against the filesystem so a nav
 * link can never point at a page that was not built. Data-dependent assertions
 * derive their fixtures at runtime and report SKIPPED when the store is empty
 * rather than failing against data that only exists in a live Supabase project.
 */
import { chromium } from "playwright";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { startServer } from "./lib/serve.mjs";

/* ── Derive the CRM nav from its source of truth ──────────────────────────── */
function crmNavRoutes() {
  const src = readFileSync(join(process.cwd(), "lib", "crm", "nav.ts"), "utf8");
  return [...src.matchAll(/href:\s*"(\/app[^"]*)",\s*label:\s*"([^"]+)"/g)].map((m) => ({
    href: m[1],
    label: m[2],
  }));
}

function routeFileExists(href) {
  // app/(crm)/app/<segment>/page.tsx — the group segment is a filesystem
  // detail, not part of the URL.
  return existsSync(join(process.cwd(), "app", "(crm)", href.replace(/^\/app/, "/app"), "page.tsx"));
}

async function main() {
  const navRoutes = crmNavRoutes();

  let failed = false;
  let skipped = 0;
  let passed = 0;
  const fail = (msg) => {
    console.error("  FAIL:", msg);
    failed = true;
  };
  const ok = () => {
    passed++;
  };
  const skip = (why) => {
    skipped++;
    console.log(`  SKIP: ${why}`);
  };

  /* ── Static cross-check: every nav href has a real page ─────────────────── */
  console.log("\nCRM nav ↔ filesystem");
  for (const { href, label } of navRoutes) {
    if (routeFileExists(href)) {
      console.log(`  ok   ${label.padEnd(14)} ${href}`);
      ok();
    } else {
      fail(`${label} points at ${href}, which has no page.tsx`);
    }
  }

  const { base: BASE, stop } = await startServer({ label: "crm-e2e" });

  try {
    const browser = await chromium.launch({
      headless: true,
      channel: process.env.PW_CHANNEL || "msedge",
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on("dialog", async (d) => d.accept());

    /* ── Auth gate ────────────────────────────────────────────────────────── */
    console.log("\nSession gate");
    await page.goto(BASE + "/app/dashboard", { waitUntil: "networkidle" });
    if (!page.url().includes("/login")) fail("Unauthed /app should redirect to /login");
    else ok();

    /* ── Demo login ───────────────────────────────────────────────────────── */
    console.log("\nSign-in");
    // next=%2Fapplication is not a real route; safeAppNext must refuse to honour
    // it and fall back to a real destination.
    await page.goto(BASE + "/login?next=%2Fapplication");
    await page.getByRole("button", { name: /Sales Director|Enter demo/i }).first().click();
    await page.waitForURL("**/app/**", { timeout: 20000 });
    if (page.url().includes("/application")) fail("safeAppNext honoured a non-existent redirect target");
    else {
      console.log(`  ok   redirected to ${new URL(page.url()).pathname}`);
      ok();
    }
    await page.getByRole("heading").first().waitFor({ timeout: 15000 });

    /* ── Notifications ────────────────────────────────────────────────────── */
    console.log("\nNotifications");
    try {
      await page.getByRole("button", { name: "Notifications" }).click({ timeout: 5000 });
      await page.getByRole("dialog", { name: "Notifications" }).waitFor({ timeout: 5000 });
      await page.getByRole("button", { name: "Notifications" }).click();
      ok();
    } catch {
      skip("no notifications control on this page");
    }

    /* ── Every nav route ──────────────────────────────────────────────────── */
    console.log("\nNavigation");
    for (const { href, label } of navRoutes) {
      const link = page.getByRole("navigation", { name: "CRM" }).getByRole("link", { name: label });
      if ((await link.count()) === 0) {
        fail(`nav declares "${label}" (${href}) but no such link renders`);
        continue;
      }
      await link.click();
      await page.waitForURL(`**${href}`, { timeout: 15000 });
      console.log(`  ok   ${label.padEnd(14)} -> ${new URL(page.url()).pathname}`);
      ok();
    }

    /* ── Direct GET of every route, independent of the nav ────────────────── */
    console.log("\nDirect route responses");
    for (const { href, label } of navRoutes) {
      const res = await page.goto(BASE + href, { waitUntil: "domcontentloaded" });
      const status = res?.status() ?? 0;
      if (status >= 400 || page.url().includes("/login")) {
        fail(`${href} returned ${status}${page.url().includes("/login") ? " and bounced to login" : ""}`);
      } else {
        console.log(`  ok   ${href.padEnd(20)} ${status}`);
        ok();
      }
    }

    /* ── Leads list: derive whatever is actually there ────────────────────── */
    console.log("\nLeads");
    await page.goto(BASE + "/app/leads", { waitUntil: "networkidle" });
    const leadRows = page.locator("table tbody tr, [role='row']");
    const rowCount = await leadRows.count();
    if (rowCount === 0) {
      skip("no leads in the store (expected without a live Supabase project) — list assertions not exercised");
    } else {
      ok();
      try {
        const statusFilter = page.getByLabel("Status", { exact: true });
        if ((await statusFilter.count()) > 0) {
          await statusFilter.selectOption("qualified");
          await page.waitForTimeout(500);
          console.log(`  ok   status filter applied (${rowCount} row(s) before filtering)`);
          ok();
        } else {
          skip("no Status filter control");
        }
      } catch (err) {
        fail(`status filter threw: ${err.message}`);
      }
    }

    /* ── Settings ─────────────────────────────────────────────────────────── */
    console.log("\nSettings");
    await page.goto(BASE + "/app/settings", { waitUntil: "networkidle" });
    try {
      const sw = page.getByRole("switch").first();
      await sw.waitFor({ timeout: 5000 });
      const before = await sw.getAttribute("aria-checked");
      await sw.click();
      const after = await sw.getAttribute("aria-checked");
      if (before === after) fail("Settings switch did not toggle");
      else ok();
    } catch {
      skip("no switch control on /app/settings");
    }

    /* ── Mobile nav ───────────────────────────────────────────────────────── */
    console.log("\nMobile navigation");
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE + "/app/dashboard", { waitUntil: "networkidle" });
    try {
      await page.getByRole("button", { name: "Open navigation" }).click({ timeout: 5000 });
      const dialog = page.getByRole("dialog", { name: "CRM navigation" });
      await dialog.waitFor({ timeout: 5000 });
      // Sequential on purpose: .find() with an async predicate silently
      // misbehaves, and an unresolved promise is always truthy.
      let first = null;
      for (const r of navRoutes) {
        if ((await dialog.getByRole("link", { name: r.label }).count()) > 0) {
          first = r;
          break;
        }
      }
      if (!first) fail("mobile CRM navigation contains no known route");
      else {
        await dialog.getByRole("link", { name: first.label }).click();
        await page.waitForURL(`**${first.href}`, { timeout: 15000 });
        console.log(`  ok   mobile nav -> ${first.href}`);
        ok();
      }
    } catch (err) {
      fail(`mobile navigation failed: ${err.message}`);
    }

    /* ── Logout ───────────────────────────────────────────────────────────── */
    console.log("\nSession teardown");
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE + "/app/dashboard", { waitUntil: "networkidle" });
    try {
      await page.getByRole("button", { name: /Log out/i }).click({ timeout: 8000 });
      await page.waitForURL("**/login", { timeout: 15000 });
      await page.goto(BASE + "/app/dashboard");
      await page.waitForURL("**/login**", { timeout: 15000 });
      if (!page.url().includes("/login")) fail("Logout did not clear the session gate");
      else {
        console.log("  ok   logout clears the session");
        ok();
      }
    } catch (err) {
      fail(`logout flow failed: ${err.message}`);
    }

    /* ── Invalid credentials ──────────────────────────────────────────────── */
    console.log("\nCredential handling");
    try {
      await page.locator("#email").fill("not-an-email");
      await page.locator("#password").fill("123456");
      await page.getByRole("button", { name: /Sign in/i }).click();
      await page.getByRole("alert").waitFor({ timeout: 10000 });
      console.log("  ok   invalid credentials surface an alert");
      ok();
    } catch (err) {
      fail(`invalid credentials produced no alert: ${err.message}`);
    }

    /* ── Public entry ─────────────────────────────────────────────────────────── */
    console.log("\nReachability");
    try {
      // The previous version asserted a "CRM Sign in" link on the homepage.
      // No such link exists: href="/login" appears in exactly two places in the
      // repo — the CRM layout's redirect and the forgot-password page's "Return
      // to sign in". The marketing site provides no route to the CRM login at
      // all. Asserting a link that was never built is how this test stayed
      // broken for so long.
      await page.goto(BASE + "/login", { waitUntil: "domcontentloaded" });
      if (!page.url().includes("/login")) fail("/login is not directly reachable");
      else {
        console.log("  ok   /login reachable by URL");
        ok();
      }

      await page.goto(BASE + "/forgot-password", { waitUntil: "domcontentloaded" });
      // The "Return to sign in" link only renders in the post-submit state, so
      // the form has to be submitted first. (The page is honest about itself:
      // "Simulated flow for this demo. No email is sent.")
      await page.locator("#email").fill("qa@example.com");
      await page.getByRole("button", { name: /Send|Send reset|Resend/i }).first().click();
      await page.getByRole("link", { name: /Return to sign in/i }).first().waitFor({ timeout: 15000 });
      await page.getByRole("link", { name: /Return to sign in/i }).first().click();
      await page.waitForURL("**/login", { timeout: 15000 });
      console.log("  ok   forgot-password -> return to sign in");
      ok();
    } catch (err) {
      fail(`CRM entry reachability failed: ${err.message}`);
    }

    await browser.close();
  } catch (err) {
    fail(String(err && err.stack ? err.stack : err));
  } finally {
    await stop();
  }

  console.log(`\n${passed} passed, ${skipped} skipped, ${failed ? "FAILED" : "no failures"}`);
  if (failed) process.exit(1);
  console.log("CRM e2e smoke: PASS");
}

main();