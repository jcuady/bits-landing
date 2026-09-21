import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ArrowRight, Sparkles } from "lucide-react";

export function CtaBanner() {
  return (
    <Section id="cta" className="relative overflow-hidden bg-white" tight>
      <Container className="relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-blue-400/30 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 px-6 py-16 text-white shadow-2xl shadow-blue-600/20 sm:rounded-[3rem] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            {/* Ambient background architectural patterns */}
            <div className="pointer-events-none absolute inset-0 opacity-15" aria-hidden>
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute right-0 top-0 size-96 rounded-full bg-white/20 blur-3xl" />
            </div>

            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mb-4 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="size-3.5 text-cyan-200" />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white">
                  Your Business · Your Workflow · Your Technology
                </span>
              </div>

              <h2 className="text-display font-bold tracking-tight text-white">
                Technology built around the way your business actually operates.
              </h2>

              <p className="text-lede mx-auto mt-6 max-w-[50ch] text-pretty text-blue-50">
                Stop compromising your floor processes with generic off-the-shelf software.
                Schedule an architectural blueprint consultation with our engineering team today.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <Link
                    href="/#contact"
                    className="group inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-white px-8 text-sm font-bold text-blue-700 shadow-lg shadow-black/10 transition-all hover:bg-blue-50 active:scale-[0.98]"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/#solutions"
                    className="inline-flex h-14 items-center justify-center rounded-full border border-white/40 bg-white/10 px-8 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  >
                    Explore Solution Tiers
                  </Link>
                </Magnetic>
              </div>

              <p className="mt-6 text-xs text-blue-100/80">
                Direct consultation with solutions architects · Zero sales spam · Mutual NDA supported
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
