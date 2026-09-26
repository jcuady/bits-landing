"use client";

import * as React from "react";
import Link from "next/link";
import { KpiStat } from "@/components/crm/kpi-stat";
import { ActivityTimeline } from "@/components/crm/activity-timeline";
import { StatusBadge } from "@/components/crm/status-badge";
import { useCrm } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";
import {
  Sparkles,
  Activity,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  PhoneCall,
  Mail,
  Zap,
  Globe,
  Layers,
  Building2,
  UserCheck,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { useToast } from "@/components/crm/crm-toast";

export default function DashboardPage() {
  const { state, updateLeadStatus } = useCrm();
  const { showToast } = useToast();

  // Greeting by hour
  const greeting = React.useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, []);

  // Compute live metrics from leads
  const totalLeads = state.leads.length;
  const newLeadsCount = state.leads.filter((l) => l.status === "new").length;
  const qualifiedLeads = state.leads.filter((l) => l.status === "qualified").length;
  const totalPipelineValue = state.opportunities.reduce((sum, o) => sum + o.amount, 0);

  // Group leads by form source
  const sourceBreakdown = React.useMemo(() => {
    const map: Record<string, { count: number; value: number }> = {};
    state.leads.forEach((lead) => {
      const src = lead.source || "Website Form";
      if (!map[src]) map[src] = { count: 0, value: 0 };
      map[src].count += 1;
      const opp = state.opportunities.find((o) => o.name.includes(lead.company));
      if (opp) map[src].value += opp.amount;
    });
    return Object.entries(map);
  }, [state.leads, state.opportunities]);

  return (
    <div className="space-y-6 font-sans">
      {/* Executive Welcome Banner with BITS Aesthetics */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xs dark:border-[#242424] dark:bg-[#141414]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1975f2]/10 px-3 py-0.5 text-xs font-bold text-[#1975f2]">
                <Sparkles className="size-3.5" />
                BITS Inbound Command Center
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[0.68rem] font-bold text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Form Listener Active
              </span>
              <span className="rounded-full bg-muted border border-border px-2 py-0.5 text-[0.65rem] font-mono text-muted-foreground">
                BITS Core v4.2
              </span>
            </div>
            <h1 className="mt-2.5 text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Dashboard &amp; Inbound Command Center
            </h1>
            <p className="text-xs font-semibold text-[#1975f2] mt-0.5">
              {greeting}, BITS RevOps Team
            </p>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm max-w-2xl leading-relaxed">
              Real-time pipeline vitals for inbound leads arriving from your website contact forms, interactive CRM specimens, and partner consultations.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/app/leads"
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#1975f2] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#1975f2]/90 active:scale-95 transition-all"
            >
              <span>View All Inbound Leads</span>
              <ArrowRight className="size-3.5" />
            </Link>
            <Link
              href="/#contact"
              target="_blank"
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-neutral-200 bg-white px-3.5 text-xs font-bold text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 active:scale-95 transition-all"
            >
              <Globe className="size-3.5 text-[#1975f2]" />
              <span>Test Live Form</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Top 5 Bionis KPI Metric Cards */}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <KpiStat
          label="Total Inbound Leads"
          value={String(totalLeads)}
          delta="+18.4%"
          deltaTone="up"
          context={`${newLeadsCount} awaiting first touch`}
          target="Website forms & specimen"
        />
        <KpiStat
          label="Avg First-Response SLA"
          value="3.8 mins"
          delta="-42%"
          deltaTone="up"
          context="Target: < 5.0 mins"
          target="98.2% SLA compliance"
        />
        <KpiStat
          label="Form Conversion Rate"
          value="4.8%"
          delta="+1.2%"
          deltaTone="up"
          context="B2B decision-maker intent"
          target="Industry avg: 2.1%"
        />
        <KpiStat
          label="Active Lead Pipeline"
          value={formatMoney(totalPipelineValue)}
          delta="+24.5%"
          deltaTone="up"
          context="7 commercial opportunities"
          target="Philippine Peso (PHP)"
        />
        <KpiStat
          label="Lead Qualification Rate"
          value={`${Math.round((qualifiedLeads / Math.max(totalLeads, 1)) * 100)}%`}
          delta="+8.0%"
          deltaTone="up"
          context="Matches BITS Enterprise ICP"
          target="Banks, BPOs, FinTechs"
        />
      </div>

      {/* Middle Section: Lead Intake Velocity & Bionis Score Donut */}
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Left: Lead Sources & Intake Funnel */}
        <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-xs dark:border-[#222] dark:bg-[#141414]">
          <div className="flex items-center justify-between pb-3 border-b border-[#eeefe9] dark:border-[#222]">
            <div>
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Inbound Lead Capture by Source
              </h2>
              <p className="text-xs text-neutral-500">Live attribution from website forms and interactive product specimens</p>
            </div>
            <span className="rounded-full bg-[#1975f2]/10 px-2.5 py-1 text-xs font-mono font-bold text-[#1975f2]">
              {totalLeads} Submissions Total
            </span>
          </div>

          <div className="mt-5 space-y-4">
            {sourceBreakdown.map(([source, data]) => {
              const percentage = Math.round((data.count / Math.max(totalLeads, 1)) * 100);
              return (
                <div key={source} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
                      <span className="size-2 rounded-full bg-[#1975f2]" />
                      {source}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 text-[0.68rem] font-bold text-neutral-600 dark:text-neutral-400">
                        {data.count} leads ({percentage}%)
                      </span>
                      {data.value > 0 && (
                        <span className="font-mono font-bold text-[#1975f2]">
                          {formatMoney(data.value)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1975f2] to-[#22d3ee] transition-all duration-500"
                      style={{ width: `${Math.max(8, percentage)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick telemetry footer */}
          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/50 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs dark:border-blue-900/40 dark:bg-blue-950/20">
            <div className="flex items-center gap-2">
              <TrendingUp className="size-4 text-emerald-600" />
              <span className="text-neutral-600 dark:text-neutral-400">Highest Converting Form:</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">BITScrm Specimen (12.4%)</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="size-4 text-amber-500" />
              <span className="text-neutral-600 dark:text-neutral-400">Lead Routing:</span>
              <span className="font-bold font-mono text-[#1975f2]">Sub-2s automated round-robin</span>
            </div>
          </div>
        </section>

        {/* Right: Bionis Conversion Velocity Score Donut */}
        <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-xs dark:border-[#222] dark:bg-[#141414] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#eeefe9] dark:border-[#222]">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
                Lead Velocity Score
              </h2>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-bold text-emerald-600">
                94 / 100 Optimal
              </span>
            </div>

            {/* Score Ring Visual */}
            <div className="my-5 flex flex-col items-center justify-center">
              <div className="relative flex size-36 items-center justify-center">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-neutral-100 dark:stroke-neutral-800"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="stroke-[#1975f2] transition-all duration-1000 ease-out"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset="15"
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold font-mono text-neutral-900 dark:text-neutral-100 tracking-tight">
                    94
                  </span>
                  <span className="text-[0.62rem] font-bold text-neutral-400 uppercase tracking-widest">
                    Intake Index
                  </span>
                </div>
              </div>
              <p className="mt-1 text-xs font-medium text-neutral-500 text-center">
                Calculated across inbound form cadence, lead score distribution, and touch response speed.
              </p>
            </div>

            {/* Micro Vitals Stack */}
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-xl bg-neutral-50 dark:bg-neutral-900/60 p-2.5 text-xs border border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Website Form SLA Compliance</span>
                <span className="font-bold font-mono text-neutral-900 dark:text-neutral-100">98.2% On-Time</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-neutral-50 dark:bg-neutral-900/60 p-2.5 text-xs border border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Decision-Maker Quality Filter</span>
                <span className="font-bold font-mono text-neutral-900 dark:text-neutral-100">88.5% VP/Director</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-neutral-50 dark:bg-neutral-900/60 p-2.5 text-xs border border-neutral-100 dark:border-neutral-800">
                <span className="text-neutral-500">Softphone Right-Party Connect</span>
                <span className="font-bold font-mono text-[#00b153]">78.4% Live Voice</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#eeefe9] dark:border-[#222]">
            <Link
              href="/app/forms"
              className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 py-2.5 text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <span>Manage 3 Active Website Forms</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Real Inbound Website Form Submissions Table */}
      <section className="rounded-3xl border border-[#e5e7eb] bg-white p-5 sm:p-6 shadow-xs dark:border-[#222] dark:bg-[#141414]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eeefe9] dark:border-[#222] mb-4">
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider">
              Recent Website Form Inquiries &amp; Consultations
            </h2>
            <p className="text-xs text-neutral-500">Inbound leads captured directly from your site forms with 1-click CRM actions</p>
          </div>
          <Link
            href="/app/leads"
            className="text-xs font-bold text-[#1975f2] hover:underline flex items-center gap-1"
          >
            <span>View Full Roster ({state.leads.length})</span>
            <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[36rem]">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/80 text-[0.65rem] font-bold uppercase tracking-wider text-neutral-500 dark:border-neutral-800 dark:bg-neutral-800/40">
                <th className="px-3 py-2.5">Lead &amp; Company</th>
                <th className="px-3 py-2.5">Source Form</th>
                <th className="px-3 py-2.5">Stated Requirements / Message</th>
                <th className="px-3 py-2.5">Score</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-[0.75rem] dark:divide-neutral-800">
              {state.leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center">
                    <p className="text-sm font-semibold text-foreground dark:text-neutral-200">
                      No inbound leads captured yet
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground dark:text-neutral-400">
                      Website form submissions and manually created leads stream directly here in real time.
                    </p>
                    <div className="mt-3">
                      <Button asChild variant="outline" size="sm">
                        <Link href="/app/leads">Create First Lead</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                state.leads.slice(0, 6).map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-neutral-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                  >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-[#1975f2] font-bold text-xs dark:bg-blue-950/60 dark:text-blue-400">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <Link
                          href={`/app/leads/${lead.id}`}
                          className="font-bold text-neutral-900 dark:text-neutral-100 hover:text-[#1975f2] transition-colors"
                        >
                          {lead.name}
                        </Link>
                        <p className="text-[0.68rem] text-neutral-500 truncate max-w-[160px]">
                          {lead.company} · {lead.title}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3">
                    <span className="rounded-full bg-blue-50 border border-blue-200/60 px-2 py-0.5 text-[0.65rem] font-semibold text-[#1975f2] dark:bg-blue-950/40 dark:border-blue-900">
                      {lead.source}
                    </span>
                  </td>

                  <td className="px-3 py-3 max-w-[280px]">
                    <p className="text-[0.72rem] text-neutral-600 dark:text-neutral-300 truncate">
                      {lead.notes}
                    </p>
                  </td>

                  <td className="px-3 py-3 font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded text-[0.68rem] ${
                        lead.score >= 90
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      {lead.score}/100
                    </span>
                  </td>

                  <td className="px-3 py-3">
                    <StatusBadge status={lead.status} />
                  </td>

                  <td className="px-3 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          updateLeadStatus(lead.id, "working");
                          showToast(`WebRTC Softphone connected: Dialing ${lead.name} (${lead.company}).`);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#1975f2] px-2.5 py-1 text-xs font-bold text-white hover:bg-[#1975f2]/90 shadow-2xs active:scale-95 transition-all cursor-pointer"
                      >
                        <PhoneCall className="size-3" />
                        <span>Call</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          updateLeadStatus(lead.id, "qualified");
                          showToast(`Fast-touch email template dispatched to ${lead.email}.`);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2 py-1 text-xs font-medium text-foreground hover:bg-muted active:scale-95 transition-all cursor-pointer"
                      >
                        <Mail className="size-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Telemetry & Real-Time Operational Stream */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* BITSagent AI Telemetry */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <div className="flex items-center justify-between pb-3 border-b border-border/80 dark:border-[#222] mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-[#1975f2]" />
              <h2 className="text-sm font-bold text-foreground">
                AI Lead Prioritization &amp; Routing
              </h2>
            </div>
            <span className="text-[0.65rem] font-bold text-[#1975f2] font-mono">
              BITSagent Telemetry
            </span>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3.5 text-xs dark:border-blue-900/50 dark:bg-blue-950/30">
              <div className="flex items-center justify-between font-bold text-[#1975f2]">
                <span>High-Value Enterprise Alert</span>
                <span className="font-mono text-[0.68rem]">Score: 96</span>
              </div>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Atty. Rafael Dizon (EastWest Credit) submitted requirements for 150 collections floor seats. Est. ARR: ₱1.45M. Auto-assigned to Malcolm Cuady.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-3.5 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/30">
              <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-400">
                <span>Specimen Interactive Conversion</span>
                <span className="font-mono text-[0.68rem]">Score: 98</span>
              </div>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Marcus Sterling (Sutherland Global BPO) interacted with softphone specimen and requested AI latency benchmarks for 40,000 delinquent accounts.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-3.5 text-xs dark:border-amber-900/50 dark:bg-amber-950/30">
              <div className="flex items-center justify-between font-bold text-amber-700 dark:text-amber-400">
                <span>BSP 454 Quiet Hour Enforcement</span>
                <span className="font-mono text-[0.68rem]">Automated</span>
              </div>
              <p className="mt-1 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                Statutory quiet hours lock active. Outbound dialer auto-campaigns scheduled to resume tomorrow at 8:00 AM sharp.
              </p>
            </div>
          </div>
        </section>

        {/* Live Operational Timeline */}
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-xs dark:border-[#242424] dark:bg-[#141414]">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/80 dark:border-[#222]">
            Live Lead Activity &amp; Ingestion Stream
          </h2>
          <ActivityTimeline items={state.activities.slice(0, 5)} />
        </section>
      </div>
    </div>
  );
}
