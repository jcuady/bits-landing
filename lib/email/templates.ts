/**
 * High-Converting, Responsive, Agency-Grade HTML Email Templates
 * Boundless IT Solutions (BITS)
 *
 * Implements the BITS Design System (Deep Navy, Electric Blue, Double-Bezel Framing)
 * Tested and compatible across Gmail, Apple Mail (iOS & macOS), Outlook, and Yahoo.
 * Written with clear, direct, jargon-free English for maximum conversion.
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

export interface EmailBookingData {
  name: string;
  email: string;
  company: string;
  date: string;
  time: string;
  meetingUrl?: string;
  agenda?: string[];
  architectName?: string;
}

export interface EmailRoadmapData {
  name: string;
  email: string;
  company: string;
  solutionName: string;
  keyBottlenecks: string[];
  roadmapUrl: string;
  summary: string;
  estimatedDeliveryWeeks?: number;
}

export interface EmailFollowUpData {
  name: string;
  email: string;
  company: string;
  solutionInterest?: string;
  notes?: string;
  bookingUrl?: string;
}

export interface EmailOutput {
  subject: string;
  text: string;
  html: string;
}

/* §96 — was a private copy here. One implementation, shared; see
 * lib/html-escape.ts. A second copy of a security primitive is one copy plus a
 * copy nobody reads. */
import { escapeHtml } from "../html-escape.ts";

const BRAND = {
  name: "Boundless IT Solutions (BITS)",
  shortName: "BITS",
  logoUrl: "https://www.boundlessits.com/brand/logo-white.png",
  logoDarkUrl: "https://www.boundlessits.com/brand/logo-horizontal.png",
  siteUrl: "https://www.boundlessits.com",
  inquiryEmail: "bits_inquiries@boundlessits.com",
  contactUrl: "https://www.boundlessits.com/#contact",
  colorNavy950: "#030d1c",
  colorNavy900: "#06162f",
  colorNavy800: "#081f4d",
  colorNavy700: "#0a2b6f",
  colorElectric600: "#0063db",
  colorElectric500: "#007bff",
  colorSignal500: "#00a6ff",
  colorEmerald: "#10b981",
  colorAmber: "#f59e0b",
  fontStack: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
};

/**
 * Shared HTML wrapper creating the iconic BITS "Double-Bezel" hardware aesthetic in email:
 * - Fluid table envelope
 * - Deep navy OLED masthead with verified BITS logo
 * - Pure white content core with high-contrast typography
 * - Clean editorial footer with CAN-SPAM and DPA compliance
 */
function renderEmailShell({
  title,
  eyebrow,
  headline,
  subheadline,
  bodyContent,
  canvasBackground = "#f4f7fb",
}: {
  title: string;
  eyebrow: string;
  headline: string;
  subheadline?: string;
  bodyContent: string;
  canvasBackground?: string;
}): string {
  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${escapeHtml(title)}</title>
  <!--[if mso]>
  <style type="text/css">
    table, td, div, p, a, span { font-family: Arial, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:28px 12px;background:${canvasBackground};font-family:${BRAND.fontStack};color:#1e293b;-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;">
  <!-- Wrapper Table -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;max-width:620px;">
    <tr>
      <td align="center">
        <!-- Outer Shell / Double-Bezel Card -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #dce8f6;box-shadow:0 18px 48px rgba(6,22,47,0.08);">
          
          <!-- Deep Navy Masthead Header -->
          <tr>
            <td style="padding:32px 36px 28px;background:linear-gradient(145deg, #030d1c 0%, #06162f 60%, #0a2b6f 100%);border-bottom:2px solid #0063db;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Official White BITS Logo -->
                    <a href="${BRAND.siteUrl}" target="_blank" style="display:inline-block;text-decoration:none;">
                      <img src="${BRAND.logoUrl}" alt="Boundless IT Solutions (BITS)" width="154" height="34" style="display:block;max-width:154px;height:auto;border:0;outline:none;" />
                    </a>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display:inline-block;padding:5px 13px;background:rgba(0,123,255,0.18);border:1px solid rgba(0,166,255,0.35);color:#93c5fd;font-size:10px;font-weight:800;letter-spacing:0.14em;text-transform:uppercase;border-radius:9999px;">
                      ${escapeHtml(eyebrow)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:22px;">
                    <h1 style="margin:0;font-size:23px;line-height:1.25;font-weight:800;color:#ffffff;letter-spacing:-0.025em;">
                      ${escapeHtml(headline)}
                    </h1>
                    ${
                      subheadline
                        ? `<p style="margin:6px 0 0;font-size:13px;line-height:1.5;color:#93a9c4;">${escapeHtml(
                            subheadline
                          )}</p>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Inner Content Body -->
          <tr>
            <td style="padding:36px 36px 32px;background:#ffffff;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Sign-Off & Official Footer -->
          <tr>
            <td style="padding:24px 36px;background:#f8fafc;border-top:1px solid #e2e8f0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="top" style="font-size:12px;color:#64748b;line-height:1.6;">
                    <p style="margin:0;font-weight:800;color:#0f172a;font-size:13px;">Boundless IT Solutions (BITS)</p>
                    <p style="margin:3px 0 0;font-size:12px;color:#64748b;">
                      Enterprise Operations Software · Collections CRM · AI Infrastructure
                    </p>
                    <p style="margin:3px 0 0;font-size:11px;color:#94a3b8;">
                      Metro Manila, Philippines · BSP &amp; NPC Data Privacy Aligned
                    </p>
                  </td>
                  <td align="right" valign="top" style="font-size:12px;line-height:1.8;">
                    <a href="${BRAND.siteUrl}" style="color:#0063db;font-weight:700;text-decoration:none;display:block;">
                      boundlessits.com
                    </a>
                    <a href="mailto:${BRAND.inquiryEmail}" style="color:#64748b;text-decoration:none;display:block;font-size:11px;">
                      ${BRAND.inquiryEmail}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;border-top:1px solid #eef2f6;margin-top:14px;font-size:11px;color:#94a3b8;line-height:1.5;">
                    You are receiving this operational email because a representative from your organization requested a consultation or system architecture review. Zero spam, zero third-party data sharing.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * 1. Client Welcome & Booking Auto-Responder
 * Sent immediately after a client submits their operational wish list on the website.
 * Written with warm, simple, confident English. Promotes a 20-minute discovery call.
 */
export function buildClientWelcomeAutoResponder(data: EmailLeadData): EmailOutput {
  const firstName = data.name.trim().split(" ")[0] || "there";
  const solution = data.interest || "OPERATIONS 360 Integrated Operations Platform";
  const bookingUrl = `${BRAND.siteUrl}/#contact`;

  const subject = `We got your note — Let's talk about your system (BITS)`;

  const text = [
    `Hi ${firstName},`,
    "",
    `Thank you for reaching out to Boundless IT Solutions (BITS). We received your note for ${data.company}.`,
    "",
    `Focus: ${solution}`,
    "",
    "HERE IS WHAT HAPPENS NEXT:",
    "1. Quick review: Our senior technical team looks at your current setup and wish list.",
    "2. Simple 20-minute chat: We walk you through how to fix your bottlenecks on one screen.",
    "3. Your custom roadmap: You receive a clear, straightforward plan built for your exact workflow.",
    "",
    "No pushy sales calls. No forced per-seat subscriptions. Just an honest look at how your system can run smoother.",
    "",
    `READY TO PICK A TIME?`,
    `Book your 20-minute discovery call here: ${bookingUrl}`,
    "",
    "If you prefer, simply reply directly to this email with times that work best for you.",
    "",
    "Warm regards,",
    "The Technical Architecture Team",
    "Boundless IT Solutions (BITS)",
    "https://www.boundlessits.com",
    "bits_inquiries@boundlessits.com",
  ].join("\n");

  const bodyContent = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#0f172a;">
      Hi <strong>${escapeHtml(firstName)}</strong>,
    </p>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155;">
      Thank you for reaching out to <strong>Boundless IT Solutions (BITS)</strong>. We received your note for <strong>${escapeHtml(
        data.company
      )}</strong> and added it directly to our senior engineering review queue.
    </p>

    <!-- Highlight Summary Box (Double-Bezel look) -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #0063db;border-radius:12px;padding:18px 22px;margin:24px 0 28px;">
      <span style="display:block;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#0063db;margin-bottom:6px;">
        Your Operational Focus
      </span>
      <p style="margin:0;font-size:14px;font-weight:700;color:#0f172a;">
        ${escapeHtml(solution)}
      </p>
      ${
        data.message
          ? `<p style="margin:10px 0 0;font-size:13px;line-height:1.6;color:#64748b;font-style:italic;">
              &ldquo;${escapeHtml(
                data.message.length > 240 ? data.message.slice(0, 240) + "…" : data.message
              )}&rdquo;
            </p>`
          : ""
      }
    </div>

    <!-- What Happens Next (Simple, Human 3-Step Flow) -->
    <h3 style="margin:0 0 14px;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#0f172a;">
      What Happens Next
    </h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;font-size:14px;line-height:1.6;color:#334155;">
      <tr>
        <td width="32" valign="top" style="padding-bottom:12px;font-weight:900;color:#0063db;font-size:14px;">01</td>
        <td style="padding-bottom:12px;">
          <strong style="color:#0f172a;">Quick Review:</strong> Our senior team looks at what slows your team down and what you want to automate.
        </td>
      </tr>
      <tr>
        <td width="32" valign="top" style="padding-bottom:12px;font-weight:900;color:#0063db;font-size:14px;">02</td>
        <td style="padding-bottom:12px;">
          <strong style="color:#0f172a;">20-Minute Discovery Chat:</strong> We walk you through how your team can run on one unified screen instead of ten disconnected tools.
        </td>
      </tr>
      <tr>
        <td width="32" valign="top" style="font-weight:900;color:#0063db;font-size:14px;">03</td>
        <td>
          <strong style="color:#0f172a;">Your Custom Roadmap:</strong> You get a clear, straightforward plan tailored to your team. Zero pushy sales pitches.
        </td>
      </tr>
    </table>

    <!-- High-Converting Primary CTA Pill -->
    <div style="text-align:center;padding:12px 0 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
        <tr>
          <td align="center" style="border-radius:9999px;background:#0063db;box-shadow:0 8px 24px rgba(0,99,219,0.32);">
            <a href="${bookingUrl}" target="_blank"
              style="display:inline-block;padding:15px 36px;font-family:${BRAND.fontStack};font-size:15px;font-weight:800;color:#ffffff;text-decoration:none;border-radius:9999px;letter-spacing:0.01em;">
              Book Your 20-Minute Call &nbsp;<span style="display:inline-block;font-size:16px;">→</span>
            </a>
          </td>
        </tr>
      </table>
      <p style="margin:10px 0 0;font-size:12px;color:#64748b;">
        Free 20-minute discovery · Zero sales pressure · Pick any time that works
      </p>
    </div>

    <!-- Quick Fallback Reassurance -->
    <div style="background:#f1f5f9;border-radius:12px;padding:16px 20px;font-size:13px;line-height:1.6;color:#475569;">
      <strong>Prefer email?</strong> Simply reply directly to this message with times you are free this week, or write to 
      <a href="mailto:${BRAND.inquiryEmail}" style="color:#0063db;font-weight:700;text-decoration:none;">${BRAND.inquiryEmail}</a>.
    </div>
  `;

  const html = renderEmailShell({
    title: subject,
    eyebrow: "OPERATIONS 360 · BITS",
    headline: "We received your operational wish list.",
    subheadline: `Prepared for ${data.company} · Next step: 20-minute discovery chat`,
    bodyContent,
    canvasBackground: "#f4f7fb",
  });

  return { subject, text, html };
}

/**
 * 2. Internal Team Lead Alert Email
 * Sent to: boundlessitsolutions@gmail.com
 * Formatted as a high-density, scannable executive operations dossier.
 */
export function buildTeamNotificationEmail(data: EmailLeadData): EmailOutput {
  const score = data.leadScore ?? 75;
  const scoreBadgeColor = score >= 85 ? BRAND.colorEmerald : score >= 70 ? BRAND.colorElectric500 : BRAND.colorAmber;
  const priorityLabel = score >= 85 ? "HIGH INTENT · PRIORITY SLA" : "QUALIFIED INBOUND";
  const solution = data.interest || "OPERATIONS 360 / General Consultation";

  const subject = `[Lead Alert · Score: ${score}] ${data.company} — ${solution}`;

  const text = [
    `NEW BITS INBOUND LEAD (Score: ${score}/100 — ${priorityLabel})`,
    "===========================================================",
    `Company: ${data.company}`,
    `Contact Name: ${data.name}`,
    `Work Email: ${data.email}`,
    `Solution Interest: ${solution}`,
    `Team Size: ${data.companySize || "Not specified"}`,
    `Industry: ${data.industry || "Not specified"}`,
    `Current System: ${data.currentSystem || "Not specified"}`,
    `Primary Challenge: ${data.primaryChallenge || "Not specified"}`,
    `Preferred Contact: ${data.preferredMethod || "Not specified"}`,
    "",
    "OPERATIONAL WISH LIST / SCOPE:",
    data.message,
    "",
    "Action: Reply directly to this lead email.",
  ].join("\n");

  const bodyContent = `
    <!-- Top Dossier Card -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:22px;margin-bottom:24px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>
            <span style="font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;">
              Inbound Stakeholder
            </span>
            <h2 style="margin:4px 0 2px;font-size:18px;font-weight:800;color:#0f172a;">
              ${escapeHtml(data.name)}
            </h2>
            <p style="margin:0;font-size:13px;color:#64748b;">
              ${escapeHtml(data.company)}
            </p>
          </td>
          <td align="right" valign="top">
            <div style="display:inline-block;padding:8px 14px;background:#0f172a;border:1px solid ${scoreBadgeColor};border-radius:10px;text-align:center;">
              <span style="display:block;font-size:9px;font-weight:800;color:#94a3b8;text-transform:uppercase;">Score</span>
              <span style="font-size:18px;font-weight:900;color:${scoreBadgeColor};font-family:monospace;">${score}/100</span>
            </div>
          </td>
        </tr>
      </table>

      <!-- Parameter Matrix -->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;padding-top:14px;border-top:1px solid #e2e8f0;font-size:13px;line-height:1.7;">
        <tr>
          <td width="35%" style="color:#64748b;font-weight:600;">Work Email:</td>
          <td><a href="mailto:${escapeHtml(data.email)}" style="color:#0063db;font-weight:700;text-decoration:none;">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td style="color:#64748b;font-weight:600;">Product Focus:</td>
          <td style="color:#0f172a;font-weight:700;">${escapeHtml(solution)}</td>
        </tr>
        <tr>
          <td style="color:#64748b;font-weight:600;">Team / Seats:</td>
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
          <td style="color:#64748b;font-weight:600;">Primary Bottleneck:</td>
          <td style="color:#0f172a;font-weight:600;">${escapeHtml(data.primaryChallenge || "Not specified")}</td>
        </tr>
        <tr>
          <td style="color:#64748b;font-weight:600;">Contact Channel:</td>
          <td style="color:#0f172a;font-weight:600;">${escapeHtml(data.preferredMethod || "Not specified")}</td>
        </tr>
      </table>
    </div>

    <!-- Operational Scope Message -->
    <div style="margin-bottom:28px;">
      <span style="display:block;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#64748b;margin-bottom:8px;">
        Submitted Requirements &amp; Scope
      </span>
      <div style="background:#ffffff;border:1px solid #cbd5e1;border-left:4px solid #0063db;border-radius:8px;padding:16px 20px;font-size:14px;line-height:1.6;color:#1e293b;">
        ${escapeHtml(data.message).replaceAll("\n", "<br>")}
      </div>
    </div>

    <!-- Quick Action Button -->
    <div style="text-align:center;padding:10px 0 16px;">
      <a href="mailto:${escapeHtml(data.email)}?subject=RE:%20Your%20Operational%20Wish%20List%20for%20${encodeURIComponent(
        data.company
      )}%20%E2%80%94%20BITS"
        style="display:inline-block;padding:14px 32px;background:#0063db;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;border-radius:9999px;box-shadow:0 6px 18px rgba(0,99,219,0.3);">
        Reply Directly to ${escapeHtml(data.name)} &nbsp;→
      </a>
    </div>
  `;

  const html = renderEmailShell({
    title: subject,
    eyebrow: priorityLabel,
    headline: `Inbound Lead: ${data.company}`,
    subheadline: `Solution: ${solution} · Score: ${score}/100`,
    bodyContent,
    canvasBackground: "#030d1c",
  });

  return { subject, text, html };
}

/**
 * 3. Discovery Call Confirmation Email
 * Sent after a discovery consultation is scheduled.
 * Reassuring, clear, simple: explains meeting link, agenda, and that zero prep is needed.
 */
export function buildBookingConfirmationEmail(booking: EmailBookingData): EmailOutput {
  const firstName = booking.name.trim().split(" ")[0] || "there";
  const architect = booking.architectName || "Senior Solutions Architect";
  const meetUrl = booking.meetingUrl || `${BRAND.siteUrl}/#contact`;

  const subject = `Confirmed: 20-Minute Discovery Call with BITS — ${booking.company}`;

  const text = [
    `Hi ${firstName},`,
    "",
    `Your 20-minute discovery call with BITS is confirmed for ${booking.company}.`,
    "",
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Meeting Link: ${meetUrl}`,
    `Host: ${architect}`,
    "",
    "WHAT WE WILL COVER IN 20 MINUTES:",
    "1. Your current software tools and where operations get stuck.",
    "2. How BITS unifies your workflows on one screen.",
    "3. Exact pricing, timeline, and roadmap for your team.",
    "",
    "WHAT YOU NEED TO PREPARE:",
    "Nothing. No slide decks, no homework. Just bring your real everyday questions.",
    "",
    `Join the call here when it is time: ${meetUrl}`,
    "",
    "Need to reschedule? Simply reply directly to this email.",
    "",
    "Warm regards,",
    "The Technical Architecture Team",
    "Boundless IT Solutions (BITS)",
    "https://www.boundlessits.com",
  ].join("\n");

  const bodyContent = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#0f172a;">
      Hi <strong>${escapeHtml(firstName)}</strong>,
    </p>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155;">
      Your 20-minute discovery call with <strong>Boundless IT Solutions (BITS)</strong> is officially confirmed. We look forward to meeting you and discussing your operational setup.
    </p>

    <!-- Meeting Confirmation Card -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #10b981;border-radius:14px;padding:22px;margin:24px 0 28px;">
      <span style="display:block;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#10b981;margin-bottom:8px;">
        Meeting Details Confirmed
      </span>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;line-height:1.8;color:#0f172a;">
        <tr>
          <td width="30%" style="color:#64748b;font-weight:600;">Company:</td>
          <td><strong style="color:#0f172a;">${escapeHtml(booking.company)}</strong></td>
        </tr>
        <tr>
          <td style="color:#64748b;font-weight:600;">Date:</td>
          <td><strong style="color:#0f172a;">${escapeHtml(booking.date)}</strong></td>
        </tr>
        <tr>
          <td style="color:#64748b;font-weight:600;">Time:</td>
          <td><strong style="color:#0063db;">${escapeHtml(booking.time)}</strong></td>
        </tr>
        <tr>
          <td style="color:#64748b;font-weight:600;">Host:</td>
          <td>${escapeHtml(architect)}</td>
        </tr>
      </table>
    </div>

    <!-- 3 Simple Things We'll Cover -->
    <h3 style="margin:0 0 12px;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#0f172a;">
      What We Will Cover in 20 Minutes
    </h3>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;font-size:14px;line-height:1.6;color:#334155;">
      <tr>
        <td width="28" valign="top" style="padding-bottom:10px;font-weight:900;color:#0063db;">1.</td>
        <td style="padding-bottom:10px;">Where your team spends manual time right now (spreadsheets, disconnected dialers, paperwork).</td>
      </tr>
      <tr>
        <td width="28" valign="top" style="padding-bottom:10px;font-weight:900;color:#0063db;">2.</td>
        <td style="padding-bottom:10px;">A live demonstration of how BITS runs your exact flow from one single cockpit.</td>
      </tr>
      <tr>
        <td width="28" valign="top" style="font-weight:900;color:#0063db;">3.</td>
        <td>Clear, fixed pricing options and exact launch timelines—no surprise per-seat fees.</td>
      </tr>
    </table>

    <!-- Zero Prep Reassurance Box -->
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px 20px;margin-bottom:28px;">
      <h4 style="margin:0 0 4px;font-size:13px;font-weight:800;color:#1e3a8a;">
        What do you need to prepare?
      </h4>
      <p style="margin:0;font-size:13px;line-height:1.5;color:#3b82f6;">
        <strong>Nothing.</strong> No presentation, no paperwork. Just come ready to talk about how your business currently operates.
      </p>
    </div>

    <!-- Big Join Call Button -->
    <div style="text-align:center;padding:10px 0 20px;">
      <a href="${meetUrl}" target="_blank"
        style="display:inline-block;padding:15px 36px;background:#0063db;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border-radius:9999px;box-shadow:0 8px 24px rgba(0,99,219,0.3);">
        Join Video Meeting Link &nbsp;→
      </a>
      <p style="margin:10px 0 0;font-size:12px;color:#64748b;">
        Need to change times? Simply reply directly to this email to pick a new slot.
      </p>
    </div>
  `;

  const html = renderEmailShell({
    title: subject,
    eyebrow: "CALL CONFIRMED",
    headline: "Your discovery call is scheduled.",
    subheadline: `${booking.date} · ${booking.time}`,
    bodyContent,
    canvasBackground: "#f4f7fb",
  });

  return { subject, text, html };
}

/**
 * 4. Custom Architecture Roadmap Delivery Email
 * Sent when BITS delivers a completed architectural blueprint or custom scope proposal.
 */
export function buildRoadmapDeliveryEmail(roadmap: EmailRoadmapData): EmailOutput {
  const firstName = roadmap.name.trim().split(" ")[0] || "there";
  const subject = `Your Custom Operational Blueprint is Ready — BITS (${roadmap.company})`;

  const text = [
    `Hi ${firstName},`,
    "",
    `Our engineering team has completed the tailored architecture roadmap for ${roadmap.company}.`,
    "",
    `Recommended Solution: ${roadmap.solutionName}`,
    "",
    "SUMMARY:",
    roadmap.summary,
    "",
    "KEY BOTTLENECK FIXES:",
    ...roadmap.keyBottlenecks.map((b, i) => `${i + 1}. ${b}`),
    "",
    `Review your complete blueprint online here: ${roadmap.roadmapUrl}`,
    "",
    "Next step: We can schedule a short review session to walk through questions.",
    "",
    "Warm regards,",
    "The Technical Architecture Team",
    "Boundless IT Solutions (BITS)",
    "https://www.boundlessits.com",
  ].join("\n");

  const bodyContent = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#0f172a;">
      Hi <strong>${escapeHtml(firstName)}</strong>,
    </p>

    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#334155;">
      Our senior technical architects have finished building the custom operational roadmap for <strong>${escapeHtml(
        roadmap.company
      )}</strong>.
    </p>

    <!-- Blueprint Overview Box -->
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #0063db;border-radius:14px;padding:22px;margin:24px 0 28px;">
      <span style="display:block;font-size:10px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#0063db;margin-bottom:6px;">
        Recommended Platform Architecture
      </span>
      <h3 style="margin:0 0 10px;font-size:16px;font-weight:800;color:#0f172a;">
        ${escapeHtml(roadmap.solutionName)}
      </h3>
      <p style="margin:0;font-size:13px;line-height:1.6;color:#475569;">
        ${escapeHtml(roadmap.summary)}
      </p>
    </div>

    <!-- Bottlenecks Solved -->
    <h3 style="margin:0 0 12px;font-size:13px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:#0f172a;">
      Key Operational Improvements Included
    </h3>
    <div style="margin-bottom:28px;">
      ${roadmap.keyBottlenecks
        .map(
          (b, i) => `
        <div style="padding:10px 14px;background:#f1f5f9;border-radius:8px;margin-bottom:8px;font-size:13px;color:#1e293b;line-height:1.5;">
          <strong style="color:#0063db;">0${i + 1}.</strong> &nbsp;${escapeHtml(b)}
        </div>
      `
        )
        .join("")}
    </div>

    <!-- CTA Button to view Blueprint -->
    <div style="text-align:center;padding:10px 0 24px;">
      <a href="${roadmap.roadmapUrl}" target="_blank"
        style="display:inline-block;padding:15px 36px;background:#0063db;color:#ffffff;font-size:15px;font-weight:800;text-decoration:none;border-radius:9999px;box-shadow:0 8px 24px rgba(0,99,219,0.3);">
        Open Your Operational Blueprint &nbsp;→
      </a>
      <p style="margin:10px 0 0;font-size:12px;color:#64748b;">
        Includes data schema layout, migration timeline, and fixed transparent investment.
      </p>
    </div>
  `;

  const html = renderEmailShell({
    title: subject,
    eyebrow: "ARCHITECTURE BLUEPRINT",
    headline: "Your operational blueprint is ready.",
    subheadline: `Custom scope engineered for ${roadmap.company}`,
    bodyContent,
    canvasBackground: "#f4f7fb",
  });

  return { subject, text, html };
}

/**
 * 5. Consultation Follow-Up / Friendly Check-In Email
 * Sent 3-5 days after initial contact to offer assistance or answer questions.
 */
export function buildConsultationFollowUpEmail(data: EmailFollowUpData): EmailOutput {
  const firstName = data.name.trim().split(" ")[0] || "there";
  const bookingUrl = data.bookingUrl || `${BRAND.siteUrl}/#contact`;

  const subject = `Quick check-in on your operational setup — BITS (${data.company})`;

  const text = [
    `Hi ${firstName},`,
    "",
    `I wanted to check in quickly regarding your team at ${data.company}.`,
    "",
    "When businesses explore our software, the goal is almost always the same:",
    "To stop wasting time copying numbers between separate tools, and run everything from one clean screen.",
    "",
    "If you have any questions about how BITS connects with your current tools, feel free to reply directly to this email.",
    "",
    `Or pick a convenient 20-minute slot whenever you are ready: ${bookingUrl}`,
    "",
    "Warm regards,",
    "The Technical Architecture Team",
    "Boundless IT Solutions (BITS)",
    "https://www.boundlessits.com",
  ].join("\n");

  const bodyContent = `
    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#0f172a;">
      Hi <strong>${escapeHtml(firstName)}</strong>,
    </p>

    <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#334155;">
      I wanted to follow up quickly on your note regarding <strong>${escapeHtml(data.company)}</strong>.
    </p>

    <p style="margin:0 0 22px;font-size:14px;line-height:1.6;color:#475569;">
      Most business leaders reach out to us for one primary reason: they are tired of their operators switching between ten disconnected tools and spreadsheets every single day.
    </p>

    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #0063db;border-radius:12px;padding:18px 22px;margin:20px 0 24px;">
      <p style="margin:0;font-size:14px;line-height:1.6;color:#0f172a;font-weight:700;">
        How we help in 1 line:
      </p>
      <p style="margin:4px 0 0;font-size:13px;line-height:1.6;color:#475569;">
        We engineer one clean operations cockpit that handles your CRM, live calls, team scorecards, and customer payments together—so nothing falls through the cracks.
      </p>
    </div>

    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#475569;">
      Would you like to hop on a quick 20-minute call this week? No sales pressure—just a clear look at how your system can run smoother.
    </p>

    <div style="text-align:center;padding:8px 0 20px;">
      <a href="${bookingUrl}" target="_blank"
        style="display:inline-block;padding:14px 34px;background:#0063db;color:#ffffff;font-size:14px;font-weight:800;text-decoration:none;border-radius:9999px;box-shadow:0 8px 20px rgba(0,99,219,0.3);">
        Pick a 20-Minute Time Slot &nbsp;→
      </a>
    </div>

    <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">
      Or simply reply directly to this email with times that work best for you.
    </p>
  `;

  const html = renderEmailShell({
    title: subject,
    eyebrow: "OPERATIONS CHECK-IN",
    headline: "Checking in on your software wishlist.",
    subheadline: `Tailored for ${data.company}`,
    bodyContent,
    canvasBackground: "#f4f7fb",
  });

  return { subject, text, html };
}
