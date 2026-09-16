import { ArrowRight } from "lucide-react";
import { industries } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

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
    <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
      <table className="w-full min-w-[18rem] text-left text-[0.75rem] sm:text-[0.78rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
            {columns.map((col) => (
              <th key={col} scope="col" className="py-2 pr-3 last:pr-0 font-semibold">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.a} className="border-b border-linelight/80 last:border-0">
              <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">{row.a}</td>
              <td className="max-w-[10rem] truncate py-2.5 pr-3 text-slateblue sm:max-w-none">{row.b}</td>
              <td className="py-2.5 whitespace-nowrap text-slateblue">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const specimens = {
  bpo: {
    title: "BITS CRM",
    kicker: "Tickets · Harborline desk",
    caption: "Harborline contact-center tickets in BITS CRM",
    columns: ["Account", "Work", "State"] as const,
    rows: [
      { a: "Elise Navarro", b: "Invoice exception", c: "Open" },
      { a: "Priya Sundaram", b: "KYC follow-up", c: "Waiting" },
      { a: "Leo Santos", b: "Ticket 4182", c: "QA" },
    ],
  },
  banking: {
    title: "Approvals",
    kicker: "Finance ops · Voltgrid desk",
    caption: "Voltgrid finance approval queue",
    columns: ["Request", "Desk", "State"] as const,
    rows: [
      { a: "Wire release", b: "Voltgrid", c: "Controller" },
      { a: "Limit change", b: "Northwind", c: "Pending" },
      { a: "Vendor setup", b: "Harborline", c: "Approved" },
    ],
  },
  enterprises: {
    title: "Operations",
    kicker: "Floor queue · Brightpath",
    caption: "Enterprise operations queue for Brightpath",
    columns: ["Account", "Work", "State"] as const,
    rows: [
      { a: "Hannah Ortiz", b: "Order exception", c: "Open" },
      { a: "Dr. Marcus Chen", b: "Roster change", c: "Waiting" },
      { a: "Leo Santos", b: "Ticket 4182", c: "QA" },
    ],
  },
} as const;

export function Industries() {
  return (
    <Section id="industries" className="overflow-x-hidden bg-cloud">
      <Container>
        <Reveal>
          <p className="text-overline text-electric-600">BPO · Banking · Enterprise</p>
          <h2 className="text-h2 mt-4 max-w-4xl text-balance leading-[1.08] text-ink">
            Built for contact-center floors, banking controls, and growing operations.
          </h2>
          <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
            BITS goes deep rather than wide. Each engagement starts from how
            your floor already works, not a generic sales CRM.
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
                      <p className="font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600">
                        {ind.index}
                      </p>
                      <h3 className="text-h3 mt-3 text-ink">{ind.name}</h3>
                      <p className="mt-4 max-w-[46ch] text-[1.02rem] font-medium leading-relaxed text-ink/90">
                        {ind.copy}
                      </p>
                      <p className="mt-3 max-w-[46ch] text-[0.88rem] leading-relaxed text-slateblue">
                        {ind.tags.join(" · ")}
                      </p>
                      <a href="#contact" className={ctaClass}>
                        {ind.cta}
                        <ArrowRight
                          className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                          aria-hidden
                        />
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
