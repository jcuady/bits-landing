"use client";

import * as React from "react";
import Link from "next/link";
import { bitsAgentCapabilities, bitsAgentUseCases } from "@/lib/site";
import { BitsAgentCallSpecimen } from "@/components/sections/bits-agent-call";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type UseCaseId = (typeof bitsAgentUseCases)[number]["id"];

export function BitsAgentShowcase() {
  const [activeUseCase, setActiveUseCase] = React.useState<UseCaseId>("collections");
  const activeCase = bitsAgentUseCases.find((item) => item.id === activeUseCase) ?? bitsAgentUseCases[0];

  return (
    <Section id="bitsagent" className="scroll-mt-28 bg-slate-50">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-violet-500/15 bg-violet-50/80 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-violet-600 animate-pulse" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-violet-700">
                  AI Operations Layer · BITSagent
                </span>
              </div>
              <h2 className="text-h2 text-balance font-bold leading-[1.08] text-slate-900">
                Smart AI Assistants That Follow Your Exact Business Rules.
              </h2>
              <p className="text-lede mt-5 max-w-[48ch] text-pretty text-slate-600">
                Use natural AI voice callers, automated email reminders, and instant call quality reviews that strictly follow your company guidelines with zero mistakes.
              </p>
            </Reveal>

            {/* Capabilities with Maturity Tags */}
            <ol className="mt-8 max-w-[48ch] divide-y divide-slate-200/80">
              {bitsAgentCapabilities.map((capability, index) => {
                const badgeColor =
                  capability.maturity === "Available"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : capability.maturity === "Configurable"
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-amber-50 text-amber-700 border-amber-200";

                return (
                  <li key={capability.id} className="py-3.5 first:pt-0">
                    <Reveal delay={0.05 + index * 0.03} y={8}>
                      <div className="flex items-start gap-3.5">
                        <span className="font-mono text-xs font-bold text-violet-600">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-bold text-slate-900">{capability.label}</p>
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider",
                                badgeColor
                              )}
                            >
                              {capability.maturity}
                            </span>
                          </div>
                          <p className="mt-1 text-xs leading-relaxed text-slate-600">
                            {capability.copy}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>

            <Reveal delay={0.28} y={8}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/bitsagent"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-violet-600 px-6 text-xs font-bold text-white shadow-md shadow-violet-600/20 transition-all hover:bg-violet-700 hover:shadow-violet-600/30 active:scale-[0.98]"
                >
                  Explore AI Operations (BITSagent) →
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  Book a Consultation
                </Link>
              </div>
            </Reveal>
          </div>

          <BitsAgentCallSpecimen />
        </div>

        {/* Use Cases Tablist */}
        <Reveal delay={0.12} className="mt-16 lg:mt-20">
          <div className="border-t border-slate-200 pt-12">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-violet-600">
              DEPLOYMENT USE CASES
            </span>
            <h3 className="mt-1 text-2xl font-bold text-slate-900">
              One Unified AI Layer. Purpose-Built Operational Jobs.
            </h3>

            <div
              role="tablist"
              aria-label="BITSagent use cases"
              className="mt-6 flex w-full gap-1 overflow-x-auto overscroll-x-contain rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs"
            >
              {bitsAgentUseCases.map((useCase) => (
                <button
                  key={useCase.id}
                  type="button"
                  role="tab"
                  aria-selected={activeUseCase === useCase.id}
                  aria-controls={`bitsagent-case-${useCase.id}`}
                  id={`bitsagent-tab-${useCase.id}`}
                  tabIndex={activeUseCase === useCase.id ? 0 : -1}
                  onClick={() => setActiveUseCase(useCase.id)}
                  className={cn(
                    "min-h-11 shrink-0 cursor-pointer rounded-xl px-4 text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-[0.98] sm:min-w-0 sm:flex-1",
                    activeUseCase === useCase.id
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {useCase.label}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id={`bitsagent-case-${activeCase.id}`}
              aria-labelledby={`bitsagent-tab-${activeCase.id}`}
              className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <h4 className="text-lg font-bold tracking-tight text-slate-900">
                {activeCase.headline}
              </h4>
              <p className="mt-2.5 max-w-[62ch] text-sm leading-relaxed text-slate-600">
                {activeCase.copy}
              </p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-3">
                {activeCase.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-semibold text-slate-800"
                  >
                    <span className="flex size-4 items-center justify-center rounded-full bg-violet-100 text-[0.65rem] font-bold text-violet-600">
                      ✓
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
