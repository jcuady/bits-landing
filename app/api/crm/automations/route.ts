import { NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { requireCrmUser } from "@/lib/crm/api-auth";
import {
  automationPayloadSchema,
  noStoreHeaders,
  isUnparseableBody,
  fieldErrorsOf,
} from "@/lib/crm/api-contract";

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

/** Automation rules describe live outbound behaviour — never cache. */
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: noStoreHeaders() });

/** GET /api/crm/automations — returns all active/paused automations */
export async function GET() {
  const auth = await requireCrmUser();
  if (auth instanceof NextResponse) return auth;

  try {
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("marketing_automations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[api/crm/automations] Supabase query error:", error.message);
      return json({ ok: false, error: "Failed to load automations" }, 500);
    }

    return json({ ok: true, automations: data ?? [] });
  } catch (err) {
    console.error("[api/crm/automations] Unexpected error:", err);
    return json({ ok: false, error: "Internal server error" }, 500);
  }
}

/** POST /api/crm/automations — create or update automation */
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

  const parsed = automationPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Invalid automation payload", fields: fieldErrorsOf(parsed.error) },
      400
    );
  }

  try {
    const supabase = await createServiceClient();
    const { id, ...fields } = parsed.data;

    // If ID provided, update in place.
    if (id) {
      const { data, error } = await supabase
        .from("marketing_automations")
        .update({
          name: fields.name,
          status: fields.status ?? "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .maybeSingle();

      if (error) {
        console.error("[api/crm/automations] Update error:", error.message);
        return json({ ok: false, error: "Failed to update automation" }, 500);
      }
      // `.single()` used to raise on zero rows, turning "no such automation"
      // into a 500. A missing row is a 404, not a server fault.
      if (!data) {
        return json({ ok: false, error: "Automation not found" }, 404);
      }
      return json({ ok: true, automation: data });
    }

    // Insert new automation
    const { data, error } = await supabase
      .from("marketing_automations")
      .insert({
        name: fields.name,
        trigger_type: fields.trigger_type,
        action_type: fields.action_type,
        description: fields.description ?? "",
        conditions: fields.conditions ?? {},
        status: fields.status ?? "active",
      })
      .select()
      .single();

    if (error) {
      console.error("[api/crm/automations] Insert error:", error.message);
      return json({ ok: false, error: "Failed to create automation" }, 500);
    }

    return json({ ok: true, automation: data }, 201);
  } catch (err) {
    console.error("[api/crm/automations] Post error:", err);
    return json({ ok: false, error: "Internal server error" }, 500);
  }
}