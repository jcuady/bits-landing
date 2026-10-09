/**
 * Product Registry for Subdomain Routing, MVPs, Role Testing, and Homepage Placement
 * Boundless IT Solutions (BITS)
 *
 * NOTE ON COUNTS: the marketing surface claims "16 products". That is the count of
 * CANONICAL entries below, once subdomain aliases are excluded. See
 * `getCanonicalProducts()`.
 */

export interface ProductHomepageConfig {
  /**
   * Promote to a hero slot on the homepage. Reserved for the flagship and any
   * product marketing actively wants a headline moment for. Everything else
   * appears in the catalogue grid only.
   */
  featured?: boolean;
  /** Four-to-eight word descriptor used in the homepage Platform Index grid. */
  summary?: string;
  /**
   * Set when this product is a MODULE of the Operations 360 platform rather than
   * a standalone product. Modules share the platform database and are not
   * separately deployable.
   */
  platform?: string;
  /** Ordering within the homepage grid. Lower sorts first. */
  order?: number;
}

export interface ProductMvpConfig {
  id: string;
  name: string;
  shortName: string;
  subdomain: string;
  category: "crm" | "operations" | "workforce" | "supply-chain" | "venues" | "ai" | "hardware";
  categoryLabel: string;
  tagline: string;
  demoPath: string; // Internal App Router path
  marketingUrl: string; // Public marketing lander URL
  defaultRole: string;
  testRoles: {
    id: string;
    label: string;
    description: string;
    persona: "rep" | "manager" | "executive" | "admin";
  }[];
  /**
   * Marks this entry as a subdomain alias of another product (e.g. the
   * `collections.*` subdomain pointing at Operations 360).
   *
   * Aliases exist ONLY so a domain can resolve. They must never appear in any
   * customer-facing listing — doing so caused "Operations 360" to render twice
   * on /demo. Filter them with `getCanonicalProducts()`.
   */
  aliasOf?: string;
  /** Homepage placement. Absent = catalogue-only. */
  homepage?: ProductHomepageConfig;
}

export const PRODUCT_REGISTRY: Record<string, ProductMvpConfig> = {
  // ── CRM & REVENUE CLOUD ──
  "crm-sales": {
    id: "crm-sales",
    name: "BITScrm Sales Suite",
    shortName: "Sales CRM",
    subdomain: "sales",
    category: "crm",
    categoryLabel: "CRM & Revenue",
    tagline: "Visual Kanban deal pipeline, predictive win scoring, and 1-click CPQ quoting.",
    demoPath: "/(products)/crm-sales",
    marketingUrl: "/operations-360/crm",
    homepage: {
      summary: "Recover the accounts",
      platform: "operations-360",
      order: 1,
    },
    defaultRole: "sales_rep",
    testRoles: [
      {
        id: "sales_rep",
        label: "Sales Representative",
        description: "Assigned active leads, personal deal pipeline, and daily quota metrics.",
        persona: "rep",
      },
      {
        id: "sales_director",
        label: "Sales Director",
        description: "Team revenue velocity, weighted pipeline forecasting, and CPQ margin approvals.",
        persona: "manager",
      },
      {
        id: "fullstack_admin",
        label: "Full-Stack Dev / PO",
        description: "Unrestricted administrative access with sandbox data reset & telemetry.",
        persona: "admin",
      },
    ],
  },
  "operations-360": {
    id: "operations-360",
    name: "OPERATIONS 360",
    shortName: "Operations 360",
    subdomain: "ops",
    category: "operations",
    categoryLabel: "Flagship Integrated Operations Suite",
    tagline: "One System. One View. One Source of Truth. Integrated CRM, QA, Scorecards, Coaching Logs, Dialer, LMS, WFM & Real-Time Dashboards.",
    demoPath: "/app",
    marketingUrl: "/operations-360",
    homepage: {
      featured: true,
      summary: "The recovery floor, on one system",
      order: 0,
    },
    defaultRole: "business_owner",
    testRoles: [
      {
        id: "business_owner",
        label: "Business Owner",
        description: "Big picture view, executive scorecards, and fast data-driven operational decisions.",
        persona: "executive",
      },
      {
        id: "ops_manager",
        label: "Operations Manager",
        description: "Live floor operations, WFM adherence, and productivity without waiting for MIS reports.",
        persona: "manager",
      },
      {
        id: "team_supervisor",
        label: "Team Supervisor",
        description: "Manage, coach, and develop agent teams with integrated QA scorecards and action plans.",
        persona: "manager",
      },
      {
        id: "operations_agent",
        label: "Operations Agent",
        description: "Unified customer CRM, WebRTC auto-dialer, LMS learning modules, and daily metrics.",
        persona: "rep",
      },
      {
        id: "fullstack_admin",
        label: "Full-Stack Dev / PO",
        description: "Unrestricted administrative access with sandbox data reset & telemetry.",
        persona: "admin",
      },
    ],
  },
  "crm-collections": {
    id: "crm-collections",
    name: "OPERATIONS 360 (Collections & Recovery Module)",
    shortName: "Operations 360",
    subdomain: "collections",
    aliasOf: "operations-360",
    category: "operations",
    categoryLabel: "Flagship Integrated Operations Suite",
    tagline: "Integrated operations platform with WebRTC dialer, QA coaching, WFM, and BSP 454/857 compliance.",
    demoPath: "/app",
    marketingUrl: "/operations-360",
    defaultRole: "business_owner",
    testRoles: [
      {
        id: "business_owner",
        label: "Business Owner",
        description: "See the big picture and make faster, data-driven decisions.",
        persona: "executive",
      },
      {
        id: "ops_manager",
        label: "Operations Manager",
        description: "Monitor performance and operations without waiting for MIS reports.",
        persona: "manager",
      },
      {
        id: "team_supervisor",
        label: "Team Supervisor",
        description: "Manage, coach, and develop your teams from one platform.",
        persona: "manager",
      },
      {
        id: "operations_agent",
        label: "Operations Agent",
        description: "Access the tools and information you need in one place.",
        persona: "rep",
      },
    ],
  },
  "crm-support": {
    id: "crm-support",
    name: "BITScrm Support Desk",
    shortName: "Support Desk",
    subdomain: "support",
    category: "crm",
    categoryLabel: "Helpdesk & Service",
    tagline: "Omnichannel customer support with real-time P1–P4 SLA countdown HUD.",
    demoPath: "/(products)/crm-support",
    marketingUrl: "/products/support",
    defaultRole: "support_agent",
    testRoles: [
      {
        id: "support_agent",
        label: "Tier 1 Support Agent",
        description: "Ticket queue, automated responses, customer sentiment telemetry.",
        persona: "rep",
      },
      {
        id: "service_manager",
        label: "Customer Service Manager",
        description: "SLA breach alerts, CSAT scores, and agent workload rebalancing.",
        persona: "manager",
      },
    ],
  },
  "crm-marketing": {
    id: "crm-marketing",
    name: "BITScrm Marketing Journeys",
    shortName: "Marketing Cloud",
    subdomain: "marketing",
    category: "crm",
    categoryLabel: "Marketing Automation",
    tagline: "Multi-channel automated drip journeys via SMS, Viber, and email with attribution.",
    demoPath: "/(products)/crm-marketing",
    marketingUrl: "/products/marketing",
    defaultRole: "growth_marketer",
    testRoles: [
      {
        id: "growth_marketer",
        label: "Campaign Manager",
        description: "Visual journey builder, audience segmentation, and blast scheduling.",
        persona: "rep",
      },
    ],
  },
  "crm-commerce": {
    id: "crm-commerce",
    name: "BITScrm Commerce & Billing",
    shortName: "Commerce Engine",
    subdomain: "commerce",
    category: "crm",
    categoryLabel: "Subscriptions & Billing",
    tagline: "Tokenized PCI payments, Maya/card gateways, and smart recurring dunning.",
    demoPath: "/(products)/crm-commerce",
    marketingUrl: "/products/commerce",
    defaultRole: "billing_specialist",
    testRoles: [
      {
        id: "billing_specialist",
        label: "Billing Specialist",
        description: "Invoice batches, recurring subscription management, and payment reconciliation.",
        persona: "rep",
      },
    ],
  },

  // ── FINANCIALS & WORKFORCE ──
  "accounting": {
    id: "accounting",
    name: "BITS Accounting & ERP",
    shortName: "Accounting ERP",
    subdomain: "accounting",
    category: "operations",
    categoryLabel: "ERP & Financials",
    tagline: "Audit-ready General Ledger, 3-way PO matching, and BIR CAS computerized tax filing.",
    demoPath: "/(products)/accounting",
    marketingUrl: "/products/accounting",
    defaultRole: "bookkeeper",
    testRoles: [
      {
        id: "bookkeeper",
        label: "Staff Accountant",
        description: "Accounts payable, journal vouchers, and bank reconciliation.",
        persona: "rep",
      },
      {
        id: "cfo",
        label: "Chief Financial Officer",
        description: "Multi-entity consolidation, trial balances, and BIR CAS audit packages.",
        persona: "executive",
      },
    ],
  },
  "payroll": {
    id: "payroll",
    name: "BITS Payroll Engine",
    shortName: "Payroll Core",
    subdomain: "payroll",
    category: "workforce",
    categoryLabel: "Payroll & Tax",
    tagline: "Automated TRAIN Law tax tables, SSS/PhilHealth/Pag-IBIG, and bank batch feeds.",
    demoPath: "/(products)/payroll",
    marketingUrl: "/products/payroll",
    defaultRole: "payroll_officer",
    testRoles: [
      {
        id: "payroll_officer",
        label: "Payroll Specialist",
        description: "Biometric time-sync, overtime, night differential, and payslips.",
        persona: "rep",
      },
    ],
  },
  "hrms": {
    id: "hrms",
    name: "BITS HRMS Workforce OS",
    shortName: "HRMS Cloud",
    subdomain: "hrms",
    category: "workforce",
    categoryLabel: "HR & People",
    tagline: "Multi-shift rosters, leave approvals, employee records, and DOLE audit readiness.",
    demoPath: "/(products)/hrms",
    marketingUrl: "/products/hrms",
    defaultRole: "hr_manager",
    testRoles: [
      {
        id: "hr_manager",
        label: "HR Director",
        description: "Shift allocation, leave matrix, onboarding checklists, and 201 filing.",
        persona: "manager",
      },
    ],
  },

  // ── SUPPLY CHAIN & FIELD OPS ──
  "logistics": {
    id: "logistics",
    name: "BITS Logistics Cloud",
    shortName: "Logistics Fleet",
    subdomain: "logistics",
    category: "supply-chain",
    categoryLabel: "Fleet & Dispatch",
    tagline: "AI multi-stop route optimization, real-time GPS tracking, and driver mobile ePOD.",
    demoPath: "/(products)/logistics",
    marketingUrl: "/products/logistics",
    defaultRole: "fleet_dispatcher",
    testRoles: [
      {
        id: "fleet_dispatcher",
        label: "Fleet Dispatcher",
        description: "Live vehicle map, dispatch assigner, and delivery delay notifications.",
        persona: "rep",
      },
    ],
  },
  "inventory": {
    id: "inventory",
    name: "BITS Inventory Engine",
    shortName: "Inventory Hub",
    subdomain: "inventory",
    category: "supply-chain",
    categoryLabel: "Warehouse & Stock",
    tagline: "Multi-warehouse stock allocation, barcode/RFID scanning station, and par levels.",
    demoPath: "/(products)/inventory",
    marketingUrl: "/products/inventory",
    defaultRole: "warehouse_lead",
    testRoles: [
      {
        id: "warehouse_lead",
        label: "Warehouse Supervisor",
        description: "Stock ledger, low-stock threshold alerts, and bin locations.",
        persona: "rep",
      },
    ],
  },
  "construction": {
    id: "construction",
    name: "BITS Construction Tracker",
    shortName: "Project Tracker",
    subdomain: "construction",
    category: "operations",
    categoryLabel: "Jobsite Tracking",
    tagline: "Jobsite Gantt milestones, blueprint vault, and material cost leakage prevention.",
    demoPath: "/(products)/construction",
    marketingUrl: "/products/construction",
    defaultRole: "site_engineer",
    testRoles: [
      {
        id: "site_engineer",
        label: "Project Manager",
        description: "Milestone completion, subcontractor punch lists, and daily logs.",
        persona: "manager",
      },
    ],
  },

  // ── SPORTS, VENUES & QUEUING ──
  "pickleball": {
    id: "pickleball",
    name: "BITS Pickleball & Court OS",
    shortName: "Pickleball OS",
    subdomain: "pickleball",
    category: "venues",
    categoryLabel: "Sports Arenas",
    tagline: "Digital paddle rack queue, court reservation scheduling, and live TV scoreboard feeds.",
    demoPath: "/(products)/pickleball",
    marketingUrl: "/products/pickleball",
    defaultRole: "arena_manager",
    testRoles: [
      {
        id: "arena_manager",
        label: "Court Manager",
        description: "Paddle rotation queue, court assignments, and POS tournament ticketing.",
        persona: "manager",
      },
    ],
  },
  "sports-hub": {
    id: "sports-hub",
    name: "BITS Sports Arena Hub",
    shortName: "Sports Hub",
    subdomain: "sports",
    category: "venues",
    categoryLabel: "Venues & Athletics",
    tagline: "Multi-court facility booking, tournament ladders, and live TV scoreboard displays.",
    demoPath: "/(products)/sports-hub",
    marketingUrl: "/products/sports-hub",
    defaultRole: "facility_coordinator",
    testRoles: [
      {
        id: "facility_coordinator",
        label: "Facility Coordinator",
        description: "Multi-court scheduling, tournament brackets, and locker allocation.",
        persona: "manager",
      },
    ],
  },
  "queuing": {
    id: "queuing",
    name: "BITS Smart Queuing",
    shortName: "Smart Queue",
    subdomain: "queuing",
    category: "venues",
    categoryLabel: "Customer Flow",
    tagline: "Virtual QR tickets, overhead TV chime displays, and teller counter HUD.",
    demoPath: "/(products)/queuing",
    marketingUrl: "/products/queuing",
    defaultRole: "counter_teller",
    testRoles: [
      {
        id: "counter_teller",
        label: "Window Teller",
        description: "Next ticket caller, transfer desk, and wait-time statistics.",
        persona: "rep",
      },
    ],
  },
  "booking": {
    id: "booking",
    name: "BITS Booking System",
    shortName: "Booking OS",
    subdomain: "booking",
    category: "venues",
    categoryLabel: "Appointments",
    tagline: "Online client reservations, capacity escrow deposits, and automated reminders.",
    demoPath: "/(products)/booking",
    marketingUrl: "/products/booking",
    defaultRole: "desk_receptionist",
    testRoles: [
      {
        id: "desk_receptionist",
        label: "Front Desk Staff",
        description: "Calendar slots, client confirmations, and deposit tracking.",
        persona: "rep",
      },
    ],
  },

  // ── AI INFRASTRUCTURE & HARDWARE ──
  "bitsagent": {
    id: "bitsagent",
    name: "BITSagent Voice AI Operations",
    shortName: "Voice AI Agent",
    subdomain: "agent",
    category: "ai",
    categoryLabel: "Conversational AI",
    tagline: "Sub-300ms ultra-realistic conversational voice agent with zero hallucinations.",
    demoPath: "/(products)/bitsagent",
    marketingUrl: "/operations-360/ai",
    homepage: {
      summary: "Automate the floor",
      platform: "operations-360",
      order: 2,
    },
    defaultRole: "ai_architect",
    testRoles: [
      {
        id: "ai_architect",
        label: "AI Operations Lead",
        description: "Live prompt tuning, voice telemetry, call transcripts, and RAG grounding.",
        persona: "admin",
      },
    ],
  },
  "rag-engine": {
    id: "rag-engine",
    name: "BITS RAG Enterprise Knowledge",
    shortName: "RAG Engine",
    subdomain: "rag",
    category: "ai",
    categoryLabel: "Enterprise Search",
    tagline: "Ground AI agents in proprietary PDFs, contracts, SOPs, and SQL databases.",
    demoPath: "/(products)/rag-engine",
    marketingUrl: "/products/rag-engine",
    defaultRole: "knowledge_admin",
    testRoles: [
      {
        id: "knowledge_admin",
        label: "Knowledge Officer",
        description: "Document embeddings, chunking preview, and vector search inspection.",
        persona: "admin",
      },
    ],
  },
  "nfc-card": {
    id: "nfc-card",
    name: "BITS Smart NFC Card & Identity",
    shortName: "Smart NFC Card",
    subdomain: "nfc",
    category: "hardware",
    categoryLabel: "Digital Identity",
    tagline: "Contactless NFC business identity cards with real-time analytics & dynamic link editing.",
    demoPath: "/(products)/nfc-card",
    marketingUrl: "/products/nfc-card",
    defaultRole: "card_holder",
    testRoles: [
      {
        id: "card_holder",
        label: "Cardholder / Executive",
        description: "Dynamic VCF editor, tap analytics, and link routing.",
        persona: "rep",
      },
    ],
  },
};

/**
 * Every real product, with subdomain aliases excluded.
 *
 * Use this for ANY customer-facing listing. `Object.values(PRODUCT_REGISTRY)`
 * includes alias entries (e.g. `crm-collections` → Operations 360), which
 * caused "Operations 360" to render twice on /demo.
 */
export function getCanonicalProducts(): ProductMvpConfig[] {
  return Object.values(PRODUCT_REGISTRY).filter((p) => !p.aliasOf);
}

/** Products that should occupy a homepage slot (excludes aliases). */
export function getHomepageProducts(): ProductMvpConfig[] {
  return getCanonicalProducts()
    .filter((p) => p.homepage)
    .sort((a, b) => (a.homepage?.order ?? 99) - (b.homepage?.order ?? 99));
}

/** The featured product — the flagship. At most one. */
export function getFeaturedProduct(): ProductMvpConfig | undefined {
  return getHomepageProducts().find((p) => p.homepage?.featured);
}

/** Products belonging to a platform (modules, e.g. BITScrm under Operations 360). */
export function getModulesOf(platformId: string): ProductMvpConfig[] {
  return getHomepageProducts().filter((p) => p.homepage?.platform === platformId);
}

/**
 * Helper to resolve a product by its subdomain key (e.g. 'sales' -> config)
 */
export function getProductBySubdomain(subdomain: string): ProductMvpConfig | undefined {
  const normalized = subdomain.toLowerCase().trim();
  return Object.values(PRODUCT_REGISTRY).find((p) => p.subdomain === normalized);
}

/**
 * Helper to resolve a product by its ID or slug (e.g. 'crm-sales' or 'sales')
 */
export function getProductById(idOrSlug: string): ProductMvpConfig | undefined {
  const normalized = idOrSlug.toLowerCase().trim();
  if (PRODUCT_REGISTRY[normalized]) return PRODUCT_REGISTRY[normalized];
  return Object.values(PRODUCT_REGISTRY).find(
    (p) => p.id === normalized || p.subdomain === normalized
  );
}
