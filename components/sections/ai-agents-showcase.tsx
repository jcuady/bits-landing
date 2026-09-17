"use client";

import { motion } from "motion/react";
import { aiAgents } from "@/lib/site";
import { aiAgentConversations } from "@/lib/marketing-specimens";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function AiAgentsShowcase() {
  return (
    <Section id="ai-agents" className="relative overflow-hidden bg-[#0A0F1C]">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(29,78,216,0.12),rgba(255,255,255,0))]" />
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      
      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="mb-6 flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-300">
                Next-Gen Automation
              </span>
            </div>
            <h2 className="text-h2 text-balance font-bold text-white">
              Intelligent Agents That Work{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Alongside Your Team
              </span>
            </h2>
            <p className="text-lede mx-auto mt-6 max-w-[55ch] text-pretty text-blue-100/70">
              Deploy configurable AI agents that seamlessly handle dialing, follow-ups, 
              and negotiations while strictly adhering to your operational rules.
            </p>
          </div>
        </Reveal>

        {/* Premium Agent Cards Grid (Icon-less, Typographic) */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {aiAgents.map((agent, i) => {
            const index = (i + 1).toString().padStart(2, "0");
            return (
              <Reveal key={agent.name} delay={0.1 + i * 0.1} y={20}>
                <div className="group relative h-full rounded-[2rem] bg-gradient-to-b from-white/[0.08] to-transparent p-[1px] transition-all hover:from-white/[0.15]">
                  <article className="relative flex h-full flex-col justify-between overflow-hidden rounded-[calc(2rem-1px)] bg-[#0D1326] p-8 transition-colors">
                    {/* Hover Glow */}
                    <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 blur-xl" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-xs font-semibold tracking-widest text-blue-300/50">
                          {index}.
                        </span>
                        <div
                          className={cn(
                            "flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur-md",
                            agent.status === "Active"
                              ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                              : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                          )}
                        >
                          <span
                            className={cn(
                              "size-1.5 animate-pulse rounded-full shadow-[0_0_8px_currentColor]",
                              agent.status === "Active" ? "bg-emerald-400" : "bg-amber-400"
                            )}
                            aria-hidden
                          />
                          {agent.status}
                        </div>
                      </div>

                      <h3 className="mt-8 text-xl font-bold tracking-tight text-white">
                        {agent.name}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-blue-100/60">
                        {agent.description}
                      </p>
                    </div>

                    <div className="relative z-10 mt-10">
                      <div className="text-[0.7rem] font-bold uppercase tracking-widest text-blue-300/40">
                        Measured Impact
                      </div>
                      <div className="mt-1 text-3xl font-light tracking-tighter text-white">
                        {agent.metric.split(" ")[0]}
                        <span className="ml-2 text-base font-normal tracking-normal text-blue-200/70">
                          {agent.metric.split(" ").slice(1).join(" ")}
                        </span>
                      </div>
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Premium Activity Feed (Icon-less, Proprietary look) */}
        <Reveal delay={0.4} y={30}>
          <div className="mx-auto mt-20 max-w-4xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0F172A]/80 shadow-2xl shadow-blue-900/20 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 opacity-50">
                    <span className="size-1 rounded-full bg-white" />
                    <span className="size-1 rounded-full bg-white" />
                    <span className="size-1 rounded-full bg-white" />
                  </div>
                  <div className="font-mono text-[0.75rem] font-medium tracking-wider text-blue-200/50">
                    SYS.LOG // LIVE_FEED
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-[0.7rem] font-bold uppercase tracking-widest text-emerald-400">Active Pipeline</span>
                </div>
              </div>
              
              {/* Log Content */}
              <div className="p-6 font-mono sm:p-8">
                <div className="space-y-4">
                  {aiAgentConversations[0].entries.map((entry, j) => {
                    const logTimes = ["10:42:14", "10:42:38", "10:43:05"];
                    const timeString = logTimes[j] ?? `10:${(42 + j).toString().padStart(2, "0")}:18`;
                    return (
                      <motion.div
                        key={`${entry.type}-${j}`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.2 + j * 0.1, duration: 0.4 }}
                        className="group flex gap-4 text-[0.85rem] leading-relaxed"
                      >
                        <div className="w-20 shrink-0 text-right opacity-40">
                          <span className="text-[0.7rem]">
                            {timeString}
                          </span>
                        </div>
                      <div className="flex gap-4">
                        <span
                          className={cn(
                            "w-16 shrink-0 text-[0.7rem] font-bold uppercase tracking-wider",
                            entry.type === "system" && "text-blue-400",
                            entry.type === "action" && "text-amber-400",
                            entry.type === "result" && "text-emerald-400"
                          )}
                        >
                          [{entry.type}]
                        </span>
                        <span className="text-blue-100/80 transition-colors group-hover:text-white">
                          {entry.type === "action" ? (
                            <span className="inline-flex items-center gap-1.5 rounded bg-white/5 px-2 py-0.5 text-blue-200 ring-1 ring-white/10">
                              <span className="size-1.5 rounded-full bg-amber-400" />
                              {entry.text}
                            </span>
                          ) : (
                            entry.text
                          )}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 1.2, repeat: Infinity, repeatType: "reverse", duration: 0.8 }}
                    className="flex gap-4 pl-24 text-[0.85rem]"
                  >
                    <span className="w-16 shrink-0" />
                    <span className="inline-block h-4 w-2 bg-blue-400" />
                  </motion.div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-[0.75rem] font-medium tracking-wide text-blue-200/40">
              Synthetic agent activity. Operations are fully constrained by compliance rules.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
