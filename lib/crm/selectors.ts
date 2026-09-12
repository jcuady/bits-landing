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

export function dashboardKpis(state: CrmState): Kpi[] {
  const open = openPipeline(state.opportunities);
  const pipelineValue = open.reduce((sum, o) => sum + o.amount, 0);
  const won = state.opportunities
    .filter((o) => o.stage === "closed_won")
    .reduce((sum, o) => sum + o.amount, 0);
  const newLeads = state.leads.filter((l) => l.status === "new" || l.status === "working").length;
  const openTasks = state.tasks.filter((t) => t.status === "open").length;
  const winRate =
    state.opportunities.filter((o) => o.stage === "closed_won" || o.stage === "closed_lost").length === 0
      ? 0
      : state.opportunities.filter((o) => o.stage === "closed_won").length /
        state.opportunities.filter((o) => o.stage === "closed_won" || o.stage === "closed_lost").length;

  return [
    {
      id: "pipeline",
      label: "Open pipeline",
      value: money(pipelineValue),
      delta: "+8.4%",
      deltaTone: "up",
      context: "vs last 7 days",
      target: "Target $520k",
    },
    {
      id: "won",
      label: "Closed won (30d)",
      value: money(won),
      delta: "+12%",
      deltaTone: "up",
      context: "vs prior 30 days",
      target: "Target $250k",
    },
    {
      id: "winrate",
      label: "Win rate",
      value: `${Math.round(winRate * 100)}%`,
      delta: "-3 pts",
      deltaTone: "down",
      context: "vs prior quarter",
      target: "Target 55%",
    },
    {
      id: "leads",
      label: "Active leads",
      value: String(newLeads),
      delta: "+2",
      deltaTone: "up",
      context: "vs last 7 days",
    },
    {
      id: "tasks",
      label: "Open tasks",
      value: String(openTasks),
      delta: openTasks > 3 ? "+1" : "0",
      deltaTone: openTasks > 3 ? "down" : "flat",
      context: "vs yesterday",
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

export function overdueTasks(state: CrmState, now = new Date("2026-09-12T00:00:00Z")) {
  return state.tasks.filter((t) => t.status === "open" && new Date(t.dueAt) < now);
}

export function stalledDeals(state: CrmState) {
  return state.opportunities.filter(
    (o) => (o.stalledDays ?? 0) >= 7 && o.stage !== "closed_won" && o.stage !== "closed_lost"
  );
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

export function formatRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const hours = Math.round(diff / 3_600_000);
  if (hours < 24) return `${Math.max(1, hours)}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
