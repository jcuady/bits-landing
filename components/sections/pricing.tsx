"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { pricingTiers, bitsAgentPricingTiers, suiteBundleFeatures } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { cn } from "@/lib/utils";

type ProductTab = "crm" | "agent" | "suite";

const TABS: { id: ProductTab; label: string; sublabel: string }[] = [
  { id: "crm", label: "BITScrm", sublabel: "Collections CRM" },
  { id: "agent", label: "BITSagent", sublabel: "AI Voice & Email" },
  { id: "suite", label: "BITS Suite", sublabel: "Bundle & Save" },
];

function TierCard({
  name,
  tagline,
  priceLabel,
  priceSubtext,
  popular,
  cta,
  features,
  accent = "blue",
}: {
  name: string;
  tagline: string;
  priceLabel: string;
  priceSubtext: string;
  popular: boolean;
  cta: string;
  features: readonly string[];
  accent?: "blue" | "violet";
}) {
  const accentMap = {
    blue: {
      badge: "bg-gradient-to-r from-blue-600 to-indigo-600",
      ring: "border-2 border-blue-600 bg-white shadow-xl shadow-blue-900/10 ring-4 ring-blue-500/10",
      check: "text-blue-600",
      btn: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20",
    },
    violet: {
      badge: "bg-gradient-to-r from-violet-600 to-blue-600",
      ring: "border-2 border-violet-500 bg-white shadow-xl shadow-violet-900/10 ring-4 ring-violet-500/10",
      check: "text-violet-600",
      btn: "bg-violet-600 text-white hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-900/20",
    },
  }[accent];

  return (
    <article
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 transition-all hover:shadow-xl sm:p-8",
        popular
          ? accentMap.ring
          : "border border-slate-200/80 bg-slate-50/60 shadow-xs"
      )}
    >
      {popular && (
        <div className={cn("absolute top-0 right-0 rounded-bl-[1.25rem] px-4 py-1.5 shadow-sm", accentMap.badge)}>
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-[1.3rem] font-bold tracking-tight text-slate-900">{name}</h3>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-600">{tagline}</p>
        <div className="mt-5 flex items-baseline gap-1">
          <span className="text-[2.5rem] font-bold tracking-tight text-slate-900">{priceLabel}</span>
        </div>
        <p className="mt-1 text-[0.78rem] font-medium text-slate-500">{priceSubtext}</p>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="mb-8 space-y-3.5 border-t border-slate-200/60 pt-6">
          <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Included</p>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <span className={cn("mt-0.5 font-bold text-[0.85rem]", popular ? accentMap.check : "text-slate-500")}>
                  ✓
                </span>
                <span className="text-[0.86rem] font-medium leading-snug text-slate-700">{feature}</span>
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
                popular
                  ? accentMap.btn
                  : "bg-white text-slate-900 shadow-xs ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:ring-slate-300"
              )}
            >
              {cta}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Magnetic>
          <p className="mt-2 text-center text-[0.7rem] text-slate-400">
            Includes assisted setup & onboarding
          </p>
        </div>
      </div>
    </article>
  );
}

function CrmPricing() {
  return (
    <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
      {pricingTiers.map((tier, i) => (
        <Reveal key={tier.id} delay={0.06 + i * 0.08}>
          <TierCard {...tier} accent="blue" />
        </Reveal>
      ))}
    </div>
  );
}

function AgentPricing() {
  const [minutes, setMinutes] = React.useState(10000);
  const ratePerMinute = 2.2;
  const estimated = Math.round(minutes * ratePerMinute);

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
        {bitsAgentPricingTiers.map((tier, i) => (
          <Reveal key={tier.id} delay={0.06 + i * 0.08}>
            <TierCard {...tier} accent="violet" />
          </Reveal>
        ))}
      </div>

      {/* Cost estimator */}
      <Reveal delay={0.3}>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-violet-200/40 bg-violet-50/50 p-8 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-widest text-violet-600/70">
                Cost Estimator
              </p>
              <h4 className="mt-1 text-[1.2rem] font-bold text-slate-900">
                Estimate your monthly cost
              </h4>
              <p className="mt-1 text-[0.85rem] text-slate-500">
                Based on ₱2.20 / AI-handled minute (Scale tier rate)
              </p>
            </div>
            <div className="shrink-0 rounded-2xl border border-violet-200/60 bg-white px-6 py-4 text-right shadow-sm">
              <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">
                Estimated monthly
              </p>
              <p className="mt-1 text-[2rem] font-bold tracking-tight text-slate-900">
                ₱{estimated.toLocaleString()}
              </p>
              <p className="text-[0.72rem] text-slate-400">{minutes.toLocaleString()} min/mo</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between text-[0.8rem]">
              <span className="font-medium text-slate-500">Monthly AI call minutes</span>
              <span className="font-bold text-slate-900">{minutes.toLocaleString()} min</span>
            </div>
            <input
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-violet-600"
              aria-label="Estimated AI call minutes per month"
            />
            <div className="mt-2 flex justify-between text-[0.7rem] text-slate-400">
              <span>1,000</span>
              <span>100,000</span>
            </div>
          </div>

          <p className="mt-5 text-center text-[0.78rem] text-slate-400">
            Volume discounts apply for high-usage accounts.{" "}
            <a href="#contact" className="font-semibold text-violet-600 hover:underline">
              Get a custom quote →
            </a>
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function SuitePricing() {
  return (
    <Reveal delay={0.1}>
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl shadow-blue-950/30">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(99,102,241,0.25),rgba(29,78,216,0.15),transparent)]" />
            <div className="bg-grid-dark absolute inset-0 opacity-20" aria-hidden />
          </div>

          {/* Badge */}
          <div className="relative z-10 flex justify-center pt-8">
            <div className="rounded-full border border-violet-400/30 bg-violet-500/20 px-5 py-1.5">
              <span className="text-[0.68rem] font-bold uppercase tracking-widest text-violet-300">
                ✦ Best Value — Combined Platform
              </span>
            </div>
          </div>

          <div className="relative z-10 px-8 pb-4 pt-6 text-center sm:px-12">
            <h3 className="text-[2rem] font-bold tracking-tight text-white">BITS Suite</h3>
            <p className="mx-auto mt-2 max-w-md text-[0.92rem] text-slate-400">
              BITScrm Professional + BITSagent Scale — one integrated platform, one contract, preferred pricing.
            </p>
          </div>

          <div className="relative z-10 grid gap-0 px-8 pb-8 sm:grid-cols-2 sm:px-12 sm:gap-x-12">
            {/* Features list */}
            <div className="py-4">
              <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">
                Everything Included
              </p>
              <ul className="space-y-3">
                {suiteBundleFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 text-[0.85rem] font-bold text-blue-400">✓</span>
                    <span className="text-[0.86rem] font-medium leading-snug text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col justify-center py-4 sm:border-l sm:border-white/10 sm:pl-12">
              <p className="text-[0.65rem] font-bold uppercase tracking-widest text-slate-500">Pricing</p>
              <p className="mt-3 text-[2.8rem] font-bold tracking-tight text-white">Custom</p>
              <p className="text-[0.82rem] text-slate-400">
                CRM seat rate + AI minute rate · volume bundled pricing available
              </p>
              <a
                href="#contact"
                className="group mt-8 flex h-13 items-center justify-center gap-2 rounded-full bg-blue-600 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/40 active:scale-[0.98]"
              >
                Request Suite Pricing
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <p className="mt-3 text-center text-[0.7rem] text-slate-600">
                Dedicated implementation engineer included
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const PRODUCT_DESCRIPTIONS: Record<ProductTab, { headline: string; sub: string }> = {
  crm: {
    headline: "BITScrm — Collections Operations Platform",
    sub: "Per-seat pricing for your human agents. Includes dialer, QA, live supervision, and full portfolio management.",
  },
  agent: {
    headline: "BITSagent — AI Voice & Email Agent",
    sub: "Pay only for the AI minutes consumed. No seat limits. Replace or augment your call floor with human-quality AI.",
  },
  suite: {
    headline: "BITS Suite — Full Platform Bundle",
    sub: "Both products at preferred pricing. Shared data, unified compliance, and one implementation team.",
  },
};

export function Pricing() {
  const [activeTab, setActiveTab] = React.useState<ProductTab>("crm");
  const meta = PRODUCT_DESCRIPTIONS[activeTab];

  return (
    <Section id="pricing" className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Transparent Pricing
              </span>
            </div>
            <h2 className="text-h2 mt-4 text-balance font-bold text-slate-900">
              Pick your product.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Configure your price.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[50ch] text-pretty text-slate-600">
              BITScrm and BITSagent are available standalone or as a bundled suite — priced to match your operation size.
            </p>
          </div>
        </Reveal>

        {/* Product tab switcher */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-lg justify-center">
            <div className="flex w-full gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 shadow-sm">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex flex-1 flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 text-center transition-all duration-200 active:scale-[0.97]",
                    activeTab === tab.id
                      ? tab.id === "agent"
                        ? "bg-violet-600 text-white shadow-md"
                        : tab.id === "suite"
                          ? "bg-slate-900 text-white shadow-md"
                          : "bg-blue-600 text-white shadow-md"
                      : "text-slate-500 hover:bg-white hover:text-slate-800"
                  )}
                >
                  <span className="text-[0.85rem] font-bold">{tab.label}</span>
                  <span className={cn("text-[0.65rem] font-medium", activeTab === tab.id ? "opacity-70" : "opacity-60")}>
                    {tab.sublabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tab description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="mt-6 text-center"
          >
            <p className="text-[0.95rem] font-semibold text-slate-800">{meta.headline}</p>
            <p className="mx-auto mt-1 max-w-lg text-[0.85rem] text-slate-500">{meta.sub}</p>
          </motion.div>
        </AnimatePresence>

        {/* Product-specific pricing */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            {activeTab === "crm" && <CrmPricing />}
            {activeTab === "agent" && <AgentPricing />}
            {activeTab === "suite" && <SuitePricing />}
          </motion.div>
        </AnimatePresence>

        {/* Free trial pilot banner */}
        <Reveal delay={0.3}>
          <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl shadow-blue-950/20 lg:mt-20">
            <div className="relative flex flex-col items-center justify-between gap-6 px-8 py-10 sm:flex-row sm:px-12 sm:py-12">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_100%_0%,rgba(59,130,246,0.2),rgba(255,255,255,0))]" />
              <div className="relative z-10 text-center sm:text-left">
                <span className="rounded-full bg-blue-500/20 px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-wider text-blue-300">
                  Risk-Free Pilot
                </span>
                <p className="mt-3 text-[1.35rem] font-bold text-white">
                  Try BITS Free for 14 Days
                </p>
                <p className="mt-1.5 max-w-md text-[0.92rem] text-slate-400">
                  Test BITScrm with your portfolio, or deploy BITSagent on a live campaign — zero commitment, full platform access.
                </p>
              </div>
              <div className="relative z-10 shrink-0">
                <a
                  href="#contact"
                  className="group flex h-13 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/30 active:scale-[0.98]"
                >
                  Start Free Pilot
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
