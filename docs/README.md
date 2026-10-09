# BITS Documentation Index

Welcome to the internal engineering and product documentation repository for **Boundless IT Solutions (BITS)**.

> **§71 — read this index as a map to documents of *mixed* reliability.**
> Every path below was verified to exist. Their **contents** are not uniformly
> true of this codebase: several describe a product specification rather than
> shipped software, and some carry corrections inline. `MARKETING_PRODUCT_GUIDE.md`,
> `OPERATIONS-360-CRO-AUDIT.md` and `FULL_SYSTEM_DOCUMENTATION.md` all carry
> correction banners naming claims that are false here. `SYSTEM_AUDIT.md` is the
> record of which are false and why.
>
> Numbers quoted in these documents drift as the audit proceeds. Measured
> 8 Oct 2026: **19** engines in `lib/products/registry.ts` (not 18), **26** unit
> selfchecks (not 19), **45** route definitions / **53** generated paths.

---

## 🌟 Master Documentation

| Document | Description | Target Audience |
|---|---|---|
| **[FULL_SYSTEM_DOCUMENTATION.md](./FULL_SYSTEM_DOCUMENTATION.md)** | **Master Architectural Guide**: Full tech stack, Supabase schema & links, API keys, system functionality, user personas, all 19 engines, brandbook, glassmorphism, and deployment. | **All Co-Workers / Full Stack Engineers** |
| **[MARKETING_PRODUCT_GUIDE.md](./MARKETING_PRODUCT_GUIDE.md)** | Deep-dive product specification, commercial positioning, enterprise ROI models, and feature matrices. ⚠️ **Carries a correction banner** — several sold capabilities do not exist in this codebase. | Product Managers, Sales Engineers, Executives |
| **[BRANDING_CLOUDS_INFINITY.md](./BRANDING_CLOUDS_INFINITY.md)** | Design standards for the azure sky horizon, static cumulus clouds, and the infinity emblem geometry. | UI/UX Designers, Frontend Engineers |
| **[SEO-STRATEGIC-PLAN-AND-AI-VISIBILITY.md](./SEO-STRATEGIC-PLAN-AND-AI-VISIBILITY.md)** | Technical SEO audit, structured Schema.org data, and agentic AI search visibility engine (`llms.txt`). | Growth Engineers, Marketing, SEO Leads |
| **[CPO_Landing_Page_Documentation_Plan.md](./CPO_Landing_Page_Documentation_Plan.md)** | CPO review of the homepage: structural audit (canonical URLs, CRM cannibalisation, 22-vs-18 catalog, no analytics), OMS 360 platform positioning, routing/redirect plan, Platform Index + `/deployment` specs, word budget, action register. | Product, Marketing, Frontend Engineers |
| **[CPO_Landing_Page_Revamp_Planning.md](./CPO_Landing_Page_Revamp_Planning.md)** | Execution plan for the homepage revamp: 5 numbered steps, OMS 360 four-pillar spine, CRM collapse scope, analytics gate, success criteria. | Product, Frontend Engineers |
| **[CPO_Operations360_SEO_and_Collapse_Plan.md](./CPO_Operations360_SEO_and_Collapse_Plan.md)** | SEO architecture and CRM collapse plan: sitemap defect fix, keyword ownership map, structured data, `llms.txt`, five-workspace module design (Option 2), OMS 360 marketing spine. | Marketing, SEO, Product |

---

## 📑 Technical Architecture & Operational Guides

| Document | Scope & Focus |
|---|---|
| **[ARCHITECTURE.md](./ARCHITECTURE.md)** | Core Next.js App Router layout, route groups, and state stores. |
| **[ROLES_AND_PAGES.md](./ROLES_AND_PAGES.md)** | Page-by-page access matrix for supervisors, agents, field reps, and compliance auditors. ⚠️ **A target design, not current behaviour** — no per-role authorization exists; `requireCrmUser()` authenticates and never reads a role. |
| **[WORKFLOWS.md](./WORKFLOWS.md)** | End-to-end user workflows: PTP collection tracking, predictive softphone HUD, and GPS field telemetry. ⚠️ **The softphone HUD and GPS telemetry do not exist** — there is no telephony of any kind in this build. |
| **[SECURITY.md](./SECURITY.md)** | Data privacy, BSP Circulars 454/857, NPC RA 10173, and Supabase RLS security policies. |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Vercel CI/CD pipeline, environment variable synchronization, and edge runtime configuration. |
| **[TESTING.md](./TESTING.md)** | Headless Playwright multi-device responsive verification and TypeScript compile validation. |
| **[UI_STANDARDS.md](./UI_STANDARDS.md)** | Glassmorphic design tokens, spacing rules, and button/badge component standards. |
| **[SYSTEM_AUDIT.md](./SYSTEM_AUDIT.md)** | Comprehensive audit of system performance, accessibility, and zero-per-seat pricing models. **This is the source of truth for which claims elsewhere are false.** |

---

## 🚀 Root Project Readme
For project setup, quickstart commands, and environment variable templates, refer to the root [README.md](../README.md).
