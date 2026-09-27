"use client";

import * as React from "react";
import Link from "next/link";
import { useSales } from "@/lib/products/crm-sales/store";
import { useDemo } from "@/lib/products/demo-store";
import {
  TrendingUp,
  KanbanSquare,
  Users,
  FileSpreadsheet,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CrmSalesDashboard() {
  const { deals, metrics, moveDealStage, addDeal } = useSales();
  const { persona } = useDemo();

  const [isAddDealOpen, setIsAddDealOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState("");
  const [newCompany, setNewCompany] = React.useState("");
  const [newAmount, setNewAmount] = React.useState(2500000);

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCompany) return;

    addDeal({
      title: newTitle,
      company: newCompany,
      industry: "Enterprise Retail",
      location: "Bonifacio Global City, Taguig",
      amount: Number(newAmount),
      stage: "lead_in",
      probability: 20,
      owner: "Marco Dela Cruz (Sales Director)",
      contactName: "Lead Inbound Contact",
      contactEmail: "inquiry@enterprise.ph",
      contactPhone: "+63 917 000 1234",
      expectedCloseDate: "2026-11-15",
      priority: "high",
      notes: "Newly created through executive dashboard quick entry.",
    });

    setNewTitle("");
    setNewCompany("");
    setIsAddDealOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Persona Context Alert */}
      <div className="rounded-2xl border border-electric-500/20 bg-gradient-to-r from-electric-950/60 via-slate-900/60 to-navy-950/60 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="h-10 w-10 rounded-xl bg-electric-600/20 border border-electric-500/40 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="h-5 w-5 text-electric-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight sm:text-lg">
                  BITScrm Sales Enterprise HUD
                </h1>
                <Badge variant="outline" className="border-electric-500/40 bg-electric-500/10 text-electric-400 text-[10px] font-semibold">
                  Role: {persona.replace("_", " ").toUpperCase()}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-slate-300 max-w-2xl leading-relaxed">
                {persona === "sales_director" &&
                  "Executive view: Monitoring Q4 team quota velocity across Metro Manila corporate conglomerates, pipeline stage aging, and CPQ margin approvals."}
                {persona === "sales_rep" &&
                  "Rep view: Direct access to active lead assignments, scheduled client presentations, and deal qualification checklists."}
                {persona === "po_demo" &&
                  "Client Showcase view: Demonstrating 1-click CPQ quoting, visual Kanban state updates, and Philippine Peso currency parity."}
                {persona === "dev_admin" &&
                  "Engineering view: Client-side reactive store with local persistence, zero-latency state transitions, and edge subdomain routing."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={() => setIsAddDealOpen(true)}
              size="sm"
              className="bg-electric-600 hover:bg-electric-500 font-semibold cursor-pointer text-xs"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              <span>Add Quick Deal</span>
            </Button>
            <Button asChild variant="outline" size="sm" className="border-slate-700 bg-slate-800/80 text-white hover:bg-slate-700 text-xs">
              <Link href="/crm-sales/pipeline">
                <KanbanSquare className="h-3.5 w-3.5 mr-1 text-electric-400" />
                <span>Open Kanban</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Add Deal Modal */}
      {isAddDealOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-1">Add Enterprise Deal to Pipeline</h2>
            <p className="text-xs text-slate-400 mb-4">Creates a new deal card in the Lead In column.</p>

            <form onSubmit={handleCreateDeal} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Deal Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Omnichannel Contact Center Modernization"
                  className="w-full h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white placeholder-slate-500 outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Enterprise Client / Company</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Alliance Global Group Inc."
                  className="w-full h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white placeholder-slate-500 outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Contract Amount (₱ PHP)</label>
                <input
                  type="number"
                  required
                  step={50000}
                  value={newAmount}
                  onChange={(e) => setNewAmount(Number(e.target.value))}
                  className="w-full h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white outline-none focus:border-electric-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddDealOpen(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-electric-600 hover:bg-electric-500 text-xs font-semibold">
                  Create Deal Card
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4 KPI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pipeline */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Total Active Pipeline</span>
            <Badge variant="outline" className="border-slate-700 bg-slate-800 text-[10px] text-slate-300">
              {metrics.activeDealsCount} Deals
            </Badge>
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight font-mono">
            ₱{metrics.totalPipeline.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span className="font-medium">+18.4%</span>
            <span className="text-slate-400">vs previous quarter</span>
          </div>
        </div>

        {/* Weighted ARR Forecast */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Weighted ARR Forecast</span>
            <Badge variant="outline" className="border-electric-500/30 bg-electric-500/10 text-[10px] text-electric-400">
              Risk-Adjusted
            </Badge>
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight font-mono text-electric-400">
            ₱{metrics.weightedPipeline.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Calculated from stage probabilities</span>
          </div>
        </div>

        {/* Closed Won YTD */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Closed Won Revenue</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-400 tracking-tight font-mono">
            ₱{metrics.closedWonRevenue.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Signed enterprise MSAs in 2026</span>
          </div>
        </div>

        {/* Win Rate */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Enterprise Win Rate</span>
            <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-[10px] text-amber-400">
              High Velocity
            </Badge>
          </div>
          <div className="mt-3 text-2xl font-bold text-white tracking-tight font-mono">
            {metrics.winRate}%
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <span>Avg deal cycle: 38 days</span>
          </div>
        </div>
      </div>

      {/* Pipeline Stage Distribution Progress Bar */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Live Pipeline Stage Distribution (₱ PHP)
          </h2>
          <Link
            href="/crm-sales/pipeline"
            className="text-xs text-electric-400 hover:text-electric-300 font-medium flex items-center gap-1"
          >
            <span>View Board</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Visual Progress Bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="bg-slate-500 transition-all"
            style={{
              width: `${(deals.filter((d) => d.stage === "lead_in").length / (deals.length || 1)) * 100}%`,
            }}
            title="Lead In"
          />
          <div
            className="bg-blue-500 transition-all"
            style={{
              width: `${(deals.filter((d) => d.stage === "qualified").length / (deals.length || 1)) * 100}%`,
            }}
            title="Qualified"
          />
          <div
            className="bg-purple-500 transition-all"
            style={{
              width: `${(deals.filter((d) => d.stage === "proposal").length / (deals.length || 1)) * 100}%`,
            }}
            title="Proposal"
          />
          <div
            className="bg-amber-500 transition-all"
            style={{
              width: `${(deals.filter((d) => d.stage === "negotiation").length / (deals.length || 1)) * 100}%`,
            }}
            title="Negotiation"
          />
          <div
            className="bg-emerald-500 transition-all"
            style={{
              width: `${(deals.filter((d) => d.stage === "closed_won").length / (deals.length || 1)) * 100}%`,
            }}
            title="Closed Won"
          />
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            <span>Lead In: {deals.filter((d) => d.stage === "lead_in").length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>Qualified: {deals.filter((d) => d.stage === "qualified").length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-purple-500" />
            <span>Proposal: {deals.filter((d) => d.stage === "proposal").length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Negotiation: {deals.filter((d) => d.stage === "negotiation").length}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Closed Won: {deals.filter((d) => d.stage === "closed_won").length}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Active Deals & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* High-Value Deals Table (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-white">Active Philippine Enterprise Deals</h2>
              <p className="text-xs text-slate-400">Top revenue opportunities currently in progress</p>
            </div>
            <Link
              href="/crm-sales/pipeline"
              className="text-xs text-electric-400 hover:text-electric-300 font-medium"
            >
              View Full Kanban →
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60 overflow-x-auto">
            {deals.slice(0, 6).map((deal) => (
              <div key={deal.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white truncate max-w-xs">{deal.company}</span>
                    <Badge
                      variant="outline"
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.2 ${
                        deal.stage === "closed_won"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                          : deal.stage === "negotiation"
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                          : deal.stage === "proposal"
                          ? "border-purple-500/40 bg-purple-500/10 text-purple-400"
                          : "border-blue-500/40 bg-blue-500/10 text-blue-400"
                      }`}
                    >
                      {deal.stage.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{deal.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                    <span>{deal.location}</span>
                    <span>•</span>
                    <span>Close: {deal.expectedCloseDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-bold text-white font-mono">
                      ₱{deal.amount.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">{deal.probability}% probability</div>
                  </div>

                  {/* Stage Switcher */}
                  <select
                    value={deal.stage}
                    onChange={(e) => moveDealStage(deal.id, e.target.value as any)}
                    className="h-7 rounded-lg border border-slate-700 bg-slate-800 px-2 text-[10px] font-medium text-slate-300 outline-none hover:border-electric-500 cursor-pointer"
                  >
                    <option value="lead_in">Lead In</option>
                    <option value="qualified">Qualified</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="closed_won">Closed Won</option>
                    <option value="closed_lost">Closed Lost</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch & Actions (1 col) */}
        <div className="space-y-4">
          {/* CPQ Proposal Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-br from-slate-900 to-slate-950 p-5">
            <div className="flex items-center gap-2 mb-2 text-electric-400">
              <FileSpreadsheet className="h-4 w-4" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                1-Click CPQ Proposal Engine
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-normal mb-4">
              Configure seat quantities, add Voice AI agent licenses, and generate client-ready enterprise proposals with 12% BIR VAT.
            </p>
            <Button asChild size="sm" className="w-full bg-electric-600 hover:bg-electric-500 text-xs font-semibold">
              <Link href="/crm-sales/cpq">
                Launch CPQ Builder →
              </Link>
            </Button>
          </div>

          {/* Inbound AI Leads Card */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-amber-400">
                <Users className="h-4 w-4" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  AI High-Scoring Leads
                </h3>
              </div>
              <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-400 text-[10px]">
                4 New
              </Badge>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Leads scored above 85% by BITS AI Lead Qualification Engine.
            </p>
            <Button asChild variant="outline" size="sm" className="w-full border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs">
              <Link href="/crm-sales/leads">
                Review Inbound Leads →
              </Link>
            </Button>
          </div>

          {/* Direct link to all 18 products */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4">
            <div className="text-xs font-semibold text-slate-300 mb-1">
              Explore All 18 BITS Engines
            </div>
            <p className="text-[11px] text-slate-400 mb-3">
              Switch between Collections, Payroll, Accounting ERP, Logistics Fleet, and Sports Court OS.
            </p>
            <Link
              href="/demo"
              className="inline-flex items-center gap-1 text-xs text-electric-400 hover:text-electric-300 font-medium"
            >
              <span>Open 18-Engine Showcase Matrix</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
