"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { useConsultationModal } from "@/components/modals/consultation-modal-context";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function FeaturesBento() {
  const { openModal } = useConsultationModal();

  // Interactive state for Card 1 (Table row selections & active pagination)
  const [selectedRows, setSelectedRows] = React.useState<number[]>([1]);
  const [activePage, setActivePage] = React.useState<number>(3);
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  // Interactive state for Card 4 (Account Tagging & Dynamic Balance)
  const [activeTag, setActiveTag] = React.useState<string>("Bills");
  const balances: Record<string, string> = {
    Bills: "$ 764,98.00",
    Investment: "$ 1,248,500.00",
    Savings: "$ 452,120.00",
  };

  // Interactive export feedback for Card 5
  const [exported, setExported] = React.useState<boolean>(false);
  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
    openModal("Features & Templates Demo");
  };

  return (
    <Section
      id="features-bento"
      className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/20 to-white py-20 sm:py-28 lg:py-32"
    >
      {/* Subtle Celestial Ambient Atmosphere */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-radial from-blue-100/40 via-sky-50/20 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* ── SECTION HEADER ── */}
        <div className="mx-auto max-w-2xl text-center mb-14 sm:mb-18">
          <Reveal>
            {/* Pill Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/90 bg-sky-50/90 px-4 py-1 text-xs font-semibold text-sky-800 shadow-2xs mb-4">
              Why choose us
            </div>
          </Reveal>

          <Reveal delay={0.04}>
            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Features To Boost Your Productivity
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            {/* Subheading */}
            <p className="mt-4 text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-xl mx-auto text-pretty">
              Manage tasks, collaborate with your team, and track progress with tools designed to simplify your workflow.
            </p>
          </Reveal>
        </div>

        {/* ── 5-CARD BENTO GRID ── */}
        <div className="max-w-6xl mx-auto space-y-6 lg:space-y-8">
          {/* ════════════════════════════════════════════════════════════
              ROW 1: TWO WIDE CARDS (50% / 50%)
             ════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* ── CARD 1: ALL ASSETS IN ONE DASHBOARD ── */}
            <Reveal delay={0.04} className="h-full">
              {/* Double-Bezel Outer Shell */}
              <div className="group h-full flex flex-col justify-between rounded-[26px] p-2 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-xl shadow-blue-950/[0.03] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/[0.08] hover:border-blue-200">
                {/* Inner Core */}
                <div className="h-full flex flex-col justify-between rounded-[20px] bg-white border border-slate-100 p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                  {/* Top Visual Container: Ultra HD Interactive Table Mockup */}
                  <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-50/50 border border-slate-100/90 p-3.5 sm:p-4.5 flex flex-col justify-center min-h-[290px] overflow-hidden">
                    {/* The Table Window */}
                    <div className="w-full rounded-xl bg-white border border-slate-200/90 shadow-xs p-3 sm:p-4 text-xs">
                      {/* Table Header Controls */}
                      <div className="flex items-center justify-between gap-2 pb-3 mb-2 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <div className="size-5 rounded-md overflow-hidden bg-white border border-slate-200/80 p-0.5 shadow-2xs flex items-center justify-center">
                            <Logo variant="tile" className="size-full rounded-xs object-contain" />
                          </div>
                          <span className="font-bold text-slate-800 text-[13px]">
                            Latest Bookings Table
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {/* Search Input Box */}
                          <div className="relative flex items-center">
                            <span className="absolute left-2 text-slate-400 text-[10px]">
                              <svg
                                className="size-3 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                              </svg>
                            </span>
                            <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search accounts…"
                              aria-label="Search bookings table"
                              className="h-7 w-28 sm:w-36 rounded-lg border border-slate-200 bg-slate-50/80 pl-6 pr-2 text-[11px] text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-white"
                            />
                          </div>

                          {/* Filter Button */}
                          <button
                            type="button"
                            aria-label="Filter bookings table"
                            className="size-7 rounded-lg border border-slate-200 bg-slate-50/80 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors focus-visible:ring-1 focus-visible:ring-blue-500"
                          >
                            <svg
                              className="size-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Responsive Table Grid */}
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-[11px]">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-100 font-medium">
                              <th className="py-1.5 px-1.5 w-6">
                                <span className="size-3.5 rounded border border-slate-300 block bg-slate-50" />
                              </th>
                              <th className="py-1.5 px-2 font-medium">Booking ID</th>
                              <th className="py-1.5 px-2 font-medium">Guest Name</th>
                              <th className="py-1.5 px-2 font-medium">Room</th>
                              <th className="py-1.5 px-2 font-medium">Check-in</th>
                              <th className="py-1.5 px-2 font-medium">Check-out</th>
                              <th className="py-1.5 px-2 font-medium text-right">Nights</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700">
                            {/* Row 1 */}
                            <tr
                              onClick={() => toggleRow(1)}
                              className={cn(
                                "cursor-pointer transition-colors",
                                selectedRows.includes(1)
                                  ? "bg-blue-50/50"
                                  : "hover:bg-slate-50/80"
                              )}
                            >
                              <td className="py-2 px-1.5">
                                <div
                                  className={cn(
                                    "size-3.5 rounded flex items-center justify-center transition-colors",
                                    selectedRows.includes(1)
                                      ? "bg-blue-600 text-white"
                                      : "border border-slate-300 bg-white"
                                  )}
                                >
                                  {selectedRows.includes(1) && (
                                    <svg
                                      className="size-2.5 stroke-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </td>
                              <td className="py-2 px-2 font-semibold text-slate-800">
                                BKG-1001
                              </td>
                              <td className="py-2 px-2 font-medium">Alice Tan</td>
                              <td className="py-2 px-2 text-slate-500">205 (Deluxe)</td>
                              <td className="py-2 px-2 text-slate-500">2025-08-20</td>
                              <td className="py-2 px-2 text-slate-500">2025-08-23</td>
                              <td className="py-2 px-2 text-right font-medium text-slate-800">
                                3
                              </td>
                            </tr>

                            {/* Row 2 */}
                            <tr
                              onClick={() => toggleRow(2)}
                              className={cn(
                                "cursor-pointer transition-colors",
                                selectedRows.includes(2)
                                  ? "bg-blue-50/50"
                                  : "hover:bg-slate-50/80"
                              )}
                            >
                              <td className="py-2 px-1.5">
                                <div
                                  className={cn(
                                    "size-3.5 rounded flex items-center justify-center transition-colors",
                                    selectedRows.includes(2)
                                      ? "bg-blue-600 text-white"
                                      : "border border-slate-300 bg-white"
                                  )}
                                >
                                  {selectedRows.includes(2) && (
                                    <svg
                                      className="size-2.5 stroke-white"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth={3}
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 12.75 6 6 9-13.5"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </td>
                              <td className="py-2 px-2 font-semibold text-slate-800">
                                BKG-1002
                              </td>
                              <td className="py-2 px-2 font-medium">Ben Carter</td>
                              <td className="py-2 px-2 text-slate-500">112 (Standard)</td>
                              <td className="py-2 px-2 text-slate-500">2025-08-21</td>
                              <td className="py-2 px-2 text-slate-500">2025-08-24</td>
                              <td className="py-2 px-2 text-right font-medium text-slate-800">
                                3
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Footer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 mt-1 border-t border-slate-100 text-[10px] text-slate-400">
                        <span>Showing 1 to 10 of, 500 results</span>
                        <div className="flex items-center gap-1">
                          <span className="rounded border border-slate-200 px-1.5 py-0.5 text-slate-600">
                            Per page 10 ⌄
                          </span>
                        </div>
                        <div className="flex items-center gap-1 font-medium tabular-nums">
                          <button
                            type="button"
                            onClick={() => setActivePage((p) => Math.max(1, p - 1))}
                            aria-label="Previous page"
                            className="size-5 rounded flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                          >
                            ‹
                          </button>
                          {[1, 2, 3].map((page) => (
                            <button
                              key={page}
                              type="button"
                              onClick={() => setActivePage(page)}
                              aria-label={`Page ${page}`}
                              className={cn(
                                "size-5 rounded flex items-center justify-center transition-colors focus-visible:ring-1 focus-visible:ring-blue-500",
                                activePage === page
                                  ? "bg-blue-600 text-white font-bold"
                                  : "text-slate-600 hover:bg-slate-100"
                              )}
                            >
                              {page}
                            </button>
                          ))}
                          <span className="px-0.5">…</span>
                          <button
                            type="button"
                            onClick={() => setActivePage(5)}
                            aria-label="Page 5"
                            className={cn(
                              "size-5 rounded flex items-center justify-center transition-colors focus-visible:ring-1 focus-visible:ring-blue-500",
                              activePage === 5
                                ? "bg-blue-600 text-white font-bold"
                                : "text-slate-600 hover:bg-slate-100"
                            )}
                          >
                            5
                          </button>
                          <button
                            type="button"
                            onClick={() => setActivePage((p) => Math.min(5, p + 1))}
                            aria-label="Next page"
                            className="size-5 rounded flex items-center justify-center border border-slate-200 text-slate-500 hover:bg-slate-100 focus-visible:ring-1 focus-visible:ring-blue-500"
                          >
                            ›
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Below Visual */}
                  <div className="pt-6">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      All assets in one dashboard
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 font-normal leading-relaxed">
                      Sync account queues via API or direct CSV ingestion — track 9 recovery categories across 10,000+ accounts in real time.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── CARD 2: CUSTOM PAGES AND WIDGETS ── */}
            <Reveal delay={0.08} className="h-full">
              {/* Double-Bezel Outer Shell */}
              <div className="group h-full flex flex-col justify-between rounded-[26px] p-2 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-xl shadow-blue-950/[0.03] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/[0.08] hover:border-blue-200">
                {/* Inner Core */}
                <div className="h-full flex flex-col justify-between rounded-[20px] bg-white border border-slate-100 p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                  {/* Top Visual Container: Modular Pages & Widgets Mockup */}
                  <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-50/50 border border-slate-100/90 p-4 sm:p-5 flex flex-col justify-center min-h-[290px] overflow-hidden">
                    {/* Modern Wireframe Grid Layout */}
                    <div className="w-full space-y-3">
                      {/* Top Nav Line with BITS Logo & Blue Active Tab */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-100/80">
                        <div className="flex items-center gap-2">
                          <div className="size-5 rounded-md overflow-hidden bg-white border border-slate-200/80 p-0.5 shadow-2xs flex items-center justify-center">
                            <Logo variant="tile" className="size-full rounded-xs object-contain" />
                          </div>
                          <div className="h-3 w-14 rounded-full bg-blue-600 shadow-xs" />
                          <div className="h-2 w-10 rounded-full bg-slate-200/80" />
                          <div className="h-2 w-8 rounded-full bg-slate-200/60" />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-slate-300" />
                          <span className="size-1.5 rounded-full bg-slate-300" />
                          <span className="size-1.5 rounded-full bg-slate-300" />
                        </div>
                      </div>

                      {/* Main Canvas with Modular Widgets */}
                      <div className="grid grid-cols-12 gap-2.5">
                        {/* Left Sidebar Menu */}
                        <div className="col-span-3 rounded-xl bg-white border border-slate-200/80 p-2.5 space-y-2 shadow-2xs">
                          <div className="h-2 w-full rounded bg-blue-100" />
                          <div className="h-2 w-4/5 rounded bg-slate-100" />
                          <div className="h-2 w-3/4 rounded bg-slate-100" />
                          <div className="h-2 w-2/3 rounded bg-slate-100" />
                        </div>

                        {/* Top-Right Widget 1: Metric Tile */}
                        <div className="col-span-5 rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <div className="size-2 rounded-full bg-blue-500" />
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                              +24%
                            </span>
                          </div>
                          {/* Mini Bar Sparkline */}
                          <div className="mt-3 flex items-end gap-1 h-6">
                            <div className="w-1.5 h-3 bg-blue-200 rounded-xs" />
                            <div className="w-1.5 h-4 bg-blue-300 rounded-xs" />
                            <div className="w-1.5 h-6 bg-blue-600 rounded-xs" />
                            <div className="w-1.5 h-5 bg-blue-400 rounded-xs" />
                          </div>
                        </div>

                        {/* Top-Right Widget 2: Compact Card */}
                        <div className="col-span-4 rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs flex flex-col justify-center items-center">
                          <div className="size-6 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-1">
                            <svg
                              className="size-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Z"
                              />
                            </svg>
                          </div>
                          <div className="h-1.5 w-10 bg-slate-200 rounded-full" />
                        </div>

                        {/* Bottom-Wide Widget: Custom Canvas Scenario Box */}
                        <div className="col-span-6 rounded-xl bg-white border border-slate-200/80 p-3 shadow-2xs space-y-2">
                          <div className="h-2 w-16 bg-slate-300 rounded" />
                          <div className="h-4 w-full bg-blue-50 rounded border border-blue-100" />
                        </div>

                        {/* Bottom-Right Widget: Soft Gradient Preview Tile */}
                        <div className="col-span-6 rounded-xl border border-dashed border-blue-300/80 bg-gradient-to-br from-blue-500/10 via-sky-400/5 to-transparent p-3 flex items-center justify-center">
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
                            <span>+ Custom Widget</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Below Visual */}
                  <div className="pt-6">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Custom pages and widgets
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 font-normal leading-relaxed">
                      Create custom widgets and organize them into pages to forecast, analyze, and model scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ════════════════════════════════════════════════════════════
              ROW 2: THREE COLUMNS (33% / 33% / 33%)
             ════════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* ── CARD 3: MULTI-CURRENCY PAYMENT ── */}
            <Reveal delay={0.06} className="h-full">
              {/* Double-Bezel Outer Shell */}
              <div className="group h-full flex flex-col justify-between rounded-[26px] p-2 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-xl shadow-blue-950/[0.03] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/[0.08] hover:border-blue-200">
                {/* Inner Core */}
                <div className="h-full flex flex-col justify-between rounded-[20px] bg-white border border-slate-100 p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                  {/* Top Visual: Multi-Currency Card with Overlapping Country Badges */}
                  <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-50/50 border border-slate-100/90 p-4 sm:p-5 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                    {/* Financial Asset Card */}
                    <div className="w-full max-w-[240px] rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-sm space-y-2.5">
                      {/* Row 1: Stocks */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-slate-800">Stocks</div>
                          <div className="text-[9px] text-slate-400">2 asset tiers ⌄</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[12px] font-extrabold text-slate-900">$ 16.7k</div>
                          <div className="text-[9px] font-bold text-slate-400">12%</div>
                        </div>
                      </div>

                      <div className="border-t border-slate-100" />

                      {/* Row 2: Crypto */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[11px] font-bold text-slate-800">Crypto</div>
                          <div className="text-[9px] text-slate-400">7 asset items ⌄</div>
                        </div>
                        <div className="text-right">
                          <div className="text-[12px] font-extrabold text-slate-900">$ 16.7k</div>
                          <div className="text-[9px] font-bold text-slate-400">0.7%</div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Circular Flag Badges (Exactly positioned cluster from screenshot) */}
                    <div className="flex items-center justify-center -space-x-1.5 mt-5">
                      {/* Taiwan Flag */}
                      <div
                        className="relative size-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-red-600 flex items-center justify-center group-hover:scale-105 transition-transform"
                        title="Taiwan (TWD)"
                      >
                        <div className="absolute top-0 left-0 w-4 h-4 bg-blue-800 flex items-center justify-center">
                          <div className="size-2 rounded-full bg-white flex items-center justify-center">
                            <div className="size-1 rounded-full bg-blue-800" />
                          </div>
                        </div>
                      </div>

                      {/* Malaysia Flag */}
                      <div
                        className="relative size-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-white flex flex-col justify-between group-hover:scale-105 transition-transform"
                        title="Malaysia (MYR)"
                      >
                        <div className="h-1 bg-red-600 w-full" />
                        <div className="h-1 bg-white w-full" />
                        <div className="h-1 bg-red-600 w-full" />
                        <div className="h-1 bg-white w-full" />
                        <div className="h-1 bg-red-600 w-full" />
                        <div className="absolute top-0 left-0 w-4 h-4 bg-blue-900 flex items-center justify-center">
                          <span className="text-[8px] text-amber-300 font-bold">★</span>
                        </div>
                      </div>

                      {/* UK Flag (Union Jack) */}
                      <div
                        className="relative size-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-blue-900 z-10 group-hover:scale-110 transition-transform"
                        title="United Kingdom (GBP)"
                      >
                        <svg className="size-full" viewBox="0 0 60 30">
                          <clipPath id="s">
                            <path d="M0,0 v30 h60 v-30 z" />
                          </clipPath>
                          <clipPath id="t">
                            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
                          </clipPath>
                          <g clipPath="url(#s)">
                            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
                            <path
                              d="M0,0 L60,30 M60,0 L0,30"
                              clipPath="url(#t)"
                              stroke="#C8102E"
                              strokeWidth="4"
                            />
                            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
                            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
                          </g>
                        </svg>
                      </div>

                      {/* Global Currency / Compass Badge */}
                      <div
                        className="relative size-8 rounded-full border-2 border-white shadow-md overflow-hidden bg-blue-800 flex items-center justify-center text-white text-[10px] font-bold group-hover:scale-105 transition-transform"
                        title="Global Currency Gateway"
                      >
                        <span>$</span>
                      </div>

                      {/* Country / Currency Green Badge */}
                      <div
                        className="relative size-7 rounded-full border-2 border-white shadow-md overflow-hidden bg-emerald-600 flex items-center justify-center text-white text-[9px] font-bold group-hover:scale-105 transition-transform"
                        title="Direct Bank Settlement"
                      >
                        <span>₱</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Below Visual */}
                  <div className="pt-6">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Multi-Currency Payments &amp; Reconciliation
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 font-normal leading-relaxed">
                      Access accounts across 12 countries, track recovery portfolios and bank settlements in major regional currencies.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── CARD 4: ACCOUNT TAGGING & ORGANISATION ── */}
            <Reveal delay={0.1} className="h-full">
              {/* Double-Bezel Outer Shell */}
              <div className="group h-full flex flex-col justify-between rounded-[26px] p-2 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-xl shadow-blue-950/[0.03] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/[0.08] hover:border-blue-200">
                {/* Inner Core */}
                <div className="h-full flex flex-col justify-between rounded-[20px] bg-white border border-slate-100 p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                  {/* Top Visual: 3D Stacked Cards with Interactive Filter Tag Pills */}
                  <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-50/50 border border-slate-100/90 p-4 sm:p-5 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                    {/* Layered Card Stack Mockup */}
                    <div className="relative w-full max-w-[210px] flex flex-col items-center">
                      {/* Back Layer Card */}
                      <div className="w-[170px] h-10 rounded-xl bg-blue-100/70 border border-blue-200/80 -mb-7 scale-90 opacity-40 shadow-xs" />

                      {/* Middle Layer Card */}
                      <div className="w-[190px] h-11 rounded-xl bg-white/90 border border-slate-200 -mb-7 scale-95 opacity-70 shadow-xs" />

                      {/* Front Hero Card */}
                      <div className="relative z-10 w-full rounded-xl bg-white border border-slate-200/90 p-3.5 shadow-md">
                        {/* Card Header Pill */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="size-4 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[9px]">
                            👤
                          </span>
                          <span className="text-[11px] font-bold text-slate-800">Personal</span>
                        </div>

                        {/* Balance Content */}
                        <div className="text-[9px] text-slate-400 font-medium">Available balance</div>
                        <div className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
                          {balances[activeTag] || "$ 764,98.00"}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Cushion Filter Tag Row */}
                    <div className="flex items-center gap-1.5 mt-5">
                      {(["Bills", "Investment", "Savings"] as const).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setActiveTag(tag)}
                          className={cn(
                            "rounded-full px-3 py-1 text-[11px] font-bold transition-all duration-200 cursor-pointer",
                            activeTag === tag
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          )}
                        >
                          {tag}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => openModal("Account Tagging & Custom Rules Demo")}
                        className="size-6 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                        title="Add custom tag"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Card Content Below Visual */}
                  <div className="pt-6">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Smart Account Tagging &amp; Organization
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 font-normal leading-relaxed">
                      Organize distressed debtor portfolios with dynamic cushion tags, priority flags, and automated assignment routing.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── CARD 5: TEMPLATES, SHORTCUTS & AI ── */}
            <Reveal delay={0.14} className="h-full">
              {/* Double-Bezel Outer Shell */}
              <div className="group h-full flex flex-col justify-between rounded-[26px] p-2 bg-gradient-to-b from-blue-50/70 via-slate-100/50 to-blue-50/40 border border-blue-100/90 shadow-xl shadow-blue-950/[0.03] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/[0.08] hover:border-blue-200">
                {/* Inner Core */}
                <div className="h-full flex flex-col justify-between rounded-[20px] bg-white border border-slate-100 p-6 sm:p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]">
                  {/* Top Visual: Connected App Node Network & Export File Button */}
                  <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-50/90 via-blue-50/20 to-slate-50/50 border border-slate-100/90 p-4 sm:p-5 flex flex-col items-center justify-center min-h-[260px] overflow-hidden">
                    {/* Visual Node Network */}
                    <div className="relative w-full max-w-[240px] h-[130px] flex items-center justify-center">
                      {/* Central SVG Connection Lines radiating outward */}
                      <svg
                        className="absolute inset-0 size-full pointer-events-none stroke-blue-300/80"
                        strokeWidth="1.5"
                        fill="none"
                      >
                        {/* Line to Meta (Top-Left) */}
                        <line x1="120" y1="65" x2="35" y2="25" />
                        {/* Line to Notion (Left-Center) */}
                        <line x1="120" y1="65" x2="55" y2="65" />
                        {/* Line to Orange (Bottom-Left) */}
                        <line x1="120" y1="65" x2="35" y2="105" />
                        {/* Line to Slack (Top-Right) */}
                        <line x1="120" y1="65" x2="205" y2="25" />
                        {/* Line to Asterisk (Right-Center) */}
                        <line x1="120" y1="65" x2="185" y2="65" />
                        {/* Line to Shopify (Bottom-Right) */}
                        <line x1="120" y1="65" x2="205" y2="105" />
                      </svg>

                      {/* App Node 1: Meta Infinity (Top Left) */}
                      <div className="absolute left-4 top-2 size-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs text-xs font-bold">
                        ∞
                      </div>

                      {/* App Node 2: Notion (Left Center) */}
                      <div className="absolute left-10 top-[50px] size-7 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-xs font-serif text-xs font-bold">
                        N
                      </div>

                      {/* App Node 3: Orange Icon (Bottom Left) */}
                      <div className="absolute left-4 bottom-2 size-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs font-bold text-xs">
                        ⚡
                      </div>

                      {/* Central Blue Node (Center Hub with BITS Infinity Brand Mark) */}
                      <div className="relative z-10 size-12 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 p-0.5 text-white flex items-center justify-center shadow-lg shadow-sky-400/40 ring-4 ring-sky-100/80 group-hover:scale-105 transition-transform">
                        <div className="size-full rounded-lg overflow-hidden bg-white p-0.5 flex items-center justify-center">
                          <Logo variant="tile" className="size-full rounded-md object-contain" />
                        </div>
                      </div>

                      {/* App Node 4: Slack / Multi-color (Top Right) */}
                      <div className="absolute right-4 top-2 size-7 rounded-lg bg-white border border-slate-200 text-slate-800 flex items-center justify-center shadow-xs text-xs font-bold">
                        #
                      </div>

                      {/* App Node 5: Asterisk / Zapier (Right Center) */}
                      <div className="absolute right-10 top-[50px] size-7 rounded-lg bg-orange-500 text-white flex items-center justify-center shadow-xs font-black text-xs">
                        ✱
                      </div>

                      {/* App Node 6: Shopify Green (Bottom Right) */}
                      <div className="absolute right-4 bottom-2 size-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs text-xs font-bold">
                        S
                      </div>
                    </div>

                    {/* Blue Action Pill Button */}
                    <button
                      type="button"
                      onClick={handleExport}
                      className="mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white px-6 py-2 text-xs font-bold shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {exported ? "Exporting File…" : "Export file"}
                    </button>
                  </div>

                  {/* Card Content Below Visual */}
                  <div className="pt-6">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                      Templates, Shortcuts &amp; AI
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 font-normal leading-relaxed">
                      Export queues into formatted Excel sheets, audit-ready PDF reports, or connect via webhooks and AI automations.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
