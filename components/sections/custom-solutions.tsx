import { capabilities } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-8 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

const scope = [
  { work: "Accounts.csv", origin: "Mapped · validated" },
  { work: "Payments.csv", origin: "Matched · reviewed" },
  { work: "Queue Alpha", origin: "Campaign import" },
  { work: "Recovery East", origin: "Reusable template" },
] as const;

export function CustomSolutions() {
  return (
    <Section id="custom" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Import · validate · match
                </span>
              </div>
              <h2 className="text-h2 mt-4 text-balance font-bold leading-[1.08] text-slate-900 lg:max-w-[22ch]">
                Move Portfolio Data Into Action.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Bring campaigns, accounts, payments, and operational data into
                BITS through controlled import and validation workflows.
              </p>
              <a href="#contact" className={ctaClass}>
                <span className="relative">
                  Discuss Your Data
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
                      <p className="text-[0.75rem] font-semibold text-slate-700">Import activity</p>
                      <p className="truncate text-[0.68rem] font-medium text-slate-500">Operations Queue · synthetic</p>
                    </div>
                  </div>
                  <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-widest text-slate-500 shadow-sm">
                    Scope
                  </span>
                </div>
                <div className="overflow-x-auto overscroll-x-contain p-2">
                  <table className="w-full table-fixed text-left text-[0.75rem] sm:text-[0.78rem]">
                    <colgroup>
                      <col className="w-[42%]" />
                      <col />
                    </colgroup>
                    <caption className="sr-only">
                      Synthetic portfolio import activity
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Source</th>
                        <th scope="col" className="px-4 py-3">Origin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {scope.map((row) => (
                        <tr key={row.work} className="transition-colors hover:bg-slate-50/50">
                          <th scope="row" className="px-4 py-3 font-medium text-slate-900">
                            {row.work}
                          </th>
                          <td className="px-4 py-3 text-slate-600">{row.origin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <figcaption className="sr-only">
                Synthetic portfolio data moving through controlled import workflows.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="mt-14 grid sm:grid-flow-col sm:grid-rows-5 sm:gap-x-12 sm:gap-y-2 lg:mt-20">
          {capabilities.map((c, i) => (
            <li key={c} className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200/60 hover:bg-slate-50/50">
              <Reveal delay={0.03 * (i % 5)}>
                <div className="flex gap-4 items-center">
                  <span
                    className="font-mono text-[0.75rem] font-semibold tracking-widest text-blue-400"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <span className="text-[0.98rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">{c}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <p className="mt-12 max-w-[62ch] border-l-2 border-blue-500/40 pl-4 text-[0.88rem] leading-relaxed text-slate-500">
            Assigned skip-trace and field-visit worklists can extend account activity
            beyond the desk. BITS does not currently claim a complete native mobile or PWA product.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
