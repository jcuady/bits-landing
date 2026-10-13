import { NextResponse } from "next/server";
import {
  getStoredInboundLeads,
  recordInboundLead,
  mapInboundLeadsToCrm,
} from "@/lib/crm/inbound-service";
import { headers } from "next/headers";
import { requireCrmUser } from "@/lib/crm/api-auth";
import {
  leadPayloadSchema,
  noStoreHeaders,
  isUnparseableBody,
  fieldErrorsOf,
} from "@/lib/crm/api-contract";
import { rateLimit, clientKeyFromHeaders } from "@/lib/security/rate-limit";

/** Every response from this route is session-scoped PII and must not be cached. */
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: noStoreHeaders() });

/** GET /api/crm/leads — authenticated CRM users only */
export async function GET() {
  const auth = await requireCrmUser();
  if (auth instanceof NextResponse) return auth;

  try {
    const submissions = await getStoredInboundLeads();
    const mapped = mapInboundLeadsToCrm(submissions);
    return json({
      ok: true,
      submissions,
      mapped,
      count: submissions.length,
    });
  } catch (err) {
    console.error("[api/crm/leads] Unexpected error:", err);
    return json({ ok: false, error: "Failed to fetch inbound leads" }, 500);
  }
}

/**
 * POST /api/crm/leads — accepts inbound lead from external integrations.
 *
 * Authenticated CRM users only: this writes through the service-role client
 * (RLS bypass), so an anonymous caller must never reach the insert.
 */
export async function POST(req: Request) {
  const auth = await requireCrmUser();
  if (auth instanceof NextResponse) return auth;

  // Rate limited. This is an authenticated WRITE path into the live
  // `inbound_leads` table and previously had no limit at all, while every other
  // write path in the app was capped (contact form, login, forgot-password).
  const headerList = await headers();
  const clientKey = clientKeyFromHeaders(headerList);
  const limit = rateLimit(`crm-lead-write:${clientKey}`, 20, 10 * 60 * 1000);
  if (!limit.ok) {
    return json(
      {
        ok: false,
        error: "Too many requests. Please retry later.",
        retryAfterSeconds: limit.retryAfterSeconds,
      },
      429
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (err) {
    // A malformed body is the caller's mistake, not a server fault.
    if (isUnparseableBody(err)) {
      return json({ ok: false, error: "Request body must be valid JSON" }, 400);
    }
    throw err;
  }

  const parsed = leadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Invalid lead payload", fields: fieldErrorsOf(parsed.error) },
      400
    );
  }

  try {
    const newLead = await recordInboundLead({
      ...parsed.data,
      source: parsed.data.source ?? "Website Inbound Form",
    });

    return json({ ok: true, lead: newLead }, 201);
  } catch (err) {
    console.error("[api/crm/leads] Failed to record lead:", err);
    return json({ ok: false, error: "Failed to process lead" }, 500);
  }
}