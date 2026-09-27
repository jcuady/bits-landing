"use client";

import * as React from "react";
import Link from "next/link";
import { useSales } from "@/lib/products/crm-sales/store";
import { DealStage, Deal } from "@/lib/products/crm-sales/types";
import {
  KanbanSquare,
  Plus,
  ArrowRight,
  ArrowLeft,
  FileSpreadsheet,
  Building2,
  Calendar,
  Sparkles,
  CheckCircle2,
  Trash2,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ColumnDef {
  key: DealStage;
  label: string;
  badgeColor: string;
  defaultProb: number;
}

const STAGES: ColumnDef[] = [
  { key: "lead_in", label: "Lead In", badgeColor: "bg-slate-700 text-slate-300", defaultProb: 20 },
  { key: "qualified", label: "Qualified", badgeColor: "bg-blue-600/30 text-blue-400 border border-blue-500/30", defaultProb: 40 },
  { key: "proposal", label: "Proposal / CPQ", badgeColor: "bg-purple-600/30 text-purple-400 border border-purple-500/30", defaultProb: 65 },
  { key: "negotiation", label: "Negotiation", badgeColor: "bg-amber-600/30 text-amber-400 border border-amber-500/30", defaultProb: 85 },
  { key: "closed_won", label: "Closed Won", badgeColor: "bg-emerald-600/30 text-emerald-400 border border-emerald-500/30", defaultProb: 100 },
];

export default function PipelinePage() {
  const { deals, moveDealStage, addDeal, deleteDeal, setCpqClientCompany } = useSales();
  const [filterOwner, setFilterOwner] = React.useState<string>("all");
  const [draggedDealId, setDraggedDealId] = React.useState<string | null>(null);

  // New Deal modal state
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [amount, setAmount] = React.useState(2500000);
  const [stage, setStage] = React.useState<DealStage>("lead_in");

  const filteredDeals = React.useMemo(() => {
    if (filterOwner === "all") return deals;
    return deals.filter((d) => d.owner.toLowerCase().includes(filterOwner.toLowerCase()));
  }, [deals, filterOwner]);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
    setDraggedDealId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: DealStage) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("text/plain") || draggedDealId;
    if (dealId) {
      moveDealStage(dealId, targetStage);
      setDraggedDealId(null);
    }
  };

  const handleNextStage = (deal: Deal) => {
    const currentIndex = STAGES.findIndex((s) => s.key === deal.stage);
    if (currentIndex < STAGES.length - 1) {
      moveDealStage(deal.id, STAGES[currentIndex + 1].key);
    }
  };

  const handlePrevStage = (deal: Deal) => {
    const currentIndex = STAGES.findIndex((s) => s.key === deal.stage);
    if (currentIndex > 0) {
      moveDealStage(deal.id, STAGES[currentIndex - 1].key);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    addDeal({
      title,
      company,
      industry: "Enterprise Accounts",
      location: "Metro Manila, PH",
      amount: Number(amount),
      stage,
      probability: STAGES.find((s) => s.key === stage)?.defaultProb || 40,
      owner: "Marco Dela Cruz (Sales Director)",
      contactName: "Lead Inbound Contact",
      contactEmail: "inbound@client.ph",
      contactPhone: "+63 917 111 2233",
      expectedCloseDate: "2026-11-20",
      priority: "high",
      notes: "Created via Pipeline Board",
    });

    setTitle("");
    setCompany("");
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Enterprise Deal Pipeline Kanban
            </h1>
            <Badge variant="outline" className="border-electric-500/30 bg-electric-500/10 text-electric-400 text-xs">
              Live Interactive
            </Badge>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Drag cards between stages or use quick advancement buttons. Real-time Philippine Peso totals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Owner Filter */}
          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-slate-200 outline-none hover:border-slate-600 cursor-pointer"
          >
            <option value="all">All Deal Owners</option>
            <option value="Marco">Marco Dela Cruz (Director)</option>
            <option value="Katrina">Katrina Valdez (Senior AE)</option>
            <option value="Angelo">Angelo Ramos (AE)</option>
          </select>

          <Button
            onClick={() => setIsModalOpen(true)}
            size="sm"
            className="bg-electric-600 hover:bg-electric-500 font-semibold cursor-pointer text-xs h-9"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            <span>Add Deal</span>
          </Button>
        </div>
      </div>

      {/* Add Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
            <h2 className="text-base font-bold text-white mb-1">Create Pipeline Deal</h2>
            <p className="text-xs text-slate-400 mb-4">Add a new deal opportunity to track in the Kanban.</p>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Deal Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Voice AI Dialer & Core Telephony Sync"
                  className="w-full h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white placeholder-slate-500 outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Company / Client</label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g. Megaworld Corporation"
                  className="w-full h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white placeholder-slate-500 outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Amount (₱ PHP)</label>
                <input
                  type="number"
                  required
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Initial Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value as DealStage)}
                  className="w-full h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-white outline-none focus:border-electric-500 cursor-pointer"
                >
                  {STAGES.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="bg-electric-600 hover:bg-electric-500 text-xs font-semibold">
                  Add to Kanban
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start min-h-[600px] overflow-x-auto pb-6">
        {STAGES.map((col, idx) => {
          const colDeals = filteredDeals.filter((d) => d.stage === col.key);
          const colTotalAmount = colDeals.reduce((sum, d) => sum + d.amount, 0);

          return (
            <div
              key={col.key}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, col.key)}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-3 min-h-[500px] transition-colors hover:border-slate-700/80"
            >
              {/* Column Header */}
              <div className="pb-3 border-b border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white tracking-wide">{col.label}</span>
                  <Badge variant="outline" className={`text-[10px] font-semibold px-1.5 py-0.2 ${col.badgeColor}`}>
                    {colDeals.length}
                  </Badge>
                </div>
                <div className="mt-1 text-[11px] font-mono text-emerald-400 font-semibold">
                  ₱{colTotalAmount.toLocaleString()}
                </div>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 pt-3">
                {colDeals.length === 0 ? (
                  <div className="h-32 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-xl text-center p-3">
                    <span className="text-[11px] text-slate-500">No deals in this stage</span>
                    <span className="text-[9px] text-slate-600 mt-1">Drop deals here</span>
                  </div>
                ) : (
                  colDeals.map((deal) => {
                    const canMovePrev = idx > 0;
                    const canMoveNext = idx < STAGES.length - 1;

                    return (
                      <div
                        key={deal.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, deal.id)}
                        className="group rounded-xl border border-slate-800 bg-slate-900 p-3.5 shadow-sm hover:border-electric-500/50 hover:shadow-md transition-all cursor-grab active:cursor-grabbing"
                      >
                        {/* Company & Priority */}
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="font-bold text-xs text-white truncate">{deal.company}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-electric-400 bg-electric-950/60 border border-electric-800/60 px-1.5 py-0.5 rounded">
                            {deal.probability}%
                          </span>
                        </div>

                        {/* Title */}
                        <p className="text-[11px] text-slate-300 font-medium leading-snug line-clamp-2 mb-2.5">
                          {deal.title}
                        </p>

                        {/* Amount */}
                        <div className="text-sm font-bold text-emerald-400 font-mono mb-2">
                          ₱{deal.amount.toLocaleString()}
                        </div>

                        {/* Location & Contact */}
                        <div className="space-y-1 text-[10px] text-slate-400 mb-3 border-t border-slate-800/60 pt-2">
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
                            <span className="truncate">{deal.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <Calendar className="h-3 w-3 text-slate-500 shrink-0" />
                            <span>Target: {deal.expectedCloseDate}</span>
                          </div>
                        </div>

                        {/* Card Action Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                          {/* Left Move */}
                          <button
                            onClick={() => handlePrevStage(deal)}
                            disabled={!canMovePrev}
                            title="Move back one stage"
                            className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowLeft className="h-3 w-3" />
                          </button>

                          {/* Quick CPQ link */}
                          <Link
                            href="/crm-sales/cpq"
                            onClick={() => setCpqClientCompany(deal.company)}
                            title="Generate CPQ Quote for this deal"
                            className="inline-flex items-center gap-1 text-[10px] text-electric-400 hover:text-electric-300 font-medium bg-slate-800/80 px-2 py-0.5 rounded hover:bg-slate-700 transition"
                          >
                            <FileSpreadsheet className="h-2.5 w-2.5" />
                            <span>Quote</span>
                          </Link>

                          {/* Right Move */}
                          <button
                            onClick={() => handleNextStage(deal)}
                            disabled={!canMoveNext}
                            title="Advance to next stage"
                            className="p-1 rounded text-slate-500 hover:text-slate-200 hover:bg-slate-800 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowRight className="h-3 w-3" />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteDeal(deal.id)}
                            title="Delete deal"
                            className="p-1 rounded text-slate-600 hover:text-red-400 hover:bg-red-950/30 cursor-pointer"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
