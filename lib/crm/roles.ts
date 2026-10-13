import type { CrmRole, CrmState, TeamMember } from "./types";

/**
 * Resolve the UI display role for a signed-in user.
 *
 * SECURITY NOTE — read this before reusing it as an authorization check.
 * This is a **UI display role only**. It resolves against `state.team`, which the
 * store keeps in `localStorage`, so anyone can edit their own browser state and
 * add their own address to the roster. It is NOT an authorization boundary.
 * Server-side enforcement for the CRM API routes lives in
 * `requireCrmUser()` (`lib/crm/api-auth.ts`), which validates a real Supabase
 * session.
 *
 * Two defects were fixed here:
 *
 *  1. `roleForEmail` used to fall through to
 *     `norm.startsWith("malcolm@") || norm.startsWith("demo@") || norm.includes("admin")`
 *     → Admin. `includes("admin")` is a *substring* match, so every address
 *     merely containing those five letters ("notadmin@corp.com",
 *     "sysadmin@partner.ph", "administrator@…") unlocked the Admin surface.
 *
 *  2. A separate pass had already changed the default from Admin to Rep, but
 *     left the heuristic above in place, so the least-privilege guarantee never
 *     actually held.
 *
 * The roster is the single source of truth now. The seeded roster already lists
 * the demo account as an explicit Admin, so removing the heuristic costs the
 * demo nothing and closes the footgun.
 */
export function roleForEmail(email: string, state: CrmState): CrmRole {
  const norm = email.toLowerCase().trim();
  const member = state.team.find((t) => t.email.toLowerCase().trim() === norm);
  if (member) return member.role;

  // Least privilege by default — unknown users are NOT administrators.
  return "Rep";
}

/** True when the role carries workspace-administration affordances. */
export function canGovern(role: CrmRole): boolean {
  return role === "Admin" || role === "Manager";
}

export type { TeamMember };