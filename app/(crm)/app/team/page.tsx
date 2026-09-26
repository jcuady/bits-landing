"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { CrmModal } from "@/components/crm/crm-modal";
import { useToast } from "@/components/crm/crm-toast";
import { useCrm, roleForEmail } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";
import type { CrmRole } from "@/lib/crm/types";
import { Trash2, UserPlus, Shield } from "lucide-react";

export default function TeamPage() {
  const { state, userEmail, inviteTeamMember, deleteTeamMember } = useCrm();
  const { showToast } = useToast();
  const role = roleForEmail(userEmail, state);
  const canInvite = role === "Admin" || role === "Manager";

  const [q, setQ] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Form State
  const [formData, setFormData] = React.useState<{
    name: string;
    email: string;
    role: CrmRole;
  }>({
    name: "",
    email: "",
    role: "Rep",
  });

  const rows = state.team.filter((m) => {
    const hay = `${m.name} ${m.email} ${m.role}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (roleFilter === "all" || m.role === roleFilter);
  });

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast("Please provide both name and a valid email.", "warning");
      return;
    }

    inviteTeamMember({
      name: formData.name.trim(),
      email: formData.email.trim(),
      role: formData.role,
    });

    showToast(`Teammate ${formData.name} added as ${formData.role}.`);
    setFormData({ name: "", email: "", role: "Rep" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Team Directory"
        description={`${state.team.length} enterprise team members, roles, and revenue attribution.`}
        actions={
          <CrmButton
            variant="primary"
            disabled={!canInvite}
            title={canInvite ? "Invite a new team member" : "Requires Admin or Manager role"}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5"
          >
            <UserPlus className="size-4" />
            Invite Member
          </CrmButton>
        }
      />

      <FilterBar value={q} onChange={setQ} placeholder="Search team members by name, email, or role…">
        <StatusFilter
          label="Role"
          value={roleFilter}
          onChange={setRoleFilter}
          options={[
            { value: "all", label: "All roles" },
            { value: "Admin", label: "Admin" },
            { value: "Manager", label: "Manager" },
            { value: "Rep", label: "Rep" },
            { value: "Marketing", label: "Marketing" },
          ]}
        />
      </FilterBar>

      {rows.length === 0 ? (
        <EmptyState
          title="No teammates match"
          description="Adjust your search query or role filter."
          action={
            canInvite ? (
              <CrmButton variant="primary" onClick={() => setIsModalOpen(true)}>
                Add First Member
              </CrmButton>
            ) : undefined
          }
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm dark:border-neutral-800 dark:bg-[#141414]">
          <table className="w-full min-w-[700px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-border bg-muted/40 dark:border-neutral-800 dark:bg-neutral-900/60">
                {["Name", "Email", "Role", "Active Pipeline Deals", "Closed Won (30d)", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[0.7rem] font-semibold tracking-wider text-muted-foreground uppercase dark:text-neutral-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border dark:divide-neutral-800">
              {rows.map((m) => {
                const isCurrentUser = m.email.toLowerCase() === userEmail.toLowerCase();
                return (
                  <tr
                    key={m.id}
                    className="transition-colors hover:bg-muted/30 dark:hover:bg-neutral-800/40"
                  >
                    <td className="px-4 py-3.5 font-semibold text-foreground dark:text-neutral-100">
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-full bg-electric-600/10 text-xs font-bold text-electric-600 dark:bg-electric-500/20 dark:text-electric-400">
                          {m.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span>{m.name}</span>
                          {isCurrentUser ? (
                            <span className="ml-2 inline-flex items-center gap-1 rounded bg-electric-600/10 px-1.5 py-0.5 text-[0.7rem] font-semibold text-electric-600 dark:bg-electric-500/20 dark:text-electric-400">
                              You
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground dark:text-neutral-400">
                      {m.email}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge status={m.role} />
                    </td>
                    <td className="px-4 py-3.5 tabular-nums text-foreground dark:text-neutral-200">
                      {m.openDeals} deals
                    </td>
                    <td className="px-4 py-3.5 font-semibold tabular-nums text-foreground dark:text-neutral-100">
                      {formatMoney(m.closedWon30d)}
                    </td>
                    <td className="px-4 py-3.5">
                      {isCurrentUser ? (
                        <span className="text-[0.75rem] text-muted-foreground dark:text-neutral-500 italic">
                          Current session
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (!canInvite) {
                              showToast("Requires Admin or Manager permissions.", "warning");
                              return;
                            }
                            deleteTeamMember(m.id);
                            showToast(`Teammate ${m.name} removed from workspace.`, "info");
                          }}
                          className="rounded p-1.5 text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:text-neutral-400 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 cursor-pointer transition-colors"
                          title="Remove teammate"
                          aria-label={`Remove teammate ${m.name}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!canInvite ? (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-3 text-[0.8rem] text-muted-foreground dark:border-neutral-800 dark:text-neutral-400">
          <Shield className="size-4 text-electric-600" />
          <span>
            Your active role (<strong>{role}</strong>) grants roster read access. Adding or deleting members requires Admin or Manager privileges.
          </span>
        </div>
      ) : null}

      {/* Invite Member Modal */}
      <CrmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite New Teammate"
        description="Add a member to your BITS enterprise revops and collections workspace."
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maria Santos"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
              Corporate Email
            </label>
            <input
              type="email"
              required
              placeholder="m.santos@boundlessitsolutions.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-foreground dark:text-neutral-200">
              Workspace Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as CrmRole })}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-electric-600 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
            >
              <option value="Admin">Admin (Full System Access & Governance)</option>
              <option value="Manager">Manager (Team & Pipeline Operations)</option>
              <option value="Rep">Rep (Lead Touchpoints & Deals)</option>
              <option value="Marketing">Marketing (Campaigns, Funnels & Forms)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <CrmButton
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </CrmButton>
            <CrmButton type="submit" variant="primary">
              Send Invite
            </CrmButton>
          </div>
        </form>
      </CrmModal>
    </div>
  );
}
