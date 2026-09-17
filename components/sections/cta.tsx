import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

export function Cta() {
  return (
    <Section id="cta" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_40%] opacity-40 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_0%,rgba(255,255,255,0.7),rgba(255,255,255,1))]" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <Reveal>
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                See your collections workflow in BITS
              </span>
            </div>
            <h2 className="text-h2 mt-4 max-w-5xl text-balance font-bold leading-[1.08] text-slate-900">
              Request a demo of the collections operations platform.
            </h2>
            <p className="text-lede mx-auto mt-6 max-w-[46ch] text-pretty text-slate-600">
              Tell us about your portfolios, campaigns, communication providers,
              supervision model, and deployment requirements.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10 flex justify-center sm:mt-12">
              <Magnetic className="w-full sm:w-auto">
                <a
                  href="#contact"
                  className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-8 font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-900/20 sm:w-auto"
                >
                  Request a Demo
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
