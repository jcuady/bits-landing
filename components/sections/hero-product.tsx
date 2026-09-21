import { cn } from "@/lib/utils";
import { collectionAccounts as rows, dashboardStats } from "@/lib/marketing-specimens";

/**
 * Rich dashboard product preview for the marketing hero.
 * Shows stats cards + account table + floating mobile mockup.
 * Decorative — not interactive. Real app lives under /app.
 */
export function HeroProduct({ className }: { className?: string }) {
  return (
    <figure
      className={cn(
        "relative mx-auto w-full max-w-[1080px]",
        className
      )}
    >
      {/* Main dashboard bezel */}
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/60 bg-white shadow-xl shadow-blue-900/5">
        <div className="flex min-h-[18rem] sm:min-h-[22rem] lg:min-h-[26rem]">
          {/* Sidebar */}
          <aside className="hidden w-[12.5rem] shrink-0 flex-col border-r border-slate-100 bg-slate-50/50 p-4 md:flex">
            <div className="mb-6 flex items-center gap-2 px-2">
              <div className="size-2 rounded-full bg-blue-600" />
              <p className="text-[0.78rem] font-bold tracking-tight text-slate-900">BITS Collections</p>
            </div>
            <nav className="flex flex-col gap-1">
              {["Dashboard", "Accounts", "Queue", "PTP", "QA", "Reports"].map((item, i) => (
                <span
                  key={item}
                  className={cn(
                    "rounded-xl px-3 py-2 text-[0.82rem] font-bold transition-colors",
                    i === 0
                      ? "bg-white text-blue-600 shadow-sm ring-1 ring-inset ring-slate-200"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  {item}
                </span>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="min-w-0 flex-1 bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 lg:px-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5 opacity-40">
                  <div className="size-2.5 rounded-full bg-slate-400" />
                  <div className="size-2.5 rounded-full bg-slate-400" />
                  <div className="size-2.5 rounded-full bg-slate-400" />
                </div>
                <div className="h-4 w-px bg-slate-200" />
                <div>
                  <p className="text-[0.85rem] font-bold text-slate-900">Dashboard</p>
                  <p className="text-[0.75rem] font-medium text-slate-500">Portfolio Operations · Overview</p>
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

            {/* Stats cards row */}
            <div className="grid grid-cols-2 gap-4 px-5 py-5 lg:grid-cols-4 lg:px-6">
              {dashboardStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4 transition-colors hover:border-slate-200 hover:bg-slate-50"
                >
                  <p className="text-[0.68rem] font-bold uppercase tracking-widest text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-[1.4rem] font-bold tracking-tight text-slate-900 sm:text-[1.6rem]">
                    {stat.value}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    {stat.positive ? (
                      <span className="text-[0.8rem] font-bold text-emerald-500">↑</span>
                    ) : (
                      <span className="text-[0.8rem] font-bold text-red-500">↓</span>
                    )}
                    <span className={cn("text-[0.72rem] font-bold", stat.positive ? "text-emerald-600" : "text-red-600")}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Accounts table */}
            <div className="px-5 pb-5 lg:px-6 lg:pb-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[0.95rem] font-bold text-slate-900">Recent Accounts</p>
                <span className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-[0.75rem] font-medium text-slate-500 shadow-sm">
                  Search accounts...
                </span>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <div className="overflow-x-auto overscroll-x-contain">
                  <table className="w-full text-left text-[0.75rem] sm:text-[0.78rem]">
                    <caption className="sr-only">Synthetic collection accounts in BITS</caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/80 text-[0.65rem] font-bold tracking-widest text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Account</th>
                        <th scope="col" className="hidden px-4 py-3 sm:table-cell">Campaign</th>
                        <th scope="col" className="hidden px-4 py-3 lg:table-cell">Balance</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rows.slice(0, 4).map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-slate-50/50">
                          <td className="whitespace-nowrap px-4 py-3 font-bold text-slate-900">{row.id}</td>
                          <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">{row.campaign}</td>
                          <td className="hidden whitespace-nowrap px-4 py-3 font-mono font-medium text-slate-600 lg:table-cell">{row.balance}</td>
                          <td className="max-w-[9.5rem] truncate px-4 py-3 text-slate-600 sm:max-w-none">{row.status}</td>
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

      {/* Floating mobile mockup */}
      <div className="absolute -bottom-6 -right-4 hidden w-[210px] sm:block lg:-right-8 lg:bottom-2 lg:w-[250px]" aria-hidden>
        <div className="rounded-[2rem] bg-slate-900/10 p-2 shadow-2xl shadow-blue-950/25 ring-1 ring-slate-900/10 backdrop-blur-xl">
          <div className="overflow-hidden rounded-[calc(2rem-8px)] border border-slate-200/80 bg-white shadow-inner">
            {/* iOS Dynamic Island header */}
            <div className="border-b border-slate-100 bg-slate-50 px-4 pt-3 pb-3.5">
              <div className="mx-auto mb-2.5 h-3 w-16 rounded-full bg-slate-300 ring-1 ring-slate-400/20" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.62rem] font-bold tracking-widest text-blue-600 uppercase">BITS Dialer</p>
                  <p className="text-[0.78rem] font-bold text-slate-900">Field & Queue Mode</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-700">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            <div className="space-y-2.5 px-3.5 py-3.5">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                <p className="text-[0.62rem] font-bold uppercase tracking-wider text-slate-500">Collected Today</p>
                <p className="mt-0.5 font-mono text-[1.15rem] font-bold tracking-tight text-emerald-600">₱148,500</p>
              </div>

              <div className="rounded-xl border border-emerald-500/15 bg-emerald-50/40 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-emerald-700">Payment Alert</span>
                  <span className="text-[0.6rem] font-mono text-emerald-600">Just now</span>
                </div>
                <p className="mt-0.5 text-[0.78rem] font-bold text-slate-900">₱15,000 via InstaPay</p>
                <p className="text-[0.68rem] text-slate-500">ACC-10482 · PTP Fulfilled</p>
              </div>

              <div className="rounded-xl border border-blue-500/15 bg-blue-50/50 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-blue-700">Next Auto-Dial</span>
                  <span className="rounded-full bg-blue-600 px-1.5 py-0.2 text-[0.6rem] font-bold text-white">Auto</span>
                </div>
                <p className="mt-0.5 font-mono text-[0.78rem] font-bold text-slate-900">ACC-10817</p>
                <p className="text-[0.68rem] text-slate-600">PTP overdue · Calling now...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        Preview of the BITS collections dashboard and mobile app using synthetic data.
      </figcaption>
    </figure>
  );
}
