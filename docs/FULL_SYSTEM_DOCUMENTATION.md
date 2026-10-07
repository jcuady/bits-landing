# BITS — Full System & Architecture Documentation
**Author:** Malcolm Cuady & Principal Full-Stack Engineering Team  
**Repository:** `jcuady/bits-landing` | **Organization:** Boundless IT Solutions (BITS)  
**Last Updated:** October 2026 | **Target Version:** Production Release 2.0  

---

## Table of Contents
1. [Executive Summary & Company Mission](#1-executive-summary--company-mission)
2. [Technology Stack & Core Dependencies](#2-technology-stack--core-dependencies)
3. [Supabase & Database Architecture](#3-supabase--database-architecture)
4. [Environment Variables & API Keys](#4-environment-variables--api-keys)
5. [System Functionality & End-to-End Capabilities](#5-system-functionality--end-to-end-capabilities)
6. [User Personas & Role-Based Access Control](#6-user-personas--role-based-access-control)
7. [Products & The 18 Enterprise Engines](#7-products--the-18-enterprise-engines)
8. [Brandbook & Design System (Glassmorphism & Clouds)](#8-brandbook--design-system-glassmorphism--clouds)
9. [Component Architecture & Directory Map](#9-component-architecture--directory-map)
10. [Developer Setup, Testing & Deployment Workflow](#10-developer-setup-testing--deployment-workflow)

---

## 1. Executive Summary & Company Mission

### 1.1 Who is BITS?
**Boundless IT Solutions (BITS)** builds sovereign enterprise operations software specifically engineered for high-volume collections agency floors, financial institutions, BPOs, and complex logistics networks in the Philippines and Southeast Asia.

### 1.2 The Problem We Solve
Traditional debt recovery and field operations suffer from four critical operational bottlenecks:
1. **Spreadsheet Chaos & Broken PTPs**: Over 40% of promises-to-pay (PTP) are missed because records remain buried in manual Excel sheets and Google Sheets, delaying re-allocation by days.
2. **Telephony Inefficiency & Dead-Air**: Outdated Asterisk/PBX systems take 3–5 seconds to connect, forcing agents to dial manually and listen to busy tones for 45 minutes of every hour.
3. **Ghost Visits & Fabricated Mileage**: Field collection reps submit unverified paper sheets and un-geotagged photos, leading to false travel reimbursements and uncollectible accounts.
4. **Regulatory Non-Compliance Fines**: Aggressive or unmonitored call center agents violate Bangko Sentral ng Pilipinas (**BSP Circulars 454 & 857**) fair collection rules and National Privacy Commission (**NPC RA 10173**) privacy laws, risking banking license revocations and severe financial fines.
5. **The "Per-Seat SaaS Tax"**: Foreign software giants (Salesforce, Genesys, Five9) charge prohibitive monthly seat fees ($150–$300/seat/month), draining agency margins.

### 1.3 The BITS Solution
- **OPERATIONS 360 (OMS)**: A unified operations management system combining CRM, real-time telephony, GPS field tracking, and AI speech QA.
- **Sub-350ms Predictive Pacing**: Calls connect to agents before the debtor finishes their first greeting, tripling live talk time.
- **10-Second Promise Watchdog**: Automated PTP tracking that re-allocates accounts to supervisors or field enforcement the moment a payment window expires.
- **100% Speech AI Compliance**: Automated acoustic and semantic scrubbing checking 100% of calls against anti-harassment standards and legal calling windows (6:00 AM – 10:00 PM).
- **Sovereign Infrastructure**: Zero per-seat licensing fees, cloud or on-premises deployment, and 100% Philippine data residency.

---

## 2. Technology Stack & Core Dependencies

The BITS codebase is built on the modern React and Next.js ecosystem, prioritizing zero-runtime overhead, sub-second TTFB, type safety, and fluid 60fps animations.

### 2.1 Core Frameworks & Runtime
| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | `16.3.5` | Turbopack compilation, React Server Components (RSC), static route generation, API routes, streaming SSR. |
| **Runtime** | React | `19.3.0` | React 19 primitives, Server Actions, concurrent transitions, optimistic UI updates. |
| **Language** | TypeScript | `7.0.2` | Strict compile-time validation (`npx tsc --noEmit`), zero type-coercion bypasses. |
| **Styling** | Tailwind CSS | `4.3.3` | Tailwind v4 engine using native `@theme` CSS tokens in `app/globals.css`. |
| **Motion** | Motion (Framer Motion) | `13.2.0` | Smooth physics-based micro-interactions, layout morphing, modal springs. |
| **Scroll Choreography** | GSAP & ScrollTrigger | `3.15.0` | High-precision interactive pinned timeline scrubbing in `HeroProduct`. |
| **Database & Auth** | Supabase Client & SSR | `@supabase/ssr@0.12.7`, `@supabase/supabase-js@2.117.1` | Postgres connection pooling, Row Level Security (RLS), and cookie session authentication. |
| **Validation** | Zod | `4.6.2` | Runtime request body validation, schema sanitization for lead intake. |
| **Charts & HUD** | Recharts & SVG | `3.10.1` | Recovery performance graphs, agent talk-time metrics, collection velocity charts. |
| **Icons** | Lucide React | `1.45.0` | Clean, modern feather-style icons with consistent stroke weights. |
| **End-to-End Testing** | Playwright | `1.63.0` | Automated headless multi-device responsive validation across 11 device viewports. |

---

## 3. Supabase & Database Architecture

BITS utilizes **Supabase (Managed PostgreSQL 15+)** for secure data persistence, role-based access control, and real-time event streaming.

### 3.1 Connection Details
- **Project URL**: `https://jvseyttzlobelrnzmfyf.supabase.co`
- **Dashboard**: [https://supabase.com/dashboard/project/jvseyttzlobelrnzmfyf](https://supabase.com/dashboard/project/jvseyttzlobelrnzmfyf)
- **Region**: Southeast Asia (Singapore / Sovereign low-latency cluster)

### 3.2 Database Schema & Tables

#### Table: `public.inbound_leads`
Captures high-intent enterprise consultation requests and contact form submissions.
```sql
create table if not exists public.inbound_leads (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  email             text not null,
  company           text not null,
  company_size      text,
  industry          text,
  current_system    text,
  primary_challenge text,
  preferred_method  text,
  interest          text,
  message           text not null,
  source            text not null default 'Website Contact Form',
  lead_score        integer not null default 70 check (lead_score >= 0 and lead_score <= 100),
  status            text not null default 'new' check (status in ('new', 'working', 'qualified', 'disqualified')),
  assigned_to       text not null default 'Malcolm Cuady',
  estimated_value   numeric(15, 2) not null default 650000 check (estimated_value >= 0),
  submitted_at      timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint inbound_leads_email_key unique (email)
);
```

#### Performance Indexes
- `inbound_leads_submitted_at_idx`: Descending index on `submitted_at` for rapid pagination.
- `inbound_leads_status_idx`: Fast filtering by lead triage status (`new`, `working`, `qualified`).
- `inbound_leads_lead_score_idx`: Priority sorting by automated qualification score.
- `inbound_leads_new_triage_idx`: Partial index on `submitted_at where status = 'new'` for zero-latency triage HUD.

#### Row Level Security (RLS) Policies
1. **Public/Service Role Submission**: Web actions (`app/actions/lead.ts`) insert via `service_role` or controlled RPC; anonymous users cannot dump or query debtor PII.
2. **Authenticated CRM Operators**: CRM operators query and update pipeline stages through `auth.uid()` verified sessions.
3. **Automated Timestamps**: Database trigger `inbound_leads_set_updated_at` fires before every row update to guarantee audit integrity.

### 3.3 Core CRM Mock & Enterprise Tables (In-Memory & Production)
- `companies`: Corporate accounts, credit lines, registered SEC legal names.
- `contacts`: Key executives, debtors, co-makers, phone numbers, verified emails.
- `leads`: Early pipeline opportunities, deal size, discovery notes, stage tracking.
- `opportunities`: Active contract negotiations, custom engine deployments.
- `audit_logs`: Immutable BSP-compliant logs recording agent access, exports, and call recordings.

---

## 4. Environment Variables & API Keys

Environment variables are managed through `.env.local` for local development and securely stored in Vercel Project Settings for production.

### 4.1 Required Variables Template (`.env.example`)
```env
# ==========================================
# BITS — Production & Vercel Environment Variables
# ==========================================

# 1. Supabase Connection & Service Keys
NEXT_PUBLIC_SUPABASE_URL=https://jvseyttzlobelrnzmfyf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# 2. Resend — Inbound Inquiries & Lead Notification Dispatch
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_INBOX=boundlessitsolutions@gmail.com
CONTACT_FROM=BITS Inquiries <onboarding@resend.dev>
# Switch to custom domain when DNS records propagate:
# CONTACT_FROM=BITS Inquiries <inquiries@boundlessits.com>

# 3. Public Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://www.boundlessits.com
```

### 4.2 Key Access & Security Rules
- **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**: Safe for client browser consumption. All data access is gated by PostgreSQL RLS.
- **`SUPABASE_SERVICE_ROLE_KEY`**: Strictly server-only. Never import this into Client Components or expose it in `NEXT_PUBLIC_*` variables.
- **`RESEND_API_KEY`**: Used by Server Actions in `app/actions/contact.ts` to dispatch email confirmations to clients and internal alerts to floor managers.

---

## 5. System Functionality & End-to-End Capabilities

BITS is architected as two interconnected surfaces: the **Public High-Converting Acquisition Platform** and the **Operational Management System (OMS/CRM)**.

```
                              ┌───────────────────────────────────┐
                              │    User / Enterprise Visitor      │
                              └─────────────────┬─────────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
     [ Public Marketing Surface ]                                  [ Operational OMS / CRM ]
  - Hero with Azure Cloud Canvas                                - Supervisor Dashboard (/app/dashboard)
  - Interactive OPERATIONS 360 Pinned Deck                      - Lead Funnel & Pipeline (/app/leads)
  - 18 Connected Engines Catalog                                - Collections PTP Watchdog Console
  - Regulatory Trust Strip (BSP/NPC)                            - WebRTC Telephony Softphone HUD
  - Solution Packages & Pricing (/pricing)                      - Field Agent GPS Telemetry Map
  - Security & Compliance Portal (/security)                    - Speech AI Real-Time QA Inspector
  - Solutions Discovery (/solutions)                            - Company & Contact Directories
  - Interactive Sandbox Demos (/demo)                           - Role-Based Settings & Audit Logs
```

### 5.1 Public Marketing & Conversion Surface
1. **Atmospheric Daytime Sky & Clouds Backdrop**:
   - Radiant azure sky gradient (`#1362df` via `#2377f3` to `#5ea2f9`).
   - Photorealistic, sunlit white cumulus clouds naturally framing the view without distracting animated drift loops.
   - Pinned sticky canvas (`sticky top-0 h-screen w-full`) ensuring the clouds and sky seamlessly extend down through the glassmorphic cockpit.
2. **Interactive OPERATIONS 360 Cockpit**:
   - Pinned interactive showcase that smoothly scrubs through the 4 flagship recovery specimens:
     - **Specimen 1: Collections CRM & PTP Watchdog**: Countdown timers, broken promise triggers, instant QR Ph/e-wallet links.
     - **Specimen 2: Sub-350ms Predictive Softphone**: WebRTC in-browser dialing, live audio waveforms, supervisor Listen/Whisper/Barge-in.
     - **Specimen 3: Field Agents App**: GPS live telemetry, 10m geofence locks, atomic clock timestamping, watermarked camera proof.
     - **Specimen 4: Real-Time QA Speech AI**: 100% call auditing, automatic BSP quiet-hour infraction flags, profanity scrubbers.
3. **Statutory Trust & Regulatory Governance (`TrustStrip`)**:
   - Direct verification against **BSP Circulars 454 & 857**, **NPC RA 10173 (DPA)**, **SEC MC No. 18**, **CIC RA 9510**, **ISO/IEC 27001**, and **DICT Cloud Cybersecurity**.
4. **Interactive Sandbox (`/demo`)**:
   - Allows prospective buyers to test the 18 engines in real time without creating an account.
5. **SEO & Agentic AI Visibility**:
   - Built-in `llms.txt`, `llms-full.txt`, and Schema.org JSON-LD structured data for Google AI Overviews, Perplexity, and Claude citability.

### 5.2 Core OMS & CRM Application (`/app`)
- **Executive HUD**: Real-time recovery rates, portfolio yield, talk-time averages, active field headcount.
- **PTP Automation Engine**: Auto-flags broken promises the exact minute they expire and re-routes accounts to legal or field enforcement.
- **WebRTC Softphone**: Eliminates desk phones and PBX server maintenance; runs 100% inside modern web browsers.
- **Field Route Optimization**: Calculates shortest travel distances for collection officers and prevents travel reimbursement fraud.
- **Auditing Vault**: Immutable call recordings and tamper-proof action trails ready for central bank examinations.

---

## 6. User Personas & Role-Based Access Control

| Role | Typical User | Primary Pages | Core Needs & Permissions |
|---|---|---|---|
| **Floor Manager / Supervisor** | Operations Manager, Team Lead | `/app/dashboard`, `/app/leads`, `/demo` | Real-time agent monitoring, live call barge-in, PTP allocation, floor quotas, daily settlement targets. |
| **Tele-Collection Agent** | Inbound/Outbound Phone Specialist | `/crm-sales`, `/app/leads`, Softphone HUD | One-click predictive dialing, quick account dispositioning, instant QR Ph link generation, call script guidance. |
| **Field Recovery Officer** | Field Agent, Motorcycle Messenger | Mobile Viewport, GPS Field App | Geofenced premise check-in, debtor signature capture, offline receipt sync, route navigation. |
| **QA & Compliance Officer** | Internal Auditor, Legal Counsel | `/app/settings`, QA Speech HUD, `/security` | Automated audio transcription, BSP 454 harassment violation tagging, exportable bank audit certificates. |
| **Executive / C-Suite** | CEO, COO, Chief Risk Officer | `/`, `/pricing`, Executive Cockpit | Portfolio recovery yield, license ROI, sovereign compliance certification, cross-entity financial consolidation. |
| **System Administrator** | DevOps Engineer, IT Director | `/app/settings`, Supabase Dashboard | API key rotation, SSO/SAML integration, IP whitelist enforcement, database backups, audit logging. |

---

## 7. Products & The 18 Enterprise Engines

BITS provides four unified product families housing 18 specialized operational engines.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      BITS SOVEREIGN PLATFORM ARCHITECTURE                   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
      ┌──────────────────┬─────────────┴──────┬──────────────────┐
      ▼                  ▼                    ▼                  ▼
[ FAMILY 1 ]       [ FAMILY 2 ]         [ FAMILY 3 ]       [ FAMILY 4 ]
 Collections         Telephony          Field Mobility     Governance,
& Recovery Core   & Communications      & Logistics       ERP & Workforce
```

### 7.1 Family 1: Collections & Recovery Core
1. **Collections CRM & Portfolio Engine**: Multi-tier aging brackets (1–30, 31–60, 90+ DPD), co-maker tracking, automated interest ledger.
2. **PTP Watchdog & Settlement Engine**: Cutoff countdowns, single-use QR Ph links, Maya & GCash direct webhooks.
3. **Legal & Remedial Case Tracker**: Demand letter generation, court date tracking, asset replevin workflow.
4. **Skip-Tracing & Data Enrichment**: SSS/TIN validation, multi-phone deduplication, verified employer database matching.

### 7.2 Family 2: Telephony & Communications Engine
5. **Sub-350ms Predictive Pacing Dialer**: Zero-dead-air pacing algorithm, answering machine detection (AMD) in <80ms.
6. **In-Browser WebRTC Softphone**: High-definition Opus audio, WebSockets signaling, zero PBX hardware footprint.
7. **Omnichannel Messaging Gateway**: Automated SMS, Viber Business messaging, WhatsApp, and email reminder sequences.
8. **Supervisor Command HUD**: Real-time floor status, silent listen, coaching whisper, and immediate call takeover (barge-in).

### 7.3 Family 3: Field Force & Mobility Suite
9. **GPS Field Telemetry & Fleet Radar**: Live agent tracking on OpenStreetMap/GIS, speed monitoring, territory heatmaps.
10. **Atomic Timestamp & Geofence Validator**: Check-in forms unlock strictly within 10 meters of debtor coordinates.
11. **Digital Proof-of-Visit (ePOD)**: Watermarked camera captures, on-glass debtor digital signatures, tamper-proof coordinates.
12. **Offline-First Field Mobile App**: Local SQLite cache allowing visits in rural/low-signal areas with automatic server sync.

### 7.4 Family 4: Governance, ERP & Workforce
13. **Speech AI Acoustic & Semantic QA**: 100% call recording audit, profanity detection, sentiment scoring.
14. **Regulatory Audit Engine**: Automated compliance checks for BSP Circulars 454/857 and NPC data privacy rules.
15. **BITS Accounting & ERP**: General Ledger, AP/AR 3-way match, multi-currency valuation, BIR CAS compliant.
16. **24/7 BPO Workforce & Rostering (HRMS)**: Shift bidding, biometric attendance integration, automated payroll calculation.
17. **Warehouse Inventory & Asset Dispatch**: Barcode/QR scanning, lot tracking, asset handover accountability.
18. **Virtual Queue & Dynamic Smart Cards**: Customer appointment flow management, dynamic NFC identity verification.

---

## 8. Brandbook & Design System (Glassmorphism & Clouds)

### 8.1 Visual Identity & Logo System
The BITS brand identity represents **boundless operational velocity** merged with **bank-grade stability**. The infinity symbol forms the counter-space of the capital letter "B".

```
     ┌────────────────────────────────────────────────────────┐
     │           OFFICIAL BRAND EMBLEM ASSETS                 │
     ├──────────────────────────┬─────────────────────────────┤
     │ File Path                │ Use Case                    │
     ├──────────────────────────┼─────────────────────────────┤
     │ public/brand/mark-tile.png      │ Sapphire squircle icon tile  │
     │ public/brand/logo-reverse.png   │ White horizontal logo (dark)│
     │ public/brand/logo-horizontal.png│ Dark navy logo (light mode) │
     │ public/brand/logo-stacked.png   │ Stacked icon + brand text   │
     │ public/brand/mark.png           │ High-res transparent emblem │
     └──────────────────────────┴─────────────────────────────┘
```

#### Logo Rules
- **Clear Zone**: Maintain at least 50% of the emblem's height as clear space on all four sides.
- **Prohibited**: Never apply generic drop shadows directly to the glyph, never alter the gradient angle, and never skew or stretch the bounding box.

### 8.2 Color Palette (Tailwind v4 Synchronized)

```css
/* Sapphire & Navy Surfaces */
--color-navy-950: #030d1c; /* Deep space black */
--color-navy-900: #06162f; /* Deep enterprise navy */
--color-navy-800: #081f4d; /* Section surface background */
--color-navy-700: #0a2b6f; /* Deep sapphire */
--color-navy-500: #1450c4; /* Saturated brand sapphire */

/* Electric Blue & Signal Cyan */
--color-electric-600: #0063db;
--color-electric-500: #007bff; /* Primary action button */
--color-signal-500:   #00a6ff; /* High-visibility accent */
--color-signal-300:   #5cc8ff; /* Pulse indicator & glows */

/* Daytime Azure Sky Horizon */
--sky-top:    #1362df; /* Vibrant high-altitude azure */
--sky-mid:    #2377f3; /* Brilliant cerulean */
--sky-lower:  #5ea2f9; /* Soft sunlit skywash */

/* Cloud & Frosted Glass Neutrals */
--color-cloud:     #f6f9fc; /* Soft cloud white */
--color-skywash:   #eaf4ff; /* Subtly tinted blue background */
--color-slate-50:  #f8fafc; /* Pristine ground section */
```

### 8.3 Typography
- **Primary Sans (`--font-sans`)**: Geist / Plus Jakarta Sans. Clean, geometrical, highly legible at small sizes for complex tables and data grids.
- **Editorial Serif Accent (`--font-serif`)**: Instrument Serif italic. Used for strategic emphasis in marketing headlines to convey luxury agency polish (e.g., *"One Connected Platform"*).
- **Monospace (`--font-mono`)**: Geist Mono. Used for financial sums, transaction IDs, telephone numbers, and timestamps.

### 8.4 The Glassmorphism & Cloud Implementation
- **Static Sky & Clouds**: The hero uses `/images/hero-sky-bg.jpg` pinned inside `sticky top-0 h-screen w-full`. All continuous cloud drifting loops and procedural 3D cloud clusters are disabled to guarantee zero distraction and 60fps performance.
- **Glassmorphism Hardware Console**:
  ```tsx
  className="rounded-2xl sm:rounded-3xl border border-white/80 bg-white/85 p-2.5 sm:p-3.5 lg:p-4 shadow-xl shadow-blue-950/8 backdrop-blur-2xl"
  ```
- **Depth Scrim**: Subtle sapphire vignette (`radial-gradient(ellipse, rgba(10,50,135,0.28), transparent)`) preserves crisp white text legibility without turning the sky into dark navy or muddy gray.

---

## 9. Component Architecture & Directory Map

```
c:\Users\jcuad\OneDrive\Documents\BITS
├── app/
│   ├── (auth)/                    # Authentication routes (/login, /forgot-password)
│   ├── (crm)/app/                 # Authenticated CRM & OMS application shell
│   │   ├── dashboard/             # Executive recovery dashboard
│   │   ├── leads/                 # Lead pipeline & PTP triage
│   │   ├── contacts/              # Debtor & stakeholder registry
│   │   ├── companies/             # Enterprise client entities
│   │   ├── opportunities/         # Deal & solution packages
│   │   └── settings/              # Access controls & preferences
│   ├── (marketing)/               # Public acquisition routes
│   │   ├── page.tsx               # Main landing page with Hero & Cockpit
│   │   ├── pricing/page.tsx       # Solution packages & licensing calculator
│   │   ├── security/page.tsx      # Sovereign security & statutory compliance
│   │   ├── solutions/page.tsx     # Department-by-department solution catalog
│   │   └── blog/                  # High-intent SEO & E-E-A-T articles
│   ├── (products)/                # Deep product showcase pages (/products/*)
│   ├── demo/page.tsx              # Interactive 18-engine sandbox demo
│   ├── layout.tsx                 # Root layout, fonts, meta tags, consultation provider
│   └── globals.css                # Tailwind v4 theme tokens & animations
│
├── components/
│   ├── crm/                       # CRM UI widgets (app shell, KPIs, data tables)
│   ├── layout/                    # Header (glass navbar), Footer, Container
│   ├── modals/                    # Consultation Modal Context & Dialogs
│   ├── sections/                  # Modular landing page sections
│   │   ├── hero.tsx               # Azure sky backdrop & main positioning
│   │   ├── hero-product.tsx       # OPERATIONS 360 pinned cockpit deck
│   │   ├── trust-strip.tsx        # BSP / NPC statutory compliance badges
│   │   ├── product-families.tsx   # 4 connected product suites
│   │   ├── solution-finder.tsx    # Problem-based discovery triage
│   │   ├── the-difference.tsx     # BITS vs generic software comparison
│   │   ├── floor-showcase.tsx     # Recovery floor dialer & softphone features
│   │   ├── industries.tsx         # Banking, BPO, FinTech, Logistics focus
│   │   ├── security.tsx           # Sovereign data isolation architecture
│   │   ├── deployment-models.tsx  # Cloud, Hybrid, On-Premises selector
│   │   └── pricing.tsx            # Zero per-seat fee pricing ladder
│   └── ui/                        # Reusable primitives (Buttons, Badges, Logo, Reveal)
│
├── lib/
│   ├── site.ts                    # Site configuration, navigation, SEO metadata
│   ├── solutions-data.ts          # Departmental solutions data models
│   ├── security-data.ts           # Security specs & compliance citations
│   ├── crm/                       # CRM types, selectors, and state management
│   └── supabase/                  # Supabase browser, server, and middleware clients
│
├── public/
│   ├── brand/                     # Official brand logos, marks, and tiles
│   ├── images/                    # Hero sky backdrop, feature screenshots
│   ├── llms.txt                   # Search & AI agent discovery manifest
│   └── llms-full.txt              # Comprehensive AI markdown catalog
│
└── scripts/                       # Automated DevOps, QA & validation scripts
    ├── capture-hero-operations360.mjs  # Playwright hero screenshot suite
    ├── responsive-validation.mjs        # 11-viewport responsive layout audit
    ├── seed-supabase.mjs               # Seeds Supabase with enterprise leads
    └── supabase-schema.sql             # Production SQL migration script
```

---

## 10. Developer Setup, Testing & Deployment Workflow

### 10.1 Local Development Prerequisites
- **Node.js**: `v20.x` or higher (LTS recommended)
- **Package Manager**: `npm` (`v10.x`+)
- **OS**: Windows, macOS, or Linux

### 10.2 Step-by-Step Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/jcuady/bits-landing.git
   cd bits-landing
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
4. **Launch the Turbopack Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3847](http://localhost:3847) in your browser.

### 10.3 Quality Assurance & Verification Commands
Always run the validation suite before submitting pull requests:

```bash
# 1. Type check the entire codebase (zero errors permitted)
npx tsc --noEmit

# 2. Test production build and static page generation
npm run build

# 3. Execute headless multi-device responsive test (11 viewports)
npm run test:responsive

# 4. Capture fresh screenshot visual proof
node scripts/capture-hero-operations360.mjs
```

### 10.4 Deployment Pipeline
- **Hosting**: Vercel Enterprise
- **Trigger**: Automatic continuous deployment on push to `main`.
- **Pre-deployment Verification**: Next.js automatically runs linting and TypeScript checks before producing production edge bundles.
- **Rollback Strategy**: Instant atomic rollback available in Vercel Deployment Dashboard.

---

*This document is maintained by the BITS Core Architecture Group. For questions, email `bits_inquiries@boundlessits.com` or consult Malcolm Cuady.*
