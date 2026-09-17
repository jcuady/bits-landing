import { securityPrinciples } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { BspLogo, NpcLogo, SecLogo, Iso27001Logo } from "@/components/ui/security-logos";

const ctaClass =
  "group mt-8 flex w-fit items-center gap-3 text-[0.92rem] font-bold text-blue-600 transition-colors hover:text-blue-700";

const access = [
  { role: "Agent", queue: "Assigned accounts", pii: "Scoped", admin: "No" },
  { role: "Supervisor", queue: "Team campaigns", pii: "Limited", admin: "No" },
  { role: "QA reviewer", queue: "Audit worklist", pii: "Scoped", admin: "No" },
  { role: "Administrator", queue: "Configured campaigns", pii: "Scoped", admin: "Yes" },
] as const;

export function Security() {
  return (
    <Section id="security" className="relative overflow-hidden bg-white">
      {/* Premium Light Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(59,130,246,0.05),rgba(255,255,255,0))]" />

      <Container className="relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-blue-50/80 px-4 py-1.5 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-blue-600" aria-hidden />
                <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-700">
                  Bank-Grade Security Architecture
                </span>
              </div>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance font-bold leading-[1.08] text-slate-900">
                Designed for Strict Regulatory Control & Auditability.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slate-600">
                Collections operations demand zero-leakage security. BITS enforces granular role-scoped permissions,
                automated quiet hours, and end-to-end encryption across portfolios, calls, and agent activity.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50/90 px-3 py-1.5 shadow-2xs transition-colors hover:bg-white">
                  <BspLogo size={22} />
                  <span className="text-[0.74rem] font-bold tracking-tight text-slate-800">BSP Circular 454 & 857</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50/90 px-3 py-1.5 shadow-2xs transition-colors hover:bg-white">
                  <NpcLogo size={22} />
                  <span className="text-[0.74rem] font-bold tracking-tight text-slate-800">NPC RA 10173 DPA</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50/90 px-3 py-1.5 shadow-2xs transition-colors hover:bg-white">
                  <SecLogo size={22} />
                  <span className="text-[0.74rem] font-bold tracking-tight text-slate-800">SEC MC 18 Aligned</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-slate-200/90 bg-slate-50/90 px-3 py-1.5 shadow-2xs transition-colors hover:bg-white">
                  <Iso27001Logo size={22} />
                  <span className="text-[0.74rem] font-bold tracking-tight text-slate-800">ISO/IEC 27001 ISMS</span>
                </div>
              </div>
              <a href="#contact" className={ctaClass}>
                <span className="relative">
                  Request Security Architecture Walkthrough
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure>
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
                      <p className="text-[0.75rem] font-semibold text-slate-700">Access</p>
                      <p className="truncate text-[0.68rem] font-medium text-slate-500">BITS Security Vault · Role Scopes</p>
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
                <div className="overflow-x-auto overscroll-x-contain p-2">
                  <table className="w-full min-w-[20rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                    <caption className="sr-only">
                      Synthetic role-based collections access
                    </caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-semibold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Role</th>
                        <th scope="col" className="px-4 py-3">Queue</th>
                        <th scope="col" className="px-4 py-3">PII</th>
                        <th scope="col" className="px-4 py-3">Admin</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {access.map((row) => (
                        <tr key={row.role} className="transition-colors hover:bg-slate-50/50">
                          <th
                            scope="row"
                            className="whitespace-nowrap px-4 py-3 font-medium text-slate-900"
                          >
                            {row.role}
                          </th>
                          <td className="px-4 py-3 text-slate-600">{row.queue}</td>
                          <td className="px-4 py-3 text-slate-600">{row.pii}</td>
                          <td className="px-4 py-3 text-slate-600">{row.admin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <figcaption className="sr-only">
                Example BITS access control by operational role.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-x-12 gap-y-2 sm:grid-cols-2 lg:mt-20">
          {securityPrinciples.map((sp, i) => (
            <li key={sp.name} className="group rounded-2xl border border-transparent p-4 transition-colors hover:border-slate-200/60 hover:bg-slate-50/50">
              <Reveal delay={0.04 * (i % 4)}>
                <div className="flex gap-5">
                  <span
                    className="mt-1 font-mono text-[0.8rem] font-semibold tracking-widest text-blue-400"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.1rem] font-bold tracking-tight text-slate-900 transition-colors group-hover:text-blue-600">
                      {sp.name}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-600">{sp.copy}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal>
          <div id="deployment" className="scroll-mt-24 mt-16 rounded-2xl border border-slate-200/60 bg-slate-50/50 p-8 sm:p-10">
            <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-blue-500/10 bg-white px-4 py-1.5 shadow-sm">
              <span className="size-1.5 rounded-full bg-blue-500" aria-hidden />
              <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-blue-600">
                Cloud · on-premises · supported hybrid
              </span>
            </div>
            <h3 className="text-h3 mt-3 font-bold text-slate-900">Deploy Around Your Infrastructure.</h3>
            <p className="mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-slate-600">
              BITS supports deployment models designed around different infrastructure
              and operational requirements, including supported on-premises configurations.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
