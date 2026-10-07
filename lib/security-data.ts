/**
 * Security governance reference data.
 *
 * Shared by the homepage Security section and the dedicated /security page.
 */

export interface AccessMatrixRow {
  role: string;
  queue: string;
  pii: string;
  supervisorHUD: string;
}

/**
 * Sample role boundaries. Concrete permissions are customised during
 * deployment — this shows the shape of the control, not a fixed product limit.
 */
export const accessMatrix: AccessMatrixRow[] = [
  {
    role: "Collection Agent",
    queue: "Assigned accounts only",
    pii: "Masked phone/SSN",
    supervisorHUD: "No",
  },
  {
    role: "Team Supervisor",
    queue: "Campaign team accounts",
    pii: "Operational view",
    supervisorHUD: "Listen / Whisper",
  },
  {
    role: "QA Auditor",
    queue: "Audit evaluation worklist",
    pii: "Full with audit log",
    supervisorHUD: "Recorded sessions",
  },
  {
    role: "Operations Manager",
    queue: "All agency campaigns",
    pii: "Scoped export",
    supervisorHUD: "Full Barge HUD",
  },
  {
    role: "System Administrator",
    queue: "Infrastructure & configuration",
    pii: "Restricted",
    supervisorHUD: "Access Audit Log",
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
 * Regulatory alignment. These are design principles BITS engineers against —
 * not a claim of certification or accreditation.
 */
export const complianceFrameworks: ComplianceFramework[] = [
  {
    id: "bsp",
    name: "BSP Circulars 454 & 857",
    scope: "Banks and financial institutions",
    control:
      "Segregation of duties, tamper-evident audit trails, and documented access reviews for every privileged action.",
  },
  {
    id: "npc",
    name: "NPC RA 10173 — Data Privacy Act",
    scope: "All personal data processed in the Philippines",
    control:
      "Lawful-purpose processing, consent records, retention limits, and a documented breach-notification path.",
  },
  {
    id: "sec",
    name: "SEC MC 18 — Fair Practice",
    scope: "Publicly listed companies and subsidiaries",
    control:
      "Contact-frequency capping, quiet-hour enforcement, do-not-call lists, and cease-and-desist handling built into the workflow.",
  },
  {
    id: "iso",
    name: "ISO/IEC 27001 Aligned Controls",
    scope: "Enterprise information security posture",
    control:
      "Access control, logging, and change management aligned to the control families an ISO assessment expects.",
  },
];

export interface DataHandlingRow {
  data: string;
  control: string;
}

export const dataHandling: DataHandlingRow[] = [
  {
    data: "Customer and account records",
    control: "Scoped by role and campaign, masked outside the operational need-to-know boundary",
  },
  {
    data: "Call recordings and transcripts",
    control: "Retained on a configurable schedule, access-logged on every playback",
  },
  {
    data: "Field visit GPS, photos, and dispositions",
    control: "Timestamped at capture, tamper-evident, and retained as part of the visit record",
  },
  {
    data: "Financial and payroll records",
    control: "Segregated duties enforced in the ledger, with immutable posting history",
  },
  {
    data: "System administration actions",
    control: "Every configuration change recorded with user, timestamp, and source address",
  },
  {
    data: "Backups and replication",
    control: "Scheduled, monitored, and restorable — verified rather than assumed",
  },
];