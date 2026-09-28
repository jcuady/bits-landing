import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroProduct } from "@/components/sections/hero-product";

// Core flagship software engines mapped across enterprise operational categories
const coreEngines = [
  {
    category: "Flagship Suite",
    name: "OPERATIONS 360",
    desc: "CRM, QA, Dialer, LMS & WFM",
    href: "/#operations-360",
    isFlagship: true,
  },
  {
    category: "Autonomous AI",
    name: "BITSagent Voice",
    desc: "24/7 Voice & Automated QA",
    href: "/bitsagent",
    isFlagship: false,
  },
  {
    category: "Statutory ERP",
    name: "Accounting & CAS",
    desc: "BIR Tax & General Ledger",
    href: "/products/accounting",
    isFlagship: false,
  },
  {
    category: "Workforce",
    name: "DOLE Payroll",
    desc: "TRAIN Law Compliance",
    href: "/products/payroll",
    isFlagship: false,
  },
  {
    category: "Supply Chain",
    name: "Logistics Cloud",
    desc: "Fleet Dispatch & Waybills",
    href: "/products/logistics",
    isFlagship: false,
  },
  {
    category: "Hardware & IoT",
    name: "Smart NFC Card",
    desc: "1 Tap Enterprise Identity",
    href: "/products/nfc-card",
    isFlagship: false,
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 border-b border-slate-200/80">
      {/* Subtle atmospheric gradient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(25,117,242,0.08),transparent_75%)]" />
        <div className="absolute right-0 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
        <div className="absolute left-0 top-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Header Block: Authoritative, executive, high-converting CRO */}
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Crisp Architectural Eyebrow (No icons, pure typographic precision) */}
            <Reveal y={10}>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 shadow-2xs backdrop-blur-md">
                <span className="text-[0.68rem] font-extrabold uppercase tracking-[0.2em] text-blue-700 font-mono">
                  ENTERPRISE PLATFORM
                </span>
                <span className="h-3 w-px bg-slate-200" aria-hidden />
                <span className="text-[0.72rem] font-bold text-slate-800">
                  OPERATIONS 360 · One System. One View. One Source of Truth.
                </span>
              </div>
            </Reveal>

            {/* Main Headline: Bold, memorable, conversion-engineered */}
            <Reveal delay={0.05} y={14}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08] max-w-4xl text-balance">
                Software built for your business.{" "}
                <span className="text-blue-600 block sm:inline">
                  Not the other way around.
                </span>
              </h1>
            </Reveal>

            {/* Executive Value Proposition */}
            <Reveal delay={0.1} y={10}>
              <p className="mt-5 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed text-pretty font-normal">
                Move beyond fragmented software and disconnected spreadsheets. <strong className="text-slate-900 font-semibold">OPERATIONS 360</strong> unites your CRM, Quality Assurance, Performance Scorecards, Telephony, Coaching Logs, LMS, and Workforce Management into one cohesive operational platform.
              </p>
            </Reveal>

            {/* CRO High-Intent Action Cluster (Zero icons, pristine button typography) */}
            <Reveal delay={0.15} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* Primary Conversion CTA */}
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-xl bg-blue-600 px-8 text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/35 active:scale-[0.98]"
                  >
                    Schedule Operational Wish List Discovery
                  </Link>
                </Magnetic>

                {/* Secondary Action */}
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/demo"
                    className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-xl border border-slate-200/90 bg-white px-7 text-sm font-bold text-slate-800 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600 active:scale-[0.98]"
                  >
                    Launch Live 18-Engine Matrix
                  </Link>
                </Magnetic>
              </div>

              {/* Conversion Risk Reversal Micro-Copy */}
              <p className="mt-3 text-xs text-slate-500 font-medium tracking-wide">
                Direct Consultation with Senior Systems Architect · Zero Per-Seat Licensing Penalties · Bespoke Roadmap
              </p>
            </Reveal>

            {/* 4-Stakeholder Operational Alignment Bar (Replaces Emoji Pills with Clean Architectural Ledger) */}
            <Reveal delay={0.2} y={12} className="w-full">
              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80 rounded-2xl border border-slate-200/90 bg-white/90 p-2 sm:p-0 shadow-2xs backdrop-blur-md w-full max-w-4xl text-left">
                <div className="p-3.5 sm:p-4">
                  <span className="text-[0.62rem] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                    For Business Owners
                  </span>
                  <div className="mt-1 text-xs font-bold text-slate-900">Big-Picture Telemetry</div>
                  <p className="mt-0.5 text-[0.72rem] text-slate-500 leading-snug">
                    Faster, data-backed decisions without waiting for batch reports.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4">
                  <span className="text-[0.62rem] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                    For Operations Managers
                  </span>
                  <div className="mt-1 text-xs font-bold text-slate-900">Zero MIS Reporting Delay</div>
                  <p className="mt-0.5 text-[0.72rem] text-slate-500 leading-snug">
                    Continuous operational visibility across live floor adherence &amp; queues.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4">
                  <span className="text-[0.62rem] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                    For Supervisors &amp; Leads
                  </span>
                  <div className="mt-1 text-xs font-bold text-slate-900">In-Flow QA &amp; Action Plans</div>
                  <p className="mt-0.5 text-[0.72rem] text-slate-500 leading-snug">
                    Evaluate compliance and assign micro-LMS coaching instantly.
                  </p>
                </div>
                <div className="p-3.5 sm:p-4">
                  <span className="text-[0.62rem] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                    For Floor Agents
                  </span>
                  <div className="mt-1 text-xs font-bold text-slate-900">Single Pane of Glass</div>
                  <p className="mt-0.5 text-[0.72rem] text-slate-500 leading-snug">
                    All tools, dialer, disposition logs, and daily targets in one workspace.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Core Software Engine Directory (Replaces Floating Pill Cloud with Structured Matrix) */}
            <Reveal delay={0.25} y={12} className="w-full">
              <div className="mt-7 flex flex-col items-center gap-3 w-full max-w-4xl">
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-[0.68rem] font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                    Modular Capability Suite
                  </span>
                  <Link
                    href="/demo"
                    className="text-xs font-bold text-blue-600 hover:text-blue-700 transition"
                  >
                    View All 18 Live Software Engines
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full text-left">
                  {coreEngines.map((engine) => (
                    <Link
                      key={engine.name}
                      href={engine.href}
                      className={
                        engine.isFlagship
                          ? "group rounded-xl border border-blue-600/40 bg-blue-50/60 p-2.5 transition hover:border-blue-600 hover:bg-blue-50/90 shadow-2xs"
                          : "group rounded-xl border border-slate-200/90 bg-white/90 p-2.5 transition hover:border-slate-300 hover:bg-slate-50/80 shadow-2xs"
                      }
                    >
                      <div
                        className={
                          engine.isFlagship
                            ? "text-[0.6rem] font-extrabold uppercase tracking-wider text-blue-600 font-mono"
                            : "text-[0.6rem] font-extrabold uppercase tracking-wider text-slate-400 font-mono"
                        }
                      >
                        {engine.category}
                      </div>
                      <div
                        className={
                          engine.isFlagship
                            ? "mt-0.5 text-xs font-bold text-slate-950 group-hover:text-blue-700 transition"
                            : "mt-0.5 text-xs font-bold text-slate-900 group-hover:text-blue-600 transition"
                        }
                      >
                        {engine.name}
                      </div>
                      <div className="text-[0.68rem] text-slate-500 truncate">
                        {engine.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Enterprise Governance & Sovereign Trust Ledger (Zero Clipart Checkmarks) */}
            <Reveal delay={0.3} y={10}>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.76rem] font-semibold text-slate-500">
                <span className="text-slate-700">BSP &amp; NPC Data Privacy Aligned</span>
                <span className="hidden sm:inline text-slate-300" aria-hidden>·</span>
                <span className="text-slate-700">Managed Cloud or Sovereign On-Premises</span>
                <span className="hidden sm:inline text-slate-300" aria-hidden>·</span>
                <span className="text-slate-700">Zero Per-User Seat Penalties</span>
                <span className="hidden sm:inline text-slate-300" aria-hidden>·</span>
                <span className="text-slate-700">Full Source Code &amp; IP Ownership Option</span>
              </div>
            </Reveal>
          </div>

          {/* Interactive Live Product Specimen (Direct Proof Above the Fold) */}
          <Reveal delay={0.35} y={20} className="mt-10 sm:mt-12 w-full">
            <HeroProduct />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

