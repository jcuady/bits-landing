import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

export function CtaBanner() {
  return (
    <Section id="cta" className="relative overflow-hidden bg-white" tight>
      <Container className="relative z-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-linelight bg-cloud px-6 py-16 sm:rounded-[3rem] sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
              <p className="text-overline text-electric-600">Request a scoped walkthrough</p>
              <h2 className="text-h2 mt-4 text-balance text-ink">
                See BITS collections workflows on your operation.
              </h2>
              <p className="text-lede mx-auto mt-6 max-w-[48ch] text-pretty text-slateblue">
                Book a demonstration of the workspace, dialer, and BITSagent configuration.
                No free trials or unpaid pilots.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Magnetic>
                  <a
                    href="#contact"
                    className="inline-flex h-14 min-h-12 items-center justify-center rounded-full bg-electric-600 px-8 font-semibold text-white transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-electric-500"
                  >
                    Request a Demo
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href="#pricing"
                    className="inline-flex h-14 min-h-12 items-center justify-center rounded-full border border-navy-700/20 bg-white px-8 font-semibold text-navy-700 transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-skywash"
                  >
                    See packaging
                  </a>
                </Magnetic>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
