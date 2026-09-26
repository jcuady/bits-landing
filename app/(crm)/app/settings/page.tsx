"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { useCrm, roleForEmail } from "@/lib/crm/store";
import { useToast } from "@/components/crm/crm-toast";
import { CrmButton } from "@/components/crm/crm-controls";
import { User, Bell, Building2, CheckCircle2, ShieldCheck, Database, RotateCcw, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const { displayName, setDisplayName, state, userEmail, clearWorkspaceData, restoreDemoData } = useCrm();
  const { showToast } = useToast();
  const [nameDraft, setNameDraft] = React.useState(displayName);
  const [nameError, setNameError] = React.useState<string | null>(null);
  const [emailNotif, setEmailNotif] = React.useState(true);
  const [dealAlerts, setDealAlerts] = React.useState(true);
  const [digest, setDigest] = React.useState(false);
  const [soundEffects, setSoundEffects] = React.useState(true);
  const role = roleForEmail(userEmail, state);
  const canManageTeam = role === "Admin" || role === "Manager";

  React.useEffect(() => {
    setNameDraft(displayName);
  }, [displayName]);

  function commitName() {
    if (!nameDraft.trim()) {
      setNameError("Display name cannot be empty.");
      setNameDraft(displayName);
      return;
    }
    const result = setDisplayName(nameDraft.trim());
    if (!result.ok) {
      setNameError(result.error);
      setNameDraft(displayName);
      return;
    }
    setNameError(null);
    showToast(`Display name updated to "${nameDraft.trim()}".`);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & Workspace Preferences"
        description="Profile configuration, alerting thresholds, and enterprise workspace parameters."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Card */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <div className="flex items-center gap-2">
            <User className="size-5 text-electric-600" />
            <h2 className="text-base font-semibold text-foreground dark:text-neutral-100">
              User Profile
            </h2>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
                Corporate Email (Fixed)
              </label>
              <input
                type="text"
                disabled
                value={userEmail}
                className="mt-1.5 h-10 w-full rounded-lg border border-border bg-muted/40 px-3 text-sm text-muted-foreground dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
                Display Name
              </label>
              <div className="mt-1.5 flex gap-2">
                <input
                  value={nameDraft}
                  maxLength={80}
                  aria-invalid={Boolean(nameError) || undefined}
                  aria-describedby={nameError ? "name-error" : undefined}
                  onChange={(e) => {
                    setNameDraft(e.target.value);
                    if (nameError) setNameError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      commitName();
                    }
                  }}
                  className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-electric-600 focus:ring-2 focus:ring-electric-600/20 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
                />
                <CrmButton variant="primary" onClick={commitName} className="h-10">
                  Save
                </CrmButton>
              </div>
              {nameError ? (
                <p id="name-error" className="mt-1.5 text-xs font-medium text-rose-500" role="alert">
                  {nameError}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-muted-foreground dark:text-neutral-400">
                  Visible to teammates and client contacts. Active role: <strong className="text-foreground dark:text-neutral-200">{role}</strong>.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Notifications Card */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <div className="flex items-center gap-2">
            <Bell className="size-5 text-electric-600" />
            <h2 className="text-base font-semibold text-foreground dark:text-neutral-100">
              Notification Center Preferences
            </h2>
          </div>

          <ul className="mt-5 space-y-4">
            <Toggle
              label="Real-time Deal & Lead Alerts"
              description="Push notifications when new opportunities or high-intent leads are created."
              checked={dealAlerts}
              onChange={(v) => {
                setDealAlerts(v);
                showToast(v ? "Deal alerts enabled." : "Deal alerts paused.");
              }}
            />
            <Toggle
              label="Email Dispatch Confirmations"
              description="Receive summaries when campaigns or automated touches are sent."
              checked={emailNotif}
              onChange={(v) => {
                setEmailNotif(v);
                showToast(v ? "Email notifications enabled." : "Email notifications paused.");
              }}
            />
            <Toggle
              label="Audio & WebRTC Haptics"
              description="Play soft auditory cues on incoming calls and task completion."
              checked={soundEffects}
              onChange={(v) => {
                setSoundEffects(v);
                showToast(v ? "Audio cues enabled." : "Audio cues muted.");
              }}
            />
            <Toggle
              label="Weekly RevOps & Collections Digest"
              description="Consolidated PDF metric summary delivered every Monday at 8:00 AM PHT."
              checked={digest}
              onChange={(v) => {
                setDigest(v);
                showToast(v ? "Weekly digest subscribed." : "Weekly digest unsubscribed.");
              }}
            />
          </ul>
        </section>

        {/* Workspace Card */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414] lg:col-span-2">
          <div className="flex items-center gap-2">
            <Building2 className="size-5 text-electric-600" />
            <h2 className="text-base font-semibold text-foreground dark:text-neutral-100">
              Workspace & Security Governance
            </h2>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border bg-muted/30 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-card p-2 shadow-sm dark:bg-neutral-800">
                <Logo variant="horizontal" className="h-7" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground dark:text-neutral-100">
                  Boundless IT Solutions (BITS)
                </p>
                <p className="text-xs text-muted-foreground dark:text-neutral-400">
                  Enterprise RevOps, Collections Intelligence & AI Infrastructure · Production Cluster: MNL-PH-01
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4" />
              <span>SOC2 Type II & DPA 2012 Compliant</span>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-3 dark:border-neutral-800">
              <p className="text-xs text-muted-foreground dark:text-neutral-400">Currency Default</p>
              <p className="mt-1 text-sm font-semibold text-foreground dark:text-neutral-100">
                Philippine Peso (₱ / PHP)
              </p>
            </div>
            <div className="rounded-lg border border-border p-3 dark:border-neutral-800">
              <p className="text-xs text-muted-foreground dark:text-neutral-400">Timezone Anchor</p>
              <p className="mt-1 text-sm font-semibold text-foreground dark:text-neutral-100">
                Asia/Manila (UTC+8)
              </p>
            </div>
            <div className="rounded-lg border border-border p-3 dark:border-neutral-800">
              <p className="text-xs text-muted-foreground dark:text-neutral-400">Your Access Level</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-foreground dark:text-neutral-100">
                <CheckCircle2 className="size-4 text-electric-600" />
                {role} ({canManageTeam ? "Full Governance" : "Standard Seat"})
              </p>
            </div>
          </div>
        </section>

        {/* Workspace Data Lifecycle & Production Readiness */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-sm dark:border-neutral-800 dark:bg-[#141414] lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Database className="size-5 text-electric-600" />
              <h2 className="text-base font-semibold text-foreground dark:text-neutral-100">
                Workspace Data Lifecycle &amp; Production Mode
              </h2>
            </div>
            <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-electric-600 dark:text-blue-400">
              {state.leads.length > 0 ? "Active Dataset Loaded" : "Pristine Production Mode"}
            </span>
          </div>

          <p className="mt-2 text-xs text-muted-foreground dark:text-neutral-400">
            Control the operational state of your CRM workspace. You can wipe sample demonstration records to use the system exclusively with real client data, or reload the Philippine enterprise dataset for product walkthroughs and testing.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-border p-3 dark:border-neutral-800 bg-muted/20">
              <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Active Leads</p>
              <p className="mt-1 font-mono text-lg font-bold text-foreground dark:text-neutral-100">{state.leads.length}</p>
            </div>
            <div className="rounded-lg border border-border p-3 dark:border-neutral-800 bg-muted/20">
              <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Deals in Pipeline</p>
              <p className="mt-1 font-mono text-lg font-bold text-foreground dark:text-neutral-100">{state.opportunities.length}</p>
            </div>
            <div className="rounded-lg border border-border p-3 dark:border-neutral-800 bg-muted/20">
              <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Companies</p>
              <p className="mt-1 font-mono text-lg font-bold text-foreground dark:text-neutral-100">{state.companies.length}</p>
            </div>
            <div className="rounded-lg border border-border p-3 dark:border-neutral-800 bg-muted/20">
              <p className="text-[0.7rem] uppercase tracking-wider text-muted-foreground dark:text-neutral-400">Contacts</p>
              <p className="mt-1 font-mono text-lg font-bold text-foreground dark:text-neutral-100">{state.contacts.length}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 dark:border-neutral-800">
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  clearWorkspaceData();
                  showToast("Workspace wiped: Sample records cleared. System ready for live production data.", "info");
                }}
                className="gap-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/60 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer"
              >
                <Trash2 className="size-3.5" />
                <span>Wipe Demo Records (Production Mode)</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  restoreDemoData();
                  showToast("Demo dataset restored: 15 enterprise leads & 12 deals loaded.", "success");
                }}
                className="gap-2 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Reload Enterprise Demo Dataset</span>
              </Button>
            </div>

            <p className="text-[0.75rem] text-muted-foreground dark:text-neutral-400">
              * Live website submissions saved in Supabase are preserved automatically.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-4">
      <div>
        <span className="text-sm font-medium text-foreground dark:text-neutral-200">
          {label}
        </span>
        {description ? (
          <p className="text-xs text-muted-foreground dark:text-neutral-400">
            {description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-600 ${
          checked ? "bg-electric-600" : "bg-neutral-300 dark:bg-neutral-700"
        }`}
      >
        <span
          className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </li>
  );
}
