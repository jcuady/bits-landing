import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function CtaBanner() {
  return (
    <Section id="cta" className="relative overflow-hidden bg-white" tight>
      <Container className="relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-900/40 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-6 py-16 text-white shadow-2xl shadow-blue-950/20 sm:rounded-[3rem] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            {/* Ambient background architectural patterns */}
            <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden>
              <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute right-0 top-0 size-96 rounded-full bg-blue-500/20 blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-400" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-300">
                  Your Business · Your Workflow · Your Technology
                </span>
              </div>

              <h2 className="text-h2 font-bold tracking-tight text-white">
                Technology built around the way your business actually operates.
              </h2>

              <p className="text-lede mx-auto mt-6 max-w-[50ch] text-pretty text-slate-300">
                Stop compromising your floor processes with generic off-the-shelf software.
                Schedule an architectural blueprint consultation with our engineering team today.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <Link
                    href="/#contact"
                    className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-blue-500 px-8 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-600 hover:shadow-blue-500/40 active:scale-[0.98]"
                  >
                    <span>Book a Consultation</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/#solutions"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 px-8 text-sm font-bold text-slate-200 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    Explore Solution Tiers
                  </Link>
                </Magnetic>
              </div>

              <p className="mt-6 text-xs text-slate-400">
                Direct consultation with solutions architects · Zero sales spam · NDA supported
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
