import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const HERO_LANDSCAPE = "/brand/hero-landscape.svg";

export function Cta() {
  return (
    <Section id="cta" className="overflow-x-hidden bg-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_LANDSCAPE}
          alt=""
          fill
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_40%] opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/78 via-white/70 to-white" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal>
            <p className="text-overline text-electric-600">BPO · Finance · Custom software</p>
            <h2 className="text-h2 mt-4 max-w-5xl text-balance leading-[1.08] text-ink">
              Book a consultation for BPO CRM and operations software.
            </h2>
            <p className="text-lede mx-auto mt-5 max-w-[46ch] text-pretty text-slateblue">
              Harborline-scale tickets, Voltgrid approvals, or a custom build. Tell us
              where the floor slows down. We will say what to build first.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 flex justify-center sm:mt-9">
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
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
