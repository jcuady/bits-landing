import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroProduct } from "@/components/sections/hero-product";

const platformPillars = [
  "01 BITScrm CORE",
  "02 WORKFLOW AUTOMATION",
  "03 AI VOICE & EMAIL AGENTS",
  "04 REAL-TIME SUPERVISION",
  "05 BESPOKE INFRASTRUCTURE",
];

export function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-white">
      {/* Background radial gradient & ambient lights */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
        <div className="absolute -right-48 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
        <div className="absolute -left-48 bottom-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.03] blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-[100dvh] flex-col pb-10 pt-24 sm:pb-14 sm:pt-28 md:pt-[6.5rem] lg:pb-16">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-2 pt-4 text-center sm:pt-8 lg:pt-10">
            {/* Eyebrow Pill */}
            <Reveal y={16}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50/90 px-3.5 py-1.5 shadow-xs backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-slate-700">
                  Enterprise Operations Suite · Custom Deployed for Philippine Business
                </span>
              </div>
            </Reveal>

            {/* Headline with simple, powerful words */}
            <Reveal delay={0.06} y={18}>
              <h1 className="text-display mt-2 max-w-4xl text-balance font-bold leading-[1.05] tracking-tight text-slate-900">
                Software built for your business.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  Not the other way around.
                </span>
              </h1>
            </Reveal>

            {/* Supporting Copy */}
            <Reveal delay={0.12} y={14}>
              <p className="text-lede mx-auto mt-6 max-w-[54ch] text-pretty text-slate-600">
                Stop forcing your team into rigid, per-seat SaaS. BITS designs, deploys, and manages custom software engines—from AI-powered CRM and predictive dialers to automated ERP and payroll—tailored exactly to how you operate.
              </p>
            </Reveal>

            {/* Primary & Secondary CTAs (Apple Island & Button-in-Button Architecture) */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3.5 sm:mt-10 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group relative flex h-14 w-full items-center justify-between gap-4 rounded-full bg-blue-600 pl-7 pr-3 font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.98] sm:w-auto sm:justify-center"
                  >
                    <span className="text-[0.95rem]">Schedule Architecture Call</span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </span>
                  </Link>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#products-suite"
                    className="group flex h-14 w-full items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-7 font-bold text-slate-800 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600 active:scale-[0.98] sm:w-auto"
                  >
                    <span className="text-[0.95rem]">Explore 18 Engines</span>
                    <span className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                  </Link>
                </Magnetic>
              </div>

              {/* Direct Deep-Dive Product Links with standard touch-targets */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[0.82rem] font-bold">
                <Link
                  href="/bitscrm"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 text-slate-700 transition-colors hover:border-blue-300 hover:bg-blue-50/80 hover:text-blue-700"
                >
                  <span className="size-1.5 rounded-full bg-blue-600" />
                  <span>BITScrm Core</span>
                  <span className="text-slate-400">↗</span>
                </Link>
                <Link
                  href="/bitsagent"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 text-slate-700 transition-colors hover:border-violet-300 hover:bg-violet-50/80 hover:text-violet-700"
                >
                  <span className="size-1.5 rounded-full bg-violet-600" />
                  <span>AI Phone Agents</span>
                  <span className="text-slate-400">↗</span>
                </Link>
                <Link
                  href="/products/accounting"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50/80 hover:text-emerald-700"
                >
                  <span className="size-1.5 rounded-full bg-emerald-600" />
                  <span>Accounting ERP</span>
                  <span className="text-slate-400">↗</span>
                </Link>
                <Link
                  href="/products/nfc-card"
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-3.5 py-1.5 text-slate-700 transition-colors hover:border-cyan-300 hover:bg-cyan-50/80 hover:text-cyan-700"
                >
                  <span className="size-1.5 rounded-full bg-cyan-600" />
                  <span>Smart NFC Card</span>
                  <span className="text-slate-400">↗</span>
                </Link>
              </div>

              {/* Friction-reducing reassurance row */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.78rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Aligned with BSP & NPC Data Privacy
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" aria-hidden />
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Managed Cloud or Sovereign On-Prem
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" aria-hidden />
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Zero Per-User License Penalties
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" aria-hidden />
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Full Source Code & IP Ownership Option
                </span>
              </div>
            </Reveal>

            {/* Platform Benchmarks / Apple Hardware Bento */}
            <Reveal delay={0.24} y={10}>
              <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2.5 shadow-xs backdrop-blur-md">
                  <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                  <span className="font-mono text-[0.92rem] font-bold text-blue-600">3.2× Connects</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">Predictive Auto-Dialing</span>
                </div>

                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2.5 shadow-xs backdrop-blur-md">
                  <span className="font-mono text-[0.88rem] font-bold text-slate-800">99.9%</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">Telephony SLA & TLS 1.3</span>
                </div>

                <div className="flex items-center gap-2.5 rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-2.5 shadow-xs backdrop-blur-md">
                  <span className="font-mono text-[0.92rem] font-bold text-emerald-600">&lt; 30 Days</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">Custom Deployment Velocity</span>
                </div>
              </div>
            </Reveal>

            {/* Platform feature labels */}
            <Reveal delay={0.28} y={8}>
              <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2">
                {platformPillars.map((item) => (
                  <span
                    key={item}
                    className="rounded-lg border border-slate-200/70 bg-slate-50/70 px-3 py-1 text-[0.7rem] font-bold tracking-wider text-slate-600 uppercase transition-colors hover:border-blue-500/30 hover:bg-blue-50/40 hover:text-blue-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Realistic operational product UI */}
          <Reveal delay={0.2} y={28} amount={0.15} className="mt-12 flex flex-1 items-end sm:mt-16 lg:mt-20">
            <HeroProduct />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
