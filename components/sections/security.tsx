import { ArrowRight } from "lucide-react";
import { securityPrinciples } from "@/lib/site";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";

const ctaClass =
  "group mt-7 inline-flex min-h-11 cursor-pointer items-center gap-2 text-[0.92rem] font-semibold text-electric-600 transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:text-navy-700";

const access = [
  { role: "Agent", queue: "Own tickets", pii: "Masked", admin: "No" },
  { role: "Team lead", queue: "Team floor", pii: "Limited", admin: "No" },
  { role: "QA", queue: "Reviewed work", pii: "Yes", admin: "No" },
  { role: "Controller", queue: "Approvals", pii: "Yes", admin: "Scoped" },
] as const;

export function Security() {
  return (
    <Section id="security" className="overflow-x-hidden bg-white">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <Reveal>
              <p className="text-overline text-electric-600">Access · Audit · Oversight</p>
              <h2 className="text-h2 mt-4 max-w-4xl text-balance leading-[1.08] text-ink">
                Role-based access and audit trails, built into the floor.
              </h2>
              <p className="text-lede mt-5 max-w-[46ch] text-pretty text-slateblue">
                Harborline agents see their queue. Controllers see approvals. BITS
                designs that boundary first, not as a lock added later.
              </p>
              <p className="mt-5 max-w-[46ch] border-l-2 border-electric-600/40 pl-4 text-[0.88rem] leading-relaxed text-slateblue">
                Practices are applied per engagement and documented with your team.
                We do not claim certifications we do not hold.
              </p>
              <a href="#contact" className={ctaClass}>
                Book a consultation
                <ArrowRight
                  className="size-4 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <figure>
              <div className="rounded-[1.75rem] bg-cloud/80 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-navy-700/10 sm:rounded-[2rem] sm:p-2">
                <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
                  <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                    <div className="min-w-0">
                      <p className="text-[0.82rem] font-semibold text-ink">Access</p>
                      <p className="truncate text-[0.72rem] text-slateblue">
                        Harborline desk · roles
                      </p>
                    </div>
                    <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
                      Live
                    </span>
                  </div>
                  <div className="overflow-x-auto overscroll-x-contain px-4 py-3 sm:px-5">
                    <table className="w-full min-w-[20rem] text-left text-[0.75rem] sm:text-[0.78rem]">
                      <caption className="sr-only">
                        Harborline role-based access for agents, leads, QA, and controllers
                      </caption>
                      <thead>
                        <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Role
                          </th>
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            Queue
                          </th>
                          <th scope="col" className="py-2 pr-3 font-semibold">
                            PII
                          </th>
                          <th scope="col" className="py-2 font-semibold">
                            Admin
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {access.map((row) => (
                          <tr key={row.role} className="border-b border-linelight/80 last:border-0">
                            <th
                              scope="row"
                              className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink"
                            >
                              {row.role}
                            </th>
                            <td className="py-2.5 pr-3 text-slateblue">{row.queue}</td>
                            <td className="py-2.5 pr-3 text-slateblue">{row.pii}</td>
                            <td className="py-2.5 text-slateblue">{row.admin}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                BITS access control for the Harborline desk, by role.
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:mt-16">
          {securityPrinciples.map((sp, i) => (
            <li key={sp.name} className="border-t border-linelight/90">
              <Reveal delay={0.04 * (i % 4)}>
                <div className="flex gap-4 py-4">
                  <span
                    className="w-7 shrink-0 pt-0.5 font-semibold tabular-nums text-[0.72rem] tracking-[0.14em] text-electric-600"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[1.02rem] font-semibold tracking-[-0.015em] text-ink">
                      {sp.name}
                    </h3>
                    <p className="mt-1 text-[0.9rem] leading-relaxed text-slateblue">{sp.copy}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
