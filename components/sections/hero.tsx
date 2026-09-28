import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroProduct } from "@/components/sections/hero-product";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/60 pb-16 pt-20 sm:pb-20 sm:pt-24 md:pt-28">
      {/* Subtle atmospheric ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_0%,rgba(0,123,255,0.08),transparent_70%)]" />
        <div className="absolute -right-36 top-1/4 h-[420px] w-[420px] rounded-full bg-blue-500/[0.03] blur-[90px]" />
        <div className="absolute -left-36 top-1/3 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.03] blur-[90px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Header Block: Authoritative, simple English, zero icon clutter */}
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Live Operational Status Eyebrow */}
            <Reveal y={10}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white px-4 py-1.5 shadow-2xs">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[0.72rem] font-black uppercase tracking-[0.18em] text-slate-800">
                  OPERATIONS 360 · INTEGRATED OPERATIONS PLATFORM
                </span>
              </div>
            </Reveal>

            {/* Main Headline: Bold, direct, high-converting (CRO) */}
            <Reveal delay={0.04} y={14}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] text-balance">
                Run your business from one screen.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  Not ten disconnected tools.
                </span>
              </h1>
            </Reveal>

            {/* Plain English Subtitle */}
            <Reveal delay={0.08} y={10}>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
                We replace scattered spreadsheets, separate dialers, and manual QA with one unified operations cockpit. See your CRM, live calls, team scorecards, and customer payments in real time.
              </p>
            </Reveal>

            {/* High-Converting CRO Action Buttons (No generic icons, clean nested structure) */}
            <Reveal delay={0.12} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* Primary Action Button */}
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group relative flex h-13 w-full sm:w-auto items-center justify-between sm:justify-center gap-4 rounded-full bg-blue-600 pl-7 pr-3 font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.98]"
                  >
                    <span className="text-[0.92rem]">Book a 20-Minute Discovery Call</span>
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
                      <span className="text-sm font-black">→</span>
                    </span>
                  </Link>
                </Magnetic>

                {/* Secondary Action Button */}
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/demo"
                    className="group flex h-13 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white px-7 font-bold text-slate-800 shadow-2xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600 active:scale-[0.98]"
                  >
                    <span className="text-[0.92rem]">Explore All 18 Software Engines</span>
                    <span className="text-slate-400 transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
              </div>

              {/* Micro-Reassurance Line */}
              <p className="mt-3 text-xs text-slate-500 font-medium">
                Free 30-min discovery · Zero per-seat penalties · Custom roadmap built for your exact workflow
              </p>

              {/* Typographic Trust Matrix (Zero Icons, Pure High-Status Editorial) */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.76rem] font-semibold text-slate-500">
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-slate-700">
                  BSP &amp; NPC Data Privacy Compliant
                </span>
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-slate-700">
                  Managed Cloud or Sovereign On-Premises
                </span>
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-slate-700">
                  Zero Per-User Licensing Lock-in
                </span>
                <span className="rounded-full bg-slate-100 border border-slate-200/80 px-3 py-1 text-slate-700">
                  Full Source Code &amp; IP Ownership Option
                </span>
              </div>
            </Reveal>
          </div>

          {/* Interactive Live Product Cockpit Mockup (Front & Center) */}
          <Reveal delay={0.16} y={20} className="mt-10 sm:mt-12 w-full">
            <HeroProduct />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
