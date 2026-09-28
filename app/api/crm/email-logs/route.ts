import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

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

/** GET /api/crm/email-logs — returns recent email delivery logs */
export async function GET() {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("email_logs")
      .select("*")
      .order("sent_at", { ascending: false })
      .limit(100);

    if (error) {
      console.error("[api/crm/email-logs] Supabase query error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, logs: data ?? [] });
  } catch (err) {
    console.error("[api/crm/email-logs] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
