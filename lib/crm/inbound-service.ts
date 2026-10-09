/**
 * Inbound Lead Service — Supabase-backed
 *
 * All reads/writes go to the `inbound_leads` table in Supabase.
 * Uses the service-role client for server-action writes (bypasses RLS safely
 * because this is server-only code, never exposed to the browser).
 *
 * Table: public.inbound_leads (see scripts/seed-supabase.mjs for schema)
 */

import type { Lead, Opportunity, Company, Contact } from "./types";

export interface InboundFormSubmission {
  id: string;
  name: string;
  email: string;
  company: string;
  companySize?: string;
  industry?: string;
  currentSystem?: string;
  primaryChallenge?: string;
  preferredMethod?: string;
  interest?: string;
  message: string;
  source: string;
  submittedAt: string;
  leadScore: number;
  status: "new" | "working" | "qualified" | "disqualified";
  assignedTo: string;
  estimatedValue: number;
}

// Compute a realistic lead score from form fields
export function calculateLeadScore(data: {
  companySize?: string;
  industry?: string;
  interest?: string;
  message?: string;
}): number {
  let score = 70;
  if (data.companySize?.includes("500+") || data.companySize?.includes("1,000+")) score += 15;
  else if (data.companySize?.includes("100-250") || data.companySize?.includes("250-500")) score += 10;
  else if (data.companySize?.includes("50-100")) score += 5;

  if (
    data.industry?.toLowerCase().includes("bank") ||
    data.industry?.toLowerCase().includes("fintech") ||
    data.industry?.toLowerCase().includes("bpo")
  ) {
    score += 10;
  }

  if (data.message && data.message.length > 80) score += 5;
  return Math.min(score, 99);
}

/**
 * Fetch all inbound leads from Supabase, ordered newest first.
 * Falls back to an empty array on error.
 */
export async function getStoredInboundLeads(): Promise<InboundFormSubmission[]> {
  try {
    const { createServiceClient } = await import("@/lib/supabase/server");
    const supabase = await createServiceClient();
    const { data, error } = await supabase
      .from("inbound_leads")
      .select("*")
      .order("submitted_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("[inbound-service] getStoredInboundLeads error:", error.message);
      return [];
    }

    return (data ?? []).map(rowToSubmission);
  } catch (err) {
    console.error("[inbound-service] getStoredInboundLeads unexpected error:", err);
    return [];
  }
}

/**
 * Record a new inbound lead from a website form submission.
 * Inserts into `inbound_leads` via service role (no RLS bypass needed on server).
 *
 * THROWS on failure. This is a revenue path: a silent in-memory fallback would
 * let the caller report "thank you" for a lead that was never stored and can
 * never be followed up. Callers must handle the error and surface it.
 */
export async function recordInboundLead(data: {
  name: string;
  email: string;
  company: string;
  companySize?: string;
  industry?: string;
  currentSystem?: string;
  primaryChallenge?: string;
  preferredMethod?: string;
  interest?: string;
  message: string;
  source?: string;
}): Promise<InboundFormSubmission> {
  const score = calculateLeadScore(data);
  const estimatedValue =
    data.companySize?.includes("500+") || data.companySize?.includes("1,000+")
      ? 1_850_000
      : data.companySize?.includes("100-250") || data.companySize?.includes("250-500")
      ? 1_250_000
      : 650_000;

  const row = {
    name: data.name,
    email: data.email,
    company: data.company,
    company_size: data.companySize ?? "50-100 seats",
    industry: data.industry ?? "Enterprise Technology",
    current_system: data.currentSystem ?? "Legacy Systems",
    primary_challenge: data.primaryChallenge ?? "Collections & Ops Automation",
    preferred_method: data.preferredMethod ?? "Executive Demo",
    interest: data.interest ?? "OPERATIONS 360 Flagship Platform",
    message: data.message,
    source: data.source ?? "Website Contact Form",
    lead_score: score,
    status: "new" as const,
    assigned_to: "Malcolm Cuady",
    estimated_value: estimatedValue,
  };

  const { createServiceClient } = await import("@/lib/supabase/server");
  const supabase = await createServiceClient();
  const { data: inserted, error } = await supabase
    .from("inbound_leads")
    .insert(row)
    .select()
    .single();

  if (error) {
    // Rethrow so the caller can surface a real failure instead of silently
    // dropping a qualified lead. See the doc comment above.
    console.error("[inbound-service] recordInboundLead error:", error.message);
    throw new Error(`Failed to persist inbound lead: ${error.message}`);
  }

  return rowToSubmission(inserted);
}

/** Map a Supabase DB row (snake_case) to the InboundFormSubmission interface */
function rowToSubmission(row: Record<string, unknown>): InboundFormSubmission {
  return {
    id: String(row.id ?? ""),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    company: String(row.company ?? ""),
    companySize: row.company_size ? String(row.company_size) : undefined,
    industry: row.industry ? String(row.industry) : undefined,
    currentSystem: row.current_system ? String(row.current_system) : undefined,
    primaryChallenge: row.primary_challenge ? String(row.primary_challenge) : undefined,
    preferredMethod: row.preferred_method ? String(row.preferred_method) : undefined,
    interest: row.interest ? String(row.interest) : undefined,
    message: String(row.message ?? ""),
    source: String(row.source ?? "Website Contact Form"),
    submittedAt: String(row.submitted_at ?? new Date().toISOString()),
    leadScore: Number(row.lead_score ?? 70),
    status: (row.status as InboundFormSubmission["status"]) ?? "new",
    assignedTo: String(row.assigned_to ?? "Malcolm Cuady"),
    estimatedValue: Number(row.estimated_value ?? 650_000),
  };
}

/**
 * Stable, collision-resistant id derived from a submission's own identity.
 *
 * This MUST NOT be the array index. `mapInboundLeadsToCrm` is re-run on every
 * `/api/crm/leads` fetch, and the store prepends newly-arrived leads to the
 * front of the array. With index-derived ids (`co-inbound-${idx + 1}`), one
 * new inbound lead shifted every existing company, contact and opportunity onto
 * a different id, so the store's "merge anything whose id I don't have" logic
 * duplicated the entire CRM on each new submission. Deriving the id from the
 * entity itself makes the mapping idempotent.
 */
function stableId(prefix: string, ...parts: string[]): string {
  const seed = parts.map((p) => p.trim().toLowerCase()).join("|");
  // FNV-1a, 32-bit. Deterministic across runs and platforms.
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return `${prefix}-${h.toString(36)}`;
}

/** Convert Supabase-backed submissions to standard CRM types */
export function mapInboundLeadsToCrm(submissions: InboundFormSubmission[]): {
  leads: Lead[];
  opportunities: Opportunity[];
  companies: Company[];
  contacts: Contact[];
} {
  const leads: Lead[] = submissions.map((sub) => ({
    id: sub.id,
    name: sub.name,
    email: sub.email,
    company: sub.company,
    title: `${sub.interest?.split(" ")[0] ?? "Inbound"} Decision Maker`,
    source: sub.source,
    status: sub.status,
    score: sub.leadScore,
    owner: sub.assignedTo,
    createdAt: sub.submittedAt,
    lastActivityAt: sub.submittedAt,
    notes: `Industry: ${sub.industry ?? "Enterprise"} · Challenge: ${sub.primaryChallenge ?? "N/A"}\nMessage: ${sub.message}`,
  }));

  const companies: Company[] = submissions.map((sub) => ({
    id: stableId("co", sub.company, sub.email.split("@")[1] ?? ""),
    name: sub.company,
    domain: sub.email.split("@")[1] ?? "client.ph",
    industry: sub.industry ?? "Enterprise",
    employees:
      sub.companySize?.includes("1,000+") ? 1200 : sub.companySize?.includes("500+") ? 650 : 220,
    arrEstimate: sub.estimatedValue,
    owner: sub.assignedTo,
    location: "Metro Manila, Philippines",
  }));

  const contacts: Contact[] = submissions.map((sub) => ({
    id: stableId("ct", sub.email),
    name: sub.name,
    email: sub.email,
    /**
     * The website contact form does not collect a phone number, so there is no
     * honest value to derive. This used to be `+63 9${random()}`, which meant
     * every inbound contact was given an invented Philippine mobile that
     * CHANGED on every page load. An empty string is correct: the rep fills it
     * in on first contact. Fabricating a number that mutates is worse than
     * having none.
     */
    phone: "",
    title: sub.industry ? `${sub.industry} Lead` : "Executive Contact",
    companyId: stableId("co", sub.company, sub.email.split("@")[1] ?? ""),
    owner: sub.assignedTo,
    lastTouchAt: sub.submittedAt,
    tags: ["website-inbound", "high-intent"],
  }));

  const opportunities: Opportunity[] = submissions.map((sub) => {
    const stage =
      sub.status === "qualified"
        ? "proposal"
        : sub.status === "disqualified"
        ? "closed_lost"
        : "discovery";

    return {
      id: stableId("op", sub.id || sub.email),
      name: `${sub.company} — ${sub.interest ?? "BITScrm Enterprise"}`,
      companyId: stableId("co", sub.company, sub.email.split("@")[1] ?? ""),
      contactId: stableId("ct", sub.email),
      stage: stage as Opportunity["stage"],
      amount: sub.estimatedValue,
      probability: sub.leadScore >= 90 ? 70 : 45,
      /**
       * Anchored to the submission date, not `Date.now()`. Using the wall clock
       * meant every re-fetch moved every close date forward, so a quoted close
       * date could not stay still.
       */
      closeDate: new Date(
        new Date(sub.submittedAt).getTime() + 1000 * 60 * 60 * 24 * 30
      )
        .toISOString()
        .slice(0, 10),
      owner: sub.assignedTo,
      pipelineId: "pl-1",
    };
  });

  return { leads, opportunities, companies, contacts };
}
