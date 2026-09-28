"use client";

import * as React from "react";
import { Plus, Trash2, Zap, Pause, Play, Mail, CheckCircle2, ShieldCheck, RefreshCw, Send, Clock, AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useCrm } from "@/lib/crm/store";
import { formatPct } from "@/lib/crm/selectors";
import { useToast } from "@/components/crm/crm-toast";
import type { AutomationStatus } from "@/lib/crm/types";
import { cn } from "@/lib/utils";

interface EmailLogItem {
  id: string;
  resend_id: string | null;
  direction: string;
  recipient: string;
  sender: string;
  subject: string;
  template: string;
  status: string;
  error_message: string | null;
  sent_at: string;
}

export default function AutomationsPage() {
  const { state, setAutomationStatus, addAutomation, deleteAutomation } = useCrm();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = React.useState<"automations" | "email_logs">("automations");
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Email Logs State from Supabase
  const [emailLogs, setEmailLogs] = React.useState<EmailLogItem[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = React.useState(false);

  // New Automation Form State
  const [autoForm, setAutoForm] = React.useState({
    name: "",
    trigger: "New Contact Form Submission",
    status: "active" as AutomationStatus,
  });

  const fetchEmailLogs = React.useCallback(async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch("/api/crm/email-logs");
      const json = await res.json();
      if (json.ok && Array.isArray(json.logs)) {
        setEmailLogs(json.logs);
      }
    } catch (err) {
      console.error("Failed to load email logs:", err);
    } finally {
      setIsLoadingLogs(false);
    }
  }, []);

  React.useEffect(() => {
    if (activeTab === "email_logs") {
      fetchEmailLogs();
    }
  }, [activeTab, fetchEmailLogs]);

  const rows = state.automations.filter((a) => {
    const hay = `${a.name} ${a.trigger}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (status === "all" || a.status === status);
  });

  const handleCreateAutomation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!autoForm.name.trim()) {
      showToast("Please enter an automation workflow title.", "error");
      return;
    }

    addAutomation({
      name: autoForm.name.trim(),
      trigger: autoForm.trigger,
      status: autoForm.status,
    });

    // Also persist to Supabase if reachable
    fetch("/api/crm/automations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: autoForm.name.trim(),
        trigger_type: autoForm.trigger.toLowerCase().replaceAll(" ", "_"),
        action_type: "send_email",
        description: `Automated marketing action triggered on ${autoForm.trigger}`,
        status: autoForm.status,
      }),
    }).catch(console.error);

    showToast(`Workflow "${autoForm.name}" activated.`);
    setIsModalOpen(false);
    setAutoForm({
      name: "",
      trigger: "New Contact Form Submission",
      status: "active",
    });
  };

  return (
    <div className="space-y-6">
      {/* Resend Verified Domain Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200/90 bg-gradient-to-r from-emerald-50/80 via-white to-blue-50/50 p-4 shadow-2xs dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
            <ShieldCheck className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Resend Domain Verified: <span className="font-mono text-emerald-600">boundlessits.com</span>
              </span>
              <span className="rounded-full bg-emerald-100 border border-emerald-200 px-2 py-0.5 text-[0.62rem] font-extrabold uppercase text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                Live &amp; Verified
              </span>
            </div>
            <p className="text-[0.72rem] text-slate-600 dark:text-slate-400 mt-0.5">
              Sender: <strong className="text-slate-800 dark:text-slate-200">inquiries@boundlessits.com</strong> · Forwarding to: <strong className="text-slate-800 dark:text-slate-200">boundlessitsolutions@gmail.com</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setActiveTab("email_logs");
              fetchEmailLogs();
              showToast("Email delivery telemetry refreshed.");
            }}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs transition-colors hover:bg-slate-50 dark:border-[#242424] dark:bg-[#1a1a1a] dark:text-slate-300"
          >
            <RefreshCw className={cn("size-3.5", isLoadingLogs && "animate-spin")} />
            <span>Check Telemetry</span>
          </button>
        </div>
      </div>

      <PageHeader
        title="Marketing & Operational Automations"
        description="Event-driven lead triage, instant wish list auto-responders, and verified email delivery."
        actions={
          <div className="flex items-center gap-2">
            <CrmButton
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5"
            >
              <Plus className="size-4" />
              <span>New Automation</span>
            </CrmButton>
          </div>
        }
      />

      {/* Mode Switcher Tabs */}
      <div className="flex items-center gap-1 rounded-xl border border-border bg-muted/50 p-1 w-max dark:border-[#242424]">
        <button
          type="button"
          onClick={() => setActiveTab("automations")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all",
            activeTab === "automations"
              ? "bg-card text-foreground shadow-xs dark:bg-[#1a1a1a]"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Zap className="size-3.5 text-blue-600" />
          <span>Automation Workflows ({rows.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("email_logs")}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all",
            activeTab === "email_logs"
              ? "bg-card text-foreground shadow-xs dark:bg-[#1a1a1a]"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Mail className="size-3.5 text-emerald-600" />
          <span>Email Delivery Logs</span>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 text-[0.62rem] font-bold text-emerald-700">
            Resend Live
          </span>
        </button>
      </div>

      {activeTab === "automations" && (
        <div className="space-y-4">
          <FilterBar value={q} onChange={setQ} placeholder="Search automations by workflow or trigger…">
            <StatusFilter
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "All statuses" },
                { value: "active", label: "Active" },
                { value: "paused", label: "Paused" },
              ]}
            />
          </FilterBar>

          {rows.length === 0 ? (
            <EmptyState
              title="No automations match"
              description="Try another search or status filter, or create an automated workflow."
              action={
                <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
                  <Plus className="size-4 mr-1.5" />
                  Build First Workflow
                </CrmButton>
              }
            />
          ) : (
            <ul className="space-y-3">
              {rows.map((a) => (
                <li
                  key={a.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-xs transition-colors hover:border-[#1975f2]/40 dark:border-[#242424] dark:bg-[#141414] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-[#1975f2] dark:bg-blue-950/60 dark:text-blue-400">
                        <Zap className="size-4" />
                      </span>
                      <p className="text-[0.92rem] font-bold text-foreground">{a.name}</p>
                      <StatusBadge status={a.status} />
                    </div>
                    <p className="mt-1.5 text-xs text-muted-foreground pl-9 leading-relaxed">
                      <span className="font-semibold text-foreground">Trigger:</span> {a.trigger} ·{" "}
                      <span className="font-mono">{a.runs30d} runs (30d)</span> ·{" "}
                      <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatPct(a.successRate)} success
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pl-9 sm:pl-0">
                    <CrmButton
                      onClick={() => {
                        const next: AutomationStatus = a.status === "active" ? "paused" : "active";
                        setAutomationStatus(a.id, next);
                        showToast(`Automation ${next === "active" ? "activated" : "paused"}.`);
                      }}
                      className="h-8 gap-1 px-2.5 text-xs"
                    >
                      {a.status === "active" ? (
                        <>
                          <Pause className="size-3 text-amber-500" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="size-3 text-emerald-600" />
                          <span>Activate</span>
                        </>
                      )}
                    </CrmButton>
                    <CrmButton
                      variant="outline"
                      onClick={() => {
                        deleteAutomation(a.id);
                        showToast("Automation removed.");
                      }}
                      className="size-8 p-0 text-muted-foreground hover:text-rose-600"
                      aria-label="Delete automation"
                    >
                      <Trash2 className="size-3.5" />
                    </CrmButton>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "email_logs" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Real-time email transmission logs persisted in Supabase <code className="font-mono">public.email_logs</code></span>
            <button
              type="button"
              onClick={fetchEmailLogs}
              className="flex items-center gap-1 font-semibold text-blue-600 hover:underline"
            >
              <RefreshCw className={cn("size-3", isLoadingLogs && "animate-spin")} />
              <span>Refresh Logs</span>
            </button>
          </div>

          {emailLogs.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-xs">
              <Mail className="mx-auto size-8 text-muted-foreground opacity-60" />
              <p className="mt-2 text-sm font-bold text-foreground">No Email Logs Found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Submissions through the website contact form or wish list will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-xs">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border bg-muted/60 text-[0.68rem] font-bold text-muted-foreground uppercase tracking-wider">
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Recipient</th>
                    <th className="px-4 py-3">Subject</th>
                    <th className="px-4 py-3">Template</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Resend ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60 font-mono">
                  {emailLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">
                        {new Date(log.sent_at).toLocaleString("en-PH", { timeZone: "Asia/Manila" })}
                      </td>
                      <td className="px-4 py-3 font-sans font-semibold text-foreground">
                        {log.recipient}
                      </td>
                      <td className="px-4 py-3 font-sans text-slate-700 dark:text-slate-300 max-w-[240px] truncate">
                        {log.subject}
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-muted px-2 py-0.5 text-[0.68rem] font-medium text-slate-600">
                          {log.template}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                            log.status === "sent"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          )}
                        >
                          <span className={cn("size-1.5 rounded-full", log.status === "sent" ? "bg-emerald-500" : "bg-rose-500")} />
                          {log.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-[0.68rem] text-slate-400 truncate max-w-[120px]">
                        {log.resend_id || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* New Automation Modal */}
      <CrmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Marketing Automation Workflow"
      >
        <form onSubmit={handleCreateAutomation} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-foreground">Workflow Title</label>
            <input
              type="text"
              required
              placeholder="e.g. OPERATIONS 360 High-Intent Triage Alert"
              value={autoForm.name}
              onChange={(e) => setAutoForm((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs shadow-xs focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Trigger Event</label>
            <select
              value={autoForm.trigger}
              onChange={(e) => setAutoForm((prev) => ({ ...prev, trigger: e.target.value }))}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs shadow-xs focus:border-blue-500 focus:outline-none"
            >
              <option value="New Contact Form Submission">New Contact Form / Wish List Submission</option>
              <option value="Lead Qualification Score >= 85">Lead Qualification Score &gt;= 85</option>
              <option value="24h Discovery Nurture SLA">24h Discovery Nurture SLA</option>
              <option value="Product Directory View">Product Directory Inbound Interest</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground">Initial Status</label>
            <select
              value={autoForm.status}
              onChange={(e) => setAutoForm((prev) => ({ ...prev, status: e.target.value as AutomationStatus }))}
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-3 py-2 text-xs shadow-xs focus:border-blue-500 focus:outline-none"
            >
              <option value="active">Active (Runs immediately)</option>
              <option value="paused">Paused (Draft mode)</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
            <CrmButton variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </CrmButton>
            <CrmButton variant="primary" type="submit">
              Activate Workflow
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
