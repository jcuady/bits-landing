-- ============================================================
-- BITS CRM — Supabase Schema
-- ============================================================
-- Run this SQL in the Supabase SQL Editor or via psql to
-- create the inbound_leads table and configure RLS.
-- ============================================================

-- 1. Create the inbound_leads table
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

-- 2. Index for common queries
create index if not exists inbound_leads_submitted_at_idx
  on public.inbound_leads (submitted_at desc);

create index if not exists inbound_leads_status_idx
  on public.inbound_leads (status);

create index if not exists inbound_leads_lead_score_idx
  on public.inbound_leads (lead_score desc);

-- 3. Auto-update updated_at on row change
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

-- 4. Enable Row Level Security
alter table public.inbound_leads enable row level security;

-- 5. Policy: authenticated CRM users can read all leads
create policy if not exists "crm_users_read_leads"
  on public.inbound_leads
  for select
  to authenticated
  using (true);

-- 6. Policy: service role (server actions) can insert leads from website forms
--    The service_role key bypasses RLS by default; this explicit policy
--    keeps the intent clear and allows anon inserts from server actions.
--    The actual check happens server-side (never exposed to browser).
create policy if not exists "service_insert_leads"
  on public.inbound_leads
  for insert
  to service_role
  with check (true);

-- 7. Policy: authenticated users (CRM staff) can update lead status/assignment
create policy if not exists "crm_users_update_leads"
  on public.inbound_leads
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Run the seed script (scripts/seed-supabase.mjs) after this
-- to populate the 7 authentic BITS enterprise leads.
-- ============================================================
