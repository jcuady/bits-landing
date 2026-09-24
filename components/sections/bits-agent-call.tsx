"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  PhoneCall,
  Play,
  Pause,
  Send,
  FileCheck,
  UserCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
} from "lucide-react";

interface Scenario {
  id: string;
  label: string;
  account: string;
  badge: string;
  latency: string;
  customerOutcome: string;
  roiMetric: string;
  transcript: Array<{ speaker: "agent" | "customer"; text: string }>;
  actionLabel: string;
  actionToast: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "collections",
    label: "Auto Loan PTP (Collections)",
    account: "Maria Santos · ACC-10482",
    badge: "Delinquent 45 DPD",
    latency: "< 280ms",
    customerOutcome: "Verbal commitment converted to verified GCash/Maya QR within 42 seconds, eliminating 80% manual follow-up labor.",
    roiMetric: "₱5,000 Secured · Zero Agent Labor",
    transcript: [
      {
        speaker: "agent",
        text: "Good morning, may I speak with Maria Santos regarding your auto loan account ending in 4821?",
      },
      {
        speaker: "customer",
        text: "Yes, this is Maria. I received the payment notice. I can commit to paying ₱5,000 by this Friday the 15th.",
      },
      {
        speaker: "agent",
        text: "Thank you for confirming, Ms. Santos. I have recorded your Promise-to-Pay for ₱5,000 on March 15. We'll send an instant SMS confirmation with payment channel details.",
      },
    ],
    actionLabel: "Send Payment QR via SMS",
    actionToast: "SMS payment link dispatched to Maria Santos (+63 917 *** 4821) via Maya/GCash gateway.",
  },
  {
    id: "security",
    label: "Card Security & Travel Unlock",
    account: "David Lim · CC-98214",
    badge: "Real-Time Verification",
    latency: "< 265ms",
    customerOutcome: "Instant international travel notice approved with biometric voice authentication, eliminating 15-minute hold times.",
    roiMetric: "0s Wait Time · 100% Fraud Prevention",
    transcript: [
      {
        speaker: "agent",
        text: "Hello Mr. Lim, BITS Virtual Card Security. Are you currently attempting a transaction in Tokyo, Japan for ₱18,400?",
      },
      {
        speaker: "customer",
        text: "Yes, that's me! I forgot to notify the bank that I'm traveling for a business conference this week.",
      },
      {
        speaker: "agent",
        text: "Understood Mr. Lim. Your voiceprint has been verified against your sovereign vault profile. I have temporarily unlocked international transactions for Japan through Sunday.",
      },
    ],
    actionLabel: "Unlock International Roaming",
    actionToast: "International transaction block lifted for Japan. Multi-factor confirmation logged to audit trail.",
  },
  {
    id: "support",
    label: "Clinic & Facility Booking",
    account: "Dra. Sofia Reyes · BK-3109",
    badge: "Smart Appointment Sync",
    latency: "< 270ms",
    customerOutcome: "Automated natural language schedule adjustment synchronized directly to BITS Booking & ERP without double-booking.",
    roiMetric: "100% Cal Sync · 0 No-Shows",
    transcript: [
      {
        speaker: "customer",
        text: "Hi, I need to reschedule my consultation at Ortigas Medical Suite from 10:00 AM to 3:30 PM this Thursday.",
      },
      {
        speaker: "agent",
        text: "Checking Dr. Alcantara's live schedule... Thursday 3:30 PM is available. Would you like me to reserve that slot and send you the digital clinic pass?",
      },
      {
        speaker: "customer",
        text: "Yes please, that would be wonderful.",
      },
      {
        speaker: "agent",
        text: "Your appointment is confirmed for Thursday at 3:30 PM. Your QR clinic pass has been texted to your mobile number.",
      },
    ],
    actionLabel: "Issue QR Clinic Pass",
    actionToast: "Dynamic QR pass issued and synced with BITS Booking & SMS Gateway.",
  },
];

const WAVEFORM = [24, 42, 18, 48, 22, 38, 52, 30, 44, 26, 48, 20, 36, 42, 54, 28, 38, 22, 18, 34];

export function BitsAgentCallSpecimen({ className }: { className?: string }) {
  const [activeScenarioId, setActiveScenarioId] = React.useState<string>("collections");
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  const triggerAction = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <figure className={cn("relative mx-auto w-full max-w-lg", className)}>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="absolute -top-12 left-1/2 z-50 flex w-[92%] -translate-x-1/2 items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-900/95 px-3.5 py-2.5 text-xs text-white shadow-xl backdrop-blur-md transition-all animate-in fade-in slide-in-from-top-2"
        >
          <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
          <p className="flex-1 font-medium leading-tight">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-emerald-300 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Interactive Scenario Selector */}
      <div className="mb-3 flex items-center justify-between gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1 shadow-xs">
        {SCENARIOS.map((s) => {
          const isActive = s.id === scenario.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveScenarioId(s.id)}
              className={cn(
                "min-h-[44px] flex-1 rounded-xl px-2.5 py-1.5 text-center text-xs font-bold transition-all",
                isActive
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <span className="block truncate">{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workstation Doppelrand Card */}
      <div className="rounded-[2rem] border border-slate-200/90 bg-white p-2 shadow-2xl shadow-blue-950/10">
        <div className="overflow-hidden rounded-[calc(2rem-8px)] border border-slate-100 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span
                  className={cn(
                    "absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75",
                    isPlaying && "animate-ping"
                  )}
                />
                <span className="relative inline-flex size-2.5 rounded-full bg-violet-600" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold text-slate-900">BITSagent Voice Workstation</p>
                  <span className="rounded bg-violet-100 px-1.5 py-0.2 text-[0.62rem] font-extrabold text-violet-700 uppercase">
                    Interactive
                  </span>
                </div>
                <p className="text-[0.68rem] text-slate-500">{scenario.account}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-violet-200/60 bg-violet-50 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold text-violet-700">
                {scenario.latency}
              </span>
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex size-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 transition-colors"
                title={isPlaying ? "Pause Stream" : "Resume Stream"}
                aria-label={isPlaying ? "Pause Stream" : "Resume Stream"}
              >
                {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-slate-700 ml-0.5" />}
              </button>
            </div>
          </div>

          {/* Concrete Customer Value & ROI Callout */}
          <div className="flex items-center justify-between border-b border-violet-100 bg-gradient-to-r from-violet-50/80 via-purple-50/60 to-white px-4 py-2 text-[0.7rem] sm:px-5">
            <div className="flex items-center gap-1.5 text-violet-950">
              <Sparkles className="size-3.5 text-violet-600 shrink-0" />
              <span className="font-semibold text-[0.68rem] line-clamp-1">
                {scenario.customerOutcome}
              </span>
            </div>
            <span className="shrink-0 font-mono text-[0.65rem] font-bold text-violet-700 bg-white/80 px-2 py-0.5 rounded-full border border-violet-200">
              {scenario.roiMetric}
            </span>
          </div>

          {/* Waveform Visualization */}
          <div
            className="flex h-11 items-center justify-between border-b border-slate-100 bg-slate-50 px-4 text-slate-700 sm:px-5"
            aria-hidden
          >
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "size-1.5 rounded-full bg-emerald-500",
                  isPlaying && "animate-pulse"
                )}
              />
              <span className="font-mono text-[0.65rem] font-bold tracking-wider text-slate-600 uppercase">
                {isPlaying ? "WebRTC Stream Active" : "Stream Paused"}
              </span>
            </div>

            <div className="flex items-center gap-[3px]">
              {WAVEFORM.map((height, index) => (
                <span
                  key={index}
                  className={cn(
                    "w-[3px] rounded-full transition-all duration-300",
                    isPlaying ? "bg-violet-600/80" : "bg-slate-300"
                  )}
                  style={{ height: isPlaying ? `${height * 0.4}px` : "4px" }}
                />
              ))}
            </div>

            <span className="font-mono text-[0.65rem] font-bold text-slate-500">02:18</span>
          </div>

          {/* Transcript Content */}
          <div className="space-y-3.5 p-4 sm:p-5 min-h-[14rem]">
            {scenario.transcript.map((line, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3",
                  line.speaker === "agent" ? "flex-row" : "flex-row-reverse"
                )}
              >
                <span
                  className={cn(
                    "mt-1 shrink-0 self-start rounded-full px-2.5 py-0.5 text-[0.62rem] font-bold tracking-wider uppercase",
                    line.speaker === "agent"
                      ? "bg-violet-100 text-violet-700"
                      : "bg-slate-100 text-slate-600"
                  )}
                >
                  {line.speaker === "agent" ? "AI Agent" : "Customer"}
                </span>
                <p
                  className={cn(
                    "max-w-[82%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed sm:px-4 sm:py-2.5",
                    line.speaker === "agent"
                      ? "rounded-tl-none border border-violet-100 bg-violet-50/70 text-slate-800"
                      : "rounded-tr-none bg-slate-100 font-medium text-slate-900"
                  )}
                >
                  {line.text}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Simulation Action Buttons */}
          <div className="border-t border-slate-100 bg-slate-50/90 p-3 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => triggerAction(scenario.actionToast)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-violet-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-violet-700 active:scale-[0.98]"
                >
                  <Send className="size-3.5" />
                  <span>{scenario.actionLabel}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    triggerAction(
                      `Logged interaction #${scenario.id}-9941 to sovereign core ledger with full audit cryptographic hash.`
                    )
                  }
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-100 transition-colors"
                >
                  <FileCheck className="size-3.5 text-slate-500" />
                  <span>Commit to CRM</span>
                </button>
              </div>
              <span className="flex items-center gap-1 text-[0.65rem] font-bold text-emerald-700">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                <span>BSP &amp; NPC Compliant</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Realistic interactive BITSagent voice conversation preview showing automated customer resolution and promise-to-pay recording.
      </figcaption>
    </figure>
  );
}
