import { ArrowRight, Bot, Check, Landmark, Users } from "lucide-react";
import { solutions } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

const cardIcons = {
  "bpo-crm": Users,
  financial: Landmark,
  "ai-automation": Bot,
} as const;

function CrmPreview() {
  const bars = [42, 66, 52, 78, 60, 88, 71];
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-linelight bg-cloud shadow-card"
      aria-hidden
    >
      <div className="flex items-center gap-2 border-b border-linelight bg-white px-4 py-3">
        <span className="size-2 rounded-full bg-navy-700/15" />
        <span className="size-2 rounded-full bg-navy-700/15" />
        <span className="size-2 rounded-full bg-electric-500/60" />
        <span className="ml-2 text-[0.68rem] font-semibold tracking-[0.14em] text-slateblue uppercase">
          BITS CRM · Dashboard
        </span>
      </div>
      <div className="grid grid-cols-[3.4rem_1fr]">
        <div className="flex flex-col items-center gap-2.5 border-r border-linelight bg-white py-4">
          <span className="size-7 rounded-lg bg-gradient-to-br from-navy-700 to-electric-600" />
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`h-5 w-7 rounded-md ${i === 0 ? "bg-skywash" : "bg-navy-700/[0.06]"}`} />
          ))}
        </div>
        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { k: "Interactions", v: "1,284" },
              { k: "Resolution", v: "91%" },
              { k: "Active agents", v: "36" },
            ].map((s) => (
              <div key={s.k} className="rounded-lg border border-linelight bg-white px-3 py-2.5">
                <p className="text-[1rem] font-bold tracking-tight text-ink">{s.v}</p>
                <p className="mt-0.5 text-[0.6rem] font-semibold tracking-wide text-slateblue uppercase">
                  {s.k}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-linelight bg-white p-3.5">
            <div className="flex items-end justify-between gap-1.5" style={{ height: 84 }}>
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="w-full rounded-t-[4px] bg-gradient-to-t from-electric-600/80 to-signal-500/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="mt-2.5 text-[0.64rem] font-medium tracking-wide text-slateblue uppercase">
              Weekly interaction volume
            </p>
          </div>
          <div className="space-y-1.5">
            {[88, 64, 76].map((w, i) => (
              <span key={i} className="block h-2 rounded-full bg-navy-700/[0.08]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Solutions() {
  const [flagship, ...rest] = solutions;

  return (
    <Section id="solutions" className="bg-white">
      <Container>
        <SectionHeading
          eyebrow="Flagship solutions"
          title="One partner. Boundless possibilities."
          lede="Three practice areas, one engineering standard. Each platform is designed around your operation and built to grow with it."
        />

        {/* Flagship: BPO CRM */}
        <Reveal className="mt-14" amount={0.15}>
          <article className="overflow-hidden rounded-3xl border border-linelight bg-white shadow-card">
            <div className="grid lg:grid-cols-2">
              <div className="relative p-8 sm:p-10 lg:p-12">
                <span
                  className="pointer-events-none absolute -top-5 right-6 select-none text-[7rem] font-extrabold leading-none tracking-tighter text-navy-700/[0.06]"
                  aria-hidden
                >
                  {flagship.index}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-navy-800 text-signal-300">
                    <Users className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-h3 text-ink">{flagship.name}</h3>
                </div>
                <p className="mt-5 text-[1.08rem] font-medium leading-relaxed text-navy-800">
                  {flagship.summary}
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slateblue">
                  {flagship.description}
                </p>
                <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {flagship.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[0.9rem] text-ink/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-electric-600" aria-hidden />
                      {c}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="group mt-8 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors hover:text-navy-700"
                >
                  Discuss BPO CRM
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </a>
              </div>
              <div className="relative flex items-center border-t border-linelight bg-gradient-to-br from-cloud to-skywash/60 p-6 sm:p-10 lg:border-l lg:border-t-0">
                <CrmPreview />
              </div>
            </div>
          </article>
        </Reveal>

        {/* 02 + 03 */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {rest.map((s, i) => {
            const Icon = cardIcons[s.id as keyof typeof cardIcons];
            return (
              <Reveal key={s.id} delay={0.08 + i * 0.08} amount={0.15}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-linelight bg-white p-8 shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-10">
                  <span
                    className="pointer-events-none absolute -top-4 right-5 select-none text-[5.5rem] font-extrabold leading-none tracking-tighter text-navy-700/[0.06]"
                    aria-hidden
                  >
                    {s.index}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-navy-800 text-signal-300">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <h3 className="text-h3 text-ink">{s.name}</h3>
                  </div>
                  <p className="mt-5 text-[1.02rem] font-medium leading-relaxed text-navy-800">
                    {s.summary}
                  </p>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-slateblue">
                    {s.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-[0.9rem] text-ink/80">
                        <Check className="mt-0.5 size-4 shrink-0 text-electric-600" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  {s.id === "ai-automation" && (
                    <p className="mt-6 rounded-xl border border-signal-500/25 bg-skywash px-4 py-3 text-[0.82rem] font-medium text-navy-800">
                      Every AI workflow ships with human escalation and oversight built in.
                    </p>
                  )}
                  <a
                    href="#contact"
                    className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.92rem] font-semibold text-electric-600 transition-colors hover:text-navy-700"
                  >
                    Discuss {s.id === "financial" ? "financial systems" : "AI & automation"}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
