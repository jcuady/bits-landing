"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Check, Sparkles, Shield, Building2, PhoneCall, Users, ArrowRight } from "lucide-react";

interface OmsTier {
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

const omsTiers: OmsTier[] = [
  {
    id: "starter",
    name: "Starter Floor",
    scaleBadge: "1 – 15 Agents",
    description:
      "For boutique recovery teams and emerging operations replacing disorganized spreadsheets with a structured collections CRM and automated calling.",
    indicativeModel: "Tailored Floor Quote",
    modelDetail: "Sized to initial seat count · Zero per-seat lock-in penalties",
    features: [
      "Full debt account management with live DPD delinquency aging",
      "Promise-to-Pay (PTP) tracking & automated broken-payment alerts",
      "WebRTC in-browser softphone (Manual & Preview dialing)",
      "Standard QA evaluation scorecards with synchronized call audio",
      "Debtor SMS & email payment reminder templates",
      "Daily collections performance reports & automated CSV imports",
    ],
    ctaLabel: "Request Starter Quote",
    ctaSubject: "OMS Pricing: Starter Floor (1-15 Seats)",
  },
  {
    id: "growth",
    name: "Growth Floor",
    badge: "Most Popular for Scaling Floors",
    highlight: true,
    scaleBadge: "16 – 75+ Floor Seats",
    description:
      "For scaling contact centers requiring automated predictive pacing, omnichannel messaging blasts, and live supervisor coaching to maximize floor recovery.",
    indicativeModel: "Volume-Tiered License",
    modelDetail: "Flexible monthly operational scope · Dedicated onboarding specialist",
    features: [
      "Everything in Starter Floor, plus:",
      "Predictive & Progressive auto-dialer pacing (~0.4s call hand-off)",
      "Live Supervisor HUD: silent listen, whisper coaching & barge-in",
      "QA Outlier Finder & automated monthly agent scorecards",
      "Omnichannel Messaging: SMS, Viber Business & WhatsApp blasts",
      "Real-time floor velocity dashboard & live agent leaderboards",
      "Statutory quiet-hours compliance & carrier-aware number scrubbing",
    ],
    ctaLabel: "Request Growth Quote",
    ctaSubject: "OMS Pricing: Growth Floor (16-75+ Seats)",
  },
  {
    id: "enterprise",
    name: "Enterprise & Banking",
    badge: "Sovereign & Dedicated SLA",
    scaleBadge: "75+ to Unlimited Seats",
    description:
      "For BPO enterprises, financial institutions, and multi-campaign agencies requiring bank-grade security, dedicated infrastructure, and custom workflows.",
    indicativeModel: "Enterprise Master Scope",
    modelDetail: "Private Cloud or On-Premises · Bespoke SLA & compliance audit",
    features: [
      "Everything in Growth Floor, plus:",
      "Strict client & campaign portfolio tenant isolation",
      "Six-tier role-based permission matrix (RBAC) & immutable audit trail",
      "Private Virtual Cloud (VPC) or On-Premises server deployment",
      "Core banking data ingestion & custom bi-directional API webhooks",
      "99.9% Telephony uptime Service Level Agreement (SLA)",
      "Direct senior engineering access & quarterly on-site operational review",
    ],
    ctaLabel: "Request Enterprise Scope",
    ctaSubject: "OMS Pricing: Enterprise & Banking Floor",
  },
];

const otherProducts = [
  { name: "BITSagent Voice AI", category: "Autonomous Calling" },
  { name: "BITScrm Sales & Deals", category: "Revenue Engine" },
  { name: "BITS Accounting & ERP", category: "BIR CAS Core" },
  { name: "BITS HRMS & 24/7 Roster", category: "Workforce" },
  { name: "BITS Logistics & Fleet", category: "Route Optimization" },
  { name: "White-Label Partner", category: "Reseller Program" },
];

export function Pricing() {
  const { openModal } = useConsultationModal();

  return (
    <Section
      id="pricing"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/25 to-white py-20 md:py-28 lg:py-32 border-b border-slate-200/80"
    >
      {/* Anchor alias for solutions navigation */}
      <div id="solutions" className="sr-only" />

      {/* Subtle Ambient Illumination */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-gradient-to-b from-sky-200/30 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-sky-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 shadow-2xs mb-5">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              <span>OPERATIONS MANAGEMENT SYSTEM (OMS) PRICING</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Predictable Investment Sized for Your Floor Scale
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Transparent, floor-based licensing tailored to your active team size and operational volume. Zero punitive per-seat markups, zero hidden fees, and full onboarding assistance.
            </p>
          </Reveal>
        </div>

        {/* ── 3 OMS PRICING TIERS (GRID: 1 COL MOBILE → 3 COLS DESKTOP) ── */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3 mb-16 sm:mb-20">
          {omsTiers.map((tier, index) => (
            <Reveal key={tier.id} delay={index * 0.06} className="h-full">
              {/* Outer Double-Bezel Shell */}
              <div
                className={`h-full flex flex-col justify-between rounded-[2.25rem] p-2 sm:p-2.5 transition-all duration-300 ${
                  tier.highlight
                    ? "p-[3px] bg-gradient-to-b from-blue-600 via-indigo-600 to-sky-400 shadow-2xl shadow-blue-600/20 ring-4 ring-blue-500/10"
                    : "bg-gradient-to-b from-slate-100 via-slate-200/50 to-slate-100 border border-slate-200/90 shadow-xl shadow-slate-950/[0.04] hover:shadow-2xl hover:border-slate-300"
                }`}
              >
                {/* Inner Core */}
                <div
                  className={`h-full flex flex-col justify-between rounded-[calc(2.25rem-0.375rem)] p-7 sm:p-8 bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]`}
                >
                  {/* Top Content */}
                  <div>
                    {/* Synchronized Eyebrow Badge Bar */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {tier.badge ? (
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                            tier.highlight
                              ? "bg-blue-600 text-white shadow-2xs"
                              : "border border-indigo-200 bg-indigo-50 text-indigo-700"
                          }`}
                        >
                          <Sparkles className="size-3" />
                          <span>{tier.badge}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                          <Users className="size-3" />
                          <span>Standard Floor</span>
                        </span>
                      )}

                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
                        {tier.scaleBadge}
                      </span>
                    </div>

                    {/* Tier Name */}
                    <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
                      {tier.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                      {tier.description}
                    </p>

                    {/* Clear Indicative Price Box (No Real Arbitrary Price) */}
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 mb-6">
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 mb-1">
                        Pricing Model
                      </div>
                      <div className="text-lg font-extrabold text-slate-900">
                        {tier.indicativeModel}
                      </div>
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        {tier.modelDetail}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Included Capabilities:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 mb-8">
                      {tier.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black">
                            <Check className="size-2.5" />
                          </span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => openModal(tier.ctaSubject)}
                      className={`group w-full inline-flex min-h-[46px] items-center justify-between gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-bold shadow-md transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                        tier.highlight
                          ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25"
                          : "bg-slate-950 hover:bg-slate-800 text-white shadow-slate-950/10"
                      }`}
                    >
                      <span>{tier.ctaLabel}</span>
                      <span className="size-8 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform duration-300 font-bold">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── 4 UNIVERSAL OPERATIONAL COMMITMENTS ── */}
        <Reveal delay={0.12}>
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users className="size-5" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Per-Seat Lock-In</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Scale your floor capacity freely. Never pay punitive fees for staff turnover or shifting shifts.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Shield className="size-5" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">BSP &amp; NPC Compliant</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Designed around BSP Circulars 454/857 and RA 10173 data privacy rules for Philippine finance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                  <PhoneCall className="size-5" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Zero Extra Hardware</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    100% browser-based WebRTC softphone. Agents only need a standard headset and internet connection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Building2 className="size-5" />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Full Data Migration</h4>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Our team sanitizes, formats, and imports your existing debtor spreadsheets and trains your staff.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── DEDICATED CTA: CHECK PRICING FOR OUR OTHER PRODUCTS ── */}
        <Reveal delay={0.16}>
          <div className="relative rounded-[2.25rem] p-2 sm:p-2.5 bg-gradient-to-b from-slate-100 to-slate-200/50 border border-slate-200 shadow-xl shadow-slate-950/5">
            <div className="rounded-[calc(2.25rem-0.375rem)] bg-white p-7 sm:p-10 border border-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Left: Message & Product Pills */}
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-blue-700 mb-3">
                    Broad Enterprise Portfolio
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 leading-snug">
                    Looking for Pricing on Our Other Software Engines?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    BITS also engineers standalone and bundled enterprise solutions across Autonomous Voice AI, Sales CRM, ERP Accounting, HRMS, and Field Logistics.
                  </p>

                  {/* Available Product Badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {otherProducts.map((p) => (
                      <span
                        key={p.name}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700"
                      >
                        <span className="size-1.5 rounded-full bg-blue-600" />
                        <span>{p.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({p.category})</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right: Island CTA Button */}
                <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openModal("Inquiry: Pricing for Other BITS Software Products")}
                    className="group w-full sm:w-auto inline-flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-slate-950 hover:bg-blue-600 pl-6 pr-2 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:shadow-blue-600/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                  >
                    <span>Check Pricing for Other Products</span>
                    <span className="size-8 rounded-full bg-white/15 flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:bg-white/25 transition-all duration-300 font-bold">
                      <ArrowRight className="size-3.5" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
