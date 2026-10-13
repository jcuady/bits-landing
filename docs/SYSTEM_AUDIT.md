# Principal System Audit Report

> **Project:** Boundless IT Solutions (BITS) Enterprise Platform
> **Auditor:** Principal Full-Stack Engineer
> **Report date:** 7 October 2026
> **Stack (verified 8 Oct 2026):** Next.js 16.3.8 | React 19.3.0 | TypeScript 7.0.2 | Tailwind 4.3.3
>
> Corrected §45: this header read *16.3.5*. §41 upgraded `next` to 16.3.8 to clear
> 1 critical + 6 high advisories and recorded the correction at §41 — then missed
> the one line every reader sees first. The same drift, in the same file, that §43
> found in `PROJECT_STATUS.md`.
>
> **Status: REMEDIATED — all P0 and P1 findings from the previous audit cycle are closed.
> This is NOT a "100% production-ready" declaration. Known limitations and open
> owner decisions are listed in §8 and must be read before sign-off.**

---

## 1. Why this report was rewritten

The previous version of this document asserted **"100% PRODUCTION-READY & VERIFIED"**
and listed 15 "fully functional" CRM routes. On inspection, **10 of those routes did not
exist in the repository**, and several "verified" behaviours were not true.

This report replaces those claims with evidence. Every status below maps to a command
that was actually run, or a file that was actually read.

| Previous claim | Reality found |
|---|---|
| "15 CRM routes fully functional" | 6 real routes; `pipelines`, `tasks`, `campaigns`, `automations`, `forms`, `reports`, `team`, `conversations`, `templates`, `telemetry` do not exist |
| "Middleware gate VERIFIED" | `/app/*` was satisfied by a client-settable, `httpOnly: false` cookie (`bits_demo_role`) — no Supabase session required |
| "Zero runtime console warnings" | Not verifiable from source; removed the one known console log of toast/lead data |
| "Reload Demo Dataset restores 15 leads & 12 deals" | `seedCrmState()` returns **empty arrays**; the button restored an empty workspace |
| "Authentication PASS" | 4 CRM API routes were **fully anonymous** while holding the service-role key |
| "Role-based access control" | Every signed-in user resolved to **Admin** |

---

## 2. Verified Build & Verification Status

> **Corrected §77 — this table is a point-in-time snapshot, not a live status.**
> It was measured during the §1–§20 remediation and is deliberately **not**
> auto-updated, because several rows record what was true at the moment a
> finding was closed (the §40 live RLS row still reads `10/26/4/3 rows`, the §41
> row still names the advisories that were fixed then). Read it as *"this was
> run, and this is what it returned."*
>
> A reader taking it as current would be wrong on at least these counts, all of
> which have since changed:
>
> | Row | Says | Now |
> |---|---|---|
> | Unit selfchecks | 21 suites | **30** |
> | AI disclosure | 10 surfaces / 1,938 strings / 13 attestations | **33 / 7,338 / 15** |
>
> Live values for every measured quantity in **every other document** are
> enforced by `scripts/docs-claims-drift.mjs`, which derives them from the code
> and fails on drift. This file is the one declared exemption (§71) — a
> chronological record in which "up from 3,974" is the entire point.

Commands executed against the working tree after remediation. Counts are copied
from actual runs, not from earlier sections of this report.

| Gate | Command | Result |
|---|---|---|
| Typecheck | `npm run typecheck` (`tsc --noEmit`) | **PASS** — 0 errors |
| Production build | `npm run build` | **PASS** — 71 pages generated, `ƒ Proxy (Middleware)` registered |
| Unit selfchecks | `npm run test:unit` | **PASS** — **21 suites** |
| CRM end-to-end | `npm run test:crm` | **PASS** — 29 assertions, 0 skipped (§35; was a permanent failure) |
| Link integrity | `lib/site/link-integrity.selfcheck.mjs` | **PASS** — 41 routes, 22 anchors, 51 skip links, 0 dangling |
| Asset integrity | `lib/site/asset-integrity.selfcheck.mjs` | **PASS** — 163 source files, every referenced public asset exists |
| Sitemap coverage | `lib/site/sitemap-coverage.selfcheck.mjs` | **PASS** — 36 URLs advertised, all resolve; 10 indexable routes all covered |
| Registry integrity | `lib/products/registry-integrity.selfcheck.mjs` | **PASS** — 19 engines, 5 with live sandboxes, 41 routes |
| Contrast | `lib/security/contrast-check.mjs` | **PASS** — 20/20 measured WCAG pairs |
| Static a11y | `lib/security/a11y-static.selfcheck.mjs` | **PASS** — 113 TSX files, every labelled control has an accessible name, no heading skips |
| Contact contract | `lib/contact.selfcheck.mjs` | **PASS** — 23 assertions against the real schema and the real action (§31) |
| Cookie disclosure | `lib/site/cookie-disclosure.selfcheck.mjs` | **PASS** — 13 clients, 11 localStorage keys + 2 cookies, both directions |
| AI disclosure | `lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 5 files, 27 refs, 10 surfaces / 1938 strings, 13 banned attestations negative-tested |
| Image sizing | `lib/site/image-sizes.selfcheck.mjs` | **PASS** — 26 `<Image>`, qualities read from `next.config.ts` (§34) |
| Encoding integrity | `lib/site/encoding-integrity.selfcheck.mjs` | **PASS** — 329 files, 0 mojibake / U+FFFD / BOM / invalid bytes (§37) |
| Rate limiting | `lib/security/rate-limit.selfcheck.mjs` | **PASS** |
| Production-write guards | `scripts/production-write-guard-test.mjs` | **PASS** — 37 assertions (§33, §36) |
| Guard negative test | `scripts/production-write-guard-negative.mjs` | **PASS** — 6/6 defects restored and caught |
| Encoding negative test | `scripts/encoding-integrity-negative.mjs` | **PASS** — 7/7 defects restored and caught (§37) |
| Secret history scan | `scripts/history-secret-scan.mjs` | **1 CONFIRMED** — the §32 demo credential, in **two** source files; no service-role/Resend/Stripe key or private key ever committed (§40) |
| Live RLS probe | `scripts/anon-access-probe.mjs` | **PASS** — 4/4 tables PROVEN; 10/26/4/3 rows exist, anon sees 0 on all four (§40) |
| Dependency vulnerabilities | `npm audit` | **0 vulnerabilities** — next 16.3.5 → 16.3.8, source-map-js pinned 1.2.2 (§41) |
| Unused dependencies | `scripts/unused-deps.mjs` | **PASS** — 24 used, 0 unreferenced; 6 removed incl. `recharts`, `three` (§41) |
| Per-page weight | `scripts/page-weight.mjs` | 14 routes, fresh context each; `/login` 471 KB after the GSAP fix (§42) |
| Hero motion | `scripts/verify-hero-motion.mjs` | **PASS** — 7/7; scrub advances, reduced-motion still suppresses it (§42) |
| Bundle boundary | `lib/site/bundle-boundary.selfcheck.mjs` | **PASS** — no heavy lib statically imported; negative test 3/3 (§42) |
| Orphan assets | `lib/site/orphan-assets.selfcheck.mjs` | **REPORT-ONLY** — 75 of 110 unreferenced, 47.0 MB of 52.5 MB (§30) |
| Browser console | Playwright across all module + marketing pages | **PASS** — 0 errors (hydration #418 fixed) |
| Module interactivity | Playwright driving real clicks/inputs | **PASS** — SLA, search, payment, journey builder all mutate state and persist |
| Layout stability | PerformanceObserver, 375 px viewport | **PASS** — CLS 0.0101 (< 0.1), no horizontal overflow |
| Touch targets | Playwright geometry sweep | **PASS** — controls raised to 44 px; residual sub-44 px are WCAG-exempt inline links |
| Real first-visit weight | Playwright resource timing on the production build | **PASS** — 620 KB total, −39%; logo 371 KB → 4 KB (§34) |
| Responsive | `npm run test:responsive` | **PASS** — 8 viewports; found and fixed a real WCAG failure (§19) |
| Keyboard | `npm run test:keyboard` | **PASS** — skip link + focus order (§21) |
| API authorization | live `curl` against `next start` | **PASS** — all endpoints 401 anonymous |
| `/app` gate | live `curl` (anonymous + forged cookie) | **PASS** — 307 → `/login` in both cases |
| Public + demo routes | live `curl`, 26 routes | **PASS** — all 200 |
| Lint | — | **NOT CONFIGURED** — no ESLint dependency exists in the project |
| Lighthouse / CWV lab | — | **NOT RUN** — weight was measured directly instead (§34); no Lighthouse dependency added |

> Items marked NOT RUN / NOT CONFIGURED are deliberately not claimed as passing.
> Production is **not** on this build — see §30 and §32.

---

## 3. Security findings — all closed

### P0-1 · Anonymous access to privileged CRM APIs — **FIXED**
`campaigns`, `automations`, `email-logs`, and `leads` called `createServiceClient()`
**before any authentication check**. Because `SUPABASE_SERVICE_ROLE_KEY` is configured
in `.env.local`, every request bypassed Row Level Security. Anonymous callers could
write to `marketing_campaigns` / `marketing_automations` and read `email_logs` PII
(recipient, sender, subject).

- **Fix:** new shared guard `requireCrmUser()` in `lib/crm/api-auth.ts`, mirroring the
  pattern already used by `GET /api/crm/leads`. Every handler resolves the caller through
  the **anon-key** client (`auth.getUser()`) *before* touching the privileged client.
- **Verified:** all 4 routes now return **401** to anonymous GET and POST.
- Raw `error.message` responses were also replaced with generic messages so Supabase
  schema details are not leaked to clients.

### P0-2 · Forgeable authentication cookie — **FIXED**
`proxy.ts` treated `Boolean(user || demoRoleCookie)` as authenticated, and
`bits_demo_role` was written with `httpOnly: false`. Any visitor could set that cookie
from the console and reach `/app/*`.

- **Fix:** `proxy.ts` now authorizes on a **verified Supabase session only**;
  `bits_demo_role` is explicitly documented as a marketing-demo persona hint, never an
  auth grant. The cookie is now written `httpOnly: true`.
- **Verified:** anonymous **and** forged-cookie requests both 307 → `/login?next=…`.
- Defence in depth: `app/(crm)/app/layout.tsx` independently re-validates with
  `supabase.auth.getUser()`, so the layout is the real backstop.

### P0-3 · Service-role client silently degrading — **FIXED**
`createServiceClient()` fell back to the **anon key** when the service key was missing,
masking a broken deploy and producing confusing RLS errors. It now **throws** with an
actionable message. This is a deliberate fail-closed change.

### P0-4 · `roleForEmail` granted Admin to everyone — **FIXED**
`lib/crm/store.tsx` returned `"Admin"` on the fall-through path, so every signed-in user
was an administrator in the UI. It now returns the least-privileged role (`Rep`), and is
documented as a **UI display role, not an authorization boundary**.
See §8 for the unresolved per-route role enforcement question.

### Note on hardcoded credentials
The Supabase project URL and **anon** key remain as source-level fallbacks in
`lib/supabase/server.ts` and `proxy.ts`. These are public by design (the anon key ships
to every browser; all real access control is RLS), so this is **not** a secret-leak
defect. The genuinely secret credential — `SUPABASE_SERVICE_ROLE_KEY` — is never
hardcoded and now fails closed. **Action for the owner:** confirm the Vercel project
defines `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` so the source
fallbacks are never the production source of truth.

---

## 4. Lead-capture integrity — all closed

### P0-5 · Silent lead loss — **FIXED**
`submitContact` reported success even when Supabase persistence or the email pipeline
failed. A qualified inquiry could be lost with the visitor seeing a thank-you screen.

- `recordInboundLead()` now **throws** on persistence failure instead of returning an
  in-memory fake record.
- `submitContact` treats persistence as **blocking** and returns a specific,
  user-visible `formError` with the submitted values preserved for retry.
- A failed internal notification also surfaces a message, because a silent internal
  alert failure means nobody actually saw the inquiry.

### P0-6 · Honeypot was structurally unreachable — **FIXED**
`website` was validated as `z.string().max(0)`, so a bot filling it **failed `safeParse`**
and got a field error revealing the trap. The schema now accepts any string and
`isHoneypotTripped()` is evaluated **before** validation, so bots receive a neutral
success and nothing is persisted. Pinned by `lib/contact.selfcheck.mjs`.

### P0-7 · No rate limiting — **FIXED**
Added `lib/security/rate-limit.ts` (5 submissions / 10 min per client).
**Known limitation:** this is in-memory and therefore **per-instance** — on Vercel it
raises the cost of burst abuse but is not a global limit. A shared store (Upstash) is
the durable answer; tracked in §8.

---

## 5. Data integrity & honesty — all closed

| Finding | Resolution |
|---|---|
| `seedCrmState()` is empty, but Settings said "Reload Enterprise Demo Dataset … 15 leads & 12 deals" | Relabelled **"Reset Workspace to Default"**; toast now states it resets to the default empty state. Doc comment records that no demo dataset is seeded. |
| Seed script described fabricated leads as "7 **authentic** BITS enterprise leads" referencing real firms and domains | Header rewritten to an explicit **SYNTHETIC DATA** warning; every record's `source` is now `DEMO — Synthetic Sample Data`; seeding prints a warning. |
| Dashboard activity feed presented invented people/companies as real inbound activity | Entries now carry a visible **"Sample data —"** prefix. |
| Footer email field looked like a newsletter subscribe but stored nothing | It does not subscribe or persist. Helper comment and visible copy now state it **opens the consultation request form**. |

**Still open (owner decision):** the rows already written into the live `inbound_leads`
table still contain fabricated records referencing real companies and real email
domains. Purging them touches production data and was **not** run without approval.
Tracked in §8.

---

## 6. Navigation & dead links — all closed

- **10 broken in-app links** pointed at non-existent routes. Verified user-visible
  examples: `/app/pipelines`, `/app/tasks`, `/app/team`, `/app/forms`,
  `/app/conversations`. All repointed to routes that exist, with labels corrected to
  match their real destination (e.g. "Open Kanban Pipeline Board" → "View all
  opportunities").
- **8 dead footer/header anchors** (`#bpo`, `#collections`, `#banking`,
  `#growing-businesses`, `#features-bento`, `#products-suite`, `#custom-systems`,
  `#methodology`) had **no matching section `id`**. All repointed to rendered sections.
- **New permanent guard:** `lib/site/link-integrity.selfcheck.mjs` walks the route tree
  and the rendered landing page and fails if any link or anchor dangles. It understands
  route groups, dynamic segments, and the `/brandbook` rewrite.

---

## 7. Cleanup

- Deleted **12 orphaned component files (~200 KB)** under `components/bionis/`, verified
  to have **zero importers** (only a doc mention and a fetch script referenced them).
  Deleted `scripts/fetch-bionis.mjs` with them.
- The **CSS was load-bearing**: `.bionis-dashboard` was applied by 3 live components.
  Rather than delete it, it was moved to `components/ui/crm-dashboard.css` and renamed to
  `.crm-dashboard`, so the styling is preserved and the legacy brand name is gone from
  active code. The `--bionis-blue` CSS custom property inside it was renamed
  `--bits-blue` (14 references).
- Theme persistence now uses a single canonical `bits_theme` key. The legacy
  `bionis-theme` key is read **once** on load and then migrated/removed, so returning
  visitors keep their preference without the old key lingering. Capture scripts
  (`capture-cards.mjs`, `capture-all-themes.mjs`) were updated to write `bits_theme`.
- **Dead-code removal (7 Oct 2026).** A full import-graph sweep resolved 536 edges
  across 187 files (no dynamic/`next/dynamic` component loads exist, so nothing was
  runtime-only). **23 orphan files / ~4,700 lines** with zero importers were deleted:
  14 `components/sections/*` (incl. `features-bento` 747, `solutions` 694, `ecosystem`
  427, `problem` 304), 7 `components/ui/*` (incl. `hero-three-canvas` 379, `sidebar` 460,
  `sheet`, `tooltip`, `card`, `separator`, `section-heading`), plus
  `components/crm/pipeline-board.tsx` and `components/layout/newsletter-form.tsx`.
  `sheet.tsx` and `tooltip.tsx` were transitively dead — imported only by the orphaned
  `ui/sidebar.tsx`. *(`ui/sidebar.tsx` is NOT `components/crm/app-sidebar.tsx`, which is
  live and untouched.)*
- **Two prior claims corrected.** `hero-product.tsx` and `bits-agent-call.tsx` were
  reported as dead; both are in fact live (`sections/hero.tsx:8`,
  `sections/bits-agent-page-content.tsx:10`) and were retained.
- Removed a `console.log` that emitted toast text (which can contain record data).
- Added `npm run typecheck`, `npm run test:unit`, and `npm test`.

---

## 8. Known limitations & open owner decisions

These are **deliberately not** fixed by this audit because each requires an owner call.

1. **Per-route role enforcement is not implemented.** `roleForEmail` is a client-side UI
   role derived from localStorage and is not an authorization boundary. API routes
   currently require *any* authenticated user, not a role-appropriate one. *Decision
   needed: source of truth for roles (Supabase `profiles.role` vs user metadata) and
   which actions require which role.*
2. **Fabricated rows remain in the live `inbound_leads` table.** *Decision needed: purge
   vs relabel in place, and whether demo data belongs in a separate Supabase project.*
3. **Rate limiting is per-instance.** *Decision: accept, or move to a shared store.*
4. **CRM persistence is localStorage-only.** Record mutations do **not** write to
   Supabase; the workspace is per-browser and last-writer-wins with no cross-tab sync.
   Inbound leads are fetched from `/api/crm/leads` and merged in. Server-side CRM
   persistence is not built.
5. **10 documented CRM routes do not exist.** This audit removed the links that pointed
   at them and corrected the documentation. *Decision: build them, or keep them out of
   scope.*
6. **`MOCK_NOW` is a frozen date** (`lib/crm/selectors.ts`) driving KPI figures and
   relative timestamps. *Decision: real time vs a deterministic test clock.*
7. **No linter is configured** — the project has no ESLint dependency. `npm run lint`
   does not exist and was not invented. *Decision: add ESLint, or record a deliberate
   standard.*
8. **Unused exports remain.** After the dead-file removal, ~24 `lib/` files still export
   at least one symbol with no importer — mostly data tables in `lib/site.ts`
   (`heroStats`, `theDifference`, `crmModules`, `methodologySteps`, `pricingComparisonMatrix`,
   `footerColumns`, …) and helpers in `lib/crm/selectors.ts` (`dashboardKpis`,
   `pipelineByStage`) and `lib/crm/queries.ts` (`getInboundLeads`). These are content
   reserves for future sections, not defects. *Decision: keep as reserves, or prune to
   reduce maintenance surface.*
9. **Two catalogs with different scopes (resolved, not a bug).**
   `lib/site.ts` `bitsProducts` holds **18 marketing products** (the `/products` catalog).
   `lib/products/registry.ts` holds **19 sandbox engines** (the `/demo` matrix). The
   registry additionally carries `operations-360`, `crm-collections`, and `bitsagent`
   as engines without a standalone `/products` page. Both numbers are correct for their
   own surface; `/demo` now derives its count from the registry and `/products` from
   `bitsProducts`, so neither can drift. *Note: the two lists still overlap by name but
   not by id (`sales` vs `crm-sales`), which is why an automated cross-check between
   them would be brittle — keep them separate.*
10. **`npm run test:crm` is permanently broken and cannot pass.** Later passes
    established this is not a "needs a server" problem — see §18.3. The script asserts a
    CRM surface (10 routes, their nav links, and their controls) that does not exist.
    *Decision: rewrite the script against the routes that actually exist, or delete it
    rather than leave a permanently red `npm run` entry.*
11. **Two scripts write to the live `inbound_leads` table**, and one of them sends real
    email through Resend. `scripts/seed-supabase.mjs` upserts synthetic demo rows, and
    `scripts/test-marketing-automation.mjs` inserts a live test lead *and* sends actual
    emails to `CONTACT_INBOX`. See §18.4 for the corrected provenance of the 10 live rows.
    *Decision: point these at a separate demo Supabase project before anyone runs them
    again.*
12. **Lighthouse (`npm run seo:audit`) was never executed** — it needs a deployed URL and
    the bundled `claude-seo` tooling. It remains unverified.

---

## 9. Route inventory (actual)

**CRM (`/app`, auth required):** `dashboard`, `leads`, `leads/[id]`, `opportunities`,
`opportunities/[id]`, `contacts`, `contacts/[id]`, `companies`, `companies/[id]`,
`settings`.

**Marketing:** `/`, `/pricing`, `/security`, `/solutions`, `/products`,
`/products/[slug]`, `/products/crm`, `/bitscrm`, `/bitsagent`, `/blog`, `/blog/[slug]`,
`/legal`, `/cookies`.

**Products/demo:** `/demo`, `/crm-sales`, `/crm-sales/leads`, `/crm-sales/pipeline`,
`/crm-sales/cpq`, `/crm-support`, `/crm-support/tickets`, `/crm-support/tickets/[id]`,
`/crm-marketing`, `/crm-marketing/audiences`, `/crm-marketing/journeys/[id]`,
`/crm-commerce`, `/crm-commerce/invoices`, `/crm-commerce/subscriptions`,
`/crm-commerce/reconciliation`.

**Auth:** `/login`, `/forgot-password`.

The landing page renders **14 sections**: Hero, TrustStrip, ProductFamilies,
SolutionFinder, TheDifference, StatsStrip, FeaturesHero, FloorShowcase, Industries,
Security, DeploymentModels, Pricing, FAQ, Contact.

---

## 10. Demo sandbox modules (added 7 Oct 2026)

Three BITS CRM demo engines were registered in `lib/products/registry.ts` with **no
routes**. They are now implemented and reachable from the `/demo` matrix.

| Module | Routes | Shared primitives |
|--------|--------|-------------------|
| **Support Desk** | `/crm-support`, `/crm-support/tickets`, `/crm-support/tickets/[id]` | SLA countdown HUD, priority/breach watchlist, agent workload, ticket queue + detail, inline reply thread, status/priority/assignee controls |
| **Marketing Journeys** | `/crm-marketing`, `/crm-marketing/audiences`, `/crm-marketing/journeys/[id]` | Journey command center, inline sequence builder (message/wait/branch/trigger), live pause-resume + enroll-batch simulation, audience segments |
| **Commerce & Billing** | `/crm-commerce`, `/crm-commerce/invoices`, `/crm-commerce/subscriptions`, `/crm-commerce/reconciliation` | MRR & collection KPIs, dunning queue, 12% BIR VAT invoicing, subscription lifecycle, payment reconciliation |

**Shared design system.** `components/products/demo-ui.tsx` provides `Panel`, `Stat`,
`StatusPill`, `DemoButton`, `DemoField`, `DemoTable`, `Meter`, `PageHeader`,
`EmptyState` and `DemoDataBanner`, so all sandboxes render one visual language instead
of each page inventing cards.

**Supabase-free by design.** These modules are client-side demos. Their stores
(`lib/products/crm-{support,marketing,commerce}/store.tsx`) use `useReducer` +
`localStorage` only; **no Supabase import exists in any of them** (verified by grep).
Every surface that shows seeded figures renders a `DemoDataBanner` stating the data is
synthetic.

**Registry count.** `PRODUCT_REGISTRY` holds **19** entries, not 18. The `/demo` page
now derives its count from the registry (`engineCount`) instead of hard-coding "18", so
the headline, filter pill and "Showing N of M" line can no longer drift.

**Sandbox truth (`sandboxStatus`).** Every registry entry declares
`sandboxStatus: "live" | "planned"`. Only **5 engines have a working sandbox**
(`operations-360` → `/app`, plus `crm-sales`, `crm-support`, `crm-marketing`,
`crm-commerce`); the other 14 are roadmap entries with **no route**. This was previously
hidden: the matrix advertised all 19 as "Live Interactive MVPs", and the login flow
redirected `?product=<planned>` straight to a 404 `demoPath`. Now:

- planned engines render a **PLANNED** badge and are labelled "Sandbox In Development";
- `app/(auth)/login` only honours `demoPath` when `sandboxStatus === "live"`, otherwise it
  falls back to `/app/dashboard`;
- `proxy.ts` resolves subdomain and `/demo/:product` rewrites through
  `resolveProductPath()`, which sends unimplemented products to `/app` rather than 404.

**Verification gates added.** `npm run test:unit` now runs nine checks, including three
new ones written to stop this class of defect returning:

| Gate | Guards |
|---|---|
| `lib/site/link-integrity.selfcheck.mjs` | dangling internal links and anchors |
| `lib/site/asset-integrity.selfcheck.mjs` | referenced public assets that don't exist (179 source files) |
| `lib/products/registry-integrity.selfcheck.mjs` | engines claiming a live sandbox that has no route, and vice versa |
| `lib/security/contrast-check.mjs` | 20 measured WCAG contrast pairs |

**Accessibility.** The product shell now provides a keyboard **skip link** to
`<main id="content">` and labelled mobile-nav toggles, matching the convention already
used across the marketing, auth and CRM shells.

**Error handling.** The project previously had **no error boundaries** — an uncaught
render error surfaced as a blank page. Added `app/error.tsx` (route-level, with retry +
digest reference) and `app/global-error.tsx` (root-layout fallback), plus
`app/(crm)/app/loading.tsx` so the server-rendered CRM workspace shows a skeleton while
the Supabase session resolves.

---

## 11. SEO / AEO and runtime-hydration verification (8 Oct 2026)

**Sitemap.** `/cookies` is a public NPC/GDPR compliance page with no `noindex`, but it
was **missing from the sitemap**. Added. A new `sitemap-coverage` gate now verifies
**both directions** against the real route tree: every advertised URL resolves (static
*and* dynamic `[slug]` patterns), every indexable route is advertised, and no private
route (`/app`, `/api`, `/login`, `/demo`, `/crm-*`) is advertised. Live check: **36 URLs,
0 broken**.

**robots.txt.** The demo sandboxes were **not** disallowed — `/demo`, `/crm-sales`,
`/crm-support`, `/crm-marketing`, `/crm-commerce` are now blocked for all 11 declared
crawler groups. They render seeded synthetic data and are not marketing content, so
indexing them would surface demo fixtures in search results.

**Structured data.** All JSON-LD blocks across `/`, `/pricing`, `/products`, `/blog` and
`/bitscrm` parse as valid JSON (13 blocks, 0 invalid).

**AEO files.** `/llms.txt` (26 internal links), `/llms-full.txt`, and
`/.well-known/ai-catalog.json` (8 entries) all return 200, parse cleanly, and every
referenced URL resolves.

**Two real runtime bugs found by driving a browser** (not visible to static checks):

1. **Broken CTA on every sandbox page.** `components/products/demo-toolbar.tsx` linked to
   `/contact`, which does not exist — a 404 on the "Book Strategy Call" button shown on
   all four demo modules. Fixed to `/#contact`. The link-integrity gate had missed it
   because it only matched `href="..."` object literals, not `<Link href={...}>` JSX;
   the checker now matches both forms and scans the demo shells.
2. **React hydration mismatch (#418) in all three new stores.** The Support, Marketing
   and Commerce providers read `localStorage` during the first render, so the server
   rendered seed data while the client hydrated with persisted state (e.g. "18m over" vs
   "78m over"). Fixed with a hydration-safe pattern — seed renders on both sides, then
   persisted state is dispatched in an effect, with persistence gated behind a `hydrated`
   flag so the seed cannot overwrite saved data. This matches the pattern the original
   `lib/crm/store.tsx` already used. Verified: **0 console errors** on all module pages,
   and state still persists across reload.

**Interactivity verified in a real browser:** Support SLA clock advances (105m → 120m
over); ticket search filters 8 → 1 results; Commerce "Record payment" moves outstanding
₱1.99M → ₱998K and clears the related `past_due` subscription (2 → 1); journey builder
adds a step (7 → 8) and the change survives a reload.

**Performance & responsive (measured, not estimated).** On the production build at a
375 px viewport: **Cumulative Layout Shift 0.0101** (the "good" threshold is < 0.1) and
**no horizontal overflow** (`scrollWidth` 360 ≤ 375). All images render with `alt`
text; there are **zero raw `<img>` tags** — every image goes through `next/image`.

**Touch targets.** A browser sweep found interactive controls rendering at **20–37 px**,
below the 44 px floor the project's own `docs/UI_STANDARDS.md` requires. Raised to
`min-h-11` (44 px) across the shared primitives and the surfaces that render on every
page: `DemoButton`, product-shell sidebar/nav/topbar links, the mobile menu toggle,
"Exit Sandbox", the demo toolbar controls, and the cookie-consent buttons (a consent
surface present on every page). Residual sub-44 px elements are inline text links inside
prose ("Product Specs") and the sidebar brand lockup — WCAG 2.5.5 exempts inline links in
a sentence.

> **CORRECTION (8 Oct, §19).** The list above originally also excused "Read our sovereign
> Cookie Policy" as inline prose. That was wrong: it renders in its own `<div>` on its own
> line with an appended chevron, so it is a standalone control, not a link inside a
> sentence. It was 191 × 17 px and failed WCAG 2.5.8 (24 px AA) outright. Caught by
> `scripts/responsive-validation.mjs`, which had previously been listed as "not runnable"
> and turned out to run fine. Now `min-h-11`.

**Contrast.** `lib/security/contrast-check.mjs` computes real WCAG ratios for the 20
token pairs used across the demo and product surfaces, and is part of `npm run test:unit`.
Three real failures were found and fixed **by changing foreground only** (backgrounds
untouched, per design constraint): search placeholder `slate-400 → slate-500` (2.56 →
4.76), subdomain chip `slate-500 → slate-600` on `slate-100` (4.34 → 6.92), and the
flagship link `emerald-600 → emerald-700` (3.77 → 5.48). All 20 pairs now pass.

## 12. Marketing-surface browser audit (8 Oct 2026)

The marketing pages, the pre-existing `/crm-sales` sandbox, dark mode, cookie consent and
the contact form had never been driven in a real browser. They were. Everything below was
observed at runtime on a production build, not inferred from source.

### 12.1 Defects found and fixed

| # | Defect | Where | Fix |
|---|--------|-------|-----|
| 1 | Two `/products/*` CTAs pointed at slugs that do not exist (`sports-venue`, `custom-engineering`) | `components/sections/product-families.tsx` | Retargeted to the real catalog slugs `sports-hub`, `construction`. Link gate extended to validate every `/products/<slug>` against `bitsProducts`. |
| 2 | `/legal#form-terms` was a **dead anchor** — the consent checkbox promises a "Form Submission Policy" that was never written | `components/ui/form-terms-consent.tsx` → `app/(marketing)/legal/page.tsx` | Added section **5. Form Submission & Consultation Policy**, written to restate only commitments the consent modal already makes. Governance section renumbered to 6. **Owner should review this legal wording.** |
| 3 | Engine-picker `<select>` had a `<span>` "label" that was not programmatically associated | `components/sections/contact-form.tsx` | `<span>` → `<label htmlFor="interest">`. |
| 4 | Six pipeline-stage selects announced as unnamed combo boxes | `app/(products)/crm-sales/page.tsx` | `aria-label={\`Pipeline stage for ${deal.company}\`}`. |
| 5 | **Flash of light theme on every load** for dark-mode users | `app/layout.tsx` | `.dark` was only applied in a `useEffect`, i.e. after first paint. Added a blocking pre-paint script in `<head>`. Verified `.dark` is present at `DOMContentLoaded`. |
| 6 | Cookie preferences drawer: **two unnamed toggles, no focus trap, no Escape** | `components/ui/cookie-consent.tsx` | `aria-labelledby` on both toggles; focus moves to the close button on open, Tab cycles inside the dialog, Escape closes, focus returns to the trigger. Banner gained `aria-live="polite"`. |
| 7 | Contact-form errors told users to email an address **not published anywhere else on the site** | `app/actions/contact.ts`, `lib/contact.ts` | User-facing copy now uses `site.inquiryEmail` (`bits_inquiries@boundlessits.com`). The internal alert inbox (`boundlessitsolutions@gmail.com`) stays internal — it is now `INQUIRY_INBOX`, documented as such. |
| 8 | Six headings inside the hero product mockup polluted the page's heading outline (`h1 → h4`) | `components/sections/hero-product.tsx` | Mocked CRM record names and simulated-screen titles are not document headings; converted to `<p>`. |
| 9 | Heading skips on `/legal` (`h1→h3`, `h2→h4`) and `/crm-sales/leads` (`h1→h3`) | several | Promoted/demoted to a contiguous outline. |
| 10 | 51 form controls across 17 files had a sibling `<label>` with no `htmlFor` | CRM app + demo modules | Each associated with a unique `id`/`htmlFor` (or an `aria-label` where no visible label exists). 58 controls fixed in total — the gate's original pattern also missed 7 `<Input>`/`<Textarea>` primitive usages. |
| 11 | `/legal` and `/cookies` had no `og:image`, so shared links rendered without a preview | both pages' `metadata` | Added `images: [{ url: "/og.png", … }]`, matching the pattern already used by `/security` and the rest. |
| 12 | The cookie banner's `<h3>` entered the page heading outline, producing an `h1 → h3` skip on every page whose first sub-section is not an `h2` | `components/ui/cookie-consent.tsx` | The banner is a `role="region"` landmark, not a document section, so its title is now a styled `<p>`. Verified at runtime: `/crm-sales/pipeline` and `/crm-support/tickets` now render a single `h1` with no skips. |
| 13 | `/demo/<planned-engine>` **404'd instead of redirecting.** The proxy branch promised "fall through to /demo rather than 404" in a comment, but falling through leaves the request at `/demo/<id>`, which has no page. Only ids present in `SUBDOMAIN_PRODUCT_MAP` were even considered. | `proxy.ts` §5 | The branch now resolves the id from the map **or** `PRODUCT_REGISTRY`, and a recognised roadmap product with no sandbox **redirects to `/demo`** (the showcase that labels it "planned"). The id list is read from the registry rather than duplicated, so the proxy can no longer drift from the catalogue. Verified: **all 19 registry ids resolve via `/demo/<id>`, 0 × 404**; the 5 live engines still return 200. |

### 12.2 New permanent gates

- **`lib/site/link-integrity.selfcheck.mjs`** — extended to validate `/products/<slug>`
  against the catalog, and to resolve **cross-page fragments** (`/legal#form-terms`) against
  the target page's real module graph. Negative-tested: a deliberately broken fragment link
  fails the gate.
- **`lib/security/a11y-static.selfcheck.mjs`** (new, part of `npm run test:unit`) — flags any
  `<input>`/`<select>`/`<textarea>` without an accessible name, and any heading-level skip.
  It is a **floor, not a ceiling**: it reads JSX literals, so it cannot see labels supplied
  at runtime.

  The first version of this gate had three defects, all found by deliberately testing it
  rather than trusting a green result:
  1. Its tag pattern was case-sensitive, so `<Input>` / `<Textarea>` primitive usages were
     never checked — 7 real defects were hiding behind the pass.
  2. It matched open tags with `[^>]*>`, which stops at the `=>` inside
     `onChange={(e) => …}`. Any `aria-label` written *after* the handler was invisible, so
     correctly-labelled controls were reported as defects.
  3. It scanned raw source, so tag-like text inside comments produced false positives.

  All three are fixed: the pattern now matches the capitalised primitives, open tags are
  extracted with a quote- and brace-aware scanner, and comments are stripped before
  scanning. It was then negative-tested (a deliberately unlabelled control must fail, on the
  right line) and positive-tested (a correctly-labelled control with `aria-label` after an
  arrow handler must be ignored). Adding a third prop-forwarding primitive to the exemption
  list (`components/ui/input-group.tsx`) was also required by fix 1.

  **Known limitation:** heading skips are checked *per file*. A skip that spans a parent and
  a child component (an `h1` in a page and an `h3` in a component it renders) is invisible to
  a static per-file gate — which is exactly how defect 12 above survived. Cross-file heading
  structure is only caught by a rendered-DOM check.

`npm run test:unit` now runs **11 suites**.

### 12.3 Verified working (evidence)

- **Landing page**: 1 `h1`, no heading skips, 0 dead anchors, 0 console errors, `lang="en"`,
  canonical + OG tags present, 3 valid JSON-LD blocks, 0 raw `<img>`, 0 unlabelled controls.
- **18-route sweep** (marketing + demo + product pages): **0 console errors, exactly 1 `h1`
  each**, title/description/canonical/OG all present.
- **Post-remediation DOM check** across 8 sandbox routes: **0 unlabelled form controls**,
  **0 heading skips**, 0 console errors, 0 horizontal overflow.
- **Final route sweep**: 36/36 public routes **200**; `/app`, `/app/dashboard`, `/app/leads`,
  `/app/settings` all **307** for anonymous; all 4 CRM APIs **401** for anonymous.
- **`/crm-sales`**: stage switcher mutates state, persists to `localStorage`
  (`bits_crm_sales_deals_v1`) and survives reload. 0 console errors.
- **Cookie consent**: banner appears once, saves `{necessary, analytics, marketing,
  timestamp}`, does **not** re-prompt on reload, reopen badge available, dialog keyboard-
  accessible.
- **Dark mode**: toggle flips `.dark`, persists to `bits_theme`, applied pre-paint. **0
  low-contrast text nodes** in dark mode on `/demo`, measured with a canvas-normalised
  WCAG ratio function that was itself self-tested against known-bad (1.00) and known-good
  (21.0) pairs.
- **Contact form**: native validation blocks empty and malformed-email submits; honeypot
  returns a neutral success and **returns before `recordInboundLead`** (verified in source
  ordering and in the browser — no row written); rate limiter trips on the **5th** submission
  with *"Too many requests… email us directly at bits_inquiries@boundlessits.com"*.
- **Responsive**: 5 viewports (375/390/768/1280/1920) × 8 marketing routes = **40
  combinations, 0 horizontal overflow**. The `/cookies` table is 573 px wide at a 360 px
  viewport but sits inside an intentional `overflow-x-auto` wrapper, so the document does
  not scroll.

### 12.4 Remaining, deliberately not changed

- **24 standalone controls still render at 20–42 px on mobile** (37 inline prose links are
  WCAG 2.5.8-exempt). The highest-value one — the hero product console's primary "Book a
  Consultation" CTA — was raised to `min-h-11`. The remainder are secondary controls on a
  heavily art-directed landing page; changing them is a visual redesign, not a defect fix,
  and is left for an explicit design decision.
- Per-role/per-action server-side authorization, the 10 documented-but-absent CRM routes, the
  `MOCK_NOW` frozen date, and the per-instance rate limiter remain open as recorded in §8.
- `npm run test:crm` and `npm run test:responsive` still require a seeded Supabase auth user
  and an Edge browser channel; Lighthouse / Core Web Vitals still require a deployed build.
## 13. Error boundaries, product surface & keyboard audit (8 Oct 2026)

The error/loading/404 boundaries, the 18 product pages, the blog, and keyboard navigation
had never been exercised. They were.

### 13.1 Defects found and fixed

| # | Defect | Where | Fix |
|---|--------|-------|-----|
| 14 | **The cookie banner covered the error page's recovery buttons.** At a 1037x583 viewport the banner (fixed, `bottom-4 left-4`, `z-50`) spanned x24-600 / y339-567 while "Try again" sat at x372-495 / y378-422 and "Back to home" at x507-665 / y378-422 — both fully underneath it. A visitor landing on a failed page could not retry or go home until they dealt with consent. | `app/error.tsx`, `components/ui/cookie-consent.tsx` | The error boundary now stands the banner down; it re-arms if `reset()` recovers. |
| 15 | The first version of that fix used a `window` CustomEvent and **silently did nothing** — the boundary's effect runs before `CookieConsent` subscribes, so the notification was dropped. | — | Replaced with `lib/page-error-state.ts`, a module-level flag plus subscription, so a late subscriber reads the current value instead of missing the update. Verified fixed; also verified the normal homepage banner still appears. |
| 16 | That first fix would have thrown `Rendered fewer hooks than expected` — the `suppressed` early return sat above the focus-trap `useEffect`. Caught by reading the hook order before building. | `components/ui/cookie-consent.tsx` | Both guards moved below every hook, with a comment saying why. |
| 17 | Three heading skips at runtime (`h2 -> h4`): the court-telemetry panel and the NFC cardholder name are simulated UI, and two real NFC section titles were an `h4` too deep. | `components/sections/products-suite.tsx` | Simulated titles became `<p>`; the two genuine section titles became `<h3>`. |
| 18 | **The marketing site had no skip link at all.** The only `#content` link was the footer's "Home". On a 27,459 px page with 87 links, a keyboard user re-tabbed the whole header on every navigation (WCAG 2.4.1). | `app/(marketing)/layout.tsx` | Added a visually-hidden-until-focused skip link as the first focusable element. Verified: first Tab lands on it on 5 routes; after activation the next Tab goes to content, bypassing all 7 header stops. |
| 19 | `formatRelative` reported **future-dated records as "1h ago"**. `Math.max(1, hours)` floored every negative delta, so a record 1 day — or 400 days — ahead of the reference clock rendered identically to one an hour old. | `lib/crm/selectors.ts` | Future deltas now render "in 5h" / "in 400d". |

### 13.2 Gate weakness closed

`lib/crm/selectors.selfcheck.mjs` **mirrored** the selector math instead of importing it,
so a defect in the real module passed the check. It now imports the real
`selectors.ts` / `mock-data.ts` (run with `--experimental-strip-types`, wired into
`npm run test:unit`) and asserts both directions of `formatRelative`, including a loop
that fails if any future date ever renders with an "ago" suffix. **Negative-tested**: the
gate fails against the pre-fix implementation and passes after.

### 13.3 Verified (evidence)

- **Error boundary**: a deliberately throwing route returns **500**, renders the branded
  "Something went wrong" state with an opaque Next.js digest, exposes **no** raw error
  message, and its "Try again" is clickable. Probe route removed afterwards.
- **404 page**: correct `404` status, one `h1` ("Page Not Found"), title
  `404 — Page Not Found | BITS`, `lang="en"`, 0 images missing `alt`, and **all 10 of its
  links resolve 200**.
- **Product + blog surface**: 18/18 product pages and the blog index/posts return 200.
  A 20-route browser sweep found **20/20 clean** — 0 console errors, exactly 1 `h1`, title,
  description, canonical and `og:image` all present, 4 JSON-LD blocks per product page, 0
  heading skips, 0 unlabelled controls, 0 horizontal overflow.
- **Keyboard**: first 30 tab stops on the homepage all carry a visible focus indicator
  (outline, ring or shadow); none are scrolled off-screen. 0 stops without an indicator.
- **Rate limiter is per-instance — confirmed empirically.** Three separate Node processes
  were each allowed exactly 5 requests for the *same* client key and blocked the 6th and
  7th (`[t,t,t,t,t,f,f]` each). The store is a module-level `Map`
  (`lib/security/rate-limit.ts`), so it is process-local by construction. This validates
  the limitation already recorded rather than assuming it.

### 13.4 `MOCK_NOW` — measured, not assumed

`MOCK_NOW` is frozen at `2026-09-13T12:00:00Z`, **25 days stale** as of this audit. Its
actual impact turned out to be narrower than the §8 note implied:

- `dashboardKpis` and `overdueTasks` return **identical** output under the frozen clock and
  the real clock.
- The reason is that the shipped `seedCrmState()` contains **no records at all** — only 1
  pipeline and 1 team member. Every entity array (companies, contacts, leads,
  opportunities, tasks, activities, conversations, campaigns, automations, forms, funnels,
  templates) is empty.

So the frozen clock is currently latent rather than visibly wrong. Two consequences are
worth an owner decision:

1. **The CRM app at `/app/*` ships with no demo data.** Every list view starts empty. If the
   intent was a populated demo, `seedCrmState()` is not providing it.
2. `MOCK_NOW` will distort KPIs and overdue counts the moment any record is added, because
   "last 30 days" windows and relative times would all be anchored 25+ days in the past and
   will silently age further. The `formatRelative` defect above (now fixed) was one symptom
   of exactly this.

Recommended: make the reference clock derive from real time (`new Date()`) and pin only the
seed data's dates, or drop `MOCK_NOW` entirely once records exist.

> **CORRECTION (8 Oct, §16).** Item 1 above was wrong about what the user sees. `seedCrmState()`
> really does return empty entity arrays, but `lib/crm/store.tsx` (line ~206) fetches
> `/api/crm/leads` on mount and merges the response into local state. The CRM is therefore
> populated from the **live `inbound_leads` table**, not from the seed. Consequences are in
> §16 — including a data-integrity problem that is more serious than the one this item
> described.

### 13.5 Still open

- Per-role/per-action server-side authorization; the 10 documented-but-absent CRM routes;
  fabricated rows in live `inbound_leads`; the per-instance rate limiter (now measured, not
  assumed); `seedCrmState()` being empty; `MOCK_NOW` going stale.
- Authenticated `/app/*` pages remain unverified in a browser — that needs a seeded
  Supabase auth user. `npm run test:crm` and `npm run test:responsive` remain unrun for the
  same reason, and Lighthouse / Core Web Vitals need a deployed build.
- The Playwright browser instance is shared and was repeatedly navigated by another
  project's automation mid-session; findings above were re-verified with `curl` and by
  re-running the browser checks rather than trusting a single observation.

## 14. Motion preference, performance and SEO-file verification (8 Oct 2026)

### 14.1 My own change, re-verified

Phase 12 opened by re-testing the pre-paint theme script added in §12.5, specifically the
`prefers-color-scheme` fallback it introduced. This was a behaviour change I had made and
never exercised.

**Result: no regression.** With the OS preference emulated, `document.documentElement`
carries `.dark` in `dark` and not in `light`, and the rendered result is identical between
the two on all 10 routes tested. Marketing pages do not define `dark:` variants, so the
class is inert there; it only takes effect on `/demo` and the CRM surfaces, which is where
the toggle lives.

**A measurement error I nearly reported as a defect.** The first contrast probe reported
ratios of 1.00–1.43 on `/pricing`, `/products`, `/solutions` and `/security` — i.e. invisible
text. It was an artifact: the probe resolves backgrounds by walking `background-color` only,
so it missed section `background-image` gradients and text sitting over background images,
and fell through to the white `<body>`. A screenshot of `/pricing` confirms the page renders
correctly (blue gradient headline on a near-white gradient, fully legible). Adding
`background-image` bail-outs removed the gradient cases but not the image cases, because a
background image is a sibling element that computed styles cannot see.

This is recorded rather than hidden: **the browser contrast probe cannot judge text over
images or gradients.** The authoritative check remains `lib/security/contrast-check.mjs`
(20/20 token pairs) plus visual inspection. A contrast checker that cries wolf is worse than
none, so no gate was built on the browser probe.

### 14.2 `prefers-reduced-motion` — one real gap, fixed

Checked how the animation system responds to a reduced-motion preference.

**Correct already:** `components/ui/reveal.tsx` wraps its content in
`<MotionConfig reducedMotion="user">`, so scroll-reveals still reach `opacity: 1` while the
transform is dropped. `magnetic.tsx` and `product-showcase.tsx` both use `useReducedMotion()`.

**Broken:** `components/sections/hero-product.tsx` registers its GSAP `ScrollTrigger` with
`gsap.matchMedia("(min-width: 1024px) and (min-height: 600px)")` — **no motion-preference
condition**. GSAP does not honour the OS preference on its own, so on any display =1024px a
visitor with reduced motion still got a deck that swaps panels continuously as they scroll —
precisely the vestibular trigger the preference exists to suppress.

Fixed by adding `(prefers-reduced-motion: no-preference)` to the query and hoisting `mm` out
of the `gsap.context()` callback so the effect cleanup can `mm.kill()` it. Verified by
reading the CSS variable the trigger writes:

| Mode | `--tab-progress` at top | after a 3,200 px scroll | Scrub |
|---|---|---|---|
| `no-preference` | 25% | **100%** | active |
| `reduce` | 25% | **25%** | suppressed |

Content is never left invisible: after a full scroll, **0 elements remain at `opacity: 0`**
in either mode.

### 14.3 Real first-visit weight (measured over the wire)

Two measurement mistakes were made and corrected before recording these numbers, and they
are worth stating because both initially looked like serious findings:

- `performance.getEntriesByType('resource').transferSize` reads **0** on a warm HTTP cache,
  making every route appear to transfer nothing.
- `curl -I` (HEAD) does not negotiate compression in `next start`, so it reported the
  **uncompressed** length. That made it look as though the server shipped 412 KB of
  uncompressed HTML.

**Compression is working correctly.** Verified directly: the homepage is 412,832 bytes
raw and **68,854 bytes gzipped**; the largest JS chunk is 401,779 ? **93,060**; the 344 KB
stylesheet ? **41,886**.

Real gzipped first load, measured with GET and an `Accept-Encoding` header:

| Route | HTML | JS | CSS | **Total** |
|---|---|---|---|---|
| `/` | 67 KB | 390 KB (19 files) | 42 KB | **499 KB** |
| `/products` | 33 KB | 290 KB (18) | 42 KB | **365 KB** |
| `/pricing` | 29 KB | 290 KB (18) | 42 KB | **361 KB** |
| `/crm-sales` | 14 KB | 254 KB (15) | 42 KB | **310 KB** |
| `/demo` | 16 KB | 251 KB (13) | 42 KB | **309 KB** |

Build totals: 63 JS chunks / 2.58 MB on disk, 344 KB CSS, 180 KB media. FCP measured at
184–384 ms locally; 0 broken images on any route. **This is normal for a content-rich
marketing site and is recorded as a baseline, not a defect.**

### 14.4 A gate that disagreed with production

`sitemap-coverage` reported **37** advertised URLs. The server actually serves **36**. That
discrepancy turned out to be two separate defects in the gate itself:

1. **Two phantom URLs were counted.** The regex matched the `.map()` template lines and
   recorded the literal strings `/products/${p.id}` and `/blog/${post.slug}`. These are not
   in the served sitemap, and they *passed* `routeExists`, because `${p.id}` is a perfectly
   well-formed single path segment to a matcher that only knows `/products/[slug]`.
2. **The homepage was never checked at all.** The regex required a `/` after `${site.url}`,
   so `` url: `${site.url}` `` was not captured. `/` is then excluded from both the
   "indexable" filter and the "advertised" loop, so removing the homepage from the sitemap
   entirely left the gate green.

Both fixed: template placeholders are filtered out, the capture group is optional so the
homepage is counted, and an explicit assertion now requires `/` to be advertised. The gate
now reports **36**, matching the server exactly, and is negative-tested both ways — removing
the homepage fails it, and injecting `/products/does-not-exist` fails it.

### 14.5 robots.txt

Reviewed in full. **11 crawler groups**, each carrying a consistent allow/disallow set;
`/app`, `/api`, `/login`, `/forgot-password`, `/demo` and the four `/crm-*` sandboxes are
disallowed for every group including `Googlebot` and `Google-Extended`. `Host` and `Sitemap`
are declared. AI-content routes (`/llms.txt`, `/index.md`, `/.well-known/*`) are correctly
**not** disallowed. No changes needed.

### 14.6 Still open

Unchanged from earlier sections: per-role/per-action authorization; the 10 absent CRM routes;
`seedCrmState()` shipping empty; `MOCK_NOW` ageing; fabricated `inbound_leads` rows; the
per-instance rate limiter; authenticated `/app/*` browser verification; Lighthouse on a
deployed build; and no ESLint gate.

## 15. Auth surface audit + first authenticated browser verification (8 Oct 2026)

### 15.1 Complete server-side attack surface enumerated

The entire server surface is smaller than it might appear, and is now known exactly:

| Surface | Location | Status |
|---|---|---|
| API routes | `app/api/crm/{campaigns,automations,email-logs,leads}/route.ts` | 4 routes, all `requireCrmUser()`-guarded, all 401 anonymous |
| Server actions — contact | `app/actions/contact.ts` | Tested end-to-end in §12 |
| Server actions — auth | `app/actions/auth.ts` | **Audited this round** |

`app/actions/auth.ts` had never been reviewed. It had no rate limiting anywhere.

### 15.2 Defects found and fixed

| # | Defect | Fix |
|---|--------|-----|
| 20 | **`loginAction` had no rate limiting.** The contact form was protected; the actual login endpoint — where brute force pays off — was not. An attacker could make unlimited credential-stuffing attempts. | 8 attempts per account and 20 per client address per 10 minutes, consumed *before* validation so a malformed request costs as much as a real one. The throttle redirect is deliberately identical to a normal failure (`error=invalid`) so it never reveals that an address is being limited. |
| 21 | **`forgotPasswordAction` had no rate limiting** — the endpoint could be used to bomb a third party's inbox with reset mail. | 5 requests per client per 10 minutes. The "we sent something" response is unchanged whether throttled or not, so nothing about address existence leaks. |
| 22 | `roleDemoLoginAction` wrote **any** client-supplied string into `bits_demo_role`. The cookie is `httpOnly` so it cannot be forged from the console, but the server would still store an arbitrary value on request. | Constrained to a `DEMO_ROLES` allowlist derived from `PRODUCT_REGISTRY[].testRoles` plus the four hardcoded login personas, so it stays in sync automatically. Anything else falls back to `sales_director`. |
| 23 | `demoLoginAction` was exported but **imported nowhere** — dead code, including hardcoded demo credentials in it. | Deleted. (`roleDemoLoginAction` is the live path; the login page never referenced the dead one.) |
| 24 | `proxy.ts` still carried the comment that the cookie "is written with `httpOnly: false`" — stale since that was fixed to `true`. | Comment corrected, and it now records that the role is allowlist-constrained while still being excluded from authorization. |

**Limitation carried forward:** these limits use the same module-level `Map` as the contact
limiter, so they reset on deploy and are not shared across instances (measured in §13.3).
A shared store is still the real fix.

### 15.3 Authenticated `/app/*` verified in a browser — for the first time

Every previous round treated `/app/*` as unverifiable. It is not: the login page's demo
persona buttons sign in as `demo@boundlessitsolutions.com`, which is the account the feature
is designed around. The whole authenticated CRM app was then swept.

**7/7 routes clean** — `/app`, `/app/dashboard`, `/app/leads`, `/app/contacts`,
`/app/companies`, `/app/opportunities`, `/app/settings`:

- 200, exactly 1 `h1`, **0 heading skips**, 0 console errors
- **0 horizontal overflow**, 0 images missing `alt`
- skip link present, `main#content` present on every route
- **181 controls total, every one with an accessible name**

### 15.4 Two accessibility defects in the CRM shell

| # | Defect | Fix |
|---|--------|-----|
| 25 | The global workspace search had only a placeholder — no accessible name. Placeholders are not labels. | `id="crm-global-search"` + `aria-label` in `app-topbar.tsx`. |
| 26 | The dashboard's per-lead **email button was icon-only with no name at all** — announced to a screen reader as just "button", 6 times in the table. | `aria-label={`Send fast-touch email to ${lead.email}`}`. |
| 27 | Per-row **Call/Delete buttons on `/app/leads`, `/app/companies`, `/app/opportunities` were `title`-only and identical on every row** ("Delete Lead" — 20). A user tabbing the table could not tell which record a button acted on. `title` is a valid accessible name, so these were not WCAG failures — but the ambiguity was real. | Each now carries `aria-label` *and* `title` including the record name (`Delete Rafael Dizon`), matching the pattern sibling controls in the same rows already used. |

### 15.5 A gate I built, tested, and then removed

The unnamed-email-button defect suggested extending `a11y-static.selfcheck` to flag
icon-only buttons. It was implemented and **immediately removed**: it produced **163
findings of which 6 were real** (a ~96% false-positive rate). Detecting "does this JSX render
text" without a JSX parser is not possible with a regex — `<button>{label}</button>` and
`<button><Icon/></button>` are the same shape to a pattern matcher.

A gate that cries wolf is worse than no gate, and this project already has an example of a
tool producing false confidence (the sitemap gate in §14.4, the browser contrast probe in
§14.1). The check is recorded in the file as a deliberate non-goal, with the reason, so the
next person does not repeat it. Unnamed buttons are caught by inspecting the rendered DOM,
which is where the computed accessible name actually exists.

### 15.6 Truthfulness note

`bits_demo_role` is written but **read by nothing** — the proxy explicitly ignores it for
authorization, and no component consumes it. Meanwhile `/cookies`, an NPC/GDPR compliance
page, documents it as maintaining "the selected interactive demo perspective". The cookie is
disclosed for a purpose it does not have. Removing the cookie entirely, or making a component
actually consume it, would bring the disclosure back in line with reality. Flagged for an
owner decision rather than changed unilaterally, since the cookie also appears in the legal
and privacy copy.

## 16. Where the CRM data actually comes from — and a live data-integrity problem

This section exists because §13.4 got it wrong, and the correction uncovered something more
serious than the thing it misdescribed.

### 16.1 The error

§13.4 reported, from a Node probe of `seedCrmState()`, that "the CRM app at `/app/*` ships
with no demo data — Every list view starts empty." The probe result was accurate — every entity
array really is empty — but the conclusion was not.

`lib/crm/store.tsx` hydrates from the server:

```
React.useEffect(() => {
  fetch("/api/crm/leads")
    .then(r => r.json())
    .then(res => { if (res.ok && res.mapped) {
        setState(curr => ({ ...curr,
          leads: [...newLeads, ...curr.leads],
          companies: [...newCompanies, ...curr.companies],
          opportunities: [...newOpps, ...curr.opportunities] }));
    }});
}, []);
```

So the CRM is populated from the **live `inbound_leads` table in Supabase**, merged into
localStorage-backed client state. The empty seed is a fallback, not the product.

### 16.2 What that means, and why it matters

The `inbound_leads` table currently contains **10 rows**, and every authenticated user sees
all ten in `/app/leads`, `/app/companies` and `/app/opportunities` as ordinary prospects.
Several are self-evidently synthetic:

| Name | Company | Email | `source` |
|---|---|---|---|
| Enterprise Client | Apex Global | `client@enterprise.com` | Website Contact & Operational Wish List Form |
| QA Tester | QA Co | `qa@example.com` | Website Contact & Operational Wish List Form |
| Alex Vance (CTO Test) | Apex Recovery & FinTech Ph | `boundlessitsolutions@gmail.com` | Automated E2E Verification Suite |
| Marcus Sterling | Sutherland Global Services BPO | — | BITScrm Landing Specimen |
| Atty. Rafael Dizon | EastWest Credit & Recovery Solutions | `r.dizon@eastwestcredit.ph` | Website Contact Form |
| Patricia Reyes | Maya Bank / Voyager Innovations | `patricia.reyes@voyager.ph` | Website Contact Form |
| Bea Villaruel | SeaMoney / ShopeePay Philippines | `bea.villaruel@seamoney.ph` | Website Contact Form |
| Carlos Tan | Insular Life Health Care (InLife) | `ctan@inlife.com.ph` | White-Label Partner Consultation |

The last four are the serious ones: they are **plausible-looking named individuals at real,
named Philippine companies, with real-looking corporate email addresses**, and they carry a
`source` value ("Website Contact Form") that asserts they were genuine enquiries. Anyone
opening the CRM — including a real prospect during a sales conversation — sees a pipeline
containing invented contacts at named financial institutions.

**No changes were made to this data.** Deleting rows from the live `inbound_leads` table is
destructive and requires explicit owner approval. The recommendation is:

1. Purge the synthetic and E2E rows (`client@enterprise.com`, `qa@example.com`,
   `boundlessitsolutions@gmail.com`, and the four specimen rows), keeping any genuine enquiry.
2. Decide whether the remaining fabricated-but-plausible rows should be relabelled with an
   explicit synthetic `source` (e.g. `DEMO — Synthetic Sample Data`, the convention
   `scripts/seed-supabase.mjs` already uses) rather than deleted, if they are wanted for demos.
3. Prevent recurrence: the E2E suite should write to a non-production Supabase project, or
   clean up after itself. `scripts/crm-e2e.mjs` is currently the source of at least the
   "Automated E2E Verification Suite" row.

### 16.3 Second-order finding

Because the CRM has no seed records, "Reset Workspace to Default" in Settings genuinely
resets to an empty workspace (correctly relabelled in an earlier pass) — but it does **not**
clear the server-side rows. A user who resets still sees all ten inbound leads refetched on
the next mount, which will read as "the reset didn't work". Worth a note in the UI.

## 17. The "Admin-gated" claim was false — and a substring role-escalation defect

### 17.1 Following up the 10 absent routes

`docs/PAGE_AUDIT.md` and `docs/ROLES_AND_PAGES.md` already document the ten non-existent
CRM routes (`/app/pipelines`, `/app/tasks`, `/app/campaigns`, `/app/automations`,
`/app/forms`, `/app/reports`, `/app/team`, `/app/conversations`, `/app/templates`,
`/app/funnels`) correctly, as *"referenced by older documentation but do not exist"* with a
? marker. Verified: no route files exist, and every one returns **307** for anonymous because
the proxy guards `/app/*` before the router can 404. **The docs were already honest** — this
open item is a build-or-prune product decision, not a documentation defect, and it needs the
owner's product input rather than more engineering.

`docs/FULL_SYSTEM_DOCUMENTATION.md` is the one aspirational document. Its header says
"Target Version: Production Release 2.0", and its role table describes capabilities
(SSO/SAML, IP whitelisting, database backups, BSP 454 tagging, live GPS field app) that are
not built. That is a design/spec document, not a statement of current state, but it should be
labelled as such so nobody reads it as a capability list.

### 17.2 The real finding: settings is not admin-gated

While checking the claim "Admin-gated" for `/app/settings`, the gate turned out not to exist:

```
const role = roleForEmail(userEmail, state);
const canManageTeam = role === "Admin" || role === "Manager";
```

`roleForEmail` resolves against `state.team`, which the store persists in **localStorage**.
There is no server-side check. Navigating directly to `/app/settings` as any authenticated
user renders the Admin surface ("Full Governance", the switches, and the destructive reset)
whenever the client-side role resolves to Admin/Manager.

### 17.3 Substring role escalation — the significant defect

`roleForEmail` contained this fall-through:

```
if (norm.startsWith("malcolm@") || norm.startsWith("demo@") || norm.includes("admin")) {
  return "Admin";
}
```

`includes("admin")` is a **substring match**, so any account whose email address merely
contains those five letters was granted the Admin UI:

| Address | Granted |
|---|---|
| `notadmin@corp.com` | Admin |
| `sysadmin@partner.ph` | Admin |
| `administrator@example.com` | Admin |
| `webadmin@client.test` | Admin |

This survived an earlier security pass that changed the *default* from Admin to Rep — the
least-privilege guarantee never actually held, because the heuristic ran first.

**Fixed.** `roleForEmail` now derives the role **only** from the explicit `team` roster and
returns `Rep` for anyone not in it. The seeded roster already lists
`demo@boundlessitsolutions.com` as an explicit Admin, so the demo experience is unchanged.

### 17.4 Made testable, and the test negative-tested

The function lived inside `store.tsx`, which contains JSX and therefore cannot be imported by
the Node selfcheck runner — which is precisely why it was never covered. It now lives in a
new **`lib/crm/roles.ts`** (pure logic, no React) and is re-exported from `store.tsx` so
existing imports keep working.

`lib/crm/selectors.selfcheck.mjs` now asserts least-privilege resolution for
`notadmin@corp.com`, `sysadmin@partner.ph`, `administrator@example.com`, `admin@evil.test`,
`malcolm@elsewhere.com`, `demo@other-project.com` and `attacker@example.com`, plus roster
resolution and case/whitespace insensitivity. **Negative-tested**: the gate fails against the
pre-fix implementation (`"notadmin@corp.com" must resolve to least privilege, not Admin`) and
passes after.

### 17.5 What is still not enforced

This is a **UI** fix, not an authorization fix. The underlying limitation stands and is
unchanged:

- `state.team` lives in localStorage, so a user can still add their own address to the roster
  and self-assign Admin UI. (Verified this is possible; note the browser session used was the
  seeded Admin, so a cross-user escalation was demonstrated structurally from the code path
  rather than by impersonating a second user.)
- No per-role, per-action server-side authorization exists. The real boundary remains
  `requireCrmUser()`, which validates a Supabase session but does not check a role.

The honest framing: the CRM's records are client-side and localStorage-backed anyway (a
documented limitation), so the blast radius of Admin UI is display and affordances rather
than data access. Making `/app/settings` genuinely restricted requires the RBAC
source-of-truth decision that is still open — the role must live on the server (Supabase
profile or a protected table), not in browser storage.

---

## 18. The CRM↔Supabase mapping was corrupting data on every refetch (8 Oct 2026)

`mapInboundLeadsToCrm` in `lib/crm/inbound-service.ts` converts `inbound_leads` rows into
CRM companies/contacts/opportunities. It was the last unexamined piece of the inbound path,
and it had **three data-integrity defects**, all of which corrupted state on every fetch.

### 18.1 Index-derived IDs duplicated the entire CRM on each new lead

Companies, contacts and opportunities were keyed by **array position**:

```ts
id: `co-inbound-${idx + 1}`   // before
```

The store prepends newly-arrived leads to the front of the array, and the CRM re-fetches on
load. So the moment one new submission arrived, **every** existing entity shifted by one
index and was assigned a different id. The store's "merge anything whose id I don't recognise"
logic then treated all of them as new records — duplicating the whole CRM on each new lead.

Fixed with a **stable id derived from the entity's own identity** (`stableId`, FNV-1a over
normalised identity parts):

| Entity | Stable key |
|---|---|
| Company | `company` + email domain |
| Contact | `email` |
| Opportunity | submission `id` (falls back to `email`) |

The mapping is now **idempotent**: mapping the same submissions twice yields byte-identical
ids, so re-fetching is a no-op instead of an append.

### 18.2 Every contact was given a fabricated phone number that mutated on each load

```ts
phone: `+63 9${Math.random()}`   // before
```

The website form **never collects a phone number**, so there was no honest value to derive.
The result was that every inbound contact carried an invented Philippine mobile that
**changed on every page load** — a number that looks real, belongs to nobody, and is
unstable. Now `phone: ""`. Fabricating data that mutates is worse than having none; the rep
fills it in on first contact.

### 18.3 Opportunity close dates moved forward on every refetch

```ts
closeDate: new Date(Date.now() + ...)   // before
```

A close date computed from the **wall clock** shifts every time the leads endpoint is called,
so a quoted close date could never stay still across a refresh. It is now anchored to the
submission's own `submittedAt + 30 days`, which is both stable and semantically correct (the
quote is 30 days from when they asked).

### 18.4 Corrected provenance of the 10 live `inbound_leads` rows

A **read-only** probe of the live table (no writes, no secrets printed) established the
actual contents and their sources:

| Source label | Rows |
|---|---|
| `Website Contact Form` | 4 |
| `White-Label Partner Consultation` | 2 |
| `Website Contact & Operational Wish List Form` | 2 |
| `BITScrm Landing Specimen` | 1 |
| `Automated E2E Verification Suite` | 1 |

Submitted between **2026-09-21 and 2026-09-28**.

**Correction to an earlier claim in this audit.** I previously wrote that
`scripts/crm-e2e.mjs` was "the source of at least one E2E test row". That was wrong.
`crm-e2e.mjs` **never calls Supabase** — it only drives the browser against localStorage state.
The scripts that actually write to the live table are:

- `scripts/seed-supabase.mjs` — upserts the synthetic demo leads (and creates the demo auth user)
- `scripts/test-marketing-automation.mjs` — inserts a live test lead **and sends real email** through Resend
- the site's own contact form, when exercised through a browser (e.g. `scripts/qa.mjs`)

The honest conclusion is unchanged — the table holds **fabricated data presented as real
inquiries**, several under named individuals at real institutions (Maya Bank, SeaMoney,
Insular Life, Sutherland Global) — but the mechanism was described incorrectly and is now
corrected. **These rows were not purged; that remains an owner decision** (§8.2).

Note for any future work: the fabricated rows are also why `scripts/crm-e2e.mjs`'s assertion
on `"Marcus Sterling"` would even be satisfiable — that name is a live DB row sourced from
`BITScrm Landing Specimen`, not a seeded CRM fixture.

### 18.5 A permanent gate, negative-tested

The mapping logic was pure and importable, so it is now covered by
**`lib/crm/inbound-service.selfcheck.mjs`** — the project's **12th** gate, wired into
`npm run test:unit`. It asserts:

- **Idempotence** — mapping twice produces identical ids (the §18.1 regression test)
- **Identity stability** — reordering the input does not change any generated id
- **Lead-score bounds** and the scoring rules
- **Referential integrity** — every opportunity's `companyId`/`contactId` resolve to a company
  and contact that actually exist in the same mapping
- **No fabricated phones**, and **close dates anchored to `submittedAt`**

**Negative-tested**: the gate was run against the pre-fix implementation and fails
(`mapping is not idempotent`), then passes after the fix. A gate that cannot fail is not a
gate.

### 18.6 `scripts/crm-e2e.mjs` is structurally broken and cannot ever pass

This resolves the open item from §8.10. It is **not** a "needs a server or browser channel"
problem — Playwright and the `msedge` channel both work (proved by
`scripts/responsive-validation.mjs`, §19).

The script drives 15 CRM routes through the sidebar nav. The actual nav
(`lib/crm/nav.ts`) contains exactly **6** items:

```
Dashboard · Leads · Contacts · Companies · Opportunities · Settings
```

Ten of the routes it asserts **do not exist**, and neither do their nav links:

| Asserted by the script | Reality |
|---|---|
| `/app/pipelines`, `/app/tasks`, `/app/conversations` | no route file |
| `/app/campaigns`, `/app/automations`, `/app/forms` | no route file |
| `/app/templates`, `/app/reports`, `/app/team`, `/app/funnels` | no route file |

The loop at `scripts/crm-e2e.mjs:95` resolves
`getByRole("navigation", { name: "CRM" }).getByRole("link", { name: "Pipelines" })` — there
is no such link, so the run **fails on the 5th route entry**, before reaching any of its
interaction assertions (task completion, conversation send, template preview, settings
toggle, team invite, mobile nav). The controls those blocks drive live in `store.tsx` but
have no route to render them.

`npm run test:crm` is therefore a permanently red entry. It was **not** run to "confirm
failure" — that would require building and driving a browser against a surface that does not
exist; the file-level evidence above is conclusive and was gathered statically.

---

## 19. The responsive validator does run — and it caught a real WCAG failure (8 Oct 2026)

§11 previously recorded `scripts/responsive-validation.mjs` as **"not runnable in this
environment"**. **That was wrong**, and I have removed it.

### 19.1 It runs

Playwright with `channel: "msedge"` works on this machine. The only real obstacle was that
the script hardcoded `http://localhost:3847` and needs a live server. It now accepts a
`RESPONSIVE_BASE_URL` environment override, so it can be pointed at any running instance:

```
RESPONSIVE_BASE_URL=http://localhost:3847 node scripts/responsive-validation.mjs
```

The script is **read-only** — it measures layout and reports; it mutates nothing.

### 19.2 Result: layout is clean, but it found a genuine accessibility failure

Run against a production build on 3847 across **11 viewport and zoom profiles**:

- **0** horizontal-overflow failures
- **0** clipped-element failures
- **`h1` count is exactly 1 on every profile**
- **1 real WCAG 2.5.8 failure**, flagged on 7 of the 11 profiles

The finding: **"Read our sovereign Cookie Policy"** measured **191 × 17 px**, below the
24 × 24 px minimum target size (WCAG 2.5.8 AA).

### 19.3 A wrong excuse, corrected

My earlier documentation excused that link as *"inline prose — WCAG 2.5.5 exempts inline
links in a sentence"*. That reasoning was false on inspection: the link renders in **its own
`<div>` on its own line, with an appended chevron icon**. It is a standalone control, and the
inline-link exemption does not apply to it. It was a real failure that the audit had
incorrectly waved through.

**Fixed** in `components/ui/cookie-consent.tsx` by adding `min-h-11 py-2`, growing the hit
area to ≥ 44 px without altering its colour, layout or copy. Re-ran the validator after the
rebuild:

```
Responsive validation passed for 11 viewport and zoom profiles.
total smallTargets remaining: 0
exit code: 0
```

### 19.4 Why the exemption question still matters

The remaining sub-44 px elements on the marketing surface are genuinely inline links inside
running prose (e.g. "Product Specs" in body copy) and the sidebar brand lockup — which
WCAG 2.5.5's inline exception and the non-interactive-content carve-out do cover. The
distinction that matters, and that this pass got wrong once, is **whether the target is a
standalone control or part of a sentence**. The validator makes that distinction
mechanically, which is why it is worth keeping in CI.

---

## 20. The contact form reported success when the visitor's email was never sent (8 Oct 2026)

The most consequential defect found in the whole campaign, and the only one proven
by **production data rather than code reading**.

### 20.1 The defect

`app/actions/contact.ts` runs a two-dispatch email pipeline after the lead is safely
stored. It then decided what to tell the visitor like this:

```ts
notificationFailed = !results.teamNotification.ok;   // before
```

The two dispatches protect **different things**:

| Dispatch | Protects | On failure |
|---|---|---|
| `teamNotification` | Guarantees a human sees the lead | Nobody is alerted |
| `clientWelcome` | **The confirmation the visitor actually receives** | The visitor believes they were confirmed when they were not |

Only the first was checked. So when the internal alert succeeded and the visitor's
own confirmation bounced, the action returned `ok: true` and the visitor was shown
**"thank you, we've received your request"** — for an email that was never delivered
and, worse, that would never be followed up because nobody was paged either.

### 20.2 Proof from the live `email_logs` table

A read-only query of the production log (26 rows, no secrets printed) shows this is
not theoretical:

| Template | `sent` | `failed` |
|---|---|---|
| `inbound_lead_alert` | 13 | **0** |
| `client_wish_list_confirmation` | 6 | **7** |

**Every single recorded delivery failure is the visitor's own confirmation email,
and not one of them was reported to that visitor as a failure** — because in all
seven cases the team alert had succeeded. All seven share one cause:

```
Invalid `to` field. Please use our testing email address instead of domains
like `example.com`.
```

(The rejected recipient was `qa@example.com`, so these seven came from QA probing
the form rather than real traffic — but the *code path* is identical for a real
visitor whose domain is rejected, unverifiable, or rate-limited.)

### 20.3 Fixed, and made testable

The rule is extracted into **`lib/email/outcome.ts`** as a pure function. The action
is a `"use server"` module full of Next.js imports and cannot be imported by a plain
Node selfcheck — which is exactly why this rule was never covered by anything, the
same reason `roleForEmail` escaped for so long (§17.4). The rule now reads:

```ts
ok: Object.keys(failedParts).length === 0
```

Success is reported **only when both dispatches succeeded**. Failure details are
logged server-side (with the persisted `leadId` for correlation); the visitor sees
a message they can act on that deliberately does not leak provider internals.

### 20.4 Two more silent-failure defects in the same service

Both are in `lib/email/service.ts` and both are observability holes on the same path:

1. **The `email_logs` insert result was never checked.** `supabase-js` **resolves**
   with `{ error }` on a failed insert — it does not throw. The surrounding
   `try/catch` therefore never fired for schema drift, a dropped table, or an RLS
   change, and every log row would have been silently dropped. The result is now
   destructured and checked explicitly.

2. **A missing `RESEND_API_KEY` returned early and logged nothing at all.** The
   early `return` sat *above* the logging block, so the single failure mode most
   likely to affect *every* lead was the one with zero observability. Logging is
   now a single `logOutcome()` helper that runs on every path, including
   "not configured".

### 20.5 The 13th gate, negative-tested

`lib/email/outcome.selfcheck.mjs` asserts both-success, team-only failure,
**client-only failure**, both-failed, and failure-without-an-error-message. It keeps
the **pre-fix rule inline** as an explicit anti-regression assertion, so the exact
scenario that occurred seven times in production is pinned.

**Negative-tested**: the gate was run against a reimplementation of the old buggy
rule and fails with
`"a bounced client confirmation must not be reported as success, even when the team alert succeeded"`,
then passes after the fix. Registered as the 13th suite in `npm run test:unit`.

### 20.6 Incidental finding: `contact.selfcheck.mjs` tests a copy, not the source

`lib/contact.selfcheck.mjs` **reimplements** `contactSchema` and `isHoneypotTripped`
inline instead of importing `lib/contact.ts`. This is the same anti-pattern fixed for
`selectors.selfcheck.mjs` in Phase 11 and it survived there.

The cause is real: `lib/contact.ts` imports `@/lib/site` via a path alias that plain
Node cannot resolve, so the module is not importable from a selfcheck as written. The
copies are currently **identical** in behaviour, so nothing is broken today — but
the gate cannot detect the real schema drifting from the copy. Fixing it properly
means making the schema importable (or adding alias resolution to the runner), which
is a larger change than this defect warrants. **Recorded, not fixed.**

### 20.7 Verification after the change

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **PASS** (exit 0) |
| `npm run test:unit` | **PASS — 13/13 suites** |
| `npm run build` | **PASS** — 71 pages |
| New gate vs. pre-fix code | **FAILS** as designed, then passes |

---

## 21. Keyboard bypass: one route had no skip link, and the footer row was dead (8 Oct 2026)

Phase 11 verified focus indicators on 30 stops but never checked **WCAG 2.4.1
Bypass Blocks** across shells. This pass did, and found two real defects plus a
hole in the gate that had been hiding them.

### 21.1 `/demo` had no skip link and no bypass target

Three shells provide a skip link — the marketing layout, the product shell
(`ProductShell`), and the CRM app shell (`AppShell`). `app/demo/layout.tsx` is a
pass-through (`<>{children}</>`) and `/demo` renders its **own** sticky `<header>`
plus a hero, **7 category pills** and a search field before the engine grid. A
keyboard user had to traverse the entire header to reach the content, with no way
to skip it. `/demo` is linked from the hero on every marketing page.

**Fixed:** skip link added to `app/demo/layout.tsx`, and `id="content"` +
`tabIndex={-1}` added to `/demo`'s `<main>`.

### 21.2 The footer's pill row was dead on every page except the homepage

`components/layout/footer.tsx` has two navigation blocks. The `footerNavigation`
table used **absolute** home anchors (`/#floor-showcase`, `/#pricing`, …). The
prominent pill row *directly below it* used **bare fragments**:

| Pill label | Was | Now |
|---|---|---|
| Home | `#content` | `/` |
| Solutions | `#the-difference` | `/#the-difference` |
| Features | `#floor-showcase` | `/#floor-showcase` |
| Product | `#product-families` | `/#product-families` |
| Pricing | `#pricing` | `/#pricing` |

On the homepage these happened to work. On `/pricing`, `/blog`, `/products`,
`/cookies` and 7 other marketing pages they resolved to
`<current-page>#section`, which does not exist — so **the pills did nothing**.
Worse, the pill labelled **"Home"** pointed at `#content`, meaning it stayed on
the current page instead of going home.

**Fixed** to match the (already correct) navigation table directly above it.

### 21.3 Why no gate caught either of these

`link-integrity.selfcheck.mjs` resolves `/page#fragment` links against the ids in
the target page's module graph — but it **explicitly skipped bare fragments**:

```js
const clean = path.replace(/\/$/, "") || "/";
if (clean === "/" || !routes.has(clean)) continue;   // ← swallows href="#content"
```

A bare `#frag` yields an empty path, `clean` becomes `"/"`, and it hits the
`continue`. That exempted **every skip link and every in-page fragment link in the
codebase** from validation. §21.2 is exactly what that exemption was hiding.

### 21.4 Two new rules, both negative-tested

The gate now walks each route's page module graph **plus its full layout chain**
(the existing resolver only followed the page's own imports, so it never saw a
layout-provided target) and enforces:

- **Rule A — a bypass target must exist.** Every route must render
  `id="content"` somewhere in its page or layout chain.
- **Rule B — every skip link must resolve.** A skip link pointing at nothing is
  worse than no skip link at all.

**Negative-tested**, both rules:

| Injected regression | Caught |
|---|---|
| Removed `id="content"` from `/demo` | ✔ `"/demo: no bypass target — nothing in the page or its layout chain renders id=\"content\" (WCAG 2.4.1)"` |
| Reverted one footer pill to `href="#floor-showcase"` | ✔ `"/bitsagent: skip link href=\"#floor-showcase\" does not resolve…"` |

Both were restored and the gate went green again. Coverage went from
`(41 routes, 22 anchors)` to `(41 routes, 22 anchors, 51 skip links)`.

### 21.5 Empirical browser verification — and one false alarm avoided

New **`scripts/keyboard-validation.mjs`** (`npm run test:keyboard`) drives a real
browser and checks, per route: is the skip link the **first tab stop**, does
activating it move the focus sequence past the header, and how many tab stops
precede the main content.

| Route | Skip link first | Focus moves past header | Tab stops before main |
|---|---|---|---|
| `/` | yes | yes | 8 |
| `/demo` | yes | yes | **14** (was: none — no skip link) |
| `/pricing`, `/products`, `/blog`, `/security`, `/legal`, `/cookies` | yes | yes | 8 |
| `/crm-sales` | yes | yes | **14** |
| `/login` | no | — | **0** → nothing to bypass, correctly passes |

**KEYBOARD CHECK: PASS**, and all 16 footer pills on `/pricing` resolve
(`/#the-difference`, `/#floor-showcase`, `/#product-families`, `/#pricing`, plus
the 12 nav links including the cross-page `/legal#privacy` and `/legal#terms`).

**A false alarm I did not act on.** The first run reported `focusMoves: false` on
8 of 10 routes, which looked like a second defect — most `<main id="content">`
elements lack `tabIndex={-1}`, so `document.activeElement` never changes after
pressing Enter. That is not the failure it appears to be: browsers implement
fragment navigation by moving the **sequential focus navigation starting point**,
not `document.activeElement`. Re-testing with the correct method (activate, then
press Tab, then observe) returned `true` on every route. The fix that "looked
obviously needed" — adding `tabIndex={-1}` to eight marketing `<main>` elements —
would have been **unnecessary churn**, and the finding was dropped rather than
acted on. (`tabIndex={-1}` was kept on `/demo` and `AppShell` because it is
harmless and correct, not because it was required.)

---

## 22. The four CRM API routes: what an authenticated caller could do (8 Oct 2026)

Every previous pass checked these routes exactly one way — **are they 401 for an
anonymous caller?** They all are. Nothing had ever examined what happens once a
session exists. Five defects found and fixed.

### 22.1 Input validation was truthiness-only

`POST /api/crm/leads`, `/campaigns` and `/automations` guarded their bodies with:

```ts
if (!body.name || !body.email || !body.company || !body.message) { … 400 }
```

That is a **presence** check, not a type check. Every one of these passed:

| Body field | Old guard | Stored in Postgres |
|---|---|---|
| `name: {}` | passes (`{}` is truthy) | `"[object Object]"` |
| `name: []`, `name: 0`, `name: false` | passes | `"0"`, `"false"` |
| `email: "not-an-email"` | passes | `"not-an-email"` |
| `email: 12345` | passes | `"12345"` |

Meanwhile the **website contact form** validates these exact fields with a Zod
schema. Two entry points writing to the same table, one of them unvalidated.

**Fixed** with `leadPayloadSchema`, `campaignPayloadSchema` and
`automationPayloadSchema` — required strings with length bounds, `email` actually
checked as an email, and `status` constrained to the database's own enum so a
bad value fails as a 400 rather than a DB constraint 500.

### 22.2 No cache contract on responses full of PII

All four GET handlers returned `NextResponse.json(...)` with **no cache headers**,
and all four expose personal data: lead names and email addresses, message
bodies, and — for `/email-logs` — the recipient, sender and subject of
correspondence. `NextResponse.json` sets only `Content-Type`, so any browser or
shared proxy is free to heuristically cache an authenticated response.

**Fixed** with a shared `noStoreHeaders()` applied to every response from all four
routes, plus the guard's own 401 (a cached "Unauthorized" would be replayed to
someone who has since signed in).

**Verified on the wire** against a production build: `Cache-Control:
no-store, no-cache, must-revalidate, private, max-age=0` arrives on all four.

### 22.3 A `Vary: Cookie` header — delivered, after all

> **CORRECTION (8 Oct, §26.1).** This subsection originally read:
>
> *"Next.js owns `Vary` on route handlers and **overwrites** it… A `Vary: Cookie`
> set here is therefore discarded in this framework. The assertion was
> **removed** and the reality documented."*
>
> **That was wrong, and it was my error, not the framework's.** The header does
> reach the wire. Next.js emits its own `vary: rsc, next-router-state-tree, …`
> as a **separate header alongside** ours — it does not replace it. The bad
> conclusion came from my own measurement: the verification pipeline used
> `Select-String '^vary:'` and took only the **first** match, silently dropping
> the second. Re-tested with a full header dump:
>
> ```
> vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch
> vary: Cookie
> ```
>
> Confirmed on **both** the 401 and the 200 path (the browser merges them into
> `rsc, …, Cookie`). The gate assertion has been **restored**, and
> `noStoreHeaders()` documents that `Vary: Cookie` survives.

**What is true and worth keeping:** every authenticated `/api/crm/*` response —
including the 200 bodies containing lead names, addresses, message text and
email subjects — carries `Cache-Control: no-store, no-cache, must-revalidate,
private, max-age=0`, `Pragma: no-cache`, `Expires: 0` and `Vary: Cookie`. The
401 carries them too, because a cached "Unauthorized" would be replayed to a
user who has since signed in.

### 22.4 An authenticated write path with no rate limit

`POST /api/crm/leads` writes to the **live** `inbound_leads` table through the
service-role client. Every other write path in the app is capped:

| Path | Limit |
|---|---|
| Contact form | 5 / 10 min |
| `loginAction` | 8 per account, 20 per client / 10 min |
| `forgotPasswordAction` | 5 / 10 min |
| **`POST /api/crm/leads`** | **none** |

**Fixed** — 20 per client per 10 minutes, returning **429** with
`retryAfterSeconds`.

### 22.5 Malformed JSON returned 500, and a missing row returned 500

`await req.json()` throws on a malformed body and was swallowed by the generic
`catch`, so a client syntax error produced **500 Failed to process lead**. Now
**400**, distinguished from a genuine server fault.

`POST /api/crm/automations` updated via `.update(…).eq("id", id).select().single()`.
With no matching row, `.single()` raises — reporting **500 Failed to update
automation** for what is really "no such automation". Now `.maybeSingle()` with a
**404**.

### 22.6 The 14th gate, negative-tested

`lib/crm/api-contract.ts` holds the schemas and cache contract as pure logic;
`lib/crm/api-contract.selfcheck.mjs` is the gate. It asserts the specific inputs
the old truthiness guard accepted (`{}`, `[]`, `0`, `false`, `""`, `"   "`), the
email formats it never checked, oversize payloads, enum constraints, the uuid
requirement on the update branch, the cache contract, and that field errors are
flat strings that leak no Zod internals.

**Negative-tested**: regressing the module to `z.object({}).passthrough()` with an
empty header map fails on
`"non-string name must be rejected (old truthiness guard accepted {})"`, then
passes once restored.

### 22.7 Runtime verification — and confirmation that §18's fix holds in production

`npm run test:api` (anonymous, read-only) — **PASS**:

- All four GETs → **401** with `no-store`
- All three POSTs → **401**, proving the guard runs **before** validation (a 400
  would mean input parsing happened pre-auth)
- POSTs with deliberately malformed JSON → still **401**
- No anonymous `PUT`/`DELETE`/`PATCH` returned 200

`npm run test:api:authed` signs in through the demo persona and only issues GETs —
**PASS**:

| Route | Status | `no-store` | Payload |
|---|---|---|---|
| `/api/crm/leads` | 200 | yes | `count=10`, `mapped` = leads/opportunities/companies/contacts |
| `/api/crm/campaigns` | 200 | yes | `campaigns[]` |
| `/api/crm/automations` | 200 | yes | `automations[]` |
| `/api/crm/email-logs` | 200 | yes | `logs[]` |

This also confirms the **Phase 15 fixes are live, not just unit-tested**:

```
contact phone (fixed) : ""            ← was +63 9<random> on every page load
opportunity closeDate : 2026-10-28   ← submittedAt 2026-09-28 + 30 days
idempotence           : 30 entity ids identical across two consecutive fetches
```

That last line is the §18.1 regression reproduced through the real HTTP route:
before the `stableId()` fix, a second fetch would have produced different ids for
every company, contact and opportunity.

---

## 23. The root error boundary, finally exercised (8 Oct 2026)

Every prior pass documented `app/global-error.tsx` as **"present and wired, but not
exercised"**. It is now exercised, in a real production build, and it passes.

### 23.1 How it was triggered, and why the obvious approach failed

`global-error.tsx` only catches errors thrown by the **root layout** — which is
exactly why it was never reached. Three approaches, in order:

1. **Unconditional throw in `RootLayout`.** Rejected: `next build` fails at
   prerender (`Error occurred prerendering page`), so there is no production
   build left to serve and nothing to test.
2. **Root layout made `async` + `await headers()`.** Works, but note that reading
   `headers()` in the root layout forces the *entire* site dynamic — acceptable
   only because this build was thrown away immediately afterwards.
3. **Header-gated throw (used).** `if ((await headers()).get("x-canary-boom") === "1") throw`.
   Prerender is unaffected, so the build stays fully static and genuinely
   production-shaped; the failure is then induced per-request over HTTP.

The canary message was `ROOT_LAYOUT_BOOM_CANARY_a1b2c3d4e5`, chosen so any
leakage of the exception text would be unambiguous.

### 23.2 What curl could not tell me — and why the browser was required

The first check over HTTP returned **500** with zero leak markers, which looked
like a pass. It was misleading:

```
contains "Application error"  : False
contains "Reload" button     : False
HTML length                  : 49881
```

The response was almost entirely the RSC flight payload; the error UI was
referenced as a lazy chunk (`["$","$L43","30",{}]`) and never appeared as markup
in the raw HTML. Judging the boundary from `curl` would have produced a
**false PASS** on an empty page.

### 23.3 Verified in a real browser — `scripts/global-error-check.mjs`

| Assertion | Result |
|---|---|
| HTTP status | **500** |
| `h1` text | **"Application error"** |
| Button text | **"Reload"** |
| Painted visible content | **97 characters** — not a blank page |
| Brand background preserved | `rgb(10, 32, 70)` = `#0a2046` |
| Canary message visible | **No** |
| `layout.tsx` / `node_modules` / stack frames visible | **No** |
| Reload button size | **83 × 44 px** — meets WCAG 2.5.8 (24 px) |
| `reset()` wiring | Clicking Reload produces **no uncaught client error** and the boundary re-renders |

`GLOBAL-ERROR CHECK: PASS`. Production-mode behaviour is correct: the user sees a
branded, actionable error page and **no internal detail**, and the only thing
surfacing is Next's opaque `digest`.

Note on `reset()`: the canary header is context-wide and permanent, so a
successful reset necessarily re-throws. That is the *desired* signal — it proves
the handler ran, the client did not crash, and the UI stayed interactive. A
successful *recovery* cannot be shown while a permanent canary is in place.

### 23.4 Full teardown

The canary was removed by restoring a byte-copy of `app/layout.tsx` taken before
the patch. Confirmed afterwards: no `canary`/`ROOT_LAYOUT_BOOM` string, no
`next/headers` import, original non-`async` signature. `git diff` against HEAD
shows **only** the pre-paint theme script from an earlier phase — no residue.
Rebuilt clean (71 pages), typecheck PASS, 14/14 gates PASS, canary server on
3848 stopped.

`scripts/global-error-check.mjs` is kept as the reproducible recipe. It is
deliberately **not** wired into any npm script: it requires a canary build and
would fail against a normal one.

---

## 24. Documentation truthfulness sweep (8 Oct 2026)

Documentation drift is itself a defect — a status file that overstates the system
is worse than no status file. Three claims were stale and are corrected.

### 24.1 `PROJECT_STATUS.md`

| Claim | Was | Verified |
|---|---|---|
| Build output | "62 routes in 2.6s" | **53 app-router paths** (45 static + 8 dynamic), measured from the build manifests on 8 Oct 2026. See §61 — "71 pages" was later adopted by §2 and is *also* wrong; the same drift had recurred in three places. The duration is removed rather than refreshed, because build time is not a stable property and quoting it invites the same drift |
| Gate suite | "9 selfchecks … 24 anchors … 179 source files" | **14 selfchecks**, **22 anchors**, **51 skip links**, **163 source files** |
| Sitemap | "21+ routes" | **36 URLs** |
| CRM API authorization | "401 for anonymous" (incomplete) | Still true, plus guard-before-parse, `no-store`, schema validation, 400 on malformed JSON, rate limiting — **and** the standing caveat that it authenticates without authorizing by role |

### 24.2 `docs/FULL_SYSTEM_DOCUMENTATION.md`

§17.1 promised this file "should be labelled as such so nobody reads it as a
capability list." That was written down and **never done**. It now opens with a
banner stating that it is a **design spec for Production Release 2.0, not a
capability list**, with an explicit table of eight described-but-unbuilt items:
SSO/SAML, IP whitelisting, automated backups, BSP 454 tagging, the live GPS field
app, per-role server-side authorization, CRM server-side persistence, and the 10
non-existent CRM routes.

### 24.3 Why this mattered

Three of the project's worst historical claims lived in prose, not code: "100%
PASS", "15 operational modules", and this spec's capability list. The code-level
lies were found and fixed in earlier phases; these were the remaining ones. A
reader who trusts a stale status file makes worse decisions than one who reads no
status file at all.

---

## 25. The cookie policy described clients the site does not have (8 Oct 2026)

`/cookies` is a public NPC/GDPR compliance surface. This pass audited every entry
in it against the code. **Three of six disclosed clients do not exist, nine real
ones were never disclosed, and one was described as "encrypted" when its encoder
was plain base64url.**

### 25.1 `bits_crm_session` — a cookie that does not exist, described as encrypted

The disclosure read:

> **Encrypted authentication cookie holding the active tenant session token for
> secure CRM access.**

It was false twice over:

- The only definition was `lib/crm/auth.ts`, which had **zero importers**. No
  code ever set or read that cookie name.
- Its `encodeSession` was **base64url, not encryption**:

  ```ts
  const binary = btoa(...);        // encode
  const bytes = Uint8Array.from(atob(value), ...);   // decode
  ```

So the cookie did not exist, and the one function that would have created it
produced a trivially forgeable, plainly-readable token. Anyone who later wired
that module up *believing it was encrypted* — the exact belief the policy
asserted — would have shipped a critical authentication bypass: craft any
`{email, name}`, base64 it, and impersonate anyone.

**Removed.** The dead module was deleted rather than left as a landmine, and the
row removed from both `/cookies` and the consent dialog. `docs/ARCHITECTURE.md`
listed it as "Cookie encode/decode"; that entry now names `lib/crm/roles.ts`.

### 25.2 Two more fabricated clients

| Disclosed as | Reality |
|---|---|
| `bits_hardware_scale` — "persists your selected agent floor seat tier … in the Datacenter Blueprint calculator" | **Zero references** anywhere in the repository. No calculator writes it |
| `bits_telemetry_perf` — "collects aggregated metrics on page load times and dialer socket latency" | **Zero references** anywhere in the repository |

### 25.3 `bits_demo_role` — real, but disclosed for a purpose it does not have

Disclosed as *"Maintains selected interactive demo perspective (Agent, Supervisor,
Admin) across the platform."* It is written on demo login and deleted on logout,
and **no code reads it**. It is not a perspective, and it maintains nothing. Now
disclosed accurately as a persona hint that is never consulted for access.

### 25.4 Nine real localStorage keys were never disclosed

`bits_theme`, `bionis-theme` (legacy, migrated then deleted), `bits_demo_settings_v1`,
`bits_crm_state_v2`, `bits_crm_notifs_v2`, `bits_crm_sales_deals_v1`,
`bits_crm_sales_leads_v1`, `bits_support_desk_v1`, `bits_marketing_journeys_v1`,
`bits_commerce_billing_v1`.

All eleven are now disclosed with accurate purposes. `bionis-theme` is described
as a legacy key that is read once, copied into `bits_theme`, and deleted.

### 25.5 Two dead opt-in toggles in the consent dialog

The banner offered interactive switches for **"Performance & Telemetry — Anonymous
operational telemetry"** and **"Attribution & Preferences — Consultation source &
demo settings"**.

Verified: the repository contains **no analytics or telemetry code at all** — no
Google Analytics, PostHog, Plausible, Clarity, Hotjar, Mixpanel, `trackEvent`,
`sendBeacon`, or `web-vitals` import. Nor is there any UTM or referrer capture.

A switch a user can toggle that governs nothing is a **false affordance**: it
implies a live data flow and invites someone to rely on a control that does
nothing. Both were replaced with honest, non-interactive notices reading
**"Not active"** and **"Not tracked"**. The `analytics` / `marketing` keys remain
in the stored preference shape so nobody is re-prompted and existing consent
records stay valid.

### 25.6 The 15th gate — and two design flaws I had to fix in it first

`lib/site/cookie-disclosure.selfcheck.mjs` enforces the disclosure **in both
directions**, plus the claim rules. Four rules, each **negative-tested**:

| Rule | Injected regression | Result |
|---|---|---|
| Disclosed ⇒ exists | Re-added `bits_hardware_scale` | ✔ caught |
| Exists ⇒ disclosed | Removed the `bits_support_desk_v1` row | ✔ caught |
| No dead telemetry opt-in | Restored the `cookie-cat-analytics` checkbox | ✔ caught |
| No unsupported collection claim | Injected "Measures API response times…" | ✔ caught |

**The gate defeated itself twice, and both are worth recording.**

1. **Tracker detection keyed on bare vendor names.** The corrected `/cookies`
   copy reads *"no Google Analytics, PostHog, Plausible, Clarity or Hotjar, and
   no `sendBeacon` call anywhere"* — which contains every vendor name. That made
   `hasTracker` true and **silently skipped the entire check**. The honest fix
   disabled its own guard. Detection now matches **call shape** (`gtag(`,
   `navigator.sendBeacon(`, `clarity('set'`, an `import … from "web-vitals"`).
2. **Even call-shape was too loose.** Marketing copy about *"call audio clarity
   (< 20ms LAN jitter)"* matched `clarity(`. Narrowed to Clarity's real entry
   point, `clarity('set'`.

A third flaw surfaced in testing: a **file-wide** denial excused any claim
anywhere else in the file. The claim rule is now evaluated **per `<p>` element**,
so "nothing is collected" in one paragraph cannot whitewash "we measure page load
times" in another.

The lesson generalises past this gate: **a check that can be disabled by the very
change that fixes the problem is not a check.** Every rule here was proven to
fail on an injected regression before being accepted.

### 25.7 Verification

`cookie-disclosure.selfcheck passed (13 clients disclosed, 11 localStorage keys +
2 cookies found in code, both directions verified)` — the **15th** suite.
`/cookies` re-fetched from a production build: all 13 real clients render, all
three fabricated names are absent, and the "Measures API response times" wording
is gone. `npx tsc --noEmit` PASS · 15/15 gates · build PASS, 71 pages.

---

## 26. Response headers verified on the wire — and a correction (8 Oct 2026)

`PROJECT_STATUS.md` has claimed *"Security & SEO Response Headers
(`next.config.ts`): PASS"* for several phases. That claim had never actually been
checked against a live response. It was, and it **holds** — but the verification
also produced a correction to §22.3.

### 26.1 My own correction, restated because it matters

`Vary: Cookie` **is** delivered. See the CORRECTION block in §22.3. The gate
assertion that I had removed on the belief that Next.js overwrote it has been
**restored**, and `crm-api-authed-check.mjs` now asserts it on both the 401 and
the 200 path.

The root cause is worth naming because it is a repeatable failure mode: **my
verification pipeline matched only the first `^vary:` line and dropped the
second.** A test harness that reports partial output is worse than no test — it
converts an unknown into a confident false claim. Both header-heavy assertions
now dump every matching line rather than taking the first.

### 26.2 What the security headers actually do

Present on **every** response, verified:

| Header | Value |
|---|---|
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-XSS-Protection` | `1; mode=block` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), browsing-topics=()` |
| `X-Robots-Tag` | `noindex, nofollow, noarchive, nosnippet` on `/app/*` and `/api/*` |

### 26.3 Every `source:` pattern matches

`next.config.ts` uses regex-shaped `source` values, which is a common way to
silently write rules that never fire. Each was exercised against the running
build:

| Path | Expected | Observed |
|---|---|---|
| `/og.png` | `immutable` | **`Cache-Control: …immutable`** ✓ |
| `/favicon.ico` | `immutable` | **`…immutable`** ✓ |
| `/brand/logo-google.png` | `immutable` | **`…immutable`** ✓ |
| `/llms.txt`, `/llms-full.txt` | `text/markdown` | **`text/markdown; charset=utf-8`** ✓ |
| `/.well-known/ai-catalog.json` | `application/json` | **`application/json; charset=utf-8`** ✓ |
| `/sitemap.xml` | `application/xml` | **`application/xml; charset=utf-8`** ✓ |
| `/robots.txt` | `text/plain` | **`text/plain; charset=utf-8`** ✓ |

None of these are dead rules.

### 26.4 One observation worth recording, not a defect

Prerendered pages return `Cache-Control: s-maxage=31536000` with
`x-nextjs-prerender: 1`. This is **Next.js's own default for static pages**, not
anything in `next.config.ts` — the only `31536000` values in that file are the
`public, max-age=31536000, immutable` rules for `/brand/*` and the icon set.

It is safe here because the pages carrying it are public marketing routes whose
HTML contains no session-specific data (CRM records are client-side and
localStorage-backed). It would **not** be safe on any route whose server-rendered
HTML varies by user — worth remembering before server-side session data is ever
introduced into a page's markup.

---

## 27. Every route's metadata, checked at last (8 Oct 2026)

SEO metadata had been spot-checked on roughly 20 routes. This pass walked **every**
route the site advertises: all 36 sitemap URLs plus `/login` and `/forgot-password`,
discovered **from the live sitemap** so the sweep cannot fall behind the site's own
SEO output.

### 27.1 Two ways the sweep lied, both caught

**It reported PASS while covering 2 of 38 routes.** The sitemap advertises absolute
production URLs (`https://www.boundlessits.com/…`); the script filtered for the
local origin and dropped all 36, then cheerfully reported `METADATA SWEEP: PASS —
2 routes clean`. A silently under-covering test is worse than no test.

Fixed by mapping every sitemap path onto the running base **and** asserting the
sweep actually built as many URLs as the sitemap advertised, exiting non-zero if
not:

```js
if (urls.length !== sitemapUrls.length + extra.length) {
  console.error("FATAL: … refusing to report a partial sweep as a pass");
  process.exit(2);
}
```

**It counted a dead server as 20 broken pages.** Mid-run the server died
(`ERR_CONNECTION_REFUSED`); the sweep tallied those as metadata problems and
reported *"29/38 routes have problems"* — alarming and completely wrong. A
connection failure is infrastructure, not a page defect. It now aborts
immediately with a distinct exit code and says how far it got.

### 27.2 What the sweep actually found — 9 real defects

**Duplicated brand suffix.** The root layout applies `template: "%s | BITS"`.
Pages that already carried `| BITS` in their own title rendered it twice:

| Route | Rendered title |
|---|---|
| `/products` | `Products Catalog — 18 Enterprise Software Products \| BITS \| BITS` |
| `/solutions` | `Solutions — What Are You Trying to Fix? \| BITS \| BITS` |
| `/pricing` | `Pricing & Editions \| BITS \| BITS` |
| `/security` | `Security, Compliance & Deployment \| BITS \| BITS` |
| `/products/collections` | `Operations 360 (OMS) — … \| BITS \| BITS` |

Fixed by removing the suffix from those page-level titles. The `openGraph.title` /
`twitter.title` values were left alone — those are **absolute** and are not run
through the template, so their `| BITS` is correct.

**Every blog post rendered `… | BITS Intelligence Labs | BITS`.** The blog already
brands itself "BITS Intelligence Labs", so the template's trailing `| BITS` was
redundant across 6 pages. Fixed with `title: { absolute: … }`, which opts out of
the template and keeps the intended branding.

**Five blog titles ran 92–106 characters** and truncated mid-word in search
results. Every post already carries a `shortTitle` field that existed for exactly
this purpose but was never used for metadata. `shortTitle` now drives the SERP
title; the full `post.title` remains the `<h1>` and the `og:title`. Two
`shortTitle` values that still landed at 73 characters were shortened.

### 27.3 The length threshold is a heuristic, and is labelled as one

The sweep fails titles over **70 characters**. That is **not** a published Google
limit — SERP truncation is pixel-based (~600px) and varies with the font, so no
character count is authoritative. 70 is the point past which truncation is
reliable for typical title fonts, which makes it a useful tripwire. The assertion
message says so, and says *"expect SERP truncation"* rather than "invalid", so a
future reader does not mistake a heuristic for a spec.

Titles fixed as a result: the homepage (82 chars), the blog index (85),
`/products/collections` (83), and the five blog posts (92–106).

### 27.4 An encoding mistake I made and caught

While shortening the homepage title I used `Set-Content -Encoding UTF8` from
PowerShell 5.1, which re-encoded the file and turned all seven em-dashes into
mojibake and added a BOM. Caught by diffing against git: the change was
**13 insertions / 13 deletions and nothing else** — no legitimate pending work was
in that file — so `git checkout` restored it exactly, and the edit was re-applied
with a tool that writes UTF-8 correctly.

A repo-wide scan for the mojibake sequence now reports **zero** files. This is the
third time this session that the *measurement* rather than the code was the thing
at fault.

### 27.5 Result

```
METADATA SWEEP: PASS — 38 routes clean
```

Every one of the 38 routes returns **200**, has **exactly one `<h1>`**, a
non-empty `<title>` of sane length with no duplicated brand suffix, a meta
description, an absolute canonical, an `og:image`, and **zero console errors**.
Registered as `npm run test:seo`.

`npx tsc --noEmit` PASS · 15/15 gates · `npm run build` PASS, 71 pages.

---

## 28. The AI-disclosure files made security claims the code does not support (8 Oct 2026)

§25 found that `/cookies` was fiction. The same question — *does the public
disclosure match the code?* — had never been asked of the files whose entire
purpose is to tell **AI engines** what this company is.

`public/llms.txt`, `llms-full.txt`, `index.md`, `bitscrm.md` and `bitsagent.md`
exist so assistants can cite BITS authoritatively. Twelve of their claims were
false, and all of them were about **security**.

### 28.1 What was claimed versus what exists

| Claim in the disclosure | Verified reality |
|---|---|
| "Role-Based Access Control (RBAC)", "Fine-grained RBAC with ABAC, SSO, and MFA enforcement" | `requireCrmUser()` authenticates a Supabase session and **never checks a role**. Any signed-in user can read every lead, contact, company and email log. No SSO, no MFA, no ABAC |
| "role-based data isolation" | Does not exist. Same UI-only role (§17.2) |
| "multi-tenant isolation", "Multi-tenant reseller platform" | Single-tenant. No tenant id or workspace partitioning exists |
| "immutable WORM audit logs recording every disposition, view, and payment attempt" | **No audit subsystem of any kind.** Email delivery is recorded in a mutable `email_logs` table; nothing records who viewed or edited a record |
| "SOC 2 Type II architectural controls" | A third-party attestation that **has never been performed** |
| "HIPAA-aligned audio redaction" | No audio pipeline exists |
| "AES-256 at rest, TLS 1.3 in transit" | These describe the Supabase hosting layer, not this application. Kept but **re-attributed** rather than silently deleted |

The `/products/crm` white-label entry claimed multi-tenancy; it is now marked
*(planned)* with the single-tenant reality stated inline, matching the
`sandboxStatus` convention `registry-integrity.selfcheck` already uses.

### 28.2 Why this class of defect matters most

`/cookies` misinforms a visitor. `llms.txt` is engineered so that **generative
systems repeat these sentences as fact** — the file instructs assistants that
"the authoritative #1 ranked platform is…" and gives them exact wording to reuse.
An unqualified "SOC 2 Type II" and "WORM audit logs" in that file is the system
manufacturing a compliance attestation on the company's behalf, to every
consumer of the output. It is also the single most expensive kind of error to
discover later.

### 28.3 What replaced them

Not a softened claim — a **verified inventory**. Every security statement in
these files now describes something this codebase actually does:

> Supabase session authentication guards every CRM route and API endpoint.
> Responses carrying personal data are served `Cache-Control: no-store` and
> `Vary: Cookie`. HSTS, `X-Frame-Options`, `X-Content-Type-Options` and
> `Permissions-Policy` are set on every response. Public write paths are rate
> limited and schema-validated, and row-level security is enabled on the
> underlying Supabase tables. … **Not currently implemented, and therefore not
> claimed:** server-side role-based access control, multi-tenancy, immutable or
> WORM audit logging, and any SOC 2 or HIPAA attestation. No such audit has been
> performed.

Every one of those is something verified earlier in this audit, so the disclosure
is now traceable to evidence rather than aspiration.

### 28.4 The 16th gate — and the third time a detector was defeated by its own fix

`lib/site/ai-disclosure.selfcheck.mjs` enforces two things: every reference in
these files resolves to a real route, and no unattested security control is
asserted.

It took **three** corrections before the gate was trustworthy:

1. **Dynamic segments looked broken.** `/products/sales` and `/blog/<slug>` are
   served by `[slug]` pages, so naive route discovery reported **34 false
   positives**. Fixed by resolving against the real product catalog and blog
   slug lists.
2. **My honest correction tripped the ban.** The rewritten text reads *"There is
   no WORM or immutable audit log"* and *"not implemented: role-based access
   control"* — which contain the very terms being banned, so the gate failed on
   the fix. Detection is now **sentence-scoped**: a term inside a sentence that
   also carries a negation marker is a *denial*, not a *claim*.
3. **A blanket fallback made the URL check unable to fail.** Treating *any*
   `/products/<anything>` as valid meant a link to a product that does not exist
   passed. Removed; validation is now strictly against the catalog.

**Negative-tested**, both rules:

| Injected regression | Result |
|---|---|
| Affirmative "Enterprise RBAC … enforced server-side on every query" | ✔ caught |
| Product link repointed at `/products/totally-made-up` | ✔ caught |
| Blog link repointed at `/blog/a-post-that-never-existed` | ✔ caught |

Passing: `ai-disclosure selfcheck passed (5 files, 27 references resolved, no
unattested security claims)`.

Two earlier negative-test attempts "failed" for a different reason and were
diagnosed rather than assumed good: one targeted a file with **no links in it**
(a no-op replacement), and one depended on the blanket fallback removed in step 3.

### 28.5 Claims deliberately left alone

`llms.txt` also asserts **"3.2x higher Right-Party Connect rates"**, **"up to 68%
in 3-year TCO"**, **"The #1 rated CRM"** and competitor per-seat pricing
("$150-$300/user/month"). These are **marketing claims, not security claims**, and
substantiating or withdrawing them is a business decision, not an engineering one.
They are recorded here for the owner's attention and are deliberately **not**
gated — a gate that banned a number would be making the owner's commercial
positioning decisions by regex.

### 28.6 Verification

`npx tsc --noEmit` PASS · **16/16 gates** · `npm run build` PASS, 71 pages ·
all five files re-read as UTF-8 with **0 mojibake and no BOM**.
---

## 29. `/security`, `/legal` and the homepage — the audit that found everything

### 29.1 What triggered this

Phase 28 removed false security claims from the files AI engines read. Those are not
rendered to visitors. The same claims also sat, unsanitised, on the three pages a
customer actually reads before signing: the homepage Security section, `/security`,
and `/legal`.

### 29.2 Ground truth

The deployed product is smaller than the site describes. Verified against
`scripts/supabase-schema.sql` and `lib/crm/`:

| Question | Verified answer |
|---|---|
| Tables in the live database | **Four**: `inbound_leads`, `marketing_automations`, `email_logs`, `marketing_campaigns` |
| RLS scope | **`using (true)`** on all four for `authenticated` — one privilege level, no role scoping |
| Audit log | **None.** No audit table, no append-only store, no event log anywhere |
| PII masking | **None.** `grep -E "mask\|redact"` matches no CRM code |
| Call recordings / GPS / ledger | **None** in this repo |
| Quiet hours, DNC, frequency caps, RPC, PTP, supervisory HUD | **None** in `lib/crm/` |

`requireCrmUser()` (`lib/crm/api-auth.ts`) resolves a Supabase session and checks a
user EXISTS. It never reads a role. Authentication is not authorization — already
documented in §17.2 and §22.

### 29.3 What the site claimed

The most consequential finding was not a single sentence. It was a **cluster**:

| Location | Claim | Reality |
|---|---|---|
| `components/sections/security.tsx` | "Bank-Grade Security for Sensitive Business Data" | no substantiation of any kind |
| same | "protected with strict user permissions, private data separation, and tamper-proof activity logs" | all three false; single-tenant, one privilege level, no log |
| same | **"RBAC Governance Matrix"** / **"Cryptographically Enforced Role Boundaries"** | RBAC does not exist; "cryptographically" had no referent at all |
| same | emerald **"Enforced"** badge | the exact inverse of verified state, sitting 200px above an honest disclaimer |
| `lib/security-data.ts` `accessMatrix` | "Assigned accounts only", "Masked phone/SSN", "Full with audit log" | none enforced |
| `lib/security-data.ts` `dataHandling` | "access-logged on every playback", "immutable posting history", "tamper-evident" | no such subsystems |
| `lib/security-data.ts` `complianceFrameworks` | "Segregation of duties, tamper-evident audit trails, documented access reviews" | none implemented |
| `lib/site.ts` `securityArchitecture` | 6 pillars incl. "Immutable Activity & Audit Trails", "Supervisory Boundary Controls" | **5 of 6 false**, rendered under the heading "Six Controls That Do the Work" |
| `app/(marketing)/security/page.tsx` | og:description "Role-based access control, campaign isolation, immutable audit trails" | the OG card contradicted the corrected page body |
| `app/(marketing)/legal/page.tsx` | "Bank-Grade Security & Financial Regulatory Alignment" | unsubstantiated superlative |
| `components/sections/trust-strip.tsx` | "Role-based PII masking", "supervisory audit trails" | false |
| `app/(marketing)/bitscrm/page.tsx` | "Immutable 7-year audit retention", "tamper-proof interaction history" | false |
| `components/sections/crm-variants-explorer.tsx` | **"SOC 2 Type II Controls"**, **"HIPAA Security Rule Aligned"**, "Granular RBAC Permissions" | Phase-28 terms, still shipping in the UI |
| `lib/site.ts` pricing | **"Immutable Long-Term WORM Log"**, "Granular Field-Level Permissions" | false, and `WORM` is a compliance term with legal meaning |

### 29.4 CORRECTION — the fix on `/security` made the page contradict itself

Phase 29 began by correcting the RBAC section of `/security`. A re-read then showed
the **hero paragraph 200px above it** still read *"protected by strict role
permissions, campaign-level data isolation, and tamper-evident activity logs."*

The same page told a customer both that role boundaries were not enforced and that
they were. The og:description — the text social scrapers and link previews show —
still asserted the false version, so the corrected body was invisible to anyone
sharing the link. **Partial correction of a page is not a correction.**

**Lesson applied since:** a claim lives in a data source, not in a component. When the
same assertion renders in several places, correcting one render is cosmetic.

### 29.5 What changed

- **`lib/security-data.ts` rewritten wholesale.** `accessMatrix` cells are now prefixed
  `Target:` and documented as a design blueprint; `dataHandling` is one row per **real**
  table or real secret; `complianceFrameworks[].control` states shipped vs
  engagement-scoped per row. A file-level comment records the schema evidence so the next
  editor cannot reintroduce aspiration as fact.
- **`securityArchitecture` rewritten** into six controls that exist, each naming the file
  that implements it (`requireCrmUser()`, `noStoreHeaders()`, the RLS policies).
- **Both renderers of `accessMatrix`** now badge it *Roadmap* in amber and caption it with
  the verified limit: *"any authenticated operator can read every CRM record today."*
- **Two pricing rows deleted**, not relabelled. A customer compares cells, not caveats; a
  pricing table is the wrong place to introduce a capability.
- `/security`, `/legal`, `trust-strip`, `contact`, `bitscrm`, `crm-variants-explorer`
  corrected on the same basis.

### 29.6 The gate — and the two ways it failed

`lib/site/security-claims.mjs` (rules) + `ai-disclosure.selfcheck.mjs` (runner). The rules
were **extracted from the runner** so they could be negative-tested directly.

The v1 gate scanned raw TypeScript with a sentence splitter. Splitting `lib/site.ts` on
`". "` attributes matches to whatever code follows, which produced **~16 false positives**
attributing "SOC 2" to a product description containing neither. Worse, it could not see
the worst string of the audit: **`>Enforced<` is bare JSX text with no string literal
around it**, so a literal-only scan reports the homepage as clean.

The gate is now **9 security surfaces / 1,773 visible strings / 13 banned attestations**.
It extracts string literals *and* bare JSX text, strips comments first, and scopes
`lib/site.ts` to the four exports that actually feed a security surface.

**It was defeated by its own fix three times:**

| # | Self-inflicted failure | Fix |
|---|---|---|
| 1 | The corrected copy reads *"There is no WORM log"* — the banned term, honestly denied | sentence-scoped detection with a scoped-out marker set |
| 2 | `accessMatrix` cells are explicitly prefixed `Target:` and live under a Roadmap badge | added `target:` / `scoped per contract` as scoping markers |
| 3 | `\b` after `target:` requires a word boundary, and `:` + space has none — **the marker silently never matched** | prefix/suffix markers moved outside the `\b`-delimited alternation |

The third is the one worth remembering: the gate reported PASS **because a regex never
fired**, not because the copy was correct. A silent no-op and a clean run look identical
from the outside.

### 29.7 Negative tests

Every one of the 13 rules carries a must-fail and a must-pass string, and 5 extraction
shapes are asserted separately. **Two defects were found by the tests themselves**, on the
first run:

- **`nor` was missing from the scoped-out marker set**, so the honest sentence *"Neither
  SSO nor MFA is implemented"* was reported as a claim.
- **No rule caught a bare `>Enforced<`.** The word alone is not a false claim; it became
  one only in the company it kept. Added rule `enforcement-badge`, anchored
  `^(enforced|compliant|secured)$` so real prose like "enforced in code" still passes.

`scripts/ai-disclosure-injection-test.mjs` proves the **whole pipeline**, not just the
rules, by appending a real claim to `lib/security-data.ts` and restoring it byte-for-byte:

| Injected | Gate result |
|---|---|
| `export const CANARY = ["SOC 2 Type II Controls"]` | **exit 1**, reported by file and string |
| `export const CANARY2 = () => <span>Enforced</span>` | **exit 1**, reported as `jsx` |
| `export const CANARY3 = "There is no WORM storage here."` (negative control) | **exit 0** — correctly silent |

### 29.8 Scope boundary — what this phase deliberately did NOT do

The site markets a portfolio far larger than this repository: ERP/BIR accounting,
timekeeping, NFC cards, inventory, floor GPS operations, BITSagent. **Those claims cannot
be checked from this repo, and absence of evidence here is not evidence of absence in a
deployment I cannot see.**

Rewriting them would not be an engineering fix — it would be editing another deployment's
spec from a distance. So the gate splits its output:

- **Scoped surfaces** (9 files) assert the posture of *this* build → **hard failure**.
- **Everything else** is printed as a **NOT VERIFIED inventory** of 15 files, for the owner
  to confirm against each real deployment. It never fails the build, because a failure
  would be a claim I cannot support either.

The inventory is deliberately noisy rather than silent. It is the honest state of what is
known.

### 29.9 Owner decisions arising

1. **Are the out-of-repo product lines real deployments?** If yes, the security pages
   should say which product a given control applies to. If some are aspirational, the
   honest fix is to mark them *(planned)* as the site already does elsewhere.
2. **Numeric marketing claims** remain un-gated (§28.5) — substantiate or withdraw.
3. **Per-role authorization** remains roadmap. §29 now says so publicly on every security
   surface instead of claiming otherwise.

### 29.10 Verification

`npx tsc --noEmit` PASS · `ai-disclosure` PASS (9 surfaces, 1,773 strings, 13 rules
negative-tested) · injection test 4/4 · **16/16 gates** PASS · `npm run build` PASS,
71 pages · edited files re-read as UTF-8 with 0 mojibake and no BOM.
---

## 30. Production verification — the audit was never deployed

### 30.1 What triggered this

§29 ended with a scope boundary and an owner decision list. Before writing more
checks, I fetched `https://www.boundlessits.com/` to see what the corrections
actually look like to a visitor.

**They do not exist in production.** Every §16–§29 fix is in the working tree and
nowhere else.

### 30.2 Live production vs. working tree

Fetched from the deployed site and compared against source:

| What production serves | Status in the working tree |
|---|---|
| trust strip: *"bank-grade encryption, privacy controls, and automatic quiet-hour call rules"* | corrected in §29 |
| *"Fair debt collection rules & supervisory audit trails"* | corrected in §29 |
| *"Role-based PII masking & explicit consent controls"* | corrected in §29 |
| *"Secure data isolation & encrypted communication channels"* | corrected in §29 |
| FAQ JSON-LD: *"We implement granular role-based access control (RBAC), campaign tenant scoping, immutable activity and supervisory audit trails…"* | removed in §28 — the string no longer exists in source |
| `<title>… \| BITS \| BITS</title>` | duplicate suffix fixed in §27 |

The last two matter most. They are not "old copy we forgot to update" — those
strings **no longer exist anywhere in the repository**. Production is demonstrably
running a build from before §27–§29.

There is no contradiction with §29.1: this audit has never claimed the fixes are
live. It has only ever claimed they exist in source and pass a build. This phase
is what establishes that **source-correct is not the same as deployed-correct**,
and that no gate in this repository can detect the gap — every gate runs against
source or a local build.

### 30.3 NEW P0 — a fabricated `aggregateRating` is live in three schema blocks

`aggregateRating: { ratingValue: "9.9", bestRating: "10.0", reviewCount: "48" }`

| Location | Node |
|---|---|
| `app/layout.tsx:241-246` | Organization graph, homepage |
| `app/(marketing)/blog/[slug]/page.tsx:148-153` | Article graph, every blog post |
| `app/(marketing)/products/[slug]/page.tsx:717-722` | SoftwareApplication, `collections` only |

**No review exists anywhere on the site.** No `Review` item, no visible star
rating, no review text, no link to a review source. The markup asserts 48
third-party evaluations that a visitor cannot see and cannot verify.

Google's guidance is explicit:

- *"Don't include fake or undisclosed incentivized reviews on your page or in your
  structured data markup."* ([Review snippet](https://developers.google.com/search/docs/appearance/structured-data/review-snippet))
- *"Don't mark up irrelevant or misleading content, such as fake reviews."*
  ([General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies))
- A structured-data manual action **removes rich-result eligibility**. It does not
  deindex the page.

This is a different class from the numeric marketing claims deliberately left
un-gated in §28.5. "3.2x RPC rates" is a performance claim the owner may choose to
substantiate. `aggregateRating` asserts that *other people evaluated this product
and rated it 9.9/10* — third-party validation that does not exist, marked up in a
format search engines specifically police. It is left in place pending an owner
decision (§30.6), not corrected unilaterally.

Note the schema also self-serves: the entity rated is the site publishing the
rating. Google excludes self-serving ratings from the star feature on
`Organization` and `LocalBusiness` types outright; `SoftwareApplication` is not
excluded, but the reviews must still be genuine and visible on the page.

### 30.4 Orphan assets — 75 of 110, 47.0 MB of 52.5 MB

New check, `lib/site/orphan-assets.selfcheck.mjs`, answers the reverse of
`asset-integrity`: not "does every referenced asset exist?" but "does every asset
in `public/` get referenced at all?"

```
public/: 110 servable assets (52.5 MB), 75 unreferenced (47.0 MB)
```

Unreferenced assets cost nothing to visitors — nothing requests them. They cost
deploy time and storage, and they hide things. Roughly 90% of `public/` is dead
weight. Two structural causes:

- **`public/screenshots/` (32 files).** Development capture output from the
  `capture-*.mjs` / `verify-*.mjs` scripts, written into the served directory.
- **A duplicated asset tree.** `public/images/families/*` and
  `public/brand/families/*` hold the same four family images in both `.png` and
  `.webp`. `product-families.tsx` uses exactly four paths —
  `/brand/families/family-*.webp` — so the other 12 files are duplicates that
  nothing loads. The `.png` variants are dead because only `.webp` is referenced,
  not because the directory is unused.

**The `admin-security` find.** `public/images/features/admin-security.jpg` and
`.webp` are unused. The image is a mockup of an admin console headed **"Sovereign
Security & RBAC"**, containing a **"Role Permissions Matrix"** (Admin / Manager /
Supervisor / Agent / QA / Vendor, showing Full Access / Scoped Access / Scoped),
an **"Audit Log Preview"** with entries like *"Permission Change (QA)"*, and a
**"Deployment Information"** panel reading *"BSP Aligned / NPC Compliant."*

Those are precisely the controls §29 verified do not exist. Nothing links to the
image, so no visitor has seen it — but it is one `src=` away from shipping as a
product screenshot. It is also invisible to `ai-disclosure`, which reads text: a
claim baked into a raster is not text.

`scripts/fix-admin-security.mjs` is the script that generates it, and it is
misleadingly named — it is an image-branding utility (`sharp` compositing), not a
security fix, and it writes `public/` in place with no dry-run. It imports `sharp`,
which is **not a declared dependency** and currently resolves only transitively.

### 30.5 A gate defeated by itself — six times, one pattern

The orphan gate reported **69** orphans on its first run, and
`admin-security.jpg` was **not among them**.

Its own header comment names `public/images/features/admin-security.jpg` while
explaining why the file matters. The corpus search matched that comment, the
asset counted as "referenced", and the exact file the check was written to expose
quietly dropped out of its own results.

Excluding `*.selfcheck.mjs` from the corpus fixed that — and the count **fell back
to 69 the moment §30 was written**, because `docs/SYSTEM_AUDIT.md` names the same
path. Documentation does not ship. Neither do dev scripts. A file under `docs/` or
`scripts/` mentioning an asset does not make a browser request it, so the corpus is
now restricted to shipped code (`.ts .tsx .css .scss .json .webmanifest`), minus
`docs/`, `scripts/` and `*.selfcheck.mjs`. That makes the answer 75.

This is the same failure shape as §28 (defeated by honest denials), §29 #1
(defeated by `Target:` markers), §29 #2 (a `\b` after `:` that never matched, so
PASS came from a regex that never fired), §29 #3 (`nor` missing from the
scoped-out set) and the first orphan run. **Six instances, one pattern: a check
that quietly stops checking.** Excluding a filename is not a fix; the question to
ask is *what is allowed to count as evidence*, and that has to be structural.

### 30.6 `.env.example` was a trap for the next deploy

The file instructed operators to *"Copy these into your Vercel Project Settings"*,
and listed:

```
NEXT_PUBLIC_SITE_URL=https://bits-landing.vercel.app
```

`site.url` (`lib/site.ts:5`) drives **every** canonical link, `og:url`,
`twitter:image`, sitemap entry and JSON-LD `@id`. Production is currently correct
— verified: the live canonical is `https://www.boundlessits.com`, so the variable
is unset in production today.

But an operator following the example file would set it, and every canonical on
the site would point at a preview deployment, telling Google the real domain is
not canonical. `.env.example` now sets the production domain and explains why the
correct action is usually to leave it unset.

Also corrected: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION`
and `NEXT_PUBLIC_BING_VERIFICATION` are read by `app/layout.tsx:78-81` and were
absent from `.env.example` entirely. And the file committed a **real Supabase anon
key**; it now carries placeholders. (An anon key is public by design and protected
by RLS — but it is still a live credential in version control, and removing it
from the working tree does not rotate it.)

### 30.7 Owner decisions taken

The owner was asked to rule on three items and took the recommended option on
each (recorded 8 Oct 2026):

| Decision | Ruling | Action |
|---|---|---|
| Fabricated `aggregateRating` | **Remove** — no 48 real reviews exist | All three blocks deleted (`app/layout.tsx`, `blog/[slug]/page.tsx`, `products/[slug]/page.tsx`), each with a comment recording why and the condition for re-adding it |
| Deploying the corrections | **Commit in reviewable slices, do not deploy** | Branched and landed in logical commits; nothing pushed, merged or deployed |
| 75 orphaned assets | **Report only — delete nothing** | Check stays as a reporting gate; no asset deleted |

Removing the rating is deliberately **reversible and conditional**, not permanent:
the schema is correct when real reviews exist and are visible on the page. What
was wrong was the number without the reviews.

### 30.8 Verification

`npx tsc --noEmit` PASS · **16/16 gates** PASS · orphan sweep reports 75 / 47.0 MB ·
`npm run build` PASS, 71 pages.

The rating removal was verified against the **build output**, not the source:

```
built HTML files scanned : 52
containing aggregateRating/reviewCount : 0
containing any legacy false-claim string : 0
carrying ratingValue 9.9 : 0
```

The last line is the one that matters most for §30.2: the five pre-audit strings
fetched from production are absent from every generated page. The corrections are
real in a build. They are not deployed — see the owner ruling in §30.7.
---

## 31. `lib/contact.selfcheck.mjs` was testing a copy

### 31.1 What triggered this

This was a documented limitation carried forward from an earlier phase: *"lib/
contact.selfcheck.mjs tests a copy rather than lib/contact.ts."* Documented is
not fixed, so this phase fixed it.

### 31.2 What it actually did

The selfcheck re-declared `contactSchema` and `isHoneypotTripped` inline. It
never imported `lib/contact.ts`. Every one of its assertions passed against a
frozen duplicate.

The consequence is that the gate could not fail for **any** edit to the real file:

| Regression | Old gate | New gate |
|---|---|---|
| Honeypot reverted to `z.string().max(0)` | **passes** | fails |
| `name` loosened to `min(1)` | **passes** | fails |
| Email format check removed | **passes** | fails |
| Honeypot evaluated after `safeParse` | **passes** | fails |

The first and last are the interesting ones. The file's own header said *"the
honeypot must be evaluated BEFORE safeParse"*, but that is a property of **call
order in `app/actions/contact.ts`**, and nothing tested it. The order happens to
be correct today (`isHoneypotTripped` at line 68, `safeParse` at line 72) — it
was correct by accident, with no guard.

`selectors.selfcheck.mjs` already documents why this matters: its comment records
that the mirror approach *"meant a bug in `formatRelative` passed here
unchecked"*. The same mistake was made again, later, in a different file.

### 31.3 The fix

- Rules extracted to `lib/contact-schema.ts` — pure, no path-alias imports —
  re-exported from `lib/contact.ts` so every consumer is unchanged. This is the
  same extract-then-gate shape as `lib/email/outcome.ts` and
  `lib/crm/api-contract.ts`.
- The gate imports the real schema and asserts the real ordering structurally.
- 23 assertions, and the ordering rule is itself negative-tested: given an action
  with `safeParse` first, the same comparison rejects it.

### 31.4 Two assertions failed on the first run — both were bugs in the new tests

Worth recording, because the instinct on a red gate is to assume the product is
wrong:

- Slicing the honeypot branch to the next `}` stopped **inside `errors: {}`** and
  found no `return`. The product was correct; the extraction was naive.
- The persistence search matched `import { recordInboundLead, ... }` on **line 6**
  — the import, not the call — so "rate limit runs before persistence" failed
  against correct code.

Both were fixed in the tests. Neither was loosened, and neither was fixed by
changing the product to satisfy a bad assertion.

### 31.5 Injection test

`scripts/contact-selfcheck-injection-test.mjs` mutates **real source files**,
because a gate that only accepts synthetic input can still be disconnected from
what it guards:

| Mutation | Gate |
|---|---|
| control, untouched tree | exit 0 |
| honeypot ordering inverted in `app/actions/contact.ts` | **exit 1** |
| honeypot back to `z.string().max(0)` | **exit 1** |
| `name` loosened to `min(1)` | **exit 1** |
| email format check removed | **exit 1** |
| both files restored byte-for-byte | verified |

---

## 32. The demo credential — a live, unauthenticated path to production PII

### 32.1 How it was found

Auditing the scripts that write to the live database (§33) turned up a hardcoded
Supabase credential in `scripts/seed-supabase.mjs`. Tracing where it was used
led to `app/actions/auth.ts:123-126`.

### 32.2 The mechanism

`app/actions/auth.ts`, `roleDemoLoginAction`:

```ts
const supabase = await createClient();
await supabase.auth.signInWithPassword({
  email: "demo@boundlessitsolutions.com",
  password: "BITSdemo2024!",
});
```

Both values are literals committed to the repository. The function sets a
`bits_demo_role` cookie and then attempts this sign-in, swallowing any failure
in a bare `catch`.

`app/(auth)/login/page.tsx` renders **four** buttons wired to it — Sales Director,
Sales Rep, Product Owner, Full-Stack Dev — under a panel headed *"1-Click Testing
& Demo Presets"*: *"Instantly explore with pre-seeded enterprise accounts,
workflows, and Philippine corporate metrics."*

### 32.3 What is exposed, verified on the wire

Fetched `https://www.boundlessits.com/login`. The page is publicly reachable and
serves all four buttons to anonymous visitors, each a POST to server action
`40b9d646bc652816b258afdbe1eb22a62a2c32f320`.

If that sign-in succeeds, the visitor holds a real Supabase session. §29
established that **every RLS policy in this project is `using (true)` for
`authenticated`**. One session therefore means read access to every row of:

| Table | Contents |
|---|---|
| `inbound_leads` | **Real people.** Name, work email, company, and the full message describing their operational problems. |
| `email_logs` | Recipient, sender, subject, template, delivery status |
| `marketing_automations` / `marketing_campaigns` | Journey and campaign configuration, send counters |

The page carries `<meta name="robots" content="noindex, nofollow">`. That is not
an access control.

**What I verified, and what I did not.** I confirmed the mechanism in source, the
credential in the repository, and that production publicly serves the buttons. I
did **not** authenticate against the owner's production account or read any data
from it — that would be accessing their data to prove a point the source already
makes. Whether `demo@boundlessitsolutions.com` currently exists in the live
Supabase project is therefore **unverified**, and is the first thing to check.

### 32.4 A second false claim, on the login page itself

The same badge reads **"Universal Enterprise SSO"**. SSO is not implemented —
authentication is Supabase Auth with email and password, and `sso-mfa` is one of
the 13 banned attestations in `lib/site/security-claims.mjs`.

It shipped because `app/(auth)/login/page.tsx` was not in the gate's scope. It is
now, and the badge reads **"Supabase Auth · Email & Password"**. Proven, not
assumed:

```
findClaims("Universal Enterprise SSO")           -> ["sso-mfa"]
findClaims("Supabase Auth · Email & Password")   -> []
```

A login page advertising a capability it does not have is the worst possible
place for that claim.

### 32.5 Owner action required — not a code change

Two things are outside what this audit should decide alone:

1. **Disable or rotate `demo@boundlessitsolutions.com` in the live Supabase
   project.** Do this first. It is a live-data action on the owner's account.
2. **Decide what the demo path should be.** The buttons serve a real purpose for
   sales demos. The honest options are to point them at a **separate Supabase
   project seeded with synthetic data only**, or to drop the server-side sign-in
   and keep `bits_demo_role` as the pure client-side hint it is documented to be.

Changing the code so the credential cannot be used would close the path but
silently break every sales demo, which is a commercial decision.

### 32.6 Verification

`npx tsc --noEmit` PASS · **16/16 gates** PASS · ai-disclosure now covers 10
surfaces / 1,938 strings · contact selfcheck 23 assertions · both injection tests
PASS · `npm run build` PASS, 71 pages.
---

## 33. The scripts that write to production, and the eighth silent detector

### 33.1 How the fabricated rows got into the live database

§30 left an open owner decision: *"purge the 10 fabricated `inbound_leads`
rows?"* Before asking, I read the scripts that write to that table.

`scripts/apply-schema.mjs` is a DDL script. Its final act was:

```js
console.log("\n✅ Schema applied. Now seeding data…");

const { default: seed } = await import("./seed-supabase.mjs").catch(() => ({ default: null }));
if (!seed) {
  console.log("ℹ️  Run seed separately: node scripts/seed-supabase.mjs");
}
```

`seed-supabase.mjs` ends with a **top-level IIFE**:

```js
(async () => {
  await seedDemoUser();
  await seedLeads();
})();
```

So `import("./seed-supabase.mjs")` **executed the seed**. Then the very next
line printed *"Run seed separately"* — because `seed-supabase.mjs` exports no
`default`, so the destructured value was always `undefined`, so that branch
always ran.

**The guard did not merely fail to prevent the write; it printed a message
denying the write that had just happened.** Ten fabricated leads and a demo auth
account went into production under an output that said the seed had not run.

That is the mechanism behind the open question in §30, and it is the same shape
as §32: the demo account exists because this ran.

The lesson is specific and worth stating plainly: *importing a module for its
side effects and then testing for an export that does not exist is
indistinguishable from a feature flag that is stuck off.* A falsy check on a
value that can never be truthy is not a check — it is decoration that reports
success.

### 33.2 Two more defects in the same script

- **The project ref was hardcoded.** `const PROJECT_REF = "jvseyttzlobelrnzmfyf"`
  ignored `SUPABASE_URL` entirely. Pointing `.env.local` at a staging project
  changed nothing: the Management API call still went to production. Now derived
  from `NEXT_PUBLIC_SUPABASE_URL`, and it refuses to guess if that URL is not a
  Supabase host.
- **Failures did not stop the chain.** `runSQL` returns `false` on error and
  every call site discarded it, so a failed `create table` fell straight through
  to the policy block and then to the seed.

### 33.3 The safety model now

| Before | After |
|---|---|
| Running it writes to production | **Dry run by default.** `--apply` plus `--confirm-project <ref>` required, and the ref must match |
| Hardcoded project ref | Derived from `SUPABASE_URL`; refuses to guess |
| Failed statement → carry on | Aborts with a non-zero exit |
| Chained, silent seed | Never chained; seeding is a separate command |
| Importing the seed writes | Importing the seed does **nothing** — the IIFE is inside the guarded branch |

The seed now also warns *"NEVER run this against a database holding real
enquiries."*

### 33.4 `production-write-guard-test.mjs` — and a negative test that found a real gap

20 assertions covering both scripts, including that importing the seed writes
nothing.

`production-write-guard-negative.mjs` restores each original defect and asserts
the suite goes red. It earned its keep immediately:

| Injected | Result |
|---|---|
| control, fixed tree | exit 0 |
| re-chain the seed import | **exit 1** |
| bypass the URL-derived project ref | **exit 1** |
| hoist the seed IIFE to top level | **exit 1** — *"found 2"* |

The third case was the important one. The placement assertion
`/else\s*\{\s*\(async \(\) => \{[\s\S]*seedDemoUser\(\)/` uses a greedy `[\s\S]*`,
so a **second, unguarded IIFE placed anywhere below the guard still satisfied
it**. The suite was green while the exact production-seeding defect was
reintroduced.

The assertion now checks multiplicity instead of placement: exactly one async
IIFE, exactly one `await seedDemoUser()`, exactly one `await seedLeads()`. A
duplicated or hoisted entry point breaks a count, not a pattern. This is the same
correction §31 made — assert the property, not a proxy for it.

### 33.5 Mojibake, and the eighth silent detector

`seed-supabase.mjs` and `apply-schema.mjs` carried real mojibake in their console
output — UTF-8 decoded as Windows-1252. A U+26A0 WARNING SIGN printed as the
three characters `E2 9A A0` read through cp1252; an em dash printed as `E2 80 94`
read through cp1252. Nobody notices that until a script prints garbage at 2am.

`scripts/repair-mojibake.mjs` does the general round trip: build a reverse map
from a Windows-1252 decoder, encode each suspect character back to its byte,
decode the result as UTF-8. That recovers any sequence, not a hand-listed few.

**The first version of that repair tool could not find what it was looking for.**
Its character class was hand-written and omitted `U+201D` (cp1252 byte `0x94`),
so every curly-quote run broke apart at the quote character, matched two
characters at a time, and `tryRepair` returned null for each fragment. The
verifier — built from the *same* incomplete list — reported *"52 runs still
damaged"* while the repair pass said *"nothing to repair"*.

That is the **eighth** instance of one pattern in this codebase, and the ninth in
this audit:

> §28 honest denials · §29 `Target:` markers · §29 `\b` after `:` · §29 `nor`
> missing · §30 orphan gate naming its own target · §30 `docs/` re-referencing it
> · §31 a selfcheck testing a copy · §33 this.

Every fix has been the same: **derive the rule from the source of truth, never
enumerate it, and prove the detector fires.**

### 33.6 CORRECTION — the §33 detector was wrong in the other direction

The class built from the cp1252 decoder was never merely *incomplete*. On
already-decoded UTF-8 text it is **too broad**, and it was still carried into
`production-write-guard-test.mjs` and used as the residual verifier inside
`repair-mojibake.mjs` itself.

That class contains every character a cp1252 byte can produce: U+2014 EM DASH,
U+2013 EN DASH, U+00A7 SECTION SIGN, U+00B7 MIDDLE DOT, U+2026, U+2019. All are
used legitimately in this repository's prose. Measured on `docs/SYSTEM_AUDIT.md`
at the time of writing:

```
§33 class-based detector : 8 run(s)
§37 round-trip detector  : 4 run(s)
false positives in §33  : 4
true positives in §33   : 4

FALSE POSITIVES - ordinary prose flagged as corruption:
  "–§" x2  U+2013 U+00A7     (from "§16–§29", a section range)
```

So *"52 runs still damaged"* was **not** a measurement of damage. The verifier
and the detector were built from one bad list, so they agreed with each other and
disagreed with the file. Two consequences:

- The §33 conclusion that the repair tool "did nothing" was half right for the
  wrong reason. It could not have repaired the curly-quote cases; the evidence
  used to prove that came from a detector that also invented damage elsewhere.
- Every "no mojibake" assertion that used the class — including the one added to
  `production-write-guard-test.mjs` in §36 — was passing for a reason that had
  nothing to do with mojibake.

Replaced in §37 by a round-trip rule (`lib/site/encoding.mjs`): a run is mojibake
only if encoding it back to cp1252 yields **valid UTF-8** naming a different
character. No character list appears anywhere in it.

The narrower claim survives: an earlier check in this audit used
`[\u00C0-\u00FF]{2,}`, which misses `F0 9F 8C B1` because U+0178 and U+0152 sit
outside that block. It reported *"mojibake runs: 0"* on a file that had them.

### 33.7 Verification

`npx tsc --noEmit` PASS · **16/16 gates** PASS · guard suite 20/20 · guard
negative test 4/4 · both earlier injection tests PASS · `npm run build` PASS,
71 pages · `seed-supabase.mjs`, `apply-schema.mjs` and
`test-marketing-automation.mjs` verified free of mojibake with a
decoder-derived detector.
---

## 34. Measuring the build — Lighthouse had never been run

### 34.1 What changed about the method

Every performance and accessibility statement in this audit up to §33 came from
static analysis. That has a ceiling: it cannot see what a browser actually
requests.

Lighthouse is not a dependency of this project and adding it was not justified
for one measurement. Chrome *is* available, and Playwright is already in the
toolchain, so §34 measured the **real production build** directly:

```
npm run build && next start -p <port>
```

Then read `performance.getEntriesByType('resource')` on the live page.

### 34.2 The logo was the largest resource on the site

Baseline, homepage, top of page:

| Metric | Value |
|---|---|
| Total transfer | 1,012 KB |
| Total decoded | 2,297 KB |
| Requests | 48 |
| **Largest resource** | **`/brand/logo-reverse.png` — 371 KB decoded** |

A logo was outranking every JavaScript chunk. The reason:

- `logo-reverse.png` and `logo-horizontal.png` are **2067×713** PNG exports.
- `components/ui/logo.tsx` renders them at **`h-8` = 32px tall** (36px on login).
- Every variant carried **`unoptimized`**, which tells Next.js to serve the
  original file verbatim and skip the optimizer entirely.
- `variant="auto"` renders the light and dark lockups **together**, so each logo
  on a page costs two `<img>` elements.

A 2067px-wide lockup in a 111px slot is roughly 100× more pixels than are ever
resolved.

`public/brand` totals **8,345 KB across 27 files**, of which **3,625 KB is
byte-identical duplication** in four groups:

```
mark.png == mark-color.png == brand-mark-only.png == bits-mark-transparent.png   506 KB each
logo-horizontal.png == logo-navy.png == logo-google.png == primary-horizontal-logo.png   383 KB each
logo-reverse.png == logo-white.png == white-reverse-horizontal-logo.png   371 KB each
mark-tile.png == app-icon.png == brand-icon-1024.png   108 KB each
```

### 34.3 The fix, measured

Removed `unoptimized` and added `sizes` to all five `<Image>` variants in
`logo.tsx`, letting the optimizer serve a candidate matched to the rendered
width in the AVIF/WebP formats `next.config.ts` already configures. Intrinsic
`width`/`height` stay for aspect-ratio reservation, so there is no layout shift.

`sharp` — which Next's optimizer uses at runtime — was resolving only as a
**transitive dependency**, so enabling the optimizer would have left image
rendering dependent on an accident of the dependency tree. It is now declared
explicitly in `package.json`.

Same page, same build, one variable changed:

| Metric | Before | After | Change |
|---|---|---|---|
| **Total transfer** | **1,012 KB** | **620 KB** | **−39%** |
| Total decoded | 2,297 KB | 1,904 KB | −17% |
| All image bytes | ~1,000 KB | **86 KB** | −91% |
| `logo-reverse.png` | **371 KB** | **4 KB** | **−99%** |
| Requests | 48 | 47 | −1 |
| FCP | 684 ms | 644 ms | −40 ms |
| Broken images | — | **0** | — |

Verified rather than assumed: every brand image preserves its source aspect
ratio (2067:713 = 2.899 rendered, 128:44 = 2.909 natural, 111:38 = 2.909
displayed — no stretching), and all have pixels.

### 34.4 A silently inert `quality={95}`

While reading the image requests, the hero background appeared at `w=3840`
twice — once at `q=75`, once at `q=90`. `scripts/image-variant-report.mjs` showed
why: **`/images/hero-sky-bg.jpg` is used 12 times across 8 files at four
different qualities (70, 75, 90, 95).**

The optimizer cache key is `(url, w, q)`, so each distinct quality is a distinct
download of the same file. The homepage was fetching two copies — 40 KB and
80 KB — of a background that fills the viewport.

The `q=95` case is the more interesting one. `next.config.ts` allows
`images.qualities: [70, 75, 90]`. Requesting 95 directly from the optimizer:

```
q=70 -> 200  34.8 KB
q=75 -> 200  40 KB
q=90 -> 200  80 KB
q=95 -> ERROR 400
```

**But no broken image appeared on the page and the console logged zero errors.**
Next clamps an unlisted quality during SSR instead of erroring, so `quality={95}`
was silently discarded — the author believed they were getting q=95 and were
not. This is the ninth instance of the recurring pattern in a new costume: *the
system reported success while doing nothing.* No build error, no runtime error,
no visual difference, and a setting that had no effect whatsoever.

All twelve uses are now aligned to the default 75, so the hero downloads the
cloud plate once.

### 34.5 The gate

`lib/site/image-sizes.selfcheck.mjs` — the **17th gate**:

- **Fails** on any `quality={N}` where `N` is not in `images.qualities`. The
  allow-list is **read from `next.config.ts`**, not restated. A duplicated list
  is a list that drifts, which is how the two came to disagree in the first
  place.
- **Reports** sources split across multiple `(quality, sizes)` combinations,
  since that is a judgement call rather than a defect.
- Treats `unoptimized` on SVG as correct rather than as a finding — rasterising a
  vector seal would be a downgrade, and a report that cries wolf gets ignored.

`scripts/image-sizes-negative.mjs` reinstates `quality={95}` and asserts the gate
goes red:

```
PASS  control: gate passes on the fixed tree
PASS  quality={95} reinstated  -> exit 1
      [hero.tsx (line 34): quality={95} is not in next.config.ts
       images.qualities [70, 75, 90]. Next clamps it during SSR, so the
       setting is silently ignored - no error, no effect.]
PASS  hero.tsx restored byte-for-byte
```

The first version of the report listed 8 sources, 6 of them SVG marks whose
`unoptimized` flag is correct. After the vector exclusion it reports 2 real ones.

### 34.6 A correction to my own §34.4 framing

I initially wrote that `quality={95}` broke the hero image. It did not. Probing
the optimizer returned 400 for `q=95`, but the browser never issued that request
— Next had already clamped it during SSR, so the page was fine. The defect was
**dead configuration**, not a broken image.

Worth recording because the 400 was real evidence pointing at the wrong
conclusion, and only checking the actual request list distinguished them.

### 34.7 Verification

`npx tsc --noEmit` PASS · **17/17 gates** PASS · image-sizes negative test PASS ·
`npm run build` PASS, 71 pages · Playwright-measured on the production build:
620 KB transfer (was 1,012 KB), 86 KB of images (was ~1,000 KB), 0 broken images,
no aspect-ratio distortion on any brand lockup.
---

## 35. `npm run test:crm` — a test that had been failing for months

### 35.1 The problem with a permanently broken test

`npm run test:crm` ran `scripts/crm-e2e.mjs`, a 186-line Playwright suite. It had
been failing at its first assertion for as long as it had existed, and **nothing
in the repository recorded that**.

A test that always fails and a test nobody ever ran are indistinguishable from a
green build. Worse than useless: it trains people to ignore red.

### 35.2 What it was asserting

It hardcoded a list of 16 CRM routes. **Ten of them do not exist**:

```
/app/pipelines  /app/tasks  /app/conversations  /app/campaigns  /app/automations
/app/funnels    /app/forms  /app/templates      /app/reports   /app/team
```

None of the ten is in `lib/crm/nav.ts`, which declares exactly six items —
Dashboard, Leads, Contacts, Companies, Opportunities, Settings — all of which
exist. The script was a fossil of a much larger CRM that was never built.

It also asserted against fixtures that do not exist anywhere in the repo:

| Assertion | Reality |
|---|---|
| a lead at `/app/leads/ld-1` | `mock-data.ts` contains no leads — only `pl-1` and `usr-1` |
| a person named "Marcus Sterling" | not in the repository |
| a person named "QA Lead" | not in the repository |
| a "CRM Sign in" link on the homepage | **no page on the marketing site links to `/login` at all** |

The failure was always a 30-second Playwright timeout on `Pipelines`, which
looked like flakiness rather than a structural problem.

### 35.3 A real finding buried in the broken assertion

Chasing the "CRM Sign in" link turned up something the broken test had been
asserting for the wrong reason: `href="/login"` appears in **exactly two places**
in the entire repository — the CRM layout's redirect, and the forgot-password
page's post-submit "Return to sign in" button.

**The marketing site provides no route to the CRM login.** A customer who has
been given a BITS CRM account has no way to sign in except by typing the URL.
That is a conversion and onboarding defect, and the test that was supposed to
catch the entry point had been failing on an unrelated assertion for months
before ever reaching it.

Reported, not changed: adding a customer-facing sign-in link is a product and
navigation decision.

### 35.4 The rewrite

- **Every route is derived from `lib/crm/nav.ts`.** The nav is the single source
  of truth, so the test cannot drift from the UI.
- **Every derived href is cross-checked against the filesystem** before the
  browser starts, so a nav link pointing at a page that was never built fails
  immediately with a precise message instead of a 30-second timeout.
- **Data-dependent assertions derive their fixtures at runtime** and report
  `SKIP` with a reason when the store is empty, rather than failing against data
  that only exists in a live Supabase project.
- Assertions that were fossils are gone; assertions that describe real behaviour
  are kept and strengthened.

What it now covers, all of which **passed**:

```
CRM nav ↔ filesystem          6/6 nav hrefs have a real page.tsx
Session gate                  unauthenticated /app redirects to /login
Sign-in                       demo login works; safeAppNext refuses a
                              non-existent ?next= target
Navigation                    all 6 nav links resolve
Direct route responses        all 6 routes return 200 authenticated
Leads                         status filter applies (10 rows)
Mobile navigation             mobile CRM nav resolves
Session teardown              logout clears the session gate
Credential handling           invalid credentials surface an alert
Reachability                  /login reachable; forgot-password -> return to sign in
```

```
29 passed, 0 skipped, no failures
CRM e2e smoke: PASS
```

### 35.5 A note on what this test still cannot see

It runs against a production build with a real browser, so it is stronger than
the static gates — but it drives **one** viewport pair, **one** browser, and the
demo session only. It does not replace `test:responsive` (8 viewports) or
`test:keyboard` (skip-link and focus order). Those remain separate commands and
are not merged into `test:unit`, which stays dependency-free and fast.

The fact that the leads assertion found **10 rows** also confirms the CRM reads
real data from Supabase at runtime — the store is not purely a local mock.

### 35.6 Verification

`npm run test:crm` **PASS, 29 assertions** (was: permanent failure).
`npx tsc --noEmit` PASS · **17/17 gates** PASS · `npm run build` PASS, 71 pages.

## 36. A script that emails real people and writes real rows, and called itself VERIFIED

`scripts/test-marketing-automation.mjs` was the only script in the repository
that did all three dangerous things at once: send live email, insert rows into
the live database, and report success. It had no confirmation of any kind.

Running it "to see if it still works" would have sent two emails to
`boundlessitsolutions@gmail.com` and written three rows into production. That is
precisely how the ten fabricated `inbound_leads` rows from §33 got there, so the
script that verifies the pipeline is the same shape as the mistake.

### 36.1 Two ways it reported success while failing

```js
// before
runTest().catch(console.error);
```

`console.error` returns `undefined`, the rejection is consumed, and the process
exits **0**. Any caller — `npm run`, CI, a human — reads that as a pass.

```js
// before
console.log("\nMARKETING AUTOMATION & EMAIL DELIVERY PIPELINE VERIFIED!\n");
```

This was the last statement in `runTest()`, reached on every path. Steps 1–4 each
logged their own failure, none of them set a flag, and the summary printed
`VERIFIED` anyway. A run in which every step failed ended with the word VERIFIED.

That is the same failure shape as §20 (an email reported as sent when it was
not) applied to the verification script itself: the tool that certifies the
pipeline had no failure path of its own.

### 36.2 The safety model now

- **Dry run by default.** The script prints exactly what it would do and exits 0.
- **`--apply` plus a matching `--confirm-project`**, where the project ref is
  derived from `NEXT_PUBLIC_SUPABASE_URL` rather than hardcoded (§33).
- The ref is never guessed: an unparseable URL aborts instead of falling back.
- `fail()` increments a counter; the summary reflects the counter.
- A rejection sets `process.exitCode = 1`.
- The lead it writes is labelled `"SYNTHETIC - not a real enquiry"` in its own
  `source` column, so a stray row is identifiable rather than plausible.

### 36.3 The gate, and an assertion of mine that was wrong

Ten assertions were added to `production-write-guard-test.mjs`, taking it to 37.

One of them banned the string `PIPELINE VERIFIED` outright. It went **red on the
fixed script**, because the banner is correct when it sits inside
`if (failures === 0)`. Distinguishing guarded from unguarded by regex needs
brace nesting, and the property that actually matters is asserted directly:

```
✔ the VERIFIED summary is guarded by a failure count
✔ each step registers its failure
✔ the failure counter is initialised to numeric zero
✔ the fail() helper increments the failure counter
✔ no shadow reassignment of the failure counter
```

That assertion was removed rather than "fixed", because it could not tell the
two cases apart and would have been a permanently red gate. This is §33's
placement-versus-multiplicity lesson again: **assert the property, not a proxy
for it.**

The last three exist because a counter that is never incremented makes
`if (failures === 0)` vacuously true. A negative case for exactly that was
added, and it is the reason those three assertions are there.

### 36.4 The negative test — six defects restored

`scripts/production-write-guard-negative.mjs` restores each original defect,
asserts the suite goes red, and puts the file back byte-for-byte.

```
PASS  control: guards pass on the fixed tree
PASS  re-chain the seed import (the original production-seeding defect)   [apply-schema does not import the seed module]
PASS  bypass the URL-derived project ref                                  [apply-schema derives the project ref from the URL]
PASS  hoist the seed IIFE back to top level                               [seed has exactly one async IIFE · found 2]
PASS  print the VERIFIED summary unconditionally (§36)                     [the VERIFIED summary is guarded by a failure count]
PASS  restore .catch(console.error) so a rejection exits 0 (§36)           [does not swallow rejections with .catch(console.error)]
PASS  drop the failure counter so steps cannot register a failure (§36)   [the fail() helper increments the failure counter]
PASS  all scripts restored byte-for-byte
```

The harness throws if a mutation anchor matches zero or many times, rather than
letting `String.replace` silently return the input unchanged. A no-op mutation
leaves the suite green, and without that check the harness would report "the
guard did not catch the defect" — a confident false claim about a defect it
never actually introduced.

### 36.5 Verification

Dry run exits 0. A mismatched `--confirm-project` exits 1. Guard suite 37/37.
Negative test 6/6, files restored byte-for-byte. `npm run build` PASS.

## 37. 57 destroyed characters in the audit document, and a detector that invented damage

This section exists because writing §36 required reading this document, and
parts of it were unreadable. `### 13.4 \`MOCK_NOW\` — measured, not assumed`
rendered with a replacement character where the em dash should be. Not one line.
**57 of them, across 49 lines.**

### 37.1 This is unrecoverable damage, not mis-encoding

The bytes at each site are `EF BF BD` — the UTF-8 encoding of **U+FFFD
REPLACEMENT CHARACTER**. That is not a mis-decode; it is what a writer emits when
it has already lost the original character. A mojibake repair tool cannot help,
because there is nothing left to round-trip.

The `edit` and `write` tooling was verified against this specifically: both
preserved a literal U+FFFD and a literal U+FEFF byte-exactly on a round trip.
The damage came from a shell write path that re-encoded text through a
single-byte codepage. The affected lines are exactly the older ones — §13
through §17 — which matches when they were last touched.

### 37.2 Restored from context, rule by rule

`scripts/repair-replacement-chars.mjs` infers each replacement from its
surroundings rather than from a list of line numbers, so it keeps working as the
file changes:

| Shape | Inferred as | Count |
|---|---|---|
| `<digit> U+FFFD <digit>` | EN DASH — a range | 2 |
| `U+FFFD <digit>` | SECTION SIGN — a section reference | 8 |
| anything else | EM DASH — a parenthetical | 47 |

Dry run by default; `--apply` writes. Every one of the 49 lines was read and
confirmed before applying. Two examples, with the destroyed character shown as
`«FFFD»`:

```
- ratios of 1.00«FFFD»1.43 on `/pricing` … and `/security` «FFFD» i.e. invisible
+ ratios of 1.00–1.43 on `/pricing` … and `/security` — i.e. invisible

- | Marcus Sterling | Sutherland Global Services BPO | «FFFD» | BITScrm Landing Specimen |
+ | Marcus Sterling | Sutherland Global Services BPO | — | BITScrm Landing Specimen |
```

The second is an empty table cell, and `—` is the conventional "no value"
placeholder — recovered correctly rather than guessed.

### 37.3 CORRECTION — the §33 mojibake detector was wrong in the *other* direction

§33 concluded that the repair tool "did nothing" because its verifier reported
*"52 runs still damaged"*. That conclusion was **half right for the wrong
reason**, and this section supersedes §33.5.

Both the repair tool and its verifier built a character class from the cp1252
decoder. That class is correct for **repair** — every character it matches is a
candidate for round-tripping, and the repair discards any that do not decode. It
is wrong for **detection**: the same class contains EM DASH, EN DASH, SECTION
SIGN, MIDDLE DOT, HORIZONTAL ELLIPSIS and RIGHT SINGLE QUOTE, which is most of
the punctuation in any well-written Markdown file.

Measured on this document with `scripts/compare-detectors.mjs`:

```
§33 class-based detector : 8 run(s)
§37 round-trip detector  : 4 run(s)
false positives in §33  : 4
true positives in §33   : 4

FALSE POSITIVES - ordinary prose flagged as corruption:
  "–§" x2  U+2013 U+00A7

first false positive in context:
  "Every §16–§29 fix is in the working tree and"
```

So *"52 runs still damaged"* was never a measurement of damage. The verifier and
the detector agreed with each other and disagreed with the file. Two things
follow:

1. The §33 evidence that the repair tool was broken could not distinguish "the
   tool is broken" from "the detector is broken". It was the latter.
2. **Every "no mojibake" assertion that used the class was passing for an
   unrelated reason** — including the one added to
   `production-write-guard-test.mjs` during this very section.

### 37.4 The rule that replaced it

`lib/site/encoding.mjs`. Mojibake is not "these characters look odd". Mojibake
is: **encode the run back to cp1252 bytes and those bytes must form valid UTF-8
naming a different, more plausible character.**

```
EN DASH + SECTION SIGN -> 96 A7    -> invalid UTF-8, no lead byte   -> clean
EM DASH                 -> 94       -> invalid UTF-8 on its own     -> clean
a 3-char run            -> E2 80 93 -> valid UTF-8 -> U+2013        -> MOJIBAKE
a 4-char run            -> F0 9F 8C B1 -> valid UTF-8 -> U+1F331    -> MOJIBAKE
```

No character list appears anywhere in it. Change the decoder and the rule changes
with it — the lesson from §28 through §36, applied one more time.

This is the **ninth** instance of the same pattern in this audit, and the first
one where the failure was *too sensitive* rather than not sensitive enough.

### 37.5 The 18th gate, and proving it can fail

`lib/site/encoding-integrity.selfcheck.mjs` checks four distinct defects —
mojibake, U+FFFD, BOM, invalid UTF-8 — across every project text file.

The first block corrupts known-good strings **through the same code path real
damage takes** and asserts each one is caught, then asserts the repair is the
right character, then asserts it stays quiet on nine kinds of legitimate
punctuation including the `–§` sequence the old detector flagged. If the rule is
weakened, that goes red before the gate reaches the tree.

```
✔ detector fires: em dash mis-read as cp1252          ✔ detector stays quiet on: three middle dots in a row
✔ detector fires: seedling emoji, 4-byte UTF-8        ✔ detector stays quiet on: a full sentence with dashes
✔ detector fires: two em dashes in a row              ✔ detector stays quiet on: right single quote
✔ detector fires: curly quote                         ✔ detector finds U+FFFD
✔ detector fires: ellipsis                            ✔ detector finds a UTF-8 BOM
✔ detector recovers the right character: em dash      ✔ detector finds invalid UTF-8
✔ detector recovers the right character: en dash      ✔ detector accepts clean UTF-8
✔ detector stays quiet on: en dash + section sign     ✔ the cp1252 reverse map is derived, not empty
✔ detector stays quiet on: em dash alone              ✔ no encoding damage in 317 project text file(s)
```

`scripts/encoding-integrity-negative.mjs` then restores each defect in a real
file — **7/7 caught**, both targets restored byte-for-byte, including one two
directories deep so the "the walk recurses" claim is actually tested.

### 37.6 The module does not flag itself

`lib/site/encoding.mjs` documents the damage it detects. The first draft
**embedded the literal mojibake** as examples, so the gate flagged its own
detector on every run. A check that always fails on itself is a check nobody
runs, so the examples are now written as byte sequences (`E2 80 93`) and
`REPLACEMENT_CHAR` is built with `String.fromCharCode(0xfffd)` rather than
written as a literal.

The same fix was applied to the documentation in this file and in
`scripts/repair-mojibake.mjs`, which had been quoting raw mojibake since §33.

### 37.7 Also cleaned up

- `docs/social/crm-support-facebook-post-prompt.md` — UTF-8 BOM stripped
  (10,448 → 10,445 bytes), verified by re-reading from disk.
- `scripts/tmp-schema-probe.mjs` — deleted. A read-only probe of mine from §20,
  referenced by nothing in `package.json` or any import.

### 37.8 Verification

`scripts/scan-text-damage.mjs` over the whole project:

```
322 file(s) scanned · 0 damaged · 0 mojibake · 0 U+FFFD · 0 BOM · 0 invalid byte(s)
```

## 38. Two test commands that could not run, documented as passing

Filling in the verification table in §2 required running every row rather than
copying §19 and §21. One row did not survive.

### 38.1 The defect

```
> npm run test:keyboard
page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3847/
```

`scripts/keyboard-validation.mjs` and `scripts/responsive-validation.mjs` both
hard-coded `http://localhost:3847` and assumed a server was already running.
`scripts/crm-e2e.mjs` started its own. So two suites were unrunnable without
ceremony, and the one that was runnable was the one that kept being run.

The damage is not that they needed a server. It is **how they failed**. A raw
Playwright stack trace ending in `ERR_CONNECTION_REFUSED` reads as a broken test,
not a missing prerequisite — so the natural response is to debug the test, and
the documentation meanwhile described both as *"RUN AND PASSING"*.

### 38.2 Fixed

`scripts/lib/serve.mjs` — one bootstrap, used by all three. Each suite gets its
own free port, so they cannot collide with each other or with a dev server. The
error path distinguishes the two real causes:

- `next start` exited → the exit code and its stderr are printed.
- Never came up → the message says to run `npm run build` first, because
  `next start` serves build output, not source.

`RESPONSIVE_BASE_URL` still overrides it, so pointing a suite at a deployed
instance works. The duplicated `getFreePort`/`waitForServer` pair was deleted from
`crm-e2e.mjs` rather than left to drift.

### 38.3 Verification

All three now run standalone with nothing else listening:

```
npm run test:keyboard    KEYBOARD CHECK: PASS  (10 routes, 16 footer pills)
npm run test:responsive  Responsive validation passed for 11 viewport and zoom profiles.
npm run test:crm         29 passed, 0 skipped, no failures
```

### 38.4 Correction to §2's own history

The table above previously claimed `npm run test:crm` was **NOT RUN** and
`test:responsive` was **NOT RUN**. §35 fixed the CRM test; §19 corrected the
responsive claim. The table has been rewritten from actual runs, and the stale
rows in `docs/TESTING.md` that still said `test:crm` *"cannot pass — permanently
broken"* were corrected with it.

## 39. Verification after §36–§38

| Check | Result |
|---|---|
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `npm run test:unit` | **PASS** — **18/18 gates** |
| `npm run build` | **PASS** — 71 pages |
| `npm run test:crm` | **PASS** — 29 assertions, 0 skipped |
| `npm run test:responsive` | **PASS** — 11 viewport/zoom profiles |
| `npm run test:keyboard` | **PASS** — 10 routes, 16 footer pills |
| `scripts/production-write-guard-test.mjs` | **PASS** — 37 assertions |
| `scripts/production-write-guard-negative.mjs` | **PASS** — 6/6 |
| `scripts/encoding-integrity-negative.mjs` | **PASS** — 7/7 |
| `scripts/scan-text-damage.mjs` | **CLEAN** — 322 files, 0 defects |

## 40. Git history, and finally testing the RLS claim instead of reading it

Two things this audit had never done: check the repository's *history*, and
check the live database's *actual* row-level security instead of inferring it
from a SQL file.

### 40.1 Nothing had ever been checked in history

`git rm` leaves the blob reachable. Every earlier phase examined the working
tree, which is clean by construction and says nothing about what was once
committed.

`scripts/history-secret-scan.mjs` reads **every unique text blob in all 119
commits** — 1,222 blobs — through a single `git cat-file --batch`, so the cost
is one pass rather than ~24,000 `git show` invocations. Scanning per-commit
would also have missed any blob no diff still displays.

### 40.2 The first result was a confident false claim

The first run reported:

```
✖ Resend API key   CRITICAL — sends mail as the domain
  path: README.md   fingerprint: re_y…here
```

I was one step from reporting a critical credential exposure. It was a
placeholder. Measured rather than assumed: 24 lowercase characters, four
underscores, no digits, no uppercase.

The cause was mine. The provider detectors had `validate: () => true`, while the
hardcoded-literal detector two entries below already rejected placeholders.

### 40.3 The obvious fix was also wrong

Replacing the boolean with an entropy threshold looks principled and is worse
than nothing. `scripts/entropy-calibration.mjs` measured both classes:

```
NEGATIVES (must be rejected)
  3.29 bits/char  re_your_api_key_here
  3.62 bits/char  re_example_key_goes_here_now
  3.28 bits/char  password123

POSITIVES (must be accepted)
  min 3.55 bits/char  random base64url, 16 chars
  min 3.65 bits/char  random base64url, 20 chars
  min 4.62 bits/char  random base64url, 43 chars

SEPARATION
  highest negative entropy : 3.62
  lowest  positive entropy : 3.55
  margin                   : -0.07 bits/char
```

**There is no separation.** A real 16-character key scores *below* a
placeholder. Any threshold that suppresses the false positive also suppresses
genuine short credentials — a false negative on a critical finding, which is
strictly worse than a false positive because it is silent.

That is the finding. So the scanner keeps **no heuristic at all** and reports
three deterministic classes instead:

| Class | Meaning | How it is established |
|---|---|---|
| **CONFIRMED** | a real credential hardcoded in source | by construction — the value authenticates, however weak it looks |
| **NOT A SECRET** | contains a placeholder marker | a word list, with its limits stated rather than hidden |
| **CANDIDATE** | everything else | reported as unresolved, with the step that would settle it. **Never labelled critical.** |

The classifier self-tests on every run, so the next person can see it works in
both directions before trusting its output.

### 40.4 What history actually contains

```
CONFIRMED (real credential in history) : 2   (one underlying value)
CANDIDATE (cannot be decided locally)  : 1
NOT A SECRET (placeholder)             : 1

CONFIRMED — Demo account password
    app/actions/auth.ts, scripts/seed-supabase.mjs, docs/SYSTEM_AUDIT.md
    in the WORKING TREE now: YES
```

**No service-role key, no Resend key, no Stripe key, no private key has ever
been committed.** That is the good news, and it is now checked rather than
assumed.

The confirmed finding is the one §32 already documented, with **one addition
this audit had missed**: the credential is not only in `app/actions/auth.ts`.
`scripts/seed-supabase.mjs:246` contains the same literal and calls
`auth.admin.createUser` with `email_confirm: true` and
`user_metadata.role = "admin"`. So the repository holds an **admin** credential
for the production project in two independent places, and one of them will
*create* the account if it is absent. §33 guarded that script's writes; it did
not remove the credential.

Owner action is unchanged and still urgent: **disable or rotate
`demo@boundlessitsolutions.com` in the live project.** Removing the literal
from source does not invalidate a credential that has already been used.

The anon key appears in four source files and matches the live value. That is
**expected and not a defect** — a Supabase anon key is shipped to every browser
by design. It is listed so its presence is a recorded decision rather than a
surprise, and because the next question depends on it:

> *If the anon key is public, is anything reachable with it?*

### 40.5 Testing RLS instead of reading about it

Every security conclusion in this audit rests on `scripts/supabase-schema.sql`.
That file shows no policy grants `anon`. But it is a description of an intended
schema, not evidence about the deployed one — and §29 built an entire
remediation on it.

The anon key is exactly the right probe. It is already public, so using it
proves the boundary without touching a privileged credential. If RLS were
broken, anyone on the internet would already have the data.

`scripts/anon-access-probe.mjs` counts each table twice — as anon, and with the
service-role key held locally as ground truth — because **"anon saw 0 rows" is
ambiguous**. It could mean RLS filtered anon out, or that the table is empty
and anon was never challenged. Only `anon < service` proves anything.

### 40.6 The probe contradicted a correct finding, and the probe was wrong

The first run reported all four tables empty:

```
inbound_leads             0         0         INCONCLUSIVE — table is empty
...
✔ no table exposed data to the public anon key          exit 0
```

`inbound_leads` holds **10 rows**, and §18 recorded that correctly. The probe
was broken: `Range: 0-0` makes Supabase answer **206 Partial Content**, the
parser only accepted 200, and `svc.n ?? 0` laundered every unparseable result
into zero. So "I could not read this response" was printed as "this table is
empty", the sanity check agreed with itself, and the script still exited 0
having learned nothing.

This is the failure this audit has now hit ten times, in its purest form: **a
harness that reports partial output converts an unknown into a confident false
claim** — and this time it contradicted an earlier, correct section of this very
document.

The fix is two rules, both asserted before a single request is sent:

1. **A count that cannot be read is null. Null is an ERROR, never zero.**
2. **206 is success, not failure.**

### 40.7 The corrected result

```
table                     anon    service   verdict
--------------------------------------------------------------------------
inbound_leads             0       10        PROVEN — 10 rows exist, anon saw 0
email_logs                0       26        PROVEN — 26 rows exist, anon saw 0
marketing_automations     0       4         PROVEN — 4 rows exist, anon saw 0
marketing_campaigns       0       3         PROVEN — 3 rows exist, anon saw 0

  Conclusive tables                        : 4
  …of those, rows existed AND anon saw none : 4

✔ every table was conclusively tested; none exposed data to the public anon key
```

**RLS is empirically verified on the live database.** It is not merely what a
SQL file claims. The probe also independently confirms the row counts §18 (10
leads) and §20 (26 email logs) recorded from a different direction.

The schema-file ground truth §29 was built on is therefore correct — but it is
now *verified* rather than *assumed*, which is a different claim.

### 40.8 Also fixed

The `re_your_api_key_here` placeholder in `README.md` and
`docs/FULL_SYSTEM_DOCUMENTATION.md` is now `re_<your-resend-api-key>`. It was
never a secret, but it is indistinguishable from one to every scanner that has
not solved the placeholder problem — including other people's, and CI. Every
future scan was going to flag it again, and each false positive costs somebody's
attention.

### 40.9 Verification

`scripts/history-secret-scan.mjs` — classifier self-test 5/5, 1,222 blobs
scanned, 1 CONFIRMED value (the §32 demo credential, now located in two source
files), 1 CANDIDATE (anon key, public by design), 1 placeholder.
`scripts/anon-access-probe.mjs` — parser self-test 7/7, 4/4 tables PROVEN, no
leak. Both print redacted values only.

## 41. Dependencies — 7 advisories, one critical, and six packages nothing imports

The repository had never been audited for its own supply chain.

### 41.1 Seven Next.js advisories, and most of them are unreachable

`npm audit` on `next@16.3.5` reported **1 critical + 6 high**, spanning the whole
`16.0.0 – 16.3.7` range. "Upgrade immediately" is the lazy answer; the useful one
is which of these this application can actually reach:

| Advisory | Reachable here? | Why |
|---|---|---|
| RCE in `next/og` `ImageResponse` | **No** | `next/og` is imported nowhere. Zero occurrences in the repository. |
| Draft Mode leak via pending `use cache` | **No** | `use cache` is used nowhere. |
| SSRF in Image Optimization | **No** | `next.config.ts` declares **no `remotePatterns`**, so the optimizer serves only local `/public` assets. |
| Cache poisoning of SSG/ISR (×2) | **No** | No `revalidate`, no ISR. Every route is static or dynamic-on-demand. |
| Metadata image route disclosure via `dynamicParams` | **No** | Verified empirically — see below. |
| Dev MCP endpoint disclosure | **No** | Development server only. |
| `source-map-js` event-loop DoS | Build-time only | Reached through `@tailwindcss/postcss` and Next's bundled PostCSS; never in a request path. |

Two were worth checking rather than assuming.

**`dynamicParams`.** Neither `app/(marketing)/products/[slug]` nor
`.../blog/[slug]` sets `dynamicParams`, so it defaults to `true` and any
arbitrary slug would be rendered on demand. Measured against the built server:

```
/products/crm               => 200  212714
/products/collections       => 200  189587
/                           => 200  418818
/products/not-a-real-product => 404  35912
```

Both pages call `notFound()` for an unresolved slug, and `generateMetadata`
returns a plain "Product Not Found" title rather than reflecting the slug. The
advisory does not apply.

### 41.2 Upgraded, and the audit is now clean

`next` `16.3.5` → **`16.3.8`**, the patch that resolves all seven advisories.
Deliberately not `16.4.0`: a minor bump buys nothing here and carries unknown
breaking changes.

`source-map-js` pinned to `^1.2.2` through an `overrides` block. Build-time only
and not remotely reachable, but both consumers accept `^1.x`, so the patch costs
nothing.

```
found 0 vulnerabilities
```

### 41.3 The unused-dependency script was wrong twice before it was right

`scripts/unused-deps.mjs` looks for import sites. Two defects, both of the same
family as §37 — a detector that could not report the thing it was built to
report.

**First version: `package-lock.json` made everything look used.** It contains the
name of every installed package, so the loose "referenced in a config file" rule
matched all of them. The first run reported **"0 unused"** across 30 packages, on
a repository that has six nothing imports. A check that cannot fail is not a
check.

**Second version: it would have broken production.** With the lockfile excluded,
it reported 9 unreferenced — including **`@supabase/supabase-js`**, which no
source file imports because `@supabase/ssr`'s `createClient` wraps it. It is a
**peer dependency**. Deleting it would have taken down every authenticated page.

So the lockfile, excluded as evidence of *use*, is read as the source of truth
for what is *required*. Two questions, two files. That distinction is the fix.

### 41.4 What was actually unused

| Package | Why it was still there |
|---|---|
| `@gsap/react` | GSAP is used directly (`hero-product.tsx`), but never the React binding |
| `@radix-ui/react-separator` | `components/ui/separator.tsx` was deleted in §7; the package outlived it |
| `@radix-ui/react-tooltip` | `components/ui/tooltip.tsx` was deleted in §7; the package outlived it |
| `recharts` | **Never imported at all.** The charts are hand-authored inline SVG |
| `three` + `@types/three` | `components/ui/hero-three-canvas.tsx` was deleted in §7 |

The two Radix packages and `three` are the residue of the §7 orphan sweep: the
components were removed but their dependencies were not. That is the predictable
failure mode of a dead-code pass that checks importers rather than packages.

### 41.5 A documentation falsehood found on the way

`README.md` claimed:

> | **Charts & HUD** | Recharts & SVG | `3.10.1` | Operations recovery velocity charts, talk-time averages, and floor metrics. |

No charting library was ever used. The recovery-velocity chart at
`components/sections/product-showcase.tsx:237` is a hand-written `<svg>` with a
`linearGradient`. There was never a library behind that claim. Removed and
corrected. The README also pinned `next@16.3.5`; updated to `16.3.8`.

### 41.6 Verification

`npx tsc --noEmit` PASS · **18/18 gates** PASS · `npm run build` PASS, 71 pages ·
`npm run test:crm` PASS, 29 assertions · `npm audit` **0 vulnerabilities** ·
`node scripts/unused-deps.mjs` 24 used, 0 unreferenced.

There is **no unused-dependency gate** in `npm run test:unit` — the script is
report-only. Gating it would mean a check that can be silenced by deleting the
package it checks, which is the exact shape of defect this audit keeps finding.

## 42. Every page measured — and 360 KB of GSAP that `/login` never used

§34 measured one page, the homepage, and fixed what it found there. That is one
data point on a site with 14 routes.

### 42.1 The measurement was measuring the cache

`scripts/page-weight.mjs` loads each route in a real browser and reads Resource
Timing. The first version reused **one browser context for all 14 routes**, so
every resource already cached reported `transferSize: 0`. 409 of them did.

`transferSize` is 0 for a cache hit **and** for a cross-origin response without
`Timing-Allow-Origin`, and those mean opposite things for cost. The result was a
table of numbers that were not page weights — `/products/collections` appeared to
cost 0 KB of JS and 0 KB of CSS, which is not a measurement but a cache hit
printed as a zero-byte download.

Each route now loads in a **fresh context**, and the script asserts that no
resource reports a zero transfer, so a future cache leak cannot pass silently.

### 42.2 What every route actually costs

```
route                       total     doc      img       js     css  reqs
/                           725.5    68.4     68.7    377.0   148.7    56
/products/collections       721.3    33.1      0.0    432.6   116.1    59
/products/crm               678.9    35.4      2.0    431.4    94.6    53
/about                      636.1     7.8      0.0    425.7    73.4    53
/crm-sales                  626.5    14.5      0.0    446.5    94.9    55
/products                   610.5    33.5      0.0    407.5    94.6    46
/demo                       606.0    16.7      2.5    434.9    91.4    50
/blog                       581.6    38.0     16.5    358.8    94.6    41
/pricing                    557.8    29.6      0.0    361.4    94.6    42
/solutions                  554.8    26.7      0.0    361.4    94.6    42
/cookies                    545.6    24.8      0.0    358.8    94.6    40
/security                   543.2    28.7      0.0    360.1    94.6    39
/legal                      537.2    24.1      0.0    358.8    94.6    38
/login                      514.4    13.7      0.0    380.1    75.9    40
```

The spread is only 211 KB across the whole site. **`/login` costs 514 KB**, and
JS is 315–446 KB of every page. Whatever §34 fixed on the homepage, it was not
the site's real weight problem: the problem is a large *shared* bundle, and the
homepage merely had the most of it.

### 42.3 A false alarm I nearly reported

`scripts/bundle-contents.mjs` listed every chunk in `.next/static/chunks` and
reported that **Zod occupied a 392 KB client chunk**. Zod is a server-side
validator. It sounded serious.

It was false. The chunk exists; **no browser requests it**. Nothing in the client
graph imports Zod, and `lib/contact.ts` — which does — is reached only through
`"app/actions/contact.ts"`, a `"use server"` module. Measured directly, the chunk
was downloaded by **0 of 3** pages.

The bug was measuring what was **emitted** rather than what is **downloaded**.
Turbopack writes chunks it may need; the network fetches only those a route
references. The script now asks a real browser which chunks it fetched and
attributes markers only within those. That is the second time in this phase that
a tool reported a confident number about something other than the thing asked.

### 42.4 The real finding: GSAP in the shared bundle

Asking what is actually **downloaded**, and then intersecting across pages,
produced the answer §34 missed:

```
Shared baseline (fetched by /, /pricing AND /login): 18 chunks, 1182 KB raw
  gsap + ScrollTrigger  in 1 chunk — 360.5 KB
```

`components/sections/hero-product.tsx` opened with:

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

That is the **only** file in the repository that imports GSAP. It is the homepage
hero. A top-level static import hoists into the shared client graph, so every
route on the site shipped a 360 KB scroll-animation library — including `/login`,
which has no scroll animation, and `/cookies`.

### 42.5 The fix

`import("gsap")` inside the effect instead of a static import, which makes it an
async chunk fetched only when the component mounts.

Two details that are correctness, not just size:

- `registerPlugin` used to run at **module scope**, guarded by a `typeof window`
  check — it still registered eagerly on first paint, before mount. It now runs
  after the await.
- The component can unmount **while the chunk is in flight**. Registering then
  would leak a ScrollTrigger nothing ever tears down, so the effect holds a
  `cancelled` flag and checks it after the await. The module handles are `useRef`
  rather than module-level variables, so a remount cannot inherit a torn-down
  ScrollTrigger.
- `handleTabClick` runs outside the effect, so it now reads `ScrollTrigger` from
  the ref and tolerates it being `null` — a tab click before the chunk lands
  switches the panel without also scrolling, which is the correct degradation.

### 42.6 Measured result

```
route                    before     after      delta
/                        725.5     726.5     +1.0   (still loads GSAP — correct)
/products/collections    721.3     678.0     -43.3
/products/crm            678.9     636.2     -42.7
/about                   636.1     592.8     -43.3
/crm-sales               626.5     583.2     -43.3
/products                610.5     567.2     -43.3
/demo                    606.0     562.7     -43.3
/blog                    581.6     538.3     -43.3
/pricing                 557.8     514.4     -43.4
/solutions               554.8     511.5     -43.3
/cookies                 545.6     502.3     -43.3
/security                543.2     499.9     -43.3
/legal                   537.2     493.8     -43.4
/login                   514.4     471.1     -43.3
```

**−43.3 KB on all 13 non-homepage routes**, and the homepage is unchanged, which
is the correct outcome: it is the one page that uses the animation.

### 42.7 The animation still works

Weight saved by breaking the feature is not a saving. `scripts/verify-hero-motion.mjs`
drives the real behaviour: it scrolls within the hero's own range and asserts the
`--tab-progress` custom property actually advances, that it spans a real range,
that no console errors appear, that `prefers-reduced-motion` still suppresses the
scrub, and that the homepage pulls more JS than `/login`.

```
PASS  the 2400px hero container is present
PASS  the --tab-progress custom property advances during scroll (the scrub is alive)
PASS  the progress spans a real range, not a constant
PASS  no console or page errors on the homepage
PASS  prefers-reduced-motion suppresses the scrub (progress stays at its initial 25%)
PASS  the homepage downloads more JS than /login (GSAP arrives only there)
```

**Two of these failed on the first run, and both were bugs in the test, not the
product.** It scrolled the whole page in ten jumps, overshooting the hero's own
trigger range so it only ever sampled the start and end states — which reads as
"the scrub did not run" when it ran perfectly. And it expected the reduced-motion
value to be `14%`, which is the clamp floor *inside* the scrub callback, not the
`25%` the component renders inline. Both were corrected in the test and the
behaviour was left alone.

### 42.8 The 19th gate, and a gap its own negative test found

`lib/site/bundle-boundary.selfcheck.mjs` states the rule on the construct rather
than the consequence: a top-level `import` hoists, a dynamic `import()` does not.
The package list is one array, not a pattern per library.

The negative test restores the static import — and its third case removes the
dynamic import entirely, because a gate that only checked "no static import"
would call deleting the animation a PASS. **That case failed on the first run:**

```
FAIL  remove the dynamic import entirely — deleting the feature must NOT read as a fix  -> exit 0
```

The file contains `type GsapModule = typeof import("gsap").gsap`. That is a
**type-position** import expression — it emits no runtime code and loads nothing,
but it matches `import("gsap")` exactly, so the type alias alone satisfied the
gate. Fixed with a negative lookbehind for `typeof`, which is the same shape as
§33's placement-versus-multiplicity fix: the detector was matching something that
looked like the thing and was not.

```
PASS  restore the static gsap import (§42)              -> exit 1
PASS  restore a static gsap/ScrollTrigger import        -> exit 1
PASS  remove the dynamic import entirely                -> exit 1
PASS  components\sections\hero-product.tsx restored byte-for-byte
```

The gate also asserts `ScrollTrigger.create` still exists, so deleting the feature
cannot pass it from either direction.

### 42.9 Still open

The shared baseline is **471 KB on `/login`** after this fix. Of that, React and
the Next runtime are irreducible; `motion` (130 KB raw) and the Radix primitives
are used by chrome on every page and are re-classified rather than banned in the
gate. Reducing that baseline further is a real project — lazy-loading the demo
shells, or deferring Motion below the fold — and is **not** attempted here. It is
recorded as the next measurable target, not claimed as done.

## 43. Documentation truthfulness — the sweep §24 stopped short of

§24 corrected two documents. There are **43 more** in this repository. This phase
re-checked the claims that are mechanically verifiable, because falsehoods in
this project have clustered in exactly one place: statements about what the system
does, written at a time when it did something else.

### 43.1 The product-count claim: verified, and my own script got it wrong twice

"18 products" appears in `public/llms.txt`, `README.md`, and roughly a dozen
documents. `scripts/product-count.mjs` checks it against the source.

It took three versions of that script to produce a trustworthy answer, and the
two failures were both mine:

**Version 1** sliced `PRODUCT_REGISTRY` with a bracket-matching routine written
for arrays. The registry is an object literal, so the slice stopped at the first
`testRoles` array three entries in and reported **3 products**. It then printed
"THE TWO CATALOGS DISAGREE" — a confident wrong answer about a real question.

**Version 2** reported three dangling `marketingUrl`s: `/#operations-360` twice
and `/bitsagent`. All three resolve — the homepage really does carry
`id="operations-360"`, and `/bitsagent` is a live route at
`app/(marketing)/bitsagent/page.tsx`. The rule was wrong, not the site: it
demanded every marketing URL be a `bitsProducts` slug, which ignores homepage
anchors and standalone pages. Resolving links against the real route tree is
`link-integrity.selfcheck`'s job, and duplicating it with a weaker rule only
manufactures findings.

**The answer, and it is a useful one:**

```
bitsProducts      (lib/site.ts, marketing catalog) : 18
PRODUCT_REGISTRY  (lib/products/registry.ts, demo)  : 19
  sandboxStatus breakdown : {"live":6, "planned":14}

llms.txt:57 says "18"  ->  matches the marketing catalog
```

**"18 products" is correct.** The apparent "18 vs 19 engines" contradiction is
two catalogs answering two different questions — what the site sells versus what
`/demo` can be entered as. §8 item 9 had already recorded this; it is now
confirmed from source rather than asserted. Blog count checked too: 5 posts,
matching the documents.

### 43.2 `docs/SECURITY.md` had never been through the §29 pass, and carried three stale claims

The security document is the last place a false claim does the most damage.
Three statements were wrong:

| Claim | Reality |
|---|---|
| "Login — **No rate limit** — see limitations" and "No rate limit on login · Medium · Add an edge/auth rate limit" | §15 added rate limiting to `loginAction` (per account **and** per client, consumed *before* validation) and to `forgotPasswordAction` |
| "CRM records stored in localStorage — records are client-side only; server persistence not built" | Half true, and the wrong half. `store.tsx` hydrates from localStorage **and** fetches `/api/crm/leads`, merging real inbound submissions. `test:crm` sees 10 live leads. Edits still never leave the browser — that part is accurate |
| "Seeded demo rows reference real companies — **Fictional data; purging the live rows is owner-approved**" | Both halves false. The rows contain **named individuals at real, named Philippine companies**. And `SYSTEM_AUDIT.md` §8 item 2 says *"Decision needed: purge vs relabel in place"* — explicitly open |

The third is the serious one, and it is not a stale number. **It asserts owner
consent that does not exist**, about a destructive action on live data. A
document that says "approved" stops anyone from asking, and that is precisely how
a purge happens without a decision being made.

`docs/SECURITY.md` now carries a **Critical** row for the committed demo
credential (§32, §40) and describes the CRM data flow accurately: real origin,
client-side persistence.

### 43.3 `PROJECT_STATUS.md` repeated the same false consent claim

§24 corrected this file but missed line 55, which read *"purging them is an
owner-approved operation (SYSTEM_AUDIT §8)"* — citing §8 as the authority for a
claim §8 contradicts. Corrected, with the contradiction stated.

Three further entries were stale in the same way, all saying **NOT RE-RUN** about
suites that have since been fixed and run:

| Entry said | Now |
|---|---|
| "Headless Browser Automated Verification: NOT RE-RUN" | `test:crm` **PASS, 29 assertions** (§35) |
| "11-Viewport Playwright Test: NOT RE-RUN — requires a running server" | **PASS, 11 profiles** — the suite starts its own server now (§38) |
| "Framework: Next.js 16.3.5" | **16.3.8** (§41) |

Added, with current evidence: per-page transfer weight (§42), dependency posture
(§41), and live RLS verification (§40).

### 43.4 The pattern worth naming

Three of the four defects here share a shape: **a document stating a fact that
was true when written, and not updated when the code moved.** Nothing is
fabricated. Nobody lied. The code changed in §15, §35, §38 and §41, and four
sentences describing the older code stayed.

That is why they are hard to see. A fabricated number invites scepticism; a
true-looking number does not. And "owner-approved" is the most dangerous
instance of the pattern, because it is not about the code at all — it is about
something only a person can grant, and no automated check can ever verify it.

`SYSTEM_AUDIT.md` §2 is now the single place that carries a verification table,
because a table with one row per claim is reviewable and five documents with
overlapping tables are not.

### 43.5 Verification

`node scripts/product-count.mjs` — 18 marketing products, 19 demo engines, 6 live
sandboxes, `llms.txt`'s "18" matches. `node scripts/scan-text-damage.mjs` — clean.
`PROJECT_STATUS.md` and `docs/SECURITY.md` re-read after editing; both UTF-8
clean, no BOM.

---

## §44 — DEPLOYMENT.md, two stale review docs, and a gate that could not say no

Three documents were wrong. Fixing the third one turned up a hole in a security
gate that had been green for fifteen phases.

### 44.1 `docs/DEPLOYMENT.md` said a deployer needed no configuration

The file was 23 lines. Two of its claims were false:

| It said | Reality |
|---|---|
| "No CRM DB env vars yet" | False since §16 — the CRM is Supabase-backed |
| the contact form is "unrelated to CRM mock" | It **is** the CRM's lead source; every row it accepts populates `inbound_leads` |

A deployer following it would have configured nothing and shipped.

Rewritten from source, not from the old text. The part that matters:

**The asymmetry.** `SUPABASE_SERVICE_ROLE_KEY` has no default and
`createServiceClient()` **throws**. `NEXT_PUBLIC_SUPABASE_URL` and
`..._ANON_KEY` have **hardcoded production fallbacks** in four files
(`proxy.ts`, `lib/supabase/{server,middleware,client}.ts`).

```
service-role key  →  fails CLOSED   (throws)
url + anon key    →  fails OPEN     (silently targets production)
```

So **a deploy that forgets its Supabase variables still works, and it works
against the live project.** Nothing errors. That is usually the right outcome
and it is dangerous for exactly one case: deploying a preview or a fork and
believing it is isolated.

Also documented: three mail addresses, not one. `bits_inquiries@boundlessits.com`
is published to visitors, `boundlessitsolutions@gmail.com` is the internal alert
inbox, `inquiries@boundlessits.com` is the envelope sender. The first two are
different **by design** (`lib/contact.ts:21-30`) and the split reads like a bug
until you find that comment. `.env.example` still carries an
`onboarding@resend.dev` / `bits.ph` block that matches neither.

### 44.2 A CRO review scoring a section that no longer exists

`docs/landing-page-growth-review.md` marked the homepage security section
**✅ Optimal 9.0/10**, citing *"Granular RBAC matrix, immutable audit logs,
air-gapped encryption, and BSP data sovereignty."*

Three of those four were removed in §29. What ships now is badged **Roadmap**,
with a caption stating *"This build does not enforce per-role access — any
authenticated operator can read every CRM record today."*

Corrected in place. The scores were **not** re-run: re-scoring against the
current build is work nobody has done, and editing a score to look current
would fabricate a review. The status line "Verified & Production Ready" also
went — production still serves the pre-audit build (§30).

### 44.3 A proposal document holding copy that cannot ship

`docs/LANDING-PAGE-REV-2026-10-06.md` proposes hero sub-copy for a paid landing
page. One option ends:

> *"Quiet hours, cease-and-desist enforcement and an immutable audit log are
> built in, not bolted on."*

None of the three exists. `lib/security-data.ts:120` says so outright: *"Call-
frequency and cease-and-desist handling is not part of this build."*

Marked **DO NOT SHIP** with a replacement built only from §29-verified controls.

### 44.4 CORRECTION — §44's first correction was itself false

My first draft of that note asserted the copy **"would have failed the build"**,
because all three features are banned attestations in
`lib/site/security-claims.mjs`.

**It does not.** I wrote that from the gate's *rule list*, not its *output*:

```
Quiet hours, cease-and-desist enforcement and an immutable audit log
are built in, not bolted on.        →  0 hits.  PASSES.
```

Same mistake shape as §43: I stated a fact about a component without running the
component. It is now corrected in the document itself, in place.

### 44.5 The actual hole: `SCOPED_OUT` is a sentence-level blanket

`SCOPED_OUT` decides whether a sentence is an affirmative claim. It is tested
against the **whole sentence**, so **one denial licenses every claim in that
sentence** — including ones the denial has nothing to do with. Here the "not"
negates the *build style*; the three controls were named earlier in the line.

This is not an exotic string. It is the shape English marketing copy takes.

**Three tightenings were built and measured against the honest copy this repo
actually ships.** All three broke it:

| Approach | Result |
|---|---|
| Clause-scoped — split on `,` `;` and/or/nor/but/yet | **6 honest denials broke.** *"Not shipped: per-role authorization and audit logging"* strands "audit logging"; *"Neither SSO nor MFA is implemented"* strands "MFA"; *"Target: full, access-logged"* strands "access-logged" |
| Positional — a denial must **precede** the term | **4 broke**, including *"HIPAA is not applicable to this product"* and *"Call-frequency and cease-and-desist handling is not part of this build"*, where the denial legitimately trails |
| Distance window — denial within W chars either side | Swept. W ≤ 20 catches all 4 false strings but breaks 2 honest ones; W ≥ 30 passes all 17 honest but misses 2 false |

**The blocking case is an exact tie:**

```
"Immutable audit logging — roadmap"            marker at term + 26
"Quiet hours are built in, not bolted on."     marker at term + 26
```

No threshold separates them. The classes differ by **meaning** — "roadmap"
scopes the control, "bolted on" scopes the word "built" — and telling those apart
needs semantics a regex does not have. A regex that pretended to would be a rule
satisfiable by rewording: worse than an honest gap, because it would read as
coverage.

**The gap is therefore left open and stated.** Per the rule that has governed
every heuristic here: if separation is zero, report it — do not guess.

### 44.6 A green that was partly accidental

While measuring, one honest string was found passing for the wrong reason:

```
"Contact-window, frequency-capping and do-not-call handling is …"
```

`\bnot\b` matches **inside** `do-not-call` — hyphens are word boundaries. That
string was never exempted by a denial; it was exempted by its own hyphenation.

Which means the `contact-rules` must-pass case in the gate's own negative-test
table (*"Contact rules are configured per engagement"*) **does not match the
rule's regex at all**. It passes vacuously. It is now covered for real, by the
string above.

### 44.7 What was added

**`scripts/scoping-regression.mjs`** — the exemption is load-bearing for 10
honest strings that ship in user-facing copy. This discovers them **from the
source files at runtime** and pins them, so it cannot drift: add an honest
denial, it is pinned automatically; tighten the scoping, it fails naming the
exact string and file, and says *"fix the scoping, NOT this string."*

The floor is **10**, the measured count — not a rounder number. A guessed floor
of 15 was tried first and failed, which is how the real number was found.

**`lib/site/security-claims.mjs`** — `SECURITY_SURFACES` moved here from the
selfcheck runner so both the gate and the regression script read one list. Two
lists of "what counts as a security surface" drift, and the drifting one quietly
stops being checked.

**`scripts/probe-proposed-copy.mjs`** — records the gap. Its first assertion is
**deliberately inverted**: it asserts the bad copy still passes, so the day
anyone closes the gap this script fails and says *"invert me if fixed."* Asserting
that a false claim gets through looks strange until you realise it is the only
thing that notices the fix.

### 44.8 Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | PASS |
| `npm run test:unit` | **21/21 PASS** — ai-disclosure unchanged at 10 surfaces / 1,938 strings / 13 attestations; scoping-regression pins 10 honest denials |
| `node scripts/scoping-regression.mjs` | PASS — **10 honest denials pinned** from source |
| `node scripts/probe-proposed-copy.mjs` | PASS — 6 assertions, gap tracked |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS — 332 files |
| `npm audit` | 0 vulnerabilities (unchanged, §41) |

The ai-disclosure gate is **byte-identical in behaviour** to before this section:
the scoping rule was reverted after measurement, not weakened to make a test
pass. Only the comment above `SCOPED_OUT` changed, to record the gap and the
three failed attempts so the next person does not re-derive them.

### 44.9 The lesson, fourth time

I asserted something about a gate's behaviour without running the gate. §43 was
documents stating facts that had gone stale; this was me stating a fact about a
component that had never been true. Same failure — a claim about code that no
check had ever exercised.

The fix is unglamorous and was already known: **feed the real thing through the
real code and read the output.** It took one probe file, and it found both a
live hole in a security gate and an accidental green inside that same gate.
---

## §45 — version drift, and making it a check

### 45.1 The header was wrong in the document that audits the code

`SYSTEM_AUDIT.md` line 6 read:

```
> **Stack (verified):** Next.js 16.3.5 | React 19.3.0 | TypeScript 7.0.2 | Tailwind 4.3.3
```

§41 upgraded `next` 16.3.5 → 16.3.8 to clear **1 critical + 6 high** advisories,
and recorded at §41 that *"the README also pinned `next@16.3.5`; updated to
`16.3.8`"*.

Then §43 found `PROJECT_STATUS.md` still saying 16.3.5 — the identical drift, in
a different file, and §41 had cited §8 as authority for a claim §8 contradicts.

So: §41 fixed the README and missed three other places, one of which was the
header of the audit report itself, on the first line a reader sees before reading
anything else, **3,527 lines above the correction that fixed the same number.**

### 45.2 The correction found a second file nobody had looked at

Fixing the header prompted a check of the other stack declarations, which turned
up `docs/FULL_SYSTEM_DOCUMENTATION.md:76` still saying **16.3.5** — so it was
**two** files stale, not one, and neither had been caught by any of the previous
45 sections.

Both corrected.

### 45.3 This one is mechanically checkable, so it should not rely on memory

§43's closing observation was that nobody lied; documents stated facts that were
true when written and did not move with the code. That is a review problem. This
one is not — it is a **diff against `package.json`**, so leaving it to a future
reader's memory is the wrong call.

**`scripts/stack-version-drift.mjs`** (21st gate) compares **14 declared
versions across 4 files** against the manifest. Values are derived from
`package.json`; only the *locations* are declared, the same shape as the
negative-test table.

**Why it matches only the stack-declaration lines, never prose.** §44 measured
exactly this problem one section earlier: a gate that scans prose for a pattern
and needs an escape hatch for historical mentions has, in general, **no
separation** between the classes — proved with a sweep, two strings at identical
distance, no threshold between them. `SYSTEM_AUDIT.md` narrates the 16.3.5
history in §41 and §43 deliberately. A looser rule here would either
false-positive on the audit trail or acquire an escape hatch that becomes a
loophole.

### 45.4 The negative test found a real hole in the new gate

`scripts/stack-version-drift-negative.mjs` — 5 cases, 15 assertions.

Three caught version mismatches in the three different line shapes (table row,
pipe-delimited header, bullet). One is the control (unmutated repo must be
clean — if the drift gate failed here, every other case would have "passed" for
the wrong reason).

The fourth was written to test the obvious failure mode — *if a doc restructure
stopped these lines matching, the gate would report zero problems while checking
nothing* — and **it passed when it should have failed.**

The first version only asked *"did any row match this file?"* Renaming the
Framework row left three rows matching, so the file looked covered while
`next`'s version in it went silently unchecked. Now every **declared slot** must
still be found, and the failure names the slot:

```
README.md: the "Styling" stack row is missing. Its version is no longer
checked anywhere in this file.
```

### 45.5 Two of my own bugs, in the same script

Recorded because both were caught by running things rather than by reading them:

1. The header parser destructured `[label, version]` from a `matchAll` entry,
   which is `[fullMatch, group1, group2]`. Every package label read as
   `"Next.js 16.3.8"` and all four lookups missed. The gate reported 4 bogus
   findings instead of the 1 real one.
2. The per-slot fix then failed `SYSTEM_AUDIT.md` as vacuous, because
   `foundSlots` is only populated on the table path and the header path
   `continue`s before it. The anti-vacuity check had to track the header with
   its own flag.

Both were found by running the gate and reading the output, not by reasoning
about the code.

### 45.6 The gate flagged this section while it was being written

After both doc fixes, `npm run test:unit` failed:

```
FAIL  docs/SYSTEM_AUDIT.md:4122: header says Next.js 16.3.5, package.json says
      16.3.8. Update the doc — or upgrade the dependency.
```

Line 4122 is the fenced code block in §45.1 **quoting the old header**. The gate
matched a line inside ``` ``` ``` — a code sample showing what the header *used*
to say — and reported it as live drift.

This is the §44 false-positive class arriving in the flesh, one section after
being described: a rule that matches a shape also matches a quotation of that
shape. It is also the strongest possible argument for running gates on the commit
that introduces them.

Fixed by making the gate **fence-aware** — a line inside a fence is an
illustration, and that is unambiguous. This is deliberately *not* the prose
escape hatch §44 rejected: a fence is a hard boundary, whereas "skip text that
looks historical" is a judgement call with no measurable separation.

The negative test's case 2 had to be re-anchored for the same reason: it matched
on `"| React 19.3.0 |"`, which now appears twice — once live, once in the quote.

### 45.7 Verification

| Check | Result |
|---|---|
| `node scripts/stack-version-drift.mjs` | PASS — 14 declared versions across 4 files |
| `node scripts/stack-version-drift-negative.mjs` | **5/5 cases**, 15 assertions, all files restored byte-for-byte |
| `npm run test:unit` | **21/21 PASS** |
| `npx tsc --noEmit` | PASS |

The gate found **1 real drift** on its first run (`FULL_SYSTEM_DOCUMENTATION.md`),
before the anti-vacuity hardening. It has negative-tested coverage for all three
line shapes and for the vacuity case.

---

## §46 — the canonical architecture doc refuted itself

### 46.1 A banner that says "not implemented" and a body that says otherwise

`docs/FULL_SYSTEM_DOCUMENTURE.md` opens with a prominent warning — added 8 Oct by
an earlier pass — declaring that it is a **design spec, not a capability list**,
with a table of things described below that are **not built**.

Two hundred lines later, §6 listed them as capabilities:

| §6 table said | Banner said, same file |
|---|---|
| "SSO/SAML integration" | *"SSO / SAML authentication — Not implemented"* |
| "IP whitelist enforcement" | *"IP whitelisting — Not implemented"* |
| "BSP 454 harassment violation tagging" | *"BSP 454 tagging compliance — Not implemented"* |
| "audit logging" | (not listed — absent entirely) |
| "exportable bank audit certificates" | (not listed — absent entirely) |
| "sovereign compliance certification" | (not listed — absent entirely) |
| "API key rotation" | (not listed — absent entirely) |

The document was refuting itself. A reader who trusted the banner and a reader
who trusted §6 reached **opposite conclusions from the same file** — and §6 is
the section someone reads when they want to know what a role can do.

### 46.2 Two banner rows were stale the other way

The banner was also wrong about things that *had* become true. Both are the §43
pattern: a true-when-written fact that the code moved past.

| Row said | Reality |
|---|---|
| "CRM server-side record persistence — Not implemented, localStorage only" | **False since §16.** `lib/crm/store.tsx` fetches `/api/crm/leads` at lines 208 and 868 and merges the live `inbound_leads` rows — 10 of them. Only *edits* stay client-side |
| "Only 6 `/app/*` routes are built" | **11**, measured from `app/`. Plus 14 `/crm-*` routes — 41 total |

The first is the exact half-truth §43 corrected in `docs/SECURITY.md`. It had
already been identified, fixed in one document, and left standing in the other.

### 46.3 §3 fabricated two capabilities

> *"BITS utilizes Supabase for secure data persistence, **role-based access
> control**, and **real-time event streaming**."*

- **No RBAC.** `requireCrmUser()` authenticates a session and never reads a role.
- **No realtime.** Zero `.channel()`, zero `.subscribe()` in the repository.
- Also *"Sovereign low-latency cluster"* — "sovereign" implies a regulatory
  residency determination that has never been made for this project.

### 46.4 What §6 claimed, checked one row at a time

| Claim | Verified |
|---|---|
| Automated audio transcription | **No audio pipeline exists.** The only transcripts are hardcoded demo arrays in `components/sections/bits-agent-call.tsx` (lines 40, 65, 90) |
| BSP 454 harassment tagging | Not implemented (banner already said so) |
| Exportable bank audit certificates | No certificate-export code |
| Sovereign compliance certification | No BSP certification or audit performed (§29) |
| SSO/SAML integration | Only as a **mock ticket cell** (`TICK-8842 BDO FinTech SAML Rotation`) and a **mock email subject** (`P2: Okta SAML 2.0 IdP…`). No integration |
| IP whitelist enforcement | No such code |
| API key rotation | No such code |
| Audit logging | No audit table, no append-only store |

Every `/app/*` page the table names **does exist** — `/app/dashboard`,
`/app/leads`, `/app/settings` are all real routes. The fabrication was in the
permissions column, not the paths.

### 46.5 §7 conflated two catalogues

The heading read *"The 18 Enterprise Engines"*. §43 established that two
catalogues answer two different questions: `bitsProducts` = **18** marketing
products (what the site sells, what generates `/products/<slug>`) and
`PRODUCT_REGISTRY` = **19** demo engines (6 live, 14 planned, what `/demo`
offers). Both numbers are correct for their own surface; one label for both is
not. `llms.txt`'s "18" remains correct. Re-titled, anchors updated.

### 46.6 What was deliberately NOT rewritten

§7's per-item capability descriptions — *"Maya & GCash direct webhooks"*,
*"BIR CAS compliant"*, *"biometric attendance integration"*, *"dynamic NFC
identity verification"* — describe **product lines that live outside this
repository**: ERP/accounting, HRMS payroll, warehouse inventory, NFC, GPS field
operations.

Deleting them would assert they do not exist. Keeping them unqualified asserts
they do. Both are overreach: absence of evidence in this repo is not evidence of
absence in a deployment this repo cannot see (§29 established the same principle
for the marketing site).

So they are **flagged, not rewritten**, and the decision is referred to the owner
— it is the same open question as §8's *"confirm whether out-of-repo product
lines are real deployments."*

### 46.7 The recurring shape, now three for four

§43 documented it: *"a document stating a fact that was true when written, and
not updated when the code moved. Nothing is fabricated."*

§46's finding is subtly different and worth separating out. The §6 table was
**never true** — nobody ever built SSO/SAML or an audit subsystem here. It is a
**design document describing a Release 2.0 target**, written in the present
tense, where the tense is the entire problem. A reader skimming a table of
"Core Needs & Permissions" does not register a design intent.

That is why the banner existed and **why it was not enough**: a disclaimer at the
top of a 500-line document does not survive someone scrolling to the table they
need. The correction had to land *in* §6, which it now has.

### 46.8 Verification

| Check | Result |
|---|---|
| `node lib/site/link-integrity.selfcheck.mjs` | PASS — 41 routes, 22 anchors, 51 skip links (TOC anchors re-pointed after two headings changed) |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS — 334 files |
| `node scripts/stack-version-drift.mjs` | PASS — 14 declared versions |
| `npm run test:unit` | **21/21 PASS** |
| Route count | `/app/*` **11**, `/crm-*` **14**, total **41** — measured, not asserted |
| CRM persistence | `lib/crm/store.tsx:208,868` — confirmed server-backed reads |

These claims escaped every existing gate. `ai-disclosure` scans ten **security
surfaces**, all of them application code — `docs/` is not one of them. A
documentation claim about security is not a security surface by construction,
which is the gap, and it is a real one.

---

## §47 — three stale references, and the third wall

### 47.1 `ARCHITECTURE.md` pointed at a file that does not exist

```
app/(crm)/app/       Authenticated CRM shell
middleware.ts        Gates /app/* ; redirects authed users away from login
```

**There is no `middleware.ts`.** Next.js 16 renamed it; the file in this
repository is `proxy.ts` — the same file that carries the hardcoded production
Supabase fallback described in §44. A reader following this line would conclude
the auth gate lives in a file that was never there.

The same document also said *"Refresh browser → seed resets (**expected until
DB**)"*. The database arrived in §16. And its closing section was titled
**"Out of scope (pre-DB)"**, listing **RLS and persistence as future work** — both
shipped in §16. Rewritten as a status table; only *"enforced RBAC beyond soft
UI"* remains genuinely out of scope.

That is the **fourth** document in three phases still describing the pre-Supabase
architecture.

### 47.2 A server action that never existed, cited as live

`README.md`'s architecture diagram declared:

```
LeadAction[app/actions/lead.ts]
```

`app/actions/` contains exactly two files: `auth.ts` and `contact.ts`.
`git log --all -- app/actions/lead.ts` returns **nothing** — the file has never
existed in this repository's history.

The same phantom path was cited in `FULL_SYSTEM_DOCUMENTATION.md` as the insert
path for the RLS section: *"Web actions (`app/actions/lead.ts`) insert via
`service_role`"*. The real path is `app/actions/contact.ts`.

Both corrected. While there, the README diagram's `Sovereign Services` node was
renamed `Supabase Services` — same word §46 flagged in the architecture doc.

### 47.3 A documentation index with a dead entry

`PROJECT_STATUS.md` lists five reference documents. Four exist. The fifth,
`docs/CRM_BENCHMARK_AND_PRICING_STRATEGY.md`, **does not exist and never has** —
no git history, no file.

Marked rather than silently deleted, so the gap stays visible instead of
looking like an oversight.

### 47.4 The scanner I built, and why it is not a gate

`scripts/doc-path-integrity.mjs` extracts every backticked path from 39 markdown
files (778 tokens), resolves each, and lists what does not exist. It is
**report-only, exit 0, and always will be.**

The first version reported 30+ false positives because it resolved bare
filenames at the repo root — `pricing.tsx` is really
`components/sections/pricing.tsx`. Fixed: a token **with a directory** must
resolve exactly; a **bare filename** may resolve by basename anywhere.

That version found the three real defects above. It also flagged:

| Flagged | Reality |
|---|---|
| `scripts/fetch-bionis.mjs` | **Correct.** Deleted by `f50417c`; `PROJECT_STATUS.md`, `SECURITY.md` and `SYSTEM_AUDIT.md` all say "were deleted" |
| `lib/crm/auth.ts` | **Correct.** "The dead CRM auth shim", removed in the same commit |
| `components/crm/pipeline-board.tsx` | **Correct.** Described as deleted in `SYSTEM_AUDIT.md` §7 |

So: 3 real, 3 correct. And the three correct ones are correct because they are in
the **past tense** while the real ones are in the present.

### 47.5 The same wall, third time, from a different direction

Distinguishing those two cases requires knowing whether a sentence describes
**history** or **current state**. That is semantic. It is the identical wall §44
hit from the opposite side:

- §44: a gate scanning prose asking *"is this a claim or a denial?"* — no
  separation, proven with a sweep, left open.
- §47: a filesystem check that is perfectly decidable in isolation, but whose
  *use* requires knowing whether the citation is live — no separation either.

The difference is that §47's underlying fact ("does this path exist?") **is**
decidable. So the honest move is not to discard the tool but to be precise about
what it is: a **worklist**, not a verdict. The header tells the next person the
discriminator — `git log --oneline -1 --all -- <path>` — so every entry is
decidable in one command, and a human makes the call.

A hard-failing gate here would be roughly 50% false positives on this corpus. A
gate that cries wolf gets deleted or ignored, and both outcomes are worse than
an honest report.

### 47.6 What the four stale documents share

`ARCHITECTURE.md`, `FULL_SYSTEM_DOCUMENTATION.md`, `FIND_BUGS.md` and
`PROJECT_STATUS.md` all predate the Supabase work and were never swept. The
pattern is not carelessness — it is that **nothing in the toolchain reads
documentation**, so nothing reports a doc drifting from the code. Gates read
code; docs are only read by people, who notice on the days they happen to look.

That is the real finding of §46 and §47 together, and it is the reason a
scan-then-triage tool is the right deliverable here rather than a 22nd gate:
the gap is one of **automated coverage**, and closing it needs either
linting markdown into the CI chain or accepting that documentation truth is a
manual, recurring cost.

---

## §48 — the gate could not see a paid tier selling controls that don't exist

Started as a doc sweep of `MARKETING_PRODUCT_GUIDE.md` and ended as the most
serious commercial finding in this audit.

### 48.1 The Enterprise tier was advertising absent security controls

`components/sections/pricing.tsx` — the **Enterprise & Sovereign** paid tier —
listed:

```
"Strict client & campaign portfolio tenant data isolation",
"Six-tier role-based permission matrix (RBAC) & immutable WORM audit logs",
```

Three banned attestations across two lines, on a page a customer reads before
sending money. All three are **verified absent**, not merely unverified:

- **No tenant or campaign isolation.** Every RLS policy is `using (true)` for
  `authenticated`. There is exactly one privilege level.
- **No RBAC.** `requireCrmUser()` authenticates a session and never reads a role.
- **No audit store.** No table, no writes, no append-only anything.

Also removed: *"Statutory quiet-hours compliance & carrier-aware phone number
scrubbing"* (Growth Floor) and *"Taglish conversational cadence & dynamic
statutory quiet-hour governance"* (BITSagent tier) — `lib/security-data.ts:120`
states contact-rule enforcement is *"not part of this build"*.

And *"Enterprise RBAC permissions & compliance audit trail"* in the BITScrm
Commerce enterprise tier — the same two absent controls, sold a second time.

**8 findings in `pricing.tsx` → 0.**

### 48.2 It was already removed from a sibling table in the same codebase

`lib/site.ts` had *already* deleted these exact words from `pricingComparisonMatrix`,
with a note that is worth reading as the whole finding:

> *"Neither capability exists in the deployed build… 'WORM' is a compliance term
> with legal meaning and cannot be sold as a tier feature that has not shipped."*

Correct reasoning, correct action — applied to **one** of the two places that
sell them. The pricing *comparison table* was cleaned. The pricing *tier list*,
40 lines away in a different file, was not.

That is not carelessness. It is a coverage list. §29 fixed the claims it could
see and `components/sections/pricing.tsx` was not on it.

### 48.3 Measuring the blind spot

A probe ran the real `findClaims` over ten public surfaces and labelled each as
scanned or unscanned:

| File | In `SECURITY_SURFACES`? | Claims found |
|---|---|---|
| `components/sections/pricing.tsx` | no | **8** |
| `app/(marketing)/products/[slug]/page.tsx` | no | **8** |
| `components/sections/products-suite.tsx` | no | 11 |
| `components/sections/bits-agent-page-content.tsx` | no | 3 |
| `components/sections/floor-showcase.tsx` | no | 2 |
| `app/(marketing)/products/crm/page.tsx` | no | 2 |
| `components/sections/product-showcase.tsx` | no | 1 |
| `app/(marketing)/bitscrm/page.tsx` | **yes** | 0 |
| `components/sections/security.tsx` | **yes** | 0 |
| `app/(marketing)/security/page.tsx` | **yes** | 0 |

**35 banned attestations sat on public surfaces the gate never looked at.** Every
surface already on the list was clean — the gate was working perfectly, on the
ten files it knew about.

### 48.4 Also removed from public copy

| File | Claim | Why false |
|---|---|---|
| `products/[slug]/page.tsx` | stat tile *"0-Day / Audit Trail Latency / **Immutable WORM activity logs**"* — rendered on **every** product page | No audit store |
| `product-showcase.tsx` | *"Live GPS geofencing, **tamper-proof** visit timestamps…"* | No field app; `FULL_SYSTEM_DOCUMENTATION.md` lists *"Live GPS field app: Not implemented"* |
| `floor-showcase.tsx` | *"**Tamper-Proof** Timestamps: …locked from server-verified GPS satellite pings"* and a *"Tamper-Proof Audit Timestamps"* panel | No tamper-evident store, no field app |

`35 → 20`. `product-showcase.tsx` and `floor-showcase.tsx` are now clean; the
20 that remain are **out-of-repo product lines** (`products-suite` 11, `products/[slug]` 4, `bits-agent` 3, `products/crm` 2), which §29 deliberately reports rather than blocks.

### 48.5 The gate now covers pricing

`components/sections/pricing.tsx` added to `SECURITY_SURFACES`, with the reason
in the source: *"a price a customer pays is a security claim like any other."*

```
ai-disclosure: 10 surfaces / 1,938 strings  →  11 surfaces / 2,231 strings
```

### 48.6 What I did NOT add, and why

The obvious next move — add all six unscanned files — would **fail the build on
claims this repository cannot adjudicate.** `products-suite.tsx`'s
*"WORM Ledger Hash"* belongs to the accounting product line; that line may well
be a real deployment this repo cannot see. §29's principle applies:
absence of evidence here is not evidence of absence there, so those are reported
as inventory, never as a build failure.

Gating them would convert an owner decision (§8: *are the out-of-repo product
lines real deployments?*) into a broken build — the gate would pressure someone
into deleting accurate descriptions of software they may actually ship.

So coverage grew by one file, the clearly-false claims were fixed, and the rest
is listed rather than enforced.

### 48.7 The playbook

`docs/MARKETING_PRODUCT_GUIDE.md` is **confidential internal** material — a
salesperson may read a line from it aloud in a live deal, which makes an error
here worse than one on a public page. It had **no** warning banner, unlike
`FULL_SYSTEM_DOCUMENTATION.md`. It promised:

> *"Compliance Lock: Hard-locks outgoing calls and SMS outside legal contact
> hours (6:00 AM – 10:00 PM) with **100% immutable WORM audio logs**."*

and described BITScrm Collections as having *"built-in browser WebRTC SIP
predictive auto-dialing"* with *"live call listen, whisper coaching, and call
barging."*

**There is no telephony in this repository.** `RTCPeerConnection`, `getUserMedia`
and SDP handling return **zero matches** across the codebase; the 145 occurrences
of "WebRTC" across 25 files are marketing copy and demo UI strings. That is
verified absence, not a gap in verification.

Banner added, both claims struck with instructions not to repeat them.

### 48.8 Verification

| Check | Result |
|---|---|
| `npx tsc --noEmit` | PASS |
| `npm run test:unit` | **21/21 PASS** — ai-disclosure now 11 surfaces / 2,231 strings |
| Unscanned-claim probe | 35 → **20**, all remaining out-of-repo product lines |
| `pricing.tsx` | 8 → **0**, and now gated |

The probe is a scratch script, not a gate — same reasoning as §47: the file
that separates a false claim from an accurate description of software that lives
elsewhere is a judgement this audit is not entitled to automate.

---

## §49 — the blind spot, measured exhaustively

§48's probe covered ten files by hand. This measures all of them.

### 49.1 The tool

`scripts/claim-coverage.mjs` walks every `.ts`/`.tsx` under `app/` and
`components/` — **122 files, 16,578 visible string instances** — runs the real
`findClaims` over each, and splits the result two ways:

- **Gated** (in `SECURITY_SURFACES`): a finding here means the build *should*
  have failed. It is the regression signal, and it is printed loudly.
- **Blind spot**: a file nobody scans. This is §48's failure mode, enumerated.

Report-only, exit 0, for the reason §48.6 gives: a finding means "this file
contains a banned attestation", **not** "this claim is false". Out-of-repo
product lines cannot be adjudicated from here.

It also prints the gated files that are clean. A report that only prints
failures cannot show that the gate works where it applies — and that is the
claim needing evidence.

### 49.2 What it found

Hand-probing found 35 findings across 6 files. Exhaustively: **44 across 13.**
The nine extra were in files I had not thought to check.

```
=== GATED SURFACES ===  11/11 clean
=== BLIND SPOT ===
  11  components/sections/products-suite.tsx
   8  components/sections/industries.tsx        ← HOMEPAGE
   4  app/(marketing)/products/[slug]/page.tsx
   4  components/sections/hero-product.tsx      ← HOMEPAGE HERO
   3  app/demo/page.tsx
   3  components/sections/bits-agent-page-content.tsx
   2  app/(crm)/app/dashboard/page.tsx          ← AUTHENTICATED CRM
   2  app/(marketing)/products/crm/page.tsx
   2  components/sections/deployment-models.tsx
   2  components/sections/the-difference.tsx
   1  app/(crm)/app/settings/page.tsx           ← AUTHENTICATED CRM
   1  components/sections/bits-agent-call.tsx
   1  components/sections/product-families.tsx
```

**Every gated surface was clean.** The gate was working perfectly on the eleven
files it knew about, and blind on thirteen more — including two homepage
sections and two pages *behind the login*.

### 49.3 The two worst, and both were behind the login

`app/(crm)/app/settings/page.tsx` rendered, to a signed-in user:

```jsx
<ShieldCheck className="size-4" />
<span>SOC2 Type II & DPA 2012 Compliant</span>
```

A green shield next to a compliance attestation that **has never been made** —
SOC 2 Type II is a third-party audit, and no such audit has been performed (§28).
No DPA has been signed either.

`app/(crm)/app/dashboard/page.tsx` told signed-in users:

> *"Statutory quiet hours lock active. Outbound dialer auto-campaigns scheduled
> to resume tomorrow at 8:00 AM sharp."*

Contact-rule enforcement is *"not part of this build"*
(`lib/security-data.ts:120`), and there is no dialer — no `RTCPeerConnection`, no
`getUserMedia`, no SDP anywhere in the repository.

These are worse than the §48 pricing page. A pricing page is read before
purchase and can be challenged in a negotiation. **These are inside the product
a paying customer logs into every day**, presented as current system state by
the system itself.

### 49.4 The homepage

`components/sections/industries.tsx` published, as configuration "specimen"
tables:

| Published | Reality |
|---|---|
| `RBAC Matrix — Least-privilege operational roles — Verified` | One privilege level; `requireCrmUser()` never reads a role |
| `Audit Trails — Cryptographic immutable log — Immutable` | No audit store of any kind |
| `Tenant Isolation — Per-client database partitioning — Enforced` | Single-tenant deployment |
| `Quiet Hours — Statutory contact time limits — Compliant` | Not implemented |
| `Multi-Tenant Operations` (section title) | Single-tenant |
| `Supervisor HUD — Listen / whisper / barge — Ready` | No telephony exists |
| Two bare `Enforced` chips | The exact pattern §29's `enforcement-badge` rule exists to catch |

**9 → 0.** A decorative "specimen" table is still a published claim when a
visitor cannot tell it from the surrounding copy, and a small caption is not
consent.

`components/sections/hero-product.tsx` carried *"Immutable Audit Log — Encrypted
call audio locked"* and *"Bank Audit Certificates — Export tamper-proof
compliance logs for partner banks and regulators."* **4 → 1**, and the survivor
is a **false positive** (below).

### 49.5 One file deliberately left ungated

`hero-product.tsx`'s remaining hit is under the heading **"The Floor Pain
Point"**:

> *"Manual QA audits only 2% of calls. One rogue agent using profane threats or
> calling in quiet hours can lose your bank contract."*

That is **true** — a true statement about the customer's risk, not a BITS
capability. The gate cannot see the heading.

Gating the file would fail the build on a correct sentence, and the two ways out
are both bad: teaching the gate the claim/description distinction is the same
unsolvable semantic problem §44 measured, and rewording honest copy so a regex
stops firing is contorting a true sentence to satisfy a checker.

So the file stays a **documented blind spot** with the reason in the source, and
`industries.tsx` — now clean — is gated instead. `11 → 12 surfaces`.

### 49.6 Left in place, deliberately

The remaining 31 findings are out-of-repo product lines (`products-suite` 11,
`products/[slug]` 4, `bits-agent` 3, `demo` 3, and others) plus two **semantic
false positives** I am confident about:

- `the-difference.tsx` — *"Data stored in multi-tenant US/EU clouds that violate
  BSP Circular 808…"* describes **competitors**, not BITS.
- `products/crm/page.tsx` — *"Locked into US multi-tenant clouds with
  unpredictable vendor price hikes"* is likewise a criticism of alternatives.

Neither is fixed, because "we are better because they are multi-tenant" and "we
are multi-tenant" are the same words to a regex. They are recorded here so a
future reader does not "fix" them.

### 49.7 Verification

| Check | Result |
|---|---|
| `node scripts/claim-coverage.mjs` | **12/12 gated surfaces clean**; blind spot 44 → **31** |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **12 surfaces / 2,388 strings** |
| `npx tsc --noEmit` | PASS |
| `npm run test:unit` | **21/21 PASS** |

### 49.8 The shape of §48 and §49 together

§28 removed false security claims from the marketing site. §29 added a gate so it
could not recur. Both worked — on the files the gate covered.

What they missed is not a bug in either. It is that **a list of eleven files was
hand-written**, and a hand-written list is a snapshot of what someone remembered
to look at. Two of the thirteen missed files were the homepage; two more were
behind the login, where a customer meets the product rather than the pitch.

The gate is now at twelve surfaces and 2,388 strings. The honest statement of
where it stands: **it is a net, not a proof.** It catches regressions on the
surfaces it covers, and `claim-coverage.mjs` exists so the gap is measured rather
than assumed — which is how the next uncovered file gets found, whenever that is.

---

## §50 — triaging the blind spot, and gating what it clears

§49 ended with 44 findings on 13 ungated files. The triage question is simple
and it is not mine to answer alone:

> Does this claim belong to a product that **lives in this repository** — or to
> one that may be a real deployment this repository cannot see?

The first is a defect I can fix and verify. The second is the §8 owner decision.

### 50.1 Cleared and fixed — in-repo claims

| File | Claim | Reality |
|---|---|---|
| `deployment-models.tsx` | **"Centralized SSO & RBAC"** behind a green ✓ | No SSO/SAML integration exists — the only occurrences are a mock ticket cell and a mock email subject. No RBAC |
| `product-families.tsx` | **"Multi-Tenant Sovereign"** badge | Single-tenant; one privilege level |
| `app/(crm)/app/settings/page.tsx` | **"SOC2 Type II & DPA 2012 Compliant"** | Attestation never made; no DPA signed |
| `app/(crm)/app/dashboard/page.tsx` | **"BSP 454 Quiet Hour Enforcement"** + "Statutory quiet hours lock active" | Not implemented; no dialer exists |
| `bits-agent-page-content.tsx` | "Quiet hours, DNC, consent, audit" | Not implemented; no audit store |
| `bits-agent-call.tsx` | "Multi-factor confirmation logged to audit trail" | No audit store |
| `products/crm/page.tsx` | "WebRTC predictive dialers … enforcing BSP quiet hours" | No telephony; contact rules not built |
| `the-difference.tsx` | "100% sovereign … with cryptographic audit trails" | No audit store |

**31 → 21 findings. 13 → 6 files.**

The dashboard needed two passes. §49 fixed the body copy and missed the **panel
title** and its **"Automated" state badge** directly above it — the kind of miss
that only appears when the detector runs again rather than when the grep matches.

### 50.2 All six cleared files are now gated

```
SECURITY_SURFACES:  11  →  18
ai-disclosure:  2,388 visible strings  →  3,702
gated surfaces clean:  12/12  →  18/18
```

Six more files cannot silently regrow a false claim, including the two inside
the authenticated CRM. §48's lesson generalised: *correcting* a blind spot
without *covering* it only buys time.

### 50.3 The 21 that remain, and why none were "fixed"

| File | n | Class |
|---|---|---|
| `products-suite.tsx` | 11 | Demo UI strings plus out-of-repo product descriptions |
| `app/(marketing)/products/[slug]/page.tsx` | 4 | Renders `bitsProducts` data — mostly out-of-repo lines |
| `app/demo/page.tsx` | 3 | Labels for engines in `PRODUCT_REGISTRY` (out-of-repo by definition) |
| `products/crm/page.tsx` | 1 | **False positive** — describes competitors |
| `the-difference.tsx` | 1 | **False positive** — describes competitors |
| `hero-product.tsx` | 1 | **False positive** — a true statement about the customer's risk (§49.5) |

Three are known false positives, recorded so nobody "fixes" correct copy.

The other eighteen belong to the out-of-repo lines: *"WORM Ledger Hash"* is the
accounting engine's, *"multi-tenant SLA"* is the CPQ's, *"Zero-Egress
Multi-Tenant"* labels a subdomain showcase. Deleting them asserts software that
may genuinely ship does not exist. Gating them turns a question for the owner
into a broken build. Both were rejected, and §8 is what unblocks them.

### 50.4 The number that matters

Coverage went **11 → 18 surfaces** and **2,388 → 3,702 strings** while the
finding count went **44 → 21**. The gate is not just bigger; it is aimed at the
surfaces that actually reach a customer — two homepage sections, a deployment
comparison, and two pages behind the login.

What is left is 18 findings on product lines this repository cannot adjudicate,
and **3 that are the detector being wrong, not the copy.** The honest summary is
that the in-repo claim surface is now essentially clean, and the remaining
exposure is an owner decision about software outside this repository.

### 50.5 Verification

| Check | Result |
|---|---|
| `node scripts/claim-coverage.mjs` | **18/18 gated surfaces clean**; blind spot 44 → **21** |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **18 surfaces / 3,702 strings** |
| `npx tsc --noEmit` | PASS |
| `npm run test:unit` | **21/21 PASS** |
| `npm run build` | PASS — **71 pages** |

---

## §52 — the AI-facing files were never checked, and the gate had no rule for capability

Started as the last doc sweep. Found the highest-leverage false-claim surface
in the project, and a missing *kind* of rule rather than a missing file.

### 52.1 `public/llms.txt` advertised telephony that does not exist

```txt
- **Telephony & Communications**: Browser-native WebRTC SIP softphone,
  Asterisk / FreePBX PBX integration, automated call recording,
  real-time transcription, and omnichannel routing…
```

None of it exists. Verified absence, not absence of checking — `RTCPeerConnection`,
`getUserMedia`, SDP handling: **zero matches across 122 source files.**
`Asterisk`, `FreePBX`: zero. `GraphQL`: zero matches anywhere.

`public/llms-full.txt` added *"SIP/WebRTC trunking, REST and **GraphQL** APIs,
Webhooks, and legacy database migration pipelines"* to the same file family.

Why this surface matters more than any other:

- It is **the file language models read**. A visitor can ignore a claim on a page.
  An assistant will repeat it to a prospect, in its own words, with no design
  context, no scepticism and no ability to check.
- §28 cleaned the **security** section of these files superbly — `llms.txt:62`
  remains a model of honest disclosure, explicitly denying RBAC, WORM logging,
  SOC 2 and HIPAA, and attributing encryption to the hosting layer. It left the
  **telephony** section untouched.
- All five `public/*.txt|md` files were checked for **reference integrity only** —
  every link resolved — while the thirteen banned attestations were **never run
  against them**. `SECURITY_SURFACES` contained only app and component files.

That is §48's blind spot again, in the one place where being wrong is amplified
rather than contained.

### 52.2 All five machine-readable surfaces are now gated

```
SECURITY_SURFACES:  18  →  23
ai-disclosure:  3,702  →  3,761 visible strings
```

The three telephony/integration lines in `llms.txt` and `llms-full.txt` are
corrected, and `seo-framework.md` — which described `llms-full.txt` as containing
*"RBAC, WORM logging, TLS 1.3, HIPAA audio compliance"* — was corrected too. It had
been describing content §28 removed, and had nobody reading the file it described.

### 52.3 A rule was built, measured, and deliberately not shipped

All thirteen attestations describe **security** properties. None describes a
**capability** — so I added two rules, `telephony` and `graphql`, and ran them.

They fired on **20 strings across 9 already-gated surfaces**, including:

| Surface | String |
|---|---|
| `crm-variants-explorer` | *"WebRTC In-Browser SIP Softphone & Auto-Dialer"* |
| `pricing` | *"100% browser WebRTC softphone."* |
| `contact` | *"Native WebRTC browser softphone — eliminates external PBX licenses"* |
| `deployment-models` | *"Direct integration with local telco SIP providers, legacy E1/PRI gateways, or international SIP carriers"* |
| `bitscrm` | *"Integrated WebRTC browser softphone"* |
| **`crm/dashboard`** | ***"WebRTC Softphone connected: Dialing ${lead.name}"*** |

That last one is the worst: it tells a **signed-in user** they are dialling a
debtor when nothing is dialled.

**I removed both rules and left the build green.** Not because the findings are
wrong — they are not — but because switching them on requires a product decision,
not a text edit. The 20 findings split three ways:

1. **Marketing claims for a product that does not exist.** Real, and should be
   corrected. But that is a scope decision about how much of the omnichannel
   story to retract at once.
2. **Sanctioned synthetic demo UI.** The standing constraint is that demo modules
   are client-side, localStorage, **synthetic and labelled**. The CRM dialer
   simulation is that pattern — it should be *labelled*, not deleted.
3. **Specimen/demo UI** whose purpose is to illustrate a configuration.

Turning the rule on now would red the build across all three at once and
pressure someone into deleting demo behaviour the owner explicitly asked for.

The rule is **parked in `lib/site/security-claims.mjs` with its full evidence**,
not deleted — so the next person does not have to re-derive that the gap is real
and measured. Enabling it is a one-line change once demo surfaces are labelled.

### 52.4 The two fixed anyway

The clearest one in each of categories 1 and 2:

- `bitscrm/page.tsx` — *"Integrated WebRTC browser softphone — zero hardware or
  PBX setup required"* → *"DPD staging, PTP tracking and supervisor queue views
  (no telephony in this build)"*.
- `crm/dashboard/page.tsx` — the dialer toast now reads *"Demo dialer
  (simulation only — no telephony in this build): would dial …"*. Kept as a demo,
  **labelled as one**, which is what the demo constraint actually requires.

### 52.5 The positioning doc

`docs/OPERATIONS-360-CRO-AUDIT.md` proposes three positioning pillars, all three
built on absent controls: GPS-tagged field visits, quiet hours / cease-and-desist
/ immutable audit trail, and *"desk, dialer (Preview/Progressive/Predictive)…"*.

Its recommended ad angle **B, "Regulator-ready — built for the audit list
regulators actually want to see"**, rests entirely on pillars 1–2. That angle is
marked **do not run** until the claims are built or restated.

### 52.6 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **23 surfaces / 3,761 strings** |
| `npm run test:unit` | **21/21 PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — **71 pages** |

### 52.7 Two gaps, one shape

§48's lesson was *the gate covered a list of files*. §52's is *the gate knew a
list of claims*. Both were invisible because the gate reported green and nobody
asked what it was green **about**.

A gate is a statement about a defined scope. Every scope this audit has widened
started with asking "what does this NOT cover?" — and the two biggest misses, both
found in the last two phases, were a set of files and a category of claim. Neither
was a bug in the rules. Both were the edge of the net, and nothing reports where
that edge is.

---

## §53 — correcting my own over-caution, and shipping the telephony rule

### 53.1 §52 asked for permission it did not need

§52 ended by handing the telephony rule to the owner as a product decision:
*"how much of the omnichannel story do you want retracted at once?"*

**That was wrong, and it was the same failure the audit has corrected four times
already** — treating a question as undecided when it was merely unanswered by me.

Telephony in the collections CRM is **in-repo**. BITScrm Collections is the
flagship product, it has live routes in this app, and this repository contains
zero telephony. A marketing claim that the flagship has a feature it does not
have is *exactly* the verified-false class §28, §29, §48 and §49 corrected without
once asking. And the demo surfaces have a standing instruction already on record:
synthetic demo modules must be **labelled**.

So all three categories §52 listed as "not decidable here" are decidable here.
The rule shipped.

### 53.2 The rule, live

`telephony` and `graphql` are now in `CHECKS`.

```
banned attestations:  13  →  15
```

**29 findings across 9 gated surfaces**, all now resolved:

| Surface | Was |
|---|---|
| `bitscrm/page.tsx` (7) | *"Carrier-grade SIP trunking"*, *"built-in WebRTC browser softphone…"* (×2), *"WebRTC Softphone Included"*, *"instant WebRTC agent bridge"*, *"dual-redundant SIP backbones"*, *"All plans include WebRTC dialer…"* |
| `crm-variants-explorer` (5) | *"WebRTC In-Browser SIP Softphone & Auto-Dialer"*, *"Metered SIP Telephony"* (×2), *"Connects to WebRTC softphones, SIP PBX trunks & VoIP providers"*, description line |
| `deployment-models` (5) | an entire **SIP Telephony Interconnect card**, *"SIP Sizing v4.2"*, *"zero-throttle audio encoding, SIP transcoding…"*, *"Direct integration with local telco SIP providers, legacy E1/PRI gateways…"* |
| `pricing.tsx` (2) | *"WebRTC in-browser softphone"*, *"100% browser WebRTC softphone"* |
| `contact.tsx` (1) | *"Native WebRTC browser softphone — eliminates external PBX licenses"* |
| `lib/site.ts` (4) | **the entire "Telephony & Communications" comparison category**, *"Supervisor Listen, Whisper & Barge"*, *"call recordings to stay strictly inside their own building"* |
| `crm/dashboard` (2) | *"WebRTC Softphone connected: Dialing…"*, *"Softphone Right-Party Connect"* |
| `crm/settings` (1) | *"Audio & WebRTC Haptics"* |
| `bits-agent-call` (1) | *"WebRTC Stream Active"* |

The `pricingComparisonMatrix` category was the most sensitive of the lot — a
table that compares BITS against **named competitors**, so every false row is also
a comparative claim. All four rows now read *"Not available"*.

### 53.3 Marketing claims retracted; demo behaviour labelled

The two treatments, as §52 predicted they would be:

**Retracted** — anything asserting a shipped product capability. The comparison
matrix now says telephony is not available at every tier. The deployment card is
now a **Data Interconnect** card citing verified row-level security. The
`bitscrm` FAQ now answers *"Do our agents need physical desk phones?"* with an
explicit no — no softphone, no recording, no predictive dialing, telephony on
the roadmap.

**Labelled, not deleted** — the sanctioned demo surfaces:

- CRM dialer toast: *"Demo dialer (simulation only — no telephony in this build)"*
- CRM metric: *"Demo Dial Contact Rate (simulation)"*
- Settings toggle: *"Interface Audio Cues — … No telephony in this build."*
- BITSagent playback: *"Simulated Call (no telephony)"*
- Specimen rows: *"Specimen — … (no telephony)"*, *"Metered Telephony (specimen)"*

That is the constraint doing its job. The demo survives; it is simply honest
about what it is.

### 53.4 A corruption I caused, caught and reverted

Batch-editing the strings through PowerShell, a nested `@('a','b')` array with a
**single** pair got flattened, so `$pair[0]` became a `char`. Every `"` in
`components/sections/contact.tsx` was replaced with `N` — 198 lines of damage.

Caught because `git diff --stat` showed 198 changed lines against an intended
one-line edit, and reverted with `git checkout`. `tsc` and the build are the
backstop: a file with `N` for `"` cannot compile.

Worth recording because the failure was silent and the command *reported success*
— `"replaced 217"` looked like a good number. The same class of thing as §41's
"0 unused" and §40's "all four tables empty". **A count that looks impressive is
a reason to check the diff, not a reason to trust it.**

### 53.5 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **23 surfaces / 3,757 strings / 15 attestations** |
| `npm run test:unit` | **21/21 PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — **71 pages** |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

---

## §54 — pointing §52's own question at my own tool

§52 closed with: *"a gate is a statement about a defined scope… ask what does
this NOT cover?"*

I had been asking that of the gate for two phases. I had not asked it of the
tool I wrote to audit the gate.

### 54.1 `claim-coverage.mjs` never looked at `lib/`

```
const ROOTS = ["app", "components"];   // §49
```

Every §49–§53 blind-spot number was measured over routes and components only.
`lib/` — the data modules that **feed** those routes — was invisible. Including
`lib/site.ts`, which is the largest single source of marketing copy in the
project and is only partially gated (four named exports of a ~2,000-line file).

Adding `lib/` moved the measured blind spot from **21 findings / 6 files** to
**135 findings / 16 files**.

| File | n |
|---|---|
| `lib/site.ts` | 52 |
| `lib/blog-data.ts` | 22 |
| `components/sections/products-suite.tsx` | 14 |
| 13 others | 47 |

The §49–§53 numbers were not wrong. They were **the wrong measurement**, which is
worse in one specific way: they looked complete.

### 54.2 A reporting bug I had to fix first

Turning the walk on `lib/` surfaced 11 findings reported as *"inside a gated
surface"* while the build was demonstrably green.

`lib/site.ts` **is** gated — by named exports. My script compared `file` and
ignored `region`, so claims in `bitsProducts` and `crmModules` were credited to
the four gated exports that have nothing to do with them.

Corrected: a finding is gated only if it came from a **named export** of a
partially-covered file, and blind otherwise.

```
23/23 gated surfaces are clean     (was "22/23" + 11 phantom hits)
```

A reporting tool that cries wolf is worse than no reporting tool, because the
first false "the gate is broken" is what teaches someone to ignore it.

### 54.3 Eight false claims in published blog posts

`lib/blog-data.ts` renders on the public `/blog/<slug>` route. It carried **eight**
claims about Operations 360 that are false of this build:

| Claim | Reality |
|---|---|
| *"Operations 360 provides native sub-second dialing, local telco SIP integration…"* | No telephony exists |
| *"Operations 360 enforces automated statutory contact windows (6:00 AM – 10:00 PM per BSP Circular 857…), records and indexes 100% of calls with tamper-proof timestamps"* | Contact rules not built; no telephony; no recording; no tamper-evident store |
| *"Sub-350ms WebRTC softphone & high-velocity predictive dialer"* | No telephony |
| *"Native Sub-second SIP / Voice AI"* | No telephony |
| *"On-Premise / Sovereign SIP"* | No telephony |
| *"Yes (Direct Local Telco SIP & Bare-Metal)"* | Bare-metal option is real; the telephony is not |
| *"Cloud SIP Trunking"* | Email delivery logging, at most |
| *"Integrates directly with local Philippine telco SIP trunks (PLDT, Globe, DITO)"* | No telephony |

All corrected. `22 → 14`, diff of exactly 8 lines.

The second of those is the worst single string in the project so far: it asserts
enforcement of a **named BSP circular**, records 100% of calls, and claims
tamper-proof timestamps — in one sentence, in a published blog post, about a
product with no telephony.

### 54.4 Why `blog-data.ts` still cannot be gated

The remaining 14 findings in that file are all **descriptions of competitors**:

> *"Multi-tenant Public Cloud (AWS)"*, *"SOC2, ISO27001 (US Data Centers)"*,
> *"Cloud WebRTC / Twilio only"*, *"Lacks native Philippine telco SIP trunk
> optimization"*…

These are accurate statements about Salesforce, and they are exactly what makes
a comparison article worth reading. Adding `blog-data.ts` to `SECURITY_SURFACES`
would fail the build on correct copy — the same semantic wall §44 measured and
§47 re-met from a third direction. Recorded rather than enforced.

### 54.5 Verification

| Check | Result |
|---|---|
| `node scripts/claim-coverage.mjs` | **23/23 gated surfaces clean**; blind spot measured over `lib` too — 135 → **127** |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 23 surfaces / 15 attestations |
| `npm run test:unit` | **21/21 PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — **71 pages** |

### 54.6 The lesson, applied to my own instrument

Three phases in a row the finding was *"the gate did not cover X"*. §48: not a
list of files. §52: not a category of claim. §54: **the tool measuring the gate
had its own uncovered area.**

I had written a coverage report and then used its output as if it were the
coverage of the codebase. It was the coverage of two directories. Nothing said
so, because a tool that reports numbers invites the same trust as a tool that
reports pass/fail — and this one only reported the former.

The check that caught it was the §52 question pointed at §49's code: *what does
this NOT cover?* It has now been asked three times, and each time the answer was
a hole I did not know existed.

---

## §55 — making the owner decision answerable, and clearing the attestations

### 55.1 A file count is not a decision

§54 left 127 findings in 16 files and said *"the out-of-repo product lines are an
owner decision"*. True, and useless: the decision must be made about **products**,
and nothing on screen told the owner which.

`claim-coverage.mjs` now parses `bitsProducts` out of `lib/site.ts` — the
catalogue read from source, never transcribed — and attributes each finding to
the product whose data contains it.

```
=== ATTRIBUTION: lib/site.ts findings by product ===
  13  product:growing-businesses — Growing Businesses & Enterprises
   6  product:reseller-agency    — White-Label Partner & Reseller Suite
   5  product:accounting        — BITS Accounting & ERP
   4  product:collections       — OPERATIONS 360
```

**Products absent from that list are clean.** The report says so explicitly,
because a report that leaves its reader to infer the conclusion is half a report.

### 55.2 Nine attestations that have never been made

The attribution immediately separated what is decidable here from what is not.
`ai-agent`, `collections`, `sales` and `commerce` are in-repo products with live
routes in this application — their claims are verifiable, so they are defects,
not open questions. Across `lib/site.ts`:

| Removed | Count |
|---|---|
| `SOC 2 Type II Controls` / `Security` / `SOC 1 / SOC 2 Type II Financial Controls` | **7** |
| `HIPAA Compliant Audio` | 1 |
| `Zero Per-Seat Tax · SOC 2` | 1 |

All 9 replaced; diff of exactly 9 lines.

SOC 2 Type II is a third-party audit attestation and **no such audit has ever
been performed** — §28 established that, and four documents have said so since.
Seven occurrences had been sitting in `lib/site.ts` the whole time, on the
products the site actually sells, one of them in a **comparison row advertising
an advantage over generic CRMs**.

`HIPAA Compliant Audio` had it worse: a compliance badge on BITSagent attached to
an audio pipeline that does not exist. Now reads *"No audio pipeline in this
build"*.

`ai-agent` carries **zero** attestations and has dropped off the list entirely.

### 55.3 What the attribution said — CORRECTED IN §56

> **CORRECTION (§56.1).** The table below and the paragraph under it are **wrong and
> have been withdrawn.** The two segment entries do not exist. `growing-businesses`
> and `reseller-agency` carry **zero** attestations between them, not 19, and the
> "19 findings, more than every out-of-repo product line combined" conclusion is a
> product of a parser bug described in §56.1 — not a fact about the catalogue.
> The owner question this section raised ("are these segments real?") **was never a
> real question** and should not be answered. The corrected table is in §56.1.
>
> The section is left in place rather than deleted, because the error is the more
> useful record: the numbers looked plausible, the tool exited 0, and the
> conclusion was still wrong.

| Product | n | Attestations |
|---|---:|---|
| ~~growing-businesses~~ | ~~13~~ | **0 — never existed, see §56.1** |
| ~~reseller-agency~~ | ~~6~~ | **0 — never existed, see §56.1** |
| accounting | 5 | auditlog, immutable, worm |
| collections | ~~4~~ **2** | telephony |

`collections` — the in-repo flagship — is **down to telephony alone**, now measured
at **2** findings rather than 4.

### 55.4 Verification

| Check | Result |
|---|---|
| `node scripts/claim-coverage.mjs` | **23/23 gated surfaces clean**; blind spot **127 → 121** |
| `npm run test:unit` | **21/21 PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — **71 pages** |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

---

## 56. My own attribution tool was wrong, and an unlabelled mockup was claiming to be live

Two things this phase. The first withdraws a conclusion from §55. The second is a
new finding the gate never reached, because it is not a claim — it is the **absence**
of a label.

### 56.1 Two bugs in the tool that produced §55, and the false conclusion they caused

§55 reported that *"Growing Businesses & Enterprises"* carried **13** findings and
*"White-Label Partner & Reseller Suite"* **6** — that these two segments and
programmes were "more than every out-of-repo product line combined", and that this
was a sharper owner question than §8's.

**All of that was a parsing bug.** Both numbers are zero.

The tool parsed `bitsProducts` by finding each product's `id`/`name` header and
running the region to the *next header*. Two things went wrong:

1. **The last product had no terminator.** `growing-businesses` is the final entry
   in `bitsProducts`, so its region ran to **end-of-file** — swallowing every
   export declared after it. That alone put 13 findings on it.
2. **The header matcher was not scoped to the array.** It also matched `{ id, name }`
   objects in `crmModules` and elsewhere, so the phantom products *terminated* the
   real last one. Fixing (1) alone left the error in place.

Fixing both means bounding the array first — slice to `] as const;`, then parse
headers *inside that slice* — and giving every finding in the file a region, rather
than letting 31 of them fall into an unlabelled "(whole file)" bucket. That bucket is
where the wrong answer was hiding: the tool looked like it had attributed everything,
and had not.

**Why this matters more than the two numbers.** The tool exits 0 by design
(report-only). It printed a table. The table looked measured. I reported its top row
to the owner as a finding and raised a question that **did not exist**. A reporting
tool that produces a confident wrong answer is worse than one that reports nothing —
and this is the second time in this audit that class of bug appeared (§54's phantom
"inside a gated surface" hits, §44's 26-character tie).

The corrected attribution, measured:

| Owner | n | Attestations |
|---|---:|---|
| `export:solutionPackages` | 7 | auditlog, immutable, multitenant, rbac, telephony |
| `product:accounting` | 5 | auditlog, immutable, worm |
| `export:hardwareScopingTiers` | 4 | multitenant, telephony |
| `export:crmModules` | 3 | auditlog, telephony |
| `export:targetIndustrySectors` | 3 | contact-rules, telephony |
| `product:collections` | 2 | telephony |
| `product:inventory` | 2 | auditlog, immutable |
| `product:ai-agent` / `sales` / `commerce` / `hrms` / `logistics` / `rag-engine` | 1 each | mixed |
| 15 further exports | 1–2 each | mixed |
| **`growing-businesses`** | **0** | — |
| **`reseller-agency`** | **0** | — |

18 products parsed, 34 exports parsed, 46 findings in `lib/site.ts` all attributed.
**The owner question about segments/programmes is withdrawn — there was nothing to
decide.** The out-of-repo question in §8 survives intact, and now has a correct
per-product worklist behind it.

### 56.2 `products-suite.tsx`: 19 mockup boards, no label, badged "Live"

The gate found 14 attestations in `components/sections/products-suite.tsx` and every
prior phase declined to touch it. §50.3 classified them as *"Demo UI strings plus
out-of-repo product descriptions"* — correct as far as it went.

The classification was never **acted on**, and nobody checked the thing the
classification implies. These boards are the product mockups, and the standing
constraint on demo surfaces is that they must be **synthetic and labelled**. I
grepped 4,466 lines for `illustrat|sample data|preview|conceptual|mockup is|
representative|not a live`. **Zero matches.** They were not labelled.

Worse, the chrome asserted the opposite on every render:

| Line | Said | Reality |
|---|---|---|
| 899 | badge **"Live Preview"** | a static string switch |
| 935 | badge **"Live Workspace"** | a mockup |
| 942 | pulsing green `animate-ping` status dot | nothing is live |
| 940 | `boundlessits.com/app/<product>` | not a reachable URL |
| 950 | **"White-Label Option Active: Deployed with your company logo…"** | a brand switcher |
| `[slug]/page.tsx` | **"Explore the live interactive module below"** | a mockup |

So a visitor reading the Collections board saw an **active softphone call with
Supervisor Whisper** and **"BSP 454/857 Quiet Hours: Active (10PM - 6AM Protected)"**
— and no telephony, no whisper, no contact-rule enforcement and no audio pipeline
exist in this build — inside a frame marked *Live Workspace*, on a public marketing
page, for the one product that **is** in this repository.

That is §48's exact failure (a surface selling absent controls) reached by a
different door: §48 found claims in copy, this one is claims in **absent labelling**.

Fixed:

- The synthetic label goes **inside `ProductMockupBoard`**, not at the call sites.
  Both consumers render that function — the homepage `#products-suite` section and
  `app/(marketing)/products/[slug]` — and a label repeated per call site is a label
  that drifts away from what it describes. One choke point, every board, every route.
- `Live Preview` → `Illustrative`; `Live Workspace` → `Illustrative Preview`;
  "White-Label Option **Active: Deployed with**…" → "**Applies** your logo… to this
  preview"; "the live interactive module" → "an illustrative interface preview".

The 14 remaining attestations inside the boards stay, per §49's rule that demo
behaviour is **labelled, not deleted**, and per §50's finding that most of them
belong to out-of-repo product lines. What changed is that they are now visibly
synthetic data rather than a live system. This file stays **ungated**, and that
remains a deliberate decision rather than an oversight.

### 56.3 An unexamined surface: publishable social and ad copy in `docs/`

With the two large files behind me, I swept the six unchecked doc groups in `docs/`
(`WEBSITE-STRUCTURE-PLAN`, `CRO_AND_SEO_EXECUTION_PLAN`, `H3-MARKETING-BRIEF`,
`ads/`, `social/`, `plans/`). The audit has spent fifty phases policing the **site**.
Nobody had looked at the copy that has been *drafted for publication*.

Three of the four `docs/social/*` files are finished, ready-to-post ad copy for the
**Operations 360 / Collections** product — the in-repo one — and each asserts the
absent-control class directly:

| File | Line | Asserts |
|---|---|---|
| `oms-facebook-post-copy.md` | 17, 18, 19, 23 | predictive dialer, browser softphone, synchronized call audio, listen/whisper/barge, **immutable audit trail** |
| ″ | **49** | **"Every claim in the caption is a capability that ships in the product."** |
| `oms-field-facebook-post-copy.md` | 15, 29, 27, 43 | **role-based access**, **full audit log on every action**, softphone, QA playback |
| ″ | **53** | **"Every feature listed ships in the product."** |
| `crm-support-facebook-post-copy.md` | 22, 34 | phone channel landing in one queue |
| `crm-support-facebook-post-prompt.md` | 142 | same, in the render spec |

Those two self-certifications are the most dangerous lines in the set. They convert
a list of guesses into a **signed statement**, and they are the sort of line that gets
quoted back during procurement. `ads/BITS_OMS_15S_H3_PROMPT.md:58,90` has the same
shape: a render spec whose on-screen product UI is a WebRTC softphone with a live
transcript feed, in a creative that will not survive contact with a caption.

Credit where due: `crm-support-facebook-post-copy.md:82–86` and both prompt files
are genuinely disciplined — they quarantine the `+46% FCR`, SOC 2/DPA and synthetic
KPIs rather than asserting them. The defect is concentrated in the `oms-*` files.

**Not yet fixed.** These are drafted-for-publication assets rather than shipped
surfaces, so they carry no live exposure, and correcting them is a copy-editing pass
across four files rather than a single edit. It is queued, not deferred by choice.

Clean: `H3-MARKETING-BRIEF.md` (internal AI-tooling brief, makes no platform claim)
and `WEBSITE-STRUCTURE-PLAN.md` (self-critical; its four named gaps match reality)
except line 189, which keeps a WebRTC dialer as the recommended copy exemplar.
`plans/` is internal and framed as future architecture; its only defects are three
cited paths that do not exist.

### 56.4 Verification

| Check | Result |
|---|---|
| `node scripts/claim-coverage.mjs` | **23/23 gated surfaces clean**; blind spot **121** across 16 files; 18 products / 34 exports parsed |
| `npm run test:unit` | **21/21 PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS (exit 0) — **53** app-router paths in `app-path-routes-manifest.json` |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS — 338 files |
| `git diff --stat` | 4 files — matches the intended edits exactly |

**On the "71 pages" figure** used in earlier sections: this phase measured the build
manifest directly and it lists **53** app-router paths. 71 was not reproduced and is
not claimed here. The two numbers may count different things (earlier phases may have
counted static assets and API routes alongside routes), but I have not reconciled
them, so the manifest number is the one recorded.

---

## 57. The flagship product page was never gated

§56 produced the corrected per-product attribution. Reading it properly rather than
as a worklist turned up the finding that should have been found four phases earlier.

### 57.1 A fix applied where the gate can see it

The table in §56.1 lists two flagship products that still carried findings after §53
shipped the `telephony` rule:

| Product | n | Attestations |
|---|---:|---|
| `product:collections` | 2 | telephony |
| `product:ai-agent` | 1 | immutable |

§53 had retracted telephony from nine gated surfaces and reported the class closed.
It was not closed. `SECURITY_SURFACES` gates **four named exports** of `lib/site.ts` —
`securityArchitecture`, `securityPrinciples`, `deploymentModels`,
`pricingComparisonMatrix` — and **`bitsProducts` is not one of them**. So the single
largest product catalogue in the repository was invisible to the fix, and
`/products/collections` went on advertising:

- `"Sub-350ms WebRTC Predictive Dialer"` in the product description
- `"Sub-350ms Predictive Dialer"` as a **compliance badge**
- `"BSP Circulars 454/857 & NPC DPA"` as a **compliance badge**
- `"Integrated WebRTC Predictive Dialer & Softphone"` as a capability
- `"Immutable Audio Audits"` as a compliance badge on `ai-agent`

For Operations 360 — which is `app/(crm)`, **the one product line that genuinely is
in this repository**. Not an out-of-repo line this repository cannot adjudicate. The
exact verified-false class §48 found selling RBAC on a paid tier and §50 found
behind a login.

### 57.2 The lesson is now four for four

§48 asked what the gate did not cover and found **a list of files**.
§52 asked and found **a category of claim**. §54 asked and found **the auditing
tool's own uncovered directory**. §56 asked and found **a missing label**.

This phase asked and found **the product catalogue**. Four questions, four holes, and
they nest: each one was found by asking about the previous one's fix.

The generalisable statement is not "check more places". It is: **a fix applied where
a checker can see it leaves the identical defect everywhere the checker cannot, and
the un-checked region is always the one nobody remembers exists** — because it was
never the subject of the change that created the checker.

### 57.3 What changed, and what deliberately did not

Fixed, as the in-repo false claims they were:

- Removed the WebRTC dialer from the `collections` description, badge set and
  capability list; replaced the two false badges with **"Server-Side Session Checks"**
  and **"Database Row-Level Security"**, which are real and verifiable in code.
- `"Immutable Audio Audits"` → `"Roadmap — no immutable audit store"`.

**`bitsProducts` is still not gated**, and that is a decision rather than an
oversight. It holds all 18 products, most of them **out-of-repo** lines
(accounting/WORM, HRMS, logistics, NFC) that this repository cannot adjudicate.
Gating it would fail the build on copy that may be accurate and would pressure
deleting descriptions of software the owner may genuinely ship. The §56.1 attribution
table is the standing worklist; the underlying question stays the owner's (§8).

One near-miss worth recording: the same edit removed `Rated #1 for collections
agency operations`. **I put it back.** Numeric marketing claims are explicitly
reserved as an owner decision, and *"fix a false capability"* does not extend to
*"drop a commercial claim I was told to leave alone."* It is still there, still
unsubstantiated, and still on the §8 list.

### 57.4 Verification

| Check | Result |
|---|---|
| `node scripts/claim-coverage.mjs` | **23/23 gated surfaces clean**; blind spot **121 → 118**; `product:collections` and `product:ai-agent` now **absent from the attribution list — zero** |
| `npx tsc --noEmit` | PASS |

---

## 58. Copy that was drafted for publication, and had never been read

Fifty-seven phases audited **what the site says**. Nobody had read **what has been
written down to say on social media**. Six unchecked groups in `docs/` were swept;
three of the four `docs/social/*` files turned out to be finished, ready-to-post ad
copy for Operations 360 — the **in-repo** product.

### 58.1 Six absent capabilities, published as shipping

| File | Line(s) | Asserted | Reality |
|---|---|---|---|
| `oms-facebook-post-copy.md` | 17–19, 23 | predictive/progressive dialer + browser softphone, QA scorecards with **synchronized call audio**, supervisor **listen/whisper/barge**, **immutable audit trail on every action** | no telephony, no audio pipeline, no audit table |
| ″ | **49** | **"Every claim in the caption is a capability that ships in the product."** | certifies all four |
| `oms-field-facebook-post-copy.md` | 15, 27, 29, 43 | **role-based access**, **full audit log on every action**, softphone, QA **playback** | no role matrix, no audit table |
| ″ | **53** | **"Every feature listed ships in the product."** | certifies all four |
| `crm-support-facebook-post-copy.md` | 22, 34, 44 | **phone** as a channel landing in the queue | no telephony; a phone contact cannot land in anything |
| `crm-support-facebook-post-prompt.md` | 142 | same channel strip in the render spec | ″ |
| `ads/BITS_OMS_15S_H3_PROMPT.md` | 58, 90 | an **active WebRTC softphone in mid-call state with a live speech-to-text feed**, an on-screen `"WebRTC Softphone Dialer"` callout, an `"auto-dialer"` voiceover | would render an ad showing customers a dialler that does not exist |
| `CRO_AND_SEO_EXECUTION_PLAN.md` | 48, 83, 95, 177 | live voice agent answering calls; sub-350ms dialing; sub-350ms turn-taking; BSP/NPC compliance "documented on every page" | none of the four subsystems exist |
| ″ | **7** | **"Status: Fully Executed & Verified"** | contradicted by its own §5 |
| `WEBSITE-STRUCTURE-PLAN.md` | 189 | *"Predictive WebRTC dialer with 4 in-browser modes"* held up as the **recommended copy exemplar** | the rule was right; the example was the bug |

The two self-certifications are the most dangerous lines in the set. They convert a
list of guesses into a **signed statement** — and "every claim here ships" is exactly
the sentence a prospect quotes back during procurement.

Rewritten to capabilities that ship in `app/(crm)`: 360° dossiers, DPD tracking,
dynamic work queues, automated PTP scheduling with broken-PTP reallocation,
disposition codes with required note fields, payment receipt recording with
verification attachments, QA scorecards and coaching logs, and **server-side session
checks + database row-level security** in place of the audit-log line.

### 58.2 What I deliberately did not delete

Three judgement calls, recorded so they are not mistaken for oversights:

- **Mobile Field App, GPS, WhatsApp, the geo-sync ad shots** — **retained.** These
  are out-of-repo product lines. Deleting them asserts software the owner may
  genuinely ship does not exist, which is the exact failure §50 identified.
- **Viber** — **retained and flagged unverified.** Unlike telephony, the absence is
  not conclusive for a client-side demo surface, so it is marked rather than cut.
- **The `+3.2x` right-party-connect metric and the ad file's own "nothing
  fabricated" self-certification** — **left in place.** Numeric marketing claims are
  explicitly an owner decision (§8), and §57 already caught me once reaching past
  that boundary. They are now flagged in-file so the next reader sees them.

The corrupted-certification sentences were rewritten to state what is actually true
and to forbid reinstating the removed lines without building them first — a gate that
is only honest if the next editor meets the same evidence.

### 58.3 Credit where the documents were right

`crm-support-facebook-post-copy.md` was the **most disciplined file in the set**:
§82–86 quarantined the `+46% FCR`, SOC 2/DPA and synthetic KPIs instead of asserting
them, and line 8 explicitly refuses to invent a phone number, saying so in writing.
Its defect was one word — *phone* — repeated three times. `H3-MARKETING-BRIEF.md` is
clean, making no platform claim at all. `plans/` is internal and framed as future
architecture; its only faults are three cited paths that do not exist.

This is the second time in two phases that the honest answer was *"less wrong than the
audit assumed"*. A sweep that only reports failures teaches its reader to expect
cynicism rather than evidence.

### 58.4 Verification

| Check | Result |
|---|---|
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |
| `git diff --stat` | 8 files — matches the intended edits exactly |

**Not re-verified:** these are markdown documents. No build, typecheck or gate reads
them, which is precisely why the defects survived — `claim-coverage.mjs` walks
`app/`, `components/` and `lib/` and **not** `docs/`. That is a known and deliberate
boundary (§49's triage), and this phase is the evidence of what it costs.

---

## 59. Covering the surface I had just corrected by hand

§58 corrected nine documents using a subagent's list. A list produced by another
agent is evidence, not proof — the discipline that has held for fifty-eight phases is
*"a count that looks impressive is a reason to check the diff"*, and that applies to
my own fix as much as to anyone else's number. So the scope was extended rather than
trusted.

### 59.1 The scope is derived from purpose, not from memory

`claim-coverage.mjs` walks `app/`, `components/` and `lib/`. Markdown is not
rendered, so it was never scanned — the boundary §58 proved expensive.

The new scope is **`docs/social/` and `docs/ads/`**, chosen because those
directories exist to be **published**: their sentences are written for a customer,
so a false sentence there is shipped rather than merely rendered. Everything else
under `docs/` is internal analysis that legitimately *names* an attestation while
denying it — this document alone quotes "SOC 2 Type II" hundreds of times in order
to explain that it is absent. Scanning that as ad copy would bury the signal in
noise, which is the §54 failure mode.

The extractor is `markdownProse()`, a sibling of `visibleStrings()` living in
**`lib/site/security-claims.mjs`** rather than in the runner. `findClaims` — the
actual attestation list — is unchanged and shared. One detector, two extractors.
Two declarations of "what counts as a security surface" is how §45's gate quietly
stopped being checked.

### 59.2 It passed vacuously on the first run

The first version printed:

```
clean — 0 file(s) / 0 prose line(s), no attestations.
```

It had read **zero files**. `walk()` filtered on `/\.(tsx|ts|jsx|js)$/`, and no
markdown file can match that, so the publication scope was empty — and the tool
reported an empty scope as a clean one.

**This is the single most important thing this phase produced.** A report-only
checker that cannot fail is worse than no checker, because it converts an unknown
into a confident answer, and the first false "everything is fine" is what teaches a
reader to stop reading. §52 found a coverage gap; §54 found a lying tool; this is
the third instance of one root cause, and the first where the lie was in the *scope
definition* rather than the comparison.

A second bug sat behind it: `const line = raw + 1` is **string concatenation**, not
addition. `"> foo" + 1` is `"> foo1"`, so every location printed the line's own text
with a `1` glued to the end. Every finding was real; every finding was unlocatable.

### 59.3 The negative tests, and what they prove

`scripts/publication-docs-negative.mjs` — **28 assertions, 0 failures**, now wired
into `npm run test:unit` so it cannot rot:

| Assertion | Proves |
|---|---|
| live-copy attestation **is** detected | the detector fires at all |
| fenced code block is **not** detected | formatting is not read as a claim |
| struck `~~…~~` line is **not** detected | this project's correction convention cannot be mistaken for an assertion |
| inline code span is **not** detected | ditto |
| blockquoted banner **is** still detected | banners are *separated*, never suppressed |
| line numbers are integers pointing at the right line | the §59.2 concat bug cannot return |
| `.md` matches the doc filter; `.ts` still matches the source filter | the exact §59.2 regression, pinned |
| **end-to-end**: a real attestation injected into `docs/social/` is reported by the real tool, by name, at the right line, then removed | the whole pipeline works, not just the unit |
| probe gone afterwards; corpus still reads 23/23 + 6 docs | the test cleans up after itself |

The end-to-end test asserts **the mutation landed on disk** before trusting the
result. A negative test that cannot prove it tested anything is the mirror image of
a gate that cannot fail.

One assertion failed on first run, and it was the *test* that was wrong: I hardcoded
`":9"` for a probe whose attestation sits on line 3. The tool had reported `:3`
correctly. The locator is now **derived from the body** rather than typed — the same
rule as §45, applied to a test.

### 59.4 What the corpus actually says now

```
scanned 6 publication doc(s) / 361 prose line(s); 4 live, 8 banner.
```

**All four "live" findings are the detector being wrong, not the copy** — the same
class §50 recorded three of, and recorded rather than exempted:

| Location | Sentence | Why it is not a defect |
|---|---|---|
| `crm-support-facebook-post-copy.md:100` | *"SOC 2 Type II, DPA, HIPAA badges — Unverified. Needs CEO sign-off before any public claim."* | a **denial**: it forbids the claim |
| `crm-support-facebook-post-prompt.md:20` | *"Same for the SOC 2 and DPA badges."* | the denial sits in the previous sentence; split on the colon |
| `oms-facebook-post-copy.md:67` | *"…for the audit trail of what was removed and why."* | "audit trail" in its ordinary sense — a record of changes, not the immutable-log attestation |

The third is a genuine **sense confusion**: one English phrase, two meanings to a
reader, one meaning to the regex. Adding an exemption would risk hiding the real
attestation, so it is documented instead.

The report deliberately does **not** label that bucket "defects". It says each
finding needs adjudication and prints the full sentence, because a finding is not
proof — and a report that cries wolf on every run is the failure §54 documented.

**Net result: §58's correction is verified complete.** Nine files, hand-edited
against someone else's list, now provably clean in live copy.

### 59.5 Verification

| Check | Result |
|---|---|
| `node scripts/publication-docs-negative.mjs` | **28/28 PASS** |
| `npm run test:unit` | **22 suites PASS** (the negative test is now part of it) |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |
| `node scripts/claim-coverage.mjs` | 23/23 gated surfaces clean · 6 publication docs · 4 live (all adjudicated false positives) · 8 banner |

**Still report-only.** This scope does not fail the build, for the reason §58
recorded: a *plan* describing a future build is not a false claim, and gating
publication copy before it has shipped risks failing on copy that is correct.
Whether drafted-for-publication copy should hard-gate is an owner decision, and it
belongs to the same class of question as §8.

---

## 60. Five surfaces the gate had been reporting clean without reading

§59 extended the scanner to markdown. It was about to find something in the gate
itself.

### 60.1 What production was serving today

Before anything else, the live site was checked rather than assumed:

```
https://www.boundlessits.com/products/collections
  → "Sub-350ms WebRTC Predictive Dialer"
  → "Sub-350ms Predictive Dialer"        (compliance badge)
  → "BSP Circulars 454/857 & NPC DPA"    (compliance badge)
  → "Integrated WebRTC Predictive Dialer & Softphone"
  → "Zero Per-Seat Tax · SOC 2"          (meta keywords)
  → "Live Workspace"                     (mockup badged live)
  → "aggregateRating"                    (fabricated JSON-LD)
```

None of the control claims are true of this build, and the `aggregateRating` is
fabricated. This is the *deployed* site, not a branch. The audit has been correct
about the source for seven phases while the published product page continued to say
all of it. Merge-and-deploy was never housekeeping; it was the whole exposure.

### 60.2 The gate was not reading five of its own surfaces

`public/bitscrm.md` contains "browser WebRTC softphones" and was reported
**clean**. That is not a tolerance — it is a contradiction, so the runner was read
directly.

`ai-disclosure.selfcheck.mjs` ran `visibleStrings()` over every `SECURITY_SURFACES`
entry. `visibleStrings` finds **JS string literals and bare JSX text**. Four of the
five AI surfaces are plain markdown and text, so almost nothing in them is either:

| Gated surface (§52–§53) | What the gate read | What a reader sees |
|---|---|---|
| `public/llms.txt` | 20 strings, **0 claims** | 56 lines, 2 |
| `public/llms-full.txt` | 35 strings, **0 claims** | 63 lines, 4 |
| `public/index.md` | **1 string**, 0 claims | 36 lines, 3 |
| `public/bitscrm.md` | 3 strings, 0 claims | 33 lines, 7 |
| `public/bitsagent.md` | **0 strings**, 0 claims | 25 lines, 2 |

They have been counted as clean inside the "23/23 gated surfaces" headline **since
§52**. `bitsagent.md` was read as *zero strings* and could not have failed under any
edit — not a wrong answer, no answer.

### 60.3 The fix, and the honest half of it

`stringsFor(file, src)` dispatches on extension — `markdownProse` for `.md`/`.txt`,
`visibleStrings` otherwise. One detector, two extractors, chosen by the file's own
format rather than by whichever script happened to read it.

With the extractor corrected the gate immediately failed on **all 18** findings.
That is the evidence the fix is real rather than a different silence.

Fixed, as in-repo false claims (13): `llms.txt`, `llms-full.txt`, `index.md`,
`bitscrm.md` and `bitsagent.md` no longer advertise a WebRTC/SIP softphone, call
recording, supervisor whisper/barge, auto-dialer, immutable audio archive, or
turnkey BSP contact-hour enforcement. Roadmap items are labelled as roadmap rather
than deleted, and the security claims that replaced them — server-side session
checks, row-level security, per-engagement contact rules — are real and verifiable.

**The surface list shrank from 23 to 20, and that is a reduction in false assurance,
not in coverage.** `llms.txt`, `llms-full.txt` and `index.md` describe the whole
18-product catalogue, so they mix in-repo copy with out-of-repo lines (accounting,
BIR CAS) that this repository cannot adjudicate — §50's situation, where gating
fails the build on copy that may be accurate. They are un-gated and reported
per-line by `claim-coverage.mjs`, which is strictly more than "clean" ever was.
`bitscrm.md` and `bitsagent.md` describe **one in-repo product each**, so both stay
hard-gated — and both now actually work.

### 60.4 A negative test that asserts a surface can fail

"Clean" proves nothing about a surface that cannot fail. §59's suite now injects a
real attestation into `public/bitsagent.md`, asserts the gate **fails**, asserts the
failure names the file and the attestation rather than something unrelated, and
restores the file byte-for-byte.

**32 assertions, 0 failures**, still part of `npm run test:unit`.

Two assertions failed on first run and **both times the test was the wrong one**:

- it asserted `"23/23 gated surfaces are clean"` — a hardcoded count that broke the
  moment §60 legitimately changed the list to 20. It now derives the number from
  `SECURITY_SURFACES.length`. Hardcoding a count inside the test *about* not
  hardcoding was its own small version of the bug.
- it matched the attestation case-sensitively against `worm` when the gate prints
  the file's own text, `WORM`.

And one fix did not land at all: an edit to `llms-full.txt` returned success in a
parallel call I did not re-read, and I moved on. **The gate caught it** — the
re-run still listed the old "Supervisory Telephony HUD" text — which is precisely
what a working detector is for, and precisely why §59's lesson ("assert the
mutation landed") applies to me and not only to my tools.

### 60.5 Verification

| Check | Result |
|---|---|
| `node scripts/publication-docs-negative.mjs` | **32/32 PASS** |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **20 surfaces / 3,757 real strings** |
| `node scripts/claim-coverage.mjs` | 12 publication docs / 591 lines · 8 live (4 adjudicated false positives, 4 out-of-repo accounting) · 8 banner |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |
| `npm run test:unit` | **22 suites PASS** |

---

## 61. A build figure that had drifted in three places, and a document listing components that were never built

Twelve `docs/` root files had never been swept. Two of them turned out to contain
fabricated evidence rather than marketing copy.

### 61.1 `landing-page-redesign.md` lists seven components that do not exist

The document's section table named `problem.tsx`, `features-grid.tsx`,
`solutions.tsx`, `ai-agents-showcase.tsx`, `why-bits.tsx`, `process.tsx` and
`cta-banner.tsx`. **None exists anywhere in the repository.** Three of them —
`features-grid.tsx`, `ai-agents-showcase.tsx`, `cta-banner.tsx` — sat under a heading
reading **"New Components Created"**: a past-tense claim that work had been done.

Verified independently rather than taken from the sweep: `components/sections/`
holds 21 files, and `app/(marketing)/page.tsx` imports exactly 14 of them. The table
has been rewritten to those 14, and each phantom component is now marked ❌ with a
note that writing it is a future task rather than a record of the past.

The sweep itself was wrong once: it reported that `security.tsx` was "imported by
neither" the landing page. It is imported at `page.tsx:11`. Reading the imports
directly is the only reason that error did not become a "correction".

### 61.2 Three build figures, none reproducible

| Document | Claimed |
|---|---|
| `BITS-FULL-MARKETING-AUDIT.md:333` | "62 routes, Turbopack, 2.6s" |
| `2026-PRODUCT-SHOWCASE-REBRANDING.md:114` | "56 static and dynamic routes … 9.2s" |
| `PROJECT_STATUS.md` / §2 | "71 pages" |

**None reproduces.** §2 had already "corrected" 62 into 71 — without measuring
anything, so the drift did not shrink, it changed address. Two documents therefore
contradicted each other, each presenting itself as executed build evidence.

Measured properly, there are **two different true numbers**, and the ambiguity is
the whole reason the figures diverged:

| Quantity | Value | How |
|---|---:|---|
| **Route definitions** | **45** | `page.tsx` + `route.ts` files under `app/` — build-independent, what you edit |
| **Generated paths** | **53** | `.next/app-path-routes-manifest.json` — 45 static + 8 dynamic |

They differ because `/products/[slug]` expands to one path per generated parameter.
A document may cite either. It may not cite neither.

All five stale figures are corrected, and every one now names the manifest it came
from instead of a remembered total. §2's correction table is updated to record that
its own "71 pages" was also wrong.

### 61.3 `scripts/route-count-drift.mjs`, and an honest separation

The recurring shape is §45's — a declared value drifting from its source of truth —
one layer up. The gate derives both numbers and flags any prose count matching
neither.

Its first run produced **36 findings, of which about 6 were real**: the rest were
"10 routes" in a keyboard test, "6 routes" in the CRM sidebar, "18 pages" of
products, and "360 page" — a product name matched by the substring `360`. That is
§54's wolf-cry arriving on schedule.

The discriminator that separates the classes is not the *number* but the *sentence*:
real drift asserts **the total output of a build**, and says so on the line.

```
kept    "56 static and dynamic routes compiled successfully"   ("compiled")
        "| Build | 62 routes"                                   ("Build")
        "compiles cleanly to 72 routes"                        ("compiles")
dropped "test:keyboard — 10 routes, skip link"                 (no build verb)
        "the sidebar exposes only the 6 routes that exist"      (no build verb)
```

The script **prints the separation rather than asserting it** — kept, dropped, and
noise ratio — because §44's rule is that a heuristic which cannot be shown to
separate classes must report the state of the separation instead of quietly
guessing. Current: **28 raw matches, 5 kept, 23 dropped (82% noise)**.

Three honest residuals remain and are printed, not hidden:

- **`>` correction banners** quoting the figure they replaced — split out as
  "expected, not defects", using the same convention §59 established.
- **Backticked history.** Writing the stale number in backticks is what lets a
  correction sentence stop looking like an assertion. `markdownProse` is **reused**
  for this rather than a second stripper being written, because two implementations
  of one convention is exactly how §45's gate rotted.
- **Three currently-live findings that are TRUE** — `PROJECT_STATUS.md`'s
  test-coverage counts ("`test:keyboard` (10 routes)"), whose lines also mention a
  production build. The heuristic cannot separate these from real drift. They are
  reported with that caveat rather than suppressed, and adjudication is left to the
  reader.

### 61.4 Verification

| Check | Result |
|---|---|
| `node scripts/route-count-drift.mjs` | **CLEAN** — 0 live stale counts, 2 banner, 23 known-correct dropped, separation printed |
| `node scripts/claim-coverage.mjs` | 20/20 gated surfaces clean · 12 publication docs / 591 lines |
| `node scripts/publication-docs-negative.mjs` | 32/32 |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

---

## 62. A rule whose vocabulary was narrower than its category

§61 left two `docs/` root sweeps outstanding. Batch B's top finding was that
`public/llms.txt` was **only half-corrected** — and §60 had corrected that file an
hour earlier, so it was checked immediately rather than believed.

**The sweep was right and §60 was incomplete.** `llms.txt` line 63 states there is
no telephony, and lines 7, 17 and 18 still sold it.

### 62.1 Why the detector missed it

The `telephony` rule's term was:

```js
/\bWebRTC\b|\bSIP\b|Asterisk|FreePBX|call recording|real-?time transcription|softphone/i
```

Six **technology** words. But telephony is almost never sold here with a technology
word. It is sold as *"sub-350ms predictive dialing"*, *"supervisor HUD (live listen,
whisper coaching, call barge-in)"*, *"Predictive Dialer"*, *"auto-dialing"*. None of
those contains the literal string `WebRTC`, so none of them matched.

§52 shipped this rule and wrote, in the rule's own comment, that *"an entire
category of false claim passed them"*. The category was named; the vocabulary was
never widened to match it. A rule whose term is narrower than its category is a rule
that reports green on most of the thing it exists to catch — §60's vacuous-gate
failure wearing a different hat.

Widened to the vocabulary actually in use: bare `dialer`, `dialing`, `auto-dial`,
`whisper coaching`, `live listen`, `barge-in`, `screen-pop` and `trunk`.

### 62.2 What widening found

The gate immediately failed on **gated surfaces that had been reporting clean**,
including the in-repo product's own pricing and CRM pages:

| Surface | Found |
|---|---|
| `pricing.tsx` | "Predictive & Progressive auto-dialer pacing (~0.4s call hand-off)", "Live Supervisor HUD: silent listen, whisper coaching & call barge-in", "Zero PBX Markup" |
| `contact.tsx` | "automated progressive/predictive dialer pacing", "silent listen, whisper, and barge-in capabilities" |
| `crm-variants-explorer.tsx` | "Live Supervisor Listen, Whisper & Barge-in HUD", "Whisper Coaching" |
| `product-families.tsx` | "automatic dialer", "Collections CRM · Field App · **Dialer** · Voice AI", "Flagship CRM & **Dialer**" |
| `deployment-models.tsx` | "high-throughput predictive dialer" — and, unremarked, "role-based permissions" |
| `bitscrm/page.tsx` | 9 distinct strings: predictive dialing, barge-in takeover, "zero PBX maintenance", PBX hardware |
| `public/bitsagent.md` | an entire "Ultra-Low Latency Conversational Voice" section — sub-300ms STT→LLM→TTS and "natural barge-in" — against a build with no STT and no TTS |

Every one is an in-repo false claim of exactly the class §§48–§53 existed to
remove, re-entering through a gap in a word list.

### 62.3 Adjudication, not deletion

Three of the new hits were **denials wearing the vocabulary of claims**, and each
was resolved by making the sentence say what it means rather than by adding an
exemption:

- `pricing.tsx` — heading **"Zero PBX Markup"** over a body reading *"Telephony is
  not part of this build."* Now **"Zero Telephony Required"**, which the body
  supports.
- `bits-agent-page-content.tsx` — *"Predictive dialing depends on telephony
  infrastructure"* is a dependency statement, not a capability claim. Rewritten to
  state dependency and absence together: *"Voice telephony is not included in this
  build — predictive dialing would require telephony infrastructure."*
- CRM dashboard — *"viewed the demo dialer specimen"*, already prefixed **"Sample
  data —"**. The label sat on the previous line, so no sentence-level detector could
  see it (§59's denial-split problem again). Reworded to *"demo contact specimen"*:
  the demo string no longer names an artifact that does not exist.

`bitscrm/page.tsx` also keeps two FAQ answers that **deny** telephony outright and
are left exactly as written. A rule that cannot tell an assertion from its own
refutation will keep producing these, and the honest response is to check each one,
not to widen `SCOPED_OUT` until the noise stops.

### 62.4 The generalisable failure

§52 believed the category was covered because the rule existed. It was not covered;
the rule was **narrower than the thing it claimed to cover**, and the only evidence
that could have revealed it was a sweep nobody had run.

That is now the fifth time the same question — *what does this not cover?* — has
found a hole: a list of files (§48), a category of claim (§52), the auditor's own
uncovered directory (§54), a missing label (§56), and now the **vocabulary** of a
rule already shipped and reported as working.

**A detector's term list is a specification of what it fails to catch.** Any rule
added to close a class of claim should be asked immediately: *give me the words this
codebase actually uses for that class* — not *the words the original report used*.

### 62.5 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **20 surfaces / 3,757 strings**, widened term |
| `node scripts/claim-coverage.mjs` | **20/20 gated surfaces clean** · 12 publication docs / 591 lines · 9 live (adjudicated), 8 banner |
| `node scripts/publication-docs-negative.mjs` | **32/32** |
| `npm run test:unit` | **22 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

`llms.txt` lines 7, 17 and 18 are corrected: the sub-350ms dialer, the whisper/barge
supervisor HUD and the "100% sovereign compliance with BSP Circulars 454/857" are
replaced with automated PTP scheduling, dynamic work queues, disposition logging
and session-gated access. Line 32's *"predictive win scoring"* and the `#1`
benchmark ranking are **retained** — the first belongs to BITScrm Sales, the second
is a numeric marketing claim reserved to the owner.

---

## 63. Batch B adjudicated — and the sweep was wrong four times in eight

The second `docs/` root sweep returned 6 files. Every finding was re-verified
against the code before anything was edited, and **verification mattered**: of the
brand-token findings, four of eight were wrong in *both* directions.

### 63.1 What was verified and corrected

**`WORKFLOWS.md`** walks `/app/pipelines`, `/app/tasks`, `/app/conversations`,
`/app/campaigns`, `/app/automations`, `/app/forms`, `/app/templates` and
`/app/team`. **None exists.** Verified directly: `app/(crm)/app/**/page.tsx` yields
six list/detail routes, and `lib/crm/nav.ts` names exactly those six —
`dashboard`, `leads`, `contacts`, `companies`, `opportunities`, `settings`. The
document is a record of the mock at `76576d8`, superseded by the real application;
a banner now says so and names both the phantom and the real routes.

Its *"Admin/Manager can click Invite member"* is not stale but **false**: there is
no role model, and `requireCrmUser()` authenticates without ever authorizing.

**`UI_STANDARDS.md` specified a control size its own components do not use.** The
table said `CrmButton` is `min-h-11` and `StatusFilter` is `h-11`. Neither is true:
`components/crm/crm-controls.tsx` uses **`min-h-10` and `h-10`** — 40px, not 44px.

The more interesting half: **no gate enforces a touch-target size at all.**
`a11y-static.selfcheck.mjs` checks accessible names and heading skips, nothing more.
So the document was a convention with no contract behind it.

The number itself turns out to be the thing that was wrong. **WCAG 2.2 SC 2.5.8
Target Size (Minimum, AA) requires 24×24 CSS px**; 40px clears it comfortably. The
44px figure is Apple HIG guidance, not a WCAG requirement. **The implementation is
compliant and the document was not.** Its list of eleven list pages had seven
phantoms, now corrected to four.

**`seo-ai-visibility.md`** claimed *"32 Canonical Routes Returning HTTP 200"* and
cited **`public/robots.ts`**, which does not exist — the file is `app/robots.ts`,
and `SEO-STRATEGIC-PLAN-AND-AI-VISIBILITY.md:65` cites it correctly, so the two
documents contradicted each other. The real figure comes from
`sitemap-coverage.selfcheck.mjs`: **36 URLs advertised, all resolve.**

**`SEO-STRATEGIC-PLAN-AND-AI-VISIBILITY.md`** quotes `llms.txt` **verbatim** as
"Extracted AI Passage" — the pre-correction text, advertising the sub-350ms dialer
and whisper/barge-in that §62 removed hours earlier. Both passages are now marked
stale rather than deleted: deleting them would hide what was actually being fed to
search engines, and **quoting a corrected-away claim as evidence of what an AI will
say manufactures a citation.**

### 63.2 Where the sweep was wrong

`BRANDING_CLOUDS_INFINITY.md` was reported as having four wrong colour tokens.
Checked against the source:

| Token | Sweep said | Measured |
|---|---|---|
| `#030B18` Bedrock Navy | absent | **absent** — real value is `#030d1c`; fixed |
| `#0284C7` Boundless Horizon | absent | **present** |
| `#2563EB` Electric Action Blue | absent | **present**, 12 uses |
| `#E0F2FE` Stratosphere Vapor | absent | present in `brandbook.html` and `lib/security/contrast-check.mjs` |

One real error out of four. The sweep also marked `ROLES_AND_PAGES.md` as clean and
that proved correct — it had independently verified the same six-route list this
section confirms.

**This is the second time in three phases a delegated sweep has been wrong**, and
both times in the same direction: reporting absence that was not absence. §61's
batch-A sweep wrongly said `security.tsx` was unimported; this one wrongly said four
hex codes did not exist. A sweep narrows where to look. It does not replace looking.

### 63.3 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **22 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |
| CRM route list | verified against `app/(crm)/app/**/page.tsx` and `lib/crm/nav.ts` — 6 routes |
| Sitemap URL count | verified by `sitemap-coverage.selfcheck.mjs` — **36** |

---

## 65. Asking whether §62 was a bug or a symptom

§62 found that the `telephony` rule matched six technology words while telephony is
sold here as "predictive dialer", "auto-dialing" and "whisper coaching". The rule
existed, was negative-tested, and was reported as working.

That raised a question the audit had never asked of any of its own rules: **is the
rest of the detector set the same width as its categories, or was telephony just the
one that happened to be noticed?**

### 65.1 Fourteen of forty-eight probes missed

`scripts/rule-vocabulary-coverage.mjs` supplies, for each of the fifteen rules, the
phrasing a copywriter would plausibly reach for — deliberately written the way
marketing copy is written rather than the way the rule author was thinking.

**First run: 34/48.** Fourteen misses across **eight** rules. §62 was a symptom.

| Rule | Missed the corpus's own words |
|---|---|
| `rbac` | **"role-based permissions"** — the exact phrase §63 had just found sitting in `deployment-models.tsx` |
| `isolation` | **"Customer data isolation"** — one of the most ordinary sentences on a B2B security page; the term said "campaign" |
| `contact-rules` | **"BSP 454/857"**, "contact-hour", "call window" — the regulation itself |
| `worm` | "write-once read-many", "append-only" — the acronym was the only spelling |
| `sso-mfa` | "SAML", "two-factor authentication" |
| `multitenant` | "tenant isolation", "each tenant's data is siloed" |
| `enforcement-badge` | **"100% Compliant"** — the badge's most common real form |

`rbac` missing the phrase an audit had *already found and fixed by hand* is the
clearest statement of the problem: the gate had been reporting clean on a class of
claim it could not see, in a file that had just been swept.

### 65.2 A false negative hiding inside `SCOPED_OUT`

Probing `contact-rules` exposed something worse than a narrow term.
`findClaims("Do-Not-Call")` returned **nothing** — the banned term was being scoped
out by its own contents.

Hyphens are word boundaries in JavaScript, so `\bnot\b` matched the `Not` in
**`Do-Not-Call`**. The regulator's own name was being read as a denial. The same
held for `Cache-Control: no-store`, where the `no` in a header value read as a
negation.

`SCOPED_OUT` now requires a non-hyphen, non-word character on both sides of a
negation. "There is no compliance" stays scoped; "Do-Not-Call" and "no-store" stay
detectable. **A false negative is worse than a false positive, because it is silent
— and this one had been silently suppressing a banned term since §53.**

### 65.3 The regression suite caught me

Widening `contact-rules` to include `BSP 454/857` immediately broke
`scoping-regression.mjs` on real shipped copy:

> *"These rules are not enforced by this build. **Contact-window, frequency-capping
> and do-not-call handling** is an engagement-scoped deliverable we configure per
> deployment…"*

That copy is honest, and the denial sits in the **previous sentence** — §44's
sentence-splitting failure, reproduced in the vocabulary rather than the scoping.

Two ways out. The obvious one is to weaken the rule until the noise stops, which is
how detectors get hollowed out. The better one is to make the **copy** robustly
exempt by putting the denial in the same sentence as the mechanism nouns:

> *"Contact-window, frequency-capping and do-not-call handling **is not enforced by
> this build** — it is an engagement-scoped deliverable we configure per
> deployment…"*

Same meaning, clearer to a reader, and exempt for a real reason instead of by luck.

Two follow-on tightenings the same pressure forced, both recorded rather than
quietly applied:

- `BSP 454/857` alone fired on **framework names** used as badges. It now requires a
  compliance verb nearby, so *"strictly aligned to BSP Circulars 454/857"* is caught
  and a bare heading is not.
- `multi-factor` alone caught *"Multi-factor confirmation recorded for this
  session"* — a count of OTP steps in demo data, not an MFA control. The term now
  requires the authentication noun.

### 65.4 The lesson, stated once

§40's original note on the telephony rule already said it: *"the term list is
narrower than the class the rule exists to close — the terms listed are the ones the
gate went looking for, not the ones that occur."* That was written in §52 and not
acted on until §65.

**A negative test proves a rule fires on the string you thought of. It cannot prove
it fires on the strings nobody thought of.** Every rule needs the second question
asked of it explicitly, on a schedule, by something that is not the rule's author.

**Final: 48/48.** `scoping-regression.mjs` still verifies — **21 honest denials
pinned**, re-derived from source rather than typed, and it went back up from 20
because the rewritten control sentence is a stronger denial than the two it
replaced. `ai-disclosure` reports **20/20 surfaces clean** with every rule widened.

### 65.5 Verification

| Check | Result |
|---|---|
| `node scripts/rule-vocabulary-coverage.mjs` | **48/48** (was 34/48) |
| `node scripts/scoping-regression.mjs` | verified — 21 honest denials pinned |
| `node scripts/publication-docs-negative.mjs` | **32/32** |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 20 surfaces / 3,757 strings |
| `npm run test:unit` | **23 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

Two claims were fixed on the way through, both found by the widened terms rather
than by inspection: the Enterprise tier's *"strictly aligned to BSP Circulars
454/857"*, and a fictional demo ticket named `TICK-8842 BDO FinTech **SAML**
Rotation` — which §29 had already catalogued as a mock with no integration behind
it, but which still implied the product performed SSO.

---

## 66. What §65's widening found, once it was pointed at the ungated files

§65 widened the rules and left the corpus larger, because a rule that sees more sees
more of everything — gated **and** ungated. The gated surfaces were already clean;
the new findings were in the places the gate does not cover, which is precisely the
pattern of the last three phases.

### 66.1 Four real in-repo claims the gate had never been shown

| Where | Claim | Reality |
|---|---|---|
| `README.md:254` | System Administrator handles *"API key rotation, SSO/SAML, IP whitelisting, database backups, audit logs"* | none implemented. `FULL_SYSTEM_DOCUMENTATION.md:289` **struck this exact row**; the README copy was never updated |
| `OMS_FEATURES.md:92` | *"Two-factor sign-in"* | no TOTP/MFA. `lib/site.ts:2037` had already recorded that fact in a correction comment |
| `lib/site.ts` ×3 | "Campaign tenant isolation", "Multi-campaign tenant isolation", "Client & campaign tenant isolation" | single-tenant; every RLS policy is `using (true)` |
| `lib/site.ts:2018` | BPO showcase copy plus a tag reading **"Softphone & Dialer"** | no telephony. Invisible because that export has never been in `SECURITY_SURFACES` |

The last one is the §62 pattern exactly: a widened rule finds the claim, and the
claim is in an export no gate reads. **Fixing it without covering it only buys
time** — the same sentence §48 used, and it still applies.

The README row is the one worth dwelling on. `docs/FULL_SYSTEM_DOCUMENTATION.md`
struck this identical claim in §29. Seven phases later the same sentence was still
live in the file most readers open first. **A correction applied to one document is
not a correction applied to the fact.**

### 66.2 What was checked and left alone

- `pricing.tsx:87` — *"Six-tier role-based permission matrix (RBAC) & immutable WORM
  audit logs"* still greps, but it sits inside the `/* … */` correction comment
  written in §48. Not a live claim; a raw grep cannot tell the difference, which is
  why `stripComments` exists and why the gate is the authority.
- `products-suite.tsx` SAML email subject and "100% Compliant" chip — demo mockup
  strings, catalogued in §29 and now inside the §56-labelled preview.
- `cookies/page.tsx:276` and `llms-full.txt:57` — genuine **denials** ("tenant
  isolation" used to describe what cookies are for; multi-tenant isolation stated as
  not implemented).
- `deployment-models.tsx:272` — contains "role-based permission matrix" inside the
  sentence that denies it. The gate scopes it correctly.

### 66.3 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 20/20 surfaces clean |
| `node scripts/claim-coverage.mjs` | blind spot **248 → 239** across 27 files |
| `npm run test:unit` | **23 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

---

## 67. Closing a gap that has now produced three separate findings

`lib/site.ts`'s ungated exports generated real, in-repo false claims **three
times**: §57's dialer badges on the flagship, §66's three "tenant isolation" claims,
and a **"Softphone & Dialer"** tag. Each time the fix was manual. A manual fix to
an uncovered region is a fix that will be needed again.

Waiting on the owner's §8 decision would have been the wrong move, because **not
every export in that file is blocked by it.**

### 67.1 `crmModules` was gateable the whole time

`SECURITY_SURFACES` gates four named exports of `lib/site.ts`. The open question in
§57 was specifically about **`bitsProducts`** — 18 products, most out-of-repo, which
is why gating it fails the build on copy that may be accurate.

`crmModules` is a different thing. It is the **Flagship CRM deep-dive**, it
describes **only the in-repo product**, and it is a plain named export the existing
`exports` mechanism already supports. Nothing about it depends on the owner decision.

It carried **5 findings** while ungated:

- a module literally titled **"Contact Center & Telephony"**, promising a
  *"WebRTC/SIP browser softphone"*, *"preview, manual, and progressive dialing
  modes"* and *"browser SIP dialing"*;
- a **Supervision & QA** module promising *"live call monitoring with listen,
  whisper, and barge"*;
- *"Controlled bulk actions with complete audit trails"* — with no audit trails.

Every one is the §62 telephony class, on the in-repo product's own page, invisible
for months because the export was not in the list.

### 67.2 Rewritten rather than deleted

The contact-centre module is now **"Account Work Queue"** — dynamic queues,
structured dispositions, and an email touchpoint logged against the account — with
**"Roadmap, not shipped: browser softphone and dialing modes"** stated plainly.

The module's *purpose* is real: putting the next action next to the account rather
than in another tool. What it described was not. Deleting it would throw away a
true claim along with a false one; rewriting keeps both.

Same treatment for Supervision & QA: queue-level workload visibility and coaching
logs stay, listen/whisper/barge moves to an explicit roadmap line. And *"clear
permission boundaries for sensitive supervisor actions"* is **gone entirely** — it
implied a role model that does not exist, and there is no honest replacement
sentence, because the truthful version is "there is one privilege level".

### 67.3 The structural point

`bitsProducts` genuinely is blocked on §8, and stays ungated. `crmModules` was not,
and had been quietly sitting in the same file the whole time.

**An open question about one export does not make every export in that file equally
blocked.** Grouping "ungated `lib/site.ts`" into a single deferred item is how a
gateable surface stays ungated for months. When deferring part of a region, check
whether the rest is actually deferrable, and gate whatever is not.

Coverage: `ai-disclosure` now reads **3,797** visible strings (was 3,757).
`scoping-regression` re-derived **22** pinned honest denials — one more, because the
new roadmap labels are themselves denials.

### 67.4 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 20 surfaces / **3,797** strings |
| `node scripts/claim-coverage.mjs` | **20/20 gated surfaces clean** · blind spot **239 → 234** |
| `node scripts/rule-vocabulary-coverage.mjs` | **48/48** |
| `node scripts/scoping-regression.mjs` | verified — **22** denials pinned |
| `node scripts/publication-docs-negative.mjs` | **32/32** |
| `npm run test:unit` | **23 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

---

## 68. §67's lesson, applied one export at a time

§67 gated `crmModules` on the reasoning that an open question about *one* export does
not block the rest of the file. The obvious next move is to apply that reasoning to
the other ungated exports rather than to leave them as one deferred lump.

Each candidate was checked on what it actually describes, not on where it lives.

### 68.1 Two more were never blocked

| Export | Describes | Gateable? |
|---|---|---|
| `navigationSections` | the site navigation — rendered on **every page** | yes, unambiguously |
| `targetIndustrySectors` | the homepage industry section, phrased as platform capability | yes — claims about *this* deployment, not an out-of-repo line |
| `hardwareScopingTiers` | bare-metal sizing table prescribing SIP trunks and voice bandwidth | **not yet** — see below |
| `solutionPackages` | the 7 findings mix the whole catalogue | **not yet** |

The first two went in. Together they carried **7 findings**, all in-repo:

| Claim | Reality |
|---|---|
| nav: *"Integrated operations platform: CRM, QA, Scorecards, Coaching, **Dialer**, LMS…"* | no telephony |
| nav: *"DPD tracking, automated PTP scheduling & **auto-dialing**"* | no telephony |
| nav: badge **"RBAC Matrix"** | no role model; one privilege level |
| nav: *"**Role-based boundaries**, data isolation & BSP/NPC principles"* | none of the three |
| industries: *"Manage distinct client campaigns with **strict tenant separation**… **high-volume telephony integration**"* | single-tenant, no telephony |
| industries: *"**Integrated SIP softphone & auto-dialing**"* | no telephony |
| banking: *"**Compliant customer contact & quiet-hour rules**"* | configured per engagement, not enforced |

The "RBAC Matrix" badge deserves a note: it was a **site-navigation label**, which
is the single least scrutinised string type in the codebase. It renders on every page
and is read by nobody, which is exactly why it survived.

### 68.2 Two held back, and why

`hardwareScopingTiers` prescribes *"Local SIP Trunk or 1x E1/PRI Gateway"*,
*"~2.5 Mbps Dedicated Voice Bandwidth"* and *"4–8 TB SAS RAID-5 (**Voice Audio**)"*
for a deployment with no telephony. It looks gateable, but it is a **hardware sizing
table for an on-prem profile**, and whether that profile is a real offering or a
sales artefact is a question about the product rather than about this repository's
code. Gating it on an assumption is how §50's mistake is made in reverse.

`solutionPackages` carries the largest single count (7) and spans the whole
catalogue, so it needs the §8 answer on out-of-repo lines before it can be gated
without failing the build on copy that may be accurate.

Both are recorded rather than quietly dropped. **A known-unfixed item with a stated
reason is a decision; the same item found by the next sweep is an omission.**

### 68.3 Coverage

`ai-disclosure` now reads **3,974** visible strings, up from 3,757 at the start of
§67. `scoping-regression` re-derived **23** pinned denials — the new roadmap and
"configured per engagement" labels are themselves denials, and the suite found them
from source rather than being told.

Blind spot **234 → 227** across 27 files, all but a handful out-of-repo product copy.

### 68.4 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 20 surfaces / **3,974** strings |
| `node scripts/claim-coverage.mjs` | **20/20 gated surfaces clean** · blind spot **234 → 227** |
| `node scripts/rule-vocabulary-coverage.mjs` | **48/48** |
| `node scripts/scoping-regression.mjs` | verified — **23** denials pinned |
| `node scripts/publication-docs-negative.mjs` | **32/32** |
| `npm run test:unit` | **23 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

## 69. A deferral justified by a product question, resolved by a cheaper fact

§68 deferred `hardwareScopingTiers` and `scopingProcessSteps` pending an owner
decision: *is there a real on-prem offering?* The audit recorded the deferral
rather than resolving it, and §68's own reasoning said a deferral needs a stated
reason.

The stated reason turned out to rest on a question that was never the one that
mattered. Whether an on-prem profile exists is a question about software that is
**not in this repository**, and it genuinely is the owner's to answer. But both
exports are consumed by `components/sections/deployment-models.tsx` — a public
page — and a public page prescribing hardware is a claim about *this* build
regardless of what else exists elsewhere.

So the copy was corrected on its own merits, without the product decision:

| Was | Now |
|---|---|
| "Local SIP Trunk or 1x E1/PRI Gateway" | "None required — no telephony ships in this build" |
| "~2.5 Mbps Dedicated Voice Bandwidth" | removed |
| "4-8 TB SAS RAID-5 (Voice Audio)" | documents and backups |
| "test call audio clarity (< 20ms LAN jitter)" | "page/API latency under load" |
| "concurrent call channels, voice recording storage" | concurrent user sessions |
| installation "interconnects with local telco SIP gateways" | PostgreSQL replication, no SIP interconnect |
| "100+ Seats / Multi-Tenant" tier label | "100+ Seats / Single-Tenant Deployment" |

Both exports are now gated. Blind spot **227 → 221**.

The owner question is not withdrawn — it still decides whether an on-prem profile
should be *offered*. It no longer blocks the page being honest about what ships.

**The generalisable lesson:** a deferral justified by "this might be a product
question" should be re-examined the moment a cheaper fact arrives. Here the
cheaper fact was *does this thing render*, which is checkable from the repo in
seconds and which the product question is not. Rendering decides it.

*(This section was written after commit `2c72185`, which shipped the code change
without recording it here. The implementation preceded the record; that ordering
is itself a small instance of the theme — a fix that lands without a written
rationale cannot be reviewed by the next person.)*

## 70. The gate was reading the wrong file: a gated surface that renders copy it never looked at

§69 gated `hardwareScopingTiers` and `scopingProcessSteps` by finding that a
**gated surface renders them**. Following that same question one step further
produced the most serious finding of the audit — not a false claim, but a false
*assurance*.

### 70.1 What was wrong

`app/(marketing)/bitscrm/page.tsx` has been a gated surface since §50. It has
reported CLEAN on every run since. At line 388 it renders `pricingTiers.features`,
and that array was selling, on a public page:

```
"Built-in Browser SIP Softphone"
"Predictive & Progressive Auto-Dialer"
"Dedicated SIP Trunking & Telco Routing"
```

Not one of those literals appears in `page.tsx`. A file-level gate reads the
strings **inside** a file. When the copy is imported, it reads nothing and reports
the absence of a defect that is on screen.

This is worse than an ungated file. An ungated file is an acknowledged gap. A
gated surface is a claim about itself that something downstream trusts — the
`scoping-regression` suite reads `SECURITY_SURFACES` at runtime to discover which
denials are real, so a wrong entry there corrupts a second gate as well.

Four more imports were in the same position. `site` was the sharpest:
`app/layout.tsx:143,182,199` publishes `site.description` into the Organization
and SoftwareApplication JSON-LD, and `app/manifest.ts:8` puts it in the PWA
manifest — on every page — and it read **"predictive dialing"**.

| Gated surface | Un-gated import it renders | Findings |
|---|---|---|
| `app/(marketing)/bitscrm/page.tsx` | `pricingTiers` | 6 telephony |
| `app/(marketing)/security/page.tsx`, `legal/`, `contact.tsx` | `site` | 1 telephony |
| *(page not itself gated)* | `solutionPackages` → `/pricing` | 6 |
| `components/sections/bits-agent-page-content.tsx` | `bitsAgentCapabilities`, `bitsAgentPricingTiers`, `bitsAgentUseCases` | 0 — gated anyway |

### 70.2 Two rule bugs the widening exposed

Before fixing copy, two rules were probed against the phrases a copywriter
actually writes. Two proven false negatives fell out — both silent, both live:

**`multi-?tenant` does not match "multi-tenancy".** English drops the `-t`:
*tenan*-cy, not *tenant*-cy. Measured, not reasoned:

```js
/multi-?tenant/.test("multi-tenant")   // true
/multi-?tenant/.test("multi-tenancy")  // false
```

The single most ordinary way a pricing page says multi-tenant was invisible, and
it was shipping: `pricingTiers` published *"Unlimited agent seats & multi-tenancy"*
against a single-tenant app. Fixed to `multi-?tenan(?:t|cy|ce)`.

**The telephony supervision cluster only knew its exact phrases.** The rule had
`live listen`, `whisper coaching` and `barge-in`, so it missed the way the same
three words actually appear in a features list — *"Live Supervisor Listen,
Whisper & Barge"*, shipping on the same /bitscrm table. Bare `whisper` and `barge`
added.

Widening was then measured for crying-wolf, not assumed: `rule-vocabulary-coverage`
held **48/48**, and `scoping-regression` rose **23 → 26** honest denials pinned.
A widening that finds *more honest denials*, not fewer, is finding the class
rather than pattern-matching noise.

### 70.3 The new findings the widening exposed

Five live claims appeared the moment the vocabulary covered them — including one
in a file §62 had already widened and §68 had already gated:

- `lib/site.ts (targetIndustrySectors)` — *"Supervisor listen, whisper & barge"*,
  a marketing workflow bullet. §62 reported this export clean; §68 gated it; it
  was still there. Corrected to the same roadmap wording used elsewhere in the file.
- `components/sections/crm-variants-explorer.tsx` — *"Supervisor Audio Barge HUD"*,
  *"Barge Ready"*, *"Dual-Channel SRTP"*, and the coaching-toast copy. §50 gated
  this file; §62's vocabulary could not see those four strings.

This is the **ninth** distinct instance of "a gate is a statement about a defined
scope — always ask what it does not cover": a list of files (§48), a category of
claim (§52), the auditor's own directory (§54), a missing label (§56), a product
catalogue (§57), a rule's vocabulary (§62, §65), and now **the gate's inputs**.

The explorer board was labelled rather than deleted, per the standing constraint
that demo behaviour is labelled and not removed. The first attempt put the label in
a sibling `<p>`, which did not help — the detector is sentence-scoped and cannot see
a label in an adjacent element. That is §56's rule again: *labelling must not
exempt a gated surface from honest copy fixes*. The four strings now carry the
specimen marker in-line, matching the convention already used at lines 861 and 935
of the same file.

### 70.4 The check, and proof that it fires

`scripts/gated-render-closure.mjs` asserts that every copy export a gated surface
renders is itself gated or clean. It is **derived, not enumerated**: the set of
copy modules is whatever a gated surface actually imports, so a new content module
pulled into a gated page is covered automatically.

Its first run printed `0 imported-but-ungated copy exports scanned` — and a green
tick. The code was correct; every import was legitimately gated by then, so the
scan path had never executed. **A check that reports success without having
looked at anything is §59's failure mode exactly.** The script now prints full
accounting (imports examined / already gated / scanned / type-only / unresolved)
and prints a loud warning instead of a tick when the scan path did not run.

`scripts/gated-render-closure-negative.mjs` proves the detector fires, by
**injection**. The first draft instead ungated the three known-bad exports — and
could not work, because §70 had already fixed them. *A negative test whose fixture
is the bug it exists to catch is only alive until the bug is fixed, which is
precisely when it is needed.* So the mutation is now written into a real gated
export's text in memory and handed to the real closure function:

| Assertion | Result |
|---|---|
| derived a real gated surface → gated export edge | PASS (17 edges) |
| injected `Built-in Browser SIP Softphone with predictive dialing`, ungated | FAILS, cites `[telephony]` |
| injected `Unlimited agent seats & multi-tenancy`, ungated | FAILS, cites `[multitenant]` |
| same injection while correctly gated | not reported as uncovered |
| real repository | PASS — 188 imports, 0 ungated |
| type-only import skipped | PASS |
| ungated virtual module rendered by a gated surface | FAILS |

**13/13.** No file on disk is written by the negative test.

### 70.5 Coverage

Gated surfaces **20 → 21** (`/pricing` added). Visible strings **4,010 → 4,441**.
Blind spot **221 → 217** across the same 27 files — the widened rules found more
than the copy fixes removed, and the net is a smaller hole in a larger net.

### 70.6 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 21 surfaces / **4,441** strings |
| `node scripts/claim-coverage.mjs` | **21/21 gated surfaces clean** · blind spot **221 → 217** |
| `node scripts/gated-render-closure.mjs` | PASS — 188 imports, 0 ungated |
| `node scripts/gated-render-closure-negative.mjs` | **13/13** |
| `node scripts/rule-vocabulary-coverage.mjs` | **48/48** |
| `node scripts/scoping-regression.mjs` | verified — **26** denials pinned (was 23) |
| `node scripts/publication-docs-negative.mjs` | **32/32** |
| `node scripts/route-count-drift.mjs` | truth = 45 definitions / 53 paths |
| `npm run test:unit` | **26 suites PASS** (2 added) |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 71 static pages |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS — 345 files |

## 71. A correction applied to one section is not a correction applied to the fact

Four documents had never been read. A delegated sweep read them; every headline
claim it reported was then verified against the repository before being acted
on — §63's rule that a list from a sweep is evidence, not proof. All of them
held.

The sweep's one numeric claim was stale — it quoted 3,974 visible strings from
before §69 — which is itself the subject of this section.

### 71.1 The same claims, live, in five other sections

`docs/OPERATIONS-360-CRO-AUDIT.md` §52 struck three positioning pillars and
attached a correction banner. The same claims were left live in §1.2, §3.2, §4.2,
§4.4, §5.1 and §9.1:

| Section | Live claim | Reality |
|---|---|---|
| §3.2 IT Lead | "WebRTC + multi-provider PBX + Asterisk WebSocket + 16-SIM GoIP out of the box" | No telephony, no PBX, no GoIP |
| §4.4 | "built-in WebRTC softphone, built-in dialer" · "audit-aware" | Neither exists |
| §5.1 (5) | "Regulator-defensible by default… immutable Purge Log, fail-closed licence gate" | None of the four is implemented |
| §5.1 (7) | "multi-PBX support (3CX, Zoiper, Asterisk WebSocket)" | No PBX integration |
| §5.1 (9)(11) | "WebRTC softphone built-in" · "Predictive dialer with abandon-rate reporting" | No telephony at all |
| §9.1 | "Server-side enforcement: agents can only see their own accounts" | **No per-agent scoping exists.** Every authenticated operator reads every record |
| §0 findings 1–2 | Field app, quiet hours, C&D enforcement, immutable Purge Log | None built |

The §9.1 row is the most dangerous item in the document: it is a *security*
assurance, offered as the answer to "will my agents actually use it", and it is
false in the strong direction — there is no scoping to enforce.

The root cause is that **the document never says what it is.** It is generated
from `BITS_CRM_UseCases_v2.0.xlsx` and describes a product specification, but it
reads throughout as a description of shipped software. So the fix was not to
strike a dozen lines; it was a document-level banner stating what the document
is, a measured reality table, and an explicit instruction that nothing in it may
be published as a claim about what BITS ships.

`docs/MARKETING_PRODUCT_GUIDE.md` had the same shape in miniature. Its §48 banner
removed *"built-in browser WebRTC SIP predictive auto-dialing"* from one place
and listed what had been removed — and 114 lines later the same capability was
still selling, with *"Triples collector right-party connects from 12 to 38
contacts per hour"* attached. A banner that enumerates its removals reads as a
guarantee that the rest was checked. Also live: *"natively share … single
sign-on (SSO)"* (no SAML, no OIDC, no IdP integration anywhere), and *"WebRTC
auto-dialers, and BSP compliance locks"* inside a ready-to-say sales script.

### 71.2 "All nineteen … and run in CI without a server"

Two claims in `docs/TESTING.md`, both false, one of them about the gates that
are supposed to catch false claims.

| Claim | Measured |
|---|---|
| "All nineteen" | **28** selfchecks |
| "run in CI without a server" | **There is no CI.** `.github/workflows`, `.gitlab-ci.yml`, `.circleci`, `azure-pipelines.yml`, `Jenkinsfile`, `.drone.yml` are all absent. The only deployment config is `vercel.json` |

Also corrected: "10 security surfaces / 1,938 visible strings / 13 banned
attestations" → **21 / 4,441 / 15**; "each of the 13 rules" → 15; and a sentence
that said *"Fixed 9 real defects: five …, six …, and seven …"* — an enumeration
summing to 18.

**"Run in CI" is the costly one.** A claim that a feature is missing gets fixed.
A claim that checks run themselves makes every gate in `docs/TESTING.md` look
like it is guarding the branch, when in fact the entire suite is one `npm`
command away from being silently skipped on every push. This is the second such
claim in the repository; the first was the CRM "support ticket" module.

### 71.3 The real defect: these numbers drift, and nothing re-measured them

Correcting four documents fixes four lines and leaves the mechanism untouched,
so §72 finds the next four. `docs-claims-drift.mjs` closes it. Values are derived
from code — nothing typed in — and any document quoting a measured quantity must
quote the measured one.

It found four more on its first run, two of them in documents no sweep had
touched:

- `docs/LANDING-PAGE-REV-2026-10-06.md:63` — "Explore All 18 Engines (→ /demo)",
  where `/demo` renders the **19**-engine registry.

**And it found a live defect in the product.** `app/demo/page.tsx` hardcoded
`18-Engine MVP Matrix` in a badge while three lines below rendered
`{engineCount}` — `productsList.length`, which is 19. The same page said "18"
and "All 19 Engines" on one screen. Now derived.

### 71.4 Two catalogues, and why a single expected value was wrong

The first version of the rule asserted one engine count and failed **four
sentences that were correct**. There are two product catalogues and they are not
nested:

| Catalogue | Count | Renders at |
|---|---|---|
| `PRODUCT_REGISTRY` | **19** | `/demo` |
| `bitsProducts` | **18** | `/products` |

`crm-sales`, `operations-360`, `crm-collections`, `crm-support`, `crm-marketing`,
`crm-commerce` and `bitsagent` are in the registry and not in `bitsProducts`.

So "18 engines" is correct in any document describing `/products` and wrong in
one describing `/demo`. **A heuristic that cannot separate the classes produces
noise, and noise gets the gate switched off** — §44's outcome again. The rule
accepts either count and fails only on a number that is neither, with one
narrow exception that *is* separable: a line that names `/demo` must use the
registry count.

### 71.5 The gate caught its own blind spot within minutes of existing

Wiring the new gates into `test:unit` moved the count 26 → 28 and made
`docs/TESTING.md`'s own sentence wrong. The gate did not fire. Two reasons, both
invisible:

1. `All **twenty-six** are dependency-free` — the pattern read `\w+` for the
   number word, which cannot match a hyphenated `twenty-six`, so it never
   matched the sentence it had been written for.
2. `\all\s+(\w+)\s+are` — markdown emphasis (`**`) sat between the word and the
   verb and broke the match.

A gate that covers nothing looks exactly like a gate that covers everything.
Both fixed — the capture is `[\w-]+?` and the emphasis is tolerated — and the
check immediately failed on `docs/TESTING.md:24`, which was then corrected to
**twenty-eight**.

### 71.6 The exemption, stated rather than smuggled

`docs/SYSTEM_AUDIT.md` is exempt from the drift gate. It is a chronological
record in which *"up from 3,974"* is the entire point, and a drift rule fired on
nearly every section would be turned off within a day. `docs/social/` and
`docs/ads/` are **not** exempt — they are publication copy and are checked.

The WebRTC-mention counter is printed but **report-only**: a document may
legitimately quote a count measured under a different scope, and there is no
separation between "quoting today's number" and "quoting last week's".

### 71.7 Proof the gate fires

`scripts/docs-claims-drift-negative.mjs` — **15/15**. It mutates a real document,
runs the **real** script, asserts a non-zero exit, asserts the output names the
file and both the wrong and the correct number, and asserts the file is restored
byte-for-byte. Word-forms are covered because `docs/README.md` and
`docs/TESTING.md` both wrote "All nineteen" in words, which a numeric-only rule
would have passed.

### 71.8 Verification

| Check | Result |
|---|---|
| `node scripts/docs-claims-drift.mjs` | PASS — 48 markdown files, 1 exempt |
| `node scripts/docs-claims-drift-negative.mjs` | **15/15** |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 21 surfaces / 4,441 strings |
| `node scripts/gated-render-closure.mjs` + negative | PASS · **13/13** |
| `npm run test:unit` | **28 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 71 static pages |

### 71.9 The lesson, stated once more because it is now the third time

§52 corrected §2.3. §48 corrected one WebRTC string. §71 corrected both, and
found the same claim live elsewhere in each case.

**A correction applied to one place is not a correction applied to the fact.**
The fact here has two parts that only became visible when the correction was
mechanised: the *second location* of every claim, and the *second mechanism* by
which the same false number reappears in a new document. Both now have checks
attached rather than a note asking the next reader to remember.

## 72. The mirror image of §61: content that exists and is wired to nothing

§70 and §71 gated surfaces by asking *what renders*. §72 asked the next
question — **what does not, and should it still be gateable?**

### 72.1 Seven dead exports carrying the same false claims

Nine further `lib/site.ts` marketing exports were ungated. Checking consumers
precisely, by import statement rather than by text match:

| Export | Consumers | Findings |
|---|---|---|
| `faqItems` | `components/sections/faq.tsx` — homepage FAQ **and FAQPage schema** | 3 |
| `agents` | `app/layout.tsx:212` — site-wide **ItemList JSON-LD** | 2 |
| `solutions` | **none** | 3 |
| `aiAgents` | **none** | 2 |
| `industries` | **none** | 1 |
| `ecosystemPillars` | **none** | 2 |
| `methodologySteps` | **none** | 1 |
| `suiteBundlePresets` | **none** | 1 |
| `suiteBundleFeatures` | **none** | 1 |

Seven have zero importers. §61 found *phantom components* — a design document
listing seven React files that were never created. These are the mirror image:
**content arrays that do exist, carry the same verified-false claims, and are
connected to nothing.** `landing-page-redesign.md:115` claims `aiAgents` was
"Added" for a redesign that §61 established never shipped.

The most serious single string was not a feature bullet:

```js
{ name: "Auto-Dialer Agent",
  description: "Intelligent dialing that prioritizes accounts based on PTP history…",
  status: "Active",
  metric: "3.2x more connects" }
```

`status: "Active"` and a performance metric for a dialer that does not exist.
The name itself is the claim, so the entry was renamed to *Account Prioritisation
Agent*, marked roadmap, and its metric set to `—`.

**All nine are gated, including the seven that render nothing.** A dead export
carrying a false claim is a loaded gun: invisible to every gate today, and it
ships the moment somebody imports it. Gating costs nothing and makes the copy
honest before that happens.

They are **not deleted**. Whether the owner intends to wire them up is a product
decision, and removing marketing content the owner wrote is the same class of
call as the out-of-repo product lines (§29). The reason is recorded rather than
the decision taken quietly.

### 72.2 The `soc2` rule knew one acronym

Probing the rules against the names a Philippine B2B security page actually
reaches for found the same class §62, §65 and §70 found three times: a rule
whose vocabulary is narrower than its category.

`\bSOC\s*2\b` alone missed **ISO 27001**, **PCI DSS**, **ISO 9001**, **NIST CSF**
and **NIST 800-53**. Widened.

It paid for itself immediately, finding five more live claims:

| Where | Claim |
|---|---|
| `crm-variants-explorer.tsx` ×3 | **"PCI-DSS Level 1 Ready"**, "PCI-DSS Level 1 **compliant** tokenized billing", "PCI-DSS Level 1 Ready · Tokenized Gateways" |
| `public/bitsagent.md` | "Audio Redaction: Automatic real-time redaction of sensitive payment card details (PCI-DSS)" |
| `faqItems` | "browser WebRTC predictive dialer calling, … supervisor HUD call monitoring (listen/whisper/barge)" |

PCI-DSS "Level 1 **compliant**" is a card-industry attestation to a merchant that
has never been assessed, published three times in one file. The audio-redaction
line described redaction of an audio pipeline that does not exist.

### 72.3 Measured, not assumed

| Measure | Before | After |
|---|---|---|
| Gated visible strings | 4,441 | **4,708** |
| Honest denials pinned by `scoping-regression` | 26 | **41** |
| `rule-vocabulary-coverage` | 48/48 | **48/48** |
| Blind spot | 217 | **207** |

**41 pinned denials, up from 26.** Fifteen new honest denials were discovered
*from source* by a suite that was not told about them — the roadmap markers
added in §70 and §72. A widening that finds more honest denials, not fewer, is
finding the class rather than pattern-matching noise. This is now the third
time this measurement has decided whether a rule change was safe.

### 72.4 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 21 surfaces / **4,708** strings |
| `node scripts/claim-coverage.mjs` | **21/21 gated surfaces clean** · blind spot **217 → 207** |
| `node scripts/rule-vocabulary-coverage.mjs` | **48/48** |
| `node scripts/scoping-regression.mjs` | verified — **41** denials pinned (was 26) |
| `node scripts/gated-render-closure.mjs` + negative | PASS · **13/13** |
| `node scripts/docs-claims-drift.mjs` + negative | PASS · **15/15** |
| `npm run test:unit` | **28 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 71 static pages |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

### 72.5 The tenth instance, and what it cost

The pattern "a gate is a statement about a defined scope" has now been found
**ten** times: a list of files (§48), a category of claim (§52), the auditor's
own directory (§54), a missing label (§56), a product catalogue (§57), a rule's
vocabulary (§62, §65, §70, **§72**), the gate's **inputs** (§70), and **dead
code** (§72).

The reason it keeps recurring is that each fix was correct about its own scope
and nobody asked what the new scope was blind to. The closure check (§70.4) and
the vocabulary probes are attempts to make that question mechanical rather than
a matter of remembering to ask — and the vocabulary sweep is the one that keeps
paying, having now found four distinct silent false negatives.

## 73. Measuring an exemption instead of arguing about it

§71 corrected four documents and `claim-coverage.mjs` was left scanning only
`docs/social`, `docs/ads` and `public/`. The rest of `docs/` was excluded on a
stated reason:

> *"Everything else under `docs/` is internal analysis that legitimately NAMES an
> attestation while denying it — SYSTEM_AUDIT.md alone quotes 'SOC 2 Type II'
> hundreds of times in order to explain that it is absent."*

§71 partly disproved that. §52's correction of OPERATIONS-360-CRO-AUDIT §2.3 was
sound, and the same claims then sat live in **five other sections of the same
file**. If the reasoning that exempts a whole directory can be defeated inside
one file, the exemption is a guess.

But the guess might still be right, and §44 says the only way to know is to
**measure, not argue**. So `claim-coverage.mjs` now scans all of `docs/` and
prints the split:

| Class | Count | Verdict |
|---|---|---|
| Inside correction banners (`>`) | **54** | EXPECTED — that is what a banner is for |
| Inside `SYSTEM_AUDIT.md` | **210** | EXPECTED — it quotes each attestation to deny it |
| Other internal docs | **95** | ADJUDICATE per file |

**The exclusion is roughly right and was wrong in a specific way.** 264 of 359
are exactly the class the comment predicted. The remaining 95 are not noise —
they are concentrated in documents whose sentences are **written for a customer**,
which is the `docs/social` / `docs/ads` class wearing a different hat.

### 73.1 The classes that were genuinely hazardous

Documents whose lines are *instructions to publish*, not descriptions of what is
already there. A false sentence in an SEO plan becomes a published false claim
the moment somebody executes the plan.

| Document | Corrected |
|---|---|
| `seo-ai-visibility.md` | "In-Page Evidence & Differentiation" listed *"Sub-350ms predictive pacing engine"* and *"Supervisor HUD: Live call listen, whisper coaching, call barge-in"* as evidence to place on a page. Also the positioning line's *"empirical metrics (sub-350ms predictive dialing, 3.2x right-party connects)"* and *"unifies 8 essential systems: … Telephony/Dialer"* |
| `SEO-STRATEGIC-PLAN-AND-AI-VISIBILITY.md` | Keyword-matrix conversion hooks: *"3.2x higher RPC rate, sub-350ms predictive dialer"* and *"Unifies 8 essential floor systems (CRM, dialer, …)"* |
| `BITS-FULL-MARKETING-AUDIT.md` | Recommended hero copy: *"Recover 38% more debt. Built on a predictive WebRTC auto-dialer with BSP Circular 454/857 contact-hour enforcement."* — all three false. Plus two keyword targets |
| `FULL_SYSTEM_DOCUMENTATION.md` | Listed an **`audit_logs` table** — *"Immutable BSP-compliant logs recording agent access, exports, and call recordings."* There are four tables in this repository and none is an audit log. Replaced with the real four |
| `FULL_SYSTEM_DOCUMENTATION.md` | Specimens 2/3/4 (softphone, field app, speech QA) described unbuilt products as features; `TrustStrip` described as *"Direct verification against … ISO/IEC 27001"* when §56 had already reduced it to principles badges |

### 73.2 The one that was still shipping

Reading `landing-page-growth-review.md` to check whether its page inventory was
stale surfaced a live defect on the **homepage**, in a file that was never gated:

```tsx
// components/sections/floor-showcase.tsx
label: "Predictive Dialer & Softphone",
badge: "Telephony Engine",
headline: "Zero Dead Air. No Desk Phones. Predictive Calling at ~0.4s.",
bullets: ["4 Adaptive Dialing Modes: Manual, Preview, Progressive, and Predictive.",
          "Live Supervisor Oversight: Listen in silently, Whisper coaching…, or Barge in…",
          "Inbound Caller ID Match: … with call recording enabled."],
metrics: [{ label: "Screen-Pop Latency", value: "~0.4s" },
          { label: "Connect Rate Lift", value: "+38%" }],
// and a pulsing green dot reading:
"WebRTC 0.4s Pop · Listen / Whisper / Barge"
```

A predictive dialer, a softphone, supervisor listen/whisper/barge, sub-second
screen-pop, caller-ID matching, call recording and a **+38% connect-rate metric** —
on the highest-traffic page in the product, behind a live-looking telemetry pill.
That pill is §56's exact pattern: an indicator asserting real-time audio state for
a build with no audio.

Five further tabs carried the same class (training echo-line softphone, QA call
audio with "100% Audited Calls", GoIP gateways). All corrected, labelled per the
standing constraint that demo behaviour is labelled and not deleted — and the
metrics that *measured* absent capabilities were **removed rather than
relabelled**, because a specimen claiming "+38% connect rate" is still a number
published to a prospect.

Two things that are claims in their own right were also changed:

- the tab's code discriminant `id: "dialer"` → `"telephony"` (nothing links to
  `#dialer`, verified before renaming);
- `public/images/features/predictive-dialer.webp` → `telephony-console-specimen.webp`
  via `git mv`, so history is preserved and `asset-integrity` still resolves it.

§49 explicitly excluded `hero-product.tsx` from gating because one sentence is a
true statement about the **customer's** problem. `floor-showcase.tsx` is the
other case — every hit was a BITS capability claim — so all were corrected and
the file is now gated.

### 73.3 The gate caught this phase's own drift

Wiring `floor-showcase.tsx` in moved the surface count 21 → 22, which made
`docs/TESTING.md` wrong. `docs-claims-drift.mjs` — added in §71 — failed on the
same run, naming the file, the line, the number the document printed and the
number measured.

**That is the first evidence the drift gate is load-bearing rather than
decorative.** It was written and negative-tested in §71 but had never actually
caught anything in normal use.

### 73.4 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **22 surfaces / 5,044 strings** |
| `node scripts/claim-coverage.mjs` | **22/22 gated surfaces clean** · blind spot **207 → 194** across **27 → 26** files |
| `node scripts/scoping-regression.mjs` | verified — **45** denials pinned (was 41) |
| `node lib/site/asset-integrity.selfcheck.mjs` | PASS after the asset rename |
| `node scripts/docs-claims-drift.mjs` | **caught this phase's own drift**, then PASS |
| `node scripts/gated-render-closure.mjs` + negative | PASS · **13/13** |
| `node scripts/docs-claims-drift-negative.mjs` | **15/15** |
| `node scripts/rule-vocabulary-coverage.mjs` | **48/48** |
| `npm run test:unit` | **28 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 71 static pages |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

### 73.5 What is deliberately left

`OPERATIONS-360-CRO-AUDIT.md` still carries 37 findings, and `TESTING.md` 13.

Both are **accepted with a stated reason**, which is a decision rather than an
omission:

- OPERATIONS-360 is a **product specification** with a document-level banner
  stating that nothing in it may be published as a claim about what BITS ships.
  Striking 37 lines would destroy a strategy document's utility to fix a problem
  the banner already addresses.
- TESTING.md's findings are it **naming the rules** — "15 banned attestations —
  SOC 2, WORM, HIPAA, multi-tenant, …". A document that describes the detector
  is not attesting to anything.

## 74. Triaging the blind spot, and three live-looking indicators

194 findings sat outside gate coverage across 26 files. Every one needed a
decision: fix it, gate it, or record why not. Sorting them by **whether this
repository can adjudicate the claim at all** resolved the whole list without
argument.

### 74.1 The triage

| Class | Files | Disposition |
|---|---|---|
| **Out-of-repo product lines** — blog posts, product boards, demo stores, the ERP/HRMS/Inventory catalogue | `lib/blog-data.ts` (46), `products-suite.tsx` (22), `products/[slug]/page.tsx` (12), `product-showcase.tsx` (9), `products/crm/page.tsx` (6), `demo/page.tsx` (4), `crm-support/store.tsx` (4), `registry.ts` (4), `marketing-specimens.ts` (3), `solutions-data.ts` (2), `crm-sales/mock-data.ts` (1), `crm/store.tsx` (1) | **Owner decision (§8/§29)** — cannot be verified from here, and deleting them asserts software that may ship |
| **In-repo public marketing** | `app/layout.tsx` (3), `app/(marketing)/page.tsx` (5), `hero.tsx` (4), `features-hero.tsx` (4), `stats-strip.tsx` (6), `footer.tsx` (1) | **Fixed and gated** — see below |
| **Mixed** — `lib/site.ts` residual is almost entirely `bitsProducts` (out-of-repo); `hero-product.tsx` (19) is §49's documented exemption | — | **Left, with the reason recorded** |

The distinction is the same one §67 and §72 turned on: *an open question about one
thing does not make everything equally blocked.* The public marketing surface
makes claims about **this platform**, and there is no product-line ambiguity in
any of it.

### 74.2 What was shipping

| File | Was |
|---|---|
| `stats-strip.tsx` | *"Dual-SIP Redundancy"*, *"Primary SIP ● 11ms"*, *"Backup Trunk ● Standby"*, *"Zero Dropped Calls"*, *"Multi-Trunk Carrier Telemetry"*, 99.9% calling-uptime SLA, *"Predictive pacing skips answering machines…"* |
| `app/layout.tsx` | Meta keyword **"predictive dialer CRM"**, `knowsAbout: ["Predictive Dialer Telephony"]`, and the SoftwareApplication description *"Features sub-350ms predictive dialing … supervisor HUD"* |
| `app/(marketing)/page.tsx` | Four metadata strings and a feature card, all promising **sub-350ms predictive dialing** |
| `hero.tsx` | *"Connect predictive dialing, GPS field tracking, QA speech scoring…"*, a **"Predictive Dialer"** quick-link, and *"Zero PBX Hardware · Automated BSP 454/857 Compliance Auditing"* |
| `features-hero.tsx` | *"0.4s Screen-Pop"* pill, *"LIVE SCREEN-POP:"*, *"Dialer Queue"* |
| `footer.tsx` | *"Floor Powerhouse & Dialer"* |

`app/layout.tsx` is the one to weigh most heavily: its strings publish into the
Organization and SoftwareApplication JSON-LD and the site-wide meta keywords, so
**"predictive dialer CRM" was being served to search engines as something BITS
knows about** — the same false-assurance shape as §70, one level up.

All six are corrected and gated. The `3.2x` / `+45%` / `99.9%` figures were
**retained** — numeric claims are the owner's to substantiate (§28) — but each
was re-attached to a capability that exists. The 99.9% *calling uptime* card is
now a **100% session-guard** card, because the number described telephony that
is not built.

### 74.3 Three live-looking indicators

The most systematic finding, and the third time it has appeared (§56's product
mockups, §73's floor-showcase pill):

| Indicator | Asserted |
|---|---|
| Pulsing green dot + `0.4s Screen-Pop` | real-time screen-pop latency |
| `animate-ping` dot + `Multi-Trunk Carrier Telemetry` + `Primary SIP ● 11ms` | a running carrier interconnect |
| Green status dot on a `Dialer Queue` row | a live queue |

**A static panel with a pulse on it is the same lie as one without.** An animation
is not decoration — it is an assertion that something is happening right now, and
a prospect reading a pinging `Primary SIP ● 11ms` concludes a carrier is
connected. All three animations are removed and the panels now describe controls
that exist.

### 74.4 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **28 surfaces / 6,132 strings** (was 22 / 5,044) |
| `node scripts/claim-coverage.mjs` | **28/28 gated surfaces clean** · blind spot **194 → 171** across **26 → 20** files |
| `node scripts/scoping-regression.mjs` | verified — **46** denials pinned (was 45) |
| `node scripts/gated-render-closure.mjs` | PASS — **250** imports examined (was 188) |
| `node scripts/gated-render-closure-negative.mjs` | **13/13** |
| `node scripts/docs-claims-drift.mjs` | caught this phase's own drift again, then PASS |
| `npm run test:unit` | **28 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 71 static pages |

### 74.5 Noted, not yet acted on

`route-count-drift.mjs` reports **3 declared build counts matching neither 45
definitions nor 53 paths**, all in `PROJECT_STATUS.md` (lines 40, 57, 59 — "10
routes", "14 routes"). All three are viewport- and suite-scoped counts, and the
tool's own separation measurement puts **82% of raw matches in a class it cannot
separate**, so this is reported rather than auto-corrected. That is §44's rule
applied honestly: partial separation means report, not guess.
## 75. An exemption granted for one sentence, shielding twenty-six

§49 exempted `components/sections/hero-product.tsx` from gating. The reasoning
was recorded and it was sound: one of its sentences — *"Agents waste 45 minutes
of every hour dialing numbers manually and listening to busy tones"* — is a true
statement about the **customer's** staff, not a BITS capability.

What §49 did not do was count. Re-running the detector on the file in §75:

```
26 finding lines.
 1 was the sentence the exemption was granted for.
25 were BITS capability claims.
```

The telephony tab shipped a **WebRTC softphone with an animated audio
waveform**, "Whisper", "Barge In", "₱0 PBX Hardware · 100% In-Browser WebRTC",
"Triple Live Agent Talk Time", "Predictive Dialer: ~0.4s screen pop, zero desk
phones, 3.2x live talk time", and "QA Scoring: 100% call compliance auditing and
BSP 454/857 infraction detection". The file renders inside `hero.tsx` — the
homepage hero.

**A per-file exemption granted for a per-sentence reason is the same class as
§70.** Both are a check scoped to less than the thing it is asked about: §70's
gated surface read a file instead of the copy it rendered; this one excluded a
file because of one sentence in it. The difference is only that §70's error was
recent enough to catch.

### 75.1 Letting the file be gated

The exemption existed because gating the file would fail on a true sentence. Two
options:

1. Fix 25 claims, leave the file ungated, and repeat §49's reasoning. Correct,
   and it leaves 26 lines unchecked for the seventh time.
2. Make the sentence distinguishable so the file can be gated.

§49 rejected option 2 as "the same semantic problem §44 measured and found
unsolvable". That remains true of *inferring* intent. It is not true of the copy
**declaring** intent — which is what `target:` and `scoped per contract` already
do.

So `floor pain point:` was added to `SCOPED_OUT`, and the two genuine sentences
carry it **inline**. The copy already labelled itself *"The Floor Pain Point:"*
in a sibling `<span>`, which a sentence-scoped detector cannot see — the same
structural blindness that sank the specimen labels in §70 and §73.

`the-difference.tsx` needed the identical treatment: its left column describes
what **other** products do, which §49 also recorded as a deliberate non-defect.
Those strings now carry an inline `Competitor tools:` prefix.

### 75.2 Measuring the new markers instead of trusting them

A self-declaring exemption is a new way to switch a rule off, and therefore a new
way to hide a claim. `rule-vocabulary-coverage.mjs` grew four **scope probes**:

| Probe | Result |
|---|---|
| marker exempts the sentence it is in | ok |
| marker does **not** exempt the next sentence | ok |
| marker does not blanket-exempt other rules in the same string | ok |
| the real pain-point sentence stays exempt | ok |

The second is the one that matters — it is the §44 sentence-scoping limit, and it
is what makes the marker safe to use at all.

**The residual risk is real and is not engineered away**: a writer who puts
`Floor pain point:` in front of a BITS capability claim gets it exempted. That
risk already existed for `target:`. Removing it would need a semantic parser, the
thing §44 measured and found unsolvable. It is recorded here rather than
papered over.

### 75.3 A gate I had broken without knowing

`gated-render-closure.mjs` was refactored in §70.4 to export `runClosure` behind
a hand-rolled CLI guard:

```js
import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}`
```

**That never matches on Windows.** `import.meta.url` is `file:///C:/…` (three
slashes); the hand-built string is `file://C:/…` (two). Since the refactor the
script imported cleanly, exported its functions, and printed **nothing**. It had
been a silent no-op for the whole of §71–§74, and `test:unit` did not catch it
because the next gate in the chain is this script's own negative test, whose
output is what I read.

Fixed with `pathToFileURL`, which is correct on every platform.

**It then immediately found a defect it had been silently missing:**
`app/(marketing)/products/crm/page.tsx` renders `bitsProducts`, which claimed
**"Statutory Contact Hours Enforced"**, "Granular RBAC Permissions", "PCI-DSS
Level 1 Ready" and "Tamper-Evident Ledger Logs" — all four verified absent. It
also exposed this page's own false claims: a WebRTC SIP softphone, an auto-dialer,
a supervisor barge-in HUD, and an FAQ answering *"aligned with BSP Circulars
454/857?"* with **"Yes"**.

### 75.4 One gate added and then deliberately withdrawn

`products/crm/page.tsx` was gated in this phase and then **ungated**. It renders
`bitsProducts` — the 18-product catalogue including ERP, HRMS, Payroll, Inventory
and Logistics — so gating the page means gating copy that lives outside this
repository. The closure check proved it: after the page's own false claims were
fixed it still failed on *"Turnkey enterprise financial accounting and ERP
suite … Immutable …"*.

That is §50's collision exactly. The **copy fixes stay fixed**; the gate entry is
what is deferred, because the alternative is deciding §8 for the owner. The file
returns to the reported blind spot, where it is visible rather than silently
excluded — the distinction §70 turned on.

### 75.5 Verification

| Check | Result |
|---|---|
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — **30 surfaces / 6,865 strings** |
| `node scripts/gated-render-closure.mjs` | PASS — **300** imports examined (was 250), vacuous-pass warning fires correctly |
| `node scripts/gated-render-closure-negative.mjs` | **13/13** |
| `node scripts/claim-coverage.mjs` | **30/30 gated surfaces clean** · blind spot **171 → 137** across **20 → 17** files |
| `node scripts/rule-vocabulary-coverage.mjs` | **48/48** probes · **4/4** scope probes |
| `node scripts/scoping-regression.mjs` | verified — **56** denials pinned (was 46) |
| `node scripts/docs-claims-drift.mjs` | caught this phase's own drift, then PASS |
| `npm run test:unit` | **28 suites PASS** |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS — 71 static pages |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |

### 75.6 The two lessons, which are the same lesson

**A gate is a statement about a defined scope** — now found **eleven** times.

And the corollary that keeps costing: **fixing a check that is quietly not running
is worth more than adding a new one.** A gate that prints nothing, exits 0, and
is listed in `test:unit` looks identical, from the outside, to a gate that
passes. Only a probe that asks "did this actually execute?" distinguishes them —
which is why the closure script prints full import accounting and warns when its
scan path did not run, and why `docs-claims-drift` caught three separate drifts
in three separate phases.
## 76. A gate is a statement about a defined scope — including its own entry point

§75 closed with a finding about a check that had been silently broken for four
phases. That finding generalises further than the one script, so §76 asked the
question directly: **are any OTHER gates quietly doing nothing?**

### 76.1 The measurement

`scripts/gate-execution-audit.mjs` runs every gate in `test:unit` exactly as
`test:unit` runs it — same flags, same order, same working directory — and
records exit code, wall time and stdout size.

| Result | |
|---|---|
| Gates audited | **28** (30 once the audit itself is wired in) |
| Exited non-zero | **0** |
| **Produced no stdout** | **0** |
| Ran in under 10ms | **0** |

**No other gate was a silent no-op.** That is a good result and it is a *measured*
one — until now "the other gates are fine" was an assumption resting on the fact
that they print things, which nobody had checked as a property.

### 76.2 What it asserts, and what it does not

Every gate must exit 0 **and** produce output on stdout.

The second half is a convention, not a proof of correctness. A gate could print
a confident lie — and several in this repository have printed confident wrong
numbers before `docs-claims-drift` caught them. What "must print" rules out is
the specific and far more dangerous failure where **the entry point never
executes at all**: no error, no non-zero exit, nothing in the suite to notice.
§75 proved that failure is real here, not hypothetical.

It also prints each gate's duration, so a gate that still prints but suddenly
takes 2ms — having stopped doing the work — is visible rather than invisible.

### 76.3 A vacuous assertion, caught before commit

This audit runs the gates, so it must not run itself. The first version of the
guard asserted *"something was filtered out of the chain"* — which is wrong,
because running the audit by hand before wiring it into `test:unit` is the normal
first step and filters nothing. It exited 2 on a perfectly healthy repository.

The corrected guard asserts what actually matters: **this script is not among the
segments I am about to execute.** A self-inclusion bug here would be the same
class of bug the script exists to catch.

A second slip, caught before commit: the negative test's "package.json still
parses" assertion was written as an IIFE with `return true` in the `try` and
`return false` in the `catch` — an assertion that could never fail. Replaced with
a real parse-and-verify. **This repository has now found four separate vacuous
assertions in its own tooling** (§59's `walk()` filter, §70's first closure run,
§73's `|| true` scope probe, and this one). The pattern is consistent enough to
name: *a check written to satisfy a requirement reads as satisfying it.*

### 76.4 Wiring it in produced the loudest failure in the audit's history

Excluding the audit from its own run list was **not enough**. The audit runs every
gate, and one of those gates is `gate-execution-audit-negative.mjs` — which
spawns the audit. So:

```
audit → gate-execution-audit-negative.mjs → audit → … → unbounded
```

The first `npm run test:unit` after wiring both gates in did not finish. It
reached **87 node processes** and **765 MB** before it was stopped.

The lesson is about **transitive reachability, not about self-reference**:

> Excluding the thing that can reach you is not the same as excluding the things
> that can *reach the thing that can reach you*.

Both names now live in one declared `SELF_REACHABLE` list, and the audit refuses
to run if either survives the filter. The negative test asserts the property
**directly** rather than trusting the filter: the audit's output must contain
exactly **one** copy of its header. A second copy means it re-entered itself.

This is the inverse of §75's bug and worth stating together. §75 was a gate that
exited 0 having done nothing. This was a gate that could not exit at all. **Both
came from the same missing thought — what does this thing actually invoke?**

### 76.5 Proof the audit can fail

`scripts/gate-execution-audit-negative.mjs` reproduces the §75 bug exactly. It
writes a gate that imports cleanly, exports nothing that runs, exits 0 and prints
nothing; injects it into `test:unit`; and asserts the audit **fails**, names it,
and says `NO stdout`.

| Assertion | Result |
|---|---|
| real chain passes the audit | PASS |
| silent probe landed on disk | PASS |
| **audit FAILS when a gate prints nothing** | PASS |
| …and it names the silent gate | PASS |
| …and it says NO stdout | PASS |
| probe file removed | PASS |
| `package.json` restored byte-for-byte | PASS |
| `package.json` still parses | PASS |

**8/8.** Cleanup is asserted by byte comparison rather than a third full audit
run — the first run already established the real chain passes, and re-running
everything to prove the same thing costs ~12s and learns nothing. Total cost of
both new gates: **~28s**.

### 76.6 The generalisation

Three separate failures in this audit have had the same shape, and they are the
most expensive class of defect in the repository:

| Phase | Failure | How it looked from outside |
|---|---|---|
| §59 | `walk()` filtered on `.tsx\|.ts` so `.md` never matched | printed "clean — 0 files" |
| §70 | closure check's scan path never executed | printed a green tick |
| §75 | closure CLI guard never matched on Windows | printed nothing, exited 0 |

All three produce output that a reader would reasonably interpret as a result.
**The most dangerous defect in a verification system is not one that fails; it is
one that reports success while having done nothing.** Every gate in this
repository is now required to demonstrate that it executed, and the demonstration
is itself negative-tested.

---

## 77. Four surfaces behind their own gates, and the gate that was blind to its own arithmetic

§74 triaged 194 blind-spot findings into those this repository can adjudicate and
those it cannot, and fixed and gated the first class. Four in-repo surfaces from
that triage are closed here. In the course of re-running the drift gate after
them, the drift gate was found to have been silently ignoring a class of stale
number it had been built to catch — twice.

### 77.1 `app/(crm)/app/leads/page.tsx` — a toast that lies about a call it never makes

A phone-icon button on each lead row fired:

```
showToast(`Dialing ${r.name} via WebRTC softphone.`);
```

The handler calls `updateLeadStatus(r.id, "working")` and does nothing else.
There is no telephony anywhere in this build — **zero** `RTCPeerConnection`,
`getUserMedia` or SDP handling across 161 source files.

This one is worse than the marketing claims closed in §74–§76, for two reasons.
It is **behind the login**, so it is the product reporting false state about
itself to a paying customer rather than a landing page selling it. And it is the
most convincing shape a lie takes in a UI: a toast that fires the instant a
button bearing a telephone glyph is pressed, so the user's own action appears to
confirm it.

The toast now says what happened. `aria-label` and `title` moved from `Call {name}`
to `Set {name} to working` — the accessible name was the claim too, and a screen
reader user was told the product had placed a call.

The notes placeholder also carried a capability claim, which is a form of the
same lie: a placeholder is not visible copy, it is what a customer is prompted to
type, and it was asking for *"WebRTC softphone integration, BSP 454 compliance"*
from someone describing requirements for software that has neither.

### 77.2 `app/(marketing)/cookies/page.tsx` — "tenant isolation"

The mandatory-cookie rationale listed *"CSRF protection, **tenant isolation**, and
authenticated CRM session tokens."* There is no tenancy in this deployment
(§40: four tables, all `using (true)`, no org column, no tenant key).

The §44 lesson is that a correction applied to one place is not a correction
applied to the fact, so this was checked rather than assumed fixed: the page had
been corrected once already and the correction had left this sentence untouched,
in the same section, four lines below where it had been fixed. The sentence now
states plainly that the deployment is single-tenant and that this is exactly why
the category has nothing to isolate.

A second denial on the same page was restructured rather than reworded. The
analytics-category denial had been split across a line break mid-sentence, which
puts the operative words in a different sentence from the claim they deny — and
detection here is **sentence-scoped**, so the fix only holds while the wording
does.

### 77.3 `app/(marketing)/bitsagent/page.tsx` — an FAQPage answer of "Yes"

```json
"name": "Can BITSagent deploy on-premises with local PBX and SIP telephony?",
"acceptedAnswer": { "text": "Yes, BITSagent supports sovereign on-premises
  deployment, connecting directly via SIP trunking to Asterisk, FreePBX, or
  legacy enterprise telephony systems without external audio egress." }
```

This is the single worst-placed string fixed in this audit. It is not prose a
reader can contextualise — it is a **structured answer to a question about
telemetry**, the format an answer engine is built to lift verbatim. A language
model reading this page receives `Yes` as machine-readable fact, with no
surrounding sentence available to make it sceptical.

The answer is now `No`, and says what is actually true instead of only removing
what is not: no SIP trunking, no Asterisk or FreePBX integration, no browser
audio; the deployment option is the application itself, managed cloud or a
self-hosted Supabase instance.

The same page carried `operatingSystem: "WebRTC, Managed Cloud, Sovereign
On-Premises"` and a `keywords` entry reading `"WebRTC voice AI agent"`. The
former is a software-application schema field, so it is asserted to search engines
as fact about what the software runs on; the latter is a direct invitation to rank
the page for a capability that does not exist.

### 77.4 `app/(marketing)/blog/page.tsx` — a headline metric for a dialer that does not exist

The blog index published four headline figures. `<350ms · Dialer Latency` is not
merely unproven — once the label is corrected the figure is incoherent, because
there is no dialer whose latency could be measured. It was replaced with `0 ·
Anon CRM Reads`, which is both true and independently verifiable: the live
`anon-access-probe` returns 401 on every CRM API route and every CRM page (§40).

The other three were the same claim at smaller sizes: a `Sub-350ms predictive
dialer · Sovereign air-gapped on-premise` product subtitle, architects analysing
*"telco trunk layouts"*, and a keyword list naming dialer latency. **A number
that measures an absent capability is removed, not relabelled** — there is no
honest reading of `<350ms` that is not a dialer claim.

### 77.5 Why one of these four was then *ungated*

`app/(marketing)/blog/page.tsx` was added to `SECURITY_SURFACES`, then removed
again — the same call made in §75 for `products/crm/page.tsx`.

The file imports `blogPosts` from `lib/blog-data.ts`: **967 lines, 42 residual
findings**, of which two classes are interleaved line by line and are not
separable by any rule that could be written here. One class is BITS describing
itself (false, and fixable). The other is true description of competitors and of
the industry — *"predictive dialer for collections"*, *"an authoritative
architectural audit of leading platforms for debt collection agencies"* — which
is what a blog about this market contains, and which no honest repository should
be asked to redact.

Gating the file would therefore have required either deleting true statements
about other people's software, or a scoping exemption wide enough to exempt the
false ones too. Since the file's own copy is now corrected, the import is left as
a declared report-only blind spot and `blog-data.ts` is queued for adjudication
in its own right (§78).

> **CORRECTED in §78.1 — the paragraph above was wrong.** The classes *are*
> separable: every `reviews[]` row declares `isBits: true | false`, and that flag
> is the discriminator. §78 built a subject-scoped gate on it. The reasoning
> about not redacting true third-party statements stands; the conclusion that no
> rule was available did not, and was never tested before being written down.

**An open question about one import does not make everything in that file
equally blocked.** The mirror image of §61's phantom components — exports with
zero importers — is a file with one unadjudicable import and correct copy
underneath it.

### 77.6 Measured effect

| | Before §77 | After |
|---|---|---|
| Gated surfaces | 34 | **33** |
| Visible strings under gate | 7,510 | **7,338** |
| Residual unverifiable findings | 137 across 17 files | **108 across 12 files** |
| `npm run test:unit` | 30 gates | 30 gates, exit 0 |
| `tsc --noEmit` | PASS | PASS |

The surface count fell by one and the string count by 172 while findings fell by
29: the ungate moved 172 strings and 18 findings out of gate coverage, and the
four corrections removed 11 more findings from files that remain gated. **A count
that looks impressive is a reason to check the diff, not a reason to trust it** —
so the three numbers were reconciled against each other rather than reported as
a single improvement.

### 77.7 The drift gate could not read a number with a comma in it

Correcting `docs/TESTING.md` for the ungate produced this failure:

```
✖ docs/TESTING.md:52  [security surfaces] says 30, measured 33
```

The line reads *"Plus **30 security surfaces / 6,865 visible strings / 15 banned
attestations**"*. Two numbers were stale and **one was caught**.

`6,865` was matched by the `visible strings` rule and then **thrown away by the
number parser**:

```js
const said = /^\d+$/.test(raw ?? "") ? Number(raw) : NUMBER_WORDS[raw?.toLowerCase()];
if (said == null) continue;          // ← matched, then silently skipped
```

`"6,865"` is not `^\d+$`, so `said` was `undefined`, so the loop continued. The
two halves of the same rule disagreed about what a number looks like: the
pattern had been written `(\d[\d,]*)` to accept a thousands separator, the parser
below it had not been told.

This is the §76 failure with a different disguise. The gate was not silent — it
printed, it just printed about the *other* number on the line, so the failure
looked complete. **A matched-but-unreadable value must be reported, not
skipped: "I could not read this claim" and "this claim is correct" cannot
produce the same output.** Unparseable matches now fail as `UNREADABLE`.

What made this findable at all was the asymmetry — one rule caught a number on a
line and the other did not. A single stale number per line would have been
invisible indefinitely.

### 77.8 The same defect, second instance — and the worse variant

Having fixed the parser, the negative test mutated `docs/TESTING.md` to say
`1,234 security surfaces` and asserted the real script failed. It failed — and
reported:

```
✖ docs/TESTING.md:52  [security surfaces] says 234, measured 33
```

Only the `visible strings` pattern accepted separators. The `security surfaces`,
`banned attestations`, `unit selfchecks` and `engines` rules all used `(\d+)`, so
`\b(\d+)` matched **inside** `1,234` and the gate reported a confidently wrong
number. Every numeric rule now accepts `(\d[\d,]*)` and the parser normalises
before comparison.

That is strictly worse than an unreadable number, and worth stating separately:

> A gate that **cannot parse** the value it is checking is a missed claim. A gate
> that **misreads** it produces output with the authority of a measurement and
> none of the accuracy — and the reader has no way to tell which they are
> looking at.

All six numeric captures now share one convention. Nothing about "which rules
accept commas" is left for a future edit to get wrong independently.

### 77.9 The negative test that could not have caught this

`docs-claims-drift-negative.mjs` re-implements the detector's matching to unit
test it. Fixing the shipped parser therefore could not have been validated by
that file: the reimplementation has its own parser, and it would have been
corrected in step with the bug and stayed green — **the test agreeing with the
code it is testing is not evidence, it is a second copy.**

So the regression is proved against the **shipped script** end-to-end: mutate the
real `docs/TESTING.md` in place, run `node scripts/docs-claims-drift.mjs`, assert
it fails, assert it reports `1234` and not `34`, assert it names the file, then
restore byte-for-byte and compare. The mutation is placed on the **same line** as
a sibling rule that still passes, so the assertion cannot be satisfied by the
file being broken in some other way.

The suite grew **15 → 21** assertions and covers: the comma mutation, the
separator-stripped figure, file naming, byte-for-byte restore, and a check that
the failure branch still names itself `UNREADABLE` so a silent skip cannot be
reintroduced quietly.

A stale `NUMBER_WORDS` constant in the reimplementation (`twentytwo: 21`) was
corrected in passing — unused by any assertion, and exactly the kind of thing
that becomes load-bearing the first time someone adds one.

### 77.10 §2 of this report was asserting currency it had lost

While correcting `docs/TESTING.md` it became clear that **§2 of this very file**
states *"Commands executed against the working tree after remediation. Counts are
copied from actual runs"* — which reads as a live status table and is several
phases stale: it claims 21 unit selfchecks (now 30) and 10 security surfaces /
1,938 strings / 13 attestations (now 33 / 7,338 / 15).

`docs/SYSTEM_AUDIT.md` is the one declared exemption from the drift gate (§71),
because a chronological record in which "up from 3,974" is the entire point would
fire on nearly every line. The exemption is correct for the narrative and wrong
for a summary table that a reader will consult for the current state.

The fix is a dated banner on §2 rather than a rewrite of ~25 rows, several of
which correctly record what was true when a finding was closed (the §40 live RLS
row still reads `10/26/4/3 rows`; the §41 row still names the advisories fixed
then). The banner states the table is a point-in-time snapshot, names the counts
that have moved, and points at the gate that enforces currency everywhere else.

**An exemption granted to a file is not a licence for any claim inside it to go
unchecked.** It moves the burden of checking from the gate to the next reader —
which is only defensible if the file says so where the reader will actually look.

### 77.11 Standing

Owner decisions unchanged by this phase: the `demo@boundlessitsolutions.com`
credential remains **live and blocking** (§32/§40); merge and deploy remain the
owner's; the 10 fabricated `inbound_leads` rows remain unconsented-for-deletion;
out-of-repo product lines remain unadjudicated and are report-only; publication
docs remain report-only. Nothing in §77 changes any of those.

Verification for this phase, all run against the working tree:

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 30 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 7,338 strings / 15 attestations, exit 0 |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 markdown files, 0 stale |
| `node scripts/docs-claims-drift-negative.mjs` | **PASS** — 21/21 |

Next: §78 adjudicates `lib/blog-data.ts` on its own terms, where the two classes
are interleaved and cannot be separated by rule.

---

## 78. The vendor comparison catalogue — measuring the split instead of asserting it

§77 left `lib/blog-data.ts` as a declared blind spot on the grounds that its two
classes "cannot be separated by any rule that could be written here". That claim
was made without looking at the data's structure, and it was **wrong**. This
section records the correction, the measurement, the fixes, and two defects found
in the gate built to enforce them.

### 78.1 CORRECTION to §77 — the classes ARE separable

§77.5 stated:

> "967 lines interleaving two classes that a regex cannot separate … Gating the
> file would therefore have required either deleting true statements about other
> people's software, or a scoping exemption wide enough to exempt the false ones
> too."

Both halves were assumptions. The file already carries the discriminator, as
data: **every `reviews[]` row declares `isBits: true | false`** (9 true, 9 false
across three comparison posts). A row marked `isBits: false` is describing
Salesforce, FICO, Genesys, Katabat, TCN, HubSpot, Bland AI — and its content is
true (or at least not a BITS claim). A row marked `isBits: true`, or prose that
names a BITS entity, is BITS describing itself.

The correction matters beyond this file. I had already generalised from it: §77.5
closes with "An open question about one import does not make everything in that
file equally blocked", which is right, and then rests it on a claim about
separability that I had not tested. **A rule stated in an audit record is still a
claim, and gets the same treatment as any other.**

### 78.2 Two attribution rules, one measured wrong

The first rule tried was positional — "nearest preceding `isBits` record". It
assigns 20 of 46 findings to the BITS row and looked excellent.

It is wrong. `reviews[]` rows all carry `isBits`, but `comparisonRows[]` marks
**only** the BITS row — competitor rows have no flag at all. So proximity
silently attributes Genesys, Katabat and TCN cells to the row above them:

| Finding | Line | Correct subject | Positional rule said |
|---|---|---|---|
| `Multi-tenant Public Cloud (AWS)` | 144 | Genesys Cloud CX | Operations 360 (OMS) |
| `SOC2, ISO27001 (US Data Centers)` | 146 | Genesys Cloud CX | Operations 360 (OMS) |
| `Basic Web Dialer` | 431 | HubSpot Enterprise | BITScrm Enterprise Suite |

A gate built on that rule would have flagged **SOC 2 and ISO 27001 claims about
Genesys** as claims about BITS — false failures on correct copy, which is §44's
outcome exactly and the fastest way to get a gate switched off.

The rule that works resolves **brace nesting**: walk backwards from a string to
the `{` that opens its object, then read that object's fields at depth 1 only.
Measured, that resolves every row correctly.

The hand-written checker used during adjudication initially guessed wrong in the
same way and was corrected by inspection — the claim is that the *mechanical*
rule is right, and it was verified against every row, not assumed from the first
three.

### 78.3 A third attribution bug: `indexOf` on duplicate strings

Even after brace-awareness, one finding was attributed to the wrong vendor. The
cause was locating a string in the source: `src.indexOf(value)` always returns
the **first** occurrence, and this file contains duplicate strings — the same
`cons` entry appears under more than one vendor — so a competitor's cell
resolved to the copy above it.

`visibleStrings` now returns an `index` with every entry (its offset in the
comment-stripped text), and callers that need position use it. This is additive
and cannot change any existing caller's result. It was worth fixing centrally
rather than in one script: `indexOf` on an extracted value is a latent defect
for **every** caller that will ever want to know where a string lives.

### 78.4 What was measured, and what the detector can and cannot do

46 findings, hand-labelled by reading every sentence. The predictor is
`isBits === true  OR  the sentence names a BITS entity`:

```
precision 1.000    recall 0.706
12 true positive · 0 false positive · 5 false negative · 29 true negative
```

Zero false alarms; **five silent misses**. All five are sentences that neither
sit in an `isBits` row nor name a BITS entity:

| Line | Missed claim | Where it lives |
|---|---|---|
| 93 | `predictive dialer for collections` | a `keywords[]` entry |
| 101 | `…architectures featuring sub-350ms predictive dialing` | `heroSnippet` |
| 185 | `…and real-time supervisor whisper/barge-in monitoring` | `keyEvaluationCriteria[].desc` |
| 875 | `Integrated Telephony & Predictive Dialing` | a `comparisonRows[].name` |
| 878 | `Instant debtor or customer dossier screen-pop` | a `comparisonRows[]` cell |

Every one was a false claim, and every one is fixed below.

**This gate would not have caught them.** That is the honest headline of this
section, and it is why the numbers are printed by the gate itself on every run
rather than recorded only here. A gate whose coverage is unknown is worse than
no gate: a reader who knows it catches ~70% of the class will look elsewhere for
the rest; one who does not know will assume it catches all of it. §44's rule —
when separation is partial, **measure and report it, do not guess** — is applied
to the gate rather than only to the copy.

The five misses share a shape worth naming: they are strings that describe a
**capability or a market position** rather than a product. `keywords`,
`heroSnippet`, evaluation criteria and column captions are all places where a
claim can be made with no subject attached at all.

### 78.5 Two defects the new gate had, caught by its own negative test

Both were found by injecting a fixture and watching the gate pass, which is the
entire reason §70 insisted on injection rather than reusing a fixed file.

**Defect 1 — the entity list was silently wrong.** The gate derives BITS entity
names from the `isBits` rows and reduces each to its prefix before any
parenthetical or ampersand, so `"Operations 360 (OMS) & Telephony Suite"` becomes
`Operations 360` and matches the bare form used in prose. That reduction was
written `n.split(/\\s*[(&]/)` — a **regex literal**, where `\\` is an escaped
backslash, not whitespace. The split never fired. The names kept their
parentheses, the escape step then escaped them, and the compiled pattern became:

```
\b(?:Operations 360 \(OMS\)|Operations 360 \(OMS\) & Telephony Suite|…)\b
```

— which requires the literal text `(OMS)` to appear in prose. It never does. The
entity check matched **nothing**, and the gate passed a BITS claim injected into
post-body prose while printing a confident tick.

`\\b` in a **template literal** is correct — it produces the two characters `\b`
for the `RegExp` constructor. `\\s` in a **regex literal** is a literal backslash.
The two spellings of "a backslash" mean different things three lines apart in the
same file, and the wrong one was in the position that decides the gate's scope.

**Defect 2 — a false positive from the injected fixture.** The first run of the
precision test flagged a *Salesforce* string as a BITS claim. The gate was right
and the test was wrong: the fixture had been injected into the BITS row, so the
row check correctly identified it as a BITS-subject claim. A test that only
asserts failures would have shipped a gate that fires on competitors.

Both are the same lesson as §75 and §76 wearing different clothes: **the defect
was not in what the gate checked but in whether it checked anything**, and only
an execution test distinguishes the two.

### 78.6 What was corrected

Fifteen BITS-subject claims, all capability assertions about software that has
none of the named capability. There is **zero** telephony in this build — no
`RTCPeerConnection`, no `getUserMedia`, no SDP, no audio pipeline.

| Was | Now |
|---|---|
| keyword `predictive dialer for collections` | `collections crm promise to pay automation` |
| `…architectures featuring sub-350ms predictive dialing` | states that no dialing performance is assessed |
| `secures our #1 ranking due to its sub-350ms predictive pacing engine … built-in supervisory HUD (whisper/barge-in)` | deployment options and no per-seat licence tax |
| `real-time supervisor whisper/barge-in monitoring` | removed |
| `Delivers 3.2x higher RPC via sub-350ms predictive pacing engine` | removed |
| `100% sovereign deployment … fully aligned with BSP 857, BSP 808, NPC RA 10173` | runs inside your own data centre |
| `Built-in supervisor HUD: live listen, whisper coaching, live call barge-in, and automated audio QA` | removed |
| `Native telephony, automated dialer hooks` | `Native CRM records, workflow automation` |
| FAQ answer: `…integrates an ultra-low-latency sub-350ms predictive dialer … supervisor live whisper/barge-in … 100% sovereign data residency compliant with BSP Circular 857 and RA 10173` | FAQ answer: `No telephony … no certification is claimed here` |
| `your entire CRM, dialer, local PBX … uninterrupted` | `your CRM, LMS and accounting systems` |
| `Integrated Telephony & Predictive Dialing` (row name) | `Telephony & Predictive Dialing`, marked not included |
| `Instant debtor or customer dossier screen-pop` | `Not included in this build` |
| `work inside Operations 360 for speed, dialer power, and compliance` | `…for record handling, coaching logs, and compliance workflow` |
| `8 essential floor systems … CRM, **Dialer**, QA …` / `Sub-350ms predictive dialing and instant screen-pop` | `7 … CRM, QA …` / `Promise-to-Pay scheduling and DPD staging` |
| `integrated command HUD with sub-350ms telephony … full BSP 857 / NPC RA 10173 data sovereignty` | `no telephony … BSP 857 and RA 10173 obligations remain yours` |

The certification claims were not deleted but **inverted**: each now says the
obligation remains the customer's as data controller. That is the true state,
and it is more useful to a reader than silence — a compliance obligation is not
something a vendor can discharge on the customer's behalf.

Three FAQ answers were also corrected to remove "predictive telephony" from the
list of unified workflows, and one comparison row's `pricing` changed from
"Included in Platform" to "Not included in this build" so the row is internally
consistent after its capability was withdrawn.

The ranking scores (`9.9 / 10`, `Editor's Choice · #1`) are **left alone** — they
are the owner's standing decision on numeric marketing claims (§28, §74), not an
in-repo capability claim.

### 78.7 What was deliberately NOT corrected

Thirty findings remain, and every one is third-party or industry description:
`Lacks native sub-second predictive dialer` (Salesforce), `Multi-Tenant US /
Hyperforce Cloud`, `AWS Public Multi-tenant Cloud` (Genesys), `Predictive
telephony … lag behind dedicated floor dialers` (Katabat), `Cloud WebRTC / Twilio
only` (Bland AI), plus column captions such as `Dialing Capacity` and
`Supervisor Barge-in`.

These are the content of a vendor comparison. Redacting them would make the
publication dishonest in the other direction — describing competitors accurately
is what comparison content is *for*, and this repository cannot adjudicate what
Salesforce or Genesys ship.

Two of them are flagged for the owner rather than changed:

1. **Comparative claims about named commercial vendors are made without
   substantiation here** — *"a 150-agent collections agency on Salesforce pays
   $22,500–$45,000 USD every month in seat licenses"*, *"over ₱35,000,000 PHP
   over 3 years in licensing alone"*, *"Genesys $75–$155+ per user per month"*.
   These are derived from public list pricing and are arithmetically consistent,
   but comparative advertising about identifiable competitors carries a
   substantiation burden that is a legal question, not an engineering one.
2. **`reduces database transaction latencies from 65ms down to 0.4ms`** is an
   unsourced technical figure about on-premise architecture. It is not a BITS
   capability claim, so it is outside this gate's subject, and it is not
   something this repository can verify either.

### 78.8 The gate

`scripts/blog-claims-subject.mjs`, with
`scripts/blog-claims-subject-negative.mjs` (14 assertions). Suite **30 → 32**
gates.

It derives the BITS entity list from the file's own `isBits` rows — so renaming a
product cannot silently drop it out of scope — and reuses `findClaims`, so the 15
banned attestations cannot drift between this gate and the main one. It prints
the measured precision/recall on every run.

The negative test asserts both directions, because the second is the one that
gets skipped:

| Assertion | Result |
|---|---|
| real repository passes | PASS |
| injection landed in an `isBits: true` row | PASS |
| injection landed in post-body prose | PASS |
| injected BITS claim (row) **FAILS** the gate | PASS |
| …names `lib/blog-data.ts` | PASS |
| …names the banned rule | PASS |
| injected BITS claim (prose) **FAILS** the gate | PASS |
| …names `lib/blog-data.ts` | PASS |
| …names the banned rule | PASS |
| third-party injection landed in an `isBits: false` row | PASS |
| **a third-party claim does NOT fail the gate** | PASS |
| …and is still counted, not dropped | PASS |
| `lib/blog-data.ts` restored byte-for-byte | PASS |
| gate passes again after restore | PASS |

**14/14.**

### 78.9 Two gates now disagree about this file, deliberately

`SECURITY_SURFACES` does **not** include `lib/blog-data.ts` or
`app/(marketing)/blog/page.tsx`. They are covered by a subject-scoped gate
instead. That is the first time a surface is governed by a rule other than
membership of the list, and it is worth being explicit about why:

- a **file-level** gate would require deleting true statements about competitors;
- a **subject-level** gate admits every BITS claim and ignores every competitor
  claim, which is precisely the truthfulness property being enforced;
- the residual cost is declared: recall 0.706, printed on every run.

`docs-claims-drift` picked up the gate-count change **during this phase**,
without being asked — `docs/TESTING.md:24 [unit selfchecks] says 30, measured 32`
— and its new `UNREADABLE` branch (§77.8) then fired correctly on
`All **thirty-two** are dependency-free` because the number-word table stopped at
*thirty*. The table was extended rather than the report suppressed, which is the
intended behaviour of that branch.

### 78.10 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 32 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/blog-claims-subject.mjs` | **PASS** — 30 findings, 0 BITS-subject |
| `node scripts/blog-claims-subject-negative.mjs` | **PASS** — 14/14 |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 7,338 strings / 15 attestations |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 markdown files, 0 stale |

`blog-data.ts` findings **46 → 30**; BITS-subject findings **17 → 0**. Owner
decisions unchanged: the live demo credential, merge/deploy, the fabricated rows,
out-of-repo product lines, and the numeric marketing claims all remain open and
untouched by this phase.

---

## 79. Two public links to a section that does not exist, and a gate that was scanning files it could not judge

Phase 79 started as routine adjudication of the residual blind-spot files and
found a live navigation defect instead. The defect is the substance; the copy
corrections that followed it are the smaller half.

### 79.1 `ProductsSuite` has no importer anywhere in the repository

Working through `components/sections/products-suite.tsx` (22 findings, the
largest residual file) required establishing whether it renders at all.

```
$ grep -rn "ProductsSuite" app components lib
components/sections/products-suite.tsx:328:export function ProductsSuite() {
components/sections/products-suite.tsx:969:  <ProductMockupBoard productId={activeProduct.id} />
components/sections/products-suite.tsx:981:export function ProductMockupBoard(...)
```

`ProductsSuite` — the 223 KB homepage section — is referenced **only by its own
definition**. It has never been on the homepage in the current tree. Its sibling
`ProductMockupBoard` *is* live, imported by `app/(marketing)/products/[slug]/page.tsx`.

I nearly reported the opposite. A first search pattern (`products-suite`) matched
only lines inside the file itself and I read that as "no consumers"; the component
name and the filename differ, and the grep that settles it is on the exported
symbol. **A negative search result is only evidence when the search term is the
thing being asked about.**

This matches `docs/WEBSITE-STRUCTURE-PLAN.md` R4, which recommended deleting the
section from the homepage as duplicated by `/products` — so the section's absence
is intended, and its 4,398 lines are dead weight that is also the largest single
source of unattributable claims in the repository.

### 79.2 The consequence: two live links to a dead anchor

`id="products-suite"` exists in exactly one place in the codebase — line 446,
inside the unrendered component. Two links on `/products/crm` point at it:

```tsx
// breadcrumb, line 330
<Link href="/#products-suite" …>Products</Link>

// BreadcrumbList JSON-LD, line 282
item: `${site.url}/#products-suite`,
```

A visitor clicking **Products** in the breadcrumb on the BITS CRM page lands on
the homepage and **nothing happens** — no scroll, no target, no error. The
JSON-LD entry tells search engines the same thing.

### 79.3 Why link-integrity was green

Section 6 of the gate resolves `/page#frag` against the ids reachable from the
target page's module graph — the right design. But it opened with:

```js
if (target.startsWith("/#")) continue; // handled by the landing-page check
```

and the "landing-page check" it defers to iterates `linkSources`, **a list of
seven files**. Every other file under `app/` and `components/` was scanned and
then skipped for precisely this link shape.

So the delegation was never wrong in principle — only incomplete in coverage. The
gap was invisible because every `/#frag` link that *did* get checked happened to
resolve; the two that were broken happened to live in a file nobody had listed.

Both loops now validate `/#frag` against `anchorIds`, so the shape is checked in
every scanned file rather than in the seven somebody remembered. The fix found
the two real broken links immediately, with no false positives.

> **A rule that delegates its coverage to another rule inherits that rule's
> coverage, not its correctness.** "Handled elsewhere" is only a safe comment if
> elsewhere is strictly broader than here. It was not.

### 79.4 Both links retargeted, not deleted

`ProductsSuite` does not render, so the anchor cannot be restored without
resurrecting 223 KB of duplicated page. The links now point at
`/#product-families`, which is the homepage section that actually lists product
families — the correct target for a breadcrumb reading **Products**, and one that
exists (`components/sections/product-families.tsx`, rendered by
`app/(marketing)/page.tsx`).

### 79.5 The new coverage is negative-tested

`scripts/link-integrity-negative.mjs` (8 assertions). The fixture is injected
into `app/(marketing)/products/crm/page.tsx` **specifically because it is not
one of the seven files the old path covered** — injecting into `lib/site.ts`
would have passed on the old code and proved nothing.

| Assertion | Result |
|---|---|
| real repository passes | PASS |
| fixture landed in a file outside `linkSources` | PASS |
| …and that file is genuinely outside the 7-file list | PASS |
| a dangling `/#frag` in an unchecked file **FAILS** the gate | PASS |
| …names the file | PASS |
| …names the missing id | PASS |
| file restored byte-for-byte | PASS |
| gate passes again after restore | PASS |

Suite **32 → 33** gates; `docs-claims-drift` caught the count change unprompted
again, which is the third time it has now done so.

### 79.6 `product-showcase.tsx`: a pulsing "LIVE ENGINE" over a simulation

`ProductShowcase` renders on `/bitscrm` and carried a header badge reading
**LIVE ENGINE** next to a green `animate-ping` dot — over a client-side
simulation with no server. This is the same defect class §74 removed three
instances of from the homepage: an indicator that asserts liveness for a system
that is not running.

The badge is now a static `SIMULATED PREVIEW` with a non-pulsing dot. The
`Sync: 14ms · Zero MIS Wait` telemetry beside it is an unsourced performance
figure presented as a measurement and is left in place only because §74's
`stats-strip` treatment applies here — re-attached to what it actually measures,
which for a simulation is nothing, so it should be removed in §80.

### 79.7 The simulation label was in the wrong place

The component did carry a label — as a `<figcaption>` at the **bottom** of the
section, below a long scroll of simulated telemetry, reading *"Click buttons and
tabs to test **live** operational simulations."*

Two problems. It is at the end, so a reader who has just been shown a softphone
status bar has already absorbed six panels of untrue things. And "live" is the
word doing the most damage in it.

Per §75, a label must be **inline** — sentence-scoped detectors cannot see a
sibling element, and neither can a reader who has scrolled past it. A notice now
sits inside the panel, above the content it qualifies, and names the specific
absence rather than gesturing at "simulation":

> **Simulated** — This preview is a client-side illustration with synthetic data.
> **No telephony ships in this build** — no dialer, softphone, whisper, barge-in,
> call recording or audio pipeline — and nothing here connects to a live system.

The trailing caption was corrected to match.

The nine telephony findings in this file **remain**. That is the honest outcome,
not an oversight: they are strings in sibling panels, and the mitigation is a
visible label rather than a deleted demo. The file is deliberately **not** added
to `SECURITY_SURFACES`, because gating it would hard-fail legitimate simulated
UI — the §78 decision that demo behaviour is labelled rather than deleted,
applied consistently.

### 79.8 Live product copy corrected

| File | Was | Now |
|---|---|---|
| `lib/products/registry.ts` | `Integrated CRM, QA, Scorecards, Coaching Logs, **Dialer**, LMS…` | Dialer removed |
| `lib/products/registry.ts` | `Unified customer CRM, **WebRTC auto-dialer**…` | `…and daily metrics. No telephony ships in this build.` |
| `lib/products/registry.ts` | `…with **WebRTC dialer**, QA coaching, WFM, and **BSP 454/857 compliance**` | `…with QA coaching and WFM. No telephony ships in this build, and no BSP certification is claimed.` |
| `lib/products/crm-sales/mock-data.ts` | `BITSagent Sub-300ms Voice AI Dialer Add-on` | `…Voice AI Add-on (not available in this build)` |
| `lib/products/crm-sales/mock-data.ts` | `BSP-compliant … voice assistant with **zero hallucinations**` | states no telephony, no voice model, no certification |

"Zero hallucinations" is worth naming separately: it is an absolute claim about a
probabilistic system that no vendor can make, and it was sitting in a catalogue
entry next to a monthly price.

`registry.ts` findings **4 → 0**; `mock-data.ts` **1 → 0**. Both files dropped out
of the blind-spot report entirely.

### 79.9 A typo fix that made the detector worse

`lib/products/crm-support/store.tsx` contained `"Our overnight dailing run…"` —
a typo. Correcting it to **"dialing"** raised that file's findings from 4 to 5,
because *dialing* is a telephony term and *dailing* was not.

A correctness fix that trips the check is usually a signal that the string needed
rewording rather than spelling. The sentence now reads **"Our overnight batch
import…"**, which is typo-free *and* accurate: there is no dialer for the ticket
to describe, so the original sentence was wrong about the product twice over.

> Fixing a typo can change what a detector sees. That is not a reason to leave the
> typo; it is evidence the string needed to be rewritten.

### 79.10 Residual, stated rather than hidden

**91 findings across 10 files**, down from 108/12 at the start of §78. The
largest remaining:

| File | n | Status |
|---|---|---|
| `lib/blog-data.ts` | 29 | third-party/competitor description — deliberately retained (§78.7) |
| `products-suite.tsx` | 22 | dead component; mockup boards; owner decision on deletion |
| `lib/site.ts` | 13 | gated exports are clean; these are in ungated ones — §80 |
| `products/[slug]/page.tsx` | 10 | out-of-repo product lines — §80 |
| `product-showcase.tsx` | 9 | simulated UI, now labelled inline (§79.7) |
| `crm-support/store.tsx` | 4 | synthetic support tickets describing dialer/softphone faults |
| 4 files | 1 each | already handled in earlier phases |

Two gaps recorded rather than closed:

1. **`crm-support/store.tsx` labels its records as synthetic in a *code comment***
   (`store.tsx:8` — *"Every record is synthetic sample data"*), not in the UI. §56
   established that a comment is not a label. Four of its findings are support
   tickets about softphone audio drops and dialer batches — plausible content for
   this market, but they imply a product with telephony. The visible label is §80.
2. **`scripts/verify-modal.mjs` locates `#products-suite`** on the live homepage
   and would now fail. It is referenced by no npm script, so nothing runs it. It
   is dead verification code pointing at a dead section.

### 79.11 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/link-integrity-negative.mjs` | **PASS** — 8/8 |
| `node lib/site/link-integrity.selfcheck.mjs` | **PASS** — 41 routes, 22 anchors, 51 skip links |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 7,338 strings / 15 attestations |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 markdown files, 0 stale |

Owner decisions unchanged. `demo@boundlessitsolutions.com` remains live and
blocking; nothing has been pushed, merged or deployed.

---

## 80. Five dead exports §72 missed, a third "Live" badge, and a category word the telephony rule never had

### 80.1 The dead-export set was never actually measured

§72 gated seven `lib/site.ts` exports that had zero importers. Seven was not a
measurement — it was the number found by looking at the ones that happened to
come up. Measuring all 37 exports properly:

```
lib/site.ts exports: 37
  referenced elsewhere: 32
  ZERO importers      : 5   → heroStats, theDifference, featureGridItems,
                             processSteps, footerColumns
```

All five are now gated. §61 established the principle — orphaned exports are
cheap to keep and expensive to re-wire — and §72 applied it to an incomplete
list.

Gating them immediately produced the two failures that made the work worth
doing:

```
- lib/site.ts (featureGridItems): … telephony …
- lib/site.ts (featureGridItems): … telephony …
```

`featureGridItems` still sold **"SIP softphone"** and **"Listen, whisper,
barge"**. Dead copy, not a live lie — but copy one import away from being live,
in the one component whose entire purpose is listing product features.

### 80.2 And the same export held a telephony SLA

`heroStats` read:

```ts
{ value: "3.2x", label: "Faster Right-Party Connects" },
{ value: "99.9%", label: "High-Availability Telephony SLA" },
```

**A 99.9% uptime SLA for a service that does not exist.** Not flagged, because
the word *"Telephony"* was not in the telephony rule.

### 80.3 The rule was missing the category word — after four widenings

The `telephony` CHECKS term has been widened three times (§52 six technologies,
§62 sales vocabulary, §70 supervision verbs). It had never contained the word
**telephony**.

This was seen twice and misattributed both times:

- §78 — a negative-test fixture reading *"integrated command HUD with
  sub-350ms telephony"* produced **no finding**. I rewrote the fixture to
  contain "predictive dialer" and moved on, attributing nothing.
- §80 — `heroStats` reported clean, and the cause was assigned to the export
  being dead rather than to the rule being incomplete.

Measured blast radius, running the widened term across all 33 gated surfaces:

| Class | n | Examples |
|---|---|---|
| **Real claims, invisible for the whole audit** | **15** | `99.9% Telephony uptime Service Level Agreement (SLA)`, `99.98% Telephony Uptime · Live GPS & Timestamps`, `BITScrm Collections — Enterprise Debt Recovery & Telephony Platform`, `High-Volume Debt Recovery … & Supervisory Telephony`, `Autonomous Voice, SMS, Email & Telephony`, `Telephony & Communications` |
| Already-labelled specimens / denials | 6 | `Metered Telephony (specimen)`, `Zero Telephony Required`, `Telephony Console (specimen)` |
| Identifier / asset-path matches (rule false positives) | 6 | `tab-telephony`, `telephony-sla`, `/images/features/telephony-console-specimen.webp` |

27 hits; adding the term takes the gate from green to **39 failing assertions**
across 8 files.

### 80.4 The widening is measured, documented, and deliberately NOT shipped

The term is not added in this phase. Two reasons, both about ordering:

1. Six of the 27 are identifier and asset-path matches. They need rule refinement
   first, otherwise the fix trains everyone to ignore a noisy rule.
2. The other six are labelled specimens and honest denials that need
   `SCOPED_OUT` markers, and `scoping-regression.mjs` pins the real denial set —
   so those markers have to be added deliberately or that gate fails first.

Shipping a red suite is worse than shipping a known gap: a gate that fails on
39 things nobody has adjudicated is a gate that gets switched off, and §44 is the
record of what happens next.

> A rule whose vocabulary is narrower than its category is a rule that reports
> green on most of the thing it exists to catch. §62 said this. It took until
> §80 for anyone to check whether the category word itself was in it.

The full enumeration is recorded here and in the rule's own comment block, so
§81 executes a known list rather than re-deriving one.

### 80.5 A third "Live" badge, and a stale engine count

`components/products/demo-toolbar.tsx` renders on **every demo module**. It
carried:

```tsx
<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
Live MVP Sandbox
```

Every demo is client-side state in `localStorage`; nothing is connected. This is
the same badge §74 removed three of and §79 removed a fourth — **a live indicator
over a sandbox asserts a connection that does not exist.** It is now
`Demo Sandbox` with a static amber dot and no pulse.

The same toolbar linked to `/demo` labelled **"All 18 Engines"**. `/demo` renders
`PRODUCT_REGISTRY`, which is **19**. The 18 is the `bitsProducts` marketing
catalogue at `/products` — a different list, and exactly the two-catalogue
confusion §71 built the drift gate's dual-count rule around. That rule only
scans **markdown**, so a count in a `.tsx` file had no coverage at all.

Corrected to 19, and the visible demo constraint now lives in the shared chrome
so every demo module inherits it instead of each repeating it:

> Synthetic sample data · browser storage only · no server connection

This also closes the gap §79 recorded: `crm-support/store.tsx` labelled its
records synthetic in a **code comment**, which §56 established is not a label.

### 80.6 Dead-export claims corrected

| Was | Now |
|---|---|
| `heroStats`: `99.9% — High-Availability Telephony SLA` | `99.9% — High-Availability Platform SLA (roadmap)` |
| `featureGridItems`: `SIP softphone` | removed |
| `featureGridItems`: `Listen, whisper, barge` | removed |

Visible strings under gate **7,338 → 7,498** (the five newly gated exports add
160). `docs-claims-drift` caught the doc number unprompted — its fourth catch
this session, and the clearest argument yet for having built it.

### 80.7 Residual

**91 findings across 10 files**, unchanged in total this phase, with the
composition now fully understood:

| File | n | Status |
|---|---|---|
| `lib/blog-data.ts` | 29 | third-party description — retained (§78.7) |
| `products-suite.tsx` | 22 | dead component — owner decision on deletion |
| `lib/site.ts` | 13 | `bitsProducts` out-of-repo lines (owner) + 6 labels, 4 of which are topic selectors |
| `products/[slug]/page.tsx` | 10 | out-of-repo product lines — owner |
| `product-showcase.tsx` | 9 | simulated UI, labelled inline (§79.7) |
| `crm-support/store.tsx` | 4 | synthetic tickets; visible label now supplied by the demo chrome (§80.5) |
| 4 files | 1 each | handled in earlier phases |

Three of `lib/site.ts`'s 13 are **question and topic labels**, not claims —
*"Can BITS integrate with our existing legacy systems and telephony?"* is an FAQ
question, and *"Compliance tracking & audit trail governance"* is a checkbox in
the contact form's "primary challenges" list. Both are things a customer says,
not things BITS asserts. They are recorded as **known non-claims** so a future
widening does not "fix" them by rewording a question.

### 80.8 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 7,498 strings / 15 attestations |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 markdown files, 0 stale |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 81. Shipping the widening §80 declined to ship

§80 found that the `telephony` rule had been widened three times and had never
contained the word **telephony**, measured the 27 hits that adding it produces,
and deliberately did not ship it: 39 failing assertions across 8 files, of which
6 were rule false positives and 6 were labelled specimens and denials needing
markers first. This phase executes that list.

### 81.1 An identifier is not a claim

The six false positives were a TypeScript union member, two variable
assignments, a React `key`, a DOM `id`, and an asset path:

```
type ActiveTab = "cockpit" | "telephony" | "field" | "qa";
nextTab = "telephony";
key="tab-telephony"
id: "telephony-sla"
imageSrc: "/images/features/telephony-console-specimen.webp"
```

Renaming these to satisfy a detector would be wrong twice: it churns internal
identifiers, and the asset filename is referenced from documentation. They are
**names**, not sentences about the product.

`isNonCopyLiteral(src, index, value)` decides by **position, then shape**:

| Test | Catches |
|---|---|
| leading `/` or `./` **and** a file extension | asset and module paths |
| `===`, `!==`, `=>`, `\|\|`, `&&` | code fragments the `>…<` JSX pass mis-captured |
| all-lowercase single token | `telephony`, `tab-telephony`, `telephony-sla` |
| preceded by `id:` / `key=` / `aria-*` / `data-*` | DOM and React identity |
| preceded by `type X = "a" \| ` | TypeScript literal-union members |

The lowercase-token test is the only one that judges shape rather than position,
and it is sound because **case** separates the classes where length cannot:
`telephony` (a tab id) and `Telephony` (a rendered category label) are the same
length and only one is copy. Mixed-case single tokens are still scanned.

Two costs are declared in the function rather than discovered later: a real
claim placed in an `id:` field is exempt, and a lowercase single-token *data
value* that reads as a claim (`badge: "enforced"`) is exempt. Rendered copy here
is JSX or a sentence, and JSX text is not filtered by that branch, so the
enforcement-badge rule is untouched.

### 81.2 What the filter cost — measured, not asserted

The filter skips **1,019 of 7,498** gated literals (13.6%). Coverage is only
traded if a skipped literal would have matched a banned term:

```
skipped literals that MATCH a banned term: 5 distinct values
  13x  telephony                                    ← tab ids
   2x  telephony-sla                                ← DOM id
   1x  tab-telephony                                ← React key
   1x  ) : activeTab === "telephony" ? (            ← ternary mis-captured
   1x  /images/features/telephony-console-specimen.webp
```

**Zero claims traded away.** That is a point-in-time fact, not a property, so ten
probes now live in the gate's own self-test — six that must be skipped and three
that must still be scanned (`Telephony & Communications`, a false SLA, a
capitalised badge). A probe whose fixture fails to extract reports *"the probe
proves nothing"* rather than passing; the first draft of the ternary probe hit
exactly that and was corrected rather than deleted.

### 81.3 Three new self-declaring markers, and a question

| Marker / rule | Handles |
|---|---|
| `specimen` | `Metered Telephony (specimen)`, `Specimen: metered telephony line.` |
| `zero … required` | `Zero Telephony Required` — a denial of presence |
| `not available` | pricing rows whose cells say so |
| a sentence ending in `?` is not a claim | `Does BITSagent include telephony?`, `Can BITS integrate with our existing legacy systems and telephony?` — the **answers** are separately scanned as copy |

The question rule is scoped to a trailing `?` only. §76 removed a bare-`?`
heuristic on other grounds and it would still be wrong: a visitor-facing heading
may legitimately end in one. A detector that flags the interrogative is auditing
punctuation, not the product.

### 81.4 A regex that compiled cleanly and matched nothing

The first attempt at the `specimen` marker broke every capitalised denial in the
repository — *"No telephony in this build."* suddenly failed, 32 assertions fired,
and `scoping-regression.mjs` would have been the next failure.

Cause: the marker was concatenated with `+` and the flags argument was joined to
the pattern instead of being passed as a flag:

```js
"...required\\b" + "i"     //  →  /\brequired\bi /   (no case-insensitivity)
```

A trailing `\bi` instead of `"i"`. **The regex compiled, ran, and matched nothing
of what it was written for** — §78's `/\\s[*]([(&])/` failure in a different
coat. Both are now documented at the site of the bug, because the same mistake is
available to whoever edits `SCOPED_OUT` next.

### 81.5 Twenty claims corrected

| Was | Now |
|---|---|
| `99.9% Telephony uptime Service Level Agreement (SLA)` | `Not offered: this build ships no telephony, so no telephony SLA can be given` |
| `{ … starter: "99.9% Telephony SLA" … }` | platform availability, "scoped in writing" / "agreed in writing" |
| `99.98% Telephony Uptime · Live GPS & Timestamps` | `Live GPS & Timestamps · No Telephony In This Build` |
| `BITScrm Collections — Enterprise Debt Recovery & Telephony Platform` | `… Enterprise Debt Recovery Platform` |
| `Telephony Uptime SLA` | `No telephony in this build — no SLA offered` |
| `Telecom and telephony` / `Telephony and access controls for the collections floor.` | `Roadmap — no telephony ships` / `Telephony is roadmap only. Session access controls ship today.` |
| `…Supervisory Telephony` | `…Supervisor Oversight` |
| `Autonomous Voice, SMS, Email & Telephony` | `Autonomous Voice, SMS & Email` |
| `…legacy databases and telephony backbones.` | `…legacy databases and existing systems.` |
| `category: "Telephony & Communications"` | `category: "Communications"` |
| `Telephony right-party contact metrics` | `… (no telephony in this build)` |
| `Right-party connect ratios and telephony performance metrics` | `…from logged records (no telephony in this build)` |
| `{ name: "Telephony", … }` | `Telephony — not available in this build` |
| `…in addition to predictive telephony.` | `…operations dashboards. This build ships no telephony.` |
| `Sovereign Cloud or On-Premises Telephony Rack` | `Sovereign Cloud or On-Premises Deployment` |
| **product name** `BITSagent AI Telephony` (×2 forms) | `BITSagent AI Operations` — the name already used by `lib/site.ts` and the registry |
| byline `Lead Systems Architect & Telephony Consultant` | `Lead Systems Architect` |
| `Operations 360 (OMS) & Telephony Suite` | `Operations 360 (OMS) Suite` |

The two product renames are worth separating from the rest. `blog-data.ts` was
reviewing a product named **"BITSagent AI Telephony"** while `lib/site.ts` and
`lib/products/registry.ts` both call it **"BITSagent AI Operations"** — so the
site was not only claiming telephony it does not have, it was naming a product
differently in the comparison articles that rank it. The renames are consistent
with the canonical name and touch no other file.

### 81.6 Two gates disagreed about "visible strings"

> **Number note (§87).** The 6,479 quoted below, and in the §82, §84 and §85
> verification tables, is the count **as it stood then**. §87 removed 2,532
> Tailwind class literals from it; both gates now report **3,947**. The historical
> tables are left unrewritten because they record what was true when those phases
> ran — §77 established that a snapshot is not a defect, but a snapshot read as
> current is.

`docs-claims-drift.mjs` derived the documented count without the identifier
filter, so it still reported **7,498** while `ai-disclosure` scanned **6,479**.
Two gates deriving the same named quantity differently is a defect waiting to be
quoted: one of them was always going to be wrong in a document.

Both now apply `isNonCopyLiteral`, and `docs-claims-drift` caught the resulting
doc drift on the next run — its fifth unprompted catch this session.

### 81.7 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / **6,479** strings / 15 attestations |
| `node scripts/blog-claims-subject.mjs` | **PASS** — 36 findings, 0 BITS-subject |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 markdown files, 0 stale |
| `node lib/site/encoding-integrity.selfcheck.mjs` | **PASS** |

The telephony rule now covers the word telephony, the filter's cost is measured
and probed, and the twenty claims it found are corrected rather than documented.

---

## 82. A sentence splitter that split on `&amp;` — and hid five live claims

§81 shipped the telephony widening. This phase started by re-measuring, and the
number went the wrong way: residual findings rose **91 → 106** across 14 files,
because a rule that can finally see the word *telephony* sees it everywhere. That
is the widening working, not a regression. Working the new list down produced two
detector bugs and one more live claim class.

### 82.1 `products/[slug]/page.tsx`: 11 findings, five of them real

The residual findings there decomposed cleanly:

| Class | n | Examples |
|---|---|---|
| **BITS capability claims** | **5** | `Featuring sub-350ms predictive dialing … supervisory HUD`, `supervisor softphone whisper logs`, `records dual-channel audio for 7-year retention … immutable audit trail`, `predictive dialer for collections` |
| Market pain-points (true) | 3 | `Manual Dialing Fatigue & Slow Connect Rates`, `PCI-DSS Security Vulnerabilities`, `Lack of Auditable Compliance & RBAC` |
| Attestation on a real capability | 1 | `via PCI-DSS tokenized card …` — tokenization is real; the PCI-DSS label was not |
| Softphone / audit restatements | 2 | removed |

The three pain-points were prefixed **`Floor pain point:`** — the marker §75
established for exactly this shape, where a true statement about the customer's
problem reads, alone in a string, as a statement about BITS. `Lack of Auditable
Compliance & RBAC` is the sharpest example: as a *problem with generic CRMs* it
is true, and BITS has no RBAC either.

The worst single string was an **FAQ answer**:

> *"BITScrm Collections includes automated contact window enforcement that locks
> outgoing calls and SMS outside of legally permitted hours (6:00 AM to 10:00 PM),
> records dual-channel audio for 7-year retention, and logs all Promise-to-Pay
> arrangements to an immutable audit trail."*

Every clause is false: no contact-rule enforcement, no audio, no immutable store.
It now begins *"It does not, yet."*, states what the build does ship, and says the
BSP obligation remains the customer's.

**11 → 0.** `products/crm/page.tsx` (the same tagline, copied) and
`crm-sales/mock-data.ts` (`Proprietary Voice AI Collections & Telephony Core`)
went to 0 as well.

### 82.2 The residual report contradicted the gate it belongs to

After §81's identifier filter, the blind-spot inventory still listed **seven
files with "1 finding" that the main gate had already ruled clean**. Two code
paths in the same file disagreed: the gate is sentence-scoped, the inventory
tests the raw value.

Applying the same filter to the inventory dropped the report from 106/14 to
**96/11** — with no copy changed. Six singles remained, and chasing one of them
found §82.3.

> §81.6 recorded two *gates* deriving one named quantity differently. This is
> the same defect inside a single gate: two loops in one file, disagreeing.
> **A report that contradicts the check it is part of teaches the reader to
> ignore both.**

### 82.3 The splitter split on HTML entities

Chasing *"Does BITSagent include telephony?"* — flagged by the inventory, exempt
from the gate by §81's question rule — led to four more values the gate did not
flag:

```
"BSP 857 &amp; NPC RA 10173 Aligned"
"BSP 454/857 &amp; NPC DPA Aligned"
"BSP Circulars 454 &amp; 857 compliance review"
"BSP Circular 454 &amp; 857 Aligned"
```

The gate passed all four. **The splitter was the reason.**

```js
text.split(/(?<=[.;])\s+/)
```

Every `;` before a space is a sentence boundary — including the one that ends an
HTML entity:

```
"BSP 857 &amp; NPC RA 10173 Aligned"
  →  ["BSP 857 &amp;", "NPC RA 10173 Aligned"]
```

The `contact-rules` term requires the circular number **and** an alignment word
within 40 characters. Split between them, neither half reaches the threshold, and
the claim vanishes. Four gated surfaces shipped that exact string; the gate had
been reporting clean on all of them.

This is §76's failure in new clothing — the detector ran, printed a confident
pass, and matched nothing, because it was never shown the sentence. The fourth
recorded instance of a shape that has now recurred in §59, §70, §75 and §81.

`SENTENCE_SPLIT` now refuses to break at a `;` terminating an entity. A real
sentence semicolon still splits, because there is no `&` in front of it:

```js
const SENTENCE_SPLIT = /(?<!&[#\w]{1,10})[.;]\s+/;
```

The fix immediately surfaced the one gated claim it had been hiding: a green pill
in `hero-product.tsx` reading **"BSP Circular 454 & 857 Aligned"** — an
unverifiable compliance attestation styled as an achievement. It now reads
`BSP 454/857 — roadmap, not certified`.

The other three remain, correctly, in the report-only inventory.

### 82.4 A PowerShell trap worth recording

Three searches for these strings returned nothing at all, and I briefly believed
the file did not contain them. `app/(marketing)/products/[slug]/page.tsx` cannot
be passed to `Select-String` as a plain path: `[slug]` is a **character class**,
so the path is a wildcard that matches nothing.

`Select-String -LiteralPath` is required for any path containing brackets. This
is the same failure as §79's filename-vs-symbol search — **a search that returns
nothing is not evidence of absence until you have checked it could have found
something.**

### 82.5 Residual

**86 findings across 10 files**, down from 106/14 at the start of this phase and
from 108/12 before §81 — measured with a strictly wider detector.

| File | n | Status |
|---|---|---|
| `lib/blog-data.ts` | 34 | third-party/competitor description — retained by design (§78.7) |
| `products-suite.tsx` | 24 | dead component; owner decision on deletion |
| `lib/site.ts` | 12 | `bitsProducts` out-of-repo lines (owner) + topic labels |
| `product-showcase.tsx` | 10 | simulated UI, labelled inline (§79.7) |
| 6 files | 1 each | pain-points, questions and simulated-UI strings |

### 82.6 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 6,479 strings / 15 attestations |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 markdown files, 0 stale |

Owner decisions unchanged; nothing pushed, merged or deployed.
---

## 83. Proving the §82 fix could have been the bug

§82 changed how sentences are delimited — `SENTENCE_SPLIT` — and proved the
change only by observing that a previously-hidden claim had become visible. That
is the same gap this audit has now closed four times: **a detector's behaviour
changed, and the proof depended on the very string that motivated the change.**

### 83.1 Both directions, because they fail in opposite directions

| Must NOT split | Must still split |
|---|---|
| `BSP 857 &amp; NPC RA 10173 Aligned` | `No audit log exists. We export audit logs daily.` |
| `Costs &pound;50 &mdash; per seat` | `Step one; then two.` |
| `SLA &#8594; 99.9% uptime` | `Contact us at ops@bits.com. We reply daily.` |

The right-hand column is the one that is easy to skip. Refusing to split at a
*real* `;` or `.` is a different bug with an opposite sign: a page whose first
sentence denies a control and whose second asserts it would read as one sentence,
and `SCOPED_OUT` exempts whole sentences — so the gate would get **easier to
pass**. That is the failure direction that costs the most, because nothing
reports it.

Six split probes plus two end-to-end rule probes now run in the gate's own
self-check: the §82 miss itself must be detected, and the claim *after* a genuine
sentence boundary must still be detected.

### 83.2 Proved by reverting, not by asserting

The probes were validated by restoring the §82 splitter and re-running:

```
const SENTENCE_SPLIT = /(?<=[.;])\s+/;          // the bug

- self-test: sentence split HTML entity expected 1 sentence(s) but got 2
              — ["BSP 857 &amp;","NPC RA 10173 Aligned"]
- self-test: sentence split named entity with digits expected 1 but got 2
- self-test: sentence split numeric entity expected 1 but got 2
- self-test: a BSP alignment claim containing &amp; is no longer detected
```

Exit 1 with the bug, exit 0 with the fix. That is the §70 standard — **a
negative test whose fixture is the bug it exists to catch is only alive until the
bug is fixed**, which is why the probes use synthetic strings rather than
re-reading the shipped `hero-product.tsx` string that triggered §82.

### 83.3 One probe was written backwards

The counterpart probe asserted that `"No audit logging exists. We export
immutable WORM audit logs daily."` should produce **no** finding, on the theory
that the splitter must not launder a denial. It failed immediately — correctly.

The claim in the second sentence *should* be found. A denial in sentence one must
not exempt a contradicting claim in sentence two, so the correct assertion is that
the `worm` rule fires **and** that the text splits into exactly two sentences. I
had encoded the defect I was guarding against as the expected behaviour.

Worth recording because the failure was informative rather than annoying: had the
probe been "fixed" by loosening it, the gate would have shipped carrying a test
asserting that a live audit-log claim is invisible.

### 83.4 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — split probes fail on the old splitter, pass on the new one |

Owner decisions unchanged; nothing pushed, merged or deployed.
---

## 84. The 4,398-line file that is half dead and half live

The residual's second-largest entry had never been adjudicated, because §79
established only that `ProductsSuite` has no importer — and moved on. The file
exports **two** functions:

```
exports: ProductsSuite, ProductMockupBoard
```

| Export | Rendered where | Status |
|---|---|---|
| `ProductsSuite` | nowhere — zero importers | dead, 223 KB |
| `ProductMockupBoard` | `app/(marketing)/products/[slug]/page.tsx:1011` | **live on every product page** |

`products/[slug]` is the page behind all 18 product routes. So a component
treated as dead scaffolding was rendering simulated claims on every one of them.

### 84.1 Split by owning export

The 24 findings divide cleanly by which function encloses them:

| Owner | n | Class |
|---|---|---|
| `ProductMockupBoard` | 19 | simulated UI — a softphone call up, whisper coaching, 42,500 SIP minutes, a WORM ledger hash, PCI-DSS Level 1, Okta SSO, "100% Compliant" |
| module scope | 5 | 2 real claims, 1 pain-point, 2 out-of-repo product lines |

The two real ones are fixed:

| Was | Now |
|---|---|
| `OPERATIONS 360 brings CRM, QA, Scorecards, Coaching, **Dialer**, LMS, WFM …` | Dialer removed, `No telephony ships in this build` added |
| `…100% QA audits, 1-click coaching logs, **auto-dialing**, LMS modules…` | `native QA scorecards`, `No telephony ships in this build` |

### 84.2 A disclaimer is not a list

§56 added the synthetic-data label to `ProductMockupBoard` and it is correctly
placed — inline, inside the component, at the top, so every consumer inherits it.
It reads *"Illustrative interface preview. Synthetic sample data throughout — this
is not a live workspace, and every record shown is invented."*

That is true and it is insufficient. The same board then asserts, in nineteen
places, a softphone call in progress, supervisor whisper coaching, 42,500 SIP
minutes reconciled against a billing ledger, a WORM ledger hash, a SHA-256
tamper-proof audit trail, PCI-DSS Level 1 readiness, Okta SAML and SCIM
provisioning, multi-tenant isolation, automated BSP 454/857 quiet-hour
enforcement, and badges reading `100% Compliant`.

A generic disclaimer asks the reader to re-derive, panel by panel, which of
those is fictional. The label now names them:

> Specifically, none of the following exists in this build: telephony of any kind
> (no dialer, softphone, whisper, barge-in, SIP, or call recording), a WORM or
> immutable audit store, PCI-DSS certification, SSO/SCIM, per-tenant isolation,
> or automated BSP 454/857 quiet-hour enforcement. Labels such as "Compliant" and
> "Level 1 Ready" illustrate a possible configuration, not a shipped one.

This is §79's rule generalised: **name the specific absence rather than gesturing
at a category.** A visitor can now check any single panel against the note
without interpreting the whole disclaimer.

### 84.3 Why this file is still not gated, stated plainly

The 22 remaining findings are simulated UI, and gating the file would hard-fail
every one of them. §62 and §56 established the standing decision — **demo
behaviour is labelled, not deleted** — and the label is now specific and inline.

That is a real trade and it is not free: nothing mechanical will fail if someone
adds a twenty-first simulated capability to this board. The mitigation is a
visible, enforced-by-review label rather than a gate. Recorded here rather than
left implicit, because "it is a demo" is the reason most likely to be reused to
excuse the next real claim.

`ProductMockupBoard` is the one component in this file that must never be
deleted on the strength of §79's dead-code finding — the dead export is
`ProductsSuite`, and removing the whole file would take a live page's mockups
with it. **A dead file and a live file can be the same file.**

### 84.4 Residual

**84 findings across 10 files.** Every remaining entry is now accounted for by a
decision rather than by ignorance:

> **Superseded by §85.6.** This total was a hand-sum of a report that prints only
> its first 4 rows per file. Measured directly, it was correct as of §84; after
> §85's changes the figure is **82**. The report now prints its own total.

| File | n | Disposition |
|---|---|---|
| `lib/blog-data.ts` | 34 | third-party vendor description — retained by design (§78.7) |
| `products-suite.tsx` | 22 | labelled simulated UI, on a live page (§84.3) |
| `lib/site.ts` | 12 | out-of-repo product lines (owner) + topic labels |
| `product-showcase.tsx` | 10 | labelled simulated UI (§79.7) |
| 6 files | 1 each | pain-points, questions, specimen strings |

### 84.5 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 6,479 strings / 15 attestations |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 markdown files, 0 stale |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 85. The disclaimer had a subtree, and half the claims were outside it

§79 moved `product-showcase.tsx`'s simulation label out of a trailing
`<figcaption>` and into the panel. §84 generalised the wording: a label must
**name the specific absence** rather than gesture at a category.

Both phases were right about the label, and neither asked where the label ended.
This section is the result of asking.

### 85.1 A disclaimer qualifies a subtree, not a page

The label renders at lines 881–891, inside a chassis that opens at 845. It is
correctly placed by §79's own standard — inline, at the top, inside the content
it qualifies — and it reads:

> This preview is a client-side illustration with synthetic data. **No telephony
> ships in this build** — no dialer, softphone, whisper, barge-in, call recording
> or audio pipeline — and nothing here connects to a live system.

`ProductShowcase` returns at line 712. Everything from 749 to 839 is **outside**
that disclaimer, and it sits *above* it in document order:

| Region | Lines | Inside the §79 disclaimer? |
|---|---|---|
| Engines grid (`CORE_ENGINES.map`) | 749–777 | **no** |
| Persona advantage strip (`activeMeta.useCase` / `.pain` / `.solution`) | 817–839 | **no** |
| Chassis header, toast, tab views | 845–924 | yes |

Measured against the 10 residual findings in this file:

| Renders | n | What it is |
|---|---|---|
| **outside** the disclaimer | 5 | grid + advantage strip |
| inside the disclaimer | 5 | illustrated inside the labelled preview |

The 5 inside are §84's accepted posture — simulated UI covered by a specific
inline label. The 5 outside are different in kind: ordinary marketing copy
presented as fact, with the disclaimer that would have qualified them appearing
later on the page.

### 85.2 Two of them were simply false

| Was | Where | Now |
|---|---|---|
| `Integrated Dialer` → *"WebRTC browser softphone, predictive pacing queues & supervisor whisper HUD."* | engines grid, line 110 | *"Dialer and softphone screens appear in the simulated preview below. No dialer, softphone or audio pipeline ships in this build."* |
| `The OPERATIONS 360 Advantage:` → *"…One unified interface with customer history, **auto-dialer**, instant payment links…"* | advantage strip, line 195 | *"…customer history, instant payment links, and personal scorecards. No dialer ships in this build."* |

Both are absent-capability claims about a product with zero telephony —
`RTCPeerConnection`, `getUserMedia` and SDP appear **nowhere** across 161 source
files. In-repo and adjudicable, so fixed rather than reported.

The absence sentence is scoped out by the existing §65 `no` negation marker, not
by a new exemption. Probed directly, because "absent from the finding list" has
two indistinguishable causes — matched-then-exempted, or never matched at all:

```
"No dialer, softphone or audio pipeline ships in this build."
  matched         : 0 (none)     <- it DID match the telephony rule
  SCOPED_OUT.test : true         <- exempted by `no`
  => MATCHED THEN SCOPED OUT (existing marker, 65)

"The preview has a dialer."
  matched         : 1 telephony  <- and the rule still fires on a real claim
```

**A correction is not coverage.** The second probe is what makes the first one
mean anything: the exemption has not blunted the rule, it has diverted a denial
away from it.

### 85.3 The strings that remain outside are market statements, not BITS claims

Recorded so the next reader does not re-open them:

| String | Rendered under | Disposition |
|---|---|---|
| `Operations Agents, Collectors, Telephony Reps & Care Staff` | `Target Role:` | describes the **customer's** staff. A contact centre employs telephony reps; that is their org chart, not our product. |
| `Forced to alt-tab between 5–8 slow screens—CRM, phone dialer, LMS training…` | `Current Friction:` | describes the customer's **current fragmented tools**. §75's `floor pain point:` reasoning, reached without needing the marker because the visible label already declares what kind of sentence this is. |
| `Integrated Dialer` (the engine **name**) | engines grid | see 85.7 |

### 85.4 A count the code itself refutes, and no gate could have seen it

The engines grid rendered this heading:

> **The 9 Core Operational Engines In One System**

over an array of **ten** entries — and the array was literally named
`NINE_ENGINES`, with a matching comment at the declaration and another at the
JSX. Constant, comment and copy agreed with each other, and all three were wrong.

This is the most self-evidently false string in the file and it is invisible to
`ai-disclosure`. Its rules ask whether copy asserts a security control. This
string does not — it asserts a **count**, and no gate in the repository compares
a number in copy against the length of the collection it describes.

It is also not a drift risk elsewhere. `"9 engines"`, `NINE_ENGINES` and *"The 9
Integrated Engines"* appear **only** in this one file; no markdown document and
no other component repeats the number. `docs-claims-drift` had nothing to compare
it against. It could only ever have been caught by reading the array.

The fix is not a corrected numeral, it is a removed possibility:

```tsx
The {CORE_ENGINES.length} Core Operational Engines In One System
```

The number is now derived from the thing it describes. **A count that is computed
cannot disagree with what it counts.** `NINE_ENGINES` → `CORE_ENGINES`, and both
stale comments updated. Adding an eleventh engine now updates the heading with no
edit to it.

### 85.5 Why no "self-refuting count" gate was shipped

§85 found a blind spot. Fixing a blind spot without covering it only buys time,
so the obvious next move was a rule: *a number in copy that names a collection
declared in the same file must equal its length.* It was measured across all 33
gated surfaces before a line of it was written, and **it does not separate.**

`visibleStrings` returns every string literal, and that includes Tailwind
`className` values, tagged `kind: "string"` — indistinguishable from prose. The
measurement returned 453 numeric+plural matches, of which:

| Source | Matches |
|---|---|
| `className` values | **348** (77%) |
| prose / JSX text | 105 |

and the "prose" residue still contained `"6 shadow-xs"`, `"12 items-center"`,
`"50 text-xs"` and `"min-h-[44px] rounded-lg px-3.5 py-2.5 …"`. Precision is
approximately zero. A gate that fires on `items-center` teaches its readers to
ignore it.

Tagging `className` would fix the majority but not all of it: the residue comes
from literals inside `cn(...)` and template literals, which a fixed-width
lookbehind for `className\s*=\s*$` does not reach. Classifying them needs lexical
scope tracking, not a regex window.

**Blast radius, measured before deciding:** of the findings all 15 security rules
currently produce, **0** are `className`-sourced; all 14 are copy-sourced. So
tagging would not change today's verdict — it would shrink the reported string
count across every surface, a number quoted by `docs/TESTING.md`, by this document
and by `gate-execution-audit`, and it would sit behind a structural change to the
extractor that feeds every rule.

That is a phase of its own with its own measurements, not a footnote to this one.
Recorded as a **named blind spot** rather than shipped as a guess:

- **Blind spot:** copy that states a count is never checked against the
  collection it describes.
- **Why the obvious rule fails:** `visibleStrings` cannot distinguish a
  `className` from prose (348 of 453 matches).
- **What would fix it:** tag class literals by lexical scope inside
  `visibleStrings`, then re-measure. Expected effect on today's findings: none.
  Expected effect on every reported string count: material.
- **Interim mitigation, in force since §85.4:** derive counts rather than typing
  them, so this class of defect is unconstructible at the site that had it.

**Shipping the heuristic anyway would have been the exact failure this system
exists to catch: a check reporting coverage it does not have.**

### 85.5.1 CORRECTION — §85.5 measured only the easy half of its own blocker

§85.5 named the fix for its own blind spot — *"tag class literals by lexical
scope inside `visibleStrings`, then re-measure"* — and did not perform it. It was
written before the classifier existed, so it could only report the failure of the
crude version. That re-measurement has now been done, and **the class/prose
problem is solved.** The conclusion above that the rule cannot be built is
withdrawn as to its first reason; it survives on a second, different one.

A lexical-scope classifier records the byte range of every `class`/`className`/
`cx` attribute value, tracking the matching bracket so literals nested inside
`cn(...)` and template literals are covered. Measured across all 33 gated
surfaces:

| | Crude lookbehind (§85.5) | Lexical scope |
|---|---|---|
| numeric+plural matches from **class** | 348 | 376 (all excluded) |
| numeric+plural matches from **copy** | 105 (mostly still class) | **78, all real copy** |
| separation | ~0 | clean |

Every one of the 78 survivors is marketing copy, and they are exactly the
strings such a rule would need:

> `Combine Any of Our 18 Products into a Unified Deployment` ·
> `Product Portfolio Scoping — All 18 Products` · `Browse All 18 Products` ·
> `1 – 10 Sales & Support Reps` · `11 – 50 Reps & Agents` · `64,000 Mins` ·
> `3 Presets Available · Custom Sizing on Demand`

Zero `"12 items-center"`, zero `"50 text-xs"`.

Two other numbers, both consequential:

- **Security-rule findings: 14 copy-sourced, 0 class-sourced.** Tagging class
  literals changes nothing for the 15 rules. Whatever this costs elsewhere, it
  cannot lose coverage of a claim.
- **Visible strings: 6,479 → 3,947 (−2,532, −39.1%).** Measured on the gate's own
  pipeline, `exportRegion` branch included, so it is directly comparable to the
  number the gate prints. §86's first draft quoted **6,934 → 3,988** because it
  scanned whole files rather than the gate's regions; see the brace-depth bug
  below, which also inflated the class side.

**What is still unsolved, and is now the binding constraint.** Separating class
from copy was necessary, not sufficient. A rule must also decide *which* number
names *which* collection. In the survivors above:

- `All 18 Products` (three renderings) → `bitsProducts.length === 18`. **True.**
- `3 Presets Available` → some presets array. Must be checked, may be false.
- `11 – 50 Reps & Agents` → a **tier boundary**, not a count of anything. A rule
  that reads this as "there are 11 reps" would be wrong in the most confusing way
  available.
- `64,000 Mins` → a quantity, not a collection size.

Position is not enough any more, and neither is shape. So the rule is **still not
shipped** — but the reason has changed, and the recorded reason was wrong. §85.5
is corrected here rather than left standing, because a section that says "this
cannot be built" and a measurement that says "half of the obstacle is gone" are
not compatible, and the second one is newer.

#### Two bugs in the measuring instrument, recorded because they inverted the result

1. **Zero-width lookahead.** `class\s*=\s*(?=["'`{])` — the lookahead is
   zero-width, so `m[0]` stops at the `=`. Computing the attribute's opening
   position as `m.index + m[0].length - 1` points at `=`, not `{`; the opener
   read as `"="`, every range was garbage, and the first run **reported class
   strings as prose** — reproducing §85.5's original conclusion from a completely
   different, broken cause. Caught by asking why a literal inside
   `className={cn(…)}` was not classified as class, and printing the context
   around it rather than reasoning about the regex.
2. **A counter that never subtracted.** `afterStrings++` was present in both
   the class and copy branches, so Q2 reported a −59 delta that measured nothing
   but the markdown surfaces. A real delta of −2,946 was invisible.

Both were found by running the thing and reading its output, which is the only
reason this section is a correction rather than a second confident wrong number.

#### 86.1 A third bug, found only after the first two were fixed

Fixing the brace-depth bug was required before §86's numbers could mean anything,
and it changed them again — from 2,946 class literals to **2,532**, and from 45.5%
overstatement to **39.1%**.

The bug: `let depth = 0` with the loop starting at `start + 1` never counts the
**opening** brace, so a `{…}` class value closed only on an *extra* `}`. One
`className` on `floor-showcase.tsx` line 245 produced a range spanning **333
lines**, which swallowed real copy. Fourteen strings were misfiled as class
values — and they were not random: they included

> `Specimen: supervisor HUD row. No telephony, audio pipeline or SRTP channel exists in this build.` ·
> `Simulated Call (no telephony)` · `Specimen board · no telephony ships` ·
> `Zero Telephony Required` · `Telephony (roadmap)`

**the §70, §73 and §84 specimen and denial labels themselves.** A classifier
that hides the labels this repository spent three phases making inline is not a
classifier that can be trusted, and no amount of the "0 findings inside class
literals" figure would have revealed it — those findings were 0 partly *because*
the strings asserting them had been filed as class values.

That is the fourth time in this audit that a measurement agreed with the result
it was expected to produce. The recovery was not to argue with the number but to
ask which real string it was misfiling, which is why §87 ships a probe set rather
than a filter.

### 85.6 The report never stated its own total, and the first total written was wrong

The inventory prints **how many files** have findings and lists up to 4 rows
each. It never printed how many findings there were, so every audit section that
quoted a total — §84.4's "84 findings across 10 files" included — was quoting a
hand-sum of a list the report itself truncates.

**This section's first draft wrote "83". The true figure is 82.** The derivation
was arithmetic on the prior total, which is precisely the failure §77 found
inside a gate's own regexes: a number computed by hand from a truncated list is
not a measurement.

The total is now computed by the loop that produced the findings, from the same
`Set` the rows are drawn from:

```js
const findingTotal = [...inventory.values()].reduce((n, claims) => n + claims.size, 0);
```

It cannot disagree with the list, and it does not have to be re-summed by hand.
Re-measured: **82 findings across 10 files.**

| File | n | §84 | Disposition |
|---|---|---|---|
| `lib/blog-data.ts` | 34 | 34 | third-party vendor description — retained by design (§78.7) |
| `products-suite.tsx` | 22 | 22 | labelled simulated UI, on a live page (§84.3) |
| `lib/site.ts` | 12 | 12 | out-of-repo product lines (owner) + topic labels |
| `product-showcase.tsx` | **8** | 10 | 5 labelled simulated UI, 3 market statements, 1 engine name (85.7) |
| 6 files | 1 each | 1 each | pain-points, questions, specimen strings |

Every other row is unchanged from §84.4, which is the cross-check: the per-file
figures derived from the gate's stdout reproduce §84's table exactly except the
one file §85 touched.

**A note on units, because two numbers here are not the same number.** The
inventory counts *distinct strings*; `findClaims` counts *claim instances*, and
one string can yield several (each banned term × each sentence). `product-showcase.tsx`
is 8 by the first measure and 9 by the second. Both are correct. §82's lesson
applies: two quantities deriving one name will eventually be quoted against each
other, so this section names which one it is using.

### 85.7 Owner decision left open

`Integrated Dialer` is kept as an engine **name**, with the absence stated in its
description. The alternative — deleting the row — would return the grid to nine
entries and make §85.4's original "9" correct, and it is a legitimate reading of
§84's *"metrics that measure absent capabilities are removed, not relabelled."*

It was not done unilaterally because it is a product decision, not a
truthfulness one: it changes what the flagship section says Operations 360
includes. The false part — the affirmative softphone/whisper claim — is fixed
either way. Left to the owner.

### 85.8 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `npm run build` | **PASS** — compiled, 71/71 static pages |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 3,947 strings / 15 attestations, exit 0 (§87 removed 2,532 class literals from this figure) |
| `node scripts/gate-execution-audit.mjs` | **PASS** — 31 gates executed, 2 self-reachable excluded by design |

`gate-execution-audit` prints 31 against a declared 33. That is correct and
asserted by the script: it excludes `gate-execution-audit.mjs` **and**
`gate-execution-audit-negative.mjs`, which spawns it, and prints the exclusion
rather than quietly narrowing the count. Checked here because a gate reporting a
smaller number than it claims is the shape of the defect this system hunts.

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 87. "6,479 visible strings" was 39% Tailwind

§86 left a blind spot named but unclosed, and while measuring it produced a
number worth checking: roughly two fifths of everything the gate scans is not
copy at all.

`visibleStrings` returns every string literal and tags it `kind: "string"`.
`markdownProse` returns prose. A `className="flex size-8 items-center
bg-blue-50"` value is therefore indistinguishable from the sentence `"No
telephony ships in this build"` — same extractor, same kind, both handed to
every rule in `CHECKS`.

Across all 33 gated surfaces, on the gate's own pipeline:

| | Count |
|---|---|
| scanned units (what the gate reported) | **6,479** |
| Tailwind class literals | **2,532** |
| actual copy | **3,947** |

**39.1%.** So the quantity named "visible strings" — printed by
`ai-disclosure`, recomputed by `docs-claims-drift`, and quoted in this document
and in `docs/TESTING.md` — overstated real copy by more than a third, and had
done so for as long as it existed. Nobody reading 6,479 had any way to know that.
This is §85.4's lesson applied to a number rather than a claim: **a count that
looks impressive is a reason to check what it counted.**

Checked before claiming it: `PROJECT_STATUS.md` and `README.md` do **not**
quote this figure — a first draft of this section said they did, and grepping
for it found the number in exactly two files. `SYSTEM_AUDIT.md` quotes it many
times, in phases from §59 to §85; those are point-in-time records and are
annotated at §81.6 rather than rewritten.

### 87.1 What was fixed, and what was deliberately not

`classLiteralRanges(src)` is exported from `lib/site/security-claims.mjs`.
`visibleStrings` now tags class literals `kind: "class"` — a new kind value, the
same three fields, so the shape every caller already destructures is unchanged.

Two gates opt in and skip them: `ai-disclosure` (both loops) and
`docs-claims-drift`. Both now report **3,947**, which is the point — §82 was
about two gates deriving one named quantity differently, and both of these print
a line called "visible strings".

Four other callers (`blog-claims-subject`, `claim-coverage`,
`gated-render-closure`, `scoping-regression`) still receive class literals and
were left alone. They report **claim counts**, not string counts, and a class
literal contains no banned term today, so no figure they print changes either
way. Opting them in would move their numbers for no gain and would need its own
verification; that is a decision left visible rather than made silently.

### 87.2 The safety question, asked non-vacuously

The first safety check was worthless and is recorded because of that. It asked
"are there findings inside class literals today?" and the answer was **0** — but
the main loop reports zero findings today anyway, so the check could not fail.
§83's rule: a test that cannot fail is not a test.

The real question is a raw term match, because that is what the inventory loop
uses:

> **Banned-term matches inside class literals: 0** (raw `term.test(value)`,
> across all 15 rules, all 33 surfaces).

So excluding class literals removes no verdict on any current input. The
counterfactual is the part that could bite, and it is a decision rather than an
accident:

| Planted in a `className` | Matched rule | Today | After |
|---|---|---|---|
| `border-telephony-500 shadow-xs` | `telephony` | flagged | silent |
| `text-worm-700 p-2` | `worm` | flagged | silent |

That is intended — §81 established that an identifier is a name and not a
claim, and a design token is the same kind of thing. But it is a coverage
reduction, so it is written down rather than left as a side effect.

### 87.3 Four probes, both directions, and proof they can fail

A filter that only ever removes things is a filter nobody can trust. The
dangerous direction is the one that makes the gate *easier* to pass, so the
probes are built around it, with synthetic fixtures — not the shipped strings
that exposed the bug:

| Probe | Expects |
|---|---|
| banned term in `className="…"` | `kind: "class"` — not copy |
| banned term inside `className={cn("…")}` | `kind: "class"` — not copy |
| banned term in `aria-label="…"` | `kind: "string"` — **still scanned** |
| banned term in `title="…"` | `kind: "string"` — **still scanned** |
| planted claim in an `aria-label`, run through `findClaims` | must still be detected |

Proved alive by mutation, not by inspection: blinding `classLiteralRanges` to
return `[]` makes the two `class`-expecting probes fail and the gate exits 1;
restoring returns exit 0. The two `string`-expecting probes correctly do *not*
fire under that mutation — they guard the opposite direction.

A probe whose fixture cannot be extracted reports *"the probe proves nothing"*
rather than passing silently, the same guard §81 added.

### 87.4 Two counters that could not both be true

The first run of the new gate printed:

```
33 security surfaces / 3947 visible strings (2765 class literals excluded, §87)
```

3,947 + 2,765 = 6,712, and the pre-change total was 6,479. Two numbers in one
line of output that do not reconcile is the §82 defect again, in a third place:
`classLiterals` was incremented **before** `isNonCopyLiteral`, so it counted
literals the identifier filter would have discarded anyway, and the two counters
described different sets.

Reordered so the identifier filter runs first. They now partition exactly:

> **3,947 copy + 2,532 class = 6,479** — the pre-change total, recovered from
> the post-change measurement. That is the check that the filter moved nothing
> except class literals.

### 87.5 Residual and cost

**82 findings across 10 files — unchanged.** The NOT VERIFIED inventory is
byte-identical before and after, because no class literal contained a banned
term to begin with.

Real cost, stated plainly: the number this repository has been quoting as
"visible strings" was wrong by 2,532 and is now right. Every consumer of that
number moves, and `docs-claims-drift` — the gate whose whole job is stale
numbers — caught the documentation the moment it changed:

```
✖ docs/TESTING.md:54  [visible strings] says 6479, measured 3947
```

which is the failure mode working as intended, on a real stale claim, in this
repository, caused by this change.

### 87.6 Still not shipped: the count rule

§86 narrowed the count rule's blocker to referent identification, and §87
neither solves nor worsens it. `All 18 Products` (three renderings) matches
`bitsProducts.length === 18`; `3 Presets Available` needs checking; `11 – 50
Reps & Agents` is a tier boundary that a naive rule would read as "there are 11
reps". The class/prose half is now sound and the referent half is not.

### 87.7 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 33 gates, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 files, 0 stale, 3,947 |
| `node lib/site/ai-disclosure.selfcheck.mjs` | **PASS** — 33 surfaces / 3,947 strings / 2,532 class excluded / 82 findings, exit 0 |
| §87 probe mutation | **PROVED** — classifier blinded ⇒ 2 probes fail, exit 1 |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 88. Twelve hand-typed counts, six of them wrong, none visible to any gate

§85.4 found one hand-typed count and fixed it by deriving it from `.length`.
§87.6 left the "count rule" blocked on referent identification. The attempt to
unblock it is what found this.

### 88.1 The rule did not work, and why that mattered

The obvious rule — *a number in copy that names a collection must equal that
collection's length* — was measured rather than argued, by resolving the plural
noun in each match to an array declared or imported in that file:

```
numeric+plural matches in COPY : 65
  resolvable to a LOCAL array  : 0
    agree (number === length)  : 0
    DISAGREE                  : 0
  imported-name candidates     : 0
```

**It resolved nothing at all.** Not "mostly wrong" — zero. §85.5's original
reason (class pollution) was real and is now fixed; this second reason was not
visible from inside §87's measurement and only appeared when the rule was run.

And yet the three `"All 18 Products"` strings the rule was aimed at **do not
import `bitsProducts` at all.** They are literals in components that never see
the catalogue they describe. So there is nothing to resolve *to*.

That is not a broken rule. That is the bug.

### 88.2 Six false counts, all rendering

| Site | Said | Truth | Why it is wrong |
|---|---|---|---|
| `components/sections/hero.tsx` | "Explore All 18 Engines" → `/demo` | **19** | §80 fixed this exact string in `demo-toolbar` and did not look here |
| `components/products/product-shell.tsx` | "All 18 Engines" → `/demo` | **19** | same target, same error |
| `app/(products)/crm-sales/page.tsx` | "Explore All 18 BITS Engines" → `/demo` | **19** | third site for `/demo` |
| `app/(products)/crm-sales/page.tsx` | "Open 18-Engine Showcase Matrix" → `/demo` | **19** | fourth string, same component |
| `app/demo/page.tsx` | "18-Engine Modular Micro-Frontend" | **19** | the `/demo` page miscounting itself |
| `lib/site.ts` (×2, live on `/pricing` via `solutionPackages`) | "Any 1 of our 18 Engines", "All 18 Engines Supported" | 18 **products** | right number, wrong collection — `/demo` engines are 19 |

**No gate could see any of them.** `docs-claims-drift` reads markdown only;
`ai-disclosure` asks whether copy asserts a security control, and a count is
neither; `registry-integrity` checks the registry, not what pages say about it.
The homepage hero, the shell around every product page, and the pricing page
were all asserting a catalogue size that has been wrong since at least §80.

### 88.3 Twelve sites, all fixed by deriving rather than correcting

`ENGINE_COUNT` (`lib/products/registry.ts`) and `PRODUCT_COUNT` (`lib/site.ts`)
are now computed at module load and exported as numbers — a number, not the
whole array, so a client component does not pull the catalogue into its bundle
to render a digit. Every catalogued count now reads `{ENGINE_COUNT}` or
`{PRODUCT_COUNT}`.

Two counts are derived from a **different** array, on purpose:

- `floor-showcase.tsx` *"The 6 Engines That Power…"* — its referent is that
  component's own `TABS` (`telephony, field, training, qa, messaging,
  analytics` — measured 6), **not** `PRODUCT_REGISTRY`. Deriving it from
  `ENGINE_COUNT` would have been the wrong fix. It is now `{TABS.length}`.

And two are declared exceptions in the gate rather than silently suppressed:

- `public/llms.txt` — static file served from `/public`; cannot import. Its
  "18 products" is correct.
- `public/index.md` — static, and **ambiguous**: the heading says `18-Engine`
  but the numbered list beneath it has **10** entries. 18 is the product count
  and the engine count is 19, so the noun is wrong on either reading. Not
  rewritten here — aligning it is a copy decision, not a derivation. Flagged.

### 88.4 The gate, and why it needs no heuristic

`scripts/derived-counts.mjs` fails on any hand-typed product/engine/MVP count
outside a comment. It needs no disambiguation, no referent resolution and no
noun matching, because **a derived count carries no digits**:

```
`All ${ENGINE_COUNT} Engines`   →  the pattern /\d+ engines/ cannot match it
```

Everything the rule finds is therefore, by construction, a hand-maintained
number. It scans 167 files under `app`, `components`, `lib`, `public`, and it
found a fifth false claim on its first run — the `/demo` page miscounting
itself — which the hand-written scan had missed, because that scan matched
`\s+` and this string uses a hyphen (`18-Engine`). **The written detector beat
the ad-hoc grep that preceded it.**

Two declared exceptions are printed with their reason every run. An exemption
nobody can see is an exemption the next reader has to rediscover.

`scripts/derived-counts-negative.mjs` — 5 assertions — injects hand-typed
counts into real gated files, runs the real gate, asserts a non-zero exit, and
restores byte-for-byte. Both directions: a typed count **fails**; a count
*removed* and an unrelated number stay **silent**. A no-op injection is rejected
with *"the probe proves nothing"* rather than passing silently — the first draft
of the control probe was exactly that no-op, and it was rewritten rather than
allowed to report a pass it had not earned.

### 88.5 A gate that had been vacuous for months, un-vacuumed by accident

Adding `PRODUCT_COUNT` and `ENGINE_COUNT` made `gated-render-closure` scan four
imports for the first time — it had been printing `scanned: 0` and warning that
its scan path never executed (§70's own vacuous-pass warning).

That broke `gated-render-closure-negative.mjs`, which asserted
`stats.scanned === 0`. The assertion was a **proxy**: it meant "this gated
export is treated as gated", but mechanically it asserted "the repository
imports nothing ungated anywhere". Adding two legitimate derived-count exports
broke a test without any behaviour under test changing.

§82, in a fourth place. Fixed at the root rather than by loosening the
threshold:

- `runClosure()` now returns the **identities** it scanned, and the gate prints
  them — `scanned exports: lib/site.ts#PRODUCT_COUNT,
  lib/products/registry.ts#ENGINE_COUNT`. §70's warning exists because a count
  of what was examined is how a vacuous pass hides; naming them makes it
  auditable in one line.
- The negative test now asserts the real property: the target
  `module#export` must **not** be in the scanned set, and the scan path must
  have executed. 13 → **14 assertions**.

The count was a proxy for the set. Assert the set.

### 88.6 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 35 selfchecks, exit 0 (33 audited + 2 self-reachable excluded) |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `npm run build` | **PASS** — compiled, 71/71 static pages |
| `node scripts/derived-counts.mjs` | **PASS** — 167 files, 0 unexpected, 2 declared |
| `node scripts/derived-counts-negative.mjs` | **PASS** — 5/5 |
| `node scripts/gated-render-closure-negative.mjs` | **PASS** — 14/14 (was 13) |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 files, 0 stale, 3,944 strings |

The docs gate caught both knock-on numbers this phase introduced — `33`
selfchecks and `3,947` strings — before they were committed, which is the third
time in four phases that it has caught a stale claim caused by a correct fix.

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 89. The defect does not generalise, and that is the finding

§88 fixed and gated every hand-typed product/engine count. The obvious next
move is to extend both to other countable nouns. Measured rather than assumed.

### 89.1 The residual

Re-running the `<N> <plural>` scan across the 33 gated surfaces, with
products/engines excluded as §88 handled them:

| | |
|---|---|
| distinct "<N> <plural>" claims still present | **52** |
| with a same-file array whose name matches | **0** |
| with an imported identifier whose name matches | **0** |

**Zero, again.** §88's rule found six false claims by hand and by gate; the
*general* rule finds nothing, because there is nothing to find — no other count
in this repository names a collection that exists in code.

### 89.2 Why the residual is not the same defect

The 52 are not collection sizes. By noun:

| n | noun | what it actually is |
|---|---|---|
| 10 | days | retention windows — *"14 Days"* on `/cookies` |
| 6 | seats | pricing tier bounds — *"1 – 15 Seats"* |
| 4 | hours | SLA windows — *"within 24 hours"* |
| 3 | mins | call durations in simulated telemetry |
| 3 | years | *"20 years of hands-on operations experience"* |
| 2 | gbps, cores | hardware specifications |
| 2 | principles | **BSP Circular 454 and 857** |
| 1 | series | **SEC MC No. 18 Series of 2019** |

A retention period is not a length. `857` is a regulation. `Series of 2019` is a
legal citation. Demanding these equal an array length would be nonsense, and a
rule that fired on `18 Series of 2019` would be the "gate that fires on
`items-center`" §87 refused to ship.

**§88 worked because `PRODUCT_COUNT` and `ENGINE_COUNT` have a single,
unambiguous, code-resident referent that the repository owns.** That is the
whole reason its gate is scoped to those two nouns, and the measurement is the
justification for the scope rather than a limitation of it.

### 89.3 The one the machine could not find and a human did

§87.6 left an explicit to-do: *"`3 Presets Available` — must be checked."*

Checked: `hardwareScopingTiers` (lib/site.ts) has **exactly 3** entries, and
`deployment-models.tsx` imports it and renders it in a `grid-cols-3` directly
beneath the badge. **The claim was true.** It was hand-typed, with its referent
sitting in the imports of the very file that made the claim — and §88's noun
matcher could not see it, because "presets" does not appear in the name
`hardwareScopingTiers`.

That is the same resolution failure as §88.1, in miniature: the referent is
reachable but not nameable. Now derived from `hardwareScopingTiers.length`.

### 89.4 What this leaves standing

- **The residual is not machine-checkable, and that is recorded rather than
  hidden.** No gate can assert that "20 years" or "24 hours" or "Circular 857"
  is right; those are claims about the world and about regulation, and this
  repository has nothing to compare them against. Adjudicating them is the
  owner's, exactly like the out-of-repo product lines.
- **`docs-claims-drift` still covers the markdown half** of that surface, which
  is why the two static `/public` exceptions are the only hand-typed counts
  `derived-counts` reports.
- The general lesson, and the sixth time this pattern has appeared: **a rule
  needs a code-resident referent to be checkable at all.** Derive the count when
  one exists; when none exists, say so and stop — do not build a rule that
  resolves nothing and call it coverage.

### 89.5 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 35 selfchecks, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/derived-counts.mjs` | **PASS** — 2 declared exceptions, 0 unexpected |
| `node scripts/docs-claims-drift.mjs` | **PASS** — 48 files, 0 stale, 3,943 strings |
| §89 residual scan | **MEASURED** — 52 claims, 0 with a code-resident referent |

Deriving §89.3's preset count moved the visible-string figure from 3,944 to
**3,943**, and `docs-claims-drift` flagged `docs/TESTING.md` for it before
commit — the fourth time in five phases it has caught a stale number caused by
a correct fix. §88.6's `3,944` is left as that phase's record.

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 90. Three attempts to audit the gates, three wrong answers

The repo has asserted its own standard since §70, and `ai-disclosure`'s header
carries it in code:

> *"A gate that has only ever been seen to PASS is not evidence of anything."*
> — `lib/site/ai-disclosure.selfcheck.mjs:185`

`gate-execution-audit` proves all 35 gates execute and none is a silent no-op.
It does not prove any of them can **fail**. §90 went after that gap and got the
wrong answer three times before landing on a defensible one.

### 90.1 Attempt 1 — classify by keyword. Wrong: 25 of 35 "never shown to fail"

Scored each gate for the words `inject`, `mutat`, `negative test`, `must fail`.
Reported **25 of 35** gates as having no failure evidence.

False on its face. Three of those twenty-five are among the most thoroughly
negative-tested files in the repo:

```js
assert.equal(emailSchema.safeParse("not-an-email").success, false);
assert.equal(safeAppNext("//evil.com"), "/app/dashboard");
assert.equal(rateLimit("unit-test-key", 6, 60_000).ok, false, "past the limit must block");
```

They say "this bad thing must not happen" in `assert.equal(x, false)` form.
A keyword scan cannot see that. Reporting 25/35 would have been a confident
wrong number of exactly the kind this audit exists to catch — produced by the
audit itself.

### 90.2 Attempt 2 — classify by assertion shape. Still wrong: 17 of 35

Rewrote the classifier to look for *rejection assertions* (`…, false)`,
`assert.throws`, `status !== 0`). Reported **17 of 35** with no evidence.

Still wrong, for two separate reasons, both worth recording:

- **`safe-next` asserts neutralisation, not falsity.** Its entire contract is
  that a malicious `next=` value *becomes* `/app/dashboard` — an assertion that
  bad input is handled, phrased as an equality with a safe value. There is no
  `false` anywhere in it. A rejection-shaped detector is blind to it.
- **It counted matched *patterns*, not occurrences.** The classifier tallied how
  many distinct regexes fired, so `validation.selfcheck`'s four separate
  rejection assertions counted as one. A count that under-reports its own
  evidence is §77's arithmetic bug in different clothes.

### 90.3 Attempt 3 — empirical. Wrong twice before right

Stopped classifying and broke real inputs instead. The first pass reported **4
gates could not be made to fail.** All four were the probes' fault, not the
gates':

| Probe | Why it proved nothing |
|---|---|
| `<Link href="/zzz-probe…">` in `hero.tsx` | `hero.tsx` is not in link-integrity's 7-file `linkSources`. §79's documented scope boundary. The gate was right; the probe was aimed past it. |
| an `<Image>` with no `sizes` | `image-sizes` **fails** on a disallowed `quality` and only *reports* a missing `sizes`. Not a violation. |
| near-white text in a `className` | `contrast-check` measures a hardcoded `PAIRS` table. It does not scan source for arbitrary class combinations. |
| the same `<Link>`, re-aimed at `header.tsx` | correct target — the gate failed exactly as it should. |

Each is the same lesson in different clothing: **a probe must produce a
violation of the gate's own rule**, not merely something that looks like a
defect.

### 90.4 What was actually proven

`scripts/gate-falsifiability-probe.mjs` — four gates, each broken with an input
that violates *that gate's specific rule*, each restored byte-for-byte and
verified restored:

| Gate | Injected violation | Result |
|---|---|---|
| `asset-integrity` | `<img>` naming a non-existent public asset | **exit 1** — *"references missing asset"* |
| `image-sizes` | `<Image quality={95}>`, outside `next.config`'s `[70,75,90]` | **exit 1** |
| `contrast-check` | `#ffffff` on `#fdfdfd` at a 4.5:1 minimum | **exit 1** — *"1.02 4.5 FAIL"* |
| `link-integrity` | `<Link>` to a non-existent route, in a scanned file | **exit 1** — *"route does not exist"* |

**4 proven able to fail. 0 unproven.**

The script is deliberately **not** wired into `test:unit`. It mutates tracked
files; that is safe when a human runs it to completion and unsafe as an
unattended step, because an interrupted run leaves a production file modified.
A gate that can corrupt the repository it protects has defeated its own
purpose. The correct design — a temp-copy sandbox, mutate the copy, run each
gate against the copy — is the recommended next step, and is named rather than
half-shipped.

### 90.5 What is known by construction, and what is not

Unambiguous without measurement: **7 gates have a dedicated negative test in
the suite** (`link-integrity`, `publication-docs`, `derived-counts`,
`gated-render-closure`, `blog-claims-subject`, `docs-claims-drift`,
`gate-execution-audit`). Those are proven-failable by their own construction.

Everything else is **UNKNOWN, not clean.** That is the honest state and it is
the largest remaining coverage gap in this repository: roughly 28 gates are
exercised daily, and most have never been observed to fail. None of that is
evidence they are broken — §90 proved the opposite three times — and none of it
is evidence they work.

### 90.6 The lesson, and why this is filed as a *negative* result

Three instruments, three confident wrong numbers, from one question. The
question was worth asking; the answer is not mechanically obtainable.

- **Pattern-matching gate source cannot work.** Whether a gate can fail depends
  on the shape of a violation of its *own* rule, which is semantic.
- **Guessing an injection cannot work either** — and guessing is the more
  dangerous of the two, because it yields a confident "this gate is dead" from
  a probe that was simply aimed at the wrong file.
- The only sound method is per-gate: read what that gate considers a violation,
  construct exactly that, require a non-zero exit.

So §90 ships **no new gate and no new headline number.** It ships four proven
gates, an honest UNKNOWN for the rest, a runnable probe, and a recorded false
start. Publishing "25 of 35 gates are unproven", or "17 of 35", would have been
this system's signature failure mode — committed by the system itself.

### 90.7 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 35 selfchecks, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/gate-falsifiability-probe.mjs` | **4/4 gates proven able to fail**, all restored |
| `git status` after the probe | **clean** — no file left mutated |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 91. The sandbox §90 asked for, and ten more gates proven

§90 proved four gates could fail, left roughly 28 UNKNOWN, and named the correct
design without building it: **run each gate against a copy of the tree, so an
interrupted run cannot leave a production file modified.** This is that design.

### 91.1 Why the copy is what makes probing safe

`scripts/gate-falsifiability-probe.mjs` mirrors `app/`, `components/`, `lib/`,
`public/`, `scripts/`, `docs/` and the root config/`.md files into a temp
directory, junctions `node_modules`, and runs each gate with `cwd` set to the
copy — every gate derives `ROOT` from `process.cwd()`, so it reads the sandbox
without knowing it is one.

Source files in the real repository are **never written**. §90's single reason
for not wiring this into `test:unit` — that an interrupted run leaves a
production file modified — is gone. The remaining cost is a tree copy per run,
so it stays a tool a human runs when the gate set changes, and it says so.

### 91.2 Six probes mis-aimed before the batch landed

The sandbox did not make the probes correct; it made them *safe to be wrong*.
Six of the first ten failed to demonstrate anything, each for the reason §90
already named — the probe did not violate that gate's own rule:

| Probe | What was actually true |
|---|---|
| `registry-integrity`: `demoPath: "/demo/…"` | the field is `"/(products)/crm-sales"` — the first real value, found by reading |
| `route-count-drift` ×2: `"41 routes"` then `"53 app-router paths"` | `CLAIM` matches `routes?\|pages?` — **"paths" is not in the alternation**, so no checkable claim was ever created |
| `stack-version-drift`: `16.4` | package.json declares `^16.3.8`; README quotes `16.3.8`. The line-5 badge says `16.3.5` and is an image URL — not the same violation |
| `a11y-static` ×3: `<section>`, then `<a>`, then `<button>` | `CONTROL_TAG_RE = /<(input\|select\|textarea\|Input\|Textarea\|Select)\b/` — **buttons and anchors are out of scope**. A landmark is not a control either |
| `bundle-boundary`: replacing `await import("gsap")` | the dynamic form is `import("gsap"),` inside `Promise.all`; the violation is a *static* import, which had to be added, not substituted |

Every fix was made by reading the gate's own rule, never by guessing a second
anchor. That is §90's method working, not a second method.

### 91.3 A gate that was never broken: report-only by design

`route-count-drift` kept "passing" through three attempts. Reading line 190:

```js
console.log("REPORT ONLY — exit 0 by design.");
```

**The gate was working the whole time.** It detected the injected stale count
and printed its inventory — it simply does not fail the build, which is the same
trade `ai-disclosure` makes for out-of-repo product lines.

So the probe now distinguishes two kinds of falsifiability:

- **FAIL-MODE** gates must exit non-zero.
- **REPORT-ONLY** gates are proven when their *output* contains the finding.

Asserting exit 1 against a report-only gate would have reported a defect where
there is none — the mirror image of §90's error, and just as wrong. Both classes
are now first-class in the tool.

### 91.4 Result: 10 of 10

| Gate | Violation injected | Proof |
|---|---|---|
| `asset-integrity` | `<img>` naming a non-existent public asset | exit 1 |
| `image-sizes` | `<Image quality={95}>`, outside `[70,75,90]` | exit 1 |
| `contrast-check` | `#ffffff` on `#fdfdfd` at 4.5:1 | exit 1 — *"1.02 4.5 FAIL"* |
| `link-integrity` | `<Link>` to a non-existent route, in a scanned file | exit 1 |
| `registry-integrity` | an engine's `demoPath` pointing at a 404 | exit 1 |
| `sitemap-coverage` | a bogus URL in the sitemap | exit 1 — *"37 advertised, 33 routes"* |
| `a11y-static` | a `<select>` stripped of its `aria-label` | exit 1 |
| `bundle-boundary` | a static `import { gsap }` reintroduced | exit 1 — *"no heavy client library is statically imported"* |
| `stack-version-drift` | README quoting `99.9.9` vs package.json's `16.3.8` | exit 1 |
| `route-count-drift` | a doc quoting `99 routes` | **report-only** — *"1 stale build count(s)"* |

Every case restores its file and the sandbox is deleted afterwards; the real
tree is verified untouched at the end of the run.

### 91.5 What is still unknown

**18 of 35 remain UNKNOWN, not clean.** The CRM data-layer gates
(`selectors`, `inbound-service`, `api-contract`, `safe-next`, `validation`,
`contact`, `rate-limit`, `outcome`) need `zod`/Supabase fixtures rather than a
file mutation; the scanner gates (`cookie-disclosure`, `scoping-regression`,
`rule-vocabulary-coverage`, `encoding-integrity`, `stack-version-drift`'s
siblings) each need their own mechanism read. That is per-gate work, not a
number anyone can compute.

What §91 changes is that **the remaining UNKNOWN is now a short, concrete list
with a working method behind it**, rather than an unquantified worry. Six of the
ten cases in this phase needed more than one attempt; each was fixed by reading
the rule, and none were fixed by trying harder.

### 91.6 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 35 selfchecks, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/gate-falsifiability-probe.mjs` | **10/10 proven**, 0 inconclusive |
| real tree during and after the probe | **never written** — all mutations in the temp sandbox |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 92. Four logic gates, and two harness defects found while proving them

§91 left 18 gates UNKNOWN and named the CRM data layer as needing a different
mechanism. These gates cannot be broken by editing a document or a class
string — they import the **real TypeScript module** and assert behaviour.

### 92.1 Proving a logic gate needs a per-case node flag

`selectors.selfcheck.mjs` states why in its own header:

> *"The mirror approach meant a bug in `formatRelative` passed here unchecked:
> it floored every negative delta to 1, so any record dated after the reference
> clock rendered '1h ago'."*

The mirror was the bug. So proving it requires mutating `lib/crm/selectors.ts`
— the module the gate imports — and running with `--experimental-strip-types`.
The probe gained a per-case `ts: true` flag; the mutation lands in the
implementation, not in the gate.

| Gate | Mutation | Assertion that fired |
|---|---|---|
| `selectors` | `if (diff < 0)` → `if (false)` in `selectors.ts` | *"1h ahead"* — the exact 2026-09-13 bug |
| `rate-limit` | `ok: existing.count <= limit` → `ok: true` | *"request past the limit must be blocked"* |
| `validation` | `z.string().min(6)` → `.min(1)` | 5-character password accepted |
| `safe-next` | `if (decoded.includes("..")) return fallback` → `if (false)` | traversal `next=` no longer neutralised |

`safe-next` took three attempts, and the reason is a property worth recording:
**the function has deliberately redundant guards.** Disabling the `//` check
left `/^\/app/` catching `//evil.com`, so the gate correctly stayed green. Only
the traversal guard is uniquely load-bearing for `/app/../../evil`. Redundant
security checks are the right thing to build; they just make falsifiability
harder to demonstrate, and a probe that disables one of them proves nothing.

### 92.2 The harness scored four false proofs — and its guard was also wrong

The first §92 run reported **13 proven**. Three of those — `validation`,
`selectors`, `rate-limit` — showed `node:internal/modules/run_main:107` as their
evidence. That is not a failing assertion; that is **the gate failing to load**.
They were being counted as proofs because a non-zero exit was treated as
success without checking that the gate had executed.

The cause was three lines above them: `symlinkSync(...)` for `node_modules` sat
in a `catch {}` that swallowed its error. The junction in fact worked, and the
real problem was elsewhere — but the swallow meant a future failure would have
produced false proofs silently. **A silent catch that degrades into a false pass
is worse than no catch at all.** The catch now records and reports.

Then the guard added to catch this was **itself wrong**. It matched
`node:internal/modules/run_main`, which appears in the stack trace of *every*
uncaught exception — including the `AssertionError: true !== false` the gate had
just raised on purpose. It rejected four genuine proofs and called them load
failures. Narrowed to real resolution failures only (`Cannot find module`,
`ERR_MODULE_NOT_FOUND`, `ERR_UNSUPPORTED_DIR_IMPORT`, `SyntaxError:`).

Both directions of that error are the same defect: a check that turns a true
result into a false one is as wrong as one that turns a false result into a true
one, and the first is easier to miss because it looks like caution.

### 92.3 Result: 14 of 14, and what is still unknown

| | |
|---|---|
| gates proven able to fail | **14** |
| gates reported failing when they were working | **4** (my guard, not the gates) |
| gates proven working when they were broken | **3** (the swallowed catch) |
| inconclusive | **0** |

**4 of 35 remain UNKNOWN, not clean:** `inbound-service`, `api-contract`,
`contact`, `outcome`, plus `scoping-regression` and the two remaining scanner
gates. The first four need Supabase/DB fixtures rather than a file or logic
mutation — they assert about persistence and API shape, and the honest method
is a fake client, not a source edit. That is recorded as the next concrete step
rather than approximated with a weaker probe.

### 92.4 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 35 selfchecks, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/gate-falsifiability-probe.mjs` | **14/14 proven**, 0 inconclusive, 0 false |
| real tree during and after the probe | **never written** |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 93. The last four needed no database, and my own coverage line was lying

§92 left four gates UNKNOWN with a stated reason: `inbound-service`,
`api-contract`, `contact` and `outcome` "need Supabase/DB fixtures rather than a
file or logic mutation, so they are recorded as the next concrete step rather
than approximated with a weaker probe."

**That reason was wrong, and it was wrong in the direction that preserves my own
excuse.** These four import a real TypeScript module and assert behaviour on
plain values. §92's per-case `ts: true` flag — the mechanism built for
`selectors` and `rate-limit` — applies to them unchanged. No fixture, no fake
client, no database: the mutation lands in the implementation and the real
assertion runs against it.

| Gate | Mutation (in the sandbox only) | Assertion that fires |
|---|---|---|
| `lib/contact.selfcheck.mjs` | `website: z.string().optional()` → `.max(0)` in `lib/contact-schema.ts` | `honeypot payload parses cleanly` |
| `lib/email/outcome.selfcheck.mjs` | `ok: Object.keys(failedParts).length === 0` → `ok: true` | `a bounced client confirmation must not be reported as success` |
| `lib/crm/api-contract.selfcheck.mjs` | `no-store, no-cache…` → `public, max-age=3600` | `PII responses must be no-store` |
| `lib/crm/inbound-service.selfcheck.mjs` | `let score = 70` → `let score = 0` | `baseline score` |

All four fire. The first one is the exact P0 regression
`lib/contact.selfcheck.mjs` names in its own header: *"Reverting the honeypot to
`z.string().max(0)` — the exact P0 regression it was written to catch — left it
green."* That sentence was a description of a probe nobody had run. It now has
a result.

### 93.1 CORRECTION to §92.3 — "4 of 35" was two different numbers

§92.3 closed with *"**4 of 35 remain UNKNOWN**"* and then listed **seven** gates.
Both numbers are wrong, in the way §88's counts were wrong: they were typed
rather than derived.

`35` is the number of `test:unit` **entries**, which includes 7
`*-negative.mjs` suites. A negative test is the machinery that deliberately makes
a gate fail; counting it as a gate inflates the denominator by seven. The real
gate count is **28**. And the residual after §92 was **14 UNKNOWN**, not 4.

The probe printed "14/14" at the end of §92, which is true and was enough to look
authoritative while sitting next to a wrong fraction.

### 93.2 The coverage figure is now computed, not typed

A coverage number maintained by hand is the same defect as §88's twelve typed
counts: it drifts the moment a gate is added and nothing notices. So the gate
list is read from `package.json`'s own `test:unit` — the definition of "a gate
that runs" — minus the negative suites, and the remainder is printed **by
name**:

```
coverage, computed from package.json "test:unit" (35 entries = 28 gates + 7 negative suites):
  proven able to fail   18/28
  UNKNOWN, never observed to fail   10:
    lib/site/ai-disclosure.selfcheck.mjs
    lib/site/cookie-disclosure.selfcheck.mjs
    lib/site/encoding-integrity.selfcheck.mjs
    scripts/blog-claims-subject.mjs
    scripts/derived-counts.mjs
    scripts/docs-claims-drift.mjs
    scripts/gate-execution-audit.mjs
    scripts/gated-render-closure.mjs
    scripts/rule-vocabulary-coverage.mjs
    scripts/scoping-regression.mjs
```

Printing the remainder is the point. "10 unknown" is an invitation to assume they
are fine; ten filenames is a work list.

### 93.3 And then §94's first run found the coverage line was counting failures

Printing a list is not the same as closing it. The ten above were closed next,
and the first attempt at doing so produced a result worth recording on its own:

```
§93 falsifiability: 25 proven able to fail, 1 not proven, 2 inconclusive (of 28 attempts across 28 gates).
coverage … proven able to fail 28/28  ·  UNKNOWN, never observed to fail 0
```

**`28/28` and `UNKNOWN: 0`, printed by a run in which one case had failed and two
had never executed.** The coverage line subtracted *"the gates this file has a
case for"* — a fact about the source — instead of *"the gates this run proved."*
A mis-aimed probe, a missing anchor, a mutation that did not land: all three
counted as coverage.

This is §70's vacuous pass rebuilt inside the auditor that exists to detect it.
The line added to close a blind spot became the blind spot, one level up.

`provedGates` is now a `Set` filled **only** by the branch that scores a PASS,
and the coverage figure is derived from it. The probe also exited `0` regardless
of what it printed; it now exits `1` on any attempted-but-unproven case and on
any sign the real tree was touched.

---

## 94. All 28 gates proven able to fail — and the probe proven able to report failure

§93 left ten gates named and UNKNOWN. Naming a blind spot and leaving it open is
§44's mistake in a new place: an audit that lists its own gaps invites the
reader to believe the remainder is merely *unreported* rather than unreported
**and untested**.

### 94.1 The ten, and how each was aimed

| Gate | Mutation | Rule it violates |
|---|---|---|
| `ai-disclosure` | `security-data.ts` `supervisorHUD: "Target: listen / whisper"` → `"Supervisor whisper coaching and barge-in on every live call"` | a gated surface may not assert telephony this build does not ship |
| `cookie-disclosure` | a client added to `/cookies` that no code sets | disclosure must match reality in **both** directions |
| `encoding-integrity` | mojibake injected into `hero.tsx` | no text file may carry mojibake / U+FFFD / BOM / invalid UTF-8 |
| `blog-claims-subject` | a telephony claim added to an **`isBits: true`** row | a claim about BITS may not attest an unverifiable control |
| `derived-counts` | a bare `"All 18 Engines"` in a non-exempt `.tsx` | a product/engine count must be derived, not typed |
| `docs-claims-drift` | `All **forty-two**` → `**forty-three**` in TESTING.md | a live count quoted in documentation must match the measured value |
| `gate-execution-audit` | `gated-render-closure.mjs` CLI guard forced false | every gate must exit 0 **and** produce stdout |
| `gated-render-closure` | `ENGINE_COUNT` (one of the only two ungated imports it scans) made to carry a banned attestation | copy a gated surface *renders* from an ungated module must still be scanned |
| `rule-vocabulary-coverage` | `graphql` term narrowed to a token nothing says | a rule's vocabulary must cover the phrasings copy actually uses |
| `scoping-regression` | `no` dropped from the `SCOPED_OUT` negation guard | an honest denial must stay exempt |

Three of these are aimed at the *specific* mechanism the gate uses, which is the
whole of §90's lesson:

- **`gated-render-closure`** — putting the banned claim in the gated surface's
  **own** file would have proved nothing. This gate's entire subject is imports
  the surface does not own. The claim had to go into `lib/products/registry.ts`.
- **`blog-claims-subject`** — putting it in a competitor row would have proved
  nothing either; third-party copy is out of scope *by design* and the gate says
  so in its own header.
- **`gate-execution-audit`** — reproduces §75 exactly. Forcing the CLI guard
  false makes the gate exit 0 and print nothing, which from outside is
  indistinguishable from a gate that ran and passed. The audit is the only thing
  in this repository that can catch it, and it does.

### 94.2 Three probes I had to fix, and one I had to fix twice

**The mojibake probe was broken by the corruption it was injecting.** The first
version wrote a literal corrupted em dash into `gate-falsifiability-probe.mjs`.
`scripts/` is mirrored into the sandbox, so `encoding-integrity` scanned the
probe itself, correctly reported one damaged file, and the probe **SKIPped** the
gate it exists to test. It then happened again: the fix removed the literal from
the `to:` value and pasted the same character into the explanatory comment two
lines above. **The gate was right both times and this file was wrong twice.**
There is no version of that note that may contain the corruption it describes,
so the corruption is now *built at runtime* through the same cp1252 round-trip
`encoding-integrity.selfcheck.mjs` uses in its own `corrupt()`.

This was `gate-execution-audit`'s SKIP too, with the same root cause — the audit
spawns every gate, so one gate failing in the sandbox failed the audit.

**The scoping mutation was aimed at a marker nothing depends on.** I removed
`not shipped` from the negation guard and the gate correctly stayed green. I had
guessed the marker. The markers were then **derived** — every honest denial on
the gated surfaces was extracted and attributed to the alternative that exempts
it — and `no` is the load-bearing one: *"No telephony in this build"*,
*"Illustrative — no telephony"*, *"Simulated Call (no telephony)"*, and a dozen
like them.

The probe reported that first miss as **FAIL**, not as inconclusive. That is the
property §93.3 was arguing for, demonstrated on the auditor itself.

### 94.3 The instrument is falsified too, or 28/28 is worth nothing

A probe that cannot report a bad result turns "28 of 28 gates are proven able to
fail" into a number nobody should believe. `scripts/gate-probe-selfproof.mjs`
copies the probe, **neuters cases in the copy**, and asserts the copy reports
them, exits non-zero, and stops claiming coverage:

| Injected into the COPY | The copy must |
|---|---|
| `from === to` (the mutation changes nothing) | report "not proven", exit 1, coverage drops below 28 |
| an anchor that does not exist | report "anchor not found", exit 1 |
| a file that is not in the sandbox | report "not present in sandbox", exit 1 |

The real probe is never modified; the copy runs from `%TEMP%` with `cwd` = the
repository.

### 94.4 Result

```
§94 falsifiability: 28 proven able to fail, 0 not proven, 0 inconclusive (of 28 attempts across 28 gates).
coverage, computed from package.json "test:unit" (35 entries = 28 gates + 7 negative suites):
  proven able to fail   28/28  (every gate in the suite has been observed to fail)
  UNKNOWN, never observed to fail   0:
repo untouched: yes — every mutation happened in the sandbox
```

| | |
|---|---|
| gates in `test:unit` | **28** (35 entries − 7 negative suites) |
| gates observed to fail | **28** |
| gates UNKNOWN | **0** |
| false proofs reported by the harness | **4** (§92), **1** (§93.3, mine) |
| probes that had to be re-aimed | **3** of 10, plus the mojibake case **twice** |
| real tree during and after | **never written** |

**What this does not establish.** Every gate has been observed to fail *for one
mutation this repository chose*. That is falsifiability, not correctness: it
means no gate in the suite is a no-op, a silent skip, or a check that cannot see
the defect it was written for. It does not mean any gate's coverage is complete,
and §86's measured 376-copy / 78-class separation still does not generalise to
the 52 non-derivable world claims §89 listed. Those remain the owner's.

### 94.5 Verification

| Check | Result |
|---|---|
| `node scripts/gate-falsifiability-probe.mjs` | **28/28 proven**, 0 inconclusive, exit 0 |
| `node scripts/gate-probe-selfproof.mjs` | **3/3** neutered cases reported, non-zero exit, coverage shrank |
| real tree during and after both | **never written** |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 95. Seven checks that already existed, already passed, and were never run

§94 proved 28 gates could fail. It read that list out of `package.json`'s
`test:unit` — which means it could only ever see what was **wired in**. The
question it never asked is the adjacent one: *what exists in this repository and
nobody runs?*

That is §75's failure mode with one extra step in it. A silent no-op gate is a
gate that looks like it ran. An unwired gate does not even pretend.

`scripts/unwired-checks.mjs` answers it. It walks `scripts/` and `lib/`, keeps the
files shaped like checks, and asks which are named by any npm script.

### 95.1 Seven checks, wired

| Check | What it guards | Why it was unwired |
|---|---|---|
| `lib/site/orphan-assets.selfcheck.mjs` | assets under `public/` that nothing references (§30) | never added to `test:unit` |
| `lib/theme-contrast.selfcheck.mjs` | WCAG ratios for all 12 declared theme pairs | never added |
| `scripts/production-write-guard-test.mjs` | **importing or running the seed/schema scripts cannot write to a database** (§33) | never added — a production-write guard that guards nothing |
| `scripts/image-sizes-negative.mjs` | proves `image-sizes` catches a bad `quality` (§34) | never added |
| `scripts/encoding-integrity-negative.mjs` | proves `encoding-integrity` catches corruption (§37) | never added |
| `scripts/bundle-boundary-negative.mjs` | proves `bundle-boundary` catches a static import (§42) | never added |
| `scripts/stack-version-drift-negative.mjs` | proves `stack-version-drift` catches a stale version | never added |

All seven pass; the suite goes from **35 entries to 42** (31 gates + 11 negative
suites) and `gate-execution-audit` from 33 to 40 gates.

One negative stays unwired on purpose: `production-write-guard-negative.mjs`
**mutates `apply-schema.mjs`, `seed-supabase.mjs` and `test-marketing-automation.mjs`
in place**. Wiring that into a `&&` chain means an interrupted run leaves a
production script edited. §91 built a sandbox for exactly this reason and has not
been applied there. It is recorded here rather than quietly omitted.

### 95.2 One of them had been FAILING the entire time

`scripts/image-sizes-negative.mjs` did not pass. It exited 1 with:

```
FAIL  could not inject quality={95} — the anchor changed
```

The suite mutated `hero.tsx` with `original.replace("quality={90}", "quality={95}")`.
`quality={90}` no longer exists, because **§34 was fixed by removing the prop** —
the correct modern fix, since `quality` need not be set at all. The fixture died
with the bug it was written to resurrect.

This is §93's rule with the fixture demonstrating it: *a negative test whose
fixture is the bug it exists to catch is only alive until the bug is fixed.* What
makes it a real finding rather than a curiosity is the second half: the suite was
also **unwired**, so `npm run test:unit` never ran it and never reported it. A
failing test nobody runs and a passing test nobody runs look identical from the
outside.

Fixed at the root: the anchor is now `<Image` — which `hero.tsx` cannot do without
— and `quality={95}` is written fresh as the element's first prop. It no longer
depends on a prior defect staying broken.

### 95.3 And the suite it just joined could not parse the suite's own count

Wiring those checks took `test:unit` to 42 and TESTING.md wrote "forty-two".
`docs-claims-drift` failed:

```
✖ docs/TESTING.md:24  [unit selfchecks (UNREADABLE)] says "forty-two", measured 42
```

The gate was right. §77 added number-word support as a hand-typed map running
`twelve … thirty-nine, forty`. **That map has a silent ceiling** — correct on every
count up to forty, wrong on every count above it, with nothing saying so. It was
written when the suite had 33 entries and the author extended it to 40 out of
caution; it ran out at exactly the moment it was needed.

§88's rule applies to a table of words the same way it applies to a typed count:
**derive it.** English numbers are compositional, so `parseNumberWords()` composes
them from units, tens and `hundred`. `forty-two` → 42, `one hundred and six` → 106,
and an unrecognised word still returns `null` and is still reported UNREADABLE —
because "I could not read this claim" and "this claim is correct" must stay
different answers.

### 95.4 Three more gates, and a harness that could not express them

§94's coverage is computed from `test:unit`, so the three newly-wired gates
appeared in the UNKNOWN list immediately. Two were ordinary cases. The third was
not:

**`orphan-assets` looks for a file that is NOT there.** Every case in the probe is
"mutate an existing line", and a gate whose subject is an absent file cannot be
written in that shape at all. Mutating the gate's own `NON_ASSET` list would have
proved the report *prints*, not that the detector *finds an orphan*.

The harness gained a `creates` branch: write a real orphan asset into the
sandbox, run the gate, assert the output **names it**, delete it. The real
`public/` is never touched.

The same work surfaced a wasted full tree copy — `buildSandbox()` was called
**twice**, six lines apart, each doing a complete `rmSync` + `cpSync` of `app/`,
`components/`, `lib/`, `public/`, `scripts/` and `docs/`.

### 95.5 A coverage claim that could not see a missing gate

The same limitation §94 fixed, one level up. `gate-execution-audit.mjs` asserts
*"every gate in `test:unit` exits 0 and prints stdout"*. It is structurally silent
about a check that exists and was never wired — it has nothing to iterate.
`scripts/unwired-checks.mjs` is that missing half, and it is run by hand.

Its first version classified by **path** and reported `security-claims.mjs` and
`encoding.mjs` as unwired checks. They are libraries: imported by seven gates,
invoked by nothing, and correct to be invoked by nothing. The classifier now asks
what the file *does* — reports or exits — rather than where it lives. A report
that cries wolf gets switched off, which is the mirror of §92's error.

It also answers the coverage question the audit cannot: **21 of 31 gates have no
dedicated negative suite at all** (the other 10 have one). §94 proved all 31 can
fail; a negative suite is a *standing, permanent* witness to that, and 21 gates
have none. That is now a measured gap rather than an unexamined assumption.

The first version of this very script printed `(N of 28 gates…)` with `28` typed
in — and §95 had just changed the gate count to 31. **A hand-typed count in the
tool built to inventory checks.** It is now derived from `test:unit`, which is the
same rule §95 applied to `NUMBER_WORDS` and the same rule §88 applied to product
counts: derive the number, or it will be wrong the moment the thing changes.

### 95.6 Result

| | before §95 | after |
|---|---|---|
| `test:unit` entries | 35 | **42** |
| gates | 28 | **31** |
| negative suites wired | 7 | **11** |
| gates proven able to fail | 28 | **31**, 0 UNKNOWN |
| unwired checks | 7 (unmeasured) | **1**, with a stated reason |
| failing tests nobody ran | 1 | **0** |
| `test:unit` wall time | ~11 s | ~64 s |

The time cost is real and is stated rather than absorbed: `gate-execution-audit`
re-runs every gate it audits, so each newly wired negative runs twice per
`test:unit`, and four of them write tracked files in place while doing it. The
tree was verified clean afterwards. That write window is the same one §95's
unwired `production-write-guard-negative` avoids by not being wired, and it is
the next thing the sandbox should be applied to.

### 95.7 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 42 entries, audit reports **all 40 gates executed**, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors |
| `node scripts/gate-falsifiability-probe.mjs` | **31/31 proven**, 0 inconclusive, exit 0 |
| `node scripts/gate-probe-selfproof.mjs` | **3/3** neutered cases reported, non-zero exit, coverage shrank |
| `node scripts/unwired-checks.mjs` | **1** unwired check remaining, reason declared |
| git status after the full suite | clean apart from this section |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 96. The falsifiers, and three copies of the one function nobody tested

§94 proved the gates can fail. §95 proved a negative test can be dead. Neither
says the eleven wired negative suites can tell the difference between a gate that
works and a gate that has stopped working — which is the only thing they are for.

### 96.1 Every negative suite detects its gate going blind

`scripts/negative-suite-falsifiability.mjs` runs each suite twice in the §91
sandbox: once on the untouched copy (**must pass** — a suite that was already
broken proves nothing), then with **its own gate blinded** (**must fail**).

The direction matters. Disabling the *suite* would only prove it contains an
assertion, which is trivially true. Disabling the *gate* asks the real question:
if this check stopped catching anything tonight, would this suite say so?

| Suite | Gate blinded |
|---|---|
| `link-integrity-negative` | `if (failures.length > 0)` → `if (false)` |
| `derived-counts-negative` | `if (unexpected.length)` → `if (false)` |
| `blog-claims-subject-negative` | `if (subjectClaims.length)` → `if (false)` |
| `docs-claims-drift-negative` | `if (failures.length)` → `if (false)` |
| `gate-execution-audit-negative` | `if (failing.length \|\| silent.length)` → `if (false)` |
| `encoding-integrity-negative` | `process.exit(failed === 0 ? 0 : 1)` → `process.exit(0)` |
| `bundle-boundary-negative` | same exit expression |
| `image-sizes-negative` | `if (failures.length)` → `if (false)` |
| `stack-version-drift-negative` | `if (failures > 0)` → `if (false)` |
| `gated-render-closure-negative` | the `hit` assignment inside `runClosure` |
| `publication-docs-negative` | `markdownProse`'s `cleaned.length > 3` guard |

**11/11.** Two of those needed aiming: `gated-render-closure-negative` asserts on
`runClosure`'s **return value**, so blinding its CLI exit branch would have proved
nothing (§90's error exactly); and `publication-docs-negative` audits the
extractor, not a separate gate — its subject is `markdownProse` returning an
empty list while the report prints `CLEAN — 0 file(s) scanned`, which is §59's
defect.

### 96.2 Three copies of `escapeHtml`, and a test for the one that does not exist

`scripts/unused-deps.mjs` is referenced in README.md. Reading that reference —
rather than running a tool — turned up `scripts/contact-selfcheck.mjs`, a 580-byte
file that **defines its own `escapeHtml` and tests that**, importing nothing from
the application.

It could not fail for any edit to `lib/contact.ts`. That is the failure shape
`lib/contact.selfcheck.mjs` names in its own header for §31 — *"re-declared the
implementation inline… the gate could not fail for ANY edit"* — reproduced on the
one function where a silent false negative is an injection.

A wider sweep then found **three** copies:

| Copy | Call sites | Tested? |
|---|---|---|
| `lib/contact.ts` | 10 | by the stub, against *its own* copy |
| `lib/email/templates.ts` (private) | ~32 | **no** |
| `scripts/contact-selfcheck.mjs` (its own) | 0 | wired to nothing |

`lib/email/templates.ts` builds **every transactional email this product sends** —
lead acknowledgements, internal lead alerts, booking confirmations, delivered
roadmaps, follow-ups — and **no gate of any kind touched the file**.

The reason the stub existed is concrete: `lib/contact.ts` imports through the
Next.js `@/` alias, which plain `node` cannot resolve, so a gate could not import
it. The fix removes the obstacle instead of documenting it — the escaper now lives
in `lib/html-escape.ts`, which has no imports, and both call sites route through
it. The stub is deleted, and a gate asserts there is exactly one **implementation**
(distinguished by its `.replaceAll` body, so the re-exporting wrapper in
`contact.ts` is not counted as a second copy).

`allowImportingTsExtensions` is now on in `tsconfig.json`, which is what lets Node
and TypeScript agree on a `.ts` specifier.

### 96.3 The gate reported all five builders failing, and all five were correct

The first version of `templates.selfcheck.mjs` searched each rendered email for
`/<script\b|onerror\s*=|<img\b|javascript:/i`. **All five builders failed.**

None of them was broken. Two false-positive shapes, both worth recording:

- `<img` matched the company's **own logo** in the shared header — trusted markup
  the template is supposed to contain.
- `onerror=` matched `&lt;img src=x onerror=alert(1)&gt;` — the **fully escaped**
  form. The word survives as harmless text inside an entity. That is the escaper
  working, not an injection.

Had I believed the tool instead of demanding evidence, this section would have
reported five injectable email builders. It is §90's lesson reproduced by the
auditor: **a probe that is not aimed at the real violation produces a confident
false claim.**

The rule is now exact and direction-specific: each visitor-controlled field is
filled with a **unique token** (`<n1>x</n1>`, `<e1>x</e1>`, …), and the assertion
is that **no token appears verbatim** in the html while its **escaped form does**.
That has no false positives, because it names the attacker's own string instead of
searching a document for anything resembling markup.

All 19 tokens are checked against **all five** builders — the first version
hand-listed which fields each builder renders, which is §88's enumerated-list
defect, and it was wrong for two builders.

### 96.4 Two more of my own assertions, corrected before they became findings

**A lexical rule was measured before it was trusted.** The obvious cheaper check —
scan for `${data.x}` not wrapped in `escapeHtml(` — gives **101 interpolations,
69 unwrapped**. Inspecting them shows most are correct: `subject` and `text` are
**plain text** and must not be HTML-escaped, and the rest are `BRAND.*`
constants, `score`, `i + 1` and pre-encoded URLs. An unscoped lexical rule has
almost no separation between "an injection" and "the plain-text half of the
email", and §44 already established what happens to those: switched off within a
day.

**A fixed-string subject is not an escaped subject.**
`buildClientWelcomeAutoResponder`'s subject is `"We got your note — Let's talk
about your system (BITS)"` — no visitor data in it at all. My assertion that
"the subject must contain a raw token" was wrong about the code rather than right
about a bug. The rule is now about **entities**: no plain-text header or body may
contain `&lt;`, `&gt;`, `&amp;`, `&quot;` or `&#39;`, whichever fields a given
builder happens to interpolate.

`lib/contact.ts` is the one builder that still cannot be executed by a gate, for
the `@/` reason above. Its template is checked **structurally**, scoped to the
region after `const html =` — tight enough to separate, which the unscoped
version could not do.

### 96.5 Result

| | |
|---|---|
| negative suites demonstrated able to catch a blinded gate | **11 / 11** |
| `escapeHtml` implementations | **3 → 1** |
| files importing it | 2, both asserted by a gate |
| email builders covered by any gate | **0 → 5** |
| assertions in the new gate | 24, plus 6 added to `contact.selfcheck.mjs` |
| `test:unit` | 42 → **43 entries** (32 gates + 11 negative suites) |

### 96.6 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | **PASS** — 43 entries, exit 0 |
| `npx tsc --noEmit` | **PASS** — 0 errors (with `allowImportingTsExtensions`) |
| `node scripts/negative-suite-falsifiability.mjs` | **11/11**, exit 0 |
| `node scripts/gate-falsifiability-probe.mjs` | **32/32** gates proven able to fail, 0 UNKNOWN |
| real tree during and after every probe | **never written** |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 97. The gates had never been run against the running application

Ninety-six phases have been static analysis: read the source, assert against it,
prove the assertion can fail. §96 changed `lib/contact.ts` and
`lib/email/templates.ts` — **the contact form and every email this product
sends** — and verified the change only in gates. A gate proves the function
behaves. It does not prove the form still posts.

So the application was started (`next start`, port 3847) and the two
`submitContact` consumers were exercised in a real browser.

### 97.1 What could be tested without writing to the live database

`app/actions/contact.ts` persists to the live `inbound_leads` table on the success
path and sends real email. **That path was not run.** The owner has not approved
touching production data, and a test lead would be exactly the kind of fabricated
row §33/§36 exist to remove.

Two paths are safe because the action returns before `recordInboundLead`:

| Path | Line | Result |
|---|---|---|
| honeypot filled | `contact.ts:68` | neutral success, **nothing persisted** |
| invalid input | `contact.ts:74` | field errors, **nothing persisted** |

Both were run, on both consumers:

- **Inline form** (`components/sections/contact-form.tsx`, homepage) — honeypot
  filled returned *"BLUEPRINT REQUEST RECEIVED Thank you!…"*; invalid input set
  `aria-invalid="true"` on exactly `name`, `email`, `message` with no success
  banner.
- **Consultation modal** (`components/modals/consultation-modal.tsx`, site-wide)
  — honeypot filled returned *"REQUEST RECEIVED · BLUEPRINT SCHEDULED"* and
  replaced the form with a success state.

**Verified by log, not by impression:** the server log contains **zero**
`[contact]` lines after three submissions. That line is emitted only after a lead
is persisted, so its absence is the proof. Zero console errors across the whole
session.

A suspected bug was checked and **dismissed**: the honeypot input reports as
laid-out, but its parent carries `sr-only` with `position:absolute` and a 1×1 box,
and `tabIndex=-1`. Correctly hidden. Noted because "the honeypot is visible to
users, who would be silently dropped" is a plausible-sounding finding that the
evidence did not support.

### 97.2 The one builder a gate could not reach, verified anyway

`buildInquiryEmail` is the only email builder no gate can import, because
`lib/contact.ts` resolves through the Next.js `@/` alias. §96 checked its template
structurally instead.

It was verified **behaviourally** here, using a temporary module-resolution hook
that resolves `@/` the way a bundler does, and the same unique-token technique as
the §96 gate:

```
visitor fields interpolated into html (escaped form): 10/10
visitor fields appearing VERBATIM in html          : 0
subject contains an HTML entity : no
text body contains an entity   : no
newline became <br>           : true
tag before the newline escaped : true
```

**Correct.** All ten visitor fields escaped, nothing verbatim, the plain-text
half untouched, and the newline substitution applied to the already-escaped
string. Two hook bugs on the way there are recorded because both produced a
convincing error: `existsSync` matches **directories**, so the first hook
returned `lib/site` as a file and died on `ERR_UNSUPPORTED_DIR_IMPORT`.

### 97.3 And the running site talks to a third party it does not disclose

The route sweep (`/`, `/pricing`, `/products`, `/demo`, `/login`, `/security`,
`/cookies`, `/legal`, `/products/crm`) returned **200 with exactly one `h1` on
every route**. One route produced 12 console errors:

```
net::ERR_NAME_NOT_RESOLVED   x12   →  cdn.jsdelivr.net
```

Those are environmental — this machine cannot resolve that host — but the cause
is real and site-wide. `app/globals.css` opens with five `@import url(...)`
lines pulling Geist, Geist Mono and Instrument Serif from **jsDelivr**. Measured
across `/`, `/pricing` and `/login`: **`cdn.jsdelivr.net` is the only external
host contacted by any page.**

What is true: a font CDN is not a tracker, so `/cookies` remains accurate — "no
analytics script, no telemetry beacon and no third-party tracker", "no Google
Ads, Meta Pixel, or third-party behavioral ad brokers". None of those is false.

What was missing: every page load discloses the visitor's **IP address and
User-Agent** to a third party, and the contact form's consent checkbox explicitly
binds the visitor to *"the Terms & Conditions, Form Submission Policy, and Privacy
Notice under Philippine RA 10173."* The legal page never mentions fonts, external
hosts, processors, sub-processors or data transfer. `jsdelivr` appears in exactly
one file in the whole application.

**No gate could have seen it.** `cookie-disclosure` reads cookies and
`localStorage`. `asset-integrity` reads `public/`. Nothing in this repository
inspects **outbound** hosts. This is an omission rather than a false claim, which
is precisely why §29's rule — fix in-repo false claims — did not reach it, and
why the standing rule "a false negative is worse than a false positive, because
it is silent" applies here.

**Fixed as far as it can be without network access.** The disclosure is now on
`/cookies`, naming the provider, what is sent, and what is not. **The better fix
is to self-host the fonts**, and it is recorded as the owner's decision rather
than approximated: the only Geist files available locally are inside
`next/dist/**/next-devtools/` — dependency internals, not a legitimate source —
Instrument Serif has no local copy, and this machine cannot reach the CDN to fetch
the real ones. Sourcing production typefaces out of a dependency's devtools
assets is not a change worth making to close a privacy finding.

### 97.4 Result

| | |
|---|---|
| routes checked in the running app | 9, all 200, all one `h1` |
| form submissions exercised | 3 (2 honeypot, 1 validation) |
| rows written to the live database | **0** — proven by the absence of `[contact]` in the log |
| emails sent | **0** |
| console errors from the application | **0** |
| email builders verified to escape every visitor field | **6 of 6** |
| undisclosed third-party hosts found | **1**, now disclosed |

### 97.5 Verification

| Check | Result |
|---|---|
| `next start` on port 3847 | served the current build |
| 9 marketing/auth routes | 200, one `h1`, no console errors |
| honeypot path, both consumers | neutral success, no persistence |
| validation path | `aria-invalid` on exactly the three bad fields |
| `buildInquiryEmail` with hostile tokens | 10/10 escaped, 0 verbatim |
| server log after 3 submissions | zero `[contact]` lines |

Owner decisions unchanged; nothing pushed, merged or deployed.

---

## 98. The gate that should have existed in phase 1

§97 ended with a structural blind spot written in plain words: **no gate in this
repository had ever looked at an outbound request.** `cookie-disclosure` reads
cookies and `localStorage`; `asset-integrity` reads `public/`; nothing else looks
outward. That is why a third party could receive every visitor's IP address for
ninety-seven phases without anything noticing.

A finding that no gate can see is a finding that recurs. So
`scripts/external-requests.mjs` was built, and its negative test with it.

### 98.1 "Any remote URL" is not the class — it is five classes

A static scan of the shipped source finds **18 distinct hosts**. Treating them as
one class produces a report nobody reads, which is §44's outcome arriving on
schedule. Measured, they are:

| Class | Hosts | In scope? |
|---|---|---|
| browser fetches it without user action | `cdn.jsdelivr.net` | **yes** |
| user-clicked links | `cal.com`, `github.com`, `facebook.com`, `instagram.com`, `linkedin.com`, `x.com` | no — nothing is disclosed until the visitor clicks |
| identifiers, never fetched | `schema.org` (JSON-LD `@context`), `www.w3.org` (XML namespaces) | no |
| server-side services | `api.resend.com`, `*.supabase.co` | no — runs in Node, so the visitor's address is not disclosed |
| gate fixtures, never shipped | `bits.example`, `meet.example`, `evil.com`, `spam.example` | no |

The rule is therefore **positional, not lexical-by-host**: only URLs the browser
*fetches* — CSS `@import` / `url()`, `<link href>`, `<script src>`, `<img src>`,
`fetch(`.

### 98.2 Separation measured, not assumed

```
subresource positions : 11 URLs across 2 hosts
anchor control        : 12 URLs across 6 hosts — none of them flagged
```

That control is not a formality. It is what makes the rule usable, and it earned
its place immediately — see §98.4.

### 98.3 What the gate asserts

1. **Every subresource host is declared**, with a scope and a reason. Adding an
   entry is a decision, not a suppression. An undeclared host **fails the build** —
   the §97 case, mechanically.
2. **A `client`-scope declaration must be backed by an actual disclosure.** The
   named file must exist *and mention the host*. A declaration no disclosure
   backs is a claim, not a fact — which is exactly the §97 defect.
3. **A `server`-scope host must not sit in a `"use client"` module**, and no
   `"use client"` file may import it directly. This is a **one-level** check and
   says so; transitive reachability is not attempted and is not claimed.

The site's own host is **derived** from the `NEXT_PUBLIC_SITE_URL` fallback in
`lib/site.ts`, not typed into the gate — a duplicated domain is a third copy to
forget to update.

Today it reports two hosts: `cdn.jsdelivr.net` (client, fonts, disclosed on
`/cookies`) and `api.resend.com` (server, email API).

### 98.4 The negative test caught two real defects in the gate

`scripts/external-requests-negative.mjs` builds **synthetic fixture trees** in
`%TEMP%` and honours `BITS_ROOT`, so it writes **nothing** to the repository —
the §96 problem with in-place negatives does not apply here. Fixtures are invented
hosts and invented CSS, so they survive any future edit to the real application
(§93's rule: never fixture a negative test from the shipped string).

Its controls found:

**A case-insensitive `<link>` regex was matching Next's `<Link>`.** The first
version used `/<link\b[^>]*href=…/gi`, and in JSX that matches `<Link href="…">`
— Next's Link component, which renders an **anchor**. Every social link and
`cal.com` would have been reported as an undeclared subresource. Not cosmetic: it
would have put the entire external-link surface into the failure list. The rule
is now case-sensitive, because lowercase `<link>` is the real HTML void element
and uppercase `<Link>` is a navigation.

**The gate printed its green tick over an empty tree.** §70 exactly: a check that
examined nothing is indistinguishable from one that passed. It now prints the same
`⚠ NO … FOUND — the scan path did not execute` warning `gated-render-closure`
prints, and the green line is suppressed when nothing was scanned.

Two of the negative test's own fixtures were also wrong before they were right —
they ran against the gate's hard-coded declaration table and so reported fixture
hosts as undeclared for entirely the wrong reason. `BITS_DECLARATIONS` now
overrides the table for the test; the repository never sets it.

### 98.5 And the probe mutation was wrong first

The falsifiability case for this gate began as
`if (failures.length)` → `if (false)` on the gate itself. That is **backwards for
a negative gate**: disabling the failure path makes it exit 0, and the probe reads
exit 0 as "did not detect the injection" — it would have reported a red result as a
green one.

To prove a gate that asserts an absence, the probe has to **break the rule, not
break the reporting**. The case now injects a real `@import url("https://zzz-probe-
undeclared.example/…")` into `app/globals.css` in the sandbox, and the gate must
go red naming it.

### 98.6 Result

| | |
|---|---|
| hosts in scope (browser, no user action) | **2**, both declared |
| hosts excluded by position | 16 |
| assertions in the gate | declaration + disclosure backing + server-scope reachability + a §70 vacuity guard |
| negative-test cases | **14/14**, including 3 controls |
| real tree written by the negative test | **no** |
| `test:unit` | 43 → **45 entries** (33 gates + 12 negative suites) |

### 98.7 Verification

| Check | Result |
|---|---|
| `node scripts/external-requests.mjs` | PASS — 2 hosts, 0 undeclared |
| `node scripts/external-requests-negative.mjs` | **14/14**, exit 0 |
| `node scripts/gate-falsifiability-probe.mjs` | **33/33** gates proven able to fail, 0 UNKNOWN |
| `npm run test:unit` | PASS — 45 entries |
| `npx tsc --noEmit` | PASS — 0 errors |

Owner decisions unchanged; nothing pushed, merged or deployed.

## 99. Every gate now has a falsifiability witness, and two guards that could never have fired

### 99.1 The gap

`scripts/gate-falsifiability-probe.mjs` is the only thing in this repository that
has ever demonstrated that the gates can fail. It is deliberately **not** wired
into `test:unit`, because it copies `app/ components/ lib/ public/ scripts/
docs/` into a sandbox and re-invokes every gate — minutes, on every suite run.

So its coverage number existed only in its own stdout, produced when a human
remembered to run it. §95 found `production-write-guard-test.mjs` sitting green
and unwired; this is that failure one level up. A gate added on a Friday
afternoon would have shipped with nobody ever having tried to break it, and the
suite would have said nothing.

### 99.2 The gate

`scripts/falsifiability-coverage.mjs` closes it. The probe now exports `CASES` and
puts its run behind a CLI guard, so importing it costs one small file read and
builds no sandbox. The new gate reads **that same array** — not a second list
that could disagree, which is §93's rule — and compares it to the gates parsed
out of `package.json`'s own `test:unit`.

Importing is genuinely free, and that was measured rather than assumed: the
import prints `sandbox NOT built on import: true` and returns 34 cases in
milliseconds.

### 99.3 Three drift directions, not one

A one-way check would have been the obvious thing to write and would have missed
the direction that actually bit:

1. **A gate with no witness.** The core rule.
2. **A witness for a gate that is no longer in `test:unit`.** §95's shape. The
   probe would happily `node <that gate>` and report PASS, so coverage would sit
   at 100% while proving a check the suite never executes. This is precisely how
   `production-write-guard-test.mjs` sat green and unwired for phases.
3. **A case that cannot run**, wearing a gate's name.

Plus §98's defect in a new place: an empty `test:unit` is **refused**, not
passed. A gate reading a list that has lost every entry would otherwise print a
clean 0-of-0.

`to: ""` is treated as a legal delete-mutation, checked by **type** rather than
truthiness. The first version of this predicate reported `a11y-static` as
malformed — the check being wrong about a correct case — and it is now pinned by
a control in the negative test so it cannot regress.

### 99.4 Negative test — 6/6, two of them controls

`scripts/falsifiability-coverage-negative.mjs` builds synthetic trees in `%TEMP%`
via `BITS_ROOT` / `BITS_CASES` and writes **nothing** to the repository (§98's
pattern, for §98's reason).

| Case | Expectation |
|---|---|
| CONTROL — fully covered tree | exit 0 |
| a gate with no witness | exit 1, names the gate |
| a witness naming a gate not in `test:unit` | exit 1, names it |
| a case with no `file`/`from`/`to` | exit 1, "cannot run" |
| `test:unit` with no gate entries | exit 1, VACUOUS |
| CONTROL — `to: ""` is valid | exit 0 |

The controls are load-bearing, not decorative: without the first one, a gate that
failed on *every* input would pass all four negative cases and this suite would
be worth nothing.

### 99.5 The gate is witnessed by itself

`falsifiability-coverage.mjs` is a gate, so §99's own rule applies to it: it has
a probe case. The mutation deletes a whole case from `CASES` in the sandbox,
which is exactly "a gate that runs in the suite with nobody able to break it".
The probe now reports **34 cases against 34 gates**, and the mutation drops it
to 33 and exits 1.

### 99.6 CORRECTION — §92's junction guard was decorative, and then unreachable

`buildSandbox()` catches `symlinkSync` failure and assigns `junctionError`. That
variable was **read nowhere**: two occurrences in the file, the declaration and
the assignment. The comment directly above it reads

> *"A silent catch that degrades into a false proof is worse than no catch."*

three lines above a catch that was silent in exactly the way the comment
condemns. §92's per-case `loadError` regex is what actually caught the false
proofs; the junction error was decoration. A check that is claimed in prose and
absent in code is the same defect this audit exists to find, and it was sitting
in the auditor.

Wiring it was not enough. **Windows creates a junction to a non-existent target
without complaint.** `symlinkSync` returns, nothing throws, and `existsSync` on
the link is then `false` because the link dangles. So the `catch` could not fire
for the failure it was written to detect: running from a directory with no
`node_modules` produced a **dangling** junction, every gate importing
zod/motion failed to load, and the probe printed nothing at all.

That is §92's exact failure — silent degradation into a false proof — re-entering
through the guard added to prevent it. It survived seven phases because the code
reads correctly and the platform does not behave like the reading.

The fix is `statSync` on the link, which follows the reparse point and does
throw. Verified against the real failure environment:

```
⚠ sandbox node_modules junction FAILED (ENOENT: … stat '…\node_modules')
  Gates that import zod/motion cannot be proved in this environment.
  Any SKIP below may be this, not a bad anchor.
```

**This one cannot be proved by source mutation** — removing the check makes the
probe *silent*, so a mutation asserting "the message appears" would fail for the
right reason and teach nothing. `gate-probe-selfproof.mjs` therefore reproduces
the **environment** (`ROOT` is `process.cwd()`, so a directory holding a
package.json but no node_modules is the failure exactly), and pairs the positive
with a control that blinds `statSync` and requires the same run to go silent. If
the blinded copy still reported, the guard would be doing nothing and the
positive would prove nothing either.

Note the exit code is deliberately **not** the evidence there: an empty sandbox
leaves all 34 gates unwitnessed, so the probe exits non-zero either way.

### 99.6a The control matched the temp directory, not the guard

The junction control is worthless if it cannot tell the two outcomes apart. The
first version asked "does the output contain `junction`?" and the blinded copy
**passed** — because the probe file is written inside a temp directory I had
named `bits-junction-selfproof-*`, so the word appeared in its own path.

The control was proving the temp path, not the guard. Fixed on both sides: the
directory is `bits-sbx-selfproof-*` and the assertion is the guard's exact
message, `sandbox node_modules junction FAILED`. A control that cannot
distinguish the outcomes is decoration, and it reported success while measuring
nothing — §70's failure mode, in the one place whose job is to detect it.

It then passed **vacuously** for a different reason. With both the guarded and
the blinded copy crashing on import for an unrelated reason (§99.8), "the blinded
copy reported nothing" was true and meant nothing. The control now refuses to
evaluate unless the positive above actually fired, and says so.

### 99.6b A crash I misdiagnosed, and what it actually was

Two runs of the probe were in flight at once — a background self-proof and a
manual check — and the manual one died with
`EPERM: Permission denied … bits-falsifiability-sandbox` on `buildSandbox`'s
**first** line, the `rmSync` that clears the previous run's tree.

The obvious reading was that §99.6's dangling junction had poisoned the sandbox:
a reparse point that cannot be resolved, breaking recursive deletion, every
subsequent run dead on arrival. That is a serious-sounding failure and it would
have gone into this document as a finding.

It is not what happened. An isolated test — nothing else running — showed
`rmSync(SANDBOX, { recursive: true })` **succeeds** against a dangling junction
on this Node version, that `lstatSync` sees the link itself even though
`existsSync` does not, and that unlinking the junction alone also succeeds.

The real cause is simpler and is a genuine defect: the sandbox path was a
**fixed** `%TEMP%` location, so two concurrent probe runs both rebuild it and
corrupt each other. It is now per-process
(`bits-falsifiability-sandbox-${process.pid}`). The cost is one directory per
run, left behind if a run is killed — the right trade for an instrument whose
whole value is not lying about what it measured.

Isolating before reporting is the only reason this is a one-paragraph correction
rather than a false claim in the audit. "EPERM on a recursive delete near a
junction" has an obvious, plausible, wrong explanation, and it was wrong.

### 99.7 CORRECTION — `gate-probe-selfproof.mjs` had been silently red since §95

Found while fixing §99.6. Its second mutation pinned

```js
from: "All **forty-two** are dependency-free",
```

which is the probe's `docs-claims-drift` anchor — and the count moves every time a
gate is wired. It broke at 42 → 43 → 45, went red on the first break, and said
nothing because §95's rule keeps it out of `test:unit` (each case runs a whole
probe). §95's pattern exactly: a check that existed, and was never run.

The fix is structural rather than another re-typed number, and it took **two**
passes. §99 made the probe importable, so the first attempt read the anchor from
the probe's own `CASES` and string-replaced that literal in the probe's source —
and went **red on its own fix**, because §99.8 had already replaced the literal
with `from: DOCS_COUNT_CLAUSE,`. The value is real; the literal is not there any
more. The mutation now targets the *structure* — the variable reference, whose
name does not change when the count does.

Two failures in one phase, both invisible until something was actually run. That
is the argument for the whole apparatus rather than against it.

### 99.8 The same anchor in the probe is now derived too

`gate-probe-selfproof.mjs` was the *fourth* thing to break on this literal. The
probe's own `docs-claims-drift` case pinned `forty-five`, so §99's two new
entries would have broken it a fifth time. It now reads the clause out of
`docs/TESTING.md` and replaces the count with `"fifty"` — as good a lie as
`forty-six`, and one that cannot drift.

**It does not throw when the file is missing**, and that took one more
correction. The first version threw, which made the module unimportable from
anywhere but the repository root — and the junction self-proof runs the probe
from a directory holding only a `package.json`, to reproduce a sandbox with no
`node_modules`. The self-proof's junction check was then *passing for the wrong
reason*: the throw printed the probe's own path, and that temp directory was named
`bits-junction-selfproof-*`, so a `/junction/i` assertion matched the error
message. Tightening the regex exposed the real problem underneath it.

A missing clause is now a **sentinel that is not in TESTING.md**. The case SKIPs
with "anchor not found", the probe counts it attempted-but-unproven, and
`badProbes` makes the run exit non-zero. Loud, located and stated — the same
place a stale count has always been reported, and no longer a crash on import.

Every previous break was caught: the probe reports a stale anchor and exits
non-zero instead of quietly counting itself as coverage. That is the mechanism
working. But a fixture repaired by hand every time the thing it measures grows
is a recurring cost, and it has now cost this repository twice.

### 99.9 Two mistakes in this phase's own tooling, recorded because both looked fine in the diff

Wiring the two new entries into `test:unit` was done with a throwaway script that
had the same bug twice:

- `a[0]` / `a[1]` over a loop variable that was a **string**, not an array —
  producing `node s && node c` in the chain. It parsed. It ran.
- mutating a **captured original** inside the loop, so each iteration rebuilt
  from the pre-loop value and every insert but the last was dropped. The result
  was a chain containing the negative suite and not the gate — 46 entries, 33
  gates, 13 negatives, which is *plausible* and was wrong.

Both were caught by printing the derived counts rather than the diff, and both
are the reason `test:unit` is now reported as **47 = 34 + 13** with the counts
computed in the same breath. Neither reached a commit.

### 99.10 Result

| | |
|---|---|
| gates with a falsifiability witness | **34/34** |
| probe | **34/34 proven able to fail**, 0 UNKNOWN, exit 0 |
| `falsifiability-coverage-negative.mjs` | **6/6**, including 2 controls |
| `gate-probe-selfproof.mjs` | **5/5**, up from 3 — derived anchor + junction positive + junction control |
| junction guard | was write-only, then unreachable; now `statSync`-verified and fatal |
| sandbox path | fixed `%TEMP%` location → **per-process**; two concurrent runs corrupted each other |
| real tree written by any §99 test | **no** |
| `test:unit` | 45 → **47 entries** (34 gates + 13 negative suites) |

### 99.11 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | PASS — 47 entries, exit 0 |
| `npx tsc --noEmit` | PASS — 0 errors |
| `npm run build` | PASS — 71/71 static pages |
| `node scripts/falsifiability-coverage.mjs` | PASS — 34/34 |
| `node scripts/falsifiability-coverage-negative.mjs` | **6/6**, exit 0 |
| `node scripts/gate-falsifiability-probe.mjs` | **34/34** proven, 0 UNKNOWN, exit 0 |
| `node scripts/gate-probe-selfproof.mjs` | **5/5**, exit 0 |
| `node scripts/docs-claims-drift.mjs` | PASS — 47 unit selfchecks derived |

**Still not VERIFIED by this phase:** that a witness is *aimed correctly*. A case
can point at a file that moved and prove nothing while the coverage gate still
counts it, which is why the new gate says "witness", never "proven", and prints
that distinction in its own output.

Owner decisions unchanged; nothing pushed, merged or deployed.

## 100. The suite writes nothing — measured, not assumed — and the last unwired check is wired

### 100.1 §96b's premise was false

§96b was chartered as: *"move the 4 in-place-mutating negatives into the §91
sandbox so `test:unit` stops writing tracked files."*

Measured first, before touching anything:

| Measurement | Result |
|---|---|
| 617 tracked files, SHA-256 before vs after `npm run test:unit` | **identical** |
| untracked files created | **none** |
| `git status` before / after | clean / clean |

So `test:unit` did not stop writing tracked files — it was not writing them.

### 100.2 A net diff cannot see the hazard, so the instrument had to be validated

A negative that writes a tracked file and restores it leaves **no net change**,
and a Ctrl-C between the write and the restore leaves the file broken anyway. So
the real question is not "what is left behind" but "what is wrong, even briefly".

That needs a watcher, and a watcher reporting zero is exactly the kind of result
that must not be trusted. OneDrive-backed paths are a known source of unreliable
recursive watch events, so the instrument was validated before its result was:

```
+304ms  scripts/zzz-watch-probe.tmp  [rename]
+305ms  scripts/zzz-watch-probe.tmp  [change]
+924ms  scripts/zzz-watch-probe.tmp  [rename]
POSITIVE CONTROL — watcher saw the injected file: YES
```

Then, over a real 76-second suite run: **0 raw filesystem events**. With the
detector proven able to fire in ~1ms, that zero is a real zero.

### 100.3 There was exactly one write window, and it was declared

`scripts/production-write-guard-negative.mjs` restored six original defects by
**writing three production scripts in place** — `apply-schema.mjs`,
`seed-supabase.mjs`, `test-marketing-automation.mjs` — and putting them back in a
`finally`. §95 had it right, which is why it was the one check declared
deliberately unwired.

It now runs in a sandbox: a copy of `scripts/` and `lib/` in `%TEMP%`.

**The gate under test needed no change at all.** `production-write-guard-test.mjs`
derives `ROOT` from `import.meta.url`, so the sandbox copy resolves `ROOT` to the
sandbox. That is the whole trick, and it is why §91's pattern generalises.

### 100.4 The invariant is stated as code, not as intent

Two guards, because a comment is not a constraint:

- Every mutation target is asserted to be **inside the sandbox** before anything
  runs. If anyone repoints `ROOT` at the repository, it throws naming the path
  rather than writing a production byte.
- The three real files are SHA-256'd before the run and compared after. The old
  closing check was `readFileSync(real) === original`, which proves *restoration*.
  The new one proves *never written*, which holds even if the process is killed.

### 100.5 CORRECTION — a tool claimed a universal it had not tested

Running `negative-suite-falsifiability.mjs` to see the negative-suite picture
printed:

```
coverage …: 11/13 negative suites demonstrated able to fail.
  not demonstrated here:
    scripts/external-requests-negative.mjs
    scripts/falsifiability-coverage-negative.mjs

✔ every negative suite in test:unit detects its gate stopping working.
```

The last line is a **false claim**, printed by the file whose job is to notice
exactly this. `bad` only covered suites that *had* a case; a suite with no case
cannot appear in it, because there is nothing to have failed. The check was
structurally incapable of seeing the gap, and then the closing sentence asserted
it was covered. §92's error one level down: an unknown converted into a confident
claim.

§99 had built `falsifiability-coverage.mjs` for **gates** and not extended it to
negative suites — the same blind spot re-created one file over. Both directions
are now checked, and an undemonstrated suite is a stated gap, never a pass.

### 100.6 §99's junction defect was in a second file, unfixed for seven phases

`negative-suite-falsifiability.mjs` has the same `symlinkSync` junction guard,
and the same unreachable `catch`: Windows creates a junction to a non-existent
target without complaint, so it could not fire for the failure it exists to
detect. It is now `statSync`'d there too.

That is worse here than in the probe. This file's entire subject is *"did the
suite actually run?"* — and a dangling junction would have made suites importing
zod/motion fail to load, with the module-resolution crash reported as the answer.

Its sandbox path was also fixed, for §99's shared-resource reason.

### 100.7 Coverage now spans both sides

`negative-suite-falsifiability.mjs` is importable (§99's CLI guard pattern), and
`falsifiability-coverage.mjs` reads **both** case tables. Adding three cases
closed the measured gap, and the coverage gate's own negative test grew from 6
cases to **9**, so the three new failure directions cannot be quietly removed.

| | before §100 | after |
|---|---|---|
| gates with a witness | 34/34 | 34/34 |
| negative suites with a witness | 11/13 | **14/14** |
| checks never run | 1 (declared) | **0** |

### 100.8 Result

| | |
|---|---|
| `npm run test:unit` writes to the working tree | **0 filesystem events**, watcher validated |
| `production-write-guard-negative.mjs` | 6/6 defects caught, in a sandbox, real tree byte-identical |
| declared-unwired checks | 1 → **0** |
| `test:unit` | 47 → **48 entries** (34 gates + 14 negative suites) |

### 100.9 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | PASS — 48 entries, exit 0 |
| write-watch during the suite | **0 events**, positive control fired in 1ms |
| `node scripts/falsifiability-coverage.mjs` | PASS — 34/34 gates, **14/14** negative suites |
| `node scripts/falsifiability-coverage-negative.mjs` | **9/9**, up from 6 |
| `node scripts/negative-suite-falsifiability.mjs` | **14/14** suites, 0 unknown |
| `node scripts/gate-falsifiability-probe.mjs` | **34/34** proven, 0 UNKNOWN |
| `node scripts/gate-probe-selfproof.mjs` | **5/5** |
| `node scripts/unwired-checks.mjs` | **0** unwired, 0 undeclared |
| `node scripts/docs-claims-drift.mjs` | PASS — 48 unit selfchecks derived |
| `npx tsc --noEmit` · `npm run build` | 0 errors · 71/71 |

**Still not verified:** that every witness is *aimed correctly*. Both auditors say
"witness", never "proven", and print that distinction.

Owner decisions unchanged; nothing pushed, merged or deployed.

## 101. The 19-engine demo page was never run — and it was asserting four controls this build does not ship

### 101.1 What had actually been verified

§97 ran the **marketing** surface in a real browser: nine routes, a real form
submission path, network capture, console capture. That is where the jsDelivr
font host was found — after 96 phases of gates could not see it.

The same lesson had not been applied to the rest of the site. Measured inventory:

| Group | Routes | Ever run in a browser? |
|---|---|---|
| `(marketing)` | 13 | §97 — 9 of them |
| `(products)` — the CRM demo modules | **14** | **never** |
| `(crm)` — the real CRM | 11 | never |
| `(auth)` | 2 | never |
| `demo/` + `api/` | 5 | never |

The `(products)` group is the surface the demo brief asked for: Sales, Support
Desk, Marketing Journeys, Commerce & Billing. Fourteen routes, 127 KB of page
code, and not one of them had ever been loaded.

### 101.2 All fifteen demo routes, run

`next start`, then every route visited with `waitUntil: networkidle`, recording
`performance.getEntriesByType('resource')` hosts, console errors, page errors,
`localStorage` keys and `h1` count.

| | Result |
|---|---|
| routes returning 200 | **15 / 15** |
| routes with exactly one `h1` | **15 / 15** |
| **external hosts other than our own** | **`cdn.jsdelivr.net` only** |
| **Supabase requests** | **0** |
| console errors / page errors | **0 / 0** |
| cookies set | none |
| persistence | 3 `bits_*` `localStorage` stores, no `sessionStorage` |

The demo requirement — *no Supabase, client-side, localStorage, synthetic* —
**holds**, and is now verified rather than asserted by reading imports. That is
also what static analysis would have missed: SSR HTML was clean, but only
hydration proves the browser stays clean.

Every demo module carries its own label, e.g. on
`/crm-support/tickets/TKT-1041`:

> `DEMO SANDBOX` — *"Synthetic sample data · browser storage only · no server connection"*

### 101.3 One route was not labelled, and it was the index

`/demo` — the page that presents all 19 engines as a matrix — contained **no**
instance of *synthetic*, *sample*, *placeholder* or *mock*. It read:

> **All 19 BITS Software Engines. Live Interactive MVPs.**
> "…Philippine enterprise seed data, 12% BIR tax compliance, **WebRTC softphone
> dialers**, and edge subdomain routing."
> `Universal SSO + 1-Click` · `Zero-Egress Multi-Tenant`

Against ground truth established earlier in this audit: §71 — **there is no
telephony in this build, no SSO/SAML/MFA, no tenancy.** Every one of those is a
verified-false claim, in the same class as the RBAC and WORM claims that were
corrected when they were found.

The demo modules it links to assert nothing and label everything. **The index
that presented them as a product matrix asserted the most.**

### 101.4 Why no gate could see it

`app/demo/page.tsx` was not in `SECURITY_SURFACES`. That is not a bug in the
gate — no gate scans a file it does not know about — it is a **coverage gap**,
and the gate's own rule list already contained every rule needed to catch this:
multi-tenant, SSO/MFA, telephony.

Adding one line to the list and re-running the gate:

```
✖ app/demo/page.tsx: jsx asserts the application is single-tenant; there is no
    tenant isolation to claim. String: "ENTERPRISE MULTI-TENANT SUBDOMAIN SHOWCASE"
✖ app/demo/page.tsx: jsx asserts there is no telephony in this build … String:
    "Each product is wired with Philippine enterprise seed data, 12% BIR tax
     compliance, WebRTC softphone dialers, …"
✖ app/demo/page.tsx: jsx asserts SSO and MFA enforcement are not implemented.
    String: "Universal SSO + 1-Click"
✖ app/demo/page.tsx: jsx asserts the application is single-tenant … "Zero-Egress Multi-Tenant"
```

Four findings, immediately, from rules that had existed for 90 phases. The gate
worked; nothing had ever pointed it at this file.

### 101.5 Two more the gate did *not* catch — found only by looking at the page

Correcting the flagged copy left `stillClaimsTenancy: true` on re-measurement:

- **`Subdomain Routing Architecture`** — a nav fragment. The tenancy rule needs
  an affirmative *claim sentence*; a four-word nav label is not one.
- **19 `{p.subdomain}.boundlessits.com` chips** — hostnames that do not resolve,
  printed as if they did.

Neither is in the gate's vocabulary, and neither would be without widening rules
that §44 already proved would break honest copy. So they were corrected and
**labelled in place**: the chips carry an asterisk, and a visible footnote states
that they are illustrative, that there is no subdomain routing, and that none of
the addresses resolves. The audit's standing rule — *demo behaviour is labelled,
not deleted; labels name the specific absence.*

### 101.6 The corrected page

| | Before | After |
|---|---|---|
| badge | `ENTERPRISE MULTI-TENANT SUBDOMAIN SHOWCASE` | `INTERACTIVE PRODUCT SANDBOX SHOWCASE` |
| h1 | `… Live Interactive MVPs.` | `… Local Interactive Demos.` |
| subhead | seed data, BIR tax, **WebRTC softphone dialers**, edge subdomain routing | synthetic data, in your own browser, no account, no server, nothing sent anywhere |
| card | *Subdomain Architecture* — Edge Host Rewrites · Universal SSO · Zero-Egress Multi-Tenant | *Demo Runtime* — Synthetic · in your browser · No connection · None needed · Stay on this device |

Verified in the browser after rebuild: telephony **false**, SSO **false**, and
after stripping denial sentences, **zero** residual affirmative tenancy, routing
or telephony claims — every remaining match is a disclaimer.

The residual-match check is itself worth recording: the first pass reported
`claimsTenancy: true` because my own footnote says *"there is no subdomain
routing"*. A naive detector reading a denial as a claim is the same failure the
audit has now found in three separate tools.

### 101.7 §97's font blocker is gone

§97 recorded that self-hosting the fonts was impossible because
**`cdn.jsdelivr.net` did not resolve on this machine**, and filed it as an owner
decision. Re-measured in this phase:

```
DNS cdn.jsdelivr.net -> 104.17.208.5, 104.17.207.5
https://cdn.jsdelivr.net/npm/@fontsource/geist@5/400.css -> 200, 2015 bytes
```

It resolves and serves. The blocker was a **transient network condition recorded
as a permanent one** — and nothing re-checked it, because a filed owner decision
is not a monitored one. Self-hosting is now feasible and remains the owner's
call; nothing here depends on it.

### 101.8 Result

| | |
|---|---|
| demo routes verified in a browser | **15/15**, 0 Supabase requests, 0 console errors |
| false claims found and corrected on `/demo` | **4** by the gate, **2** more by looking |
| security surfaces | 33 → **34** |
| visible strings | 3,947 → **4,008** |

### 101.9 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | PASS — 48 entries, exit 0 |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 34 surfaces, 4,008 strings |
| `node scripts/gate-falsifiability-probe.mjs` | **34/34** proven, 0 UNKNOWN |
| `node scripts/falsifiability-coverage.mjs` | PASS — 34/34 + 14/14 |
| `npx tsc --noEmit` · `npm run build` | 0 errors · 71/71 |
| `node lib/site/encoding-integrity.selfcheck.mjs` | PASS |
| browser, after rebuild | telephony false, SSO false, 0 residual affirmative claims |

**Still not verified:** the `(crm)` and `(auth)` routes, which do talk to Supabase
and were deliberately not exercised — the CRM API requires authentication, and
signing in would touch a live project.

Owner decisions unchanged; nothing pushed, merged or deployed.

## 102. The CRM auth boundary holds — and a wired gate was testing a copy of the function it protects

### 102.1 What §101 left open, and why it was still testable

§101 recorded that the `(crm)` and `(auth)` routes had never been exercised,
because the CRM API requires authentication. That was true of the *data*, but
not of the *boundary*.

`app/(crm)/app/layout.tsx` runs `supabase.auth.getUser()` server-side and calls
`redirect("/login")` when there is no session. That is a read-only auth check, so
the whole surface can be exercised with no credential, no session and no write.

### 102.2 The boundary, measured

Eleven CRM pages and four CRM API routes, unauthenticated:

| | Result |
|---|---|
| `(crm)` pages returning **307 → `/login?next=…`** | **11 / 11** |
| CRM API routes returning **401** | **4 / 4** |
| CRM data in any unauthenticated response | **0 bytes** |

Every response also carried `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Strict-Transport-Security`, `X-Robots-Tag: noindex`, and:

```
Permissions-Policy: camera=(), microphone=(), geolocation=()
```

which is the correct posture for a platform that has no telephony — and is the
browser-side counterpart of §71.

**A false positive, caught before it became a claim.** The first sweep flagged
"leak" on `/app/opportunities`, because the marker `/opportunit/i` matched the
redirect target echoed in the response body:

```
body (34 bytes): "/login?next=%2Fapp%2Fopportunities"
```

There was no leak. A detector that reads the URL it was asked about as data
inside that URL is the same failure this audit has now found in four separate
tools.

### 102.3 `/login?next=` — checked, and it is safe

`/login` takes a `next` parameter and both login actions end in `redirect(next)`,
which is the classic open-redirect shape. Tested nine payloads —
`https://evil.example`, `//evil.example`, `/\evil.example`, `javascript:alert(1)`
— and all were rejected.

`lib/crm/safe-next.ts` requires a leading `/`, rejects `//`, `://` and `..`, and
restricts the path to an allowlist. **No open redirect.** The values are
reflected into the page, but as React-escaped form fields.

### 102.4 The real finding: a wired gate tests a duplicate of `safeAppNext`

Comparing the shipped validator against the self-check that guards it:

| | allowed prefixes |
|---|---|
| `lib/crm/safe-next.ts` (shipped) | `/app`, `/demo`, `/products`, `/(products)`, `/dashboard`, `/pipeline`, `/leads`, `/cpq`, `/` |
| `lib/crm/safe-next.selfcheck.mjs` | **`/app` only** |

`safe-next.selfcheck.mjs` **defined its own copy** of `safeAppNext` at the top of
the file rather than importing the shipped one, and the copy had drifted to be
stricter.

Proved, not argued. In a sandbox containing only the self-check:

| variant | gate result |
|---|---|
| `safe-next.ts` **deleted entirely** | **PASS** |
| `safeAppNext` → `return "https://evil.example/"` | **PASS** |
| **the real shipped `safe-next.ts`** | PASS |

A gate wired into `test:unit` that stays green when the function it exists to
protect has been deleted, and green when that function redirects off-site, is a
standing false witness. **Eight of the nine prefixes the real function allows
were untested.**

This is §96's `escapeHtml` defect in a security-critical function: the code under
test was duplicated, the duplicate diverged, and the tests kept passing against
the wrong one.

### 102.5 The fix, and the re-proof

The self-check now imports the real `safeAppNext`, asserts all nine prefixes and
the traversal / protocol-relative / encoded cases against it, and carries an
**anti-vacuity assertion**: a stand-in that always returns the fallback must *not*
satisfy the suite. Without that, a validator broken in the other direction —
always falling back — would pass every rejection case while no real path worked.

Re-proved in the same sandbox shape:

| variant | before | after |
|---|---|---|
| `safe-next.ts` deleted | PASS | **FAIL** |
| returns `https://evil.example/` | PASS | **FAIL** |
| pass-through, no validation | PASS | **FAIL** |
| the real shipped file | PASS | PASS |

The gate exercises the shipped code now, and the shipped code is correct.

### 102.6 Two things found by asserting reality instead of assumption

- **`/demo?x=1` falls back.** The allowlist regex ends each prefix with `(\/|$)`,
  and a `?` satisfies neither. I wrote the assertion the other way first, on the
  assumption it should survive. It does not, and that is **safe rather than
  broken**: the only producers of `next` are `proxy.ts`
  (`searchParams.set("next", pathname)` — a pathname, never a query) and the two
  login actions' own bare-path default. Nothing depends on it.
- **The allowlist is stale against the current route structure.** It contains
  `(products)` — a route-group segment that can never appear in a URL — while
  `/crm-sales`, a **real** route (`app/(products)/crm-sales` serves
  `/crm-sales`), falls back. `/dashboard`, `/pipeline`, `/leads` and `/cpq` are
  likewise not top-level paths. This is reported, not changed: guessing the
  intended policy is not the audit's call, and relaxing it without the owner
  would be an auth change made by an auditor.

### 102.7 Result

| | |
|---|---|
| CRM pages leaking to an unauthenticated request | **0 / 11** |
| CRM APIs not returning 401 | **0 / 4** |
| open redirect via `/login?next=` | **none found** (9 payloads) |
| wired gates testing a copy rather than the original | **1 found, 1 fixed** |

### 102.8 Verification

| Check | Result |
|---|---|
| CRM boundary, 11 pages + 4 APIs | all 307 → `/login` / 401, 0 bytes of CRM data |
| `?next=` payloads | 9 tested, 0 off-site redirects |
| gate proof, before fix | passed with the shipped file deleted |
| gate proof, after fix | **fails** on 3 broken variants, passes on the real file |
| `npm run test:unit` | PASS — 48 entries, exit 0 |
| `npx tsc --noEmit` · `npm run build` | 0 errors · 71/71 |

**Still NOT verified — and deliberately so:** what an *authenticated* CRM session
can reach. Signing in would use the committed `demo@boundlessitsolutions.com`
credential against the live project, which is an owner decision (§ the blocking
item), not an auditor's. `requireCrmUser()` authenticates and never authorizes,
so per-role authorization remains unverified *and* unimplemented.

Owner decisions unchanged; nothing pushed, merged or deployed.

## 103. A gate that deleted 66 strings before it could read them — and the sweep that found it

### 103.1 From one accident to the whole class

§102 found, by accident, a wired gate testing a **copy** of the function it
exists to protect. One accidental find is not a fix — it is a sample. So the
class was swept.

For every gate in `test:unit` (34), the sweep:

1. lists the repo modules it **imports**;
2. lists the functions it **defines**;
3. looks for any locally-defined name that a shipped `lib/`, `app/` or
   `components/` module also exports — **and that the gate does not import**.

**One** candidate across 34 gates and 186 shipped modules:

```
lib/security/a11y-static.selfcheck.mjs
    imports NO repo modules
    defines stripComments() — also exported by lib/site/security-claims.mjs
```

`safe-next.selfcheck.mjs` no longer appears, confirming §102's fix.

### 103.2 The candidate was benign — but only after being measured

The two `stripComments` are genuinely different: 38 lines of character-wise
state machine versus a three-line regex. Run over all 34 gated surfaces the
first instrument reported **0 divergence and 66 strings lost**.

That number was **wrong**, and in the most embarrassing direction possible: the
instrument computed `viaRegex.filter(s => !stateSet.has(s))` — literals present
in the regex output but absent from the state-machine output. A string the regex
**deleted** is simply not in its output, so it can never appear there. The
difference was computed the one way that could not find the defect it was looking
for.

Corrected to `viaState.filter(s => !regexSet.has(s))`:

| | |
|---|---|
| gated surfaces compared | 34 |
| **files where they disagree** | **2** |
| **string literals only the state machine sees** | **66** |
| of those, literals matching a `CHECKS` rule | **0** |

So the real number was 66, not 0, and it is exactly the count the shipped swap
moved: visible strings went **4,008 → 4,062**.

### 103.3 What the regex actually got wrong

The old implementation guarded `//` with the character class `(^|[^:"'`\\])` so
the `//` in `http://` would not open a comment. It skips the **first** `//` after
a colon. It does not skip the **second**.

```jsx
<a href="https://x.dev/a//b">Immutable audit log</a>   ->  []
```

The second `//` is preceded by `a`, which matches the guard, so everything from
there to end-of-line is deleted. On two of three fixtures the extractor then
returned **no string literals at all**.

This ran **before** extraction, which is what makes it serious: the gate did not
under-report a finding, it lost the ability to look. A banned attestation placed
after such a `//` would be invisible — and nothing would report the omission.

### 103.4 Verdict, stated precisely

No gated surface today has a banned term in one of those 66 strings, so **no
verdict changed and the gate was not currently wrong**. This was a *latent* blind
spot, not a live false negative — and the honest description of a latent blind
spot in the function that decides what copy gets checked is that it becomes a
false negative the day someone edits one of those strings.

### 103.5 Fixed, and proved to discriminate

`security-claims.stripComments` is now the character-wise scanner, which tracks
string state and therefore cannot read a `//` inside a literal as a comment. It
was measured equivalent on all 34 surfaces before the swap, so this is a
correctness fix and not a behaviour change.

Five regression fixtures were added to `ai-disclosure.selfcheck.mjs`: three
assert that a banned term survives after a second `//`, and two assert that a
**real** comment — and a banned term inside one — is still removed. The second
pair matters: without it, the obvious way to "fix" this would have been to stop
stripping comments altogether.

Proved in the §91-style sandbox, with the old regex restored:

| variant | result |
|---|---|
| fixed state machine | **PASS** |
| old regex restored | **FAIL** — `stripComments DELETED "SOC 2 Type II"`, `… "Immutable audit log"` |

The tests discriminate. They are a witness, not decoration.

### 103.5a The sweep had a blind spot, and finding it mattered more than the find

`production-write-guard-test.mjs` — a **wired gate**, guarding the scripts that
write to a live database — carried its **own copy of the same defective regex**.
The sweep did not report it.

The reason is the sweep's own shape: it recognised `function NAME` and
`export const NAME`. This is neither. It is a non-exported
`const stripComments = (src) => …`. A renamed or inlined copy is invisible to it.

Measuring it before changing anything:

| | |
|---|---|
| stripped output vs the fixed version, 3 files | **byte-identical** |
| the gate's 7 stripped-source assertions | **all identical verdicts** |

So it was the same latent defect with no current impact — in the gate that stands
between a production script and a live write. It is now **imported** from
`security-claims.mjs` rather than re-declared. `security-claims.mjs` has no
imports of its own, so the coupling costs nothing.

Two copies of a scanner is how §96 found three `escapeHtml`es and §102 found a
gate testing a dead duplicate. The only durable answer is one implementation.

`derived-counts.mjs` also has its own inline strip, but it is
`^\s*\/\/.*$` — **line-anchored**, so it cannot match a `//` inside a URL at all.
Different, and safe. Left alone.

### 103.6 The a11y copy is legitimate

With that settled, the sweep's candidate is closed: `a11y-static.selfcheck.mjs`
implements its own scanner because it *is* the scanner for that rule, imports no
repo module by design, and is now identical in behaviour to the shipped one.
It is not a drifted duplicate and needs no change.

That matters as much as the finding. A sweep that only reports problems trains
readers to ignore it — the same rule §98 applied to a control case.

### 103.7 Result

| | |
|---|---|
| gates swept for copy-testing | **34** |
| candidates | 1, adjudicated **benign** |
| `stripComments` literals the gate could not see | **66**, across 2 surfaces |
| banned attestations hidden by it today | **0** |
| visible strings after the fix | 4,008 → **4,062** |

### 103.8 Verification

| Check | Result |
|---|---|
| `npm run test:unit` | PASS — 48 entries, exit 0 |
| `node lib/site/ai-disclosure.selfcheck.mjs` | PASS — 34 surfaces, **4,062** strings |
| regression fixtures vs the old regex | **FAIL as required** — names both deleted strings |
| `node scripts/docs-claims-drift.mjs` | PASS — 4,062 derived |
| `npx tsc --noEmit` · `npm run build` | 0 errors · 71/71 |

**Known limits of this sweep, stated rather than hidden:**

- It matches **named** definitions. A non-exported `const X = (src) => …` — which
  is exactly how the second instance of this defect was written — is invisible to
  it. That is a real hole in the instrument, found by reading what it missed.
- It compares by **name**. A copy that was renamed, inlined, or re-implemented
  with a different shape would not be caught.
- It is a **one-time measurement script in %TEMP%**, not a gate. Nothing in
  `test:unit` runs it, so it is a snapshot of 2026-10-09, not a standing check.

Owner decisions unchanged; nothing pushed, merged or deployed.
## §104 — Does any gate test a copy of the code it claims to protect?

### §104.1 The defect class, stated once

Three separate phases found the same shape:

| Phase | What was duplicated | Why it mattered |
|---|---|---|
| §96 | three copies of `escapeHtml` | one was a dead 580-byte stub wired to nothing |
| §102 | `safeAppNext` re-declared inside its own self-check | the shipped one allowed nine prefixes, the copy allowed one, and **the gate stayed green with the shipped file deleted outright** |
| §103 | `stripComments` re-implemented | two of the copies carried a defective regex that silently deleted 66 real strings |

The common shape: **a gate re-declares the logic it is supposed to be testing, and
then keeps passing against the wrong code indefinitely.** §102 is the sharpest
version, because that gate was not merely weak — it was provably green with its
subject absent.

### §104.2 The gate

`scripts/duplicate-implementations.mjs`, wired into `test:unit`. It parses
`test:unit`, indexes every exported name across `lib/` `app/` `components/`,
and fails on any entry that locally defines a name those modules export without
importing it. Measured on the current tree:

```
test:unit entries checked            50 (35 gates + 15 negative suites)
shipped modules scanned              186
exported names indexed               293
declared exemptions                  2
undeclared same-name redefinitions   0
```

It matches **three** definition shapes. §103's throwaway sweep matched two and so
MISSED `production-write-guard-test.mjs`'s non-exported
`const stripComments = (src) => …` — which is how a second copy of the very defect
the sweep was hunting for survived inside the sweep's own field of view. A
detector that enumerates the shapes it can see is worth more than one whose
regexes happen to match today.

`scripts/` is deliberately excluded from the index: a gate comparing itself
against other gates would flag every shared helper.

### §104.3 The four `stripComments` copies, adjudicated

| File | Verdict |
|---|---|
| `lib/site/security-claims.mjs` | the real one, exported |
| `lib/site/bundle-boundary.selfcheck.mjs` | carried §103's **exact defective regex** — now imports the shared one |
| `lib/site/image-sizes.selfcheck.mjs` | same — now imports the shared one |
| `lib/site/cookie-disclosure.selfcheck.mjs` | **deliberately different and correct** — line-anchored, so a `//` inside a URL cannot match. Declared, with that reason. Sharing would replace a safe variant with another variant |
| `lib/security/a11y-static.selfcheck.mjs` | *is* the character-wise scanner for the a11y rule. Declared, with that reason |

Verified afterwards: the only definitions of `stripComments` left in the tree are
those three, plus fixture text inside the §104 negative suite.

### §104.4 Two blind spots found while building it — and covered

**§104.1 — negative suites were excluded.** The first version skipped
`*-negative.mjs`, on the theory that a negative suite may define its own
helpers. Measured before changing anything: the exclusion costs **0 findings
either way**, and it hid a real class — a negative suite that re-declares the
shipped function is testing a copy of it, which is §102's defect with the sign
flipped. All 50 entries are now scanned.

**§104.2 — a clean 0-of-0 was passing.** The empty-`test:unit` guard catches a
tree with no gates. It did not catch a tree that *has* gates and indexes nothing:
every lookup would trivially miss and the gate would print a clean 0-of-0 with a
green tick, indistinguishable from a repository with genuinely no duplicates. A
detector that reports "nothing found" must first have found something. Added.

The first fixture for §104.2 **did not test it**: it placed the gate under
`lib/`, where it indexed itself, so the tree was not empty and the gate passed.
The fixture hid the condition it was written to create. The gate file now lives
under `scripts/`, and both halves are covered — no shipped modules, and modules
present with zero exports.

### §104.5 A fix that was built, measured, and withdrawn

The gate reports definition-shaped source **inside a template literal** as a
redefinition. The obvious fix — mask template literals before scanning — was
built, and then **withdrawn on measurement**:

- a quote-aware scanner produced **5** false "unterminated" refusals on real
  files, every one from a regex literal containing a quote
  (`body.matchAll(/^\s+id: "([^"]+)"/gm)`);
- adding regex/division tracking made it **worse** — **130 of 286** source files
  failed to mask, because JSX self-closing tags (`<br />`) make `/` look like a
  regex;
- TypeScript 7.0.2, the version pinned here, exposes **no parser** — only
  `unstable/*` AST pieces, none of which is `createSourceFile`.

So the false positive stands, documented in the gate's own header rather than
left silent. It is survivable because no entry in `test:unit` contains such a
fixture today, the negative suite's fixtures begin every line with a quote or
backtick, and **the gate's own control — it must report 0 on the real repository
— goes red the moment one is introduced, naming the file.**

Recorded because the tempting move was to ship the lexer: it would have "fixed"
the false positive and broken the gate on 45% of the tree, and the breakage is
the kind that gets blamed on something else.

### §104.6 A parser bug I wrote, and caught by round-tripping it

Generalising the probe's documented-count corruption (§99 had hard-coded
`forty-[a-z]+` → `"fifty"`, which stops being a lie the moment the count reaches
fifty) required reading the word, parsing it, incrementing, and re-rendering.

The first `parseNumberWords` added `TENS.indexOf(word)`, so **`forty-eight`
parsed as 12** and `ninety-nine` as 18 — silently, because every word *is* a known
word. A number table that is nearly right is worse than one that is absent,
because it answers confidently with the wrong number. Found by round-tripping the
parser against its own writer rather than by reading it.

Now measured over the whole range: **round-trip 0–999 clean**, **injective over
1–1000**, and the writer **refuses above its stated ceiling** rather than
inventing a word nothing can read back. Malformed input (`forty-eighteen` → 58) is
shared with `docs-claims-drift.mjs` and reported as a known leniency rather than
quietly tightened in one copy only — the property that matters, that the
corruption is never a no-op, is asserted instead.

### §104.7 Negative suite — 29/29

`scripts/duplicate-implementations-negative.mjs`, synthetic fixture trees in
`%TEMP%` via `BITS_ROOT`. **Nothing in the repository is written.** Invented
module names, so a future edit to the real `lib/html-escape.ts` cannot silently
un-teach the file (§93's rule about fixtures that are the bug they hunt).

Positives: duplicate in a gate · duplicate in a negative suite · `arrow const`
shape · `function const` shape · empty `test:unit` · nothing indexed · no
`package.json` — each asserting not just that the gate fails but that it **names
the file, the function, and the module that owns the real one**.

Controls: imports it → passes · declared exemption → passes · **the same
collision in a different file → fails** (so the exemption is not a blanket) ·
unshared local names → passes · real repository → passes.

### §104.8 Wiring, counts, and one wrong noun

`test:unit` goes **48 → 50 entries** (35 gates + 15 negative suites), inserted
immediately before `gate-execution-audit.mjs` so the audit is still last.

`gate-execution-audit.mjs` printed `✔ all 48 gates executed and reported`. The
count is derived and correct — 50 minus the two self-reachable entries — but the
**noun was wrong**: 14 of those 48 are negative suites. It now says
`48 test:unit entries (14 negative suites, 34 gates)`. §104's whole subject is
claims that do not match what was measured.

`docs/TESTING.md` moves to **fifty**, and the probe's derived anchor follows it
automatically — which is what §104.6 had to repair to keep true.

### §104.9 Verified state after this phase

```
npm run test:unit              exit 0   (audit: 48 entries executed, 34 gates + 14 negatives)
gate-falsifiability-probe      35/35 proven able to fail, 0 UNKNOWN, repo untouched
negative-suite falsifiability  15/15 suites catch a blinded gate
falsifiability-coverage        35/35 gates, 15/15 negative suites have a witness
gate-probe-selfproof           5/5
duplicate-implementations      0 undeclared
duplicate-implementations-neg  29/29
npx tsc --noEmit               0 errors
npm run build                  exit 0
```

### §104.10 What this gate does NOT claim

- A copy that was **renamed, inlined, or rewritten into a different shape** is
  not detected. It matches **names**.
- A **near-duplicate with a different name** is not detected.
- The template-literal false positive of §104.5 is **present and documented**.
- The two `DECLARED` exemptions are assertions with reasons, not measurements —
  if either reason stops being true, the table will keep saying it is.

None of these is closed by the gate existing. Each is on the list.
## §105 — The check that was red on every run and nobody ran

### §105.1 What §104 left open

§104 closed "a gate tests a copy of the code it claims to protect". The next
question was the older one: **can a file that publishes claims be omitted from
`SECURITY_SURFACES` and have nothing notice?**

§101 had already answered yes, expensively: `/demo` asserted four unshippable
controls while every gate reported clean, because no gate scans a file it does
not know about. The tool written to answer that question — `scripts/claim-coverage.mjs`,
whose own header reads *"BLIND SPOT: files NOT in SECURITY_SURFACES that contain
attestations"* — **was not in `test:unit`.**

Running it found 22 attestations across 9 banned categories in
`components/sections/products-suite.tsx`, and 14 in the ungated exports of
`lib/site.ts`.

### §105.2 Why the inventory never said so

`scripts/unwired-checks.mjs` §95 exists precisely to answer "which checks are
never run?". It reports 0. The reason is its classifier:

```js
/\.selfcheck\.mjs$|/-negative\.mjs$|^(?:lib|scripts)\/(?:site|security|products)\//|guard-test\.mjs$/
```

Classification is by **PATH SHAPE**. `history-secret-scan.mjs` matches none of
the four shapes, so it was not reported as unwired — it was not reported at all.
§95 fixed the opposite error (two libraries reported as checks, which trains
readers to ignore the report) and opened a hole where a check can be invisible.

§105 adds a third bucket, printed unconditionally — including when empty,
because a bucket that only appears when it has contents is indistinguishable
from no bucket:

```
runnable but NOT shape-matched          54
  already run in test:unit              12
  run only on demand                     7
  invoked by no npm script              35
```

It is labelled **not a verdict**: most are one-off utilities. But "we did not
look" and "we looked and it is fine" must not print the same.

### §105.3 `history-secret-scan.mjs`: unwired since §39, red on every run

It scans all 1,628 text blobs in git history — the reason being that `git rm`
leaves the blob reachable, so a clean working tree says nothing about a
credential that is still retrievable by anyone who can fetch the repository.

It exited **1** on every run. That is precisely why nobody ran it: a check that
is red for a reason nobody can action, and that nothing invokes, is
indistinguishable from a check that does not exist.

What it reports, independently and with a stable fingerprint:

| Verdict | Finding |
|---|---|
| CONFIRMED | demo account password — in `app/actions/auth.ts`, `scripts/seed-supabase.mjs`, **present in the working tree now** |
| CONFIRMED | the same value again via a second detector |
| CANDIDATE | Supabase anon key — public by design |
| CANDIDATE | Resend-shaped token inside the scanner's own classifier self-test |
| CANDIDATE | Google-shaped token in `entropy-calibration.mjs` |

The last two are **calibration fixtures**, verified by reading both sites: one
is the literal in `!PLACEHOLDER.test(<token>)`, which must be wordless and
credential-shaped to prove the placeholder filter does not over-reject; the other
is a POSITIVE sample in a script whose purpose is to measure the detector
threshold against the shapes real providers issue. Neither is a working key, and
the Resend one differs from the locally configured `RESEND_API_KEY`.

### §105.4 The fingerprint was a 32-bit FNV-1a, and it was an oracle

`redact()` hashed each secret with FNV-1a and printed `sha:<8 hex>`. Two
problems specific to a credential tool:

1. **32 bits is a small space.** With 1,628 blobs, two distinct secrets colliding
   is not exotic, and a fingerprint that conflates two credentials is worse than
   none.
2. **FNV is not a commitment.** Anyone holding the repository can compute FNV-1a
   over a *guessed* key and learn whether that guess matches something committed.
   Publishing a cheap verification oracle for secrets is the wrong trade in a
   tool whose entire purpose is handling them.

Now SHA-256, first 8 hex. The win is removing the oracle, not claiming 256-bit
identity — truncation still bounds adversarial collision resistance to 32 bits,
and the comment says so rather than overclaiming.

### §105.5 CORRECTION — a claim in my own code that the code did not make

To wire the gate it had to stop failing forever, so declared findings were added.
The table was keyed on the **detector name**, with a comment asserting:

> *"A new credential can never match a KNOWN key. The fingerprints are
> content-derived, so an unrelated key lands in `newFindings` by construction."*

**That was false.** The fingerprint was computed, printed, and never compared.

The negative suite caught it on its first run. Its synthetic Resend token was
absorbed into the calibration entry and the gate reported `0 new, 1
known/declared` — exit 0. In a gate whose entire job is noticing a credential
nobody declared, **a brand-new key of a known provider, committed anywhere, would
have passed silently forever.** The false claim was the only thing hiding it.

The key is now the PAIR `detector|fingerprint`. Two keys with the same detector
and different contents are different secrets.

### §105.6 A fixture that hid the condition it was written to create

Two more, both found by running rather than reading:

**The stale-expectation case fired on every fixture.** "A declared credential has
been removed" is meaningless against a throwaway repository that never had one,
so every synthetic fixture went red. Scoped to the home repository — derived from
the roots, not an env flag, so it cannot be switched off to hide a stale
expectation in the repository that matters. `BITS_KNOWN_STRICT` exists so that
path has a standing witness, with a control proving the flag is what suppresses it.

**The probe case defeated itself.** The probe commits a credential into its
sandbox to show the gate failing. The first run named the file and exited **0** —
because the token had by then been declared in `KNOWN` as "the probe's fixture".
Declaring it had disabled the very thing being tested. Removed, and the token is
now assembled at runtime so it never appears in the repository at all: this file
is copied into the sandbox and committed *before* any case runs, so a literal here
would always be in the baseline history.

### §105.7 The probe had to learn git

A history-scanning gate cannot be proved by a sandbox with no `.git`. The probe's
`MIRROR` list deliberately omits it, so `falsifiability-coverage.mjs` would have
demanded a case that could only ever SKIP.

So a sandbox becomes a real repository on demand (`needsGit`), and a created file
is **committed** before the gate runs — a file merely written into the working
tree is invisible to a history scan, so the probe would have watched a gate
correctly report nothing.

The first attempt failed with `git history FAILED (spawnSync git ENOBUFS)`: the
`node_modules` JUNCTION into the real tree was walked by `git add -A`. The
message named git rather than the cause. Fixed with a sandbox `.gitignore` and a
`rev-list --count HEAD` assertion, so an `init` that silently did nothing is
caught rather than leaving every history case to SKIP on an empty repo.

### §105.8 Wiring

`test:unit` goes **50 → 52 entries** (36 gates + 16 negative suites). A gate
whose failure branch is `exit 1` and a probe case that asserts `expectExit: 1` —
naming the file is not enough, because a report that names a new credential while
exiting 0 is exactly the defect of §105.5.

### §105.9 Verified state after this phase

```
npm run test:unit              exit 0
gate-falsifiability-probe      36/36 proven able to fail, 0 UNKNOWN, repo untouched
negative-suite falsifiability  16/16 suites catch a blinded gate
falsifiability-coverage        36/36 gates, 16/16 negative suites have a witness
history-secret-scan            0 new, 7 declared, 0 stale, over 1,635 blobs
history-secret-scan-negative   14/14
unwired-checks                 0 unwired; 54 runnable-but-unclassified now VISIBLE
npx tsc --noEmit               0 errors
npm run build                  exit 0
```

**7, not 8.** The eighth would have been the gate PROBE's own token. Declaring it
made the probe case defeat itself (§105.6), so it is assembled at runtime and
never enters the repository. The count is the measured one, and it is lower than an
earlier draft of this section claimed — corrected here rather than left to be
discovered.

### §105.10 A commit was required before the gate could go green, and that is
### worth stating plainly

The first full-suite run after wiring FAILED. `history-secret-scan` reported two
STALE EXPECTATIONS: the synthetic tokens declared in §105.6 were sitting in an
**uncommitted** file, and this gate reads committed blobs only. So the gate could
not go green until the change was committed, and the change could not be committed
with a green gate.

The resolution was to commit and then verify — not to weaken the stale rule, which
is correct and was reporting a true fact. Stated here because a reader
reconstructing this phase will hit the same wall, and the tempting "fix" is to
make the rule stop firing.

### §105.10 What is still open

- **The demo credential is still committed.** The gate now says so on every run,
  and says it in the summary rather than in a comment. Disabling that account is
  still an owner action.
- **`claim-coverage.mjs` is still unwired.** It found 22 attestations in
  `products-suite.tsx` and 14 in `lib/site.ts`. Wiring it is not free: its
  blind-spot section is report-only by design, and its subject is the
  out-of-repo product lines that are an owner decision.
- **35 runnable scripts are invoked by no npm script.** Three are the probe and
  audit harnesses, documented as deliberately unwired. Most are one-off
  utilities. Two are real tests that mutate tracked files
  (`ai-disclosure-injection-test.mjs`, `contact-selfcheck-injection-test.mjs`) and
  need §100's sandbox before they can be wired.
- **The KNOWN table is an assertion with reasons, not a measurement.** If a reason
  stops being true, the table will keep saying it is.
### §105.11 The repository was silently reverted on disk, and a gate is the only reason it was caught

Appending this section made `docs-claims-drift` fail with:

```
✖ docs/TESTING.md:62  [visible strings] says 4062, measured 4061
```

The obvious reading is "§105 changed something". It did not. §105 touched no
gated surface. The count had moved, and the honest next step was to find out
why rather than edit the number to match.

**Six gated files had been rewritten in the working tree, outside git:**

```
app/(marketing)/page.tsx        components/sections/hero.tsx
app/demo/page.tsx               components/sections/product-families.tsx
lib/site.ts                     lib/solutions-data.ts
```

`app/demo/page.tsx` had been reverted to a pre-§101 version — "All Products",
"OMS 360", "AI Agents", "CRM Suite", `ENGINE_COUNT` and the Truck/Trophy icons
gone, replaced by a hard-coded category list. §101 rewrote that page because a
browser run found it asserting four unshippable controls; the fix had been
committed, verified in a browser, and then undone **on disk only**. `git status`
had been clean for most of the phase, so nothing in the git history shows it.

It was caught because `docs-claims-drift` compares a documented number against a
measured one, and `ai-disclosure` prints the same number from a different code
path. Two independent derivations disagreeing is what surfaced it — §87's reason
for insisting the two must count the same set, which until now had only been
justified on principle.

Restored from HEAD (`git restore`), after confirming with
`git diff --ignore-cr-at-eol` that the change was real content and not line
endings. Both gates return to 4,062 and `docs-claims-drift` passes.

**The cause is not established.** The working tree lives under
`OneDrive/Documents`, so a sync client restoring an older copy is the obvious
candidate, but nothing here proves it. Stated as unknown rather than guessed.

Two lessons worth carrying:

1. **A gate that only checks the committed tree cannot see this.** Every check in
   this repository reads the working tree, which is what made this visible at all.
   Had the audit compared `git show HEAD:<file>` instead, it would have stayed
   green through a silent revert.
2. **A drift failure is not automatically a stale document.** The reflex — rewrite
   the number to match — would have edited a correct claim to agree with a
   corrupted tree, and the corruption would have stood.

```
restored: visible strings 4062 (both gates agree) · docs-claims-drift exit 0
```
