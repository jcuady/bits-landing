"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { cn } from "@/lib/utils";

type PricingTrack = "oms" | "crm" | "bundle";

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  highlight?: boolean;
  scaleBadge: string;
  description: string;
  indicativeModel: string;
  modelDetail: string;
  features: string[];
  ctaLabel: string;
  ctaSubject: string;
}

const trackTiers: Record<PricingTrack, PricingTier[]> = {
  oms: [
    {
      id: "starter",
      name: "Starter Floor",
      scaleBadge: "1 – 15 Team Members",
      description:
        "For boutique recovery teams and emerging operations replacing disorganized spreadsheets with a structured operations CRM and automated dialing.",
      indicativeModel: "Tailored Floor Quote",
      modelDetail: "Sized to initial seat count · Zero per-seat penalty traps",
      features: [
        "Full customer & account dossier with live operational aging",
        "Promise-to-Pay (PTP) tracking & automated broken-commitment alerts",
        "WebRTC in-browser softphone (Manual & Preview auto-dialing)",
        "Standard QA evaluation scorecards with synchronized call audio",
        "Automated customer SMS & email payment reminder templates",
        "Daily performance reports & automated CSV spreadsheet imports",
      ],
      ctaLabel: "Request Starter Floor Quote",
      ctaSubject: "Pricing Inquiry: Operations 360 Starter (1-15 Seats)",
    },
    {
      id: "growth",
      name: "Growth Floor",
      badge: "Most Popular for Scaling Floors",
      highlight: true,
      scaleBadge: "16 – 75+ Active Seats",
      description:
        "For scaling contact centers requiring automated predictive pacing, omnichannel messaging blasts, and live supervisor coaching to maximize floor throughput.",
      indicativeModel: "Volume-Tiered License",
      modelDetail: "Flexible monthly operational scope · Dedicated onboarding lead",
      features: [
        "Everything in Starter Floor, plus:",
        "Predictive & Progressive auto-dialer pacing (~0.4s call hand-off)",
        "Live Supervisor HUD: silent listen, whisper coaching & call barge-in",
        "Automated QA Outlier Finder & monthly agent coaching scorecards",
        "Omnichannel Messaging: SMS, Viber Business & WhatsApp blasts",
        "Real-time floor velocity dashboard & live agent performance leaderboards",
        "Statutory quiet-hours compliance & carrier-aware phone number scrubbing",
      ],
      ctaLabel: "Request Growth Floor Quote",
      ctaSubject: "Pricing Inquiry: Operations 360 Growth Floor (16-75+ Seats)",
    },
    {
      id: "enterprise",
      name: "Enterprise & Sovereign",
      badge: "Sovereign & Dedicated SLA",
      scaleBadge: "75+ to Unlimited Seats",
      description:
        "For BPO enterprises, financial institutions, and multi-campaign operations requiring bank-grade security, dedicated infrastructure, and custom workflows.",
      indicativeModel: "Enterprise Master Scope",
      modelDetail: "Private Cloud or Sovereign On-Premises · Bespoke SLA & DPA",
      features: [
        "Everything in Growth Floor, plus:",
        "Strict client & campaign portfolio tenant data isolation",
        "Six-tier role-based permission matrix (RBAC) & immutable WORM audit logs",
        "Sovereign Virtual Private Cloud (VPC) or Air-Gapped Bare-Metal Server deployment",
        "Core banking data ingestion & custom bi-directional API webhooks",
        "99.9% Telephony uptime Service Level Agreement (SLA)",
        "Direct senior software architect access & quarterly on-site operational review",
      ],
      ctaLabel: "Request Enterprise Master Scope",
      ctaSubject: "Pricing Inquiry: Operations 360 Enterprise Floor",
    },
  ],
  crm: [
    {
      id: "crm-starter",
      name: "Commercial CRM Core",
      scaleBadge: "1 – 10 Sales & Support Reps",
      description:
        "Visual deal pipelines, customer contact histories, and omnichannel ticketing for growing commercial sales and client service teams.",
      indicativeModel: "Flat Team License",
      modelDetail: "Transparent monthly fee · Full data ownership",
      features: [
        "Multi-stage visual deal pipeline Kanban (Drag-and-drop stages)",
        "Omnichannel unified customer helpdesk (Email, Live Chat & Webhooks)",
        "Automated quotation generator & custom CPQ PDF exports",
        "Activity tracking: Two-way email sync, call notes & meeting logs",
        "Contact & organization dossiers with custom custom field schemas",
        "Standard CSV lead import/export & basic revenue forecasting",
      ],
      ctaLabel: "Request Commercial CRM Quote",
      ctaSubject: "Pricing Inquiry: BITScrm Commercial Core",
    },
    {
      id: "crm-growth",
      name: "Revenue & Support Cloud",
      badge: "Best Value for Growth Teams",
      highlight: true,
      scaleBadge: "11 – 50 Reps & Agents",
      description:
        "Unified revenue acceleration combining sales pipelines, multi-tier P1-P4 customer support queues, and automated marketing drip journeys.",
      indicativeModel: "Mid-Market Revenue Scope",
      modelDetail: "All-in-one Sales + Support + Marketing · Dedicated onboarding",
      features: [
        "Everything in Commercial CRM Core, plus:",
        "Automated territory routing & predictive win-probability scoring",
        "Multi-tier P1–P4 SLA countdown timer & automatic ticket escalation",
        "Multi-branch customer marketing journey builder (SMS & Email sequences)",
        "One-click canned responses, resolution macros & CSAT surveys",
        "Commerce recurring subscription billing & dunning auto-recovery",
        "Cross-department analytics: Closed-Won Cockpit & First Contact Resolution",
      ],
      ctaLabel: "Request Revenue Cloud Quote",
      ctaSubject: "Pricing Inquiry: BITScrm Revenue & Support Cloud",
    },
    {
      id: "crm-enterprise",
      name: "Enterprise Commerce & Custom",
      badge: "Full Custom Integrations",
      scaleBadge: "50+ Enterprise Users",
      description:
        "For multi-brand enterprises, wholesale distributors, and retail networks requiring custom ERP interconnects and complex quote-to-cash pipelines.",
      indicativeModel: "Custom Enterprise Blueprint",
      modelDetail: "Unlimited workflows · Custom API webhooks · Dedicated SLA",
      features: [
        "Everything in Revenue & Support Cloud, plus:",
        "Multi-entity customer master data & intercompany account routing",
        "Custom billing engine: Usage-based, metered & multi-currency invoicing",
        "Direct bidirectional interconnect with BITS Accounting & Inventory",
        "Custom webhook triggers & legacy system API middleware",
        "Dedicated staging sandbox environment & bespoke training",
        "Enterprise RBAC permissions & compliance audit trail",
      ],
      ctaLabel: "Request Enterprise CRM Blueprint",
      ctaSubject: "Pricing Inquiry: BITScrm Enterprise Commerce",
    },
  ],
  bundle: [
    {
      id: "bundle-ai-ops",
      name: "Autonomous AI + Operations",
      scaleBadge: "Operations 360 + BITSagent",
      description:
        "Combine the Operations 360 platform with sub-300ms BITSagent Voice AI to automate routine phone calls and empower live agents with AI copilots.",
      indicativeModel: "Hybrid Human + AI Scope",
      modelDetail: "Floor license + AI voice minute bundle · 68% resolution rate",
      features: [
        "Full Operations 360 Command Center & Predictive Dialer",
        "BITSagent Autonomous Voice AI Agent for high-volume inbound/outbound",
        "Taglish conversational cadence & dynamic statutory quiet-hour governance",
        "Real-time call transcription, sentiment analysis & live copilot script tips",
        "Automated warm transfer to live human agents with complete dossier pop",
        "Shared analytics dashboard linking AI resolutions to bottom-line ROI",
      ],
      ctaLabel: "Explore AI + Operations Bundle",
      ctaSubject: "Pricing Inquiry: AI + Operations 360 Bundle",
    },
    {
      id: "bundle-erp-hrms",
      name: "Enterprise Business Engine",
      badge: "Complete Operational Core",
      highlight: true,
      scaleBadge: "Accounting + HRMS + Payroll + Fleet",
      description:
        "The end-to-end back-office operating system: double-entry bookkeeping, BIR CAS compliance, 24/7 biometric shift rostering, and fleet delivery dispatch.",
      indicativeModel: "Integrated Enterprise Suite",
      modelDetail: "Consolidate 4 software stacks into one unified system",
      features: [
        "BITS Accounting & ERP: Double-entry GL, AP/AR 3-way matching & tax reports",
        "BIR CAS (Computerized Accounting System) compliant data schemas",
        "BITS HRMS: 24/7 multi-shift rostering, biometric attendance & leave filing",
        "BITS Payroll: Automated TRAIN law statutory deductions & 1-click bank batch feeds",
        "BITS Logistics Cloud: Real-time GPS fleet tracking, route optimization & ePOD",
        "Unified cross-module ledger: Timesheets directly feed payroll & job costing",
      ],
      ctaLabel: "Request Business Engine Suite Quote",
      ctaSubject: "Pricing Inquiry: Complete ERP + HRMS + Logistics Suite",
    },
    {
      id: "bundle-whitelabel",
      name: "Universal White-Label Partner",
      badge: "100% Brand Ownership",
      scaleBadge: "Resellers & Enterprise Holdings",
      description:
        "Deploy any or all of our 18 software products under your own corporate identity, custom domain, logo, and color system with zero BITS attribution.",
      indicativeModel: "Wholesale Partner Agreement",
      modelDetail: "Retain 100% client margin · Custom domain & branded apps",
      features: [
        "Your logo, corporate domain (app.yourcompany.com) & custom CSS palette",
        "Zero BITS watermarks or attribution across user interface and emails",
        "Branded client onboarding documentation and white-labeled mobile apps",
        "Choose any of our 18 core software engines to resell or deploy internally",
        "Dedicated partner support engineering and sandbox demo tenant",
        "Strict Non-Disclosure Agreement (NDA) protecting your brand equity",
      ],
      ctaLabel: "Apply for White-Label Reseller",
      ctaSubject: "Pricing Inquiry: Universal White-Label Partnership",
    },
  ],
};

const otherProducts = [
  { name: "BITSagent Voice AI", category: "Autonomous Calling", href: "/operations-360/ai" },
  { name: "BITScrm Suite", category: "Sales & Support", href: "/products/crm" },
  { name: "BITS Accounting & ERP", category: "BIR CAS Core", href: "/products/accounting" },
  { name: "BITS HRMS & 24/7 Rostering", category: "Workforce", href: "/products/hrms" },
  { name: "BITS Logistics & Fleet", category: "Dispatch & GPS", href: "/products/logistics" },
  { name: "BITS Pickleball OS", category: "Court Queues", href: "/products/pickleball" },
  { name: "Universal White-Label", category: "Reseller Program", href: "/products/white-label" },
];

export function Pricing() {
  const { openModal } = useConsultationModal();
  const [activeTrack, setActiveTrack] = React.useState<PricingTrack>("oms");

  const currentTiers = trackTiers[activeTrack];

  return (
    <Section
      id="pricing"
      className="relative scroll-mt-28 sm:scroll-mt-36 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-20 sm:py-28 lg:py-32 border-b border-slate-200/80"
    >
      {/* Anchor alias for solutions navigation with negative offset to avoid floating header clipping */}
      <div id="solutions" className="absolute -top-28 sm:-top-36 pointer-events-none" />

      {/* Subtle Ambient Illumination */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-blue-100/30 via-sky-100/15 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* ── SECTION HEADER (Clean, Unclipped & Straightforward) ── */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <Reveal>
            <div className="mx-auto mb-3.5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-2xs">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              <span>TRANSPARENT COMMERCIAL LICENSING · ZERO PER-SEAT TRAPS</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight text-slate-900 leading-[1.14] text-balance">
              Predictable Investment.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Sized for Your True Scale.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty">
              Whether deploying our flagship Operations 360 platform, standalone CRM &amp; ERP engines, or a custom multi-product architecture, BITS delivers flat, volume-tiered licensing that scales with your business—not your headcount.
            </p>
          </Reveal>

          {/* ── INTERACTIVE PRODUCT TRACK SWITCHER (Tabs) ── */}
          <Reveal delay={0.08} className="mt-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-slate-100/80 p-1.5 shadow-inner">
              <button
                type="button"
                onClick={() => setActiveTrack("oms")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                  activeTrack === "oms"
                    ? "bg-white text-blue-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                )}
              >
                <span className="size-1.5 rounded-full bg-blue-600" />
                <span>Operations 360 (OMS Flagship)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTrack("crm")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                  activeTrack === "crm"
                    ? "bg-white text-blue-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                )}
              >
                <span className="size-1.5 rounded-full bg-indigo-600" />
                <span>BITScrm &amp; Revenue Cloud</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTrack("bundle")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer",
                  activeTrack === "bundle"
                    ? "bg-white text-blue-700 shadow-sm shadow-slate-900/5 ring-1 ring-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                )}
              >
                <span className="size-1.5 rounded-full bg-cyan-600" />
                <span>Multi-Product &amp; Custom Bundles</span>
              </button>
            </div>
          </Reveal>
        </div>

        {/* ── 3 MODERN TIERS (Sleek Glassmorphic Cards) ── */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:gap-8 lg:grid-cols-3 mb-16 sm:mb-20">
          {currentTiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 0.05} className="h-full">
              <div
                className={cn(
                  "h-full flex flex-col justify-between rounded-3xl p-6 sm:p-8 transition-all duration-300 relative bg-white",
                  tier.highlight
                    ? "border-2 border-blue-500/60 shadow-2xl shadow-blue-600/10 ring-4 ring-blue-500/10 lg:-translate-y-2"
                    : "border border-slate-200/90 shadow-xl shadow-slate-900/5 hover:border-slate-300 hover:shadow-2xl"
                )}
              >
                {/* Highlight Top Luminous Accent Line */}
                {tier.highlight && (
                  <div className="absolute top-0 inset-x-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-400" />
                )}

                {/* Card Body */}
                <div>
                  {/* Eyebrow Badge & Scale */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {tier.badge ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                        <span className="size-1 rounded-full bg-white/80" />
                        <span>{tier.badge}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        <span className="size-1.5 rounded-full bg-slate-400" />
                        <span>Standard Scope</span>
                      </span>
                    )}

                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                      {tier.scaleBadge}
                    </span>
                  </div>

                  {/* Tier Title */}
                  <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                    {tier.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {tier.description}
                  </p>

                  {/* Pricing Model Highlight Box */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 mb-6 transition-colors">
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1">
                      Pricing Framework
                    </div>
                    <div className="text-lg font-extrabold text-slate-900">
                      {tier.indicativeModel}
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {tier.modelDetail}
                    </p>
                  </div>

                  {/* Included Capabilities Checklist */}
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Included Capabilities:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-8">
                    {tier.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                        </span>
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openModal(tier.ctaSubject)}
                    className={cn(
                      "group w-full inline-flex min-h-[46px] items-center justify-between gap-3 rounded-full pl-6 pr-2 py-2 text-xs sm:text-sm font-bold shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer",
                      tier.highlight
                        ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25"
                        : "bg-slate-900 hover:bg-blue-600 text-white shadow-slate-900/10"
                    )}
                  >
                    <span>{tier.ctaLabel}</span>
                    <span className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform duration-200 font-bold">
                      →
                    </span>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── 4 UNIVERSAL VALUE PILLARS (Modern Clean Grid) ── */}
        <Reveal delay={0.1}>
          <div className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-9 shadow-lg shadow-slate-900/5 mb-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-2xs">
                  <span className="font-bold font-mono">01</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Per-Seat Penalty</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Scale your floor capacity freely. Never pay punitive fees for staff turnover or shifting agent rotations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 shadow-2xs">
                  <span className="font-bold font-mono">02</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">BSP &amp; NPC Sovereignty</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Air-gapped on-premises or private local cloud strictly aligned to BSP Circulars 454/857 and NPC RA 10173.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 shadow-2xs">
                  <span className="font-bold font-mono">03</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero PBX Markup</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    100% browser WebRTC softphone. Agents only need a standard headset and internet connection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 shadow-2xs">
                  <span className="font-bold font-mono">04</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Turnkey Migration</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Our solutions team sanitizes, formats, and migrates existing spreadsheets and trains your staff thoroughly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── CROSS-PORTFOLIO QUICK SCOPING BANNER ── */}
        <Reveal delay={0.14}>
          <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 p-7 sm:p-10 shadow-lg shadow-slate-900/5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              {/* Left: Headline & Engine Pills */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700 mb-3">
                  18 Connected Software Products
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
                  Need Pricing on a Standalone Software Engine?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  BITS also scopes and deploys modular systems across Autonomous Voice AI, Financial ERP, BPO Rostering, and Smart Venue Operating Systems.
                </p>

                {/* Available Product Badges */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {otherProducts.map((p) => (
                    <a
                      key={p.name}
                      href={p.href}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:text-blue-600 transition-colors shadow-2xs"
                    >
                      <span className="size-1.5 rounded-full bg-blue-600" />
                      <span>{p.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({p.category})</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: CTA Button */}
              <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={() => openModal("Inquiry: Custom Pricing for Other BITS Software Products")}
                  className="group w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 pl-6 pr-2 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/35 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                >
                  <span>Request Custom Software Quote</span>
                  <span className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-1 transition-transform duration-200 font-bold">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
