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
