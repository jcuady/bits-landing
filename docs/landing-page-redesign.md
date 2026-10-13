# BITS Landing Page Redesign — Documentation

> **SYSTEM_AUDIT.md §61 — corrected against the code.**
>
> The section table below listed **seven components that have never existed in this
> repository**: `problem.tsx`, `features-grid.tsx`, `solutions.tsx`,
> `ai-agents-showcase.tsx`, `why-bits.tsx`, `process.tsx` and `cta-banner.tsx`.
> `features-grid.tsx`, `ai-agents-showcase.tsx` and `cta-banner.tsx` were described
> under a heading reading **"New Components Created"** — a past-tense claim of work
> done. The table has been rewritten to the fourteen sections that actually render,
> read from `app/(marketing)/page.tsx`.

## Date: 2026-09-16
## Version: 2.1 (corrected)

---

## Overview

Complete redesign of the BITS landing page from a functional B2B SaaS page to a high-conversion, premium landing page inspired by modern CRM product sites. The redesign introduces pricing tiers, AI agents showcase, social proof elements, and conversion-optimized section ordering.

---

## Section Architecture (Conversion Funnel) — as actually rendered

Verified against the imports in `app/(marketing)/page.tsx`, in render order.
`components/sections/` holds 21 files; 14 of them are used on this page.

| # | Section | Component | Purpose |
|---|---------|-----------|---------|
| 1 | Hero | `hero.tsx` | Hook with social proof + dual CTA |
| 2 | Trust Strip | `trust-strip.tsx` | Partner logos credibility |
| 3 | Product Families | `product-families.tsx` | Route visitors to the right product line |
| 4 | Solution Finder | `solution-finder.tsx` | Interactive "which product fits" path |
| 5 | Stats Strip | `stats-strip.tsx` | Quantified social proof |
| 6 | The Difference | `the-difference.tsx` | Modular differentiation |
| 7 | Features Hero | `features-hero.tsx` | Capability overview |
| 8 | Floor Showcase | `floor-showcase.tsx` | Operations-floor visualisation |
| 9 | Industries | `industries.tsx` | Vertical segmentation |
| 10 | Security | `security.tsx` | Operational controls |
| 11 | Deployment Models | `deployment-models.tsx` | Cloud / on-prem comparison |
| 12 | Pricing | `pricing.tsx` | 3-tier pricing cards |
| 13 | FAQ | `faq.tsx` | Objection handling |
| 14 | Contact | `contact.tsx` | Demo request form |

**Never built, and removed from this table:** `problem.tsx`, `features-grid.tsx`,
`solutions.tsx`, `ai-agents-showcase.tsx`, `why-bits.tsx`, `process.tsx`,
`cta-banner.tsx`. If any of these is wanted, it has to be written — the copy above
should not be read as a record that it was.

---

## New Components Created

### `components/sections/stats-strip.tsx` ✅ exists
Social proof with animated counters. Shows 3 stat cards with icon backgrounds and counter animation on scroll.

### `components/sections/pricing.tsx` ✅ exists
3-tier pricing layout (Starter / Professional / Enterprise). Professional has "Most Popular" badge. All use "Custom" pricing per business requirements (no public prices).

### `components/layout/sticky-mobile-cta.tsx` ✅ exists
Floating "Request a Demo" button on mobile devices that appears after scrolling past the hero (600px threshold).

### `components/sections/features-grid.tsx` ❌ does not exist
Never created. `features-hero.tsx` occupies that position on the live page.

### `components/sections/ai-agents-showcase.tsx` ❌ does not exist
Never created. The AI agent surface is served by `bits-agent-page-content.tsx` and
`bits-agent-call.tsx` on the `/bitsagent` route, not by a homepage section.

### `components/sections/cta-banner.tsx` ❌ does not exist
Never created.

---

## Modified Components

### `hero.tsx`
- New headline: "Manage Your Collections Smarter and Faster with One Powerful CRM"
- Gradient italic emphasis on key words
- Social proof row: star rating + avatar stack + review badge
- Dual CTAs: "Start Free Trial" + "See Pricing Plans"
- Replaced landscape SVG background with soft radial gradients

### `hero-product.tsx`
- Added 4 stats cards (Total Collections, Avg Recovery, PTP Rate, Monthly Target)
- Added sidebar nav with "Reports" item
- Floating mobile phone mockup with animate-float
- Richer account table with 5th row

### `trust-strip.tsx`
- Converted from value-prop pills to partner logos bar
- Shows 6 branded partner badges with initial avatars

### `header.tsx`
- Nav items updated (Features, Product, Pricing, About, Contact)
- Primary CTA changed to "Start Free Trial"
- Mobile menu gets "Start Free Trial" + "See Pricing"

### `footer.tsx`
- Added newsletter email signup form
- Added LinkedIn/Twitter/Facebook social icons
- Updated tagline copy

### `contact.tsx`
- Added response SLA box (24 hour reply)
- Added "Book a time" calendar link
- Added direct email alternative

---

## Data Layer Changes

### `lib/site.ts`
- Added `heroStats`, `stats`, `featureGridItems`, `aiAgents`, `pricingTiers`
- Updated `navItems` to include Pricing
- Updated `footerColumns` for new sections
- Updated `site.description` with SEO keywords

### `lib/marketing-specimens.ts`
- Added `dashboardStats` for hero product preview
- Added `aiAgentConversations` for AI agents specimen
- Added 5th account row for richer tables

---

## Design Token Additions

### `app/globals.css`
- `--shadow-pricing`: Pricing card shadow
- `--shadow-glass`: Glass card shadow
- `--animate-float`: Floating animation
- `--animate-pulse-glow`: Pulsing glow
- `.text-gradient-italic`: Gradient italic text (hero emphasis)
- `.glass-card` / `.glass-card-dark`: Glass morphism utilities
- `.pricing-popular`: Pricing card ring highlight
- `.feature-card-hover`: Lift animation for feature cards
- `.stat-glow`: Stat card background glow
- `.bg-shimmer`: Shimmer decoration
- `--color-emerald-500` / `--color-amber-500`: Status colors

---

## SEO Improvements

1. **Title**: "BITS | Collections CRM & Operations Platform — Dialer, AI Agents, QA"
2. **Keywords meta**: Added 10 target keywords including "debt collection software", "collections CRM"
3. **Meta description**: Enriched with transactional keywords + "Start your free trial"
4. **JSON-LD**: Added FAQPage schema for rich snippets
5. **SoftwareApplication**: Added `applicationSubCategory: "Debt Collection Software"`

---

## Responsive Behavior

| Breakpoint | Key Changes |
|---|---|
| `< 640px` (mobile) | Single column, sticky CTA visible, mobile nav |
| `640px–1024px` (tablet) | 2-column grids, pricing cards stack 1×3 |
| `> 1024px` (desktop) | Full 3-column layouts, sidebar in hero product, all effects visible |

---

## Accessibility

- All existing `aria-*` attributes preserved
- New components include `aria-label`, `role`, and semantic HTML
- Stats strip uses `motion` with `once: true` viewport detection
- Pricing cards are `<article>` elements with proper heading hierarchy
- AI agents section has proper status indicator semantics
- Sticky mobile CTA is `pointer-events-none` when hidden (no focus trap)
