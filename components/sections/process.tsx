import { ArrowRight } from "lucide-react";
import { processSteps } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

const plan = [
  { phase: "Discover", window: "Week 1–2", focus: "Floor walk, queue map" },
  { phase: "Design", window: "Week 3–5", focus: "Tickets, QA, exceptions" },
  { phase: "Build", window: "Week 6–11", focus: "Increments on the floor" },
  { phase: "Evolve", window: "After go-live", focus: "Improve with the desk" },
] as const;

export function Process() {
  return (
    <Section id="process" className="overflow-x-hidden bg-cloud">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">Delivery · Partnership</p>
              <h2 className="text-h2 mt-4 text-balance leading-[1.08] text-ink lg:max-w-[22ch]">
                How BITS delivers custom operations software.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                Four phases, one engagement. Harborline sees working software on the
                floor early, then we keep the platform moving after go-live.
              </p>
              <a href="#contact" className={ctaClass}>
                Book a consultation
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure>
              <div className="rounded-[1.75rem] bg-white/70 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-navy-700/10 sm:rounded-[2rem] sm:p-2">
                <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
                  <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-[0.82rem] font-semibold text-ink">Engagement plan</p>
                      <p className="truncate text-[0.72rem] text-slateblue">
                        Harborline · sample timeline
                      </p>
                    </div>
                    <span className="hidden rounded-full border border-navy-700/10 bg-cloud px-2.5 py-1 text-[0.68rem] font-semibold text-slateblue sm:inline">
                      Sample
                    </span>
                  </div>
                  <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
                    <table className="w-full table-fixed text-left text-[0.75rem] sm:text-[0.78rem]">
                      <colgroup>
                        <col className="w-[28%]" />
                        <col className="w-[30%]" />
                        <col />
                      </colgroup>
                      <caption className="sr-only">
                        Sample Harborline delivery timeline across discover, design, build, and evolve
                      </caption>
                      <thead>
                        <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Phase
                          </th>
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Window
                          </th>
                          <th scope="col" className="py-2 font-semibold">
                            Focus
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {plan.map((row) => (
                          <tr key={row.phase} className="border-b border-linelight/80 last:border-0">
                            <th scope="row" className="py-2.5 pr-3 font-medium text-ink">
                              {row.phase}
                            </th>
                            <td className="py-2.5 pr-3 tabular-nums text-slateblue">{row.window}</td>
                            <td className="py-2.5 text-slateblue">{row.focus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <figcaption className="mt-3 text-[0.78rem] leading-relaxed text-slateblue">
                Sample Harborline timeline. Timing is set with your floor.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="mt-14 grid sm:grid-flow-col sm:grid-rows-2 sm:gap-x-12 lg:mt-16">
          {processSteps.map((step, i) => (
            <li key={step.name} className="border-t border-navy-700/10">
              <Reveal delay={0.04 * i}>
                <div className="flex gap-4 py-5">
                  <span
                    className="w-7 shrink-0 pt-1 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600"
                    aria-hidden
                  >
                    {step.index}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">
                      {step.name}
                    </h3>
                    <p className="mt-1.5 max-w-[42ch] text-[0.92rem] leading-relaxed text-pretty text-slateblue">
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
