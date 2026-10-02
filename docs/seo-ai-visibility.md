# Technical SEO & AI Visibility (AEO/GEO) Master Architecture Report

> **Entity:** Boundless IT Solutions (BITS)  
> **Canonical Production Host:** `https://www.boundlessits.com`  
> **Target Search Surfaces:** Google Search Console, Bing Webmaster Tools, Answer Engines (ChatGPT / SearchGPT, Perplexity AI, Claude Search, Google Gemini & AI Overviews)  
> **Audit Status:** Verified & Cleaned (October 2026)  
> **Public Route Inventory:** 30+ Canonical Routes Returning `HTTP 200 OK` (0 redirects, 0 broken links)  
> **TypeScript Compilation:** Passed with 0 Errors (`npx tsc --noEmit`)

---

## 1. Executive Summary & Crawlability Baseline

This document defines the technical SEO, AI Search Engine Optimization (AEO/GEO), and information architecture for Boundless IT Solutions (BITS). All public pages are server-rendered, semantically structured, and free of crawl barriers or redirect chains.

### Key Architectural Milestones
1. **Canonical Host Enforcement:** All requests canonically resolve to `https://www.boundlessits.com` without redirect hops.
2. **Edge Proxy Fast-Path Bypass (`proxy.ts`):** Requests to `/sitemap.xml`, `/robots.txt`, and static assets bypass Supabase authentication middleware with zero latency.
3. **Dedicated Products Destination (`/products`):** Full 18-product catalog index with structured `ItemList` JSON-LD and category filters.
4. **Interactive Intelligence Labs (`/blog`):** Search-intent optimized resource hub with real-time keyword search, category filters, and articles targeting commercial search queries (`best crm`, `crm for collections`, `best operations management system`).
5. **Standardized Product Hierarchy:** Unambiguous separation between the parent entity (BITS), strategic flagships (Operations 360, BITSagent, BITScrm), domain suites, and universal white-label capabilities.

---

## 2. Public URL Inventory & Index Status

All public routes below return `HTTP 200 OK`, emit self-referencing canonical tags, and are included in `https://www.boundlessits.com/sitemap.xml`:

| # | Public URL Route | Change Freq | Priority | Canonical Index Status | Schema Types Applied |
|:---:|:---|:---:|:---:|:---:|:---|
| 1 | `https://www.boundlessits.com` | daily | 1.0 | `index, follow` | `Organization`, `WebSite`, `SoftwareApplication` |
| 2 | `https://www.boundlessits.com/products` | daily | 0.95 | `index, follow` | `CollectionPage`, `ItemList`, `BreadcrumbList` |
| 3 | `https://www.boundlessits.com/blog` | daily | 0.95 | `index, follow` | `CollectionPage`, `BreadcrumbList` |
| 4 | `https://www.boundlessits.com/bitscrm` | weekly | 0.95 | `index, follow` | `SoftwareApplication`, `BreadcrumbList` |
| 5 | `https://www.boundlessits.com/bitsagent` | weekly | 0.95 | `index, follow` | `SoftwareApplication`, `BreadcrumbList` |
| 6 | `https://www.boundlessits.com/products/collections` | weekly | 0.90 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 7 | `https://www.boundlessits.com/products/ai-agent` | weekly | 0.90 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 8 | `https://www.boundlessits.com/products/sales` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 9 | `https://www.boundlessits.com/products/support` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 10 | `https://www.boundlessits.com/products/marketing` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 11 | `https://www.boundlessits.com/products/commerce` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 12 | `https://www.boundlessits.com/products/operations` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 13 | `https://www.boundlessits.com/products/accounting` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 14 | `https://www.boundlessits.com/products/hrms` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 15 | `https://www.boundlessits.com/products/payroll` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 16 | `https://www.boundlessits.com/products/construction` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 17 | `https://www.boundlessits.com/products/inventory` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 18 | `https://www.boundlessits.com/products/logistics` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 19 | `https://www.boundlessits.com/products/pickleball` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 20 | `https://www.boundlessits.com/products/sports-hub` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 21 | `https://www.boundlessits.com/products/booking` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 22 | `https://www.boundlessits.com/products/queuing` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 23 | `https://www.boundlessits.com/products/rag-engine` | weekly | 0.80 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 24 | `https://www.boundlessits.com/products/nfc-card` | weekly | 0.80 | `index, follow` | `Product`, `FAQPage`, `BreadcrumbList` |
| 25 | `https://www.boundlessits.com/products/white-label` | weekly | 0.85 | `index, follow` | `SoftwareApplication`, `FAQPage`, `BreadcrumbList` |
| 26 | `https://www.boundlessits.com/blog/best-collections-oms-debt-recovery-software-2026` | weekly | 0.95 | `index, follow` | `BlogPosting`, `FAQPage`, `BreadcrumbList` |
| 27 | `https://www.boundlessits.com/blog/best-sovereign-enterprise-crm-platforms-philippines` | weekly | 0.90 | `index, follow` | `BlogPosting`, `FAQPage`, `BreadcrumbList` |
| 28 | `https://www.boundlessits.com/blog/best-autonomous-voice-ai-agents-call-centers` | weekly | 0.90 | `index, follow` | `BlogPosting`, `FAQPage`, `BreadcrumbList` |
| 29 | `https://www.boundlessits.com/blog/on-premise-office-server-datacenter-setup-guide-2026` | weekly | 0.90 | `index, follow` | `BlogPosting`, `FAQPage`, `BreadcrumbList` |
| 30 | `https://www.boundlessits.com/blog/operations-management-system-vs-crm-guide` | weekly | 0.90 | `index, follow` | `BlogPosting`, `FAQPage`, `BreadcrumbList` |
| 31 | `https://www.boundlessits.com/brandbook` | monthly | 0.70 | `index, follow` | `WebPage` |
| 32 | `https://www.boundlessits.com/legal` | yearly | 0.30 | `index, follow` | `WebPage` |

---

## 3. Search Intent & Keyword Mapping Strategy

To ensure BITS captures buyers searching for enterprise software, every target keyword cluster is tied to a specific URL and clear search intent:

| Target Search Query | Search Intent | Primary Target URL | Supporting Content / In-Page Value |
|:---|:---|:---|:---|
| **"crm for collections"** / **"best collections crm"** | Commercial Investigation | `/blog/best-collections-oms-debt-recovery-software-2026` | Architectural benchmark comparing debt recovery systems. Direct link to Operations 360 specs. |
| **"best crm"** / **"best enterprise crm"** | High-Volume Commercial | `/blog/best-sovereign-enterprise-crm-platforms-philippines` | Evaluation of Salesforce vs HubSpot vs BITScrm on TCO, features, and local data residency. |
| **"operations management system"** / **"best oms"** | Commercial / Informational | `/blog/operations-management-system-vs-crm-guide` | Explains why traditional sales CRMs break down on floor operations and how an OMS coordinates QA, dialers, and scorecards. |
| **"debt collection software philippines"** | Localized Commercial | `/products/collections` | Operations 360 product page highlighting BSP Circulars 454/857 and NPC RA 10173 compliance. |
| **"voice ai call center"** / **"autonomous voice agents"** | Emerging Tech Commercial | `/bitsagent` & `/blog/best-autonomous-voice-ai-agents-call-centers` | Sub-350ms acoustic latency benchmarks, Taglish audio fluency, and live call transfer. |
| **"enterprise software philippines"** | Brand & Portfolio Discovery | `/products` & `/` | 18 connected software engines with unified data layer and sovereign hosting options. |
| **"cloud repatriation"** / **"on premise server setup"** | Technical / Financial | `/blog/on-premise-office-server-datacenter-setup-guide-2026` | 3-year TCO calculation comparing Dell PowerEdge hardware vs ongoing AWS/Azure cloud rent. |

---

## 4. AI Search & Crawler Access Policy (`robots.ts`)

BITS configures explicit permissions for search engines and AI citation crawlers while barring private application paths:

### Blocked Non-Public Routes (HTTP 403 / Noindex Header)
- `/app/**` — Private CRM workspace (enforced via Supabase authentication)
- `/api/**` — Backend operational endpoints
- `/login` — User authentication gateway
- `/forgot-password` — Password recovery portal

### Permitted AI Citation & Search Crawlers
The following AI search engines are granted access to index public content and cite BITS benchmarks in user answers:
- **OpenAI:** `OAI-SearchBot`, `ChatGPT-User` (for ChatGPT Search citations)
- **Anthropic:** `Claude-SearchBot` (for Claude search result citability)
- **Perplexity:** `PerplexityBot`, `Perplexity-User` (for Perplexity citations)
- **Google:** `Googlebot`, `Google-Agent` (for Google Search & AI Overviews)
- **Microsoft:** `Bingbot` (feeds Microsoft Copilot answers)
- **Apple:** `Applebot` (feeds Siri & Spotlight web discovery)

---

## 5. Technical SEO Verification Checklist

- [x] **Single H1 per Page:** Every page has exactly one `<h1>` matching the page's core entity and primary keyword.
- [x] **Unique Title & Meta Descriptions:** Zero duplicate or templated titles; descriptions between 150-160 characters.
- [x] **Canonical Consistency:** All canonical tags reference `https://www.boundlessits.com/...` with self-referencing paths.
- [x] **XML Sitemap Health:** Sitemaps update dynamically with release timestamps and only contain 200 OK canonical routes.
- [x] **Schema.org Validation:** Validated JSON-LD schemas for `Organization`, `WebSite`, `CollectionPage`, `ItemList`, `SoftwareApplication`, `BlogPosting`, and `FAQPage`.
- [x] **Internal Linking & Anchor Text:** Natural, descriptive anchor texts linking blog posts to product pages and vice versa.
- [x] **Mobile Responsiveness & Viewports:** Viewport meta tags set to `width=device-width, initial-scale=1`, touch targets > 44px.
- [x] **TypeScript Type Safety:** 0 errors across the entire codebase (`npx tsc --noEmit`).
