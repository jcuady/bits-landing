/**
 * Email-pipeline outcome decision.
 *
 * Extracted from `app/actions/contact.ts` so the rule is unit-testable. That
 * action is a `"use server"` module with Next.js imports and cannot be imported
 * by a plain Node selfcheck, which is precisely why the bug below survived
 * every previous pass.
 *
 * THE BUG THIS PREVENTS
 * ---------------------
 * The action previously derived its visitor-facing outcome from the team alert
 * ALONE:
 *
 *     notificationFailed = !results.teamNotification.ok;
 *
 * The two dispatches protect different things:
 *   - `teamNotification` — the internal alert that guarantees a human sees the lead
 *   - `clientWelcome`    — the confirmation the visitor actually receives
 *
 * So when the team alert succeeded but the visitor's confirmation bounced, the
 * action returned `ok: true` and the visitor was shown "thank you" for an email
 * that was never delivered. This was not theoretical: the live `email_logs`
 * table holds 7 `client_wish_list_confirmation` failures, each of which would
 * have been reported to that visitor as success.
 *
 * The rule is therefore: report success only when BOTH dispatches succeeded.
 */

/** Minimal shape of a dispatch result — matches `EmailDispatchResult`. */
export interface DispatchOutcome {
  ok: boolean;
  error?: string;
}

export interface PipelineInput {
  teamNotification: DispatchOutcome;
  clientWelcome: DispatchOutcome;
}

export interface PipelineOutcome {
  /** True only when the visitor genuinely received everything. */
  ok: boolean;
  /** Which dispatches failed, for server-side logging. Never shown to visitors. */
  failedParts: { teamAlert?: string; clientWelcome?: string };
}

/**
 * Decide what the visitor should be told.
 *
 * `ok: true` means "everything sent". Any failure — internal or visitor-facing —
 * yields `ok: false`, because the lead IS durably stored either way and telling
 * the visitor to email us directly is always the honest instruction.
 */
export function resolveEmailPipelineOutcome(input: PipelineInput): PipelineOutcome {
  const failedParts: PipelineOutcome["failedParts"] = {};

  if (!input.teamNotification.ok) {
    failedParts.teamAlert = input.teamNotification.error ?? "unknown error";
  }
  if (!input.clientWelcome.ok) {
    failedParts.clientWelcome = input.clientWelcome.error ?? "unknown error";
  }

  return {
    ok: Object.keys(failedParts).length === 0,
    failedParts,
  };
}