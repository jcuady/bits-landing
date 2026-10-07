# BITS Website — Strategic Structure Plan

> **Purpose:** Make the whole site straightforward, easy to navigate, and impossible to overwhelm. Cut what repeats. Add what's missing. Give every section exactly one job.
> **Date:** 2026-10-06
> **Scope:** Public marketing surface only (`app/(marketing)`, `app/demo`). Product-app routes are out of scope.
> **Companion doc:** `LANDING-PAGE-REV-2026-10-06.md` (message + copy fixes)

---

## The one-paragraph version

The site has real substance. It also has **14 homepage sections, 8 navigation items that are all just scroll-to-anchor links, 4 different routes serving the same CRM content, and three section files over 44 KB each.** The problem is not missing content — it's **too much visible at once**. This plan reduces the homepage from 14 sections to **7**, reduces primary navigation from 8 anchors to **4 real pages**, collapses 4 duplicate CRM routes to **1**, and fills the 3 genuine gaps (customer proof, machine-readable pricing, named flagship pages).

---

## Part 1 — The Diagnosis

### 1.1 Primary navigation points nowhere

`lib/site.ts` `navItems`:

```
The Difference     → /#the-difference
Floor Engines      → /#floor-showcase
Productivity Bento → /#features-bento
Industries         → /#industries
Security           → /#security
Deployment         → /#deployment
Solution Packages  → /#pricing
FAQ                → /#faq
```

Eight items. **All eight are anchors on the page you're already on.** There is no `Products` in the main nav, no `Pricing` as a page, no `Contact`. A visitor who lands on any page other than the homepage has a nav bar that does nothing.

Two of these labels are also internal-only vocabulary. "Floor Engines" and "Productivity Bento" are names your team uses, not names buyers use. A bank compliance officer does not search for a "bento."

### 1.2 Homepage runs 14 sections before the contact form

`app/(marketing)/page.tsx`:

```
 1 Hero               8 FloorShowcase
 2 TrustStrip         9 Industries
 3 ProductFamilies   10 Security
 4 SolutionFinder    11 DeploymentModels
 5 TheDifference     12 Pricing
 6 StatsStrip        13 FAQ
 7 FeaturesHero      14 Contact
                     (+ 5 more in the component set: Ecosystem,
                      CustomSolutions, Process, WhyBits, CTABanner)
```

On mobile that is a long scroll before anyone reaches a form. Three sections overlap in purpose: **FeaturesHero**, **FloorShowcase**, and **ProductsSuite** all show product capability. A second overlap: **TheDifference** and **WhyBits** are both "why choose us."

### 1.3 Three oversized section files

| File | Size | Problem |
|---|---:|---|
| `components/sections/products-suite.tsx` | **223 KB** | Duplicates what `/products` already lists |
| `components/sections/hero-product.tsx` | 60 KB | Second hero competing with `hero.tsx` |
| `components/sections/deployment-models.tsx` | 49 KB | Six deployment permutations on one page |
| `components/sections/product-showcase.tsx` | 47 KB | Third product showcase |
| `components/sections/features-bento.tsx` | 45 KB | Fourth capability grid |
| `components/sections/crm-variants-explorer.tsx` | 44 KB | CRM variants belong on `/products/crm` |

Roughly 470 KB of section markup rendering overlapping content. This is why the page feels heavy: it's not one clear argument, it's five partially-repeating ones.

### 1.4 Four routes serve CRM content

```
app/(marketing)/bitscrm/page.tsx                    ← legacy
app/(marketing)/products/crm/page.tsx               ← BITScrm Suite hub
app/(products)/crm-sales/page.tsx                   ← CRM Sales product
app/(products)/crm-sales/{pipeline,leads,cpq}/      ← in-app demo routes
```

Plus `app/(marketing)/products/[slug]/page.tsx` already renders every product in `bitsProducts` by slug, which includes `sales`, `support`, `marketing`, `commerce`. So **BITScrm Sales exists twice** — once at `/products/sales` (from the slug route) and once at `/products/crm-sales`.

This splits link equity across four URLs for what a buyer experiences as one product family.

### 1.5 Brand tagline contradicts your own stated preference

`lib/site.ts`:

> `tagline: "Boundless operational velocity. The infinity in the 'B'—sovereign software built with the limitless scale of the cloud horizon."`

Two sentences of abstraction. You told me your branding is **straightforward words**. This tagline describes a feeling, not a product. It should be one plain sentence.

### 1.6 What genuinely exists and is good

Worth stating plainly, because the plan below is mostly subtraction, not invention:

- 18 products in a single typed `bitsProducts` array with clean slugs
- 4 product families with per-family problem statements
- 6-solution finder, written in buyer language
- 5 pricing editions with per-edition CTAs
- FAQ with real `FAQPage` JSON-LD
- AEO stack (`llms.txt`, `ai-catalog.json`, markdown content negotiation, 12+ crawler directives)
- Sitemap, robots, security headers, 11-viewport responsive suite

---

## Part 2 — Target Structure

### 2.1 Information architecture (7 top-level destinations, down from an undefined number)

```
BITS
│
├── /                      Homepage — the 7-section argument
├── /products              All 18 products, grouped in 4 families
│   └── /products/[slug]   18 individual product pages
│
├── /solutions             Who it's for — 6 problem tracks  ← NEW
│
├── /pricing               6 editions + bands + self-qualify tool  ← NEW
│
├── /security              Compliance, sovereignty, data residency  ← NEW
│
├── /blog                  5 posts today → 41 planned
│
├── /demo                  Interactive 18-product demo matrix
│
└── /contact               Consultation form (or /#contact)
```

**Navigation becomes 5 items, all real pages:**

```
Products   Solutions   Pricing   Security   Book a Consultation
```

The homepage anchors ("The Difference", "Industries", "Deployment", "FAQ") become **in-page links inside a slim secondary bar** or move into the footer. They were never navigation; they were a table of contents wearing a nav bar's clothes.

### 2.2 Homepage: 14 sections → 7

| # | Section | Job | Source | Change |
|---:|---|---|---|---|
| 1 | **Hero** | State what BITS is, route to all 4 intents | `hero.tsx` | **Revise copy** (see companion doc). 4 family pills, not 3 collections pills. |
| 2 | **Customer Proof** | Who already uses this | — | **NEW.** Logos + 3 attributed quotes + 1 case-study stat. Replaces `trust-strip.tsx`. |
| 3 | **Products** | Show the 18, grouped in 4 families | `product-families.tsx` | **Keep.** Add 6-product preview + "See all 18 →". |
| 4 | **Solutions** | "What are you trying to fix?" | `solution-finder.tsx` | **Keep.** Best asset on the page. Retitle section for clarity. |
| 5 | **How It Works** | 3 steps: scope → deploy → run | `process.tsx` | **Keep, simplify to 3 steps.** Replaces `the-difference.tsx` + `why-bits.tsx`. |
| 6 | **Deployment & Security** | Kill the sovereignty objection | `security.tsx` + `deployment-models.tsx` | **Compress to one scannable band.** Three deployment options, three security pillars, six compliance items. Move detail to `/security`. |
| 7 | **Pricing** | Let them self-qualify | `pricing.tsx` | **Add bands + "starting from".** Full detail moves to `/pricing`. |
| 8 | **FAQ + Contact** | Answer objections, capture the lead | `faq.tsx` + `contact.tsx` | **Keep.** |

**Removed from the homepage:**

| Component | Size | Why it goes |
|---|---:|---|
| `products-suite.tsx` | 223 KB | Duplicates `/products` |
| `features-bento.tsx` | 45 KB | Fourth capability grid; content moves to product pages |
| `floor-showcase.tsx` | 34 KB | Fifth showcase; Operations 360 gets its own page |
| `features-hero.tsx` | 23 KB | Overlaps section 3 |
| `stats-strip.tsx` | 20 KB | Product metrics, not customer proof — merge into the cockpit section |
| `ecosystem.tsx` | 22 KB | Overlaps product families |
| `the-difference.tsx` | 18 KB | Merged into "How It Works" |
| `ai-ecosystem.tsx` | 14 KB | Move to `/products/rag-engine` |
| `custom-solutions.tsx` | 12 KB | Move into `/contact` |
| `why-bits.tsx` | 8 KB | Merged into "How It Works" |
| `cta-banner.tsx` + `cta.tsx` | 8 KB | Redundant with section 8 |

**Net: −7 sections, −466 KB of section markup, one clear argument.**

### 2.3 Section rules — one job each

Every section must pass all four. If not, cut or merge.

1. **One sentence tells a visitor what this section is for.** If you can't write that sentence, the section isn't clear enough to exist.
2. **No section repeats a claim made earlier.** "BPS-ready" appears once. Everywhere else, link back.
3. **Every section has exactly one action.** Not two. Not three.
4. **Scroll depth earns its place.** If a section doesn't answer an objection a buyer actually has, cut it.

### 2.4 Product page template (all 18, one structure)

```
/products/[slug]

  1  HERO          Product name · one-line outcome · 1 CTA
  2  PROBLEM       The specific operational pain (2–3 lines, plain words)
  3  WHAT IT DOES  4–6 capabilities, each: feature → what it changes for you
  4  PROOF         1 metric, 1 screenshot, 1 quote (where available)
  5  FITS WITH     "Works with these other products" — cross-links
  6  CTA           Book a consultation
```

Rules:
- **Outcome before capability.** "Recover 38% more debt" beats "Predictive WebRTC dialer with 4 in-browser modes."
- **Every product page cross-links to at least 2 siblings.** This is what turns 18 pages from 18 dead ends into a 6-family cluster that Google reads as topical authority.
- **No product page invents numbers.** If a metric isn't verified, the section ships without it.

---

## Part 3 — The Gap List

### 3.1 Redundant — consolidate or remove

| # | Item | Action | Result |
|---:|---|---|---|
| R1 | `/bitscrm` (legacy) | 301 → `/products/crm` | One canonical CRM hub |
| R2 | `/products/crm-sales` | 301 → `/products/sales` | One canonical Sales page |
| R3 | `/products/crm-sales/pipeline`, `/leads`, `/cpq` | Keep as `/demo/*` or fold into `/demo` | App demos live under one demo root |
| R4 | `products-suite.tsx` (223 KB) | Delete from homepage; `/products` already exists | −223 KB |
| R5 | `hero-product.tsx` (60 KB) vs `hero.tsx` (14 KB) | Delete `hero-product.tsx` | −60 KB |
| R6 | `crm-variants-explorer.tsx` (44 KB) | Move into `/products/crm` body | Homepage lighter |
| R7 | `stats-strip.tsx` | Fold into Operations 360 section | No standalone section |
| R8 | `the-difference.tsx` + `why-bits.tsx` | Merge into one 3-step "How It Works" | −26 KB, one clear argument |
| R9 | `cta.tsx` + `cta-banner.tsx` | Delete; section 8 carries the CTA | −8 KB |
| R10 | `keywords` meta array | Delete (Google ignores it since ~2009) | Removes a maintenance trap |
| R11 | Nav labels "Floor Engines", "Productivity Bento" | Rename to buyer language, move to footer links | Nav reads like a website, not an internal outline |

### 3.2 Missing — build these

| # | Page | Why it must exist | Effort |
|---:|---|---|---|
| M1 | **`/pricing`** | Every CTA in the site dead-ends at a modal. Visitors can't compare editions without emailing you. Agents can't read gated pricing at all. | 2 days |
| M2 | **`/solutions`** | 6 problem tracks already exist in `solution-finder.tsx`. Give them a page so they're indexable and linkable from ads. | 1 day |
| M3 | **`/security`** | Compliance, sovereignty, data residency are decision-killers for banks. Right now they're two sections buried on the homepage. | 2 days |
| M4 | **Customer proof section** (homepage §2) | Zero logos, zero testimonials, zero case studies. This is the single largest conversion blocker. | Blocked on customer approval |
| M5 | **`public/pricing.md`** | Machine-readable pricing for AI agents. Same content as `/pricing`. | 2 hours |
| M6 | **Flagship pages:** `/operations-360`, `/bitsagent` | Operations 360 currently lives at `/#operations-360`, an anchor on the homepage. Your highest-value product deserves a real URL. | 2 days each |
| M7 | **`/case-studies`** | Once M4 has one customer, this page takes them. | 1 day |
| M8 | **Comparison pages** (3 priority) | `Operations 360 vs Salesforce` · `BITSagent vs Bland AI` · `BITS Accounting vs SAP Business One`. The `competitors` skill covers the format. | 3 days each |
| M9 | **404 + redirect map** | After R1–R3, you need a redirect table or you lose the link equity. | 2 hours |

### 3.3 Naming cleanup

| Current | Proposed | Reason |
|---|---|---|
| "Floor Engines" | "Collections Floor" or drop | Internal vocabulary |
| "Productivity Bento" | "Platform Capabilities" or drop | Internal vocabulary |
| "Solution Packages" | "Pricing" | Buyers look for that word |
| "RevOps" (hero eyebrow) | Remove | Excludes your actual buyer |
| `site.tagline` (2 sentences) | "Enterprise software that runs your operations." | You said straightforward words |

---

## Part 4 — Execution Order

### Week 1 — Structure (no new copy needed)

- [ ] Delete 11 redundant components from the homepage (−466 KB)
- [ ] Rebuild `page.tsx` to the 7-section order
- [ ] Replace `navItems` with 5 real page links; move old anchors to the footer
- [ ] Add 301 redirects: `/bitscrm` → `/products/crm`, `/products/crm-sales/*` → `/products/sales`
- [ ] Delete `keywords` meta array
- [ ] Swap `Plus_Jakarta_Sans` → `Outfit` in `app/layout.tsx`

### Week 2 — New pages

- [ ] Build `/pricing` with 6 editions, seat bands, and a self-qualify tool
- [ ] Build `/solutions` from the existing 6 tracks in `solution-finder.tsx`
- [ ] Build `/security` from the content currently in `security.tsx` + `deployment-models.tsx`
- [ ] Publish `public/pricing.md`

### Week 3 — Flagships

- [ ] Build `/operations-360` (move `/#operations-360` content to a real page, keep the anchor as a redirect)
- [ ] Build `/bitsagent` — exists; audit it against the new product template
- [ ] Apply the 6-block template to the top 3 products

### Week 4 — Proof (blocked on customers)

- [ ] Add homepage §2: logos + 3 quotes + 1 case stat
- [ ] Build `/case-studies`
- [ ] G2/Capterra listings (3 products minimum)

### Month 2–3 — Depth

- [ ] 3 priority comparison pages
- [ ] Remaining 15 products onto the template
- [ ] Content cadence: 1 searchable + 1 shareable + 1 experimental per month
- [ ] Benchmarks stats page (the `content-strategy` skill notes stats roundups earn ~4× their page share in B2B link equity)

---

## Part 5 — Guardrails

Write these down so future changes don't re-bloat the site.

1. **Section cap:** 8 max on any page. Currently the homepage is at 14.
2. **Nav cap:** 6 items max. Anchors are not nav items.
3. **One canonical URL per product.** If a second route serves the same content, it 301s.
4. **One claim, one section.** No repeating a differentiator to fill space.
5. **No number without a source.** If the metric isn't verified, the section ships without it.
6. **Plain words.** Every section title readable by a bank compliance officer, a warehouse manager and a clinic owner on first pass.
7. **New page requires a reason.** A new page exists because a buyer searches for it, or because a campaign links to it. Not because we had an idea.

---

## Part 6 — What success looks like in 90 days

| Metric | Now | Target |
|---|---:|---:|
| Homepage sections | 14 | 7–8 |
| Primary nav items that are real pages | 0 of 8 | 5 of 5 |
| Duplicate content routes | 4 | 0 |
| Product pages on the standard template | 0 of 18 | 6 of 18 |
| Indexed non-homepage pages | ~7 | ~14 |
| Customer logos on homepage | 0 | 4+ |
| Testimonials | 0 | 3+ |
| Machine-readable pricing | No | Yes |
| Published pricing bands | No | Yes |

---

*Companion: `LANDING-PAGE-REV-2026-10-06.md` covers the message — hero copy, positioning, SEO and AI-visibility. This document covers the structure. Both point at the same goal: a site a buyer can understand in 15 seconds.*
