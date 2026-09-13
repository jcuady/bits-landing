# CRM UI standards

Dense Soft-UI dashboard (density 8). Apply across every `/app` page.

Aligned with ui-ux-pro-max: touch ≥44px, visible focus, skip link, labeled filters, no-results copy.

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
| `CrmButton` | `min-h-11` (44px), `cursor-pointer`, hover/active, focus ring, `pressed` |
| Primary shell `Button` | `cursor-pointer` in CVA |
| StatusFilter | `h-11`, `min-w-[160px]`, labeled (visible on mobile) |
| Search input | `h-11`, icon inset, focus ring |
| Nav links | `min-h-10` desktop / `min-h-11` mobile, `cursor-pointer` |
| Switches | `min-h-11` hit target |
| Topbar icons | `size-10` / `min-h-10` |

## Filter coverage

List pages expose search (and status/channel/role when applicable): leads, contacts, companies, opportunities, tasks, conversations, campaigns, automations, forms, templates, team.

Read-only analytics (dashboard, funnels, reports) may omit FilterBar.

Empty filter results use helpful copy (not a blank pane).
