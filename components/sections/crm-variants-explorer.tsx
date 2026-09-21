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
    <section id="crm-variants" className="relative overflow-hidden bg-slate-900 py-24 sm:py-32 text-white">
      {/* Dynamic Background Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(37,99,235,0.2),transparent_70%)]" />
        <div className="absolute -left-40 top-1/3 size-[550px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 size-[550px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-dark opacity-30" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
              <Sparkles className="size-3.5 text-cyan-300" />
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-cyan-300">
                Modular Platform Architecture
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              One Unified CRM Core.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Four Specialized Operational Variants.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-300">
              While our flagship <strong className="text-white">Customer Service CRM</strong> powers mission-critical
              contact center operations, BITS provides specialized variants for sales, marketing, and commerce—all
              sharing the same unified data layer and AI automation.
            </p>
          </Reveal>

          {/* Variant Selector Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
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
                    "flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs font-bold transition-all sm:text-sm",
                    isSelected
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-cyan-400/40"
                      : "border border-slate-700/80 bg-slate-800/80 text-slate-300 hover:border-slate-600 hover:bg-slate-700/70 hover:text-white"
                  )}
                >
                  <Icon className={cn("size-4", isSelected ? "text-cyan-300" : "text-slate-400")} />
                  <span>{variant.name}</span>
                  {variant.isFlagship && (
                    <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[0.62rem] font-extrabold text-cyan-300 uppercase">
                      Flagship
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Variant Active Showcase */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Variant Details & Capabilities */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-wider",
                      currentVariant.isFlagship
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                        : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                    )}
                  >
                    {currentVariant.badge}
                  </span>
                  {currentVariant.isFlagship && (
                    <span className="flex items-center gap-1 text-[0.7rem] font-bold text-amber-300">
                      <Zap className="size-3.5 fill-amber-300" />
                      Core Operational Flagship
                    </span>
                  )}
                </div>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {currentVariant.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-cyan-400">
                  {currentVariant.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {currentVariant.description}
                </p>
              </div>

              {/* Metric Callout Card */}
              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-4">
                <div className="text-3xl font-extrabold text-cyan-300 font-mono sm:text-4xl">
                  {currentVariant.metric.value}
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {currentVariant.metric.label}
                  </p>
                  <p className="text-xs text-slate-300">
                    {currentVariant.metric.detail}
                  </p>
                </div>
              </div>

              {/* Compliance Badges */}
              <div>
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400 mb-2">
                  Statutory & Security Compliance
                </p>
                <div className="flex flex-wrap gap-2">
                  {currentVariant.compliance.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-[0.72rem] font-medium text-slate-300"
                    >
                      <ShieldCheck className="size-3.5 text-cyan-400" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capabilities List */}
              <div className="space-y-2 pt-2">
                <p className="text-[0.68rem] font-mono uppercase tracking-widest text-slate-400">
                  Core Variant Capabilities
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {currentVariant.capabilities.map((cap) => (
                    <div key={cap} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="size-4 shrink-0 text-cyan-400 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Row */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href="/#contact"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-500 active:scale-[0.98]"
                  >
                    <span>{currentVariant.ctaLabel}</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Magnetic>
                <Link
                  href="/#products-suite"
                  className="text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
                >
                  View All 15 BITS Products →
                </Link>
              </div>
            </div>

            {/* Right Column: Live Mockup Preview */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl">
                {activeVariantId === "service" && <ServiceMockup />}
                {activeVariantId === "sales" && <SalesMockup />}
                {activeVariantId === "marketing" && <MarketingMockup />}
                {activeVariantId === "commerce" && <CommerceMockup />}
              </div>
            </div>
          </div>
        </div>

        {/* Universal Interconnect Spotlight: BITSagent AI & BITS RAG */}
        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em] text-cyan-300">
              Universal Intelligence Layer
            </span>
            <h3 className="text-2xl font-bold text-white sm:text-3xl mt-2">
              Connect BITSagent AI & BITS RAG to Any CRM Variant
            </h3>
            <p className="mt-3 text-sm text-slate-300">
              Zero vendor lock-in. BITSagent autonomous voice/email agents and BITS RAG knowledge grounding integrate
              natively across Customer Service, Sales, Marketing, Commerce, or your legacy databases and telephony backbones.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 1. BITSagent AI Connector Card */}
            <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 to-slate-950 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  <Bot className="size-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">Universal BITSagent AI Connector</h4>
                  <p className="text-xs text-cyan-300 font-mono">Autonomous Voice, SMS, Email & Telephony</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-300">
                Deploy autonomous voice agents that speak with natural human inflections (&lt; 300ms latency) to negotiate
                debt collections, qualify sales leads, trigger marketing surveys, or process recurring payments.
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0" />
                  <span>Connects to WebRTC softphones, SIP PBX trunks & VoIP providers</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0" />
                  <span>Multi-turn negotiation for payment arrangements & loan agreements</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800">
                  <CheckCircle2 className="size-4 text-cyan-400 shrink-0" />
                  <span>Instant warm-transfer escalation to live human floor agents</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href="/bitsagent"
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  <span>Explore BITSagent AI Capabilities</span>
                  <ArrowRight className="size-3.5" />
                </Link>
                <span className="font-mono text-[0.65rem] text-slate-400">REST / WebSockets / Webhook</span>
              </div>
            </div>

            {/* 2. BITS RAG Knowledge Engine Card */}
            <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-indigo-950/40 to-slate-950 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  <Database className="size-5" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">BITS RAG Enterprise Knowledge</h4>
                  <p className="text-xs text-indigo-300 font-mono">Real-Time Knowledge Grounding Layer</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-slate-300">
                Eliminate AI hallucinations completely. BITS RAG indexes company policy PDFs, collections playbooks,
                credit scoring rubrics, and ERP catalogs to ground every agent answer in verified source documents.
              </p>

              <div className="mt-5 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800">
                  <CheckCircle2 className="size-4 text-indigo-400 shrink-0" />
                  <span>Sub-150ms semantic search over 100,000+ corporate documents</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800">
                  <CheckCircle2 className="size-4 text-indigo-400 shrink-0" />
                  <span>Every AI statement backed by exact document & timestamp citations</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-900/90 p-2.5 border border-slate-800">
                  <CheckCircle2 className="size-4 text-indigo-400 shrink-0" />
                  <span>Automated daily synchronization with enterprise SQL and file stores</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300 hover:text-indigo-200 transition-colors"
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

/* ── UI Mockups for each Variant ── */

function ServiceMockup() {
  return (
    <div className="rounded-xl bg-slate-950 p-4 font-sans text-white border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono font-bold">BITScrm Service · Live Softphone</span>
        </div>
        <span className="font-mono text-[0.68rem] text-cyan-300">SIP Active: 03:42</span>
      </div>

      <div className="mt-3 rounded-xl bg-gradient-to-r from-blue-950 to-slate-900 p-3 border border-blue-500/30 text-xs">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-white">Debtor: Carlos Mendoza · Acc #4928</p>
            <p className="text-[0.65rem] text-slate-300">Principal: ₱68,000 · 60 DPD · PTP Negotiation</p>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[0.62rem] text-emerald-300 font-bold">
            Live Whisper OK
          </span>
        </div>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center justify-between rounded-lg bg-slate-900 p-2 border border-slate-800">
          <div>
            <p className="font-bold text-slate-200">#PTP-8891 · ₱20,000 Installment 1/2</p>
            <p className="text-[0.65rem] text-slate-400">Due Sept 25 · SMS Payment Portal link dispatched</p>
          </div>
          <span className="font-mono text-[0.65rem] text-emerald-400 font-bold">PTP CONFIRMED</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-slate-900 p-2 border border-slate-800">
          <div>
            <p className="font-bold text-slate-200">Supervisor Audio HUD</p>
            <p className="text-[0.65rem] text-slate-400">Listen, whisper coach, or barge into agent audio stream</p>
          </div>
          <span className="font-mono text-[0.65rem] text-cyan-300">BARGE READY</span>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-800 pt-2 flex justify-between text-[0.65rem] text-slate-400">
        <span>BSP 454/857 Compliant</span>
        <span>Audio Encryption: SRTP / TLS 1.3</span>
      </div>
    </div>
  );
}

function SalesMockup() {
  return (
    <div className="rounded-xl bg-slate-950 p-4 font-sans text-white border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs">
        <div className="flex items-center gap-2">
          <TrendingUp className="size-4 text-emerald-400" />
          <span className="font-mono font-bold">BITScrm Sales · Pipeline HUD</span>
        </div>
        <span className="font-mono text-[0.68rem] text-emerald-400">Weighted: ₱18.4M</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[0.7rem]">
        <div className="rounded-lg bg-slate-900 p-2 border border-slate-800">
          <p className="font-bold text-slate-400 text-[0.65rem]">SCOPING (4)</p>
          <div className="mt-1.5 rounded bg-slate-950 p-1.5 border border-slate-800">
            <p className="font-bold text-white">Apex Global BPO</p>
            <p className="text-[0.62rem] text-slate-400">₱4.2M · Prob 70%</p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 p-2 border border-blue-500/30">
          <p className="font-bold text-blue-400 text-[0.65rem]">CPQ QUOTE (2)</p>
          <div className="mt-1.5 rounded bg-slate-950 p-1.5 border border-blue-500/30">
            <p className="font-bold text-white">Metro Finance Inc</p>
            <p className="text-[0.62rem] text-cyan-300">₱6.8M · Contract Sent</p>
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 p-2 border border-emerald-500/30">
          <p className="font-bold text-emerald-400 text-[0.65rem]">CLOSED-WON (5)</p>
          <div className="mt-1.5 rounded bg-emerald-950/40 p-1.5 border border-emerald-500/30">
            <p className="font-bold text-emerald-200">Pacific Recovery</p>
            <p className="text-[0.62rem] text-emerald-400">₱7.4M · 3-Yr Term</p>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-800 pt-2 flex justify-between text-[0.65rem] text-slate-400">
        <span>Lead Scoring: AI Grounded</span>
        <span>Territory: Enterprise Multi-Tenant</span>
      </div>
    </div>
  );
}

function MarketingMockup() {
  return (
    <div className="rounded-xl bg-slate-950 p-4 font-sans text-white border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs">
        <div className="flex items-center gap-2">
          <Mail className="size-4 text-purple-400" />
          <span className="font-mono font-bold">BITScrm Marketing · Customer Journey</span>
        </div>
        <span className="font-mono text-[0.68rem] text-purple-300">30-DPD Drip Active</span>
      </div>

      <div className="mt-3 space-y-2 text-xs">
        <div className="flex items-center gap-2 rounded-lg bg-slate-900 p-2 border border-slate-800">
          <span className="size-5 rounded-full bg-blue-600 flex items-center justify-center text-[0.65rem] font-bold">1</span>
          <div>
            <p className="font-bold text-white">Event: Delinquent Status Shift (30 DPD)</p>
            <p className="text-[0.65rem] text-slate-400">Audience: 1,840 Records Enrolled</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-900 p-2 border border-slate-800">
          <span className="size-5 rounded-full bg-indigo-600 flex items-center justify-center text-[0.65rem] font-bold">2</span>
          <div>
            <p className="font-bold text-white">Action: Automated SMS with Secure Portal Link</p>
            <p className="text-[0.65rem] text-emerald-400">Delivered: 99.4% · Open: 42.1%</p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-slate-900 p-2 border border-purple-500/30">
          <span className="size-5 rounded-full bg-purple-600 flex items-center justify-center text-[0.65rem] font-bold">3</span>
          <div>
            <p className="font-bold text-white">Trigger: If No Payment in 48h → BITSagent AI Call</p>
            <p className="text-[0.65rem] text-cyan-300">Automated queue routing to voice bot</p>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-800 pt-2 flex justify-between text-[0.65rem] text-slate-400">
        <span>Opt-Out Rate: 0.08%</span>
        <span>NPC DPA Consent Validated</span>
      </div>
    </div>
  );
}

function CommerceMockup() {
  return (
    <div className="rounded-xl bg-slate-950 p-4 font-sans text-white border border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 text-xs">
        <div className="flex items-center gap-2">
          <CreditCard className="size-4 text-cyan-400" />
          <span className="font-mono font-bold">BITScrm Commerce · Invoicing Engine</span>
        </div>
        <span className="font-mono text-[0.68rem] text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
          PCI-DSS Level 1
        </span>
      </div>

      <div className="mt-3 rounded-lg bg-slate-900 p-3 border border-slate-800 text-xs">
        <div className="flex justify-between items-center border-b border-slate-800 pb-1.5">
          <p className="font-bold text-white">Monthly Enterprise Contract #INV-4920</p>
          <span className="text-emerald-400 font-mono font-bold">PAID</span>
        </div>
        <div className="mt-2 space-y-1 text-[0.68rem] text-slate-300">
          <div className="flex justify-between">
            <span>Seat Licenses (120 Users):</span>
            <span className="text-white font-mono">Scoped Retainer</span>
          </div>
          <div className="flex justify-between">
            <span>Metered Telephony (64,000 mins):</span>
            <span className="text-white font-mono">Usage Billed</span>
          </div>
          <div className="flex justify-between">
            <span>BITSagent Autonomous Voice Hours:</span>
            <span className="text-white font-mono">Included Tier</span>
          </div>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-800 pt-2 flex justify-between text-[0.65rem] text-slate-400">
        <span>Gateway: Multi-Bank Tokenized</span>
        <span>Dunning Recovery: 94.2%</span>
      </div>
    </div>
  );
}
