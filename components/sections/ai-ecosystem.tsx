import { agents } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const steps = [
  "Start with Core Collections for portfolios, accounts, queues, PTP, and reporting",
  "Add Messaging for configured providers, templates, blasts, and history",
  "Enable Quality Assurance for scorecards, evaluations, and worklists",
  "Add Dialer + Live Assist when calling and supervision are required",
] as const;

const queue = [
  { item: "Core Collections", route: "Required", state: "Enabled" },
  { item: "Messaging", route: "Optional", state: "Configured" },
  { item: "Quality Assurance", route: "Optional", state: "Enabled" },
  { item: "Dialer + Live Assist", route: "Optional", state: "Available" },
] as const;

const ctaClass =
  "group mt-8 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

export function AiEcosystem() {
  return (
    <Section id="modules" className="relative overflow-hidden bg-slate-50">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
                <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Modular by design
                </span>
              </div>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
                Start with what your operation needs.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Build your operational stack around your team&apos;s workflow,
                communication requirements, and supervision model. Not every
                deployment includes every module.
              </p>
            </Reveal>

            <ol className="mt-12 max-w-[46ch] space-y-2">
              {steps.map((text, i) => (
                <li key={text} className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200/60 hover:bg-white/60">
                  <Reveal delay={0.08 + i * 0.04} y={10}>
                    <div className="flex gap-4 items-center">
                      <span className="font-mono text-[0.75rem] font-semibold tracking-widest text-blue-400">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-[0.92rem] font-bold leading-snug text-slate-700 transition-colors group-hover:text-blue-600">
                        {text}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.28} y={8}>
              <a href="#contact" className={ctaClass}>
                <span className="relative">
                  Build Your Configuration
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} amount={0.2}>
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
                      <p className="text-[0.75rem] font-semibold text-slate-700">Module configuration</p>
                      <p className="truncate text-[0.68rem] font-medium text-slate-500">
                        Enterprise Operations · supported deployment
                      </p>
                    </div>
                  </div>
                  <span className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 shadow-sm">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-500">Live</span>
                  </span>
                </div>
                
                <div className="overflow-x-auto overscroll-x-contain p-2">
                  <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                    <caption className="sr-only">
                      Optional BITS modules in a synthetic configuration
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Module</th>
                        <th scope="col" className="hidden px-4 py-3 sm:table-cell">Inclusion</th>
                        <th scope="col" className="px-4 py-3">State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {queue.map((row) => (
                        <tr key={row.item} className="transition-colors hover:bg-slate-50/50">
                          <td className="max-w-[12rem] truncate px-4 py-3 font-bold text-slate-900 sm:max-w-none">
                            {row.item}
                          </td>
                          <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">{row.route}</td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.state}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <ul className="divide-y divide-slate-100 border-t border-slate-100 p-2">
                  {agents.map((a) => (
                    <li
                      key={a.name}
                      className="px-4 py-3 transition-colors hover:bg-slate-50/50 rounded-xl"
                    >
                      <p className="text-[0.85rem] font-bold text-slate-900">{a.name}</p>
                      <p className="mt-1 text-[0.8rem] leading-snug text-slate-500">{a.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="sr-only">
                A synthetic BITS configuration showing optional collections modules.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
