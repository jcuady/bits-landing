import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

const pains = [
  "Portfolio records split across disparate spreadsheets and legacy tools",
  "Agents dialing manually with low right-party connect rates",
  "Promises-to-pay lost in handoffs — leading to unrecovered revenue",
  "Call recordings and QA scorecards isolated from the account timeline",
] as const;

const scattered = ["Spreadsheets", "Legacy CRM", "Separate Dialer", "Payment CSVs", "QA Sheets"] as const;

const floor = [
  { account: "ACC-10482", work: "PTP due today (₱15,000)", desk: "Auto Loan Queue" },
  { account: "ACC-11209", work: "Broken PTP Alert", desk: "Credit Line D60" },
  { account: "ACC-11342", work: "Restructure Review", desk: "Microfinance East" },
] as const;

export function Problem() {
  return (
    <Section id="problem" className="relative overflow-hidden bg-white pt-10 md:pt-16 lg:pt-20">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />
      
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_78%] opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  The Recovery Gap
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-4 max-w-[20ch] text-balance font-bold leading-[1.08] text-slate-900">
                Collections stall when your dialer, spreadsheets, and payment slips live in{" "}
                <span className="bg-gradient-to-r from-red-600 via-amber-600 to-rose-600 bg-clip-text text-transparent">
                  five different places.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lede mt-5 max-w-[44ch] text-pretty text-slate-600">
                When promises-to-pay are scattered across spreadsheets, up to 34% of broken commitments go unfollowed.
                BITS unifies your accounts, dialer, payments, and QA into one continuous recovery loop.
              </p>
            </Reveal>

            <ol className="mt-10 max-w-[42ch] space-y-2">
              {pains.map((text, i) => (
                <li key={text}>
                  <Reveal delay={0.14 + i * 0.04} y={10}>
                    <div className="group flex gap-4 rounded-xl border border-transparent px-3 py-3.5 transition-colors hover:border-slate-200/60 hover:bg-slate-50/50">
                      <span className="mt-0.5 font-mono text-[0.7rem] font-semibold tracking-widest text-blue-400">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <span className="text-[0.92rem] font-medium leading-relaxed text-slate-700 transition-colors group-hover:text-slate-900">
                        {text}
                      </span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            <Reveal delay={0.32} y={8}>
              <a
                href="#solutions"
                className="group mt-10 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700"
              >
                <span className="relative">
                  See the collections workspace
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} amount={0.2}>
            <figure className="mx-auto w-full max-w-[36rem] lg:max-w-none">
              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-xl shadow-blue-900/5">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 opacity-40">
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                      <div className="size-2.5 rounded-full bg-slate-400" />
                    </div>
                    <div className="h-4 w-px bg-slate-200" />
                    <p className="text-[0.75rem] font-semibold text-slate-700">Collections Queue</p>
                  </div>
                  <span className="relative flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-500">Live</span>
                  </span>
                </div>

                <div className="relative px-5 py-6">
                  <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden />
                  <div className="relative">
                    <p className="text-[0.72rem] font-bold uppercase tracking-widest text-slate-400">Before BITS</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      {scattered.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-[0.78rem] font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-[0.78rem] font-medium text-slate-500">
                      Five disconnected systems, zero shared context.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center py-4" aria-hidden>
                  <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                  <div className="relative flex size-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-sm">
                    &darr;
                  </div>
                </div>

                <div className="bg-slate-50/50 px-5 pb-6 pt-2">
                  <div className="mb-4">
                    <p className="text-[0.72rem] font-bold uppercase tracking-widest text-blue-500">With BITS</p>
                    <p className="mt-1 text-[0.92rem] font-bold text-slate-900">Unified Operations Floor</p>
                  </div>
                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <table className="w-full text-left text-[0.75rem] sm:text-[0.78rem]">
                      <caption className="sr-only">
                        Synthetic collection work unified in one BITS queue
                      </caption>
                      <thead>
                        <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                          <th scope="col" className="px-4 py-3">Account</th>
                          <th scope="col" className="px-4 py-3">Work</th>
                          <th scope="col" className="hidden px-4 py-3 sm:table-cell">Desk</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {floor.map((row) => (
                          <tr key={row.account} className="transition-colors hover:bg-slate-50/50">
                            <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">
                              {row.account}
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              {row.work}
                            </td>
                            <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                              {row.desk}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                Fragmented collection tools collapse into one controlled queue.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
