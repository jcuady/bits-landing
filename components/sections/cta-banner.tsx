import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function CtaBanner() {
  return (
    <Section id="cta" className="relative overflow-hidden bg-white" tight>
      <Container className="relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-16 sm:rounded-[3rem] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            {/* Decorative grid + glows */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(59,130,246,0.15),rgba(255,255,255,0))]" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" aria-hidden />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[100px]" aria-hidden />

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-300">
                  Ready to Accelerate Collections?
                </span>
              </div>
              <h2 className="mt-2 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white text-balance">
                Accelerate Your Debt Recovery Rates with{" "}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  BITS Collections CRM.
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-[48ch] text-[1.05rem] leading-relaxed text-slate-300 text-pretty">
                Book a tailored walkthrough with our recovery workflow architects, or test the
                predictive dialer and automated PTP engine on your actual accounts.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <a
                    href="#contact"
                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-900/40 active:scale-[0.98] sm:w-auto"
                  >
                    Request Live Walkthrough
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="#pricing"
                    className="flex h-14 w-full items-center justify-center rounded-full bg-white/10 px-8 font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-[0.98] sm:w-auto"
                  >
                    See Pricing & Plans
                  </a>
                </Magnetic>
              </div>

              {/* Friction-reducer reassurance */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[0.78rem] font-medium text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-400">✓</span> BSP & NPC DPA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-400">✓</span> 14-Day Free Pilot
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-400">✓</span> Rapid Setup &lt; 48 Hours
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
