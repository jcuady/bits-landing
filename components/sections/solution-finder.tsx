"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
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
    category: "COLLECTIONS // CRM",
    goal: "Run high-throughput debt recovery and contact center floors",
    product: "Operations 360",
    description: "Integrated CRM, predictive dialer, QA scorecards, supervisor monitoring, LMS & WFM.",
    href: "/#operations-360",
    badge: "Recovery Flagship",
    accentBorder: "group-hover:border-blue-500/40",
    glowColor: "from-blue-600/10 to-transparent",
  },
  {
    track: "02",
    category: "VOICE AI // AUTONOMY",
    goal: "Automate calls, email negotiations, and debtor conversations",
    product: "BITSagent AI",
    description: "Sub-300ms latency voice AI, autonomous email responders, and RAG knowledge grounding.",
    href: "/bitsagent",
    badge: "Sub-300ms Voice",
    accentBorder: "group-hover:border-indigo-500/40",
    glowColor: "from-indigo-600/10 to-transparent",
  },
  {
    track: "03",
    category: "REVENUE // PIPELINE",
    goal: "Scale enterprise deal pipelines, ticketing, and recurring billing",
    product: "BITScrm Suite",
    description: "Deal stages, CPQ automated quotations, customer support desk & billing lifecycle.",
    href: "/products/crm",
    badge: "Sales & Support",
    accentBorder: "group-hover:border-sky-500/40",
    glowColor: "from-sky-600/10 to-transparent",
  },
  {
    track: "04",
    category: "LEDGER // TRAIN LAW",
    goal: "Synchronize company finance, biometric shifts, and compliant payroll",
    product: "Accounting, HRMS & Payroll",
    description: "BIR CAS-ready ERP, biometric timekeeping, Philippine TRAIN law calculations & bank feeds.",
    href: "/products/accounting",
    badge: "BIR CAS Aligned",
    accentBorder: "group-hover:border-emerald-500/40",
    glowColor: "from-emerald-600/10 to-transparent",
  },
  {
    track: "05",
    category: "DISPATCH // INVENTORY",
    goal: "Track multi-warehouse stock, vehicle fleets, and verified delivery",
    product: "Inventory & Logistics",
    description: "Live GPS fleet tracking, barcode bin scanning, AI dispatch routes, and electronic POD.",
    href: "/products/inventory",
    badge: "Fleet & Warehouse",
    accentBorder: "group-hover:border-teal-500/40",
    glowColor: "from-teal-600/10 to-transparent",
  },
  {
    track: "06",
    category: "IDENTITY // VENUES",
    goal: "Orchestrate appointments, virtual queues, courts, and smart tap cards",
    product: "Booking, Queuing & Sports Hub",
    description: "Dynamic capacity calendar, SMS virtual queuing, court rotations, and encrypted BITS Tap NFC.",
    href: "/products/booking",
    badge: "Venue & Smart NFC",
    accentBorder: "group-hover:border-amber-500/40",
    glowColor: "from-amber-600/10 to-transparent",
  },
];

export function SolutionFinder() {
  return (
    <Section
      id="solution-finder"
      className="relative overflow-hidden bg-white py-20 sm:py-24 border-y border-slate-100/80"
    >
      {/* Background Architectural Mesh Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Reveal>
            <div className="mx-auto mb-3.5 inline-flex items-center gap-2 rounded-full border border-slate-200/90 bg-slate-50/80 px-3.5 py-1 shadow-2xs">
              <span className="size-1.5 rounded-full bg-blue-600" />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-slate-700 font-mono">
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

        {/* Discovery Routing Grid — Double-Bezel Precision Cards */}
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {discoveryRoutes.map((route, idx) => (
            <Reveal key={route.track} delay={0.05 + idx * 0.03}>
              <Link
                href={route.href}
                className={cn(
                  "group relative flex flex-col justify-between rounded-2xl p-2",
                  "bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100/80 dark:from-slate-800 dark:to-slate-900",
                  "border border-slate-200 dark:border-slate-800",
                  "shadow-[0_4px_16px_rgba(0,0,0,0.03)] transition-all duration-200",
                  "hover:shadow-[0_16px_32px_-10px_rgba(18,66,148,0.12)] hover:-translate-y-0.5",
                  route.accentBorder
                )}
              >
                {/* Inner Core Container */}
                <div className="relative flex flex-col justify-between h-full rounded-xl bg-white dark:bg-slate-950 p-5 sm:p-6 overflow-hidden border border-white/80 dark:border-slate-850">
                  {/* Atmospheric Glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -top-16 -right-16 size-36 rounded-full bg-gradient-to-br blur-2xl opacity-40 transition-opacity duration-300 group-hover:opacity-80",
                      route.glowColor
                    )}
                  />

                  {/* Header Meta Track & Badge */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-[0.66rem] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {route.category}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5 font-mono text-[0.62rem] font-bold text-slate-600">
                        {route.badge}
                      </span>
                    </div>

                    {/* Operational Goal Statement */}
                    <h3 className="text-base sm:text-[1.05rem] font-extrabold text-slate-900 dark:text-white leading-snug">
                      &ldquo;{route.goal}&rdquo;
                    </h3>
                  </div>

                  {/* Recommended Product & Capability */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-850">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-blue-600 dark:text-blue-400">
                        Recommended Engine
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                        0{route.track} ↗
                      </span>
                    </div>

                    <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {route.product}
                    </p>

                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      {route.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
