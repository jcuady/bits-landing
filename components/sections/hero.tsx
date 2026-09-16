import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { HeroProduct } from "@/components/sections/hero-product";

/**
 * Atmosphere plate. SVG ships as a layout-true placeholder.
 * Swap to "/brand/hero-landscape.png" after generating from
 * public/brand/hero-landscape.prompt.txt
 */
const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

const proof = ["Human oversight on AI", "Role-based access", "Built for high-volume floors"];

export function Hero() {
  return (
    <section className="relative overflow-x-hidden bg-cloud">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_42%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cloud/55 via-cloud/25 to-cloud" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[100dvh] flex-col pb-10 pt-24 sm:pb-14 sm:pt-28 md:pt-[6.5rem] lg:pb-16">
          <div className="mx-auto max-w-5xl px-1 pt-4 text-center sm:pt-8 lg:pt-10">
            <Reveal y={16}>
              <p className="text-overline text-electric-600">BPO · Finance · Enterprise operations</p>
            </Reveal>

            <Reveal delay={0.06} y={18}>
              <h1 className="text-display mt-5 max-w-5xl text-balance leading-[1.08] text-ink">
                Technology without limits
                <br className="hidden sm:block" />
                {" "}
                for teams that run at volume.
              </h1>
            </Reveal>

            <Reveal delay={0.12} y={14}>
              <p className="text-lede mx-auto mt-5 max-w-[46ch] text-pretty text-slateblue">
                CRM, automation, and AI designed around contact-center and finance
                floors — not generic sales software.
              </p>
            </Reveal>

            <Reveal delay={0.18} y={12}>
              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-9 sm:flex-row sm:items-center">
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="group h-12 min-h-12 w-full rounded-full pr-2 pl-6 sm:h-[3.25rem] sm:min-h-[3.25rem] sm:w-auto"
                  >
                    <a href="#contact">
                      Book a consultation
                      <span
                        className="flex size-9 items-center justify-center rounded-full bg-white/20 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                        aria-hidden
                      >
                        <ArrowRight className="size-4" />
                      </span>
                    </a>
                  </Button>
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <Button
                    asChild
                    variant="secondary"
                    size="lg"
                    className="h-12 min-h-12 w-full rounded-full bg-white/80 sm:h-[3.25rem] sm:min-h-[3.25rem] sm:w-auto"
                  >
                    <a href="#solutions">Explore solutions</a>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal delay={0.24} y={10}>
              <ul className="mx-auto mt-7 flex max-w-xl flex-col items-center gap-2 text-[0.82rem] font-medium text-slateblue sm:mt-8 sm:flex-row sm:justify-center sm:gap-0">
                {proof.map((item, i) => (
                  <li key={item} className="flex items-center gap-3">
                    {i > 0 ? (
                      <span className="hidden h-3 w-px bg-navy-700/15 sm:mx-4 sm:block" aria-hidden />
                    ) : null}
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={28} amount={0.15} className="mt-10 flex flex-1 items-end sm:mt-12 lg:mt-14">
            <HeroProduct />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
