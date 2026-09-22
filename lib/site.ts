export const site = {
  name: "BITS",
  legalName: "BITS - Boundless IT Solutions",
  tagline: "Technology built around the way your business actually operates.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.boundlessits.com",
  inquiryEmail: "bits_inquiries@boundlessits.com",
  description:
    "Business-specific software, workflow automation, CRM, AI-assisted operations, and digital infrastructure for BPOs, collection agencies, banks, and operations with complex workflows.",
} as const;

/* ── Primary Navigation Items ── */
export const navItems = [
  { label: "Ecosystem", href: "/#ecosystem" },
  { label: "The Difference", href: "/#the-difference" },
  { label: "BITScrm", href: "/bitscrm" },
  { label: "AI Operations", href: "/bitsagent" },
  { label: "Industries", href: "/#industries" },
  { label: "Security", href: "/#security" },
  { label: "Methodology", href: "/#methodology" },
  { label: "Solutions", href: "/#solutions" },
  { label: "FAQ", href: "/#faq" },
] as const;

/* ── Structured Navigation with Subsections ── */
export const navigationSections = [
  {
    id: "platform",
    label: "Platform",
    dropdown: {
      heading: "Enterprise Software Portfolio",
      items: [
        {
          title: "BITScrm Customer Service",
          badge: "Primary Flagship",
          description: "Collections, customer care, and omnichannel contact center CRM.",
          href: "/bitscrm",
          icon: "crm" as const,
        },
        {
          title: "BITSagent AI Operations",
          badge: "Autonomous AI",
          description: "Human-sounding voice negotiation, email agents, and real-time QA.",
          href: "/bitsagent",
          icon: "ai" as const,
        },
        {
          title: "CRM Variants (Sales, Mktg, Commerce)",
          badge: "Revenue Suite",
          description: "Visual deal Kanban, CPQ, journeys, subscription billing & PCI payments.",
          href: "/products/sales",
          icon: "pipeline" as const,
        },
        {
          title: "BITS Construction & Logistics",
          badge: "Operations",
          description: "Jobsite tracking, inventory sync, fleet dispatch & payroll interconnect.",
          href: "/products/construction",
          icon: "process" as const,
        },
        {
          title: "BITS HRMS & Payroll",
          badge: "Workforce",
          description: "24/7 BPO rosters, biometric sync, statutory deductions & direct bank feeds.",
          href: "/products/hrms",
          icon: "headset" as const,
        },
        {
          title: "BITS AI Sports Scoring & Analysis",
          badge: "Computer Vision",
          description: "Upload smartphone/GoPro video: auto scoring, player stats, highlight reels & AI coach.",
          href: "/products/sports-ai",
          icon: "sparkles" as const,
        },
        {
          title: "BITS Accounting & ERP",
          badge: "SAP-Grade Core",
          description: "General Ledger, AP/AR 3-way match, multi-entity consolidation & BIR CAS.",
          href: "/products/accounting",
          icon: "accounting" as const,
        },
        {
          title: "BITS Sports Arena & Queuing Hub",
          badge: "Venues & Retail",
          description: "Court queues, TV display screens, tournament brackets & virtual ticketing.",
          href: "/products/sports-hub",
          icon: "briefcase" as const,
        },
        {
          title: "BITS RAG Enterprise Knowledge",
          badge: "Universal AI Layer",
          description: "Ground BITSagent AI & CRM in proprietary PDFs, databases & SOP manuals.",
          href: "/products/rag-engine",
          icon: "layers" as const,
        },
        {
          title: "BITS Smart NFC Business & Identity Card",
          badge: "1 Card for Life",
          description: "Tap to share contacts, socials, websites & payments. 100% secure, dynamic & multipurpose.",
          href: "/products/nfc-card",
          icon: "card" as const,
        },
        {
          title: "BITS White Label Platform",
          badge: "Custom Brand",
          description: "Deploy any BITS engine rebranded under your own domain, logo & color identity.",
          href: "/products/white-label",
          icon: "sparkles" as const,
        },
      ],
    },
  },
  {
    id: "industries",
    label: "Industries",
    dropdown: {
      heading: "Target Operational Sectors",
      items: [
        {
          title: "BPO & Contact Centers",
          badge: "Multi-Client",
          description: "Campaign tenant isolation, skill routing & supervisor QA HUD.",
          href: "/#industries",
          icon: "headset" as const,
        },
        {
          title: "Debt Collection Agencies",
          badge: "Recovery Pipeline",
          description: "DPD tracking, automated PTP scheduling & auto-dialing.",
          href: "/#industries",
          icon: "pipeline" as const,
        },
        {
          title: "Banks & Financial Services",
          badge: "Governance",
          description: "Security-conscious architecture, RBAC & immutable audit logs.",
          href: "/#industries",
          icon: "shield" as const,
        },
        {
          title: "Growing Businesses",
          badge: "Custom Systems",
          description: "Bespoke operational software, workflows & API integrations.",
          href: "/#industries",
          icon: "briefcase" as const,
        },
      ],
    },
  },
  {
    id: "governance",
    label: "Trust & Security",
    dropdown: {
      heading: "Governance & Process",
      items: [
        {
          title: "Security & Governance",
          badge: "RBAC Matrix",
          description: "Role-based boundaries, data isolation & BSP/NPC principles.",
          href: "/#security",
          icon: "lock" as const,
        },
        {
          title: "Cloud vs. On-Premises",
          badge: "Architecture",
          description: "Deploy in our managed cloud or on your existing bare-metal servers.",
          href: "/#deployment",
          icon: "server" as const,
        },
        {
          title: "5-Step Methodology",
          badge: "Delivery",
          description: "Understand, Design, Build, Deploy, and continuous Improve.",
          href: "/#methodology",
          icon: "process" as const,
        },
        {
          title: "Enterprise FAQ",
          badge: "10 Answers",
          description: "Factual answers regarding architecture, security & onboarding.",
          href: "/#faq",
          icon: "help" as const,
        },
      ],
    },
  },
  {
    id: "solutions",
    label: "Solutions & Pricing",
    href: "/#solutions",
  },
] as const;

/* ── Hero Benchmarks ── */
export const heroStats = [
  { value: "3.2x", label: "Faster Right-Party Connects" },
  { value: "99.9%", label: "High-Availability Telephony SLA" },
] as const;

/* ── Stats Strip ── */
export const stats = [
  { value: "3.2x", label: "Higher Right-Party Contact Rate", icon: "building" as const },
  { value: "45%", label: "Reduction in Broken PTP Defaults", icon: "users" as const },
  { value: "99.9%", label: "High-Availability Infrastructure SLA", icon: "headset" as const },
] as const;

/* ── The Difference: Generic Software vs. BITS ── */
export const theDifference = [
  {
    category: "Workflow Architecture",
    generic: "Forces your team into rigid, predetermined off-the-shelf software paths",
    bits: "Engineered strictly around your real-world operational workflows and hierarchy",
  },
  {
    category: "Data Schema & Customization",
    generic: "Restricted to preset fields, clunky dropdowns, and rigid database templates",
    bits: "Fully bespoke account schemas, custom disposition logic, and dynamic queues",
  },
  {
    category: "Operational Automation",
    generic: "Superficial email zaps and brittle third-party integration webhooks",
    bits: "Native state-machine automation, event triggers, SLA controls, and auto-routing",
  },
  {
    category: "AI & Intelligence",
    generic: "Surface-level chatbot widgets disconnected from real customer data",
    bits: "Deep operational AI agents (voice/email/SMS) with RAG connected to your business knowledge",
  },
  {
    category: "Security & Governance",
    generic: "Generic shared multi-tenancy with limited audit trails and fixed hosting",
    bits: "Granular RBAC, immutable audit logging, and private cloud or on-premises deployment",
  },
  {
    category: "System Evolution",
    generic: "You wait quarters or years for vendor roadmaps that ignore your edge cases",
    bits: "Continuous agile expansion, active optimization, and dedicated engineering partnership",
  },
] as const;

/* ── BITS Full Enterprise Product Portfolio (Flagships & Add-Ons) ── */
export const bitsProducts = [
  {
    id: "service",
    name: "BITScrm Customer Service",
    shortName: "Service CRM",
    category: "flagship",
    categoryLabel: "Primary Flagship Platform",
    badge: "Core Flagship",
    isFlagship: true,
    tagline: "High-Volume Customer Service, Collections & Omnichannel Resolution",
    description:
      "The mission-critical operational platform for BPOs, collections agencies, banks, and lenders. Unifies delinquent account staging, queue distribution, browser WebRTC softphones, automated PTP scheduling, supervisor QA HUD, and regulatory compliance.",
    complianceBadges: [
      "HIPAA Security Rule Aligned",
      "SOC 2 Type II Controls",
      "BSP Circulars 454/857",
      "NPC RA 10173 DPA",
    ],
    capabilities: [
      "Dynamic Debtor & Customer Staging Queues",
      "Built-in WebRTC Browser SIP Softphone & Auto-Dialer",
      "Automated Promise-to-Pay (PTP) Scheduling Engine",
      "Supervisor Live Listen, Whisper & Barge HUD",
      "Standardized QA Scorecards & Audit Worklists",
      "Granular Role-Based Access (RBAC) & WORM Logs",
    ],
    metrics: { label: "Right-Party Connect", value: "3.2x Boost" },
    ctaText: "Explore BITScrm Service",
    ctaHref: "/bitscrm",
  },
  {
    id: "ai-agent",
    name: "BITSagent AI Operations",
    shortName: "BITSagent AI",
    category: "flagship",
    categoryLabel: "Autonomous AI Flagship",
    badge: "Core Flagship",
    isFlagship: true,
    tagline: "Autonomous Conversational Voice & Email AI Agents",
    description:
      "Sub-300ms ultra-realistic conversational voice and email agents that autonomously negotiate payment arrangements, answer customer questions, and transcribe calls with enterprise RAG knowledge grounding.",
    complianceBadges: [
      "HIPAA Compliant Audio",
      "SOC 2 Type II Security",
      "Statutory Contact Hours Enforced",
      "Immutable Audio Audits",
    ],
    capabilities: [
      "Conversational Voice AI (< 300ms Turn Latency)",
      "Autonomous Multi-Turn Debt & Terms Negotiation",
      "Omnichannel Email & SMS Payment Intake Agent",
      "Real-Time Sentiment Analysis & Script Adherence",
      "Enterprise RAG Business Knowledge Grounding",
      "Instant Warm Transfer to Live Human Agent",
    ],
    metrics: { label: "Autonomous Resolution", value: "68% Rate" },
    ctaText: "Explore BITSagent AI",
    ctaHref: "/bitsagent",
  },
  {
    id: "sales",
    name: "BITScrm Sales",
    shortName: "Sales CRM",
    category: "crm",
    categoryLabel: "CRM & Revenue Cloud",
    badge: "Revenue Engine",
    isFlagship: false,
    tagline: "High-Velocity Revenue Pipeline & Deal Intelligence Engine",
    description:
      "Purpose-built for institutional sales, loan origination, and B2B client acquisition. Combines visual Kanban deal stages, AI win-probability scoring, automated territory routing, and CPQ quote-to-cash workflows.",
    complianceBadges: [
      "SOC 2 Type II Controls",
      "Granular RBAC Permissions",
      "Encrypted Quote Documents",
      "NPC RA 10173 DPA",
    ],
    capabilities: [
      "Visual Multi-Stage Deal Pipeline Kanban",
      "Predictive AI Lead Scoring & Win Probability",
      "Automated Territory & Representative Routing",
      "CPQ (Configure, Price, Quote) Generator",
      "Two-Way Email & Calendar Activity Sync",
      "Executive Revenue Forecasting & Closed-Won Cockpit",
    ],
    metrics: { label: "Pipeline Velocity", value: "+38% Faster" },
    ctaText: "Explore CRM Sales",
    ctaHref: "/products/sales",
  },
  {
    id: "marketing",
    name: "BITScrm Marketing",
    shortName: "Marketing CRM",
    category: "crm",
    categoryLabel: "CRM & Revenue Cloud",
    badge: "Audience Journeys",
    isFlagship: false,
    tagline: "Omnichannel Customer Journeys & Audience Automation",
    description:
      "Orchestrate multi-touch customer acquisition, debtor re-engagement, and loan lifecycle journeys across email, SMS, messaging channels, and webhooks with closed-loop attribution analytics.",
    complianceBadges: [
      "NPC RA 10173 DPA",
      "CAN-SPAM / TCPA Alignment",
      "Automated Opt-Out Engine",
      "Encrypted Customer PII",
    ],
    capabilities: [
      "Visual Multi-Branch Customer Journey Builder",
      "Dynamic Audience Segmentation & Behavioral Tags",
      "Automated SMS & Email Drip Sequences",
      "Multi-Channel Event Webhook Triggers",
      "Full-Funnel Conversion Attribution Analytics",
      "Strict Consent, Opt-In & Unsubscribe Governance",
    ],
    metrics: { label: "Engagement Lift", value: "4.5x Higher" },
    ctaText: "Explore CRM Marketing",
    ctaHref: "/products/marketing",
  },
  {
    id: "commerce",
    name: "BITScrm Commerce",
    shortName: "Commerce CRM",
    category: "crm",
    categoryLabel: "CRM & Revenue Cloud",
    badge: "Billing & Storefront",
    isFlagship: false,
    tagline: "B2B/B2C Digital Storefronts, Invoicing & Subscription Engine",
    description:
      "Unified commerce architecture supporting flexible recurring subscriptions, usage-based billing, multi-currency invoicing, dunning recovery, and tokenized payment gateway integrations.",
    complianceBadges: [
      "PCI-DSS Level 1 Ready",
      "SOC 2 Type II Controls",
      "256-Bit TLS Financial Encryption",
      "Tamper-Evident Ledger Logs",
    ],
    capabilities: [
      "Recurring Subscription & Usage-Based Billing",
      "B2B Product & Digital Service Catalog",
      "Tokenized Multi-Gateway Payment Processing",
      "Automated Tax Calculation & Compliant Invoicing",
      "Smart Dunning & Failed Payment Auto-Recovery",
      "General Ledger & ERP Accounting Sync",
    ],
    metrics: { label: "Billing Accuracy", value: "99.99% Precision" },
    ctaText: "Explore CRM Commerce",
    ctaHref: "/products/commerce",
  },
  {
    id: "accounting",
    name: "BITS Accounting & ERP",
    shortName: "Accounting ERP",
    category: "operations",
    categoryLabel: "Enterprise Financials & ERP",
    badge: "SAP-Grade Core",
    isFlagship: false,
    tagline: "Enterprise General Ledger, Multi-Entity Consolidation & SAP-Grade Accounting",
    description:
      "Turnkey enterprise financial accounting and ERP suite engineered for multi-entity corporations, conglomerates, and high-growth organizations. Unifies double-entry General Ledger (GL), automated Accounts Payable (AP) 3-way PO matching, Accounts Receivable (AR) credit controls, multi-currency FX revaluation, automated bank reconciliation, fixed assets depreciation, and BIR/IFRS-compliant financial statements with immutable audit trails.",
    complianceBadges: [
      "BIR CAS (Computerized Accounting) Ready",
      "IFRS / GAAP Standards Aligned",
      "SOC 1 / SOC 2 Type II Financial Controls",
      "SOX Segregation of Duties (SOD)",
      "WORM Immutable Audit Trail",
    ],
    capabilities: [
      "Double-Entry General Ledger (GL) & Real-Time Journal Entry Posting",
      "Accounts Payable (AP) with Automated 3-Way PO Matching & Approvals",
      "Accounts Receivable (AR) Aging, Credit Limit Checks & Invoicing",
      "Multi-Entity Corporate Consolidation & Intercompany Eliminations",
      "Automated Bank Reconciliation with Live Statement Feeds (MT940/CAMT)",
      "Multi-Currency FX Gain/Loss Auto-Revaluation & Hedging Ledger",
      "Fixed Asset Register & Automated Multi-Method Depreciation",
      "One-Click Financial Statements (Balance Sheet, P&L, Cash Flow, Trial Balance)",
      "Native Interconnect with BITS Payroll, Inventory, Construction & Commerce",
    ],
    metrics: { label: "Financial Close Speed", value: "Real-Time 0-Day" },
    ctaText: "Explore BITS Accounting ERP",
    ctaHref: "/products/accounting",
  },
  {
    id: "hrms",
    name: "BITS HRMS",
    shortName: "HRMS Cloud",
    category: "workforce",
    categoryLabel: "Workforce & Operations Cloud",
    badge: "24/7 Operations",
    isFlagship: false,
    tagline: "Human Resource Management & 24/7 Floor Workforce Operations",
    description:
      "Engineered specifically for 24/7 BPO operations, shift rotations, and multi-site enterprise teams. Unifies employee profiles, biometric attendance feeds, automated shift scheduling, leave approval matrices, and performance appraisal rubrics.",
    complianceBadges: [
      "NPC RA 10173 DPA",
      "DOLE Labor Standards Aligned",
      "Encrypted Employee Personnel Records",
      "Immutable Timekeeping Logs",
    ],
    capabilities: [
      "24/7 BPO Multi-Shift Roster & Scheduling",
      "Biometric Hardware & Facial Clock-In Sync",
      "Automated Overtime, Night Diff & Holiday Rules",
      "Multi-Tier Leave Approval & Filing Matrix",
      "Digital Employee Lifecycle & Onboarding Portal",
      "Performance Appraisals & Agent KPI Scoring",
    ],
    metrics: { label: "Shift Compliance", value: "100% Tracking" },
    ctaText: "Explore BITS HRMS",
    ctaHref: "/products/hrms",
  },
  {
    id: "payroll",
    name: "BITS Payroll",
    shortName: "Payroll Cloud",
    category: "workforce",
    categoryLabel: "Workforce & Operations Cloud",
    badge: "Tax & Bank Feeds",
    isFlagship: false,
    tagline: "Enterprise Compliance Payroll Engine & Direct Bank Disbursement",
    description:
      "Turnkey enterprise payroll automation tailored for complex labor laws, shift differentials, and multi-bank disbursement feeds. Computes Philippine statutory contributions (SSS, PhilHealth, Pag-IBIG, BIR tax withholding) and international wage structures with 100% mathematical accuracy.",
    complianceBadges: [
      "BIR Tax Table Compliant (TRAIN Law)",
      "SSS / PhilHealth / Pag-IBIG Statutory Rules",
      "SOC 2 Security Controls",
      "Bank-Grade Batch Disbursement Encryption",
    ],
    capabilities: [
      "Automated Statutory Deductions (SSS, PhilHealth, Pag-IBIG, BIR)",
      "13th-Month Pay, De Minimis & Tax Withholding Accrual",
      "Direct Bank Batch Disbursement (BDO, BPI, UnionBank, Metrobank, ACH)",
      "Encrypted Self-Service Employee Payslip Portal",
      "Timekeeping & Biometric Hours Auto-Computation",
      "Statutory Government Alphalist & Remittance Export",
    ],
    metrics: { label: "Tax Calculation Accuracy", value: "100% Certified" },
    ctaText: "Explore BITS Payroll",
    ctaHref: "/products/payroll",
  },
  {
    id: "construction",
    name: "BITS Construction & Project Tracker",
    shortName: "Construction Cloud",
    category: "operations",
    categoryLabel: "Industry & Operations",
    badge: "Milestones & Job Costing",
    isFlagship: false,
    tagline: "Jobsite Tracking, Milestones, Labor Costing & Inventory Interconnect",
    description:
      "Purpose-built construction and infrastructure project management software. Unifies site milestones, CAD/blueprint revisions, punch lists, contractor labor hours directly feeding BITS Payroll, and materials requisition linked to BITS Inventory.",
    complianceBadges: [
      "OSHA & DOLE Safety Logs",
      "Strict Cost Auditability",
      "Subcontractor Lien Waiver Tracking",
      "Encrypted Project Blueprints",
    ],
    capabilities: [
      "Real-Time Jobsite Progress & Milestones Gantt",
      "Direct BITS Payroll Interconnect for Labor & Manpower",
      "Direct BITS Inventory Link for Materials & Equipment",
      "Subcontractor Punch Lists & Field Inspections",
      "Blueprint Revisions & Digital CAD Document Vault",
      "Job Costing, Earned Value & Margin Tracking",
    ],
    metrics: { label: "Project Cost Leakage", value: "-24% Saved" },
    ctaText: "Explore Construction Tracker",
    ctaHref: "/products/construction",
  },
  {
    id: "inventory",
    name: "BITS Inventory",
    shortName: "Inventory Engine",
    category: "operations",
    categoryLabel: "Industry & Operations",
    badge: "Stock & Warehouse",
    isFlagship: false,
    tagline: "Multi-Warehouse Material, Equipment & Stock Automation",
    description:
      "Enterprise inventory orchestration across distributed warehouses, job sites, and fulfillment hubs. Features automated reorder triggers, batch/lot tracking, barcode/RFID scanner support, and real-time syncing with Construction, Commerce, and Logistics.",
    complianceBadges: [
      "ISO 9001 Traceability",
      "FIFO/LIFO Audit Trails",
      "SOC 2 Type II Controls",
      "Tamper-Resistant Stock Ledger",
    ],
    capabilities: [
      "Multi-Warehouse & Jobsite Stock Allocation",
      "Automated Par-Level & Reorder Point Triggers",
      "Batch, Lot & Serial Number Traceability",
      "Mobile Barcode & RFID Scanner Integration",
      "Interconnected with Construction & Commerce Modules",
      "Real-Time Shrinkage & Discrepancy Auditing",
    ],
    metrics: { label: "Stock Accuracy", value: "99.8% Certified" },
    ctaText: "Explore Inventory Engine",
    ctaHref: "/products/inventory",
  },
  {
    id: "logistics",
    name: "BITS Logistics",
    shortName: "Logistics Cloud",
    category: "operations",
    categoryLabel: "Industry & Operations",
    badge: "Fleet & Dispatch",
    isFlagship: false,
    tagline: "Fleet Tracking, Route Optimization & Dispatch Operations",
    description:
      "End-to-end logistics and delivery fleet operating system. Empowers dispatchers with automated route optimization, real-time GPS tracking, vehicle telemetry, driver mobile apps, and electronic proof of delivery (ePOD).",
    complianceBadges: [
      "DOT & LTO Transport Standards",
      "Proof-of-Delivery Audit Trails",
      "Encrypted Telemetry Feeds",
      "Driver Rest-Hours Compliance",
    ],
    capabilities: [
      "AI Multi-Stop Route & Fleet Dispatch Optimizer",
      "Real-Time GPS Tracking & Geofence Alerts",
      "Driver Mobile App with Offline Turn-by-Turn",
      "Electronic Proof of Delivery (ePOD) & Signature Capture",
      "Vehicle Maintenance & Fuel Consumption Telemetry",
      "Seamless Sync with Warehouse Inventory & Orders",
    ],
    metrics: { label: "Fleet Mileage Efficiency", value: "+31% Saved" },
    ctaText: "Explore Logistics Cloud",
    ctaHref: "/products/logistics",
  },
  {
    id: "sports-ai",
    name: "BITS AI Sports Scoring & Match Analysis",
    shortName: "AI Sports Scoring",
    category: "sports",
    categoryLabel: "Sports & Computer Vision AI",
    badge: "Video AI & Coach",
    isFlagship: false,
    tagline: "Computer Vision Sports Video Analysis, Automatic Scoring & AI Coach",
    description:
      "Game-changing sports intelligence app. Upload match video from any smartphone, GoPro, or camera—the AI automatically extracts scores, match results, player analytics, shot heatmaps, mistake detection, highlight reels, and offers an interactive AI Coach chat with video timestamps.",
    complianceBadges: [
      "Computer Vision Privacy Masking",
      "Student Athlete Data Protection",
      "Encrypted Video Ingestion",
      "High-Performance GPU Processing",
    ],
    capabilities: [
      "Smartphone/GoPro Video Upload & Automated Match Ingestion",
      "Automatic Score & Set Result Calculation",
      "Player Heatmaps, Shot Trajectory & Court-Positioning",
      "Automated Highlight Reel & Key Moments Extraction",
      "Mistake, Fatigue & Unforced Error Detection",
      "AI Coach Conversational Chat with Video Timestamp Citations",
      "Multi-Match Player Progress & Skill Tracking",
      "Personalized Training Drills & Practice Recommendations",
    ],
    metrics: { label: "Analysis Turnaround", value: "< 90s Engine" },
    ctaText: "Explore AI Sports Scoring",
    ctaHref: "/products/sports-ai",
  },
  {
    id: "sports-hub",
    name: "BITS Sports Arena & Venue Hub",
    shortName: "Sports Arena Hub",
    category: "sports",
    categoryLabel: "Sports & Venue Management",
    badge: "Courts & Brackets",
    isFlagship: false,
    tagline: "Live Court Queuing, Tournament Brackets & Venue TV Displays",
    description:
      "Comprehensive sports venue and athletic club management system. Automates court assignments, live TV queuing display boards, tournament elimination brackets, player leaderboards, and membership passes for badminton, basketball, padel, pickleball, and tennis centers.",
    complianceBadges: [
      "Real-Time WebSockets Display",
      "Fair Queuing Algorithm Governance",
      "PCI Tokenized Booking",
      "Player Waiver Tracking",
    ],
    capabilities: [
      "Live Venue TV Court Queue & Next-Up Display",
      "Automated Tournament Brackets & Elimination Ladders",
      "Live Scoreboard & Global Leaderboards",
      "Court Assignment & Rental Session Automation",
      "Player Rating (Elo / DUPR Style) Calibration",
      "Multi-Sport Support (Badminton, Basketball, Padel, Pickleball, Tennis)",
    ],
    metrics: { label: "Court Utilization", value: "98.4% Peak" },
    ctaText: "Explore Sports Venue Hub",
    ctaHref: "/products/sports-hub",
  },
  {
    id: "booking",
    name: "BITS Booking System",
    shortName: "Booking Engine",
    category: "sports",
    categoryLabel: "Booking & Hospitality",
    badge: "Reservations & Calendars",
    isFlagship: false,
    tagline: "Multi-Industry Reservation Engine for Hotels, Sports & Services",
    description:
      "Unified booking and reservation platform adapted for hotels, resorts, sports facilities, healthcare clinics, and consulting businesses. Features real-time calendar availability, split deposits, room/court allocation, and automated reminders.",
    complianceBadges: [
      "PCI-DSS Payment Tokenization",
      "Encrypted Guest Data",
      "Instant Booking Confirmation Audits",
      "GDPR & DPA Ready",
    ],
    capabilities: [
      "Real-Time Multi-Resource Calendar & Availability Engine",
      "Hotels & Hospitality: Room Types, Folios & Check-in/out",
      "Sports & Venues: Court/Slot Time-Block Reservations",
      "Automated SMS/Email Confirmations & QR Check-In Pass",
      "Split Payments, Deposit Escrow & Cancellation Policies",
      "Direct BITS Commerce & CRM Invoicing Integration",
    ],
    metrics: { label: "Direct Booking Rate", value: "+42% Higher" },
    ctaText: "Explore Booking Engine",
    ctaHref: "/products/booking",
  },
  {
    id: "queuing",
    name: "BITS Smart Queuing System",
    shortName: "Smart Queuing",
    category: "sports",
    categoryLabel: "Customer Experience & In-Store",
    badge: "Virtual Tickets & Displays",
    isFlagship: false,
    tagline: "Digital Queuing, Virtual Tickets & Floor Dispatch for Stores & Venues",
    description:
      "Eliminate crowded waiting rooms and disorganized floor lines. Customers scan a QR code to receive a mobile ticket with real-time wait estimation, while staff dispatch tickets across counters, service bays, or sports courts from a live queue dashboard.",
    complianceBadges: [
      "Anonymous Ticket Tokenization",
      "NPC RA 10173 DPA",
      "Multi-Screen Wall Display Support",
      "Accessible Audio Announcements",
    ],
    capabilities: [
      "Virtual QR Code Mobile Ticketing (Zero App Install Required)",
      "Live Overhead TV Queue Display Screen with Audio Chimes",
      "Multi-Counter Teller & Service Bay Dispatch Dashboard",
      "Real-Time Wait Time Estimation & Predictive Pacing",
      "Automated SMS / WhatsApp Callout when Turn is Ready",
      "Historical Floor Wait Analytics & Peak Bottleneck Heatmaps",
    ],
    metrics: { label: "Perceived Wait Time", value: "-52% Drop" },
    ctaText: "Explore Smart Queuing",
    ctaHref: "/products/queuing",
  },
  {
    id: "rag-engine",
    name: "BITS RAG Enterprise Knowledge Engine",
    shortName: "BITS RAG Layer",
    category: "ai",
    categoryLabel: "AI & Knowledge Infrastructure",
    badge: "Knowledge Grounding",
    isFlagship: false,
    tagline: "Enterprise Grounding Layer for BITSagent AI & All CRM Variants",
    description:
      "The universal knowledge retrieval engine that grounds BITSagent AI and all CRM workflows in your company's proprietary documents, policy PDFs, ERP databases, inventory stock levels, and SOP manuals with zero hallucinations.",
    complianceBadges: [
      "Vector Store Encryption at Rest",
      "Tenant-Isolated Embedding Spaces",
      "Granular Document RBAC",
      "Full Citation Lineage",
    ],
    capabilities: [
      "Multi-Source Ingestion (PDFs, Confluence, SQL, ERP, APIs)",
      "Sub-150ms Hybrid Semantic & Keyword Vector Retrieval",
      "Grounded Answer Synthesis with Source Document Citations",
      "Universal Integration with BITSagent AI & All CRM Variants",
      "Automated Daily Re-indexing & Policy Synchronization",
      "Strict Role-Based Document Access & Clearance Levels",
    ],
    metrics: { label: "Retrieval Accuracy", value: "99.4% Factual" },
    ctaText: "Explore BITS RAG Layer",
    ctaHref: "/products/rag-engine",
  },
  {
    id: "nfc-card",
    name: "BITS Smart NFC Business & Identity Card",
    shortName: "Smart NFC Card",
    category: "identity",
    categoryLabel: "Digital Identity & Smart NFC Hardware",
    badge: "1 Card for Life",
    isFlagship: false,
    tagline: "Next-Gen Digital Business Card, Dynamic Bio Hub & Instant Lead Capture",
    description:
      "Replace thousands of paper business cards forever with one premium metal or matte NFC smart card. Tap against any modern smartphone to instantly share your full contact info (.vCard), company website, social media portfolio, meeting calendars, and payment details. Features bank-grade encrypted chip security, instant remote card freeze if lost, dynamic cloud-hosted updates with zero reprinting, and seamless lead syncing directly into BITScrm.",
    complianceBadges: [
      "NTAG 424 DNA Encrypted Chip",
      "NPC RA 10173 DPA Aligned",
      "Instant 1-Click Remote Lock",
      "Zero Recipient App Required",
    ],
    capabilities: [
      "1-Tap Contact Download (.vCard auto-saved to phone contacts)",
      "Embed Websites, Portfolios, Socials, Calendars & Payments",
      "Dynamic Cloud Updates (Update info anytime with zero reprinting)",
      "Instant Remote Card Freeze / Kill-Switch if Lost or Stolen",
      "Integrated Lead Capture Form with Direct BITScrm Pipeline Sync",
      "Multipurpose Modes: Bio Hub, Direct Link, Booking or Payments",
      "Real-Time Tap Analytics, Geo-Insights & Link Click Tracking",
      "Premium Finishes: Matte PVC, Brushed Metal & Sustainable Bamboo",
    ],
    metrics: { label: "Paper Card Waste", value: "100% Eliminated" },
    ctaText: "Configure Your Smart NFC Card",
    ctaHref: "/products/nfc-card",
  },
  {
    id: "white-label",
    name: "BITS White Label Platform",
    shortName: "White Label",
    category: "whitelabel",
    categoryLabel: "White Label & Custom Branding",
    badge: "Your Brand, Our Engine",
    isFlagship: false,
    tagline: "Deploy Any BITS Product Under Your Own Brand Identity",
    description:
      "Launch any BITS product suite—CRM, HRMS, Payroll, Booking, Queuing, Accounting, AI Agents, or NFC Cards—completely rebranded under your company's own name, logo, domain, and color identity. Ideal for software resellers, enterprise groups, government agencies, and businesses that require a fully white-labeled operational platform with zero mention of BITS. Maintain full ownership of the client relationship while BITS powers the engine silently behind the scenes.",
    complianceBadges: [
      "Custom Domain & SSL Certificate",
      "Logo & Brand Color System",
      "NDA-Protected Confidentiality",
      "Full Reseller Licensing Available",
    ],
    capabilities: [
      "Full Brand Replacement: Logo, Domain, Color Palette & Typography",
      "White-Label Any BITS Product: CRM, HRMS, Payroll, Booking & More",
      "Custom Client-Facing Login Portal with Your Brand Identity",
      "NDA-Protected: Zero BITS Branding or Attribution Required",
      "Reseller Licensing: Sell to Your Own Clients at Your Own Price",
      "Custom Email Domain & Notification Templates with Your Brand",
      "Dedicated Subdomain or Fully Custom Domain (yourbrand.com)",
      "Priority Engineering Channel for Branded Feature Requests",
    ],
    metrics: { label: "Brand Ownership", value: "100% Yours" },
    ctaText: "Inquire About White Label",
    ctaHref: "/products/white-label",
  },
] as const;

/* ── BITS Technology Platform / Ecosystem Pillars ── */
export const ecosystemPillars = [
  {
    id: "crm",
    index: "01",
    title: "BITScrm",
    tagline: "Operational Account & Relationship Core",
    description:
      "Centralize debtor and customer accounts, portfolio staging, dynamic work queues, and relationship histories into one controlled operational system.",
    capabilities: [
      "Portfolio & debtor record staging",
      "Dynamic agent work queues",
      "Custom disposition & status logic",
      "Promise-to-Pay (PTP) tracking",
      "Multi-campaign tenant isolation",
    ],
    badge: "Flagship CRM",
    link: "/bitscrm",
  },
  {
    id: "automation",
    index: "02",
    title: "Workflow Automation",
    tagline: "Eliminate Repetitive Manual Operations",
    description:
      "Automate high-volume administrative tasks, queue routing, broken-PTP reassignments, and compliance quiet-hour enforcement without manual friction.",
    capabilities: [
      "Event-driven queue allocation",
      "Automated PTP reminders & escalation",
      "Configurable quiet-hour controls",
      "Batch portfolio status updating",
      "SLA breach notifications",
    ],
    badge: "Automation Engine",
    link: "/#solutions",
  },
  {
    id: "ai-operations",
    index: "03",
    title: "AI Operations (BITSagent)",
    tagline: "Intelligent Autonomous Agents & Assist",
    description:
      "Deploy conversational AI voice agents, autonomous email sequencers, real-time call QA analysis, and retrieval-augmented knowledge bases.",
    capabilities: [
      "Sub-300ms conversational voice agents",
      "Autonomous email & SMS outreach",
      "Real-time call sentiment & QA scoring",
      "RAG business knowledge grounding",
      "Seamless live-agent escalation",
    ],
    badge: "AI Layer",
    link: "/bitsagent",
  },
  {
    id: "analytics",
    index: "04",
    title: "Operational Analytics",
    tagline: "Actionable Intelligence From Floor Data",
    description:
      "Transform real-time operational data into executive dashboards, right-party contact trends, agent productivity metrics, and recovery forecasts.",
    capabilities: [
      "Real-time operational dashboards",
      "Collector & team productivity ranking",
      "PTP conversion & recovery analytics",
      "Telephony right-party contact metrics",
      "Automated management exports",
    ],
    badge: "BI & Intelligence",
    link: "/#solutions",
  },
  {
    id: "integrations",
    index: "05",
    title: "Enterprise Integrations",
    tagline: "Connect Existing Business Systems",
    description:
      "Bridge your legacy databases, telephony providers, SIP trunks, SMS gateways, and core financial ledgers without costly rip-and-replace disruption.",
    capabilities: [
      "Telephony SIP trunks & softphones",
      "Telco SMS & transactional email APIs",
      "Core banking & billing ledger feeds",
      "CSV/Excel custom mapping templates",
      "Secure webhook & REST architecture",
    ],
    badge: "Connectivity",
    link: "/#solutions",
  },
  {
    id: "custom-systems",
    index: "06",
    title: "Custom Digital Infrastructure",
    tagline: "Built for Proprietary Workflows",
    description:
      "When standard software cannot meet your unique operational demands, we engineer bespoke digital architecture tailored to your specific competitive edge.",
    capabilities: [
      "Custom internal operations portals",
      "Proprietary scoring algorithms",
      "Bespoke data pipeline pipelines",
      "On-premises / sovereign cloud hosting",
      "Tailored regulatory compliance logic",
    ],
    badge: "Custom Infrastructure",
    link: "/#contact",
  },
] as const;

/* ── Flagship CRM Deep-Dive Capabilities ── */
export const crmModules = [
  {
    id: "accounts",
    name: "Customer & Account Management",
    headline: "Centralized account intelligence and debtor history.",
    description:
      "Unify fragmented customer profiles, historical communications, multi-account relationships, balance breakdowns, and current statuses in one unified single-pane interface.",
    points: [
      "Comprehensive debtor profiles & multi-account linkages",
      "Real-time status management & delinquency days (DPD)",
      "Dynamic work queue assignment by strategy or team",
      "Controlled bulk actions with complete audit trails",
    ],
  },
  {
    id: "collections",
    name: "Collections Operations",
    headline: "Engineered for high-efficiency recovery workflows.",
    description:
      "Turn your agency's recovery policies into rigorous, repeatable operational sequences with dynamic queues, Promise-to-Pay tracking, and automated escalation paths.",
    points: [
      "Automated Promise-to-Pay (PTP) scheduling & verification",
      "Instant broken-PTP reallocation to senior recovery queues",
      "Campaign-specific disposition codes and required note fields",
      "Payment receipt recording with verification attachments",
    ],
  },
  {
    id: "contact-center",
    name: "Contact Center & Telephony",
    headline: "Browser-based communication without tool switching.",
    description:
      "Give agents connected communication tools inside the account workflow—from browser SIP dialing to multi-channel SMS and email touchpoints.",
    points: [
      "WebRTC/SIP browser softphone with one-click dialing",
      "Preview, manual, and progressive dialing modes",
      "Omnichannel SMS and email templates with dynamic merge fields",
      "Comprehensive communication log attached to debtor records",
    ],
  },
  {
    id: "supervision",
    name: "Supervision & QA",
    headline: "Real-time visibility and coaching for floor managers.",
    description:
      "Equip team leads and supervisors with live floor monitoring, whisper coaching, barge capabilities, and standardized quality assurance evaluation scorecards.",
    points: [
      "Live call monitoring with listen, whisper, and barge controls",
      "Standardized QA scorecards with objective criteria weighting",
      "Supervisor audit worklists and agent outlier identification",
      "Clear permission boundaries for sensitive supervisor actions",
    ],
  },
  {
    id: "reporting",
    name: "Reporting & Intelligence",
    headline: "Actionable operational truth for management.",
    description:
      "Eliminate manual end-of-day Excel collation. Access live visual dashboards tracking portfolio liquidation, collector productivity, and campaign ROI.",
    points: [
      "Floor productivity dashboards updated in real time",
      "Liquidation rates by portfolio, agency, and placement batch",
      "Right-party connect ratios and telephony performance metrics",
      "Role-restricted scheduled exports and CSV downloads",
    ],
  },
] as const;

/* ── BITSagent AI Capabilities ── */
export const bitsAgentCapabilities = [
  {
    id: "voice",
    label: "Conversational Voice Agent",
    copy: "Ultra-low-latency voice AI that conducts outbound negotiation and handles inbound inquiries with natural cadence and empathetic tone.",
    metric: "< 300ms",
    metricLabel: "response latency",
    maturity: "Available" as const,
  },
  {
    id: "email",
    label: "Autonomous Email Agent",
    copy: "Drafts, coordinates, and follows up on account notices, payment confirmations, and PTP reminders with complete context awareness.",
    metric: "72%",
    metricLabel: "manual workload reduction",
    maturity: "Available" as const,
  },
  {
    id: "rag",
    label: "RAG Business Knowledge",
    copy: "Grounds every AI interaction strictly in your organization's approved policy documents, collection guidelines, and compliance manuals.",
    metric: "100%",
    metricLabel: "policy adherence",
    maturity: "Configurable" as const,
  },
  {
    id: "qa-analysis",
    label: "Automated QA & Sentiment",
    copy: "Analyzes 100% of floor calls for script compliance, debtor sentiment, prohibited language, and immediate supervisor escalation flags.",
    metric: "10x",
    metricLabel: "more QA coverage",
    maturity: "Configurable" as const,
  },
  {
    id: "multichannel",
    label: "Omnichannel Orchestration",
    copy: "Synchronizes voice, email, and SMS outreach in a single coordinated campaign journey with unified debtor memory.",
    metric: "3.8x",
    metricLabel: "higher touchpoint reach",
    maturity: "Available" as const,
  },
  {
    id: "predictive",
    label: "Predictive Settlement Modeling",
    copy: "Machine learning models that analyze payment probability, optimal contact times, and recommended settlement structures.",
    metric: "Roadmap",
    metricLabel: "active R&D",
    maturity: "Roadmap" as const,
  },
] as const;

export const bitsAgentUseCases = [
  {
    id: "collections",
    label: "Debt Collections",
    headline: "Automated Collections at Scale",
    copy: "Deploy AI agents that negotiate payment arrangements, handle broken PTPs, and escalate complex cases 24/7 without growing floor burnout.",
    outcomes: ["3.2x higher right-party contact", "45% drop in broken PTP defaults", "Significant reduction in cost per recovery"],
  },
  {
    id: "support",
    label: "Customer Operations & Support",
    headline: "Continuous Operational Availability",
    copy: "Handle customer inquiries, account balance verifications, and payment receipts without adding night-shift headcount, with instant human escalation.",
    outcomes: ["Sub-minute inquiry resolution", "Zero customer hold queue time", "High containment for standard operational workflows"],
  },
  {
    id: "surveys",
    label: "Surveys & Verification",
    headline: "High-Volume Data Gathering",
    copy: "Execute compliance surveys, satisfaction checks, and debtor location verification at volume with voice agents that converse naturally.",
    outcomes: ["4x higher survey completion rates", "Real-time sentiment scoring", "Automated compliance audit reports"],
  },
  {
    id: "onboarding",
    label: "Account Onboarding",
    headline: "Accelerated Customer Intake",
    copy: "Guide customers through initial intake, document submission checklists, and consent disclosures without manual agent intervention.",
    outcomes: ["70% faster account setup", "Consistent disclosure adherence", "Immediate CRM data population"],
  },
] as const;

/* ── Target Industry Sectors ── */
export const targetIndustrySectors = [
  {
    id: "bpo",
    name: "BPO Companies & Contact Centers",
    tagline: "Scalable digital infrastructure for multi-client operational delivery.",
    description:
      "Manage distinct client campaigns with strict tenant separation, centralized supervisor QA, high-volume telephony integration, and automated reporting.",
    workflows: [
      "Client & campaign tenant isolation",
      "Dynamic agent skill-based routing",
      "Supervisor listen, whisper & barge",
      "Standardized multi-tier QA scorecards",
      "Client-facing operational SLA reporting",
    ],
    highlight: "Multi-Client Staging",
  },
  {
    id: "collections",
    name: "Debt Collection Agencies",
    tagline: "End-to-end recovery technology from account staging to legal escalation.",
    description:
      "Transform disorganized spreadsheets into controlled collection pipelines with DPD tracking, automated Promise-to-Pay monitoring, and compliant outreach.",
    workflows: [
      "Delinquency bucketing & DPD tracking",
      "Promise-to-Pay (PTP) enforcement rules",
      "Integrated SIP softphone & auto-dialing",
      "Field collector dispatch & documentation",
      "Commission & agency recovery analytics",
    ],
    highlight: "Recovery Pipeline",
  },
  {
    id: "banking",
    name: "Banks & Financial Organizations",
    tagline: "Security-conscious operational systems designed for sensitive workflows.",
    description:
      "Equip lending and credit operations with compliant customer management, granular role-based permissions, immutable audit trails, and dedicated infrastructure.",
    workflows: [
      "Granular role-based access control (RBAC)",
      "Complete immutable activity audit logging",
      "Compliant customer contact & quiet-hour rules",
      "Secure core banking data ingestion feeds",
      "Private cloud and on-premises deployment",
    ],
    highlight: "Security-Conscious Architecture",
  },
  {
    id: "growing-businesses",
    name: "Growing Businesses & Enterprises",
    tagline: "Custom software and workflow automation tailored to unique operations.",
    description:
      "When off-the-shelf SaaS fails to fit your business model, BITS designs, builds, and maintains custom software and automated workflows around your exact processes.",
    workflows: [
      "Tailored CRM & operational databases",
      "Custom cross-system workflow automation",
      "Legacy system modernization & APIs",
      "Real-time executive intelligence portals",
      "Ongoing agile engineering support",
    ],
    highlight: "Bespoke Technology",
  },
] as const;

/* ── Security & Trust Architecture ── */
export const securityArchitecture = [
  {
    title: "Role-Based Access Control (RBAC)",
    description:
      "Fine-grained permission boundaries ensure users access only the accounts, campaigns, and supervisor tools authorized for their specific operational role.",
    detail: "Collector, Team Lead, QA Auditor, Operations Manager, and Executive access levels.",
  },
  {
    title: "Campaign & Data Isolation",
    description:
      "Multi-campaign scoping keeps debtor portfolios, customer records, and client performance data strictly isolated between different campaigns and operational groups.",
    detail: "Prevents accidental cross-contamination of sensitive portfolio records.",
  },
  {
    title: "Immutable Activity & Audit Trails",
    description:
      "Every account update, disposition change, supervisory monitoring session, and record export is logged with timestamp, user ID, and IP address for compliance verification.",
    detail: "Audit-ready reporting aligned with statutory inspection requirements.",
  },
  {
    title: "Regulatory & Compliance Scoping",
    description:
      "Configurable contact rules enforce statutory quiet hours, frequency capping, Do-Not-Call (DNC) lists, and debtor cease-and-desist declarations automatically.",
    detail: "Aligned with principles of BSP Circulars 454/857 and NPC RA 10173 (Data Privacy Act).",
  },
  {
    title: "Supervisory Boundary Controls",
    description:
      "Live audio monitoring, whisper coaching, and call barging are restricted to authenticated supervisor roles and recorded in access audit logs to prevent unauthorized interception.",
    detail: "Cryptographically verified supervisory sessions with real-time HUD indicator.",
  },
  {
    title: "Deployment Versatility",
    description:
      "Deploy on secure managed cloud infrastructure or within your enterprise's private virtual cloud (VPC) or on-premises environment based on institutional data residency mandates.",
    detail: "Zero vendor lock-in with flexible database replication and backup strategies.",
  },
] as const;

/* ── 5-Step Implementation Methodology ── */
export const methodologySteps = [
  {
    step: "01",
    name: "Understand",
    headline: "Operational Immersion & Blueprinting",
    description:
      "We begin by thoroughly analyzing your current operations: inspecting your workflows, campaign structures, pain points, compliance requirements, and integration dependencies.",
    deliverable: "Operational Blueprint & Gap Analysis",
  },
  {
    step: "02",
    name: "Design",
    headline: "Architecture & Process Translation",
    description:
      "We translate your operational requirements into a concrete technical architecture—designing custom account schemas, disposition workflows, role permissions, and integration specs.",
    deliverable: "Solution Architecture & Data Schema Specification",
  },
  {
    step: "03",
    name: "Build",
    headline: "Engineering & Integration",
    description:
      "Our team develops your tailored software modules, configures workflow automation rules, integrates telephony SIP trunks and SMS gateways, and trains AI operational agents.",
    deliverable: "Configured Platform, Custom Code & Integration Staging",
  },
  {
    step: "04",
    name: "Deploy",
    headline: "Data Migration, Staging & Floor Training",
    description:
      "We execute controlled portfolio data migration, validate security parameters, conduct end-to-end user acceptance testing, and train your supervisors and agents.",
    deliverable: "Production Launch & Certified Floor Onboarding",
  },
  {
    step: "05",
    name: "Improve",
    headline: "Continuous Agile Evolution",
    description:
      "Deployment is not the end. We provide ongoing engineering partnership, actively reviewing operational bottlenecks, tweaking workflows, and introducing new automation capabilities as you scale.",
    deliverable: "Ongoing Operational Optimization & Dedicated Engineering",
  },
] as const;

/* ── Deployment Architecture Options: Cloud vs. On-Premises ── */
export const deploymentModels = [
  {
    id: "cloud",
    title: "Secure Managed Cloud",
    badge: "Fastest Time-to-Floor",
    tagline: "High-availability cloud infrastructure fully managed, monitored, and scaled by BITS.",
    description:
      "Ideal for organizations that want immediate operational acceleration without procuring server hardware or managing local data center facilities.",
    idealFor: "Rapid 1–2 week rollouts, distributed/remote operations, and agile scaling floors.",
    advantages: [
      "Rapid turnkey deployment in 1–2 weeks with zero hardware procurement lead times",
      "Zero server maintenance, power, cooling, or physical facility overhead",
      "Automated multi-zone redundancy, encrypted hourly backups, and disaster recovery failover",
      "Elastic scalability — easily add seats, campaigns, or telephony lines on demand",
      "99.9% Telephony SLA with carrier-grade SIP routing and direct telco interconnects",
      "Continuous seamless software updates with zero operational floor downtime",
    ],
    financialModel: {
      type: "Operational Expenditure (OpEx)",
      setupScope: "Onboarding & Configuration Fee",
      setupDetails:
        "Covers guided data migration, workflow & queue configuration, telephony trunk setup, and supervisor/agent training.",
      ongoingScope: "Predictable Modular Platform Fee",
      ongoingDetails:
        "Based on active seats, dialing minutes, and optional AI agent capacity with inclusive updates and cloud hosting.",
    },
    specs: [
      { label: "Deployment Time", value: "1 – 2 Weeks Turnkey" },
      { label: "Hardware Sourcing", value: "Zero Hardware Required" },
      { label: "Data Residency", value: "Dedicated Cloud VPC / Encrypted" },
      { label: "Maintenance & Patches", value: "100% Fully Managed by BITS" },
    ],
  },
  {
    id: "on-prem",
    title: "Sovereign On-Premises",
    badge: "100% Data Sovereignty & CapEx ROI",
    tagline: "Deploy directly on your company's existing bare-metal servers or private virtualization cluster.",
    description:
      "Engineered for commercial banks, financial institutions, and high-volume BPOs with strict data residency mandates or existing server investments.",
    idealFor: "Banks, financial institutions, high-volume floors with in-house server rooms, and air-gapped networks.",
    advantages: [
      "100% Data Sovereignty — debtor records, PII, and call recordings never leave your physical facility",
      "Reuse Existing Servers — deploy on your existing Dell, HPE, Supermicro, or virtualization clusters (VMware, Proxmox, Hyper-V)",
      "Long-Term Cost Advantage — eliminates ongoing per-seat cloud hosting markups for massive multi-year ROI",
      "Direct Local Telco Interconnects — connect directly to local E1/PRI lines, GSM gateways, or internal PBX with near-zero latency",
      "Air-Gapped & Closed LAN Ready — operate isolated inside your private corporate network with strict firewall boundaries",
      "End-to-End Requirement Scoping — our engineers conduct a full hardware audit and provide an exact dimensioning blueprint",
    ],
    financialModel: {
      type: "Capital Expenditure (CapEx) Optimization",
      setupScope: "Turnkey Implementation & Scoping Fee",
      setupDetails:
        "Covers on-site/remote hardware audit, Linux OS hardening, database clustering, local PBX/SIP interconnect, and live floor launch.",
      ongoingScope: "Software License & Maintenance SLA",
      ongoingDetails:
        "Annual enterprise support agreement covering software upgrades, security patches, and dedicated engineering escalation.",
    },
    specs: [
      { label: "Deployment Time", value: "2 – 4 Weeks Scoped Deployment" },
      { label: "Hardware Sourcing", value: "Reuse Existing or Procured" },
      { label: "Data Residency", value: "100% On-Site / Air-Gapped Ready" },
      { label: "Maintenance & Patches", value: "Assisted IT & SLA Partnership" },
    ],
  },
] as const;

export const hardwareScopingTiers = [
  {
    floorSize: "1 – 25 Agent Seats",
    tier: "Boutique / Small Floor",
    cpu: "8 Cores (Intel Xeon / AMD EPYC)",
    ram: "16 GB – 32 GB ECC RAM",
    storage: "500 GB NVMe (DB) + 2 TB SAS/SATA (Recordings)",
    network: "Dual 1 Gbps NICs · ~2.5 Mbps Dedicated Voice Bandwidth",
    telephony: "Local SIP Trunk or 1x E1/PRI Gateway",
    deploymentEnv: "Bare Metal Linux / VMware ESXi / Proxmox VE",
  },
  {
    floorSize: "26 – 100 Agent Floor",
    tier: "Mid-Sized / Scaling Agency",
    cpu: "16 Cores (Intel Xeon Silver / AMD EPYC)",
    ram: "32 GB – 64 GB ECC RAM",
    storage: "1 TB NVMe RAID-1 (DB) + 4–8 TB SAS RAID-5 (Voice Audio)",
    network: "Dual 1 Gbps / 10 Gbps SFP+ · ~10 Mbps Dedicated Voice Bandwidth",
    telephony: "Dual SIP Gateway / Multi-Carrier Failover",
    deploymentEnv: "Clustered VM / Docker Compose / Kubernetes",
  },
  {
    floorSize: "100+ Seats / Multi-Tenant",
    tier: "Enterprise / Bank Operations",
    cpu: "32+ Cores (Dual Socket Enterprise)",
    ram: "128 GB+ High-Speed ECC RAM",
    storage: "Enterprise NVMe RAID-10 + S3-Compatible Local MinIO Storage",
    network: "Redundant 10 Gbps SFP+ Fibre with Hardware QoS",
    telephony: "Dedicated Telco Interconnects & High-Capacity SIP Session Border Controllers",
    deploymentEnv: "High-Availability HA Cluster / Private Data Center",
  },
] as const;

export const scopingProcessSteps = [
  {
    step: "01",
    title: "Infrastructure & Server Audit",
    description:
      "Our systems engineers inspect your existing server inventory, CPU architecture, RAM, storage controllers, virtualization hypervisors, and LAN/WAN topology.",
  },
  {
    step: "02",
    title: "Capacity Sizing & Blueprint",
    description:
      "We calculate exact requirements for database throughput, concurrent call channels, voice recording storage retention, and network QoS prioritization.",
  },
  {
    step: "03",
    title: "Turnkey Installation & Hardening",
    description:
      "We containerize and deploy the BITS platform, configure PostgreSQL/Redis replication, interconnect with local telco SIP gateways, and apply strict OS security hardening.",
  },
  {
    step: "04",
    title: "Floor Simulation & UAT Launch",
    description:
      "We run load tests simulating peak dialing volumes, verify failover triggers, test call audio clarity (< 20ms LAN jitter), and train your internal IT operations team.",
  },
] as const;

/* ── Solution Tiers (Consultative Pricing Model) ── */
export const solutionPackages = [
  {
    id: "starter",
    tier: "STARTER",
    badge: "Core Foundation",
    title: "Core Operational Tier",
    tagline: "For boutique recovery teams and specialized agencies replacing disconnected spreadsheets.",
    teamScope: "1 – 15 Seats",
    deployment: "Secure Managed Cloud",
    pricePhp: "₱28,500",
    priceUsd: "$495",
    billingCadence: "/ month baseline",
    pricingModel: "Custom Scoped Baseline",
    pricingSubtext: "Assisted portfolio migration & floor onboarding included",
    roiBenchmark: "Replaces 3–4 disconnected SaaS subscriptions & manual Excel sheets",
    highlights: [
      "Core BITScrm Portfolio & Debtor Engine",
      "Dynamic Delinquency & Status Workflows",
      "Configurable Collector Work Queues",
      "Manual & Preview Dialing Integration",
      "Standard Real-Time Floor Dashboards",
      "Granular Role-Based Access (RBAC)",
      "Immutable Action & Account Audit Trails",
      "Custom CSV/Excel Data Mapping",
      "Direct Technical Implementation Support",
    ],
    primaryCta: "Design Starter Solution",
    popular: false,
  },
  {
    id: "growth",
    tier: "GROWTH",
    badge: "Recommended · Scaling Operations",
    title: "Integrated Scaling Tier",
    tagline: "For scaling agencies requiring integrated communications, auto-dialing, and supervisor QA.",
    teamScope: "16 – 100+ Floor",
    deployment: "High-Availability Cloud + SIP",
    pricePhp: "₱68,000",
    priceUsd: "$1,180",
    billingCadence: "/ month (16–100 seats)",
    pricingModel: "Modular Seat & Volume",
    pricingSubtext: "Volume floor discounts & priority engineering access",
    roiBenchmark: "Cuts agent idle time by 42% via automated dialer & supervisor HUD",
    highlights: [
      "Everything in Starter Tier",
      "WebRTC Browser Softphone & Auto-Dialing",
      "Progressive & Campaign-Paced Dialing",
      "Omnichannel SMS & Email Payment Reminders",
      "Automated Promise-to-Pay (PTP) Engine",
      "Supervisor Live Listen, Whisper & Barge HUD",
      "Standardized QA Scorecards & Worklists",
      "BITSagent AI Voice & Email Operations",
      "Priority Implementation Engineering",
    ],
    primaryCta: "Design Your Solution",
    popular: true,
  },
  {
    id: "enterprise",
    tier: "ENTERPRISE",
    badge: "Bespoke Architecture",
    title: "Enterprise Architecture Tier",
    tagline: "For banks, high-volume BPOs, and organizations with complex security & workflow needs.",
    teamScope: "100+ / Multi-Tenant",
    deployment: "Private VPC / Sovereign / On-Prem",
    pricePhp: "₱185,000+",
    priceUsd: "$3,200+",
    billingCadence: "/ month (dedicated / sovereign)",
    pricingModel: "Master Services Agreement",
    pricingSubtext: "Dedicated Solutions Architect, Custom SLA & Audit",
    roiBenchmark: "Zero per-seat inflation penalties; complete private VPC & data residency",
    highlights: [
      "Everything in Growth Tier",
      "Fully Bespoke Workflow & Schema Engineering",
      "Autonomous BITSagent Inbound/Outbound AI",
      "Custom RAG Business Knowledge Grounding",
      "Dedicated SIP Trunking & Telco Interconnects",
      "Direct Core Banking & Financial Ledger Feeds",
      "Regulatory Audit Scoping (BSP & NPC DPA)",
      "Private Cloud or Sovereign On-Premises",
      "Dedicated Solutions Architect & 99.99% SLA",
    ],
    primaryCta: "Book Architecture Consultation",
    popular: false,
  },
  {
    id: "whitelabel",
    tier: "WHITE LABEL",
    badge: "Custom Branding Add-On",
    title: "White Label Branding Package",
    tagline: "Deploy any BITS product under your own brand — logo, domain, and color identity. Ideal for resellers & enterprise groups.",
    teamScope: "Any Tier",
    deployment: "Cloud or On-Prem (Any)",
    pricePhp: "₱35,000",
    priceUsd: "$650",
    billingCadence: "one-time setup + licensing",
    pricingModel: "Custom Branding License",
    pricingSubtext: "Scoped on top of any Starter, Growth, or Enterprise tier",
    roiBenchmark: "100% brand equity ownership; resell to clients under your own agency brand",
    highlights: [
      "Full Brand Replacement (Logo, Domain, Colors, Typography)",
      "White-Label Any BITS Product or Suite",
      "NDA-Protected — Zero BITS Attribution Required",
      "Custom Client Login Portal with Your Brand",
      "Reseller License to Sell to Your Own Clients",
      "Custom Email Domain & Branded Notifications",
      "Dedicated Subdomain or Full Custom Domain",
      "Priority Engineering for Branded Feature Requests",
      "Full Documentation & Help Center Rebranding",
    ],
    primaryCta: "Request White Label Proposal",
    popular: false,
  },
] as const;

export const pricingComparisonMatrix = [
  {
    category: "Core CRM & Account Engine",
    features: [
      { name: "Debtor & Portfolio Management", starter: "Full Engine", growth: "Full Engine", enterprise: "Custom Schemas" },
      { name: "Dynamic Delinquency Workflows", starter: "Standard DPD", growth: "Multi-Bucket Matrix", enterprise: "Bespoke Logic Engine" },
      { name: "Collector Dynamic Queues", starter: "Filter Based", growth: "Rule-Based Prioritization", enterprise: "Predictive Assignment" },
      { name: "Custom CSV/Excel Data Ingestion", starter: "Standard Mapper", growth: "Automated Batch Watcher", enterprise: "Direct DB & API Pipeline" },
    ],
  },
  {
    category: "Telephony & Communications",
    features: [
      { name: "Telephony Model", starter: "Manual & Preview Dial", growth: "WebRTC Softphone Built-in", enterprise: "Dedicated Telco Interconnects" },
      { name: "Dialing Automation", starter: "Click-to-Dial", growth: "Progressive & Campaign Paced", enterprise: "High-Volume Predictive Dialing" },
      { name: "Call Recording & Storage", starter: "Local / Standard", growth: "Encrypted Cloud Archival", enterprise: "Immutable WORM / On-Prem" },
      { name: "Omnichannel SMS & Email Reminders", starter: "Manual Trigger", growth: "Automated Cadences", enterprise: "Multi-Carrier Gateway Failover" },
    ],
  },
  {
    category: "AI & Floor Automation",
    features: [
      { name: "Promise-to-Pay (PTP) Tracking", starter: "Manual Dispositions", growth: "Automated Breach Alerts", enterprise: "Closed-Loop Clearing Feeds" },
      { name: "BITSagent Conversational Voice AI", starter: "Optional Add-on", growth: "Assisted Call Workflows", enterprise: "Autonomous Outbound & Inbound" },
      { name: "BITSagent Email & SMS Negotiation", starter: "—", growth: "Automated Follow-up", enterprise: "Custom Multi-Turn RAG Grounding" },
      { name: "Real-Time QA & Sentiment Analysis", starter: "—", growth: "Post-Call Transcription", enterprise: "Real-Time Floor Live Stream" },
    ],
  },
  {
    category: "Supervisor & Operations HUD",
    features: [
      { name: "Real-Time Floor Dashboards", starter: "Standard Metrics", growth: "Live Floor Pulse & Queue", enterprise: "Multi-Site Executive Cockpit" },
      { name: "Supervisor Listen, Whisper & Barge", starter: "—", growth: "Browser Softphone HUD", enterprise: "Multi-Floor Remote Monitoring" },
      { name: "QA Scorecards & Agent Audits", starter: "Basic Templates", growth: "Custom Rubrics & Scoring", enterprise: "Automated Compliance Auditing" },
    ],
  },
  {
    category: "Security, Governance & Hosting",
    features: [
      { name: "Role-Based Access Control (RBAC)", starter: "Standard Roles", growth: "Custom Department Roles", enterprise: "Granular Field-Level Permissions" },
      { name: "Audit Trail & Activity Logs", starter: "90 Days Retention", growth: "1 Year Encrypted Retention", enterprise: "Immutable Long-Term WORM Log" },
      { name: "Hosting & Data Sovereignty", starter: "Secure Managed Cloud", growth: "High-Availability Multi-Zone", enterprise: "Private VPC / Sovereign / On-Prem" },
      { name: "Statutory Alignment Scoping", starter: "Standard NPC DPA", growth: "BSP Circulars 454/857, DPA", enterprise: "Full Security & Compliance Scoping" },
      { name: "Service Level Agreement (SLA)", starter: "99.9% Telephony SLA", growth: "99.9% with Priority Queue", enterprise: "99.99% Bespoke Financial SLA" },
      { name: "Implementation & Engineering", starter: "Assisted Onboarding", growth: "Priority Implementation Eng.", enterprise: "Dedicated Solutions Architect" },
    ],
  },
  {
    category: "White Label & Custom Branding",
    features: [
      { name: "Custom Brand Identity (Logo, Domain, Colors)", starter: "Add-On", growth: "Add-On", enterprise: "Full Custom Branding Suite" },
      { name: "Reseller License (Sell to Own Clients)", starter: "—", growth: "Available", enterprise: "Multi-Tier Reseller Program" },
      { name: "NDA-Protected Zero Attribution", starter: "Add-On", growth: "Add-On", enterprise: "Included by Default" },
      { name: "Client Portal Rebranding", starter: "Basic Logo Swap", growth: "Full UI Rebranding", enterprise: "Bespoke Brand Design System" },
    ],
  },
] as const;

/* ── 10 Comprehensive Factual FAQs ── */
export const faqItems = [
  {
    question: "What is BITS and what does the company build?",
    answer:
      "BITS (Boundless IT Solutions) is an enterprise technology company that builds business-specific software, workflow automation, CRM, AI-assisted operations, and digital infrastructure. Our flagship platform, BITScrm, is engineered specifically for collection agencies, BPOs, banks, and lenders to manage high-volume account portfolios, communications, and compliance.",
  },
  {
    question: "Who is BITS designed for?",
    answer:
      "BITS is purpose-built for organizations running operational workflows at scale. Our primary initial clients include BPO companies, debt collection agencies, banks, financial institutions, micro-lending organizations, and growing enterprises that have outgrown manual spreadsheets and off-the-shelf software tools.",
  },
  {
    question: "How does BITS differ from off-the-shelf CRM software?",
    answer:
      "Most commercial CRMs force your organization to adapt your business processes to their rigid templates and generic fields. BITS operates under the mantra 'Your business → your workflow → your technology.' We build and configure the software, database schemas, dynamic queues, and permissions around how your operational floor actually runs.",
  },
  {
    question: "What is the BITS CRM (BITScrm)?",
    answer:
      "BITScrm is our flagship operational platform for customer and debt portfolio management. It unifies delinquent account tracking, campaign configuration, agent work queues, browser SIP softphone calling, multi-channel messaging, supervisor call monitoring (listen/whisper/barge), QA scorecards, and real-time executive analytics in one system.",
  },
  {
    question: "What AI capabilities does BITS provide?",
    answer:
      "Through BITSagent, we provide conversational voice AI agents for customer negotiation and inbound inquiries, automated email and SMS follow-up agents, real-time call QA and sentiment analysis, and retrieval-augmented generation (RAG) that grounds AI interactions strictly in your approved operational manuals and compliance guidelines.",
  },
  {
    question: "Can BITS integrate with our existing legacy systems and telephony?",
    answer:
      "Yes. BITS is built with an API-first architecture designed to connect with existing infrastructure without requiring expensive rip-and-replace overhauls. We support direct integration with SIP telephony providers, telecom SMS gateways, payment clearinghouses, core banking databases, and custom Excel/CSV portfolio ingestion formats.",
  },
  {
    question: "Can BITS build custom internal systems and proprietary workflows?",
    answer:
      "Absolutely. Beyond our core CRM and AI capabilities, BITS functions as an engineering partner to build bespoke operational portals, custom scoring algorithms, specialized data pipelines, and internal company tools tailored to your unique operational requirements.",
  },
  {
    question: "How does BITS approach security, data privacy, and compliance?",
    answer:
      "Security is foundational to our architecture. We implement granular role-based access control (RBAC), campaign tenant scoping, immutable activity and supervisory audit trails, and configurable quiet-hour and contact-frequency rules aligned with the principles of Bangko Sentral ng Pilipinas (BSP) Circulars 454/857 and Republic Act 10173 (Philippine Data Privacy Act). We also support private cloud and on-premises deployments for organizations with strict data residency mandates.",
  },
  {
    question: "How does the implementation process and onboarding work?",
    answer:
      "We follow a disciplined 5-step methodology: Understand, Design, Build, Deploy, and Improve. We begin by analyzing your actual floor operations, translate those processes into a technical specification, configure and test the software, execute controlled data migration, train your agents and supervisors, and provide ongoing continuous optimization.",
  },
  {
    question: "Can BITS be deployed On-Premises or on Cloud, and what do you recommend?",
    answer:
      "All BITS systems can be deployed both On-Premises and on Cloud. We strongly recommend our Managed Cloud deployment for rapid 1–2 week activation, automated zero-downtime scaling, high-availability multi-region redundancy, and continuous security maintenance with zero IT hardware overhead. For enterprises with strict sovereign data residency mandates, regulated banking enclaves, or existing bare-metal server infrastructure, we provide comprehensive hardware scoping, on-site setup, and turnkey on-premises deployment.",
  },
  {
    question: "Do BITS systems receive continuous updates, and how are new technology and security improvements handled?",
    answer:
      "Yes. All BITS systems receive continuous architectural, compliance, and security improvements as part of our standard lifecycle. When newer security standards (such as BSP Circulars, NPC Data Privacy guidelines, ISO 27001, and OWASP CVE mitigations) and advancing technologies (such as faster LLM inference, lower-latency voice synthesis, or updated framework libraries) become available, they are proactively integrated into the platform. Clients may also request bespoke custom operational features or specialized third-party integrations at any time (scoping and development costs vary based on requirement complexity).",
  },
  {
    question: "What is the BITS Smart NFC Business Card and how does it work?",
    answer:
      "The BITS Smart NFC Business & Identity Card is an all-in-one digital identity replacement for traditional paper business cards. Utilizing an encrypted contactless chip, a single tap against any modern smartphone (iOS or Android) instantly displays your digital identity profile—including your contact information (with one-click .vCard saving), company website, social media profiles, portfolio, meeting schedulers, and payment links—with zero recipient app installation required. You only ever need 1 card: all information can be updated dynamically in real-time through our web portal without reprinting, and the card can be remotely frozen instantly if misplaced or stolen.",
  },
  {
    question: "Can we white-label BITS software under our own brand?",
    answer:
      "Yes. With the BITS White Label Platform, you can deploy any BITS product—including CRM, ERP, HRMS, Payroll, Booking, Queuing, Accounting, AI Agents, or NFC Cards—completely rebranded under your own company's logo, custom domain (yourbrand.com), and brand color palette with zero mention of BITS. You maintain 100% ownership of your customer relationships while BITS powers the infrastructure quietly behind the scenes.",
  },
  {
    question: "How are BITS solutions packaged and how do we get started?",
    answer:
      "We offer modular Solution Tiers—Starter, Growth, and Enterprise—tailored to your team size, workflow complexity, and communication volume. Because our solutions adapt to your exact operational requirements, we begin with a technical consultation to review your current processes and provide an exact blueprint. You can book a consultation directly through the form below.",
  },
] as const;

/* ── Consultation Form Options ── */
export const consultationOptions = {
  companySizes: [
    "1 - 15 seats",
    "16 - 50 seats",
    "51 - 200 seats",
    "200+ seats",
    "Enterprise / Multi-location",
  ],
  industries: [
    "BPO / Contact Center",
    "Debt Collection Agency",
    "Bank / Financial Institution",
    "Lending & Fintech",
    "Construction & Supply Chain",
    "Sports Venue, Club & Hospitality",
    "Smart NFC & Identity Card Solutions",
    "Growing Business / Enterprise",
    "Other Operational Business",
  ],
  currentSystems: [
    "Spreadsheets (Excel / Google Sheets)",
    "Legacy In-House Software",
    "Generic Commercial CRM",
    "Multiple Disconnected Tools",
    "New Operation / In Planning",
  ],
  primaryChallenges: [
    "Manual repetitive workflows & Excel dependency",
    "Low right-party contact rates & broken PTP defaults",
    "Disconnected tools & lack of operational visibility",
    "Compliance tracking & audit trail governance",
    "Need to scale operations without hiring linearly",
    "Smart NFC identity card & paperless networking",
    "White label & custom branding requirements",
    "Custom proprietary workflow requirements",
  ],
  preferredMethods: [
    "Video Consultation (Google Meet)",
    "Phone Call",
    "Email Review & Proposal",
    "In-Person Meeting (Metro Manila)",
  ],
} as const;

/* ── Legacy compatibility exports ── */
export const solutions = [
  {
    id: "portfolio",
    index: "01",
    name: "Portfolio & Account Management",
    summary: "Replace disconnected spreadsheets and scattered account work with one controlled operational system.",
    description: "Centralize debtor and debt-account records, balances, statuses, assignments, history, and portfolio attributes in one workspace.",
    capabilities: ["Client and campaign configuration", "Debtor and debt-account records", "Balances, statuses, and history", "Agent and team assignment", "Work queues and account lookup", "Controlled bulk actions"],
  },
  {
    id: "workflows",
    index: "02",
    name: "Configurable Collections Workflows",
    summary: "Adapt the workflow to the campaign—not the other way around.",
    description: "Turn collection policies into repeatable workflows with configurable dispositions, queues, strategies, promise-to-pay handling, and follow-up rules.",
    capabilities: ["Disposition statuses and reasons", "Promise-to-pay and follow-up", "Broken-PTP workflows", "Strategy rules and conditional pools", "Inactivity controls"],
  },
  {
    id: "engagement",
    index: "03",
    name: "Customer Engagement, From One Workspace",
    summary: "Give agents connected tools for calls and customer messaging without leaving the account workflow.",
    description: "Support manual, preview, progressive, and infrastructure-dependent predictive dialing alongside configurable messaging providers.",
    capabilities: ["Browser-based SIP softphone", "Manual, preview, and progressive dialing", "Email, SMS, and configured channels", "Templates and merge fields", "Communication history"],
  },
] as const;

export const featureGridItems = [
  {
    icon: "briefcase" as const,
    title: "Portfolio Management",
    description: "Centralize debtor records, balances, statuses, assignments, and history in one operational workspace.",
    features: ["Campaign configuration", "Account lookup & queues", "Bulk actions", "Account archiving"],
  },
  {
    icon: "workflow" as const,
    title: "Workflow Engine",
    description: "Turn collection policies into repeatable workflows with configurable dispositions and strategies.",
    features: ["Disposition management", "PTP & follow-up", "Strategy rules", "Inactivity controls"],
  },
  {
    icon: "messageSquare" as const,
    title: "Customer Engagement",
    description: "Connected tools for calls and messaging without leaving the account workflow.",
    features: ["SIP softphone", "Multi-channel messaging", "Templates & merge fields", "Communication history"],
  },
  {
    icon: "eye" as const,
    title: "Live Supervision",
    description: "Real-time visibility into active calls with controlled monitoring and coaching capabilities.",
    features: ["Listen, whisper, barge", "Monitoring sessions", "Audit history", "Permission controls"],
  },
  {
    icon: "checkCircle" as const,
    title: "Quality Assurance",
    description: "Turn QA into a repeatable process with evaluations, scorecards, and agent analysis.",
    features: ["QA scorecards", "Audit worklists", "Agent outlier analysis", "Activity linkage"],
  },
  {
    icon: "barChart" as const,
    title: "Reporting & Analytics",
    description: "Operational dashboards covering portfolios, agents, payments, calls, and campaigns.",
    features: ["Operational dashboard", "Agent productivity", "Payment reporting", "Exportable data"],
  },
] as const;

export const aiAgents = [
  {
    name: "Auto-Dialer Agent",
    description: "Intelligent dialing that prioritizes accounts based on PTP history, contact patterns, and campaign rules.",
    status: "Active",
    metric: "3.2x more connects",
  },
  {
    name: "Smart Follow-Up Agent",
    description: "Automated follow-up scheduling based on promise-to-pay outcomes and debtor behavior patterns.",
    status: "Active",
    metric: "45% faster follow-up",
  },
  {
    name: "Payment Negotiation Agent",
    description: "Guided payment arrangement workflows with configurable negotiation parameters and approval rules.",
    status: "Active",
    metric: "28% higher PTP rate",
  },
  {
    name: "QA Analysis Agent",
    description: "Automated quality scoring suggestions based on configurable criteria and call activity patterns.",
    status: "Beta",
    metric: "60% less review time",
  },
] as const;

export const pricingTiers = [
  {
    id: "starter" as const,
    name: "Starter",
    tagline: "For small collections teams and focused recovery campaigns.",
    price: 1850,
    priceLabel: "₱1,850",
    priceSubtext: "per agent / month · billed annually",
    popular: false,
    cta: "Book a Consultation",
    features: [
      "Core Collections Engine",
      "Delinquency Account Workflows",
      "Dynamic Work Queues",
      "Manual & Preview Dialing Ready",
      "Standard Performance Reporting",
      "Email & In-App Support",
      "Up to 15 agent seats",
    ],
  },
  {
    id: "professional" as const,
    name: "Growth",
    tagline: "For growing agencies and mid-market operations with dialer & QA.",
    price: 3200,
    priceLabel: "₱3,200",
    priceSubtext: "per agent / month · dialer & AI included",
    popular: true,
    cta: "Design Your Solution",
    features: [
      "Everything in Starter",
      "Built-in Browser SIP Softphone",
      "Predictive & Progressive Auto-Dialer",
      "Omnichannel SMS & Email Reminders",
      "QA Scorecards & Evaluation Worklists",
      "Live Supervisor Listen, Whisper & Barge",
      "AI Smart Follow-Up & PTP Tracking",
      "Unlimited agent seats",
    ],
  },
  {
    id: "enterprise" as const,
    name: "Enterprise",
    tagline: "For commercial banks, financial institutions, and high-volume BPOs.",
    price: null,
    priceLabel: "Custom",
    priceSubtext: "volume tiers · cloud or on-prem",
    popular: false,
    cta: "Book an Architecture Consultation",
    features: [
      "Everything in Growth",
      "Full Autonomous AI Recovery Agents",
      "Custom Workflow & Disposition Engines",
      "Dedicated SIP Trunking & Telco Routing",
      "On-Premises or Private Cloud Hosting",
      "BSP Circular & NPC Regulatory Auditing",
      "Dedicated Solutions Architect & 99.99% SLA",
      "Unlimited agent seats & multi-tenancy",
    ],
  },
] as const;

export const bitsAgentPricingTiers = [
  {
    id: "launch" as const,
    name: "Launch",
    tagline: "For teams starting AI voice agents on a focused use case.",
    priceLabel: "₱2.80",
    priceSubtext: "per AI-handled minute · no seat limits",
    popular: false,
    cta: "Book a Consultation",
    features: [
      "Up to 5,000 AI minutes / month",
      "Voice agent — outbound calling",
      "Email agent — outbound sequences",
      "Collections & PTP negotiation scripts",
      "BSP / NPC consent handling",
      "Standard reporting dashboard",
      "Email & chat support",
    ],
  },
  {
    id: "scale" as const,
    name: "Scale",
    tagline: "For growing operations replacing or augmenting a human call floor.",
    priceLabel: "₱2.20",
    priceSubtext: "per AI-handled minute · volume discounts apply",
    popular: true,
    cta: "Design Your Solution",
    features: [
      "Unlimited AI minutes",
      "Voice · Email · SMS agents",
      "Custom negotiation parameters",
      "Multi-campaign concurrent execution",
      "Live escalation to human agents",
      "QA call scoring & sentiment analysis",
      "Dedicated onboarding engineer",
    ],
  },
  {
    id: "enterprise-agent" as const,
    name: "Enterprise",
    tagline: "For banks, large BPOs, and high-volume multilingual deployments.",
    priceLabel: "Custom",
    priceSubtext: "volume + concurrent channel pricing",
    popular: false,
    cta: "Book an Architecture Consultation",
    features: [
      "Everything in Scale",
      "Custom voice persona & accent",
      "Multilingual support (EN/FIL/+)",
      "On-premises or private cloud",
      "Custom compliance & audit exports",
      "99.99% uptime SLA",
      "Dedicated 24/7 support team",
    ],
  },
] as const;

export const suiteBundleFeatures = [
  "BITScrm Growth — full CRM, dialer, QA & reporting",
  "BITSagent Scale — unlimited AI voice, email & SMS agents",
  "Shared account & portfolio data between CRM and Agent",
  "Unified compliance dashboard (BSP / NPC aligned)",
  "Single vendor, single contract, single support line",
  "Priority onboarding & implementation engineering",
  "Volume-based minute pricing + consultative sizing",
] as const;

export const agents = [
  { name: "Core Collections", role: "Portfolios, accounts, assignments, queues, PTP, payments, and reporting." },
  { name: "Messaging", role: "SMS, email, templates, blasts, provider integrations, and communication history." },
  { name: "Quality Assurance", role: "Scorecards, evaluations, audit worklists, agent analysis, and quality reporting." },
  { name: "Dialer + Live Assist", role: "Softphone, dialing modes, listen, whisper, and barge with permission boundaries." },
] as const;

export const industries = [
  { index: "01", id: "bpo" as const, name: "BPO & Contact Centers", copy: "Multi-client campaigns, tenant isolation, supervisor monitoring, and high-volume customer workflows.", tags: ["Multi-Campaign", "Softphone & Dialer", "Agent QA", "SLA Reporting", "Client Portals"], cta: "Book a Consultation" },
  { index: "02", id: "collections" as const, name: "Collection Agencies", copy: "Delinquency tracking, Promise-to-Pay enforcement, broken PTP reallocation, and automated outreach.", tags: ["DPD Tracking", "PTP Enforcement", "Auto-Dialing", "Payment Receipts", "Performance Analytics"], cta: "Design Your Solution" },
  { index: "03", id: "financial" as const, name: "Banks & Financial Institutions", copy: "Security-conscious operational workflows with granular RBAC, immutable audit trails, and on-premises options.", tags: ["Granular RBAC", "Immutable Audits", "BSP/NPC Alignment", "Data Isolation", "Private Cloud / On-Prem"], cta: "Talk to Solutions Architect" },
  { index: "04", id: "growing" as const, name: "Growing Operational Businesses", copy: "Custom operational software, workflow automation, and proprietary systems designed around your real processes.", tags: ["Custom Software", "Workflow Automation", "Legacy Modernization", "BI Dashboards", "API Integrations"], cta: "Explore Custom Systems" },
] as const;

export const principles = [
  { name: "Collections", copy: "Centralize portfolios, accounts, assignments, queues, PTP, and payments." },
  { name: "Messaging", copy: "Connect configured communication providers and preserve account-level history." },
  { name: "QA + Live Assist", copy: "Review quality and support active calls within clear permission boundaries." },
  { name: "Reporting", copy: "Track account, agent, campaign, payment, call, and activity outcomes." },
] as const;

export const securityPrinciples = [
  { name: "Role-based access", copy: "Grant access strictly according to each user's authenticated operational role." },
  { name: "Campaign scoping", copy: "Keep team members and debtor records strictly within configured campaign boundaries." },
  { name: "Contact controls", copy: "Automate quiet hours, contact frequency limits, do-not-call, and cease-desist rules." },
  { name: "Auditability", copy: "Preserve immutable activity, authentication, communication, and supervisor monitoring history." },
  { name: "Monitoring permissions", copy: "Strictly govern who can listen, whisper, or barge into active customer calls." },
  { name: "Optional TOTP", copy: "Time-based one-time password two-factor authentication for sensitive accounts." },
  { name: "Modular access", copy: "Enable only the features and data endpoints required for each specific deployment." },
] as const;

export const capabilities = [
  "Campaign imports",
  "Account imports",
  "Payment imports",
  "Reusable mapping templates",
  "Upload logs",
  "Validation feedback",
  "Bulk updates",
  "Debtor matching",
  "Duplicate workflows",
  "Field worklists",
] as const;

export const processSteps = [
  { index: "01", name: "Understand", copy: "We study your operation, workflows, pain points, compliance boundaries, and goals." },
  { index: "02", name: "Design", copy: "We translate your processes into a technical blueprint, data schema, and workflow architecture." },
  { index: "03", name: "Build", copy: "We develop the software, automation engines, integrations, and AI capabilities." },
  { index: "04", name: "Deploy", copy: "We configure environments, execute data migration, test thoroughly, and train your floor." },
  { index: "05", name: "Improve", copy: "We continuously optimize and evolve the technology as your business expands." },
] as const;

export const contactInterests = [
  "BITScrm — Collections & Operations Core",
  "BITSagent — Conversational Voice AI",
  "BITSagent — Autonomous Email & SMS",
  "BITS Suite (CRM + AI Operations)",
  "Workflow Automation & System Integrations",
  "Custom Software & Digital Infrastructure",
  "Enterprise Private Cloud / On-Premises",
  "General Operational Consultation",
] as const;

export const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "BITScrm Platform", href: "/bitscrm" },
      { label: "AI Operations (BITSagent)", href: "/bitsagent" },
      { label: "The Difference", href: "/#the-difference" },
      { label: "Solutions Ecosystem", href: "/#ecosystem" },
      { label: "Methodology", href: "/#methodology" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "BPO & Contact Centers", href: "/#industries" },
      { label: "Debt Collection Agencies", href: "/#industries" },
      { label: "Banks & Financial Institutions", href: "/#industries" },
      { label: "Custom Software Engineering", href: "/#custom-systems" },
      { label: "Solution Tiers", href: "/#solutions" },
    ],
  },
  {
    title: "Governance",
    links: [
      { label: "Security Architecture", href: "/#security" },
      { label: "Statutory Alignment", href: "/#security" },
      { label: "Privacy Policy", href: "/legal#privacy" },
      { label: "Terms of Service", href: "/legal#terms" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About BITS", href: "/#the-difference" },
      { label: "Book a Consultation", href: "/#contact" },
      { label: "CRM Sign in", href: "/login" },
      { label: "bits_inquiries@boundlessits.com", href: "mailto:bits_inquiries@boundlessits.com" },
    ],
  },
] as const;
