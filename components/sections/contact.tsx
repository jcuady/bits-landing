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
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-12 sm:py-16 lg:py-20 border-t border-slate-100"
    >
      {/* Background Architectural Glow */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-blue-100/25 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="mx-auto max-w-3xl text-center mb-8 sm:mb-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-sky-50/90 px-3.5 py-1 text-xs font-semibold text-sky-800 shadow-2xs mb-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
              </span>
              <span>20 YEARS FLOOR LEADERSHIP · PRIVATE BITS OMS ARCHITECTURE SESSION</span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.25rem] font-extrabold tracking-tight text-slate-900 leading-[1.18] text-balance">
              Talk Directly with Systems Architects Who Ran 500+ Seat Recovery Floors on BITS OMS.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty">
              Skip junior sales reps and generic PowerPoint decks. In 25 minutes, our operations systems lead audits your current contact rates, broken PTP ratios, and sovereign compliance readiness — and delivers a tailored BITS OMS technical rollout blueprint.
            </p>
          </Reveal>
        </div>

        {/* ── EXECUTIVE CONSULTATION CONSOLE ── */}
        <Reveal delay={0.12}>
          <div className="rounded-2xl lg:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 lg:p-7 shadow-xl shadow-slate-900/[0.04]">
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8 items-start">
              {/* ── LEFT COLUMN: INTERACTIVE ROLE-BASED BLUEPRINT (5 cols) ── */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  {/* Eyebrow Label */}
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    <Building2 className="size-3" />
                    <span>Select Your Role for a Tailored Agenda</span>
                  </div>

                  {/* Role Selector Chips */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("ops")}
                      className={cn(
                        "rounded-lg px-3 py-2 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "ops"
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      Floor Operations
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("cio")}
                      className={cn(
                        "rounded-lg px-3 py-2 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "cio"
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      CIO &amp; IT Head
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("collections")}
                      className={cn(
                        "rounded-lg px-3 py-2 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "collections"
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      Recovery &amp; Credit
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("compliance")}
                      className={cn(
                        "rounded-lg px-3 py-2 text-xs font-bold text-left transition-all duration-200 cursor-pointer border",
                        selectedRole === "compliance"
                          ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                          : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      Risk &amp; Compliance
                    </button>
                  </div>

                  {/* Active Role Discussion Blueprint Box */}
                  <div className="rounded-xl border border-blue-100/90 bg-blue-50/40 p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {currentRole.title}
                      </h3>
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-800">
                        {currentRole.badge}
                      </span>
                    </div>

                    <ul className="space-y-2">
                      {currentRole.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 3 Value Pillars */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="rounded-lg border border-slate-200/70 bg-slate-50/70 p-2.5 text-center sm:text-left">
                      <Clock className="size-3.5 text-blue-600 mb-1 sm:mb-1.5 mx-auto sm:mx-0" />
                      <div className="text-[11px] font-bold text-slate-900">2-Hour SLA</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">Guaranteed prompt response.</div>
                    </div>
                    <div className="rounded-lg border border-slate-200/70 bg-slate-50/70 p-2.5 text-center sm:text-left">
                      <ShieldCheck className="size-3.5 text-blue-600 mb-1 sm:mb-1.5 mx-auto sm:mx-0" />
                      <div className="text-[11px] font-bold text-slate-900">BSP Aligned</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">Air-gapped on-prem options.</div>
                    </div>
                    <div className="rounded-lg border border-slate-200/70 bg-slate-50/70 p-2.5 text-center sm:text-left">
                      <TrendingUp className="size-3.5 text-blue-600 mb-1 sm:mb-1.5 mx-auto sm:mx-0" />
                      <div className="text-[11px] font-bold text-slate-900">Zero Markup</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 leading-tight">No per-seat penalty traps.</div>
                    </div>
                  </div>
                </div>

                {/* Direct Contact Email */}
                <div className="text-[11px] text-slate-500 pt-1">
                  Need a custom NDA or enterprise RFP response first? Email our executive lead directly at{" "}
                  <a
                    href={`mailto:${site.inquiryEmail}`}
                    className="font-bold text-blue-600 underline decoration-blue-600/30 hover:text-blue-800"
                  >
                    {site.inquiryEmail}
                  </a>
                </div>
              </div>

              {/* ── RIGHT COLUMN: FAST BLUEPRINT REQUEST FORM (7 cols) ── */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
