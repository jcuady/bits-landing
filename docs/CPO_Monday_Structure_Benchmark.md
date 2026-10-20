# Landing Page Structure Benchmark — monday.com → BITS

**Author:** Principal Full-Stack Engineering (CPO review)
**Date:** October 2026
**Method:** Live measurement of `monday.com` and the BITS homepage — rendered DOM, not impression.
**Status:** Analysis and proposal. No code changed.

---

## Measured Comparison

| | monday.com | BITS | Read |
|---|---|---|---|
| **Scroll length** | 12.7 screenfuls | 14.2 screenfuls | BITS 12% longer |
| Page height | 11,405px | 12,788px | |
| **Visible words (SSR)** | 2,343 | **1,722** | **BITS is already leaner — 0.7×** |
| **H2 sections** | 14 | 8 | monday has 1.75× the sections |
| **Words per section** | 167 | 215 | BITS 1.3× denser |
| H1 | "AI workspace for people and agents" (6 words) | — | — |
| Above-fold words | ~40 | — | — |

### The finding that changes the brief

**BITS is not wordier than monday.com. It is fewer and heavier.**

monday uses 14 sections of ~167 words. BITS uses 8 of ~215. The total copy is already lower than monday's. What feels long is not the *amount* of text — it is that **BITS holds one idea across several screens**, where monday releases a new idea roughly every screen.

That is the transferable principle. Not "use less copy" — you already do. **"Release a new idea per screen."**

---

## BITS Section Audit — screenfuls per idea

| Section | Screens | Verdict |
|---|---|---|
| hero | 1.80 | ✅ good |
| trust-strip | 0.58 | ✅ good |
| **platform-index** | **3.64** | ⚠️ one idea across 3.6 screens |
| floor-showcase | 1.62 | ✅ good |
| **pricing** | **2.44** | ⚠️ dense — 9 tiers + 4 value pillars |
| faq | 1.15 | ✅ good |
| contact | 1.50 | ✅ good |

**Two sections hold 6 of the 14.2 screens.** Fixing those two is the whole job.

---

## The Principles Worth Taking

Applied selectively. Each is judged against BITS, not copied.

### 1. One idea per screen ✅ take
**monday:** every section releases a distinct idea; no section exceeds ~1 screen.
**BITS:** platform-index (3.64) and pricing (2.44) each carry several ideas at once.
**Apply:** the four capabilities already work as two beats — the static pair and the pinned pair. Give each beat its own screen, and split pricing's tiers from its value pillars.

### 2. A visual carries the section, text is a caption ✅ take
**monday:** every section pairs ≤20 words with a carousel, tab interface, card grid, or before/after. The text explains the visual; it never replaces it.
**BITS:** this is already the strong part — the hero UI capture, the pinned FILO and AIQA cards. **Extend the pattern** to pricing and floor-showcase rather than adding more copy.

### 3. Horizontal carousels for feature groups ✅ take
**monday:** "An agent for every use case" — 16 items in a scrolling row, ~10 words each.
**BITS:** floor-showcase has 6 tabs; pricing has 9 tiers. A carousel shows the breadth without the vertical length.
**Apply:** the value pillars and the standalone catalogue list.

### 4. Tabs over long lists ✅ take
**monday:** "Get more done with agents" — 6 tabs, ~10 words each.
**BITS:** pricing already has a 3-track tab switcher. Floor-showcase has 6 tabs. Both work.
**Apply:** the existing mechanism, made obvious.

### 5. Proof as metric cards ✅ take
**monday:** a logo bar (5 words) plus customer cards with one metric each.
**BITS:** **has neither on the homepage** — the credibility section was trimmed out.
**Apply:** a compact proof band. See the recommendation below.

### 6. Security as badges, not a section ✅ take
**monday:** "Enterprise-grade security" — icon badges for GDPR, SOC2, ISO, HIPAA, ~5 words each.
**BITS:** the full Security section was removed from the homepage (1.64 screens). monday proves trust in **~0.4 screens** of badges.
**Apply:** trust belongs in the trust strip, not in its own section.

### 7. Headings as short statements ✅ take
**monday:** "Full control", "Let work flow", "Work in context" — 2–3 words.
**BITS:** "What sets us apart" ✓, "The platform" ✓, "Operations 360" ✓. Already strong.

### 8. CTA repeated after each section ✅ take
**monday:** "Get Started" after nearly every block.
**BITS:** CTAs cluster at hero and contact.
**Apply:** one quiet CTA after the platform index and after pricing.

### 9. Their visual language ✗ do not take
monday uses a multi-colour gradient palette and a very rounded, playful type scale. **BITS is azure, glass, and restrained.** Keeping BITS' visual identity is the point of the brandbook work. Take the *structure*, not the *skin*.

### 10. Their product breadth ✗ do not copy
monday has 5 product lines, all AI-shaped, which is why 14 sections works. BITS has 15 products across finance, HR, logistics and collections — different buyers. Copying their section count would dilute the OMS 360 focus. **Structure yes, breadth no.**

---

## Recommended Changes

### Change 1 — Give the platform index two beats, not one long hold
**Principle:** one idea per screen.

Currently: static pair → pinned pair, all inside one continuous 3.64-screen block.

Split so each pair is a distinct screenful with its own heading:
```
THE PLATFORM          ← static pair: Collections CRM & PTP, Predictive Dialer
WHAT SETS US APART    ← pinned pair: BITS FILO, BITS AIQA
```
*No new copy. A visual break between the two beats, so the pinned sequence starts as its own moment rather than a continuation.*

### Change 2 — Split pricing into tiers and proof
**Principle:** one idea per screen.

```
PRICING TIERS   3 cards, side by side          ~1.0 screen
WHY BITS        4 value pillars, compact      ~0.6 screen
```
Removes the 95-word feature list per tier. Each tier keeps 4 bullets, not 8. The value pillars become a 4-up row of icon + title + one line.

### Change 3 — Restore trust as a marquee band
**Principle:** proof as metric cards; security as badges. **Animation: `scrollMarquee` (21.25s infinite).**

The homepage currently ends its argument at Contact with no trust section — flagged earlier as a real gap. monday covers it in ~0.4 screens, and with an infinite marquee, ~0.3.

```
TRUSTED BY RECOVERY FLOORS   ← logo/metric row, ~5 words
BSP 454/857 · NPC RA 10173 · SEC MC 18 · ISO/IEC 27001 · CIC RA 9510
```
The brandbook already specifies these six standards and they are rendered today in the trust strip. **Promote them into a proper closing proof band** rather than rebuilding anything.

### Change 4 — Repeat the CTA
**Principle:** CTA after each section.

One quiet "Request a quote" after the platform index and after pricing. No new sections.

---

## Animation Vocabulary — measured

My first scan missed this entirely. WebFetch returns markdown; it does not run the page. Measured from monday.com's compiled CSS and live DOM:

| | monday.com | BITS |
|---|---|---|
| `@keyframes` | 14 | 6 |
| Autoplaying `<video>` | 4 | 0 |
| Canvas / Lottie | 0 | 0 |
| Scroll-linked sections | yes (`scroll-parent`) | yes (GSAP x2) |
| Sticky nav | yes | yes |

**monday's meaningful keyframes:** `subtleFade` / `subtleSlideFade` (scroll-reveal),
`scrollMarquee` (21.25s infinite), `wf-stop1-A`/`wf-stop2-A` (3s animated gradient
mesh), `orbSwoosh` (6s infinite), `breathe` (pulse). The rest are loaders and
carousel spinners.

**Adopt:** scroll-reveal per element · infinite marquee for the proof band ·
animated gradient mesh on the sky · orb swoosh behind the platform section.

**Do not adopt:** `magic-bounce-scale`, `shakeAnimation`, `tagAnimation` —
playful, wrong register for a regulated platform. Nor the 4 autoplaying videos:
autoplay costs performance and accessibility, and there is no real product video.
Static UI captures are stronger for a demo-led page.

**Constraint:** every animation needs a `prefers-reduced-motion` fallback, and
none may add scroll length.

---

## What This Gets You

| | Before | After |
|---|---|---|
| Sections | 8 | 10 |
| Screenfuls | 14.2 | ~12.5 |
| Words | 1,722 | ~1,600 |
| Trust before Contact | ✗ none | ✓ proof band |

Closer to monday's density without adopting their skin, and **without diluting the OMS 360 focus** that the whole page is built around.

---

## The Honest Caveat

monday.com and BITS are not the same business. monday sells one AI-shaped idea to one buyer across 14 sections. **BITS sells 15 products across 6 different operational functions**, and this page exists to make one of them — Operations 360 — the reason to keep looking.

Copying their section count would be copying the consequence of their catalogue, not the principle behind it. Changes 1–4 take the *structure* — one idea per screen, visual carries it, proof as cards — and leave the focus intact.

**A final caution:** the page currently has no baseline. Scroll-depth and CTA events were only just added, and nothing has been live long enough to have data. Changes 1 and 2 restructure how content is sequenced, not what it says — which makes them comparatively safe. But the honest position remains that **no part of this has been validated against real behaviour yet.**
