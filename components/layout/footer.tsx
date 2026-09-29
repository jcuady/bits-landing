"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Mail, ArrowRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  isAction?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const compactFooterSections: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { label: "Floor Powerhouse & Dialer", href: "/#floor-showcase" },
      { label: "Collections Command Center", href: "/#features" },
      { label: "Productivity Bento", href: "/#features-bento" },
      { label: "BITSagent Voice AI", href: "/bitsagent" },
      { label: "BITScrm Collections", href: "/bitscrm" },
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
    title: "Trust & Verification",
    links: [
      { label: "Security Architecture", href: "/#security" },
      { label: "BSP & NPC Alignment", href: "/#security" },
      { label: "Brand Guidelines (Brandbook)", href: "/brandbook" },
      { label: "AI Grounding (llms.txt)", href: "/llms.txt" },
      { label: "Enterprise FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Book Consultation", href: "/#contact", isAction: true },
      { label: "CRM Portal Login", href: "/login" },
      { label: "Direct Scoping Email", href: "mailto:bits_inquiries@boundlessits.com" },
      { label: "Privacy Policy", href: "/legal#privacy" },
      { label: "Terms of Service", href: "/legal#terms" },
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
    <footer className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-slate-100 text-slate-700">
      {/* ── PART 1: THE GROUNDED FINALE BANNER (Direct Match with Reference Design) ── */}
      <div className="relative pt-16 sm:pt-24 lg:pt-28 overflow-hidden">
        <Container className="relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            {/* Pill Badge: Let's Connect */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/90 bg-sky-50/90 px-4 py-1.5 shadow-2xs backdrop-blur-md mb-6">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2.5 rounded-full bg-blue-600" />
              </span>
              <span className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-blue-700">
                Let&apos;s Connect
              </span>
            </div>

            {/* Main Bold Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              Ready to Build Stronger Customer Relationships?
            </h2>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              A smarter way to manage leads, track interactions, and grow your business with powerful CRM tools.
            </p>

            {/* Capsule Email Quick Form Bar */}
            <div className="mt-8 sm:mt-10 mx-auto flex max-w-xl flex-col sm:flex-row items-center gap-2 rounded-full border border-slate-200/90 bg-white p-1.5 sm:p-2 shadow-xl shadow-slate-200/60">
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
                  className="w-full h-11 bg-transparent text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:outline-none"
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

            {/* Navigation Pill Links & Social Icons Row */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm font-semibold text-slate-600">
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
                href="#features-bento"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center px-4 py-2 hover:text-slate-900 transition-colors"
              >
                Features
              </a>
              <a
                href="/products/sales"
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
              <div className="flex items-center gap-1.5 ml-1 sm:ml-3">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (formerly Twitter)"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all active:scale-[0.98]"
                >
                  <span className="font-bold text-xs">𝕏</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-mono font-bold text-xs active:scale-[0.98]"
                >
                  in
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-bold text-xs active:scale-[0.98]"
                >
                  IG
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:border-slate-300 shadow-2xs transition-all font-bold text-xs active:scale-[0.98]"
                >
                  fb
                </a>
              </div>
            </div>
          </div>
        </Container>

        {/* ── THE GROUNDED LANDSCAPE GRAPHIC (Directly anchoring footer base) ── */}
        <div className="relative mt-8 sm:mt-12 h-[280px] sm:h-[380px] lg:h-[460px] w-full overflow-hidden">
          <Image
            src="/images/grounded-hills-mound.jpg"
            alt="Lush green grounded hill landscape under clear sky"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-[center_35%] select-none transition-transform duration-700 hover:scale-102"
          />
          {/* Soft atmospheric horizon feathering at top */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/40 to-transparent pointer-events-none" />
          {/* Feathering into the lower bedrock footer */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* ── PART 2: SOVEREIGN BEDROCK FOOTER (Organized Columns & Compliance Seals) ── */}
      <div className="relative bg-slate-950 text-slate-400 pt-12 pb-16 border-t border-slate-800">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_2.4fr] lg:gap-14">
            {/* Brand & Mission Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Logo variant="reverse" className="h-8.5 w-auto" />
              </div>

              <p className="max-w-sm text-xs leading-relaxed text-slate-400">
                Sovereign enterprise operations technology, collections CRM, and intelligent automation built from 20 years of floor leadership.
              </p>

              {/* Operational Status Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/60 px-3 py-1">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[0.68rem] font-mono text-emerald-400 font-bold tracking-wider uppercase">
                  100% Operational · Sovereign On-Prem &amp; Cloud
                </span>
              </div>

              {/* BSP & NPC Alignment Note */}
              <p className="text-[11px] text-slate-500 font-mono">
                Republic of the Philippines · BSP Circular 808 &amp; NPC Data Privacy Aligned
              </p>
            </div>

            {/* Symmetrical 4-Column Navigation */}
            <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
              {compactFooterSections.map((sec) => (
                <div key={sec.title}>
                  <h3 className="text-[0.72rem] font-black uppercase tracking-wider text-white">
                    {sec.title}
                  </h3>
                  <ul className="mt-3.5 space-y-1">
                    {sec.links.map((link) => {
                      if (link.isAction) {
                        return (
                          <li key={link.label}>
                            <button
                              type="button"
                              onClick={() => openModal("Enterprise Consultation")}
                              className="inline-flex min-h-[36px] items-center py-1 text-xs font-medium text-sky-400 transition-colors duration-150 hover:text-sky-300 cursor-pointer"
                            >
                              {link.label}
                            </button>
                          </li>
                        );
                      }

                      const isInternalPage =
                        link.href.startsWith("/") &&
                        !link.href.endsWith(".html") &&
                        !link.href.endsWith(".pdf") &&
                        !link.href.includes(".xml");

                      return (
                        <li key={link.label}>
                          {isInternalPage ? (
                            <Link
                              href={link.href}
                              className="inline-flex min-h-[36px] items-center py-1 text-xs font-medium text-slate-400 transition-colors duration-150 hover:text-white"
                            >
                              {link.label}
                            </Link>
                          ) : (
                            <a
                              href={link.href}
                              target={
                                link.href.endsWith(".html") ||
                                link.href.endsWith(".pdf") ||
                                link.href.endsWith(".txt")
                                  ? "_blank"
                                  : undefined
                              }
                              rel={
                                link.href.endsWith(".html") ||
                                link.href.endsWith(".pdf") ||
                                link.href.endsWith(".txt")
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              className="inline-flex min-h-[36px] items-center py-1 text-xs font-medium text-slate-400 transition-colors duration-150 hover:text-white"
                            >
                              {link.label}
                            </a>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Legal & Copyright Sub-Bar */}
          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Boundless IT Solutions (BITS). All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              <Link href="/legal#privacy" className="hover:text-slate-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal#terms" className="hover:text-slate-300 transition-colors">
                Terms of Service
              </Link>
              <button
                type="button"
                onClick={() => openModal("Footer Blueprint Consultation")}
                className="text-sky-400 hover:text-sky-300 font-bold transition-colors cursor-pointer"
              >
                Book Consultation
              </button>
              <Link href="/login" className="font-bold text-white hover:text-sky-300 transition-colors">
                CRM Portal Sign In →
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
