#!/usr/bin/env node
/**
 * scripts/test-marketing-automation.mjs
 *
 * Verifies end-to-end:
 * 1. Supabase connectivity & inbound_leads persistence
 * 2. Resend API live dispatch via verified domain (boundlessits.com)
 * 3. Both Team Notification & Client Welcome auto-responder
 * 4. Supabase email_logs recording
 * 5. Marketing automations counter updates
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// 1. Read .env.local
const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
const env = {};
for (const line of envLines) {
  const trimmed = line.trim();
  if (trimmed.startsWith("#") || !trimmed.includes("=")) continue;
  const eqIdx = trimmed.indexOf("=");
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim();
  env[key] = value;
}

const SUPABASE_URL = env["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_KEY = env["SUPABASE_SERVICE_ROLE_KEY"];
const RESEND_API_KEY = env["RESEND_API_KEY"];
const CONTACT_FROM = env["CONTACT_FROM"] || "BITS Inquiries <inquiries@boundlessits.com>";
const CONTACT_INBOX = env["CONTACT_INBOX"] || "boundlessitsolutions@gmail.com";

/* ── Guard (SYSTEM_AUDIT.md §36) ─────────────────────────────────────────────
 *
 * This script sends TWO REAL EMAILS through Resend and writes THREE rows into
 * the live database (one inbound_leads, two email_logs) with no confirmation of
 * any kind. Running it to "see if it still works" puts test rows in production.
 *
 * It also had two ways to report success while failing:
 *   - `runTest().catch(console.error)` - an unhandled rejection printed the error
 *     and the process still exited 0, so `npm run` reported a pass.
 *   - the closing line printed "FULL MARKETING AUTOMATION & EMAIL DELIVERY
 *     PIPELINE VERIFIED!" unconditionally, even when steps 1-4 had each logged
 *     a failure. Nothing set a failure flag.
 *
 * Now: dry run by default; --apply plus a matching --confirm-project; failures
 * set a flag; the summary reflects what actually happened.
 *
 * The lead it writes is SYNTHETIC and labelled as such. Never run it against a
 * database holding real enquiries.
 */
for (const [k, v] of Object.entries({
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: SERVICE_KEY,
  RESEND_API_KEY: RESEND_API_KEY,
})) {
  if (!v) {
    console.error(`Missing ${k} in .env.local`);
    process.exit(1);
  }
}

const PROJECT_REF = (() => {
  try {
    const host = new URL(SUPABASE_URL).hostname;
    const m = host.match(/^([a-z0-9]+)\.supabase\.(co|in)$/i);
    return m ? m[1] : null;
  } catch {
    return null;
  }
})();

const APPLY = process.argv.includes("--apply");
const confirmIdx = process.argv.indexOf("--confirm-project");
const CONFIRMED_REF = confirmIdx === -1 ? null : process.argv[confirmIdx + 1];

const ACTIONS = [
  "POST 1 synthetic row to inbound_leads",
  "POST 2 rows to email_logs",
  `Send 2 real emails via Resend to ${CONTACT_INBOX}`,
];

if (!APPLY) {
  console.log("DRY RUN - nothing written, no email sent.\n");
  console.log("   Target project :", PROJECT_REF ?? "(could not derive from NEXT_PUBLIC_SUPABASE_URL)");
  console.log("   Sender         :", CONTACT_FROM);
  console.log("   Recipient      :", CONTACT_INBOX);
  console.log("\n   This script would:");
  for (const a of ACTIONS) console.log(`     - ${a}`);
  console.log(
    `\n   To run it: node scripts/test-marketing-automation.mjs --apply --confirm-project ${PROJECT_REF ?? "<ref>"}`
  );
  console.log("   NEVER run it against a database holding real enquiries.\n");
  process.exit(0);
}

if (!PROJECT_REF) {
  console.error("Cannot derive the project ref from NEXT_PUBLIC_SUPABASE_URL. Refusing to guess.");
  process.exit(1);
}
if (CONFIRMED_REF !== PROJECT_REF) {
  console.error("Refusing to run.");
  console.error(`   Target project : ${PROJECT_REF}`);
  console.error(`   You confirmed  : ${CONFIRMED_REF ?? "(nothing)"}`);
  console.error(`   Re-run with: --apply --confirm-project ${PROJECT_REF}`);
  process.exit(1);
}

/** Failures are tracked, not merely printed. */
let failures = 0;
const fail = (step, detail) => {
  failures++;
  console.error(`STEP FAILED - ${step}:`, detail ?? "(no detail returned)");
};

console.log("\nLIVE RUN - real emails will be sent and rows written.");

console.log("=== BITS MARKETING AUTOMATION VERIFICATION ===");
console.log("Supabase URL:", SUPABASE_URL);
console.log("Verified Sender:", CONTACT_FROM);
console.log("Notification Inbox:", CONTACT_INBOX);

async function runTest() {
  const testLead = {
    name: "Alex Vance (CTO Test)",
    email: "boundlessitsolutions@gmail.com", // Using verified inbox for test delivery
    company: "Apex Recovery & FinTech Ph",
    company_size: "250-500 seats",
    industry: "Financial Services & BPO",
    current_system: "Disconnected Telephony + Separate QA Sheets",
    primary_challenge: "Moving beyond fragmented operations to one source of truth",
    preferred_method: "Principal Architecture Call",
    interest: "OPERATIONS 360 Integrated Operations Platform",
    message: "Our operational wish list: We need CRM, 100% QA call scorecards, supervisor coaching logs, and live WFM schedule adherence in one system with zero MIS report delay.",
    source: "Automated E2E Verification Suite (SYNTHETIC - not a real enquiry)",
    lead_score: 95,
    status: "new",
    assigned_to: "Malcolm Cuady",
    estimated_value: 1250000,
  };

  // Step 1: Insert lead to Supabase inbound_leads table
  console.log("\n[1/4] Persisting test lead to Supabase inbound_leads…");
  const dbRes = await fetch(`${SUPABASE_URL}/rest/v1/inbound_leads`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(testLead),
  });

  const dbData = await dbRes.json();
  if (!dbRes.ok) {
    // If unique constraint triggers on duplicate email, fetch existing
    console.log("Inbound lead notice:", dbData?.message || dbData);
    fail("persist lead to inbound_leads", dbData?.message || JSON.stringify(dbData));
  } else {
    console.log("Lead saved to Supabase with ID:", dbData[0]?.id);
  }

  // Step 2: Send Team Notification Email via Resend with verified domain
  console.log("\n[2/4] Sending Team Notification Email via Resend…");
  const teamEmailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_INBOX],
      reply_to: testLead.email,
      subject: `[Lead Alert - Score 95] ${testLead.company} — OPERATIONS 360`,
      html: `
        <div style="font-family:sans-serif;padding:20px;border:1px solid #e2e8f0;border-radius:12px;">
          <h2 style="color:#0f172a;margin:0 0 10px;">New Inbound Lead: ${testLead.company}</h2>
          <p><strong>Contact:</strong> ${testLead.name} (${testLead.email})</p>
          <p><strong>Lead Score:</strong> <span style="color:#10b981;font-weight:bold;">95/100 (HIGH INTENT)</span></p>
          <p><strong>Product Interest:</strong> ${testLead.interest}</p>
          <p><strong>Team Size:</strong> ${testLead.company_size}</p>
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
          <p><strong>Operational Wish List:</strong></p>
          <blockquote style="background:#f8fafc;padding:12px;border-left:4px solid #2563eb;margin:0;">
            ${testLead.message}
          </blockquote>
        </div>
      `,
    }),
  });

  const teamEmailData = await teamEmailRes.json();
  if (!teamEmailRes.ok) {
    fail("team notification email", JSON.stringify(teamEmailData));
  } else {
    console.log("Team Notification Email sent. Resend ID:", teamEmailData.id);
  }

  // Step 3: Send Client Welcome & Wish List Confirmation Email
  console.log("\n[3/4] Sending Client Welcome Confirmation Email via Resend…");
  const clientEmailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_INBOX], // Sent to safe test address
      reply_to: "bits_inquiries@boundlessits.com",
      subject: `We've received your operational wish list — BITS (Boundless IT Solutions)`,
      html: `
        <div style="font-family:sans-serif;padding:24px;border:1px solid #e2e8f0;border-radius:14px;background:#ffffff;">
          <span style="font-size:11px;font-weight:bold;color:#2563eb;text-transform:uppercase;">OPERATIONS 360 · BITS Architecture</span>
          <h2 style="margin:8px 0 12px;color:#0f172a;">Operational Wish List Confirmed</h2>
          <p>Dear ${testLead.name},</p>
          <p>Thank you for submitting your requirements for <strong>${testLead.company}</strong>. Our technical architecture team is reviewing your parameters to prepare a consultative roadmap within 24 business hours.</p>
          <div style="background:#f1f5f9;padding:14px;border-radius:8px;margin:16px 0;font-size:13px;">
            <strong>Scope:</strong> ${testLead.message}
          </div>
          <p style="font-size:12px;color:#64748b;">BITS — Boundless IT Solutions · Technology built around the way your business actually operates.</p>
        </div>
      `,
    }),
  });

  const clientEmailData = await clientEmailRes.json();
  if (!clientEmailRes.ok) {
    fail("client welcome email", JSON.stringify(clientEmailData));
  } else {
    console.log("Client Confirmation Email sent. Resend ID:", clientEmailData.id);
  }

  // Step 4: Log to Supabase email_logs
  console.log("\n[4/4] Logging email deliveries to Supabase public.email_logs…");
  const logRows = [
    {
      resend_id: teamEmailData?.id ?? null,
      direction: "outbound",
      recipient: CONTACT_INBOX,
      sender: CONTACT_FROM,
      subject: `[Lead Alert - Score 95] ${testLead.company} — OPERATIONS 360`,
      template: "inbound_lead_alert",
      status: teamEmailRes.ok ? "sent" : "failed",
      metadata: { company: testLead.company, leadScore: 95 },
    },
    {
      resend_id: clientEmailData?.id ?? null,
      direction: "outbound",
      recipient: testLead.email,
      sender: CONTACT_FROM,
      subject: `We've received your operational wish list — BITS`,
      template: "client_wish_list_confirmation",
      status: clientEmailRes.ok ? "sent" : "failed",
      metadata: { company: testLead.company, interest: testLead.interest },
    },
  ];

  const logRes = await fetch(`${SUPABASE_URL}/rest/v1/email_logs`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(logRows),
  });

  const logData = await logRes.json();
  if (!logRes.ok) {
    fail("email_logs insert", JSON.stringify(logData));
  } else {
    console.log(`Logged ${logData.length} email records into Supabase email_logs.`);
  }

  /*
   * The summary reflects what happened. This line used to print
   * "FULL MARKETING AUTOMATION & EMAIL DELIVERY PIPELINE VERIFIED!" on every
   * run, including runs where all four steps had just logged a failure.
   */
  if (failures === 0) {
    console.log("\nMARKETING AUTOMATION & EMAIL DELIVERY PIPELINE VERIFIED.\n");
  } else {
    console.error(`\nPIPELINE VERIFICATION FAILED - ${failures} step(s) did not complete.`);
    console.error("The pipeline is NOT verified. See the errors above.\n");
    process.exitCode = 1;
  }
}

runTest().catch((err) => {
  /*
   * Used to be `.catch(console.error)`, which printed the error and exited 0 —
   * so an unhandled rejection reported success to `npm run`.
   */
  console.error("\nPIPELINE VERIFICATION FAILED - unhandled error:");
  console.error(err);
  process.exitCode = 1;
});
