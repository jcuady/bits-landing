# Enterprise SEO & AI Search Optimization Framework

> **Organization:** Boundless IT Solutions (BITS)  
> **Production Target:** Google Search, Bing Webmaster, AI Overviews, SearchGPT, Perplexity AI, Claude & Gemini  
> **Integrated Engine:** Claude SEO v2.4.0 (`AgriciDaniel/claude-seo`) + Next.js 16 App Router  
> **Verification Status:** Fully Installed, Doctor Verified, Clean Python 3.14 Runtime with Playwright Chromium  

---

## 1. Quick Start & Execution

### System-Wide Terminal / PowerShell (Windows)
The global launcher is located in `%USERPROFILE%\.local\bin\claude-seo.cmd` (in system `PATH`):

```powershell
# Verify runtime & browser readiness
claude-seo doctor

# Run full website audit
claude-seo run unlighthouse_run.py --site https://www.boundlessits.com

# Audit AI agent readiness & content signals
claude-seo run agentic_check.py https://www.boundlessits.com --json

# Generate Schema.org JSON-LD
claude-seo run schema_generate.py profile --help
```

### In Claude Code / Cursor / Antigravity IDE
When interacting via Claude Code or Cursor slash commands:

```bash
# Full site audit: parallel subagents produce a prioritized action plan
/seo audit https://www.boundlessits.com

# Deep single-page analysis: on-page elements, content quality, schema
/seo page https://www.boundlessits.com/bitscrm

# Schema markup audit: detect, validate, generate
/seo schema https://www.boundlessits.com

# AI search optimization (AEO/GEO): citability & primary-source recommendations
/seo geo https://www.boundlessits.com

# Agent readiness: Lighthouse Agentic score, llms.txt validation
/seo agentic audit https://www.boundlessits.com

# Change drift detection: baseline vs current
/seo drift baseline https://www.boundlessits.com
```

### Project NPM Scripts (`package.json`)
```bash
npm run seo:doctor   # Verifies Python 3.14 + Chromium runtime
npm run seo:agentic  # Audits agentic readiness & content signals
npm run seo:drift    # Captures current SEO baseline
npm run seo:audit    # Runs full Lighthouse performance & SEO check
```

---

## 2. Global & Project Installation Architecture

1. **Global Claude Hub**:
   - Location: `~/.claude/skills/seo` (v2.4.0)
   - Python Virtual Environment: `~/.claude/skills/seo/.venv`
   - Playwright Browsers: `~/.claude/skills/seo/ms-playwright` (Chromium 1243, headless shell)
   - Launcher: `~/.claude/skills/seo/scripts/claude-seo.cmd` forwarded to `~/.local/bin/claude-seo.cmd`

2. **Global IDE Customizations**:
   - Antigravity / Gemini CLI: `~/.gemini/config/skills/seo`
   - Cursor: `~/.cursor/skills/claude-seo`

3. **Repository Workspace (`BITS`)**:
   - Location: `.agents/skills/seo`
   - Environment: Directory junctions to the pre-compiled `.venv` and `ms-playwright` environments to eliminate redundant disk usage and prevent repository bloat.
   - Git Protection: `.gitignore` configured to ignore `.venv/`, `ms-playwright/`, and `__pycache__/`.

---

## 3. BITS Web SEO Architecture

### 3.1 Crawler & Robots Policy (`app/robots.ts`)
- Public routes (`/`, `/bitscrm`, `/bitsagent`, `/products/**`, `/brandbook`) are fully indexable.
- Explicit permissions and directives for modern search & AI agent crawlers:
  - `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` (OpenAI / SearchGPT)
  - `ClaudeBot`, `anthropic-ai` (Anthropic)
  - `PerplexityBot` (Perplexity AI)
  - `Google-Extended`, `Googlebot` (Google Gemini & Search)
  - `Bingbot`, `msnbot` (Microsoft Bing & Copilot)
  - `Applebot`, `Applebot-Extended` (Apple Intelligence)
- Private boundaries strictly disallowed:
  - `/app/` (CRM Workspace)
  - `/api/` (Backend Endpoints)
  - `/login`, `/forgot-password` (Authentication)
- Canonical sitemap: `https://www.boundlessits.com/sitemap.xml`
- Canonical host: `https://www.boundlessits.com`

### 3.2 Dynamic Sitemap (`app/sitemap.ts`)
- Automatically maps 21+ high-leverage routes with prioritized weights:
  - `1.0`: Home (`/`)
  - `0.95`: Flagship Products (`/bitscrm`, `/bitsagent`)
  - `0.90`: Core Products (`/products/crm`, `/products/collections`, `/products/ai-agent`)
  - `0.80`: Modular Business Engines (`/products/sales`, `/products/support`, `/products/hrms`, `/products/accounting`, etc.)
  - `0.60`: Brand Guidelines (`/brandbook`)
  - `0.30`: Legal & Privacy (`/legal`)

### 3.3 AI Search Standardization (`llms.txt` & `llms-full.txt`)
Per [llmstxt.org](https://llmstxt.org) standard for answer engines:
- **`public/llms.txt`**: Clean markdown summary containing core brand proposition, product hyperlinks, compliance facts, and contact coordinates.
- **`public/llms-full.txt`**: Deep architectural and statutory dossier detailing:
  - Full product breakdown (Collections CRM, Voice AI, ERP, HRMS, Construction, Sports Hub)
  - Statutory compliance (BSP Circulars 454/857, BIR CAS, NPC RA 10173 DPA 2012, DOLE/TRAIN Law)
  - Enterprise security architecture (RBAC, WORM logging, TLS 1.3, HIPAA audio compliance)
  - Deployment patterns (Sovereign Cloud vs On-Premises Air-Gapped)

### 3.4 Agentic Resource Discovery (`public/.well-known/ai-catalog.json`)
Conforms to Agentic Resource Discovery 1.0 specifications for agentic web browsing and tool invocation.

### 3.5 Security & SEO HTTP Response Headers (`next.config.ts`)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` on `/app/**` and `/api/**`
- `Cache-Control: public, max-age=31536000, immutable` on static assets and logos

### 3.6 Schema.org Structured Data
- **Organization & WebSite Schema** (`app/layout.tsx`): Establishes entity canonical identity, official brand aliases (`BITS`, `BITScrm`, `BITSagent`), logo, geo-location, contact points, and `knowsAbout` topics.
- **SoftwareApplication & OfferCatalog** (`app/layout.tsx`, `/bitscrm`, `/bitsagent`, `/products/[slug]`): Maps software application categories, pricing tiers, operating systems, and service offerings.
- **FAQPage Schema** (`components/sections/faq.tsx`): Directly mirrors conversational search queries with rich snippet answers for instant SERP expansions.
- **BreadcrumbList Schema** (`app/(marketing)/products/[slug]/page.tsx`): Hierarchical breadcrumb trails (`Home > Products > [Name]`).

---

## 4. Verification Checkpoints

| Checkpoint | Target | Command | Result |
|:---|:---|:---|:---:|
| **Claude SEO Doctor** | Runtime, Python 3.14, Chromium | `npm run seo:doctor` | **PASS (Ready)** |
| **TypeScript Integrity** | Strict type-checking, zero any bugs | `npx tsc --noEmit` | **PASS (0 errors)** |
| **Static Build Generation** | 57 pre-rendered static routes | `npm run build` | **PASS (57/57 routes)** |
| **AI Ingestion Dossier** | Standard llms.txt & llms-full.txt | `public/llms.txt` | **VERIFIED** |
| **Agentic Discovery** | Agentic 1.0 JSON Catalog | `public/.well-known/ai-catalog.json` | **VERIFIED** |
| **Crawler Guardrails** | App boundary isolation & AI crawlers | `app/robots.ts` | **VERIFIED** |
