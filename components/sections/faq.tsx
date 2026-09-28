"use client";

import * as React from "react";
import Link from "next/link";
import { faqItems } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { MessageSquareText, Sparkles, ArrowRight, ShieldCheck, Headphones } from "lucide-react";

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
    <Section id="faq" className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white py-20 sm:py-28 border-b border-sky-100">
      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.05),transparent)]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-1.5 backdrop-blur-md shadow-2xs">
              <Sparkles className="size-3.5 text-blue-600" />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700 font-mono">
                Operational Clarity
              </span>
            </div>
            <h2 className="text-display font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Your Questions Answered.{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Clear &amp; Factual.
              </span>
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
              Direct, factual answers regarding our Philippine regulatory compliance, deployment choices, and integration timelines.
            </p>
          </Reveal>
        </div>

        {/* ── SPLIT LAYOUT (Directly matching reference image: Blue Card Left + Accordion Right) ── */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* LEFT: Vibrant Royal Blue Consultation Card (lg:col-span-5) */}
          <div className="lg:col-span-5">
            <Reveal amount={0.2}>
              <div className="group relative overflow-hidden rounded-[2.5rem] border border-blue-400/40 bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 p-8 sm:p-10 text-white shadow-2xl shadow-blue-500/25">
                {/* Ambient glow decoration */}
                <div className="pointer-events-none absolute -right-16 -top-16 size-52 rounded-full bg-white/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 size-52 rounded-full bg-indigo-900/30 blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Icon Bubble */}
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white shadow-inner mb-6">
                      <MessageSquareText className="size-7" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                      Still have questions?
                    </h3>

                    <p className="mt-4 text-sm sm:text-base leading-relaxed text-blue-100/95 font-normal">
                      Can&apos;t find the exact workflow or compliance answer you need? Chat with our principal solutions engineers for a customized technical evaluation.
                    </p>

                    {/* Quick highlights */}
                    <div className="mt-6 space-y-2.5 border-t border-white/20 pt-6 text-xs text-blue-50">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="size-4 text-cyan-300 shrink-0" />
                        <span>BSP Circulars 454 &amp; 857 compliance review</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Headphones className="size-4 text-cyan-300 shrink-0" />
                        <span>Direct talk with senior solution architects</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <button
                      type="button"
                      onClick={() => openModal("Technical Architecture Consultation (FAQ)")}
                      className="group/btn flex h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-7 font-bold text-slate-900 shadow-xl shadow-blue-950/20 transition-all duration-200 hover:bg-slate-50 hover:shadow-2xl active:scale-[0.98] cursor-pointer"
                    >
                      <span className="text-[0.92rem]">Book a Consultation</span>
                      <ArrowRight className="size-4 text-slate-500 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>

                    <p className="mt-3 text-center text-[0.72rem] text-blue-100/80">
                      Free 20-min session · No obligations
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: Expandable Accordion (lg:col-span-7) */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-[2.5rem] border border-sky-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-sky-950/5 divide-y divide-sky-100">
              {faqItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                const contentId = `faq-content-${idx}`;
                const headerId = `faq-header-${idx}`;

                return (
                  <div key={item.question} className="py-4.5 first:pt-0 last:pb-0">
                    <h3>
                      <button
                        id={headerId}
                        type="button"
                        onClick={() => toggle(idx)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                        className="flex min-h-[48px] w-full items-center justify-between gap-4 py-2 text-left font-bold text-slate-900 transition-colors hover:text-blue-600 cursor-pointer"
                      >
                        <span className="text-[1.02rem] leading-snug sm:text-base font-semibold">
                          {item.question}
                        </span>
                        <span
                          className={cn(
                            "mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold transition-all duration-200",
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
                      className="pt-2.5 pb-2 text-sm leading-relaxed text-slate-600"
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
