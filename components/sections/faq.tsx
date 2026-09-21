"use client";

import * as React from "react";
import Link from "next/link";
import { faqItems } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function FAQ() {
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
    <Section id="faq" className="relative overflow-hidden bg-slate-50">
      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(59,130,246,0.04),transparent)]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white px-4 py-1.5 backdrop-blur-md shadow-xs">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Operational Clarity
              </span>
            </div>
            <h2 className="text-h2 font-bold tracking-tight text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[50ch] text-slate-600">
              Direct, factual answers regarding our technology architecture, implementation methodology, and security compliance.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-slate-200 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div key={item.question} className="py-5 first:pt-0 last:pb-0">
                <h3>
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="flex w-full items-start justify-between gap-4 text-left font-bold text-slate-900 transition-colors hover:text-blue-600"
                  >
                    <span className="text-[1.02rem] leading-snug sm:text-base">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "mt-1 flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-transform duration-200",
                        isOpen
                          ? "border-blue-600 bg-blue-600 text-white rotate-45"
                          : "border-slate-300 bg-slate-50 text-slate-600"
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
                  className={cn(
                    "mt-3 text-[0.92rem] leading-relaxed text-slate-600 transition-all",
                    !isOpen && "hidden"
                  )}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-sm text-slate-500">
            Have a specific operational workflow question or integration requirement?
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-sm font-bold">
            <Link
              href="/#contact"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Book a technical consultation →
            </Link>
            <span className="text-slate-300">•</span>
            <a
              href="mailto:bits_inquiries@boundlessits.com"
              className="text-slate-600 hover:text-slate-900 hover:underline"
            >
              bits_inquiries@boundlessits.com
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
