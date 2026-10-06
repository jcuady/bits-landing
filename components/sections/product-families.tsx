"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
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
    problem: "Collect debt faster, automate calls, and track field reps on the ground",
    summary:
      "All-in-one operations system: call center CRM, automatic dialer, live mobile GPS app for field agents with visit timestamps, and sub-300ms voice AI.",
    visual: "/brand/families/family-customer-operations.webp",
    alt: "BITS Customer Operations 3D telemetry and voice AI core",
    capabilityTag: "Collections CRM · Field App · Dialer · Voice AI",
    benchmark: "99.98% Telephony Uptime · Live GPS & Timestamps",
    pulseColor: "bg-blue-500",
    glowColor: "from-blue-500/15 via-sky-400/10 to-transparent",
    accentBorder: "hover:border-blue-400/50",
    href: "/#operations-360",
    products: [
      { name: "Operations 360", badge: "Flagship CRM & Dialer", href: "/#operations-360" },
      { name: "Field Agents App", badge: "Live GPS & Timestamps", href: "/#operations-360" },
      { name: "BITScrm Suite", badge: "Sales & Support", href: "/products/crm" },
      { name: "BITSagent AI", badge: "Autonomous Voice & Email", href: "/bitsagent" },
    ],
  },
  {
    id: "business-operations",
    code: "FAMILY 02 // FINANCIAL & WORKFORCE",
    title: "Business Operations",
    problem: "Connect company accounting, staff payroll, and fleet inventory",
    summary:
      "Complete business back-office: BIR CAS-aligned General Ledger, 24/7 biometric shift tracking, Philippine TRAIN law payroll, and warehouse fleet delivery routing.",
    visual: "/brand/families/family-business-operations.webp",
    alt: "BITS Business Operations 3D financial prism and ledger matrix",
    capabilityTag: "ERP Ledger · TRAIN Payroll · Logistics",
    benchmark: "BIR CAS Aligned · 100% Tax & Labor Compliant",
    pulseColor: "bg-emerald-500",
    glowColor: "from-emerald-500/15 via-teal-400/10 to-transparent",
    accentBorder: "hover:border-emerald-400/50",
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
    problem: "Manage bookings, customer queues, venues, and smart cards",
    summary:
      "Customer-facing tools: live calendar booking, SMS queuing screens, sports club court schedules, and encrypted contactless smart tap NFC business cards.",
    visual: "/brand/families/family-customer-experience.webp",
    alt: "BITS Customer Experience 3D smart NFC card and venue telemetry",
    capabilityTag: "Dynamic Booking · Queue · Smart NFC",
    benchmark: "Sub-Second NFC Tap · Real-Time Venue Sync",
    pulseColor: "bg-amber-500",
    glowColor: "from-amber-500/15 via-orange-400/10 to-transparent",
    accentBorder: "hover:border-amber-400/50",
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
    problem: "Connect AI to your company data, deploy on your own servers",
    summary:
      "Enterprise AI knowledge engine that answers customer questions using your exact company manuals, plus private server deployment and custom software builds.",
    visual: "/brand/families/family-platform-ai.webp",
    alt: "BITS Platform & AI 3D sovereign neural polyhedron core",
    capabilityTag: "RAG Engine · Sovereign Cloud · Custom Stack",
    benchmark: "Private On-Prem Inference · Zero Data Leaks",
    pulseColor: "bg-violet-500",
    glowColor: "from-violet-500/15 via-purple-400/10 to-transparent",
    accentBorder: "hover:border-violet-400/50",
    href: "/products/rag-engine",
    products: [
      { name: "RAG Knowledge Engine", badge: "Vector SOP Grounding", href: "/products/rag-engine" },
      { name: "White-Label Deployment", badge: "Multi-Tenant Sovereign", href: "/products/white-label" },
      { name: "Custom Engineering", badge: "Bespoke System Architecture", href: "/products/custom-engineering" },
    ],
  },
];

export function ProductFamilies() {
  const { openModal } = useConsultationModal();
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
                  "group relative rounded-[2.25rem] sm:rounded-[2.5rem] p-3 sm:p-3.5",
                  "bg-white/75 backdrop-blur-xl border border-white/85",
                  "shadow-xl shadow-blue-950/5 transition-all duration-300",
                  "hover:shadow-2xl hover:shadow-blue-600/15 hover:-translate-y-1",
                  family.accentBorder
                )}
              >
                {/* Inner Core Container (Concentric Doppelrand) */}
                <div className="relative flex h-full flex-col justify-between rounded-[1.75rem] sm:rounded-[2rem] bg-white/90 backdrop-blur-2xl p-6 sm:p-8 overflow-hidden border border-white/90 shadow-sm">
                  {/* Subtle Inner Highlight Refraction */}
                  <div className="absolute inset-0 rounded-[1.75rem] sm:rounded-[2rem] ring-1 ring-inset ring-white/95 shadow-[inset_0_1px_2px_rgba(255,255,255,0.95)] pointer-events-none" />

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
                      {/* Bespoke Ultra-HD 3D Cloud Logo Emblem */}
                      <div className="relative size-18 sm:size-22 rounded-2xl p-2 shrink-0 bg-gradient-to-br from-white/95 via-sky-50/70 to-white/90 border border-white/95 shadow-md shadow-blue-950/5 ring-1 ring-slate-900/5 backdrop-blur-xl transition-all duration-300 group-hover:scale-[1.08] group-hover:shadow-lg group-hover:shadow-blue-500/15 flex items-center justify-center">
                        <div className="relative size-full">
                          <Image
                            src={family.visual}
                            alt={family.alt}
                            fill
                            sizes="(max-width: 640px) 72px, 88px"
                            className="object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                            priority={idx < 2}
                          />
                        </div>
                      </div>

                      {/* Header Meta & Title */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[0.66rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.18em] text-blue-700">
                            {family.code}
                          </span>
                        </div>

                        <h3 className="mt-1 text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                          {family.title}
                        </h3>

                        <p className="mt-1 text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed">
                          {family.problem}
                        </p>
                      </div>
                    </div>

                    {/* Operational Telemetry Benchmark Strip */}
                    <div className="mt-4 sm:mt-5 flex items-center gap-2 rounded-xl bg-slate-50/90 border border-slate-200/80 px-3 py-2 text-[0.72rem] font-semibold text-slate-700">
                      <span className={cn("size-2 rounded-full shrink-0 animate-pulse", family.pulseColor)} />
                      <span className="font-mono uppercase tracking-wider">{family.benchmark}</span>
                    </div>

                    {/* Architectural Narrative Description */}
                    <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {family.summary}
                    </p>
                  </div>

                  {/* Product Ecosystem Section */}
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <div className="mb-2.5 flex items-center justify-between">
                      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Connected Modules
                      </span>
                      <span className="text-[0.65rem] font-semibold text-blue-700">
                        {family.products.length} Products Included
                      </span>
                    </div>

                    <div className="grid gap-2 sm:grid-cols-2">
                      {family.products.map((prod) => (
                        <Link
                          key={prod.name}
                          href={prod.href}
                          onClick={(e) => {
                            if (prod.href.startsWith("/#") || prod.href.startsWith("#")) {
                              const targetId = prod.href.replace(/^\/?#/, "");
                              const el = document.getElementById(targetId);
                              if (el) {
                                e.preventDefault();
                                el.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }}
                          className="group/pill flex flex-col justify-between rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-white hover:border-blue-500/40 hover:shadow-xs p-2.5 transition-all duration-150"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 group-hover/pill:text-blue-700 transition-colors">
                              {prod.name}
                            </span>
                            <span className="text-slate-400 text-xs font-bold group-hover/pill:text-blue-600 transition-transform group-hover/pill:translate-x-0.5">
                              ↗
                            </span>
                          </div>
                          <span className="mt-1 text-[0.68rem] font-medium text-slate-500">
                            {prod.badge}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Primary Family Deep-Dive Button */}
                    <Link
                      href={family.href}
                      onClick={(e) => {
                        if (family.href.startsWith("/#") || family.href.startsWith("#")) {
                          const targetId = family.href.replace(/^\/?#/, "");
                          const el = document.getElementById(targetId);
                          if (el) {
                            e.preventDefault();
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }
                      }}
                      className="mt-4 flex w-full items-center justify-between rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/25 transition-all duration-200 hover:shadow-lg active:scale-[0.99]"
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
          <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-white/80 bg-white/80 backdrop-blur-xl p-6 sm:p-7 shadow-xl shadow-blue-950/5">
            <div>
              <p className="text-base font-bold text-slate-900">
                Looking for the complete architecture breakdown?
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Explore all 18 enterprise products, sovereign on-prem deployment, or white-label options.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/products"
                className="inline-flex h-11 flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-lg"
              >
                <span>Browse All 18 Products</span>
                <span>→</span>
              </Link>
              <button
                type="button"
                onClick={() => openModal("Product Portfolio Scoping — All 18 Products")}
                className="inline-flex h-11 flex-1 sm:flex-none items-center justify-center rounded-xl border border-slate-200/90 bg-white/90 px-4 text-xs sm:text-sm font-bold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 cursor-pointer"
              >
                <span>Book Scoping</span>
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
