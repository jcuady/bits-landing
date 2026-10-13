/**
 * Email-pipeline outcome regression selfcheck.
 *
 * Guards the P0 revenue-path defect fixed on 8 Oct 2026, in which
 * `submitContact` derived the visitor-facing outcome from the internal team
 * alert ALONE. When the team alert succeeded and the visitor's own
 * confirmation email bounced, the action returned `ok: true` and the visitor
 * was shown "thank you" for a message that was never delivered.
 *
 * This was not hypothetical: the live `email_logs` table contains 7 recorded
 * `client_wish_list_confirmation` failures — every one of which would have been
 * reported to that visitor as a success.
 *
 * Run: node --experimental-strip-types --disable-warning=MODULE_TYPELESS_PACKAGE_JSON lib/email/outcome.selfcheck.mjs
 */

import assert from "node:assert/strict";
import { resolveEmailPipelineOutcome } from "./outcome.ts";

const ok = { ok: true };
const failed = (error) => ({ ok: false, error });

// --- Both succeeded: the only genuinely happy path ---------------------------
{
  const r = resolveEmailPipelineOutcome({ teamNotification: ok, clientWelcome: ok });
  assert.equal(r.ok, true, "both dispatches succeeded must report success");
  assert.deepEqual(r.failedParts, {}, "no failures must be recorded");
}

// --- THE REGRESSION ---------------------------------------------------------
// Team alert fine, visitor's confirmation bounced. This exact shape occurred 7
// times in the live log. It must NOT report success.
{
  const r = resolveEmailPipelineOutcome({
    teamNotification: ok,
    clientWelcome: failed("Invalid `to` field."),
  });
  assert.equal(
    r.ok,
    false,
    "a bounced client confirmation must not be reported as success, even when the team alert succeeded"
  );
  assert.equal(r.failedParts.clientWelcome, "Invalid `to` field.");
  assert.equal(r.failedParts.teamAlert, undefined);
}

// --- The inverse ------------------------------------------------------------
{
  const r = resolveEmailPipelineOutcome({
    teamNotification: failed("Resend 500"),
    clientWelcome: ok,
  });
  assert.equal(r.ok, false, "an undelivered internal alert must not report success");
  assert.equal(r.failedParts.teamAlert, "Resend 500");
}

// --- Both failed ------------------------------------------------------------
{
  const r = resolveEmailPipelineOutcome({
    teamNotification: failed("Resend 500"),
    clientWelcome: failed("Invalid `to` field."),
  });
  assert.equal(r.ok, false);
  assert.equal(Object.keys(r.failedParts).length, 2, "both failures must be recorded");
}

// --- Missing error strings still register as failures -----------------------
{
  const r = resolveEmailPipelineOutcome({
    teamNotification: { ok: false },
    clientWelcome: ok,
  });
  assert.equal(r.ok, false, "a failure with no message is still a failure");
  assert.equal(r.failedParts.teamAlert, "unknown error");
}

// --- The old rule, kept as an explicit anti-regression assertion -------------
// This is the pre-fix implementation. If anyone reintroduces it, this fails.
function oldRule(results) {
  return !results.teamNotification.ok; // the defect
}
{
  const scenario = { teamNotification: ok, clientWelcome: failed("bounced") };
  assert.equal(
    oldRule(scenario),
    false,
    "sanity: the OLD rule wrongly reported success here"
  );
  assert.equal(
    resolveEmailPipelineOutcome(scenario).ok,
    false,
    "the CURRENT rule must report the same case as a failure"
  );
}

console.log("email/outcome.selfcheck: PASS");