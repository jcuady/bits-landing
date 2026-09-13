# Project Status

Last Updated: 2026-09-13  
Current Branch: main  
Current Commit: (set after push)  
Overall Status: **MOCK CRM UI READY** — pre-database; soft RBAC; session-only mutations

## Executive Summary

BITS marketing site plus an authenticated Soft-UI CRM shell under `/app`. All `crmprompt.md` routes exist; interactive mock controls, filters, and security hardenings are verified (build + Playwright smoke). Persistence and real auth remain the next major phase.

## Latest Test Results

Build: PASS  
Selfchecks: selectors, safe-next, validation PASS  
E2E `npm run test:crm`: PASS (incl. logout gate + invalid-login alert)  
Lint: N/A (no lint script)

## Tech Stack

### Frontend
Next.js 16 App Router, React 19, Tailwind v4, Lucide, Motion (marketing)

### Backend
Next.js server actions (auth cookie only)

### Database
None (in-memory seed + client store)

### Infrastructure
Vercel-capable; middleware for CRM gate

### Testing
`npm run build`, `npm run test:crm`, selector/safe-next/validation selfchecks

## Architecture Summary

`(marketing)` / `(auth)` / `(crm)` route groups; cookie session; `CrmProvider` seeds mock domain and accepts UI mutations until refresh.

## Feature Status

| Feature | Frontend | Backend | Integration | Tests | Status |
|---|---|---|---|---|---|
| Marketing site | Done | N/A | Verified | Build | Complete |
| Mock login/logout | Done | Cookie | Verified | e2e | Complete (mock) |
| CRM shell + nav | Done | N/A | Verified | e2e | Complete |
| Entity lists/details | Done | Mock store | Verified | e2e | Complete (mock) |
| Pipeline / tasks | Done | Mock store | Verified | e2e | Complete (mock) |
| Conversations reply | Done | Mock store | Verified | e2e | Complete (mock) |
| Campaigns/automations | Done | Mock store | Verified | e2e | Complete (mock) |
| Forms/templates | Done | Mock store | Verified | e2e | Complete (mock) |
| Reports/funnels | Done | Read mock | Verified | e2e nav | Complete (read) |
| Filters + UI standards | Done | N/A | Verified | e2e | Complete |
| Soft role UI | Done | None | Verified | e2e invite | Partial (no route ACL) |
| Real DB / IdP | Not started | — | — | — | Remaining |

## Completed

- [x] Full CRM route map
- [x] Auth gate + demo login
- [x] Soft-UI shell + FilterBar / CrmButton (44px) standards
- [x] List filters across CRM lists
- [x] Auth alert phishing harden (error codes only)
- [x] Conversation search/draft correctness
- [x] Store mutator truthfulness + MOCK_NOW timestamps
- [x] Build + Playwright CRM smoke PASS
- [x] Docs folder + find-bugs / UI standards

## In Progress

- [ ] Database schema + persistence (next major phase)

## Remaining

- [ ] Real authentication provider
- [ ] Server-enforced RBAC
- [ ] CRUD create forms for entities
- [ ] Drag-and-drop kanban
- [ ] True invite / email / SMS providers

## Known Bugs

### Critical
- None in mock scope after this pass

### High
- Unsigned forgeable session cookie (acceptable for demo; block production claims)

### Medium
- Soft RBAC only (documented)
- State lost on refresh (by design)

### Low
- Relative time labels depend on MOCK_NOW vs wall clock for seed dates only

## Documentation

See `/docs` — Architecture, Roles, Workflows, Page audit, Security, Testing, Deployment, Session log, FIND_BUGS, UI_STANDARDS.

## Highest-value next action

Design Supabase (or chosen) schema for CRM entities + replace cookie mock with real auth while keeping UI contracts in `lib/crm/types.ts`.
