import { z } from "zod";
import { contactInterests } from "@/lib/site";

export const INQUIRY_INBOX = "bits_inquiries@boundlessits.com";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid work email."),
  company: z.string().trim().min(2, "Enter your company."),
  interest: z.enum(contactInterests, {
    error: "Choose a topic.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Add a short note so we know how to help.")
    .max(2000, "Keep the message under 2000 characters."),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFields = z.infer<typeof contactSchema>;

export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildInquiryEmail(data: Omit<ContactFields, "website">) {
  const subject = `BITS inquiry — ${data.interest} — ${data.company}`;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Topic: ${data.interest}`,
    "",
    data.message,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f6f9fc;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#0d1b2a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #dce8f6;border-radius:16px;">
    <tr>
      <td style="padding:24px 28px;border-bottom:1px solid #dce8f6;">
        <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#0063db;">BITS inquiry</p>
        <p style="margin:8px 0 0;font-size:20px;font-weight:600;">${escapeHtml(data.interest)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px;">
        <p style="margin:0 0 12px;"><strong>Name</strong><br>${escapeHtml(data.name)}</p>
        <p style="margin:0 0 12px;"><strong>Email</strong><br>${escapeHtml(data.email)}</p>
        <p style="margin:0 0 12px;"><strong>Company</strong><br>${escapeHtml(data.company)}</p>
        <p style="margin:0 0 16px;"><strong>Message</strong><br>${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
