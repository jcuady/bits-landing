# BITS Social Graphic Prompt Template

> **For generating BITS-branded social graphics with your own content.**
> Use with any AI image generator (Flux Pro, Recraft V3, Ideogram 3.0, Gemini Nano Banana Pro) or with an LLM that writes HTML mockups.
> Read this end-to-end before pasting it.

---

## How to use this template

1. **Copy the master prompt** below into your AI tool of choice.
2. **Replace `[USER INPUT]`** with your specific content (the post idea, headline, stat, etc.).
3. **Pick the target platform** at the top of the prompt.
4. **Generate.**
5. **For HTML mockups:** open in a browser, screenshot at exact size, save to `public/social-graphics/exports/` with the file-naming convention from the social-media-guide.
6. **For raster images:** save with the same naming convention.

---

## Master prompt

```
You are a brand designer for BITS — Boundless IT Solutions, a sovereign enterprise
operations platform for Philippine BPO/collection agencies, banks, and lenders. The
brand is documented at boundlessits.com/brandbook.

TASK
Generate a [PLATFORM] social graphic at [DIMENSIONS]. The graphic must follow the
BITS visual system exactly. After the chrome, the content is mine — render the
brand chrome and the content per the spec below.

[USER INPUT: paste your post idea, headline copy, stat, or external concept here]

═══════════════════════════════════════════════════════════════════════════════
THE BITS VISUAL SYSTEM (NON-NEGOTIABLE)
═══════════════════════════════════════════════════════════════════════════════

PALETTE — 8 named roles, no other colors:
  Bedrock Navy        #030d1c   (base background, dark mode)
  Space Navy          #06162f   (deep sections)
  Boundless Horizon   #0284c7   (atmospheric gradient anchor)
  Cloud Sky Cyan       #5cc8ff   (accents, pulse, italic-serif emphasis)
  Electric Action Blue #2563eb   (primary CTA, links)
  Stratosphere Vapor   #e0f2fe   (nested card highlights)
  Cirrus Cloud White   #f6f9fc   (text on dark surfaces, glassmorphic cards)
  Sunrise Amber       #f59e0b   (focal metrics, alerts, attention badges)

TYPOGRAPHY — 3-face stack, no other fonts:
  Geist Sans           primary — body, headlines, captions
  Instrument Serif Italic — emphasis on the third line of three-line headlines
  Geist Mono           numerics, file paths, labels (uppercase, letter-spaced)

HEADLINE RHYTHM — TWO ACCEPTABLE PATTERNS, PICK ONE PER GRAPHIC:

  PATTERN A — Landing-page hero (use this by default; matches the image you sent):
    Line 1 — Geist Sans 800, large (48–96pt by canvas size), white
    Line 2 — Geist Sans 800, large, white
    Line 3 — Geist Sans 800, large, sky-100 cyan (#cce6ff)
    All three lines use the same sans-bold family. Line 3 changes COLOR (not face).
    This is the canonical pattern on the landing-page hero and the brand's "Field Team /
    Call Floor / One System" rhythm.

  PATTERN B — Brandbook italic emphasis (alternate; use sparingly for editorial posts):
    Line 1 — Geist Sans 800, large, white
    Line 2 — Geist Sans 800, large, white
    Line 3 — Instrument Serif Italic, large, sky-100 cyan (#cce6ff)
    Italic serif goes on the third line ONLY. Never the first. Never body copy.

  Default to Pattern A unless the post specifically calls for an editorial accent.
  When the user sends an image reference, match the pattern shown in the image.

LOGO — official monogram at /brand/bits-monogram-official.png
  Capital B above a horizontal interlocked infinity, 3D wedding-band metallic silver.
  Use as-is. Never recolor. Never recreate as monoline. No drop shadow on the rings.
  Minimum 96×96 px. 50% emblem-height clear space on all four sides.

═══════════════════════════════════════════════════════════════════════════════
THE 4-LAYER SPATIAL CANVAS (use ALL FOUR for hero / announcement / milestone posts;
simplify to Bedrock + content only for stat / quote / day-to-day tips)
═══════════════════════════════════════════════════════════════════════════════

Layer 0 — Azure Sky Gradient
  background: linear-gradient(180deg, #1362df 0%, #2377f3 45%, #3c8bf6 75%, #5ea2f9 100%)

Layer 1 — Static Sky & Clouds
  background-image: url('/images/hero-sky-bg.jpg')
  background-size: cover; background-position: center
  ↑ CRITICAL: use the actual hero-sky-bg.jpg image. Real cumulus clouds beat synthetic.
  ↑ CSS gradients alone are the brand's FLOOR, not the brand's LOOK.

Layer 2 — Subtle Sunbreak Bloom
  background: radial-gradient(ellipse 60% 35% at 50% 0%, rgba(255,255,255,0.22), transparent 65%)

Layer 3 — Sapphire Vignette
  background: radial-gradient(ellipse 75% 50% at 50% 50%, rgba(10,50,135,0.42), transparent 75%)

Layer 4 — Content (your headline, subhead, CTA, monogram, trust strip)
  Use glassmorphic double-bezel cards (outer frosted shell + inner content surface)
  for any nested content blocks.

═══════════════════════════════════════════════════════════════════════════════
GLASSMORPHIC CARD RECIPE
═══════════════════════════════════════════════════════════════════════════════

Outer bezel:
  border-radius: 2rem;
  padding: 0.625rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(24px);
  box-shadow: 0 30px 80px rgba(3, 13, 28, 0.5);

Inner bezel:
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.85);
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.30);
  backdrop-filter: blur(16px);

═══════════════════════════════════════════════════════════════════════════════
COMPONENT PATTERNS
═══════════════════════════════════════════════════════════════════════════════

CTA — White Pill with Sapphire Arrow
  display: inline-flex; align-items: center; gap: 10px;
  height: 44px; padding: 0 20px;
  border-radius: 9999px;
  background: #f6f9fc; color: #030d1c;
  font-weight: 700; font-size: 14px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  Arrow inside: 22×22px circle, #2563eb background, white text.

URL Line — `www.boundlessits.com/[cyan path]`
  font-family: Geist Mono; font-size: 11px; font-weight: 500; letter-spacing: 0.02em;
  color: rgba(246, 249, 252, 0.85);
  Cyan accent on the path: <strong>color: #5cc8ff; font-weight: 500;</strong>

Trust Strip — short uppercase labels only (BSP 454, NPC RA 10173, ISO 27001, etc.)
  font-family: Geist Mono; font-size: 11px; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: rgba(246, 249, 252, 0.7);
  Separator: 3px circle dot, rgba(246, 249, 252, 0.4).

Kicker (Eyebrow Pill)
  display: inline-flex; align-items: center; gap: 8px; align-self: start;
  padding: 6px 14px; border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(4px);
  font-family: Geist Mono; font-size: 11px; font-weight: 500;
  letter-spacing: 0.18em; text-transform: uppercase;
  Dot: 6px circle, #5cc8ff background.

Brand Mark (top-left tile)
  width: 36px; height: 36px; border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.4);
  padding: 2px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(4px);

═══════════════════════════════════════════════════════════════════════════════
WHAT NEVER TO DO
═══════════════════════════════════════════════════════════════════════════════

  ✗ No chromatic glow shadows (no cyan/blue halos around text or elements)
  ✗ No recolored logo (the silver is the brand)
  ✗ No monoline redraw of the B+∞ monogram
  ✗ No wide tracking on body text (only short uppercase labels)
  ✗ No italic serif on the first line of a three-line headline
  ✗ No buzzwords: synergy, transformative, disrupt, leverage, empower, robust, etc.
  ✗ No off-brand colors — only the 8 named roles
  ✗ No invented compliance claims — cite BSP Circular 454, NPC RA 10173, ISO 27001 verbatim
  ✗ No text below 11px (functional text floor)

═══════════════════════════════════════════════════════════════════════════════
OUTPUT FORMAT
═══════════════════════════════════════════════════════════════════════════════

If generating an HTML mockup (recommended for precision):
  - Self-contained HTML with inline CSS
  - One file, copy-paste ready
  - All 4 canvas layers as separate div elements
  - Use exact CSS values from this spec
  - Save to public/social-graphics/mocks/[descriptive-name].html

If generating a raster image (Flux / Recraft / Ideogram / Gemini):
  - Aspect ratio and pixel size per platform (see social-media-guide section 2)
  - sRGB color profile
  - High resolution (2x minimum for retina)
  - PNG-24 if any transparency is needed, JPEG 85–92% for photos
```

---

## Example 1 — Comparison post (Pattern A — default)

```
[USER INPUT:]
BITS vs. Salesforce Service Cloud + Five9 for a 100-seat BPO collection floor.
Salesforce + Five9: ~₱11M/yr in per-seat licensing.
BITS OPERATIONS 360: 1 platform fee. 18 connected engines. 5,000 agents. Zero per-seat tax.
Use Pattern A headline: 5,000 agents. / ₱0 in per-seat tax. / One system.
LinkedIn post (1200 × 627, 1.91:1).
```

Use Pattern A (all sans-bold, line 3 in cyan #cce6ff) for this — the current shipped mock at `public/social-graphics/mocks/li-2026-10-08-comparison-flat-fee.html` still uses Pattern B (italic serif) and can be updated.

## Example 2 — Stat callout (the brand's signature performance post)

```
[USER INPUT:]
BITS recovered 3.2× more right-party connects than the industry average in 2025.
The 10-second PTP watchdog auto-reallocates the moment a promise window expires.
100% of calls are audited for BSP 454 quiet-hour compliance.
X / Twitter post (1600 × 900, 16:9).
```

## Example 3 — Founder quote

```
[USER INPUT:]
Quote: "Generic CRMs were built for generalists. We built one for the recovery floor."
Attribution: Malcolm Cuady, Principal Engineer · 20 years on Philippine recovery floors.
Instagram square (1080 × 1080, 1:1).
```

## Example 4 — Landing-page hero style ("What is included" glassmorphic card)

This is the canonical BITS pattern — use it by default for hero posts, announcement posts, and any post that should look like the landing page. The 3-line headline uses Pattern A (all sans-bold, line 3 in cyan). The content card is the glassmorphic "What is included" pattern from the landing page.

```
[USER INPUT:]
OPERATIONS 360 · FIELD OPERATIONS
Headline: Your Field Team. / Your Call Floor. / One System.
Subhead: One platform for field visits, phone calls, and quality checks.
CTA: Book a Consultation
URL: www.boundlessits.com
What is included (8 features):
  - Field app with GPS and photos
  - Predictive and progressive dialer
  - Promise-to-pay tracking
  - Supervisor listen and barge
  - Same account history everywhere
  - Browser softphone, no hardware
  - QA scorecards with playback
  - Role-based access and audit log
Facebook + Instagram, 1200 × 1500 portrait (4:5) — works on both platforms.
```

Output structure:
  - Top: monogram tile (white glassmorphic) + BITS wordmark
  - Pill kicker: "OPERATIONS 360 · FIELD OPERATIONS" with cyan dot
  - 3-line headline (Pattern A — all sans-bold, line 3 in cyan #cce6ff)
  - Subhead in Geist Sans 500
  - White pill CTA "Book a Consultation" with sapphire arrow
  - URL line
  - **Bottom: double-bezel glassmorphic card** containing "What is included" + 2-column feature list with checkmark icons
  - Logo bottom-right

## Example 5 — Compliance / trust (Pattern A)

```
[USER INPUT:]
BSP Circular 454 quiet hours enforced 100% of the time.
NPC RA 10173 compliant data residency on sovereign Philippine infrastructure.
ISO 27001 aligned information security management.
Zero compliance violations in 2025 across 2.4M audited calls.
LinkedIn post (1200 × 627, 1.91:1). Use the official BSP seal from /brand/bsp-seal.svg.
```

## Example 6 — Announcement

```
[USER INPUT:]
Introducing BITSagent AI Operations.
Sub-300ms conversational voice AI for outbound collections and inbound triage.
BSP Circular 454 quiet hours enforced. NPC RA 10173 compliant. 100% audited.
LinkedIn post (1200 × 627, 1.91:1).
```

## Example 7 — External idea (your own content)

```
[USER INPUT:]
[YOUR EXTERNAL POST IDEA, HEADLINE, STAT, OR CONCEPT — paste here]
[REPLACE WITH THE TARGET PLATFORM AND DIMENSIONS — e.g., Instagram square 1080×1080, LinkedIn post 1200×627, X 1600×900, etc.]
```

The master prompt above contains every brandbook rule, every visual token, every component recipe, and every "never do" rule. Drop your content in and the generator has the full system context.

---

## Notes on the master prompt

**What it deliberately doesn't do:**
- **Pick the content** — your job. The prompt only establishes the visual system.
- **Pick the platform** — you choose at the top.
- **Pick the headline** — you write the words (using the brand voice: direct, sovereign, no-nonsense, numbers always, no buzzwords).
- **Approve the result** — always review before publishing. Use the approval checklist in social-media-guide section 13.

**What it does do:**
- **Establishes the visual system** so the generator has the full brandbook context.
- **Lists the "never" rules** so the generator doesn't drift to AI-UI clichés (glows, recolored logos, monoline redraws).
- **Provides component recipes** so the generator can build glassmorphic cards, CTAs, trust strips, kickers, and monogram tiles correctly.
- **Maps the 4-layer canvas** to specific CSS values that match the live codebase.
- **Cites the actual image paths** so the generator knows to reference `/images/hero-sky-bg.jpg` and `/brand/bits-monogram-official.png` rather than inventing fake assets.

---

*Boundless IT Solutions · 2026 · Design System v3.4 · Public / Brand Guidelines*
*This is the canonical prompt for BITS-branded social graphics. The brand is the system. The system is the brand.*
