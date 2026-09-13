import type { CrmState, Opportunity } from "./types";

export type Kpi = {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaTone: "up" | "down" | "flat";
  context: string;
  target?: string;
};

/** Shared mock “today” so overdue + 30d windows stay coherent with seed data. */
export const MOCK_NOW = new Date("2026-09-13T12:00:00Z");

function money(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function openPipeline(opps: Opportunity[]) {
  return opps.filter((o) => o.stage !== "closed_won" && o.stage !== "closed_lost");
}

function withinLastDays(isoDate: string, days: number, now: Date) {
  const t = new Date(isoDate).getTime();
  const start = now.getTime() - days * 86_400_000;
  return t >= start && t <= now.getTime();
}

export function dashboardKpis(state: CrmState, now = MOCK_NOW): Kpi[] {
  const open = openPipeline(state.opportunities);
  const pipelineValue = open.reduce((sum, o) => sum + o.amount, 0);
  const won30 = state.opportunities
    .filter((o) => o.stage === "closed_won" && withinLastDays(o.closeDate, 30, now))
    .reduce((sum, o) => sum + o.amount, 0);
  const newLeads = state.leads.filter((l) => l.status === "new" || l.status === "working").length;
  const openTasks = state.tasks.filter((t) => t.status === "open").length;
  const closed = state.opportunities.filter(
    (o) => o.stage === "closed_won" || o.stage === "closed_lost"
  );
  const winRate =
    closed.length === 0
      ? 0
      : closed.filter((o) => o.stage === "closed_won").length / closed.length;

  return [
    {
      id: "pipeline",
      label: "Open pipeline",
      value: money(pipelineValue),
      delta: `${open.length} deals`,
      deltaTone: "flat",
      context: "live session",
      target: "Target $520k",
    },
    {
      id: "won",
      label: "Closed won (30d)",
      value: money(won30),
      delta: money(won30),
      deltaTone: "up",
      context: "close date in last 30 days",
      target: "Target $250k",
    },
    {
      id: "winrate",
      label: "Win rate",
      value: `${Math.round(winRate * 100)}%`,
      delta: `${closed.length} closed`,
      deltaTone: "flat",
      context: "won ÷ (won + lost)",
      target: "Target 55%",
    },
    {
      id: "leads",
      label: "Active leads",
      value: String(newLeads),
      delta: `${state.leads.length} total`,
      deltaTone: "flat",
      context: "new + working",
    },
    {
      id: "tasks",
      label: "Open tasks",
      value: String(openTasks),
      delta: openTasks > 3 ? "needs attention" : "on track",
      deltaTone: openTasks > 3 ? "down" : "flat",
      context: "live session",
    },
  ];
}

export function pipelineByStage(state: CrmState) {
  const stages = state.pipelines[0]?.stages ?? [];
  return stages.map((stage) => {
    const opps = state.opportunities.filter((o) => o.stage === stage.id);
    return {
      stage: stage.label,
      stageId: stage.id,
      count: opps.length,
      amount: opps.reduce((sum, o) => sum + o.amount, 0),
    };
  });
}

export function overdueTasks(state: CrmState, now = MOCK_NOW) {
  return state.tasks.filter((t) => t.status === "open" && new Date(t.dueAt) < now);
}

export function stalledDeals(state: CrmState) {
  return state.opportunities.filter(
    (o) => (o.stalledDays ?? 0) >= 7 && o.stage !== "closed_won" && o.stage !== "closed_lost"
  );
}

export function relatedHref(type: string, id: string) {
  switch (type) {
    case "lead":
      return `/app/leads/${id}`;
    case "opportunity":
      return `/app/opportunities/${id}`;
    case "contact":
      return `/app/contacts/${id}`;
    case "company":
      return `/app/companies/${id}`;
    default:
      return "/app/dashboard";
  }
}

export function companyName(state: CrmState, id: string) {
  return state.companies.find((c) => c.id === id)?.name ?? "—";
}

export function contactName(state: CrmState, id: string) {
  return state.contacts.find((c) => c.id === id)?.name ?? "—";
}

export function formatMoney(n: number) {
  return money(n);
}

export function formatPct(n: number) {
  return `${Math.round(n * 1000) / 10}%`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatRelative(iso: string, now = MOCK_NOW) {
  const diff = now.getTime() - new Date(iso).getTime();
  const hours = Math.round(diff / 3_600_000);
  if (hours < 24) return `${Math.max(1, hours)}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
