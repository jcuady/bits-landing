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
  errors: Partial<Record<"name" | "email" | "company" | "interest" | "message", string[]>>;
  values: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
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

  if (parsed.data.website) {
    return { ok: true, errors: {}, values: {} };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.CONTACT_INBOX || INQUIRY_INBOX;
  const from = process.env.CONTACT_FROM || "BITS Inquiries <noreply@optrizo.com>";

  if (!apiKey) {
    return {
      ok: false,
      formError: `We could not send your inquiry. Email ${INQUIRY_INBOX}.`,
      errors: {},
      values: raw,
    };
  }

  const { subject, text, html } = buildInquiryEmail(parsed.data);

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
      formError: `We could not send your inquiry. Email ${INQUIRY_INBOX}.`,
      errors: {},
      values: raw,
    };
  }

  return { ok: true, errors: {}, values: { email: parsed.data.email } };
}
