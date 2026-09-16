import { cn } from "@/lib/utils";

const rows = [
  { name: "Elise Navarro", company: "Harborline Logistics", phone: "+1 (312) 847-1928", email: "elise@harborline.co", country: "United States" },
  { name: "Dr. Marcus Chen", company: "Northwind Clinics", phone: "+1 (617) 204-8814", email: "m.chen@northwind.clinic", country: "United States" },
  { name: "Priya Sundaram", company: "Voltgrid Energy", phone: "+44 20 7946 0318", email: "priya.s@voltgrid.eu", country: "United Kingdom" },
  { name: "Leo Santos", company: "Brightpath Schools", phone: "+1 (415) 662-0941", email: "leo@brightpath.edu", country: "United States" },
  { name: "Hannah Ortiz", company: "Cedar & Co Retail", phone: "+1 (206) 918-4470", email: "hortiz@cedar.co", country: "United States" },
] as const;

/**
 * Static product preview for the marketing hero.
 * Decorative — not interactive. Real app lives under /app.
 */
export function HeroProduct({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "mx-auto w-full max-w-[1080px]",
        className
      )}
    >
      <div className="rounded-[1.75rem] bg-white/45 p-1.5 shadow-[0_24px_64px_-28px_rgb(6_22_47/0.38)] ring-1 ring-white/70 sm:rounded-[2rem] sm:p-2">
        <div className="overflow-hidden rounded-[calc(1.75rem-0.375rem)] border border-linelight bg-white sm:rounded-[calc(2rem-0.5rem)]">
          <div className="flex min-h-[18rem] sm:min-h-[22rem] lg:min-h-[26rem]">
            <aside className="hidden w-[11.5rem] shrink-0 flex-col gap-0.5 border-r border-linelight bg-cloud/80 p-3 md:flex">
              <p className="mb-3 px-2 text-[0.72rem] font-bold tracking-tight text-ink">BITS CRM</p>
              {["Dashboard", "Customers", "Pipeline", "Tickets", "QA"].map((item, i) => (
                <span
                  key={item}
                  className={cn(
                    "rounded-lg px-2.5 py-2 text-[0.78rem] font-medium",
                    i === 1 ? "bg-white text-electric-600 shadow-sm" : "text-slateblue"
                  )}
                >
                  {item}
                </span>
              ))}
            </aside>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3 border-b border-linelight px-4 py-3 sm:px-5">
                <div>
                  <p className="text-[0.82rem] font-semibold text-ink">Demo</p>
                  <p className="text-[0.72rem] text-slateblue">Floor queue · Harborline desk</p>
                </div>
                <span className="hidden rounded-full border border-electric-600/20 bg-skywash px-2.5 py-1 text-[0.68rem] font-semibold text-electric-600 sm:inline">
                  Live
                </span>
              </div>

              <div className="px-4 py-3 sm:px-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[0.92rem] font-semibold text-ink">Customers</p>
                  <span className="rounded-lg border border-linelight bg-cloud px-3 py-1.5 text-[0.72rem] text-slateblue">
                    Search accounts
                  </span>
                </div>
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="w-full text-left text-[0.75rem] sm:text-[0.78rem]">
                    <caption className="sr-only">Sample customer accounts in BITS CRM</caption>
                    <thead>
                      <tr className="border-b border-linelight text-[0.65rem] font-semibold tracking-[0.06em] text-slateblue uppercase">
                        <th scope="col" className="py-2 pr-3 font-semibold">
                          Customer
                        </th>
                        <th scope="col" className="hidden py-2 pr-3 font-semibold sm:table-cell">
                          Company
                        </th>
                        <th scope="col" className="hidden py-2 pr-3 font-semibold lg:table-cell">
                          Phone
                        </th>
                        <th scope="col" className="py-2 font-semibold">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.email} className="border-b border-linelight/80 last:border-0">
                          <td className="py-2.5 pr-3 font-medium whitespace-nowrap text-ink">{row.name}</td>
                          <td className="hidden py-2.5 pr-3 text-slateblue sm:table-cell">{row.company}</td>
                          <td className="hidden py-2.5 pr-3 tabular-nums text-slateblue lg:table-cell">
                            {row.phone}
                          </td>
                          <td className="max-w-[9.5rem] truncate py-2.5 text-slateblue sm:max-w-none">
                            {row.email}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="sr-only">
        Preview of the BITS CRM customers workspace. Decorative mock; sign in to use the live app.
      </figcaption>
    </figure>
  );
}
