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
            {/* Eyebrow */}
            <Reveal y={16}>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/15 bg-blue-50/70 px-4 py-1.5 backdrop-blur-md shadow-xs">
                <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  BITS · Boundless IT Solutions
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={0.06} y={18}>
              <h1 className="text-display mt-2 max-w-5xl text-balance font-bold leading-[1.08] text-slate-900">
                Technology built around{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  your business.
                </span>
              </h1>
            </Reveal>

            {/* Supporting Copy */}
            <Reveal delay={0.12} y={14}>
              <p className="text-lede mx-auto mt-5 max-w-[54ch] text-pretty text-slate-600">
                Custom software, CRM, automation, AI, and operational systems designed around how your organization actually works. Purpose-built for BPOs, collections agencies, banks, and operations with complex workflows.
              </p>
            </Reveal>

            {/* Primary & Secondary CTAs */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3.5 sm:mt-10 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.99] sm:w-auto"
                  >
                    <span>Book a Consultation</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#ecosystem"
                    className="flex h-14 w-full items-center justify-center rounded-full bg-white px-8 font-bold text-slate-900 shadow-xs ring-1 ring-inset ring-slate-200 transition-all hover:bg-slate-50 hover:ring-slate-300 active:scale-[0.99] sm:w-auto"
                  >
                    Explore Solutions
                  </Link>
                </Magnetic>
              </div>

              {/* Direct Deep-Dive Product Links */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[0.85rem] font-bold">
                <Link
                  href="/bitscrm"
                  className="group inline-flex min-h-[44px] items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <span>Explore BITScrm</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <Link
                  href="/bitsagent"
                  className="group inline-flex min-h-[44px] items-center gap-1.5 text-violet-600 hover:text-violet-700 transition-colors"
                >
                  <span>Explore AI Operations (BITSagent)</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </Link>
              </div>

              {/* Friction-reducing reassurance row */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.78rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Aligned with BSP & NPC Data Privacy Principles
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" aria-hidden />
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Configured to Your Real Floor Workflows
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" aria-hidden />
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Private Cloud or On-Premises Ready
                </span>
              </div>
            </Reveal>

            {/* Platform Benchmarks */}
            <Reveal delay={0.24} y={10}>
              <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                <div className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-xs backdrop-blur-md">
                  <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                  <span className="font-mono text-[0.88rem] font-bold text-blue-600">3.2x Connects</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">Predictive Dialing Connects</span>
                </div>

                <div className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-xs backdrop-blur-md">
                  <span className="font-mono text-[0.82rem] font-bold text-slate-800">256-Bit TLS</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">Security-Conscious Architecture</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-xs backdrop-blur-md">
                  <span className="font-mono text-[0.88rem] font-bold text-emerald-600">99.9%</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">High-Availability Telephony SLA</span>
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
