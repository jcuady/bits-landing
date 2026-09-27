"use client";

import * as React from "react";
import { useSales } from "@/lib/products/crm-sales/store";
import {
  FileSpreadsheet,
  Sparkles,
  Download,
  Send,
  CheckCircle2,
  ShieldAlert,
  Building2,
  Calculator,
  Printer,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function CPQPage() {
  const {
    cpqCatalog,
    toggleCpqItem,
    updateCpqQuantity,
    cpqSeats,
    setCpqSeats,
    cpqDiscount,
    setCpqDiscount,
    cpqClientCompany,
    setCpqClientCompany,
    cpqTotals,
  } = useSales();

  const [isPdfModalOpen, setIsPdfModalOpen] = React.useState(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);

  const requiresApproval = cpqDiscount > 15;

  const handleSendEmail = () => {
    setIsEmailSent(true);
    setTimeout(() => setIsEmailSent(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              1-Click Enterprise CPQ Proposal Engine
            </h1>
            <Badge variant="outline" className="border-electric-500/30 bg-electric-500/10 text-electric-400 text-xs font-semibold">
              BIR CAS Compliant
            </Badge>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Configure enterprise software licenses, add-on modules, and calculate Philippine 12% VAT in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setIsPdfModalOpen(true)}
            size="sm"
            className="bg-electric-600 hover:bg-electric-500 font-semibold cursor-pointer text-xs h-9"
          >
            <Printer className="h-3.5 w-3.5 mr-1.5" />
            <span>Generate Official Proposal</span>
          </Button>
        </div>
      </div>

      {/* Main Grid: Config on Left, Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel (2 cols) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Client & Seats Selector */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              1. Proposal Recipient & Deployment Scope
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Enterprise Client Account
                </label>
                <input
                  type="text"
                  value={cpqClientCompany}
                  onChange={(e) => setCpqClientCompany(e.target.value)}
                  placeholder="e.g. SM Prime Holdings, Inc."
                  className="w-full h-10 rounded-xl border border-slate-700 bg-slate-800 px-3.5 text-xs text-white outline-none focus:border-electric-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-slate-300">
                    Licensed User Seats
                  </label>
                  <span className="font-mono font-bold text-electric-400 text-xs">
                    {cpqSeats} Seats
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={250}
                  step={5}
                  value={cpqSeats}
                  onChange={(e) => setCpqSeats(Number(e.target.value))}
                  className="w-full accent-electric-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>5 seats (Pilot)</span>
                  <span>100 seats (Enterprise)</span>
                  <span>250+ seats</span>
                </div>
              </div>
            </div>
          </div>

          {/* Module Selector */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              2. Select Software Modules & Add-ons
            </h2>

            <div className="space-y-3">
              {cpqCatalog.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCpqItem(item.id)}
                  className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
                    item.selected
                      ? "border-electric-500/50 bg-electric-950/20"
                      : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => {}} // Handled by container onClick
                      className="mt-1 h-4 w-4 rounded border-slate-700 accent-electric-600 cursor-pointer"
                    />
                    <div>
                      <div className="font-semibold text-xs text-white">{item.name}</div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {item.monthlyPerSeat > 0 ? (
                      <div>
                        <div className="font-mono font-bold text-xs text-emerald-400">
                          ₱{item.monthlyPerSeat.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500">per seat / mo</div>
                      </div>
                    ) : (
                      <div>
                        <div className="font-mono font-bold text-xs text-emerald-400">
                          ₱{item.annualFlatPrice?.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500">flat annual fee</div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discount & Approval Guardrail */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. Executive Volume Discount Guardrail
                </h2>
                <p className="text-[11px] text-slate-400">
                  Discounts over 15% automatically flag a requirement for Sales Director sign-off.
                </p>
              </div>
              <div className="text-right font-mono font-bold text-sm text-amber-400">
                {cpqDiscount}% Discount
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={30}
              step={1}
              value={cpqDiscount}
              onChange={(e) => setCpqDiscount(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
            />

            {requiresApproval && (
              <div className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-300 animate-in fade-in">
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400" />
                <span>
                  High-Discount Alert: A {cpqDiscount}% discount triggers an automated approval request to Marco Dela Cruz (Sales Director) prior to binding contract issuance.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Real-time Financial Rollup (1 col) */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900 to-navy-950 p-6 sticky top-14 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Calculator className="h-4 w-4 text-electric-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Philippine Enterprise Quotation
              </h3>
            </div>

            {/* Calculations breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Monthly Recurring ({cpqSeats} seats)</span>
                <span className="font-mono text-slate-200">
                  ₱{cpqTotals.monthlyRecurring.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>Annual Software Subtotal</span>
                <span className="font-mono text-slate-200">
                  ₱{cpqTotals.annualBase.toLocaleString()}
                </span>
              </div>

              {cpqTotals.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Volume Discount ({cpqDiscount}%)</span>
                  <span className="font-mono">
                    -₱{cpqTotals.discountAmount.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                <span>Net Taxable Subtotal</span>
                <span className="font-mono font-semibold">
                  ₱{cpqTotals.subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-slate-400">
                <span>BIR Value Added Tax (12% VAT)</span>
                <span className="font-mono">
                  ₱{cpqTotals.vatAmount.toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-700/80">
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Total Annual Contract Value (ACV)
                </div>
                <div className="mt-1 text-2xl font-bold text-emerald-400 font-mono tracking-tight">
                  ₱{Math.round(cpqTotals.totalAnnualPh).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Includes 12% PH VAT • Billed Annually
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <Button
                onClick={() => setIsPdfModalOpen(true)}
                className="w-full bg-electric-600 hover:bg-electric-500 text-xs font-semibold h-10 cursor-pointer"
              >
                <Printer className="h-3.5 w-3.5 mr-2" />
                <span>Preview & Print Official Proposal</span>
              </Button>

              <Button
                onClick={handleSendEmail}
                variant="outline"
                className="w-full border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold h-10 cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 mr-2 text-electric-400" />
                <span>Dispatch to Client (Simulation)</span>
              </Button>

              {isEmailSent && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-2.5 text-xs text-emerald-300 text-center animate-in fade-in flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Proposal dispatched to {cpqClientCompany} Procurement!</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Official PDF Document Preview Modal */}
      {isPdfModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-white text-slate-900 p-8 shadow-2xl relative my-8">
            {/* Close Button */}
            <button
              onClick={() => setIsPdfModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Document Header */}
            <div className="flex items-start justify-between border-b pb-6 border-slate-200">
              <div>
                <div className="text-xl font-black tracking-tight text-navy-950">
                  BOUNDLESS IT SOLUTIONS (BITS)
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Enterprise Cloud & Applied AI Division<br />
                  Bonifacio Global City, Taguig, Metro Manila, Philippines<br />
                  TIN: 009-418-294-000 • BIR CAS Registered
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  OFFICIAL COMMERCIAL PROPOSAL
                </div>
                <div className="text-sm font-mono font-bold text-navy-950 mt-1">
                  PROP-2026-PH-{Date.now().toString().slice(-4)}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">Date: September 2026</div>
              </div>
            </div>

            {/* Client Info */}
            <div className="my-6 grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-bold text-slate-400 uppercase text-[10px]">PREPARED FOR:</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{cpqClientCompany}</div>
                <div className="text-slate-600 mt-0.5">Enterprise Operations & Commercial Division</div>
                <div className="text-slate-600">Metro Manila, Philippines</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-slate-400 uppercase text-[10px]">PREPARED BY:</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">Boundless IT Solutions</div>
                <div className="text-slate-600 mt-0.5">Marco Dela Cruz, Sales Director</div>
                <div className="text-slate-600">Enterprise Solutions Architect Team</div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 font-bold uppercase text-[10px] text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="p-3">Item / Software Module</th>
                    <th className="p-3 text-center">Seats / Qty</th>
                    <th className="p-3 text-right">Unit Rate</th>
                    <th className="p-3 text-right">Annual Total (₱)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cpqCatalog
                    .filter((item) => item.selected)
                    .map((item) => {
                      const itemTotal =
                        item.monthlyPerSeat > 0
                          ? item.monthlyPerSeat * cpqSeats * 12
                          : (item.annualFlatPrice || 0) * item.quantity;
                      return (
                        <tr key={item.id}>
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{item.name}</div>
                            <div className="text-[11px] text-slate-500">{item.description}</div>
                          </td>
                          <td className="p-3 text-center font-mono">
                            {item.monthlyPerSeat > 0 ? `${cpqSeats} seats` : `${item.quantity} lic`}
                          </td>
                          <td className="p-3 text-right font-mono text-slate-700">
                            {item.monthlyPerSeat > 0
                              ? `₱${item.monthlyPerSeat.toLocaleString()}/mo`
                              : `₱${(item.annualFlatPrice || 0).toLocaleString()}`}
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-slate-900">
                            ₱{itemTotal.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-72 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Gross Annual Software:</span>
                  <span className="font-mono">₱{cpqTotals.annualBase.toLocaleString()}</span>
                </div>
                {cpqTotals.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Enterprise Volume Discount ({cpqDiscount}%):</span>
                    <span className="font-mono">-₱{cpqTotals.discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-700 pt-2 border-t border-slate-200">
                  <span>Net Taxable Base:</span>
                  <span className="font-mono font-bold">₱{cpqTotals.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Value Added Tax (12% BIR VAT):</span>
                  <span className="font-mono">₱{cpqTotals.vatAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-navy-950 pt-2 border-t-2 border-slate-900">
                  <span>Total Amount Due (₱ PHP):</span>
                  <span className="font-mono">₱{Math.round(cpqTotals.totalAnnualPh).toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Terms & Signature Blocks */}
            <div className="border-t border-slate-200 pt-6 text-[10px] text-slate-500 space-y-4">
              <div>
                <strong>Commercial Terms:</strong> Valid for 30 calendar days. Payment terms: Net 30 upon invoice issuance. BDO Unibank Corporate Bank Transfer or Check. Hosted on BITS Manila Low-Latency Infrastructure.
              </div>
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="border-t border-slate-300 pt-2">
                  <div className="font-bold text-slate-800">Authorized Signature - Boundless IT Solutions</div>
                  <div className="text-[10px] text-slate-500">Marco Dela Cruz, Sales Director</div>
                </div>
                <div className="border-t border-slate-300 pt-2">
                  <div className="font-bold text-slate-800">Accepted & Conforme - {cpqClientCompany}</div>
                  <div className="text-[10px] text-slate-500">Authorized Representative & Date</div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPdfModalOpen(false)}
                className="text-xs"
              >
                Close Preview
              </Button>
              <Button
                size="sm"
                onClick={handlePrint}
                className="bg-navy-900 hover:bg-navy-800 text-white text-xs font-semibold"
              >
                <Printer className="h-3.5 w-3.5 mr-1.5" />
                <span>Print or Save as PDF</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
