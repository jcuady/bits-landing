"use client";

import { pricingTiers } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <Section id="pricing" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Transparent Operations Pricing
              </span>
            </div>
            <h2 className="text-h2 mt-4 text-balance font-bold text-slate-900">
              Predictable Plans Built for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Every Recovery Scale.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[50ch] text-pretty text-slate-600">
              Equip your collections floor with high-recovery tools. No hidden telco markups,
              transparent per-agent seat pricing, and full pilot support.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8">
          {pricingTiers.map((tier, i) => (
            <Reveal key={tier.id} delay={0.06 + i * 0.08}>
              <article
                className={cn(
                  "relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition-all hover:shadow-xl sm:p-8",
                  tier.popular
                    ? "border-2 border-blue-600 bg-white shadow-xl shadow-blue-900/10 ring-4 ring-blue-500/10"
                    : "border border-slate-200/80 bg-slate-50/60 shadow-xs"
                )}
              >
                {tier.popular ? (
                  <div className="absolute top-0 right-0 rounded-bl-[1.25rem] bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-1.5 shadow-sm">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white">
                      Most Popular
                    </span>
                  </div>
                ) : null}

                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[1.3rem] font-bold tracking-tight text-slate-900">
                      {tier.name}
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold text-slate-600">
                      {tier.id === "starter" ? "1–15 Seats" : tier.id === "professional" ? "15–50 Seats" : "50+ Seats"}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-600">
                    {tier.tagline}
                  </p>
                  <div className="mt-5 flex items-baseline gap-1">
                    <span className="text-[2.5rem] font-bold tracking-tight text-slate-900">
                      {tier.priceLabel}
                    </span>
                  </div>
                  <p className="mt-1 text-[0.78rem] font-medium text-slate-500">{tier.priceSubtext}</p>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="mb-8 space-y-3.5 border-t border-slate-200/60 pt-6">
                    <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Included Capabilities</p>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5">
                          <span className={cn("mt-0.5 font-bold text-[0.85rem]", tier.popular ? "text-blue-600" : "text-slate-500")}>
                            ✓
                          </span>
                          <span className="text-[0.86rem] font-medium leading-snug text-slate-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Magnetic className="w-full">
                      <a
                        href="#contact"
                        className={cn(
                          "group flex h-12 w-full items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 active:scale-[0.99]",
                          tier.popular
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20"
                            : "bg-white text-slate-900 shadow-xs ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300"
                        )}
                      >
                        {tier.cta}
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    </Magnetic>
                    <p className="mt-2 text-center text-[0.7rem] text-slate-400">
                      Includes assisted setup & CSV import
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Free trial pilot banner */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl shadow-blue-950/20 lg:mt-20">
            <div className="relative flex flex-col items-center justify-between gap-6 px-8 py-10 sm:flex-row sm:px-12 sm:py-12">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_100%_0%,rgba(59,130,246,0.2),rgba(255,255,255,0))]" />
              <div className="relative z-10 text-center sm:text-left">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-blue-300">
                  Risk-Free Operations Pilot
                </span>
                <p className="mt-3 text-[1.35rem] font-bold text-white">
                  Test BITS with Your Delinquent Portfolio
                </p>
                <p className="mt-1.5 max-w-md text-[0.92rem] text-slate-400">
                  Import a test portfolio, test the predictive dialer, and experience automated PTP tracking for 14 days with zero commitment.
                </p>
              </div>
              <div className="relative z-10 shrink-0">
                <a
                  href="#contact"
                  className="group flex h-13 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/30 active:scale-[0.98]"
                >
                  Start 14-Day Free Pilot
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
