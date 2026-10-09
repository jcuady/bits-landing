import { z } from "zod";
import { contactInterests, site } from "@/lib/site";
import {
  contactSchema,
  isHoneypotTripped,
  type ContactFields,
} from "@/lib/contact-schema";
/* §96 — the escaper now lives in a dependency-free module so a gate can import
 * the REAL implementation. See lib/html-escape.ts for why there were three. */
import { escapeHtml as escapeHtmlImpl } from "@/lib/html-escape.ts";

/*
 * The validation rules live in lib/contact-schema.ts so the selfcheck can import
 * the real schema rather than a frozen copy of it. Re-exported here so every
 * existing `@/lib/contact` consumer keeps working unchanged.
 *
 * SYSTEM_AUDIT.md §31: the previous selfcheck re-declared both the schema and
 * isHoneypotTripped inline, so it asserted against itself and could not fail for
 * any edit to this file.
 */
export { contactSchema, isHoneypotTripped };
export type { ContactFields };

/**
 * Internal notification inbox for inbound lead alerts. This is where the
 * system e-mails the sales team — it is NOT the address published to visitors.
 *
 * Visitor-facing copy must use `site.inquiryEmail`
 * (`bits_inquiries@boundlessits.com`), which is the only address shown on the
 * footer, legal, cookies and llms.txt pages. Telling a visitor who just hit a
 * submission error to email a different address than the one the rest of the
 * site advertises splits the brand and loses the lead.
 */
export const INQUIRY_INBOX = process.env.CONTACT_INBOX ?? "boundlessitsolutions@gmail.com";

/** The address visitors are told to contact. Single source of truth. */
export const VISITOR_CONTACT_EMAIL = site.inquiryEmail;

export function escapeHtml(value: string) {
  return escapeHtmlImpl(value);
}

export function buildInquiryEmail(data: Omit<ContactFields, "website">) {
  const subject = `BITS Consultation Request — ${data.company} (${data.interest || data.industry || "General"})`;
  const text = [
    `Name: ${data.name}`,
    `Work Email: ${data.email}`,
    `Company: ${data.company}`,
    `Solution / Product Interest: ${data.interest || "Not specified"}`,
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
        <p style="margin:0 0 10px;"><strong>Product / Solution Interest:</strong> <span style="color:#2563eb;font-weight:600;">${escapeHtml(data.interest || "General Consultation")}</span></p>
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
