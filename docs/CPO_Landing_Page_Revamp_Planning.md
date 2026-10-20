# CPO Landing Page Revamp — Planning & Execution

**Author:** Principal Full-Stack Engineering (CPO review)
**Organization:** Boundless IT Solutions (BITS)
**Date:** October 2026
**Status:** In progress — Step 1 executing
**Companion:** [`CPO_Landing_Page_Documentation_Plan.md`](./CPO_Landing_Page_Documentation_Plan.md) (strategy, audit, decisions)

---

## Purpose

This document is the **execution plan**. It turns the locked strategy in the companion document into concrete steps, in order, with what each step touches.

### Locked Strategic Position

> **Operations 360 is the platform.** BITScrm and BITSagent AI are modules inside it, not rival products.

| Confirmed | Decision |
|---|---|
| ✅ | OMS 360 is the platform |
| ✅ | Homepage is registry-driven with an optional `featured` flag |
| ✅ | C2 self-cannibalisation — **collapse** |
| ✅ | Catalogue claim — **"16 products, 4 in Operations 360"** |
| ✅ | No monetary values published; pricing is meeting-only |
| ✅ | Sequencing — **Option C**: structure now, word-count trim later |
| ✅ | Pricing structure — **B now, A later** |
| ✅ | Vercel Analytics; custom events as the gate before Phase 2 |

---

## Operations 360 — Four Confirmed Pillars

Confirmed by product owner. This is the substance of the homepage narrative.

| # | Pillar | Value delivered |
|---|---|---|
| 1 | **Collections CRM & PTP** | 360° dossiers, DPD aging, PTP automation, broken-promise alerting |
| 2 | **Predictive Dialer** | Sub-350ms pacing, ~98.4% live voice, no desk phones |
| 3 | **Field Agents App** | GPS-geofenced proof-of-visit, e-signature, offline sync |
| 4 | **Real-time QA Scoring** | 100% call audit, sentiment, prohibited-phrase and quiet-hour flags |

> **⚠️ Known defect:** the shipped `/operations-360` page has **three** pillars — Field Agents and QA were merged into one card. Step 3 splits them into four.

---

## Current Homepage Shape (14 sections)

| # | Section | Words | Names OMS 360? | Disposition |
|---|---|---|---|---|
| 1 | Hero | 350 | ✅ 5× | Keep, trim |
| 2 | TrustStrip | 183 | ❌ | Keep |
| 3 | ProductFamilies | 668 | ✅ 1× | **→ replaced by Platform Index** |
| 4 | SolutionFinder | 254 | ❌ | Keep |
| 5 | TheDifference | 704 | ❌ | Halve |
| 6 | StatsStrip | 591 | ✅ 5× | Merge into Hero |
| 7 | FeaturesHero | 747 | ✅ 1× | → Pillar 1 |
| 8 | FloorShowcase | 1,176 | ❌ | Split → Pillars 2–4 |
| 9 | Industries | 450 | ❌ | **→ replaced by Platform Index** |
| 10 | Security | 260 | ❌ | → `/security` |
| 11 | DeploymentModels | 1,659 | ❌ | **→ `/deployment`** |
| 12 | Pricing | 1,273 | ✅ 9× | Compress in place |
| 13 | FAQ | 279 | ❌ | 6 questions |
| 14 | Contact | 437 | ✅ 2× | Never cut |
| | **TOTAL** | **5,493 measured** | 6 of 14 | Target ~2,800 |

---

# Execution Steps

## Step 1 — Registry-Driven Homepage Data Model ⏳ *executing*

**Goal:** Make "launch a new product" a **one-entry** change instead of an eight-file edit.

### Why this is first

Every later step reads from this model. Building the UI (Step 3) on top of a hardcoded section means rebuilding it the first time a product launches.

### Current state — problems found

| # | Problem | Evidence |
|---|---|---|
| 1 | **Two product registries have drifted** | [`registry.ts`](../lib/products/registry.ts) uses `crm-sales` / `crm-support` / `crm-marketing` / `crm-commerce`; [`bitsProducts`](../lib/site.ts) uses `sales` / `support` / `marketing` / `commerce`. Same products, different IDs. |
| 2 | **Duplicate entry** | `operations-360` **and** `crm-collections` both carry `shortName: "Operations 360"` and the same `marketingUrl`. |
| 3 | **Stale marketing URLs** | `operations-360` and `crm-collections` still point at `/#operations-360` — the removed anchor. |
| 4 | **No homepage concept exists** | `ProductMvpConfig` models *routing and demo personas*. It has nothing for "does this appear on the homepage, in what role, at what priority." |
| 5 | **No `featured` flag** | Nothing distinguishes a flagship from a supporting product. |

### Scope

**Data only. No UI in this step.**

| Task | Detail |
|---|---|
| Extend `ProductMvpConfig` | Add an optional `homepage` block |
| Add `HOMEPAGE_PRODUCTS` model | OMS 360 as platform, 4 pillars, 2 modules, portfolio |
| Add `featured` flag | Optional promotion to hero slot |
| Fix stale URLs | `operations-360`, `crm-collections` → `/operations-360` |
| Deduplicate | Retire `crm-collections` as an alias of `operations-360` |

### The model

```
Platform ── Operations 360  [featured: true]
              │
              ├── Pillar 1  Collections CRM & PTP
              ├── Pillar 2  Predictive Dialer
              ├── Pillar 3  Field Agents App
              ├── Pillar 4  Real-time QA Scoring
              │
              ├── Module A  BITScrm      → /operations-360/crm
              └── Module B  BITSagent AI → /operations-360/ai

Portfolio ── 12 remaining products (listed, linked, never explained)
```

### Deliverable
A new product enters the homepage by adding one object to `HOMEPAGE_PRODUCTS`. Setting `featured: true` promotes it. Nothing else changes.

---

## Step 2 — Collapse the CRM Family

**Goal:** Stop seven pages competing for the head term; concentrate authority on the platform.

### Scope reality check

This is **one substantial page, four data rows, and one dead alias** — not six substantial pages:

| URL | What it is |
|---|---|
| `/products/crm` | **Bespoke — 762 lines, 36 KB** |
| `/products/sales` | Data entry, generic template |
| `/products/support` | Data entry, generic template |
| `/products/marketing` | Data entry, generic template |
| `/products/commerce` | Data entry, generic template |
| `/products/service` | Dead alias → `collections` |

### Why collapse is right

All four data entries are **already branded as CRM modules**:

```
/products/sales     → "BITScrm Sales"
/products/support → "BITScrm Support"
/products/marketing → "BITScrm Marketing"
/products/commerce  → "BITScrm Commerce"
```

The naming already treats them as modules. Collapse makes the URLs match what the branding says. **No product range is reduced.**

### Tasks

| # | Task |
|---|---|
| 1 | Inventory `/products/crm`'s 762 lines — **confirm with product owner what survives** |
| 2 | Absorb content into `/operations-360/crm` |
| 3 | Decide: four named BITScrm sections, or fold into one narrative |
| 4 | Add 7 permanent redirects (6 CRM-family + `ai-agent`) |
| 5 | Repoint ~15 internal links |
| 6 | Fix "BITScrm Suite" pricing entry → `/operations-360/crm` |

### Decision needed — Task 3

| Option | Result |
|---|---|
| **Four named sections** *(recommended)* | Preserves commercial surface. A buyer wanting a helpdesk still sees it. |
| Fold into one narrative | Cleaner, shorter. A team shopping for "support desk" finds nothing named. |

**Recommend four named sections** — collapsing URLs is free and reversible; losing products is not.

### Risk
Low, **except** task 1. `/products/crm` holds 762 lines of real content. Anything not absorbed is lost from public view. Inventory first.

---

## Step 3 — Platform Index + OMS 360 Spine

**Goal:** Replace three sections with one hub, and make the page *circle* Operations 360.

### 3a. The Platform Index

Replaces `ProductFamilies` + `Industries` + `DeploymentModels` — **2,777 words → ~180**.

```
OPERATIONS 360 — THE PLATFORM

  ┌───────────────┬───────────────┬───────────────┬───────────────┐
  │ Collections   │ Predictive    │ Field Agents  │ Real-time     │
  │ CRM & PTP     │ Dialer        │ App           │ QA Scoring    │
  └───────────────┴───────────────┴───────────────┴───────────────┘

  MODULE A — BITScrm          MODULE B — BITSagent AI

  AND 12 MORE — Accounting, HRMS, Logistics, Booking, Queuing…
  [ Browse the full catalogue → ]
```

Reads from the Step 1 model. New products appear automatically; `featured: true` promotes one to a hero slot.

### 3b. The OMS 360 Spine

**The measured problem:** OMS 360 is named in only **6 of 14** sections. Seven never say it — including `FloorShowcase`, the most OMS-heavy section on the page.

**The principle:** the name should **recur at every point where the reader asks a different question** — *what is this? does it fit me? is it safe? is it mine? what does it cost?*

| # | Section | Names OMS 360? | Change |
|---|---|---|---|
| 1 | Hero | ✅ 5× | Link onward to `/operations-360` |
| 2 | TrustStrip | ❌ | — |
| 3 | **Platform Index** | 🆕 | **The hub — define it** |
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

### Tasks
- [ ] Build Platform Index from the Step 1 model
- [ ] Split `FeaturesHero` / `FloorShowcase` into four pillars
- [ ] Add OMS 360 mentions + `/operations-360` links to the seven name-neutral sections
- [ ] Remove `ProductFamilies`, `Industries`, `DeploymentModels` from the homepage

### Risk
Medium — touches seven sections. Mitigated because the spine **adds** reinforcement rather than removing content.

---

## Step 4 — Catalogue Count + Pricing Hygiene

| Task | Detail |
|---|---|
| Reconcile **18 → 15** | 55 locations: copy, brandbook, `llms.txt`, `llms-full.txt`, metadata |
| Repoint "BITScrm Suite" pricing | → `/operations-360/crm` |
| Brandbook font specimen | Change `"₱1,850 / seat / month"` to a neutral string |
| Remove duplicate pricing entry | "Universal White-Label Partner" and "Universal White-Label" are the same product |

### ⚠️ Corrected catalogue arithmetic

**Earlier drafts of this plan claimed the site would say "16 products". That figure was wrong.** It was derived from `bitsProducts` in `lib/site.ts` while the actual product registry is `PRODUCT_REGISTRY` in `lib/products/registry.ts`. The two have drifted — same products, different IDs and different totals.

Measured against `PRODUCT_REGISTRY`:

```
19 registry entries
 − 1 subdomain alias (crm-collections → Operations 360)
 = 18 canonical products          ← CURRENT TRUE COUNT

After Step 2 collapse:
 − 3 collapsed (crm-support, crm-marketing, crm-commerce)
 = 15 canonical products          ← POST-COLLAPSE TRUE COUNT
```

> **Correction: the claim is "15 products. Operations 360 is one of them — 4 core
> capabilities, one platform."** Not "4 of them in Operations 360" — the four
> pillars are core capabilities inside one product, not four products.
> It also drops to **18 until Step 2 lands**, so **do not run the 55-location copy sweep until the collapse is complete.**

### Copy rule
> **15 products. Operations 360 is one of them — 4 core capabilities, one platform.**

Apply identically everywhere. This phrasing is chosen because it does marketing work — it tells a prospect the bundle exists before the sales call.

### Drift protection — already implemented in Step 1

`CATALOG_CLAIM` in [`lib/products/platform.ts`](../lib/products/platform.ts) is now **derived from the registry at runtime**, not hardcoded:

```ts
export const CATALOG_COUNT = getCanonicalProducts().length;
export const CATALOG_CLAIM = `${CATALOG_COUNT} products, ${OPERATIONS_360.pillars.length} of them in Operations 360`;
```

This was done because the hardcoded `16` was **already wrong** when first written. A number that computes itself cannot silently drift again — which matters given new products will launch regularly.

---

## Step 5 — Custom Analytics Events *(the gate)*

Pageview tracking is already live via `@vercel/analytics`. This step adds the events that make the Phase 2 decision measurable.

| Event | Purpose |
|---|---|
| `scroll_depth` at 25 / 50 / 75 / 100% | Is the page actually losing people? Where? |
| `cta_click` per section | Which sections convert? |
| `platform_index_view` | Does the new hub get seen? |

### The gate
> **No word-count reduction begins until these events have a baseline.**

---

## Rev 6 — Benchmark-Driven Revamp

Added after measuring monday.com live (rendered DOM, not impression). Full
analysis: [CPO_Monday_Structure_Benchmark.md](./CPO_Monday_Structure_Benchmark.md).

### The finding that reframed the brief

| | monday.com | BITS |
|---|---|---|
| Scroll length | 12.7 screenfuls | 14.2 |
| Visible words | 2,343 | **1,722** (already leaner) |
| H2 sections | **14** | 8 |
| Words per section | 167 | 215 |

**BITS is not wordier than monday.com — it is fewer and heavier.** The transferable
principle is not "use less copy" (already true) but:

> **Release a new idea per screen.**

Two sections hold 6 of the 14.2 screens:

| Section | Screens |
|---|---|
| platform-index | 3.64 |
| pricing | 2.44 |

### Change 1 — Split the platform index into two beats

The static pair (Collections CRM & PTP, Predictive Dialer) and the pinned pair
(BITS FILO, BITS AIQA) run as one continuous hold. Make the break a full screen
transition so the pinned sequence lands as a payoff rather than a continuation.

```
SCREEN 1   THE PLATFORM          Collections CRM & PTP · Predictive Dialer
           ↓ scroll
SCREEN 2   WHAT SETS US APART    BITS FILO  →  BITS AIQA   (pinned)
```

**No new copy.** Pure re-sequencing.

### Change 2 — Pricing: cut feature lists in half, split tiers from proof

Currently tier 1 has 6 features (~47 words), tiers 2 and 3 have 7 each (~57-59).

```
PRICING TIERS   3 cards side by side, 4 bullets each     ~1.0 screen
WHY BITS        4 value pillars, icon + title + one line  ~0.6 screen
```

The four value pillars (Zero Per-Seat, BSP & NPC Sovereignty, Zero PBX Markup,
Turnkey Migration) are already a 4-up grid — they only need to come out from
under the tiers. Saves ~0.8 screens, no loss of substance.

### Change 3 — Trust as a marquee proof band

The trust strip currently sits at position 2 of 7, so trust is stated then
forgotten for the next ten screens. There is **no logo bar, no customer proof
and no case-study metric anywhere on the homepage.**

monday proves enterprise trust in ~0.4 screens of badges. The six standards
already render today in the trust strip — this promotes them into a closing
proof band.

```
TRUSTED BY RECOVERY FLOORS   ← scrolling row, ~0.3 screens
BSP 454/857 · NPC RA 10173 · SEC MC 18 · ISO/IEC 27001 · CIC RA 9510 · DICT
```

Placed after FloorShowcase, before Pricing — where a buyer asks "can I trust
this with my data?"

### Change 4 — One CTA after the platform index

`platform-index.tsx` has **zero** CTA references. A buyer sold by the platform
section must scroll three more sections to act. One quiet "Request a quote"
at the foot of the section, ~0.1 screen.

### Change 5 — Check FloorShowcase earns its 1.62 screens

Six tabs, close to monday's own six-tab pattern. If thin per tab, the fix is
the same as pricing: four tabs, more content each. **Look before touching** — it
is the only interactive demo on the page.

---

## Animation Plan

monday.com's animation vocabulary, measured from its compiled CSS and live DOM:
14 `@keyframes`, 4 autoplaying `<video>`, zero canvas or Lottie, sticky nav, and
a `scroll-parent` wrapper for scroll-linked behaviour.

BITS today: `float`, `pulse-glow`, `count-up`, `shimmer`, `cloud-drift`,
`stripe-slide`, GSAP in two live sections, `Reveal.tsx` on IntersectionObserver,
zero video.

### Adopt

| # | Animation | Finding | Where | Cost |
|---|---|---|---|---|
| A1 | **Scroll-reveal** | monday's `subtleFade` / `subtleSlideFade` | Same mechanism as BITS `Reveal.tsx` — applied per element as it scrolls | Free — already built, needs wider application |
| A2 | **Infinite marquee** | `scrollMarquee`, 21.25s infinite | The trust/proof band (Change 3) | ~0.3 screens |
| A3 | **Animated gradient mesh** | `wf-stop1-A`/`wf-stop2-A`, 3s infinite | Hero and platform sky — the hue shifts slowly | CSS only |
| A4 | **Orb swoosh** | `orbSwoosh`, 6s infinite | Behind the platform section | Cheap, but keep restrained — it competes with the glass treatment |

### Do not adopt

| # | Animation | Why |
|---|---|---|
| X1 | `magic-bounce-scale`, `shakeAnimation`, `tagAnimation` | Playful attention-grabbing. Wrong register for a regulated collections platform. Keep BITS restrained. |
| X2 | 4 autoplaying `<video>` | Autoplay is a performance and accessibility cost, and there is no real product video. Static UI captures are stronger for a demo-led page, and cheaper. |
| X3 | `spin`, `splide-loading`, `swiper-preloader-spin` | Loader states for carousel libraries. BITS uses no carousel; loading spinners are not a premium signal. |

### Animation constraints

- Honour `prefers-reduced-motion` — every marquee, mesh and orb must have a
  static fallback. BITS already gates its GSAP work; extend that to the new
  animations.
- No animation may add scroll length. Marquee and mesh are in-place.
- Motion conveys meaning, not decoration. A3 and A4 may only run where the
  content beneath them is not the thing being read.

---

## Expected Result — ACTUALS (Rev 7, post-implementation)

| | Before | Projected | **Actual** |
|---|---|---|---|
| Sections | 7 | 9 | **8** |
| Screenfuls | 14.2 | ~12.6 | **14.6** |
| Trust before Contact | ✗ | ✓ | ✓ proof band |
| CTA after platform | ✗ | ✓ | ✓ |
| Animation vocabulary | 6 keyframes, static sky | 9 | **9** |

### Why the projection was wrong

The 12.6 estimate assumed the proof band would be near-free and the platform
split would not add height. Measured:

| Change | Screenfuls |
|---|---|
| Proof band (new section) | **+0.36** |
| Platform split — CTA row + taller image box | **+0.26** |
| Pricing — feature lists capped at 4 | **−0.13** |
| **Net** | **+0.49** |

The proof band is a deliberate addition that fills a real gap, and the platform
split added a CTA and a larger image box. The pricing trim was real but smaller
than modelled.

**The pinned beat is 3.0 screens for two cards.** That is the cost of the scroll
investment, and it is the single largest remaining lever if length matters more
than the payoff.

## Rev 7 — Implemented

All five changes and the motion pass shipped in `db37ee0`.

Two bugs were found and fixed during verification:

- The pinned image wrapper had no height, so `h-full` collapsed the image to
  zero and the FILO panel rendered blank. Fixed with an explicit aspect ratio.
- The second pinned card is translated 100vh down, so `next/image`'s lazy loader
  deferred it — AIQA arrived blank as the card animated in. Both pinned images now
  preload.

Motion: A1 scroll-reveal was already in place at 29 sites, so nothing to add.
A2 marquee, A3 sky drift and A4 orb are new. The pinned stack now runs under
`gsap.matchMedia` with `(prefers-reduced-motion: no-preference)`, so
reduced-motion users get a plain stacked list rather than a pinned scroll.

De-duplication: the proof band deliberately does NOT repeat the six regulatory
standards. The trust strip at position 2 carries those as logos. The trust strip
answers "are we compliant"; the proof band answers "what do I get".
---

## Ordering

```
CHANGE 1  Platform index split        pure re-sequencing, lowest risk
CHANGE 2  Pricing split               re-sequencing + copy trim
CHANGE 4  CTA after platform          one link
CHANGE 3  Trust marquee band          adds a section — needs data to validate
A1–A4     Motion pass                 after layout settles, with reduced-motion fallbacks
```

Changes 1, 2 and 4 rearrange how content is sequenced, not what it says.
Change 3 and the animation pass are the ones that add, and they should land
last — and ideally after the analytics gate has a baseline.

---

## The Caveat That Applies To All Of It

**None of this is validated against real behaviour.** The analytics events were
only recently added and nothing has been live long enough to have data. The
animation vocabulary is objective — it was measured from compiled CSS and the
live DOM. The judgement that BITS should carry more of it is a taste call, not
a finding.

## Success Criteria

| Metric | Baseline | Target | Window |
|---|---|---|---|
| Homepage → `/operations-360` click rate | *Step 5* | +25% relative | 30 days |
| `/operations-360` organic impressions | *Step 5* | +40% | 60 days |
| Contact-form qualified rate | *Step 5* | no decline | 30 days |
| Scroll depth at 50% | *Step 5* | +10 pts | 30 days |

> No baseline exists until Step 5 ships.

---

## Open Items

| # | Item | Owner | Blocking |
|---|---|---|---|
| 1 | Inventory `/products/crm` — what survives the collapse? | Product owner | Step 2 |
| 2 | Four named BITScrm sections vs one narrative | Product owner | Step 2 Task 3 |
| 3 | `npm audit fix` — 1 critical, 2 high | Engineering | Independent |
| 4 | Brandbook font specimen monetary string | Engineering | Step 4 |

---

*Boundless IT Solutions — BITS Core Architecture Group*
*Contact: `bits_inquiries@boundlessits.com`*