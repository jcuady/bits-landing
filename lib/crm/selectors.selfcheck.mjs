/**
 * Assert the CRM selector helpers behave correctly.
 *
 * This imports the REAL module (via --experimental-strip-types, wired up in
 * package.json) rather than mirroring its math. The mirror approach meant a bug
 * in `formatRelative` passed here unchecked: it floored every negative delta to
 * 1, so any record dated after the reference clock rendered "1h ago" — a record
 * 400 days in the future included.
 *
 * Run directly:
 *   node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON lib/crm/selectors.selfcheck.mjs
 */
import assert from "node:assert/strict";
import {
  MOCK_NOW,
  formatRelative,
  overdueTasks,
  dashboardKpis,
} from "./selectors.ts";
import { roleForEmail } from "./roles.ts";
import { seedCrmState } from "./mock-data.ts";

// --- formatRelative: past ----------------------------------------------------
const REF = new Date("2026-06-15T12:00:00.000Z");
const at = (ms) => new Date(REF.getTime() + ms).toISOString();
const H = 3_600_000;
const D = 86_400_000;

assert.equal(formatRelative(at(-1 * H), REF), "1h ago", "sub-hour floors to 1h ago");
assert.equal(formatRelative(at(-5 * H), REF), "5h ago");
assert.equal(formatRelative(at(-D), REF), "1d ago");
assert.equal(formatRelative(at(-9 * D), REF), "9d ago");

// --- formatRelative: future must never read as "ago" -------------------------
assert.equal(formatRelative(at(1 * H), REF), "in 1h", "1h ahead");
assert.equal(formatRelative(at(5 * H), REF), "in 5h");
assert.equal(formatRelative(at(D), REF), "in 1d");
assert.equal(formatRelative(at(25 * D), REF), "in 25d");
assert.equal(
  formatRelative(at(400 * D), REF),
  "in 400d",
  "a far-future date must not be floored to '1h ago'"
);

// Regression guard for the exact defect: nothing ahead of the reference clock
// may ever render with an "ago" suffix.
for (const days of [1, 2, 7, 30, 365, 400]) {
  const rendered = formatRelative(at(days * D), REF);
  assert.ok(
    !rendered.includes("ago"),
    `future date (+${days}d) rendered as "${rendered}" — must not say "ago"`
  );
}

// --- default clock is the frozen mock clock -----------------------------------
assert.equal(new Date(MOCK_NOW).toISOString(), "2026-09-13T12:00:00.000Z");

// --- seed is internally coherent ---------------------------------------------
const state = seedCrmState();
assert.ok(Array.isArray(state.opportunities), "opportunities is an array");
assert.ok(Array.isArray(state.pipelines), "pipelines is an array");
assert.ok(dashboardKpis(state).length > 0, "dashboard returns KPI rows");
assert.ok(Array.isArray(overdueTasks(state)), "overdueTasks returns an array");

// --- roleForEmail: least privilege --------------------------------------------
// The role shown in the UI must come from the explicit team roster and NOTHING
// else. This previously fell through to `norm.includes("admin")`, so any address
// merely CONTAINING those letters ("notadmin@corp.com", "sysadmin@partner.ph")
// was granted the Admin surface. Regression coverage for exactly that.
const roster = {
  team: [{ id: "tm-1", name: "Malcolm Cuady", email: "demo@boundlessitsolutions.com", role: "Admin" }],
};

assert.equal(roleForEmail("demo@boundlessitsolutions.com", roster), "Admin", "roster member keeps their role");
assert.equal(roleForEmail("DEMO@BOUNDLESSITSOLUTIONS.COM ", roster), "Admin", "match is case/space insensitive");

for (const addr of [
  "notadmin@corp.com",
  "sysadmin@partner.ph",
  "administrator@example.com",
  "admin@evil.test",
  "malcolm@elsewhere.com",
  "demo@other-project.com",
  "attacker@example.com",
]) {
  assert.equal(
    roleForEmail(addr, roster),
    "Rep",
    `"${addr}" must resolve to least privilege, not Admin`
  );
}

// A roster entry for another address still grants exactly that role.
assert.equal(
  roleForEmail("rep@boundlessitsolutions.com", { team: [...roster.team, { id: "tm-2", name: "Rep", email: "rep@boundlessitsolutions.com", role: "Rep" }] }),
  "Rep",
  "explicit Rep in the roster is honoured"
);

console.log("selectors.selfcheck: PASS");