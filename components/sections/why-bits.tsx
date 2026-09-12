import { principles } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function WhyBits() {
  return (
    <Section id="about" className="bg-cloud">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
          <div>
            <SectionHeading
              title="Built differently because every operation is different."
              lede="Off-the-shelf software assumes your operation looks like everyone else's. BITS starts from how yours actually works."
            />
          </div>

          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.name}>
                <Reveal delay={i * 0.07}>
                  <div className="border-t-2 border-navy-700/15 pt-6">
                    <span
                      className="text-[0.78rem] font-bold tracking-[0.18em] text-electric-600"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-3 text-[1.3rem] font-bold tracking-[-0.015em] text-ink">
                      {p.name}
                    </h3>
                    <p className="mt-2.5 text-[0.94rem] leading-relaxed text-slateblue">{p.copy}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
