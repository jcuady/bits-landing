/**
 * Inbound-lead service selfcheck.
 *
 * `mapInboundLeadsToCrm` had no coverage at all, and it contained three defects
 * that only show up once you look at the output twice:
 *
 *  1. Entity ids were array indices (`co-inbound-${idx + 1}`). The store
 *     prepends newly-arrived leads, so one new submission shifted every existing
 *     id and the "merge anything I don't have" logic duplicated the whole CRM.
 *  2. Contact phone numbers were `+63 9${Math.random()}`, so every inbound
 *     contact was given an invented mobile that changed on every page load.
 *  3. Opportunity close dates came from `Date.now()`, so every refetch moved them.
 *
 * The mapping must be a pure, idempotent function of the submissions.
 * Run: node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \
 *        lib/crm/inbound-service.selfcheck.mjs
 */
import assert from "node:assert/strict";
import {
  mapInboundLeadsToCrm,
  calculateLeadScore,
} from "./inbound-service.ts";

const base = {
  id: "1",
  name: "Enterprise Client",
  email: "client@enterprise.com",
  company: "Apex Global",
  message: "We need a collections platform.",
  source: "Website Contact Form",
  submittedAt: "2026-09-01T00:00:00.000Z",
  leadScore: 90,
  status: "new",
  assignedTo: "Malcolm Cuady",
  estimatedValue: 650000,
};
const second = {
  ...base,
  id: "2",
  name: "QA Tester",
  email: "qa@example.com",
  company: "QA Co",
  submittedAt: "2026-09-02T00:00:00.000Z",
  leadScore: 70,
};

// --- idempotence -------------------------------------------------------------
const a = mapInboundLeadsToCrm([base, second]);
const b = mapInboundLeadsToCrm([base, second]);
assert.deepEqual(a, b, "mapping the same submissions twice must produce identical output");

// --- no invented, mutating contact details -----------------------------------
for (const c of a.contacts) {
  assert.equal(c.phone, "", "phone must not be invented for a form that never collected one");
}
// Repeat many times: a random phone would differ almost every iteration.
for (let i = 0; i < 25; i++) {
  const run = mapInboundLeadsToCrm([base, second]);
  assert.deepEqual(run.contacts, a.contacts, `contact data mutated on iteration ${i}`);
}

// --- ids are identity-derived, not positional ---------------------------------
const incoming = { ...base, id: "0", name: "Brand New", email: "new@prospect.test", company: "New Co" };
const afterNew = mapInboundLeadsToCrm([incoming, base, second]);

const apexBefore = a.companies.find((c) => c.name === "Apex Global");
const apexAfter = afterNew.companies.find((c) => c.name === "Apex Global");
assert.equal(apexAfter.id, apexBefore.id, "an existing company's id must not change when a new lead arrives");
assert.equal(apexAfter.id, "Apex Global".length > 0 ? apexAfter.id : null);
assert.ok(!/co-inbound-\d/.test(apexAfter.id), "index-derived ids must be gone");

assert.equal(
  afterNew.companies.filter((c) => c.name === "Apex Global").length,
  1,
  "a prepended lead must not duplicate an existing company"
);
assert.equal(
  afterNew.contacts.filter((c) => c.email === "client@enterprise.com").length,
  1,
  "a prepended lead must not duplicate an existing contact"
);
assert.equal(
  afterNew.opportunities.filter((o) => o.name.startsWith("Apex Global")).length,
  1,
  "a prepended lead must not duplicate an existing opportunity"
);

// --- referential integrity ---------------------------------------------------
for (const o of afterNew.opportunities) {
  assert.ok(afterNew.companies.some((c) => c.id === o.companyId), `orphan companyId ${o.companyId}`);
  assert.ok(afterNew.contacts.some((c) => c.id === o.contactId), `orphan contactId ${o.contactId}`);
}
for (const c of afterNew.contacts) {
  assert.ok(afterNew.companies.some((co) => co.id === c.companyId), `orphan contact.companyId ${c.companyId}`);
}

// --- close dates are anchored to the submission, not the wall clock ----------
for (const o of afterNew.opportunities) {
  assert.match(o.closeDate, /^\d{4}-\d{2}-\d{2}$/);
}
assert.equal(
  afterNew.opportunities.find((o) => o.name.startsWith("Apex Global")).closeDate,
  "2026-10-01",
  "close date must be submission date + 30 days (2026-09-01 -> 2026-10-01)"
);

// --- lead scoring ------------------------------------------------------------
assert.equal(calculateLeadScore({}), 70, "baseline score");
assert.equal(
  calculateLeadScore({ companySize: "1,000+", industry: "Banking", message: "x".repeat(90) }),
  99,
  "max score is capped at 99"
);
assert.equal(calculateLeadScore({ companySize: "50-100" }), 75, "small company bonus");
assert.equal(calculateLeadScore({ industry: "fintech" }), 80, "industry bonus is case-insensitive");
assert.ok(
  calculateLeadScore({ companySize: "1,000+", industry: "bank", message: "x".repeat(100) }) <= 99,
  "score must never exceed 99"
);

console.log("inbound-service.selfcheck: PASS");