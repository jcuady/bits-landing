"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { contactSchema, isHoneypotTripped, VISITOR_CONTACT_EMAIL } from "@/lib/contact";
import { recordInboundLead, calculateLeadScore } from "@/lib/crm/inbound-service";
import { executeInboundFormAutomation } from "@/lib/email/service";
import { resolveEmailPipelineOutcome } from "@/lib/email/outcome";
import { rateLimit, clientKeyFromHeaders } from "@/lib/security/rate-limit";

export type ContactState = {
  ok: boolean;
  formError?: string;
  errors: Partial<
    Record<
      | "name"
      | "email"
      | "company"
      | "companySize"
      | "industry"
      | "currentSystem"
      | "primaryChallenge"
      | "preferredMethod"
      | "interest"
      | "message",
      string[]
    >
  >;
  values: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw: Record<string, string> = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    companySize: String(formData.get("companySize") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    currentSystem: String(formData.get("currentSystem") ?? ""),
    primaryChallenge: String(formData.get("primaryChallenge") ?? ""),
    preferredMethod: String(formData.get("preferredMethod") ?? ""),
    interest: String(formData.get("interest") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  // Rate limit BEFORE any validation/persistence work. This is a public write
// path; the honeypot alone is not sufficient spam control.
const headerList = await headers();
const clientKey = clientKeyFromHeaders(headerList);
const limit = rateLimit(`contact:${clientKey}`, 5, 10 * 60 * 1000); // 5 per 10 min

if (!limit.ok) {
  const minutes = Math.max(1, Math.ceil(limit.retryAfterSeconds / 60));
  return {
    ok: false,
    formError: `Too many requests. Please wait ${minutes} minute${minutes > 1 ? "s" : ""} before trying again, or email us directly at ${VISITOR_CONTACT_EMAIL}.`,
    errors: {},
    values: {},
  };
}

// Honeypot check — MUST run before validation so that bots receive a
  // neutral success response and learn nothing about the trap. Nothing is
  // persisted and no email is sent.
  if (isHoneypotTripped(formData.get("website"))) {
    return { ok: true, errors: {}, values: {} };
  }

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    return { ok: false, errors: z.flattenError(parsed.error).fieldErrors, values: raw };
  }

  // 1. Calculate lead qualification score
  const leadScore = calculateLeadScore({
    companySize: parsed.data.companySize,
    industry: parsed.data.industry,
    interest: parsed.data.interest,
    message: parsed.data.message,
  });

  // 2. Persist lead to Supabase inbound_leads table
  //
  // This is BLOCKING. If the lead cannot be durably stored we must NOT report
  // success — otherwise a qualified inquiry is silently lost while the visitor
  // sees a thank-you message and nobody ever follows up.
  let persistedLeadId: string;
  try {
    const saved = await recordInboundLead({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      companySize: parsed.data.companySize,
      industry: parsed.data.industry,
      currentSystem: parsed.data.currentSystem,
      primaryChallenge: parsed.data.primaryChallenge,
      preferredMethod: parsed.data.preferredMethod,
      interest: parsed.data.interest,
      message: parsed.data.message,
      source: "Website Contact & Operational Wish List Form",
    });
    persistedLeadId = saved.id;
  } catch (err) {
    console.error("[contact] Error recording inbound lead:", err);
    return {
      ok: false,
      formError:
        `We couldn't save your request right now. Please try again, or email us directly at ${VISITOR_CONTACT_EMAIL}.`,
      errors: {},
      values: raw,
    };
  }

  // 3. Trigger Marketing Automation & Dual-Delivery Email Pipeline
  //
  // The lead is safely stored at this point, so an email failure is a
  // degraded-but-not-lost outcome. We still tell the visitor, because a silent
  // internal alert failure means nobody actually saw their inquiry.
  //
  // BOTH dispatches matter to the visitor's experience and BOTH must be
  // checked. The internal team alert is what guarantees a human sees the lead;
  // the client auto-responder is what the visitor actually receives. Reporting
  // success on the strength of the team alert alone meant a visitor whose
  // confirmation email bounced was still shown "thank you" — that is not
  // hypothetical, see SYSTEM_AUDIT.md 20.2 for the seven recorded occurrences.
  //
  // The rule itself lives in `lib/email/outcome.ts` so it is unit-testable.
  let failureDetail: { teamAlert?: string; clientWelcome?: string } = {};
  try {
    const results = await executeInboundFormAutomation({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company,
      companySize: parsed.data.companySize,
      industry: parsed.data.industry,
      currentSystem: parsed.data.currentSystem,
      primaryChallenge: parsed.data.primaryChallenge,
      preferredMethod: parsed.data.preferredMethod,
      interest: parsed.data.interest,
      message: parsed.data.message,
      leadScore,
      submittedAt: new Date().toISOString(),
    });

    const outcome = resolveEmailPipelineOutcome(results);
    failureDetail = outcome.failedParts;

    // Success-path telemetry belongs on an info channel, not console.error.
    console.log("[contact] Marketing automation result:", {
      leadId: persistedLeadId,
      teamAlertSent: results.teamNotification.ok,
      clientWelcomeSent: results.clientWelcome.ok,
    });

    if (!outcome.ok) {
      // Log the real cause server-side. The visitor gets a message they can act
      // on but that does not leak provider internals.
      console.error("[contact] Email pipeline incomplete for persisted lead:", {
        leadId: persistedLeadId,
        ...failureDetail,
      });
      return {
        ok: false,
        formError:
          `Your request was saved, but we could not complete the email confirmation. Please email us directly at ${VISITOR_CONTACT_EMAIL} so we don't miss you.`,
        errors: {},
        values: raw,
      };
    }
  } catch (automationErr) {
    console.error("[contact] Non-fatal error during marketing automation execution:", automationErr);
    return {
      ok: false,
      formError:
        `Your request was saved, but we could not complete the email confirmation. Please email us directly at ${VISITOR_CONTACT_EMAIL} so we don't miss you.`,
      errors: {},
      values: raw,
    };
  }

  return { ok: true, errors: {}, values: { email: parsed.data.email } };
}
