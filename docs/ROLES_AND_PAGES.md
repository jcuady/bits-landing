# Roles and pages

> Corrected 7 October 2026. The previous version of this file marked all 16
> pages as "In app? ✓". Ten of them did not exist. The matrix below reflects
> what is actually in the repository.

## UI roles

| Role | Typical user | Primary jobs |
|------|--------------|--------------|
| **Admin** | Malcolm Cuady (demo login) | Full RevOps + team + settings |
| **Manager** | Rina Velasco | Pipeline coaching, reports, invites |
| **Rep** | Jonas Park | Leads, opps, tasks, conversations |
| **Marketing** | Aya Mendoza | Campaigns, funnels, forms, templates |

A signed-in user who is not on the `team` roster defaults to the least-privileged
**Rep**. (Previously this fell through to `Admin` for every unknown email.)

> These are names from the seeded demo roster, not enforced permissions.

## Page matrix (actual)

| Page | In app? | Route | Notes |
|------|:-------:|-------|-------|
| Dashboard | ✓ | `/app/dashboard` | KPIs + inbound lead feed |
| Leads | ✓ | `/app/leads` | List + filters |
| Lead detail | ✓ | `/app/leads/[id]` | |
| Contacts | ✓ | `/app/contacts` | List + filters |
| Contact detail | ✓ | `/app/contacts/[id]` | |
| Companies | ✓ | `/app/companies` | List + filters |
| Company detail | ✓ | `/app/companies/[id]` | |
| Opportunities | ✓ | `/app/opportunities` | List + filters |
| Opportunity detail | ✓ | `/app/opportunities/[id]` | Stage moves |
| Settings | ✓ | `/app/settings` | Display name + toggles; **UI-gated only** (client-side role from localStorage), not server-enforced |
| Pipelines | ✗ | — | No route exists |
| Tasks | ✗ | — | No route exists |
| Conversations | ✗ | — | No route exists |
| Campaigns | ✗ | — | No route exists (API route only) |
| Automations | ✗ | — | No route exists (API route only) |
| Forms | ✗ | — | No route exists |
| Funnels | ✗ | — | No route exists |
| Templates | ✗ | — | No route exists |
| Reports | ✗ | — | No route exists |
| Team | ✗ | — | No route exists |

The sidebar (`lib/crm/nav.ts`) exposes only the 6 routes that exist. UI links that
previously pointed at the missing routes were removed in this audit pass;
`npm run test:unit` fails if any reappear.

Related entities (tasks, conversations, team, campaigns) still exist as **data
structures** in `lib/crm/types.ts` and in the store, but have no page to display them.

## Enforcement today

**None, beyond authentication.**

- Route protection requires a valid Supabase session (`proxy.ts` + CRM layout).
- `roleForEmail()` is a **client-side UI display role** derived from localStorage.
  It gates some UI affordances (e.g. the team invite button) but is not an
  authorization boundary — the user can edit localStorage.
- **Per-role, per-action authorization is not implemented.** Any authenticated
  user can call any CRM API route; the routes verify identity, not permission.

Required before any production multi-tenant deployment: attach a role to the
Supabase user profile and enforce it server-side on every mutation.

## Verdict

The 10 missing pages are the standard RevOps CRM surface and are justified as a
backlog, but they **do not exist today** and no part of this repository should
be read as claiming otherwise. See `docs/SYSTEM_AUDIT.md` §8 item 5 for the
open build-vs-defer decision.