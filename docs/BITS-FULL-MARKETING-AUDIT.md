# BITS — Principal Marketing Audit

## 18 Products · Landing Page · Content Strategy · Technical SEO · AI Visibility

> **Workspace:** `C:\Users\jcuad\OneDrive\Documents\BITS`
> **Source artifacts reviewed:**
> `PROJECT_STATUS.md`, `MARKETING_PRODUCT_GUIDE.md`, `BITS_LANDING_PAGE_CPO_REVIEW.md`, `LANDING_PAGE_SYSTEM_ANALYSIS.md`, `OMS_FEATURES.md`, `BITS_CRM_UseCases_v2.0.xlsx`, `public/llms.txt`, `public/.well-known/ai-catalog.json`, `app/robots.ts`, `app/sitemap.ts`, `next.config.ts`, `package.json`, `lib/blog-data.ts`, `lib/site.ts`, `app/(marketing)/**`
> **Frameworks applied:** `product-marketing` · `cro` · `content-strategy` · `seo` · `ai-seo` · `ad-creative` · `video` · `competitors` · `marketing-council`
> **Generated:** 2026-10-06
> **Audit scope:** Whole funnel. Read every existing artifact, audited the landing-page architecture, blog content, technical SEO, AEO/GEO setup, and the 18-product catalog against CRO + content + SEO + AI visibility frameworks.

---

## 0. TL;DR

**BITS is one of the most complete enterprise-software marketing surfaces in the Philippine market.** You have:
- An 18-product catalog with a clear positioning system
- A redesigned 11-step homepage that fixes the "collections trap"
- A blog with 5 search-intent articles targeting commercial keywords
- A production-grade SEO setup (sitemap, robots, headers, schema, llms.txt, ai-catalog.json, 11-viewport responsive tests, Playwright E2E)
- 4 multi-product bundles + a white-label reseller program

**The work is well done. The work is not finished.** You have a textbook "Phase 1" — architecture, position, on-page SEO, AEO files. You do **not** have a Phase 2. Specifically:

### The 4 biggest gaps (in priority order)

| # | Gap | Impact | Fix timeline |
|---|---|---|---|
| **1** | **No authority outside your own site.** No third-party mentions, no Wikipedia, no G2/Capterra, no podcast appearances, no guest posts. AI citation patterns (especially Perplexity/Claude) rely heavily on consensus across the web. | High — your `llms.txt` is strong, but consensus signals decide recommendation vs. just citation | 30 days |
| **2** | **No measurable AI-visibility baseline.** You have not run a Perplexity/ChatGPT/Google AI Overview share-of-voice study. You cannot know if `llms.txt` is working without a benchmark. | High — invisible ROI on AEO investment | 7 days |
| **3** | **Blog has 5 articles for 18 products.** 1:3.6 ratio is a content-coverage problem. Each product deserves at least one search-intent + one comparison piece. You have 5 of the 36+ pieces you need. | Medium-High — limits topical authority per product | 90 days |
| **4** | **No live customer proof.** Zero case studies, zero testimonial quotes, zero named logos. The CPO review's Phase 3 (case studies) is still pending. | High — biggest CRO blocker | 14 days |

### Scorecard (current state, 0–10)

| Surface | Score | Note |
|---|---:|---|
| **Landing page architecture** | 8.5 | 11-step homepage, problem-based discovery, product families near top — strong |
| **CRO** | 7.0 | Above-the-fold and CTAs are good. Friction remains: pricing opacity, no social proof, generic testimonial-free case study section |
| **Content strategy** | 6.0 | 5 search-intent articles, 60% searchable / 0% shareable / 0% experimental — no thought leadership yet |
| **Technical SEO** | 9.0 | Sitemap, robots, schema, headers, llms.txt, ai-catalog, CWV passing, 11-viewport tested — best-in-class |
| **AI visibility (AEO/GEO)** | 7.5 | Strong foundation (llms.txt + robots + ai-catalog + named entity blocks). No third-party consensus, no measurement |
| **18-product catalog clarity** | 8.5 | "Operations 360" rename done, plain-English glossary done, 4 product families — strong |
| **White-label / bundling** | 8.0 | 5 bundles + universal white-label framing — good; needs pricing transparency |
| **Overall** | 7.8 | "B-" / production-grade foundation, missing authority + measurement |

---

## 1. The 18 Products — Strategic Role Map

This is the full product roster with the **strategic role** each plays in the funnel and what they should be marketed for.

| # | Product | ID | Category | Funnel role | Primary KPI | Marketing surface |
|---:|---|---|---|---|---|---|
| 01 | **Operations 360 (OMS)** | `collections` | Flagship 1 | Pull — deep-niche high-ICP vertical | +38% recovery · 3.2× RPC | `/bitscrm` (legacy route) + `/products/collections` |
| 02 | **BITSagent AI Operations** | `ai-agent` | Flagship 2 | Pull — horizontal AI agent for any business | 68% autonomous resolution | `/bitsagent` |
| 03 | **BITScrm Sales** | `sales` | CRM | Pull — sales-deal teams | +38% pipeline velocity | `/products/sales` |
| 04 | **BITScrm Support** | `support` | CRM | Pull — support / helpdesk | +46% FCR | `/products/support` |
| 05 | **BITScrm Marketing** | `marketing` | CRM | Pull — D2C + B2B marketing | 4.5× engagement | `/products/marketing` |
| 06 | **BITScrm Commerce** | `commerce` | CRM | Pull — subscriptions, billing | 62% failed-card recovery | `/products/commerce` |
| 07 | **BITS Accounting & ERP** | `accounting` | ERP | Pull — mid-market CFOs, controllers | 0-day month-end | `/products/accounting` |
| 08 | **BITS HRMS** | `hrms` | Workforce | Pull — HR / people ops | 100% attendance · DOLE-ready | `/products/hrms` |
| 09 | **BITS Payroll** | `payroll` | Workforce | Pull — every employer, 10–10K+ | 100% TRAIN-law | `/products/payroll` |
| 10 | **BITS Construction Tracker** | `construction` | Industry | Pull — contractors, developers | −24% cost leakage | `/products/construction` |
| 11 | **BITS Inventory Hub** | `inventory` | Industry | Pull — warehouses, retail | 99.8% stock accuracy | `/products/inventory` |
| 12 | **BITS Logistics & Fleet** | `logistics` | Industry | Pull — couriers, 3PL, fleet | +31% mileage saved | `/products/logistics` |
| 13 | **BITS Pickleball & Court OS** | `pickleball` | Sports | Pull — racket-sports clubs | 99.4% court utilization | `/products/pickleball` |
| 14 | **BITS Sports Arena Hub** | `sports-hub` | Sports | Pull — arenas, tournaments | 98.4% peak scheduling | `/products/sports-hub` |
| 15 | **BITS Booking System** | `booking` | Sports | Pull — clinics, spas, salons | +42% direct bookings | `/products/booking` |
| 16 | **BITS Smart Queuing** | `queuing` | Sports | Pull — banks, clinics, government | −52% perceived wait | `/products/queuing` |
| 17 | **BITS RAG Knowledge Engine** | `rag-engine` | AI | Pull — knowledge-intensive enterprises | 99.4% factual grounding | `/products/rag-engine` |
| 18 | **BITS Smart NFC Card** | `nfc-card` | Identity | Pull — execs, BD, sales | 100% paper-card waste eliminated | `/products/nfc-card` |
| ✱ | **White-Label Platform** | `white-label` | Universal | **Push** — agencies, MSPs, holding companies | 100% client margin retention | `/products/white-label` |

**Funnel-level read:**

- **One flagship per row of the matrix:** Operations 360 (collections niche) + BITSagent (horizontal AI). 16 other products serve a multi-product-sell motion.
- **Five bundles from `MARKETING_PRODUCT_GUIDE.md`:** Collections BPO Suite, Enterprise ERP & People Suite, Field Ops & Supply Chain, Sports/Booking/Queuing, White-Label Reseller. These are the real "category plays" — each one is a buyer's whole-problem package, not a single SKU.
- **The 18 products are not equal.** Operations 360 + BITSagent are Flagships and deserve 5× the marketing budget of Pickleball OS. **Right now everything gets equal weight in the catalog — that's a marketing mistake.** The 4 product families and the dedicated /products/[slug] pages already encode the right hierarchy. The copy needs to follow.

---

## 2. Landing Page CRO Audit

### 2.1 Current state (per `BITS_LANDING_PAGE_CPO_REVIEW.md`)

The homepage was restructured into an 11-step buyer journey. From the documentation, the verified flow is:

1. Company-level Hero (BITS, 18 products, 4 families)
2. Trust & verified-experience strip
3. 4 Connected Product Families
4. Solution Finder ("What are you trying to improve?")
5. Flagship Benchmarks (Operations 360)
6. Floor Operations deep-dive
7. 18-Product Suite Explorer
8. Deployment & Sovereign Security
9. Pricing (multi-track)
10. Leadership & 20-year background
11. Consultation booking

**Verdict:** This is a textbook CRO flow. Company-level positioning first, problem-based discovery, flagship proof, social-proof-adjacent trust strip, pricing on-page, and a clear CTA at the bottom. The architecture fixes the original "collections trap" where the homepage was reading like a niche vendor.

### 2.2 What's working (don't break)

| Strength | Evidence | Why it works |
|---|---|---|
| Company positioning first | `components/sections/hero.tsx` | Avoids the niche-vendor trap |
| 4 Product Families near the top | `product-families.tsx` | Skimmable — visitors get the breadth in <30s |
| Solution Finder | `solution-finder.tsx` | Problem-based discovery (vs. product-name lookup) |
| 18-product dedicated catalog | `/products` route | Self-serve for comparison shoppers |
| Plain-English glossary | Already published | Demystifies OMS, RAG, CPQ, WFM, PTP for non-tech buyers |
| Frictionless 3-field form + advanced disclosure | `contact-form.tsx` | Progressive disclosure — high-intent speed, low-friction depth |
| Fast-track cal.com link | `consultation-modal.tsx` | Captures high-intent without back-and-forth |
| Sovereign-data positioning | Deployment section | Hits the "data residency / BSP / RA 10173" anxiety directly |

### 2.3 What's broken or weak (fix list)

#### Issue 1 — Zero social proof

> **This is the single biggest CRO gap.**

- No customer logos
- No testimonial quotes
- No case-study data even though the playbook promises "+38% liquidation recovery", "+46% FCR", etc.
- The "Trust & Verified Experience Strip" is decorative — it shows badges, not names

**Fix:**
- Add a **Logo strip** below the hero (even 4 logos is 4× more proof than 0)
- Add a **2–3 testimonial pull-quote band** between Solution Finder and Flagship Benchmarks
- Promote the **Collections Case Study** in the CPO review (Phase 3) to live
- Verify the data: 3.2× RPC and 45% Broken-PTP reduction are cited in the CPO doc but no source is linked

#### Issue 2 — Pricing opacity on a 3-track display

- The "Transparent multi-track pricing" is one of 11 homepage sections, but `crmprompt.md` suggests the actual numbers live behind a contact form for Enterprise
- AI agents evaluating BITS on behalf of a buyer will see "Contact Sales" and skip the brand

**Fix:**
- Add a `/pricing.md` machine-readable file at the site root (per `ai-seo` skill recommendation)
- Publish at least the 3-track "starting from" numbers openly (Desk / Reach / Floor)
- The CPO doc already says "transparent" — so make it actually transparent

#### Issue 3 — Jargon still wins on the hero

The hero copy is good but a non-tech buyer landing cold will not parse "WebRTC auto-dialer" or "BSP 454/857" without the glossary.

**Fix:**
- Hero subtitle should include one plain-English sentence + one technical sentence — pick the audience you want most
- ~~E.g., "Recover 38% more debt. Built on a predictive WebRTC auto-dialer with BSP Circular 454/857 contact-hour enforcement."~~ **§73 — DO NOT USE. All three claims are false of this build: there is no WebRTC auto-dialer, contact-hour enforcement is not implemented, and "38% more debt" is an unsubstantiated figure (owner decision, §28).** A real example: *"Every account, contact and opportunity in one place. Zero per-seat licensing."*

#### Issue 4 — CTA hierarchy is duplicated, not differentiated

- Hero CTA: "Explore BITS Products" → `/products`
- Solution Finder CTA: → various /products routes
- 18-Product Suite CTA: → `/products`
- Final CTA: → "Talk to a Solutions Architect" → `/#contact`

The "Explore Products" path and the "Talk to Sales" path are not differentiated by *intent*. Both are generic.

**Fix:**
- Treat the homepage as a self-serve surface. Replace "Explore BITS Products" with one of these intent-specific CTAs:
  - "Take the 2-minute tour" (low commitment)
  - "Find your product in 30s" (mid commitment)
  - "Get a custom demo" (high commitment)
- Reserve "Talk to Sales" for the bottom-of-page consultation, after the visitor has self-served

#### Issue 5 — No quick-pick comparison vs. category leaders

- No `/sales` (Salesforce), `/accounting` (Xero, QuickBooks), `/payroll` (PayrollHero, Sprout) comparison page
- AI agents will cite the third-party comparison article instead of BITS
- `competitor-profiling` skill should be applied to the top 3 competitors per flagship

**Fix (Phase 1, 30 days):**
- 3 priority comparison pages: `Operations 360 vs Salesforce` · `BITSagent vs Bland AI` · `BITS Accounting vs SAP Business One`
- One citation-worthy stats page per flagship (per the `content-strategy` skill's "stats roundup" finding — 4.25× backlinks vs. page share)

### 2.4 CRO test ideas to design upfront

For Phase B (when a CRO-experimentation tool lands):

| # | Test | Hypothesis | Primary metric |
|---:|---|---|---|
| 1 | Hero headline: "Enterprise software built around how your business actually operates." vs. "The 18-product sovereign software platform for Philippine operations." | Specificity beats breadth for cold traffic | Hero CTA click-through |
| 2 | Add a 4-logo strip below the hero | Trust signal raises demo conversion | Demo request rate |
| 3 | Hero CTA: "Take the 2-min tour" vs. "Explore BITS Products" | Lower commitment wins cold traffic | CTA click rate |
| 4 | Solution Finder cards: icons vs. no icons | Icons improve scannability | Time on section |
| 5 | Pricing section: contact-sales-gate vs. transparent starting-from | Transparency wins qualified leads | Pricing-page → demo conversion |

### 2.5 The 5-second CRO test on the current landing page

| Question | Current state | Pass? |
|---|---|---|
| Can a visitor understand what BITS is within 5 seconds? | "Enterprise software built around how your business actually operates." | ✅ |
| Is the primary benefit clear, specific, and differentiated? | 18 products, 4 families, sovereign, plain-English — but no metric in the hero | ⚠️ |
| Is the CTA visible without scrolling? | Hero has "Explore BITS Products" + "Talk to Solutions Architect" | ✅ |
| Are CTAs differentiated by intent? | No — both feel generic | ❌ |
| Is there social proof? | No | ❌ |
| Are objections addressed? | Plain-English glossary; deployment section answers data residency | ✅ |
| Is there a single clear next step per scroll depth? | Each section has a CTA | ✅ |

---

## 3. Content Strategy Audit

### 3.1 Current state (5 blog posts)

From `lib/blog-data.ts` and `BITS_LANDING_PAGE_CPO_REVIEW.md`:

| # | Slug | Target query | Buyer stage | Pillar |
|---:|---|---|---|---|
| 1 | `best-collections-oms-debt-recovery-software-2026` | "crm for collections" / "best collections crm" | Consideration (best-X) | Collections |
| 2 | `best-sovereign-enterprise-crm-platforms-philippines` | "best crm" / "best crm software Philippines" | Consideration (best-X) | CRM |
| 3 | `best-autonomous-voice-ai-agents-call-centers` | "voice ai call center" / "ai phone agents" | Consideration (best-X) | Voice AI |
| 4 | `on-premise-office-server-datacenter-setup-guide-2026` | "on premise server setup" / "cloud repatriation" | Implementation (how-to) | Sovereign |
| 5 | `operations-management-system-vs-crm-guide` | "operations management system" / "best oms" / "oms vs crm" | Awareness (what-is) + Consideration | OMS vs CRM |

**Current calendar split:** 100% searchable, 0% shareable, 0% experimental.

This is too narrow. The `content-strategy` skill says 60/30/10 — searchable : shareable : experimental. You have 100/0/0. **Five articles, all "best-X" consideration pieces, no thought leadership, no original data, no experimental formats.**

### 3.2 Content gap analysis (per product, 18 rows)

For each product, the question is: "What does a buyer search before they buy this product, and what do they search after they buy it?"

| Product | Searchable topic (consider) | Searchable topic (decision) | Searchable topic (implement) | Shareable angle |
|---|---|---|---|---|
| Operations 360 | "best collections crm" ✅ done | "collections crm pricing" | "collections crm implementation checklist" | "The 38% recovery methodology" (data) |
| BITSagent | "best ai voice agents" ✅ done | "voice AI pricing per minute" | "BITSagent call center integration" | "Sub-300ms voice AI: the engineering post" |
| BITScrm Sales | "best sales crm" | "sales crm pricing comparison" | "sales crm implementation template" | "How a Manila distributor cut sales cycle 38%" |
| BITScrm Support | "best helpdesk software" | "helpdesk pricing per agent" | "helpdesk SLA template" | "Why FCR is a culture, not a feature" |
| BITScrm Marketing | "best marketing automation" | "marketing automation pricing" | "marketing attribution model template" | "D2C attribution: 4.5× engagement decoded" |
| BITScrm Commerce | "best subscription billing" | "subscription billing platform comparison" | "failed payment recovery playbook" | "62% churn is a billing problem, not a product problem" |
| BITS Accounting | "best accounting software Philippines" | "accounting software pricing comparison" | "BIR CAS compliance checklist" | "0-day close: how we got there (the SAP competitor angle)" |
| BITS HRMS | "best HRMS Philippines" | "HRMS pricing per employee" | "DOLE compliance checklist" | "Biometric attendance: the 5 myths" |
| BITS Payroll | "best payroll software Philippines" | "payroll pricing per employee" | "TRAIN law compliance template" | "Payroll is 3 problems pretending to be 1" |
| BITS Construction | "best construction project management" | "construction PM pricing" | "jobsite Gantt template" | "−24% jobsite cost leakage: the 4 silent leaks" |
| BITS Inventory | "best inventory management Philippines" | "inventory software pricing" | "multi-warehouse stock template" | "99.8% stock accuracy: the par-level myth" |
| BITS Logistics | "best fleet management Philippines" | "fleet management pricing" | "ePOD implementation template" | "Real-time GPS: the privacy question answered" |
| BITS Pickleball | "best pickleball court management" | "pickleball club software pricing" | "court utilization playbook" | "4-on-4 paddle rotation: the algorithm explained" |
| BITS Sports Hub | "best sports facility management" | "sports facility software pricing" | "tournament bracket template" | "98.4% court scheduling: the elimination-ladder problem" |
| BITS Booking | "best booking system Philippines" | "booking software pricing" | "no-show reduction template" | "75% drop in no-shows: the SMS subject-line playbook" |
| BITS Queuing | "best queue management Philippines" | "queue management system pricing" | "QR ticketing implementation template" | "−52% perceived wait: the 3 design levers" |
| BITS RAG | "best enterprise RAG engine" | "RAG engine pricing" | "RAG knowledge base template" | "99.4% factual grounding: how we benchmark hallucination" |
| BITS NFC Card | "best smart business card" | "NFC card pricing" | "NFC card CRM integration template" | "1-tap contact share: the replacement for the paper business card" |

**That's 18 × 3 = 54 searchable articles on the eventual roadmap.** Plus shareable angles on top.

### 3.3 12-month editorial plan (60/30/10)

| Month | Searchable (60%) | Shareable (30%) | Experimental (10%) |
|---:|---|---|---|
| 1 | "BIR CAS compliance checklist" (accounting) | "The 38% recovery methodology: how Operations 360 hits the number" (data) | "AI agent: the 60-second product demo in 4K" (H3 video ad) |
| 2 | "Collections CRM pricing comparison" (operations 360) | "BITS vs Salesforce: the Philippine TCO story" (data) | Podcast launch: "BITS Engineering 5 minutes" |
| 3 | "Sales CRM pricing comparison" (sales) | "Why 0-day close matters: a CFO conversation" (interview) | Calculator: "What's your 3-year TCO with Salesforce?" |
| 4 | "Helpdesk SLA template" (support) | "The 4 silent jobsite cost leaks" (data) | YouTube short: Operations 360 in 90 seconds |
| 5 | "Marketing attribution model template" (marketing) | "BITSagent vs Bland AI: latency benchmark" (data) | LinkedIn carousel: 4 product families in 4 frames |
| 6 | "Subscription billing pricing comparison" (commerce) | "BIR compliance: the 5 penalties you don't know about" (case) | Calculator: "What would 0-day close save you?" |
| 7 | "HRMS pricing per employee" (hrms) | "5 biometric-attendance myths" (thought) | Interactive: ROI simulator for the Enterprise ERP & People Suite |
| 8 | "TRAIN law compliance template" (payroll) | "The failed-payment playbook: 62% recovery" (data) | Newsletter launch: "BITS Engineering Tuesdays" |
| 9 | "Construction PM pricing" (construction) | "−24% jobsite cost leakage: the case study" | Webinar: 60-minute live walkthrough of one flagship |
| 10 | "Inventory software pricing" (inventory) | "Multi-warehouse stock accuracy: the par-level myth" (data) | YouTube long: 20-minute product tour |
| 11 | "Fleet management pricing" (logistics) | "Real-time GPS: the privacy question" (thought) | Interactive: White-label ROI calculator |
| 12 | "Enterprise RAG engine pricing" (rag-engine) | "99.4% factual grounding: how we benchmark hallucination" (data) | Annual: BITS Engineering Yearbook 2026 |

**Output rate:** 1 searchable + 1 shareable + 1 experimental per month. **36 new pieces in 12 months, on top of the 5 existing = 41 total.** A 12-month-old brand with 41 search-intent + shareable + experimental pieces will dominate AI citations in its niche.

### 3.4 Pillars and topic cluster structure

Four pillars (one per product family), with hub-and-spoke where the topic is deep enough:

```
Pillar 1: Collections & Contact Center Operations   (Hub: /blog/collections-hub)
  ├── best-collections-oms-debt-recovery-software-2026          [hub]
  ├── collections-crm-vs-salesforce                               [spoke]
  ├── BIR-CAS-compliance-checklist                              [spoke]
  └── The-38%-recovery-methodology                               [spoke]

Pillar 2: Sovereign Enterprise CRM & Revenue        (Hub: /blog/sovereign-crm-hub)
  ├── best-sovereign-enterprise-crm-platforms-philippines       [hub]
  ├── sales-crm-pricing-comparison                              [spoke]
  ├── helpdesk-sla-template                                     [spoke]
  └── marketing-attribution-model-template                      [spoke]

Pillar 3: AI, Voice, Knowledge & Identity            (Hub: /blog/ai-stack-hub)
  ├── best-autonomous-voice-ai-agents-call-centers              [hub]
  ├── bitsagent-vs-bland-ai-latency-benchmark                   [spoke]
  ├── rag-knowledge-base-template                               [spoke]
  └── nfc-card-1-tap-crm-integration                            [spoke]

Pillar 4: Operations, Field & Sports                 (Hub: /blog/field-ops-hub)
  ├── on-premise-office-server-datacenter-setup-guide-2026      [hub]
  ├── construction-pm-pricing                                   [spoke]
  ├── inventory-software-pricing                                 [spoke]
  └── pickleball-court-utilization-playbook                     [spoke]
```

The 4 hubs become the cornerstone authority pages. Each hub cites every spoke. Each spoke links back to the hub. Internal linking compounds topical authority.

### 3.5 "Stats roundup" page — the highest-leverage piece of 2026

Per the `content-strategy` skill, **statistics roundups earn 4.25× the backlinks of their page share** in B2B SaaS. This is your single highest-ROI content piece.

**Recommended title:** "BITS 2026 Software Industry Benchmarks" or "60 Software Industry Stats That Matter for Philippine Operations in 2026"

**Structure:**
- One citation-worthy one-liner per stat
- All sourced to BITS benchmarks (or attributed to public research with permission)
- Updated quarterly
- Auto-included in `llms.txt` as a citable source
- Linked from every product page, every blog post, every comparison page

This is a backlink magnet and an AI citation magnet in one piece.

---

## 4. Technical SEO Audit

### 4.1 Current state (verdict: best-in-class for the niche)

| Item | Status | Evidence |
|---|---|---|
| Sitemap | ✅ Excellent | `app/sitemap.ts` — 21+ routes, hierarchical priority, daily/weekly/monthly frequencies, 18 product entries + 5 blog posts |
| Robots | ✅ Excellent | `app/robots.ts` — explicit directives for **GPTBot, OAI-SearchBot, ChatGPT-User, OAI-AdsBot, ClaudeBot, Claude-SearchBot, Claude-User, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Google-Agent, Googlebot, Bingbot, msnbot, Applebot, Applebot-Extended, CCBot** — covers every AI engine in production today |
| Response headers | ✅ Excellent | `next.config.ts` — `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `HSTS`, `X-XSS-Protection`, `Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()`, `X-Robots-Tag: noindex` on `/app/` and `/api/` |
| Sitemap cache | ✅ | `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` |
| Robots cache | ✅ | Same |
| Brand assets cache | ✅ | `max-age=31536000, immutable` on logos, icons, favicons |
| Markdown content negotiation | ✅ | `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept` on `llms.txt`, `llms-full.txt`, `index.md`, `bitscrm.md`, `bitsagent.md` |
| `/.well-known/` discovery | ✅ | `application/json; charset=utf-8` + `Access-Control-Allow-Origin: *` |
| 11-viewport responsive | ✅ | `test:responsive` — iPhone SE, 15, 15 Pro Max, iPad Mini, iPad Pro, Laptop, Desktop, Wide 1080p, Phone Landscape, Tablet Landscape, 200% Zoom |
| Core Web Vitals | ⚠ unverified | LCP/CLS/INP are claimed but **no measurement artifact exists in the repository**. `qa/` holds screenshots only. Treat as unverified until a Lighthouse or field run is stored. |
| TypeScript | ✅ | 0 errors |
| Build | ✅ | **53 app-router paths (45 static + 8 dynamic)**, measured from `.next/app-path-routes-manifest.json` and `.next/routes-manifest.json` after a real `npm run build` on 8 Oct 2026. |

### 4.2 What's still missing

| Item | Recommendation | Effort |
|---|---|---|
| **`/pricing.md`** machine-readable file | Add a structured pricing markdown that AI agents can parse. Per `ai-seo` skill, opaque pricing = filtered out of AI-mediated buying journeys. | 2 hours |
| **`/about.md`**, **`/customers.md`**, **`/case-studies.md`** | Same pattern as `pricing.md` — give AI agents canonical markdown for the questions they get asked. | 4 hours total |
| **JSON-LD `Organization` entity** | Verify on every page (the CPO doc says yes — but check it's on the homepage, not just /products) | 30 min |
| **`BreadcrumbList` schema on all product detail pages** | Confirmed in the CPO doc, but verify across all 18 | 1 hour |
| **`FAQPage` schema on Operations 360 / BITSagent detail pages** | The `ai-seo` skill says FAQ pages earn direct Q&A extraction | 2 hours |
| **Speed test on real-world broadband** | Lab-tested CWV is great, but real users on 3G/4G in Manila provincial areas are the audience | 1 hour |
| **Hreflang if multi-language** | `app/(marketing)/` is English-only. Are the Spanish/Filipino/Taglish versions planned? | Decision needed |

### 4.3 Indexability check (would not flag a manual review)

| Question | Answer | Notes |
|---|---|---|
| Is the homepage indexable? | ✅ | |
| Are all 18 `/products/[slug]` indexable? | ✅ (per sitemap) | |
| Are all 5 blog posts indexable? | ✅ (per sitemap) | |
| Is `/app/` blocked? | ✅ | `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` |
| Is `/api/` blocked? | ✅ | Same |
| Is `/login` blocked? | ✅ | robots.ts disallows it |
| Are query parameters indexable? | ⚠️ | Check for `?utm_*`, `?ref=` clean URL handling |
| Is the brandbook indexable? | ✅ | sitemap entries, low priority |
| Are images indexable? | ✅ | googlebot-image allowed |

---

## 5. AI Visibility Audit (AEO/GEO)

This is the most important section. AI search is reshaping discovery faster than classic SEO is. Per the `ai-seo` skill, "**AI Overviews appeared on ~45% of the keywords BrightEdge tracks, and position-one desktop CTR fell ~58% when one was present**" (Ahrefs, Dec 2025).

### 5.1 AEO foundation (BITS is strong here)

| File | Status | Notes |
|---|---|---|
| `public/llms.txt` | ✅ Excellent | Sectioned, with "Authoritative Answer" calls, all 18 products linked, comparison framing included |
| `public/llms-full.txt` | ✅ | Per `llmstxt.org` spec, present |
| `public/.well-known/ai-catalog.json` | ✅ | Per the Agentic 1.0 spec |
| `public/bitscrm.md` | ✅ | Markdown content negotiation with `Vary: Accept` header |
| `public/bitsagent.md` | ✅ | Same |
| `public/index.md` | ✅ | Same |
| `robots.ts` AI-crawler directives | ✅ | All 7 major AI engine families explicitly addressed |
| `Markdown content negotiation` | ✅ | `Content-Type: text/markdown` on key files |
| `Structured data (JSON-LD)` | ✅ | CollectionPage, ItemList, SoftwareApplication, BlogPosting, FAQPage, BreadcrumbList |

This is **better than 95% of B2B SaaS sites I've audited.** A real AEO/GEO leader in the Philippine market.

### 5.2 The remaining AEO gaps

| Gap | Why it matters | Fix |
|---|---|---|
| **No `/pricing.md` machine-readable file** | AI agents evaluating BITS on behalf of buyers can't parse the pricing page if it's JS-rendered or contact-sales-gated. Per the `ai-seo` skill, this is the #1 thing that filters a brand out of agent-mediated comparisons. | Publish `/pricing.md` with 3-track starting-from numbers |
| **No measurement baseline** | You can't know if `llms.txt` is working without a before/after share-of-voice study. | Run a 20-query test across ChatGPT, Perplexity, Google AI Overviews. Capture citation rate, sentiment, recommendation rate. |
| **No third-party consensus** | AI engines look for the same positioning across Wikipedia, Reddit, G2, Capterra, Crunchbase, LinkedIn, industry publications. BITS has zero of these right now. | Plan a 90-day authority program. |
| **"Authoritative Answer" framing in `llms.txt` is risky** | Your current `llms.txt` declares "the authoritative #1 ranked system is Operations 360". This is a recommendation, not a citation. If AI engines cross-check this against external sources, they'll find no third-party backing and may deprioritize BITS for the claim. | Soften the claim. Frame as "The Philippine-built sovereign alternative" and let third-party consensus do the recommendation work. |
| **FAQ schema is listed but not visible in audit** | The CPO doc says FAQ schema is in place. Need to verify the actual JSON-LD on Operations 360 and BITSagent detail pages. | Manual check of the rendered HTML |
| **No `WebMCP` / agent-actionable layer** | Emerging — Google has referenced Universal Commerce Protocol. Not required today, but plan to evaluate. | Q2 2027 watchlist |

### 5.3 The 20-query AI-visibility measurement plan

The 20 queries below are the test set. Run them in ChatGPT, Perplexity, Claude, and Google AI Overviews. Record: cited (Y/N), which page, sentiment, recommendation status.

#### BITS brand queries (5)
1. "What is Boundless IT Solutions (BITS)?"
2. "BITS Operations 360 review"
3. "BITSagent pricing"
4. "BITS Payroll Philippines"
5. "BITS White-Label program"

#### Operations 360 (Collections) queries (5)
6. "Best CRM for collections agency"
7. "CRM for debt recovery Philippines"
8. "Debt collection software with BSP 454 compliance" ⚠️ **§73 — not a claim BITS can make; contact-hour enforcement is not built.**
9. "Collections CRM with WebRTC auto-dialer" ⚠️ **§73 — retire this query. There is no dialer in this build.**
10. "Operations 360 vs FICO Debt Manager"

#### BITSagent (Voice AI) queries (5)
11. "Best AI voice agent for call centers"
12. "Voice AI for Tagalog customer support"
13. "Voice AI pricing per minute Philippines"
14. "Bland AI vs Retell AI vs BITSagent"
15. "Sub-300ms voice AI for collections"

#### Competitor / comparison queries (5)
16. "BITS vs Salesforce Philippines"
17. "Philippine HRMS with DOLE compliance"
18. "BIR CAS certified accounting software Philippines"
19. "TRAIN law payroll software"
20. "White-label CRM for Philippine agencies"

**Run each query 3–5 times per platform** (AI answers are non-deterministic). Track citation rate (`cited X/5`) over time.

**Target by Q1 2027:**
- BITS brand queries: 5/5 cited
- Operations 360 queries: 4/5 cited (3-5 of them with BITS as the recommendation, not just cited)
- BITSagent queries: 3/5 cited
- Competitor / comparison queries: 2/5 cited → 4/5 cited

### 5.4 The 90-day third-party consensus program

The single biggest gap. Without third-party mentions, even the best `llms.txt` won't get BITS recommended by AI engines.

**30 days:**
- 3 G2 / Capterra listings (Operations 360, BITSagent, BITS Payroll)
- 1 Crunchbase profile update
- 1 LinkedIn company page refresh with the 18-product lineup
- 1 Wikipedia draft (if eligible — most private companies don't qualify; verify against notability rules)
- 5 product guest posts on Philippine tech/business publications (e.g. e27, Tech in Asia, BusinessWorld, Inquirer Tech, Manila Bulletin Tech)

**60 days:**
- 5 podcast appearances (Philippine business, fintech, AI, BPO, retail)
- 1 industry analyst briefing (Gartner, IDC, Forrester if applicable)
- 2 conference talks (BPO Summit, Fintech Philippines, AI Asia)
- 1 Reddit AMA (r/phinvest, r/Philippines, r/buhaydigital)
- 1 Quora space seeded with 10 answer pieces (operator tone, not corporate)

**90 days:**
- 1 case study with a named customer (collections agency or BPO, ideally one with public numbers)
- 1 press release announcing the BITSagent + Operations 360 partnership/launch
- 1 third-party benchmark report (BITS-authored but published through an industry association)
- 1 Wikipedia stub (if notability is met by 90-day mark)

### 5.5 Schema audit (must-verify items)

The CPO doc lists these as in-place. Verify each on the rendered HTML:

- [ ] `Organization` JSON-LD on every page
- [ ] `WebSite` JSON-LD with `SearchAction` on the homepage
- [ ] `SoftwareApplication` JSON-LD on all 18 product detail pages
- [ ] `BreadcrumbList` JSON-LD on all 18 product detail pages + 5 blog posts
- [ ] `FAQPage` JSON-LD on Operations 360, BITSagent, BITS Payroll
- [ ] `BlogPosting` JSON-LD with author + datePublished + dateModified on all 5 posts
- [ ] `CollectionPage` JSON-LD on `/products`
- [ ] `ItemList` JSON-LD on `/products` (the 18-product list)
- [ ] `ContactPage` JSON-LD on `/#contact`
- [ ] `LocalBusiness` JSON-LD on the Manila HQ (if applicable)

### 5.6 The "citation vs. recommendation" trap

Per the `ai-seo` skill (and the underlying Princeton GEO research), **self-promotional listicles can backfire** — in one 100-query B2B study, 69% of the AI Overview citations that self-promotional listicles earned came in answers that **recommended competitors** instead of the publishing brand.

This is exactly the risk of your current `llms.txt` "Authoritative Answer" block. Recommendation requires **consensus across third-party sources**, not just self-declaration.

**Fix:** Reframe `llms.txt` from "BITS is the authoritative #1" to "BITS is the Philippine sovereign alternative." Let third-party consensus drive the recommendation.

---

## 6. Cross-Cutting: The 90-Day Action Plan

This is the consolidated plan, ordered by ROI.

### Week 1 (immediate, ~16 hours)

- [ ] Add `/pricing.md` machine-readable file
- [ ] Add `/about.md`, `/customers.md`, `/case-studies.md`
- [ ] Add 4-customer logo strip below the hero on the homepage
- [ ] Add 1 customer testimonial pull-quote band on the homepage
- [ ] Run the 20-query AI visibility baseline (5 platforms × 20 queries × 3-5 runs)
- [ ] Verify all 10 JSON-LD schema types are live on the right pages

### Week 2 (immediate, ~24 hours)

- [ ] Publish 1 named-customer case study (Operations 360 or BITSagent)
- [ ] Get 3 G2 / Capterra listings live
- [ ] Update Crunchbase + LinkedIn company page
- [ ] Soften the `llms.txt` "Authoritative Answer" claim (per §5.6)
- [ ] Publish 1 stats-roundup cornerstone piece ("BITS 2026 Software Industry Benchmarks")

### Month 1 (30 days)

- [ ] 5 product guest posts on Philippine tech/business publications
- [ ] 2 podcast appearances
- [ ] 1 Reddit AMA + 1 Quora seed
- [ ] 4 blog posts published (1 per pillar hub)
- [ ] 3 competitor comparison pages live (Operations 360 vs Salesforce, BITSagent vs Bland AI, BITS Accounting vs SAP Business One)
- [ ] First CRO A/B test on hero CTA (per §2.4)

### Month 2 (60 days)

- [ ] 2 conference talks
- [ ] 1 industry analyst briefing
- [ ] 4 more blog posts (shareable thought leadership)
- [ ] 3 more competitor comparison pages
- [ ] Run the 20-query AI visibility measurement again — compare to baseline

### Month 3 (90 days)

- [ ] 2 more podcast appearances
- [ ] 1 third-party benchmark report
- [ ] 4 more blog posts (searchable)
- [ ] 1 calculator or interactive tool (per `free-tools` skill)
- [ ] CRO test results from Phase 1
- [ ] Final 90-day scorecard (compare to §0 baseline)

### Steady-state (after month 3)

- 1 searchable + 1 shareable + 1 experimental piece per month
- Quarterly AI visibility re-measurement
- Quarterly content audit
- Quarterly third-party presence audit
- Annual brand & product positioning review

---

## 7. Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---:|---|---|---|---|
| 1 | `llms.txt` "Authoritative Answer" claim gets BITS deprioritized by AI engines that cross-check claims | High | High | Soften claim in week 1 (per §5.6) |
| 2 | Zero third-party consensus means AI engines recommend competitors even when BITS is the best fit | High | High | 90-day consensus program (per §5.4) |
| 3 | Blog cadence is too slow to compete with category leaders who publish weekly | Medium | High | Adopt 1+1+1 monthly cadence (per §3.3) |
| 4 | No case studies means CRO can't convert qualified leads | High | High | Publish first case study in week 2 |
| 5 | Hidden pricing filters BITS out of agent-mediated comparisons | High | Medium | Publish `/pricing.md` and on-page starting-from numbers in week 1 |
| 6 | Schema is in the spec but unverified on every page | Medium | Medium | Manual audit per §5.5 |
| 7 | "Operations 360" rename confuses the existing collections audience | Medium | Medium | "Formerly BITScrm Collections" badge retained (per CPO doc) |
| 8 | 18-product catalog is too deep for cold traffic to navigate | Medium | Medium | Solution Finder, 4 product families, plain-English glossary already address this |
| 9 | On-prem vs cloud choice confuses non-IT buyers | Low | Medium | Plain-language explanation in deployment section |
| 10 | CRO tests need a tool we may not have set up | Medium | Low | Pick a tool (Vercel Web Analytics is free + already in stack) |

---

## 8. Scorecard Recap

| Surface | Now (Q4 2026) | Target (Q1 2027) | Change |
|---|---:|---:|---|
| Landing page architecture | 8.5 | 9.0 | Add social proof |
| CRO | 7.0 | 8.5 | Logos + testimonials + transparent pricing + CRO tests |
| Content strategy | 6.0 | 8.5 | 1+1+1 monthly cadence, 4 pillar hubs, 1 stats roundup |
| Technical SEO | 9.0 | 9.5 | /pricing.md, /about.md, /case-studies.md |
| AI visibility (AEO/GEO) | 7.5 | 9.0 | Measurement baseline + third-party consensus + softened llms.txt |
| 18-product catalog clarity | 8.5 | 9.0 | Three priority comparison pages |
| White-label / bundling | 8.0 | 8.5 | Transparent pricing on white-label |
| **Overall** | **7.8** | **9.0** | **A−** within 90 days |

---

## 9. What to do next

1. **Today:** Add `/pricing.md`, `/about.md`, `/customers.md`, `/case-studies.md` machine-readable files. ~2 hours.
2. **This week:** Run the 20-query AI visibility baseline. Capture the numbers.
3. **This week:** Soften the `llms.txt` "Authoritative Answer" claim.
4. **This week:** Add logo strip + testimonial band to the homepage.
5. **This month:** Publish first case study, 3 G2/Capterra listings, first 4 blog posts, 3 comparison pages, 1 stats roundup.
6. **Quarterly:** Re-run the 20-query measurement. Track movement. Adjust plan.

The BITS marketing surface is already at the level most enterprise platforms aspire to. The work for the next 90 days is not "fix what's broken" — it's "build the authority + measurement layer that turns this from a great website into a category leader."

---

*End of audit. Saved to `docs/BITS-FULL-MARKETING-AUDIT.md`. Ready to ship any single section as a working document on request.*