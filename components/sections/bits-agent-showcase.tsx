"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { bitsAgentCapabilities, bitsAgentUseCases } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/* ── Static transcript for SSR safety ── */
const TRANSCRIPT = [
  { id: 1, speaker: "agent", text: "Good morning, may I speak with Maria Santos regarding her account ending in 4821?", delay: 0 },
  { id: 2, speaker: "customer", text: "Yes, this is Maria. Who am I speaking with?", delay: 0.6 },
  { id: 3, speaker: "agent", text: "This is Alex from Boundless Financial Services. I'm reaching out about your overdue balance of ₱12,450. I'd like to help you find a payment arrangement that works for your situation.", delay: 1.4 },
  { id: 4, speaker: "customer", text: "I can pay ₱5,000 by the 15th. Is that okay?", delay: 2.4 },
  { id: 5, speaker: "agent", text: "That works perfectly, Maria. I'll schedule a Promise-to-Pay for ₱5,000 on the 15th and note the remaining balance for a follow-up. You'll receive a confirmation via SMS shortly.", delay: 3.2 },
] as const;

const WAVEFORM_HEIGHTS = [12, 28, 20, 36, 16, 44, 24, 32, 20, 40, 28, 16, 36, 24, 44, 18, 32, 28, 20, 36] as const;

type UseCaseId = (typeof bitsAgentUseCases)[number]["id"];

function LiveCallMockup() {
  const [activeBar, setActiveBar] = React.useState(0);
  const [visibleLines, setVisibleLines] = React.useState(1);

  React.useEffect(() => {
    const barTimer = setInterval(() => {
      setActiveBar((p) => (p + 1) % WAVEFORM_HEIGHTS.length);
    }, 120);
    return () => clearInterval(barTimer);
  }, []);

  React.useEffect(() => {
    if (visibleLines >= TRANSCRIPT.length) return;
    const timer = setTimeout(() => {
      setVisibleLines((p) => p + 1);
    }, 2200);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0B1526] shadow-2xl shadow-black/40">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/8 bg-white/[0.03] px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-40">
            <span className="size-2.5 rounded-full bg-white/60" />
            <span className="size-2.5 rounded-full bg-white/60" />
            <span className="size-2.5 rounded-full bg-white/60" />
          </div>
          <div className="font-mono text-[0.7rem] font-semibold tracking-widest text-blue-200/50">
            BITSAGENT // LIVE CALL
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-emerald-400">AI Active</span>
        </div>
      </div>

      {/* Waveform visualizer */}
      <div className="flex items-center justify-center gap-[3px] border-b border-white/5 bg-[#080E1C] px-6 py-4">
        {WAVEFORM_HEIGHTS.map((h, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{
              backgroundColor:
                i === activeBar
                  ? "rgb(96, 165, 250)"
                  : i === (activeBar - 1 + WAVEFORM_HEIGHTS.length) % WAVEFORM_HEIGHTS.length
                    ? "rgb(59, 130, 246)"
                    : "rgb(30, 58, 138)",
            }}
            animate={{ height: i === activeBar ? h + 8 : i % 3 === 0 ? h * 0.5 : h * 0.3 }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          />
        ))}
        <div className="ml-4 font-mono text-[0.65rem] text-blue-300/50">04:12</div>
      </div>

      {/* Transcript */}
      <div className="space-y-4 p-5 sm:p-6">
        <AnimatePresence>
          {TRANSCRIPT.slice(0, visibleLines).map((line) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className={cn("flex gap-3", line.speaker === "agent" ? "flex-row" : "flex-row-reverse")}
            >
              <div
                className={cn(
                  "shrink-0 rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest self-start mt-1",
                  line.speaker === "agent"
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-white/10 text-white/50"
                )}
              >
                {line.speaker === "agent" ? "AI" : "Customer"}
              </div>
              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2.5 text-[0.82rem] leading-relaxed",
                  line.speaker === "agent"
                    ? "rounded-tl-none bg-blue-600/20 text-blue-100 ring-1 ring-blue-500/20"
                    : "rounded-tr-none bg-white/8 text-white/70 ring-1 ring-white/10"
                )}
              >
                {line.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleLines < TRANSCRIPT.length && (
          <div className="flex items-center gap-2 pl-11">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-blue-400"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            <span className="font-mono text-[0.65rem] text-blue-300/40">AI processing…</span>
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-white/5 bg-white/[0.02] px-5 py-3 text-[0.65rem] font-mono font-medium text-white/30">
        <span>PTP_DETECTED · AUTO_SCHEDULE</span>
        <span className="text-emerald-400/60">COMPLIANCE ✓</span>
      </div>
    </div>
  );
}

export function BitsAgentShowcase() {
  const [activeUseCase, setActiveUseCase] = React.useState<UseCaseId>("collections");
  const activeCase = bitsAgentUseCases.find((u) => u.id === activeUseCase) ?? bitsAgentUseCases[0];

  return (
    <Section id="bitsagent" className="relative overflow-hidden bg-[#060C1A]">
      {/* Background layering */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_60%_-10%,rgba(29,78,216,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_10%_80%,rgba(99,102,241,0.08),transparent)]" />
        <div className="bg-grid-dark absolute inset-0 opacity-[0.15]" aria-hidden />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-5 flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-violet-300">
                New Product
              </span>
            </div>
            <h2 className="text-h2 text-balance font-bold text-white">
              Meet{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent">
                BITSagent
              </span>
            </h2>
            <p className="text-lede mx-auto mt-5 max-w-[52ch] text-pretty text-blue-100/60">
              An AI agent that calls, emails, and resolves — indistinguishable from a human.
              Purpose-built to replace or augment call center floors for collections, support, and beyond.
            </p>
          </div>
        </Reveal>

        {/* Two-column hero layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-16 lg:items-center">
          {/* Left: Copy + capability cards */}
          <Reveal y={20}>
            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {bitsAgentCapabilities.map((cap, i) => (
                  <motion.div
                    key={cap.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="group relative rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-[1px] transition-all"
                  >
                    <div className="flex flex-col gap-3 rounded-[calc(1rem-1px)] bg-[#0A1424] p-5 transition-colors group-hover:bg-[#0D1830]">
                      <p className="text-[0.75rem] font-bold uppercase tracking-widest text-blue-300/60">
                        {cap.label}
                      </p>
                      <p className="text-[0.85rem] leading-relaxed text-white/60">{cap.copy}</p>
                      <div className="mt-1 border-t border-white/5 pt-3">
                        <span className="text-2xl font-bold tracking-tight text-white">{cap.metric}</span>
                        <span className="ml-2 text-[0.72rem] font-medium text-blue-200/50">{cap.metricLabel}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA row */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group flex h-12 items-center gap-2 rounded-full bg-blue-600 px-7 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-900/30 active:scale-[0.98]"
                >
                  Deploy BITSagent
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
                <a
                  href="#pricing"
                  className="text-[0.9rem] font-semibold text-blue-300/70 underline-offset-4 hover:text-blue-200 hover:underline transition-colors"
                >
                  View pricing
                </a>
              </div>
            </div>
          </Reveal>

          {/* Right: Live call mockup */}
          <Reveal y={30} delay={0.15}>
            <LiveCallMockup />
          </Reveal>
        </div>

        {/* Use case selector */}
        <Reveal delay={0.25} y={30}>
          <div className="mt-24 lg:mt-28">
            <div className="mb-10 flex flex-col items-center gap-2 text-center">
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-300/50">
                Industry Use Cases
              </p>
              <h3 className="text-h3 font-bold text-white">
                One agent. Every department.
              </h3>
            </div>

            {/* Tab buttons */}
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {bitsAgentUseCases.map((uc) => (
                <button
                  key={uc.id}
                  type="button"
                  onClick={() => setActiveUseCase(uc.id)}
                  className={cn(
                    "rounded-full px-5 py-2 text-[0.83rem] font-bold transition-all duration-200 active:scale-[0.97]",
                    activeUseCase === uc.id
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 ring-1 ring-white/10"
                  )}
                >
                  {uc.label}
                </button>
              ))}
            </div>

            {/* Active use case card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeUseCase}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/8 bg-gradient-to-b from-[#0D1830] to-[#090E1C] p-8 sm:p-10"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
                  <div className="flex-1">
                    <p className="mb-2 text-[0.72rem] font-bold uppercase tracking-widest text-blue-400/60">
                      {activeCase.label}
                    </p>
                    <h4 className="mb-3 text-[1.4rem] font-bold tracking-tight text-white">
                      {activeCase.headline}
                    </h4>
                    <p className="text-[0.9rem] leading-relaxed text-white/55">{activeCase.copy}</p>
                  </div>
                  <div className="shrink-0 sm:w-52">
                    <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-widest text-white/30">
                      Measured Outcomes
                    </p>
                    <ul className="space-y-2.5">
                      {activeCase.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-2.5">
                          <span className="mt-0.5 text-[0.8rem] font-bold text-emerald-400">✓</span>
                          <span className="text-[0.82rem] font-medium text-white/70">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
