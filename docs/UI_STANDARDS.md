# CRM UI standards

> **SYSTEM_AUDIT.md §63 — corrected against the code.**
>
> Three defects, checked against `components/crm/**` on 8 Oct 2026:
>
> 1. **The "44px" rule was never true of this code.** `CrmButton` uses `min-h-10`
>    (**40px**), not `min-h-11`. `StatusFilter` uses `h-10`, not `h-11`
>    (`components/crm/crm-controls.tsx:61`).
> 2. **Nothing enforces a touch-target size.** `lib/security/a11y-static.selfcheck.mjs`
>    checks that every labelled control has an accessible name and that there are no
>    heading skips. It has no size assertion, so this table is a convention, not a
>    contract.
> 3. **Seven of the eleven list pages listed below do not exist.** The real ones are
>    `leads`, `contacts`, `companies`, `opportunities`.
>
> **On the number itself:** 40px comfortably exceeds **WCAG 2.2 SC 2.5.8 Target Size
> (Minimum, AA)**, which requires 24×24 CSS px. The 44px figure is Apple HIG
> guidance, not a WCAG requirement — so the implementation is *compliant*, and this
> document was the thing that was wrong.

Dense Soft-UI dashboard (density 8). Apply across every `/app` page.

Aligned with ui-ux-pro-max: visible focus, skip link, labeled filters, no-results copy.

## Layout rhythm

| Element | Rule |
|---------|------|
| Skip link | Shell: Skip to `#content` |
| PageHeader | `mb-5` / `sm:mb-6`, actions `gap-2` |
| FilterBar | Under header on list pages; `mb-5`, `gap-3` |
| Surfaces | `rounded-xl border border-linelight bg-white` |
| Main padding | shell `px-3 py-4` → `sm:px-5` → `lg:px-6` |

## Controls

| Control | Spec |
|---------|------|
| `CrmButton` | `min-h-10` (40px), `cursor-pointer`, hover/active, focus ring, `pressed` |
| Primary shell `Button` | `cursor-pointer` in CVA |
| StatusFilter | `h-10`, `min-w-[160px]`, labeled (visible on mobile) |
| Search input | `h-10`, icon inset, focus ring |
| Nav links | `min-h-10` desktop / `min-h-11` mobile, `cursor-pointer` |
| Switches | `min-h-11` hit target |
| Topbar icons | `size-10` / `min-h-10` |

## Filter coverage

List pages expose search (and status/channel/role when applicable): leads, contacts, companies, opportunities. `tasks`, `conversations`, `campaigns`, `automations`, `forms`, `templates` and `team` were documented against a mock and **do not exist** — do not add controls for them.

Read-only analytics (dashboard, funnels, reports) may omit FilterBar.

Empty filter results use helpful copy (not a blank pane).
