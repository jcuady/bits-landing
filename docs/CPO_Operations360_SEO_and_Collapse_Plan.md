# Operations 360 — SEO Architecture & CRM Collapse Plan

**Author:** Principal Full-Stack Engineering (CPO review)
**Date:** October 2026
**Status:** Proposal for review — no code changed
**Priority:** Market Operations 360. SEO is the visibility mechanism for that goal.
**Companions:** [Strategy](./CPO_Landing_Page_Documentation_Plan.md) · [Execution](./CPO_Landing_Page_Revamp_Planning.md)

---

## Executive Summary

Two problems, one plan.

1. **SEO defect** — the sitemap advertises three URLs that now permanently redirect, and omits the canonical flagship entirely.
2. **CRM collapse** — 5 BITScrm workspaces are scattered across pages competing with the flagship. Option 2 consolidates them into one module page without losing a single buyer intent.

**Recommended:** Option 2 (five named sections), executed together with the SEO fix.

---

# Part 0 — ⚠️ CRITICAL CONTEXT: There Is No Organic Presence

**Measured from Search Console, last 3 months. This reorders the entire plan.**

```
Property           https://boundlessits.com/   (APEX ONLY)
Clicks             0
Impressions        1        ← one impression in ninety days
Indexed pages      0
Not indexed        2/day, consistently
Search Appearance  "Page with redirect" — 2 pages
```

### Root cause: the verified property is the apex, but the apex redirects

```
boundlessits.com/     →  redirects  →  https://www.boundlessits.com/
   ↑ this is the only property in GSC      ↑ this is where all content lives
```

Google is indexing a URL that immediately redirects. The property monitoring the site contains **one redirect instruction, not content.**

**A `www` property does not exist.** Confirmed — the dropdown shows only the apex.

### What this changes

| Assumption | Reality |
|---|---|
| "SEO is a big plus for visibility" | There is no visibility. ~1 impression / 90 days. |
| Consolidation recovers cannibalised traffic | There is no cannibalised traffic to recover. |
| Collapsing pages risks losing rankings | There are no rankings to lose. **Collapse risk ≈ 0.** |
| Sitemap prioritisation drives crawl budget | It currently points Google at redirecting URLs. |

### The reordering

The work in Parts B–D is still correct and should still happen. But it sits **below** this:

```
PHASE -1 — MAKE THE SITE VISIBLE  (do first, nothing else compounds without it)
  1. Add + verify the https://www.boundlessits.com/ property in GSC
  2. Fix the sitemap (Part A)
  3. Submit the sitemap for indexing
  4. Inspect Indexing → Pages for crawl errors
  5. Confirm exactly one host serves each URL (no duplicate content)

PHASE 0 — SEO AI VISIBILITY          (Part E)
PHASE 1+ — Collapse, spine, restructure  (Parts B–D)
```

> **Nothing in Parts B–D can produce a measurable result until Phase -1 completes.**
> A rewire with no indexed pages has no measurable outcome.

### Open question for Phase -1

**Is the site serving identical content on both `boundlessits.com` and `www.boundlessits.com`?**
`next.config.ts` contains no apex→www redirect and `vercel.json` has none. The redirect exists in the Vercel dashboard. If it ever fails or is bypassed, every page exists twice — a classic duplicate-content signal that can suppress indexing entirely.

---

# Part A — SEO Defect (fix after Phase -1)

## A.1 The sitemap is pointing at redirects

[`app/sitemap.ts`](../app/sitemap.ts) is a hand-written URL list. After the flagship changes it is wrong in both directions:

| Sitemap entry | Current priority | Reality |
|---|---|---|
| `/bitscrm` | **0.95** | Now 308-redirects |
| `/bitsagent` | **0.95** | Now 308-redirects |
| `/products/crm` | **0.9** | Target of the collapse |
| `/products/collections` | 0.9 (via `bitsProducts.map`) | Now 308-redirects |
| **`/operations-360`** | ❌ **absent** | The canonical flagship |
| **`/operations-360/crm`** | ❌ **absent** | The CRM module |
| **`/operations-360/ai`** | ❌ **absent** | The AI module |

**Impact:** the sitemap is a prioritisation signal. Declaring 0.95 priority for URLs that redirect wastes crawl budget and confuses canonical signals — while the page that should own those terms isn't listed at all.

**Fix — swap, don't add:**

| Remove | Add | Priority |
|---|---|---|
| `/bitscrm` (0.95) | **`/operations-360`** | **1.0** |
| `/bitsagent` (0.95) | **`/operations-360/crm`** | **0.95** |
| | **`/operations-360/ai`** | **0.95** |
| `/products/crm` (0.9) | | |
| `/products/collections` (generated) | | |

> The flagship should outrank the homepage in the sitemap. It is the page we want indexed and ranked for the head terms.

---

## A.2 Keyword ownership map

The core SEO problem on the site is **overlapping targeting**. Today five pages target the same intent.

### Target state — one page, one intent

| Page | Owns these intents | Priority |
|---|---|---|
| **`/operations-360`** | `top oms`, `best oms`, `operations management system`, `collections agency software philippines`, `debt recovery platform`, `predictive dialer philippines`, `Operations 360` | 🔴 Head term |
| **`/operations-360/crm`** | `collections crm software philippines`, `bitScrm`, `crm helpdesk`, `crm sales pipeline`, `customer support software`, `ecommerce invoicing philippines` | 🔴 High |
| **`/operations-360/ai`** | `voice ai agents philippines`, `ai debt negotiation`, `speech-to-speech ai agent`, `contact center ai automation` | 🔴 High |
| `/products` | long-tail catalogue terms | 🟡 Supporting |
| `/pricing` | `operations 360 pricing`, `zero per-seat crm` | 🟡 Supporting |
| `/blog/*` | informational, top-of-funnel | 🟢 Top of funnel |

### Home page keyword action

The homepage currently targets **18 keywords**, many of which belong to `/operations-360`:

```
top oms · best oms · top collections oms · best collections oms
operations management system · best/top operations management system
top crm collections agency · best crm collections agency
crm collections agency · debt collection software collections agency
```

**Move the category terms down; keep the brand and buying terms up.**

| Homepage keeps | Homepage drops to `/operations-360` |
|---|---|
| `operations 360` | `top oms` / `best oms` |
| `operations 360 oms` | `operations management system` variants |
| `enterprise operations software philippines` | `top crm collections agency` variants |
| `sovereign debt recovery software` | `top debt recovery software` |
| `collections agency crm` | `crm collections agency` |

**Why:** the homepage should win *branded and broad* queries. `/operations-360` should win *category* queries. Splitting them stops them competing with each other.

---

## A.3 Structured data

| Page | Current | Target |
|---|---|---|
| Homepage | `WebPage`, `FAQPage`, 3 × `Thing` | Add `Organization` + `SoftwareApplication` (Operations 360) |
| `/operations-360` | `SoftwareApplication` ✅ | Add `BreadcrumbList` |
| `/operations-360/crm` | none | Add `SoftwareApplication` + `FAQPage` |
| `/operations-360/ai` | none | Add `SoftwareApplication` + `FAQPage` |
| `/products/crm` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` ✅ | **Preserve all three** on the CRM module |

> The 762-line page carries ~66 lines of JSON-LD. **This must not be lost in the collapse** — it is the SEO asset, not the prose.

---

## A.4 AI search / `llms.txt`

`llms.txt` mentions Operations 360 **5×**; `llms-full.txt` **1×**. Both still describe **18 products**.

**Actions:**
- Update the product count (15 after collapse, derived from the registry)
- Add `/operations-360` as the primary platform entry with the four pillars
- Describe BITScrm and BITSagent AI as **modules**, not separate products
- Keep the five existing blog posts — they target the funnel:

```
best-collections-oms-debt-recovery-software-2026
best-sovereign-enterprise-crm-platforms-philippines
best-autonomous-voice-ai-agents-call-centers
operations-management-system-vs-crm-guide
on-premise-office-server-datacenter-setup-guide-2026
```

> The third and fourth are now directly on-message for the platform positioning. Consider adding an internal link from each to `/operations-360`.

---

# Part B — Option 2: The CRM Module

## B.1 Structure

```
/operations-360/crm — "BITScrm: the CRM module of Operations 360"

  HERO
    Recover the accounts.
    Collections-native CRM on the platform database. Nothing to integrate.

  ┌──────────────────────────────────────────────────────────────┐
  │ THE FIVE WORKSPACES — start with one, add as you grow         │
  │                                                              │
  │  ● Collections    Recover the accounts      (default)         │
  │  ○ Support        Serve the customer                          │
  │  ○ Sales          Win the deal                                │
  │  ○ Marketing      Reach the audience                          │
  │  ○ Commerce       Take the payment                            │
  └──────────────────────────────────────────────────────────────┘

  THE FIVE ENGINES SYNCHRONIZE IN REAL TIME   (shortened)
  FRANKENSTEIN STACK vs. UNIFIED BITScrm      (5-dimension table)
  FAQ (5 questions)
  CTA
```

## B.2 Why five named sections rather than one narrative

The deciding factor is that the existing page **already argues for progressive activation**:

> *"Can we deploy one CRM variant today and add others later?"*
> *"Every BITScrm variant is fully functional as a standalone system… connects instantly without any data migration, schema rewriting, or replatforming."*

That argument only works if the variants are **visible**. A single narrative would delete the sections *and* the argument that sells them.

Five named sections preserve both — and reframe the promise from *"five products"* to *"five capabilities you activate progressively, on one database."* That is a **stronger** story than either alternative.

---

## B.3 Line-by-line disposition of the 762 lines

| Lines | Block | Action | Notes |
|---|---|---|---|
| 30–68 | `metadata` | **Rewrite** | Repoint canonical to `/operations-360/crm`; keep volume keywords |
| 69–171 | `CRM_VARIANTS_OVERVIEW` (103) | **Keep** | Becomes the five named sections |
| 172–199 | `ARCHITECTURE_COMPARISONS` (28) | **Keep verbatim** | Platform-aligned already |
| 200–223 | `CRM_FAQS` (24) | **Keep, reword** | Reframe standalone → module |
| 224–289 | 3 × JSON-LD (66) | **Keep verbatim** | The SEO asset |
| ~290–487 | Hero (~197) | **Absorb** | Merged into module hero |
| 488–507 | Revenue Architecture (20) | **Keep** | |
| 508–594 | 4 Workspaces (87) | **Keep** | → five sections |
| 595–664 | Variant pages (70) | **Remove** | Links die on collapse |
| 665–704 | Sync explainer (40) | **Keep, shorten** | |
| 705–735 | Comparison table (31) | **Keep verbatim** | |
| 736–762 | FAQ + CTA (27) | **Keep** | |

**Realistic loss: ~150 lines of navigation chrome.** Roughly 80% of the page survives.

---

## B.4 Redirects for the collapse

| From | To | Note |
|---|---|---|
| `/products/crm` | `/operations-360/crm` | |
| `/products/sales` | `/operations-360/crm#sales` | Anchor to the named section |
| `/products/support` | `/operations-360/crm#support` | |
| `/products/marketing` | `/operations-360/crm#marketing` | |
| `/products/commerce` | `/operations-360/crm#commerce` | |
| `/products/ai-agent` | `/operations-360/ai` | |
| `/bitscrm` ✅ done | `/operations-360/crm` | |
| `/bitsagent` ✅ done | `/operations-360/ai` | |

**Pre-flight check before redirecting:** confirm in Search Console whether `/products/sales`, `/products/support`, `/products/marketing` or `/products/commerce` currently earn impressions. If any does, ensure that intent is covered by a named section before the URL dies.

---

# Part C — Marketing Operations 360

## C.1 The spine

The measured problem: OMS 360 is named in **6 of 14** homepage sections. Seven never say it — including `FloorShowcase`, the most OMS-heavy section on the page.

The fix is **recurrence**, not concentration. The name should appear wherever the reader asks a different question.

| # | Section | Names it? | Change |
|---|---|---|---|
| 1 | Hero | ✅ 5× | Link to `/operations-360` |
| 2 | TrustStrip | ❌ | — |
| 3 | **Platform Index** | 🆕 | The hub |
| 4 | SolutionFinder | ❌ | — |
| 5 | TheDifference | ❌ | — |
| 6 | Collections CRM & PTP | 🆕 | **Pillar 1** |
| 7 | Predictive Dialer | 🆕 | **Pillar 2** |
| 8 | Field Agents App | 🆕 | **Pillar 3 — split out** |
| 9 | Real-time QA Scoring | 🆕 | **Pillar 4 — split out, name it here** |
| 10 | Industries | ❌ | — |
| 11 | Security | ❌ | — |
| 12 | Deployment | ❌ | — |
| 13 | Pricing | ✅ 9× | Link onward |
| 14 | Contact | ✅ 2× | — |

## C.2 The four pillars

Confirmed by product owner. These are the spine of the marketing.

| # | Pillar | Line | Proof point |
|---|---|---|---|
| 1 | **Collections CRM & PTP** | 360° dossiers, DPD aging, promise-to-pay automation | 0.4s screen-pop |
| 2 | **Predictive Dialer** | Sub-350ms pacing. No desk phones, no PBX | 98.4% live voice |
| 3 | **Field Agents App** | GPS-geofenced proof-of-visit with debtor e-signature | 10m geofence |
| 4 | **Real-time QA Scoring** | Every call audited. Prohibited phrases flagged live | 100% call audit |

## C.3 SEO reinforcement per section

Each pillar should carry its own search intent, so the homepage ranks for pillar-level queries as well as the brand:

| Pillar | Homepage section should target |
|---|---|
| Collections CRM & PTP | `ptp automation`, `promise to pay tracking`, `collections crm` |
| Predictive Dialer | `predictive dialer philippines`, `webrtc softphone`, `call center dialer` |
| Field Agents App | `field service gps`, `proof of visit`, `debt collector field app` |
| Real-time QA Scoring | `call quality assurance`, `call recording compliance`, `bsp 454 compliance` |

---

# Part E — SEO AI Visibility

**Requirement added by product owner.** The revamp must not degrade — and should improve — how BITS appears in AI answer engines: Google AI Overviews, Perplexity, ChatGPT, Claude.

## Why this is a separate workstream

Traditional SEO chases a ranked link. **AI visibility chases being cited inside an answer.** An assistant assembling a list of "top OMS platforms" will cite whatever source it can quote cleanly and confidently — not necessarily what ranks first.

BITS already has unusually good raw material for this. It is currently **unused.**

## Current assets

| Asset | State | Issue |
|---|---|---|
| [`public/llms.txt`](../public/llms.txt) | 5× Operations 360 mentions, explicit "Authoritative Answer" section with target queries | ❌ Points to `/bitscrm` and `/bitsagent` — **both now redirect** |
| [`public/llms-full.txt`](../public/llms-full.txt) | 1× Operations 360 | ❌ Under-weighted |
| JSON-LD | Homepage `WebPage` + `FAQPage` | ❌ No `Organization`, no `SoftwareApplication` |
| Product pages | `/products/[slug]` | ❌ No `SoftwareApplication` schema on most |
| Blog | 5 posts | ⚠️ Not referenced from `llms.txt` |

> **Immediate defect:** `llms.txt` — the file specifically written for AI agents — advertises two URLs that now 308-redirect. Every agent that reads it is sent to a redirect. This is the cheapest high-value fix in the entire plan.

## Actions

### E.1 Repair `llms.txt` (do early)

| Fix | Detail |
|---|---|
| **Repoint URLs** | `/bitscrm` → `/operations-360/crm` · `/bitsagent` → `/operations-360/ai` · flagship → `/operations-360` |
| **Reframe modules** | BITScrm and BITSagent AI described as modules inside Operations 360, not rival products |
| **Update the count** | 18 → 15, derived from `CATALOG_CLAIM` |
| **Add the four pillars** | Collections CRM & PTP · Predictive Dialer · Field Agents App · Real-time QA Scoring |
| **Link the blog** | The five existing posts are citable sources — reference them |

### E.2 Structured data for machine readability

| Page | Add |
|---|---|
| Homepage | `Organization` (logo, sameAs, foundingDate), `SoftwareApplication` for Operations 360 |
| `/operations-360` | `BreadcrumbList` |
| `/operations-360/crm` | `SoftwareApplication` + `FAQPage` (carried from the 762-line page) |
| `/operations-360/ai` | `SoftwareApplication` |
| `/products/crm` → module | **Preserve all 3 existing schemas** — 66 lines, the SEO asset |

### E.3 Make claims quotable

AI engines cite **specific, self-contained, attributable statements.** Current copy already does this well in `llms.txt` ("Top CRM for Collections Agency: Operations 360 by BITS…"). Push the same discipline into on-page content:

- One clear definitional sentence per pillar
- Concrete numbers: `98.4% live voice`, `sub-350ms pacing`, `100% call audit`, `10m geofence`
- Named regulations: BSP Circulars 454/857, NPC RA 10173 — these are how a technical evaluator confirms you
- No vague superlatives ("best-in-class"); state a measurable claim instead

### E.4 Entity consistency

The same name must mean the same thing everywhere: `Operations 360`, `BITScrm`, `BITSagent AI`, `Boundless IT Solutions (BITS)`. Mismatched naming across `llms.txt`, page titles, schema, and blog is one of the most common reasons entities fail to consolidate.

### E.5 Success criteria

| Metric | How to check | Target |
|---|---|---|
| "top oms" in an AI assistant | Manual prompt test: *"What is the top OMS for collections agencies in the Philippines?"* | BITS cited |
| "collections CRM Philippines" | Same method | BITS cited |
| `llms.txt` URL validity | All links return 200 | 100% |
| Entity resolution | Assistants name BITS consistently | No conflicting attribution |

---

# Part F — Blog Credibility on the Landing Page

**Requirement added by product owner.** The landing page should surface blog content to build credibility, not only sell.

## Why

Three reasons, in order of importance:

1. **Trust.** A vendor whose only content is product copy reads as a brochure. A vendor publishing on *"Operations Management System vs CRM"* reads as someone who knows the category.
2. **Top-of-funnel.** Your existing five posts already target the exact terms a buyer researches before contacting sales. Surfacing them on the landing page puts proof in front of people who didn't come looking for a blog.
3. **Citable sources for Part E.** Blog posts are the most commonly cited content type by AI answer engines.

## Current inventory — 5 posts, well-aimed

| Post | Funnel stage | Relevance to OMS 360 |
|---|---|---|
| `best-collections-oms-debt-recovery-software-2026` | Bottom | 🔴 **Directly on-message** |
| `best-sovereign-enterprise-crm-platforms-philippines` | Bottom | 🔴 **On-message + sovereignty angle** |
| `operations-management-system-vs-crm-guide` | Top | 🔴 **Category education — highest leverage** |
| `best-autonomous-voice-ai-agents-call-centers` | Bottom | 🟡 Supports the AI pillar |
| `on-premise-office-server-datacenter-setup-guide-2026` | Top | 🟡 Supports the sovereignty pillar |

**The first three already reinforce the platform story.** They are simply not visible from the homepage.

## Placement options

| Option | Placement | Trade-off |
|---|---|---|
| **A. Dedicated section** | One homepage section with 3 featured posts | Most visible. **Adds ~150–250 words** to a page we're trying to shorten. |
| **B. Inline proof module** | 2–3 linked article cards inside TheDifference or the Platform Index | Saves a section. Less prominent. |
| **C. Sidebar / secondary** | Below the fold, after Pricing | Zero word-budget cost. Weakest visibility. |
| **D. Both** | Featured cards in Platform Index + full `/blog` link | Balanced. |

### Recommendation: **D**

- **2 featured cards** in the Platform Index area — titled to reinforce the platform, not the blog
- **1 inline link** in `TheDifference` ("we explain why this is not another CRM")
- **Full library** at `/blog`, already linked in the sitemap

**Framing matters:** the homepage should link to the blog as *evidence*, not as a content hub. Titles like *"Why an OMS is not a CRM"* outperform *"Read our blog"* — the former makes a point, the latter asks for a click.

## Content gap — if growth follows

The five posts cluster on the collections/OMS axis. To support a broader platform story, consider:

| Theme | Why |
|---|---|
| PTP automation & broken promises | Pillar 1, high commercial intent |
| Predictive dialler economics (dead air, talk time) | Pillar 2, supports the 98.4% claim |
| Field collection fraud & mileage | Pillar 3, a real industry pain |
| BSP Circular 454/857 compliance in practice | Trust + sovereign differentiator |
| Why zero per-seat pricing changes the maths | Attacks the competitor price point directly |

> **Sequencing note:** do not create posts to fill the homepage. The two-feature + link approach works with what exists. Write new posts once the four pillars are live, so there is product to write about.

---

# Part G — Consolidated Execution Order

```
PHASE -1 — MAKE THE SITE VISIBLE          ← nothing below this compounds without it
  1. Add + verify https://www.boundlessits.com/ in GSC
  2. Confirm one host serves each URL (no duplicate content)
  3. Fix sitemap — remove redirecting URLs, add the three /operations-360 pages
  4. Submit sitemap; inspect Indexing → Pages for crawl errors

PHASE 0 — AI VISIBILITY + CONTENT
  5. Repair llms.txt — repoint redirecting URLs, 4 pillars, module framing
  6. Structured data: Organization + SoftwareApplication + BreadcrumbList
  7. Blog credibility module on the landing page (2 featured + inline link)

PHASE 1 — COLLAPSE (Option 2)
  8. Rebuild /operations-360/crm with five named sections
  9. Carry over JSON-LD, comparison table, FAQs
  10. Add 6 collapse redirects
  11. Repoint internal links (~15)
  12. Fix "BITScrm Suite" pricing link

PHASE 2 — HOMEPAGE
  13. Build Platform Index from the registry model
  14. Split FeaturesHero / FloorShowcase into four pillars
  15. Add OMS 360 mentions to the seven name-neutral sections
  16. Reassign homepage keywords

PHASE 3 — SURFACE
  17. Brandbook + 55 copy locations → 15 (wait until collapse lands)
  18. Blog interlinks to /operations-360
  19. Custom analytics events ← GATE
```

> **Phase -1 gates everything.** With 0 indexed pages, no restructure has a measurable outcome.

---

## Success Criteria

| Metric | Baseline | Target | Window |
|---|---|---|---|
| `/operations-360` indexed | ❌ absent from sitemap | ✅ indexed | 2 weeks |
| Head terms ranking (`top oms`, `collections crm ph`) | *Step 15* | page 1 | 90 days |
| Homepage → `/operations-360` clicks | *Step 15* | +25% relative | 30 days |
| Contact-form qualified rate | *Step 15* | no decline | 30 days |

---

## Open Items

| # | Item | Owner |
|---|---|---|
| 1 | Pre-flight GSC check on the 4 collapsing catalogue URLs | Marketing |
| 2 | Confirm the progressive-activation promise stays (Option 2 basis) | Product owner |
| 3 | `npm audit fix` — 1 critical, 2 high | Engineering |

---

*Boundless IT Solutions — BITS Core Architecture Group*
*Contact: `bits_inquiries@boundlessits.com`*