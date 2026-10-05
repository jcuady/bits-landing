"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { cn } from "@/lib/utils";

interface DiscoveryRoute {
  track: string;
  category: string;
  goal: string;
  product: string;
  description: string;
  href: string;
  badge: string;
  accentBorder: string;
  glowColor: string;
}

const discoveryRoutes: DiscoveryRoute[] = [
  {
    track: "01",
    category: "COLLECTIONS & FIELD // OPERATIONS",
    goal: "Collect payments faster, automate calls, and track field reps on the road",
    product: "Operations 360 & Field App",
    description: "Call center CRM, predictive dialer, QA scorecards, plus mobile field app with live GPS visit timestamps and offline logging.",
    href: "/#operations-360",
    badge: "Recovery Flagship",
    accentBorder: "hover:border-blue-400/50",
    glowColor: "from-blue-500/15 via-sky-400/10 to-transparent",
  },
  {
    track: "02",
    category: "VOICE AI // AUTONOMY",
    goal: "Automate customer phone calls, SMS follow-ups, and negotiation emails",
    product: "BITSagent AI",
    description: "Realistic human-sounding voice AI that handles calls and customer inquiries around the clock with zero wait times.",
    href: "/bitsagent",
    badge: "Sub-300ms Voice",
    accentBorder: "hover:border-indigo-400/50",
    glowColor: "from-indigo-500/15 via-blue-400/10 to-transparent",
  },
  {
    track: "03",
    category: "SALES // PIPELINE",
    goal: "Track sales deals, send instant price quotes, and manage support tickets",
    product: "BITScrm Suite",
    description: "Visual sales pipelines, automated client quotations, customer help desk, and recurring billing all in one CRM.",
    href: "/products/crm",
    badge: "Sales & Support",
    accentBorder: "hover:border-sky-400/50",
    glowColor: "from-sky-500/15 via-blue-400/10 to-transparent",
  },
  {
    track: "04",
    category: "LEDGER // PAYROLL",
    goal: "Automate company accounting, staff timekeeping, and Philippine payroll",
    product: "Accounting, HRMS & Payroll",
    description: "BIR CAS-ready bookkeeping, biometric clock-in integration, automated 13th-month & TRAIN tax calculations.",
    href: "/products/accounting",
    badge: "BIR CAS Aligned",
    accentBorder: "hover:border-emerald-400/50",
    glowColor: "from-emerald-500/15 via-teal-400/10 to-transparent",
  },
  {
    track: "05",
    category: "DISPATCH // INVENTORY",
    goal: "Track multi-warehouse inventory, company vehicles, and verified delivery",
    product: "Inventory & Logistics",
    description: "Live GPS vehicle tracking, barcode scanning, driver route optimization, and digital proof-of-delivery signatures.",
    href: "/products/inventory",
    badge: "Fleet & Warehouse",
    accentBorder: "hover:border-teal-400/50",
    glowColor: "from-teal-500/15 via-emerald-400/10 to-transparent",
  },
  {
    track: "06",
    category: "BOOKING // SMART NFC",
    goal: "Book appointments, manage customer lines, and issue smart tap cards",
    product: "Booking, Queuing & Sports Hub",
    description: "Live online appointment booking, SMS queue alerts, court reservations, and contactless BITS Tap NFC business cards.",
    href: "/products/booking",
    badge: "Venue & Smart NFC",
    accentBorder: "hover:border-amber-400/50",
    glowColor: "from-amber-500/15 via-orange-400/10 to-transparent",
  },
];

export function SolutionFinder() {
  const { openModal } = useConsultationModal();
  return (
    <Section
      id="solution-finder"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/40 to-slate-50/60 py-20 sm:py-24 border-y border-slate-100/80"
    >
      {/* Background Architectural Mesh Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:26px_26px] opacity-25" />

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="mx-auto mb-3.5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1 shadow-2xs">
              <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-900 font-mono">
                Direct Operational Discovery
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight text-slate-900 leading-[1.14] text-balance">
              What Are You Trying to{" "}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Improve?
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-3.5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty font-normal">
              Select your organization&apos;s current operational priority. We will route you directly to the engineered architecture — no browsing 18 product specifications required.
            </p>
          </Reveal>
        </div>

        {/* Discovery Routing Grid — Luminous Frosted White Glass Double-Bezel Cards */}
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {discoveryRoutes.map((route, idx) => (
            <Reveal key={route.track} delay={0.05 + idx * 0.03}>
              <Link
                href={route.href}
                onClick={(e) => {
                  if (route.href.startsWith("/#") || route.href.startsWith("#")) {
                    const targetId = route.href.replace(/^\/?#/, "");
                    const el = document.getElementById(targetId);
                    if (el) {
                      e.preventDefault();
                      el.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                }}
                className={cn(
                  "group relative flex flex-col justify-between rounded-3xl p-2.5 sm:p-3",
                  "bg-white/75 backdrop-blur-xl border border-white/85",
                  "shadow-lg shadow-blue-950/5 transition-all duration-300",
                  "hover:shadow-2xl hover:shadow-blue-600/15 hover:-translate-y-1",
                  route.accentBorder
                )}
              >
                {/* Inner Core Container */}
                <div className="relative flex flex-col justify-between h-full rounded-2xl bg-white/90 backdrop-blur-2xl p-6 sm:p-7 overflow-hidden border border-white/90 shadow-sm">
                  {/* Subtle Inner Highlight Refraction */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] pointer-events-none" />

                  {/* Atmospheric Glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br blur-2xl opacity-50 transition-opacity duration-300 group-hover:opacity-100",
                      route.glowColor
                    )}
                  />

                  {/* Header Meta Track & Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] text-blue-700">
                        {route.category}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-blue-50/90 border border-blue-200/80 px-2.5 py-0.5 font-mono text-[0.62rem] font-bold text-blue-700">
                        {route.badge}
                      </span>
                    </div>

                    {/* Operational Goal Statement */}
                    <h3 className="text-base sm:text-[1.05rem] font-extrabold text-slate-900 leading-snug">
                      &ldquo;{route.goal}&rdquo;
                    </h3>
                  </div>

                  {/* Recommended Product & Capability */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-blue-700">
                        Recommended Engine
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                        0{route.track} ↗
                      </span>
                    </div>

                    <p className="text-base font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {route.product}
                    </p>

                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed font-normal">
                      {route.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Closing CTA Strip */}
        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-blue-200/80 bg-blue-50/60 backdrop-blur-sm px-6 py-5">
            <div>
              <p className="text-sm font-bold text-slate-900">Not sure which fits your workflow?</p>
              <p className="text-xs text-slate-600 mt-0.5">Book a free 20-min technical call — no sales pitch, just honest architecture scoping.</p>
            </div>
            <button
              type="button"
              onClick={() => openModal("Solution Finder — Free Technical Scoping Call")}
              className="group shrink-0 inline-flex min-h-[44px] items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 pl-5 pr-2 py-2 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              <span>Book Free 20-Min Call</span>
              <span className="size-7 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform duration-200 font-bold">→</span>
            </button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
