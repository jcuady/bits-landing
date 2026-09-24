#!/usr/bin/env node
/**
 * scripts/seed-supabase.mjs
 *
 * Seeds the Supabase inbound_leads table with 7 authentic BITS enterprise leads.
 * Also creates the demo Supabase Auth user for the "Enter demo" button.
 *
 * Usage:
 *   node scripts/seed-supabase.mjs
 *
 * Requires:
 *   NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Manual .env.local parse — no dotenv dependency needed
const envPath = resolve(process.cwd(), ".env.local");
const envLines = readFileSync(envPath, "utf8").split("\n");
const env = {};
for (const line of envLines) {
  const trimmed = line.trim();
  if (trimmed.startsWith("#") || !trimmed.includes("=")) continue;
  const eqIdx = trimmed.indexOf("=");
  const key = trimmed.slice(0, eqIdx).trim();
  const value = trimmed.slice(eqIdx + 1).trim();
  env[key] = value;
}

const SUPABASE_URL = env["NEXT_PUBLIC_SUPABASE_URL"];
const SERVICE_KEY = env["SUPABASE_SERVICE_ROLE_KEY"];

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const headers = {
  "Content-Type": "application/json",
  apikey: SERVICE_KEY,
  Authorization: `Bearer ${SERVICE_KEY}`,
  Prefer: "return=minimal",
};

// ─── 1. Create inbound_leads table via REST (if not already created) ──────────
// (Schema should be applied via SQL editor first. This script seeds data.)

// ─── 2. Authentic BITS enterprise leads ───────────────────────────────────────
const leads = [
  {
    name: "Atty. Rafael Dizon",
    email: "r.dizon@eastwestcredit.ph",
    company: "EastWest Credit & Recovery Solutions",
    company_size: "100-250 seats",
    industry: "Banking & Consumer Finance",
    current_system: "Legacy Asterisk PBX & Manual Spreadsheets",
    primary_challenge: "High broken PTP rate and compliance risks under BSP Circular 454/857 quiet hours.",
    preferred_method: "Live WebRTC Softphone Pilot",
    interest: "BITScrm Collections & Predictive Dialer",
    message:
      "We operate a 150-seat collections floor in Ortigas handling credit card and personal loan recoveries. We require automated right-party connect detection, strict 6 AM - 10 PM contact enforcement, and GCash/Maya tokenized payment links.",
    source: "Website Contact Form",
    lead_score: 96,
    status: "new",
    assigned_to: "Malcolm Cuady",
    estimated_value: 1450000,
    submitted_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    name: "Patricia Reyes",
    email: "patricia.reyes@voyager.ph",
    company: "Maya Bank / Voyager Innovations",
    company_size: "500+ employees",
    industry: "Digital Banking & Fintech",
    current_system: "In-house Microservices",
    primary_challenge: "Need automated real-time payment reconciliation webhooks for restructuring borrowers.",
    preferred_method: "Technical Architecture Review",
    interest: "Settlement Webhook Engine & BITScrm Core",
    message:
      "Inquiring about deploying your settlement webhook engine to credit incoming payments directly to debtor accounts within 2 seconds. Also exploring your white-label contact center capabilities.",
    source: "Website Contact Form",
    lead_score: 94,
    status: "working",
    assigned_to: "Rina Velasco",
    estimated_value: 920000,
    submitted_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    name: "Marcus Sterling",
    email: "msterling@sutherlandbpo.com",
    company: "Sutherland Global Services BPO",
    company_size: "1,000+ floor seats",
    industry: "BPO & Omnichannel Contact Center",
    current_system: "Avaya / Genesys Cloud",
    primary_challenge: "Agent burnout and high attrition on Tier-1 repetitive debt recovery calls.",
    preferred_method: "BITSagent AI Voice Demo",
    interest: "BITSagent Conversational AI & CRM",
    message:
      "Looking to deploy natural-language voice agents for 40,000 low-balance delinquent accounts (< ₱15,000) to automate payment arrangement negotiations and warm-transfer escalated debtors to human supervisors.",
    source: "BITScrm Landing Specimen",
    lead_score: 98,
    status: "qualified",
    assigned_to: "Malcolm Cuady",
    estimated_value: 2100000,
    submitted_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
  },
  {
    name: "Bea Villaruel",
    email: "bea.villaruel@seamoney.ph",
    company: "SeaMoney / ShopeePay Philippines",
    company_size: "250-500 seats",
    industry: "E-Commerce & BNPL Lending",
    current_system: "Custom Internal CRM",
    primary_challenge: "Dynamic delinquency staging queues (1-30, 31-60 DPD) needed for SpayLater portfolio.",
    preferred_method: "Product Walkthrough",
    interest: "BITScrm Collections Queue Intelligence",
    message:
      "We need automated staging queues that dynamically prioritize debtors based on their Maya/GCash transaction history and auto-requeue missed promise dates immediately at 9:00 AM.",
    source: "Website Contact Form",
    lead_score: 91,
    status: "working",
    assigned_to: "Aya Mendoza",
    estimated_value: 1650000,
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    name: "Carlos Tan",
    email: "ctan@inlife.com.ph",
    company: "Insular Life Health Care (InLife)",
    company_size: "250-500 employees",
    industry: "Insurance & Healthcare",
    current_system: "Salesforce Service Cloud",
    primary_challenge: "High licensing cost and lack of localized Philippine telephony integration.",
    preferred_method: "Pricing & Migration Scoping",
    interest: "BITScrm Support & Omnichannel Ticket HUD",
    message:
      "Evaluating a sovereign on-premise or private cloud deployment of BITScrm Support to reduce our annual recurring seat license fees by 60% while maintaining ISO 27001 and NPC DPA compliance.",
    source: "White-Label Partner Consultation",
    lead_score: 88,
    status: "new",
    assigned_to: "Jonas Park",
    estimated_value: 780000,
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    name: "Eduardo Gomez",
    email: "e.gomez@fastlogistics.com.ph",
    company: "Fast Logistics Manila Cargo Hub",
    company_size: "500+ employees",
    industry: "Supply Chain & Logistics",
    current_system: "Oracle EBS & Manual Dispatch",
    primary_challenge: "Dispute resolution delays and billing reconciliation with regional trucking fleets.",
    preferred_method: "Executive Briefing",
    interest: "BITS Core ERP & Operations CRM",
    message:
      "Interested in integrating your dispatch operations software with our legacy Oracle ERP to give customer service reps single-pane visibility over delayed freight shipments and claims.",
    source: "Website Contact Form",
    lead_score: 89,
    status: "qualified",
    assigned_to: "Malcolm Cuady",
    estimated_value: 1250000,
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    name: "Michelle Co",
    email: "mco@advancecredit.io",
    company: "Advance Credit Tech FinTech",
    company_size: "50-100 employees",
    industry: "FinTech & Salary Advances",
    current_system: "Zendesk & Excel",
    primary_challenge: "Wants to white-label BITS software under their brand for enterprise corporate clients.",
    preferred_method: "White-Label Partner Discussion",
    interest: "BITS White-Label & Custom Branding Program",
    message:
      "We want to offer our employer partners an embedded debt recovery and employee loan tracking portal under the Advance brand. Requesting white-label licensing pricing and source-code escrow terms.",
    source: "White-Label Partner Consultation",
    lead_score: 85,
    status: "working",
    assigned_to: "Malcolm Cuady",
    estimated_value: 880000,
    submitted_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

async function seedLeads() {
  console.log(`\n🌱 Seeding ${leads.length} inbound leads to Supabase…`);

  // Upsert by email to avoid duplicates on re-seed
  const res = await fetch(`${SUPABASE_URL}/rest/v1/inbound_leads?on_conflict=email`, {
    method: "POST",
    headers: { ...headers, Prefer: "resolution=ignore-duplicates,return=representation" },
    body: JSON.stringify(leads),
  });

  if (!res.ok) {
    const text = await res.text();
    // If table doesn't exist yet, give helpful instructions
    if (text.includes("relation") || text.includes("does not exist")) {
      console.error("❌ Table inbound_leads does not exist yet.");
      console.error("   Apply the schema first:");
      console.error("   → Open Supabase SQL Editor and run: scripts/supabase-schema.sql");
      process.exit(1);
    }
    console.error(`❌ Seed failed (${res.status}):`, text);
    process.exit(1);
  }

  const data = await res.json();
  console.log(`✅ Seeded ${data.length ?? leads.length} leads successfully.`);
}

async function seedDemoUser() {
  console.log("\n👤 Creating demo CRM user in Supabase Auth…");
  const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({
      email: "demo@boundlessitsolutions.com",
      password: "BITSdemo2024!",
      email_confirm: true,
      user_metadata: {
        full_name: "Malcolm Cuady",
        role: "admin",
      },
    }),
  });

  const data = await res.json();
  if (res.ok) {
    console.log(`✅ Demo user created: demo@boundlessitsolutions.com`);
  } else if (data?.msg?.includes("already registered") || data?.message?.includes("already been registered")) {
    console.log(`ℹ️  Demo user already exists — skipped.`);
  } else {
    console.warn(`⚠️  Could not create demo user (${res.status}):`, data?.message ?? JSON.stringify(data));
  }
}

(async () => {
  try {
    await seedDemoUser();
    await seedLeads();
    console.log("\n🎉 Supabase seed complete!\n");
  } catch (err) {
    console.error("❌ Unexpected seed error:", err);
    process.exit(1);
  }
})();
