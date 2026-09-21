import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import {
  BspLogo,
  NpcLogo,
  SecLogo,
  CicLogo,
  Iso27001Logo,
  DictLogo,
} from "@/components/ui/security-logos";

const securityStandards = [
  {
    logo: BspLogo,
    name: "BSP Regulatory Alignment",
    standard: "Circulars 454 & 857",
    description: "Fair debt collection rules & supervisory audit trails",
    badge: "Banking Standard",
  },
  {
    logo: NpcLogo,
    name: "NPC Privacy Principles",
    standard: "RA 10173 (DPA 2012)",
    description: "Role-based PII masking & explicit consent controls",
    badge: "Data Privacy",
  },
  {
    logo: SecLogo,
    name: "SEC Operational Guidelines",
    standard: "MC No. 18 (2019)",
    description: "Scoping for fair and lawful debt recovery practices",
    badge: "Fair Practice",
  },
  {
    logo: CicLogo,
    name: "Credit Reporting Ready",
    standard: "RA 9510 (CISA)",
    description: "Standardized account status & credit data formats",
    badge: "Credit Data",
  },
  {
    logo: Iso27001Logo,
    name: "ISO/IEC 27001 Aligned",
    standard: "ISMS Framework",
    description: "Security-conscious access policies & risk mitigation",
    badge: "Security Standard",
  },
  {
    logo: DictLogo,
    name: "DICT Cybersecurity",
    standard: "Cloud Security Framework",
    description: "Secure data isolation & encrypted communication channels",
    badge: "Cybersecurity",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Security standards and regulatory alignment"
      className="relative z-10 border-y border-slate-200/80 bg-slate-50/80 py-12 sm:py-16"
    >
      <Container>
        <Reveal y={12}>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-3.5 py-1 backdrop-blur-md">
              <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
              <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                Security & Statutory Governance
              </span>
            </div>
            <h2 className="text-[1.35rem] font-bold tracking-tight text-slate-900 sm:text-[1.6rem]">
              Engineered in Alignment with Sensitive Operational Standards
            </h2>
            <p className="mt-2 text-[0.88rem] text-slate-600">
              BITS enforces verifiable data isolation, encryption, role-based boundaries, and statutory quiet-hour rules.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
            {securityStandards.map((item) => {
              const LogoComponent = item.logo;
              return (
                <div
                  key={item.name}
                  className="group flex flex-col items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-xs transition-all duration-300 hover:border-blue-500/30 hover:shadow-md hover:ring-2 hover:ring-blue-500/10"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative mb-3 flex size-13 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                      <LogoComponent size={52} />
                    </div>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-mono text-[0.6rem] font-bold uppercase tracking-wider text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700">
                      {item.badge}
                    </span>
                    <h3 className="mt-2 text-[0.85rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-700">
                      {item.name}
                    </h3>
                    <p className="font-mono text-[0.68rem] font-semibold text-slate-500">
                      {item.standard}
                    </p>
                  </div>
                  <p className="mt-2.5 border-t border-slate-100 pt-2 text-[0.68rem] leading-snug text-slate-400 group-hover:text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
