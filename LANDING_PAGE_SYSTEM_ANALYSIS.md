# BITS Landing Page — System and Product Analysis

**Purpose:** Source-of-truth brief for planning the public BITS landing page.  
**Product state reviewed:** 2026-09-16  
**Internal references:** [`CONTEXT.md`](../CONTEXT.md), [`NOTES.md`](../NOTES.md), [`SYSTEM_AUDIT.md`](SYSTEM_AUDIT.md)

This document separates capabilities that exist today from roadmap items. Public copy must not advertise an unfinished, placeholder, or unverified capability as available.

> **Superseded for page building:** use **Part A of [`OMS_FEATURES.md`](OMS_FEATURES.md)** (newer features, CRO brief,
> disclosure rules and ad plan). Keep this file as background analysis only.

---

## 1. Product summary

**BITS** is an operations platform from **Boundless IT Solutions** for teams that manage high-volume customer accounts and communications. Its first implemented line of business is **Collections**.

BITS brings account portfolios, agent work queues, contact activity, promises to pay, payment records, messaging, dialing, quality assurance, reporting, and operational controls into one role-based workspace.

### Plain-language purpose

BITS helps a collections operation answer four daily questions:

1. **Who should each agent work next?**
2. **What happened on every account?**
3. **Which promises, payments, and follow-ups require action?**
4. **How are agents, campaigns, and communication channels performing?**

### One-sentence positioning

> BITS gives collections teams one controlled workspace to manage accounts, contact customers, track outcomes, and improve operational visibility.

### What BITS is not

- Not a generic consumer CRM
- Not currently a debtor self-service portal
- Not a mobile field application
- Not an automatic payment-reconciliation platform
- Not an AI collections or next-best-action product
- Not currently a complete legal case-management or commission-billing system

---

## 2. Intended audiences

### Primary buyer

- Collection agencies
- Internal collections departments
- Operations leaders managing account portfolios and agent teams
- Organizations requiring an on-premises deployment option

### Daily users

| User | Main need |
|---|---|
| Collection agent | Prioritized queue, account context, contact tools, activity logging and PTP follow-up |
| Supervisor | Team visibility, assignment controls, live-call oversight and coaching |
| Manager | Campaign configuration, portfolio reporting, workflows and operational settings |
| QA reviewer | Evaluation forms, scoring criteria, audit worklists and outlier review |
| Administrator | Users, clients, channels, imports, system configuration and access control |
| Vendor support | Licensing and support without access to client portfolio data |

### Secondary landing-page audience

- IT managers evaluating deployment, security boundaries and infrastructure
- Business owners comparing operational coverage and modular pricing
- Prospective implementation partners

---

## 3. Core value proposition

### Operational control

Centralize debt accounts, customer information, assignments, activities, payments and follow-up work instead of managing them across disconnected spreadsheets and tools.

### Account-level history

Maintain a traceable account timeline for calls, messages, dispositions, notes, PTP events, payments and access history.

### Configurable workflows

Adapt dispositions, strategy rules, queues, assignment behavior, PTP holds and inactivity controls to each campaign or client.

### Integrated engagement

Support browser-based calling and multi-provider messaging from the account workflow when the relevant modules and infrastructure are enabled.

### Management visibility

Give supervisors and managers dashboards, reports, productivity views, call records and campaign-level analytics.

### Role and module boundaries

Limit what users can see and do through role policies, campaign scoping, fine-grained call-monitoring permissions and licensed modules.

---

## 4. Features implemented today

The following capabilities exist in the current application. Some require module licensing, provider credentials, or telephony infrastructure.

### 4.1 Portfolio and account management

- Client and campaign configuration
- Debtor and debt-account records
- Account balances, statuses and portfolio attributes
- Assignment to agents and teams
- Agent work queues and next-account navigation
- Account lookup across permitted campaigns
- Account archiving and controlled bulk actions
- Configurable table columns and account form fields
- Debtor matching and cross-reference tools

**Landing-page theme:** “One workspace for every account.”

### 4.2 Collections workflow

- Configurable disposition statuses and reasons
- Activity and notation history
- Promise-to-pay creation and follow-up
- PTP hold periods, overdue sweeps and broken-PTP handling
- Payment import and PTP outcome evaluation
- Ability-to-pay, willingness and delinquency-reason fields
- Automatic account closing and inactivity settings
- Strategy rules and conditional work pools

**Landing-page theme:** “Turn collection policies into repeatable workflows.”

### 4.3 Data import and reconciliation

- Campaign and account imports
- Reusable import-mapping templates
- Payment imports
- Upload logs and validation feedback
- Bulk condition updates
- Duplicate/debtor matching workflows

**Landing-page theme:** “Move portfolio data into action without rebuilding every spreadsheet.”

### 4.4 Messaging module

- One-to-one account messaging
- Message templates and merge fields
- Scheduled and manual message blasts
- Targeting conditions and resend cooldowns
- Per-debtor message limits
- Delivery-event webhooks where supported
- Channel configuration for email, SMS, WhatsApp, Viber and other providers
- Message activity and blast logs

Providers are implementation-dependent. Public copy should say **“supports configurable communication providers”**, not imply every listed provider has been validated in production.

**Verified exception:** PhilSMS is recorded as live-confirmed in the codebase.  
**Do not advertise as live:** Cast Philippines is an unverified placeholder.

### 4.5 Dialer and softphone module

- Browser-based SIP softphone
- Manual click-to-call
- Preview dialing
- Progressive dialing
- Predictive dialing
- Dialer campaigns and pacing controls
- Call status logs and recordings
- Phone-number verification and contact selection

Manual, Preview and Progressive modes use the browser softphone. Predictive mode additionally requires Asterisk AMI and its background loop. All real calling requires configured telephony.

**Landing-page theme:** “Call from the same workspace where agents manage the account.”

### 4.6 Live call supervision

- Live-call list
- Listen
- Whisper
- Barge
- Monitoring sessions and audit history
- Fine-grained monitoring permissions

**Do not advertise:** Call Takeover is deliberately disabled in both the UI and backend.

**Landing-page theme:** “Give supervisors real-time visibility and coaching tools.”

### 4.7 Quality assurance

- Configurable scoring criteria
- QA evaluations and score details
- QA audit segments and worklists
- Agent outlier analysis
- Links between activities, calls, recordings and evaluations

**Landing-page theme:** “Make quality reviews consistent and actionable.”

### 4.8 Reporting and operational visibility

- Operational dashboard
- Analytics dashboard
- Reports hub
- Agent productivity log
- Portfolio, city, employer and delinquency-bucket views
- Dialer and call reporting
- Payment, activity, login and access logs
- Exportable operational data
- Configurable metric definitions and custom reports

Avoid claiming formal real-time BI, predictive analytics or guaranteed report performance at an unspecified scale.

### 4.9 Team operations and support

- User and role management
- Team roster
- Team and ad-hoc chat rooms
- Help articles and in-app guide
- Support tickets and vendor support workflow
- Login and account-access logging

### 4.10 Field and skip-trace workflow

- Skip-trace segments and worklists
- Field-visit segments and worklists
- Assigned-account mobile API
- Activity logging with field-visit support

The backend API exists, but there is no installable mobile/PWA client. Landing copy may describe **field-work assignment inside the platform**, but must not claim a complete mobile application.

### 4.11 Compliance and guardrails

- Quiet-hour enforcement for manual contact
- Daily manual-contact limits
- Cease-desist and do-not-call enforcement
- Blast exclusions and per-debtor limits
- Restricted dispositions
- Role-based operations
- Optional TOTP authentication
- Call-monitoring audit trail

These are configurable product controls, not legal certification. Do not claim that BITS guarantees regulatory compliance.

### 4.12 Deployment and licensing

- Modular editions: Desk, Reach, Reach QA, Floor and Voice
- Independent Messaging, QA and Dialer module flags
- Cloud, on-premises and hybrid deployment metadata
- Telephony guardrails for dialer-enabled installations
- On-premises split-server installation package
- Vendor-managed licensing controls

The current verified deployment is an on-premises pilot using approximately eight concurrent agent seats. This is not a public capacity benchmark or SLA.

---

## 5. Product architecture in business terms

```text
Portfolio data
   → client and account configuration
   → scoped agent queues
   → calls, messages and activities
   → dispositions, PTPs and payments
   → QA, supervision and reporting
```

BITS is modular:

```text
Core Collections
├── Messaging
├── Quality Assurance
└── Dialer + Live Assist
```

This supports a landing-page narrative that starts with the core operating system and introduces optional engagement and supervision modules afterward.

---

## 6. Differentiators supported by the implementation

These points are defensible without inventing market claims:

1. **Collections-first workflow depth**  
   The system models dispositions, PTP lifecycles, payment outcomes, queues and portfolio segmentation—not just generic contacts and tasks.

2. **One account timeline across work channels**  
   Calls, messages, notes, dispositions, payments and QA artifacts connect to the debt account.

3. **Configurable by campaign**  
   Clients can have different workflow settings, assignment rules, templates and operational controls.

4. **Modular adoption**  
   Core collections, Messaging, QA and Dialer can be enabled independently.

5. **On-premises deployment support**  
   The repository includes a concrete Linux deployment package for separating the application/database and telephony workloads.

6. **Provider-oriented integrations**  
   Messaging and payment-link boundaries are designed around provider interfaces, allowing implementation-specific adapters.

7. **Operational safeguards**  
   Role scoping, module gates, contact limits, DNC/cease-desist controls and monitoring permissions are enforced server-side.

8. **Built for agent and supervisor workflows**  
   Work queues, Live Assist, QA and productivity reporting are connected rather than separate products.

Do not claim “industry-leading,” “AI-powered,” “fully compliant,” “zero downtime,” or quantified improvements without independently gathered evidence.

---

## 7. Recommended landing-page message hierarchy

### Hero

**Headline direction**

> Run collections from one controlled workspace.

**Supporting copy**

> Manage portfolios, guide agent workflows, connect customer communications, and track outcomes with a collections platform built for operational visibility.

**Primary CTA**

- Request a Demo

**Secondary CTA**

- Explore Capabilities

Do not use “Start Free” unless a real self-service signup and onboarding path is built.

### Section 2 — Problem

Frame the operational fragmentation:

- Accounts spread across spreadsheets
- Inconsistent follow-up and dispositions
- Limited supervisor visibility
- Separate tools for calls, messages and QA
- Manual reporting and reconciliation

### Section 3 — Core platform

Use four capability cards:

1. Portfolio & Workflow
2. Customer Engagement
3. Quality & Supervision
4. Reporting & Control

### Section 4 — How it works

1. Import and organize portfolios
2. Configure campaigns and rules
3. Route work to agents
4. Contact, record and follow up
5. Review performance and quality

### Section 5 — Modular capabilities

Present Core Collections, Messaging, QA and Dialer without forcing edition names before users understand the outcomes.

### Section 6 — Deployment

State:

- Supports on-premises deployments
- Telephony can be isolated from the application/database workload
- Deployment requirements depend on enabled modules

Do not expose live IP addresses, service tags, server credentials, provider secrets or internal operational details.

### Section 7 — Role-based experience

Show how agents, supervisors, QA reviewers and administrators use the same platform with different permissions and views.

### Section 8 — Final CTA

> See how BITS can fit your collections operation.

CTA: **Schedule a Consultation** or **Request a Demo**

---

## 8. Suggested landing-page feature groups

### Manage every account

- Portfolio and debtor records
- Assignment and queues
- Account history
- PTP and payment tracking
- Import and reconciliation

### Engage through the right channel

- Browser softphone
- Manual, Preview, Progressive and Predictive dialing
- Configurable message channels
- Templates and campaigns
- Contact controls

### Coach and improve teams

- Live Listen, Whisper and Barge
- QA scorecards
- Audit worklists
- Agent productivity
- Call recordings and logs

### Configure operations without rebuilding the system

- Campaign-level workflows
- Strategy rules
- Custom dispositions
- Worklist controls
- Modular licensing

### Keep leaders informed

- Dashboards
- Reports hub
- Portfolio analytics
- Activity and payment logs
- Exports

---

## 9. Claims matrix

### Safe to claim now

- Collections-focused CRM and operations platform
- Centralized debt-account and activity management
- Configurable dispositions, queues, strategies and PTP workflows
- Role-based access and campaign scoping
- Messaging templates and blasts
- Browser-based softphone and four dialer modes
- Listen, Whisper and Barge supervision
- QA evaluation and audit workflows
- Reporting, productivity and operational logs
- On-premises deployment support
- Modular Messaging, QA and Dialer capabilities

### Claim only with qualification

| Claim | Required qualification |
|---|---|
| Omnichannel | “Configurable provider integrations”; channel availability depends on provider setup |
| Predictive dialing | Requires Asterisk AMI, telephony configuration and background services |
| Call recording | Requires recording storage and ingestion configuration |
| Real-time supervision | Requires Live Call and ARI services |
| Compliance controls | Product controls only; not legal advice or certification |
| Mobile/field support | Backend API and field workflow exist; no mobile app |
| Cloud deployment | App-hosting scripts exist; telephony needs a separate plan |
| High performance / scalable | No public production-scale benchmark or SLA exists |

### Do not claim

- Debtor/customer self-service portal
- Live payment-link provider or automatic payment reconciliation
- Full mobile/PWA application
- Commission or client billing
- Call Takeover
- AI, machine learning or conversational AI
- Full legal workflow management
- PCI-DSS certification
- Guaranteed compliance
- Cast Philippines as a verified live provider
- Proven 16-channel GoIP deployment
- Formal uptime, capacity or performance SLA

---

## 10. Proof needed before final marketing copy

The product implementation supports the feature story, but the landing page still needs business evidence:

- Approved Boundless/BITS logo and brand system
- Approved customer segments and geography
- Demo environment or approved screenshots with synthetic data
- Customer testimonial or named case study, if available
- Quantified outcomes only if supported by measured data
- Confirmed sales contact path and CTA destination
- Privacy Policy and Terms links
- Official domain and support contact
- Commercial packaging and which edition names should be public
- Final legal review of “compliance” wording

Never use screenshots from the live CRM if they contain real debtor, account, payment, phone, email or client data.

---

## 11. Visual direction based on the product

The landing page should feel like an **operations platform**, not a generic startup template.

- Show account flow, team control and measurable work—not decorative AI graphics.
- Use anonymized/synthetic product UI in browser frames.
- Emphasize clarity, reliability and control.
- Use concise feature copy and operational diagrams.
- Consider a restrained enterprise palette aligned with the approved BITS brand.
- Avoid imagery of aggressive debt collection, distressed consumers or generic headset stock photos.
- Keep infrastructure detail secondary; buyers need outcomes first.

Recommended product visuals:

1. Dashboard overview with synthetic figures
2. Debt-account workspace and activity timeline
3. Agent queue / next-account workflow
4. Messaging or dialer campaign configuration
5. Live Calls supervisor view
6. QA scorecard

---

## 12. Landing-page success criteria

The finished page should:

- Explain what BITS is within five seconds
- Identify collections teams as the current primary audience
- Present the four core product pillars clearly
- Distinguish core and optional modules
- Offer a credible demo/contact CTA
- Avoid all unsupported roadmap and compliance claims
- Use no live production data or internal infrastructure identifiers
- Work across mobile, tablet and desktop
- Meet basic accessibility and performance standards
- Provide analytics for CTA conversion without exposing CRM data

---

## 13. Concise source copy

### Short description

> BITS is a collections operations platform that brings portfolio management, agent workflows, customer communications, payment and PTP tracking, quality assurance, and reporting into one role-based workspace.

### Feature summary

> Organize accounts, route work, contact customers, record outcomes, monitor quality, and understand performance—with modular messaging, dialer, and QA capabilities.

### Deployment statement

> Deploy BITS to fit your operating model, including supported on-premises configurations with isolated application and telephony workloads.

### Trust statement

> Server-side roles, campaign scoping, contact controls, audit history, and modular access help teams operate with clearer boundaries and accountability.

