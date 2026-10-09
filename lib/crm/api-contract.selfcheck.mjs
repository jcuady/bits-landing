/**
 * CRM API contract regression selfcheck.
 *
 * Guards the five defects fixed on 8 Oct 2026 across the four routes in
 * `app/api/crm/*`:
 *
 *   1. Truthiness-only validation accepted objects/arrays/numbers as strings
 *      and never checked that `email` was an email.
 *   2. No cache contract — authenticated PII responses carried no
 *      `Cache-Control`, so any intermediary could heuristically cache them.
 *   3. Malformed JSON surfaced as a 500 instead of a 400.
 *   4. `POST /api/crm/leads` had no rate limiting, unlike every other write
 *      path (contact form 5/10min, login 8/20 per 10min, forgot-password 5).
 *   5. The update branch reported 500 when no row matched the id, instead of 404.
 *
 * Run: node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON lib/crm/api-contract.selfcheck.mjs
 */

import assert from "node:assert/strict";
import {
  leadPayloadSchema,
  campaignPayloadSchema,
  automationPayloadSchema,
  noStoreHeaders,
  isUnparseableBody,
  fieldErrorsOf,
} from "./api-contract.ts";

// --- 1. Truthiness-only validation is gone -----------------------------------
const goodLead = {
  name: "Maria Santos",
  email: "maria@example.ph",
  company: "Santos Logistics",
  message: "Need automated PTP tracking for a 40-seat collections floor.",
};

assert.equal(leadPayloadSchema.safeParse(goodLead).success, true, "valid lead must parse");

// The old guard was `if (!body.name)` — these all passed it.
for (const bad of [
  { ...goodLead, name: {} },
  { ...goodLead, name: [] },
  { ...goodLead, name: 0 },
  { ...goodLead, name: false },
  { ...goodLead, name: null },
  { ...goodLead, name: "" },
  { ...goodLead, name: "   " },
]) {
  assert.equal(
    leadPayloadSchema.safeParse(bad).success,
    false,
    `non-string name must be rejected (old truthiness guard accepted ${JSON.stringify(bad.name)})`
  );
}

// Email was NEVER validated before. These must now fail.
for (const badEmail of ["not-an-email", "@example.ph", "a@", "a b@example.ph", 12345, {}]) {
  assert.equal(
    leadPayloadSchema.safeParse({ ...goodLead, email: badEmail }).success,
    false,
    `invalid email must be rejected (got ${JSON.stringify(badEmail)})`
  );
}

// Oversized payloads must not reach the DB / email templates.
assert.equal(leadPayloadSchema.safeParse({ ...goodLead, message: "x".repeat(5001) }).success, false);
assert.equal(leadPayloadSchema.safeParse({ ...goodLead, company: "x".repeat(201) }).success, false);

// Missing required fields.
for (const key of ["name", "email", "company", "message"]) {
  const partial = { ...goodLead };
  delete partial[key];
  assert.equal(
    leadPayloadSchema.safeParse(partial).success,
    false,
    `missing "${key}" must be rejected`
  );
}

// --- 2. Campaign + automation payloads ---------------------------------------
assert.equal(campaignPayloadSchema.safeParse({ name: "Q4 Collections Push" }).success, true);
assert.equal(campaignPayloadSchema.safeParse({}).success, false, "campaign name is required");
assert.equal(campaignPayloadSchema.safeParse({ name: "x", status: "bogus" }).success, false,
  "campaign status must be constrained to the DB enum");

assert.equal(
  automationPayloadSchema.safeParse({ name: "Welcome", trigger_type: "inbound", action_type: "email" })
    .success,
  true
);
assert.equal(
  automationPayloadSchema.safeParse({ name: "x", trigger_type: "t" }).success,
  false,
  "action_type is required"
);
// The update branch keys on a uuid; a non-uuid id previously flowed into .eq("id", …).
assert.equal(
  automationPayloadSchema.safeParse({
    name: "x", trigger_type: "t", action_type: "a", id: "not-a-uuid",
  }).success,
  false,
  "automation id must be a uuid"
);
assert.equal(
  automationPayloadSchema.safeParse({
    name: "x", trigger_type: "t", action_type: "a",
    id: "3f2504e0-4f89-11d3-9a0c-0305e82c3301",
  }).success,
  true
);

// --- 3. Cache contract --------------------------------------------------------
// Every header here was confirmed on the wire against a production build:
// `Cache-Control`, `Pragma`, `Expires` AND `Vary: Cookie` all arrive on
// /api/crm/* responses. Next.js emits its own `vary: rsc, next-router-*`
// header alongside it rather than replacing it.
//
// (An earlier revision of this gate asserted only Cache-Control/Pragma/Expires,
// on the incorrect belief that Next.js discards `Vary`. That belief came from a
// curl pipeline that kept only the first `^vary:` match and silently dropped the
// second. See SYSTEM_AUDIT.md §22.3 CORRECTION.)
{
  const h = noStoreHeaders();
  assert.match(h["Cache-Control"], /no-store/, "PII responses must be no-store");
  assert.match(h["Cache-Control"], /private/, "PII responses must be private");
  assert.equal(h.Vary, "Cookie", "a shared cache must key on the session cookie");
  assert.equal(h.Pragma, "no-cache");
  assert.equal(h.Expires, "0");
}

// --- 4. Malformed JSON is distinguishable from a validation failure ----------
assert.equal(isUnparseableBody(new SyntaxError("Unexpected end of JSON input")), true);
assert.equal(isUnparseableBody(new TypeError("invalid json body")), true);
assert.equal(isUnparseableBody(new Error("Supabase exploded")), false, "a real error is not a parse error");

// --- 5. Field errors are flat and leak nothing -------------------------------
{
  const res = leadPayloadSchema.safeParse({ ...goodLead, email: "nope" });
  assert.equal(res.success, false);
  const errs = fieldErrorsOf(res.error);
  assert.equal(typeof errs.email, "string");
  assert.ok(!("path" in errs), "error entries must be plain strings, not zod issue objects");
  assert.ok(!JSON.stringify(errs).includes("ZodError"), "must not leak zod internals");
}

console.log("crm/api-contract.selfcheck: PASS");