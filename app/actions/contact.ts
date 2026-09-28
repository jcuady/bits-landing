"use server";

import { z } from "zod";
import { contactSchema } from "@/lib/contact";
import { recordInboundLead, calculateLeadScore } from "@/lib/crm/inbound-service";
import { executeInboundFormAutomation } from "@/lib/email/service";

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

  const parsed = contactSchema.safeParse({
    ...raw,
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, errors: z.flattenError(parsed.error).fieldErrors, values: raw };
  }

  // Honeypot check — silently succeed to deny bots any feedback
  if (parsed.data.website) {
    return { ok: true, errors: {}, values: {} };
  }

  // 1. Calculate lead qualification score
  const leadScore = calculateLeadScore({
    companySize: parsed.data.companySize,
    industry: parsed.data.industry,
    interest: parsed.data.interest,
    message: parsed.data.message,
  });

  // 2. Persist lead to Supabase inbound_leads table
  let persistedLeadId: string | undefined;
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
    // Non-blocking fallback
  }

  // 3. Trigger Marketing Automation & Dual-Delivery Email Pipeline
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

    console.log("[contact] Marketing automation executed:", {
      leadId: persistedLeadId,
      teamAlertSent: results.teamNotification.ok,
      clientWelcomeSent: results.clientWelcome.ok,
    });
  } catch (automationErr) {
    console.error("[contact] Non-fatal error during marketing automation execution:", automationErr);
  }

  return { ok: true, errors: {}, values: { email: parsed.data.email } };
}
