"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const compactFooterSections: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { label: "OPERATIONS 360", href: "/#operations-360" },
      { label: "BITSagent Voice AI", href: "/bitsagent" },
      { label: "BITScrm Collections", href: "/bitscrm" },
      { label: "Sales & Pipeline", href: "/products/sales" },
      { label: "All 18 Software Engines →", href: "/#products-suite" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "BPO & Collections", href: "/#industries" },
      { label: "Banking & Financial", href: "/#industries" },
      { label: "Sovereign Deployment", href: "/#deployment" },
      { label: "Commercial Pricing", href: "/#solutions" },
      { label: "Custom Architecture", href: "/#custom-systems" },
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
      { label: "Book Consultation", href: "/#contact" },
      { label: "CRM Portal Login", href: "/login" },
      { label: "Direct Scoping Email", href: "mailto:bits_inquiries@boundlessits.com" },
      { label: "Privacy Policy", href: "/legal#privacy" },
      { label: "Terms of Service", href: "/legal#terms" },
    ],
  },
];

export function Footer() {
  const { openModal } = useConsultationModal();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030814] text-slate-400">
      {/* ── ATMOSPHERIC CLOUDY HORIZON BACKGROUND ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Photorealistic High-Res Cloudy Horizon Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-sky-bg.jpg"
            alt=""
            fill
            quality={65}
            className="object-cover object-bottom select-none opacity-20 mix-blend-screen"
          />
        </div>

        {/* Multi-Stop Horizon Vignette Gradient: Seamlessly anchors sky into deep bedrock */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020611] via-[#040c1e]/94 to-[#06162f]/85" />

        {/* Celestial Sky Horizon Radial Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[220px] w-[1000px] rounded-full bg-gradient-to-r from-blue-600/15 via-sky-400/20 to-blue-600/15 blur-[100px]" />

        {/* Subdued Tech Database Dot Lattice */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
      </div>

      <Container className="relative z-10">
        {/* ── COMPACT MAIN FOOTER CONTENT ── */}
        <div className="grid gap-10 pt-12 pb-10 lg:grid-cols-[1.1fr_2.4fr] lg:gap-14 border-b border-white/[0.08]">
          {/* Brand & Briefings Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo variant="horizontal" className="h-7.5 brightness-0 invert" />
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-slate-300">
              Sovereign enterprise infrastructure, collections CRM, and intelligent automation built with boundless scale.
            </p>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[0.68rem] font-mono text-emerald-400 font-bold tracking-wider uppercase">
                100% Operational · Sovereign On-Prem &amp; Cloud
              </span>
            </div>

            {/* Compact Newsletter Subscription */}
            <div className="pt-2 max-w-sm">
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-200">
                Operations &amp; Architecture Briefings
              </p>
              <p className="mt-0.5 text-xs text-slate-400">
                Engineering insights on collections automation and sovereign deployments.
              </p>
              <div className="mt-2.5">
                <NewsletterForm />
              </div>
            </div>
          </div>

          {/* Symmetrical 4-Column Navigation */}
          <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:gap-8">
            {compactFooterSections.map((sec) => (
              <div key={sec.title}>
                <h3 className="text-[0.72rem] font-black uppercase tracking-wider text-white">
                  {sec.title}
                </h3>
                <ul className="mt-3.5 space-y-0.5">
                  {sec.links.map((link) => {
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
                            className="inline-flex min-h-[44px] items-center py-1 text-xs font-medium text-slate-400 transition-colors duration-150 hover:text-sky-300"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target={link.href.endsWith(".html") || link.href.endsWith(".pdf") || link.href.endsWith(".txt") ? "_blank" : undefined}
                            rel={link.href.endsWith(".html") || link.href.endsWith(".pdf") || link.href.endsWith(".txt") ? "noopener noreferrer" : undefined}
                            className="inline-flex min-h-[44px] items-center py-1 text-xs font-medium text-slate-400 transition-colors duration-150 hover:text-sky-300"
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

        {/* ── BOTTOM COMPACT LEGAL & REGULATORY BAR ── */}
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Boundless IT Solutions (BITS). All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">·</span>
            <p className="font-mono text-[0.68rem] text-slate-400 uppercase tracking-wider">
              Republic of the Philippines · BSP &amp; NPC Aligned
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <Link href="/legal#privacy" className="inline-flex min-h-[44px] items-center hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal#terms" className="inline-flex min-h-[44px] items-center hover:text-white transition-colors">
              Terms of Service
            </Link>
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex min-h-[44px] items-center text-blue-400 hover:text-blue-300 font-bold transition-colors cursor-pointer"
            >
              Book Consultation
            </button>
            <Link href="/login" className="inline-flex min-h-[44px] items-center font-bold text-white hover:text-sky-300 transition-colors">
              CRM Portal Sign In →
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
