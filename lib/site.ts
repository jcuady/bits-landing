export const site = {
  name: "BITS",
  legalName: "BITS - Boundless IT Solutions",
  tagline: "Technology built around the way your business actually operates.",
  url: "https://bits-landing.vercel.app",
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
      heading: "Platform & Products",
      items: [
        {
          title: "BITScrm Platform",
          badge: "Flagship CRM",
          description: "Collections & operations CRM with WebRTC softphone & QA.",
          href: "/bitscrm",
          icon: "crm" as const,
        },
        {
          title: "BITSagent AI",
          badge: "Autonomous AI",
          description: "Conversational voice agents, email outreach & call QA.",
          href: "/bitsagent",
          icon: "ai" as const,
        },
        {
          title: "Solutions Ecosystem",
          badge: "6 Pillars",
          description: "Unified stack combining CRM, automation, AI & analytics.",
          href: "/#ecosystem",
          icon: "layers" as const,
        },
        {
          title: "The Difference",
          badge: "Built For You",
          description: "Why tailored operational architecture beats generic SaaS.",
          href: "/#the-difference",
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
    pricingModel: "Custom Scoped Baseline",
    pricingSubtext: "Assisted portfolio migration & floor onboarding included",
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
    pricingModel: "Modular Seat & Volume",
    pricingSubtext: "Volume floor discounts & priority engineering access",
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
    pricingModel: "Master Services Agreement",
    pricingSubtext: "Dedicated Solutions Architect, Custom SLA & Audit",
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
