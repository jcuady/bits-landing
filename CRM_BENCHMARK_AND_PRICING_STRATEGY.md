# BITS (MET-CRM) — Competitive Benchmark & Pricing Strategy

**Document Version:** 1.0  
**Date:** September 2026  
**Target Market:** Philippines & Southeast Asia (Debt Collection Agencies, Financial Institutions, Lending Companies, Microfinance, BPOs, and Private Educational/Healthcare Institutions)

---

## Executive Summary

This document presents a comprehensive market research benchmark and pricing strategy for **BITS (MET-CRM)**, developed by Boundless IT Solutions. It evaluates the current platform capabilities, highlights operational and feature gaps when compared against local and regional market standards, provides a side-by-side competitive matrix, delivers three strategic pricing models designed to disrupt competitors, and outlines an actionable product roadmap.

---

## Part 1: Current MET-CRM Baseline (What We Already Have)

BITS is built on a modern, high-performance web and telephony stack: **Laravel 13, Filament 5, PostgreSQL, Redis, and Asterisk ARI/AMI**.

### Existing Strengths & Built-in Modules

1. **Core Accounts & Debtor Management**:
   - Comprehensive debtor profiling (demographics, employment details, contact references, linked accounts).
   - Debtor Match Groups for portfolio-wide deduplication and debtor linking.
   - Granular user- and role-based field/column visibility preferences.
   - Comprehensive audit trails (`DebtAccountActivity`, `AccountAccessLog`, `PurgeLog`, `DataUploadLog`).

2. **Collections Workflows & Logic**:
   - Configurable disposition hierarchies and delinquency reasons.
   - Promise-to-Pay (PTP) tracking, PTP hold settings, and automatic status updates.
   - Willingness-to-Pay and Ability-to-Pay profiling matrices.
   - Configurable campaign welcome rules and auto-close settings.

3. **Telephony & Contact Center**:
   - Embedded WebRTC browser softphone integration (`SoftphoneProvider`).
   - Multiple dialing modes: **Preview Dialer**, **Auto Dialer**, and **Predictive Dialer** (`PredictiveDialerController`, `RunPredictiveDialerLoop`).
   - Automated call recording ingestion and browser playback (`CallRecordingResource`, `IngestCallRecordings`).
   - Real-time agent availability tracking and telephony attempt logs.
   - Real-time Live Call Monitoring (`LiveCallsMonitor`, `CallMonitoringService`): **Listen** (silent monitor), **Whisper** (supervisor coaching), and **Barge** (three-way join). *Takeover remains intentionally disabled server-side.*

4. **Quality Assurance (QA)**:
   - Configurable QA scoring rubrics and criteria (`QaScoringCriterion`).
   - Targeted QA audit segmentation and worklist generation (`QaAuditSegment`, `QaAuditWorklistItem`).
   - Statistical QA Outlier Agent Finder (`QaOutlierAgentFinder`) for identifying non-compliant or underperforming collector patterns.

5. **Philippine Regulatory Compliance (`ComplianceGate`)**:
   - **Data Privacy Act of 2012 (RA 10173)** & **SEC Memorandum Circular No. 18 (Series of 2019)** alignment.
   - Automated enforcement across manual calls and messages:
     - Quiet hours restriction (prevents calls outside statutory hours).
     - Daily manual contact attempt capping per account.
     - Cease-and-Desist and Do-Not-Call (DNC) list enforcement.

6. **Field Collections & Skip-Tracing Foundation**:
   - Segment and worklist assignment for field visit teams and skip tracers.
   - Sanctum-authenticated REST API (`/api/mobile/*`) for mobile authentication, assigned account queries, and photo-attached field visit logging.

7. **Two-Axis Licensing Architecture**:
   - **Axis A (Module Entitlements)**: Independent feature flags (`messaging`, `qa`, `dialer`) with 5 named edition presets (*Desk, Reach, Reach QA, Floor, Voice*).
   - **Axis B (Deployment & Hardware Guardrails)**: Metadata tracking deployment type (*Cloud, On-Premise, Hybrid*) and telephony hardware SKUs (e.g., Dell PowerEdge servers, GoIP GSM gateways).

---

## Part 2: Feature Gap Analysis (What Competitors & Local Institutions Have That MET-CRM Lacks)

Local companies, collection agencies, financing companies, and private institutions (universities, hospitals, utilities) in the Philippines typically rely on solutions such as **Volare AMS + Roadie** (Stampede Solution), **Vasool**, **FICO Debt Manager**, **Salesforce Collections Cloud**, **Hosted Vicidial + Custom DBs**, and **Zoho/HubSpot**.

```
                                    FEATURE GAP SUMMARY
   ┌──────────────────────────────────┬──────────────────────────────────┐
   │       PAYMENT & RECOVERY         │        PORTALS & FIELD OPS       │
   │  • Local E-Wallets (GCash/Maya)  │  • Debtor Self-Service Portal    │
   │  • Dynamic QR Ph Generation      │  • Creditor/Client Portal        │
   │  • Automated Webhook Balance Sync│  • Offline-First Field PWA/App   │
   │  • Recurring Auto-Debit (ADA)    │  • GPS Geofencing & Route Opt.   │
   ├──────────────────────────────────┼──────────────────────────────────┤
   │       LEGAL & COMPLIANCE         │       FINANCIAL & OMNICHANNEL    │
   │  • Formal Demand Letter (FDL) Gen│  • Collector Commission Engine   │
   │  • Courier Tracking (LBC/PHLPost)│  • Client Contingency Billing    │
   │  • Small Claims & Court Tracker  │  • BIR CAS / 2307 / E-Invoicing  │
   │  • Barangay Conciliation Workflow│  • 2-Way Live Social Inbox (FB)  │
   ├──────────────────────────────────┴──────────────────────────────────┤
   │                     NEXT-GEN AI & AUTOMATION                        │
   │  • Taglish/Filipino Speech-to-Text (STT) 100% QA Audio Audit        │
   │  • Early-Bucket AI Conversational Voicebot (DPD 1-30)               │
   │  • Predictive Propensity-to-Pay (P2P) Machine Learning Scoring      │
   └─────────────────────────────────────────────────────────────────────┘
```

### 1. Payment Gateway & Real-Time Settlement Rails (Philippine Local Rails)
* **Current MET-CRM State**: Scaffolding exists (`PaymentLinkProviderInterface` and tables); registry is empty with zero concrete providers integrated.
* **Competitor Standard**:
  * **Direct GCash & Maya Integration**: Dynamic **QR Ph** codes generated on the fly and sent via SMS/WhatsApp or shown directly to debtors.
  * **Payment Rails**: Integration with **PayMongo**, **Xendit**, or **Dragonpay** (covering over-the-counter payments at 7-Eleven Cliqq, Cebuana Lhuillier, MLhuillier, and online bank transfers).
  * **Real-time Webhook Auto-Reconciliation**: Instant callback upon payment updates account balance, clears PTPs, immediately pauses automated dialers (preventing unlawful post-payment contact under SEC rules), and delivers an automated electronic acknowledgment receipt.

### 2. Portals (Debtor Self-Service & Creditor Placement)
* **Current MET-CRM State**: Zero public- or client-facing web surfaces.
* **Competitor Standard**:
  * **Debtor Self-Service Portal**: A secure, tokenized magic-link portal where debtors can review their Statement of Account (SOA), select pre-approved restructuring/installment terms, upload deposit slip images, and pay via QR Ph.
  * **Client / Creditor Placement Portal** *(similar to Volare AgentX)*: A dedicated portal for institutional clients (banks, lending companies, universities, private clinics) to upload portfolios, monitor real-time collection metrics, listen to call recordings, inspect compliance scores, approve settlement waivers/discounts, and download liquidation reports.

### 3. Field Collection Front-End Client (Mobile App / PWA)
* **Current MET-CRM State**: Sanctum REST API endpoints exist, but there is **no user-facing mobile app or PWA**.
* **Competitor Standard** *(Volare Roadie, Vasool)*:
  * **Offline-First Functionality**: Field collectors in Philippine provinces frequently encounter dead zones; clients must cache data locally and sync when back online.
  * **GPS Geofencing & Timestamps**: Validates that the collector was physically present at the registered barangay/residence address.
  * **Route Optimization**: Geographic clustering of accounts to reduce travel time and motorcycle fuel consumption.
  * **Bluetooth Thermal Printer Integration**: Instant printing of 58mm physical collection acknowledgment receipts.
  * **Digital Signature & Collateral Photo Capture**: On-screen signatures and photo documentation of borrower premises or collateral.

### 4. Legal & Remedial Action Module
* **Current MET-CRM State**: General disposition notes and delinquency tracking only.
* **Competitor Standard**:
  * **Automated Demand Letter (FDL) Generation**: Batch PDF generation with dynamic legal clauses (Final Demand, Notice to Surrender Collateral, Notice to Vacate).
  * **Courier Barcode & Delivery Tracking**: Integration with LBC, 2GO, J&T, or PHLPost tracking numbers. Return-card delivery status is critical documentary evidence for Philippine courts.
  * **Small Claims & Judicial Tracking**: Milestone tracking for Barangay Conciliation (*Lupon Tagapamayapa*), filing in Municipal/Metropolitan Trial Courts (MTC/MeTC), Summons, Pre-Trial, Judgment, and Writs of Execution/Garnishment.

### 5. Financial Accounting, Commission Engine & BIR Compliance
* **Current MET-CRM State**: Raw string column (`DebtAccount.commission_bucket`) with no calculation logic or invoicing.
* **Competitor Standard**:
  * **Collector Commission Engine**: Multi-tiered sliding commission brackets (e.g., base recovery rate + target milestone bonus + supervisor override), with clawback logic on bounced payments or reversed PTPs.
  * **Agency Contingency Fee Billing**: Automated calculation of agency success fees (e.g., 10% on 30–60 DPD, 25% on 90+ DPD write-offs) and skip-tracing billables for creditor invoicing.
  * **Philippine Tax & Invoicing Compliance**: E-Invoicing / BIR CAS readiness, automatic **BIR Form 2307** tracking (2% Creditable Expanded Withholding Tax standard for collection fees), and sync to accounting software (Xero, QuickBooks, SAP).

### 6. Omnichannel 2-Way Unified Agent Inbox
* **Current MET-CRM State**: Outbound SMS/email blasts and WhatsApp webhook ingestion exist, but lack a unified 2-way live chat console.
* **Competitor Standard**:
  * In the Philippines, debtors respond significantly faster on **Facebook Messenger and Viber** than on cellular phone calls or email.
  * A unified 2-way inbox allows agents to handle live conversations across WhatsApp, Facebook Messenger, Viber, and Webchat from a single interface alongside the debtor's account history.

### 7. Next-Gen AI & Speech Intelligence
* **Current MET-CRM State**: Manual QA evaluation forms and algorithmic predictive pacing.
* **Competitor Standard**:
  * **AI Voicebot / Conversational IVA**: Automated voice bots handling early-bucket accounts (1–30 DPD) in Filipino/Taglish to confirm payment commitments, reserving human collectors for harder accounts.
  * **Speech-to-Text (STT) & 100% QA Audio Audit**: Automated Taglish audio transcription that flags regulatory violations (BSP/SEC harassment rules, profanity, unverified identity disclosures) across 100% of recorded calls.
  * **Machine Learning Propensity-to-Pay (P2P) Scoring**: Evaluates debtor payment likelihood based on past dispositions to prioritize daily call queues.

---

## Part 3: Competitor Benchmark Matrix

| Feature Area | BITS (MET-CRM) | Volare AMS + Roadie (Stampede) | Vasool App | Hosted Vicidial + CRM | Salesforce / FICO | Zoho / HubSpot |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Target Market** | PH Debt Collection & BPO | SEA Mid/Large Enterprise | PH Microfinance / Lending | Legacy PH Agencies | Tier-1 Universal Banks | General SMEs / Schools |
| **Predictive Dialer** | Built-in (Asterisk) | Add-on / Integrated | None | Built-in | Add-on (Genesys/NICE) | Basic telephony integration |
| **WebRTC Softphone** | Built-in | Yes | None | Third-party SIP softphone | Add-on | Softphone widget |
| **QA Rubrics & Scoring** | Built-in (with Outlier Finder)| Enterprise QA | None | Manual / None | Advanced QA Cloud | Basic ticket QA |
| **Quiet Hours & DNC** | Built-in (`ComplianceGate`)| Built-in | Basic | Manual dial lists | Advanced Rules Engine | Manual / DNC plugins |
| **Local PH Rails (GCash/Maya)**| Scaffolding only | Integrated | Integrated | None (Manual bank slips) | Third-party gateway | Third-party gateway |
| **Field Mobile App** | API only (No client UI) | Full (Roadie) | Full (Offline GPS) | None | Mobile Publisher | Generic Mobile CRM |
| **Creditor / Client Portal** | None | Full (AgentX) | None | None | Community Cloud | Customer Portal |
| **Debtor Self-Service** | Roadmap | Available | Basic | None | Digital Self-Service | None (Generic form) |
| **Legal / Litigation Module**| None | Comprehensive | Basic | None | Custom Object / AppExchange | Deals / Custom Module |
| **Commission Engine** | Placeholder | Advanced | Basic | Spreadsheet export | Advanced Incentive Mgmt | Extension / Zoho Creator |
| **Deployment Model** | Cloud & On-Prem (GoIP) | Cloud & On-Prem | Cloud SaaS | Mostly On-Prem | 100% Cloud SaaS | 100% Cloud SaaS |

---

## Part 4: How to Price MET-CRM to Gain the Upper Hand

### 1. Market Pricing Realities in the Philippines

* **Enterprise Tier-1 (Salesforce / FICO + Genesys Cloud)**:
  - **Cost**: **₱8,500 – ₱20,000 ($150 – $350+)** per agent/month + **₱1,500,000 – ₱5,000,000+** upfront implementation fees.
  - *Disadvantage*: Completely out of budget for 95% of Philippine collection agencies, rural banks, and cooperatives.
* **Regional Enterprise Suites (Volare AMS + Roadie + Dialer)**:
  - **Cost**: Typically **₱3,500 – ₱7,000** per seat/month across separate module licenses, or heavy capital perpetual licenses with 18–20% annual maintenance.
* **Hosted Vicidial + Generic CRM Setup**:
  - **Cost**: **₱600 – ₱1,800** per seat/month for hosted Asterisk/Vicidial + ₱800–₱2,000 for a generic CRM (Zoho/Bitrix).
  - *Disadvantage*: Clunky UI, fragmented data, no unified QA audit trail, and high security/compliance vulnerabilities under RA 10173.

### 2. Strategic Positioning: The "Unified Stack" Disruption

Most Philippine agencies currently pay multiple vendors:
`CRM (₱1,200) + Dialer/Vicidial (₱1,500) + QA software (₱800) = ₱3,500/agent/month` + SIP trunk charges.

Because MET-CRM integrates the CRM, Asterisk Predictive Dialer, WebRTC softphone, and QA scoring engine in one platform, BITS can offer **all-in-one bundle pricing** that undercuts competitors while providing higher gross margins.

---

### Pricing Model A: Tiered Per-Agent Monthly Subscription (Direct SaaS Model)
*Mapped directly to the codebase's `LicenseTier` presets:*

| Edition Preset | Included Modules | Target Audience | Recommended Price (PHP) | Competitor Benchmark |
| :--- | :--- | :--- | :--- | :--- |
| **BITS Desk** | Base CRM (Debtor, PTP, Accounts, Logs) | Back-office admin, skip-tracers, compliance | **₱799 / user / month** | ₱1,200 – ₱2,000 (HubSpot/Zoho) |
| **BITS Reach** | CRM + Messaging (SMS/Email/WhatsApp Blaster) | Early-recovery & messaging agents | **₱1,299 / user / month** | ₱2,500+ (CRM + Twilio/SendGrid) |
| **BITS Reach QA** | CRM + Messaging + Full QA Module | Agencies with dedicated QA auditors | **₱1,799 / user / month** | ₱3,500+ (CRM + QA tool) |
| **BITS Voice** | CRM + Dialer + WebRTC Softphone (No Blaster/QA) | Pure voice recovery teams | **₱2,199 / user / month** | ₱3,000+ (CRM + Hosted Dialer) |
| **BITS Floor** | **Complete Suite** (CRM + Blasts + QA + Predictive Dialer) | Full-service contact center agents | **₱2,899 / user / month** | ₱5,000 – ₱8,000 (Volare / Multi-vendor) |

> **Why Model A Wins**: Offering **BITS Floor at ₱2,899/seat/month** for a full Omnichannel + Predictive Dialer + QA platform saves a 25-seat agency roughly **₱50,000 to ₱125,000 every month** compared to enterprise competitors, with zero integration friction.

---

### Pricing Model B: The "Agency Appliance" Hybrid Model (Dominant for Philippine On-Premise Setups)
*Best suited for Philippine agencies that use on-premise hardware (e.g., Dell PowerEdge R740/R430/R320) with GoIP 16-channel GSM gateways and local SIM cards (Globe/Smart postpaid unli-call plans).*

* **Base Appliance Platform Fee**: **₱24,999 / month flat**
  - Covers on-premise server deployment, automated software updates, database maintenance, and vendor support.
* **Plus Variable Per-Seat Fee**:
  - **₱499 / user / month** (Desk / Back-office user)
  - **₱999 / user / month** (Floor / Dialer active agent)

> **Why Model B Wins**: Large agencies (50–150 agents) often avoid standard SaaS because per-seat fees scale aggressively. Under Model B, a 50-agent call center pays `₱24,999 + (50 × ₱999) = ₱74,949/month` (**₱1,499/agent effective**). This provides predictable, high recurring revenue (ARR) while offering unbeatable pricing against international SaaS providers.

---

### Pricing Model C: Enterprise Capital / Perpetual License + AMC (For Banks, Universities & Private Institutions)
*Conservative institutions (rural banks, private universities, healthcare chains) often prefer one-time capital purchases over SaaS.*

* **One-Time Software License**: **₱450,000 – ₱750,000** (up to 50 concurrent seats).
* **Turnkey On-Premises Installation & Telephony Provisioning**: **₱75,000 – ₱120,000** (provisioning Dell bare-metal, Asterisk, WebRTC, GoIP gateways, and initial data seeding).
* **Annual Maintenance Contract (AMC)**: **18% – 20% annually** (~**₱80,000 – ₱150,000 / year**) starting in Year 2 for patches, regulatory updates, and tier-2 technical support.

---

### Additional Ancillary Revenue Streams

1. **SMS & Telecom Gateway Markup**:
   - Integrate an SMS provider (e.g., Promotexter, Cast PH, or Semaphore) at a wholesale rate of ~₱0.35–₱0.40/SMS, reselling message blasts through the platform at **₱0.50–₱0.65/SMS**.
2. **Implementation & Data Migration Packages**:
   - Charge a one-time onboarding fee of **₱25,000 – ₱60,000** for legacy CSV mapping, user role configuration, and softphone provisioning.
3. **Turnkey Telephony Hardware Kits**:
   - Offer pre-configured, tested hardware packages: Dell R320/R430 telephony box + GoIP 16-port GSM Gateway + managed PoE switch at cost + a 25% integration margin.

---

## Part 5: Actionable Product Roadmap Recommendations

To bridge the most critical commercial gaps without overextending development resources, focus on these prioritized steps:

```
                  RECOMMENDED DEVELOPMENT ROADMAP
  ┌─────────────────────────────────────────────────────────────┐
  │ PHASE 1: IMMEDIATE WINNERS (P0)                             │
  │ • Plug in PayMongo/Xendit to complete PaymentLinkProvider   │
  │ • Debtor Portal Lite (Tokenized balance view & QR Ph pay)   │
  │ • Basic Client Recovery Report Export / Portal view         │
  ├─────────────────────────────────────────────────────────────┤
  │ PHASE 2: FIELD & BILLING (P1)                               │
  │ • Offline-first lightweight PWA for field agents            │
  │ • Collector commission rules & contingency fee calculation  │
  │ • Formal Demand Letter (FDL) batch PDF generator            │
  ├─────────────────────────────────────────────────────────────┤
  │ PHASE 3: COMPETITIVE DIFFERENTIATION (P2)                   │
  │ • 2-Way Unified Social Inbox (Facebook Messenger & Viber)   │
  │ • Taglish Speech-to-Text for automated QA call audits       │
  │ • Conversational AI Voicebot for 1-30 DPD early reminders   │
  └─────────────────────────────────────────────────────────────┘
```

By completing the payment gateway and debtor portal lite in Phase 1, you can launch **BITS Floor at ₱2,899/agent/month** (or **Model B** for on-premise agencies), providing an all-in-one solution that delivers a clear cost advantage over competing platforms in the Philippine market.
