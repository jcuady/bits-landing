import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { requireCrmUser } from "@/lib/crm/api-auth";
import { noStoreHeaders } from "@/lib/crm/api-contract";

export interface EmailLogRecord {
  id: string;
  resend_id: string | null;
  direction: "inbound" | "outbound";
  recipient: string;
  sender: string;
  subject: string;
  template: string;
  status: "sent" | "delivered" | "failed" | "bounced";
  error_message: string | null;
  metadata: Record<string, unknown>;
  sent_at: string;
}

/**
 * GET /api/crm/email-logs — returns recent email delivery logs.
 *
 * Authenticated CRM users only. This endpoint exposes recipient, sender, and
 * subject PII, so it must never be reachable anonymously.
 */
export async function GET() {
  const auth = await requireCrmUser();
  if (auth instanceof NextResponse) return auth;

  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("email_logs")
      .select("*")
      .order("sent_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("[api/crm/email-logs] Supabase query error:", error.message);
      return NextResponse.json(
        { ok: false, error: "Failed to load email logs" },
        { status: 500, headers: noStoreHeaders() }
      );
    }

    // Recipient, sender and subject are PII. Without an explicit no-store this
    // response is eligible for heuristic caching by browsers and shared proxies,
    // which would leak somebody's correspondence off the session it belongs to.
    return NextResponse.json(
      { ok: true, logs: data ?? [] },
      { headers: noStoreHeaders() }
    );
  } catch (err) {
    console.error("[api/crm/email-logs] Unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Internal server error" },
      { status: 500, headers: noStoreHeaders() }
    );
  }
}
