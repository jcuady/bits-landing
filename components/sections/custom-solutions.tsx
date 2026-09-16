import { ArrowRight } from "lucide-react";
import { capabilities } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

const scope = [
  { work: "Tickets & QA", origin: "Flagship CRM" },
  { work: "Contract-rate lookup", origin: "Custom · billing policy" },
  { work: "Finance export", origin: "Custom · controller desk" },
  { work: "Slack bridge", origin: "Integration" },
] as const;

export function CustomSolutions() {
  return (
    <Section id="custom" className="overflow-x-hidden bg-white">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">Custom build · Integration</p>
              <h2 className="text-h2 mt-4 text-balance leading-[1.08] text-ink lg:max-w-[22ch]">
                Custom operations software, built around your floor.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                When the flagship CRM is not enough, Harborline may need a contract-rate
                lookup, and Voltgrid may need a controller export. BITS designs that work
                around your workflows, data, and constraints — not the other way around.
              </p>
              <a href="#contact" className={ctaClass}>
                Describe your project
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure>
              <div className="rounded-[1.75rem] bg-cloud/80 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-navy-700/10 sm:rounded-[2rem] sm:p-2">
                <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
                  <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-[0.82rem] font-semibold text-ink">Build scope</p>
                      <p className="truncate text-[0.72rem] text-slateblue">
                        Harborline · custom engagement
                      </p>
                    </div>
                    <span className="hidden rounded-full border border-navy-700/10 bg-cloud px-2.5 py-1 text-[0.68rem] font-semibold text-slateblue sm:inline">
                      Scope
                    </span>
                  </div>
                  <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
                    <table className="w-full table-fixed text-left text-[0.75rem] sm:text-[0.78rem]">
                      <colgroup>
                        <col className="w-[42%]" />
                        <col />
                      </colgroup>
                      <caption className="sr-only">
                        Harborline custom build scope beside flagship CRM
                      </caption>
                      <thead>
                        <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Work
                          </th>
                          <th scope="col" className="py-2 font-semibold">
                            Origin
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scope.map((row) => (
                          <tr key={row.work} className="border-b border-linelight/80 last:border-0">
                            <th
                              scope="row"
                              className="py-2.5 pr-3 font-medium text-ink"
                            >
                              {row.work}
                            </th>
                            <td className="py-2.5 text-slateblue">{row.origin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                Custom Harborline work sits beside the flagship CRM, not in a separate stack.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="mt-14 grid sm:grid-flow-col sm:grid-rows-5 sm:gap-x-12 lg:mt-16">
          {capabilities.map((c, i) => (
            <li key={c} className="border-t border-linelight/90">
              <Reveal delay={0.03 * (i % 5)}>
                <div className="flex gap-4 py-3.5">
                  <span
                    className="w-7 shrink-0 pt-0.5 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.98rem] font-semibold tracking-[-0.01em] text-ink">{c}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
