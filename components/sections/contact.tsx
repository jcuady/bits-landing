import { site } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <Section id="contact" className="scroll-mt-28 bg-slate-50">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white px-4 py-1.5 backdrop-blur-md shadow-xs">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Technical Consultation
              </span>
            </div>

            <h2 className="text-h2 text-balance font-bold leading-[1.08] text-slate-900">
              Let&apos;s Design Technology Around Your Operation.
            </h2>
            <p className="text-lede mt-5 max-w-[44ch] text-pretty text-slate-600">
              Tell us how you manage accounts, customer outreach, and floor quality today. Our solutions architects will review your workflows and prepare a concrete technical blueprint.
            </p>

            <a
              href={`mailto:${site.inquiryEmail}`}
              className="mt-6 inline-flex min-h-[44px] items-center text-base font-bold text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700"
            >
              {site.inquiryEmail}
            </a>

            <dl className="mt-10 max-w-[42ch] space-y-6 border-t border-slate-200 pt-8">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  What Happens Next
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                  We review your team size and operational challenge, map an architecture proposal across BITScrm, AI operations, and custom integrations, and schedule an operational briefing.
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Turnaround SLA
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                  You will receive a dedicated response within one business day.
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
