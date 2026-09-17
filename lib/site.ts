export const site = {
  name: "BITS",
  legalName: "BITS - Boundless IT Solutions",
  tagline: "Technology Without Limits.",
  url: "https://bits-landing.vercel.app",
  description:
    "Collections CRM & operations platform with built-in dialer, AI agents, QA, and reporting. Manage portfolios, workflows, and customer communications in one workspace. Request a demo.",
} as const;

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#product" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

/* ── Hero platform benchmarks ── */
export const heroStats = [
  { value: "3.2x", label: "Faster Right-Party Connects" },
  { value: "99.9%", label: "High-Availability Telephony SLA" },
] as const;

/* ── Stats strip ── */
export const stats = [
  { value: "3.2x", label: "Higher Right-Party Contact Rate", icon: "building" as const },
  { value: "45%", label: "Reduction in Broken PTP Defaults", icon: "users" as const },
  { value: "99.9%", label: "High-Availability Infrastructure SLA", icon: "headset" as const },
] as const;

/* ── Core platform solutions ── */
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

/* ── Feature grid items ── */
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

/* ── AI Agents ── */
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

/* ── Pricing tiers ── */
export const pricingTiers = [
  {
    id: "starter" as const,
    name: "Starter",
    tagline: "For small collections teams and focused recovery campaigns.",
    price: 1850,
    priceLabel: "₱1,850",
    priceSubtext: "per agent / month · billed annually",
    popular: false,
    cta: "Start 14-Day Free Pilot",
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
    name: "Professional",
    tagline: "For growing agencies and mid-market operations with dialer & QA.",
    price: 3200,
    priceLabel: "₱3,200",
    priceSubtext: "per agent / month · dialer & AI included",
    popular: true,
    cta: "Request Demo & Pilot",
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
    cta: "Talk to Solutions Architect",
    features: [
      "Everything in Professional",
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

export const agents = [
  { name: "Core Collections", role: "Portfolios, accounts, assignments, queues, PTP, payments, and reporting." },
  { name: "Messaging", role: "SMS, email, templates, blasts, provider integrations, and communication history." },
  { name: "Quality Assurance", role: "Scorecards, evaluations, audit worklists, agent analysis, and quality reporting." },
  { name: "Dialer + Live Assist", role: "Softphone, dialing modes, listen, whisper, and barge with permission boundaries." },
] as const;

export const industries = [
  { index: "01", id: "small" as const, name: "Small Teams", copy: "For small collections teams, focused campaigns, and core portfolio operations.", tags: ["Core Collections", "Account Management", "Agent Workflows", "Basic Reporting", "Standard Support"], cta: "Talk to Us" },
  { index: "02", id: "medium" as const, name: "Growing Teams", copy: "For growing, multi-team operations that need connected communication and quality workflows.", tags: ["Core Collections", "Messaging", "Dialer", "Quality Assurance", "Advanced Reporting"], cta: "Request a Demo" },
  { index: "03", id: "large" as const, name: "Enterprise", copy: "For high-volume collections, complex deployments, and broader operational customization.", tags: ["Multi-client support", "Custom Workflows", "All Modules", "On-premises Options", "Dedicated Implementation"], cta: "Talk to Sales" },
] as const;

export const principles = [
  { name: "Collections", copy: "Centralize portfolios, accounts, assignments, queues, PTP, and payments." },
  { name: "Messaging", copy: "Connect configured communication providers and preserve account-level history." },
  { name: "QA + Live Assist", copy: "Review quality and support active calls within clear permission boundaries." },
  { name: "Reporting", copy: "Track account, agent, campaign, payment, call, and activity outcomes." },
] as const;

export const securityPrinciples = [
  { name: "Role-based access", copy: "Grant access according to each person's operational role." },
  { name: "Campaign scoping", copy: "Keep teams and records within configured campaign boundaries." },
  { name: "Contact controls", copy: "Support contact limits, quiet hours, do-not-call, and cease-desist handling." },
  { name: "Auditability", copy: "Preserve activity, access, communication, and monitoring history." },
  { name: "Monitoring permissions", copy: "Control who can listen, whisper, or barge into active calls." },
  { name: "Optional TOTP", copy: "Add time-based one-time password authentication where configured." },
  { name: "Modular access", copy: "Enable only the capabilities required for each deployment and role." },
] as const;

export const capabilities = ["Campaign imports", "Account imports", "Payment imports", "Reusable mapping templates", "Upload logs", "Validation feedback", "Bulk updates", "Debtor matching", "Duplicate workflows", "Field worklists"] as const;

export const processSteps = [
  { index: "01", name: "Import & Organize", copy: "Bring portfolios, accounts, and operational data into the platform." },
  { index: "02", name: "Configure Campaigns", copy: "Set dispositions, strategies, queues, rules, and workflows." },
  { index: "03", name: "Route Work", copy: "Deliver the right accounts and next actions to agents and teams." },
  { index: "04", name: "Contact & Follow Up", copy: "Use calls, messages, PTP, payments, and activity workflows." },
  { index: "05", name: "Review & Improve", copy: "Monitor quality, productivity, payments, activity, and campaign performance." },
] as const;

export const contactInterests = ["Core Collections", "Messaging", "Dialer", "Quality Assurance", "AI Agents", "Large / On-premises", "Other"] as const;

export const footerColumns = [
  { title: "Platform", links: [{ label: "Features", href: "#features" }, { label: "AI Agents", href: "#ai-agents" }, { label: "Product Experience", href: "#product" }, { label: "How It Works", href: "#process" }] },
  { title: "Pricing", links: [{ label: "Starter", href: "#pricing" }, { label: "Professional", href: "#pricing" }, { label: "Enterprise", href: "#pricing" }, { label: "Custom Quote", href: "#contact" }] },
  { title: "Company", links: [{ label: "About", href: "#about" }, { label: "Security", href: "#security" }, { label: "Contact", href: "#contact" }] },
  { title: "Resources", links: [{ label: "Request a Demo", href: "#contact" }, { label: "CRM Sign in", href: "/login" }, { label: "Privacy", href: "/legal#privacy" }, { label: "Terms", href: "/legal#terms" }] },
] as const;
