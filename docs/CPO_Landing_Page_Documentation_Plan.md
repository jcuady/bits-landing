# CPO Landing Page Documentation & Simplification Plan

**Author:** Principal Full-Stack Engineering (CPO review)
**Organization:** Boundless IT Solutions (BITS)
**Repository:** `jcuady/bits-landing`
**Status:** Proposal — no production code changed
**Scope:** Homepage information architecture, product routing, SEO structure, word budget

---

## Revision History

| Rev | Date | Change |
|---|---|---|
| 1 | Oct 2026 | Initial CPO review: word-count audit, OMS-first restructure, Product Index spec, `/deployment` spec |
| 2 | Oct 2026 | Structural audit added (C1–C4, M1–M4). Positioning locked: **OMS 360 is the platform; CRM and BITSagent AI are modules.** |
| 3 | Oct 2026 | Flagship shipped: `/operations-360`, `/operations-360/crm`, `/operations-360/ai` + redirects. **M1 resolved — real word count is 5,493, not 9,031.** |
| **4** | **Oct 2026** | **All strategic decisions locked** — catalog count, pricing policy, sequencing, pricing structure, extensibility model. OMS 360 capability set confirmed at **4 pillars**. Pricing-monetary-visibility audit passed. |

### Rev 2 Headline Change

Rev 1 treated **verbosity** as the problem. Rev 2 establishes that the bigger problem is **structural**: the flagship has no canonical URL, "CRM" is split across ~11 competing pages, the catalog is 22 products while all copy says 18, and there is no analytics to measure any of it.

**Word count was a symptom. Structure is the disease.**

---

## Table of Contents

### Part I — Diagnosis
1. [Executive Summary](#1-executive-summary)
2. [Current State Audit](#2-current-state-audit)
3. [Word-Count Root Cause](#3-word-count-root-cause)

### Part II — Structural Audit *(new in Rev 2)*
4. [Critical Weaknesses](#4-critical-weaknesses)
5. [Medium Weaknesses](#5-medium-weaknesses)

### Part III — Strategy
6. [Positioning Decision: OMS 360 Is the Platform](#6-positioning-decision-oms-360-is-the-platform)
7. [Target Architecture](#7-target-architecture)
8. [Deliverable A — The Platform Index](#8-deliverable-a--the-platform-index)
9. [Deliverable B — /deployment Page](#9-deliverable-b--deployment-page)
10. [Deliverable C — Word Budget](#10-deliverable-c--word-budget)
11. [Routing & Canonicalisation Plan](#11-routing--canonicalisation-plan)

### Part IV — Execution
12. [Risk Register](#12-risk-register)
13. [SEO Impact Assessment](#13-seo-impact-assessment)
14. [Action Register](#14-action-register)
15. [Decisions Required](#15-decisions-required)
16. [Appendix A — Word Count Data](#16-appendix-a--word-count-data)
17. [Appendix B — Source Content Inventory](#17-appendix-b--source-content-inventory)

---

# Part I — Diagnosis

## 1. Executive Summary

### Two Problems, Not One

| | Problem | Severity |
|---|---|---|
| **Structural** | Flagship unreachable; CRM cannibalised across ~11 pages; catalog count wrong; no analytics | 🔴 Critical |
| **Informational** | ~9,000 words / 14 sections on one page | 🟠 Medium |

Fixing the word count without fixing the structure produces a cleaner page that still ranks badly and still can't be measured.

### Current vs. Target

| Metric | Current | Target | Change |
|---|---|---|---|
| **Words on homepage** | **5,493 (measured)** | ~2,800 | **−49%** |
| Sections | 14 | 8 | −6 |
| Competing pages for "CRM" | ~11 | *pending decision* | — |
| Canonical URL for flagship | ~~none~~ → `/operations-360` | ✅ **shipped** | — |
| Products in catalog | 22 | 22 | — |
| Products claimed in copy | 18 | 22 | **reconciled** |
| Analytics events | 0 → pageviews tracked | scroll-depth → CTA | ✅ **shipped (pageviews)** |
| Share of page weight on OMS 360 | ~12% | ~74% | Flagship-first |

> **⚠️ CORRECTION (Rev 3):** The original "~9,031 words" figure was wrong. Measured from
> built HTML, the homepage renders **5,493 visible words** — the heuristic overcounted
> by **64%**. All per-section figures in [§2](#2-current-state-audit) are superseded.
> The page is over-length, but at ~2.4× a heavy enterprise page, **not ~4×** as Rev 1
> claimed. The recommended cut is correspondingly smaller: **~49%, not 73%.**

### The Positioning Decision (locked)

> **OMS 360 is the platform. BITScrm and BITSagent AI are modules inside it — not separate products.**

Consequences cascade through the entire plan. See [§6](#6-positioning-decision-oms-360-is-the-platform).

---

## 2. Current State Audit

### Homepage Composition

Source: [`app/(marketing)/page.tsx`](../app/(marketing)/page.tsx) — 14 sections, 5 phases.

```
PHASE 1 — ESTABLISH BITS
  1. Hero          2. TrustStrip
PHASE 2 — SHOW THE PORTFOLIO
  3. ProductFamilies   4. SolutionFinder
PHASE 3 — FLAGSHIP DEEP DIVE
  5. TheDifference   6. StatsStrip   7. FeaturesHero   8. FloorShowcase
PHASE 4 — TRUST & FIT
  9. Industries   10. Security   11. DeploymentModels
PHASE 5 — CONVERT
  12. Pricing   13. FAQ   14. Contact
```

### Word Count Per Section

> Measured via JSX text-node and string-literal extraction. **Heuristic — unvalidated. See [M1](#m1--the-word-count-is-not-measured).**

| Section | Words | Lines | Verdict |
|---|---|---|---|
| DeploymentModels | 1,659 | 801 | → `/deployment` |
| Pricing | 1,273 | 528 | **keep visible** (see M2) |
| FloorShowcase | 1,176 | 578 | keep — OMS deep dive |
| FeaturesHero | 747 | 460 | keep — OMS deep dive |
| TheDifference | 704 | 336 | halve |
| ProductFamilies | 668 | 350 | → replaced by Platform Index |
| StatsStrip | 591 | 419 | merge into Hero |
| Industries | 450 | 260 | → replaced |
| Contact | 437 | 230 | never cut |
| Hero | 350 | 216 | trim |
| FAQ | 279 | 182 | 6 questions |
| Security | 260 | 147 | → `/security` (exists) |
| SolutionFinder | 254 | 150 | keep |
| TrustStrip | 183 | 115 | keep |
| **TOTAL** | **~9,031** | **~4,766** | |

### Actual Catalog Inventory

The build produces **22** product pages:

```
accounting  ai-agent  booking  collections  commerce  construction  crm
hrms  inventory  logistics  marketing  nfc-card  payroll  pickleball
queuing  rag-engine  sales  service  sports-ai  sports-hub  support  white-label
```

Plus app-level routes: `/bitscrm`, `/bitsagent`, `/crm-sales`, `/crm-sales/pipeline`, `/crm-sales/leads`, `/crm-sales/cpq`, `/demo`.

---

## 3. Word-Count Root Cause

### The page has four jobs

| Job | Sections |
|---|---|
| **1. Convince** | Hero, TheDifference, StatsStrip, FloorShowcase |
| **2. Catalog** | ProductFamilies, Industries, DeploymentModels |
| **3. Procure** | Pricing, Security, FAQ |
| **4. Capture** | Contact |

> A page with one job converts. A page with four converts only for whichever audience the visitor happened to be.

### The Discovery

The catalog already exists at `/products` with 22 prerendered pages. Every word of homepage copy re-explaining a product is a word written twice.

### The Rule

> **Name everything. Explain three things.**

Rev 1 said "explain two." The platform decision makes it three: OMS 360, CRM, BITSagent AI.

| | Cost | Signal |
|---|---|---|
| Naming 22 products | ~200 words | Power |
| Explaining 22 products | ~3,000 words | Effort |

---

# Part II — Structural Audit *(new in Rev 2)*

## 4. Critical Weaknesses

### 🔴 C1 — The flagship product has no canonical URL and isn't linked to its own page

| Fact | Evidence |
|---|---|
| Operations 360 (OMS) **is** `/products/collections` | Page title: *"Operations 360 (OMS) — Top CRM for Collections Agency & Debt Recovery"* |
| The homepage links it to a **homepage scroll anchor** | [`product-families.tsx:52`](../components/sections/product-families.tsx#L52) → `/#operations-360` |
| The proxy expects **`operations-360`** | [`proxy.ts:6-7`](../proxy.ts#L6-L7) → `ops`, `operations`, `collections` → `operations-360` |
| No `/products/operations-360` route exists | Build output contains no such page |

**Impact:** Your highest-value product is the hardest of 22 to reach. Three naming conventions coexist; a prospect typing the obvious URL gets a 404, and the homepage never sends them to the page that exists.

**Fix:** Canonical `/products/operations-360`. 301 `/products/collections` → it. Repoint the homepage link off the anchor.

---

### 🔴 C2 — "CRM" is fragmented across ~11 pages competing for one head term

```
/products/crm          /products/sales       /products/support
/products/marketing    /products/service     /products/commerce
/crm-sales  /crm-sales/pipeline  /crm-sales/leads  /crm-sales/cpq
/bitscrm
+ /products/collections  ← which ALSO targets "CRM for collections agency"
```

**Live cannibalisation — same intent, multiple pages:**

| Page | Targets |
|---|---|
| [`/bitscrm`](../app/(marketing)/bitscrm/page.tsx) | "collections CRM software Philippines", "predictive dialer CRM", "debt collection software Philippines" |
| `/products/collections` (OMS 360) | "Top CRM for Collections Agency & Debt Recovery" |
| `/` (homepage) | "top crm collections agency", "crm collections agency", "debt collection software collections agency" |

**Impact:** Google splits authority across ~11 pages targeting one intent. **None ranks as well as one consolidated page would.** This is the most expensive structural problem on the site — it suppresses the flagship's head terms, which is precisely what the OMS 360 push depends on.

---

### 🔴 C3 — The catalog is 22 products; every page says 18

All marketing copy, the brandbook, `llms.txt`, and the docs claim **"18 connected engines."** The build produces 22.

**Impact:** This buyer is technical — collections ops and bank IT evaluate vendors adversarially. A countable, checkable inconsistency in the primary proof asset costs credibility precisely where you can least afford it.

**Fix:** Either reconcile copy to 22, or rationalise to a defensible number. Rationalising is better — it also reduces the catalogue the buyer has to parse.

---

### 🔴 C4 — No analytics or instrumentation

Verified: **no GA4, no Plausible, no PostHog, no Vercel Analytics, no scroll-depth tracking.** The only `scroll` references in the codebase are UI behaviours (sticky header, mobile CTA at 600px).

**Impact:** Every claim in this document is unmeasurable. You cannot know whether the homepage currently underperforms, or whether any change improves it. This is the **gate** — not an optional follow-up.

---

## 5. Medium Weaknesses

| # | Issue | Why it matters | Fix |
|---|---|---|---|
| **M1** | **✅ RESOLVED (Rev 3).** Word count is now **measured from built HTML**, not a regex. | The original ~9,031 estimate **overcounted by 64%**. Real figure: **5,493** visible words. The page is over-length, but the severity is lower than Rev 1 stated, and the recommended cut is ~49% rather than 73%. | Done. Re-measure after each homepage change. |
| **M2** | **Pricing demotion risk.** Rev 1 proposed cutting 1,273 words of pricing to a 3-package teaser. | For a six-figure considered sale, price is **qualification**. Hiding it behind a click inflates lead count and deflates lead quality. This is the recommendation Rev 1 defended least confidently. | **Reversed in Rev 2.** Keep pricing visible; compress it in place. |
| **M3** | **Mobile unassessed.** Every argument is desktop-scroll framed. | Philippines traffic is majority mobile. Long-page behaviour inverts on small screens — cut length may not be the lever there. | Re-audit the three hero sections at 375px before finalising. |
| **M4** | **No success criteria.** No metric, baseline, threshold, or observation window. | You cannot tell whether the work succeeded. | Defined in [§14](#14-action-register). |

### Also outstanding (unrelated to this plan)

`npm audit` reports **1 critical + 2 high**. The critical is Next.js RCE/SSRF/cache-poisoning across `next@16.0.0–16.3.7`. Given [SECURITY.md](../docs/SECURITY.md) markets BITS with ISO/IEC 27001 and sovereign data residency, a critical RCE in the framework itself is a reputational liability. `npm audit fix` bumps `next` past `16.3.7` and requires a rebuild + visual regression pass.

---

# Part III — Strategy

## 6. Positioning Decision: OMS 360 Is the Platform

> **Locked decision: OMS 360 is the platform. BITScrm and BITSagent AI are modules within it — not separate products.**

### Why this is correct

Your existing copy already asserts it: *"Start with one. They share a database."* The problem is that **the site has never committed to it.** Three pages currently compete to be the collections CRM, which is a site that believes it has three products — not a platform with three modules.

### What it implies

| | Before | After |
|---|---|---|
| OMS 360 | A product competing with others | **The platform.** One canonical page |
| BITScrm | A rival product page | A **module** at `/operations-360/crm` |
| BITSagent AI | A rival product page | A **module** at `/operations-360/ai` |
| Head term owner | Split ~11 ways | `/products/operations-360` **owns it** |

### The buyer story this unlocks

One buyer, one budget cycle, one renewal:

```
OPERATIONS 360   →  run the floor        (ops director)
  ├─ CRM module  →  sell the accounts    (ops + commercial head)
  └─ AI module   →  automate both        (ops director)
```

The other 19 products have **different buyers** — finance, HR, warehouse, construction, hospitality — arriving via `/products`, search, or referral. They belong in the catalogue, not the homepage pitch.

### The strategic warning

Going from "18 products on one page" to "3 heroes + 19 parked" **concentrates risk**. You win decisively with the collections/BPO buyer and lose the incidental enterprise-buyer who was going to find Accounting & ERP on your homepage.

**Mitigation:** the parked-catalogue strip must stay visually substantial and keep the full 22 visible with one click. It is the only element that tells a CFO you are a platform, not a vendor. Do not let it become greyed-out footnotes.

---

## 7. Target Architecture

```
┌──────────────────────────────────────────────────────────┐
│  HERO — OPERATIONS 360                                    │
│  The entire recovery floor on one system.                 │
│  CRM · Dialer · Field Agents · Speech AI QA               │
├──────────────────────────────────────────────────────────┤
│  MODULE A — BITScrm            │  MODULE B — BITSagent AI │
│  Recover the accounts         │  Automate the floor      │
│  → /operations-360/crm        │  → /operations-360/ai     │
├──────────────────────────────────────────────────────────┤
│  AND 19 MORE ON THE SAME DATABASE                         │
│  Accounting · HRMS · Payroll · Logistics · Inventory ·    │
│  Booking · Queuing · Sports · NFC · White-Label · RAG     │
│  [ Browse the full catalog → ]                             │
└──────────────────────────────────────────────────────────┘
```

**~74% of page weight on the platform and its two modules. All 22 products remain discoverable in one click.**

---

## 8. Deliverable A — The Platform Index

Replaces **ProductFamilies + Industries + DeploymentModels** (2,777 words) with **~180 words**.

```
┌──────────────────────────────────────────────────────────┐
│  OPERATIONS 360 — THE PLATFORM                            │
│  Collections. Telephony. Field. Compliance. One system.   │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ COLLECTIONS COMMAND CENTER   │ [PTP ledger mock]   │  │
│  │ 0.4s screen-pop. DPD aging.   │                    │  │
│  ├────────────────────────────────────────────────────┤  │
│  │ PREDICTIVE SOFTPHONE         │ [waveform mock]    │  │
│  │ 98.4% live voice. No phones. │                    │  │
│  ├────────────────────────────────────────────────────┤  │
│  │ FIELD AGENTS + SPEECH AI QA  │ [geofence mock]    │  │
│  │ GPS proof-of-visit. 100% QA. │                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  MODULE A — BITScrm                    MODULE B — BITSagent │
│  Recover the accounts                  Automate the floor  │
│  [ See Operations 360 → ]              [ Browse catalog → ]│
├──────────────────────────────────────────────────────────┤
│  AND 19 MORE ON THE SAME DATABASE                         │
│  Accounting · HRMS · Payroll · Logistics · Inventory ·    │
│  Booking · Queuing · Sports · NFC · White-Label · RAG     │
│  [ Browse the full catalog → ]                            │
└──────────────────────────────────────────────────────────┘
```

### Contents

| Element | Source | Words |
|---|---|---|
| Header + platform subhead | New | ~25 |
| 3 OMS pillars | Shortened from FeaturesHero + FloorShowcase | ~60 |
| Module A/B cards (CRM, BITSagent) | New — one line each + link | ~35 |
| "19 more, same database" strip | From `product-families.tsx` data | ~50 |
| CTAs | — | ~10 |

### Critical constraint

**The pillars must not repeat FeaturesHero or FloorShowcase copy.** This is the *table of contents*; those sections are the *chapters*. Duplication is how the page reached 9,000 words.

### Copy direction

Scannable noun phrases, not sentences. A visitor should grasp the platform from the bolded first four words alone.

---

## 9. Deliverable B — `/deployment` Page

Moves 1,659 words off the homepage. Reuses the existing `deploymentModels[0]`/`[1]` toggle.

```
① THE COMPARISON          ← table, replaces ~1,200 words of prose
     Cloud          │ On-Prem              │ Hybrid
     Setup time     │ Zero    │ Phased
     Monthly cost   │ One-time│ Blended
     Updates        │ Automatic│ Automatic
     Data residency │ Your building        │ Split
     Hardware needed│ None    │ Optional
② MULTI-PRODUCT MODULAR ARCHITECTURE
     Shared PostgreSQL & Redis Bus · Centralized SSO & RBAC
③ CONTINUOUS EVOLUTION GUARANTEE
     Automatic security updates · Modern AI & speed upgrades
④ SETUP & IMPLEMENTATION
     Production ready · Guided setup · Free training · Mutual NDA
⑤ ZERO HARDWARE WASTE GUARANTEE + white-label + hardware audit CTA
```

**The core change is prose → table.** Every paragraph in the current section is a comparison-matrix row written as a sentence. Same information, **~120 words instead of ~1,200.** Highest words-per-value ratio in the plan.

**Homepage keeps one line:** *"Cloud, hybrid, or your own servers. Every engine runs either way."*

---

## 10. Deliverable C — Word Budget

**Target ~2,800 words** (from 5,493 measured — a **49% reduction**).

> Revised in Rev 3. The earlier ~2,400 target was derived from the inflated 9,031
> figure. Against the measured 5,493, a ~2,800 target delivers the same structural
> simplification without over-cutting a page that is genuinely over-length but not
> catastrophically so.

| Section | Budget | Notes |
|---|---|---|
| Hero (+ merged StatsStrip) | ~200 | trim; absorb benchmark proof above the fold |
| TrustStrip | ~180 | unchanged |
| **Platform Index** | **~180** | **new** — replaces ProductFamilies + Industries + DeploymentModels |
| SolutionFinder | ~250 | unchanged |
| TheDifference | ~350 | halve |
| **FloorShowcase + FeaturesHero** | **~800** | the OMS deep dive — keep it substantial |
| **Pricing** (compressed, **not demoted**) | **~400** | see M2 |
| FAQ | ~200 | 6 questions |
| Contact | ~300 | never cut |
| **TOTAL** | **~2,800** | **−49%** |

**Preserved:** all 22 products visible; the OMS 360 differentiators keep more space than today; every removed item already exists at a route.

### Measured reference (Rev 3)

| Page | Visible words |
|---|---|
| Homepage (current) | **5,493** |
| `/operations-360` (new) | 389 |
| `/operations-360/crm` (new) | 323 |
| `/operations-360/ai` (new) | 323 |

---

## 11. Routing & Canonicalisation Plan

### ✅ Shipped (Rev 3)

| Deliverable | Route | Words | Status |
|---|---|---|---|
| Platform page | `/operations-360` | 389 | ✅ live |
| CRM module | `/operations-360/crm` | 323 | ✅ live |
| AI module | `/operations-360/ai` | 323 | ✅ live |

**Permanent redirects** (Next emits **308**, search-equivalent to 301 for GET):

| From | To |
|---|---|
| `/products/collections` | `/operations-360` |
| `/bitscrm` | `/operations-360/crm` |
| `/bitsagent` | `/operations-360/ai` |

**Internal links repointed** across 15 files — nav, footer, homepage, pricing, blog CTAs, solutions data, product registry, and the `not-found` page.

`ops.` / `operations.` / `collections.` subdomains now resolve correctly via the pre-existing rewrite in `proxy.ts` — no proxy change required.

**Analytics:** `@vercel/analytics` installed and mounted in the root layout. Pageviews now tracked. **Custom scroll-depth→CTA events are still to do** — that is the actual measurement gate.

### ⚠️ Deliberately NOT done — needs your decision

The 6-way CRM cannibalisation collapse was **not** applied. `/products/crm`, `/products/sales`, `/products/support`, `/products/marketing`, `/products/service`, `/products/commerce` are **genuine catalogue products**. Redirecting them would retire catalogue entries, which **contradicts your "keep all 22" instruction.**

This leaves **C2 (self-cannibalisation) unresolved.** It is still the largest remaining structural problem. Two ways forward:

| Option | Effect | Cost |
|---|---|---|
| **Collapse** — 301 the six into `/operations-360/crm` as anchored sections | Concentration; best SEO | Retires 6 catalogue entries, contradicts "keep 22" |
| **Differentiate** — keep all six, rewrite each to own a distinct intent (e.g. `/products/support` owns "helpdesk software", `/operations-360/crm` owns "collections CRM") | Preserves all 22, removes overlap by intent | Requires genuine copy differentiation per page |

**Recommendation:** differentiate. It honours "keep all 22" and is the only option that doesn't reduce commercial surface.

### Remaining plan

This section is the Rev 2 centrepiece and the highest-value work.

### Canonical structure

| URL | Role | Action |
|---|---|---|
| `/products/operations-360` | **Platform — owns "collections CRM/OMS"** | 🆕 Create (rename `collections`) |
| `/operations-360/crm` | BITScrm module | 🆕 Create from `/bitscrm` |
| `/operations-360/ai` | BITSagent AI module | 🆕 Create from `/bitsagent` |
| `/products` | Full catalogue — owns the other 19 | Keep |

### Redirects (301)

| From | To | Reason |
|---|---|---|
| `/products/collections` | `/products/operations-360` | Canonical naming (C1) |
| `/bitscrm` | `/operations-360/crm` | Module, not rival product (C2) |
| `/bitsagent` | `/operations-360/ai` | Module, not rival product (C2) |
| `/products/crm` | `/products/operations-360#crm` | Stop cannibalising the flagship |
| `/products/sales` | `/products/operations-360#crm` | Module of CRM |
| `/products/support` | `/products/operations-360#crm` | Module of CRM |
| `/products/marketing` | `/products/operations-360#crm` | Module of CRM |
| `/products/service` | `/products/operations-360#crm` | Module of CRM |
| `/products/commerce` | `/products/operations-360#crm` | Module of CRM |
| `ops.*`, `operations.*`, `collections.*` subdomains | `/products/operations-360` | Align with [`proxy.ts`](../proxy.ts) |

### Code changes required

| File | Change |
|---|---|
| [`product-families.tsx:52`](../components/sections/product-families.tsx#L52) | `href: "/#operations-360"` → `"/products/operations-360"` |
| [`product-families.tsx:54`](../components/sections/product-families.tsx#L54) | `/products/crm` → `/operations-360/crm` |
| [`product-families.tsx:55`](../components/sections/product-families.tsx#L55) | `/bitsagent` → `/operations-360/ai` |
| [`next.config.ts`](../next.config.ts) | Add the redirect table above |
| [`proxy.ts:6-7`](../proxy.ts#L6-L7) | Subdomain map already targets `operations-360` — now correct |
| [`page.tsx`](../app/(marketing)/page.tsx) metadata | Narrow keywords to platform terms; move CRM keywords to module pages |
| Copy across site | "18 engines" → 22, or rationalise |

> ⚠️ **`/crm-sales/*` is deliberately excluded from redirects.** Those are the live product demo routes and must keep working. Redirect them only after a redirect map is proven in staging.

---

# Part IV — Execution

## 12. Risk Register

| # | Risk | Severity | Mitigation |
|---|---|---|---|
| **R1** | **Breadth signal weakens.** ~74% of weight on one platform. Wins the collections CTO, loses the incidental enterprise buyer. | High | Keep the 19-product strip visually substantial. It is the only "we're a platform" signal for a CFO audience. |
| **R2** | **Redirects lose rankings.** Consolidating 11 pages into 1 must preserve accumulated authority. | High | 301 (not 302). Verify with `seo:drift` post-deploy. Confirm GSC impressions don't cliff. |
| **R3** | **Duplicate copy creeps back.** Platform pillars re-explaining FeaturesHero/FloorShowcase. | Medium | Hard rule: index is a table of contents, bolded four-word phrases only. |
| **R4** | **Mobile behaves differently.** Cut designed on desktop assumptions. | Medium | Audit 375px before finalising (M3). |
| **R5** | **`/crm-sales` breaks.** Demo routes are live product. | Medium | Exclude from redirects; test staging first. |
| **R6** | **Premature without data.** The premise is unverified. | **Critical** | Instrument analytics **before** cutting (C4). |

---

## 13. SEO Impact Assessment

| Element | Status |
|---|---|
| Title / description / keywords | **Change** — narrow to platform terms |
| OpenGraph / Twitter cards | Unchanged |
| WebPage JSON-LD | Unchanged |
| FAQPage JSON-LD | Unchanged |
| `llms.txt` / `llms-full.txt` | **Change** — "18 engines" → 22 |
| Indexable routes | **−10** (consolidation) |

**Net assessment: strongly positive.** Consolidating ~11 self-competing pages into one canonical owner concentrates authority rather than fragmenting it — the textbook remedy for cannibalisation. Combined with lower homepage bounce, expected net gain despite fewer URLs.

**Risk:** losing long-tail rankings held by individual CRM pages. Mitigated by redirect mapping and module pages retaining the distinct intent terms.

---

## 14. Action Register

| # | Action | Fixes | Priority | Effort |
|---|---|---|---|---|
| 1 | Instrument analytics: Vercel Analytics + scroll-depth→CTA events | C4, R6, M4 | **GATE** | 1 day |
| 2 | Measure real word count from built HTML | M1 | **GATE** | 2 min |
| 3 | Create `/products/operations-360`; 301 `/products/collections` | C1 | Critical | 2 hrs |
| 4 | Repoint `product-families.tsx` links off the anchor | C1 | Critical | 15 min |
| 5 | Build `/operations-360/crm` + `/operations-360/ai` modules | C2 | Critical | 1 day |
| 6 | 301 the 5 `/products/{crm,sales,support,marketing,service,commerce}` pages | C2 | Critical | 3 hrs |
| 7 | Build `/deployment` (prose → table) | Deliverable B | High | 3 hrs |
| 8 | Build Platform Index; rewire homepage 14 → 8 sections | Deliverable A | High | 2 days |
| 9 | Reconcile "18 engines" → 22 across copy, brandbook, `llms.txt` | C3 | Medium | 2 hrs |
| 10 | Compress Pricing in place (do **not** demote) | M2 | Medium | 3 hrs |
| 11 | Mobile audit of 3 hero sections at 375px | M3, R4 | Medium | 2 hrs |
| 12 | `npm audit fix` + rebuild + visual regression | Security | Medium | 1 day |
| 13 | Footer/nav link to the platform page | R1 | Medium | 1 hr |

### Success Criteria (M4)

| Metric | Baseline | Target | Window |
|---|---|---|---|
| Homepage → `/operations-360` click rate | *measure in #1* | +25% relative | 30 days post-launch |
| `/products/operations-360` organic impressions | *measure in #1* | +40% | 60 days |
| Contact-form qualified rate | *measure in #1* | no decline | 30 days |
| Scroll depth at 50% | *measure in #1* | +10 pts | 30 days |

> **No baseline exists today.** Action #1 must complete before any cut is evaluated.

---

## 15. Decisions Required — **ALL LOCKED (Rev 4)**

Every strategic decision is now settled. No open questions remain.

| # | Decision | Choice | Rationale |
|---|---|---|---|
| 1 | **Is OMS 360 the platform?** | ✅ **YES** | Already committed by existing copy: *"Start with one. They share a database."* |
| 2 | **Homepage extensibility** | ✅ **Registry-driven + optional `featured` flag** | New product = one registry entry. Optional promotion to a hero section when marketing needs a headline moment. Makes "new product launch" a **1–2 hour** task instead of an 8-file edit. |
| 3 | **C2 self-cannibalisation** | ✅ **COLLAPSE** | Concentrate authority on the flagship. Overrides the earlier "keep all 22" instruction. |
| 4 | **Catalog count to claim** | ✅ **Option B — "16 products, 4 in Operations 360"** | Hard number *and* precise. The phrasing does marketing work: it tells a prospect the bundle exists before the sales call. |
| 5 | **Pricing visibility** | ✅ **No monetary values, meeting-only** | Enforced across every public surface. See [§15.1](#151-pricing-visibility-policy). |
| 6 | **Sequencing** | ✅ **Option C — collapse + OMS spine now, defer word-count trim** | Act on what's already decided; defer the one change that could destroy something currently working. |
| 7 | **Pricing structure** | ✅ **B now, A later** | Pricing already names OMS 360 nine times — it is already the strongest reinforcement on the page. No restructure needed now. |
| 8 | **Word budget** | **Deferred** under decision 6 | ~2,800 target retained, to be justified by data once events exist. |

### 15.1 Pricing Visibility Policy

**Locked policy: BITS does not publish monetary values. All pricing is accessible only through a meeting with a company representative.**

**Audit result (Rev 4): ✅ the site already complies.**

| Surface | Status |
|---|---|
| `pricing.tsx` — 16 tier entries | ✅ No figures. Shows `"Tailored Floor Quote"`, `"Volume-Tiered License"`, `"Enterprise Master Scope"`, `"Flat Team License"`, etc. |
| All 16 CTAs | ✅ Route through `useConsultationModal` → meeting request |
| Blog `/pricing` claim of "₱0" | ✅ Intentional — the zero per-seat claim, not a price |
| CRM dashboard figures | ✅ Behind authentication, not public |
| `components/bionis/data.ts` | ✅ Internal demo fixtures, not published pricing |

**Two housekeeping items:**
1. **"BITScrm Suite" standalone entry links to `/products/crm`**, which the collapse redirects. Must be repointed to `/operations-360/crm`.
2. **`/brandbook/typography` uses `"₱1,850 / seat / month"`** as a monospace font specimen. It is a typeface sample, not a price claim — but a scraper or an AI summariser could read it as one. Recommend changing the sample to a neutral string.

**Going forward:** no `indicativeModel` may become a numeral. Treat this as a review checkpoint on any pricing change.

### 15.2 Operations 360 Capability Set — Confirmed

Operations 360 comprises **four pillars**, confirmed by product owner:

| # | Pillar | Value delivered |
|---|---|---|
| 1 | **Collections CRM & PTP** | 360° dossiers, DPD aging, PTP automation, broken-promise alerting |
| 2 | **Predictive Dialer** | Sub-350ms pacing, ~98.4% live voice, no desk phones |
| 3 | **Field Agents App** | GPS geofenced proof-of-visit, e-signature, offline sync |
| 4 | **Real-time QA Scoring** | 100% call audit, sentiment, prohibited-phrase and quiet-hour flags |

> **⚠️ Action:** `/operations-360` currently ships with **three** pillars, having merged Field Agents and QA into one card. This must be split into the four confirmed pillars above to match the product owner's definition.

These four pillars are the substance of the homepage narrative — see the OMS 360 spine in [§8](#8-deliverable-a--the-platform-index).

### 15.3 Catalogue Arithmetic — **CORRECTED (Rev 4)**

> **⚠️ Rev 4 corrects a Rev 4 draft error.** The "16 products" figure was derived from
> `bitsProducts` in `lib/site.ts` while the actual product registry is `PRODUCT_REGISTRY`
> in `lib/products/registry.ts`. **The two registries have drifted** — same products,
> different IDs and totals. The correct numbers:

```
PRODUCT_REGISTRY
 19 registry entries
 − 1 subdomain alias (crm-collections → Operations 360, kept for the collections.* domain)
 = 18 canonical products          ← CURRENT TRUE COUNT

After Step 2 collapse
 − 3 collapsed (crm-support, crm-marketing, crm-commerce)
 = 15 canonical products          ← POST-COLLAPSE TRUE COUNT
```

**The claim is "15 products, 4 of them in Operations 360" — not 16.**

It reads **18 until Step 2 lands**, so the 55-location copy sweep must wait until the collapse is complete.

**Drift protection shipped in Step 1:** `CATALOG_CLAIM` is now derived from the registry at runtime rather than hardcoded, because the hardcoded `16` was wrong the moment it was written.

### 15.4 Implementation Order (Option C)

```
PHASE 1 — STRUCTURE (decided, low risk)
  1. Registry-driven homepage data model + `featured` flag
  2. Collapse the 6 CRM pages + ai-agent → modules
  3. Build Platform Index; establish the OMS 360 spine (4 pillars)
  4. Fix "BITScrm Suite" pricing link; reconcile count to 16
  5. Instrument custom analytics events   ← before Phase 2

PHASE 2 — COPY REDUCTION (deferred pending data)
  6. Homepage 14 → 8 sections, ~5,493 → ~2,800 words
  7. Build /deployment; compress Pricing in place

PHASE 3 — REVIEW
  8. Pricing structure B → A, once collapse has settled
```

> **Gate between Phase 1 and Phase 2:** analytics events must be live and have a baseline before any word-count reduction begins.

| # | Question | Recommendation | Status |
|---|---|---|---|
| 1 | Build the Platform Index? | **YES** — load-bearing | ☐ |
| 2 | Build `/deployment`? | **YES** — best ratio in plan | ☐ |
| 3 | Budget ~2,400? | **YES** — 1,800 conflicts with platform strategy | ☐ |
| 4 | **Is OMS 360 the platform containing CRM + BITSagent?** | **YES** | ✅ **LOCKED** |
| 5 | Keep pricing visible (Rev 2 reversal)? | **YES** | ☐ |
| 6 | Run `npm audit fix` now or schedule it? | Schedule after this work merges | ☐ |

### Implementation Order

```
GATE  1. Analytics instrumentation + real word count
       ↓
FIX   2-4. Flagship canonical URL + link repoint        (highest ROI, smallest effort)
       ↓
      5-6. CRM/BITSagent module consolidation + redirects
       ↓
      7.   /deployment page
       ↓
      8.   Platform Index + homepage rewire 14 → 8
       ↓
      9-11. Copy reconciliation, Pricing compression, mobile audit
       ↓
      12.  Dependency security
```

Do **not** start step 8 before steps 2–6 land. The homepage currently links to anchors and rival pages; rewiring it first would amplify a structure that is about to change.

---

## 16. Appendix A — Word Count Data

```
SECTION            WORDS     LINES
------------------------------------
DeploymentModels     1659      801
Pricing              1273      528
FloorShowcase        1176      578
FeaturesHero          747      460
TheDifference         704      336
ProductFamilies       668      350
StatsStrip            591      419
Industries            450      260
Contact               437      230
Hero                  350      216
FAQ                   279      182
Security              260      147
SolutionFinder        254      150
TrustStrip            183      115
------------------------------------
TOTAL                9031     4766
```

**⚠️ Heuristic, not measured.** See [M1](#m1--the-word-count-is-not-measured).

---

## 17. Appendix B — Source Content Inventory

Content already written and available for reuse. **No new product copy needs to be invented.**

### OMS 360 Assets — `features-hero.tsx`
- "BITS OMS — Collections Command Center" · 0.4s Screen-Pop
- "OPERATIONS 360 · PLATFORM CAPABILITIES"
- Collections Core · Debt Management / PTP / Bulk Portfolio / Strategy Decision Rules
- Debtor states: PTP Active, Follow-up (Amber), Escalated (Red), Restructured, Settled (GCash)
- Tabs: Dashboard · Dialer Queue · PTP Ledger · QA & Compliance

### OMS 360 Assets — `floor-showcase.tsx`
- "THE RECOVERY FLOOR POWERHOUSE — High-Velocity Operations"
- Field Agent Mobile App: 100% Geofenced, GPS match ±4m satellite-verified
- Tamper-proof timestamps: Arrived → In-Person → Settled → Departed
- Watermarked photo proof · e-Signature · offline sync
- Training mode: air-gapped sandbox, 30-day auto-purge
- Predictive Dialer: "Zero Dead Air. No Desk Phones. Predictive Calling at ~0.4s."

### Benchmarks — `stats-strip.tsx`
98.4% live voice · 78% PTP fulfilled (+45% vs manual) · zero dropped calls (dual SIP) · free white-glove onboarding · broken PTPs cut in half · average campaign cutover · 20-year recovery floor origin

### Module Assets — `bitscrm/page.tsx` (632 lines)
"Enterprise Collections CRM & Dialer" · predictive dialer · supervisory monitoring · omnichannel contact centre · BSP compliance

### Module Assets — `bitsagent/page.tsx` (157 lines)
Autonomous voice AI · conversational AI collections · speech-to-speech · WebRTC voice agent

### Family Data — `product-families.tsx`

| Family | Products |
|---|---|
| **Customer Operations** | Operations 360 · Field Agents App · BITScrm Suite · BITSagent AI |
| **Business Operations** | Accounting & ERP · HRMS & Payroll · Inventory & Logistics |
| **Customer Experience** | Booking System · Smart Queuing · Sports & Venue Hub · Smart NFC Card |
| **Platform & AI** | RAG Knowledge Engine · White-Label Deployment · Custom Engineering |

### Pricing — `pricing.tsx`
- **Platform packages:** Starter Floor · Growth Floor · Enterprise & Sovereign
- **Adjacent:** Commercial CRM Core · Revenue & Support Cloud · Enterprise Commerce & Custom · Autonomous AI + Operations · Enterprise Business Engine · Universal White-Label Partner
- **Framing:** "TRANSPARENT COMMERCIAL LICENSING · ZERO PER-SEAT TRAPS"
- **Included:** Zero Per-Seat Penalty · Zero PBX Markup · Turnkey Migration · 18 Connected Products

### Deployment — `deployment-models.tsx`
"Flexible Hosting Options — Run BITS Your Way" · Cloud (Recommended) / On-Prem toggle · Multi-Product Modular Architecture (shared PostgreSQL & Redis bus, centralised SSO & RBAC) · Continuous Evolution Guarantee · Zero Hardware Waste Guarantee · Mutual NDA + technical blueprint

---

*Prepared by Principal Full-Stack Engineering · BITS Core Architecture Group*
*Contact: `bits_inquiries@boundlessits.com`*