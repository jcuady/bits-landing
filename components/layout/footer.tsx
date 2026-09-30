"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Mail, ArrowRight, ShieldCheck, CheckCircle2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── Precise Agency-Tier SVG Social Icons (24x24 viewBox) ── */
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4.5", className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4.5", className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4.5", className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4.5", className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={cn("size-4.5", className)} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerNavigation: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { label: "Floor Powerhouse & Dialer", href: "/#floor-showcase" },
      { label: "Collections Command Center", href: "/#features" },
      { label: "Productivity Bento", href: "/#features-bento" },
      { label: "BITSagent Voice AI", href: "/bitsagent" },
      { label: "BITS OMS Collections", href: "/bitscrm" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "BPO & Collections", href: "/#industries" },
      { label: "Banking & Financial", href: "/#industries" },
      { label: "Sovereign Deployment", href: "/#deployment" },
      { label: "Solution Packages", href: "/#pricing" },
      { label: "Interactive Floor ROI", href: "/#the-difference" },
    ],
  },
  {
    title: "Trust & Governance",
    links: [
      { label: "Security Architecture", href: "/#security" },
      { label: "BSP & NPC Alignment", href: "/#security" },
      { label: "Brand Guidelines (Brandbook)", href: "/brandbook" },
      { label: "AI Grounding (llms.txt)", href: "/llms.txt" },
      { label: "Enterprise FAQ", href: "/#faq" },
    ],
  },
];

export function Footer() {
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
    <footer className="relative overflow-hidden bg-[#061735] text-slate-300">
      {/* ── PART 1: PRE-FOOTER DIRECT CONNECT BANNER (Clean Luxury Light Canvas, Matching Image 1) ── */}
      <div className="relative overflow-hidden bg-white border-t border-slate-100">
        {/* Subtle architectural dot lattice & soft ambient sheen */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] rounded-full bg-blue-50/60 blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />
        </div>

        {/* Call-to-Action Content Zone */}
        <Container className="relative z-10 pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24">
          <div className="mx-auto max-w-4xl text-center">
            {/* Frosted Capsule Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-4 py-1.5 shadow-xs backdrop-blur-md mb-5 sm:mb-6">
              <span className="flex size-4 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white text-[9px] shadow-xs">
                ⚡
              </span>
              <span className="text-[0.78rem] font-bold text-slate-800 tracking-tight">
                Let&apos;s Connect
              </span>
            </div>

            {/* Main Headline Tailored to BITS Operations & Relationships */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Ready to Build Stronger Customer Operations?
            </h2>

            {/* Subtitle Tailored to BITS Queue Management & Debt Recovery (Explicitly OMS, NOT CRM) */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty font-normal">
              A smarter way to manage account queues, coordinate agent outreach, and accelerate collections with sovereign BITS OMS tools.
            </p>

            {/* Minimal High-End Capsule Email Form (Matching Reference Mockup) */}
            <div className="mt-8 sm:mt-10 mx-auto flex max-w-xl flex-col sm:flex-row items-center gap-2 rounded-2xl sm:rounded-full border border-slate-200/90 bg-white p-2 shadow-xl shadow-slate-900/5 backdrop-blur-md">
              <div className="flex flex-1 items-center gap-3 pl-3 sm:pl-4 w-full">
                <Mail className="size-5 text-slate-400 shrink-0" aria-hidden="true" />
                <label htmlFor="footer-quick-email-input" className="sr-only">
                  Enter Your Email Address
                </label>
                <input
                  id="footer-quick-email-input"
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
                  className="w-full h-11 sm:h-12 bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleQuickSubmit}
                className="group flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#111827] hover:bg-blue-600 px-7 py-3 font-bold text-white shadow-md transition-all duration-200 active:scale-[0.98] cursor-pointer shrink-0"
              >
                <span className="text-sm">Contact Us</span>
                <ArrowRight className="size-4 text-slate-400 group-hover:text-white transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Navigation Pill Links & Official Social Media Row */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm font-semibold text-slate-700">
              <a
                href="#content"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4.5 py-2 text-slate-800 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all"
              >
                Home
              </a>
              <a
                href="#the-difference"
                className="min-h-[44px] inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2 font-bold text-white shadow-sm shadow-blue-500/25 border border-blue-600 hover:bg-blue-700 transition-all"
              >
                Solutions
              </a>
              <a
                href="#floor-showcase"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4.5 py-2 text-slate-800 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all"
              >
                Features
              </a>
              <a
                href="#features-bento"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4.5 py-2 text-slate-800 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all"
              >
                Product
              </a>
              <a
                href="#pricing"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 px-4.5 py-2 text-slate-800 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all"
              >
                Pricing
              </a>

              {/* Verified Official Social Media Pills (44x44px touch targets) */}
              <div className="flex items-center gap-2 ml-1 sm:ml-3">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow BITS on X"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-blue-900 hover:border-blue-300 shadow-2xs transition-all active:scale-[0.98]"
                >
                  <TwitterXIcon />
                </a>

                <a
                  href="https://www.linkedin.com/company/boundless-it-solutions-opc/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Connect with Boundless IT Solutions on LinkedIn"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-2xs transition-all active:scale-[0.98]"
                >
                  <LinkedInIcon />
                </a>

                <a
                  href="https://www.instagram.com/boundlessitsolutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Boundless IT Solutions on Instagram"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-rose-600 hover:border-rose-300 shadow-2xs transition-all active:scale-[0.98]"
                >
                  <InstagramIcon />
                </a>

                <a
                  href="https://www.facebook.com/profile.php?id=61594430590134"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Boundless IT Solutions on Facebook"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-blue-600 hover:border-blue-300 shadow-2xs transition-all active:scale-[0.98]"
                >
                  <FacebookIcon />
                </a>

                <a
                  href="https://github.com/jcuady/bits-landing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View BITS on GitHub"
                  className="flex size-11 items-center justify-center rounded-xl border border-slate-200/90 bg-white text-slate-700 hover:text-purple-600 hover:border-purple-300 shadow-2xs transition-all active:scale-[0.98]"
                >
                  <GitHubIcon />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* ── PART 2: SOVEREIGN BEDROCK FOOTER WITH REALISTIC CLOUD DRIFT BACKGROUND ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0e3271] via-[#092350] to-[#061735] text-slate-100 pt-16 sm:pt-20 pb-12 sm:pb-16 border-t border-sky-400/40 shadow-[0_-8px_40px_rgba(37,99,235,0.25)]">
        {/* Atmospheric Animated Drifting Clouds Canvas (Matching Hero Aesthetic) */}
        <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
          {/* Layer 1: High-Definition Sky & Cloud Horizon with Fluid Drift */}
          <div className="absolute inset-0">
            <div className="relative size-full animate-cloud-drift will-change-transform transform-gpu">
              <Image
                src="/images/hero-sky-bg.jpg"
                alt=""
                fill
                sizes="100vw"
                quality={90}
                className="object-cover object-bottom opacity-65 scale-105 select-none"
              />
            </div>
          </div>

          {/* Layer 2: Counter-Harmonic Cloud Mist Flow */}
          <div className="absolute inset-0 opacity-45 mix-blend-screen">
            <div className="relative size-full animate-cloud-drift-reverse will-change-transform transform-gpu">
              <Image
                src="/images/hero-sky-bg.jpg"
                alt=""
                fill
                sizes="100vw"
                quality={75}
                className="object-cover object-center select-none scale-110 filter blur-[1px]"
              />
            </div>
          </div>

          {/* Layer 3: Celestial Radiant Sunbreak / Horizon Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[320px] w-[1200px] rounded-full bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.45),rgba(37,99,235,0.3)_40%,transparent_75%)] blur-[80px]" />

          {/* Layer 4: Royal Azure Color Calibration Gradient (Hero Blue, Zero Black) */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 via-blue-800/60 to-[#071d42]/85" />

          {/* Layer 5: Precision Architectural Matrix Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_2.4fr] lg:gap-14">
            {/* Brand & Mission Column */}
            <div className="space-y-4">
              {/* Elevated Logo with Cloud Mark Ambient Glow */}
              <div className="relative inline-block">
                <div className="absolute -top-2 -left-2 size-24 rounded-full bg-blue-500/25 blur-xl pointer-events-none" />
                <Logo variant="reverse" className="h-9 sm:h-10 w-auto relative z-10 drop-shadow-md" />
              </div>

              <p className="max-w-sm text-xs leading-relaxed text-slate-300 font-normal">
                Sovereign enterprise operations technology, collections OMS (Operations Management System), and intelligent automation built from 20 years of floor leadership.
              </p>

              {/* Operational Status Pill */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-950/70 px-3.5 py-1 backdrop-blur-md shadow-xs shadow-emerald-950/40">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-300">
                    All Systems Operational · 99.9% Uptime
                  </span>
                </div>
              </div>

              {/* Company Headquarters & Direct Scoping */}
              <div className="text-xs text-slate-300 space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-sky-400 shrink-0" />
                  <span>Boundless IT Solutions OPC · Manila, Philippines</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-sky-400 shrink-0" />
                  <span className="text-slate-400">Direct Scoping:</span>
                  <a
                    href="mailto:bits_inquiries@boundlessits.com"
                    className="font-semibold text-sky-300 hover:text-white underline decoration-sky-400/40 hover:decoration-white transition-all"
                  >
                    bits_inquiries@boundlessits.com
                  </a>
                </div>
              </div>

              {/* ── OFFICIAL VERIFIED SOCIAL MEDIA ROW ── */}
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Official Channels
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/company/boundless-it-solutions-opc/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect with Boundless IT Solutions on LinkedIn"
                    className="flex size-9.5 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-slate-200 hover:text-white hover:bg-blue-600/40 hover:border-blue-400/60 shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow BITS on X"
                    className="flex size-9.5 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-slate-200 hover:text-white hover:bg-slate-800/80 hover:border-white/30 shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <TwitterXIcon />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61594430590134"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Boundless IT Solutions on Facebook"
                    className="flex size-9.5 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-slate-200 hover:text-white hover:bg-blue-600/40 hover:border-blue-400/60 shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://www.instagram.com/boundlessitsolutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Boundless IT Solutions on Instagram"
                    className="flex size-9.5 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-slate-200 hover:text-white hover:bg-rose-600/40 hover:border-rose-400/60 shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://github.com/jcuady/bits-landing"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View BITS on GitHub"
                    className="flex size-9.5 items-center justify-center rounded-xl border border-white/15 bg-white/[0.07] text-slate-200 hover:text-white hover:bg-purple-600/40 hover:border-purple-400/60 shadow-sm backdrop-blur-md transition-all duration-200 active:scale-95 cursor-pointer"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Grid (3 Clear Categorical Columns with High-Contrast Typography) */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
              {footerNavigation.map((sec) => (
                <div key={sec.title} className="space-y-3">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-white/90 flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-sky-400" />
                    <span>{sec.title}</span>
                  </p>
                  <ul className="space-y-2 text-xs">
                    {sec.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-slate-300 hover:text-white hover:translate-x-0.5 transition-all duration-150 inline-block py-0.5"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar: Regulatory Governance & Copyright */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Boundless IT Solutions OPC. All rights reserved.</p>

            {/* Regulatory Alignment Chips with Rich Contrast */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-950/40 px-3 py-1 text-[11px] text-blue-200 backdrop-blur-xs">
                <ShieldCheck className="size-3.5 text-blue-400" />
                BSP Circular 808 Aligned
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-950/40 px-3 py-1 text-[11px] text-emerald-200 backdrop-blur-xs">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                NPC RA 10173 DPA Compliant
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-sky-950/40 px-3 py-1 text-[11px] text-sky-200 backdrop-blur-xs">
                <CheckCircle2 className="size-3.5 text-sky-400" />
                SEC MC 18 Aligned
              </span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <Link href="/legal#privacy" className="text-slate-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal#terms" className="text-slate-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/brandbook" className="text-sky-400 hover:text-sky-300 transition-colors">
                Brandbook
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
