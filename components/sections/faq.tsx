"use client";

import * as React from "react";
import Link from "next/link";
import { faqItems } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";


export function FAQ() {
  const { openModal } = useConsultationModal();
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Section id="faq" className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/25 to-white py-12 sm:py-16 lg:py-20 border-b border-sky-100">
      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.05),transparent)]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="mx-auto mb-2.5 inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-white px-3 py-1 backdrop-blur-md shadow-2xs">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-blue-700 font-mono">
                Operational Clarity
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.18] text-balance">
              Your Questions Answered.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Clear &amp; Factual.
              </span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-pretty text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Direct, factual answers regarding Philippine regulatory compliance, deployment choices, and integration timelines.
            </p>
          </Reveal>
        </div>

        {/* ── SPLIT COMPACT LAYOUT (Blue Consultation Card Left + Compact Accordion Right) ── */}
        <div className="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT: Vibrant Royal Blue Consultation Card (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <Reveal amount={0.2}>
              <div className="group relative overflow-hidden rounded-2xl lg:rounded-3xl border border-blue-400/40 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-5 sm:p-6 text-white shadow-xl shadow-blue-500/20">
                {/* Ambient glow decoration */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-white/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 size-44 rounded-full bg-indigo-900/30 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Icon Bubble */}
                    <div className="flex size-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-md text-white shadow-inner mb-4">
                      <span className="font-mono font-black text-lg">?</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                      Still have questions?
                    </h3>

                    <p className="mt-2 text-xs sm:text-[0.84rem] leading-relaxed text-blue-100 font-normal">
                      Can&apos;t find the exact workflow or compliance answer you need? Chat with our principal solutions engineers for a customized technical evaluation.
                    </p>

                    {/* Quick highlights */}
                    <div className="mt-4 space-y-2 border-t border-white/20 pt-4 text-xs text-blue-50">
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-cyan-300 shrink-0" />
                        <span>BSP Circulars 454 &amp; 857 compliance review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-cyan-300 shrink-0" />
                        <span>Direct talk with senior solution architects</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/20">
                    <button
                      type="button"
                      onClick={() => openModal("Technical Architecture Consultation (FAQ)")}
                      className="group/btn flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-6 font-bold text-slate-900 shadow-lg shadow-blue-950/20 transition-all duration-200 hover:bg-slate-50 hover:shadow-xl active:scale-[0.98] cursor-pointer"
                    >
                      <span className="text-xs font-bold">Book a Consultation</span>
                      <span className="text-xs font-bold text-slate-500 transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
                    </button>

                    <p className="mt-2 text-center text-[0.7rem] text-blue-100/80">
                      Free 20-min session · No obligations
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Expandable Accordion (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl border border-sky-200/80 bg-white p-4 sm:p-6 shadow-lg shadow-sky-950/5 divide-y divide-sky-100">
              {faqItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                const contentId = `faq-content-${idx}`;
                const headerId = `faq-header-${idx}`;

                return (
                  <div key={item.question} className="py-3 first:pt-0 last:pb-0">
                    <h3>
                      <button
                        id={headerId}
                        type="button"
                        onClick={() => toggle(idx)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="flex min-h-[42px] w-full items-center justify-between gap-3 py-1.5 text-left font-bold text-slate-900 transition-colors hover:text-blue-600 cursor-pointer"
                      >
                        <span className="text-xs sm:text-[0.92rem] leading-snug font-semibold text-slate-900">
                          {item.question}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-200",
                            isOpen
                              ? "border-blue-600 bg-blue-600 text-white rotate-45"
                              : "border-sky-200 bg-sky-50 text-slate-600 hover:bg-sky-100"
                          )}
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                    </h3>

                    <div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      hidden={!isOpen}
                      className="pt-1.5 pb-1 text-xs sm:text-[0.82rem] leading-relaxed text-slate-600"
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </Section>
  );
}
