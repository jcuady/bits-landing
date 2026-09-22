"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";
import {
  PhoneCall,
  TrendingUp,
  Mail,
  CreditCard,
  Bot,
  Database,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Lock,
  Layers,
  CheckCircle2,
  Workflow,
  Radio,
  FileText,
  Filter,
  Columns3,
} from "lucide-react";

export type CrmVariantId = "service" | "sales" | "marketing" | "commerce";

interface CrmVariantData {
  id: CrmVariantId;
  name: string;
  badge: string;
  isFlagship: boolean;
  tagline: string;
  description: string;
  metric: { label: string; value: string; detail: string };
  compliance: string[];
  capabilities: string[];
  ctaLabel: string;
}

const CRM_VARIANTS: CrmVariantData[] = [
  {
    id: "service",
    name: "BITScrm Customer Service",
    badge: "Primary Flagship Platform",
    isFlagship: true,
    tagline: "Collections, Customer Care & High-Volume Contact Center Core",
    description:
      "Our core flagship system built for debt recovery agencies, BPO contact centers, and financial lenders. Centralizes delinquent portfolio staging, WebRTC predictive softphone dialing, automated Promise-to-Pay (PTP) tracking, and live supervisor barge-in.",
    metric: {
      label: "Right-Party Connect",
      value: "3.2x Boost",
      detail: "vs. spreadsheet calling",
    },
    compliance: [
      "HIPAA Security Rule Aligned",
      "SOC 2 Type II Controls",
      "BSP Circulars 454/857",
      "NPC RA 10173 DPA",
    ],
    capabilities: [
      "Dynamic Debtor & Account Staging Queues",
      "WebRTC In-Browser SIP Softphone & Auto-Dialer",
      "Automated Promise-to-Pay (PTP) Scheduling Engine",
      "Live Supervisor Listen, Whisper & Barge-in HUD",
      "Dual-Channel Call Audio Archiving & Scorecards",
      "Immutable Audit Trails & Strict Contact Hour Enforcing",
    ],
    ctaLabel: "Schedule Service Demo",
  },
  {
    id: "sales",
    name: "BITScrm Sales",
    badge: "Revenue CRM Variant",
    isFlagship: false,
    tagline: "High-Velocity Revenue Pipeline, Kanban & Deal Intelligence",
    description:
      "Engineered for institutional sales, B2B deal structuring, and corporate loan origination. Combines visual Kanban pipeline stages, AI deal win-probability scoring, automated territory routing, and CPQ quote-to-cash workflows.",
    metric: {
      label: "Pipeline Velocity",
      value: "+38% Faster",
      detail: "accelerated deal cycles",
    },
    compliance: [
      "SOC 2 Type II Controls",
      "Granular RBAC Permissions",
      "Encrypted Quote Documents",
      "NPC RA 10173 DPA",
    ],
    capabilities: [
      "Multi-Stage Visual Deal Pipeline Kanban",
      "Predictive AI Lead Scoring & Win Probability",
      "Automated Territory & Representative Routing",
      "CPQ (Configure, Price, Quote) Generator",
      "Two-Way Email & Calendar Activity Sync",
      "Executive Revenue Forecasting & Closed-Won Cockpit",
    ],
    ctaLabel: "Schedule Sales Demo",
  },
  {
    id: "marketing",
    name: "BITScrm Marketing",
    badge: "Audience Journeys Variant",
    isFlagship: false,
    tagline: "Omnichannel Customer Journeys & Audience Automation",
    description:
      "Orchestrate multi-touch customer acquisition, debtor re-engagement, and loan lifecycle journeys across email, SMS, messaging channels, and webhooks with closed-loop attribution analytics.",
    metric: {
      label: "Engagement Lift",
      value: "4.5x Higher",
      detail: "omnichannel response rate",
    },
    compliance: [
      "NPC RA 10173 DPA",
      "CAN-SPAM & TCPA Alignment",
      "Automated Opt-Out Engine",
      "Encrypted Customer PII",
    ],
    capabilities: [
      "Visual Multi-Branch Customer Journey Builder",
      "Dynamic Audience Segmentation & Behavioral Tags",
      "Automated SMS & Email Drip Sequences",
      "Multi-Channel Event Webhook Triggers",
      "Full-Funnel Conversion Attribution Analytics",
      "Strict Consent, Opt-In & Unsubscribe Governance",
    ],
    ctaLabel: "Schedule Marketing Demo",
  },
  {
    id: "commerce",
    name: "BITScrm Commerce",
    badge: "Billing & Storefront Variant",
    isFlagship: false,
    tagline: "B2B/B2C Digital Storefronts, Invoicing & Subscription Engine",
    description:
      "Unified commerce architecture supporting flexible recurring subscriptions, usage-based billing, multi-currency invoicing, dunning recovery, and tokenized payment gateway integrations.",
    metric: {
      label: "Billing Accuracy",
      value: "99.99%",
      detail: "zero calculation variance",
    },
    compliance: [
      "PCI-DSS Level 1 Ready",
      "SOC 2 Type II Controls",
      "256-Bit TLS Financial Encryption",
      "Tamper-Evident Ledger Logs",
    ],
    capabilities: [
      "Recurring Subscription & Usage-Based Metering",
      "B2B Product & Digital Service Catalog",
      "Tokenized Multi-Gateway Payment Processing",
      "Automated Tax Calculation & Compliant Invoicing",
      "Smart Dunning & Failed Payment Auto-Recovery",
      "General Ledger & ERP Accounting Sync",
    ],
    ctaLabel: "Schedule Commerce Demo",
  },
];

export function CrmVariantsExplorer() {
  const [activeVariantId, setActiveVariantId] = React.useState<CrmVariantId>("service");
  const currentVariant =
    CRM_VARIANTS.find((v) => v.id === activeVariantId) || CRM_VARIANTS[0];

  return (
    <section id="crm-variants" className="relative overflow-hidden bg-white py-20 sm:py-28 border-y border-slate-200/80 text-slate-900">
      {/* Light Ambient Background Grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(59,130,246,0.06),transparent_80%)]" />
        <div className="absolute -left-40 top-1/3 size-[550px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 size-[550px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
        <div className="absolute inset-0 bg-grid-light opacity-50" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <Sparkles className="size-3.5 text-blue-600" />
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Modular Platform Architecture
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              One Unified CRM Core.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Four Specialized Operational Variants.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600">
              While our flagship <strong className="text-slate-900">Customer Service CRM</strong> powers mission-critical
              contact center operations, BITS provides specialized variants for sales, marketing, and commerce—all
              sharing the same unified data layer and AI automation.
            </p>
          </Reveal>

          {/* Variant Selector Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CRM_VARIANTS.map((variant) => {
              const isSelected = activeVariantId === variant.id;
              const Icon =
                variant.id === "service"
                  ? PhoneCall
                  : variant.id === "sales"
                  ? TrendingUp
                  : variant.id === "marketing"
                  ? Mail
                  : CreditCard;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setActiveVariantId(variant.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold transition-all sm:text-sm",
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-600/20"
                      : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-900 shadow-2xs"
                  )}
                >
                  <Icon className={cn("size-4", isSelected ? "text-white" : "text-slate-500")} />
                  <span>{variant.name}</span>
                  {variant.isFlagship && (
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[0.62rem] font-extrabold uppercase",
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-blue-100 text-blue-700"
                      )}
                    >
                      Flagship
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Variant Active Showcase: Clean White Light Mode */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Variant Details & Capabilities */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-wider",
                      currentVariant.isFlagship
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-slate-100 text-slate-700 border border-slate-200"
                    )}
                  >
                    {currentVariant.badge}
                  </span>
                  {currentVariant.isFlagship && (
                    <span className="flex items-center gap-1 text-[0.7rem] font-bold text-amber-600">
                      <Zap className="size-3.5 fill-amber-500 text-amber-500" />
                      Core Operational Flagship
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {currentVariant.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-blue-600">
                  {currentVariant.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {currentVariant.description}
                </p>
              </div>

              {/* Metric Callout Card */}
              <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 shadow-2xs">
                <div className="text-3xl font-extrabold text-blue-600 font-mono sm:text-4xl">
                  {currentVariant.metric.value}
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-500">
                    {currentVariant.metric.label}
                  </p>
                  <p className="text-xs font-semibold text-slate-800">
                    {currentVariant.metric.detail}
                  </p>
                </div>
              </div>

              {/* Compliance Badges */}
              <div>
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Statutory & Security Compliance
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentVariant.compliance.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[0.7rem] font-semibold text-slate-700 shadow-2xs"
                    >
                      <ShieldCheck className="size-3.5 text-blue-600" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capabilities List */}
              <div className="space-y-2 pt-1">
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400">
                  Core Variant Capabilities
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {currentVariant.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="size-4 shrink-0 text-emerald-600 mt-0.5" />
                      <span className="leading-snug">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href="/#contact"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
                  >
                    <span>{currentVariant.ctaLabel}</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Magnetic>
                <Link
                  href="/#products-suite"
                  className="text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  View All 15 BITS Products →
                </Link>
              </div>
            </div>

            {/* Right Column: monday.com Style Light Mode Board Preview */}
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
                <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/80 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-60">
                      <span className="size-2.5 rounded-full bg-rose-400" />
                      <span className="size-2.5 rounded-full bg-amber-400" />
                      <span className="size-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <span className="text-xs font-bold text-slate-800">{currentVariant.name}</span>
                    <span className="rounded bg-slate-200/70 px-2 py-0.5 text-[0.62rem] font-bold text-slate-600">
                      Live CRM Board
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[0.68rem] text-slate-500 font-medium hidden sm:inline-flex items-center gap-1">
                      <Filter className="size-3" /> Filter
                    </span>
                    <span className="inline-flex size-2 rounded-full bg-emerald-500" />
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  {activeVariantId === "service" && <ServiceMockupLight />}
                  {activeVariantId === "sales" && <SalesMockupLight />}
                  {activeVariantId === "marketing" && <MarketingMockupLight />}
                  {activeVariantId === "commerce" && <CommerceMockupLight />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Universal Interconnect Spotlight: BITSagent AI & BITS RAG in Crisp Light Mode */}
        <div className="mt-16">
          <div className="mx-auto max-w-3xl text-center mb-10">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
              Universal Intelligence Layer
            </span>
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl mt-2">
              Connect BITSagent AI & BITS RAG to Any CRM Variant
            </h3>
            <p className="mt-3 text-sm text-slate-600">
              Zero vendor lock-in. BITSagent autonomous voice/email agents and BITS RAG knowledge grounding integrate
              natively across Customer Service, Sales, Marketing, Commerce, or your legacy databases and telephony backbones.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 1. BITSagent AI Connector Card */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-white p-6 sm:p-8 shadow-xl shadow-blue-900/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 border border-blue-200">
                  <Bot className="size-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">Universal BITSagent AI Connector</h4>
                  <p className="text-xs text-blue-600 font-mono">Autonomous Voice, SMS, Email & Telephony</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-600">
                Deploy autonomous voice agents that speak with natural human inflections (&lt; 300ms latency) to negotiate
                debt collections, qualify sales leads, trigger marketing surveys, or process recurring payments.
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                  <CheckCircle2 className="size-4 text-blue-600 shrink-0" />
                  <span>Connects to WebRTC softphones, SIP PBX trunks & VoIP providers</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                  <CheckCircle2 className="size-4 text-blue-600 shrink-0" />
                  <span>Multi-turn negotiation for payment arrangements & loan agreements</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                  <CheckCircle2 className="size-4 text-blue-600 shrink-0" />
                  <span>Instant warm-transfer escalation to live human floor agents</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/bitsagent"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>Explore BITSagent AI Capabilities</span>
                  <ArrowRight className="size-3.5" />
                </Link>
                <span className="font-mono text-[0.65rem] text-slate-400">REST / WebSockets / Webhook</span>
              </div>
            </div>

            {/* 2. BITS RAG Knowledge Engine Card */}
            <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-white p-6 sm:p-8 shadow-xl shadow-indigo-900/5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 border border-indigo-200">
                  <Database className="size-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">BITS RAG Enterprise Knowledge</h4>
                  <p className="text-xs text-indigo-600 font-mono">Real-Time Knowledge Grounding Layer</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-600">
                Eliminate AI hallucinations completely. BITS RAG indexes company policy PDFs, collections playbooks,
                credit scoring rubrics, and ERP catalogs to ground every agent answer in verified source documents.
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                  <CheckCircle2 className="size-4 text-indigo-600 shrink-0" />
                  <span>Sub-150ms semantic search over 100,000+ corporate documents</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                  <CheckCircle2 className="size-4 text-indigo-600 shrink-0" />
                  <span>Every AI statement backed by exact document & timestamp citations</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200">
                  <CheckCircle2 className="size-4 text-indigo-600 shrink-0" />
                  <span>Automated daily synchronization with enterprise SQL and file stores</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  <span>Request Enterprise RAG Scoping</span>
                  <ArrowRight className="size-3.5" />
                </Link>
                <span className="font-mono text-[0.65rem] text-slate-400">Hybrid Vector Search</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ── Light Mode UI Mockup Boards for Each CRM Variant ── */

function ServiceMockupLight() {
  const [activeItem, setActiveItem] = React.useState<string>("#PTP-8891");
  const [toast, setToast] = React.useState<string | null>(null);

  const handleAction = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-3 font-sans">
      {/* Customer Benefit Callout */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-2.5 text-xs">
        <p className="text-[0.72rem] text-blue-950 font-medium">
          <strong className="font-bold text-blue-700">How this helps you: </strong>
          Prioritizes active PTP collections, reduces repeat calls by 45%, and enforces BSP compliance quiet hours automatically.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-blue-200 bg-white p-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-blue-600 text-white">
            <PhoneCall className="size-3.5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Debtor: Carlos Mendoza (#4920)</p>
            <p className="text-[0.68rem] text-slate-500">Balance: ₱68,000 · 60 DPD · PTP Negotiation</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleAction("🎙️ Coach whisper sent to agent: 'Offer 2-month split terms for Carlos Mendoza.'")}
          className="rounded-lg bg-blue-600 px-2.5 py-1 text-[0.68rem] font-bold text-white hover:bg-blue-700 active:scale-95 cursor-pointer shadow-xs"
        >
          Whisper Coaching 🎙️
        </button>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-[0.72rem] font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2">Work Item (Click row)</th>
              <th className="p-2">Status</th>
              <th className="p-2">Commitment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.7rem]">
            <tr
              onClick={() => {
                setActiveItem("#PTP-8891");
                handleAction("✓ #PTP-8891 selected. SMS reminder scheduled for Sept 25.");
              }}
              className={cn("transition-colors cursor-pointer", activeItem === "#PTP-8891" ? "bg-blue-50/60 font-medium" : "hover:bg-slate-50")}
            >
              <td className="p-2 font-bold text-slate-900">#PTP-8891 Installment 1/2</td>
              <td className="p-2">
                <span className="rounded bg-[#00c875] px-2 py-0.5 text-[0.62rem] font-bold text-white">PTP Confirmed</span>
              </td>
              <td className="p-2 font-mono text-slate-700">₱20,000 Due Sept 25</td>
            </tr>
            <tr
              onClick={() => {
                setActiveItem("HUD");
                handleAction("✓ Supervisor Audio Barge HUD enabled on SRTP channel.");
              }}
              className={cn("transition-colors cursor-pointer", activeItem === "HUD" ? "bg-blue-50/60 font-medium" : "hover:bg-slate-50")}
            >
              <td className="p-2 font-bold text-slate-900">Supervisor Audio Barge HUD</td>
              <td className="p-2">
                <span className="rounded bg-[#0073ea] px-2 py-0.5 text-[0.62rem] font-bold text-white">Barge Ready</span>
              </td>
              <td className="p-2 text-slate-600">Dual-Channel SRTP</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SalesMockupLight() {
  const [activeDeal, setActiveDeal] = React.useState<string>("Apex");
  const [toast, setToast] = React.useState<string | null>(null);

  const handleAction = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-3 font-sans">
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-2.5 text-xs">
        <p className="text-[0.72rem] text-emerald-950 font-medium">
          <strong className="font-bold text-emerald-700">How this helps you: </strong>
          Automatically scores and distributes inbound enterprise leads within 30 seconds—shortening sales cycles by 38%.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-white p-3 shadow-2xs">
        <div>
          <p className="text-xs font-bold text-slate-900">BITScrm Sales · Pipeline Stages</p>
          <p className="text-[0.68rem] text-slate-500">Active Deals: 11 Accounts · AI Lead Routing</p>
        </div>
        <button
          type="button"
          onClick={() => handleAction("⚡ Deal advanced! 'Apex Global BPO' moved to 'Contract Negotiation' stage (+₱4.2M).")}
          className="rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-emerald-700 active:scale-95 cursor-pointer shadow-xs"
        >
          Advance Deal ⚡
        </button>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-[0.72rem] font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2">Deal Name (Click row)</th>
              <th className="p-2">Stage</th>
              <th className="p-2">Contract Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.7rem]">
            <tr
              onClick={() => {
                setActiveDeal("Apex");
                handleAction("✓ Apex Global BPO selected. Win probability: 70%. Follow-up task assigned.");
              }}
              className={cn("transition-colors cursor-pointer", activeDeal === "Apex" ? "bg-emerald-50/60 font-medium" : "hover:bg-slate-50")}
            >
              <td className="p-2 font-bold text-slate-900">Apex Global BPO</td>
              <td className="p-2">
                <span className="rounded bg-[#0073ea] px-2 py-0.5 text-[0.62rem] font-bold text-white">Proposal Sent</span>
              </td>
              <td className="p-2 font-mono text-slate-800">₱4.2M (Prob 70%)</td>
            </tr>
            <tr
              onClick={() => {
                setActiveDeal("Pacific");
                handleAction("✓ Pacific Recovery selected. Closed-Won! Invoice generated in ERP.");
              }}
              className={cn("transition-colors cursor-pointer", activeDeal === "Pacific" ? "bg-emerald-50/60 font-medium" : "hover:bg-slate-50")}
            >
              <td className="p-2 font-bold text-slate-900">Pacific Recovery</td>
              <td className="p-2">
                <span className="rounded bg-[#00c875] px-2 py-0.5 text-[0.62rem] font-bold text-white">Closed-Won</span>
              </td>
              <td className="p-2 font-mono text-emerald-700 font-bold">₱7.4M (3-Yr Term)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MarketingMockupLight() {
  const [toast, setToast] = React.useState<string | null>(null);

  const handleAction = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-3 font-sans">
      <div className="rounded-xl border border-pink-200 bg-pink-50/70 p-2.5 text-xs">
        <p className="text-[0.72rem] text-pink-950 font-medium">
          <strong className="font-bold text-pink-700">How this helps you: </strong>
          Recovers delinquent contacts through automated multi-channel drips (SMS, Viber, Email), delivering 42% portal open rates.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-pink-200 bg-white p-3 shadow-2xs">
        <div>
          <p className="text-xs font-bold text-slate-900">Customer Journey Automation</p>
          <p className="text-[0.68rem] text-slate-500">Delinquent 30-DPD Drip · Consent Verified</p>
        </div>
        <button
          type="button"
          onClick={() => handleAction("📲 1,840 SMS payment reminders fired through Semaphore gateway!")}
          className="rounded-lg bg-pink-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-pink-700 active:scale-95 cursor-pointer shadow-xs"
        >
          Trigger Drip Broadcast 📲
        </button>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-[0.72rem] font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2">Step</th>
              <th className="p-2">Status</th>
              <th className="p-2">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.7rem]">
            <tr
              onClick={() => handleAction("✓ SMS Portal Link analytics: 99% delivery rate across Smart and Globe networks.")}
              className="hover:bg-slate-50 cursor-pointer"
            >
              <td className="p-2 font-bold text-slate-900">1. SMS Portal Link</td>
              <td className="p-2">
                <span className="rounded bg-[#00c875] px-2 py-0.5 text-[0.62rem] font-bold text-white">Delivered 99%</span>
              </td>
              <td className="p-2 font-mono text-blue-600">42% Open Rate</td>
            </tr>
            <tr
              onClick={() => handleAction("✓ AI Voice Escalation queued: 48-hour quiet hour window strictly enforced.")}
              className="hover:bg-slate-50 cursor-pointer"
            >
              <td className="p-2 font-bold text-slate-900">2. AI Voice Escalation</td>
              <td className="p-2">
                <span className="rounded bg-[#a25ddc] px-2 py-0.5 text-[0.62rem] font-bold text-white">Trigger (48h)</span>
              </td>
              <td className="p-2 font-mono text-purple-600">BITSagent Queue</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CommerceMockupLight() {
  const [toast, setToast] = React.useState<string | null>(null);

  const handleAction = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-3 font-sans">
      <div className="rounded-xl border border-cyan-200 bg-cyan-50/70 p-2.5 text-xs">
        <p className="text-[0.72rem] text-cyan-950 font-medium">
          <strong className="font-bold text-cyan-700">How this helps you: </strong>
          PCI-DSS Level 1 compliant tokenized billing. Automatically charges monthly retainers via credit card or Maya without manual invoicing.
        </p>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-cyan-200 bg-white p-3 shadow-2xs">
        <div>
          <p className="text-xs font-bold text-slate-900">Invoicing & Recurring Subscriptions</p>
          <p className="text-[0.68rem] text-slate-500">PCI-DSS Level 1 Ready · Tokenized Gateways</p>
        </div>
        <button
          type="button"
          onClick={() => handleAction("✓ Auto-debit verified: 120 Enterprise Seat retainers billed successfully (+₱180,000).")}
          className="rounded-lg bg-cyan-600 px-2.5 py-1 text-xs font-bold text-white hover:bg-cyan-700 active:scale-95 cursor-pointer shadow-xs"
        >
          Execute Auto-Debit 💳
        </button>
      </div>

      {toast && (
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-2 text-[0.72rem] font-bold text-emerald-800 animate-fade-in">
          {toast}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xs">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-50/90 text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
            <tr>
              <th className="p-2">Item</th>
              <th className="p-2">Model</th>
              <th className="p-2">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[0.7rem]">
            <tr
              onClick={() => handleAction("✓ 120 Enterprise Seats: Tokenized payment on file. Next billing date: Oct 1.")}
              className="hover:bg-slate-50 cursor-pointer"
            >
              <td className="p-2 font-bold text-slate-900">Enterprise Seat Licenses (120)</td>
              <td className="p-2">Monthly Retainer</td>
              <td className="p-2">
                <span className="rounded bg-[#00c875] px-2 py-0.5 text-[0.62rem] font-bold text-white">Paid</span>
              </td>
            </tr>
            <tr
              onClick={() => handleAction("✓ Metered SIP Telephony: 64,000 mins reconciled with Philippine carrier invoice.")}
              className="hover:bg-slate-50 cursor-pointer"
            >
              <td className="p-2 font-bold text-slate-900">Metered SIP Telephony</td>
              <td className="p-2">64,000 Mins</td>
              <td className="p-2">
                <span className="rounded bg-[#0073ea] px-2 py-0.5 text-[0.62rem] font-bold text-white">Reconciled</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
