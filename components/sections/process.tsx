"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

export function Process() {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  return (
    <Section id="process" className="bg-cloud">
      <Container>
        <SectionHeading
          title="A delivery process built for operational reality."
          lede="Four phases, one continuous partnership. You see working software early, and the platform keeps improving after launch."
        />

        <div ref={ref} className="relative mt-16">
          {/* Progress line: horizontal on desktop, vertical on mobile */}
          <div
            className="absolute left-[7px] top-2 bottom-2 w-px bg-navy-700/12 lg:left-0 lg:right-0 lg:top-[7px] lg:h-px lg:w-auto lg:bottom-auto"
            aria-hidden
          >
            <motion.span
              className="block h-full w-full origin-top bg-gradient-to-b from-electric-600 to-signal-500 lg:origin-left lg:bg-gradient-to-r"
              style={reduce ? { scaleY: 1, scaleX: 1 } : { scaleY: progress, scaleX: progress }}
            />
          </div>

          <ol className="grid gap-10 pl-10 lg:grid-cols-4 lg:gap-8 lg:pl-0">
            {processSteps.map((step, i) => (
              <li key={step.name} className="relative">
                <span
                  className="absolute -left-10 top-0 flex size-[15px] items-center justify-center lg:left-0 lg:-top-0"
                  aria-hidden
                >
                  <span className="absolute size-[15px] rounded-full border-2 border-electric-600/40 bg-cloud" />
                  <span className="relative size-[5px] rounded-full bg-electric-600" />
                </span>
                <div className="lg:pt-9">
                  <span
                    className="text-[0.78rem] font-bold tracking-[0.18em] text-electric-600"
                    aria-hidden
                  >
                    {step.index}
                  </span>
                  <h3 className="mt-2.5 text-[1.35rem] font-bold tracking-[-0.015em] text-ink">
                    {step.name}
                  </h3>
                  <p className="mt-2.5 max-w-[38ch] text-[0.94rem] leading-relaxed text-slateblue">
                    {step.copy}
                  </p>
                </div>
                {i < processSteps.length - 1 && <span className="sr-only">then</span>}
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
