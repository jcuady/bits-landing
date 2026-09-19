import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <Section id="contact" className="scroll-mt-28 bg-cloud">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-20">
          <Reveal>
            <p className="text-overline text-electric-600">Contact</p>
            <h2 className="text-h2 mt-4 max-w-[16ch] text-balance leading-[1.08] text-ink">
              Write to the BITS team.
            </h2>
            <p className="text-lede mt-5 max-w-[42ch] text-pretty text-slateblue">
              Tell us how you run portfolios, follow-up, and quality. We read every
              inquiry and reply to the email you give us.
            </p>

            <a
              href={`mailto:${site.inquiryEmail}`}
              className="mt-8 inline-block text-[1.15rem] font-semibold tracking-[-0.02em] text-electric-600 underline decoration-electric-600/25 underline-offset-4 transition-colors duration-200 [@media(hover:hover)_and_(pointer:fine)]:hover:text-electric-500"
            >
              {site.inquiryEmail}
            </a>

            <dl className="mt-10 max-w-[42ch] border-t border-linelight pt-8">
              <div>
                <dt className="text-[0.85rem] font-semibold text-ink">What happens next</dt>
                <dd className="mt-2 text-[0.92rem] leading-relaxed text-slateblue">
                  We map the note to Core Collections, messaging, dialer, QA, or
                  BITSagent, then reply with next steps. No free trials or unpaid pilots.
                </dd>
              </div>
              <div className="mt-6">
                <dt className="text-[0.85rem] font-semibold text-ink">Reply time</dt>
                <dd className="mt-2 text-[0.92rem] leading-relaxed text-slateblue">
                  Usually within one business day.
                </dd>
              </div>
            </dl>
          </Reveal>

          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
