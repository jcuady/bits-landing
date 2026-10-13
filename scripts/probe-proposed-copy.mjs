/*
 * SYSTEM_AUDIT.md §44 — tracks a KNOWN GAP in the security-attestation gate.
 *
 * `docs/LANDING-PAGE-REV-2026-10-06.md` proposes hero sub-copy for a paid-traffic
 * landing page. Three of the things that copy asserts do not exist in this
 * codebase: an immutable audit log, quiet hours, and cease-and-desist
 * enforcement. This script records what the gate actually does with that line.
 *
 * IT DOES NOT CATCH IT. Verified, not assumed — this file exists because the
 * first draft of §44's correction claimed the copy "would have failed the
 * build", and running the detector proved that claim false. The claim was
 * written from the gate's rule list rather than from its output.
 *
 * WHY: SCOPED_OUT exempts a whole sentence when it contains any denial marker.
 * "... are built in, not bolted on" carries the word "not", which negates the
 * build style, not the three controls named earlier in the same sentence.
 *
 * Three tightenings were built and measured against the honest copy this repo
 * ships; all three broke it. The blocking case is an exact tie — "Immutable
 * audit logging — roadmap" and "Quiet hours are built in, not bolted on." both
 * put the marker 26 characters after the term. Full reasoning and the sweep are
 * in lib/site/security-claims.mjs under SCOPED_OUT.
 *
 * WHAT THIS DOES FOR YOU:
 *   • If the gap is ever closed, the first assertion below FAILS and says so.
 *     That failure is good news: replace it with `assert(caught)` and the gate
 *     is defended for real.
 *   • The replacement copy §44 supplies is asserted clean, so the documented
 *     fix cannot rot either.
 *
 * Run: node scripts/probe-proposed-copy.mjs
 */

import { findClaims } from "../lib/site/security-claims.mjs";

let failures = 0;
function assert(cond, label) {
  if (cond) {
    console.log(`PASS  ${label}`);
  } else {
    failures += 1;
    console.log(`FAIL  ${label}`);
  }
}

const PROPOSED = [
  "Operations 360 runs predictive dialing, QA scoring and GPS-tagged field visits in one cockpit.",
  "Quiet hours, cease-and-desist enforcement and an immutable audit log are built in, not bolted on.",
].join(" ");

const proposedHits = findClaims(PROPOSED);

/* THE KNOWN GAP. Inverted on purpose — see "WHAT THIS DOES FOR YOU" above. */
assert(
  proposedHits.length === 0,
  `KNOWN GAP (invert me if fixed): the proposed copy still passes the gate ` +
    `unflagged (${proposedHits.length} hits). If this fails, §44's correction ` +
    `should be upgraded to say the gate blocks it.`
);

/* Sanity: the string really does contain all three false features, so the
 * assertion above cannot pass merely because the probe text was edited. */
for (const [feature, re] of [
  ["quiet hours", /quiet[\s-]?hour/i],
  ["cease-and-desist", /cease-and-desist/i],
  ["immutable audit log", /immutable/i],
]) {
  assert(re.test(PROPOSED), `probe text still contains the "${feature}" claim`);
}

/* The replacement §44 supplies must trip nothing. */
const REPLACEMENT = [
  "Operations 360 runs predictive dialing, QA scoring and GPS-tagged field visits in one cockpit.",
  "Every CRM record is behind a verified session, and outbound email is logged with its delivery outcome.",
].join(" ");

const replacementHits = findClaims(REPLACEMENT);
assert(
  replacementHits.length === 0,
  `replacement copy trips no attestation (got ${replacementHits.length}` +
    `${replacementHits.length ? `: ${replacementHits.map((h) => h.id).join(", ")}` : ""})`
);

/* Guard the guard. If findClaims were stubbed or CHECKS emptied, every assertion
 * above would pass. A known-true claim proves the harness is live. */
assert(
  findClaims("We are SOC 2 Type II certified.").some((h) => h.id === "soc2"),
  "harness is live: a known-true claim is still detected"
);

console.log("");
if (failures > 0) {
  console.error(`FAILED  ${failures} assertion(s)`);
  process.exitCode = 1;
} else {
  console.log("proposed-copy gap tracked (gate does not catch this line — by design, for now)");
}