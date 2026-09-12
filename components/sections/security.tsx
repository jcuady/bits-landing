import {
  Database,
  FileSearch,
  KeyRound,
  LockKeyhole,
  PlugZap,
  RefreshCcw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { securityPrinciples } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const icons = {
  key: KeyRound,
  lock: LockKeyhole,
  shield: ShieldCheck,
  audit: FileSearch,
  database: Database,
  plug: PlugZap,
  human: UserCheck,
  resilient: RefreshCcw,
} as const;

export function Security() {
  return (
    <Section id="security" className="bg-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.5fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="flex size-12 items-center justify-center rounded-2xl bg-navy-800 text-signal-300">
                <ShieldCheck className="size-6" aria-hidden />
              </span>
              <h2 className="text-h2 mt-7 max-w-[16ch] text-balance text-ink">
                Innovation means little without trust.
              </h2>
              <p className="text-lede mt-6 max-w-[48ch] text-pretty text-slateblue">
                Security is not a feature layer at BITS. It is how systems are designed,
                reviewed and operated from the first conversation.
              </p>
              <p className="mt-5 border-l-2 border-electric-600/40 pl-4 text-[0.88rem] leading-relaxed text-slateblue">
                Practices are applied per engagement and documented with your team. We do
                not claim certifications we do not hold.
              </p>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {securityPrinciples.map((sp, i) => {
              const Icon = icons[sp.icon as keyof typeof icons];
              return (
                <li key={sp.name}>
                  <Reveal delay={(i % 2) * 0.06 + Math.floor(i / 2) * 0.03} y={14} className="h-full">
                    <div className="h-full rounded-2xl border border-linelight bg-cloud/60 p-6 transition-colors duration-300 hover:border-electric-600/30 hover:bg-skywash/50">
                      <span className="flex size-10 items-center justify-center rounded-xl border border-linelight bg-white text-navy-700">
                        <Icon className="size-[1.1rem]" aria-hidden />
                      </span>
                      <h3 className="mt-4 text-[1rem] font-semibold tracking-[-0.01em] text-ink">
                        {sp.name}
                      </h3>
                      <p className="mt-1.5 text-[0.87rem] leading-relaxed text-slateblue">
                        {sp.copy}
                      </p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
