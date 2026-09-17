import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

const nextSteps = [
  {
    index: "01",
    title: "Tell us about your operation",
    copy: "Share team size, campaigns, communication needs, and deployment constraints.",
  },
  {
    index: "02",
    title: "We map the right configuration",
    copy: "Core Collections first, then the modules and controls your workflow requires.",
  },
  {
    index: "03",
    title: "See the relevant product workflow",
    copy: "A focused demo using synthetic collections data, not a generic sales deck.",
  },
] as const;

export function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden bg-slate-50">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
                <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                  Product demo request
                </span>
              </div>
              <h2 className="text-h2 mt-4 text-balance font-bold leading-[1.08] text-slate-900 lg:max-w-[20ch]">
                Request a demo for your collections operation.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Tell us how your teams manage portfolios, follow-up, communications,
                quality, and reporting. We will tailor the walkthrough to your operation.
              </p>
            </Reveal>

            <ol className="mt-12 space-y-2">
              {nextSteps.map((s, i) => (
                <li key={s.index} className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200/60 hover:bg-white/60">
                  <Reveal delay={0.04 * i}>
                    <div className="flex gap-4">
                      <span
                        className="w-7 shrink-0 pt-1 font-mono text-[0.75rem] font-semibold tracking-widest text-blue-400"
                        aria-hidden
                      >
                        {s.index}.
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-[1.05rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                          {s.title}
                        </h3>
                        <p className="mt-2 max-w-[42ch] text-[0.92rem] leading-relaxed text-pretty text-slate-500">
                          {s.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>

            {/* Response SLA + alternatives */}
            <Reveal delay={0.2}>
              <div className="mt-10 space-y-4 rounded-[1.5rem] border border-slate-200/60 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                    <span className="font-mono text-[10px] font-bold text-blue-600">24</span>
                  </div>
                  <p className="text-[0.88rem] font-medium text-slate-700">
                    We typically reply within <strong className="text-slate-900">24 hours</strong>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                    <span className="font-bold text-blue-600 text-[12px]">&rarr;</span>
                  </div>
                  <p className="text-[0.88rem] text-slate-600">
                    Prefer to schedule directly?{" "}
                    <a href="#contact" className="font-bold text-blue-600 underline decoration-blue-600/30 underline-offset-2 transition-colors hover:text-blue-700">
                      Book a time
                    </a>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
                    <span className="font-bold text-blue-600 text-[10px]">@</span>
                  </div>
                  <p className="text-[0.88rem] text-slate-600">
                    Or email us at{" "}
                    <a href="mailto:demo@bits.ph" className="font-bold text-blue-600 hover:text-blue-700">
                      demo@bits.ph
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} amount={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-b from-blue-500/5 to-transparent opacity-50 blur-2xl" aria-hidden />
              <div className="relative rounded-[2rem] border border-slate-200/60 bg-white shadow-xl shadow-blue-900/5 p-2 sm:p-3">
                <div className="overflow-hidden rounded-[calc(2rem-0.5rem)] sm:rounded-[calc(2rem-0.75rem)] border border-slate-100 bg-white">
                  <ContactForm />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
