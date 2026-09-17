import { industries } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-7 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

function Bezel({
  title,
  kicker,
  children,
}: {
  title: string;
  kicker: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-xl shadow-blue-900/5">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-40">
            <div className="size-2.5 rounded-full bg-slate-400" />
            <div className="size-2.5 rounded-full bg-slate-400" />
            <div className="size-2.5 rounded-full bg-slate-400" />
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div>
            <p className="text-[0.75rem] font-semibold text-slate-700">{title}</p>
            <p className="truncate text-[0.68rem] font-medium text-slate-500">{kicker}</p>
          </div>
        </div>
        <span className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 shadow-sm">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-500">Live</span>
        </span>
      </div>
      {children}
    </div>
  );
}

function SpecimenTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: readonly [string, string, string];
  rows: readonly { a: string; b: string; c: string }[];
}) {
  return (
    <div className="overflow-x-auto overscroll-x-contain p-2">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
            {columns.map((col) => (
              <th key={col} scope="col" className="px-4 py-3">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row.a} className="transition-colors hover:bg-slate-50/50">
              <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">{row.a}</td>
              <td className="max-w-[10rem] truncate px-4 py-3 text-slate-600 sm:max-w-none">{row.b}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const specimens = {
  small: {
    title: "Focused campaign",
    kicker: "Core Collections",
    caption: "Small team collections configuration",
    columns: ["Module", "Scope", "State"] as const,
    rows: [
      { a: "Accounts", b: "One campaign", c: "Enabled" },
      { a: "Queues", b: "One team", c: "Enabled" },
      { a: "Reporting", b: "Standard", c: "Enabled" },
    ],
  },
  medium: {
    title: "Growing operation",
    kicker: "Collections + communication + QA",
    caption: "Medium team collections configuration",
    columns: ["Module", "Scope", "State"] as const,
    rows: [
      { a: "Messaging", b: "Configured", c: "Enabled" },
      { a: "Dialer", b: "Progressive", c: "Enabled" },
      { a: "QA", b: "Scorecards", c: "Enabled" },
    ],
  },
  large: {
    title: "High-volume operation",
    kicker: "Modular enterprise configuration",
    caption: "Large team collections configuration",
    columns: ["Capability", "Scope", "State"] as const,
    rows: [
      { a: "Multi-client", b: "Campaign scoped", c: "Enabled" },
      { a: "Deployment", b: "On-prem option", c: "Supported" },
      { a: "Workflows", b: "Custom rules", c: "Configured" },
    ],
  },
} as const;

export function Industries() {
  return (
    <Section id="industries" className="relative overflow-hidden bg-slate-50">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white/80 px-4 py-1.5 backdrop-blur-md shadow-sm">
            <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              No public prices · scoped configuration
            </span>
          </div>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
            Built Around Your Operation.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
            Choose a starting configuration that fits your team today, then
            expand modules as volume, communication, and supervision needs grow.
          </p>
        </Reveal>

        <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
          {industries.map((ind, i) => {
            const spec = specimens[ind.id];
            const reverse = i % 2 === 1;
            return (
              <Reveal key={ind.id} delay={i * 0.06} amount={0.15}>
                <article id={ind.id} className="scroll-mt-24">
                  <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className={reverse ? "lg:order-2" : undefined}>
                      <p className="font-mono text-[0.75rem] font-semibold tracking-widest text-blue-400">
                        {ind.index}.
                      </p>
                      <h3 className="text-h3 mt-3 font-bold text-slate-900">{ind.name}</h3>
                      <p className="mt-4 max-w-[46ch] text-[1.02rem] font-medium leading-relaxed text-slate-700">
                        {ind.copy}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {ind.tags.map(tag => (
                          <span key={tag} className="rounded-full border border-slate-200/60 bg-white/60 px-3 py-1 text-[0.75rem] font-semibold text-slate-500">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a href="#contact" className={ctaClass}>
                        <span className="relative">
                          {ind.cta}
                          <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                      </a>
                    </div>
                    <figure className={reverse ? "lg:order-1" : undefined}>
                      <Bezel title={spec.title} kicker={spec.kicker}>
                        <SpecimenTable
                          caption={spec.caption}
                          columns={spec.columns}
                          rows={spec.rows}
                        />
                      </Bezel>
                      <figcaption className="sr-only">{spec.caption}</figcaption>
                    </figure>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
