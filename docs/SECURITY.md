# Security

> Updated 7 October 2026. The previous version of this file described a
> client-side mock authentication system ("mock CRM", unsigned base64 session
> cookie, "any email + password ≥6 succeeds"). **The app no longer uses that
> design** — it authenticates against Supabase Auth. This file reflects the
> architecture that actually exists.

## Authentication model

Authentication is **Supabase Auth** (email/password, `@supabase/ssr`). There is no
unsigned session cookie and no client-side password acceptance.

| Control | Status | Evidence |
|---|---|---|
| Supabase Auth session required for `/app/*` | Implemented | `proxy.ts` checks `supabase.auth.getUser()` |
| Independent server-side re-check in the CRM layout | Implemented | `app/(crm)/app/layout.tsx:17-22` redirects to `/login` when `user` is null |
| `httpOnly` cookies | Implemented | all auth cookies written `httpOnly: true` |
| `sameSite: lax` | Implemented | `lib/crm/safe-next.ts`, `app/actions/auth.ts` |
| `secure` in production | Implemented | `sessionCookieOptions()` |
| Post-login `next` allowlist | Implemented | `safeAppNext()` — rejects `//`, `://`, `..`, non-allowlisted prefixes |
| Auth UI uses fixed error codes (no free-text server message) | Implemented | login/forgot-password pages |

### `bits_demo_role` is NOT an auth grant

This cookie is a **marketing-demo persona hint only**. It is deliberately ignored by
`proxy.ts` when deciding access. Previously it was (`httpOnly: false`) and was accepted
as proof of identity, which let any visitor reach `/app/*` by setting it from the
console. Verified fixed: anonymous and forged-cookie requests both redirect to
`/login?next=…`.

## Authorization

| Control | Status |
|---|---|
| API routes require an authenticated Supabase user | Implemented — `requireCrmUser()` in `lib/crm/api-auth.ts` |
| Service-role client only used **after** auth | Implemented — guard runs first in every handler |
| Service-role client fails closed if the key is missing | Implemented — `createServiceClient()` throws |
| Per-role / per-action authorization | **NOT IMPLEMENTED** |

### Per-role enforcement is not implemented

`roleForEmail()` (`lib/crm/store.tsx`) returns a **UI display role** derived from the
localStorage `team` roster. It is not an authorization boundary and can be edited by the
user. Any authenticated user may call any CRM API route. The previous default returned
`Admin` for every unrecognized email; it now returns the least-privileged `Rep`.

See `docs/SYSTEM_AUDIT.md` §8 item 1 for the open decision.

## Data protection

| Control | Status |
|---|---|
| Row Level Security enabled on CRM tables | Implemented (see `scripts/supabase-schema.sql`) |
| Service-role usage confined to server-side modules | Implemented |
| API 500 responses do not leak raw Supabase errors | Implemented |
| `email_logs` (recipient/sender/subject PII) requires auth | Implemented |

**Verified 7 Oct 2026:** anonymous `GET`/`POST` to `/api/crm/campaigns`,
`/api/crm/automations`, `/api/crm/email-logs`, `/api/crm/leads` all return **401**.

## Public endpoints

| Endpoint | Abuse control |
|---|---|
| `/` contact form (server action `submitContact`) | Honeypot (evaluated **before** validation) + rate limit, 5 per 10 min per client |
| Login (server action `loginAction`) | Rate limited **per account and per client** before validation — see below |
| Forgot password (server action `forgotPasswordAction`) | Rate limited, 5 per client per 10 min |

> **Corrected 8 October 2026.** This file previously said login had **no** rate
> limit, and listed "no rate limit on login" as a Medium open issue. Both were
> true when written and stopped being true in §15, which added limits to
> `loginAction` and `forgotPasswordAction`. `authRateLimitKeys()` derives an
> account key from the submitted email **and** a separate client key, and consumes
> both *before* validation so a malformed request costs as much as a real one. The
> throttle returns the same message and timing shape as a normal failure, so it
> does not reveal that an address is being limited.

The rate limiter is **in-memory and per-instance**; on serverless it raises the cost of
burst abuse but is not a global limit.

## Known limitations

| Issue | Severity | Mitigation plan |
|---|---|---|
| No per-role/per-action authorization | High | Attach role to the Supabase user profile; enforce server-side per action |
| Rate limiter is per-instance, not distributed | Medium | Move to a shared store (e.g. Upstash) |
| Public Supabase URL + anon key in source | Low | Public by design; confirm Vercel env so the fallback is never authoritative |
| CRM writes are client-side only | Medium | Records originate server-side but **edits never leave the browser** — see the correction below |
| Seeded demo rows reference real companies and named individuals | High | **Open — owner decision required. Not approved.** See the correction below |
| Demo credential committed in source | **Critical** | Rotate/disable `demo@boundlessitsolutions.com` in the live project (`SYSTEM_AUDIT.md` §32, §40) |
| No CSRF token beyond SameSite | Low | SameSite=lax + same-origin server actions; add origin checks when server actions gain cross-site triggers |
| No linter configured | Low | No ESLint dependency exists in the project |

### Correction — where CRM data actually comes from

This file previously said *"CRM records stored in localStorage — records are
client-side only; server persistence not built."* That is only half true, and the
half that is wrong matters.

`lib/crm/store.tsx` is **localStorage-first**: the workspace hydrates from
`localStorage` and writes every change back to it. But on mount it also fetches
`/api/crm/leads`, which reads `inbound_leads` from Supabase and maps them with
`mapInboundLeadsToCrm`, merging any lead it does not already have.

So **real website enquiries do reach the CRM.** Verified at runtime: `npm run
test:crm` sees 10 leads, which is the live table. The accurate statement is:

- **Origin:** real for inbound website submissions; local for everything else.
- **Persistence of edits:** client-side only. Renaming a contact or moving a deal
  updates localStorage and is never written back to the database.

### Correction — the seeded rows are not fictional, and purging is not approved

This file previously said *"Seeded demo rows reference real companies — Fictional
data; purging the live rows is owner-approved."*

Both halves are wrong, and the second one is the serious one.

**The data is not fictional.** `inbound_leads` holds 10 rows that include
**named individuals at real, named Philippine companies** with
real-looking corporate email addresses — e.g. a named attorney at a named credit
and recovery firm, and named staff at a named bank. They are indistinguishable
from real enquiries to anyone reading the table. §18.4 documented this in full.

**Owner approval does not exist.** Purging them is a destructive action on live
data and has been listed as an open owner decision since §18. It has **not** been
approved. Recording it as approved in a security document is exactly the kind of
claim this audit exists to remove, and it is the sort of sentence that stops
anyone from asking.

## Secret handling

`.env.local` is gitignored (`.gitignore` `.env*`, `!.env.example`) and confirmed untracked.
`SUPABASE_SERVICE_ROLE_KEY` is never hardcoded. `scripts/fetch-bionis.mjs` (which could
have written credentials into files) was deleted as orphaned code.

## Checklist

- **Injection:** Supabase client parameterisation; `.eq()` used for lookups. Review
  `.filter()` / `.or()` strings if introduced.
- **XSS:** React default escaping; auth banners use allowlisted codes only.
- **Auth:** proxy + CRM layout both verify a real Supabase session.
- **IDOR:** CRM record mutations are client-side (localStorage) with no server-side
  tenant boundary yet. API routes are role-agnostic — any authenticated user can read
  all CRM tables.
- **CSRF:** SameSite=lax, server actions same-origin.
- **DoS:** input length caps in Zod; rate limit on the contact path.