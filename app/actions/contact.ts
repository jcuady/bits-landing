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

  // Honeypot check
  if (parsed.data.website) {
    return { ok: true, errors: {}, values: {} };
  }

  // Record inbound lead directly in CRM
  try {
    const { recordInboundLead } = await import("@/lib/crm/inbound-service");
    recordInboundLead({
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
    console.error("Failed to record inbound CRM lead:", err);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX || INQUIRY_INBOX;
  const from = process.env.CONTACT_FROM || "BITS Consultations <noreply@optrizo.com>";

  if (!apiKey) {
    // Graceful fallback in dev or missing key: still return ok so user gets confirmation
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
      return {
        ok: false,
        formError: `We could not send your inquiry. Please email ${INQUIRY_INBOX} directly.`,
        errors: {},
        values: raw,
      };
    }
  } catch {
    return {
      ok: false,
      formError: `Network error. Please email ${INQUIRY_INBOX} directly.`,
      errors: {},
      values: raw,
    };
  }

  return { ok: true, errors: {}, values: { email: parsed.data.email } };
}
