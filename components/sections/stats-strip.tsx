"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { stats } from "@/lib/site";
import { Container } from "@/components/ui/container";

function AnimatedValue({ value, delay }: { value: string; delay: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-[2.5rem] font-light tracking-tight text-slate-900 sm:text-[3rem]"
    >
      {value}
    </motion.span>
  );
}

const recoveryMetrics = [
  {
    value: "3.2x",
    label: "Higher Right-Party Connect (RPC) Velocity",
    subtext: "Intelligent auto-dialing vs manual calling lists",
    badge: "Efficiency",
  },
  {
    value: "45%",
    label: "Reduction in Broken PTP Default Rates",
    subtext: "Automated SMS/Email reminders & escalation logic",
    badge: "Recovery",
  },
  {
    value: "99.9%",
    label: "Telephony Infrastructure Uptime SLA",
    subtext: "Carrier-grade SIP trunking & WebRTC softphones",
    badge: "Reliability",
  },
  {
    value: "< 48h",
    label: "Rapid Operations Onboarding",
    subtext: "Pre-configured campaign mapping & CSV imports",
    badge: "Velocity",
  },
];

export function StatsStrip() {
  return (
    <section aria-label="Platform performance statistics" className="relative z-10 bg-slate-50/50 py-16 sm:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
              High-Recovery Architecture
            </span>
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl text-h2 text-balance font-bold text-slate-900">
            Engineered for{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              High-Velocity Delinquency
            </span>{" "}
            Operations.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[0.98rem] text-slate-600 text-pretty">
            Built from the ground up to replace fragmented spreadsheets with automated, high-speed recovery workflows.
          </p>
        </motion.div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:mt-16">
          {recoveryMetrics.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-7 shadow-xs transition-all hover:border-blue-500/30 hover:shadow-md sm:p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                    {stat.badge}
                  </span>
                  <div className="h-1 w-6 rounded-full bg-slate-200 transition-all duration-300 group-hover:w-10 group-hover:bg-blue-400" />
                </div>

                <div className="mt-6">
                  <AnimatedValue value={stat.value} delay={0.15 + i * 0.08} />
                </div>

                <h3 className="mt-3 text-[0.92rem] font-bold leading-snug text-slate-900">
                  {stat.label}
                </h3>
              </div>

              <p className="relative z-10 mt-4 border-t border-slate-100 pt-3 text-[0.78rem] leading-relaxed text-slate-500">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
