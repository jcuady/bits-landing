# MiniMax H3 — CRO Marketing Brief & Ad Production Playbook

> Workspace: `C:\Users\jcuad\OneDrive\Documents\BITS`
> Generated: 2026-10-06
> Audience: Internal marketing + content team
> Skill installed: `h3-prompt-writing` (portable, agent-agnostic)

---

## 0. TL;DR

- **MiniMax H3** is MiniMax's flagship omni-modal generative video model — native 2K, native stereo audio, 5–15s clips, image+video+audio+text inputs.
- 9 bundled skills (1 portable prompt writer + 8 MiniMax Hub canvas skills). Only `h3-prompt-writing` works in Mavis / generic agents; the others require MiniMax Hub.
- Top CRO angles: **price-performance shock**, **all-in-one pipeline**, **2K + native audio in one pass**, **12-reference multimodal context**, **commercial-grade brand rendering**.
- We have the prompt grammar. We can ship ads in T2VA, I2VA, FL2VA, and Ref2VA — that maps cleanly to Meta, TikTok, YouTube, LinkedIn, X.

---

## 1. The System Decoded

### 1.1 MiniMax H3 at a glance

| Spec | Value |
|---|---|
| Output duration | 4–15 s (Hailuo 3 ships 5/10/15s presets) |
| Resolution | 768p (Base) and 2K (Regenerate-2K, in-context upscale) |
| Frame rate | 24 FPS |
| Audio | 32 kHz native stereo (first for the Hailuo line) |
| Aspect ratios | 21:9, 16:9, 4:3, 1:1, 3:4, 9:16 |
| Dialogue languages | 11 stable (AR, ZH, EN, FR, DE, IT, JA, KO, PT, RU, ES) + more |
| Reference input cap | 12 files total: ≤9 images, ≤3 video clips, ≤3 audio clips |
| Per-clip video length in | 2–15 s each |
| Modes | T2VA, I2VA, FL2VA, L2VA, Ref2VA |
| Pricing claim | <1/3 mainstream at 2K; <1/2 mainstream at 768p |
| License | MiniMax H3 Community License (open weights, restricted commercial use) |

### 1.2 Three-module pipeline

1. **H3-Context-IR** — proprietary preprocessor. Converts messy multimodal input into a structured `Context Intermediate Representation` (the `subject_definitions` / `summary` / `retention_analysis` / `detailed_description` / `overall_soundscape` / `non_diegetic_music` schema). Only available via API.
3. **H3-Base** — 33B-parameter single-stream dense Omni Transformer. Open weights, two checkpoints: `FL2VA` (text/keyframe) and `Ref2VA` (omni-reference). Uses Qwen3-VL-32B as text encoder (layer 50 hidden states), H3-VisualVAE (f16t4d24), H3-AudioVAE (32 kHz stereo, 40 Hz). 3D MM-RoPE for `(t, h, w)` positional.
5. **H3-Regenerate-2K** — proprietary in-context upscale. Reuses H3-Base as its own super-resolution network by feeding the 768p result + original context back in. Recovers text/brand detail that classic SR would have to "guess".

### 1.3 The 9 shipped skills

| # | Skill | Trigger / Use | Portable? |
|---|---|---|---|
| 1 | `h3-prompt-writing` | Rewrite requests into H3 prompt structure | ✅ Yes |
| 2 | `brand-promo-video-generator` | Brand/product promo films (logos, UI, assets) | ❌ Hub only |
| 3 | `minimalist-product-ad-generator` | E-commerce product ads, Apple-style product films | ❌ Hub only |
| 4 | `3d-animation-short-generator` | Stylized 3D animated shorts | ❌ Hub only |
| 5 | `papercraft-stop-motion-explainer` | Tactile paper-art science explainers | ❌ Hub only |
| 6 | `paper-collage-explainer-generator` | Halftone paper-collage explainer animations | ❌ Hub only |
| 7 | `music-video-subtitle-generator` | Beat-synced MV lyric typography | ❌ Hub only |
| 8 | `co-op-game-intro-generator` | Two-player co-op game menu animation | ❌ Hub only |
| 9 | `handdrawn-live-video-generator` | Surreal hand-drawn + live-action blends | ❌ Hub only |

> **Why this matters for ads:** 7 of the 8 Hub skills are direct ad/brand-content playbooks. We can borrow their narrative spines, beat tables, and pre-production gates and apply them in `h3-prompt-writing` format using the public API or app.

### 1.4 H3 prompt grammar (what we can already produce)

From the two reference docs already in our local skill:

**Base mode prompt skeleton** (T2VA / I2VA / FL2VA / L2VA):

```text
[Mode instruction line — first frame alignment]
integrated_multimodal_description:
  [Shot 1] <opening live-action/2D-style line, composition, subject, action>
  [Shot 2] At MM:SS.mmm, the camera cuts to ...
  ...
overall_soundscape: <ambient + physical SFX, 1–4 sentences>
non_diegetic_music: <audience-only score, 1–3 sentences>
```

**Full-reference mode** (Ref2VA, six sections in order):

```text
subject_definitions:
  <Subject N> = ...
  <Picture N> = ...
  <Video N> = ...
  <Audio N> = ...

summary:
  [<task types joined with +>] The target video ...

retention_analysis:
  <Subject N>: fully_preserved / partially_preserved / attribute_transfer / weak_reference - ...

detailed_description:
  [Shot 1] <style opening + composition>
  [Shot 2] At MM:SS.mmm, ...

overall_soundscape:
non_diegetic_music:
```

This is the exact prompt schema H3's API and Context-IR consume. **We are now equipped to author production-grade H3 prompts.**

---

## 2. CRO Marketing Analysis

### 2.1 ICP (Ideal Customer Profile) ladder

| Tier | Persona | Why they care | Ad angle |
|---|---|---|---|
| 1 — Primary | Performance marketers & creative directors (in-house + agency) | 12-asset multimodal context + 2K + audio in one pass beats their Veo3/Sora stack on cost-per-asset and iteration speed | "One prompt. Twelve references. Two-K native." |
| 2 — Secondary | Indie creators, UGC studios, KOC teams | Lower price per second + first/last-frame + image-to-video lowers their hero/post cost dramatically | "Ship 30 hooks for the price of one Veo render." |
| 3 — Tertiary | E-commerce / DTC operators | Reference image lock + brand fidelity + product-anchor mode = pixel-faithful product reels | "Your product. Your color. Native 2K. One render." |
| 4 — Long tail | Game studios, indie devs, animators | 3D-animation skill + multi-shot storytelling + cheap iteration | "Concept to cinematic in one pipeline." |
| 5 — Watch | Enterprise brand teams | In-context regeneration + brand asset fidelity claims | "2K brand reels at one-third the cost." |

### 2.2 Three positioning pillars (pick one per creative)

1. **All-in-one pipeline.** "Text + images + video + audio → 2K with stereo sound. One model, one render, no post-production chain."
2. **Price-performance shock.** "Less than one-third the per-second cost of mainstream 2K models. Production economics flipped."
3. **Reference fidelity.** "Up to 12 reference assets in a single prompt — character, scene, motion, voice, score. Lock the look, change the story."

### 2.3 The 5-second CRO test for every ad concept

For every creative, ask:

| Q | Pass? |
|---|---|
| Does the first frame reveal the product/feature visually? | ☐ |
| Is there an outcome-based hook in the first 1.5s? | ☐ |
| Is the brand/feature name spoken or on-screen by 2.0s? | ☐ |
| Is the CTA implicit by 4.0s (download, try, see)? | ☐ |
| Does the final beat leave a single clear memory? | ☐ |

If any ☐ is empty, revise before render.

---

## 3. Ad Concept Library (Ready to Author)

> Each concept is delivered in the H3 prompt grammar (base mode) so we can paste it straight into the H3 API or Hub canvas. We pick the right mode per creative.

### 3.1 "Twelve References" — Flagship 15s 16:9 hero film (T2VA)

Hook: a creator's desktop fills the screen — twelve asset thumbnails appear on the timeline. The cursor drops all twelve into a single text field. A prompt types itself. The screen collapses into a single glowing "Generate" button. The button presses itself. Cut to the resulting 2K clip — a sweeping cinematic shot. Native audio swells.

**Mode**: T2VA. Use brand-aligned colors. End on MiniMax/Hailuo logo + "One prompt. Twelve references. 2K native."

### 3.2 "One-third the cost" — 6s vertical shock ad (T2VA, 9:16)

Hook: a counter ticks up — $3.00, $6.00, $9.00 — and then resets to $1.00. The MiniMax H3 logo slides in. Text overlay: "2K video. One-third the price." Final beat: a 2K-clip thumbnail pulses with native audio.

**Mode**: T2VA. Aspect 9:16. Music: restrained tech pluck, Apple-style.

### 3.3 "Lock the product" — DTC e-commerce 10s product reel (FL2VA)

Use the user's product hero shot as Picture 1 (first frame) and a stylized hero-render as Picture 2 (last frame). The animation bridges them: product rotates 360°, color shifts match brand palette, ending on the canonical Apple-style hero pose. Text overlay in the final beat: single-line brand tagline with two-part color treatment (first half black/white, second half in product color).

**Mode**: FL2VA. This is the `minimalist-product-ad-generator` workflow — we just adapt it for the public API. Recommend 10s, 16:9 or 1:1.

### 3.4 "From prompt to cinematic" — 15s developer/marketer explainer (T2VA)

Sequence: 5 rapid cuts, each starting on a different input mode.

1. Cut 1 (0–3s): T2VA — text becomes a forest.
3. Cut 2 (3–6s): I2VA — a still photo becomes motion.
5. Cut 3 (6–9s): FL2VA — two keyframes morph into each other.
7. Cut 4 (9–12s): Ref2VA — character + voice + scene blend into one shot.
9. Cut 5 (12–15s): Logo + "MiniMax H3 — five ways to start."

**Mode**: T2VA with multi-shot cuts. This is the show-off creative.

### 3.5 "Native audio, no post" — 8s 9:16 TikTok/Reels creative (T2VA)

A silent film aesthetic. Title card: "Imagine making this without sound." Cut to the same scene with H3-native audio: ambient music swells, footsteps, doors, dialogue. Title card: "Or… don't." MiniMax H3 logo + "Native stereo. One pass."

**Mode**: T2VA. 9:16. Lean on `overall_soundscape` + `non_diegetic_music`.

### 3.6 "Brand reel in two minutes" — 15s performance-marketer trust ad (T2VA)

Storyboard of an agency producer: receives a Slack ping, drops a folder of references into the H3 prompt, gets back a 2K brand reel in 60 seconds, ships it. Numbers tick on screen: "1 prompt · 12 inputs · 2K · 60s · $0.13/sec."

**Mode**: T2VA. 16:9. Hub/B2B vibe.

### 3.7 "Voices across languages" — 10s 1:1 multi-language showcase (Ref2VA)

Same visual scene, dialogue rotates through 4 languages (per flagship model: EN, JA, ES, ZH) with synced lip movement. Demonstrates multilingual audio fidelity. Use one of the references showing multilingual capability.

**Mode**: Ref2VA with multiple `<Audio N>` for different voices.

---

## 4. Channel Strategy

| Channel | Format | Length | Aspect | Cadence | KPI |
|---|---|---|---|---|---|
| YouTube pre-roll (paid) | Concept 4, 1 | 15s | 16:9 | 2/week | View-through rate, CTR |
| TikTok organic | Concept 5, 7 | 8–10s | 9:16 | 1/day | Completion rate, saves, shares |
| Instagram Reels | Concept 2, 5 | 6–8s | 9:16 | 1/day | Engagement rate, profile visits |
| Meta feed | Concept 1, 2 | 6–15s | 1:1 + 9:16 | 3/week | CPM, CTR |
| LinkedIn (B2B) | Concept 4, 6 | 15s | 16:9 | 1/week | CTR, demo requests |
| X (Twitter) | Concept 2, 4 | 6–15s | 16:9 | 3/week | Engagement, link clicks |
| Landing page hero | Concept 1, 4 | 15s loop | 16:9 | evergreen | Hero CTA conversion |

---

## 5. Production Pipeline (How We Actually Ship)

```
Brief → Mode pick → Reference assembly → H3 prompt authoring
              → Render (API / Hub) → Edit & brand in viewport
                            → A/B → A/B → Iterate
```

### 5.1 When to use what mode

| Want to… | Mode |
|---|---|
| Pure concept, no assets | T2VA |
| Animate one product still | I2VA |
| Morph between two keyframes | FL2VA |
| Make a video converge on a final hero shot | L2VA |
| Lock a character/scene/voice across shots | Ref2VA |

### 5.2 Hard rules when authoring prompts

- Match total duration to the requested video length (4–15s).
- Keep reference labels consistent (`<Picture 1>`, `<Video 1>`, `<Audio 1>`) across sections.
- Avoid "cinematic" / "beautiful" — describe concrete visual and audio details.
- For keyframe modes, state exactly how the first/last frame connects to the timeline.
- For Ref2VA, write all six sections in English; preserve original dialogue/lyrics inside `<d>`.

---

## 6. Open Questions / Pending Decisions

1. **What is "this system"?** Workspace is `C:\Users\jcuad\OneDrive\Documents\BITS` (not the prior BeepoBeepa workspace). If "this system" refers to a BITS product, we need 30 minutes to extract its features and pick the right ICP. If "this system" refers to MiniMax H3 itself, we're ready to ship concepts in §3 today.
2. **Distribution target.** Are these ads for MiniMax/Hailuo directly, or for a third-party campaign using H3 to create the assets?
3. **Asset budget.** Public H3 API vs Hailuo AI webapp vs local 768p SGLang deployment — each has different cost/speed trade-offs and we should pick the channel that matches the campaign budget.
4. **Brand-asset access.** For branded creatives (concept 3.3 etc.) we need authorized product imagery. The `brand-promo-video-generator` skill is unambiguous: do not impersonate marks without authorization.

---

## 7. Next Steps

- [ ] Confirm "this system" = MiniMax H3 or BITS product
- [ ] Lock the 3 concepts to ship first (recommend: 3.1, 3.4, 3.5)
- [ ] Pick render route: API / Hub / local
- [ ] Author the three H3 prompts using `h3-prompt-writing` and render
- [ ] A/B test three hooks on Meta + TikTok for one week
- [ ] Iterate on the winner, expand the rest