import Link from "next/link";
import { theDifference } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function TheDifference() {
  return (
    <Section id="the-difference" className="relative overflow-hidden bg-slate-900 text-white">
      {/* Background Architectural Patterns */}
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -top-32 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-400" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-300">
                Architectural Distinction
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-white">
              Your operation isn&apos;t generic.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Your software shouldn&apos;t be either.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-5 max-w-[54ch] text-slate-300">
              Most SaaS forces high-volume operations into rigid templates, arbitrary fields, and generic worklists.
              BITS engineers technology around your exact floor hierarchy, compliance policies, and operational DNA.
            </p>
          </Reveal>
        </div>

        {/* Comparison Matrix */}
        <div className="mt-14 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/60 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Header Row */}
          <div className="hidden grid-cols-12 border-b border-slate-800 bg-slate-900/80 px-6 py-4 text-[0.8rem] font-bold uppercase tracking-wider text-slate-400 sm:grid">
            <div className="col-span-3">Operational Dimension</div>
            <div className="col-span-4 text-rose-300/90">Generic Off-The-Shelf SaaS</div>
            <div className="col-span-5 text-blue-300">The BITS Built-Around-You Advantage</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-800/80">
            {theDifference.map((item, idx) => (
              <Reveal key={item.category} delay={idx * 0.05} amount={0.2}>
                <div className="grid grid-cols-1 gap-4 p-5 transition-colors duration-200 hover:bg-slate-900/40 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-6">
                  {/* Category */}
                  <div className="sm:col-span-3">
                    <span className="font-mono text-[0.7rem] font-bold text-blue-400 sm:hidden">
                      DIMENSION #{idx + 1}
                    </span>
                    <h3 className="text-[0.95rem] font-bold text-white sm:text-[0.92rem]">
                      {item.category}
                    </h3>
                  </div>

                  {/* Generic SaaS */}
                  <div className="rounded-xl border border-rose-950/40 bg-rose-950/15 p-3.5 sm:col-span-4 sm:border-0 sm:bg-transparent sm:p-0">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-rose-500/20 text-xs font-bold text-rose-400">
                        ✕
                      </span>
                      <p className="text-[0.86rem] leading-snug text-slate-400">
                        {item.generic}
                      </p>
                    </div>
                  </div>

                  {/* BITS Approach */}
                  <div className="rounded-xl border border-blue-900/50 bg-blue-950/25 p-3.5 sm:col-span-5 sm:border-0 sm:bg-transparent sm:p-0">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-cyan-300">
                        ✓
                      </span>
                      <p className="text-[0.9rem] font-medium leading-snug text-slate-100">
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
        <div className="mt-12 flex flex-col items-center justify-between gap-6 rounded-2xl border border-blue-500/20 bg-gradient-to-r from-blue-950/50 via-slate-900 to-indigo-950/50 p-6 sm:flex-row sm:p-8">
          <div>
            <h3 className="text-lg font-bold text-white">
              Ready to stop forcing your floor into someone else&apos;s software?
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Schedule a technical blueprint session to map your operational requirements.
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-500 px-6 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 active:scale-[0.98]"
          >
            <span>Book a Consultation</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
