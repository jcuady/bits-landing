# Page audit

> Corrected 7 October 2026. This table previously marked 16 CRM routes as
> `VERIFIED`. Ten of them **do not exist in the repository**. "Verified" below
> now means the route exists and its controls are implemented — not that it was
> exercised in a browser this pass.

## CRM (`/app`, requires a Supabase session)

| Route | Primary controls | Status | Notes |
|-------|------------------|--------|-------|
| `/app` | redirect | Exists | → `/app/dashboard` |
| `/app/dashboard` | KPI cards, bars, inbound lead feed | Exists | Feed entries labelled "Sample data"; `/app/leads` link |
| `/app/leads` | Search, status filter, row links | Exists | |
| `/app/leads/[id]` | Status buttons, back | Exists | |
| `/app/contacts` | Search, row links | Exists | |
| `/app/contacts/[id]` | Related links, back | Exists | Links repointed to `/app/leads` + `/app/opportunities` |
| `/app/companies` | Search, row links | Exists | |
| `/app/companies/[id]` | Contact/opp links, back | Exists | |
| `/app/opportunities` | Search, stage filter | Exists | |
| `/app/opportunities/[id]` | Stage move buttons | Exists | Link repointed to `/app/opportunities` |
| `/app/settings` | Display name, switches, reset | Exists | **UI-gated only, not server-gated** — see §17 |

### Missing routes

These are referenced by older documentation but **do not exist**:

`/app/pipelines`, `/app/tasks`, `/app/conversations`, `/app/campaigns`,
`/app/automations`, `/app/funnels`, `/app/forms`, `/app/templates`,
`/app/reports`, `/app/team`.

Related data structures (tasks, conversations, team, campaigns) still exist in
`lib/crm/types.ts` and the store, but have no page. The sidebar
(`lib/crm/nav.ts`) exposes only the 6 routes listed above.

## Marketing

| Route | Status | Notes |
|-------|--------|-------|
| `/` | Exists | Renders 14 sections |
| `/pricing`, `/security`, `/solutions` | Exist | |
| `/products`, `/products/[slug]`, `/products/crm` | Exist | |
| `/bitscrm`, `/bitsagent` | Exist | |
| `/blog`, `/blog/[slug]` | Exist | |
| `/legal`, `/cookies` | Exist | `/cookies` documents the `bits_demo_role` cookie |

## Products / demo

| Route | Status |
|-------|--------|
| `/demo` | Exists |
| `/crm-sales`, `/crm-sales/leads`, `/crm-sales/pipeline`, `/crm-sales/cpq` | Exist |

## Auth

| Route | Status | Notes |
|-------|--------|-------|
| `/login` | Exists | `next` param hardened by `safeAppNext` |
| `/forgot-password` | Exists | Simulated |

## Shell & navigation

| Surface | Status |
|---------|--------|
| Skip link, sidebar nav, topbar, logout | Exists |
| Mobile nav | Exists |
| Internal links / anchors | **Verified** by `npm run test:unit` (link-integrity selfcheck: 31 routes, 24 anchors, 0 dangling) |

## Verification performed 7 Oct 2026

- `npm run typecheck` — PASS
- `npm run build` — PASS
- `npm run test:unit` — PASS (6 suites)
- Live `curl` against `next start`: public routes 200; `/app/*` anonymous → 307 `/login`; all 4 CRM APIs → 401

**Not performed:** browser-driven E2E (`npm run test:crm`), responsive suite
(`npm run test:responsive`), Lighthouse. See `docs/TESTING.md`.