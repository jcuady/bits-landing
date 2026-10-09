import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { requireCrmUser } from "@/lib/crm/api-auth";
import {
  campaignPayloadSchema,
  noStoreHeaders,
  isUnparseableBody,
  fieldErrorsOf,
} from "@/lib/crm/api-contract";

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

/** Campaign rows are commercially sensitive and session-scoped — never cached. */
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: noStoreHeaders() });

/** GET /api/crm/campaigns — returns all marketing campaigns */
export async function GET() {
  const auth = await requireCrmUser();
  if (auth instanceof NextResponse) return auth;

  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("marketing_campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[api/crm/campaigns] Supabase query error:", error.message);
      return json({ ok: false, error: "Failed to load campaigns" }, 500);
    }

    return json({ ok: true, campaigns: data ?? [] });
  } catch (err) {
    console.error("[api/crm/campaigns] Unexpected error:", err);
    return json({ ok: false, error: "Internal server error" }, 500);
  }
}

/** POST /api/crm/campaigns — create marketing campaign */
export async function POST(req: Request) {
  const auth = await requireCrmUser();
  if (auth instanceof NextResponse) return auth;

  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    if (isUnparseableBody(err)) {
      return json({ ok: false, error: "Request body must be valid JSON" }, 400);
    }
    throw err;
  }

  const parsed = campaignPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Invalid campaign payload", fields: fieldErrorsOf(parsed.error) },
      400
    );
  }

  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("marketing_campaigns")
      .insert({
        name: parsed.data.name,
        channel: parsed.data.channel ?? "Email",
        subject: parsed.data.subject ?? null,
        status: parsed.data.status ?? "active",
        owner: parsed.data.owner ?? "Malcolm Cuady",
        target_audience: parsed.data.target_audience ?? "Inbound Leads",
      })
      .select()
      .single();

    if (error) {
      console.error("[api/crm/campaigns] Insert error:", error.message);
      return json({ ok: false, error: "Failed to create campaign" }, 500);
    }

    return json({ ok: true, campaign: data }, 201);
  } catch (err) {
    console.error("[api/crm/campaigns] Post error:", err);
    return json({ ok: false, error: "Internal server error" }, 500);
  }
}