"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import {
  bitsAgentCapabilities,
  bitsAgentUseCases,
  bitsAgentPricingTiers,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const WAVEFORM_HEIGHTS = [12, 28, 20, 36, 16, 44, 24, 32, 20, 40, 28, 16, 36, 24, 44, 18, 32, 28, 20, 36] as const;

const TRANSCRIPT = [
  { id: 1, speaker: "agent", text: "Good morning, may I speak with Maria Santos regarding her account ending in 4821?", delay: 0 },
  { id: 2, speaker: "customer", text: "Yes, this is Maria. Who am I speaking with?", delay: 0.6 },
  { id: 3, speaker: "agent", text: "This is Alex from Boundless Financial Services. I'm reaching out about your overdue balance of ₱12,450. I'd like to help you find a payment arrangement that works for your situation.", delay: 1.4 },
  { id: 4, speaker: "customer", text: "I can pay ₱5,000 by the 15th. Is that okay?", delay: 2.4 },
  { id: 5, speaker: "agent", text: "That works perfectly, Maria. I'll schedule a Promise-to-Pay for ₱5,000 on the 15th and note the remaining balance for a follow-up. You'll receive a confirmation via SMS shortly.", delay: 3.2 },
] as const;

type UseCaseId = (typeof bitsAgentUseCases)[number]["id"];

const AGENT_SPECIFICATIONS = [
  { label: "Response Latency", value: "< 300ms", detail: "Conversational turn-taking" },
  { label: "Concurrency", value: "Unlimited", detail: "Simultaneous active calls" },
  { label: "Language & Dialect", value: "English & Taglish", detail: "Native accent & cadence" },
  { label: "Compliance Guard", value: "100% Policy-bound", detail: "BSP Circular 454/857 aligned" },
] as const;

export function BitsAgentPageContent() {
  const [activeUseCase, setActiveUseCase] = React.useState<UseCaseId>("collections");
  const [visibleLines, setVisibleLines] = React.useState(1);
  const [minutes, setMinutes] = React.useState(15000);

  const activeCase = bitsAgentUseCases.find((u) => u.id === activeUseCase) ?? bitsAgentUseCases[0];

  React.useEffect(() => {
    if (visibleLines >= TRANSCRIPT.length) return;
    const timer = setTimeout(() => {
      setVisibleLines((p) => p + 1);
    }, 2400);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  const estimatedCost = Math.round(minutes * 2.2);

  return (
    <div className="bg-[#040814] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(139,92,246,0.22),rgba(59,130,246,0.12),transparent)]" />
          <div className="bg-grid-dark absolute inset-0 opacity-25" />
          <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-violet-600/[0.08] blur-[120px]" />
          <div className="absolute -left-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/[0.08] blur-[100px]" />
        </div>

        <Container className="relative z-10">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Breadcrumb pill */}
            <Reveal y={12}>
              <div className="mb-6 flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 backdrop-blur-md shadow-xs">
                <Link href="/" className="text-[0.72rem] font-bold text-violet-300/70 hover:text-white transition-colors">
                  Platform
                </Link>
                <span className="text-[0.72rem] text-white/30">/</span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-violet-300">
                  BITSagent AI
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.06} y={16}>
              <h1 className="text-display text-balance font-bold leading-[1.05] text-white">
                The Human-Sounding AI Agent That{" "}
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                  Resolves Collections Calls at Scale
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={14}>
              <p className="text-lede mx-auto mt-6 max-w-[55ch] text-pretty text-blue-100/70">
                Deploy autonomous voice agents that speak naturally, adapt to debtor responses,
                negotiate payment arrangements, and log promises-to-pay — 24/7 with zero human burnout.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Link
                    href="/#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 font-bold text-white shadow-lg shadow-violet-900/30 transition-all hover:from-violet-500 hover:to-indigo-500 active:scale-[0.98] sm:w-auto"
                  >
                    Deploy BITSagent Today
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <a
                    href="#calculator"
                    className="flex h-14 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 font-bold text-white shadow-xs backdrop-blur-md transition-colors hover:bg-white/20 active:scale-[0.98] sm:w-auto"
                  >
                    Calculate Minute ROI
                  </a>
                </Magnetic>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.8rem] font-medium text-blue-200/60">
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-400">✓</span> Sub-300ms Conversational Latency
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-400">✓</span> BSP Circular 454/857 Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-400">✓</span> Unlimited Concurrent Lines
                </span>
              </div>
            </Reveal>
          </div>

          {/* Interactive Voice Call Demo Card */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0A1224] shadow-2xl shadow-black/50">
              {/* Bezel Bar */}
              <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5 opacity-40">
                    <span className="size-2.5 rounded-full bg-white/60" />
                    <span className="size-2.5 rounded-full bg-white/60" />
                    <span className="size-2.5 rounded-full bg-white/60" />
                  </div>
                  <div className="font-mono text-[0.75rem] font-semibold tracking-widest text-violet-300">
                    BITSAGENT AUDIO ENGINE // LIVE CONVERSATION
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-400">
                    Call Active · 00:04:12
                  </span>
                </div>
              </div>

              {/* Live Waveform Bar */}
              <div className="flex items-center justify-center gap-1 border-b border-white/5 bg-[#060C18] px-6 py-4">
                {WAVEFORM_HEIGHTS.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full bg-gradient-to-t from-blue-500 to-violet-400"
                    animate={{
                      height: [h * 0.35, h + 8, h * 0.3],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      duration: 1.1 + (i % 4) * 0.15,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: (i % 6) * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              {/* Conversation Bubble Transcript */}
              <div className="space-y-4 p-6 sm:p-8">
                <AnimatePresence>
                  {TRANSCRIPT.slice(0, visibleLines).map((line) => (
                    <motion.div
                      key={line.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className={cn(
                        "flex gap-3",
                        line.speaker === "agent" ? "flex-row" : "flex-row-reverse"
                      )}
                    >
                      <div
                        className={cn(
                          "shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-widest self-start mt-1",
                          line.speaker === "agent"
                            ? "bg-violet-500/20 text-violet-300 ring-1 ring-violet-500/30"
                            : "bg-white/10 text-white/60 ring-1 ring-white/10"
                        )}
                      >
                        {line.speaker === "agent" ? "BITSagent" : "Debtor"}
                      </div>
                      <div
                        className={cn(
                          "max-w-[75%] rounded-2xl px-5 py-3 text-[0.88rem] leading-relaxed",
                          line.speaker === "agent"
                            ? "rounded-tl-none bg-violet-950/40 text-violet-100 ring-1 ring-violet-500/30"
                            : "rounded-tr-none bg-white/10 text-white/80 ring-1 ring-white/10"
                        )}
                      >
                        {line.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {visibleLines < TRANSCRIPT.length && (
                  <div className="flex items-center gap-2 pl-14">
                    <span className="size-1.5 animate-pulse rounded-full bg-violet-400" />
                    <span className="font-mono text-[0.7rem] text-violet-300/60">
                      BITSagent analyzing response & policy rules…
                    </span>
                  </div>
                )}
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-6 py-3.5 font-mono text-[0.7rem] text-white/40">
                <span>INTENT: PROMISE_TO_PAY // AMOUNT: ₱5,000.00</span>
                <span className="text-emerald-400">CONFIRMATION SMS DISPATCHED ✓</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specifications Strip */}
      <section className="border-y border-white/10 bg-white/[0.02] py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {AGENT_SPECIFICATIONS.map((spec) => (
              <div key={spec.label} className="text-center">
                <div className="text-3xl font-bold tracking-tight text-violet-400 sm:text-4xl">
                  {spec.value}
                </div>
                <p className="mt-1 text-[0.82rem] font-semibold text-white/80">{spec.label}</p>
                <p className="text-[0.72rem] text-white/50">{spec.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4 Core Capabilities */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-violet-400">
              Autonomous Intelligence
            </span>
            <h2 className="text-h2 mt-3 font-bold text-white">
              Engineered to Speak, Reason, and Recover
            </h2>
            <p className="text-lede mt-4 text-blue-100/70">
              Unlike rigid legacy IVRs or robotic voice bots, BITSagent conducts real, dynamic human
              conversations constrained by your operational credit policies.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {bitsAgentCapabilities.map((cap) => (
              <div
                key={cap.id}
                className="group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 transition-all hover:border-violet-500/30 hover:from-white/[0.1]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.75rem] font-bold uppercase tracking-widest text-violet-300">
                      {cap.label}
                    </span>
                    <span className="size-2 rounded-full bg-violet-400" />
                  </div>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
                    {cap.copy}
                  </h3>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="text-3xl font-bold tracking-tight text-violet-300">
                    {cap.metric}
                  </div>
                  <div className="mt-1 text-[0.78rem] font-medium text-blue-200/60">
                    {cap.metricLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Departmental Use Cases */}
      <section className="bg-white/[0.02] py-20 sm:py-28 border-y border-white/10">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-violet-400">
              Multi-Department Deployment
            </span>
            <h2 className="text-h2 mt-3 font-bold text-white">
              One AI Agent. Multiple Operations.
            </h2>
            <p className="text-lede mt-4 text-blue-100/70">
              Deploy specialized BITSagent personas across your entire customer lifecycle.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {bitsAgentUseCases.map((uc) => (
              <button
                key={uc.id}
                type="button"
                onClick={() => setActiveUseCase(uc.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-[0.85rem] font-bold transition-all",
                  activeUseCase === uc.id
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                )}
              >
                {uc.label}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1526] p-8 sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
              <div className="flex-1">
                <span className="text-[0.72rem] font-bold uppercase tracking-widest text-violet-400">
                  {activeCase.label}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-white">{activeCase.headline}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-blue-100/70">{activeCase.copy}</p>
              </div>
              <div className="shrink-0 sm:w-56 border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0 sm:border-l sm:border-white/10 sm:pl-8">
                <p className="text-[0.7rem] font-bold uppercase tracking-widest text-white/40 mb-3">
                  Measured Impact
                </p>
                <ul className="space-y-2.5">
                  {activeCase.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2.5 text-[0.85rem] text-blue-100/80">
                      <span className="font-bold text-emerald-400">✓</span>
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Minute Cost Estimator & Pricing */}
      <section id="calculator" className="py-20 sm:py-28 relative">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-violet-400">
              Customizable Pricing
            </span>
            <h2 className="text-h2 mt-3 font-bold text-white">
              Pay Only for What BITSagent Handles
            </h2>
            <p className="text-lede mt-4 text-blue-100/70">
              No long-term lock-ins. Slide below to estimate your monthly AI call volume and costs.
            </p>
          </div>

          {/* Interactive Slider */}
          <div className="mx-auto mt-12 max-w-3xl rounded-[2.5rem] border border-violet-500/20 bg-gradient-to-b from-[#0F172E] to-[#0A1020] p-8 shadow-2xl sm:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.75rem] font-bold uppercase tracking-widest text-violet-400">
                  Live Usage Calculator
                </p>
                <h4 className="mt-1 text-xl font-bold text-white">Estimated Monthly Investment</h4>
                <p className="text-[0.85rem] text-blue-200/60">
                  Calculated at ₱2.20 / minute (Scale tier volume discount)
                </p>
              </div>
              <div className="rounded-2xl border border-violet-500/30 bg-violet-950/40 px-6 py-4 text-right">
                <span className="text-[0.68rem] font-bold uppercase tracking-widest text-violet-300">
                  Estimated Total
                </span>
                <div className="text-3xl font-bold text-white">
                  ₱{estimatedCost.toLocaleString()}
                </div>
                <span className="text-[0.72rem] text-blue-200/50">
                  {minutes.toLocaleString()} minutes / month
                </span>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between text-[0.85rem] font-medium text-blue-200 mb-2">
                <span>Call Volume</span>
                <span className="font-bold text-white">{minutes.toLocaleString()} minutes</span>
              </div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="h-2.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-500"
                aria-label="Estimated monthly AI minutes"
              />
              <div className="flex justify-between text-[0.72rem] text-white/40 mt-2">
                <span>1,000 mins</span>
                <span>50,000 mins</span>
                <span>100,000 mins</span>
              </div>
            </div>
          </div>

          {/* Pricing Tier Cards */}
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {bitsAgentPricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-[2rem] p-8 transition-all",
                  tier.popular
                    ? "border-2 border-violet-500 bg-[#0E162C] shadow-2xl shadow-violet-950/40 ring-4 ring-violet-500/10"
                    : "border border-white/10 bg-white/[0.03]"
                )}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 rounded-bl-2xl bg-violet-600 px-4 py-1">
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white">
                      Best Value
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="mt-1 text-[0.85rem] text-blue-100/60">{tier.tagline}</p>
                <div className="mt-5">
                  <span className="text-3xl font-bold text-white">{tier.priceLabel}</span>
                  <span className="ml-1 text-[0.8rem] text-blue-200/50">{tier.priceSubtext}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3 border-t border-white/10 pt-6">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-[0.85rem] text-blue-100/80">
                      <span className="text-violet-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/#contact"
                  className={cn(
                    "mt-8 flex h-12 w-full items-center justify-center rounded-full font-bold transition-all",
                    tier.popular
                      ? "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-900/30"
                      : "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* CRM Suite Upsell */}
          <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-[0.9rem] text-blue-100/80">
              Want the complete package? <strong>Bundle BITScrm and BITSagent</strong> in the BITS Suite
              for unified portfolio management, live supervisory barge-in, and volume savings.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Link
                href="/bitscrm"
                className="text-[0.85rem] font-bold text-violet-300 hover:text-white underline transition-colors"
              >
                Learn About BITScrm Platform →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-r from-violet-900 to-indigo-900 py-16 text-center">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Automate Your First 10,000 Recovery Calls
            </h2>
            <p className="mt-4 text-blue-100 text-lede">
              Start with a 14-day risk-free pilot. Watch BITSagent conduct calls, negotiate payment
              plans, and log collections in real-time.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="flex h-14 items-center justify-center rounded-full bg-white px-8 font-bold text-violet-900 shadow-xl transition-all hover:bg-slate-100 active:scale-[0.98]"
              >
                Launch Your Pilot Call Campaign →
              </Link>
              <Link
                href="/bitscrm"
                className="flex h-14 items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 font-bold text-white transition-all hover:bg-white/20 active:scale-[0.98]"
              >
                View BITScrm Details
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
