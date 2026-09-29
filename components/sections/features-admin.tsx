"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Logo } from "@/components/ui/logo";

const capabilities = [
  {
    tag: "RBAC MATRIX",
    title: "Six Scoped Floor Roles",
    description:
      "Admin, Operations Manager, Team Supervisor, Recovery Agent, QA Auditor, and External Vendor. Scoped access is verified on every server API call.",
  },
  {
    tag: "IMMUTABLE LEDGER",
    title: "Cryptographic Audit Trail",
    description:
      "Account access, payment uploads, supervisory call monitoring, and export actions logged with permanent timestamp, IP, and authenticated user ID.",
  },
  {
    tag: "MODULAR TOGGLE",
    title: "Independent Engine Licensing",
    description:
      "Toggle Predictive Dialer, QA Scorecards, Messaging Blasts, Skip Trace, Team Chat, and LMS independently per tenant. Zero seat cutoffs.",
  },
  {
    tag: "DECISION LOGIC",
    title: "Strategy Rules Engine",
    description:
      "Auto-assignment routing, delinquency bucket escalation, next-best-action guidance, and account pooling scoped by client campaign.",
  },
  {
    tag: "ASYNC WORKERS",
    title: "Background Data Ingestion",
    description:
      "Endorsement portfolios and payment reconciliations process on dedicated Redis queues. High-volume CSVs never freeze agent active screens.",
  },
  {
    tag: "SELF-HEALING",
    title: "System Health Diagnostics",
    description:
      "Automated monitoring of PostgreSQL, migrations, Redis, queue workers, storage volume, and SIP trunk uptime with 14-day telemetry and alerts.",
  },
];

export function FeaturesAdmin() {
  const { openModal } = useConsultationModal();

  return (
    <Section
      id="features-admin"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-20 sm:py-28 lg:py-32 border-b border-slate-200/80"
    >
      {/* Soft Ambient Radial Illumination */}
      <div
        className="pointer-events-none absolute -top-32 left-1/4 w-[600px] h-[600px] bg-sky-200/25 rounded-full blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[120px]"
        aria-hidden="true"
      />

      <Container>
        <div className="grid lg:grid-cols-[1.1fr_1fr] items-center gap-12 lg:gap-16">
          {/* Left: Copy & Capabilities Matrix */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/70 bg-sky-50/90 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-blue-700 shadow-2xs mb-5">
                <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                <span>GOVERNANCE &amp; ARCHITECTURE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-slate-900 leading-tight">
                Enterprise Controls Without Enterprise&nbsp;Complexity
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                BSP Circulars 454/857 and NPC Data Privacy Act (RA 10173) aligned architecture for Philippine operations. Two-factor authentication, single active session enforcement, idle timeouts, and granular role boundaries — without high-cost consulting.
              </p>
            </Reveal>

            {/* 6 High-Precision Light Glass Capability Tiles */}
            <Reveal delay={0.06}>
              <div className="mt-8 grid sm:grid-cols-2 gap-3.5">
                {capabilities.map((cap) => (
                  <div
                    key={cap.title}
                    className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs transition-all duration-300 hover:border-blue-200 hover:bg-blue-50/30 hover:shadow-md"
                  >
                    <span className="inline-block text-[10px] font-bold tracking-[0.16em] uppercase text-blue-700 mb-1.5">
                      {cap.tag}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mb-1">{cap.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* High-End Nested Island CTA Button */}
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openModal("Administration & Security Walkthrough")}
                  className="group inline-flex min-h-[46px] items-center gap-3 rounded-full bg-slate-950 hover:bg-blue-600 pl-6 pr-2 py-2 text-sm font-bold text-white shadow-lg shadow-slate-950/10 hover:shadow-blue-600/25 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <span>Request Admin Walkthrough</span>
                  <span className="size-8 rounded-full bg-white/15 flex items-center justify-center text-xs group-hover:translate-x-0.5 group-hover:bg-white/25 transition-all duration-300 font-bold">
                    →
                  </span>
                </button>

                <a
                  href="#security"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-slate-200 bg-white hover:bg-slate-50 px-5 py-2.5 text-sm font-bold text-slate-800 shadow-2xs transition-colors"
                >
                  Review Compliance Matrix
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Double-Bezel Framed Admin Console Screenshot */}
          <Reveal delay={0.08}>
            <div className="relative rounded-[2.25rem] p-2 sm:p-3 bg-gradient-to-b from-slate-100 via-slate-200/60 to-slate-100 border border-slate-200/90 shadow-xl shadow-slate-950/5">
              <div className="relative aspect-[16/11] overflow-hidden rounded-[calc(2.25rem-0.5rem)] border border-slate-200 bg-white">
                <Image
                  src="/images/features/admin-security.jpg"
                  alt="BITS Administration — role permissions matrix, module toggles, immutable audit log, and system diagnostics"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                {/* Authentic BITS Logo Brand Overlay */}
                <div className="absolute top-[2%] left-[1.5%] z-20 flex items-center gap-1.5 bg-white p-1 rounded-xl shadow-xs border border-slate-200/90">
                  <Logo variant="tile" className="size-6 sm:size-7 rounded-lg object-contain" />
                  <span className="hidden sm:inline-block font-extrabold text-[11px] text-slate-900 tracking-tight pr-1.5">
                    BITS Admin
                  </span>
                </div>

                {/* Subtle Inner Glass Glare */}
                <div className="absolute inset-0 rounded-[calc(2.25rem-0.5rem)] ring-1 ring-inset ring-slate-950/5 pointer-events-none" />

                {/* Floating Sovereign Security Chip */}
                <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/95 px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sovereign RBAC · Zero Third-Party Telemetry</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
