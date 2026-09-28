# Technical SEO & AI Visibility (AEO/GEO) Architecture Report

> **Entity:** Boundless IT Solutions (BITS)  
> **Canonical Production Host:** `https://www.boundlessits.com`  
> **Target Indexers:** Google Search Console, Bing Webmaster Tools, Answer Engines (ChatGPT/SearchGPT, Perplexity AI, Claude, Google Gemini)  
> **Audit Status:** Verified & Cleaned (September 28, 2026)  
> **Sitemap Verification:** 25/25 Canonical Routes Returning `HTTP 200 OK` (0 redirects, 0 broken links)

---

## 1. Google Search Console Root Cause Analysis & Diagnostic Breakdown

From the live Search Console screenshot:
- **Reported Error:** `Sitemap could not be read — General HTTP error (1 instance)`
- **Sitemap URL:** `https://boundlessits.com/sitemap.xml`
- **GSC Property Selected:** `https://boundlessits.com/` (URL-prefix, apex non-www domain)
- **Last Read:** `Sep 27, 2026`

### Root Cause 1: Cross-Host Redirect on URL-Prefix Property
1. The user's production site canonical host is `https://www.boundlessits.com`.
2. When Googlebot fetched `https://boundlessits.com/sitemap.xml` under the apex URL-prefix property, the edge returned a `308 Permanent Redirect` to `https://www.boundlessits.com/sitemap.xml`.
3. In Google Search Console, a URL-prefix property (`https://boundlessits.com/`) will reject sitemaps that redirect across hosts with a **"General HTTP error"** / **"Couldn't fetch"**.

### Root Cause 2: Historical September 27 Deployment 500 Incident
On September 27, 2026, the application experienced a temporary deployment issue resulting in HTTP 500 responses before Supabase fallbacks were hardened. Googlebot recorded that HTTP error on Sep 27.

### Root Cause 3: Middleware Network Overhead on Static Metadata Files
In `proxy.ts`, the Next.js middleware was previously executing Supabase authentication (`supabase.auth.getUser()`) on requests to `/sitemap.xml`, `/robots.txt`, and static files. Any upstream latency or Supabase delay caused timeouts or 500s when crawlers fetched the sitemap.

### Root Cause 4: `/brandbook` 307 Redirect in Sitemap
In the previous sitemap, `/brandbook` was redirecting to `/brandbook.html` with HTTP 307. Sitemaps must contain only 200-OK canonical destinations.

---

## 2. Implemented Architecture Fixes

### Fix A: Fast-Path SEO Bypass in Edge Proxy (`proxy.ts`)
- Added zero-latency fast-path bypass for `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/brandbook`, and all `.xml`, `.txt`, `.md` files before initializing Supabase clients or reading cookies.
- Updated `config.matcher` in `proxy.ts` so edge middleware is completely bypassed for search and AI crawlers.

### Fix B: Zero-Redirect Brandbook Rewrite (`next.config.ts`)
- Added `beforeFiles` rewrite: `/brandbook` -> `/brandbook.html`.
- Accessing `https://www.boundlessits.com/brandbook` now returns `HTTP 200 OK` directly without redirects, matching the canonical tag.

### Fix C: Stable Sitemap Timestamps & Clean Typing (`app/sitemap.ts`)
- Replaced dynamic `new Date()` millisecond jitter with stable release date (`2026-09-28T00:00:00.000Z`) in W3C Datetime format.
- Verified that all 25 URLs are indexable, canonical, and return HTTP 200.

### Fix D: Standards-Compliant `Host:` Directive in `robots.txt` (`app/robots.ts`)
- Fixed `Host:` directive to output `Host: www.boundlessits.com` (pure hostname without protocol), conforming to RFC and robot parser specifications.

### Fix E: Explicit Cache-Control & Content-Type Headers (`next.config.ts`)
- Configured `Content-Type: application/xml; charset=utf-8` and `Cache-Control: public, max-age=3600, stale-while-revalidate=86400` for `/sitemap.xml`.
- Configured `Content-Type: text/plain; charset=utf-8` and caching for `/robots.txt`.

---

## 3. Verified Public URL Inventory (25 Indexable Pages)

All 25 URLs tested and verified to return `HTTP 200 OK`:

| # | Public URL Route | Change Frequency | Priority | Status |
|:---:|:---|:---:|:---:|:---:|
| 1 | `https://www.boundlessits.com` | daily | 1.0 | `200 OK` |
| 2 | `https://www.boundlessits.com/bitscrm` | weekly | 0.95 | `200 OK` |
| 3 | `https://www.boundlessits.com/bitsagent` | weekly | 0.95 | `200 OK` |
| 4 | `https://www.boundlessits.com/products/crm` | weekly | 0.90 | `200 OK` |
| 5 | `https://www.boundlessits.com/products/white-label` | weekly | 0.85 | `200 OK` |
| 6 | `https://www.boundlessits.com/products/collections` | weekly | 0.90 | `200 OK` |
| 7 | `https://www.boundlessits.com/products/ai-agent` | weekly | 0.90 | `200 OK` |
| 8 | `https://www.boundlessits.com/products/sales` | weekly | 0.80 | `200 OK` |
| 9 | `https://www.boundlessits.com/products/support` | weekly | 0.80 | `200 OK` |
| 10 | `https://www.boundlessits.com/products/marketing` | weekly | 0.80 | `200 OK` |
| 11 | `https://www.boundlessits.com/products/commerce` | weekly | 0.80 | `200 OK` |
| 12 | `https://www.boundlessits.com/products/accounting` | weekly | 0.80 | `200 OK` |
| 13 | `https://www.boundlessits.com/products/hrms` | weekly | 0.80 | `200 OK` |
| 14 | `https://www.boundlessits.com/products/payroll` | weekly | 0.80 | `200 OK` |
| 15 | `https://www.boundlessits.com/products/construction` | weekly | 0.80 | `200 OK` |
| 16 | `https://www.boundlessits.com/products/inventory` | weekly | 0.80 | `200 OK` |
| 17 | `https://www.boundlessits.com/products/logistics` | weekly | 0.80 | `200 OK` |
| 18 | `https://www.boundlessits.com/products/pickleball` | weekly | 0.80 | `200 OK` |
| 19 | `https://www.boundlessits.com/products/sports-hub` | weekly | 0.80 | `200 OK` |
| 20 | `https://www.boundlessits.com/products/booking` | weekly | 0.80 | `200 OK` |
| 21 | `https://www.boundlessits.com/products/queuing` | weekly | 0.80 | `200 OK` |
| 22 | `https://www.boundlessits.com/products/rag-engine` | weekly | 0.80 | `200 OK` |
| 23 | `https://www.boundlessits.com/products/nfc-card` | weekly | 0.80 | `200 OK` |
| 24 | `https://www.boundlessits.com/brandbook` | monthly | 0.70 | `200 OK` |
| 25 | `https://www.boundlessits.com/legal` | yearly | 0.30 | `200 OK` |

---

## 4. Crawl Control & Privacy Boundaries

### Blocked Non-Public Routes (Robots.txt + X-Robots-Tag)
- `/app/**` — Private CRM application workspace (protected by Supabase auth)
- `/api/**` — Internal backend API routes
- `/login` — User authentication portal
- `/forgot-password` — Password recovery portal

All non-public routes emit:
`X-Robots-Tag: noindex, nofollow, noarchive, nosnippet`

### Authorized AI Crawlers in `robots.txt`
- **Google:** `Googlebot`, `Google-Extended`, `Google-Agent`
- **OpenAI:** `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `OAI-AdsBot`
- **Anthropic:** `ClaudeBot`, `Claude-SearchBot`, `Claude-User`, `anthropic-ai`
- **Perplexity:** `PerplexityBot`, `Perplexity-User`
- **Microsoft:** `Bingbot`, `msnbot`
- **Apple:** `Applebot`, `Applebot-Extended`
- **Open Web:** `CCBot`

---

## 5. Owner Action Plan in Google Search Console

To permanently resolve the status in Google Search Console:

1. **Submit Sitemap to the Canonical Property:**
   - In Google Search Console, click the property dropdown in the top-left corner.
   - Select or add the **`https://www.boundlessits.com/`** property (or the DNS Domain property `boundlessits.com`).
   - Go to **Sitemaps** > Enter `sitemap.xml` > Click **Submit**.
   - Because `https://www.boundlessits.com/sitemap.xml` returns `200 OK` with zero redirects, Google will immediately mark it as **Success** (Green).

2. **If keeping the non-www property (`https://boundlessits.com/`):**
   - In Search Console under `https://boundlessits.com/`, the redirect is normal behavior because all traffic is canonically routed to `www`.
   - In the sitemap drilldown, clicking **"Open Sitemap"** opens `https://www.boundlessits.com/sitemap.xml`.
   - The primary reporting and indexing data should always be monitored on the **`https://www.boundlessits.com/`** property.
