import Image from "next/image";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-navy-950">
      <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="glow-electric pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[54rem] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <Image
        src="/brand/mark.png"
        alt=""
        aria-hidden
        width={640}
        height={553}
        className="pointer-events-none absolute -left-28 top-1/2 w-[30rem] -translate-y-1/2 opacity-[0.07]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl py-24 text-center md:py-32">
          <Reveal>
            <h2 className="text-h2 text-balance text-white">
              What could your business do{" "}
              <span className="text-gradient-brand">without limits?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lede mx-auto mt-6 max-w-[52ch] text-pretty text-mist">
              Tell us where your operation is slowing down. We will help determine what
              technology should do next.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href="#contact">
                  Book a Consultation
                  <ArrowRight aria-hidden />
                </a>
              </Button>
              <Button asChild variant="ghostDark" size="lg">
                <a href="#contact">
                  <MessageSquare aria-hidden />
                  Tell Us About Your Project
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
