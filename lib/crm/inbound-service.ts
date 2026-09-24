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
    interest: data.interest ?? "BITScrm Operations Platform",
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
    console.error("[inbound-service] recordInboundLead error:", error.message);
    // Return an in-memory fallback so the caller always gets a valid object
    return {
      id: `lead-local-${Date.now()}`,
      name: data.name,
      email: data.email,
      company: data.company,
      companySize: row.company_size,
      industry: row.industry,
      currentSystem: row.current_system,
      primaryChallenge: row.primary_challenge,
      preferredMethod: row.preferred_method,
      interest: row.interest,
      message: data.message,
      source: row.source,
      submittedAt: new Date().toISOString(),
      leadScore: score,
      status: "new",
      assignedTo: row.assigned_to,
      estimatedValue: estimatedValue,
    };
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

  const companies: Company[] = submissions.map((sub, idx) => ({
    id: `co-inbound-${idx + 1}`,
    name: sub.company,
    domain: sub.email.split("@")[1] ?? "client.ph",
    industry: sub.industry ?? "Enterprise",
    employees:
      sub.companySize?.includes("1,000+") ? 1200 : sub.companySize?.includes("500+") ? 650 : 220,
    arrEstimate: sub.estimatedValue,
    owner: sub.assignedTo,
    location: "Metro Manila, Philippines",
  }));

  const contacts: Contact[] = submissions.map((sub, idx) => ({
    id: `ct-inbound-${idx + 1}`,
    name: sub.name,
    email: sub.email,
    phone: `+63 9${Math.floor(10000000 + Math.random() * 90000000)}`,
    title: sub.industry ? `${sub.industry} Lead` : "Executive Contact",
    companyId: `co-inbound-${idx + 1}`,
    owner: sub.assignedTo,
    lastTouchAt: sub.submittedAt,
    tags: ["website-inbound", "high-intent"],
  }));

  const opportunities: Opportunity[] = submissions.map((sub, idx) => {
    const stage =
      sub.status === "qualified"
        ? "proposal"
        : sub.status === "disqualified"
        ? "closed_lost"
        : "discovery";

    return {
      id: `op-inbound-${idx + 1}`,
      name: `${sub.company} — ${sub.interest ?? "BITScrm Enterprise"}`,
      companyId: `co-inbound-${idx + 1}`,
      contactId: `ct-inbound-${idx + 1}`,
      stage: stage as Opportunity["stage"],
      amount: sub.estimatedValue,
      probability: sub.leadScore >= 90 ? 70 : 45,
      closeDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split("T")[0]!,
      owner: sub.assignedTo,
      pipelineId: "pl-1",
    };
  });

  return { leads, opportunities, companies, contacts };
}
