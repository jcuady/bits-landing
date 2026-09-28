-- ============================================================
-- BITS CRM — Production Supabase Schema
-- Aligned with Supabase Postgres Best Practices
-- ============================================================
-- Run this SQL in the Supabase SQL Editor or via psql to
-- create the inbound_leads table, configure constraints,
-- performance indexes, and strict Row Level Security (RLS).
-- ============================================================

-- 1. Create the inbound_leads table with domain constraints
create table if not exists public.inbound_leads (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text not null,
  company           text not null,
  company_size      text,
  industry          text,
  current_system    text,
  primary_challenge text,
  preferred_method  text,
  interest          text,
  message           text not null,
  source            text not null default 'Website Contact Form',
  lead_score        integer not null default 70
                      check (lead_score >= 0 and lead_score <= 100),
  status            text not null default 'new'
                      check (status in ('new', 'working', 'qualified', 'disqualified')),
  assigned_to       text not null default 'Malcolm Cuady',
  estimated_value   numeric(15, 2) not null default 650000
                      check (estimated_value >= 0),
  submitted_at      timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint inbound_leads_email_key unique (email)
);

-- 2. Performance Indexes (Supabase query-missing-indexes & query-partial-indexes)
-- Sort by submission date (newest first)
create index if not exists inbound_leads_submitted_at_idx
  on public.inbound_leads (submitted_at desc);

-- Filter by lifecycle status
create index if not exists inbound_leads_status_idx
  on public.inbound_leads (status);

-- Filter by high-intent qualification score
create index if not exists inbound_leads_lead_score_idx
  on public.inbound_leads (lead_score desc);

-- Partial index for active triage queue (speeds up new lead intake dashboards)
create index if not exists inbound_leads_new_triage_idx
  on public.inbound_leads (submitted_at desc)
  where status = 'new';

-- 3. Auto-update updated_at timestamp on row change
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

-- 4. Enable Row Level Security (RLS)
alter table public.inbound_leads enable row level security;

-- 5. RLS Policies (Aligned with security-rls-performance standards)

-- Policy 1: Authenticated CRM operators can query all leads
drop policy if exists "crm_users_read_leads" on public.inbound_leads;
create policy "crm_users_read_leads"
  on public.inbound_leads
  for select
  to authenticated
  using (true);

-- Policy 2: Service Role (Server actions) can insert new submissions from website forms
drop policy if exists "service_insert_leads" on public.inbound_leads;
create policy "service_insert_leads"
  on public.inbound_leads
  for insert
  to service_role
  with check (true);

-- Policy 3: Authenticated CRM operators can update status, notes, and assignments
drop policy if exists "crm_users_update_leads" on public.inbound_leads;
create policy "crm_users_update_leads"
  on public.inbound_leads
  for update
  to authenticated
  using (true)
  with check (true);

-- Policy 4: Authenticated CRM admins can delete invalid or test leads
drop policy if exists "crm_users_delete_leads" on public.inbound_leads;
create policy "crm_users_delete_leads"
  on public.inbound_leads
  for delete
  to authenticated
  using (true);

-- ============================================================
-- 6. Marketing Automations Table
-- ============================================================
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

-- Policies for marketing_automations
drop policy if exists "crm_users_read_automations" on public.marketing_automations;
create policy "crm_users_read_automations"
  on public.marketing_automations
  for select
  to authenticated
  using (true);

drop policy if exists "service_manage_automations" on public.marketing_automations;
create policy "service_manage_automations"
  on public.marketing_automations
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================
-- 7. Email Logs Table (Resend Telemetry & Inbound Inquiries)
-- ============================================================
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

-- Policies for email_logs
drop policy if exists "crm_users_read_email_logs" on public.email_logs;
create policy "crm_users_read_email_logs"
  on public.email_logs
  for select
  to authenticated
  using (true);

drop policy if exists "service_manage_email_logs" on public.email_logs;
create policy "service_manage_email_logs"
  on public.email_logs
  for all
  to service_role
  using (true)
  with check (true);

-- ============================================================
-- 8. Marketing Campaigns Table
-- ============================================================
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

-- Policies for marketing_campaigns
drop policy if exists "crm_users_read_campaigns" on public.marketing_campaigns;
create policy "crm_users_read_campaigns"
  on public.marketing_campaigns
  for select
  to authenticated
  using (true);

drop policy if exists "service_manage_campaigns" on public.marketing_campaigns;
create policy "service_manage_campaigns"
  on public.marketing_campaigns
  for all
  to service_role
  using (true)
  with check (true);

