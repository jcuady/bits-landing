import Link from "next/link";
import { targetIndustrySectors } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

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
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5 opacity-40">
            <div className="size-2.5 rounded-full bg-slate-400" />
            <div className="size-2.5 rounded-full bg-slate-400" />
            <div className="size-2.5 rounded-full bg-slate-400" />
          </div>
          <div className="h-4 w-px bg-slate-200" />
          <div>
            <p className="text-[0.75rem] font-semibold text-slate-800">{title}</p>
            <p className="truncate text-[0.68rem] font-medium text-slate-500">{kicker}</p>
          </div>
        </div>
        <span className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 shadow-xs">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500"></span>
          </span>
          <span className="text-[0.68rem] font-bold uppercase tracking-widest text-emerald-600">Active</span>
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
              <td className="whitespace-nowrap px-4 py-3 font-semibold text-blue-600">{row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sectorSpecimens = {
  bpo: {
    title: "Multi-Tenant Operations",
    kicker: "BPO & Contact Center Infrastructure",
    caption: "BPO Campaign Staging Specimen",
    columns: ["Operational Module", "Configuration Scope", "State"] as const,
    rows: [
      { a: "Tenant Isolation", b: "Per-client database partitioning", c: "Enforced" },
      { a: "Dynamic Routing", b: "Skill & language matching", c: "Active" },
      { a: "Supervisor HUD", b: "Listen / whisper / barge", c: "Ready" },
      { a: "SLA Reporting", b: "Automated client export feeds", c: "Scheduled" },
    ],
  },
  collections: {
    title: "Debt Recovery Engine",
    kicker: "Delinquency & PTP Management",
    caption: "Collection Agency Workflow Specimen",
    columns: ["Workflow Component", "Policy Rule", "State"] as const,
    rows: [
      { a: "DPD Bucketing", b: "Automated age-based staging", c: "Dynamic" },
      { a: "PTP Tracking", b: "Grace period & auto-follow-up", c: "Enforced" },
      { a: "Broken PTP", b: "Immediate supervisor re-queue", c: "Automated" },
      { a: "Quiet Hours", b: "Statutory contact time limits", c: "Compliant" },
    ],
  },
  banking: {
    title: "Financial Governance",
    kicker: "Security-Conscious Banking Architecture",
    caption: "Banking & Financial Services Specimen",
    columns: ["Governance Control", "Architecture Standard", "State"] as const,
    rows: [
      { a: "RBAC Matrix", b: "Least-privilege operational roles", c: "Verified" },
      { a: "Audit Trails", b: "Cryptographic immutable log", c: "Immutable" },
      { a: "Data Ingestion", b: "Encrypted core banking ETL", c: "TLS 1.3" },
      { a: "Hosting Model", b: "Private VPC or On-Premises", c: "Supported" },
    ],
  },
  "growing-businesses": {
    title: "Custom Business Engine",
    kicker: "Bespoke Enterprise Systems",
    caption: "Growing Business & Enterprise Specimen",
    columns: ["Custom System", "Target Outcome", "State"] as const,
    rows: [
      { a: "Custom CRM", b: "Engineered around internal flows", c: "Bespoke" },
      { a: "Task Automation", b: "Zero-touch operational triggers", c: "Integrated" },
      { a: "Legacy Modernization", b: "API wrappers on legacy data", c: "Connected" },
      { a: "BI Dashboards", b: "Executive decision intelligence", c: "Live" },
    ],
  },
} as const;

export function Industries() {
  return (
    <Section id="industries" className="relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),transparent)]" />

      <Container className="relative z-10">
        <Reveal>
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white/90 px-4 py-1.5 backdrop-blur-md shadow-xs">
            <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
              Industry-Specific Solutions
            </span>
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-h2 font-bold tracking-tight text-slate-900">
              Built for Fast-Paced Teams and Demanding Industries
            </h2>
            <p className="text-lede mx-auto mt-4 max-w-[50ch] text-slate-600">
              See how BITS adapts to the legal rules, phone systems, and daily worklists of real businesses.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 space-y-16 lg:mt-20 lg:space-y-24">
          {targetIndustrySectors.map((sector, i) => {
            const spec = sectorSpecimens[sector.id as keyof typeof sectorSpecimens];
            const reverse = i % 2 === 1;

            return (
              <Reveal key={sector.id} delay={i * 0.06} amount={0.15}>
                <article id={sector.id} className="scroll-mt-24">
                  <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                    {/* Copy Column */}
                    <div className={reverse ? "lg:col-span-6 lg:order-2" : "lg:col-span-6"}>
                      <span className="inline-block rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                        {sector.highlight}
                      </span>
                      <h3 className="text-h3 mt-3 font-bold text-slate-900">
                        {sector.name}
                      </h3>
                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        {sector.tagline}
                      </p>
                      <p className="mt-4 text-[0.98rem] leading-relaxed text-slate-600">
                        {sector.description}
                      </p>

                      {/* Workflows checklist */}
                      <div className="mt-6 space-y-2.5">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Key Operational Capabilities
                        </p>
                        <ul className="grid gap-2 sm:grid-cols-2">
                          {sector.workflows.map((wf) => (
                            <li key={wf} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                              <span className="mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-[0.65rem] font-bold text-blue-600">
                                ✓
                              </span>
                              <span>{wf}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-7">
                        <Link
                          href="/#contact"
                          className="group inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700"
                        >
                          <span>Design a {sector.name} solution</span>
                          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Specimen Table Column */}
                    <div className={reverse ? "lg:col-span-6 lg:order-1" : "lg:col-span-6"}>
                      <Bezel title={spec.title} kicker={spec.kicker}>
                        <SpecimenTable
                          caption={spec.caption}
                          columns={spec.columns}
                          rows={spec.rows}
                        />
                      </Bezel>
                    </div>
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
