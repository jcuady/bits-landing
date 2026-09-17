import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { pricingTiers } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ProductShowcase } from "@/components/sections/product-showcase";

export const metadata: Metadata = {
  title: "BITScrm — Enterprise Collections CRM & Predictive Dialer",
  description:
    "Accelerate debt recovery with BITScrm. Unify delinquent portfolio queues, predictive voice dialing, automated PTP tracking, live supervisor barge-in, and QA scorecards.",
  openGraph: {
    title: "BITScrm — Enterprise Collections CRM & Predictive Dialer",
    description:
      "Accelerate debt recovery with BITScrm. Unify delinquent portfolio queues, predictive voice dialing, automated PTP tracking, live supervisor barge-in, and QA scorecards.",
  },
};

const CRM_PILLARS = [
  {
    num: "01",
    title: "Portfolio & Queue Intelligence",
    description:
      "Centralize hundreds of thousands of debtor records with automated tiering, balance aging brackets, work queues, and dispute tracking.",
    capabilities: [
      "Dynamic debtor segmentation by delinquency bucket (1-30, 31-60, 60+ DPD)",
      "Automated queue assignment based on agent skill and recovery success rate",
      "Controlled bulk imports with CSV validation and duplicate record reconciliation",
      "Tamper-proof interaction history and customer contact logs",
    ],
  },
  {
    num: "02",
    title: "High-Throughput Predictive Dialer",
    description:
      "Eliminate manual dialing and dead air. Connect your recovery agents only when a live debtor answers the line.",
    capabilities: [
      "Predictive, progressive, and preview dialing algorithms with adaptive pacing",
      "Answering Machine Detection (AMD) with sub-second live human recognition",
      "Integrated WebRTC browser softphone — zero hardware or PBX setup required",
      "Local presence caller ID rotation for maximized Right-Party Connect (RPC) rates",
    ],
  },
  {
    num: "03",
    title: "Automated Promise-to-Pay (PTP) Engine",
    description:
      "Turn verbal commitments into collected cash with automated scheduling, installment tracking, and default prevention.",
    capabilities: [
      "Instant SMS and email payment confirmation sent while on the phone",
      "Automated broken-PTP detection with immediate high-priority requeue",
      "Pre-due reminder triggers 48h and 24h before commitment deadline",
      "Integrated partial-payment reconciliation against principal balances",
    ],
  },
  {
    num: "04",
    title: "Live Supervisor Barge-in & Coaching",
    description:
      "Maintain floor command and prevent compliance violations with real-time audio supervision tools.",
    capabilities: [
      "Silent listen mode to monitor live agent conversations undetected",
      "Private whisper coaching — speak directly to the agent without the debtor hearing",
      "Full barge-in takeover for escalating high-risk or heated negotiations",
      "Real-time floor dashboard with agent statuses, idle time, and queue velocity",
    ],
  },
  {
    num: "05",
    title: "QA Scorecards & Regulatory Compliance",
    description:
      "Protect your agency against regulatory penalties with 100% call recording and automated audit scorecards.",
    capabilities: [
      "100% dual-channel stereo call audio archiving with instant search",
      "Customizable scorecard rubrics with automatic scoring and calibration",
      "Strict compliance gating: quiet hours, max calls/day, and DNC enforcement",
      "Full alignment with BSP Circular 454/857 and NPC Data Privacy Act (RA 10173)",
    ],
  },
  {
    num: "06",
    title: "Liquidation & Recovery Analytics",
    description:
      "Get complete visibility into collector productivity, portfolio recovery curves, and campaign ROI.",
    capabilities: [
      "Live agent leaderboard with collected amounts, PTP conversion, and talk time",
      "Cohort recovery curves comparing portfolio yields across campaigns",
      "Exportable regulatory audit logs and executive summaries in one click",
      "Historical call disposition trends and right-party connect ratios",
    ],
  },
] as const;

const TELEPHONY_SPECS = [
  { label: "Telephony SLA", value: "99.99%", detail: "Carrier-grade SIP trunking" },
  { label: "Connect Dispatch", value: "< 15ms", detail: "Near-zero bridge latency" },
  { label: "Audio Encryption", value: "TLS 1.3 / SRTP", detail: "End-to-end encrypted voice" },
  { label: "Call Storage", value: "Encrypted S3", detail: "Immutable 7-year audit retention" },
] as const;

export default function BitsCrmPage() {
  return (
    <main id="content" className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pb-20 pt-12 sm:pb-28 sm:pt-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
          <div className="absolute -right-40 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
          <div className="absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.03] blur-[80px]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Breadcrumb / Category Pill */}
            <Reveal y={12}>
              <div className="mb-6 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
                <Link href="/" className="text-[0.72rem] font-bold text-slate-500 hover:text-blue-600 transition-colors">
                  Platform
                </Link>
                <span className="text-[0.72rem] text-slate-400">/</span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  BITScrm Platform
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06} y={16}>
              <h1 className="text-display text-balance font-bold leading-[1.06] text-slate-900">
                The Collections CRM Built to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  Accelerate Debt Recovery
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={14}>
              <p className="text-lede mx-auto mt-6 max-w-[55ch] text-pretty text-slate-600">
                Consolidate delinquent accounts, predictive auto-dialing, automated PTP payment tracking,
                and live supervisor barge-in into one compliant, high-velocity collections workspace.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-700 active:scale-[0.98] sm:w-auto"
                  >
                    Request Live BITScrm Demo
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#pricing"
                    className="flex h-14 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 font-bold text-slate-800 shadow-xs transition-colors hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98] sm:w-auto"
                  >
                    View CRM Pricing
                  </Link>
                </Magnetic>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> 14-Day Free Pilot
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> BSP & NPC DPA Compliant
                </span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> WebRTC Softphone Included
                </span>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* KPI Benchmark Strip */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-blue-600 sm:text-4xl">3.2x</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Right-Party Contact Rate</p>
              <p className="text-[0.72rem] text-slate-500">vs. manual spreadsheet dialing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-emerald-600 sm:text-4xl">45%</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Broken PTP Reduction</p>
              <p className="text-[0.72rem] text-slate-500">automated multi-channel reminders</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-indigo-600 sm:text-4xl">&lt; 15ms</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Connect Latency</p>
              <p className="text-[0.72rem] text-slate-500">instant WebRTC agent bridge</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">99.99%</div>
              <p className="mt-1 text-[0.8rem] font-semibold text-slate-700">Telephony Uptime SLA</p>
              <p className="text-[0.72rem] text-slate-500">dual-redundant SIP backbones</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Role Workspaces Demo */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-12">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Complete Floor Visibility
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Experience the Role-Based CRM in Action
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Each team member gets exactly what they need: collectors focus on their next conversation,
              supervisors manage active calls, and QA ensures regulatory compliance.
            </p>
          </div>

          <ProductShowcase />
        </Container>
      </section>

      {/* 6 Core Architectural Pillars */}
      <section className="bg-slate-50/50 py-20 sm:py-28 border-t border-slate-200/60">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Core Capabilities
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Six Pillars of High-Velocity Debt Recovery
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Engineered specifically for the operational constraints and legal frameworks of Philippine
              financial institutions, collections agencies, and fintech lenders.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CRM_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                className="group relative flex flex-col rounded-[2rem] border border-slate-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                  <span className="font-mono text-xs font-bold tracking-widest text-blue-600">
                    PILLAR {pillar.num}
                  </span>
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-slate-600">
                  {pillar.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-100 pt-6">
                  {pillar.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5 text-[0.83rem] text-slate-700">
                      <span className="mt-0.5 font-bold text-blue-600">✓</span>
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Telephony Infrastructure & Security */}
      <section className="bg-[#030D1C] py-20 text-white sm:py-28 relative overflow-hidden">
        <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-20" aria-hidden />
        <Container className="relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-400">
              Telecom & Telephony Specs
            </span>
            <h2 className="text-h2 mt-3 font-bold text-white">
              Enterprise-Grade Telephony & Data Security
            </h2>
            <p className="text-lede mt-4 text-blue-100/70">
              Built on resilient SIP trunking backbones with automated failover, TLS voice encryption,
              and strict compliance controls.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TELEPHONY_SPECS.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-md"
              >
                <p className="text-[0.75rem] font-bold uppercase tracking-widest text-blue-300">
                  {spec.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">{spec.value}</p>
                <p className="mt-1 text-[0.75rem] text-blue-200/60">{spec.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 p-8 text-center sm:p-10">
            <h3 className="text-xl font-bold text-white">
              Need autonomous AI voice dialing alongside human agents?
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-[0.95rem] text-blue-100/70">
              Pair BITScrm with <strong>BITSagent</strong> to automate 100,000+ early-stage debt recovery calls
              with zero human floor overhead.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/bitsagent"
                className="group flex h-11 items-center gap-2 rounded-full bg-violet-600 px-6 text-[0.88rem] font-bold text-white transition-all hover:bg-violet-500"
              >
                Explore BITSagent AI
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/#pricing"
                className="flex h-11 items-center rounded-full border border-white/20 bg-white/10 px-6 text-[0.88rem] font-bold text-white transition-all hover:bg-white/20"
              >
                View Suite Bundles
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 sm:py-28 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Transparent Seat Pricing
            </span>
            <h2 className="text-h2 mt-3 font-bold text-slate-900">
              Simple, Predictable BITScrm Plans
            </h2>
            <p className="text-lede mt-4 text-slate-600">
              Scale up or down per collector seat. All plans include WebRTC dialer, PTP management,
              and compliance audit tools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-[2rem] p-8 transition-all",
                  tier.popular
                    ? "border-2 border-blue-600 bg-white shadow-xl shadow-blue-900/10 ring-4 ring-blue-500/10"
                    : "border border-slate-200/80 bg-slate-50/60"
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 rounded-bl-2xl bg-blue-600 px-4 py-1">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white">
                      Recommended
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                <p className="mt-1 text-[0.85rem] text-slate-600">{tier.tagline}</p>
                <div className="mt-5">
                  <span className="text-3xl font-bold text-slate-900">{tier.priceLabel}</span>
                  <span className="ml-1 text-[0.8rem] text-slate-500">{tier.priceSubtext}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3 border-t border-slate-200/60 pt-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[0.85rem] text-slate-700">
                      <span className="text-blue-600 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={cn(
                    "mt-8 flex h-12 w-full items-center justify-center rounded-full font-bold transition-all",
                    tier.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-900/20"
                      : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-br from-blue-700 to-indigo-800 py-16 text-white text-center">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Upgrade Your Collections Floor?
            </h2>
            <p className="mt-4 text-blue-100 text-lede">
              Join leading financial institutions and agencies using BITScrm to recover delinquent debt faster.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="flex h-14 items-center justify-center rounded-full bg-white px-8 font-bold text-blue-700 shadow-lg transition-all hover:bg-blue-50 active:scale-[0.98]"
              >
                Schedule Your 14-Day Pilot →
              </Link>
              <Link
                href="/bitsagent"
                className="flex h-14 items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 font-bold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
              >
                Learn About BITSagent AI
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
