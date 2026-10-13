# ART-DIRECTION PROMPT - BITScrm Support (Customer Service CRM) Facebook Post

**Product:** BITScrm Support - Helpdesk & Service
**Route:** `/products/support` - demo at `/crm-support`
**Placement:** Facebook feed, single image, 4:5 portrait
**Master size:** 2160 x 2700 (ultra-HD) - standard 1080 x 1350

---

## 1. STRATEGY

**The audience.** Customer service managers and support leads who are personally accountable for response-time commitments. They are not buying "a CRM." They are buying the ability to say with confidence that nothing blew up while they were asleep.

**The problem.** Every ticketing tool records a breach after it happens. The manager finds out from a report, or from the customer. By then the damage is done and the number is already on the board.

**The wedge.** BITScrm Support ranks the queue by what breaks first and counts down to it on every ticket. The differentiator is not the inbox - everyone has an inbox. The differentiator is **breach prediction before it happens.** That is the product's own line, and it is the only honest reason to switch.

**The proof to show.** The SLA watchlist with breached and at-risk tickets visible, sorted by urgency, each carrying a live countdown pill. That single screen answers "why should I care?" in under two seconds.

**What we deliberately do not say.** No FCR percentage. No "reduce handle time by X%." The site carries `+46% FCR` as a product metric, but that number is not verified against customer results, so it stays off the creative. Same for the SOC 2 and DPA badges.

---

## 2. IMAGE-GENERATION PROMPT (reusable)

Use this when a real product screenshot is not available - for paid ad variants, story frames, or a different device ratio.

> **Subject.** A modern desktop monitor floating at a slight three-quarter angle against an open blue sky, screen filled with a premium dark-navy customer service dashboard. The dashboard is built from clean geometric UI blocks only: a slim top bar, a left rail, and a wide queue panel listing four ticket rows. Each row is a rounded rectangle carrying a small square priority chip on the left and a pill-shaped status badge on the right. The badges glow in deep red on the first two rows and warm amber on the last.
>
> **Composition.** The monitor sits in the lower-right third of the frame, cropped by the bottom edge. Two thirds of the upper-left frame is left deliberately empty for headline and supporting text.
>
> **Setting and lighting.** High above a soft white cloud layer, late-morning sun. Bright, airy, optimistic. Light from the upper left, gentle rim light on the monitor's aluminium edge, no harsh reflections.
>
> **Style.** Crisp commercial product photography blended with clean UI illustration. Premium enterprise SaaS aesthetic. Sleek, saturated, high contrast. Cool blue palette with electric blue accents.
>
> **Technical.** Ultra sharp, 4K, no motion blur, no lens distortion, no chromatic aberration.

**Negative constraints - append to every variant:**

> Absolutely no letters, no words, no numbers, no typography, no logo, no brand mark, no watermark, no signature anywhere in the image. No fake UI text, no garbled glyphs, no lorem ipsum. The BITS logo is never drawn by the model - it is composited later from the real asset file.

**Why:** image models hallucinate lettering. Every word and the logo ship as real HTML and the real PNG. The model supplies only the object and the light.

---

## 3. TWO HERO OPTIONS

Both are built on the identical series system. They differ only in the hero asset. Ship the screenshot version by default; keep the generated one for paid placements where a device shot beats a UI crop.

### Option A - real product screenshot (default)

`crm-support-fb-post.html` -> `crm-support-fb-4x5-uhd.jpg`

| Step | Command / value |
|---|---|
| Dev server | `npm run dev` (Next.js 16, port 3847) |
| Route | `http://localhost:3847/crm-support` |
| Dismiss cookie banner | "Essential Only" |
| Context | `deviceScaleFactor: 2`, viewport 1500 x 1200 |
| Element | SLA Watchlist panel, CSS box x288 y449 w779 h282 |
| Crop | x2 device pixels -> 1558 x 564 |
| Output | `docs/social/support-sla-watchlist.png` |

**Why the KPI row was cropped out.** The demo dashboard shows "Open Tickets 6", "SLA Compliance 94%", "CSAT 5.0". Those are synthetic demo figures. Placed on a marketing post they would read as performance claims. The watchlist rows are illustrative queue content, which is a different category and is safe. Only the queue panel ships.

### Option B - generated device render

`crm-support-gen-fb-post.html` -> `crm-support-gen-fb-4x5-uhd.jpg`

Generated via `connector__matrix__generate_image`, aspect 16:9, resolution 4K, returned 5504 x 3072. Two variants were produced; the three-quarter laptop was selected over the head-on monitor because the angle gives the composition depth and survives a -2 degree tilt.

| Step | Value |
|---|---|
| Source | `support-hero-gen-a.jpg` (5504 x 3072) |
| Crop to screen | orig x1040 y420 w2410 h2010 -> `support-screen-gen.png` (aspect 1.199) |
| Display | 620 x 517 at left 420, top 630, rotate -2deg |
| Background removal | edge flood fill, `min > 224 && range < 28` |

**Two production gotchas worth keeping.**

1. **Never key a device render that still carries its own drop shadow.** The original render's soft shadow is darker than the strict white threshold, so it survived keying and left a grey rectangle on the sky. Crop to the device before keying, and verify the corners after.
2. **Use `filter: drop-shadow()` on the keyed image, never `box-shadow` on its container.** A box-shadow paints a rectangle regardless of what sits inside the box, so it draws a visible dark slab over the backdrop. `drop-shadow` follows the alpha channel and traces the device silhouette correctly.

**Honest note on "latest model":** `connector__matrix__generate_image` exposes no model parameter - only prompt, aspect ratio, resolution and reference images. The provider routes internally, so the only lever available is `resolution: "4K"`. Do not claim a specific model version in writing.

---

## 4. THE BITS SOCIAL SERIES SYSTEM

Every post in this series uses one component system. Only the content changes - never the spec. Copy new posts against this table, do not re-invent it.

| Token | Value | Applies to |
|---|---|---|
| Canvas | 1080 x 1350 (ultra-HD 2160 x 2700) | every post |
| Typeface | Outfit 400-900 | every post |
| Left margin `--m` | 76px | logo, card, hero, contact bar |
| Headline | 76px / 800 / 1.04 / -0.035em | every post |
| Subhead | 30px / 500 / 1.42 | every post |
| Pill height | 58px, 999px radius | feature chips and channel pills |
| Card | white, 32px radius, -1.2deg tilt | capability card |
| Card body | 22px / 500 / #40536d | capability card |
| Label | 18px / 800 / 0.12em / uppercase / #0063db | capability card |
| CTA | white pill, 25px / 700, 46px #0063db arrow disc | every post |
| Contact bar | `rgba(9,20,42,.88)`, 44px tall, 20px / 600 white | every post |
| Background | real `hero-sky-bg.jpg` at 220%, azure gradient, bloom + sapphire vignette | every post |
| Logo | real `logo-reverse.png`, 42px tall, top-left | every post |

**Vertical position is content-driven.** Block `top` values change when copy length changes. The tokens above do not.

**Posts currently on this system:** `oms-fieldapp-fb-post.html` (Operations 360 Field App), `crm-support-fb-post.html` (BITScrm Support, screenshot hero), `crm-support-gen-fb-post.html` (BITScrm Support, generated hero). They must stay recognisably siblings in the feed.

---

## 5. LAYOUT SPEC - BITScrm Support (screenshot hero)

| Element | Position | Notes |
|---|---|---|
| Logo | left 76, top 67, h 42 | Real `logo-reverse.png` |
| CTA pill | right 76, top 50 | Centred on the logo's line at y=88 |
| Headline block | centred, top 156 | 76px / 800 |
| Subhead | centred, ~336 | 30px, 820px max width, manual break |
| Channel strip | centred, top 447, h 58 | Five pills, 14px gaps |
| Capability card | left 76, top 530, w 540, h 308 | Rotated -1.2deg |
| Hero panel | left 76, top 830, w 940, h 360 | Rotated -1.2deg, fully inside margins |
| Contact bar | left 76, top 1220, h 44 | Inked pill over the cloud plate |

**Card-to-hero overlap is 13px by design.** Any deeper and the card covers the "SLA Watchlist" title; any shallower and it stops reading as layered. Measured in the browser, not eyeballed.

**Generated-hero variant deltas:** hero moves to left 420, top 630, 620 x 517, rotate -2deg; contact bar to top 1210. Everything above the hero is unchanged.

**Background.** The real cloud plate at 220% scale, same treatment as the site hero.

---

## 6. ON-GRAPHIC COPY

| Slot | Text |
|---|---|
| Logo | BITS reverse lockup (real asset) |
| Headline | Know The Breach / Before It Happens |
| Subhead | One queue for every channel. / Every ticket carries its own countdown. |
| Channel strip | Email, SMS, Web, Chat |
| Card label | BREACH PREDICTION |
| Card heading | One queue, ranked by urgency |
| Card items | P1 to P4 priority with a live countdown; Sentiment flagged before escalation; Skill-based routing to the right agent |
| CTA | Book a Consultation |
| Contact | bits_inquiries@boundlessits.com; boundlessits.com |

**Voice rule for the feature card.** Plain business nouns and verbs. Name the mechanism, not the benefit adjective. "P1 to P4 priority with a live countdown" - not "powerful smart prioritisation." "Skill-based routing to the right agent" - not "seamlessly connects you with the best person." Every bullet must survive being read aloud to a support manager with no context.

Contact values are real: `lib/site.ts` -> `site.inquiryEmail` and `site.url`. No phone number exists anywhere in the repo, so none was invented. Add one when a real line is available.

---

## 7. GUARDRAILS

- **Never** put `+46% FCR`, SOC 2, DPA or HIPAA badges on paid or organic creative until the CEO signs off on the evidence.
- **Never** let a model draw the BITS logo. It ships as the real PNG, always.
- **Never** ship synthetic demo metrics as marketing claims.
- **Never** crop a UI screenshot so tightly that IDs or status values get cut - it reads as a bug, not as design.
- **Never** claim a specific image model version. The connector exposes no model parameter.
- Reuse the grid, not the coordinates. If copy changes length, the alignment rules hold and the numbers move.