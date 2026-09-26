import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroProduct } from "@/components/sections/hero-product";
import { ArrowUpRight, ArrowRight, Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Curated flagship products across core business operational categories
const featuredProducts = [
  {
    name: "BITScrm Collections",
    badge: "Flagship CRM",
    href: "/bitscrm",
    dotColor: "bg-blue-600",
    hoverBorder: "hover:border-blue-300 hover:bg-blue-50/80 hover:text-blue-700",
  },
  {
    name: "BITSagent Voice AI",
    badge: "24/7 Phone Agent",
    href: "/bitsagent",
    dotColor: "bg-violet-600",
    hoverBorder: "hover:border-violet-300 hover:bg-violet-50/80 hover:text-violet-700",
  },
  {
    name: "Accounting & BIR CAS",
    badge: "Tax-Ready ERP",
    href: "/products/accounting",
    dotColor: "bg-emerald-600",
    hoverBorder: "hover:border-emerald-300 hover:bg-emerald-50/80 hover:text-emerald-700",
  },
  {
    name: "DOLE Payroll",
    badge: "TRAIN Law",
    href: "/products/payroll",
    dotColor: "bg-teal-600",
    hoverBorder: "hover:border-teal-300 hover:bg-teal-50/80 hover:text-teal-700",
  },
  {
    name: "Logistics Cloud",
    badge: "Fleet & Routes",
    href: "/products/logistics",
    dotColor: "bg-amber-600",
    hoverBorder: "hover:border-amber-300 hover:bg-amber-50/80 hover:text-amber-700",
  },
  {
    name: "Pickleball & Arena OS",
    badge: "Court Queues",
    href: "/products/pickleball",
    dotColor: "bg-rose-600",
    hoverBorder: "hover:border-rose-300 hover:bg-rose-50/80 hover:text-rose-700",
  },
  {
    name: "Smart NFC Card",
    badge: "1 Tap for Life",
    href: "/products/nfc-card",
    dotColor: "bg-cyan-600",
    hoverBorder: "hover:border-cyan-300 hover:bg-cyan-50/80 hover:text-cyan-700",
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/60 via-blue-50/20 to-white">
      {/* Soft atmospheric background lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)]" />
        <div className="absolute -right-48 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-500/[0.04] blur-[100px]" />
        <div className="absolute -left-48 top-1/3 h-[500px] w-[500px] rounded-full bg-indigo-500/[0.03] blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center pb-12 pt-16 sm:pb-16 sm:pt-20 md:pt-24">
          {/* Header Block: Authoritative, executive, high-converting */}
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Trust Eyebrow Badge */}
            <Reveal y={12}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/95 px-4 py-1.5 shadow-2xs backdrop-blur-md">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-blue-700">
                  Enterprise Operations Suite · Custom Deployed for Philippine Business
                </span>
              </div>
            </Reveal>

            {/* Main Headline in authoritative, memorable English */}
            <Reveal delay={0.05} y={16}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] max-w-4xl text-balance">
                Software built for your business.{" "}
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  Not the other way around.
                </span>
              </h1>
            </Reveal>

            {/* Clear value proposition */}
            <Reveal delay={0.1} y={12}>
              <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed text-pretty">
                Stop forcing your team into rigid, per-seat SaaS. BITS designs, deploys, and manages 18 custom software products—from AI-powered CRM and predictive dialers to automated ERP and payroll—tailored exactly to how you operate.
              </p>
            </Reveal>

            {/* Clear, High-Converting Action Buttons (CRO Optimized) */}
            <Reveal delay={0.15} y={10}>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto">
                {/* Primary CTA: Apple Button-in-Button Architecture */}
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group relative flex h-14 w-full sm:w-auto items-center justify-between sm:justify-center gap-4 rounded-full bg-blue-600 pl-7 pr-3 font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/35 active:scale-[0.98]"
                  >
                    <span className="text-[0.95rem]">Book a Free Consultation</span>
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="size-4.5" />
                    </span>
                  </Link>
                </Magnetic>

                {/* Secondary CTA: Plain English Product Suite Discovery */}
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#products-suite"
                    className="group flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-7 font-bold text-slate-800 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-blue-600 active:scale-[0.98]"
                  >
                    <span className="text-[0.95rem]">Explore All 18 Products</span>
                    <span className="text-slate-400 transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
              </div>

              {/* Micro-reassurance underneath CTA */}
              <p className="mt-2.5 text-xs text-slate-500 font-medium">
                Free 30-min discovery · Zero obligation · Custom solution roadmap &amp; quote
              </p>

              {/* Properly Showing Our Products: Curated Flagship Strip */}
              <div className="mt-7 flex flex-col items-center gap-2.5 w-full max-w-4xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Popular Products</span>
                  <span className="h-px w-8 bg-slate-200" aria-hidden />
                  <Link
                    href="/#products-suite"
                    className="inline-flex items-center gap-1 text-blue-600 hover:underline normal-case font-medium"
                  >
                    <span>View all 18 products</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-[0.82rem] font-bold">
                  {featuredProducts.map((p) => (
                    <Link
                      key={p.name}
                      href={p.href}
                      className={cn(
                        "group inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200/90 bg-white/90 px-3.5 py-1.5 text-slate-700 shadow-2xs backdrop-blur-xs transition-all duration-200 active:scale-[0.98]",
                        p.hoverBorder
                      )}
                    >
                      <span className={cn("size-2 rounded-full", p.dotColor)} />
                      <span>{p.name}</span>
                      <span className="text-[0.68rem] font-medium text-slate-400 group-hover:text-slate-500">
                        {p.badge}
                      </span>
                      <ArrowUpRight className="size-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  ))}

                  <Link
                    href="/#products-suite"
                    className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-dashed border-blue-300 bg-blue-50/60 px-3.5 py-1.5 text-blue-700 transition-all duration-200 hover:border-blue-400 hover:bg-blue-100/70 active:scale-[0.98]"
                  >
                    <Sparkles className="size-3.5 text-blue-600" />
                    <span>+11 More Products</span>
                    <span className="text-blue-500">→</span>
                  </Link>
                </div>
              </div>

              {/* Statutory & Technical Trust Signals */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.78rem] font-medium text-slate-500">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Check className="size-3.5 text-emerald-600 shrink-0" /> Aligned with BSP &amp; NPC Data Privacy
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Check className="size-3.5 text-emerald-600 shrink-0" /> Managed Cloud or Sovereign On-Prem
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Check className="size-3.5 text-emerald-600 shrink-0" /> Zero Per-User License Penalties
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="flex items-center gap-1.5 text-slate-600">
                  <Check className="size-3.5 text-emerald-600 shrink-0" /> Full Source Code &amp; IP Ownership Option
                </span>
              </div>
            </Reveal>
          </div>

          {/* Interactive Live Product Specimen (Direct Visual Proof Above the Fold) */}
          <Reveal delay={0.2} y={24} className="mt-10 sm:mt-12 w-full">
            <HeroProduct />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
