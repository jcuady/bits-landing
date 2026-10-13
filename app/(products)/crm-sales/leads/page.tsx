"use client";

import * as React from "react";
import Link from "next/link";
import { useSales } from "@/lib/products/crm-sales/store";
import {
  Users,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  Building2,
  MapPin,
  TrendingUp,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LeadsPage() {
  const { leads, convertLeadToDeal } = useSales();
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const filteredLeads = React.useMemo(() => {
    if (statusFilter === "all") return leads;
    return leads.filter((l) => l.status === statusFilter);
  }, [leads, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              Inbound Enterprise Leads & AI Scoring
            </h1>
            <Badge variant="outline" className="border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs">
              AI Powered
            </Badge>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Real-time lead qualification from inbound web forms, consultations, and referrals across the Philippines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            aria-label="Filter leads by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-xl border border-slate-700 bg-slate-800 px-3 text-xs text-slate-200 outline-none hover:border-slate-600 cursor-pointer"
          >
            <option value="all">All Lead Statuses</option>
            <option value="new">New (Uncontacted)</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted to Deal</option>
          </select>
        </div>
      </div>

      {/* AI Telemetry Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-navy-950 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">
              BITS Predictive AI Scoring Logic
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Scores are calculated based on corporate domain authority, executive title verification, stated budget in Philippine Pesos, and urgency.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono shrink-0">
          <div>
            <div className="text-slate-400 text-[10px]">AVG QUALIFICATION SCORE</div>
            <div className="text-amber-400 font-bold text-sm">92.5 / 100</div>
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">CONVERSION RATE</div>
            <div className="text-emerald-400 font-bold text-sm">64.8%</div>
          </div>
        </div>
      </div>

      {/* Leads Table Card */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Executive / Contact</th>
                <th className="py-3 px-4">Company & Location</th>
                <th className="py-3 px-4">AI Score & Rational</th>
                <th className="py-3 px-4">Estimated Budget</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.map((lead) => {
                const isConverted = lead.status === "converted";
                return (
                  <tr key={lead.id} className="hover:bg-slate-800/40 transition">
                    {/* Contact Name & Title */}
                    <td className="py-3.5 px-4 min-w-[200px]">
                      <div className="font-semibold text-white">{lead.name}</div>
                      <div className="text-slate-400 text-[11px]">{lead.title}</div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Mail className="h-2.5 w-2.5" />
                          {lead.email}
                        </span>
                      </div>
                    </td>

                    {/* Company & Location */}
                    <td className="py-3.5 px-4 min-w-[180px]">
                      <div className="font-medium text-slate-200">{lead.company}</div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
                        <span>{lead.location}</span>
                      </div>
                    </td>

                    {/* AI Score */}
                    <td className="py-3.5 px-4 min-w-[220px]">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono font-bold text-xs px-2 py-0.5 rounded-full ${
                            lead.aiScore >= 90
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                              : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          }`}
                        >
                          {lead.aiScore}/100
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400">
                          {lead.aiScore >= 90 ? "High Intent" : "Warm Lead"}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-snug">
                        {lead.scoreReason}
                      </p>
                    </td>

                    {/* Estimated Budget */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="font-mono font-bold text-emerald-400 text-xs">
                        ₱{lead.estimatedBudget.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-slate-500">Declared Q4 CapEx</div>
                    </td>

                    {/* Source & Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <Badge variant="outline" className="border-slate-700 bg-slate-800 text-[10px] text-slate-300">
                        {lead.source}
                      </Badge>
                      <div className="text-[10px] text-slate-500 mt-1">{lead.createdAt}</div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {isConverted ? (
                        <div className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Deal Created</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => convertLeadToDeal(lead.id)}
                          size="sm"
                          className="bg-electric-600 hover:bg-electric-500 text-xs font-semibold h-8 cursor-pointer"
                        >
                          <span>Convert to Deal</span>
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
