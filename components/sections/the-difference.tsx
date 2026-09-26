import Link from "next/link";
import { theDifference } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

export function TheDifference() {
  return (
    <Section id="the-difference" className="relative overflow-hidden bg-slate-50 text-slate-900 py-20 sm:py-28 border-y border-slate-200/80">
      {/* Background Architectural Patterns */}
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute inset-0 bg-grid-light" />
        <div className="absolute -top-32 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/[0.04] blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <Sparkles className="size-3.5 text-blue-600" />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700 font-mono">
                Architectural Distinction
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Your operation isn&apos;t generic.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Your software shouldn&apos;t be either.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
              Most software forces your business into rigid forms, confusing menus, and generic screens.
              BITS builds technology directly around how your team and managers actually work.
            </p>
          </Reveal>
        </div>

        {/* Comparison Matrix: Crisp Light Mode */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xl shadow-slate-200/50">
          {/* Header Row */}
          <div className="hidden grid-cols-12 border-b border-slate-200 bg-slate-50/90 px-6 py-4 text-[0.78rem] font-bold uppercase tracking-wider text-slate-500 sm:grid">
            <div className="col-span-3">Operational Dimension</div>
            <div className="col-span-4 text-rose-600 font-bold">Generic Off-The-Shelf SaaS</div>
            <div className="col-span-5 text-blue-700 font-bold">The BITS Built-Around-You Advantage</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {theDifference.map((item, idx) => (
              <Reveal key={item.category} delay={idx * 0.04} amount={0.2}>
                <div className="grid grid-cols-1 gap-4 p-5 transition-colors duration-150 hover:bg-slate-50/60 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-6">
                  {/* Category */}
                  <div className="sm:col-span-3">
                    <span className="font-mono text-[0.68rem] font-bold text-blue-600 sm:hidden block mb-1">
                      DIMENSION #{idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 sm:text-[0.92rem]">
                      {item.category}
                    </h3>
                  </div>

                  {/* Generic SaaS */}
                  <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3 sm:col-span-4 sm:border-0 sm:bg-transparent sm:p-0">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <X className="size-2.5 text-rose-600 stroke-[3]" />
                      </span>
                      <p className="text-xs leading-relaxed text-slate-600 sm:text-[0.85rem]">
                        {item.generic}
                      </p>
                    </div>
                  </div>

                  {/* BITS Approach */}
                  <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-3 sm:col-span-5 sm:border-0 sm:bg-transparent sm:p-0">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="size-2.5 text-emerald-700 stroke-[3]" />
                      </span>
                      <p className="text-xs leading-relaxed font-semibold text-slate-800 sm:text-[0.88rem]">
                        {item.bits}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-200 bg-white p-6 sm:flex-row sm:p-8 shadow-md shadow-blue-900/5">
          <div>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Ready to stop forcing your floor into someone else&apos;s software?
            </h3>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">
              Schedule a technical blueprint session to map your operational requirements.
            </p>
          </div>
          <Link
            href="/#contact"
            className="group flex h-12 shrink-0 items-center justify-between gap-3.5 rounded-full bg-blue-600 pl-6 pr-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <span>Book a Consultation</span>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
