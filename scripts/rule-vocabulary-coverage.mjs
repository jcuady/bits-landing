/*
 * SYSTEM_AUDIT.md §65 — does every RULE's vocabulary cover the words this
 * codebase actually uses?
 *
 * THE FAILURE THIS EXISTS TO PREVENT
 * ----------------------------------
 * §62 found that the `telephony` rule matched six *technology* words (WebRTC, SIP,
 * softphone…) while telephony is actually sold here as "predictive dialer",
 * "auto-dialing", "whisper coaching", "live listen" and "barge-in". The rule
 * existed, was negative-tested, and was reported as working — and it passed on most
 * of the category it existed to catch. Real false claims sat on gated surfaces for
 * months.
 *
 * A negative test proves a rule fires on the string you thought of. It cannot prove
 * the rule fires on the strings nobody thought of. This file closes that gap: for
 * every rule, it supplies the phrasing a copywriter or marketer would plausibly
 * reach for, taken from how this repository has actually sold things, and asserts
 * the rule catches it.
 *
 * A rule that misses here is a rule whose term list is narrower than its category.
 *
 * Run: node scripts/rule-vocabulary-coverage.mjs
 */

import { findClaims } from "../lib/site/security-claims.mjs";

/*
 * Each entry is a phrase that SHOULD be caught. These are deliberately written the
 * way marketing copy is written — not the way the rule author was thinking.
 * If a phrase here is not caught, the rule is under-specified, and every corpus is
 * only as safe as its narrowest rule.
 */
const PROBES = [
  // soc2
  ["soc2", "SOC 2 Type II certified"],
  ["soc2", "SOC2-compliant infrastructure"],
  ["soc2", "Audited under SOC 2 by an independent assessor"],
  ["worm", "WORM-compliant storage"],
  ["worm", "write-once read-many ledger"],
  ["worm", "immutably retained records"],
  ["hipaa", "HIPAA-compliant audio capture"],
  ["hipaa", "HIPAA covered"],
  ["multitenant", "Multi-Tenant architecture isolates every client"],
  ["multitenant", "tenant isolation by design"],
  ["multitenant", "each tenant's data is siloed"],
  ["rbac", "Role-Based Access Control (RBAC)"],
  ["rbac", "granular permission matrix per role"],
  ["rbac", "role-based permissions"],
  ["rbac", "only Managers and Admins can"],
  ["sso-mfa", "SSO / SAML authentication"],
  ["sso-mfa", "SAML SSO"],
  ["sso-mfa", "Multi-Factor Authentication (MFA)"],
  ["sso-mfa", "two-factor authentication"],
  ["auditlog", "Immutable audit trail on every action"],
  ["auditlog", "full audit log of every user action"],
  ["auditlog", "activity log with actor and timestamp"],
  ["immutable", "Immutable records"],
  ["immutable", "tamper-proof storage"],
  ["immutable", "tamper-evident ledger"],
  ["masking", "PII masking at rest"],
  ["masking", "data masking for sensitive fields"],
  ["isolation", "Customer data isolation"],
  ["isolation", "isolated per client environment"],
  ["crypto-enforced", "cryptographically enforced access"],
  ["crypto-enforced", "cryptographically verified"],
  ["contact-rules", "BSP 454/857 contact-hour enforcement"],
  ["contact-rules", "automated do-not-call suppression"],
  ["contact-rules", "quiet hours are enforced automatically"],
  ["enforcement-badge", "Enforced"],
  ["enforcement-badge", "100% Compliant"],
  ["enforcement-badge", "Fully Active"],
  /* §62: the class that shipped too narrow. Every phrase below passed the original
   * six-word term and is the reason §62 existed. */
  ["telephony", "Predictive Dialer"],
  ["telephony", "sub-350ms predictive dialing"],
  ["telephony", "browser softphone"],
  ["telephony", "WebRTC auto-dialer"],
  ["telephony", "supervisor live listen, whisper coaching and barge-in"],
  ["telephony", "call recording with automatic encryption"],
  ["telephony", "Asterisk / FreePBX integration"],
  ["telephony", "real-time transcription"],
  ["telephony", "screen-pop"],
  ["graphql", "REST and GraphQL APIs"],
  ["graphql", "GraphQL endpoint"],
];

let pass = 0;
const missed = [];

for (const [id, phrase] of PROBES) {
  const caught = findClaims(phrase).some((c) => c.id === id);
  if (caught) {
    pass += 1;
    console.log(`  ok    [${id}] ${phrase}`);
  } else {
    missed.push({ id, phrase });
    console.log(`  MISS  [${id}] ${phrase}`);
  }
}

console.log(`\n${pass}/${PROBES.length} rule-vocabulary probes caught.`);
console.log(`rules covered: ${new Set(PROBES.map((p) => p[0])).size}`);

/* ---- §75: the SCOPE probes — can a self-declaring marker be abused? ----
 *
 * `floor pain point:` was added to SCOPED_OUT so that two TRUE sentences in
 * `hero-product.tsx` about the CUSTOMER's staff could survive gating. That makes
 * it a new way to switch a rule off, and a new way to switch a rule off is a
 * new way to hide a false claim.
 *
 * §40's rule is that the mitigation must be measured, not asserted. So:
 *   • the marker still exempts the sentence it appears in;
 *   • it does NOT exempt a claim in a FOLLOWING sentence — this is the §44
 *     sentence-scoping limit, and it is the property that makes the marker
 *     safe to use at all;
 *   • and it does not exempt an unrelated rule in the same sentence, so the
 *     marker is not a blanket escape hatch for the whole string.
 *
 * The residual risk is real and is NOT tested away: a writer who puts
 * "Floor pain point:" in front of a BITS capability claim gets it exempted.
 * That risk already exists for `target:` and `scoped per contract`. It is
 * recorded in SYSTEM_AUDIT.md §75 rather than engineered out, because the only
 * way to remove it would be a semantic parser — the thing §44 measured and
 * found unsolvable.
 */
const SCOPE_PROBES = [
  { label: "marker exempts the sentence it is in", phrase: "Floor pain point: agents waste 45 minutes of every hour dialing numbers manually.", expect: false },
  { label: "marker does NOT exempt the NEXT sentence", phrase: "Floor pain point: manual QA audits only 2% of calls. BITS ships a built-in WebRTC softphone.", expect: true },
  { label: "marker does not blanket-exempt other rules", phrase: "Floor pain point: collectors are busy. Our platform has an immutable audit trail.", expect: true },
  { label: "the real pain-point sentence stays exempt", phrase: "Floor pain point: one rogue agent using profane threats or calling in quiet hours can lose your bank contract.", expect: false },
];

console.log("");
let scopePass = 0;
const scopeMissed = [];
for (const p of SCOPE_PROBES) {
  const caught = findClaims(p.phrase).length > 0;
  if (caught === p.expect) {
    scopePass += 1;
    console.log(`  ok    ${p.label}`);
  } else {
    scopeMissed.push(p);
    console.log(`  MISS  ${p.label} — expected ${p.expect ? "a claim" : "no claim"}, got ${caught ? "a claim" : "no claim"}`);
  }
}
console.log(`\n${scopePass}/${SCOPE_PROBES.length} scope probes.`);
if (scopeMissed.length) missed.push(...scopeMissed);

if (missed.length > 0) {
  console.log("\nA rule that misses here has a term narrower than its category (§62).");
  console.log("Widen the term — do not delete the probe.");
}
process.exit(missed.length === 0 ? 0 : 1);