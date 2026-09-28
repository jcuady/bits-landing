"use client";

import * as React from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Mail, ArrowRight, ShieldCheck } from "lucide-react";

export function Contact() {
  const { openModal } = useConsultationModal();
  const [quickEmail, setQuickEmail] = React.useState("");

  const handleQuickSubmit = (e?: React.FormEvent | React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (quickEmail.trim()) {
      openModal(`Direct Connect Inquiry (${quickEmail.trim()})`);
    } else {
      openModal("Direct Connect Consultation");
    }
  };

  return (
    <Section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white pt-16 pb-16 sm:pt-24 sm:pb-24 border-t border-sky-100"
    >
      {/* Background Architectural Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.05),transparent)]" />
        <div className="absolute left-1/2 -top-24 size-[600px] -translate-x-1/2 rounded-full bg-sky-400/[0.03] blur-3xl" />
      </div>

      <Container className="relative z-10 space-y-16 sm:space-y-20">
        {/* ── PART 1: ENTERPRISE CONSULTATION & CUSTOM BLUEPRINT SCOPING ── */}
        <div className="overflow-hidden rounded-[2.5rem] border border-sky-200/80 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-sky-950/5">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-blue-700">
                <ShieldCheck className="size-3.5 text-blue-600" />
                <span>Enterprise Consultation</span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
                Let&apos;s Build Technology Around How Your Floor Actually Works.
              </h3>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                Tell us how you manage your operations, customer outreach, or team today. Our solutions team will review your workflows and prepare a tailored software proposal and live demo across our 18 enterprise engines.
              </p>

              <a
                href={`mailto:${site.inquiryEmail}`}
                className="mt-6 inline-flex min-h-[44px] items-center text-sm font-bold text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700"
              >
                {site.inquiryEmail}
              </a>

              <dl className="mt-8 space-y-4 border-t border-sky-100 pt-6 text-xs text-slate-600">
                <div>
                  <dt className="font-bold uppercase tracking-wider text-slate-700">
                    What Happens Next
                  </dt>
                  <dd className="mt-1 leading-relaxed">
                    We review your team size and operational scope, prepare a tailored proposal across our platform engines, and schedule a private 30-minute walkthrough.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-wider text-slate-700">
                    Fast Response Guaranteed
                  </dt>
                  <dd className="mt-1 leading-relaxed">
                    You will receive a dedicated response promptly from our solutions team within 24 hours. Zero sales pressure.
                  </dd>
                </div>
              </dl>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* ── PART 2: THE GRAND GROUNDED FINALE CARD (Directly matching reference mockup) ── */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] border border-slate-200/90 bg-gradient-to-b from-sky-100/60 via-sky-50/40 to-white shadow-2xl shadow-slate-900/5">
            {/* Architectural Concentric Wave Rings (Matching mockup top arcs) */}
            <div className="pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 size-[680px] rounded-full border border-sky-200/50" aria-hidden="true" />
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 size-[520px] rounded-full border border-sky-200/60" aria-hidden="true" />
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-[360px] rounded-full border border-sky-200/70" aria-hidden="true" />

            {/* Upper Content Hero */}
            <div className="relative z-10 px-6 pt-12 sm:pt-16 pb-2 text-center">
              {/* Frosted Pill Badge with Pulsing Blue Orb */}
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-white/95 px-4 py-1.5 shadow-xs backdrop-blur-md">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-blue-600" />
                </span>
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700 font-mono">
                  Let&apos;s Connect
                </span>
              </div>

              {/* Bold Headline */}
              <h2 className="text-display font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl max-w-3xl mx-auto leading-[1.12]">
                Ready to Build Stronger Customer Relationships?
              </h2>

              {/* Clear Subtitle */}
              <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
                A smarter way to manage leads, track interactions, and grow your business with powerful CRM tools.
              </p>

              {/* Capsule Email Quick Form Bar */}
              <div className="mt-8 mx-auto flex max-w-xl flex-col sm:flex-row items-center gap-2 rounded-full border border-slate-200/90 bg-white p-1.5 sm:p-2 shadow-xl shadow-slate-200/50">
                <div className="flex flex-1 items-center gap-3 pl-3 sm:pl-4 w-full">
                  <Mail className="size-5 text-slate-400 shrink-0" aria-hidden="true" />
                  <label htmlFor="quick-email-input" className="sr-only">
                    Enter Your Email Address
                  </label>
                  <input
                    id="quick-email-input"
                    type="email"
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleQuickSubmit();
                      }
                    }}
                    placeholder="Enter Your Email Address"
                    className="w-full h-11 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleQuickSubmit}
                  className="group flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-slate-950 hover:bg-slate-800 px-7 py-3 font-bold text-white shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer shrink-0"
                >
                  <span className="text-sm">Contact Us</span>
                  <ArrowRight className="size-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Navigation Pill Links & Social Media Icons Row */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm font-semibold text-slate-600">
                <a
                  href="#content"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 hover:text-slate-900 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#solutions"
                  className="min-h-[44px] inline-flex items-center justify-center rounded-full bg-white px-5 py-2 font-bold text-slate-900 border border-slate-200 shadow-2xs hover:bg-slate-50 transition-all"
                >
                  Solutions
                </a>
                <a
                  href="#ecosystem"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 hover:text-slate-900 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#products-suite"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 hover:text-slate-900 transition-colors"
                >
                  Product
                </a>
                <a
                  href="#pricing"
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 hover:text-slate-900 transition-colors"
                >
                  Pricing
                </a>

                {/* Social Icon Pills (>= 44x44px Touch Targets) */}
                <div className="flex items-center gap-1.5 ml-0 sm:ml-2">
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (formerly Twitter)"
                    className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all active:scale-[0.98]"
                  >
                    <span className="font-bold text-xs">𝕏</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-mono font-bold text-xs active:scale-[0.98]"
                  >
                    in
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-bold text-xs active:scale-[0.98]"
                  >
                    IG
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-bold text-xs active:scale-[0.98]"
                  >
                    fb
                  </a>
                </div>
              </div>
            </div>

            {/* ── THE GROUNDED LANDSCAPE GRAPHIC (Directly anchoring bottom of card) ── */}
            <div className="relative mt-6 sm:mt-10 h-[320px] sm:h-[440px] lg:h-[520px] w-full overflow-hidden">
              <Image
                src="/images/grounded-hills-mound.jpg"
                alt="Lush green grounded hill landscape under clear sky"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover object-[center_35%] select-none transition-transform duration-700 hover:scale-102"
              />
              {/* Soft ethereal sky blending gradient from top */}
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/95 via-white/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
