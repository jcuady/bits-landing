"use client";

import * as React from "react";
import Link from "next/link";
import { footerColumns, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

export function Footer() {
  const { openModal } = useConsultationModal();

  return (
    <footer className="relative overflow-hidden border-t border-slate-800/80 bg-[#040914] text-slate-400">
      {/* ── ATMOSPHERIC CLOUD HORIZON AMBIENT GLOW ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[200px] w-[900px] rounded-full bg-gradient-to-r from-blue-600/10 via-sky-400/15 to-blue-600/10 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
      </div>

      <Container className="relative z-10">
        {/* ── MAIN COMPACT NAVIGATION & NEWSLETTER ── */}
        <div className="grid gap-10 pt-12 pb-10 lg:grid-cols-[1.1fr_2.4fr] lg:gap-14 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Logo variant="horizontal" className="h-7.5 brightness-0 invert" />
            </div>

            <p className="max-w-sm text-xs leading-relaxed text-slate-400">
              <strong className="font-semibold text-white">Boundless IT Solutions (BITS)</strong> — Omnichannel Collections CRM, Predictive Telephony &amp; Sovereign Enterprise Infrastructure for Philippine BPOs and recovery agencies.
            </p>

            {/* Live Operational Status Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
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
              <p className="text-[0.7rem] font-bold uppercase tracking-wider text-slate-300">
                Operations &amp; Architecture Briefings
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Monthly engineering insights on collections automation and sovereign deployments.
              </p>
              <div className="mt-2.5">
                <NewsletterForm />
              </div>
            </div>
          </div>

          {/* Navigation Columns (Compact 5-col Grid) */}
          <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.72rem] font-black uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="mt-3.5 space-y-1">
                  {col.links.map((link) => {
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
                            className="inline-flex min-h-[44px] items-center py-1.5 text-xs font-medium text-slate-400 transition-colors duration-200 hover:text-sky-300"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target={link.href.endsWith(".html") || link.href.endsWith(".pdf") ? "_blank" : undefined}
                            rel={link.href.endsWith(".html") || link.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                            className="inline-flex min-h-[44px] items-center py-1.5 text-xs font-medium text-slate-400 transition-colors duration-200 hover:text-sky-300"
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
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Boundless IT Solutions (BITS). All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">·</span>
            <p className="font-mono text-[0.68rem] text-slate-500 uppercase tracking-wider">
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
