import { featureGridItems } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function FeaturesGrid() {
  return (
    <Section id="features" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />
      
      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                Core Platform
              </span>
            </div>
            <h2 className="text-h2 mt-4 text-balance font-bold text-slate-900">
              Everything You Need to Grow and{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Scale</span>
            </h2>
            <p className="text-lede mx-auto mt-6 max-w-[55ch] text-pretty text-slate-600">
              BITS brings account management, agent workflows, customer engagement,
              quality assurance, reporting, and operational controls into one
              role-based workspace.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-8">
          {featureGridItems.map((item, i) => {
            const index = (i + 1).toString().padStart(2, "0");
            return (
              <Reveal key={item.title} delay={0.04 + i * 0.08} y={20}>
                <div className="group relative h-full rounded-[2rem] bg-gradient-to-b from-slate-200/50 to-transparent p-[1px] transition-all hover:from-blue-500/20">
                  <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(2rem-1px)] bg-white p-8 transition-colors">
                    {/* Hover Glow */}
                    <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-1 flex-col">
                      <div className="mb-8 flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold tracking-widest text-slate-400/80">
                          {index}.
                        </span>
                        <div className="h-[1px] w-12 bg-slate-200 transition-all duration-300 group-hover:w-24 group-hover:bg-blue-200" />
                      </div>
                      
                      <h3 className="text-xl font-bold tracking-tight text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-[0.95rem] leading-relaxed text-slate-600">
                        {item.description}
                      </p>
                      
                      <ul className="mt-8 flex-1 space-y-3 border-t border-slate-100 pt-6">
                        {item.features.map((f, j) => (
                          <li
                            key={f}
                            className="flex items-center gap-3 text-[0.85rem] font-medium text-slate-700"
                          >
                            <span className="relative flex size-1.5 items-center justify-center">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-100 opacity-0 transition-all duration-300 group-hover:animate-ping group-hover:opacity-100"></span>
                              <span className="relative inline-flex size-1.5 rounded-full bg-slate-300 transition-colors duration-300 group-hover:bg-blue-500"></span>
                            </span>
                            <span className="transition-colors duration-300 group-hover:text-slate-900">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
