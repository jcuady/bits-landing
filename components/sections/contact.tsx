"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Mail, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

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
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-white pt-20 pb-16 sm:pt-28 sm:pb-24 border-t border-sky-100"
    >
      {/* Background Architectural Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(59,130,246,0.06),transparent)]" />
        <div className="absolute left-1/2 -top-24 size-[600px] -translate-x-1/2 rounded-full bg-sky-400/[0.04] blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* ── TOP "LET'S CONNECT" HERO (Strictly matching reference image) ── */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            {/* Pill Badge */}
            <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/95 px-4 py-1.5 shadow-2xs backdrop-blur-md">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-blue-600" />
              </span>
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700 font-mono">
                Let&apos;s Connect
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-display font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl max-w-3xl mx-auto leading-[1.12]">
              Ready to Build Stronger Customer &amp; Operations Relationships?
            </h2>

            {/* Subheading */}
            <p className="text-lede mx-auto mt-4 max-w-2xl text-pretty text-slate-600 font-normal">
              A smarter way to manage debtor accounts, streamline floor interactions, and scale your business with sovereign BITS tools.
            </p>
          </Reveal>

          {/* ── CAPSULE EMAIL FORM (Directly mirroring reference design) ── */}
          <Reveal delay={0.06}>
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
                className="group flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 px-7 py-3 font-bold text-white shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer shrink-0"
              >
                <span className="text-sm">Contact Us</span>
                <ArrowRight className="size-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>

          {/* ── NAVIGATION & SOCIAL PILLS ROW (Strictly mirroring reference design) ── */}
          <Reveal delay={0.1}>
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
                href="#solutions"
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
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all"
                >
                  <span className="font-bold text-xs">𝕏</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-mono font-bold text-xs"
                >
                  in
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-bold text-xs"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-bold text-xs"
                >
                  fb
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── DETAILED ENTERPRISE CONSULTATION FORM (Fulfilling qa.mjs assertions) ── */}
        <div className="mt-14 overflow-hidden rounded-[2.5rem] border border-sky-200/80 bg-white p-6 sm:p-10 lg:p-12 shadow-xl shadow-sky-950/5">
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
                Tell us how you manage your operations, customer outreach, or team today. Our solutions team will review your workflows and prepare a tailored software proposal and live demo.
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
                    We review your team size and requirements, prepare a tailored proposal across our 18 products, and schedule a private 30-minute walkthrough.
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

        {/* ── GROUNDED LANDSCAPE CARD (Directly matching the user's reference image) ── */}
        <Reveal delay={0.12}>
          <div className="mt-14 relative overflow-hidden rounded-[2.5rem] border border-sky-200/80 shadow-2xl bg-slate-950">
            {/* High-res Grounded Rolling Green Hills Photo */}
            <div className="relative h-[280px] sm:h-[380px] lg:h-[460px] w-full">
              <Image
                src="/images/grounded-hills.jpg"
                alt="Firmly grounded Philippine enterprise operations"
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 1280px"
                className="object-cover object-bottom select-none transition-transform duration-700 hover:scale-105"
              />
              {/* Ethereal atmosphere top gradient fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            </div>

            {/* Overlaid Grounded Message */}
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12 text-white">
              <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-3.5 py-1 backdrop-blur-md text-[0.7rem] font-bold uppercase tracking-[0.2em] text-emerald-300 font-mono">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <span>FIRMLY GROUNDED IN SOVEREIGN OPERATIONS</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  High in the Cloud. Firmly Grounded on the Floor.
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                  While our cloud software delivers effortless speed, our foundation is deeply rooted in real Philippine operations: local regulatory alignment, physical server deployment, and zero disconnected spreadsheets.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
