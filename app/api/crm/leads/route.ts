import { NextResponse } from "next/server";
import {
  getStoredInboundLeads,
  recordInboundLead,
  mapInboundLeadsToCrm,
} from "@/lib/crm/inbound-service";
import { createClient } from "@/lib/supabase/server";

/** GET /api/crm/leads — authenticated CRM users only */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const submissions = await getStoredInboundLeads();
    const mapped = mapInboundLeadsToCrm(submissions);
    return NextResponse.json({
      ok: true,
      submissions,
      mapped,
      count: submissions.length,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to fetch inbound leads" },
      { status: 500 }
    );
  }
}

/** POST /api/crm/leads — accepts inbound lead from external integrations */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.company || !body.message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: name, email, company, message" },
        { status: 400 }
      );
    }

    const newLead = await recordInboundLead({
      name: body.name,
      email: body.email,
      company: body.company,
      companySize: body.companySize,
      industry: body.industry,
      currentSystem: body.currentSystem,
      primaryChallenge: body.primaryChallenge,
      preferredMethod: body.preferredMethod,
      interest: body.interest,
      message: body.message,
      source: body.source ?? "Website Inbound Form",
    });

    return NextResponse.json({ ok: true, lead: newLead });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
