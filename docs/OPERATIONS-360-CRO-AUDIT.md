# Operations 360 — Full CRO Marketing Audit

> Workspace: `C:\Users\jcuad\OneDrive\Documents\BITS`
> Source: `BITS_CRM_UseCases_v2.0.xlsx` (15 sheets, 159 master use cases, 6 roles, 13 system automations, v2.0 = 80 new use cases since v1.0)
> Generated: 2026-10-06
> Frameworks applied: `product-marketing`, `cro`, `competitors`, `ad-creative`, `video`, `copywriting`

---

## 0. TL;DR — The Bottom Line

**Operations 360** is a serious, deeply-engineered Philippine-market **debt collections CRM** built by Boundless IT Solutions. v2.0 ships **80 new use cases** and now covers the full collections operation — desk, dialer, mobile, QA — including a mobile app with **GPS-tagged field-visit logging**.

**But.** Right now there is **no marketing surface to audit.** No public site copy, no landing page, no ad creative, no pricing on the wire. The product is in spec/PRD state. So this audit is split into two phases:

- **Phase A — Product Audit (ready now):** Decoded positioning, ICP, competitive analysis, ad/marketing concepts, and ready-to-run H3 video prompts for the Field Agent App differentiator. All derived from the v2.0 spec.
- **Phase B — Surface Audit (when we have copy):** Apply the CRO framework to your actual landing page / pricing / demo flow the moment it exists.

**Top 3 findings:**

1. **The Field Agent App is the differentiator — and almost nobody outside Operations 360 has it done right.** Most Philippine debt-collection CRMs (and most "field collections" tools globally) treat the mobile app as an afterthought or as a separate bolt-on. Ops 360 bakes it into the same data model, the same disposition locks, the same audit log. **This is the campaign hook.** Period.
2. **The product is regulator-aware in a way competitors are not.** Quiet Hours, mandatory-notation, cease-and-desist enforcement per channel, abandon-rate tracking on predictive dialing, immutable Purge Log, fail-closed license gating (SYS-19), per-debtor daily cap on message blasts. **For Philippine banks and licensed collection agencies this is the trust signal that wins the deal.**
3. **The product is a six-actor operation, not a one-tool sale.** Selling Ops 360 is selling into Admin + Manager + Supervisor + Agent + QA + Vendor workflows. **One ad cannot do that.** We need ICP-segmented creative plus one Flagship Ad that explains the system in 15 seconds.

**Recommended next 3 moves:**

1. Lock the ICP ladder and the positioning pillars (already drafted below).
2. Author the **Field Agent App 15-second Flagship H3 video ad** — this is the single creative that wins the campaign.
3. Get a public URL or landing-page draft so we can run the actual CRO audit on real surface.

---

## 1. Product Decoded — Operations 360

### 1.1 What it actually is

- **Category:** Debt-collections CRM (vertical SaaS, regulated industry)
- **Built for:** Philippine market — Philippine timezone (NV-04), Globe/Smart/DITO carrier detection (NS-03), `+63` international format normalisation, locally-tuned communication channels
- **Vendor:** Boundless IT Solutions
- **Workspace naming:** formerly "BITS CRM" / "BITS Debt Collections CRM"; **renamed to Operations 360**
- **Edition / module packaging** (VN-05): five presets — **Desk, Reach, Reach QA, Floor, Voice** — with optional toggling of Messaging, QA, and Dialer modules

### 1.2 Six roles

| Role | Job-to-be-done |
|---|---|
| **Admin** | Own the system: configure everything, manage users/clients, run bulk ops, hold the audit log |
| **Manager** | Run one or more campaigns: campaign-scoped workflow, reassign accounts, cross-agent reports |
| **Supervisor** | Run a team within a campaign: same daily authority, narrower scope |
| **Agent** | The collector — **only role with the mobile app and the auto-dialer** |
| **QA** | Score calls and accounts, audit the work, never collect themselves |
| **Vendor** | Boundless IT Solutions' own staff — license edition, modules, support tickets (provisioned only from server CLI) |

### 1.3 Surface modules (33)

```
Debt Accounts · Debtors · Clients · Users · Design Account Layout · Strategy Rules
Workflow Settings · Payments & Reports · Call Logs & Dialer · Audit Logs
Import Mapping Templates · Configuration · Dashboard & Reporting · Analytics Widgets
Mobile Field App · Navigation & Shell · Softphone · Dialer Campaigns · Live Calls
Call Recordings · Call Reports · Inbound Calls · Quality Assurance · Skip Trace
Field Visit · Messaging · Number Scrubbing · Team Chat · Help & Support
Vendor & Licensing · Payment Link Providers
```

### 1.4 What's in v2.0 (the launch delta)

- **Softphone (SP-01 → SP-05)** — WebRTC widget with Hold/Mute/Keypad/Blind+Attended Transfer, Predictive dialer control
- **Three dialer modes (DC-01/DC-02)** — Preview, Progressive, Predictive (admin-only) with abandon-rate tracking
- **Live Calls (LC-01 → LC-05)** — Listen / Whisper / Barge / End Monitoring (Take Over deliberately not implemented)
- **Call Recordings (CR-01 → CR-04)** — auto-record every call, GoIP trunk mapping for 16 SIM slots
- **Inbound (IB-01 → IB-05)** — office hours, seasonal greetings, agent-by-agent inbound switch, hold music
- **Skip Trace + Field Visit (ST-01/02, FV-01/02)** — segmented worklists with claim/log workflow
- **Multi-channel Messaging (MS-01 → MS-07)** — SMS/Email/WhatsApp/Viber/webchat, templates, blasts, scheduled blasts, quiet hours, contact limits
- **Number Scrubbing (NS-01 → NS-03)** — automated inactive flagging, Globe/Smart/DITO labelling, carrier lookup
- **Quality Assurance (QA-01 → QA-07)** — weighted criteria, scorecards, audit segments, outlier-agent ranking
- **Team Chat (TC-01 → TC-04)** — standing team room, ad-hoc room, observer read-only, team roster
- **Help & Support (HS-01 → HS-04)** — in-app help articles, ticket filing, vendor notification
- **Vendor & Licensing (VN-01 → VN-05)** — software pack editions, deployment metadata, vendor diagnostics
- **Mobile Field App (MB-01 → MB-05)** — token login, scoped queue, detail + activities, GPS-tagged field-visit log, server-side 403 enforcement
- **Plus 13 system-triggered use cases** (SYS-01 → SYS-19) — auto-close, one-active-session, access-time tracking, dial-outcome disposition, scrubbing streak, inactivity logout, phone-system sync, scheduled blasts, inbound routing, predictive dialer, debtor match groups, fail-closed license gate

### 1.5 The differentiator — **Mobile Field App (MB-01 → MB-05)**

This is what your CEO flagged and what we'll market first.

| Capability | What it does |
|---|---|
| **Phone-based access** | Token login from any Android/iOS device — the agent's phone, not a laptop |
| **Self-scoped visibility** | Agents only see accounts they're personally assigned. Returns 403 (server-side, not just hidden) if the agent tries to access someone else's account |
| **Account list + detail** | Paginated assigned-accounts list; tap an account to see full detail + last 10 activities |
| **GPS-tagged field-visit logging (MB-04)** | Log a field visit with disposition, PTP fields, **GPS coordinates**, and an **optional photo** — same disposition/PTP-lock rules as the desktop |
| **Realtime disposition lookup (MB-05)** | Mobile returns the valid disposition codes for that account, narrowed to PTP-locked codes if status = PTP |

**Why this matters competitively:**

- Most Philippine debt-collection CRMs (the typical buyer is a bank, a credit-card issuer, a licensed collection agency, or a BPO running collections) have a desktop product with **no real mobile field app** — field agents carry laptops, paper, or an unsupported secondary app
- Most "mobile" field-collection apps on the global market are **bolt-ons** — they don't share the disposition-lock state machine, the audit log, the role-based scoping
- **GPS coordinates on every field-visit activity** turns field work from "claimed I went" into "I was here at 14:32:08" — this is the audit trail regulators actually want
- **Server-side 403** (not client-side hiding) means field agents can't see each other's accounts even if they poke the API directly — this is what your licence / compliance team will love

---

## 2. Positioning (current vs. recommended)

### 2.1 Current positioning (as inferred)

There is no public-facing positioning copy in the file. Internally, the product is described as **"BITS Debt Collections CRM"**. The filename is `BITS_CRM_UseCases_v2.0.xlsx`. So today's positioning (if any) is:

> "A debt collections CRM by Boundless IT Solutions."

That sentence is a category, not a position. It loses to any competitor that has any left-of-comma positioning.

### 2.2 Recommended positioning — three contenders

Pick based on what the buyer in your first 100 deals looks like.

| Angle | Tagline | Why it works |
|---|---|---|
| **A. Field-first** *(recommended for first campaign)* | "**Operations 360 — the collections CRM that follows your agents out the door.**" | Speaks to the differentiator (mobile + GPS) in the buyer's real pain (no visibility into field agents) |
| **B. Regulator-ready** | "**Operations 360 — built for the audit list regulators actually want to see.**" | Speaks to banks, licensed agencies, BPOs — the buyers who lose deals to compliance review |
| **C. All-in-one pipeline** | "**Operations 360 — desk, dialer, mobile, QA. One platform. Six roles. Zero glue.**" | Speaks to multi-tool replace deals ("we currently use CSV/X, but the data doesn't sync with our dialer…") |

**My recommendation:** Ship the **Field-first** angle first. It is the most concrete, the most demo-able, and the differentiator that is hardest for competitors to fake. Keep the other two for retargeting audiences and case-study marketing.

### 2.3 Three positioning pillars (the rest of the marketing derives from these)

1. **Your field agents are no longer invisible.** Every field visit is GPS-tagged, photo-attached, and locked into the same disposition workflow your desk agents use.
2. **Regulator-defensible by default.** Quiet hours, cease-and-desist per channel, abandon-rate reporting, immutable audit trail, fail-closed licence gating.
3. **One platform for the whole collections operation.** Desk, dialer (Preview/Progressive/Predictive), mobile, QA, skip trace, field visit, messaging, scrubbing, chat, support — six roles, one data model, one audit log.

---

## 3. ICP & Personas (B2B, six-actor sale)

### 3.1 Primary ICP ladder

| Tier | Persona | Deal angle |
|---|---|---|
| **1 — Primary** | Licensed Philippine collection agencies, banks' in-house collections, BPO collections arms | Replace a stack (CRM + separate dialer + paper field logs + WhatsApp + spreadsheet QA) with one system; field-visibility win |
| **2 — Secondary** | Credit-card issuers, microfinance / lending ops, telco collections | Regulator-defensibility + multi-channel (incl. SMS/Viber/WhatsApp) win |
| **3 — Tertiary** | International collections outsourcers running a Manila delivery centre | All-in-one pipeline + audit trail + Philippine-specific carrier detection win |
| **4 — Long tail** | Skip-trace and field-visit-only specialists, recovery agents, legal collections | Field Agent App + GPS + photo evidence win (they care about the rest less) |

### 3.2 Buying committee Personas — six stakeholders, six messages

| Persona | Cares about | Our promise | Where they feel it |
|---|---|---|---|
| **CFO / VP Finance** (financial buyer) | CAC, ROI, time-to-value, audit findings | Replace 3–5 separate tools; pass the next BSP audit without re-engineering | TCO deck + audit sample claim |
| **Head of Collections** (champion + user) | Recoveries %, PTP kept %, agent utilisation, regulator findings | One pipeline from skip trace to PTP-kept; field agent recoveries now show in the same report | Recovery-rate demo + mobile demo |
| **Compliance Officer** (technical influencer) | Cease-and-desist, DNC, abandon-rate, immutable audit | Regulator-defensible by default; immutable Purge Log; per-channel compliance | Compliance one-pager + audit-log demo |
| **IT Lead** (technical buyer) | WebRTC softphone, telephony provider, GoIP, deployment | WebRTC + multi-provider PBX + Asterisk WebSocket + 16-SIM GoIP out of the box | Architecture one-pager + tech FAQ |
| **Field Supervisor / Manager** (tertiary user) | Field-agent utilisation, GPS verification, photo proof of visit | Every visit is auditable, every photo shown, every GPS tick timestamped | Field agent live-tracker demo |
| **Agent** (primary user) | Less typing, no laptop, same workflow | Phone-based field logging with photo, GPS, and the same disposition shortcuts they use at their desk | Mobile app demo |

> **Why six matters:** The single biggest failure mode in selling a vertical SaaS like this is letting the Head of Collections champion the deal while the Compliance Officer vetoes it in week 6. **Plan messaging for each of these six from day one.**

### 3.3 JTBD — Jobs customers "hire" us for

1. "Help my agents collect more by working from anywhere — without losing visibility."
2. "Help me pass my next BSP / BSP-equivalent audit without re-engineering the platform."
3. "Help me replace five tools with one without breaking my dialer."

---

## 4. Competitive Landscape

> This is a directional read, not a deep competitor profile. Run the `competitor-profiling` skill on each before writing comparison pages.

### 4.1 Direct competitors (debt-collection CRMs, Philippine market)

| Competitor | Where they win | Where they fall short vs. Ops 360 |
|---|---|---|
| **FICO Debt Manager** | Bank-grade, global | Heavy, slow to change, no native mobile field app; not Philippine-specific (timezone, carriers) |
| **Experian / Hunter & Strategic** | Credit-bureau angle | Not a CRM; they license data |
| **Temenos / Eximbills** | Tier-1 bank core | Same as FICO — not field-first |
| **Philippine BPO-built internal CRMs** | Cheap, custom | Lack regulator-grade audit, no field app |

### 4.2 Secondary competitors (different shape, same problem)

- **Generic CRMs with manual collections workflows** (Salesforce, HubSpot, Zoho): sold as "configure it yourself"; lack predictive dialer, WebRTC softphone, GPS field logging
- **Generic dialer products** (Five9, Genesys, inContact): strong dialer, weak collections workflow; no field app
- **Generic field-service apps** (ServiceTitan, Jobber, ServiceNow FSM): strong field, weak debt-collection compliance (no cease-and-desist, no PTP/Kept/Short/Broken logic, no abandon-rate)

### 4.3 Indirect competitors (the way it used to be done)

- Paper field logs + spreadsheet reconciliations + Excel queue manager + a separate predictive dialer + a separate chat tool + manual audit prep

### 4.4 Where Ops 360 wins against each tier

- **vs. global debt-collection CRMs:** Philippine-specific (timezone, carrier detection, multi-channel incl. Viber/WhatsApp), **Mobile Field App** included
- **vs. generic CRMs:** purpose-built collections (disposition state machine, PTP hold, scrub streak, abandon-rate), built-in WebRTC softphone, built-in dialer
- **vs. generic dialers:** regulator-aware (abandon-rate cap, agent one-by-one, ring limits), disposition-aware, audit-aware
- **vs. generic field apps:** same data model + same disposition locks + same audit log + GPS coordinates on every field-visit activity
- **vs. paper/spreadsheet:** whole game, no contest

---

## 5. Differentiation — written to the brief

### 5.1 Hard differentiators

1. **Mobile Field App with GPS-tagged field-visit logging.** Most Philippine debt-collection CRMs have no real mobile app. Most global field apps are bolt-ons.
3. **All roles in one data model.** Six roles, 33 modules, one audit log. No "the field app uses a separate database that syncs nightly."
5. **Regulator-defensible by default.** Quiet hours, per-channel C&D enforcement, immutable Purge Log, fail-closed licence gate.
7. **Philippine-specific.** Philippine timezone, Globe/Smart/DITO labelling, multi-PBX support (3CX, Zoiper, Asterisk WebSocket).
9. **WebRTC softphone built-in.** No separate dialer to license.
11. **Predictive dialer with abandon-rate reporting.** Regulator-aware dialing in a category where most "predictive" is just aggressive parallel sequencing.

### 5.2 Soft differentiators (worth saying, but verify before claiming in ads)

- **Five software-pack editions** (Desk, Reach, Reach QA, Floor, Voice) — modular pricing that fits both small licensed agencies and bank-floor stack
- **One-active-session enforcement** — prevents two simultaneous softphone registrations under one extension (SYS-05)
- **Per-campaign auto-close override** — global default + per-campaign override on account auto-close
- **Per-client PTP hold period** — different grace days per creditor
- **Carrier lookup cost gating** — number scrubbing never wastes money on inconclusive results
- **Mandatory-notation toggle** — agent cannot page to "Next" until an activity is logged

### 5.3 What to **NOT** claim

- **AI-write claims** until we have the actual model + evidence
- **"All-in-one platform"** until we've shipped the Vendor & Licensing and the Payment Link Provider stubs (PL-01 is explicitly dormant — do not advertise)
- **Speed-of-light conversion numbers** until we have actual recovery data
- **Any specific customer logo or testimonial** that hasn't been authorised by the customer

---

## 6. CRO Audit — Surface State

**As of right now there is no public surface to audit.** The product is in PRD/PRD state — `BITS_CRM_UseCases_v2.0.xlsx`. The work below sets up the audit to run the moment a landing page or pricing page exists.

### 6.1 When the surface lands, audit in this order

1. **Value proposition clarity** — does the first frame answer "what is it, why should I care"?
2. **Headline effectiveness** — outcome-focused, specific, matches traffic source?
4. **CTA hierarchy** — one clear primary action, repeated at decision moments
5. **Visual hierarchy** — scannable in 5 seconds
6. **Trust signals** — placed near the decision lines
7. **Objection handling** — compliance, integration, downtime
9. **Friction points** — form fields, mobile, page speed

### 6.2 CRO test cases to design upfront (so we can test on day 1 of the surface)

- **Test 1 — Hero headline.** "Operations 360 — the collections CRM that follows your agents out the door." vs. "Built for the audit list regulators actually want to see." (Field-first vs. regulator-first)
- **Test 2 — Primary CTA.** "Book a Demo" vs. "See the Mobile Field App Live" vs. "See Operations 360 on Your Portfolio"
- **Test 3 — Hero visual.** Field agent on phone with photo+GPS coordinates vs. audit-log screenshot vs. operations command-center
- **Test 4 — Social proof placement.** Logos above the fold vs. after the first benefit block vs. in a sticky sidebar
- **Test 5 — Demo request form.** 5-field vs. 7-field vs. progressive multi-step

### 6.3 Quick wins (apply on day one of surface launch)

- Replace "BITS Debt Collections CRM" with **"Operations 360"** everywhere — internal naming has already moved
- Make the **Field Agent App** the hero shot — it is the only one most reviewers can reproduce in 30 seconds of demo
- Pricing page should default-recommend the right edition by ICP segment (Desk for small agencies, Reach QA for licensed ops with QA, Floor for BPO banks, Voice for outbound-heavy)

---

## 7. Top Ad Concepts — ready to author

### 7.1 The Flagship — "Field Agent App" 15s hero ad

**Audience:** Head of Collections + Field Supervisor
**Format:** 16:9 hero film, 15s, sound-on
**Mode:** T2VA (text-to-video) for H3
**Hook (0–2s):** A field agent's phone shows an Operations 360 push notification — "12 visits logged today. 7 GPS-tagged. 3 photos."
**Body (2–12s):** A wide shot of a field agent with phone in hand, walking up to a Manila apartment door. Cut to the operations command center where the live dashboard shows the agent's location pin blinking on a map. Each visit lights up a coloured pin. The dashboard shows today's recoveries next to the eye-watering baseline.
**Close (12–15s):** Black card with single line: "**Operations 360 — every visit, GPS-tagged. Every visit, audited.**"

### 7.2 The Regulator — 13s hook ad

**Audience:** Compliance Officer + CFO
**Format:** 9:16 vertical, 13s
**Hook (0–2s):** "Will your next BSP audit find a discrepancy?"
**Body (2–10s):** Two columns side by side. Left: "Yesterday's CRM" — paper forms, spreadsheet reconciliations, missing GPS times, paste bins. Right: "Operations 360" — immutable Purge Log, per-channel C&D enforcement, abandon-rate, GPS-tagged visits.
**Close (10–13s):** "Built for the audit list regulators actually want to see. Operations 360."

### 7.3 The Replace-Ad — 10s product film

**Audience:** IT Lead + Head of Collections (multi-tool replace deals)
**Format:** 1:1 square, 10s
**Hook (0–2s):** A floor of cubicles, each with a different tool — Excel, paper, separate dialer, separate chat
**Body (2–8s):** Camera pulls back. The same floor collapses into one screen — Operations 360
**Close (8–10s):** "Six roles. One platform. Zero glue."

### 7.4 The "Twelve references" parallel

(we have 12 reference files in H3 — make this the creative kit the device shows off: product photo, dashboard, mobile screen, audit log, map view, etc.)

---

## 8. H3 Video Ad Prompts — ready to paste into the API

These are written in H3's T2VA prompt grammar (the format our `h3-prompt-writing` skill produces). Drop straight into the H3 API or the Hailuo AI app.

### 8.1 Flagship — "Every visit, GPS-tagged" (15s, 16:9)

```text
integrated_multimodal_description:
[Shot 1] Live-action, cinematic, 16:9, a medium close-up of a young female field agent in a plain black polo with a small Operations 360 chest logo, standing in the doorway of a Manila apartment block. Soft late-morning light from the right of the frame. The button on the elevator panel is half-lit as the elevator descends. She lifts her phone to check the screen. The phone displays the Operations 360 mobile field-app account list — clean white card UI with three rows, the top row in soft teal. The camera pushes in with small amplitude at slow speed toward the phone screen. The calm, focused female voice with a clear Manila accent (S1) says softly, <d>[English] Twelve visits today. Seven GPS-tagged.</d>

[Shot 2] At 00:04.500, the camera cuts to a wide shot of an operations command centre — a long wall screen showing a real-time map of Metro Manila with coloured visit pins. A male supervisor in a dark-blue button-down (S2) walks along the wall, nodding. The screen updates live as new pins appear. The calm, decisive male voice (S2) says, <d>[English] Every visit, audited.</d> The camera trucks left with medium amplitude at slow speed, revealing three more agent pin updates. The female agent from Shot 1 (S1) continues her thought without moving her lips, in an off-screen voiceover, <d>[English] Every visit, GPS-tagged.</d>

[Shot 3] At 00:11.500, the camera cuts to a slow push-in on the Operations 360 logo card on a clean off-white background. The logo is a small navy wordmark. Below the logo, the single line copy fades in subtly first in soft dark gray: "Every visit, GPS-tagged." The second half fades in subtly a moment later in teal: "Every visit, audited." The two halves sit on the same single line. The camera holds a static shot on this card.

overall_soundscape:
A quiet urban corridor ambient tone carries the first shot, with the soft click of an elevator button and the distant whoosh of a city street. The second shot carries a low room-ambient hum of the operations centre, with the faint keyboard taps of the supervisor and the soft electronic chirp of the map updating. The final logo card is silent.

non_diegetic_music:
A restrained tech-strings pattern at a slow tempo, joined by a single soft piano note that lands on every pin update, fading gently into silence at the logo card.
```

### 8.2 Regulator — "Built for the audit list regulators actually want to see" (13s, 9:16)

```text
integrated_multimodal_description:
[Shot 1] Live-action, cinematic, 9:16. A close-up of a Manila regulator's leather folder opening to a compliance checklist with red-marked items. A serious, experienced male voice with a steady Manila cadence (S1) says in an off-screen voiceover, <d>[English] Will your next BSP audit find a discrepancy?</d> while his lips remain completely closed. The camera holds a static shot on the checklist, then pans down with small amplitude at slow speed to reveal more red marks. The mood is sober, not anxious.

[Shot 2] At 00:04.000, the camera cuts to a slow push-in on a dark-mode Operations 360 screen — the immutable Purge Log view with rows that show timestamp, operator, action, count. The same male voice (S1) continues in an off-screen voiceover, <d>[English] Built for the audit list regulators actually want to see.</d> The camera pushes in with small amplitude at slow speed. The screen is cool-blue and clean.

[Shot 3] At 00:09.500, the camera cuts to a split composition — left half: a paper field-log with a missing GPS field, a smudge on the signature line, an unfilled time column. Right half: the Operations 360 mobile-app field-visit log with GPS coordinates stamped on each row and a thumbnail photo at the end of each row. The male voice (S1) repeats in an off-screen voiceover, <d>[English] Every visit, audited.</d> The camera holds a static shot on the split, holding the tension.

overall_soundscape:
A low paper-rustle and folder-leather creak open the first shot, replaced by a quiet room tone and the soft electronic tick of a screen scroll in the second shot, with a faint distant office ambience carrying the third shot.

non_diegetic_music:
A solo cello at a slow tempo with sustained low strings, holding steady through the first two shots, then a single low piano note at the start of the third shot.
```

### 8.3 Replace — "Six roles. One platform. Zero glue." (10s, 1:1)

```text
integrated_multimodal_description:
[Shot 1] Live-action, cinematic, 1:1. A top-down shot of a Manila call-centre floor with eight cubicles in a 4x2 arrangement. The first four cubicles each have a different tool on the desk: a paper notebook, a spreadsheet, a separate dialer window, a chat app. The camera dollies up with medium amplitude at slow speed to reveal more cubicles, each with their own isolated tool. A calm, focused male voice with a Manila cadence (S1) says in an off-screen voiceover, <d>[English] Six roles. Six tools.</d> while his lips remain completely closed. The shot is brightly lit, slightly desaturated.

[Shot 2] At 00:05.000, the camera cuts to a single Operations 360 screen on a clean desk, with the same six-role UI (admin, manager, supervisor, agent, QA, vendor) all visible as tiles. The same male voice (S1) continues in an off-screen voiceover, <d>[English] One platform. Zero glue.</d> The camera pushes in with small amplitude at slow speed. The mood shifts from busy to clean.

[Shot 3] At 00:08.000, the camera cuts to the Operations 360 logo card on a clean off-white background. The first half of the single-line copy fades in subtly first in soft dark gray: "Six roles. One platform." The second half fades in subtly a moment later in teal: "Zero glue." Both halves sit on the same single line. The camera holds a static shot on this card.

overall_soundscape:
A faint ambient hum of an open call-centre floor carries the first shot, with overlapping distant phone chatter and keyboard taps. The third shot is silent.

non_diegetic_music:
A simple plucked acoustic-guitar pattern at a moderate tempo in the first shot, replaced by a single soft sustained piano note in the second shot, holding into silence.
```

---

## 9. Objections & Risk

### 9.1 Top 3 objections (and the answer)

| Objection | Response | Where to address |
|---|---|---|
| **"We already have a CRM and a separate dialer. Why replace?"** | Replace 3–5 tools with one. Same data model across desk, dialer, mobile, QA. One audit log. Lower TCO. | Replace-Ad creative + IT Lead one-pager |
| **"Will it pass the next BSP / BSP-equivalent audit?"** | Regulator-defensible by default: quiet hours, C&D enforcement, immutable Purge Log, abandon-rate, GPS-tagged field visits. | Compliance Officer one-pager + Regulator creative |
| **"How do I know my field agents will actually use the app?"** | Server-side enforcement: agents can only see their own accounts, can only log their own visits, can't bypass the disposition workflow. | Field Supervisor one-pager + Field Agent App demo |

### 9.2 Anti-personas (who we will lose, and that's fine)

- One-tool-only buyers looking for a pure dialer or a pure CRM
- Buyers in jurisdictions we don't support (carrier detection is PH-only)
- Buyers who need non-regulated collections with no audit trail (Ops 360's strength is regulator-grade audit, which is wasted on grey-market use)
- Buyers who want fully SaaS no-deployment, when they need on-prem / hybrid (Ops 360 ships all three: cloud, on-prem, hybrid — VN-04)

### 9.3 Risk in the marketing itself

- Do not advertise the **Payment Link Provider** (PL-01 is explicitly dormant — "no payment link can be generated or sent anywhere in BITS today")
- Do not claim **AI features** until we ship the model + claim the evidence
- Do not publish customer logos without written authorisation
- Do not promise "regulator audit success" — we can say "regulator-defensible by default" and back it with the actual feature list

---

## 10. Open Questions for the CEO / product team

1. **Brand name on the wire** — Is it "Operations 360" everywhere, or "Operations 360 by Boundless IT Solutions"? (The spec file uses both — we need one to land on the public surface.)
2. **ICP priority** — Tier 1 is licensed agencies + in-house bank collections. Tier 2 is card issuers + microfinance. Which gets the first 100 deals?
3. **Pricing page** — five presets (Desk, Reach, Reach QA, Floor, Voice) — is this published, or behind a sales wall?
4. **Demo / contact flow** — is it "Book a Demo" or "See the Mobile Field App Live"? (Recommendation: have a second CTA for the mobile app specifically.)
5. **Compliance claims** — do we have written sign-off on the regulator-grade claims from a Compliance Officer or auditor?
6. **Customer logos** — even one named customer case study would unblock the Phase B audit. Even a non-public "withheld name" testimonial is better than nothing.
7. **Field Agent App platform** — is it native iOS, native Android, or both? (Spec is platform-neutral.)
8. **Telephony provider mix** — what is the typical BITS deployment? Asterisk WebSocket, 3CX, Zoiper, GoIP trunk?

---

## 11. Next Steps (this week)

- [ ] Confirm field surfaces 1–4 in writing — *owner: CEO*
- [ ] Lock the three positioning contenders (Field-first recommended) — *owner: marketing*
- [ ] Ship the Field Agent App 15s Flagship H3 prompt (8.1 above) into the H3 API and produce a 2K render — *owner: marketing*
- [ ] Author the Field Agent App one-pager (CRO first version) — *owner: marketing*
- [ ] Author the Regulator one-pager (CRO first version) — *owner: marketing*
- [ ] Confirm at least one named (or anonymised) customer reference — *owner: sales*
- [ ] Run `competitor-profiling` skill on the top three direct competitors — *owner: marketing*
- [ ] As soon as a public surface exists, run `cro` skill against the live page — *owner: marketing*
- [ ] Set up tracking (analytics skill) on the surface and on the ad destinations — *owner: marketing*
- [ ] Set up an A/B test plan (ab-testing skill) for the first 5 hero-headline variants