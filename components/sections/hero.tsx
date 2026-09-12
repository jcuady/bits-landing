import Image from "next/image";
import { ArrowRight, Bot, Check, CircleCheck, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const overlineItems = ["Secure", "Scalable", "Human-centered"];
const microItems = ["Custom systems", "Enterprise workflows", "AI automation"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Controlled illumination + gridwork */}
      <div className="bg-grid-dark pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="glow-electric pointer-events-none absolute -top-40 right-[-10%] h-[42rem] w-[42rem]"
        aria-hidden
      />
      <div
        className="glow-signal pointer-events-none absolute bottom-[-30%] left-[-12%] h-[36rem] w-[36rem]"
        aria-hidden
      />
      <Image
        src="/brand/mark.png"
        alt=""
        aria-hidden
        width={640}
        height={553}
        className="pointer-events-none absolute -right-24 top-1/2 hidden w-[34rem] -translate-y-1/2 opacity-[0.05] lg:block"
      />

      <Container className="relative">
        <div className="grid items-center gap-14 pb-20 pt-28 md:pt-32 lg:min-h-[100dvh] lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:pb-24 lg:pt-24">
          {/* Copy */}
          <div className="max-w-2xl">
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-overline text-signal-300">
                {overlineItems.map((item, i) => (
                  <span key={item} className="flex items-center gap-4">
                    {i > 0 && <span className="h-3 w-px bg-white/25" aria-hidden />}
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display mt-7 text-white">
                Technology
                <br />
                <span className="text-gradient-brand">Without Limits.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-lede mt-7 max-w-[54ch] text-pretty text-mist">
                BITS builds secure, scalable technology for organizations ready to operate
                smarter: BPO CRM platforms, financial systems, and AI-powered workflows.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild size="lg">
                  <a href="#contact">
                    Book a Consultation
                    <ArrowRight aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="ghostDark" size="lg">
                  <a href="#solutions">Explore Our Solutions</a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] font-medium tracking-[0.06em] text-white/60 uppercase">
                {microItems.map((item, i) => (
                  <span key={item} className="flex items-center gap-4">
                    {i > 0 && <span className="h-3 w-px bg-white/20" aria-hidden />}
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          {/* Product ecosystem composition (real mini-UI, sample data) */}
          <div className="relative lg:h-[560px]">
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              aria-hidden
              fill="none"
            >
              <path
                d="M60 400 C 140 360, 180 300, 250 260"
                stroke="rgb(0 166 255 / 0.3)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />
              <path
                d="M330 120 C 400 140, 430 180, 452 210"
                stroke="rgb(0 166 255 / 0.3)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />
            </svg>

            <div className="flex flex-col gap-5 lg:static lg:block">
              {/* CRM fragment */}
              <Reveal delay={0.2} amount={0.15} className="lg:absolute lg:left-0 lg:top-16 lg:w-[25rem]">
                <div className="shadow-panel rounded-2xl border border-white/10 bg-navy-800/70 backdrop-blur-md">
                  <div className="flex items-center gap-2 border-b border-white/[0.07] px-5 py-3.5">
                    <span className="size-2 rounded-full bg-white/15" aria-hidden />
                    <span className="size-2 rounded-full bg-white/15" aria-hidden />
                    <span className="size-2 rounded-full bg-signal-500/70" aria-hidden />
                    <span className="ml-3 text-[0.72rem] font-semibold tracking-[0.14em] text-white/55 uppercase">
                      BITS CRM · Operations
                    </span>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-3.5">
                      <span
                        className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-signal-500 text-[0.8rem] font-bold text-white"
                        aria-hidden
                      >
                        NL
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[0.92rem] font-semibold text-white">
                          Northgate Logistics
                        </p>
                        <p className="text-[0.76rem] text-mist">Enterprise · Premium support</p>
                      </div>
                      <span className="ml-auto rounded-full border border-signal-500/30 bg-signal-500/10 px-2.5 py-1 text-[0.68rem] font-semibold text-signal-300">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { k: "Open tickets", v: "12" },
                        { k: "Avg. response", v: "1:42" },
                        { k: "QA score", v: "94" },
                      ].map((s) => (
                        <div
                          key={s.k}
                          className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5"
                        >
                          <p className="text-[1.05rem] font-bold tracking-tight text-white">{s.v}</p>
                          <p className="mt-0.5 text-[0.64rem] font-medium tracking-wide text-mist uppercase">
                            {s.k}
                          </p>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2">
                      {[
                        { t: "Billing dispute review", s: "In review", tone: "text-electric-400 border-electric-500/30 bg-electric-500/10" },
                        { t: "Onboarding call summary", s: "Open", tone: "text-signal-300 border-signal-500/30 bg-signal-500/10" },
                        { t: "SLA exception request", s: "Escalated", tone: "text-white/80 border-white/25 bg-white/[0.07]" },
                      ].map((row) => (
                        <li
                          key={row.t}
                          className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5"
                        >
                          <span className="truncate text-[0.82rem] text-white/80">{row.t}</span>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[0.64rem] font-semibold ${row.tone}`}
                          >
                            {row.s}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>

              {/* AI agent fragment */}
              <Reveal delay={0.34} amount={0.15} className="lg:absolute lg:right-0 lg:top-0 lg:w-[17rem]">
                <div className="shadow-panel rounded-2xl border border-white/10 bg-navy-850/80 backdrop-blur-md">
                  <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-4 py-3">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-electric-600/25 text-signal-300">
                      <Bot className="size-4" aria-hidden />
                    </span>
                    <span className="text-[0.8rem] font-semibold text-white">AI Agent</span>
                    <span className="ml-auto flex items-center gap-1.5 text-[0.66rem] font-medium text-signal-300">
                      <span className="relative flex size-1.5" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal-500 opacity-60" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-signal-500" />
                      </span>
                      Drafting
                    </span>
                  </div>
                  <div className="space-y-2.5 p-4">
                    <div className="space-y-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
                      <span className="block h-1.5 w-11/12 rounded-full bg-white/15" aria-hidden />
                      <span className="block h-1.5 w-4/5 rounded-full bg-white/15" aria-hidden />
                      <span className="block h-1.5 w-3/5 rounded-full bg-signal-500/40" aria-hidden />
                    </div>
                    <div className="flex gap-2">
                      <span className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-electric-600 text-[0.72rem] font-semibold text-white">
                        <Check className="size-3.5" aria-hidden /> Approve
                      </span>
                      <span className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/15 text-[0.72rem] font-semibold text-white/75">
                        <Headset className="size-3.5" aria-hidden /> Escalate
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Workflow fragment */}
              <Reveal delay={0.46} amount={0.15} className="lg:absolute lg:bottom-0 lg:right-10 lg:w-[19rem]">
                <div className="shadow-panel rounded-2xl border border-white/10 bg-navy-800/70 p-4 backdrop-blur-md">
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-white/50 uppercase">
                    Approval workflow
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {["Details verified", "Manager review", "Complete"].map((step, i) => (
                      <li key={step} className="flex items-center gap-2.5">
                        <CircleCheck
                          className={`size-4 ${i < 2 ? "text-signal-500" : "text-white/25"}`}
                          aria-hidden
                        />
                        <span
                          className={`text-[0.8rem] ${i < 2 ? "text-white/85" : "text-white/45"}`}
                        >
                          {step}
                        </span>
                        {i === 1 && (
                          <span className="ml-auto rounded-full bg-electric-600/20 px-2 py-0.5 text-[0.62rem] font-semibold text-electric-400">
                            Current
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>

      {/* Transition edge into the light body */}
      <div
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-signal-500/50 to-transparent"
        aria-hidden
      />
    </section>
  );
}
