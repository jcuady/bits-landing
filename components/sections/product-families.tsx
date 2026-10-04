"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

interface ProductModule {
  name: string;
  badge: string;
  href: string;
}

interface ProductFamily {
  id: string;
  code: string;
  title: string;
  problem: string;
  summary: string;
  visual: string;
  alt: string;
  capabilityTag: string;
  benchmark: string;
  pulseColor: string;
  glowColor: string;
  accentBorder: string;
  href: string;
  products: ProductModule[];
}

const productFamilies: ProductFamily[] = [
  {
    id: "customer-operations",
    code: "FAMILY 01 // RECOVERY & VOICE",
    title: "Customer Operations",
    problem: "Run collections, contact centers, and customer relationships",
    summary:
      "High-concurrency recovery floor engine combining collections CRM, predictive dialing, and sub-300ms voice AI agents with supervisory monitoring.",
    visual: "/images/families/customer-operations.webp",
    alt: "BITS Customer Operations 3D telemetry and voice AI core",
    capabilityTag: "Collections CRM · Dialer · Voice AI",
    benchmark: "99.98% Telephony SLA · Sub-300ms Voice Latency",
    pulseColor: "bg-blue-500",
    glowColor: "from-blue-600/10 via-sky-500/5 to-transparent",
    accentBorder: "group-hover:border-blue-500/30",
    href: "/#operations-360",
    products: [
      { name: "Operations 360", badge: "Flagship CRM & Dialer", href: "/#operations-360" },
      { name: "BITScrm Suite", badge: "Sales & Support", href: "/products/crm" },
      { name: "BITSagent AI", badge: "Autonomous Voice & Email", href: "/bitsagent" },
    ],
  },
  {
    id: "business-operations",
    code: "FAMILY 02 // FINANCIAL & WORKFORCE",
    title: "Business Operations",
    problem: "Connect finance, workforce, and supply chain",
    summary:
      "Enterprise accounting with General Ledger and AP/AR 3-way match, 24/7 BPO biometric shift rosters, and compliant Philippine TRAIN law payroll.",
    visual: "/images/families/business-operations.webp",
    alt: "BITS Business Operations 3D financial prism and ledger matrix",
    capabilityTag: "ERP Ledger · TRAIN Payroll · Logistics",
    benchmark: "BIR CAS Aligned · 100% Statutory Compliance",
    pulseColor: "bg-emerald-500",
    glowColor: "from-emerald-600/10 via-teal-500/5 to-transparent",
    accentBorder: "group-hover:border-emerald-500/30",
    href: "/products/accounting",
    products: [
      { name: "Accounting & ERP", badge: "GL · AP/AR · Multi-Entity", href: "/products/accounting" },
      { name: "HRMS & Payroll", badge: "TRAIN Law · Biometrics", href: "/products/hrms" },
      { name: "Inventory & Logistics", badge: "Fleet Routing · Warehousing", href: "/products/logistics" },
    ],
  },
  {
    id: "customer-experience",
    code: "FAMILY 03 // VENUE & SMART IDENTITY",
    title: "Customer Experience",
    problem: "Manage bookings, queues, venues, and dynamic identity",
    summary:
      "Unified dynamic capacity scheduling, real-time venue and tournament management, SMS queuing displays, and encrypted NFC smart tap identity.",
    visual: "/images/families/customer-experience.webp",
    alt: "BITS Customer Experience 3D smart NFC card and venue telemetry",
    capabilityTag: "Dynamic Booking · Queue · Smart NFC",
    benchmark: "Sub-Second NFC Tap · Real-Time Venue Sync",
    pulseColor: "bg-amber-500",
    glowColor: "from-amber-600/10 via-orange-500/5 to-transparent",
    accentBorder: "group-hover:border-amber-500/30",
    href: "/products/booking",
    products: [
      { name: "Booking System", badge: "Dynamic Capacity & Deposits", href: "/products/booking" },
      { name: "Smart Queuing", badge: "SMS Alert & Display Flow", href: "/products/queuing" },
      { name: "Sports & Venue Hub", badge: "Pickleball OS & Courts", href: "/products/sports-venue" },
      { name: "Smart NFC Card", badge: "BITS Tap Digital ID", href: "/products/nfc-card" },
    ],
  },
  {
    id: "platform-ai",
    code: "FAMILY 04 // PRIVATE SOVEREIGN FABRIC",
    title: "Platform & AI",
    problem: "Ground AI in your data, integrate systems, deploy anywhere",
    summary:
      "Enterprise RAG knowledge engine grounding LLMs in proprietary SOPs, multi-tenant white-label SaaS infrastructure, and bespoke custom engineering.",
    visual: "/images/families/platform-ai.webp",
    alt: "BITS Platform & AI 3D sovereign neural polyhedron core",
    capabilityTag: "RAG Engine · Sovereign Cloud · Custom Stack",
    benchmark: "Private On-Prem Inference · Zero Data Leaks",
    pulseColor: "bg-violet-500",
    glowColor: "from-violet-600/10 via-purple-500/5 to-transparent",
    accentBorder: "group-hover:border-violet-500/30",
    href: "/products/rag-engine",
    products: [
      { name: "RAG Knowledge Engine", badge: "Vector SOP Grounding", href: "/products/rag-engine" },
      { name: "White-Label Deployment", badge: "Multi-Tenant Sovereign", href: "/products/white-label" },
      { name: "Custom Engineering", badge: "Bespoke System Architecture", href: "/products/custom-engineering" },
    ],
  },
];

export function ProductFamilies() {
  return (
    <Section
      id="product-families"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-sky-50/60 via-slate-50/80 to-white"
    >
      {/* High-Altitude Cloud Sky Atmospheric Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero-sky-bg.jpg"
          alt=""
          fill
          priority={false}
          className="object-cover object-top opacity-25 mix-blend-multiply"
        />
        {/* Soft Cloud Mist Fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/85 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      <Container className="relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-18 lg:mb-20">
          <Reveal>
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/90 px-3.5 py-1 shadow-2xs backdrop-blur-xs">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-blue-900 font-mono">
                18 Connected Products · 4 Purpose-Built Families
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black tracking-tight text-slate-900 leading-[1.12] text-balance">
              One Unified Platform. Every Operation.{" "}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
                Your Starting Point.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-pretty font-normal">
              BITS products are engineered as four deeply connected operational engines. Solve your organization&apos;s most pressing workflow bottleneck first, then expand cross-department with zero data fragmentation.
            </p>
          </Reveal>
        </div>

        {/* 4 Product Family Cards — Double-Bezel Architecture */}
        <div className="grid gap-6 sm:gap-7 lg:gap-8 lg:grid-cols-2">
          {productFamilies.map((family, idx) => (
            <Reveal key={family.id} delay={0.06 + idx * 0.05}>
              <div
                className={cn(
                  "group relative rounded-[2rem] sm:rounded-[2.25rem] p-2.5 sm:p-3",
                  "bg-gradient-to-b from-slate-200/90 via-slate-150 to-slate-200/60 dark:from-slate-800 dark:to-slate-900",
                  "border border-slate-300/70 dark:border-slate-800",
                  "shadow-[0_10px_30px_-15px_rgba(0,0,0,0.06)] transition-all duration-300",
                  "hover:shadow-[0_24px_48px_-16px_rgba(18,66,148,0.14)] hover:-translate-y-1",
                  family.accentBorder
                )}
              >
                {/* Inner Core Container (Concentric Doppelrand) */}
                <div className="relative flex h-full flex-col justify-between rounded-[1.55rem] sm:rounded-[1.8rem] bg-white dark:bg-slate-950 p-6 sm:p-8 overflow-hidden border border-white/80 dark:border-white/5">
                  {/* Atmospheric Brand Glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-gradient-to-br blur-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100",
                      family.glowColor
                    )}
                  />

                  {/* Top Bar: Bespoke Visual Emblem + Title Block */}
                  <div>
                    <div className="flex items-start gap-4 sm:gap-5">
                      {/* Bespoke Ultra-HD 3D Visual Art Badge */}
                      <div className="relative size-18 sm:size-22 rounded-2xl overflow-hidden shadow-md ring-1 ring-black/10 shrink-0 bg-slate-950 transition-transform duration-300 group-hover:scale-[1.04]">
                        <Image
                          src={family.visual}
                          alt={family.alt}
                          fill
                          sizes="(max-width: 640px) 72px, 88px"
                          className="object-cover"
                          priority={idx < 2}
                        />
                      </div>

                      {/* Header Meta & Title */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[0.66rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                            {family.code}
                          </span>
                        </div>

                        <h3 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                          {family.title}
                        </h3>

                        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                          {family.problem}
                        </p>
                      </div>
                    </div>

                    {/* Operational Telemetry Benchmark Strip */}
                    <div className="mt-4 sm:mt-5 flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 px-3 py-2 text-[0.72rem] font-semibold text-slate-700 dark:text-slate-300">
                      <span className={cn("size-2 rounded-full shrink-0 animate-pulse", family.pulseColor)} />
                      <span className="font-mono uppercase tracking-wider">{family.benchmark}</span>
                    </div>

                    {/* Architectural Narrative Description */}
                    <p className="mt-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                      {family.summary}
                    </p>
                  </div>

                  {/* Product Ecosystem Section */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Connected Modules
                      </span>
                      <span className="text-[0.65rem] font-medium text-slate-400">
                        {family.products.length} Products Included
                      </span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {family.products.map((prod) => (
                        <Link
                          key={prod.name}
                          href={prod.href}
                          className="group/pill flex flex-col justify-between rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-blue-500/40 hover:shadow-xs p-2.5 transition-all duration-150"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover/pill:text-blue-700 transition-colors">
                              {prod.name}
                            </span>
                            <span className="text-slate-400 text-xs font-bold group-hover/pill:text-blue-600 transition-transform group-hover/pill:translate-x-0.5">
                              ↗
                            </span>
                          </div>
                          <span className="mt-1 text-[0.68rem] font-medium text-slate-500 dark:text-slate-400">
                            {prod.badge}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Primary Family Deep-Dive Button */}
                    <Link
                      href={family.href}
                      className="mt-4 flex w-full items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition-all duration-200 hover:bg-blue-600 hover:shadow-md active:scale-[0.99]"
                    >
                      <span>Explore {family.title} Ecosystem</span>
                      <span className="font-mono text-base transition-transform duration-200 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Global Portfolio Navigation Strip */}
        <Reveal delay={0.28}>
          <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Looking for the complete architecture breakdown?
              </p>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Explore all 18 enterprise products, sovereign on-prem deployment, or white-label options.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/products"
                className="inline-flex h-11 flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs sm:text-sm font-bold text-white shadow-xs transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
              >
                <span>Browse All 18 Products</span>
                <span>→</span>
              </Link>
              <Link
                href="/#contact"
                className="inline-flex h-11 flex-1 sm:flex-none items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-xs sm:text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:border-slate-300"
              >
                <span>Book Scoping</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
