# BITS OMS — Feature Overview

**OMS = Operations Management System**: an omnichannel collections CRM with a built-in dialer, QA,
training and workforce management, all in one web app for the staff of a collections agency.

Written against `main` @ `5dc144b`. Items marked **New** arrived in the latest pull.
For step-by-step use, open **Help Guide** inside the app (or the User Manual `.docx`).

---

## Who uses it

| Role | What they do in OMS |
|---|---|
| **Agent** | Works a worklist of accounts, calls/messages debtors, logs outcomes, promises and payments |
| **Supervisor** | Watches their team live, listens in on calls, coaches, assigns training |
| **Manager** | Runs clients and campaigns, targets, imports, reports |
| **QA** | Scores recorded calls against a checklist |
| **Admin** | Users, settings, system health |
| **Vendor** | Licenses the install: modules, seat limits, feature switches |

Each person only sees the accounts, teams and clients they are allowed to see.

---

## 1. Collections work (the core)

- **Accounts and debtors**: every debt account with balance, days past due, client, product, contacts and full history.
  **New:** compact account header and a resizable workspace; phone numbers collected by agents are kept apart from the client's original endorsement.
- **Account Lookup**: fast search across the whole portfolio from the top bar.
- **Worklists**: each agent gets an ordered queue of accounts; admins set the order. Closed accounts drop off automatically.
- **Log Activity**: pick Contact Disposition, then a matching **Contact Result** (**New:** dependent lists), and enter the promise-to-pay amount and date right there.
- **Promises to pay (PTP) and payments**: PTP reminders, hold periods, and a kept-promise check worked out from real payments.
- **Account Status and Closure Reason** (**New**): defined in settings, not hard-coded. Mass update by conditions. A status can block calling ("Allow calls / dialer?"), and the dialer respects it.
- **Imports** (**New:** run in the background): endorsement and payment files upload and process on the queue, so a big file no longer freezes everyone's screen. Duplicate payments are skipped. You get a notification when the import finishes.
- **Skip trace and field visit worklists**, **debtor cross-reference**, **strategy rules**, **archive / purge log**.

## 2. Calling

- **Browser softphone**: agents call from the account page. No desk phone needed.
- **Dialer modes**: Manual, Preview, Progressive, and **Predictive** (the system dials ahead and hands answered calls to free agents).
  **New:** faster screen-pop (~0.5 s), no redialing of calls that already connected, and more accurate call states (ringing vs connecting; silent numbers dropped).
- **Inbound calls** (**New**): debtors who call back hear a greeting and hold music while all available agents ring. Office hours, closed days, holidays and seasonal greetings are set on the **Inbound Call Hours** screen. The caller is identified and matched to an account, and every inbound call is recorded.
  *Not included:* a "press 1 for…" menu, uploading your own recordings from the screen, skill-based routing.
- **Call recordings**: every call, linked to the account, playable from the CRM.
- **Live Calls monitor**: see who is on a call right now, then **Listen**, **Whisper** (talk to the agent only) or **Barge** (join the call).
  **New:** mobile card layout; shows who is calling on inbound calls. *(Takeover is deliberately disabled.)*
- **Softphone diagnostics** (**New**): a "Test ringing sound" button and an audio-device report, to tell a headset problem from a call problem.

## 3. Messaging

- Email, SMS, WhatsApp and Viber through pluggable providers (plus SMS over the office's own GoIP gateway).
- Message templates, **bulk message blasts** with logs, payment-link providers, and campaign welcome messages.

## 4. Quality Assurance

- QA scoring criteria, evaluations of recorded calls, audit segments and a personal audit worklist.
- **QA Outlier Agent Finder** (**New:** ranks agents by weighted score) to spot who needs attention.

## 5. Performance management (**New**)

- **Monthly Performance Scorecard** for every agent: each KPI against its target, with an **Overall Score (0–100)** built from weighted KPIs.
  Default KPIs: Collection Amount Achievement, Kept PTP Rate, PTP Conversion Rate, Right-Party Contact Rate, QA & Compliance. Every KPI, weight and target can be changed.
- **Team Scorecard** (coaches) and **My Scorecard** (agents).
- **Coaching logs**: written from the scorecard, can reference a recording or account, **signed by the agent** (agree/disagree), with a follow-up review.
- **Scorecard Setup**, **Coaching Form Setup** and a **Scorecard Change Log** (who changed what).

## 6. Learning and training (**New**)

- **Courses**: lessons (reading, video, file, quiz), pass marks, and quizzes marked on the server so answers never reach the browser.
- **Assignments** with due dates, **My Training** for agents, **Training Progress** for coaches, automatic reminders and **repeating refreshers** (e.g. every 6 months).
- **Training Mode**: practise on the real screens with **dummy accounts** on a separate "Training Floor". Practice numbers ring an echo line or a trainer's extension, **never a real person**. Practice calls are recorded, scored and coached like real ones, but never mix with real accounts, reports or KPIs. Practice recordings auto-delete after 30 days (configurable). Admin can clear all practice data without touching real data.

## 7. Workforce and team

- **Aux codes / agent status** (**New**): Ready, breaks, restroom and so on, each with time limits, an amber warning, then a red over-limit alert. Includes daily allowances, a full **Agent Status Log**, and call rules tied to status.
- **My Team** roster with live status, **Agent Productivity Log**, **Call Status Log**, **User Login Logs**.
- **Team Chat**, **Support Tickets**.
- **Announcement banner and board** (**New**): a scrolling message in the top bar, with pictures/GIFs, seasonal looks and several motion styles.

## 8. Reports and analytics

- **Analytics dashboard**: collections over time, recovery rate, aging buckets, PTP outcomes, status breakdown, agent leaderboard, QA score by agent, dialer and predictive stats, custom reports.
- **All Reports** hub, Collections Activity Report, portfolio breakdowns (by client, city, employer, product, DPD bucket), KPI metric definitions, exports.

## 9. Help, access and devices

- **Help Guide** (**New**): the whole user manual is searchable inside the app, one article per section, filtered to your role and the features switched on.
- **Installable app (PWA)** (**New**): add OMS to the home screen on iOS/Android or install it on desktop. Remote users get a trusted HTTPS address over Tailscale. *(Push notifications are a later phase.)*
- **Mobile-friendly screens** (**New**) across the custom pages.
- **Adjustable sidebar** (**New**: drag to resize), worklist progress and login timer in the sidebar, text size and time-zone preferences.
- One session per user, idle time-out. ~~Two-factor sign-in~~ — **not implemented**: there is no TOTP/MFA in this build; `requireCrmUser()` checks that a Supabase session exists and nothing more (SYSTEM_AUDIT.md §17.2, §22, §29).

## 10. Administration and vendor control

- **App Settings**, users, communication channels, softphone providers, dialer campaigns, clients and service lines.
- **System Health** (**New**, admin): a daily 04:00 check of database, migrations, Redis, queue, background services, disk, error volume, recordings ingest, and R740 storage. It keeps 14 days of history, has a **Run Now** button, and can email an alert. *Limit:* it runs inside the app, so it cannot report a total outage where the app itself is down.
- **Vendor licensing**: editions and modules (Messaging, QA, Dialer).
  **New:** **seat limits** (total and per role; nobody already active is switched off), plus on/off switches for Analytics, Field Visit, Skip Trace, Team Chat, Announcements, and Agent Status/Breaks. Learning, Performance and Training Mode can also be switched off per install.

---

## Not in OMS (today)

- No debtor self-service portal (staff-only app).
- No push notifications yet (PWA phase 2).
- No IVR "press 1" menu or skill routing for inbound calls.
- Live-call **Takeover** is disabled; Listen, Whisper and Barge work.
- Predictive dialing is not set up for the Training Floor.

---

*Where it runs:* on-prem. The CRM, database and phone system are on the R430. The R740 is being repurposed as storage.
See [`LIVE_PRODUCTION_SAFETY.md`](LIVE_PRODUCTION_SAFETY.md) before touching any server. This is a **live** system with real debtor data.
