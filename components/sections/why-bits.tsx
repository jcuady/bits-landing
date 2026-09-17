import Image from "next/image";
import { principles } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

const ctaClass =
  "group mt-8 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

const brief = [
  { facet: "Core", generic: "Required", bits: "Collections" },
  { facet: "Engagement", generic: "Optional", bits: "Messaging + Dialer" },
  { facet: "Oversight", generic: "Optional", bits: "QA + Live Assist" },
  { facet: "Visibility", generic: "Configured", bits: "Reporting" },
] as const;

export function WhyBits() {
  return (
    <Section id="about" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_62%] opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Mix · Match · Expand
                </span>
              </div>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
                Build the stack around your operation.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Not every team works the same way. Enable the collections
                capabilities you need and expand as your operation grows.
              </p>
              <a href="#contact" className={ctaClass}>
                <span className="relative">
                  Build Your Configuration
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </Reveal>

            <ol className="mt-12 max-w-[36rem] space-y-4">
              {principles.map((p, i) => (
                <li key={p.name} className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200/60 hover:bg-slate-50/50">
                  <Reveal delay={0.05 + i * 0.05}>
                    <div className="flex gap-5">
                      <span
                        className="mt-1 font-mono text-[0.8rem] font-semibold tracking-widest text-blue-400"
                        aria-hidden
                      >
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.1rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                          {p.name}
                        </h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">
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
                      <p className="truncate text-[0.68rem] font-medium text-slate-500">Collections Operations · Module View</p>
                    </div>
                  </div>
                  <span className="relative flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                    </span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-500">Live</span>
                  </span>
                </div>
                <div className="overflow-x-auto overscroll-x-contain p-2">
                  <table className="w-full min-w-[20rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                    <caption className="sr-only">
                      Example BITS modular configuration
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Facet</th>
                        <th scope="col" className="px-4 py-3">Inclusion</th>
                        <th scope="col" className="px-4 py-3">Module</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {brief.map((row) => (
                        <tr key={row.facet} className="transition-colors hover:bg-slate-50/50">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-4 py-3 font-medium text-slate-900"
                          >
                            {row.facet}
                          </th>
                          <td className="px-4 py-3 text-slate-600">{row.generic}</td>
                          <td className="px-4 py-3 font-medium text-slate-900">{row.bits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <figcaption className="sr-only">
                Example configuration showing required and optional BITS modules.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
