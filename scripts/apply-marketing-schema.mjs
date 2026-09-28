#!/usr/bin/env node
/**
 * scripts/apply-marketing-schema.mjs
 * 
 * Applies marketing_automations, email_logs, and marketing_campaigns schemas
 * to Supabase (https://jvseyttzlobelrnzmfyf.supabase.co) via Management API.
 */

import { readFileSync } from "fs";
import { resolve } from "path";

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
const PROJECT_REF = "jvseyttzlobelrnzmfyf";

if (!PAT) {
  console.error("❌ Missing SUPABASE_PAT in .env.local");
  process.exit(1);
}

const sql = `
-- 1. Marketing Automations Table
create table if not exists public.marketing_automations (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  trigger_type     text not null,
  action_type      text not null,
  description      text,
  conditions       jsonb default '{}'::jsonb,
  status           text not null default 'active' check (status in ('active', 'paused', 'draft')),
  execution_count  integer not null default 0,
  last_executed_at timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

create index if not exists marketing_automations_status_idx on public.marketing_automations (status);
alter table public.marketing_automations enable row level security;

-- 2. Email Logs Table (Track all Resend dispatches)
create table if not exists public.email_logs (
  id              uuid primary key default gen_random_uuid(),
  resend_id       text,
  direction       text not null default 'outbound' check (direction in ('inbound', 'outbound')),
  recipient       text not null,
  sender          text not null,
  subject         text not null,
  template        text not null,
  status          text not null default 'sent' check (status in ('sent', 'delivered', 'failed', 'bounced')),
  error_message   text,
  metadata        jsonb default '{}'::jsonb,
  sent_at         timestamptz not null default now()
);

create index if not exists email_logs_sent_at_idx on public.email_logs (sent_at desc);
create index if not exists email_logs_recipient_idx on public.email_logs (recipient);
alter table public.email_logs enable row level security;

-- 3. Marketing Campaigns Table
create table if not exists public.marketing_campaigns (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  channel         text not null default 'Email',
  subject         text,
  status          text not null default 'active' check (status in ('draft', 'active', 'paused', 'completed')),
  owner           text not null default 'Malcolm Cuady',
  target_audience text not null default 'Inbound Leads',
  sent_count      integer not null default 0,
  delivered_count integer not null default 0,
  open_rate       numeric(5, 2) not null default 0,
  click_rate      numeric(5, 2) not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists marketing_campaigns_status_idx on public.marketing_campaigns (status);
alter table public.marketing_campaigns enable row level security;

-- 4. RLS Policies
do $$
begin
  -- marketing_automations
  if not exists (select 1 from pg_policies where tablename = 'marketing_automations' and policyname = 'crm_users_read_automations') then
    create policy crm_users_read_automations on public.marketing_automations for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'marketing_automations' and policyname = 'service_manage_automations') then
    create policy service_manage_automations on public.marketing_automations for all to service_role using (true) with check (true);
  end if;

  -- email_logs
  if not exists (select 1 from pg_policies where tablename = 'email_logs' and policyname = 'crm_users_read_email_logs') then
    create policy crm_users_read_email_logs on public.email_logs for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'email_logs' and policyname = 'service_manage_email_logs') then
    create policy service_manage_email_logs on public.email_logs for all to service_role using (true) with check (true);
  end if;

  -- marketing_campaigns
  if not exists (select 1 from pg_policies where tablename = 'marketing_campaigns' and policyname = 'crm_users_read_campaigns') then
    create policy crm_users_read_campaigns on public.marketing_campaigns for select to authenticated using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'marketing_campaigns' and policyname = 'service_manage_campaigns') then
    create policy service_manage_campaigns on public.marketing_campaigns for all to service_role using (true) with check (true);
  end if;
end $$;

-- 5. Seed Core Automation Rules
insert into public.marketing_automations (name, trigger_type, action_type, description, conditions, status, execution_count)
values
  ('Instant OPERATIONS 360 Client Welcome', 'inbound_form_submitted', 'send_email', 'Automatically sends personalized confirmation and architecture overview to client work email.', '{"interest": "any"}'::jsonb, 'active', 1),
  ('Executive Inbound Lead Triage Notification', 'inbound_form_submitted', 'send_email', 'Dispatches full client dossier and lead score alert to boundlessitsolutions@gmail.com.', '{"recipient": "boundlessitsolutions@gmail.com"}'::jsonb, 'active', 1),
  ('High-Intent Lead Fast Track SLA', 'high_score_lead', 'assign_rep', 'Automatically fast-tracks leads with score >= 85 directly to senior technical architect within 1 hour.', '{"min_score": 85}'::jsonb, 'active', 0),
  ('24-Hour Consultative Roadmap Check', 'follow_up_timer', 'send_email', 'Prompts engineering lead to review and deliver consultative roadmap within 24 business hours.', '{"delay_hours": 24}'::jsonb, 'active', 0)
on conflict do nothing;

-- 6. Seed Core Marketing Campaigns
insert into public.marketing_campaigns (name, channel, subject, status, owner, target_audience, sent_count, delivered_count, open_rate, click_rate)
values
  ('OPERATIONS 360 Flagship Launch', 'Email', 'Introducing OPERATIONS 360 — One System. One View. One Source of Truth.', 'active', 'Malcolm Cuady', 'Enterprise Decision Makers', 148, 146, 68.4, 34.2),
  ('Collections Agency Modernization', 'Email', 'Upgrade Beyond Fragmented Telephony & Disconnected QA Spreadsheets', 'active', 'Malcolm Cuady', 'BPO & Recovery Directors', 92, 92, 74.1, 41.0),
  ('BITSagent Voice AI Demo Invites', 'Email', 'Experience Sub-300ms Autonomous Conversational Voice AI', 'active', 'Malcolm Cuady', 'Customer Support Heads', 115, 114, 62.8, 28.5)
on conflict do nothing;
`;

async function apply() {
  console.log("⚡ Applying marketing automation & email logging schema to Supabase…");
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
    console.error(`❌ Schema migration failed (${res.status}):`, text);
    process.exit(1);
  }

  console.log("✅ Marketing automations, email logs, and campaigns schema successfully applied!");
}

apply().catch(err => {
  console.error("Fatal:", err);
  process.exit(1);
});
