import { solutions } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-blue-700";

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
        <span className="relative flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-500">Live</span>
        </span>
      </div>
      <div className="bg-white">
        {children}
      </div>
    </div>
  );
}

function Caps({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-3 border-t border-slate-100 pt-6">
      {items.map((c, i) => (
        <li
          key={c}
          className="group flex items-center gap-4"
        >
          <span className="font-mono text-[0.7rem] font-semibold tracking-widest text-blue-400">
            {String(i + 1).padStart(2, "0")}.
          </span>
          <span className="text-[0.9rem] font-medium leading-relaxed text-slate-700 transition-colors group-hover:text-slate-900">{c}</span>
        </li>
      ))}
    </ul>
  );
}

function CrmSpecimen() {
  const rows = [
    { account: "ACC-10482", work: "PTP due", state: "Assigned" },
    { account: "ACC-10817", work: "Follow-up", state: "Queued" },
    { account: "ACC-11209", work: "Broken PTP", state: "Review" },
  ] as const;

  return (
    <Bezel title="Accounts" kicker="Portfolio · Active Operations">
      <div className="overflow-x-auto overscroll-x-contain p-2">
        <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
          <caption className="sr-only">Synthetic collections account queue</caption>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
              <th scope="col" className="px-4 py-3">Account</th>
              <th scope="col" className="px-4 py-3">Work</th>
              <th scope="col" className="px-4 py-3">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.account} className="transition-colors hover:bg-slate-50/50">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{row.account}</td>
                <td className="max-w-[10rem] truncate px-4 py-3 text-slate-600 sm:max-w-none">{row.work}</td>
                <td className="px-4 py-3 text-slate-600">{row.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Bezel>
  );
}

function FinanceSpecimen() {
  const rows = [
    { item: "Broken PTP", desk: "Desk Alpha", state: "Follow-up" },
    { item: "30-day inactive", desk: "Desk Beta", state: "Work pool" },
    { item: "PTP hold", desk: "Recovery East", state: "Protected" },
  ] as const;

  return (
    <Bezel title="Strategy queue" kicker="Rules · dispositions · PTP">
      <div className="overflow-x-auto overscroll-x-contain p-2">
        <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
          <caption className="sr-only">Synthetic collections strategy queue</caption>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
              <th scope="col" className="px-4 py-3">Request</th>
              <th scope="col" className="hidden px-4 py-3 sm:table-cell">Desk</th>
              <th scope="col" className="px-4 py-3">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.item} className="transition-colors hover:bg-slate-50/50">
                <td className="whitespace-nowrap px-4 py-3 font-medium text-slate-900">{row.item}</td>
                <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">{row.desk}</td>
                <td className="px-4 py-3 text-slate-600">{row.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Bezel>
  );
}

function AiSpecimen() {
  const rows = [
    { item: "ACC-10482", route: "Preview call", state: "Connected" },
    { item: "ACC-10817", route: "SMS", state: "Delivered" },
    { item: "ACC-11209", route: "Email", state: "Scheduled" },
  ] as const;

  return (
    <Bezel title="Communication history" kicker="Configured providers · Telephony Engine">
      <div className="overflow-x-auto overscroll-x-contain p-2">
        <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
          <caption className="sr-only">Synthetic collections communication history</caption>
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
              <th scope="col" className="px-4 py-3">Item</th>
              <th scope="col" className="hidden px-4 py-3 sm:table-cell">Route</th>
              <th scope="col" className="px-4 py-3">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row.item} className="transition-colors hover:bg-slate-50/50">
                <td className="max-w-[12rem] truncate whitespace-nowrap px-4 py-3 font-medium text-slate-900 sm:max-w-none">
                  {row.item}
                </td>
                <td className="hidden tabular-nums px-4 py-3 text-slate-600 sm:table-cell">
                  {row.route}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{row.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Bezel>
  );
}

const additionalCapabilities = [
  {
    index: "04",
    title: "Visibility When Conversations Matter Most",
    copy: "Supervisors can listen, whisper, and barge into active calls while clear permissions and monitoring history preserve accountability.",
  },
  {
    index: "05",
    title: "Make Quality Measurable",
    copy: "Use configurable scorecards, evaluations, audit worklists, activity linkage, and agent analysis to make QA consistent and reviewable.",
  },
  {
    index: "06",
    title: "See What Is Happening Across the Operation",
    copy: "Review portfolios, agents, payments, calls, campaigns, activity, access logs, and exportable operational data without invented forecasts.",
  },
] as const;

export function Solutions() {
  const [crm, finance, ai] = solutions;

  return (
    <Section id="solutions" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/50 px-4 py-1.5 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
              Core collections platform
            </span>
          </div>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
            Everything your collections team needs to operate.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
            BITS brings account management, agent workflows, customer engagement,
            quality assurance, reporting, and operational controls into one
            role-based workspace.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-20" amount={0.15}>
          <article id="portfolio" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              <div>
                <h3 className="text-h3 font-bold text-slate-900">{crm.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-slate-800">
                  {crm.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {crm.description}
                </p>
                <Caps items={crm.capabilities} />
                <a href="#contact" className={ctaClass}>
                  <span className="relative">
                    Request a Demo
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
              <figure>
                <CrmSpecimen />
                <figcaption className="sr-only">
                  BITS collections account queue using synthetic data.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24" amount={0.15} delay={0.06}>
          <article id="workflows" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
              <div className="lg:order-2">
                <h3 className="text-h3 font-bold text-slate-900">{finance.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-slate-800">
                  {finance.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {finance.description}
                </p>
                <Caps items={finance.capabilities} />
                <a href="#contact" className={ctaClass}>
                  <span className="relative">
                    Explore the workflow
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
              <figure className="lg:order-1">
                <FinanceSpecimen />
                <figcaption className="sr-only">
                  BITS collections strategy queue using synthetic data.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24" amount={0.15} delay={0.08}>
          <article id="engagement" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              <div>
                <h3 className="text-h3 font-bold text-slate-900">{ai.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-slate-800">
                  {ai.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {ai.description}
                </p>
                <Caps items={ai.capabilities} />
                <a href="#contact" className={ctaClass}>
                  <span className="relative">
                    Discuss communication providers
                    <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                  </span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </a>
              </div>
              <figure>
                <AiSpecimen />
                <figcaption className="sr-only">
                  BITS communication history using synthetic data.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <div className="mt-20 border-t border-slate-200 lg:mt-28">
          {additionalCapabilities.map((item, index) => (
            <Reveal key={item.index} delay={index * 0.05} y={10}>
              <article className="group grid gap-4 border-b border-slate-100 py-8 transition-colors hover:bg-slate-50/50 sm:grid-cols-[5rem_1fr_1.25fr] sm:gap-8 sm:py-10">
                <p className="font-mono text-sm font-semibold tracking-widest text-blue-400">
                  {item.index}.
                </p>
                <h3 className="text-[1.1rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                  {item.title}
                </h3>
                <p className="max-w-[52ch] text-[0.95rem] leading-relaxed text-slate-600">
                  {item.copy}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
