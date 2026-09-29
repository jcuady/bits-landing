"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Magnetic } from "@/components/ui/magnetic";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import {
  Cloud,
  ShieldCheck,
  Server,
  Cpu,
  ArrowRight,
  Activity,
  Lock,
  Layers,
  Sparkles,
  Wifi,
  Database,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CloudPillar {
  icon: React.ElementType;
  badge: string;
  title: string;
  description: string;
  metric: { label: string; value: string };
  highlights: string[];
}

const CLOUD_PILLARS: CloudPillar[] = [
  {
    icon: ShieldCheck,
    badge: "Sovereignty & Compliance",
    title: "Air-Gapped Sovereign Cloud & PH Data Residency",
    description:
      "100% on-premise private deployment or sovereign VPC with guaranteed zero foreign data egress. Full statutory governance aligned with BSP Circular 808 and NPC RA 10173 Data Privacy regulations.",
    metric: { label: "Data Egress Risk", value: "0% Foreign Transfer" },
    highlights: [
      "Strict in-country data residency (Metro Manila / Clark Tier-IV facilities)",
      "Cryptographic database column encryption (AES-256 GCM)",
      "Zero dependencies on overseas multi-tenant black-box clouds",
    ],
  },
  {
    icon: Wifi,
    badge: "Carrier-Grade Telephony",
    title: "Boundless Softphone Cloud & Predictive Pacing",
    description:
      "Browser-native WebRTC softphone edge nodes delivering sub-25ms jitter. Scales to 5,000+ simultaneous audio channels with automated dialer pacing and zero external PBX licensing fees.",
    metric: { label: "Audio Jitter", value: "< 25ms Ultra-Low" },
    highlights: [
      "Native WebRTC browser audio — zero desktop DLLs or third-party dialer installs",
      "Dynamic SIP trunk auto-failover across primary Philippine carriers",
      "Real-time supervisor whisper, barge-in, and packet loss telemetry",
    ],
  },
  {
    icon: Cpu,
    badge: "AI Inference Fabric",
    title: "Dedicated GPU & RAG Grounding Clusters",
    description:
      "Tenant-isolated inference infrastructure powering BITSagent Voice AI and BITS RAG Knowledge Engine. Policies, manuals, and statutory collections rules grounded with 99.4% factual accuracy.",
    metric: { label: "Vector Search Latency", value: "118ms Grounded" },
    highlights: [
      "Tenant-isolated vector spaces with granular role-based document access",
      "Grounded conversational reasoning with exact policy PDF citations",
      "Continuous compliance guardrails preventing unauthorized PTP commitments",
    ],
  },
  {
    icon: Database,
    badge: "Resilience & Uptime",
    title: "Active-Active High Availability & Disaster Recovery",
    description:
      "Dual-datacenter active-active cluster topology with real-time CDC replication. Delivers 99.99% operational uptime and sub-second failover for mission-critical recovery operations.",
    metric: { label: "Target Availability", value: "99.99% Uptime" },
    highlights: [
      "Sub-second automated failover with zero transactional state loss",
      "Immutable write-once cryptographic audit journals for financial audits",
      "Automated hourly encrypted snapshot mirrors with instant point-in-time recovery",
    ],
  },
];

export function CloudBranding() {
  const { openModal } = useConsultationModal();
  const [activePillar, setActivePillar] = React.useState<number>(0);

  return (
    <Section
      id="cloud-infrastructure"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/30 to-white py-20 sm:py-28 lg:py-36 border-t border-slate-100"
    >
      {/* ── ATMOSPHERIC AMBIENT CLOUD BACKDROP ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Soft Sunny Cloud Image Overlay */}
        <div className="absolute inset-0 opacity-[0.14] mix-blend-multiply">
          <Image
            src="/images/hero-sky-bg.jpg"
            alt=""
            fill
            sizes="100vw"
            quality={85}
            className="object-cover object-top select-none"
          />
        </div>

        {/* Luminous Sky & Aurora Radial Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[340px] w-[900px] rounded-full bg-gradient-to-r from-blue-400/20 via-sky-300/30 to-indigo-400/20 blur-[110px]" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-sky-200/20 blur-[120px]" />

        {/* Tech Grid Dot Lattice */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.12)_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      <Container className="relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="mx-auto max-w-3xl text-center mb-14 sm:mb-18 lg:mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/80 bg-white/90 px-4 py-1.5 text-xs font-semibold text-sky-800 shadow-xs backdrop-blur-md mb-4">
              <span className="flex size-4 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 text-white text-[9px] shadow-xs">
                ☁️
              </span>
              <span className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em]">
                BOUNDLESS CLOUD INFRASTRUCTURE · ENTERPRISE HORIZON
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Scale Without Boundaries. Deploy in Your Sovereign Cloud.
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty font-normal">
              From air-gapped private on-premise racks to high-concurrency cloud telephony, BITS engineered the sovereign technology layer that Philippine enterprises and recovery floors rely on.
            </p>
          </Reveal>
        </div>

        {/* ── DOUBLE-BEZEL CLOUD ARCHITECTURE SHOWCASE (High-End Agency Architectural Console) ── */}
        <Reveal delay={0.12}>
          <div className="rounded-[2.5rem] lg:rounded-[3rem] p-2.5 sm:p-3.5 bg-gradient-to-b from-blue-100/80 via-sky-50/50 to-blue-100/60 border border-blue-200/90 shadow-2xl shadow-blue-900/[0.06]">
            <div className="rounded-[calc(2.5rem-0.5rem)] lg:rounded-[calc(3rem-0.625rem)] bg-white border border-slate-100 p-6 sm:p-10 lg:p-14 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
              {/* Telemetry Header Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                    <Cloud className="size-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">BITS Cloud Fabric v4.8</div>
                    <div className="text-slate-500 text-[11px]">Sovereign Enterprise Virtual Private Mesh</div>
                  </div>
                </div>

                {/* Real-time Telemetry Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700">
                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>99.99% Availability SLA</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1 text-[11px] font-semibold text-blue-800">
                    <Lock className="size-3 text-blue-600" />
                    <span>AES-256 / TLS 1.3 Air-Gapped</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-700">
                    <Activity className="size-3 text-slate-500" />
                    <span>&lt; 25ms Core Telephony Latency</span>
                  </div>
                </div>
              </div>

              {/* Bento Grid: 4 Core Sovereign Cloud Pillars */}
              <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
                {CLOUD_PILLARS.map((pillar, idx) => {
                  const Icon = pillar.icon;
                  const isSelected = activePillar === idx;

                  return (
                    <div
                      key={pillar.title}
                      onClick={() => setActivePillar(idx)}
                      className={cn(
                        "group relative rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer border text-left",
                        isSelected
                          ? "border-blue-400 bg-gradient-to-br from-blue-50/60 via-sky-50/30 to-white shadow-lg shadow-blue-500/10"
                          : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300"
                      )}
                    >
                      {/* Top Row: Icon + Badge + Metric Chip */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div
                          className={cn(
                            "flex size-11 items-center justify-center rounded-xl transition-all duration-200",
                            isSelected
                              ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                              : "bg-white text-slate-700 border border-slate-200 group-hover:text-blue-600 group-hover:border-blue-200"
                          )}
                        >
                          <Icon className="size-5.5" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600 font-mono">
                            {pillar.badge}
                          </span>
                          <span
                            className={cn(
                              "rounded-md px-2.5 py-0.5 text-xs font-bold font-mono transition-colors",
                              isSelected
                                ? "bg-blue-100 text-blue-800"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                            )}
                          >
                            {pillar.metric.value}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {pillar.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {pillar.description}
                      </p>

                      {/* Highlight Checklist */}
                      <ul className="mt-4 space-y-2 border-t border-slate-200/70 pt-4 text-xs text-slate-600">
                        {pillar.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="size-3.5 text-blue-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Sovereign Action Console */}
              <div className="mt-10 sm:mt-12 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 via-sky-50/50 to-blue-50/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-slate-900 font-bold text-base sm:text-lg">
                    <Sparkles className="size-4 text-blue-600" />
                    <span>Explore Custom Sovereign Cloud Scoping</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
                    Compare air-gapped on-premise hardware footprints, sovereign private cloud VPCs, and SIP trunk interconnects with our principal systems architect.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto shrink-0">
                  <Magnetic>
                    <button
                      type="button"
                      onClick={() => openModal("Sovereign Cloud Architecture Diagnostic")}
                      className="group flex min-h-[48px] items-center justify-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      <span>Request Cloud Blueprint</span>
                      <div className="flex size-7 items-center justify-center rounded-full bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-1">
                        <ArrowRight className="size-3.5" />
                      </div>
                    </button>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
