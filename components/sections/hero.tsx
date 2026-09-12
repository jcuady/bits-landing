import Image from "next/image";
import { ArrowRight, Bot, Check, CircleCheck, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const overlineItems = ["Secure", "Scalable", "Human-centered"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Soft light atmosphere: restrained grid + tinted glow */}
      <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-45" aria-hidden />
      <div
        className="pointer-events-none absolute -top-32 right-[-8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(0_123_255/0.12),transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-20%] left-[-10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgb(0_166_255/0.08),transparent_70%)]"
        aria-hidden
      />
      <Image
        src="/brand/mark.png"
        alt=""
        aria-hidden
        width={640}
        height={553}
        className="pointer-events-none absolute -right-20 top-1/2 hidden w-[30rem] -translate-y-1/2 opacity-[0.04] lg:block"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 pb-16 pt-24 md:pt-28 lg:min-h-[100dvh] lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:pb-20 lg:pt-24">
          {/* Copy - max 4 text elements: overline, headline, lede, CTAs */}
          <div className="max-w-xl">
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-overline text-electric-600">
                {overlineItems.map((item, i) => (
                  <span key={item} className="flex items-center gap-4">
                    {i > 0 && <span className="h-3 w-px bg-navy-700/20" aria-hidden />}
                    {item}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display mt-6 text-balance text-ink">
                Technology
                <br />
                <span className="text-gradient-brand">Without Limits.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-lede mt-6 max-w-[42ch] text-pretty text-slateblue">
                Secure, scalable systems for BPOs, financial teams, and enterprises ready
                to operate smarter.
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
                <Button asChild variant="secondary" size="lg">
                  <a href="#solutions">Explore Our Solutions</a>
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Product ecosystem - light Soft UI cards */}
          <div className="relative lg:h-[540px]">
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              aria-hidden
              fill="none"
            >
              <path
                d="M70 390 C 150 350, 190 290, 260 250"
                stroke="rgb(10 43 111 / 0.14)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />
              <path
                d="M340 110 C 400 130, 430 170, 450 200"
                stroke="rgb(0 123 255 / 0.22)"
                strokeWidth="1.5"
                strokeDasharray="5 6"
              />
            </svg>

            <div className="flex flex-col gap-5 lg:static lg:block">
              {/* CRM fragment */}
              <Reveal delay={0.18} amount={0.15} className="lg:absolute lg:left-0 lg:top-14 lg:w-[25.5rem]">
                <div className="rounded-2xl border border-linelight bg-white shadow-[0_1px_2px_rgb(6_22_47/0.04),0_24px_48px_-20px_rgb(6_22_47/0.18)]">
                  <div className="flex items-center gap-2 border-b border-linelight bg-cloud/80 px-5 py-3.5">
                    <span className="size-2 rounded-full bg-navy-700/15" aria-hidden />
                    <span className="size-2 rounded-full bg-navy-700/15" aria-hidden />
                    <span className="size-2 rounded-full bg-electric-500/70" aria-hidden />
                    <span className="ml-3 text-[0.72rem] font-semibold tracking-[0.14em] text-slateblue uppercase">
                      BITS CRM - Operations
                    </span>
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center gap-3.5">
                      <span
                        className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-navy-700 to-electric-600 text-[0.8rem] font-bold text-white"
                        aria-hidden
                      >
                        NL
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[0.92rem] font-semibold text-ink">
                          Northgate Logistics
                        </p>
                        <p className="text-[0.76rem] text-slateblue">Enterprise - Premium support</p>
                      </div>
                      <span className="ml-auto rounded-full border border-electric-600/25 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600">
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
                          className="rounded-xl border border-linelight bg-cloud/70 px-3 py-2.5"
                        >
                          <p className="text-[1.05rem] font-bold tracking-tight text-ink tabular-nums">
                            {s.v}
                          </p>
                          <p className="mt-0.5 text-[0.64rem] font-medium tracking-wide text-slateblue uppercase">
                            {s.k}
                          </p>
                        </div>
                      ))}
                    </div>

                    <ul className="space-y-2">
                      {[
                        {
                          t: "Billing dispute review",
                          s: "In review",
                          tone: "text-electric-600 border-electric-600/25 bg-electric-600/[0.06]",
                        },
                        {
                          t: "Onboarding call summary",
                          s: "Open",
                          tone: "text-navy-700 border-signal-500/30 bg-skywash",
                        },
                        {
                          t: "SLA exception request",
                          s: "Escalated",
                          tone: "text-slateblue border-navy-700/15 bg-navy-700/[0.04]",
                        },
                      ].map((row) => (
                        <li
                          key={row.t}
                          className="flex items-center justify-between gap-3 rounded-xl border border-linelight bg-white px-3.5 py-2.5"
                        >
                          <span className="truncate text-[0.82rem] text-ink/85">{row.t}</span>
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
              <Reveal delay={0.3} amount={0.15} className="lg:absolute lg:right-0 lg:top-0 lg:w-[17rem]">
                <div className="rounded-2xl border border-electric-600/20 bg-white shadow-[0_1px_2px_rgb(6_22_47/0.04),0_20px_40px_-16px_rgb(0_99_219/0.22)]">
                  <div className="flex items-center gap-2.5 border-b border-linelight px-4 py-3">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-skywash text-electric-600">
                      <Bot className="size-4" aria-hidden />
                    </span>
                    <span className="text-[0.8rem] font-semibold text-ink">AI Agent</span>
                    <span className="ml-auto flex items-center gap-1.5 text-[0.66rem] font-medium text-electric-600">
                      <span className="relative flex size-1.5" aria-hidden>
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-500 opacity-50" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-electric-500" />
                      </span>
                      Drafting
                    </span>
                  </div>
                  <div className="space-y-2.5 p-4">
                    <div className="space-y-1.5 rounded-xl border border-linelight bg-cloud/80 p-3">
                      <span className="block h-1.5 w-11/12 rounded-full bg-navy-700/12" aria-hidden />
                      <span className="block h-1.5 w-4/5 rounded-full bg-navy-700/12" aria-hidden />
                      <span className="block h-1.5 w-3/5 rounded-full bg-electric-500/35" aria-hidden />
                    </div>
                    <div className="flex gap-2">
                      <span className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg bg-electric-600 text-[0.72rem] font-semibold text-white">
                        <Check className="size-3.5" aria-hidden /> Approve
                      </span>
                      <span className="flex h-8 flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-700/15 text-[0.72rem] font-semibold text-navy-700">
                        <Headset className="size-3.5" aria-hidden /> Escalate
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Workflow fragment */}
              <Reveal delay={0.4} amount={0.15} className="lg:absolute lg:bottom-2 lg:right-8 lg:w-[19rem]">
                <div className="rounded-2xl border border-linelight bg-white p-4 shadow-[0_1px_2px_rgb(6_22_47/0.04),0_18px_36px_-16px_rgb(6_22_47/0.16)]">
                  <p className="text-[0.68rem] font-semibold tracking-[0.14em] text-slateblue uppercase">
                    Approval workflow
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {["Details verified", "Manager review", "Complete"].map((step, i) => (
                      <li key={step} className="flex items-center gap-2.5">
                        <CircleCheck
                          className={`size-4 ${i < 2 ? "text-electric-600" : "text-navy-700/20"}`}
                          aria-hidden
                        />
                        <span
                          className={`text-[0.8rem] ${i < 2 ? "text-ink/85" : "text-slateblue/60"}`}
                        >
                          {step}
                        </span>
                        {i === 1 && (
                          <span className="ml-auto rounded-full bg-skywash px-2 py-0.5 text-[0.62rem] font-semibold text-electric-600">
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

      <div className="absolute inset-x-0 bottom-0 h-px bg-linelight" aria-hidden />
    </section>
  );
}
