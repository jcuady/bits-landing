/**
 * Security governance reference data.
 *
 * Shared by the homepage Security section and the dedicated /security page.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * EVERY CONTROL DESCRIBED HERE MUST BE TRUE OF THIS DEPLOYMENT.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * History (2026-10-08, SYSTEM_AUDIT.md §29): this file previously described an
 * access matrix, a compliance control set and a data-handling schedule that
 * the codebase did not implement — per-role boundaries, PII masking, campaign
 * isolation, tamper-evident audit trails, access-logged playback, segregated
 * ledgers, and configuration-change recording. None of it existed.
 *
 * Verified position (scripts/supabase-schema.sql + lib/crm/api-auth.ts):
 *
 *   • The database holds FOUR tables: inbound_leads, marketing_automations,
 *     email_logs, marketing_campaigns.
 *   • Every RLS policy is `using (true)` for the `authenticated` role. There is
 *     no role-scoped policy, so ANY authenticated operator can read every row
 *     in all four tables.
 *   • requireCrmUser() resolves a Supabase session and checks that a user
 *     EXISTS. It never reads a role. Authentication is not authorization.
 *   • There is NO audit-log table, NO append-only store, NO call-recording
 *     store, NO GPS capture, NO ledger, and NO masking routine anywhere in
 *     lib/ (verified by grep: `mask|redact` matches nothing outside these copy
 *     files).
 *
 * Therefore: nothing below may describe per-role enforcement, record
 * isolation, PII masking, or audit logging as a shipped capability. Where a
 * control is genuinely roadmap or engagement-scoped, it says so in the same
 * string the customer reads. Do not reintroduce aspiration as fact — see
 * lib/site/ai-disclosure.selfcheck.mjs, which fails the build on it.
 */

export interface AccessMatrixRow {
  role: string;
  queue: string;
  pii: string;
  supervisorHUD: string;
}

/**
 * TARGET role model for a configured BITS deployment.
 *
 * This is a design blueprint, not a description of this build. The live
 * deployment has exactly one privilege level: authenticated. Renderers MUST
 * present this as a target and MUST NOT badge it "Enforced".
 */
export const accessMatrix: AccessMatrixRow[] = [
  {
    role: "Collection Agent",
    queue: "Target: assigned accounts only",
    pii: "Target: masked phone / SSN",
    supervisorHUD: "Target: none",
  },
  {
    role: "Team Supervisor",
    queue: "Target: campaign team accounts",
    pii: "Target: operational view",
    supervisorHUD: "Target: listen / whisper",
  },
  {
    role: "QA Auditor",
    queue: "Target: evaluation worklist",
    pii: "Target: full, access-logged",
    supervisorHUD: "Target: recorded sessions",
  },
  {
    role: "Operations Manager",
    queue: "Target: all agency campaigns",
    pii: "Target: scoped export",
    supervisorHUD: "Target: full barge HUD",
  },
  {
    role: "System Administrator",
    queue: "Target: infrastructure & configuration",
    pii: "Target: restricted",
    supervisorHUD: "Target: access audit log",
  },
];

export interface ComplianceFramework {
  id: string;
  name: string;
  scope: string;
  /** What we actually build to make it work. No certification is implied. */
  control: string;
}

/**
 * Regulatory alignment.
 *
 * `control` must describe a control that EXISTS in this deployment, or
 * explicitly scope itself to the engagement. A framework name may be used to
 * say "we engineer toward this"; the control string may not imply a capability
 * we have not shipped.
 */
export const complianceFrameworks: ComplianceFramework[] = [
  {
    id: "bsp",
    name: "BSP Circulars 454 & 857",
    scope: "Contact windows and frequency rules",
    control:
      "Contact-window, frequency-capping and do-not-call handling is NOT enforced by this build — it is an engagement-scoped deliverable we configure per deployment, and we will confirm in writing which rules your instance enforces before you rely on them.",
  },
  {
    id: "npc",
    name: "NPC RA 10173 — Data Privacy Act",
    scope: "All personal data processed in the Philippines",
    control:
      "Shipped and verifiable: a terms-and-privacy consent control on every form, a cookie preference banner with recorded choices, a published privacy notice at /legal, a technical-lifespan disclosure at /cookies, and enquiry data processed only for the stated purpose of answering that enquiry.",
  },
  {
    id: "sec",
    name: "SEC MC 18 — Fair Practice",
    scope: "Publicly listed companies and subsidiaries",
    control:
      "Marketing and consent-side controls are shipped (form consent, cookie preferences, unsubscribe governance in outbound email). Call-frequency and cease-and-desist handling is not part of this build.",
  },
  {
    id: "iso",
    name: "ISO/IEC 27001 Aligned Controls",
    scope: "Enterprise information security posture",
    control:
      "Shipped and verifiable: server-side session authentication on every CRM route and API endpoint, Postgres row-level security, no-store caching on personal-data responses, rate limiting and schema validation on public write paths, and hardened response headers. Not shipped: per-role authorization and audit logging.",
  },
];

export interface DataHandlingRow {
  data: string;
  control: string;
}

/**
 * What the deployment actually stores and who can reach it. One row per real
 * table or real secret — not per product line.
 */
export const dataHandling: DataHandlingRow[] = [
  {
    data: "Enquiry and lead records",
    control:
      "Postgres table inbound_leads: the details you type into a form, plus status, assignment and scoring fields. Reachable only behind a verified session, and responses are served no-store so they cannot be replayed from a shared cache.",
  },
  {
    data: "Email send telemetry",
    control:
      "Postgres table email_logs records recipient, sender, subject, template and delivery status for outbound and inbound mail. This application does not store message bodies. Any authenticated operator can read this table.",
  },
  {
    data: "Marketing journeys and campaigns",
    control:
      "Postgres tables marketing_automations and marketing_campaigns hold journey definitions, campaign configuration and send counters. Readable by any authenticated operator; writable only by the server.",
  },
  {
    data: "Credentials",
    control:
      "Authentication is handled by Supabase Auth. Passwords are never received, stored or logged by this application, and no credential data reaches our own database.",
  },
  {
    data: "Server configuration secrets",
    control:
      "The database service-role key and the email provider key are read from server environment variables only. They are never sent to the browser and are excluded from version control.",
  },
  {
    data: "Visitor preference records",
    control:
      "Cookie preference choices are stored in your browser under bits_cookie_consent_v1. That record never leaves your device, which is why we cannot show you a server-side consent log.",
  },
];