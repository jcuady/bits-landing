import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

const pains = [
  "Fragmented workflows spread across disconnected tools",
  "Repetitive manual work that consumes skilled people",
  "Poor visibility into what operations are actually doing",
  "Data trapped across platforms that never agree",
] as const;

const scattered = ["Spreadsheets", "Legacy CRM", "Ticketing", "Chat apps", "Reports"] as const;

const floor = [
  { account: "Elise Navarro", work: "Invoice exception", desk: "Harborline" },
  { account: "Priya Sundaram", work: "KYC follow-up", desk: "Voltgrid" },
  { account: "Leo Santos", work: "Ticket 4182", desk: "Brightpath" },
] as const;

export function Problem() {
  return (
    <Section id="problem" className="overflow-x-hidden bg-cloud pt-10 md:pt-16 lg:pt-20">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_78%] opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cloud via-cloud/80 to-cloud" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">BPO · Finance · Enterprise operations</p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="text-h2 mt-4 max-w-[16ch] text-balance leading-[1.08] text-ink">
                Complex operations should not require disconnected systems.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lede mt-5 max-w-[42ch] text-pretty text-slateblue">
                Most organizations do not have a technology problem. They have a
                fragmentation problem: five tools, seven versions of the truth,
                held together by hand.
              </p>
            </Reveal>

            <ol className="mt-8 max-w-[42ch]">
              {pains.map((text, i) => (
                <li key={text}>
                  <Reveal delay={0.14 + i * 0.04} y={10}>
                    <div className="flex gap-4 border-t border-linelight/90 py-3.5 first:border-t-0">
                      <span className="w-6 shrink-0 pt-0.5 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[0.92rem] font-medium leading-snug text-ink/90">
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
                className="group mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700"
              >
                See how BITS unifies the floor
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.12} amount={0.2}>
            <figure className="mx-auto w-full max-w-[36rem] lg:max-w-none">
              <div className="rounded-[1.75rem] bg-white/45 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-white/70 sm:rounded-[2rem] sm:p-2">
                <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
                  <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-[0.82rem] font-semibold text-ink">Demo</p>
                      <p className="truncate text-[0.72rem] text-slateblue">
                        Floor queue · Harborline desk
                      </p>
                    </div>
                    <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
                      Live
                    </span>
                  </div>

                  <div className="relative px-4 py-4 sm:px-5 sm:py-5">
                    <div className="bg-grid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden />
                    <div className="relative">
                      <p className="text-[0.72rem] font-semibold text-slateblue">Today</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {scattered.map((tool) => (
                          <span
                            key={tool}
                            className="rounded-full border border-dashed border-navy-700/20 bg-cloud/80 px-3.5 py-2 text-[0.78rem] font-medium text-slateblue"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-[0.78rem] text-slateblue">
                        Five systems, seven versions of the truth.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center py-2" aria-hidden>
                    <span className="absolute inset-x-5 top-1/2 h-px bg-linelight" />
                    <span className="relative flex size-9 items-center justify-center rounded-full bg-skywash text-electric-600 ring-1 ring-white">
                      <ArrowDown className="size-3.5" />
                    </span>
                  </div>

                  <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[0.72rem] font-semibold text-electric-600">With BITS</p>
                        <p className="text-[0.92rem] font-semibold text-ink">One floor queue</p>
                      </div>
                    </div>
                    <div className="overflow-x-auto overscroll-x-contain">
                      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                        <caption className="sr-only">
                          Harborline, Voltgrid, and Brightpath work unified in one BITS queue
                        </caption>
                        <thead>
                          <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
                            <th scope="col" className="py-2 pr-3 font-semibold">
                              Account
                            </th>
                            <th scope="col" className="py-2 pr-3 font-semibold">
                              Work
                            </th>
                            <th scope="col" className="hidden py-2 font-semibold sm:table-cell">
                              Desk
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {floor.map((row) => (
                            <tr key={row.account} className="border-b border-linelight/80 last:border-0">
                              <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">
                                {row.account}
                              </td>
                              <td className="max-w-[10rem] truncate py-2.5 text-slateblue sm:max-w-none">
                                {row.work}
                              </td>
                              <td className="hidden py-2.5 text-slateblue sm:table-cell">
                                {row.desk}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                Fragmented tools collapse into a single BITS floor queue. Decorative mock.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
