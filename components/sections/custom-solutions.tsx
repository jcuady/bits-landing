import { ArrowRight, Plus } from "lucide-react";
import { capabilities } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function CustomSolutions() {
  return (
    <Section id="custom" className="bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2 className="text-h2 max-w-[18ch] text-balance text-ink">
                Your operation should not have to fit someone else's software.
              </h2>
              <p className="text-lede mt-6 max-w-[52ch] text-pretty text-slateblue">
                Flagship platforms are the starting point, not the boundary. When your
                operation needs something purpose-built, BITS designs and engineers it
                around your workflows, your data and your constraints.
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary">
                  <a href="#contact">
                    Describe your project
                    <ArrowRight aria-hidden />
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <li key={c}>
                <Reveal delay={(i % 2) * 0.05 + Math.floor(i / 2) * 0.03} y={14} className="h-full">
                  <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-linelight bg-cloud/50 px-5 py-4 transition-all duration-300 hover:border-electric-600/30 hover:bg-skywash/60">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-electric-600 shadow-sm transition-colors duration-300 group-hover:bg-electric-600 group-hover:text-white">
                      <Plus className="size-4" aria-hidden />
                    </span>
                    <span className="text-[0.95rem] font-semibold tracking-[-0.005em] text-navy-800">
                      {c}
                    </span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
