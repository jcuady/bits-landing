import { z } from "zod";
import { contactInterests } from "@/lib/site";

export const INQUIRY_INBOX = "bits_inquiries@boundlessits.com";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(2, "Enter your company name."),
  companySize: z.string().optional(),
  industry: z.string().optional(),
  currentSystem: z.string().optional(),
  primaryChallenge: z.string().optional(),
  preferredMethod: z.string().optional(),
  interest: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please describe your operational requirements or challenges.")
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
  const subject = `BITS Consultation Request — ${data.company} (${data.industry || "General"})`;
  const text = [
    `Name: ${data.name}`,
    `Work Email: ${data.email}`,
    `Company: ${data.company}`,
    `Company Size: ${data.companySize || "Not specified"}`,
    `Industry: ${data.industry || "Not specified"}`,
    `Current System: ${data.currentSystem || "Not specified"}`,
    `Primary Challenge: ${data.primaryChallenge || "Not specified"}`,
    `Preferred Contact Method: ${data.preferredMethod || "Not specified"}`,
    "",
    "Project / Operational Details:",
    data.message,
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<body style="margin:0;padding:24px;background:#f6f9fc;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#0d1b2a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dce8f6;border-radius:16px;">
    <tr>
      <td style="padding:24px 28px;border-bottom:1px solid #dce8f6;background:#06162f;border-radius:16px 16px 0 0;">
        <p style="margin:0;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#38bdf8;">BITS Consultation Request</p>
        <p style="margin:8px 0 0;font-size:20px;font-weight:700;color:#ffffff;">${escapeHtml(data.company)}</p>
      </td>
    </tr>
    <tr>
      <td style="padding:24px 28px;">
        <p style="margin:0 0 10px;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="margin:0 0 10px;"><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p style="margin:0 0 10px;"><strong>Company:</strong> ${escapeHtml(data.company)}</p>
        <p style="margin:0 0 10px;"><strong>Team Size:</strong> ${escapeHtml(data.companySize || "N/A")}</p>
        <p style="margin:0 0 10px;"><strong>Industry:</strong> ${escapeHtml(data.industry || "N/A")}</p>
        <p style="margin:0 0 10px;"><strong>Current System:</strong> ${escapeHtml(data.currentSystem || "N/A")}</p>
        <p style="margin:0 0 10px;"><strong>Primary Challenge:</strong> ${escapeHtml(data.primaryChallenge || "N/A")}</p>
        <p style="margin:0 0 14px;"><strong>Preferred Contact Method:</strong> ${escapeHtml(data.preferredMethod || "N/A")}</p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
        <p style="margin:0 0 8px;font-weight:600;">Operational Scope / Message:</p>
        <p style="margin:0;line-height:1.6;color:#334155;">${escapeHtml(data.message).replaceAll("\n", "<br>")}</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
