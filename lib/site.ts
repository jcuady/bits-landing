export const site = {
  name: "BITS",
  legalName: "BITS - Boundless IT Solutions",
  tagline: "Technology Without Limits.",
  // Production Vercel alias. Point this to the custom domain when connected.
  url: "https://bits-landing.vercel.app",
  description:
    "BITS builds secure, scalable technology solutions for BPOs, financial organizations and modern enterprises: from custom CRM platforms to intelligent automation and AI-powered workflows.",
} as const;

export const navItems = [
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "AI & Automation", href: "#automation" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#product" },
] as const;

export const solutions = [
  {
    id: "bpo-crm",
    index: "01",
    name: "BPO CRM",
    flagship: true,
    summary:
      "A CRM platform designed around real contact-center operations, not the other way around.",
    description:
      "Built around the way agents, team leads and QA specialists actually work. Customer history, interactions, tickets and reporting live in one system designed to support high-volume teams.",
    capabilities: [
      "Customer & account management",
      "Agent workflows",
      "Interactions & ticketing",
      "Task management",
      "Reporting & QA workflows",
      "Integrations",
    ],
  },
  {
    id: "financial",
    index: "02",
    name: "Financial & Banking Solutions",
    flagship: false,
    summary:
      "Controlled workflows for operations where precision and visibility matter.",
    description:
      "Operational platforms designed around approval processes, internal controls and audit-friendly records, engineered to integrate with the systems you already run.",
    capabilities: [
      "Approval processes",
      "Internal operational platforms",
      "Workflow automation",
      "Audit-friendly records",
      "System integration",
    ],
  },
  {
    id: "ai-automation",
    index: "03",
    name: "AI & Automation",
    flagship: false,
    summary:
      "Intelligent automation that augments your team instead of sidelining it.",
    description:
      "AI agents and automation designed to handle repetitive work, surface the right information and route exceptions to people. Every workflow ships with human escalation and oversight.",
    capabilities: [
      "AI customer-service agents",
      "Level 1 support automation",
      "QA automation",
      "Conversation intelligence",
      "Intelligent routing",
      "Knowledge assistants",
    ],
  },
] as const;

export const agents = [
  {
    name: "Customer Service Agent",
    role: "Handles routine inquiries, prepares responses and resolves Level 1 requests.",
  },
  {
    name: "QA Agent",
    role: "Reviews interactions against your scorecards and flags conversations for human review.",
  },
  {
    name: "Knowledge Agent",
    role: "Retrieves the right answer from your approved knowledge base, with sources.",
  },
  {
    name: "Operations Agent",
    role: "Monitors queues and back-office processes, surfacing exceptions early.",
  },
  {
    name: "Workflow Agent",
    role: "Moves work between systems: creating tickets, updating records, triggering approvals.",
  },
] as const;

export const industries = [
  {
    index: "01",
    name: "BPO & Contact Centers",
    copy: "Give teams better visibility, smarter workflows, and technology built around real contact-center operations.",
    tags: ["CRM", "Agent workflows", "QA", "Reporting", "Omnichannel"],
  },
  {
    index: "02",
    name: "Banking & Financial Services",
    copy: "Modernize operational workflows with carefully engineered platforms designed around control, visibility, and scale.",
    tags: ["Approvals", "Audit trails", "Internal platforms", "Integration"],
  },
  {
    index: "03",
    name: "Growing Enterprises",
    copy: "Replace disconnected workflows with systems designed around how your organization actually operates.",
    tags: ["Custom platforms", "Automation", "Data", "AI agents"],
  },
] as const;

export const principles = [
  {
    name: "Understand",
    copy: "We begin with the operation, not the technology. Workflows, constraints and people come first.",
  },
  {
    name: "Design",
    copy: "Workflows and experiences are designed around real users, then validated with your team.",
  },
  {
    name: "Build",
    copy: "Systems are engineered for maintainability and growth, shipped in increments you can test.",
  },
  {
    name: "Evolve",
    copy: "BITS continues improving the platform as the organization changes.",
  },
] as const;

export const securityPrinciples = [
  {
    icon: "key",
    name: "Role-based access",
    copy: "People see exactly what their role requires, and nothing more.",
  },
  {
    icon: "lock",
    name: "Least privilege",
    copy: "Permissions start at zero and expand only when the work demands it.",
  },
  {
    icon: "shield",
    name: "Secure authentication",
    copy: "Modern sign-in practices, session controls and credential hygiene.",
  },
  {
    icon: "audit",
    name: "Auditability",
    copy: "Meaningful actions leave a trace your team can review.",
  },
  {
    icon: "database",
    name: "Data protection",
    copy: "Encryption in transit and at rest, with disciplined data handling.",
  },
  {
    icon: "plug",
    name: "Controlled integrations",
    copy: "External systems connect through reviewed, documented interfaces.",
  },
  {
    icon: "human",
    name: "Human oversight for AI",
    copy: "Sensitive AI workflows escalate to people by design, not by exception.",
  },
  {
    icon: "resilient",
    name: "Resilient architecture",
    copy: "Backup and recovery planning built into every engagement.",
  },
] as const;

export const capabilities = [
  "Internal platforms",
  "Enterprise applications",
  "CRM systems",
  "Workflow systems",
  "Automation",
  "AI agents",
  "Dashboards",
  "Integrations",
  "Data platforms",
  "Custom operational software",
] as const;

export const processSteps = [
  {
    index: "01",
    name: "Discover",
    copy: "We map your operation: workflows, systems, constraints, and the people who run them every day.",
  },
  {
    index: "02",
    name: "Design",
    copy: "Workflows and interfaces are designed around real users, then validated with your team before build.",
  },
  {
    index: "03",
    name: "Build",
    copy: "We engineer in increments, shipping working software your team can test early and often.",
  },
  {
    index: "04",
    name: "Evolve",
    copy: "After launch, we keep improving the platform as your organization grows and changes.",
  },
] as const;

export const contactInterests = [
  "BPO CRM",
  "Banking / Financial Systems",
  "AI & Automation",
  "Custom Software",
  "Systems Integration",
  "Other",
] as const;

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "BPO CRM", href: "#solutions" },
      { label: "Financial & Banking", href: "#solutions" },
      { label: "AI & Automation", href: "#automation" },
      { label: "Custom Software", href: "#custom" },
      { label: "Systems Integration", href: "#custom" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "BPO & Contact Centers", href: "#industries" },
      { label: "Banking & Financial Services", href: "#industries" },
      { label: "Growing Enterprises", href: "#industries" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Why BITS", href: "#about" },
      { label: "Security", href: "#security" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Product Experience", href: "#product" },
      { label: "Delivery Process", href: "#process" },
      { label: "CRM Sign in", href: "/login" },
      { label: "Privacy", href: "/legal#privacy" },
      { label: "Terms", href: "/legal#terms" },
    ],
  },
] as const;
