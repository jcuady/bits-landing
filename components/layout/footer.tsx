"use client";

import * as React from "react";
import Link from "next/link";
import { footerColumns, site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { NewsletterForm } from "@/components/layout/newsletter-form";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";

function SocialIcon({ d, label, href = "#" }: { d: string; label: string; href?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-200 hover:border-blue-500/40 hover:bg-blue-600/20 hover:text-white"
    >
      <svg className="size-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d={d} />
      </svg>
    </a>
  );
}

export function Footer() {
  const { openModal } = useConsultationModal();

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#030D1C] text-slate-300">
      {/* Subtle atmospheric ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[350px] w-[800px] rounded-full bg-blue-600/[0.08] blur-[120px]" />
        <div className="bg-grid-dark absolute inset-0 opacity-20" />
      </div>

      <Container className="relative z-10">
        {/* ── TOP PRE-FOOTER CTA CARD (Double-Bezel High-End Frame) ── */}
        <div className="pt-16 sm:pt-20">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3.5 py-1 text-[0.72rem] font-black uppercase tracking-[0.18em] text-blue-400">
                  <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                  <span>TRANSFORM YOUR OPERATIONS</span>
                </div>
                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
                  Ready to move from operational chaos to complete control?
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                  Schedule a 20-minute architecture review with our principal engineers. We examine your current bottlenecks and send an actionable deployment roadmap within 24 hours.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
                <button
                  type="button"
                  onClick={() => openModal()}
                  className="group flex h-13 items-center justify-center gap-2.5 rounded-full bg-blue-600 px-8 font-bold text-white shadow-lg shadow-blue-600/30 transition-all duration-200 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/40 active:scale-[0.98] cursor-pointer"
                >
                  <span>Book a Consultation</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden>→</span>
                </button>
                <a
                  href="mailto:inquiries@boundlessits.com"
                  className="flex h-13 items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Direct Email Inquiry
                </a>
              </div>
            </div>

            {/* Live Operational Guarantee Matrix */}
            <div className="mt-8 border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-slate-300">All 18 Engines Live &amp; Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-blue-400" />
                <span>NPC &amp; BSP Data Privacy Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-indigo-400" />
                <span>Sovereign Cloud &amp; On-Premises Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-sky-400" />
                <span>99.99% Infrastructure Uptime SLA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN NAVIGATION COLUMNS & NEWSLETTER ── */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2.5fr] lg:gap-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <Logo variant="horizontal" className="h-8 brightness-0 invert" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              <strong className="font-semibold text-white">Boundless IT Solutions (BITS)</strong> — {site.tagline} We engineer custom enterprise operations software, collections CRM cores, autonomous AI agents, and sovereign ERP platforms.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="inline-flex size-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                Systems Status: 100% Operational
              </span>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8 max-w-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Operations &amp; Tech Insights
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Monthly engineering briefings on collections automation, AI calling, and enterprise architecture.
              </p>
              <div className="mt-3">
                <NewsletterForm />
              </div>
            </div>
          </div>

          <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
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
                            className="inline-flex min-h-[44px] items-center py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-blue-400"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <a
                            href={link.href}
                            target={link.href.endsWith(".html") || link.href.endsWith(".pdf") ? "_blank" : undefined}
                            rel={link.href.endsWith(".html") || link.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                            className="inline-flex min-h-[44px] items-center py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:text-blue-400"
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

        {/* ── BOTTOM LEGAL & COMPLIANCE BAR ── */}
        <div className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p>© {new Date().getFullYear()} Boundless IT Solutions (BITS). All rights reserved.</p>
            <span className="hidden sm:inline text-slate-700">|</span>
            <p className="font-mono text-[0.72rem] text-slate-400 tracking-wider uppercase">
              Republic of the Philippines · Global Enterprise Delivery
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
            <Link href="/login" className="inline-flex min-h-[44px] items-center font-bold text-white hover:text-blue-400 transition-colors">
              CRM Portal Sign In →
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
