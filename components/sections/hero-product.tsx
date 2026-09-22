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
        "relative mx-auto w-full max-w-[1120px]",
        className
      )}
    >
      {/* Doppelrand (Double-Bezel) Outer Shell */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] p-2 sm:p-3 bg-gradient-to-b from-slate-200/90 via-slate-100/70 to-slate-200/90 ring-1 ring-slate-900/[0.08] shadow-[0_25px_60px_-15px_rgba(15,23,42,0.14),0_0_0_1px_rgba(255,255,255,0.8)_inset] backdrop-blur-xl">
        {/* Inner Screen Chassis */}
        <div className="relative overflow-hidden rounded-[calc(2rem-8px)] sm:rounded-[calc(2.5rem-12px)] border border-slate-200/80 bg-white shadow-2xl">
          {/* macOS Apple Window Chrome */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-[#FF5F56] ring-1 ring-[#E0443E]/50 shadow-xs" aria-hidden />
              <span className="size-3 rounded-full bg-[#FFBD2E] ring-1 ring-[#DEA123]/50 shadow-xs" aria-hidden />
              <span className="size-3 rounded-full bg-[#27C93F] ring-1 ring-[#1AAB29]/50 shadow-xs" aria-hidden />
              <span className="ml-3 hidden text-[0.75rem] font-bold text-slate-700 sm:inline">
                BITS Operations Hub · Enterprise Workstation
              </span>
            </div>

            {/* Omnibar */}
            <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1 text-[0.75rem] text-slate-400 shadow-xs md:flex">
              <svg className="size-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search accounts, queues, AI transcripts...</span>
              <kbd className="rounded bg-slate-100 px-1.5 py-0.5 text-[0.62rem] font-bold text-slate-500 ring-1 ring-slate-200">⌘K</kbd>
            </div>

            {/* Live Telephony Status */}
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-[0.68rem] font-bold text-emerald-700">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="uppercase tracking-wider">Live · 48 Agents Connected</span>
            </div>
          </div>

          <div className="flex min-h-[20rem] sm:min-h-[24rem] lg:min-h-[28rem]">
            {/* Sidebar (Desktop/Tablet) */}
            <aside className="hidden w-[13rem] shrink-0 flex-col border-r border-slate-100 bg-slate-50/60 p-4 md:flex">
              <div className="mb-5 flex items-center gap-2.5 px-2">
                <div className="flex size-6 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-xs shadow-xs">
                  B
                </div>
                <div>
                  <p className="text-[0.8rem] font-bold text-slate-900 leading-none">BITScrm Core</p>
                  <p className="text-[0.65rem] text-slate-500 mt-0.5">Fleet Ops v2026</p>
                </div>
              </div>
              <nav className="flex flex-col gap-1">
                {[
                  { name: "Live Dashboard", active: true, count: null },
                  { name: "Predictive Queue", active: false, count: "142" },
                  { name: "AI Voice Supervisor", active: false, count: "48" },
                  { name: "Collections & PTP", active: false, count: "₱148k" },
                  { name: "Accounting ERP", active: false, count: null },
                  { name: "Compliance Log", active: false, count: null },
                ].map((item) => (
                  <span
                    key={item.name}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2 text-[0.8rem] font-bold transition-all",
                      item.active
                        ? "bg-white text-blue-600 shadow-xs ring-1 ring-slate-200/80"
                        : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                    )}
                  >
                    <span>{item.name}</span>
                    {item.count && (
                      <span className="rounded bg-blue-50 px-1.5 py-0.2 text-[0.62rem] font-bold text-blue-600">
                        {item.count}
                      </span>
                    )}
                  </span>
                ))}
              </nav>

              <div className="mt-auto pt-4 border-t border-slate-100 text-[0.7rem] text-slate-400">
                <p className="font-semibold text-slate-600">Sovereign Cloud</p>
                <p className="font-mono text-[0.65rem]">latency: 18ms · TLS 1.3</p>
              </div>
            </aside>

            {/* Main Dashboard Content */}
            <div className="min-w-0 flex-1 bg-white">
              {/* Top Sub-Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5 sm:px-6">
                <div>
                  <h2 className="text-[0.88rem] font-bold text-slate-900">Portfolio Operations Overview</h2>
                  <p className="text-[0.72rem] font-medium text-slate-500">Real-time collections, dialer throughput, and automated agent logs</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[0.72rem] font-bold text-slate-700 shadow-2xs">
                    Today: {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-2 gap-3 p-4 sm:gap-4 sm:p-5 lg:grid-cols-4 lg:p-6">
                {dashboardStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3.5 sm:p-4 transition-all hover:border-slate-200 hover:bg-slate-50 shadow-2xs"
                  >
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 font-mono text-[1.25rem] sm:text-[1.5rem] font-bold tracking-tight text-slate-900">
                      {stat.value}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className={cn("text-[0.72rem] font-bold", stat.positive ? "text-emerald-600" : "text-red-600")}>
                        {stat.positive ? "↑" : "↓"} {stat.change}
                      </span>
                      <span className="text-[0.65rem] text-slate-400">vs target</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Accounts View (Desktop Table + Mobile Cards) */}
              <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[0.88rem] font-bold text-slate-900">Active Dialing & Collections Ledger</p>
                  <span className="hidden rounded-xl border border-slate-200 bg-white px-3 py-1 text-[0.72rem] font-medium text-slate-500 shadow-xs sm:inline-block">
                    Showing 4 of 1,420 accounts
                  </span>
                </div>

                {/* Desktop & Tablet Table */}
                <div className="hidden sm:block overflow-hidden rounded-2xl border border-slate-100">
                  <table className="w-full text-left text-[0.78rem]">
                    <caption className="sr-only">Synthetic collection accounts in BITS</caption>
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/90 text-[0.65rem] font-bold tracking-wider text-slate-500 uppercase">
                        <th scope="col" className="px-4 py-3">Account Reference</th>
                        <th scope="col" className="px-4 py-3">Campaign Portfolio</th>
                        <th scope="col" className="px-4 py-3">Balance Due</th>
                        <th scope="col" className="px-4 py-3">Resolution Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rows.slice(0, 4).map((row) => (
                        <tr key={row.id} className="transition-colors hover:bg-slate-50/60">
                          <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-slate-900">{row.id}</td>
                          <td className="px-4 py-3 font-medium text-slate-600">{row.campaign}</td>
                          <td className="whitespace-nowrap px-4 py-3 font-mono font-bold text-slate-900">{row.balance}</td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold",
                                row.status.toLowerCase().includes("ptp")
                                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500/20"
                                  : row.status.toLowerCase().includes("call")
                                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-500/20"
                                  : "bg-slate-100 text-slate-700"
                              )}
                            >
                              <span className="size-1 rounded-full bg-current" />
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Purpose-Built Mobile Feed (fits 375px screens with zero horizontal scroll) */}
                <div className="space-y-2.5 sm:hidden">
                  {rows.slice(0, 3).map((row) => (
                    <div
                      key={row.id}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-slate-900">{row.id}</span>
                        <span className="font-mono text-xs font-bold text-emerald-600">{row.balance}</span>
                      </div>
                      <p className="mt-1 text-[0.72rem] text-slate-600">{row.campaign}</p>
                      <div className="mt-2 flex items-center justify-between border-t border-slate-200/50 pt-2">
                        <span className="text-[0.68rem] font-bold text-blue-600">● {row.status}</span>
                        <span className="text-[0.65rem] text-slate-400 font-mono">Auto-Queued</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating companion iPhone mockup (Desktop/Tablet) */}
      <div className="absolute -bottom-6 -right-4 hidden w-[220px] sm:block lg:-right-8 lg:bottom-4 lg:w-[260px]" aria-hidden>
        <div className="rounded-[2.2rem] bg-slate-900/10 p-2 shadow-2xl shadow-blue-950/25 ring-1 ring-slate-900/10 backdrop-blur-xl">
          <div className="overflow-hidden rounded-[calc(2.2rem-8px)] border border-slate-200/90 bg-white shadow-inner">
            {/* iOS Dynamic Island header */}
            <div className="border-b border-slate-100 bg-slate-50/90 px-4 pt-3 pb-3">
              <div className="mx-auto mb-2 h-3.5 w-18 rounded-full bg-slate-900 shadow-xs" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[0.62rem] font-bold tracking-widest text-blue-600 uppercase">BITS Dialer</p>
                  <p className="text-[0.78rem] font-bold text-slate-900">Field Agent Mode</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-emerald-700">
                  <span className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>
            </div>

            <div className="space-y-2.5 p-3.5">
              <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 shadow-2xs">
                <p className="text-[0.62rem] font-bold uppercase tracking-wider text-slate-500">Collected Today</p>
                <p className="mt-0.5 font-mono text-[1.18rem] font-bold tracking-tight text-emerald-600">₱148,500</p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-50/50 p-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-emerald-700">Payment Alert</span>
                  <span className="text-[0.6rem] font-mono text-emerald-600">Just now</span>
                </div>
                <p className="mt-0.5 text-[0.78rem] font-bold text-slate-900">₱15,000 via InstaPay</p>
                <p className="text-[0.68rem] text-slate-500">ACC-10482 · PTP Fulfilled</p>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-50/50 p-2.5 shadow-2xs">
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
