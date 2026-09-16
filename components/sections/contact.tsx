import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

const nextSteps = [
  {
    index: "01",
    title: "You tell us where the floor slows down",
    copy: "A short conversation about workflows, systems, and constraints.",
  },
  {
    index: "02",
    title: "We map where software helps most",
    copy: "Highest-leverage work first: BPO CRM, finance approvals, or a custom build.",
  },
  {
    index: "03",
    title: "You get a clear recommendation",
    copy: "What to build first, and why. Not a sales deck.",
  },
] as const;

export function Contact() {
  return (
    <Section id="contact" className="overflow-x-hidden bg-cloud">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">Consultation request</p>
              <h2 className="text-h2 mt-4 text-balance leading-[1.08] text-ink lg:max-w-[20ch]">
                Request a consultation for your operations floor.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                BPO CRM, finance approvals, or a custom Harborline-scale build. Send a
                brief. A senior teammate will say what to build first.
              </p>
            </Reveal>

            <ol className="mt-10">
              {nextSteps.map((s, i) => (
                <li key={s.index} className="border-t border-navy-700/10">
                  <Reveal delay={0.04 * i}>
                    <div className="flex gap-4 py-5">
                      <span
                        className="w-7 shrink-0 pt-1 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600"
                        aria-hidden
                      >
                        {s.index}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">
                          {s.title}
                        </h3>
                        <p className="mt-1.5 max-w-[42ch] text-[0.92rem] leading-relaxed text-pretty text-slateblue">
                          {s.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal delay={0.1} amount={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
