import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroProduct } from "@/components/sections/hero-product";

const proof = [
  "01 PORTFOLIO ENGINE",
  "02 PREDICTIVE DIALER",
  "03 AI RECOVERY AGENTS",
  "04 AUTOMATED PTP",
  "05 LIVE QA BARGE",
];

export function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.08),rgba(255,255,255,0))]" />
        <div className="absolute -right-48 top-1/4 h-[600px] w-[600px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
        <div className="absolute -left-48 bottom-1/4 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.03] blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-[100dvh] flex-col pb-10 pt-24 sm:pb-14 sm:pt-28 md:pt-[6.5rem] lg:pb-16">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-2 pt-4 text-center sm:pt-8 lg:pt-10">
            <Reveal y={16}>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/70 px-4 py-1.5 backdrop-blur-md shadow-xs">
                <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  Enterprise Collections CRM & Dialer
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06} y={18}>
              <h1 className="text-display mt-3 max-w-5xl text-balance font-bold leading-[1.08] text-slate-900">
                The All-in-One Collections CRM Built to{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  Accelerate Debt Recovery.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={14}>
              <p className="text-lede mx-auto mt-5 max-w-[50ch] text-pretty text-slate-600">
                Consolidate delinquent portfolio queues, predictive voice dialing, automated PTP tracking,
                and autonomous recovery agents into one compliance-first workspace.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3.5 sm:mt-10 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <a
                    href="#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20 active:scale-[0.99] sm:w-auto"
                  >
                    Request Live Walkthrough
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <a
                    href="#pricing"
                    className="flex h-14 w-full items-center justify-center rounded-full bg-white px-8 font-bold text-slate-900 shadow-xs ring-1 ring-inset ring-slate-200 transition-all hover:bg-slate-50 hover:ring-slate-300 active:scale-[0.99] sm:w-auto"
                  >
                    See Pricing & ROI
                  </a>
                </Magnetic>
              </div>

              {/* Friction-reducing reassurance row */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.78rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> BSP Circular & NPC DPA Compliant
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" aria-hidden />
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> 14-Day Risk-Free Pilot
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" aria-hidden />
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="font-bold text-emerald-600">✓</span> Deploy in Under 48 Hours
                </span>
              </div>
            </Reveal>

            {/* Platform credibility row */}
            <Reveal delay={0.24} y={10}>
              <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
                {/* Benchmark pill */}
                <div className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-xs backdrop-blur-md">
                  <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                  <span className="font-mono text-[0.88rem] font-bold text-blue-600">3.2x Connects</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">Predictive Auto-Dialing</span>
                </div>

                {/* Compliance pill */}
                <div className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-xs backdrop-blur-md">
                  <span className="font-mono text-[0.82rem] font-bold text-slate-800">256-Bit TLS</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">BSP & NPC Security Aligned</span>
                </div>

                {/* Uptime pill */}
                <div className="flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 shadow-xs backdrop-blur-md">
                  <span className="font-mono text-[0.88rem] font-bold text-emerald-600">99.9%</span>
                  <span className="text-[0.78rem] font-medium text-slate-600">Telephony Uptime SLA</span>
                </div>
              </div>
            </Reveal>

            {/* Feature labels */}
            <Reveal delay={0.28} y={8}>
              <div className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2">
                {proof.map((item) => (
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

          {/* Product preview */}
          <Reveal delay={0.2} y={28} amount={0.15} className="mt-12 flex flex-1 items-end sm:mt-16 lg:mt-20">
            <HeroProduct />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
