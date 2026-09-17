/* Synthetic specimen data for marketing sections. Never use real customer data. */

export const collectionAccounts = [
  { id: "ACC-10482", campaign: "Auto Loan Recovery", balance: "₱64,250", status: "PTP Kept (₱15K)", owner: "M. Ramos" },
  { id: "ACC-10817", campaign: "SME Working Capital", balance: "₱142,800", status: "Follow-up Queued", owner: "J. Santos" },
  { id: "ACC-11209", campaign: "Credit Line D60", balance: "₱38,400", status: "Broken PTP Alert", owner: "A. Luna" },
  { id: "ACC-11342", campaign: "Consumer Microfinance", balance: "₱18,750", status: "Restructure Review", owner: "S. Garcia" },
  { id: "ACC-11587", campaign: "Commercial Revolving", balance: "₱92,500", status: "Settlement Paid", owner: "D. Cruz" },
] as const;

export const roleViews = {
  agent: [
    { a: "ACC-10482", b: "PTP due today", c: "Call" },
    { a: "ACC-10817", b: "Follow-up", c: "SMS" },
    { a: "ACC-11209", b: "Broken PTP", c: "Review" },
    { a: "ACC-11587", b: "New assignment", c: "Call" },
  ],
  supervisor: [
    { a: "M. Ramos", b: "Active call", c: "Listen" },
    { a: "J. Santos", b: "Active call", c: "Whisper" },
    { a: "A. Luna", b: "Needs support", c: "Barge" },
    { a: "D. Cruz", b: "On break", c: "—" },
  ],
  qa: [
    { a: "QA-0318", b: "Payment call", c: "96 / 100" },
    { a: "QA-0321", b: "PTP call", c: "Review" },
    { a: "QA-0326", b: "Inbound call", c: "Assigned" },
    { a: "QA-0329", b: "Follow-up call", c: "91 / 100" },
  ],
  administrator: [
    { a: "Metro Auto", b: "Accounts.csv", c: "Validated" },
    { a: "SME Recovery", b: "Payments.csv", c: "Mapped" },
    { a: "Capital East", b: "Campaign", c: "Configured" },
    { a: "National Group", b: "Users.csv", c: "Pending" },
  ],
} as const;

/* Hero dashboard stats */
export const dashboardStats = [
  { label: "Total Recovered", value: "₱4.85M", change: "+16.4%", positive: true },
  { label: "PTP Kept Rate", value: "74.8%", change: "+8.2%", positive: true },
  { label: "Connect Rate", value: "68.2%", change: "+12.5%", positive: true },
  { label: "Monthly Target", value: "112%", change: "Exceeded", positive: true },
] as const;

/* AI Agent conversation specimens */
export const aiAgentConversations = [
  {
    agent: "Auto-Dialer",
    entries: [
      { type: "system" as const, text: "Prioritizing ACC-10482 — PTP due today, 3 prior contacts" },
      { type: "action" as const, text: "Initiating preview call to primary number" },
      { type: "result" as const, text: "Connected — PTP confirmed, $240 payment scheduled" },
    ],
  },
  {
    agent: "Smart Follow-Up",
    entries: [
      { type: "system" as const, text: "ACC-11209 broken PTP detected — 2 days overdue" },
      { type: "action" as const, text: "Scheduling SMS reminder + escalation to supervisor queue" },
      { type: "result" as const, text: "SMS delivered — account moved to priority follow-up" },
    ],
  },
] as const;
