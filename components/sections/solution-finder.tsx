"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

const discoveryRoutes = [
  {
    goal: "Run a collections or contact center",
    product: "Operations 360",
    description: "Integrated CRM, dialer, QA, scorecards, coaching, LMS, and WFM in one platform.",
    href: "/#floor-showcase",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <path d="M3 8h14M8 3v14" />
      </svg>
    ),
    accent: "bg-blue-600",
  },
  {
    goal: "Automate calls, email, or customer conversations",
    product: "BITSagent AI",
    description: "Sub-300ms voice AI, autonomous email agents, and RAG knowledge grounding.",
    href: "/bitsagent",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6" />
        <path d="M10 4v6l3 2" />
      </svg>
    ),
    accent: "bg-indigo-600",
  },
  {
    goal: "Manage sales, support, or marketing",
    product: "BITScrm Suite",
    description: "Sales pipelines, support ticketing, marketing automation, and commerce billing.",
    href: "/products/crm",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 10l3 3 7-7" />
        <circle cx="10" cy="10" r="8" />
      </svg>
    ),
    accent: "bg-sky-600",
  },
  {
    goal: "Connect finance and workforce operations",
    product: "Accounting, HRMS & Payroll",
    description: "BIR CAS-ready ERP, biometric attendance, TRAIN law payroll, and bank batch feeds.",
    href: "/products/accounting",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="5" width="12" height="10" rx="1" />
        <path d="M4 9h12M9 5v10" />
      </svg>
    ),
    accent: "bg-emerald-600",
  },
  {
    goal: "Manage inventory and delivery operations",
    product: "Inventory & Logistics",
    description: "Multi-warehouse stock control, barcode scanning, GPS fleet tracking, and ePOD.",
    href: "/products/inventory",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 16l6-12 6 12" />
        <path d="M6.5 12h7" />
      </svg>
    ),
    accent: "bg-teal-600",
  },
  {
    goal: "Coordinate appointments, visitors, or venues",
    product: "Booking, Queuing & Sports Hub",
    description: "Online reservations, virtual QR queuing, court rotations, and TV displays.",
    href: "/products/booking",
    icon: (
      <svg className="size-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="12" height="12" rx="2" />
        <path d="M4 8h12M8 4v12" />
      </svg>
    ),
    accent: "bg-amber-600",
  },
];

export function SolutionFinder() {
  return (
    <Section
      id="solution-finder"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white py-16 sm:py-20 lg:py-24 border-y border-slate-100"
    >
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-10 sm:mb-14">
          <Reveal>
            <div className="mx-auto mb-3 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 shadow-2xs">
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-slate-600 font-mono">
                Product Discovery
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.04}>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              What Are You Trying to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                Improve?
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty">
              Tell us your goal. We&apos;ll point you to the right product — no browsing 18 names required.
            </p>
          </Reveal>
        </div>

        {/* Discovery Grid */}
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {discoveryRoutes.map((route, idx) => (
            <Reveal key={route.goal} delay={0.06 + idx * 0.03}>
              <Link
                href={route.href}
                className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5"
              >
                {/* Icon + Goal */}
                <div className="flex items-start gap-3.5">
                  <div className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-lg text-white shadow-sm",
                    route.accent
                  )}>
                    {route.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 leading-snug">
                      &ldquo;{route.goal}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="mt-4 pt-3.5 border-t border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                    Recommended
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {route.product}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {route.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                  <span>Explore</span>
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
