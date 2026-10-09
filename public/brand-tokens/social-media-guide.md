# BITS Social Media Brand Reference

> **For designers, marketers, and AI assistants creating BITS social media graphics.**
> Read this end-to-end before creating a single social post. The brand is the system.

**Version:** 1.0 · 2026 Edition · Design System v3.4
**Maintainer:** Boundless IT Solutions · `bits_inquiries@boundlessits.com`

---

## 1. How to use this guide

This document is the **canonical reference** for every BITS social media asset. It covers:
1. Platform specifications (sizes, aspect ratios, safe zones)
2. Color tokens (the 8 brand colors + how to use them on social)
3. Typography (which face for which social use)
4. Logo usage (sizes, clear space, dark/light backgrounds)
5. Layout templates (by content type — quote, stat, announcement, etc.)
6. The 4-Layer Spatial Canvas (how to apply the atmospheric backdrop to social)
7. Voice & copy rules
8. Statutory compliance
9. Export specifications
10. Layout examples

**If you're using an AI assistant to generate a social graphic:** paste the relevant section into the prompt. The "AI Generation Prompts" section at the end has copy-paste templates for Flux Pro, Recraft V3, Ideogram, and Gemini.

---

## 2. Platform specifications

Always export at the exact target size. Resize up and you'll lose pixel density; resize down and you'll lose sharpness. For multi-platform posts, design at the largest required size and export from the source file.

### 2.1 Instagram

| Use case | Aspect ratio | Pixel size | Safe zone |
|---|---|---|---|
| Feed — square | 1:1 | 1080 × 1080 | 1010 × 1010 (35px margin all sides) |
| Feed — portrait | 4:5 | 1080 × 1350 | 1000 × 1270 |
| Feed — landscape | 1.91:1 | 1080 × 566 | — |
| Stories / Reels | 9:16 | 1080 × 1920 | 1080 × 1420 (250px top + 250px bottom UI overlays) |
| Profile picture | 1:1 | 320 × 320 | Display crops to circle, keep critical content centered |

**Instagram specifics:**
- Stories: leave **250px clear at top** (username/avatar overlay) and **250px clear at bottom** (reply/CTA overlay)
- Carousels: design each card at 1080 × 1080 or 1080 × 1350, keep visual continuity
- Reels cover: 1080 × 1920, but design the cover as 1080 × 1420 (centered in the safe zone)

### 2.2 LinkedIn

| Use case | Aspect ratio | Pixel size | Safe zone |
|---|---|---|---|
| Post — landscape | 1.91:1 | 1200 × 627 | 1100 × 527 |
| Post — square | 1:1 | 1200 × 1200 | — |
| Post — portrait | 4:5 | 1080 × 1350 | — |
| Carousel | 1:1 | 1080 × 1080 | — |
| Cover (personal) | 4:1 | 1584 × 396 | 1128 × 396 center band (avatar overlays) |
| Cover (company) | 4:1 | 1128 × 191 | 1128 × 191 |
| Article header | — | 1200 × 644 | — |

**LinkedIn specifics:**
- Personal cover: 1584 × 396, but the **center 1128 × 396** is the only safe area (avatar overlaps on left and right)
- Company cover: 1128 × 191 is the entire visible area
- Posts perform best at 1.91:1 (landscape) for engagement; carousels at 1:1 (square)

### 2.3 X (Twitter)

| Use case | Aspect ratio | Pixel size |
|---|---|---|
| Post — single image | 16:9 | 1600 × 900 |
| Post — square | 1:1 | 1200 × 1200 |
| Post — portrait | 4:5 | 1080 × 1350 |
| Header | 3:1 | 1500 × 500 |

**X specifics:**
- 16:9 landscape performs best in-feed
- Header is heavily cropped on mobile — keep critical content in the center

### 2.4 Facebook

| Use case | Aspect ratio | Pixel size |
|---|---|---|
| Post — landscape | 1.91:1 | 1200 × 630 |
| Post — square | 1:1 | 1200 × 1200 |
| Cover | ~2.7:1 | 851 × 315 |
| Story | 9:16 | 1080 × 1920 |

### 2.5 YouTube

| Use case | Aspect ratio | Pixel size |
|---|---|---|
| Thumbnail | 16:9 | 1280 × 720 |
| Channel art | 16:9 | 2560 × 1440 (safe area: 1546 × 423) |
| Shorts | 9:16 | 1080 × 1920 |

**YouTube specifics:**
- Thumbnails: text must be readable at 4×3 (mobile). Use 60–80pt headline minimum
- Channel art: design at 2560 × 1440, but the safe area for all devices is **1546 × 423** centered

### 2.6 TikTok

| Use case | Aspect ratio | Pixel size | Safe zone |
|---|---|---|---|
| Video | 9:16 | 1080 × 1920 | Top 250px + bottom 350px |
| Carousel | 1:1 or 4:5 | 1080 × 1080 or 1080 × 1350 | — |

---

## 3. Color tokens

The BITS palette bridges high-altitude sky atmosphere with grounded sovereign bedrock. **Eight named roles.** Every social graphic must use these — no exceptions, no off-brand colors.

| Token | Hex | Tailwind | On social |
|---|---|---|---|
| **Bedrock Navy** | `#030B18` | `navy-950` | Backdrop for dark-mode posts; 100% data-residency context |
| **Space Navy** | `#06162F` | `navy-900` | Primary headings on light surfaces; deep sections |
| **Boundless Horizon** | `#0284C7` | `sky-500` | Atmospheric gradient anchor; section backgrounds |
| **Cloud Sky Cyan** | `#38BDF8` | `signal-300` | Accent rings, focus indicators, active waveforms |
| **Electric Action Blue** | `#2563EB` | `electric-500` | Primary CTA buttons, links, hashtags |
| **Stratosphere Vapor** | `#E0F2FE` | `skywash` | Nested card backgrounds, soft highlights |
| **Cirrus Cloud White** | `#F8FAFC` | `cloud` | High-contrast text on dark surfaces |
| **Sunrise Amber** | `#F59E0B` | `amber-500` | Focal metric, delinquency alerts, attention badges |

**Pairings that always work:**
- Headline: `#F8FAFC` on `#030B18` (Cloud on Bedrock)
- Headline: `#F8FAFC` on `linear-gradient(#0284C7 → #5EA2F9)` (Cloud on Boundless Horizon gradient)
- Subhead: `#E0F2FE` on `#030B18` (Stratosphere on Bedrock)
- Accent: `#38BDF8` on `#030B18` (Cyan on Bedrock)
- Action: `#2563EB` on `#F8FAFC` (Electric on Cloud)

**Pairings to avoid:**
- Amber on Sky (low contrast)
- Two accent colors on the same surface (cyan + electric blue competes)
- Pure black `#000000` — use `#030B18` (Bedrock) instead

---

## 4. Typography

The BITS face stack is deliberately narrow. **Three faces earn the brand.** No additional fonts.

| Face | Role | Sizes for social |
|---|---|---|
| **Geist Sans** (--font-jakarta) | Primary — body, headline, captions | 32–64pt display · 18–24pt body · 14–16pt caption |
| **Instrument Serif Italic** | Emphasis — the third line of three-line headlines; poetic accent | 32–64pt, italic, `tracking-wide` |
| **Geist Mono** | Numerics — financial sums, transaction IDs, timestamps, file paths | 11–14pt, uppercase, `tracking-[0.16em]` to `tracking-[0.2em]` |

**Hierarchy rules for social:**
1. **Display headline**: Geist Sans 800 (or Instrument Serif Italic for the third line) — 48–72pt
2. **Subhead**: Geist Sans 500–600 — 24–32pt
3. **Body**: Geist Sans 400–500 — 16–20pt
4. **Caption / metadata**: Geist Mono 500, uppercase, letter-spaced — 12–14pt
5. **Statistic callout**: Geist Mono 500 — 64–96pt

**Never use:**
- Bold italic on a single line (italic + bold = shouty)
- More than 3 sizes on a single graphic
- Italic serif on the first line of a three-line headline (third line only)
- All-caps for body copy (reserves for labels and kickers only)

**Self-host the faces.** Don't link to `fonts.googleapis.com` from a social graphic — the platform may strip the link. Put the font files in the source project and render at export time.

---

## 5. Logo usage

The official BITS monogram is `B above ∞` — a capital B above a horizontal interlocked infinity, 3D wedding-band metallic finish.

**File:** [`public/brand/bits-monogram-official.png`](./bits-monogram-official.png)
**Format:** PNG with transparent background, 2048 × 2048 source
**Minimum size on social:** 96 × 96 px (below this, the infinity's interlock becomes unreadable)

**Backgrounds:**
- **Light backgrounds** (`#F8FAFC`, `#E0F2FE`, skywash variants): use the monogram **as-is** — the silver reads cleanly
- **Dark backgrounds** (`#030B18`, `#06162F`, sky gradient): use the monogram **as-is** — the silver reads cleanly
- **Photo or noisy backgrounds**: place the monogram on a glassmorphic white tile (`bg-white/85` + `backdrop-blur-md`) with a 1px white border and a soft drop shadow beneath

**Clear space:** minimum **50% of the emblem's height** on all four sides. No typography, no other marks, no edges of the layout may enter the clear space.

**Don't:**
- Recolor the metallic finish (the silver is the brand)
- Separate the B from the ∞ (they are one form)
- Alter the proportions
- Recreate as monoline (the 3D rings require the official asset)
- Add a drop shadow to the rings (the 3D finish is the depth)
- Apply brand colors to the rings (sapphire/cyan is for the system, not the mark)

**Placement on social:**
- Top-left: paired with the wordmark in compact headers
- Center: for solo brand callouts (anniversaries, milestones)
- Bottom-right: paired with `www.boundlessits.com` URL
- Never below 96px
- Never stretched or skewed

---

## 6. Layout templates by content type

### 6.1 Quote card (LinkedIn, Instagram)

**Use for:** Founder quotes, customer testimonials, employee spotlights, philosophy statements.

**Canvas:** Instagram 1080 × 1080 or LinkedIn 1200 × 1200

**Layout:**
```
┌─────────────────────────────────┐
│  [kicker: SOURCE / DATE]         │
│                                 │
│                                 │
│  "The brand is the system,       │
│   and the system is the brand."  │
│                                 │
│                                 │
│              ───                │
│              [name]             │
│              [title, company]   │
│                                 │
│                          [logo] │
└─────────────────────────────────┘
```

**Specs:**
- Background: Boundless Horizon gradient (`#0284C7` → `#5EA2F9`) or Bedrock (`#030B18`)
- Quote: Geist Sans 500, 36–44pt, white, centered
- Attribution: Geist Sans 600, 16pt, white/85%, centered
- Logo: 64–80px, bottom-right, 32px margin
- Safe zone: 100px all sides

### 6.2 Stat card (LinkedIn, X, Instagram)

**Use for:** Performance metrics, KPIs, benchmark callouts ("3.2× right-party connect", "45% broken-PTP reduction").

**Canvas:** LinkedIn 1200 × 627 or Instagram 1080 × 1080

**Layout:**
```
┌─────────────────────────────────┐
│ [kicker: BITS · 2026 RESULTS]    │
│                                 │
│                                 │
│            3.2×                 │
│                                 │
│  Right-party connect rate        │
│  (Industry avg: 1.1×)           │
│                                 │
│                                 │
│                          [logo] │
└─────────────────────────────────┘
```

**Specs:**
- Background: Bedrock (`#030B18`) with optional 22px database dot lattice
- Stat: Geist Mono 500, 96–128pt, white, centered
- Label: Geist Sans 600, 20pt, white/85%, centered
- Comparison: Geist Sans 400, 14pt, white/55%, centered, with the industry avg muted
- Logo: 64–80px, bottom-right

### 6.3 Announcement card (LinkedIn, Instagram, Facebook)

**Use for:** Product launches, feature releases, partnerships, hiring.

**Canvas:** LinkedIn 1200 × 627 or Instagram 1080 × 1080

**Layout:**
```
┌─────────────────────────────────┐
│ [kicker: NEW · 2026]             │
│                                 │
│  Introducing                     │
│  OPERATIONS 360                  │
│  Field Edition.                  │
│                                 │
│  Sub-350ms predictive pacing     │
│  10-second PTP watchdog          │
│  100% Speech AI QA               │
│                                 │
│                          [logo] │
└─────────────────────────────────┘
```

**Specs:**
- Background: Boundless Horizon gradient or Bedrock with the atmospheric sky image at 25% opacity
- Eyebrow: Geist Mono 500, 14pt, uppercase, Electric Action Blue, letter-spaced
- Headline line 1: Geist Sans 500, 48pt, white ("Introducing")
- Headline line 2: Geist Sans 800, 56pt, white ("OPERATIONS 360")
- Headline line 3: Instrument Serif Italic, 56pt, sky-100 cyan ("Field Edition.")
- Bullets: Geist Sans 500, 22pt, white/85%
- Logo: 80–96px, bottom-right

### 6.4 Tip / how-to card (Instagram carousel, LinkedIn carousel)

**Use for:** Operational tips, "did you know" facts, micro-tutorials, BSP compliance reminders.

**Canvas:** Instagram 1080 × 1080 (carousel) or LinkedIn 1200 × 1200 (carousel)

**Layout per card:**
```
┌─────────────────────────────────┐
│ 02 / 05                  [logo] │
│                                 │
│  PTP Watchdog                   │
│  reallocates in 10s.            │
│                                 │
│  When a Promise-to-Pay window   │
│  expires, the system auto-      │
│  reallocates the account to     │
│  the supervisor queue.          │
│                                 │
│  No manual work. No missed      │
│  promise.                       │
│                                 │
│  → Swipe for the rest           │
└─────────────────────────────────┘
```

**Specs:**
- Background: alternating between Boundless Horizon gradient (odd cards) and Bedrock (even cards) for visual rhythm
- Card counter: Geist Mono 500, 14pt, white/70%, top-left
- Logo: 64px, top-right
- Headline: Geist Sans 800, 40pt, white
- Body: Geist Sans 400, 20pt, white/85%
- CTA: Geist Mono 500, 14pt, uppercase, Electric Action Blue, letter-spaced

### 6.5 Event card (LinkedIn, Instagram, Facebook)

**Use for:** Webinars, conference booths, product launches, customer dinners.

**Canvas:** LinkedIn 1200 × 627 or Instagram 1080 × 1350 (portrait for event)

**Layout:**
```
┌─────────────────────────────────┐
│ [kicker: LIVE WEBINAR]           │
│                                 │
│  Scaling BPO floors              │
│  beyond 500 seats.               │
│                                 │
│  Thursday, Mar 14               │
│  2:00 PM SGT · 60 min           │
│                                 │
│  Featuring:                      │
│  [Speaker 1] · [Speaker 2]      │
│                                 │
│  [Register →]  boundlessits.com │
│                                 │
│                          [logo] │
└─────────────────────────────────┘
```

**Specs:**
- Background: Bedrock with subtle grid pattern (database dot lattice at 6% opacity)
- Date/time: Geist Mono 500, 24pt, white, letter-spaced
- Title: Geist Sans 800, 48pt, white
- Speakers: Geist Sans 500, 18pt, white/80%
- CTA button: rounded pill, Electric Action Blue, white text
- Logo: 64–80px, bottom-right

### 6.6 Compliance / trust card (LinkedIn, X)

**Use for:** BSP circular reminders, NPC privacy tips, ISO certification announcements, audit milestones.

**Canvas:** LinkedIn 1200 × 627 or X 1600 × 900

**Layout:**
```
┌─────────────────────────────────┐
│ [kicker: COMPLIANCE]             │
│                                 │
│  BSP Circular 454                │
│  quiet hours enforced.           │
│                                 │
│  6:00 AM – 10:00 PM only.        │
│  100% of calls audited.          │
│  Zero compliance violations      │
│  in 2025.                        │
│                                 │
│  [BSP seal] [BITS]   boundlessits │
└─────────────────────────────────┘
```

**Specs:**
- Background: Bedrock or sky gradient
- Use the **official regulatory seal** (BSP, NPC, SEC, CIC, ISO, DICT) — pull from the Assets page, never recreate
- Stat: Geist Mono 500, 64pt, white
- Detail: Geist Sans 500, 18pt, white/85%
- Two seals + URL: 80px each, bottom row

---

## 7. The 4-Layer Spatial Canvas (for social)

The BITS atmosphere is composed of four layers. When you want the brandbook look on a social graphic, stack these four layers in this order:

```
┌─────────────────────────────────────┐
│  Layer 0: Bedrock Foundation         │  → solid #030B18 or #06162F
│  ┌────────────────────────────────┐ │
│  │  Layer 1: Database Dot Lattice │  → radial-gradient dots @ 22px, ~6% opacity
│  │  ┌──────────────────────────┐  │ │
│  │  │  Layer 2: Cloud Vapor     │  │  → radial-gradient sunbreak + vignette
│  │  │  ┌────────────────────┐  │  │ │
│  │  │  │  Layer 3: Content  │  │  │  → glassmorphic cards on top
│  │  │  └────────────────────┘  │  │ │
│  │  └──────────────────────────┘  │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**CSS / Tailwind recipe:**

```css
.bg-bits-atmosphere {
  background-color: #030B18;
  background-image:
    radial-gradient(circle, rgba(92, 200, 255, 0.10) 1px, transparent 1.6px),
    radial-gradient(circle, rgba(20, 80, 196, 0.06) 1px, transparent 2px);
  background-size: 22px 22px, 88px 88px;
  background-position: 0 0, 11px 11px;
}
.bg-bits-vapor {
  background:
    radial-gradient(ellipse 60% 35% at 50% 0%, rgba(255, 255, 255, 0.18), transparent 65%),
    radial-gradient(ellipse 75% 50% at 50% 24%, rgba(10, 50, 135, 0.32), transparent 75%);
}
```

**When to use the full atmosphere:** Hero posts, announcements, product launches, milestone celebrations. The 4 layers signal "premium, sovereign, BITS."

**When to simplify:** Quote cards, stat cards, day-to-day tips. Use Bedrock + content only. Save the atmosphere for hero moments.

### 7.5 Complete working starter (copy-paste this entire block)

The CSS above is a fragment. This is the **complete, working starter** — copy this whole block into any social-graphic HTML and you have a brand-correct BITS canvas plus every reusable component. It mirrors the values in `app/globals.css` and the live `components/sections/hero.tsx` / `components/brandbook/brandbook-shell.tsx` exactly.

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>BITS Social Graphic</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&family=Geist+Mono:wght@500;600&display=swap" rel="stylesheet" />
<style>
  /* ── Brand tokens (mirrors /brandbook/bits-tokens.css) ── */
  :root {
    --color-navy-950:    #030d1c;
    --color-navy-900:    #06162f;
    --color-signal-300:  #5cc8ff;
    --color-electric-500:#2563eb;
    --color-cloud:       #f6f9fc;
    --color-skywash:     #e0f2fe;
    --font-sans:  "Plus Jakarta Sans", system-ui, sans-serif;
    --font-serif: "Instrument Serif", Georgia, serif;
    --font-mono:  "Geist Mono", ui-monospace, monospace;
  }

  /* ── Canvas — change width/height for each platform ── */
  .canvas { position: relative; width: 1200px; height: 627px; overflow: hidden; }
  /* 1080 × 1080  Instagram square   */
  /* 1080 × 1350  Instagram portrait */
  /* 1600 × 900  X (Twitter)         */
  /* 1200 × 627  LinkedIn post       */

  /* ── 4-Layer Spatial Canvas ── */
  .layer-sky-gradient { position:absolute; inset:0; z-index:0;
    background: linear-gradient(180deg,#1362df 0%,#2377f3 45%,#3c8bf6 75%,#5ea2f9 100%); }
  .layer-sky-image    { position:absolute; inset:0; z-index:1;
    background-image:url('/images/hero-sky-bg.jpg');
    background-size:cover; background-position:center; }
  .layer-sunbreak     { position:absolute; inset:0; z-index:2;
    background:radial-gradient(ellipse 60% 35% at 50% 0%,rgba(255,255,255,0.22),transparent 65%); }
  .layer-vignette     { position:absolute; inset:0; z-index:3;
    background:radial-gradient(ellipse 75% 50% at 50% 50%,rgba(10,50,135,0.42),transparent 75%); }
  /* Important: ALWAYS use the actual hero-sky-bg.jpg image. The CSS
     gradient alone is the brand's *floor*, not the brand's *look*.
     Real cumulus clouds beat synthetic.                                */

  /* ── Content layer (Layer 4) ── */
  .content { position:absolute; inset:0; z-index:10; padding:48px 72px;
    display:grid; grid-template-rows:auto 1fr auto auto; row-gap:24px; }

  /* ── Brand mark (top-left) — monogram + wordmark ── */
  .brand-mark { display:flex; align-items:center; gap:12px; }
  .brand-mark-img { width:36px; height:36px; border-radius:8px;
    background:rgba(255,255,255,0.95); border:1px solid rgba(255,255,255,0.4);
    padding:2px; box-shadow:inset 0 1px 0 rgba(255,255,255,0.4); backdrop-filter:blur(4px); }
  .brand-mark-text { display:flex; flex-direction:column; }
  .brand-mark-name { font-size:14px; font-weight:800; line-height:1; }
  .brand-mark-sub  { font-size:11px; font-weight:600; letter-spacing:0.16em;
    text-transform:uppercase; opacity:0.75; margin-top:3px; }

  /* ── Kicker (eyebrow pill) — short uppercase label only ── */
  .kicker { display:inline-flex; align-items:center; gap:8px; align-self:start;
    padding:6px 14px; border-radius:9999px;
    border:1px solid rgba(255,255,255,0.3); background:rgba(255,255,255,0.15);
    backdrop-filter:blur(4px);
    font-family:var(--font-mono); font-size:11px; font-weight:500;
    letter-spacing:0.18em; text-transform:uppercase; }
  .kicker-dot { width:6px; height:6px; border-radius:50%; background:var(--color-signal-300); }

  /* ── Headline — 3-line rhythm: sans-bold, sans-bold, italic-serif cyan ── */
  .headline-block { display:flex; flex-direction:column; justify-content:center; }
  .headline { font-weight:800; font-size:56px; line-height:1.05;
    letter-spacing:-0.02em; color:var(--color-cloud); max-width:920px; }
  /* For other aspect ratios: 1080² → 72pt, 1200×1200 → 64pt, 1600×900 → 64pt */
  .headline em { font-family:var(--font-serif); font-style:italic; font-weight:400;
    letter-spacing:0; color:#cce6ff; }

  /* ── Subhead (body copy) — mixed case, normal tracking ── */
  .subhead { display:flex; flex-direction:column; gap:4px; max-width:920px; }
  .subhead-line { font-size:19px; font-weight:500; line-height:1.45;
    color:rgba(246,249,252,0.88); }
  .subhead-line.muted { color:rgba(246,249,252,0.55); }
  .subhead-line strong { color:var(--color-cloud); font-weight:600; }

  /* ── Glassmorphic double-bezel card (the brand's signature surface) ── */
  .glass-card {
    /* Outer bezel — frosted glass shell */
    border-radius:2rem;
    padding:0.625rem;
    background:rgba(255,255,255,0.12);
    border:1px solid rgba(255,255,255,0.30);
    backdrop-filter:blur(24px);
    box-shadow:0 30px 80px rgba(3,13,28,0.5);
  }
  .glass-card__core {
    /* Inner bezel — the content surface */
    border-radius:1.75rem;
    background:rgba(255,255,255,0.85);
    padding:1.5rem;
    border:1px solid rgba(255,255,255,0.30);
    backdrop-filter:blur(16px);
  }
  /* Use: <div class="glass-card"><div class="glass-card__core">…content…</div></div> */

  /* ── CTA — white pill with sapphire arrow (the landing-page hero pattern) ── */
  .cta { display:inline-flex; align-items:center; gap:10px; height:44px; padding:0 20px;
    border-radius:9999px; background:var(--color-cloud); color:var(--color-navy-950);
    font-weight:700; font-size:14px; letter-spacing:-0.01em; text-decoration:none;
    box-shadow:0 4px 14px rgba(0,0,0,0.18); }
  .cta-arrow { width:22px; height:22px; border-radius:50%;
    background:var(--color-electric-500); color:var(--color-cloud);
    display:inline-flex; align-items:center; justify-content:center;
    font-size:11px; font-weight:700; }

  /* ── URL line (footer URL with cyan accent on path) ── */
  .url-line { font-family:var(--font-mono); font-size:11px; font-weight:500;
    letter-spacing:0.02em; color:rgba(246,249,252,0.85); }
  .url-line strong { color:var(--color-signal-300); font-weight:500; }

  /* ── Trust strip — short uppercase labels only ── */
  .trust { display:flex; align-items:center; gap:10px;
    font-family:var(--font-mono); font-size:11px; font-weight:500;
    letter-spacing:0.14em; text-transform:uppercase; color:rgba(246,249,252,0.7); }
  .trust-dot { width:3px; height:3px; border-radius:50%; background:rgba(246,249,252,0.4); }

  /* ── Official monogram (B above ∞, 3D metallic silver) ── */
  /* Use as <img src="/brand/bits-monogram-official.png" class="logo" /> */
  .logo { width:48px; height:48px; }
  /* Minimum on social: 96×96. Below that the infinity's interlock is unreadable. */
</style>
</head>
<body>
  <div class="canvas">
    <div class="layer-sky-gradient"></div>
    <div class="layer-sky-image"></div>
    <div class="layer-sunbreak"></div>
    <div class="layer-vignette"></div>

    <div class="content">
      <div class="brand-mark">
        <img class="brand-mark-img" src="/brand/bits-monogram-official.png" alt="BITS monogram" />
        <div class="brand-mark-text">
          <div class="brand-mark-name">BITS</div>
          <div class="brand-mark-sub">Boundless IT Solutions</div>
        </div>
      </div>

      <div class="kicker"><span class="kicker-dot"></span> BITS · 2026 · KICKER </div>

      <div class="headline-block">
        <h1 class="headline">Line one.<br />Line two.<br /><em>Line three.</em></h1>
      </div>

      <div class="subhead">
        <p class="subhead-line">Direct, sovereign, no-nonsense. Numbers always.</p>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; gap:24px;">
        <div style="display:flex; align-items:center; gap:16px;">
          <a class="cta" href="https://www.boundlessits.com/brandbook">Primary CTA <span class="cta-arrow">→</span></a>
          <div class="url-line">www.boundlessits.com<strong>/brandbook</strong></div>
        </div>
        <div class="trust">
          <span>BSP 454</span><span class="trust-dot"></span>
          <span>NPC RA 10173</span><span class="trust-dot"></span>
          <span>ISO 27001</span>
        </div>
        <img class="logo" src="/brand/bits-monogram-official.png" alt="BITS monogram" />
      </div>
    </div>
  </div>
</body>
</html>
```

**How to use it:**

1. **Copy the entire block** into a new file at `public/social-graphics/mocks/[your-file].html`.
2. **Open it in a browser** at `http://localhost:3847/social-graphics/mocks/[your-file].html`.
3. **Change the canvas** to your target platform — `1200×627` (LinkedIn post), `1080×1080` (Instagram square), `1080×1350` (Instagram portrait), or `1600×900` (X).
4. **Resize the headline** — for taller canvases, the 56pt headline can grow to 64–72pt; for shorter canvases, drop to 48pt. The rhythm stays the same.
5. **Edit the kicker, headline lines, subhead, CTA, and trust labels** to your content.
6. **Screenshot at exact size** → save to `public/social-graphics/exports/`.
7. **No chromatic glow shadows** — color and border do the depth work.

**What the starter gives you out of the box:**
- The exact 4-layer canvas (gradient + sky image + sunbreak + vignette)
- The glassmorphic double-bezel card class (`.glass-card` + `.glass-card__core`)
- The CTA pattern (white pill with sapphire arrow)
- The URL line with cyan accent
- The trust strip (BSP 454 · NPC RA 10173 · ISO 27001)
- The official monogram tile (top-left + bottom-right)
- The 3-line headline with the brand's italic-serif-on-the-third pattern

**What it does NOT do for you** (intentionally — these are content decisions):
- Pick the headline copy (use the social-media-guide's banned-words list + voice rules in section 8)
- Choose which compliance citations to cite (section 9 has the canonical list)
- Decide the CTA wording (section 8 + the brand voice: direct, sovereign, no fluff)

A working reference: [`public/social-graphics/mocks/li-2026-10-08-comparison-flat-fee.html`](mocks/li-2026-10-08-comparison-flat-fee.html) is a complete graphic built from this exact starter. Open it for comparison.

---

## 8. Voice & copy rules

### 8.1 Tone

- **Direct, sovereign, no-nonsense.** Speak like a 20-year floor operator, not a SaaS pitch deck.
- **Numbers always.** Cite metrics specifically ("3.2×", "₱1,850/seat", "sub-350ms"). No vague claims.
- **Mix sans + italic serif.** Three-line headlines: line 1 and 2 in Geist Sans 800, line 3 in Instrument Serif Italic cyan (`#cce6ff`).
- **Plain English.** No buzzwords. No "synergy", "best-in-class", "next-gen", "leverage", "transform".

### 8.2 Banned words

`Synergy` · `best-in-class` · `next-gen` · `leverage` · `transformative` · `disrupt` · `holistic` · `seamless` · `frictionless` · `unlock` · `empower` · `cutting-edge` · `game-changing` · `robust` · `leverage synergies` · `vertical-specific solutions`

### 8.3 Hashtags (BITS official)

Primary: `#BITS` `#BoundlessITSolutions` `#Operations360` `#BPO` `#Collections`
Compliance: `#BSP454` `#BSP857` `#NPC` `#DataPrivacy` `#SovereignCloud`
Industry: `#BPOPhilippines` `#DebtRecovery` `#FinTech` `#SEA` `#Manila`
Recruiting: `#BPHiring` `#Workforce` `#RPO` `#CareerPH`

**Use 3–5 per post.** Mix primary + 1–2 secondary. Never more than 7.

### 8.4 Character limits (copy only, the image is unrestricted)

| Platform | Headline | Body | Hashtags |
|---|---|---|---|
| Instagram caption | — | 2,200 | 30 max |
| LinkedIn post | 200 (preview) | 3,000 | 3–5 |
| X post | — | 280 | 2–3 inline |
| Facebook post | — | 63,206 (effectively 80–150) | — |

**For LinkedIn:** the first 2 lines are the preview. Lead with the strongest claim. The rest of the body should be scannable (line breaks every 1–2 sentences).

**For X:** the image is the post. The text is supporting context. Keep it under 100 characters.

---

## 9. Statutory compliance

When the social post references a Philippine regulatory framework, cite it verbatim. Do not paraphrase, do not invent. The BITS brandbook lists the canonical citations:

- **BSP Circular 454** — Fair Debt Collection (Section 3.b.1: quiet hours 6:00 AM – 10:00 PM)
- **BSP Circular 857** — Outsourcing Risk Management
- **NPC RA 10173** — Data Privacy Act of 2012
- **SEC MC No. 18** — Fair and Lawful Debt Recovery Practices
- **CIC RA 9510** — Credit Information System Act
- **ISO/IEC 27001** — Information Security Management
- **DICT Cloud Cybersecurity** — Cloud service security framework

**Use the official regulatory seals** when posting compliance content. The seals are SVGs in `public/brand/` (`bsp-seal.svg`, `npc-logo.svg`, `sec-logo.svg`, `cic-logo.svg`, `iso-logo.svg`, `dict-logo.svg`). Place at 80–120px on the post.

**Never:**
- Invent compliance claims ("BSP-compliant" without citing which circular)
- Quote statutory text from memory — pull from the actual circular
- Imply certification you don't hold
- Use statutory language to make product claims without substantiation

---

## 10. Export specifications

### 10.1 Color profile

**Always sRGB** for social. CMYK is for print only. Most social platforms (Instagram, LinkedIn, X, Facebook) expect sRGB. P3 / Display P3 will look oversaturated on non-Apple displays.

### 10.2 File formats

| Use case | Format | Quality | Notes |
|---|---|---|---|
| Photos / photo-rich graphics | JPEG | 85–92% | Lossy, small file size |
| Logo overlays, text-heavy graphics, transparency | PNG-24 | Lossless | Larger file size, exact rendering |
| Vector / logo / icons | SVG | — | Used in HTML cards, AMP, embedded content |
| Animated posts (Twitter) | MP4 | — | 1:1 or 16:9, 30s max |
| Stories / Reels (background) | PNG-24 or MP4 | — | Static or motion |

### 10.3 File naming convention

`BITS_[platform]_[type]_[date]_[revision].{ext}`

Examples:
- `BITS_LI_quote_2026-03-14_v1.png`
- `BITS_IG_carousel_announcement-operations360_2026-03-14_v2.png`
- `BITS_X_stat_recovery-yield_2026-03-14_v1.png`
- `BITS_FB_cover_2026-03-14_v1.png`

**Always include date and version.** When iterating, keep the previous version in the same folder (don't overwrite) so you can revert.

### 10.4 Folder structure

```
/social-assets
  /2026-03-14-operations360-launch
    /source
      BITS_announce-source.fig
      BITS_carousel-card-01-source.fig
      BITS_carousel-card-02-source.fig
    /exports
      BITS_LI_announce_2026-03-14_v1.png
      BITS_LI_announce_2026-03-14_v1.png
      BITS_IG_carousel_announce-operations360_2026-03-14_v2.png
      BITS_X_announce_2026-03-14_v1.png
  /archive
    /2026-02-15-rebrand
      ...
```

---

## 11. Layout examples (visual references)

### 11.1 LinkedIn post — 1200 × 627

```
┌──────────────────────────────────────────────────────┐
│  [kicker: BITS · 2026 RESULTS · COMPLIANCE]            │  ← 14pt Geist Mono 500, cyan
│                                                      │
│  0                                                   │  ← 128pt Geist Mono 500, white
│  compliance violations                                 │  ← 22pt Geist Sans 500, white/85%
│  across 2.4M audited calls.                            │  ← 16pt Geist Sans 400, white/55%
│                                                      │
│                              [BSP seal] [BITS logo]   │  ← 80px each, bottom-right
└──────────────────────────────────────────────────────┘
       ↑ Boundless Horizon gradient backdrop (#0284C7 → #5ea2f9)
       ↑ Optional 22px database dot lattice at 6% opacity
```

### 11.2 Instagram square — 1080 × 1080

```
┌─────────────────────────────────┐
│ [logo]            [kicker]      │  ← 64px logo top-left, 14pt mono top-right
│                                 │
│                                 │
│  Introducing                     │  ← 56pt Geist Sans 500, white
│  BITSagent                       │  ← 80pt Geist Sans 800, white
│  AI Operations.                  │  ← 80pt Instrument Serif Italic, sky-100 cyan
│                                 │
│  Sub-300ms conversational         │  ← 22pt Geist Sans 500, white/85%
│  voice. 100% audited.            │
│                                 │
│                                 │
│            [URL: boundlessits]   │  ← 16pt Geist Mono 500, white/85%
└─────────────────────────────────┘
       ↑ Bedrock #030B18 + 22px dot lattice + sunbreak bloom
```

### 11.3 X post — 1600 × 900

```
┌──────────────────────────────────────────────────────┐
│  [kicker: BITS · 2026]                                │
│                                                      │
│  3.2×                                                │  ← 144pt Geist Mono 500, white
│                                                      │
│  right-party connect rate.                           │  ← 32pt Geist Sans 600, white
│  Industry average: 1.1×                              │  ← 18pt Geist Sans 400, white/55%
│                                                      │
│                                          [BITS logo] │  ← 64px, bottom-right
└──────────────────────────────────────────────────────┘
       ↑ Solid #030B18 (no gradient — performance posts stay clean)
```

### 11.4 Instagram carousel card — 1080 × 1080

```
┌─────────────────────────────────┐
│ 01 / 05                  [logo]  │  ← 14pt mono top-left, 64px logo top-right
│                                 │
│  PTP Watchdog                    │  ← 48pt Geist Sans 800, white
│  10-second reallocation.         │  ← 28pt Geist Sans 500, white/85%
│                                 │
│  When a Promise-to-Pay window    │  ← 20pt Geist Sans 400, white/75%
│  expires, the system             │
│  auto-reallocates the account    │
│  to the supervisor queue.        │
│                                 │
│  No manual work. No missed      │  ← 20pt Geist Sans 600, white
│  promise.                       │
│                                 │
│  → Swipe for the rest           │  ← 14pt mono, Electric Blue
└─────────────────────────────────┘
       ↑ Boundless Horizon gradient (odd cards) / Bedrock (even cards)
```

---

## 12. AI generation prompts (copy-paste)

When asking an AI image tool (Flux Pro, Recraft V3, Ideogram, Gemini Nano Banana Pro) to generate a BITS social graphic, paste the relevant prompt below into the tool.

### 12.1 Flux Pro 1.1 / Flux Kontext

```
A BITS brand social media graphic at 1200×627. Boundless Horizon
azure sky gradient backdrop (#0284C7 → #5EA2F9) with a subtle
evenly-distributed 22px database dot lattice at 6% opacity. Soft
radial sunbreak at the top. Sapphire vignette in the center for
white text legibility.

The official BITS monogram (capital B above a horizontal interlocked
infinity, 3D wedding-band metallic finish) at 64–80px, bottom-right.

[INSERT HEADLINE TEXT IN GEIST SANS 800, 48pt, WHITE]
[INSERT SUBHEAD TEXT IN GEIST SANS 500, 24pt, WHITE/85%]
[INSERT KICKER TEXT IN GEIST MONO 500, 14pt, CYAN, UPPERCASE,
LETTER-SPACED]

No drop shadow on the logo. No recolored logo. No monoline logo
redraw. No off-brand colors. No buzzwords. Photorealistic 3D
finishes, glassmorphic feel, institutional weight. Aspect 1.91:1.
```

### 12.2 Recraft V3 (best for vector / brand consistency)

```
A geometric, brand-strict social media graphic for BITS — Boundless
IT Solutions. Layout: 1200×627 LinkedIn post. Background: Boundless
Horizon azure gradient with a subtle 22px database dot lattice.

Three-line headline: line 1 and 2 in Geist Sans 800 (48pt, white);
line 3 in Instrument Serif Italic (48pt, sky-100 cyan). Use
"Instrument Serif Italic" for the third line only.

Subhead in Geist Sans 500 (24pt, white 85% opacity). Kicker in
Geist Mono 500 (14pt, uppercase, cyan, letter-spaced 0.18em).

Official BITS monogram (capital B above horizontal interlocked
infinity, wedding-band metallic silver) at 80px, bottom-right with
50% clear space on all sides. No drop shadow. No monoline redraw.

No off-brand colors. No glassy cliché. Institutional, sovereign,
premium. Real product, real typography, no AI-tells.
```

### 12.3 Ideogram 3.0 (best for typography-heavy)

```
A premium BITS brand social media graphic, 1200×627, LinkedIn post.

Background: azure sky gradient (#0284C7 to #5EA2F9) with a subtle
22px database dot lattice and a soft radial sunbreak at the top.

Typography:
- Kicker: small uppercase monospace at top, cyan (#5CC8FF),
  letter-spaced
- Headline: "Introducing / OPERATIONS 360 / Field Edition." — bold
  sans for first two lines, italic serif (Instrument Serif) for
  third line in light cyan
- Subhead: 24pt sans-serif, white

Official BITS monogram (capital B above horizontal interlocked
infinity, 3D metallic wedding-band silver) at 80px, bottom-right.

No drop shadow on logo. No recolored logo. No off-brand colors.
No buzzwords. Clean, institutional, premium. Real typography, no
gibberish, no AI-tells.
```

### 12.4 Gemini Nano Banana Pro (best all-around)

```
Generate a 1200×627 social media graphic for BITS — Boundless IT
Solutions, a sovereign enterprise operations platform for
Philippine collection agencies, BPOs, and banks.

Subject: [INSERT YOUR HEADLINE / SUBHEAD / STAT HERE]

Background: Boundless Horizon azure gradient (#0284C7 → #5EA2F9)
pinned as the atmosphere, with a subtle evenly-distributed 22px
database dot lattice at 6% opacity, and a soft radial sunbreak at
the top.

Typography (use these exact fonts):
- Display headline: Geist Sans 800, 48pt, white (Instrument Serif
  Italic, 48pt, sky-100 cyan, for the third line of three-line
  headlines only)
- Subhead: Geist Sans 500, 24pt, white at 85% opacity
- Kicker: Geist Mono 500, 14pt, uppercase, cyan, letter-spaced 0.2em
- Body / stat: Geist Sans 500, 18–22pt, white/80%

Official BITS monogram (capital B above a horizontal interlocked
infinity, 3D wedding-band metallic silver finish, transparent
background) at 80px, bottom-right with 50% emblem-height clear
space on all sides. No drop shadow. No recolored logo.

No off-brand colors. No glassy cliché. No buzzwords. No AI-tells
like "It's not X, it's Y" reveals. Photorealistic 3D finishes,
glassmorphic feel, institutional weight.

Aspect 1.91:1 (LinkedIn post).
```

---

## 13. Approval workflow

Before any social post goes live, run this checklist:

- [ ] Logo is at least 96 × 96px
- [ ] Logo has 50% clear space on all four sides
- [ ] No off-brand colors (only the 8 tokens in section 3)
- [ ] Typography is Geist Sans, Instrument Serif Italic, or Geist Mono
- [ ] Italic serif is on the third line of three-line headlines (or not at all)
- [ ] All metrics cited are real and verifiable
- [ ] All regulatory citations reference a specific circular (BSP 454, NPC RA 10173, etc.) — not vague "BSP-compliant"
- [ ] File is named per the convention in section 10.3
- [ ] File is in sRGB
- [ ] Hashtags are 3–5 (max 7)
- [ ] Voice matches section 8 — direct, sovereign, no buzzwords
- [ ] No banned words from section 8.2
- [ ] Has been reviewed by a second set of eyes if it's a high-stakes post (announcement, compliance, hiring)

---

## 14. Related references

- **Full brandbook**: [www.boundlessits.com/brandbook](https://www.boundlessits.com/brandbook)
- **Official monogram**: [`./bits-monogram-official.png`](./bits-monogram-official.png)
- **Regulatory seals**: `./bsp-seal.svg`, `./npc-logo.svg`, `./sec-logo.svg`, `./cic-logo.svg`, `./iso-logo.svg`, `./dict-logo.svg`
- **Color tokens (CSS)**: [`./bits-tokens.css`](./bits-tokens.css)
- **Color tokens (JSON)**: [`./bits-tokens.json`](./bits-tokens.json)
- **Tailwind v4 preset**: [`./bits-tailwind-preset.css`](./bits-tailwind-preset.css)
- **Atmospheric sky image**: `/images/hero-sky-bg.jpg` (use at 90–95% quality)
- **AI prompt snippets**: see section 12

---

*Boundless IT Solutions · 2026 Edition · Design System v3.4 · Public / Brand Guidelines*
*This document is the canonical reference for BITS social media. It is the source of truth for every social graphic the brand ships. When in doubt, the brandbook wins.*
