import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export interface MarketingCampaignRecord {
  id: string;
  name: string;
  channel: string;
  subject: string | null;
  status: "draft" | "active" | "paused" | "completed";
  owner: string;
  target_audience: string;
  sent_count: number;
  delivered_count: number;
  open_rate: number;
  click_rate: number;
  created_at: string;
  updated_at: string;
}

/** GET /api/crm/campaigns — returns all marketing campaigns */
export async function GET() {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("marketing_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[api/crm/campaigns] Supabase query error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, campaigns: data ?? [] });
  } catch (err) {
    console.error("[api/crm/campaigns] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

/** POST /api/crm/campaigns — create marketing campaign */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json({ ok: false, error: "Missing required field: name" }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("marketing_campaigns")
      .insert({
        name: body.name,
        channel: body.channel ?? "Email",
        subject: body.subject ?? null,
        status: body.status ?? "active",
        owner: body.owner ?? "Malcolm Cuady",
        target_audience: body.target_audience ?? "Inbound Leads",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, campaign: data });
  } catch (err) {
    console.error("[api/crm/campaigns] Post error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
