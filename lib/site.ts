export const site = {
  name: "BITS",
  legalName: "BITS - Boundless IT Solutions",
  tagline: "Technology Without Limits.",
  // Production Vercel alias. Point this to the custom domain when connected.
  url: "https://bits-landing.vercel.app",
  description:
    "BITS builds BPO CRM, finance operations platforms, and AI automation with human oversight for contact-center and enterprise floors. Request a consultation.",
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
      "Contact-center CRM for agents, team leads, and QA. Customer history, interactions, tickets, and reporting live in one system for high-volume floors.",
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
      "Approval-led platforms for banking and finance operations that need an audit trail.",
    description:
      "Workflows around approvals, internal controls, and records you can show an auditor, built to sit beside the systems you already run.",
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
      "Automation that takes repetitive work and routes exceptions to people.",
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
    id: "bpo",
    name: "BPO & Contact Centers",
    copy: "Contact-center CRM for agents, team leads, and QA. Tickets, history, and reporting in one floor queue instead of five tools.",
    tags: ["CRM", "Agent workflows", "QA", "Reporting", "Omnichannel"],
    cta: "Book a contact-center consultation",
  },
  {
    index: "02",
    id: "banking",
    name: "Banking & Financial Services",
    copy: "Approval-led platforms for finance operations that need an audit trail, built to sit beside the systems you already run.",
    tags: ["Approvals", "Audit trails", "Internal platforms", "Integration"],
    cta: "Book a finance systems consultation",
  },
  {
    index: "03",
    id: "enterprises",
    name: "Growing Enterprises",
    copy: "Replace disconnected spreadsheets and chat with systems designed around how your teams already work.",
    tags: ["Custom platforms", "Automation", "Data", "AI agents"],
    cta: "Book an operations consultation",
  },
] as const;

export const principles = [
  {
    name: "Understand",
    copy: "Map the floor first: agents, leads, QA, and controllers. Technology comes second.",
  },
  {
    name: "Design",
    copy: "Sketch the workflow with the people who will use it, then validate it on their desk.",
  },
  {
    name: "Build",
    copy: "Ship in increments you can test on live work, not a six-month black box.",
  },
  {
    name: "Evolve",
    copy: "Keep the platform current as queues, policies, and headcount change.",
  },
] as const;

export const securityPrinciples = [
  {
    name: "Role-based access",
    copy: "People see exactly what their role requires, and nothing more.",
  },
  {
    name: "Least privilege",
    copy: "Permissions start at zero and expand only when the work demands it.",
  },
  {
    name: "Secure authentication",
    copy: "Sign-in practices, session controls, and credential hygiene from day one.",
  },
  {
    name: "Auditability",
    copy: "Meaningful actions leave a trail your team can review.",
  },
  {
    name: "Data protection",
    copy: "Encryption in transit and at rest, with disciplined data handling.",
  },
  {
    name: "Controlled integrations",
    copy: "External systems connect through reviewed, documented interfaces.",
  },
  {
    name: "Human oversight for AI",
    copy: "Sensitive AI work escalates to people by design, not as an afterthought.",
  },
  {
    name: "Resilient architecture",
    copy: "Backup and recovery planning built into every engagement.",
  },
] as const;

export const capabilities = [
  "Internal platforms",
  "Enterprise applications",
  "Contact-center CRM",
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
      { label: "BPO CRM", href: "#bpo-crm" },
      { label: "Financial & Banking", href: "#financial" },
      { label: "AI & Automation", href: "#automation" },
      { label: "Custom Software", href: "#custom" },
      { label: "Systems Integration", href: "#custom" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "BPO & Contact Centers", href: "#bpo" },
      { label: "Banking & Financial Services", href: "#banking" },
      { label: "Growing Enterprises", href: "#enterprises" },
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
