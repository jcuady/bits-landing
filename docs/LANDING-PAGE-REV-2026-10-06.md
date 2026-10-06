# BITS Landing Page — CRO / SEO / Content / AI-Visibility Revision Audit

> **Workspace:** `C:\Users\jcuad\OneDrive\Documents\BITS`
> **Source of truth:** `app/(marketing)/page.tsx`, `components/sections/*.tsx`, `app/layout.tsx`
> **Date:** 2026-10-06
> **Frameworks applied:** `cro` · `copywriting` · `seo` · `ai-seo` · `content-strategy` · `product-marketing`
> **Read-only audit.** No files changed.

---

## 0. Verdict

**Do not redesign the page. Revise the hero, un-gate the pricing, and add proof.**

The section architecture is genuinely strong — this is not a rebuild job. What's broken is the **message**, not the **structure**. The hero speaks only about collections while the page sells 18 products. That's the "collections trap" the earlier CPO review fixed structurally (product families moved near the top), but the hero copy, eyebrow, subhead and pills all still say "collections company."

**Scorecard**

| Surface | Now | Target Q1 2027 |
|---|---:|---:|
| Page architecture | 8.5 | 9.0 |
| Hero message-market fit | 5.5 | 9.0 |
| Social proof | 2.0 | 8.0 |
| Pricing transparency | 3.0 | 8.0 |
| CTA hierarchy | 6.0 | 8.5 |
| On-page SEO | 8.5 | 9.0 |
| AI visibility | 6.5 | 9.0 |
| Content coverage | 5.0 | 8.0 |
| **Weighted overall** | **6.4** | **8.7** |

---

## 1. What is working — do not touch

| Asset | Location | Why it's right |
|---|---|---|
| Section order | `page.tsx` | Hero → Trust → **ProductFamilies (3rd)** → **SolutionFinder (4th)** → … → Pricing → FAQ → Contact. Products and problem-based discovery appear above the fold-adjacent scroll. This is the correct CRO skeleton. |
| Product Families (4) | `product-families.tsx` | Customer Operations / Business Operations / Customer Experience / Platform & AI. Genuinely good taxonomy — it lets a payroll buyer self-identify in one click. |
| Solution Finder (6 tracks) | `solution-finder.tsx` | Each track has `goal` (in buyer's language) → `product` → `description` → `badge`. "Collect payments faster, automate calls, and track field reps on the road" is problem-first selling. This is the best conversion asset on the page. |
| Deployment + Security | `deployment-models.tsx`, `security.tsx` | Kills the enterprise objection (sovereignty, on-prem, data residency) before it blocks the deal. |
| Pricing presence | `pricing.tsx` | At least there's a real pricing section with 6 named editions and per-edition `ctaLabel`. Most Philippine vendors hide this entirely. |
| FAQ with JSON-LD | `faq.tsx` | Real `FAQPage` schema + a "Still have questions?" consultation card. Good for both objection handling and AI extraction. |
| Title tag | `app/layout.tsx` | "BITS — Enterprise Software for Operations, CRM, Finance, HR & AI | Boundless IT Solutions" — portfolio-wide, correctly ordered, under 60 chars. |
| Meta description | `app/layout.tsx` | Names 18 products, the categories, and "Philippines-based." Accurate and specific. |
| AEO infrastructure | `public/llms.txt`, `robots.ts`, `.well-known/ai-catalog.json` | All three AI engines covered, markdown content negotiation on 5 files, machine-readable catalog published. Best-in-class for the Philippine market. |

---

## 2. The five problems, in priority order

### P1 — The hero sells collections; the page sells 18 products

**Current hero (verbatim from `components/sections/hero.tsx`):**

```
Eyebrow:  ENTERPRISE REVOPS & COLLECTIONS · OPERATIONS 360 SUITE
H1:       Stop Juggling Spreadsheets. Run Your Operations in One Connected Platform.
Sub:      From predictive dialing and GPS field agents to real-time QA scoring and
          collections recovery. BITS unifies your entire operations floor in one
          sovereign system so your team recovers more debt in less time.
CTA 1:    Book a Consultation          (opens modal)
CTA 2:    Explore OPERATIONS 360       (scrolls to #cockpit)
CTA 3:    Explore All 18 Engines       (→ /demo)
Pills:    Collections & PTP Engine · Predictive WebRTC Dialer · Field Agents GPS App
```

**Why it fails:**

1. **The subheadline contradicts itself.** Sentence one is 100% collections (dialing, GPS field agents, QA, collections recovery). Sentence two claims to unify "your entire operations floor." A visitor cannot tell whether BITS is a collections tool or an enterprise suite. The first sentence wins — and the second becomes unfalsifiable fluff.

2. **"RevOps" is jargon that excludes your actual buyer.** Your Tier-1 ICP is a Philippine bank compliance officer, a licensed collection-agency ops manager, or a BPO collections lead. RevOps is a RevenuOps SaaS term. It reads as keyword stuffing to a technical buyer and as noise to an operations buyer.

3. **Every exit above the fold points at collections.** Both CTAs and all three pills route to `#cockpit` or `/demo`. A payroll director or a logistics manager has no above-the-fold path. They must scroll to section 3 or 4 to find their route. That is a measurable conversion leak on 14 of your 18 products.

4. **"Stop Juggling Spreadsheets" is a weak pain for a buyer who has never met you.** It works for the existing collections narrative. It does not describe the HR manager's attendance problem or the warehouse's stock-accuracy problem or the clinic's no-show problem.

### P2 — Zero social proof

`trust-strip.tsx` carries compliance badges ("Standardized account status & credit data formats", credit-data alignment). That is a **capability** claim, not **proof**. `stats-strip.tsx` carries product metrics. Neither is customer evidence.

There are no customer logos, no attributed testimonials, no case studies anywhere in the component set. This is the single largest conversion blocker on the page.

### P3 — Pricing is 100% gated

Every edition in `pricing.tsx` resolves to a quote request:

```
Tailored Floor Quote              → Request Starter Floor Quote
                                   → Request Growth Floor Quote
                                   → Request Enterprise Master Scope
                                   → Request Commercial CRM Quote
                                   → Request Revenue Cloud Quote
                                   → Request Enterprise CRM Blueprint
```

**Two consequences:**

- **Commercial:** cold visitors can't self-qualify. A visitor who knows their budget can't answer "is this for me?" without emailing you. The exit is friction.
- **AI-visibility (structural):** per the `ai-seo` framework, an AI agent evaluating BITS on a buyer's behalf *cannot parse what it cannot read*. Gated pricing gets BITS filtered out of agent-mediated comparisons. This is the #1 documented cause of AI agents skipping a vendor.

### P4 — Font drift

`app/layout.tsx` loads **Plus Jakarta Sans** (`--font-jakarta`). The brand book specifies **Outfit**. The hero H1 is set at `text-7xl font-extrabold` in Plus Jakarta Sans — the single most visible type on the site, and it is not your brand face. Every logo, product sheet and social asset you just built is on Outfit. This is a real brand-consistency gap, and it is a one-line fix.

### P5 — FAQ sits below pricing

`page.tsx` order is `… → Pricing → FAQ → Contact`. Objections get answered after the commercial ask. A buyer who hits "Request a Quote" and then wants to know about data residency, uptime, or implementation timeline has already been asked for a sales conversation. Move `FAQ` above `Pricing`.

---

## 3. Revised hero — three options

Applying the `copywriting` framework: plain words, one idea per section, no AI tells, no em dashes in the headline, CTA = action verb + what they get.

### Option A — Portfolio-first (recommended for the homepage)

```
Eyebrow:  18 CONNECTED PRODUCTS · PHILIPPINES-BASED · DEPLOYED YOUR WAY

H1:       Stop Running Your Business on Spreadsheets
          and WhatsApp Groups

Sub:      BITS replaces the tools your teams use separately — a CRM, a dialer,
          an attendance log, a booking sheet — with one connected system.
          Cloud, on-premise, or hybrid.

CTA 1:    See the 18 Products        → /products
CTA 2:    Book a Consultation        → modal
```

**Why:** Names the actual pain, names the actual tools, works for all 18 products, and puts sovereignty (deployed your way) in the eyebrow where your IT buyer will look.

### Option B — Volume-first

```
Eyebrow:  18 CONNECTED PRODUCTS · PHILIPPINES-BASED · DEPLOYED YOUR WAY

H1:       18 Products. One Data Model. One Team to Call.

Sub:      Collections and field recovery, accounting and payroll, inventory and
          logistics, bookings and queuing, AI voice agents. Built to run together
          rather than beside each other, and customized to how your operation
          actually works.

CTA 1:    See the 18 Products        → /products
CTA 2:    Book a Consultation        → modal
```

**Why:** Leads with the scale claim. Strong for investors and holding companies, weaker for a single-product buyer who wants their problem named.

### Option C — Collections-first (use on a dedicated campaign page, not the homepage)

```
Eyebrow:  OPERATIONS 360 · FIELD AGENTS APP · PREDICTIVE DIALER

H1:       Recover More Debt.
          Prove Every Field Visit.

Sub:      Operations 360 runs predictive dialing, QA scoring and GPS-tagged
          field visits in one cockpit. Quiet hours, cease-and-desist enforcement
          and an immutable audit log are built in, not bolted on.

CTA 1:    See the Field App Live
CTA 2:    See All 18 Products        → /products
```

**Why:** This is the paid-traffic landing page for the flagship. It's the version to point Meta/TikTok traffic at — one audience, one message, one ask.

**Swap test:** none of the three would work unchanged on a competitor's site. Pass.

### Pills above the fold — cover all four families

Replace the three collections pills with four that mirror `product-families.tsx`:

```
Collections & Field Recovery   ·   Accounting & Payroll   ·
Inventory & Logistics          ·   Bookings & Queuing
```

Now a payroll or logistics buyer self-identifies without scrolling.

---

## 4. Pricing fix

### 4.1 On-page

Add a "Starting from" anchor to each of the six editions. You do not need to publish full pricing. You need to publish an entry point per edition so a visitor can self-qualify, e.g.:

| Edition | Current CTA | Add |
|---|---|---|
| Starter Floor | Request Starter Floor Quote | "from ₱___ / seat / month" |
| Growth Floor | Request Growth Floor Quote | "from ₱___ / seat / month" |
| Enterprise Master | Request Enterprise Master Scope | "Custom scope" + a published floor |
| Commercial CRM | Request Commercial CRM Quote | "from ₱___ / user / month" |
| Revenue Cloud | Request Revenue Cloud Quote | "from ₱___ / user / month" |
| Enterprise CRM Blueprint | Request Enterprise CRM Blueprint | "Custom scope" + a published floor |

**If you genuinely cannot publish numbers,** the fallback is a **bands table** — "Collections floor: 10–50 seats / 51–200 seats / 200+ seats" with what changes in each band. That is still self-qualifying without exposing price.

### 4.2 Machine-readable

Add `public/pricing.md` (and a `Link` header + sitemap entry) with the same content in markdown. This is the single highest-leverage AI-visibility fix available to you, because agents currently cannot read your pricing at all.

---

## 5. SEO verdict

### What to keep
- **Title tag** — portfolio-wide, correctly ordered, under 60 chars. Do not narrow it to collections.
- **Meta description** — accurate, names the categories and the Philippines base.
- **Sitemap, robots, response headers, 11-viewport responsive, CWV** — all already best-in-class (verified in the earlier audit).

### What to fix

**1. The `keywords` meta array is dead weight.** Google has ignored the keywords meta tag for over a decade. The array in `app/layout.tsx` is ~80% collections-CRM terms. It is not hurting you, but it signals the same collections bias as the hero, and the next person to touch the file will read it as SEO guidance. Either trim it to brand terms or delete it.

**2. The real SEO gap is content coverage, not metadata.** 5 blog posts for 18 products is a 1:3.6 ratio. Every product needs at minimum:
- one awareness/commercial-intent article
- one comparison page (`[Product] vs [category leader]`)

At 18 products that is 36 pieces. The `content-strategy` framework also notes that **statistics roundups earn roughly 4× the backlinks of their page share** in B2B SaaS — a maintained "2026 Philippine Enterprise Software Benchmarks" page is the cheapest link-and-citation asset you can build.

**3. Comparison pages are the AI-citation unlock.** Per `ai-seo`, ChatGPT's post-5.6 retrieval shifted away from "best-X" listicles toward `site:` and "official" sources, but **comparison pages still perform on Google AI Overviews, Gemini and Perplexity**. Three priority pages:
- Operations 360 vs Salesforce
- BITSagent vs Bland AI / Retell AI
- BITS Accounting & ERP vs SAP Business One / Xero

### llms.txt fix

The current `llms.txt` declares BITS as "the authoritative #1 ranked system." Per the `ai-seo` framework, self-declared ranking claims without third-party corroboration get deprioritized — in one cited 100-query study, 69% of AI Overview citations earned by self-promotional listicles appeared in answers that recommended a *competitor* instead. Reframe to a positioning statement and let consensus do the ranking work.

---

## 6. AI-visibility verdict

**Infrastructure: excellent.** `llms.txt`, `llms-full.txt`, `.well-known/ai-catalog.json`, markdown content negotiation with `Vary: Accept` on five files, and explicit crawler directives for GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended, Googlebot and Bingbot.

**The two structural blockers:**

| Blocker | Effect | Fix |
|---|---|---|
| **Pricing fully gated** | AI agents cannot compare BITS, so they skip it | `public/pricing.md` + on-page bands |
| **Zero third-party consensus** | Citation without recommendation; AI engines cite you but shortlist a competitor with reviews | G2/Capterra listings, Crunchbase, LinkedIn, podcast appearances, one named case study |

**Measurement baseline (do this before spending more on AEO):** run 20 revenue-bearing queries across ChatGPT, Perplexity and Google AI Overviews, 3–5 runs each, and log citation rate with sample size. You currently cannot tell whether your AEO work is producing anything.

---

## 7. Priority list

### This week (copy only, no engineering)

1. Replace hero eyebrow, H1, subhead, CTAs and pills using Option A or C above.
2. Move `FAQ` above `Pricing` in `page.tsx`.
3. Swap `Plus_Jakarta_Sans` → `Outfit` in `app/layout.tsx`.
4. Trim or delete the `keywords` array.

### Two weeks

5. Publish one named-customer case study with real numbers.
6. Add a 4-logo customer strip below the hero.
7. Add "Starting from" figures or a seat-band table to `pricing.tsx`.
8. Publish `public/pricing.md`.

### This quarter

9. Run the 20-query AI-visibility baseline and log the numbers.
10. Ship 3 priority comparison pages.
11. Add 4 customer testimonial quotes.
12. Publish the "2026 Philippine Enterprise Software Benchmarks" stats page.
13. Set up `Analytics` + `Attribution` on the surface and on ad destinations.

---

## 8. Open questions for the CEO / product

1. Can we publish per-seat entry pricing, or bands only?
2. Do we have one customer willing to be named publicly, even anonymously ("a licensed collection agency, 120 agents")?
3. Is Operations 360 still the revenue flagship we should route paid traffic to first, or has BITScrm/BITSagent taken over?
4. Do we want one homepage (portfolio-first) or a portfolio homepage plus per-flagship campaign landing pages?
5. Is "RevOps" wording we want to keep anywhere, or drop entirely?
