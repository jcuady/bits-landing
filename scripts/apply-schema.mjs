#!/usr/bin/env node
/**
 * scripts/apply-schema.mjs
 *
 * Applies the inbound_leads schema to Supabase using the Management API.
 *
 * ── Safety model (SYSTEM_AUDIT.md §33) ──────────────────────────────────────
 *
 * This script runs DDL against a LIVE database. Three defects made that
 * unguarded, and one of them explained how fabricated rows reached production:
 *
 *   1. IT SEEDED PRODUCTION. `await import("./seed-supabase.mjs")` imported a
 *      module whose top level is an IIFE, so importing it EXECUTED the seed.
 *      seed-supabase.mjs has no default export, so the very next line printed
 *      "Run seed separately" — while ten fabricated leads and a demo auth user
 *      had just been written. The guard was not merely useless, it inverted the
 *      truth. Seeding is now a separate, explicit command.
 *
 *   2. THE PROJECT REF WAS HARDCODED. Pointing SUPABASE_URL at a staging
 *      project did nothing: the Management API call still went to production.
 *      The ref is now derived from SUPABASE_URL.
 *
 *   3. FAILURES DID NOT STOP THE CHAIN. runSQL returns false on error and every
 *      call site discarded it, so a failed table creation fell straight through
 *      to policies and then to the seed.
 *
 * Usage:
 *   node scripts/apply-schema.mjs                 # dry run — prints SQL, writes nothing
 *   node scripts/apply-schema.mjs --apply         # execute (requires --confirm-project)
 *   node scripts/seed-supabase.mjs --apply        # seed, separately and explicitly
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

/**
 * Derive the project ref from the configured URL instead of hardcoding it.
 * https://<ref>.supabase.co -> <ref>
 */
const PROJECT_REF = (() => {
  try {
    const host = new URL(SUPABASE_URL).hostname;
    const m = host.match(/^([a-z0-9]+)\.supabase\.(co|in)$/i);
    if (!m) {
      console.error(`❌ Cannot derive a project ref from NEXT_PUBLIC_SUPABASE_URL ("${SUPABASE_URL}").`);
      console.error("   Refusing to guess — a wrong ref is how the wrong database gets written.");
      process.exit(1);
    }
    return m[1];
  } catch {
    console.error(`❌ NEXT_PUBLIC_SUPABASE_URL is not a valid URL: "${SUPABASE_URL}"`);
    process.exit(1);
  }
})();

const argv = process.argv.slice(2);
const APPLY = argv.includes("--apply");
const confirmIdx = argv.indexOf("--confirm-project");
const CONFIRMED_REF = confirmIdx === -1 ? null : argv[confirmIdx + 1];

/*
 * Dry run unless the operator asks otherwise AND names the target project.
 * Two independent switches, because a destructive flag alone is one typo away
 * from a production write.
 */
if (!APPLY) {
  console.log(`🔎 DRY RUN — nothing will be written.\n`);
  console.log(`   Target project : ${PROJECT_REF}   (derived from NEXT_PUBLIC_SUPABASE_URL)`);
  console.log(`   Source         : scripts/supabase-schema.sql equivalent, inline below\n`);
} else if (CONFIRMED_REF !== PROJECT_REF) {
  console.error(`❌ Refusing to apply.`);
  console.error(`   Target project : ${PROJECT_REF}`);
  console.error(`   You confirmed  : ${CONFIRMED_REF ?? "(nothing)"}`);
  console.error(`   Re-run with: --apply --confirm-project ${PROJECT_REF}`);
  process.exit(1);
}

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
  if (!APPLY) {
    console.log(`🔎 WOULD RUN: ${label}\n---8<---\n${sql.trim()}\n---8<---\n`);
    return true;
  }

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
      return true;
    }
    console.error(`❌ ${label} failed (${res.status}):`, text);
    return false;
  }

  console.log(`✅ ${label}: success`);
  return true;
}

(async () => {
  console.log(`🏗️  ${APPLY ? "Applying" : "Dry-running"} BITS CRM schema for project ${PROJECT_REF}…\n`);

  // Every result is checked. The old chain discarded them, so one failed
  // statement let the rest proceed against a schema that was never created.
  if (!(await runSQL(schema, "Create inbound_leads table + indexes + trigger"))) {
    console.error("\n❌ Table creation failed. Aborting — no policies, no marketing schema.");
    process.exit(1);
  }

  if (!(await runSQL(policies, "Create RLS policies"))) {
    console.error("\n❌ RLS policy creation failed. Aborting.");
    process.exit(1);
  }

  await import("./apply-marketing-schema.mjs");

  console.log(
    APPLY
      ? "\n✅ Schema applied to " + PROJECT_REF + "."
      : "\n✅ Dry run complete. Nothing was written."
  );

  /*
   * Seeding is deliberately NOT chained here.
   *
   * Importing ./seed-supabase.mjs used to run it — that module's top level is an
   * IIFE — while the very next line printed "Run seed separately", because the
   * destructured `default` never existed. Ten fabricated leads and a demo auth
   * account were written to production under a message saying they were not.
   *
   * To seed, run it deliberately and on its own:
   *   node scripts/seed-supabase.mjs --apply
   *
   * Never on a database holding real enquiries.
   */
  console.log("ℹ️  Seeding is a separate, explicit step: node scripts/seed-supabase.mjs --apply");
  console.log("    (it writes SYNTHETIC demo rows — never run it against real enquiries)\n");
})();
