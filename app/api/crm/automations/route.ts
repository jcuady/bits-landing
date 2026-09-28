import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export interface MarketingAutomationRecord {
  id: string;
  name: string;
  trigger_type: string;
  action_type: string;
  description: string | null;
  conditions: Record<string, unknown>;
  status: "active" | "paused" | "draft";
  execution_count: number;
  last_executed_at: string | null;
  created_at: string;
  updated_at: string;
}

/** GET /api/crm/automations — returns all active/paused automations */
export async function GET() {
  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("marketing_automations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[api/crm/automations] Supabase query error:", error.message);
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, automations: data ?? [] });
  } catch (err) {
    console.error("[api/crm/automations] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}

/** POST /api/crm/automations — create or update automation */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.trigger_type || !body.action_type) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, trigger_type, action_type" },
        { status: 400 }
      );
    }

    const supabase = await createServiceClient();

    // If ID provided, toggle or update
    if (body.id) {
      const { data, error } = await supabase
        .from("marketing_automations")
        .update({
          name: body.name,
          status: body.status ?? "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", body.id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, automation: data });
    }

    // Insert new automation
    const { data, error } = await supabase
      .from("marketing_automations")
      .insert({
        name: body.name,
        trigger_type: body.trigger_type,
        action_type: body.action_type,
        description: body.description ?? "",
        conditions: body.conditions ?? {},
        status: body.status ?? "active",
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, automation: data });
  } catch (err) {
    console.error("[api/crm/automations] Post error:", err);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}
