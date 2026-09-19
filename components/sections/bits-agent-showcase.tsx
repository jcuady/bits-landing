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
    <Section id="bitsagent" className="scroll-mt-28 bg-cloud">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">Voice · email · account history</p>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance leading-[1.08] text-ink">
                BITSagent handles routine collections contact from the same workspace.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                Configurable calling and messaging for follow-up, PTP confirmations, and
                account outreach. Providers and scripts are set with your operation.
                Scoped deployments only.
              </p>
            </Reveal>

            <ol className="mt-8 max-w-[46ch]">
              {bitsAgentCapabilities.map((capability, index) => (
                <li key={capability.id}>
                  <Reveal delay={0.06 + index * 0.04} y={10}>
                    <div className="flex gap-4 border-t border-linelight/90 py-3.5 first:border-t-0">
                      <span className="w-6 shrink-0 pt-0.5 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.95rem] font-semibold text-ink">{capability.label}</p>
                        <p className="mt-1 text-[0.88rem] leading-relaxed text-slateblue">{capability.copy}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.28} y={8}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/bitsagent"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-electric-600 px-6 text-[0.92rem] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
                >
                  Learn about BITSagent
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-navy-700/20 bg-white px-6 text-[0.92rem] font-semibold text-navy-700 transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-skywash"
                >
                  Request a Demo
                </Link>
              </div>
            </Reveal>
          </div>

          <BitsAgentCallSpecimen />
        </div>

        <Reveal delay={0.12} className="mt-16 lg:mt-20">
          <p className="text-overline text-electric-600">Configured by campaign</p>
          <h3 className="text-h3 mt-3 text-ink">One agent configuration. Different operational jobs.</h3>
          <div
            role="tablist"
            aria-label="BITSagent use cases"
            className="mt-6 flex w-full gap-1 overflow-x-auto overscroll-x-contain rounded-2xl border border-linelight bg-white p-1.5"
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
                  "min-h-11 shrink-0 cursor-pointer rounded-xl px-3.5 text-[0.82rem] font-semibold whitespace-nowrap transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] sm:min-w-0 sm:flex-1",
                  activeUseCase === useCase.id
                    ? "bg-electric-600 text-white"
                    : "text-slateblue [@media(hover:hover)_and_(pointer:fine)]:hover:bg-cloud [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
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
            className="mt-5 rounded-[1.75rem] border border-linelight bg-white p-6 sm:p-8"
          >
            <h4 className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">{activeCase.headline}</h4>
            <p className="mt-3 max-w-[62ch] text-[0.92rem] leading-relaxed text-slateblue">{activeCase.copy}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {activeCase.outcomes.map((outcome) => (
                <li key={outcome} className="rounded-xl bg-cloud px-4 py-3 text-[0.82rem] font-medium text-ink">
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
