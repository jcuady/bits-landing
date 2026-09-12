import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

const nextSteps = [
  {
    title: "You tell us where operations hurt",
    copy: "A short conversation about workflows, systems and constraints.",
  },
  {
    title: "We map where technology helps most",
    copy: "We identify the highest-leverage opportunities, honestly and without padding.",
  },
  {
    title: "You get a clear recommendation",
    copy: "A concrete proposal for what to build first, and why. Not a sales deck.",
  },
];

export function Contact() {
  return (
    <Section id="contact" className="bg-cloud">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">Contact</p>
              <h2 className="text-h2 mt-5 max-w-[16ch] text-balance text-ink">
                Start a conversation.
              </h2>
              <p className="text-lede mt-6 max-w-[50ch] text-pretty text-slateblue">
                Whether you need a CRM built around your contact center, a controlled
                financial workflow, or an AI agent ecosystem, the first step is the same.
              </p>
            </Reveal>

            <ol className="mt-10 space-y-0">
              {nextSteps.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={0.1 + i * 0.06} y={14}>
                    <div className="flex gap-5 border-l border-navy-700/12 pb-8 pl-6 last:pb-0">
                      <span
                        className="-ml-[33px] mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-electric-600 text-[0.7rem] font-bold text-white"
                        aria-hidden
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-[1rem] font-semibold tracking-[-0.01em] text-ink">
                          {s.title}
                        </h3>
                        <p className="mt-1 text-[0.88rem] leading-relaxed text-slateblue">
                          {s.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal delay={0.12} amount={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
