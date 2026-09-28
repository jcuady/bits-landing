/**
 * High-Converting, Responsive HTML Email Templates
 * Boundless IT Solutions (BITS)
 *
 * Tested across Gmail, Apple Mail, and Outlook.
 */

export interface EmailLeadData {
  name: string;
  email: string;
  company: string;
  companySize?: string;
  industry?: string;
  currentSystem?: string;
  primaryChallenge?: string;
  preferredMethod?: string;
  interest?: string;
  message: string;
  leadScore?: number;
  submittedAt?: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * 1. Internal Team Alert Email
 * Delivered to: boundlessitsolutions@gmail.com
 */
export function buildTeamNotificationEmail(data: EmailLeadData): {
  subject: string;
  text: string;
  html: string;
} {
  const score = data.leadScore ?? 75;
  const scoreBadgeColor = score >= 85 ? "#10b981" : score >= 70 ? "#3b82f6" : "#f59e0b";
  const priorityLabel = score >= 85 ? "HIGH INTENT · PRIORITY SLA" : "QUALIFIED INBOUND";
  const solution = data.interest || "OPERATIONS 360 / General Consultation";

  const subject = `[Lead Alert - Score ${score}] ${data.company} — ${solution}`;

  const text = [
    `NEW BITS LEAD SUBMISSION (Score: ${score}/100 — ${priorityLabel})`,
    "===========================================================",
    `Company: ${data.company}`,
    `Contact Name: ${data.name}`,
    `Work Email: ${data.email}`,
    `Solution Interest: ${solution}`,
    `Team Size: ${data.companySize || "Not specified"}`,
    `Industry: ${data.industry || "Not specified"}`,
    `Current System: ${data.currentSystem || "Not specified"}`,
    `Primary Challenge: ${data.primaryChallenge || "Not specified"}`,
    `Preferred Contact Method: ${data.preferredMethod || "Not specified"}`,
    "",
    "OPERATIONAL WISH LIST & SCOPE:",
    data.message,
    "",
    "Action: Reply directly to this email to contact the lead.",
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:24px 12px;background:#0b1329;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.25);">
    <!-- Top Header -->
    <tr>
      <td style="padding:28px 32px;background:#050c1a;border-bottom:2px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display:inline-block;padding:4px 12px;background:#1e3a8a;color:#93c5fd;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;border-radius:999px;">
                BITS Lead Notification
              </span>
              <h1 style="margin:10px 0 2px;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
                ${escapeHtml(data.company)}
              </h1>
              <p style="margin:0;font-size:13px;color:#94a3b8;">
                Focus: <strong style="color:#60a5fa;">${escapeHtml(solution)}</strong>
              </p>
            </td>
            <td align="right" valign="top">
              <div style="display:inline-block;padding:8px 14px;background:#0f172a;border:1px solid ${scoreBadgeColor};border-radius:12px;text-align:center;">
                <span style="display:block;font-size:10px;font-weight:700;color:#94a3b8;text-transform:uppercase;">Lead Score</span>
                <span style="font-size:20px;font-weight:900;color:${scoreBadgeColor};font-family:monospace;">${score}/100</span>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Core Lead Dossier -->
    <tr>
      <td style="padding:28px 32px;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px 20px;margin-bottom:24px;">
          <h3 style="margin:0 0 12px;font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">
            Stakeholder Dossier
          </h3>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;line-height:1.7;">
            <tr>
              <td width="38%" style="color:#64748b;font-weight:600;">Full Name:</td>
              <td style="color:#0f172a;font-weight:700;">${escapeHtml(data.name)}</td>
            </tr>
            <tr>
              <td style="color:#64748b;font-weight:600;">Work Email:</td>
              <td><a href="mailto:${escapeHtml(data.email)}" style="color:#2563eb;font-weight:700;text-decoration:none;">${escapeHtml(data.email)}</a></td>
            </tr>
            <tr>
              <td style="color:#64748b;font-weight:600;">Target Solution:</td>
              <td style="color:#1d4ed8;font-weight:700;">${escapeHtml(solution)}</td>
            </tr>
            <tr>
              <td style="color:#64748b;font-weight:600;">Team / Seat Size:</td>
              <td style="color:#0f172a;font-weight:600;">${escapeHtml(data.companySize || "Not specified")}</td>
            </tr>
            <tr>
              <td style="color:#64748b;font-weight:600;">Industry:</td>
              <td style="color:#0f172a;font-weight:600;">${escapeHtml(data.industry || "Not specified")}</td>
            </tr>
            <tr>
              <td style="color:#64748b;font-weight:600;">Current System:</td>
              <td style="color:#0f172a;font-weight:600;">${escapeHtml(data.currentSystem || "Not specified")}</td>
            </tr>
            <tr>
              <td style="color:#64748b;font-weight:600;">Primary Challenge:</td>
              <td style="color:#0f172a;font-weight:600;">${escapeHtml(data.primaryChallenge || "Not specified")}</td>
            </tr>
            <tr>
              <td style="color:#64748b;font-weight:600;">Preferred Contact:</td>
              <td style="color:#0f172a;font-weight:600;">${escapeHtml(data.preferredMethod || "Not specified")}</td>
            </tr>
          </table>
        </div>

        <!-- Operational Wish List Message -->
        <div style="margin-bottom:28px;">
          <h3 style="margin:0 0 10px;font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#64748b;">
            Operational Wish List &amp; Scope Requirements
          </h3>
          <div style="background:#ffffff;border-left:4px solid #2563eb;border-top:1px solid #e2e8f0;border-right:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;border-radius:0 10px 10px 0;padding:16px 20px;font-size:14px;line-height:1.6;color:#334155;">
            ${escapeHtml(data.message).replaceAll("\n", "<br>")}
          </div>
        </div>

        <!-- Action Buttons -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
          <tr>
            <td align="center" style="padding-bottom:12px;">
              <a href="mailto:${escapeHtml(data.email)}?subject=RE:%20Your%20Operational%20Wish%20List%20for%20${encodeURIComponent(data.company)}%20%E2%80%94%20BITS"
                style="display:inline-block;padding:12px 28px;background:#2563eb;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;border-radius:999px;box-shadow:0 4px 12px rgba(37,99,235,0.3);">
                Reply Directly to ${escapeHtml(data.name)} →
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:18px 32px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;font-size:11px;color:#94a3b8;">
        BITS CRM Automated Lead Pipeline · Boundless IT Solutions · Sent via Verified Domain boundlessits.com
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}

/**
 * 2. Client Welcome & Operational Wish List Confirmation Email
 * Delivered to: client work email
 */
export function buildClientWelcomeAutoResponder(data: EmailLeadData): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `We've received your operational wish list — BITS (Boundless IT Solutions)`;
  const solution = data.interest || "OPERATIONS 360 Integrated Operations Platform";

  const text = [
    `Hello ${data.name},`,
    "",
    `Thank you for sharing your operational wish list for ${data.company}.`,
    "Our engineering leadership has received your parameters and requirements.",
    "",
    `Selected Focus: ${solution}`,
    "",
    "WHAT HAPPENS NEXT:",
    "1. A dedicated Principal Technical Architect is reviewing your requirements.",
    "2. We prepare a tailored architectural roadmap addressing your specific bottlenecks within 24 business hours.",
    "3. Zero generic sales scripts or high-pressure pitches — our discussion centers strictly on your operational wish list.",
    "",
    "In the meantime, feel free to explore our flagship platform:",
    "- OPERATIONS 360 (One System. One View. One Source of Truth.): https://www.boundlessits.com/#operations-360",
    "- BITSagent Voice AI (<300ms Conversational Latency): https://www.boundlessits.com/bitsagent",
    "",
    "If you have any urgent details to append, simply reply directly to this email.",
    "",
    "Warm regards,",
    "The Technical Architecture Team",
    "BITS — Boundless IT Solutions",
    "https://www.boundlessits.com",
    "bits_inquiries@boundlessits.com",
  ].join("\n");

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:24px 12px;background:#050c1a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1e293b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 25px 60px rgba(0,0,0,0.4);">
    <!-- Brand Header -->
    <tr>
      <td style="padding:32px 36px 28px;background:linear-gradient(135deg, #050c1a 0%, #0d1b38 100%);border-bottom:1px solid #1e293b;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="display:inline-block;padding:4px 12px;background:rgba(37,99,235,0.2);border:1px solid rgba(96,165,250,0.3);color:#93c5fd;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;border-radius:999px;">
                OPERATIONS 360 · BITS Architecture
              </span>
              <h1 style="margin:12px 0 4px;font-size:24px;font-weight:800;color:#ffffff;letter-spacing:-0.02em;">
                We&apos;ve Received Your Operational Wish List
              </h1>
              <p style="margin:0;font-size:14px;color:#94a3b8;">
                Prepared specifically for <strong style="color:#ffffff;">${escapeHtml(data.company)}</strong>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body Content -->
    <tr>
      <td style="padding:32px 36px;">
        <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#1e293b;">
          Dear <strong>${escapeHtml(data.name)}</strong>,
        </p>
        <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#475569;">
          Thank you for reaching out to <strong>Boundless IT Solutions (BITS)</strong>. We have successfully received your operational requirements and added your request to our senior engineering review queue.
        </p>

        <!-- Requirements Summary Box -->
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;margin-bottom:28px;">
          <h3 style="margin:0 0 10px;font-size:12px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#2563eb;">
            Your Submitted Request Summary
          </h3>
          <p style="margin:0 0 8px;font-size:13px;color:#334155;">
            <strong>Solution Focus:</strong> ${escapeHtml(solution)}
          </p>
          <div style="margin-top:12px;padding-top:12px;border-top:1px solid #e2e8f0;font-size:13px;line-height:1.6;color:#475569;">
            <em style="color:#64748b;">&ldquo;${escapeHtml(data.message.length > 280 ? data.message.slice(0, 280) + '…' : data.message)}&rdquo;</em>
          </div>
        </div>

        <!-- What Happens Next Protocol -->
        <h3 style="margin:0 0 14px;font-size:13px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:#0f172a;">
          What Happens Next
        </h3>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;font-size:13px;color:#334155;line-height:1.6;">
          <tr>
            <td width="28" valign="top" style="padding-bottom:12px;font-weight:700;color:#2563eb;">01</td>
            <td style="padding-bottom:12px;">
              <strong>Architecture Review:</strong> A dedicated technical architect analyzes your current workflows, seat count, and system integrations.
            </td>
          </tr>
          <tr>
            <td width="28" valign="top" style="padding-bottom:12px;font-weight:700;color:#2563eb;">02</td>
            <td style="padding-bottom:12px;">
              <strong>Consultative Roadmap:</strong> We prepare a customized operational blueprint within 24 business hours—showing how to eliminate fragmented tools without operational downtime.
            </td>
          </tr>
          <tr>
            <td width="28" valign="top" style="font-weight:700;color:#2563eb;">03</td>
            <td>
              <strong>Zero Sales Pressure:</strong> Our discussions are strictly engineering-first. No high-pressure sales scripts, no forced per-seat subscriptions.
            </td>
          </tr>
        </table>

        <!-- Flagship Highlight Strip -->
        <div style="background:linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);border:1px solid #bfdbfe;border-radius:14px;padding:20px;margin-bottom:28px;">
          <h4 style="margin:0 0 6px;font-size:14px;font-weight:800;color:#1e3a8a;">
            Explore OPERATIONS 360 Before We Speak
          </h4>
          <p style="margin:0 0 14px;font-size:12px;line-height:1.5;color:#3b82f6;">
            ONE SYSTEM. ONE VIEW. ONE SOURCE OF TRUTH. CRM &amp; Customer Management, QA Scorecards, Coaching Logs, WebRTC Dialer, LMS, WFM &amp; Live Dashboards.
          </p>
          <a href="https://www.boundlessits.com/#operations-360"
            style="display:inline-block;padding:9px 20px;background:#2563eb;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;border-radius:999px;">
            Explore OPERATIONS 360 →
          </a>
        </div>

        <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
          Need to add immediate details or schedule an expedited session? Simply reply directly to this email or write to <a href="mailto:bits_inquiries@boundlessits.com" style="color:#2563eb;text-decoration:none;font-weight:600;">bits_inquiries@boundlessits.com</a>.
        </p>
      </td>
    </tr>

    <!-- Sign-off & Footer -->
    <tr>
      <td style="padding:24px 36px;background:#f8fafc;border-top:1px solid #e2e8f0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <p style="margin:0;font-size:13px;font-weight:700;color:#0f172a;">The Technical Architecture Team</p>
              <p style="margin:2px 0 0;font-size:12px;color:#64748b;">BITS — Boundless IT Solutions</p>
              <p style="margin:2px 0 0;font-size:11px;color:#94a3b8;">Technology built around the way your business actually operates.</p>
            </td>
            <td align="right" valign="middle">
              <a href="https://www.boundlessits.com" style="font-size:12px;font-weight:700;color:#2563eb;text-decoration:none;">
                boundlessits.com
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
