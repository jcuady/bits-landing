# 18-Product Functional MVP & Subdomain Architecture Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Establish a modular Next.js 16 + Supabase architecture to showcase all 18 BITS products as fully functional, interactive MVPs with context-aware role-based testing logins and edge subdomain routing, beginning with the complete BITScrm Sales flagship MVP.

**Architecture:** A unified Next.js App Router repository utilizing Edge Host Rewrites (`proxy.ts`) for wildcard subdomains (`sales.boundlessits.com`, `accounting.boundlessits.com`, etc.), dual-path demo fallbacks (`/demo/crm-sales`), and a universal SSO Supabase Auth layer with product entitlement scoping and 1-click PO/PM/Developer testing presets.

**Tech Stack:** Next.js 16.3.5 (Turbopack, App Router), React 19, TypeScript (Strict), Tailwind CSS v4, Motion v13, Supabase Auth & RLS, LocalStorage Sandbox Store.

---

### Task 1: Product Registry & Demo Persona State Model

**Files:**
- Create: `lib/products/registry.ts`
- Create: `lib/products/demo-store.ts`
- Test: `npx tsc --noEmit`

**Step 1: Define the 18-product catalog registry with subdomain keys and role definitions**
Create `lib/products/registry.ts` listing all 18 products, their official subdomain mapping, categories, and test personas (PO, PM, Full-Stack Dev, End-User, Manager).

**Step 2: Create universal client-side demo state & role switcher**
Create `lib/products/demo-store.ts` to manage:
- Active testing persona (PO Demo, PM Verification, Full-Stack Admin, Sales Rep, Sales Director)
- Dynamic white-label rebranding preview (toggle client logo and custom theme)
- Sandbox data reset capability

**Step 3: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors

---

### Task 2: Subdomain & Host-Based Edge Router in `proxy.ts`

**Files:**
- Modify: `proxy.ts`
- Test: `npx tsc --noEmit`

**Step 1: Implement subdomain extraction and internal route rewrite logic**
Update `proxy.ts` to:
- Detect incoming hostname (`sales.boundlessits.com`, `sales.localhost:3000`)
- Extract subdomain prefix (`sales` -> `crm-sales`, `accounting` -> `accounting`, etc.)
- Rewrite internally to `/(products)/[slug]` while preserving clean browser URLs (`/pipeline`, `/leads`, `/dashboard`)
- Allow dual path-based fallback access (`/demo/crm-sales/...`) for local testing without custom DNS

**Step 2: Guard product routes with context-aware login redirect**
If unauthenticated user accesses a product workspace, redirect to `/login?product=[id]&next=[path]`.

**Step 3: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors

---

### Task 3: Context-Aware Testing Login with 1-Click Role Presets

**Files:**
- Modify: `app/(auth)/login/page.tsx`
- Modify: `app/actions/auth.ts`
- Test: `npx tsc --noEmit`

**Step 1: Add product context banner & dynamic branding to `/login`**
When accessed with `?product=crm-sales` or via `sales.boundlessits.com`:
- Display BITS CRM Sales Enterprise badge
- Tailor the headline to the specific software product

**Step 2: Implement 1-Click Testing Role Presets**
Provide explicit 1-click test buttons:
- `[Test as Product Owner / Customer Demo]` -> Auto-logs in with pre-populated enterprise showcase data
- `[Test as Project Manager / QA]` -> Auto-logs in with acceptance test data and feature checklists
- `[Test as Full-Stack Dev / Superadmin]` -> Auto-logs in with unrestricted access to all 18 products
- `[Test as Sales Representative]` -> Scoped to rep pipeline and call queues
- `[Test as Sales Director]` -> Scoped to forecasting, team velocity, and CPQ approvals

**Step 3: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors

---

### Task 4: Universal Product Showcase Shell & Demo Controls Toolbar

**Files:**
- Create: `components/products/product-shell.tsx`
- Create: `components/products/demo-toolbar.tsx`
- Test: `npx tsc --noEmit`

**Step 1: Build `<DemoToolbar />`**
A sleek, non-intrusive floating or docked banner across all 18 product MVPs featuring:
- Active Testing Role dropdown (`Sales Rep`, `Sales Director`, `PO Demo`, `PM QA`)
- White-Label Rebranding Preview toggle (`[BITS Default | Preview Client Brand]`)
- 1-Click "Reset Sample Data" button
- "Book a Consultation" quick CTA

**Step 2: Build `<ProductShell />`**
Unified double-bezel application frame supporting:
- Collapsible sidebar with module navigation
- Topbar with notifications, search, and user profile
- Dynamic white-label theme injection

**Step 3: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors

---

### Task 5: Pilot Product MVP: BITScrm Sales Suite (`app/(products)/crm-sales/`)

**Files:**
- Create: `lib/products/crm-sales/types.ts`
- Create: `lib/products/crm-sales/mock-data.ts`
- Create: `lib/products/crm-sales/store.tsx`
- Create: `app/(products)/crm-sales/layout.tsx`
- Create: `app/(products)/crm-sales/page.tsx` (Dashboard & Velocity KPIs)
- Create: `app/(products)/crm-sales/pipeline/page.tsx` (Visual Drag-and-Drop Kanban Board)
- Create: `app/(products)/crm-sales/leads/page.tsx` (Inbound Leads & AI Scoring)
- Create: `app/(products)/crm-sales/cpq/page.tsx` (1-Click Interactive CPQ Proposal Builder)
- Test: `npx tsc --noEmit`

**Step 1: Create sales data models and realistic Philippine enterprise seed data**
Amounts in Philippine Pesos (`₱1.5M`, `₱750k`), realistic corporate accounts (Ayala Land, SM Prime, Megaworld, Robinsons, BDO).

**Step 2: Build Sales Dashboard (`/crm-sales`)**
Revenue velocity KPI cards, win-rate breakdown, deal aging spline chart.

**Step 3: Build Visual Drag-and-Drop Pipeline Kanban (`/crm-sales/pipeline`)**
Interactive columns (Lead In, Qualification, Proposal / CPQ, Negotiation, Closed Won). Moving a deal calculates real-time pipeline totals and triggers toast notifications.

**Step 4: Build 1-Click CPQ Proposal Builder (`/crm-sales/cpq`)**
Interactive pricing slider, discount approval triggers, and printable quotation preview modal.

**Step 5: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors

---

### Task 6: Universal 18-Product Demo Selector Hub (`app/demo/page.tsx`)

**Files:**
- Create: `app/demo/page.tsx`
- Test: `npx tsc --noEmit`

**Step 1: Build the 18-Product Interactive Matrix**
A gallery categorized by operational disciplines (CRM, ERP, Workforce, Supply Chain, Sports/Venues, AI) allowing any PO, PM, or client to launch any product MVP in 1 click.

**Step 2: Verify TypeScript compilation**
Run: `npx tsc --noEmit`
Expected: 0 errors

---

### Task 7: Full System Verification & Production Build

**Files:**
- Verify: `npx tsc --noEmit`
- Verify: `npm run build`
- Update: `PROJECT_STATUS.md`
- Update: `docs/SYSTEM_AUDIT.md`

**Step 1: Run TypeScript strict check**
Run: `npx tsc --noEmit`
Expected: 0 errors

**Step 2: Run Next.js production build**
Run: `npm run build`
Expected: Compiled successfully with all routes generated.

**Step 3: Commit and update project documentation**
Git commit and update `PROJECT_STATUS.md` and `docs/SYSTEM_AUDIT.md`.
