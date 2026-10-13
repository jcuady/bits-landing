# BITScrm Collections — Enterprise Debt Recovery Platform

Canonical URL: https://www.boundlessits.com/bitscrm  
Markdown Source: https://www.boundlessits.com/bitscrm.md  
Organization: Boundless IT Solutions (BITS)  

---

## Overview

BITScrm is the mission-critical debt recovery platform purpose-built exclusively for collection agencies, debt recovery law firms, consumer lending desks, and recovery BPOs. It is **not** a general sales CRM.

BITScrm unifies delinquent account staging, aging bucket distribution, automated Promise-to-Pay (PTP) scheduling, dynamic work queues, supervisor QA scorecards, and server-side session checks with database row-level security.

---

## Core Operational Pillars

### 1. Portfolio & Queue Intelligence
- Dynamic debtor segmentation by delinquency bucket (1-30, 31-60, 60+ DPD).
- Automated queue assignment based on agent skill and historical recovery success rate.
- Controlled bulk imports with CSV validation and duplicate record reconciliation.

### 2. Dynamic Work Queues & Disposition Logging
- Accounts staged by DPD bucket and routed to agents by strategy, priority, or team.
- Disposition codes with required note fields, so every outcome is structured rather than free-text.
- Payment receipt recording with verification attachments.
- **Roadmap, not shipped:** call recording with automatic encryption and configurable compliance retention. No audio pipeline exists in this build.

### 3. Automated Promise-to-Pay (PTP) Engine
- PTP scheduling with installment calculations, payment method capture, and automated debtor reminders.
- Broken PTP detection: automatically re-queues defaulting accounts to priority queues.
- Real-time payment reconciliation against bank and payment gateway reports.

### 4. Supervisor Quality Assurance & Live HUD
- Supervisor workload and QA visibility: coaching logs, action plans, and aging-bucket dashboards.
- Agent performance metrics: accounts worked, PTP conversion rate, disposition mix.
- Standardized QA scorecards with structured note capture for supervisory evaluation.

---

## Regulatory Compliance & Security

- **BSP Circulars 454 & 857**: Contact-window and daily-attempt rules are **configured per engagement, not shipped as turnkey enforcement**. There is no automated contact-hour subsystem in this build.
- **NPC RA 10173 (Data Privacy Act of 2012)**: Encrypted debtor storage, explicit consent tracking, DSAR compliance.
- **Authentication**: Supabase session required on every CRM route and API endpoint, enforced server-side before the privileged database client is reached. PII responses are `no-store` + `Vary: Cookie`.
- **Access Control**: **not implemented.** The Rep/Manager/Admin role is a client-side display concept only — there is no server-side role check, so any authenticated user can read every lead, contact, company and email log. Do not rely on this platform for role-based isolation of debtor PII.
- **Email Delivery Log**: outbound email delivery is recorded in a mutable `email_logs` table (status, recipient, error). **There is no WORM/immutable audit log**, and no record of who viewed or edited a record.

---

## Deployment Models

1. **Sovereign Cloud**: Dedicated regional cloud VPC, automated multi-AZ replication.
2. **Sovereign On-Premises**: Air-gapped deployment on local servers in your own office rack.
