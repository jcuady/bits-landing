import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { principles } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

const ctaClass =
  "group mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

const brief = [
  { facet: "Built for", generic: "Sales pipeline", bits: "Contact-center floor" },
  { facet: "Primary record", generic: "Leads and deals", bits: "Tickets, QA, history" },
  { facet: "Oversight", generic: "Manager dashboard", bits: "People on exceptions" },
  { facet: "Change", generic: "You adapt to the product", bits: "Designed around the desk" },
] as const;

export function WhyBits() {
  return (
    <Section id="about" className="overflow-x-hidden bg-cloud">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_62%] opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cloud via-cloud/82 to-cloud" />
      </div>

      <Container className="relative">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">
                Understand · Design · Build · Evolve
              </p>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance leading-[1.08] text-ink">
                Custom operations software for BPO and finance floors.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                Off-the-shelf CRM assumes a sales pipeline. Harborline, Voltgrid,
                and desks like yours run tickets, approvals, and exceptions. BITS
                starts there.
              </p>
              <a href="#contact" className={ctaClass}>
                Book a consultation
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>

            <ol className="mt-10 max-w-[36rem]">
              {principles.map((p, i) => (
                <li key={p.name} className="border-t border-linelight/90 first:border-t-0">
                  <Reveal delay={0.05 + i * 0.05}>
                    <div className="flex gap-4 py-4">
                      <span
                        className="w-7 shrink-0 pt-0.5 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-[0.92rem] leading-relaxed text-slateblue">
                          {p.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal delay={0.12} className="lg:sticky lg:top-28">
            <figure>
              <div className="rounded-[1.75rem] bg-white/45 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-white/70 sm:rounded-[2rem] sm:p-2">
                <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
                  <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-[0.82rem] font-semibold text-ink">Engagement brief</p>
                      <p className="truncate text-[0.72rem] text-slateblue">
                        Harborline · discovery
                      </p>
                    </div>
                    <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
                      Live
                    </span>
                  </div>
                  <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
                    <table className="w-full min-w-[20rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                      <caption className="sr-only">
                        Generic sales CRM compared with BITS operations software
                      </caption>
                      <thead>
                        <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Facet
                          </th>
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Generic CRM
                          </th>
                          <th scope="col" className="py-2 font-semibold">
                            BITS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {brief.map((row) => (
                          <tr key={row.facet} className="border-b border-linelight/80 last:border-0">
                            <th
                              scope="row"
                              className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink"
                            >
                              {row.facet}
                            </th>
                            <td className="py-2.5 pr-3 text-slateblue">{row.generic}</td>
                            <td className="py-2.5 font-medium text-ink">{row.bits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                Side-by-side comparison of generic CRM and BITS for Harborline discovery.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
