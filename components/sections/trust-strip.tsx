import { Building2, HeartHandshake, Layers, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const statements = [
  { icon: Layers, label: "Built for complex operations" },
  { icon: TrendingUp, label: "Designed for scale" },
  { icon: HeartHandshake, label: "Human-centered automation" },
  { icon: Building2, label: "Enterprise-focused engineering" },
] as const;

export function TrustStrip() {
  return (
    <section aria-label="Positioning" className="relative z-10 -mt-2 bg-cloud pb-2 sm:-mt-4">
      <Container>
        <Reveal y={12}>
          <div className="rounded-[1.5rem] bg-white/55 p-1.5 shadow-[0_16px_40px_-24px_rgb(6_22_47/0.28)] ring-1 ring-white/80 sm:rounded-[1.75rem]">
            <ul className="grid grid-cols-1 overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-white sm:grid-cols-2 lg:grid-cols-4 lg:rounded-[calc(1.75rem-0.375rem)]">
              {statements.map((s) => (
                <li
                  key={s.label}
                  className="flex min-h-14 items-center gap-3 border-b border-linelight px-4 py-4 last:border-b-0 sm:min-h-16 sm:justify-center sm:border-b-0 sm:px-5 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(-n+2)]:border-b lg:border-b-0 lg:border-r lg:[&:nth-child(-n+2)]:border-b-0 lg:last:border-r-0"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-skywash text-electric-600">
                    <s.icon className="size-[1.05rem]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="text-[0.88rem] font-semibold tracking-[-0.01em] text-ink sm:text-[0.9rem]">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
