# CRM Redesign & Supabase Integration Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the CRM template into a cloud-themed, glassmorphic UI integrated with real Supabase lead data, removing bloat and dummy data.

**Architecture:** Replace the Zustand dummy state in the CRM with server-side and client-side Supabase fetching for accurate data. Strip the navigation down to essential BITS CRM tools (Dashboard, Leads, Contacts, Companies, Opportunities). Apply the "/ui-ux-pro-max" glassmorphism standard across the app shell and main pages.

**Tech Stack:** Next.js (App Router), Supabase Auth & Database, Tailwind CSS (Glassmorphism), Lucide React.

---

### Task 1: Streamline Navigation (Remove Bloat)

**Files:**
- Modify: `lib/crm/nav.ts`

**Step 1: Write minimal implementation**

```typescript
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Building2,
  Target,
  Settings,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const crmNav: NavSection[] = [
  {
    title: "Overview",
    items: [{ href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Records",
    items: [
      { href: "/app/leads", label: "Leads", icon: UserPlus },
      { href: "/app/contacts", label: "Contacts", icon: Users },
      { href: "/app/companies", label: "Companies", icon: Building2 },
      { href: "/app/opportunities", label: "Opportunities", icon: Target },
    ],
  },
  {
    title: "Admin",
    items: [
      { href: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];
```

**Step 2: Commit**

```bash
git add lib/crm/nav.ts
git commit -m "refactor(crm): streamline nav to remove bloat and focus on core BITS CRM"
```

### Task 2: Supabase Data Fetching Utility for Leads

**Files:**
- Create: `lib/crm/queries.ts`

**Step 1: Write minimal implementation**

```typescript
import { createClient } from "@/lib/supabase/server";

export async function getInboundLeads() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("inbound_leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching leads:", error);
    return [];
  }
  return data || [];
}
```

**Step 2: Commit**

```bash
git add lib/crm/queries.ts
git commit -m "feat(crm): add supabase query for inbound leads"
```

### Task 3: Redesign Dashboard to use Supabase Data & Cloud Glassmorphism

**Files:**
- Modify: `app/(crm)/app/dashboard/page.tsx`

**Step 1: Write minimal implementation**
We will convert `DashboardPage` to a Server Component that fetches data via `getInboundLeads()` and styles it using cloud blue glassmorphism (`bg-blue-50/50 backdrop-blur-md`).

(Note: Complete code will be provided during task execution, focusing on replacing `useCrm()` state with server data, and styling the cards with premium UI).

**Step 2: Commit**

```bash
git add app/(crm)/app/dashboard/page.tsx
git commit -m "feat(crm): redesign dashboard with cloud glassmorphism and real supabase data"
```

### Task 4: Redesign Leads Page with Real Data

**Files:**
- Modify: `app/(crm)/app/leads/page.tsx`
- Modify: `components/crm/pipeline-board.tsx`

**Step 1: Write minimal implementation**
Pass real Supabase leads down to the `PipelineBoard` instead of relying on the Zustand store dummy data. Clean up any "AI Health Coach" artifacts.

**Step 2: Commit**

```bash
git add app/(crm)/app/leads/page.tsx components/crm/pipeline-board.tsx
git commit -m "feat(crm): wire leads page to real supabase inbound_leads"
```

### Task 5: App Shell & Sidebar Cloud Branding Refinement

**Files:**
- Modify: `components/crm/app-sidebar.tsx`
- Modify: `components/crm/app-topbar.tsx`

**Step 1: Write minimal implementation**
Ensure the sidebar and topbar use `bg-cloud/40`, `border-cloud-200/40`, and strong contrasting text colors for accessibility (`text-slate-900` over light glass). Remove the telemetry link if not relevant.

**Step 2: Commit**

```bash
git add components/crm/app-sidebar.tsx components/crm/app-topbar.tsx
git commit -m "style(crm): apply cloud glassmorphism branding to shell"
```
