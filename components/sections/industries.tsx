import { ArrowUpRight } from "lucide-react";
import { industries } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Industries() {
  return (
    <Section id="industries" className="bg-white">
      <Container>
        <SectionHeading
          title="Focused on the operations we know best."
          lede="BITS goes deep rather than wide. Each industry engagement starts from real operational workflows, not a generic template."
        />

        <div className="mt-14 border-t border-linelight">
          {industries.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 0.06} amount={0.2}>
              <a
                href="#contact"
                className="group grid gap-4 border-b border-linelight py-9 transition-colors duration-300 hover:bg-cloud/70 sm:py-11 lg:grid-cols-[5rem_1fr_auto] lg:items-center lg:gap-10 lg:px-6"
              >
                <span
                  className="select-none text-[2.5rem] font-extrabold leading-none tracking-tighter text-navy-700/15 transition-colors duration-300 group-hover:text-electric-600/40"
                  aria-hidden
                >
                  {ind.index}
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-h3 text-ink">{ind.name}</h3>
                  <p className="mt-3 text-[1rem] leading-relaxed text-slateblue">{ind.copy}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${ind.name} focus areas`}>
                    {ind.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-md border border-linelight bg-white px-2.5 py-1 text-[0.74rem] font-medium text-slateblue"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <span
                  className="hidden size-12 items-center justify-center rounded-full border border-linelight text-navy-700 transition-all duration-300 group-hover:border-electric-600 group-hover:bg-electric-600 group-hover:text-white lg:flex"
                  aria-hidden
                >
                  <ArrowUpRight className="size-5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
