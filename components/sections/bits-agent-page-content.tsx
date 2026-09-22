"use client";

import * as React from "react";
import Link from "next/link";
import {
  bitsAgentCapabilities,
  bitsAgentPricingTiers,
  bitsAgentUseCases,
} from "@/lib/site";
import { BitsAgentCallSpecimen } from "@/components/sections/bits-agent-call";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

type UseCaseId = (typeof bitsAgentUseCases)[number]["id"];

const AGENT_SPECIFICATIONS = [
  { label: "Response latency", value: "< 300ms", detail: "Conversational turn-taking" },
  { label: "Concurrency", value: "Configured", detail: "Simultaneous active calls" },
  { label: "Language", value: "English & Taglish", detail: "Accent and cadence options" },
  { label: "Controls", value: "Policy-bound", detail: "Quiet hours, DNC, consent, audit" },
] as const;

export function BitsAgentPageContent() {
  const [activeUseCase, setActiveUseCase] = React.useState<UseCaseId>("collections");
  const [minutes, setMinutes] = React.useState(15000);
  const activeCase = bitsAgentUseCases.find((item) => item.id === activeUseCase) ?? bitsAgentUseCases[0];
  const estimatedCost = Math.round(minutes * 2.2);

  return (
    <div className="bg-cloud text-ink">
      <Section className="bg-white pt-28 sm:pt-32">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div>
              <Reveal>
                <p className="text-overline text-electric-600">BITSagent · collections contact</p>
                <h1 className="text-display mt-4 max-w-[18ch] text-balance leading-[1.08] text-ink">
                  Collections contact that stays on the account record.
                </h1>
                <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                  Deploy configured voice and messaging agents for follow-up, PTP handling,
                  and confirmations—with campaign rules, quiet hours, and an audit trail.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href="/#contact"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-electric-600 px-7 text-[0.95rem] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
                  >
                    Book a Consultation
                  </Link>
                  <a
                    href="#calculator"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy-700/20 bg-white px-7 text-[0.95rem] font-semibold text-navy-700 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-skywash"
                  >
                    Estimate minute volume
                  </a>
                </div>
                <p className="mt-4 text-[0.82rem] text-slateblue">
                  Scoped deployments only. No free trials or unpaid pilots.
                </p>
              </Reveal>
            </div>

            <BitsAgentCallSpecimen />
          </div>
        </Container>
      </Section>

      <section className="border-y border-linelight bg-cloud py-10">
        <Container>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {AGENT_SPECIFICATIONS.map((spec) => (
              <div key={spec.label}>
                <p className="text-[1.15rem] font-semibold tracking-[-0.02em] text-ink sm:text-xl">{spec.value}</p>
                <p className="mt-1 text-[0.82rem] font-semibold text-ink">{spec.label}</p>
                <p className="mt-0.5 text-[0.75rem] text-slateblue">{spec.detail}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section className="bg-white">
        <Container>
          <Reveal>
            <p className="text-overline text-electric-600">Capabilities</p>
            <h2 className="text-h2 mt-3 max-w-[20ch] text-balance text-ink">
              Speak, follow up, and keep the account current.
            </h2>
            <p className="text-lede mt-4 max-w-[46ch] text-pretty text-slateblue">
              BITSagent works from campaign rules and account context. Messaging depends on
              configured communication providers. Predictive dialing depends on telephony
              infrastructure.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-x-12 sm:grid-cols-2">
            {bitsAgentCapabilities.map((capability, index) => (
              <li key={capability.id} className="border-t border-linelight py-6">
                <p className="font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-[1.1rem] font-semibold text-ink">{capability.label}</h3>
                <p className="mt-2 max-w-[46ch] text-[0.92rem] leading-relaxed text-slateblue">{capability.copy}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="bg-cloud">
        <Container>
          <Reveal>
            <p className="text-overline text-electric-600">Configured by campaign</p>
            <h2 className="text-h2 mt-3 text-ink">Different jobs. Same operational record.</h2>
          </Reveal>

          <div
            role="tablist"
            aria-label="BITSagent use cases"
            className="mt-8 flex w-full gap-1 overflow-x-auto overscroll-x-contain rounded-2xl border border-linelight bg-white p-1.5"
          >
            {bitsAgentUseCases.map((useCase) => (
              <button
                key={useCase.id}
                type="button"
                role="tab"
                aria-selected={activeUseCase === useCase.id}
                id={`page-tab-${useCase.id}`}
                aria-controls={`page-case-${useCase.id}`}
                className={cn(
                  "min-h-11 shrink-0 cursor-pointer rounded-xl px-3.5 text-[0.82rem] font-semibold whitespace-nowrap transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] sm:flex-1",
                  activeUseCase === useCase.id
                    ? "bg-electric-600 text-white"
                    : "text-slateblue [@media(hover:hover)_and_(pointer:fine)]:hover:bg-cloud [@media(hover:hover)_and_(pointer:fine)]:hover:text-ink"
                )}
                onClick={() => setActiveUseCase(useCase.id)}
              >
                {useCase.label}
              </button>
            ))}
          </div>

          <div
            role="tabpanel"
            id={`page-case-${activeCase.id}`}
            aria-labelledby={`page-tab-${activeCase.id}`}
            className="mt-5 rounded-[1.75rem] border border-linelight bg-white p-6 sm:p-8"
          >
            <h3 className="text-[1.25rem] font-semibold text-ink">{activeCase.headline}</h3>
            <p className="mt-3 max-w-[62ch] text-[0.95rem] leading-relaxed text-slateblue">{activeCase.copy}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-3">
              {activeCase.outcomes.map((outcome) => (
                <li key={outcome} className="rounded-xl bg-cloud px-4 py-3 text-[0.82rem] font-medium text-ink">
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section id="calculator" className="scroll-mt-24 bg-white">
        <Container>
          <Reveal>
            <p className="text-overline text-electric-600">Usage estimate</p>
            <h2 className="text-h2 mt-3 text-ink">Estimate minute volume before you talk to us.</h2>
            <p className="text-lede mt-4 max-w-[46ch] text-pretty text-slateblue">
              Illustrative Scale-tier math at ₱2.20 per handled minute. Final pricing is scoped
              to your deployment.
            </p>
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl rounded-[1.75rem] border border-linelight bg-cloud p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.75rem] font-semibold tracking-[0.12em] text-electric-600 uppercase">
                  Monthly volume
                </p>
                <p className="mt-1 text-xl font-semibold text-ink">Estimated investment</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-3xl font-semibold tabular-nums text-ink">₱{estimatedCost.toLocaleString()}</p>
                <p className="text-[0.78rem] text-slateblue">{minutes.toLocaleString()} minutes / month</p>
              </div>
            </div>
            <label className="mt-8 block text-[0.85rem] font-medium text-ink" htmlFor="agent-minutes">
              Call volume
            </label>
            <input
              id="agent-minutes"
              type="range"
              min={1000}
              max={100000}
              step={1000}
              value={minutes}
              onChange={(event) => setMinutes(Number(event.target.value))}
              className="mt-2 h-11 w-full cursor-pointer accent-electric-600"
              aria-valuemin={1000}
              aria-valuemax={100000}
              aria-valuenow={minutes}
            />
            <div className="mt-1 flex justify-between text-[0.72rem] text-slateblue">
              <span>1,000</span>
              <span>100,000</span>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {bitsAgentPricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-[1.75rem] border bg-white p-7",
                  tier.popular ? "border-electric-600" : "border-linelight"
                )}
              >
                {tier.popular ? (
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-electric-600 uppercase">
                    Most requested
                  </p>
                ) : null}
                <h3 className="mt-2 text-xl font-semibold text-ink">{tier.name}</h3>
                <p className="mt-1 text-[0.85rem] text-slateblue">{tier.tagline}</p>
                <p className="mt-5 text-2xl font-semibold text-ink">
                  {tier.priceLabel}
                  <span className="ml-1 text-[0.78rem] font-medium text-slateblue">{tier.priceSubtext}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-linelight pt-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="text-[0.85rem] leading-relaxed text-slateblue">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/#contact"
                  className={cn(
                    "mt-8 inline-flex min-h-11 items-center justify-center rounded-full px-5 text-[0.9rem] font-semibold transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
                    tier.popular
                      ? "bg-electric-600 text-white [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
                      : "border border-navy-700/20 text-navy-700 [@media(hover:hover)_and_(pointer:fine)]:hover:bg-skywash"
                  )}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* AEO Prompt-Mirror FAQ Section */}
      <Section className="border-t border-linelight bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center mb-14">
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-electric-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-h2 mt-3 font-bold text-ink">
              Everything You Need to Know About BITSagent AI
            </h2>
            <p className="text-lede mt-4 text-slateblue">
              Factual, technical, and regulatory answers for AI directors, operations heads, and compliance officers.
            </p>
          </div>

          {/* JSON-LD Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How does BITSagent maintain sub-300ms voice turn latency?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "BITSagent utilizes ultra-low latency WebRTC audio streaming coupled with speculative speech recognition and streaming LLM token generation, delivering human-speed conversational pacing (< 300ms turn time) without robotic pauses or awkward interruptions.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can BITSagent be deployed on-premises or private cloud for banking compliance?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. BITSagent can run either in our secure managed cloud or completely within your organization's private VPC or on-premises GPU infrastructure, ensuring audio recordings, transcripts, and customer PII never leave your security perimeter.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How does BITSagent prevent AI hallucinations during financial negotiations?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "BITSagent is strictly grounded via BITS RAG into your company's approved credit policies, maximum discount thresholds, settlement rules, and statutory disclosures. The agent cannot offer terms outside of your pre-authorized parameter matrix.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What happens if a customer asks to speak with a live human agent?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "BITSagent executes an instantaneous, lossless warm transfer to your live floor queue, delivering the full conversation transcript, sentiment score, and verified customer identity directly to the human agent's screen before the call bridges.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can BITSagent be white-labeled under our agency's brand?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. BITSagent can be deployed with custom synthetic voice clones, your agency's caller ID, and white-labeled supervisor monitoring dashboards.",
                    },
                  },
                ],
              }),
            }}
          />

          <div className="mx-auto max-w-3xl space-y-4">
            {[
              {
                q: "How does BITSagent maintain sub-300ms voice turn latency?",
                a: "BITSagent utilizes ultra-low latency WebRTC audio streaming coupled with speculative speech recognition and streaming LLM token generation, delivering human-speed conversational pacing (< 300ms turn time) without robotic pauses or awkward interruptions.",
              },
              {
                q: "Can BITSagent be deployed on-premises or private cloud for banking compliance?",
                a: "Yes. BITSagent can run either in our secure managed cloud or completely within your organization's private VPC or on-premises GPU infrastructure, ensuring audio recordings, transcripts, and customer PII never leave your security perimeter.",
              },
              {
                q: "How does BITSagent prevent AI hallucinations during financial negotiations?",
                a: "BITSagent is strictly grounded via BITS RAG into your company's approved credit policies, maximum discount thresholds, settlement rules, and statutory disclosures. The agent cannot offer terms outside of your pre-authorized parameter matrix.",
              },
              {
                q: "What happens if a customer asks to speak with a live human agent?",
                a: "BITSagent executes an instantaneous, lossless warm transfer to your live floor queue, delivering the full conversation transcript, sentiment score, and verified customer identity directly to the human agent's screen before the call bridges.",
              },
              {
                q: "Can BITSagent be white-labeled under our agency's brand?",
                a: "Yes. BITSagent can be deployed with custom synthetic voice clones, your agency's caller ID, and white-labeled supervisor monitoring dashboards.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-linelight bg-cloud p-6 transition-all hover:bg-white hover:shadow-xs"
              >
                <summary className="flex cursor-pointer items-center justify-between text-base font-bold text-ink">
                  <span>{item.q}</span>
                  <span className="ml-4 font-mono text-electric-600 transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slateblue">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-cloud">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-h2 text-ink">See BITSagent on your campaign rules.</h2>
            <p className="text-lede mx-auto mt-4 max-w-[46ch] text-pretty text-slateblue">
              Request a scoped demonstration with synthetic account data. We do not offer
              free trials or unpaid pilots.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-electric-600 px-7 text-[0.95rem] font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
              >
                Request a Demo
              </Link>
              <Link
                href="/bitscrm"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-navy-700/20 bg-white px-7 text-[0.95rem] font-semibold text-navy-700 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-skywash"
              >
                View BITScrm
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
