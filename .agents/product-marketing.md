# Product Marketing Context

**Document version:** v1
**Last updated:** 2026-10-06

## Product Overview

**One-liner:** Operations 360 is a Philippine-market debt collections platform — desk, dialer, mobile field app, QA, skip trace, messaging, and audit in one system for six user types.

**What it does:** Operations 360 runs the full collections operation for licensed Philippine collection agencies, banks, BPO collections arms, and field-recovery teams. It covers the agent's day (worklist, softphone, auto-dialer, disposition locking), the manager's day (campaign, reports, reassignment, PTP hold period), the field agent's day (mobile app with GPS-tagged visits), the QA reviewer's day (scorecards, audit segments, outlier-agent ranking), the compliance officer's day (per-channel cease-and-desist, quiet hours, abandon-rate, immutable Purge Log), and the vendor's day (license edition, deployment metadata).

**Product category:** Vertical SaaS — debt collections CRM (Philippine market, regulated industry)

**Product type:** SaaS with on-prem / hybrid option (cloud, on-prem, hybrid — VN-04); deployed via web app + Android/iOS mobile field app + WebRTC softphone + GoIP/PBX telephony.

**Business model:** Five preset software-pack editions (Desk, Reach, Reach QA, Floor, Voice) with optional module toggling (Messaging, QA, Dialer). Pricing is unpublished on the wire; behind sales wall.

## Target Audience

**Target companies:** Licensed Philippine collection agencies; in-house bank / credit-card / microfinance / telco collections departments; BPO collections arms in Manila; international collections outsourcers running a Philippine delivery centre; field-recovery specialists.

**Decision-makers:** CFO / VP Finance (financial buyer); Head of Collections (champion + user); Compliance Officer (technical influencer on audit/regulator); IT Lead (technical buyer on telephony + integration); Vendor / Procurement.

**Primary use case:** Replace a stack (CRM + separate dialer + paper field logs + spreadsheets + WhatsApp + a separate QA tool) with one regulator-grade platform; gain real-time visibility into field-agent activity; pass the next BSP / regulator audit without re-engineering.

**Jobs to be done:**
- Run my agents from anywhere (desk or phone) with the same workflow.
- Pass my next regulator audit without re-engineering.
- Replace five tools with one and stop reconciling spreadsheets.

**Use cases:**
- Licensed agency running 50–500 agents across multiple campaigns, with a field-recovery sub-team.
- Bank in-house collections floor (200+ agents, multi-product: cards + personal loans + microfinance) that must produce a quarterly audit pack.
- BPO collections arm running outbound + inbound campaigns across multiple Philippine languages.
- Skip-trace-and-field-only specialist with 10–30 agents in the field.

## Personas

| Persona | Cares about | Challenge | Value we promise |
|---------|-------------|-----------|------------------|
| CFO / VP Finance | CAC, ROI, time-to-value, audit findings | Replacing tools is politically expensive; one bad audit is publicly visible | Replace 3–5 tools; pass the next audit without re-engineering |
| Head of Collections | Recoveries %, PTP kept %, agent utilisation, regulator findings | Multi-tool sprawl loses recoveries to bad data; field agents are invisible | One pipeline from skip trace to PTP-kept; field agent recoveries in the same report |
| Compliance Officer | C&D per channel, DNC, abandon-rate, immutable audit, data residency | Regulator findings close programmes; manual audit prep is a full FTE | Regulator-defensible by default; immutable Purge Log; per-channel compliance |
| IT Lead | WebRTC, telephony provider, GoIP, deployment | Multi-PBX migrations are painful; downtime kills recoveries | WebRTC + multi-provider PBX + Asterisk WebSocket + 16-SIM GoIP out of the box |
| Field Supervisor / Manager | Field-agent utilisation, GPS verification, photo proof | Field agents claim visits they didn't do; cannot verify without spot-checks | Every visit is auditable, every photo shown, every GPS tick timestamped |
| Agent | Less typing, no laptop, same workflow | Carrying a laptop to a Manila apartment block is impractical; typing in a doorway is worse | Phone-based field logging with photo, GPS, and the same disposition shortcuts |

## Problems & Pain Points

**Core problem:** Collections teams run on a stack of disconnected tools (CRM + dialer + spreadsheets + paper field logs + WhatsApp + a separate QA tool), lose recoveries to bad data, cannot see field agents, and dread regulator audits.

**Why alternatives fall short:**
- Global debt-collection CRMs (FICO, Temenos, etc.) are heavy, slow, and lack a real mobile field component; they are not Philippine-specific
- Generic CRMs (Salesforce, HubSpot, Zoho) require the team to build the collections workflow themselves
- Generic dialers (Five9, Genesys) have no collections workflow, no field app, no compliance-aware disposition locking
- Generic field-service apps (ServiceTitan, Jobber, ServiceNow FSM) lack the collections state machine (PTP, Kept/Short/Broken, cease-and-desist, abandon-rate)
- Paper + spreadsheets is cheap to start and breaks at the first audit

**What it costs them:** Recoveries are 10–30% lower than they should be (industry rule-of-thumb). Each BSP finding is publicly visible. Each missed audit finding can pause a programme. Field agents without visibility drift — average utilisation drops 15–25% within 90 days of going unmonitored.

**Emotional tension:** The Head of Collections carries the recoveries number; the Compliance Officer carries the next audit; the CFO carries the replacement-tool decision; the IT Lead carries the telephony migration. None of them want to bet on a single vendor. The trust signal is depth of regulatory detail and the demo experience.

## Competitive Landscape

**Direct (debt-collection CRM, same problem):** FICO Debt Manager, Temenos collections module, Eximbills, regional vendors, Philippine BPO-built internal CRMs — fall short on Philippine specificity (timezone, carriers, channels), no native mobile field app, no regulator-grade audit, slow to change.

**Secondary (different shape, same problem):** Generic CRMs (Salesforce, HubSpot, Zoho) — no built-in collections workflow; generic dialers (Five9, Genesys) — no collections workflow, no field app; generic field-service apps (ServiceTitan, Jobber) — no collections state machine, no audit, no compliance.

**Indirect (the way it used to be done):** Paper field logs + spreadsheet reconciliations + Excel queue manager + separate predictive dialer + separate chat tool + manual audit prep — breaks at scale, breaks at audit, breaks at any attempt to consolidate reporting.

**Where Ops 360 wins:** Philippine-specific (timezone, Globe/Smart/DITO carrier detection, multi-channel incl. Viber/WhatsApp); Mobile Field App with GPS-tagged visits and server-side scoping; built-in WebRTC softphone; built-in predictive dialer with abandon-rate reporting; immutable Purge Log + per-channel C&D; six roles in one data model.

## Differentiation

**Key differentiators:**
1. Mobile Field App with **GPS coordinates** on every field-visit activity and **server-side 403 enforcement** of account scoping
2. Regulator-defensible by default — quiet hours, per-channel C&D, abandon-rate reporting, immutable Purge Log, fail-closed licence gating
3. All roles in one data model — six roles, 33 modules, one audit log
4. Philippine-specific — timezone, carrier detection, multi-PBX, multi-channel
5. WebRTC softphone built-in
6. Five preset software-pack editions (Desk / Reach / Reach QA / Floor / Voice)

**How we do it differently:** Ops 360 bakes the mobile field app into the same data model as the desk and dialer — same disposition state machine, same audit log, same role-based access. Most competitors either ship no mobile app at all or ship a bolt-on that doesn't share the audit trail.

**Why that's better:** A field visit in Ops 360 is auditable end-to-end: GPS coordinates + photo + disposition + PTP + (if applicable) compliance flag, locked into the same audit log the desk agent uses. A field agent who can only see their own accounts is server-enforced, not just hidden — they cannot bypass even by poking the API.

**Why customers choose us:** Regulator-defensible by default. Mobile field app with audit-grade GPS evidence. Six roles in one data model. Philippine-specific. Replace 3–5 tools with one.

## Objections

| Objection | Response |
|-----------|----------|
| "We already have a CRM and a separate dialer. Why replace?" | Same data model across desk, dialer, mobile, QA. One audit log. Lower TCO. The product replaces three to five tools — not just two. |
| "Will it pass the next BSP audit?" | Regulator-defensible by default: quiet hours, per-channel C&D enforcement, immutable Purge Log, abandon-rate, GPS-tagged field visits. Show the audit-log view in the demo. |
| "How do I know my field agents will actually use the app?" | Server-side enforcement: agents only see their own accounts (403 if not), can only log their own visits, can't bypass the disposition workflow. There's no separate "self-report" path. |

**Anti-persona:**
- One-tool-only buyers looking for a pure dialer or a pure CRM
- Buyers in non-PH jurisdictions (carrier detection is PH-only)
- Buyers in grey-market collections where regulator-grade audit is wasted
- Buyers who require a no-deployment pure SaaS (we ship all three — cloud, on-prem, hybrid — but the on-prem story requires an IT buyer)

## Switching Dynamics

**Push:** Tool sprawl is breaking under regulator pressure; spreadsheet reconciliations are publicly visible in audit; field-agent recoveries are not in the report.

**Pull:** Single audit log; mobile app with GPS-tagged visits; regulator-defensible by default; Philippine-specific (carriers, channels, timezone).

**Habit:** "We've always used spreadsheets for field visits." "Our existing CRM works fine for the desk." "Our compliance officer is comfortable with the current audit prep."

**Anxiety:** "Will the migration break our reporting?" "What if our field agents refuse the mobile app?" "What if the regulator finds something during the switch?" Answer with a pilot path, an audit-safe migration plan, and a server-enforced field-app policy.

## Customer Language

**How they describe the problem:**
- "Our field agents say they went, but we don't have proof."
- "The audit team is asking for things we can't produce from the spreadsheets."
- "We can't see what our agents are doing on the phone."
- "Our skip-trace and field-visit data doesn't end up in the same report as the desk data."
- "Our predictive dialer doesn't tell us about abandon rate."

**How they describe us (anticipated — verify once we ship):**
- "It follows our agents out the door."
- "Every visit, GPS-tagged."
- "Built for the audit list regulators actually want to see."
- "Six roles. One platform."

**Words to use:** GPS-tagged, GPS coordinates, server-enforced, regulator-defensible, immutable audit, abandon-rate, predictive dialer, field agent, field visit, disposition, PTP (Promise to Pay), Kept/Short/Broken, cease-and-desist, do-not-call, Globe / Smart / DITO, WebRTC softphone, GoIP, voice blast, skip trace, collection queue.

**Words to avoid:** AI (until we ship it and have evidence), "magic," "transforms," "revolutionary," "all-in-one" (until we've shipped every advertised module — PL-01 is dormant).

**Glossary:**

| Term | Meaning |
|------|---------|
| PTP | Promise to Pay — agent logs an agreement; outcome is Kept, Short, or Broken after grace period |
| Disposition | The status code logged after each contact attempt (New, PTP, Broken PTP, No Answer, Paid, etc.) |
| Skip Trace | Cheap recovery stage before physical visit — finding new phone / address |
| Field Visit | Physical door-knock by a field agent to recover or verify |
| Dialer | Predictive / Progressive / Preview outbound dialer |
| Abandon Rate | % of calls where the dialer bridged a call but no agent was free — regulator looks at this |
| C&D | Cease and desist — debtor-level block on contact; PH collections are cease-and-desist-blocking per channel |
| Softphone | Browser-based phone (WebRTC) — no separate app needed |
| GoIP | GSM-over-IP SIM trunk — the on-site cellular lines for inbound + outbound |
| Viber / WhatsApp | Local messaging channels in addition to SMS and email |
| BSP | Bangko Sentral ng Pilipinas — the Philippine central bank and primary regulator |

## Brand Voice

**Tone:** Confident, regulatory-aware, technically specific, no marketing fluff. Operator-to-operator, not vendor-to-buyer.

**Style:** Direct. Concrete. Numbers where they help. We do not say "magic" or "transform." We say "GPS coordinates" and "server-enforced" and "immutable audit log."

**Personality:** Audited. Philippine. Pragmatic. Thorough.

## Proof Points

**Metrics:** (verify before claiming) — recoveries %, PTP-kept %, abandon-rate %, time-to-audit-pack, average agent utilisation, average agent recoveries, field-visit-to-PTP conversion.

**Customers:** (none authorised publicly yet — open question for the sales team)

**Testimonials:** (none authorised publicly yet — open question for the sales team)

**Value themes:**
- Regulator-defensible by default — feature list (immutable Purge Log, per-channel C&D, abandon-rate, GPS-tagged field visits)
- Field visibility — Mobile Field App + GPS coordinates + server-side scoping
- One pipeline — six roles, one data model, one audit log
- Philippine-specific — timezone, Globe/Smart/DITO, multi-PBX, multi-channel

## Goals

**Business goal:** Win the next 10 paying customers across licensed Philippine collection agencies and bank / BPO collections arms, starting with the Tier-1 ICP.

**Conversion action:** Book a demo (or "see the Mobile Field App live"). CTA on every surface.

**Current metrics:** (TBD — set up analytics on the public surface when it exists)

## Changelog
*Newest first. One line per revision: what changed and why.*
- v1 (2026-10-06) — Initial context, derived from `BITS_CRM_UseCases_v2.0.xlsx` (Operations 360 product spec). Auto-drafted from the v2.0 use-case workbook pending sales / product team review.