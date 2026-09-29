"use client";

import * as React from "react";
import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import {
  ShieldCheck,
  Headphones,
  CheckCircle2,
  Clock,
  Building2,
  UserCheck,
  TrendingUp,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FloorRole = "ops" | "cio" | "collections" | "compliance";

interface RoleDetails {
  title: string;
  badge: string;
  bullets: string[];
}

const ROLE_DATA: Record<FloorRole, RoleDetails> = {
  ops: {
    title: "For Floor Operations Directors",
    badge: "Floor Velocity & WFM",
    bullets: [
      "Eliminate auxiliary idle time with automated progressive/predictive dialer pacing.",
      "Live supervisor dashboard with silent listen, whisper, and barge-in capabilities.",
      "Workforce leaderboards, automated KPI scoring, and zero spreadsheet reconciliations.",
    ],
  },
  cio: {
    title: "For CIOs & Infrastructure Leaders",
    badge: "Sovereign Architecture",
    bullets: [
      "100% on-premise air-gapped or private cloud deployment with zero foreign data egress.",
      "Native WebRTC browser softphone — eliminates external PBX licenses and desktop DLLs.",
      "Zero per-seat licensing penalties — scale from 50 to 5,000 agents with predictable cost.",
    ],
  },
  collections: {
    title: "For Heads of Credit & Recovery",
    badge: "PTP Yield Optimization",
    bullets: [
      "Automated Promise-to-Pay (PTP) grace period tracking and real-time broken commitment alerts.",
      "Omnichannel dispatch (SMS, Viber, WhatsApp, Email) with dynamic customer merge fields.",
      "Automated skip-trace and field visit prioritization for high-value delinquent accounts.",
    ],
  },
  compliance: {
    title: "For Risk & Compliance Officers",
    badge: "Statutory Governance",
    bullets: [
      "Full alignment with BSP Circular 808 and NPC Data Privacy Act standards.",
      "100% call audio recording, permanent cryptographic timestamping, and immutable audit trails.",
      "Automated quiet-hour safeguards and frequency caps prevent statutory collection penalties.",
    ],
  },
};

export function Contact() {
  const { openModal } = useConsultationModal();
  const [selectedRole, setSelectedRole] = React.useState<FloorRole>("ops");

  const currentRole = ROLE_DATA[selectedRole];

  return (
    <Section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-20 sm:py-28 lg:py-32 border-t border-slate-100"
    >
      {/* Background Architectural Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-18">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50/90 px-4 py-1.5 text-xs font-semibold text-sky-800 shadow-2xs mb-4">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
              </span>
              <span>20 YEARS FLOOR LEADERSHIP · PRIVATE BITS OMS ARCHITECTURE SESSION</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Talk Directly with Systems Architects Who Ran 500+ Seat Recovery Floors on BITS OMS.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              Skip junior sales reps and generic PowerPoint decks. In 25 minutes, our operations systems lead audits your current contact rates, broken PTP ratios, and sovereign compliance readiness — and delivers a tailored BITS OMS technical rollout blueprint.
            </p>
          </Reveal>
        </div>

        {/* ── DOUBLE-BEZEL EXECUTIVE CONSULTATION CONSOLE ── */}
        <Reveal delay={0.12}>
          <div className="rounded-[2.25rem] lg:rounded-[2.75rem] p-2 sm:p-3 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-2xl shadow-blue-950/[0.04]">
            <div className="rounded-[calc(2.25rem-0.5rem)] lg:rounded-[calc(2.75rem-0.75rem)] bg-white border border-slate-100 p-6 sm:p-10 lg:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
              <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14 items-start">
                {/* ── LEFT COLUMN: INTERACTIVE ROLE-BASED BLUEPRINT ── */}
                <div className="space-y-6">
                  {/* Eyebrow Label */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    <Building2 className="size-3.5" />
                    <span>Select Your Role for a Tailored Agenda</span>
                  </div>

                  {/* Role Selector Chips */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("ops")}
                      className={cn(
                        "rounded-xl px-3.5 py-2.5 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "ops"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      Floor Operations
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("cio")}
                      className={cn(
                        "rounded-xl px-3.5 py-2.5 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "cio"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      CIO &amp; IT Head
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("collections")}
                      className={cn(
                        "rounded-xl px-3.5 py-2.5 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "collections"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      Recovery &amp; Credit
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("compliance")}
                      className={cn(
                        "rounded-xl px-3.5 py-2.5 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "compliance"
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/30"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      Risk &amp; Compliance
                    </button>
                  </div>

                  {/* Active Role Discussion Blueprint Box */}
                  <div className="rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50/50 via-sky-50/20 to-transparent p-5 sm:p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {currentRole.title}
                      </h3>
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-800">
                        {currentRole.badge}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {currentRole.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                          <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3 Value Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                      <Clock className="size-4 text-blue-600 mb-1.5" />
                      <div className="text-xs font-bold text-slate-900">2-Hour SLA</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Guaranteed prompt response.</div>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                      <ShieldCheck className="size-4 text-blue-600 mb-1.5" />
                      <div className="text-xs font-bold text-slate-900">BSP Aligned</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Air-gapped on-prem options.</div>
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3.5">
                      <TrendingUp className="size-4 text-blue-600 mb-1.5" />
                      <div className="text-xs font-bold text-slate-900">Zero Markup</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">No per-seat penalty traps.</div>
                    </div>
                  </div>

                  {/* Direct Contact Email */}
                  <div className="pt-2 text-xs text-slate-500">
                    Need a custom NDA or enterprise RFP response first? Email our executive lead directly at{" "}
                    <a
                      href={`mailto:${site.inquiryEmail}`}
                      className="font-bold text-blue-600 underline decoration-blue-600/30 hover:text-blue-800"
                    >
                      {site.inquiryEmail}
                    </a>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: FAST BLUEPRINT REQUEST FORM ── */}
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5 sm:p-8 shadow-xs">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-slate-900">
                      Request Your 25-Minute BITS OMS Architecture Blueprint
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Complete this quick form to reserve a private walkthrough with our systems lead.
                    </p>
                  </div>

                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
