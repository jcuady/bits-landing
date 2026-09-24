import { NextResponse } from "next/server";
import {
  getStoredInboundLeads,
  recordInboundLead,
  mapInboundLeadsToCrm,
} from "@/lib/crm/inbound-service";

export async function GET() {
  try {
    const submissions = getStoredInboundLeads();
    const mapped = mapInboundLeadsToCrm(submissions);
    return NextResponse.json({
      ok: true,
      submissions,
      mapped,
      count: submissions.length,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Failed to fetch inbound leads" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.company) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields (name, email, company)" },
        { status: 400 }
      );
    }

    const newLead = recordInboundLead({
      name: body.name,
      email: body.email,
      company: body.company,
      companySize: body.companySize,
      industry: body.industry,
      currentSystem: body.currentSystem,
      primaryChallenge: body.primaryChallenge,
      preferredMethod: body.preferredMethod,
      interest: body.interest,
      message: body.message || "Inbound inquiry via BITS website form",
      source: body.source || "Website Inbound Form",
    });

    return NextResponse.json({ ok: true, lead: newLead });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
