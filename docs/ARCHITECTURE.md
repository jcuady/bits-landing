# Architecture — BITS CRM (Mock)

## Stack

- Next.js App Router + React 19 + TypeScript
- Tailwind v4 (BITS tokens in `app/globals.css`)
- Lucide icons, no chart library (CSS/SVG)
- Simulated auth via httpOnly cookie `bits_crm_session`
- In-memory client store (`lib/crm/store.tsx`) — **no database yet**

## Route groups

```text
app/(marketing)/     Public site Header/Footer
app/(auth)/          /login, /forgot-password
app/(crm)/app/       Authenticated CRM shell
proxy.ts             Gates /app/* ; redirects authed users away from login
```

> **Corrected 8 October 2026 (`SYSTEM_AUDIT.md` §46).** This said
> `middleware.ts`. **There is no `middleware.ts`** — Next.js 16 renamed it, and
> the file in this repository is `proxy.ts` (the same file that carries the
> hardcoded production Supabase fallback).

## Data flow

```text
Login/demo → cookie → proxy.ts → CrmProvider(seed) → pages mutate session state
Refresh browser → hydrates from /api/crm/leads, merges live inbound_leads rows
```

> **Corrected §46.** This read *"seed resets (expected until DB)"*. The database
> arrived in §16. On mount `lib/crm/store.tsx` reads localStorage **and** fetches
> `/api/crm/leads` (lines 208, 868), merging the live `inbound_leads` rows.
> Edits still stay client-side — see the persistence row below.

## Key modules

| Path | Role |
|------|------|
| `lib/crm/types.ts` | Domain types |
| `lib/crm/mock-data.ts` | Seed records |
| `lib/crm/store.tsx` | Client mutations |
| `lib/crm/selectors.ts` | Dashboard KPIs |
| `lib/crm/roles.ts` | Role resolution (least-privilege; UI-only, not authorization) |
| `lib/crm/safe-next.ts` | Post-login path allowlist |
| `components/crm/*` | Shell + table/KPI/board primitives |

## Out of scope

> **Corrected 8 October 2026 (§46).** This heading was **"Out of scope (pre-DB)"**
> and listed RLS and persistence as future work. Both shipped in §16. Rewritten
> against the current build:

| Item | Status |
|---|---|
| Postgres row-level security | **Implemented.** Every policy is `using (true)` for `authenticated`/`service_role`; `anon` sees zero rows on all four tables — proven empirically, not read off the schema (§40) |
| Server-side persistence | **Partial.** `inbound_leads` is written by the contact form and read back by the CRM. CRM *edits* remain client-side |
| Identity provider | **Partial.** Supabase Auth (email + OAuth). Enterprise SSO/SAML is not implemented |
| Transactional email | **Implemented** via Resend, with outcomes recorded in `email_logs` (§20). Without `RESEND_API_KEY` the lead persists and the failure is logged — the visitor is never told their enquiry did not arrive |
| SMS providers | Not implemented |
| File uploads | Not implemented |
| **Enforced RBAC beyond soft UI** | **Not implemented.** `requireCrmUser()` authenticates a session and never reads a role; any signed-in user can read every CRM record |
