import { processSteps } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-8 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

const plan = [
  { phase: "Import", window: "Portfolio", focus: "Validate and match" },
  { phase: "Configure", window: "Campaign", focus: "Rules and queues" },
  { phase: "Route", window: "Agent", focus: "Account and next action" },
  { phase: "Review", window: "Supervisor", focus: "Quality and outcomes" },
] as const;

export function Process() {
  return (
    <Section id="process" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Import · configure · route · improve
                </span>
              </div>
              <h2 className="text-h2 mt-4 text-balance font-bold leading-[1.08] text-slate-900 lg:max-w-[22ch]">
                How BITS Works.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Follow one connected operating loop from portfolio import through
                campaign configuration, agent action, and management review.
              </p>
              <a href="#contact" className={ctaClass}>
                <span className="relative">
                  Request a Demo
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure>
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-xl shadow-blue-900/5">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-40">
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <div>
                      <p className="text-[0.75rem] font-semibold text-slate-700">Operations cycle</p>
                      <p className="truncate text-[0.68rem] font-medium text-slate-500">Enterprise Operations · Standard Cycle</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-slate-500 shadow-sm">
                    Sample
                  </span>
                </div>
                <div className="overflow-x-auto overscroll-x-contain p-2">
                  <table className="w-full table-fixed text-left text-[0.75rem] sm:text-[0.78rem]">
                    <colgroup>
                      <col className="w-[28%]" />
                      <col className="w-[30%]" />
                      <col />
                    </colgroup>
                    <caption className="sr-only">
                      Synthetic collections operations cycle
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Phase</th>
                        <th scope="col" className="px-4 py-3">Scope</th>
                        <th scope="col" className="px-4 py-3">Focus</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {plan.map((row) => (
                        <tr key={row.phase} className="transition-colors hover:bg-slate-50/50">
                          <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                            {row.phase}
                          </th>
                          <td className="px-4 py-3 text-slate-600">{row.window}</td>
                          <td className="px-4 py-3 text-slate-600">{row.focus}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <figcaption className="mt-4 text-[0.78rem] font-medium text-slate-500">
                Example operating flow. Configuration is set with your team.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="mt-14 grid sm:grid-cols-2 sm:gap-x-12 sm:gap-y-4 lg:mt-20">
          {processSteps.map((step, i) => (
            <li key={step.name} className={`group rounded-2xl border border-transparent p-5 transition-colors hover:border-slate-200/60 hover:bg-slate-50/50 ${i === 4 ? "sm:col-span-2" : ""}`}>
              <Reveal delay={0.04 * i}>
                <div className="flex gap-5">
                  <span
                    className="mt-1 font-mono text-[0.8rem] font-semibold tracking-widest text-blue-400"
                    aria-hidden
                  >
                    {step.index}.
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.1rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                      {step.name}
                    </h3>
                    <p className="mt-2 max-w-[42ch] text-[0.95rem] leading-relaxed text-pretty text-slate-600">
                      {step.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
              {i < processSteps.length - 1 ? <span className="sr-only">then</span> : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
