"use server";

import { z } from "zod";
import {
  INQUIRY_INBOX,
  buildInquiryEmail,
  contactSchema,
} from "@/lib/contact";

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

  // 1. Persist lead to Supabase inbound_leads table
  try {
    const { recordInboundLead } = await import("@/lib/crm/inbound-service");
    await recordInboundLead({
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
      source: "Website Contact Form",
    });
  } catch (err) {
    console.error("[contact] Failed to persist inbound lead to Supabase:", err);
    // Continue — do not block the user even if DB write fails
  }

  // 2. Send email notification to boundlessitsolutions@gmail.com
  const apiKey = process.env.RESEND_API_KEY;
  // CONTACT_INBOX env overrides; defaults to the hardcoded INQUIRY_INBOX
  const inbox = process.env.CONTACT_INBOX || INQUIRY_INBOX;
  const from =
    process.env.CONTACT_FROM ||
    "BITS Website <noreply@boundlessitsolutions.com>";

  if (!apiKey) {
    // Dev fallback — still confirm to the user. Lead is already in Supabase.
    console.warn(
      `[contact] RESEND_API_KEY not set — email NOT sent. Lead saved to Supabase. Inbox: ${inbox}`
    );
    return { ok: true, errors: {}, values: { email: parsed.data.email } };
  }

  const { subject, text, html } = buildInquiryEmail(parsed.data);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from,
        to: [inbox],
        reply_to: parsed.data.email,
        subject,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`[contact] Resend error ${response.status}:`, body);
      // Lead is already saved — just warn, still return ok
      return { ok: true, errors: {}, values: { email: parsed.data.email } };
    }
  } catch (err) {
    console.error("[contact] Network error sending email:", err);
    // Lead is in Supabase — return ok so user isn't penalised for email provider issue
    return { ok: true, errors: {}, values: { email: parsed.data.email } };
  }

  return { ok: true, errors: {}, values: { email: parsed.data.email } };
}
