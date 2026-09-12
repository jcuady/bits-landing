"use server";

import { z } from "zod";
import { contactInterests } from "@/lib/site";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid work email."),
  company: z.string().trim().min(2, "Please enter your company."),
  interest: z.enum(contactInterests, {
    error: "Please choose what we can help with.",
  }),
  message: z.string().trim().max(2000, "Please keep the message under 2000 characters.").optional(),
  // Honeypot: humans never see or fill this field.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  ok: boolean;
  errors: Partial<Record<"name" | "email" | "company" | "interest" | "message", string[]>>;
  // Echoed back so the form can keep the user's input after a failed validation.
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
    message: raw.message || undefined,
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    return { ok: false, errors: z.flattenError(parsed.error).fieldErrors, values: raw };
  }

  // Silently accept bot submissions without processing them.
  if (parsed.data.website) {
    return { ok: true, errors: {}, values: {} };
  }

  // TODO: wire to email / CRM at deploy time (e.g. Resend, HubSpot).
  // Validated payload is ready: parsed.data
  console.log("[BITS] Contact submission:", parsed.data);

  return { ok: true, errors: {}, values: {} };
}
