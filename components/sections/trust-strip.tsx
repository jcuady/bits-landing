import { Building2, HeartHandshake, Layers, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const statements = [
  { icon: Layers, label: "Built for complex operations" },
  { icon: TrendingUp, label: "Designed for scale" },
  { icon: HeartHandshake, label: "Human-centered automation" },
  { icon: Building2, label: "Enterprise-focused engineering" },
];

export function TrustStrip() {
  return (
    <section aria-label="Positioning" className="border-b border-linelight bg-white">
      <Container>
        <Reveal y={14}>
          <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {statements.map((s) => (
              <li
                key={s.label}
                className="flex items-center gap-3.5 border-b border-linelight py-6 last:border-b-0 sm:border-b-0 lg:justify-center lg:border-l lg:first:border-l-0"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-skywash text-electric-600">
                  <s.icon className="size-[1.15rem]" aria-hidden />
                </span>
                <span className="text-[0.92rem] font-semibold tracking-[-0.005em] text-navy-800">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
