import { Bot, Database, Headset, ShieldCheck, User } from "lucide-react";
import { agents } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 py-1" aria-hidden>
      <span className="h-6 w-px bg-gradient-to-b from-white/15 to-signal-500/50" />
      <span className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-1 text-[0.66rem] font-semibold tracking-[0.14em] text-mist uppercase">
        {label}
      </span>
      <span className="h-6 w-px bg-gradient-to-b from-signal-500/50 to-white/15" />
    </div>
  );
}

export function AiEcosystem() {
  return (
    <Section id="automation" className="bg-cloud">
      <Container>
        <SectionHeading
          eyebrow="AI agent ecosystem"
          title="From software to intelligent operations."
          lede="AI should augment people and operations, not merely replace them. BITS designs agent ecosystems where machines handle the routine and people keep the judgment."
        />

        <Reveal className="mt-14" amount={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-navy-800/60 bg-gradient-to-b from-navy-900 to-navy-850 shadow-lift">
            <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden />
            <div
              className="glow-signal pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2"
              aria-hidden
            />

            <div className="relative mx-auto max-w-4xl px-5 py-10 sm:px-10 sm:py-14">
              {/* Customer */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/[0.07] text-signal-300">
                    <User className="size-4.5" aria-hidden />
                  </span>
                  <h3 className="text-[1rem] font-semibold text-white">Customer</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Voice", "Chat", "Email", "Social"].map((c) => (
                    <span
                      key={c}
                      className="rounded-md border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[0.76rem] font-medium text-white/75"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <Connector label="One interaction layer" />

              {/* AI + Human interaction layer */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-electric-500/30 bg-electric-600/[0.12] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-electric-600/30 text-signal-300">
                      <Bot className="size-4.5" aria-hidden />
                    </span>
                    <h3 className="text-[1rem] font-semibold text-white">AI agents</h3>
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-mist">
                    Resolve routine work instantly, draft responses, and prepare context.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-white/[0.07] text-signal-300">
                      <Headset className="size-4.5" aria-hidden />
                    </span>
                    <h3 className="text-[1rem] font-semibold text-white">Your team</h3>
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-mist">
                    Handle nuance, judgment and exceptions, with AI-prepared context at hand.
                  </p>
                </div>
              </div>

              <Connector label="Orchestrated by" />

              {/* Specialized agents */}
              <ul className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                {agents.map((a) => (
                  <li
                    key={a.name}
                    className="rounded-xl border border-white/10 bg-navy-800/60 p-4 transition-colors duration-300 hover:border-signal-500/40"
                  >
                    <p className="text-[0.82rem] font-semibold leading-snug text-white">{a.name}</p>
                    <p className="mt-2 text-[0.72rem] leading-relaxed text-mist">{a.role}</p>
                  </li>
                ))}
              </ul>

              <Connector label="Grounded in" />

              {/* Platform */}
              <div className="rounded-2xl border border-signal-500/25 bg-gradient-to-r from-navy-800 to-navy-700 p-5">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-lg bg-signal-500/15 text-signal-300">
                      <Database className="size-4.5" aria-hidden />
                    </span>
                    <h3 className="text-[1rem] font-semibold text-white">BITS Platform · CRM</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:ml-auto">
                    {["Business data", "Permissions", "Audit trail"].map((c) => (
                      <span
                        key={c}
                        className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[0.72rem] font-medium text-white/80"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Connector label="Overseen by" />

              {/* Human oversight */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/[0.07] text-signal-300">
                    <ShieldCheck className="size-4.5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[1rem] font-semibold text-white">Human team · Supervisors</h3>
                    <p className="mt-1 text-[0.85rem] text-mist">
                      Review, approve and guide every sensitive workflow. Escalation is designed in, not bolted on.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
