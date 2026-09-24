#!/usr/bin/env node
/**
 * scripts/apply-schema.mjs
 * 
 * Applies the inbound_leads schema to Supabase using the Management API.
 * Run: node scripts/apply-schema.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";

// Parse .env.local
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

const PAT = env["SUPABASE_PAT"];
const SERVICE_KEY = env["SUPABASE_SERVICE_ROLE_KEY"];
const SUPABASE_URL = env["NEXT_PUBLIC_SUPABASE_URL"];

if (!PAT || !SERVICE_KEY || !SUPABASE_URL) {
  console.error("❌ Missing SUPABASE_PAT, SUPABASE_SERVICE_ROLE_KEY, or NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}

const PROJECT_REF = "jvseyttzlobelrnzmfyf";

const schema = `
create table if not exists public.inbound_leads (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  email           text not null,
  company         text not null,
  company_size    text,
  industry        text,
  current_system  text,
  primary_challenge text,
  preferred_method  text,
  interest        text,
  message         text not null,
  source          text not null default 'Website Contact Form',
  lead_score      integer not null default 70,
  status          text not null default 'new'
                    check (status in ('new', 'working', 'qualified', 'disqualified')),
  assigned_to     text not null default 'Malcolm Cuady',
  estimated_value numeric(15, 2) not null default 650000,
  submitted_at    timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists inbound_leads_submitted_at_idx
  on public.inbound_leads (submitted_at desc);

create index if not exists inbound_leads_status_idx
  on public.inbound_leads (status);

create index if not exists inbound_leads_lead_score_idx
  on public.inbound_leads (lead_score desc);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists inbound_leads_set_updated_at on public.inbound_leads;
create trigger inbound_leads_set_updated_at
  before update on public.inbound_leads
  for each row execute function public.set_updated_at();

alter table public.inbound_leads enable row level security;
`;

const policies = `
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'inbound_leads' and policyname = 'crm_users_read_leads'
  ) then
    execute 'create policy crm_users_read_leads on public.inbound_leads for select to authenticated using (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'inbound_leads' and policyname = 'service_insert_leads'
  ) then
    execute 'create policy service_insert_leads on public.inbound_leads for insert to service_role with check (true)';
  end if;

  if not exists (
    select 1 from pg_policies
    where tablename = 'inbound_leads' and policyname = 'crm_users_update_leads'
  ) then
    execute 'create policy crm_users_update_leads on public.inbound_leads for update to authenticated using (true) with check (true)';
  end if;
end $$;
`;

async function runSQL(sql, label) {
  console.log(`\n⚡ Running: ${label}…`);
  const res = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  const text = await res.text();
  if (!res.ok) {
    // If table already exists, that's fine
    if (text.includes("already exists")) {
      console.log(`ℹ️  ${label}: already exists — skipped.`);
      return;
    }
    console.error(`❌ ${label} failed (${res.status}):`, text);
    return false;
  }

  console.log(`✅ ${label}: success`);
  return true;
}

(async () => {
  console.log("🏗️  Applying BITS CRM schema to Supabase…");
  
  await runSQL(schema, "Create inbound_leads table + indexes + trigger");
  await runSQL(policies, "Create RLS policies");

  console.log("\n✅ Schema applied. Now seeding data…");
  
  // Run seed
  const { default: seed } = await import("./seed-supabase.mjs").catch(() => ({ default: null }));
  if (!seed) {
    console.log("ℹ️  Run seed separately: node scripts/seed-supabase.mjs");
  }

  console.log("\n🎉 Done! Schema is ready in Supabase.\n");
})();
