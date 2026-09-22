# Technical SEO & AI Visibility (AEO/GEO) Architecture Report

> **Entity:** Boundless IT Solutions (BITS)  
> **Canonical Domain:** `https://www.boundlessits.com`  
> **Production Target:** Google Knowledge Graph, Bing Webmaster, Answer Engines (ChatGPT/SearchGPT, Perplexity AI, Claude, Google Gemini)  
> **Last Verified:** September 2026

---

## 1. Executive Summary & Entity Knowledge Graph

This system architecture establishes **Boundless IT Solutions (BITS)** as an authoritative software engineering organization in the Philippines, anchoring all product brands (**BITScrm**, **BITSagent**, and 18 specialized enterprise engines) within search engine indexes and AI knowledge graphs.

### Entity Canonical Mapping
| Brand / Alias Term | Entity Type | Target Canonical URL | Schema.org Type |
|:---|:---|:---|:---|
| **Boundless IT Solutions** | Parent Organization / Corporation | `https://www.boundlessits.com/` | `Organization`, `WebSite` |
| **BITS** | Organization Brand Name | `https://www.boundlessits.com/` | `Brand` |
| **BITScrm** | Flagship Collections & CRM Platform | `https://www.boundlessits.com/bitscrm` | `SoftwareApplication` |
| **BITSagent** | Autonomous Voice/Email AI Operations | `https://www.boundlessits.com/bitsagent` | `SoftwareApplication` |
| **BITS Accounting & ERP** | SAP-Grade Financial Management Engine | `https://www.boundlessits.com/products/accounting` | `SoftwareApplication` |
| **BITS HRMS & Payroll** | TRAIN Law Compliant Workforce Core | `https://www.boundlessits.com/products/hrms` | `SoftwareApplication` |
| **BITS Tap™ NFC Card** | Dynamic NFC Smart Identity Hardware | `https://www.boundlessits.com/products/nfc-card` | `Product` |
| **BITS Construction Ops** | Jobsite, Fleet & Inventory Logistics | `https://www.boundlessits.com/products/construction` | `SoftwareApplication` |
| **BITS White-Label** | Multi-Tenant Reseller Platform | `https://www.boundlessits.com/products/white-label` | `SoftwareApplication` |

---

## 2. Public URL Inventory & Index Status

| URL Route | Canonical URL | Index Policy | Change Freq | Priority | Primary Structured Data |
|:---|:---|:---:|:---:|:---:|:---|
| `/` | `https://www.boundlessits.com/` | `index, follow` | weekly | 1.0 | `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage` |
| `/bitscrm` | `https://www.boundlessits.com/bitscrm` | `index, follow` | weekly | 0.9 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/bitsagent` | `https://www.boundlessits.com/bitsagent` | `index, follow` | weekly | 0.9 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/service` | `https://www.boundlessits.com/products/service` | `index, follow` | weekly | 0.9 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/sales` | `https://www.boundlessits.com/products/sales` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/marketing` | `https://www.boundlessits.com/products/marketing` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/commerce` | `https://www.boundlessits.com/products/commerce` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/accounting` | `https://www.boundlessits.com/products/accounting` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/hrms` | `https://www.boundlessits.com/products/hrms` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/construction` | `https://www.boundlessits.com/products/construction` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/sports-ai` | `https://www.boundlessits.com/products/sports-ai` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/sports-hub` | `https://www.boundlessits.com/products/sports-hub` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/rag-engine` | `https://www.boundlessits.com/products/rag-engine` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/nfc-card` | `https://www.boundlessits.com/products/nfc-card` | `index, follow` | weekly | 0.8 | `Product`, `BreadcrumbList`, `FAQPage` |
| `/products/white-label` | `https://www.boundlessits.com/products/white-label` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/real-estate` | `https://www.boundlessits.com/products/real-estate` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/healthcare` | `https://www.boundlessits.com/products/healthcare` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/automotive` | `https://www.boundlessits.com/products/automotive` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/education` | `https://www.boundlessits.com/products/education` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/products/legal` | `https://www.boundlessits.com/products/legal` | `index, follow` | weekly | 0.8 | `SoftwareApplication`, `BreadcrumbList`, `FAQPage` |
| `/legal` | `https://www.boundlessits.com/legal` | `index, follow` | yearly | 0.2 | `WebPage` |
| `/login` | — | `noindex, nofollow` | — | — | Authentication Boundary |
| `/app/**` | — | `noindex, nofollow` | — | — | Private CRM Application Workspace |
| `/api/**` | — | `noindex, nofollow` | — | — | Internal Backend API Endpoints |

---

## 3. Crawler Controls & Robots Policy

File: `app/robots.ts` (`https://www.boundlessits.com/robots.txt`)
```txt
User-agent: *
Allow: /
Disallow: /app/
Disallow: /api/

Sitemap: https://www.boundlessits.com/sitemap.xml
```

### AI Crawler Compatibility
- **Googlebot & Google-Extended:** Full access to public marketing & product documentation.
- **Bingbot:** Full access.
- **OAI-SearchBot & GPTBot:** Full access for OpenAI SearchGPT citations.
- **PerplexityBot:** Full access for live Perplexity answer retrieval.
- **ClaudeBot / Anthropic:** Full access for real-time model synthesis.
- **Private Data Protection:** `/app/` (CRM dashboard) and `/api/` are strictly blocked via `robots.txt` + `robots: { index: false, follow: false, nocache: true }` HTTP response header metadata.

---

## 4. Structured Data Architecture

### 4.1 Organization Root Schema (`app/layout.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BITS - Boundless IT Solutions",
  "legalName": "Boundless IT Solutions",
  "alternateName": [
    "Boundless IT Solutions",
    "BITS",
    "BITScrm",
    "BITS CRM",
    "BITSagent",
    "BITS Tap",
    "Boundless IT Solutions Philippines",
    "Boundless IT"
  ],
  "url": "https://www.boundlessits.com",
  "logo": "https://www.boundlessits.com/brand/logo-horizontal.png",
  "image": "https://www.boundlessits.com/og.png",
  "description": "Business-specific software, workflow automation, CRM, AI-assisted operations, and digital infrastructure for BPOs, collection agencies, banks, and operations with complex workflows.",
  "slogan": "Technology built around the way your business actually operates.",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "PH",
    "addressRegion": "NCR",
    "addressLocality": "Metro Manila"
  },
  "knowsAbout": [
    "Enterprise Software Engineering",
    "Collections CRM Software",
    "Predictive Dialer Telephony",
    "Autonomous Voice AI Agents",
    "Accounting and Financial ERP Systems",
    "Philippine Payroll Compliance and TRAIN Law",
    "Smart NFC Hardware and Dynamic Identity",
    "Omnichannel Contact Center Operations"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "bits_inquiries@boundlessits.com",
    "contactType": "Customer Support and Inquiries"
  }
}
```

### 4.2 SoftwareApplication Schema (Implemented on `/bitscrm`, `/bitsagent`, and `/products/[slug]`)
- Correlates each software engine with publisher `BITS - Boundless IT Solutions` and brand `Boundless IT Solutions`.
- Specifies price, operational categories (`BusinessApplication`), and deployment methods (`Managed Cloud, Sovereign On-Premises`).

### 4.3 BreadcrumbList Schema
- Renders hierarchical navigation breadcrumbs for search snippet rich results: `Home > Products > [Product Name]`.

### 4.4 Prompt-Mirroring FAQPage Schema
- Directly answers conversational user queries (e.g., *"How does BITScrm comply with BSP regulations?"*, *"Can BITSagent run on-premise?"*, *"Does BITS Accounting comply with BIR CAS?"*).

---

## 5. Verification & Testing

1. **TypeScript Integrity:** `npx tsc --noEmit` verifies strict types with zero errors.
2. **Build Validation:** `npm run build` static pre-rendering completes with 49 static routes generated.
3. **Responsive Verification:** `node scripts/responsive-validation.mjs` confirms 17 exact home page sections, touch targets (>= 44px), and viewport accessibility.
