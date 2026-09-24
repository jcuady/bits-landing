import fs from "fs";
import path from "path";
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

const STORAGE_FILE = path.join(process.cwd(), "lib", "crm", "inbound-submissions.json");

// Default authentic, hyper-realistic BITS enterprise leads from website forms
export const INITIAL_INBOUND_LEADS: InboundFormSubmission[] = [
  {
    id: "lead-bits-01",
    name: "Atty. Rafael Dizon",
    email: "r.dizon@eastwestcredit.ph",
    company: "EastWest Credit & Recovery Solutions",
    companySize: "100-250 seats",
    industry: "Banking & Consumer Finance",
    currentSystem: "Legacy Asterisk PBX & Manual Spreadsheets",
    primaryChallenge: "High broken PTP rate and compliance risks under BSP Circular 454/857 quiet hours.",
    preferredMethod: "Live WebRTC Softphone Pilot",
    interest: "BITScrm Collections & Predictive Dialer",
    message: "We operate a 150-seat collections floor in Ortigas handling credit card and personal loan recoveries. We require automated right-party connect detection, strict 6 AM - 10 PM contact enforcement, and GCash/Maya tokenized payment links.",
    source: "Website Contact Form",
    submittedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    leadScore: 96,
    status: "new",
    assignedTo: "Malcolm Cuady",
    estimatedValue: 1_450_000,
  },
  {
    id: "lead-bits-02",
    name: "Patricia Reyes",
    email: "patricia.reyes@voyager.ph",
    company: "Maya Bank / Voyager Innovations",
    companySize: "500+ employees",
    industry: "Digital Banking & Fintech",
    currentSystem: "In-house Microservices",
    primaryChallenge: "Need automated real-time payment reconciliation webhooks for restructuring borrowers.",
    preferredMethod: "Technical Architecture Review",
    interest: "Settlement Webhook Engine & BITScrm Core",
    message: "Inquiring about deploying your settlement webhook engine to credit incoming payments directly to debtor accounts within 2 seconds. Also exploring your white-label contact center capabilities.",
    source: "Website Contact Form",
    submittedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    leadScore: 94,
    status: "working",
    assignedTo: "Rina Velasco",
    estimatedValue: 920_000,
  },
  {
    id: "lead-bits-03",
    name: "Marcus Sterling",
    email: "msterling@sutherlandbpo.com",
    company: "Sutherland Global Services BPO",
    companySize: "1,000+ floor seats",
    industry: "BPO & Omnichannel Contact Center",
    currentSystem: "Avaya / Genesys Cloud",
    primaryChallenge: "Agent burnout and high attrition on Tier-1 repetitive debt recovery calls.",
    preferredMethod: "BITSagent AI Voice Demo",
    interest: "BITSagent Conversational AI & CRM",
    message: "Looking to deploy natural-language voice agents for 40,000 low-balance delinquent accounts (&lt; ₱15,000) to automate payment arrangement negotiations and warm-transfer escalated debtors to human supervisors.",
    source: "BITScrm Landing Specimen",
    submittedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    leadScore: 98,
    status: "qualified",
    assignedTo: "Malcolm Cuady",
    estimatedValue: 2_100_000,
  },
  {
    id: "lead-bits-04",
    name: "Bea Villaruel",
    email: "bea.villaruel@seamoney.ph",
    company: "SeaMoney / ShopeePay Philippines",
    companySize: "250-500 seats",
    industry: "E-Commerce & BNPL Lending",
    currentSystem: "Custom Internal CRM",
    primaryChallenge: "Dynamic delinquency staging queues (1-30, 31-60 DPD) needed for SpayLater portfolio.",
    preferredMethod: "Product Walkthrough",
    interest: "BITScrm Collections Queue Intelligence",
    message: "We need automated staging queues that dynamically prioritize debtors based on their Maya/GCash transaction history and auto-requeue missed promise dates immediately at 9:00 AM.",
    source: "Website Contact Form",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    leadScore: 91,
    status: "working",
    assignedTo: "Aya Mendoza",
    estimatedValue: 1_650_000,
  },
  {
    id: "lead-bits-05",
    name: "Carlos Tan",
    email: "ctan@inlife.com.ph",
    company: "Insular Life Health Care (InLife)",
    companySize: "250-500 employees",
    industry: "Insurance & Healthcare",
    currentSystem: "Salesforce Service Cloud",
    primaryChallenge: "High licensing cost and lack of localized Philippine telephony integration.",
    preferredMethod: "Pricing & Migration Scoping",
    interest: "BITScrm Support & Omnichannel Ticket HUD",
    message: "Evaluating a sovereign on-premise or private cloud deployment of BITScrm Support to reduce our annual recurring seat license fees by 60% while maintaining ISO 27001 and NPC DPA compliance.",
    source: "White-Label Partner Consultation",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // 1.2 days ago
    leadScore: 88,
    status: "new",
    assignedTo: "Jonas Park",
    estimatedValue: 780_000,
  },
  {
    id: "lead-bits-06",
    name: "Eduardo Gomez",
    email: "e.gomez@fastlogistics.com.ph",
    company: "Fast Logistics Manila Cargo Hub",
    companySize: "500+ employees",
    industry: "Supply Chain & Logistics",
    currentSystem: "Oracle EBS & Manual Dispatch",
    primaryChallenge: "Dispute resolution delays and billing reconciliation with regional trucking fleets.",
    preferredMethod: "Executive Briefing",
    interest: "BITS Core ERP & Operations CRM",
    message: "Interested in integrating your dispatch operations software with our legacy Oracle ERP to give customer service reps single-pane visibility over delayed freight shipments and claims.",
    source: "Website Contact Form",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    leadScore: 89,
    status: "qualified",
    assignedTo: "Malcolm Cuady",
    estimatedValue: 1_250_000,
  },
  {
    id: "lead-bits-07",
    name: "Michelle Co",
    email: "mco@advancecredit.io",
    company: "Advance Credit Tech FinTech",
    companySize: "50-100 employees",
    industry: "FinTech & Salary Advances",
    currentSystem: "Zendesk & Excel",
    primaryChallenge: "Wants to white-label BITS software under their brand for enterprise corporate clients.",
    preferredMethod: "White-Label Partner Discussion",
    interest: "BITS White-Label & Custom Branding Program",
    message: "We want to offer our employer partners an embedded debt recovery and employee loan tracking portal under the Advance brand. Requesting white-label licensing pricing and source-code escrow terms.",
    source: "White-Label Partner Consultation",
    submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    leadScore: 85,
    status: "working",
    assignedTo: "Malcolm Cuady",
    estimatedValue: 880_000,
  },
];

// Helper to compute realistic score
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

// In-memory cache
let inMemoryLeads: InboundFormSubmission[] = [...INITIAL_INBOUND_LEADS];

// Load persisted leads
export function getStoredInboundLeads(): InboundFormSubmission[] {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const content = fs.readFileSync(STORAGE_FILE, "utf8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryLeads = parsed;
        return inMemoryLeads;
      }
    }
  } catch {
    // fallback to in-memory
  }
  return inMemoryLeads;
}

// Save a new lead from a website form
export function recordInboundLead(data: {
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
}): InboundFormSubmission {
  const currentLeads = getStoredInboundLeads();
  const score = calculateLeadScore(data);
  const estimatedValue =
    data.companySize?.includes("500+") || data.companySize?.includes("1,000+")
      ? 1_850_000
      : data.companySize?.includes("100-250") || data.companySize?.includes("250-500")
      ? 1_250_000
      : 650_000;

  const newLead: InboundFormSubmission = {
    id: `lead-bits-${Date.now()}`,
    name: data.name,
    email: data.email,
    company: data.company,
    companySize: data.companySize || "50-100 seats",
    industry: data.industry || "Enterprise Technology",
    currentSystem: data.currentSystem || "Legacy Systems",
    primaryChallenge: data.primaryChallenge || "Collections & Ops Automation",
    preferredMethod: data.preferredMethod || "Executive Demo",
    interest: data.interest || "BITScrm Operations Platform",
    message: data.message,
    source: data.source || "Website Contact Form",
    submittedAt: new Date().toISOString(),
    leadScore: score,
    status: "new",
    assignedTo: "Malcolm Cuady",
    estimatedValue,
  };

  const updated = [newLead, ...currentLeads];
  inMemoryLeads = updated;

  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(updated, null, 2), "utf8");
  } catch {
    // continue with inMemory
  }

  return newLead;
}

// Convert Inbound Form Submissions to standard CRM types
export function mapInboundLeadsToCrm(submissions: InboundFormSubmission[]): {
  leads: Lead[];
  opportunities: Opportunity[];
  companies: Company[];
  contacts: Contact[];
} {
  const leads: Lead[] = submissions.map((sub, idx) => ({
    id: sub.id,
    name: sub.name,
    email: sub.email,
    company: sub.company,
    title: `${sub.interest?.split(" ")[0] || "Inbound"} Decision Maker`,
    source: sub.source,
    status: sub.status,
    score: sub.leadScore,
    owner: sub.assignedTo,
    createdAt: sub.submittedAt,
    lastActivityAt: sub.submittedAt,
    notes: `Industry: ${sub.industry || "Enterprise"} · Challenge: ${sub.primaryChallenge || "N/A"}\nMessage: ${sub.message}`,
  }));

  const companies: Company[] = submissions.map((sub, idx) => ({
    id: `co-inbound-${idx + 1}`,
    name: sub.company,
    domain: sub.email.split("@")[1] || "client.ph",
    industry: sub.industry || "Enterprise",
    employees: sub.companySize?.includes("1,000+") ? 1200 : sub.companySize?.includes("500+") ? 650 : 220,
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
        : sub.status === "working"
        ? "discovery"
        : sub.status === "disqualified"
        ? "closed_lost"
        : "discovery";

    return {
      id: `op-inbound-${idx + 1}`,
      name: `${sub.company} — ${sub.interest || "BITScrm Enterprise"}`,
      companyId: `co-inbound-${idx + 1}`,
      contactId: `ct-inbound-${idx + 1}`,
      stage: stage as any,
      amount: sub.estimatedValue,
      probability: sub.leadScore >= 90 ? 70 : 45,
      closeDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split("T")[0]!,
      owner: sub.assignedTo,
      pipelineId: "pl-1",
    };
  });

  return { leads, opportunities, companies, contacts };
}
