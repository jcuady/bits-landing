"use client";

import * as React from "react";
import { PageHeader } from "@/components/crm/page-header";
import { FilterBar } from "@/components/crm/filter-bar";
import { StatusBadge } from "@/components/crm/status-badge";
import { EmptyState } from "@/components/crm/empty-state";
import { CrmButton, StatusFilter } from "@/components/crm/crm-controls";
import { useCrm, roleForEmail } from "@/lib/crm/store";
import { formatMoney } from "@/lib/crm/selectors";

export default function TeamPage() {
  const { state, userEmail } = useCrm();
  const role = roleForEmail(userEmail, state);
  const canInvite = role === "Admin" || role === "Manager";
  const [q, setQ] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState("all");
  const rows = state.team.filter((m) => {
    const hay = `${m.name} ${m.email} ${m.role}`.toLowerCase();
    return hay.includes(q.toLowerCase()) && (roleFilter === "all" || m.role === roleFilter);
  });

  return (
    <div>
      <PageHeader
        title="Team"
        description="Workspace roster and role badges."
        actions={
          <CrmButton
            disabled={!canInvite}
            title={canInvite ? "Mock invite" : "Requires Admin or Manager"}
            onClick={() => {
              if (!canInvite) return;
              window.alert("Invite flow is mocked until database auth is connected.");
            }}
          >
            Invite member
          </CrmButton>
        }
      />
      <FilterBar value={q} onChange={setQ} placeholder="Search team…">
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
        <EmptyState title="No teammates match" />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-linelight bg-white">
          <table className="w-full min-w-[640px] text-left text-[0.85rem]">
            <thead>
              <tr className="border-b border-linelight bg-cloud/70">
                {["Name", "Email", "Role", "Open deals", "Closed won (30d)"].map((h) => (
                  <th
                    key={h}
                    className="px-3.5 py-2.5 text-[0.7rem] font-semibold tracking-wide text-slateblue uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-t border-linelight">
                  <td className="px-3.5 py-3 font-semibold text-ink">
                    {m.name}
                    {m.email.toLowerCase() === userEmail.toLowerCase() ? (
                      <span className="ml-2 text-[0.72rem] font-medium text-electric-600">(you)</span>
                    ) : null}
                  </td>
                  <td className="px-3.5 py-3 text-slateblue">{m.email}</td>
                  <td className="px-3.5 py-3">
                    <StatusBadge status={m.role} />
                  </td>
                  <td className="px-3.5 py-3 tabular-nums">{m.openDeals}</td>
                  <td className="px-3.5 py-3 tabular-nums">{formatMoney(m.closedWon30d)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!canInvite ? (
        <p className="mt-3 text-[0.8rem] text-slateblue">
          Your role ({role}) can view the roster. Invites require Admin or Manager.
        </p>
      ) : null}
    </div>
  );
}
