"use client";

import * as React from "react";
import { agents } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import { Sparkles, CheckCircle2, SlidersHorizontal, ShieldCheck, X } from "lucide-react";

const steps = [
  "Start with Core Collections for portfolios, accounts, queues, PTP, and reporting",
  "Add Messaging for configured providers, templates, blasts, and history",
  "Enable Quality Assurance for scorecards, evaluations, and worklists",
  "Add Dialer + Live Assist when calling and supervision are required",
] as const;

interface ModuleState {
  id: string;
  name: string;
  category: string;
  required: boolean;
  enabled: boolean;
  leadTime: string;
  desc: string;
}

const INITIAL_MODULES: ModuleState[] = [
  {
    id: "core",
    name: "Core Collections Engine",
    category: "Foundation",
    required: true,
    enabled: true,
    leadTime: "1-2 Weeks",
    desc: "Portfolio tiering (1-30, 31-60, 60+ DPD), debtor work queues, PTP tracking, and audit reporting.",
  },
  {
    id: "messaging",
    name: "Omnichannel Messaging",
    category: "Communication",
    required: false,
    enabled: true,
    leadTime: "3-5 Days",
    desc: "Integrated telco aggregator APIs for tokenized GCash/Maya settlement SMS & payment links.",
  },
  {
    id: "qa",
    name: "Quality Assurance Scorecards",
    category: "Supervision",
    required: false,
    enabled: true,
    leadTime: "3-5 Days",
    desc: "Configurable agent evaluations, call sampling worklists, and automated BSP script compliance.",
  },
  {
    id: "dialer",
    name: "Predictive Dialer + WebRTC",
    category: "Telephony",
    required: false,
    enabled: false,
    leadTime: "1 Week",
    desc: "Carrier-grade browser softphone, AMD answering machine detection, and supervisor whisper barge-in.",
  },
  {
    id: "bitsagent",
    name: "BITSagent Autonomous Voice",
    category: "Autonomous AI",
    required: false,
    enabled: false,
    leadTime: "2 Weeks",
    desc: "Sub-300ms conversational turn-taking, Taglish/English dialect support, and automated settlement scheduling.",
  },
];

const ctaClass =
  "group mt-8 inline-flex min-h-11 items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

export function AiEcosystem() {
  const [modules, setModules] = React.useState<ModuleState[]>(INITIAL_MODULES);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const toggleModule = (id: string) => {
    const target = modules.find((m) => m.id === id);
    if (!target || target.required) return;

    setModules((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextState = !m.enabled;
          const msg = nextState
            ? `Enabled ${m.name}: Blueprint updated for supported deployment.`
            : `Disabled ${m.name}: Removed from immediate rollout scope.`;
          setToastMessage(msg);
          setTimeout(() => setToastMessage(null), 3500);
          return { ...m, enabled: nextState };
        }
        return m;
      })
    );
  };

  const enabledCount = modules.filter((m) => m.enabled).length;

  return (
    <Section id="modules" className="relative overflow-hidden bg-slate-50">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      {/* Floating Interactive Toast */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-24 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center gap-2.5 rounded-xl border border-blue-200 bg-slate-900/95 px-4 py-3 text-xs text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top-2"
        >
          <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
          <p className="flex-1 font-medium">{toastMessage}</p>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
            aria-label="Dismiss toast"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
                <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Modular by design
                </span>
              </div>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
                Start with what your operation needs.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Build your operational stack around your team&apos;s workflow,
                communication requirements, and supervision model. Toggle modules
                in the live blueprint to customize your deployment scope.
              </p>
            </Reveal>

            <ol className="mt-12 max-w-[46ch] space-y-2">
              {steps.map((text, i) => (
                <li key={text} className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200/60 hover:bg-white/60">
                  <Reveal delay={0.08 + i * 0.04} y={10}>
                    <div className="flex gap-4 items-center">
                      <span className="font-mono text-[0.75rem] font-semibold tracking-widest text-blue-400">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-[0.92rem] font-bold leading-snug text-slate-700 transition-colors group-hover:text-blue-600">
                        {text}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.28} y={8}>
              <a href="#contact" className={ctaClass}>
                <span className="relative">
                  Build Your Custom Configuration
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} amount={0.2}>
            <figure>
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/90 bg-white shadow-xl shadow-blue-900/5">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-40">
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div>
                      <p className="text-[0.75rem] font-semibold text-slate-700">Interactive Blueprint</p>
                      <p className="truncate text-[0.68rem] font-medium text-slate-500">
                        Click any optional module to toggle
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[0.65rem] font-bold text-blue-700">
                    <SlidersHorizontal className="size-3" />
                    {enabledCount} Modules Active
                  </span>
                </div>

                {/* Customer ROI Banner */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white px-5 py-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-slate-800">
                      <Sparkles className="size-3.5 text-blue-600 shrink-0" />
                      <span className="text-[0.68rem] font-semibold">
                        Zero vendor lock-in. Pay only for modules currently active on your floor.
                      </span>
                    </div>
                    <span className="font-mono text-[0.62rem] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                      Zero Migration Risk
                    </span>
                  </div>
                </div>
                
                {/* Interactive Modules Table */}
                <div className="overflow-x-auto p-2">
                  <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                    <caption className="sr-only">
                      Interactive BITS modules configuration workbench
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Module Component</th>
                        <th scope="col" className="hidden px-4 py-3 sm:table-cell">Rollout</th>
                        <th scope="col" className="px-4 py-3 text-right">Toggle State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {modules.map((m) => (
                        <tr
                          key={m.id}
                          onClick={() => toggleModule(m.id)}
                          className={cn(
                            "transition-colors",
                            m.required
                              ? "bg-slate-50/30"
                              : "cursor-pointer hover:bg-blue-50/50"
                          )}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "size-2 rounded-full",
                                  m.enabled ? "bg-blue-600" : "bg-slate-300"
                                )}
                              />
                              <div>
                                <p className="font-bold text-slate-900 leading-tight">{m.name}</p>
                                <p className="text-[0.65rem] text-slate-500 mt-0.5 line-clamp-1">{m.desc}</p>
                              </div>
                            </div>
                          </td>
                          <td className="hidden px-4 py-3 font-mono text-[0.68rem] text-slate-600 sm:table-cell">
                            {m.leadTime}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right">
                            {m.required ? (
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.62rem] font-bold text-slate-600 uppercase">
                                Required Core
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleModule(m.id);
                                }}
                                className={cn(
                                  "cursor-pointer rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wider transition-all",
                                  m.enabled
                                    ? "bg-blue-600 text-white shadow-2xs hover:bg-blue-700"
                                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                                )}
                              >
                                {m.enabled ? "Active" : "Disabled"}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Operations Floor Roles */}
                <div className="border-t border-slate-100 bg-slate-50/40 p-3">
                  <span className="text-[0.65rem] font-mono font-bold uppercase tracking-wider text-slate-500 px-2">
                    Included Floor Governance Roles:
                  </span>
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {agents.map((a) => (
                      <li
                        key={a.name}
                        className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-2xs"
                      >
                        <p className="text-[0.78rem] font-bold text-slate-900">{a.name}</p>
                        <p className="mt-0.5 text-[0.68rem] leading-snug text-slate-500">{a.role}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <figcaption className="sr-only">
                An interactive BITS configuration workbench allowing dynamic selection of optional collections modules.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
