import { ArrowRight } from "lucide-react";
import { solutions } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

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
    <div className="rounded-[1.75rem] bg-white/45 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-white/70 sm:rounded-[2rem] sm:p-2">
      <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
        <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p className="text-[0.82rem] font-semibold text-ink">{title}</p>
            <p className="truncate text-[0.72rem] text-slateblue">{kicker}</p>
          </div>
          <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
            Live
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function Caps({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6">
      {items.map((c, i) => (
        <li
          key={c}
          className="flex gap-3 border-t border-linelight/90 py-2.5 first:border-t-0"
        >
          <span className="w-6 shrink-0 pt-0.5 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[0.9rem] font-medium leading-snug text-ink/90">{c}</span>
        </li>
      ))}
    </ul>
  );
}

function CrmSpecimen() {
  const rows = [
    { account: "Elise Navarro", work: "Invoice exception", state: "Open" },
    { account: "Priya Sundaram", work: "KYC follow-up", state: "Waiting" },
    { account: "Leo Santos", work: "Ticket 4182", state: "QA" },
  ] as const;

  return (
    <Bezel title="BITS CRM" kicker="Tickets · Harborline desk">
      <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
        <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
          <caption className="sr-only">Harborline tickets in BITS CRM</caption>
          <thead>
            <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
              <th scope="col" className="py-2 pr-3 font-semibold">
                Account
              </th>
              <th scope="col" className="py-2 pr-3 font-semibold">
                Work
              </th>
              <th scope="col" className="py-2 font-semibold">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.account} className="border-b border-linelight/80 last:border-0">
                <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">{row.account}</td>
                <td className="max-w-[10rem] truncate py-2.5 text-slateblue sm:max-w-none">{row.work}</td>
                <td className="py-2.5 text-slateblue">{row.state}</td>
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
    { item: "Wire release", desk: "Voltgrid", state: "Controller" },
    { item: "Limit change", desk: "Northwind", state: "Pending" },
    { item: "Vendor setup", desk: "Harborline", state: "Approved" },
  ] as const;

  return (
    <Bezel title="Approvals" kicker="Finance ops · Voltgrid desk">
      <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
        <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
          <caption className="sr-only">Sample finance approval queue</caption>
          <thead>
            <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
              <th scope="col" className="py-2 pr-3 font-semibold">
                Request
              </th>
              <th scope="col" className="hidden py-2 pr-3 font-semibold sm:table-cell">
                Desk
              </th>
              <th scope="col" className="py-2 font-semibold">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} className="border-b border-linelight/80 last:border-0">
                <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">{row.item}</td>
                <td className="hidden py-2.5 pr-3 text-slateblue sm:table-cell">{row.desk}</td>
                <td className="py-2.5 text-slateblue">{row.state}</td>
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
    { item: "Where is my shipment?", route: "L1", state: "Resolved" },
    { item: "Harborline call 14:22", route: "QA", state: "Human review" },
    { item: "KYC document list", route: "Knowledge", state: "Sourced" },
  ] as const;

  return (
    <Bezel title="Exceptions" kicker="AI + human oversight · Harborline">
      <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
        <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
          <caption className="sr-only">AI exceptions routed to people</caption>
          <thead>
            <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
              <th scope="col" className="py-2 pr-3 font-semibold">
                Item
              </th>
              <th scope="col" className="hidden py-2 pr-3 font-semibold sm:table-cell">
                Route
              </th>
              <th scope="col" className="py-2 font-semibold">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.item} className="border-b border-linelight/80 last:border-0">
                <td className="max-w-[12rem] truncate py-2.5 pr-3 font-medium text-ink sm:max-w-none">
                  {row.item}
                </td>
                <td className="hidden py-2.5 pr-3 tabular-nums text-slateblue sm:table-cell">
                  {row.route}
                </td>
                <td className="py-2.5 whitespace-nowrap text-slateblue">{row.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Bezel>
  );
}

export function Solutions() {
  const [crm, finance, ai] = solutions;

  return (
    <Section id="solutions" className="overflow-x-hidden bg-cloud">
      <Container>
        <Reveal>
          <p className="text-overline text-electric-600">BPO CRM · Finance · AI automation</p>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance leading-[1.08] text-ink">
            Contact-center CRM, finance operations, and AI with human oversight.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
            Three practice areas. One engineering standard. Built for BPO floors,
            banking controls, and high-volume teams that cannot run on generic
            sales software.
          </p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-16" amount={0.15}>
          <article id="bpo-crm" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              <div>
                <h3 className="text-h3 text-ink">{crm.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-ink/90">
                  {crm.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slateblue">
                  {crm.description}
                </p>
                <Caps items={crm.capabilities} />
                <a href="#contact" className={ctaClass}>
                  Book a BPO CRM consultation
                  <ArrowRight
                    className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
              <figure>
                <CrmSpecimen />
                <figcaption className="sr-only">
                  BITS CRM ticket queue for the Harborline desk. Decorative mock.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24" amount={0.15} delay={0.06}>
          <article id="financial" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
              <div className="lg:order-2">
                <h3 className="text-h3 text-ink">{finance.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-ink/90">
                  {finance.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slateblue">
                  {finance.description}
                </p>
                <Caps items={finance.capabilities} />
                <a href="#contact" className={ctaClass}>
                  Book a finance systems consultation
                  <ArrowRight
                    className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
              <figure className="lg:order-1">
                <FinanceSpecimen />
                <figcaption className="sr-only">
                  Finance approval queue with controller review. Decorative mock.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>

        <Reveal className="mt-16 lg:mt-24" amount={0.15} delay={0.08}>
          <article id="ai-automation" className="scroll-mt-24">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
              <div>
                <h3 className="text-h3 text-ink">{ai.name}</h3>
                <p className="mt-4 text-[1.05rem] font-medium leading-relaxed text-ink/90">
                  {ai.summary}
                </p>
                <p className="mt-3 max-w-[46ch] text-[0.95rem] leading-relaxed text-slateblue">
                  {ai.description}
                </p>
                <Caps items={ai.capabilities} />
                <a href="#contact" className={ctaClass}>
                  Book an AI consultation
                  <ArrowRight
                    className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </div>
              <figure>
                <AiSpecimen />
                <figcaption className="sr-only">
                  AI exceptions with human review on the Harborline floor. Decorative mock.
                </figcaption>
              </figure>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}
