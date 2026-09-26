export type LeadStatus = "new" | "working" | "qualified" | "disqualified";
export type OpportunityStage =
  | "discovery"
  | "proposal"
  | "negotiation"
  | "closed_won"
  | "closed_lost";
export type TaskStatus = "open" | "done";
export type CampaignStatus = "draft" | "active" | "paused" | "completed";
export type AutomationStatus = "active" | "paused";

export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  source: string;
  status: LeadStatus;
  score: number;
  owner: string;
  createdAt: string;
  lastActivityAt: string;
  notes: string;
};

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  companyId: string;
  owner: string;
  lastTouchAt: string;
  tags: string[];
};

export type Company = {
  id: string;
  name: string;
  domain: string;
  industry: string;
  employees: number;
  arrEstimate: number;
  owner: string;
  location: string;
};

export type Opportunity = {
  id: string;
  name: string;
  companyId: string;
  contactId: string;
  stage: OpportunityStage;
  amount: number;
  probability: number;
  closeDate: string;
  owner: string;
  pipelineId: string;
  stalledDays?: number;
};

export type PipelineStage = {
  id: OpportunityStage;
  label: string;
  order: number;
};

export type Pipeline = {
  id: string;
  name: string;
  stages: PipelineStage[];
};

export type Task = {
  id: string;
  title: string;
  relatedType: "lead" | "opportunity" | "contact" | "company";
  relatedId: string;
  relatedLabel: string;
  dueAt: string;
  status: TaskStatus;
  owner: string;
  priority: "low" | "medium" | "high";
};

export type ConversationMessage = {
  id: string;
  channel: "email" | "sms";
  direction: "inbound" | "outbound";
  body: string;
  at: string;
};

export type Conversation = {
  id: string;
  subject: string;
  contactName: string;
  contactEmail: string;
  channel: "email" | "sms";
  unread: boolean;
  updatedAt: string;
  messages: ConversationMessage[];
};

export type Campaign = {
  id: string;
  name: string;
  channel: string;
  status: CampaignStatus;
  sent: number;
  opens: number;
  clicks: number;
  conversions: number;
  owner: string;
};

export type Automation = {
  id: string;
  name: string;
  trigger: string;
  status: AutomationStatus;
  runs30d: number;
  successRate: number;
};

export type Funnel = {
  id: string;
  name: string;
  steps: { label: string; visitors: number }[];
  conversionRate: number;
  status: "live" | "draft";
};

export type FormDef = {
  id: string;
  name: string;
  submissions30d: number;
  conversionRate: number;
  fields: number;
  status: "published" | "draft";
};

export type Template = {
  id: string;
  name: string;
  channel: "email" | "sms";
  category: string;
  updatedAt: string;
  usage30d: number;
};

export type CrmRole = "Admin" | "Manager" | "Rep" | "Marketing";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: CrmRole;
  openDeals: number;
  closedWon30d: number;
};

export type NotificationItem = {
  id: string;
  title: string;
  desc: string;
  time: string;
  href: string;
  urgent?: boolean;
  read?: boolean;
};

export type Activity = {
  id: string;
  type: "note" | "call" | "email" | "stage" | "task";
  summary: string;
  actor: string;
  at: string;
};

export type CrmState = {
  leads: Lead[];
  contacts: Contact[];
  companies: Company[];
  opportunities: Opportunity[];
  pipelines: Pipeline[];
  tasks: Task[];
  conversations: Conversation[];
  campaigns: Campaign[];
  automations: Automation[];
  funnels: Funnel[];
  forms: FormDef[];
  templates: Template[];
  team: TeamMember[];
  activities: Activity[];
};
