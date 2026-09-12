import { ArrowDown, EyeOff, Repeat, Split, DatabaseZap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const pains = [
  { icon: Split, text: "Fragmented workflows spread across disconnected tools" },
  { icon: Repeat, text: "Repetitive manual work that consumes skilled people" },
  { icon: EyeOff, text: "Poor visibility into what operations are actually doing" },
  { icon: DatabaseZap, text: "Data trapped across platforms that never agree" },
];

const scattered = ["Spreadsheets", "Legacy CRM", "Ticketing", "Chat apps", "Reports"];

export function Problem() {
  return (
    <Section id="problem" className="bg-cloud">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <h2 className="text-h2 max-w-[18ch] text-balance text-ink">
                Complex operations should not require disconnected systems.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-lede mt-6 max-w-[56ch] text-pretty text-slateblue">
                Most organizations do not have a technology problem. They have a
                fragmentation problem: five tools holding seven versions of the truth,
                held together by manual effort.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 max-w-[56ch] text-[1rem] leading-relaxed text-slateblue">
                As volume grows, the cracks widen. Customer experiences become
                inconsistent, reporting lags behind reality, and systems that once
                worked start refusing to scale.
              </p>
            </Reveal>

            <ul className="mt-9 space-y-1">
              {pains.map((p, i) => (
                <li key={p.text}>
                  <Reveal delay={0.18 + i * 0.05} y={12}>
                    <div className="flex items-center gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-white">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-linelight bg-white text-navy-700">
                        <p.icon className="size-4" aria-hidden />
                      </span>
                      <span className="text-[0.95rem] font-medium text-ink/85">{p.text}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          {/* Fragmentation to unification diagram */}
          <Reveal delay={0.15} amount={0.2}>
            <div className="relative rounded-3xl border border-linelight bg-white p-6 shadow-card sm:p-8">
              <div className="bg-grid-light pointer-events-none absolute inset-0 rounded-3xl opacity-70" aria-hidden />
              <div className="relative">
                <p className="text-overline text-slateblue/70">Today</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {scattered.map((tool, i) => (
                    <span
                      key={tool}
                      className={`rounded-lg border border-dashed border-navy-700/25 bg-cloud px-3.5 py-2 text-[0.8rem] font-medium text-slateblue ${
                        i % 2 === 1 ? "translate-y-1" : ""
                      }`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[0.78rem] text-slateblue/70">
                  Five systems, seven versions of the truth.
                </p>

                <div className="my-7 flex flex-col items-center gap-2" aria-hidden>
                  <span className="h-8 w-px bg-gradient-to-b from-navy-700/20 to-electric-500/60" />
                  <span className="flex size-9 items-center justify-center rounded-full border border-electric-500/30 bg-skywash text-electric-600">
                    <ArrowDown className="size-4" />
                  </span>
                  <span className="h-8 w-px bg-gradient-to-b from-electric-500/60 to-electric-600/80" />
                </div>

                <div className="rounded-2xl border border-electric-600/25 bg-gradient-to-br from-navy-800 to-navy-700 p-5 shadow-lift sm:p-6">
                  <p className="text-overline text-signal-300">With BITS</p>
                  <p className="mt-2.5 text-[1.05rem] font-semibold tracking-[-0.01em] text-white">
                    One operational platform, designed around your workflows.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Customers", "Agents", "Tickets", "QA", "Reporting"].map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[0.72rem] font-medium text-white/80"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
