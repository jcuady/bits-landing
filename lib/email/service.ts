/**
 * Unified Email Dispatch & Logging Service
 * Boundless IT Solutions (BITS)
 *
 * Integrates Resend API with verified domain (boundlessits.com)
 * and logs all outbound communications to Supabase public.email_logs.
 */

import {
  buildTeamNotificationEmail,
  buildClientWelcomeAutoResponder,
  type EmailLeadData,
} from "./templates";

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  templateType: string;
  metadata?: Record<string, unknown>;
}

export interface EmailDispatchResult {
  ok: boolean;
  resendId?: string;
  error?: string;
}

/**
 * Low-level Resend dispatch with Supabase logging
 */
export async function sendEmailWithLog(
  options: SendEmailOptions
): Promise<EmailDispatchResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = options.from || process.env.CONTACT_FROM || "BITS Inquiries <inquiries@boundlessits.com>";
  const recipients = Array.isArray(options.to) ? options.to : [options.to];

  if (!apiKey) {
    console.warn(`[email-service] RESEND_API_KEY missing — skipping live send to ${recipients.join(", ")}`);
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }

  let resendId: string | undefined;
  let status: "sent" | "failed" = "sent";
  let errorMessage: string | undefined;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({
        from,
        to: recipients,
        reply_to: options.replyTo,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      status = "failed";
      errorMessage = data?.message || `Resend error status ${res.status}`;
      console.error("[email-service] Resend error:", { status: res.status, data });
    } else {
      resendId = data?.id;
    }
  } catch (err) {
    status = "failed";
    errorMessage = err instanceof Error ? err.message : String(err);
    console.error("[email-service] Network error during send:", err);
  }

  // Asynchronously log to Supabase email_logs
  try {
    const { createServiceClient } = await import("@/lib/supabase/server");
    const supabase = await createServiceClient();

    await supabase.from("email_logs").insert({
      resend_id: resendId,
      direction: "outbound",
      recipient: recipients.join(", "),
      sender: from,
      subject: options.subject,
      template: options.templateType,
      status: status,
      error_message: errorMessage,
      metadata: options.metadata ?? {},
    });
  } catch (dbErr) {
    // Non-blocking DB log failure
    console.error("[email-service] Failed to persist email_log to Supabase:", dbErr);
  }

  return {
    ok: status === "sent",
    resendId,
    error: errorMessage,
  };
}

/**
 * Inbound Form Marketing Automation Flow:
 * 1. Dispatches Internal Notification to boundlessitsolutions@gmail.com
 * 2. Dispatches Client Operational Wish List Auto-Responder to lead work email
 * 3. Updates public.marketing_automations telemetry in Supabase
 */
export async function executeInboundFormAutomation(lead: EmailLeadData): Promise<{
  teamNotification: EmailDispatchResult;
  clientWelcome: EmailDispatchResult;
}> {
  const inbox = process.env.CONTACT_INBOX || "boundlessitsolutions@gmail.com";
  const verifiedSender = process.env.CONTACT_FROM || "BITS Inquiries <inquiries@boundlessits.com>";

  // 1. Team Notification Email
  const teamEmail = buildTeamNotificationEmail(lead);
  const teamResult = await sendEmailWithLog({
    to: inbox,
    from: verifiedSender,
    replyTo: lead.email,
    subject: teamEmail.subject,
    html: teamEmail.html,
    text: teamEmail.text,
    templateType: "inbound_lead_alert",
    metadata: {
      leadScore: lead.leadScore,
      company: lead.company,
      interest: lead.interest,
    },
  });

  // 2. Client Welcome & Architecture Confirmation Email
  const clientEmail = buildClientWelcomeAutoResponder(lead);
  const clientResult = await sendEmailWithLog({
    to: lead.email,
    from: verifiedSender,
    replyTo: "bits_inquiries@boundlessits.com",
    subject: clientEmail.subject,
    html: clientEmail.html,
    text: clientEmail.text,
    templateType: "client_wish_list_confirmation",
    metadata: {
      company: lead.company,
      interest: lead.interest,
    },
  });

  // 3. Increment execution counts in marketing_automations table
  try {
    const { createServiceClient } = await import("@/lib/supabase/server");
    const supabase = await createServiceClient();

    // Update 'Instant OPERATIONS 360 Client Welcome'
    try {
      await supabase.rpc("increment_automation_count", {
        automation_name: "Instant OPERATIONS 360 Client Welcome",
      });
    } catch {
      await supabase
        .from("marketing_automations")
        .update({
          last_executed_at: new Date().toISOString(),
        })
        .eq("trigger_type", "inbound_form_submitted");
    }
  } catch (err) {
    console.warn("[email-service] Failed to update marketing_automations counter:", err);
  }

  return {
    teamNotification: teamResult,
    clientWelcome: clientResult,
  };
}
