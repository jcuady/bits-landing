# BITS Brandbook · Asset Pack

> **Boundless IT Solutions (BITS)** — 2026 Edition — Design System v3.4 — Public / Brand Guidelines

This pack ships the brandbook's tokens, the Tailwind v4 preset, and the brandbook
showcase HTML for partner and press use.

## Files in this pack

| File | Purpose |
|---|---|
| `bits-tokens.css` | Drop-in CSS custom properties. Works in any framework. |
| `bits-tokens.json` | Design Tokens Community Group format — for Figma, Style Dictionary, Specify. |
| `bits-tailwind-preset.css` | Tailwind v4 `@theme` block + brandbook primitives. Drop into your CSS. |

## Quick start

### Plain CSS / CSS Modules

```html
<link rel="stylesheet" href="/brandbook/bits-tokens.css" />
<style>
  .my-card {
    background: var(--color-cloud);
    color: var(--color-navy-900);
    border: 1px solid var(--color-signal-300);
  }
</style>
```

### Tailwind v4

```css
/* app.css */
@import "tailwindcss";
@import "/brandbook/bits-tailwind-preset.css";
```

```html
<div class="bg-navy-900 text-cloud border-signal-300 rounded-2xl p-7">
  Boundless.
</div>
```

### Design Tokens (Figma / Specify / Style Dictionary)

```bash
# Style Dictionary
npx style-dictionary build --source bits-tokens.json
```

The JSON is in Design Tokens Community Group format (`$value`, `$type`, `$description`).

## Color roles

| Token | Hex | Role |
|---|---|---|
| `navy-950` | `#030B18` | Bedrock Foundation — base background |
| `navy-900` | `#06162F` | Space Navy — primary headings, cockpit (AAA 17.5:1) |
| `horizon-top` | `#0284C7` | Boundless Horizon — atmospheric gradient anchor (AAA 7.2:1) |
| `signal-300` | `#38BDF8` | Cloud Sky Cyan — pulse, glow, focus (AAA 10.4:1) |
| `electric-500` | `#2563EB` | Electric Action Blue — primary CTA, links (AA 4.6:1) |
| `skywash` | `#E0F2FE` | Stratosphere Vapor — nested card highlights |
| `cloud` | `#F8FAFC` | Cirrus Cloud White — high-contrast text (AAA 16.1:1) |
| `amber-500` | `#F59E0B` | Sunrise Amber — focal metric, alerts (AAA 8.9:1) |

## Usage rules

1. **Never recolor the infinity B emblem.** The Cloud White → Signal Cyan → Sapphire gradient
   is the brand.
2. **Never alter the gradient angle.** 0,0 → 1,1 only.
3. **No drop shadow on the glyph.** The aura renders behind the stroke; a shadow is decoration.
4. **Italic serif goes on the third line of three-line headlines.** Never the first. Never body.
5. **No marketing CTAs in the brandbook.** Spec documentation only.
6. **Cite statutory alignments verbatim** — BSP Circular 454, NPC RA 10173, ISO/IEC 27001, etc.

## Resources

- Full brandbook: <https://www.boundlessits.com/brandbook>
- Logo anatomy: <https://www.boundlessits.com/brandbook/logo>
- Color tokens: <https://www.boundlessits.com/brandbook/colors>
- Components: <https://www.boundlessits.com/brandbook/components>
- Asset library: <https://www.boundlessits.com/brandbook/assets>

## Contact

- Brand inquiries: `bits_inquiries@boundlessits.com`
- Press: `bits_inquiries@boundlessits.com`

— Boundless IT Solutions · 2026
