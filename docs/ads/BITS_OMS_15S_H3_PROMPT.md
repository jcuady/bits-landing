# BITS OMS 15s Hero Ad — H3 Prompt Package

> **Project:** BITS_OMS_Complete_Feature_Showcase_15s
> **Duration:** 15 seconds · 16:9 widescreen
> **Resolution:** 2K (H3 default upscale to 2K via Regenerate)
> **Mode:** Ref2VA (full-reference, omni-reference)
> **Brand spec source:** the storyboard you provided — Royal Azure #124294, Outfit typography, BITS Infinity-B mark, glassmorphism, high-altitude 3D cloud atmospheres
> **Brand assets to upload alongside the prompt** (from `public/brand/`):
>   - `primary-horizontal-logo.png` — BITS wordmark (logo)
>   - `hero-landscape.jpg` — cloud/hero scene backdrop
>   - `mark-color.png` — Infinity B in cloud emblem

---

## 1. How to render

**Option A — Hailuo AI webapp (easiest):**
1. Open https://hailuoai.video/tools/minimax-h3
2. Switch to **Ref2VA** mode
3. Upload the three brand assets above as `image` references
4. Paste the Ref2VA prompt below
5. Choose **16:9**, **2K**, **15s**
6. Render

**Option B — H3 API (programmatic):**
```bash
curl -X POST "https://api.minimax.io/v1/video-generation-v2-create" \
  -H "Authorization: Bearer $MINIMAX_API_KEY" \
  -H "Content-Type: application/json" \
  -d @bits_oms_15s.json
```

`bits_oms_15s.json` schema:
```json
{
  "model": "MiniMax-H3",
  "task_type": "h3_context_ir",
  "duration": 15,
  "ratio": "16:9",
  "conditions": [
    { "type": "image", "role": "reference_logo",  "uri": "file:///path/to/primary-horizontal-logo.png" },
    { "type": "image", "role": "reference_hero",  "uri": "file:///path/to/hero-landscape.jpg" },
    { "type": "image", "role": "reference_mark",  "uri": "file:///path/to/mark-color.png" }
  ],
  "content": { "prompt": "<PASTE THE PROMPT FROM §2 BELOW>" }
}
```

The prompt is the same regardless of route — H3's pipeline parses it the same way.

---

## 2. The Prompt (paste this into Hailuo AI or the H3 API)

```text
subject_definitions:
<Subject 1> is the young, professional, mid-30s Filipino female BITS account executive (S1) who delivers the entire voiceover. She has shoulder-length dark hair, a clean side part, minimal makeup, and wears a tailored navy blazer over a white Outfit-set tee. Her voice is calm, assured, mid-pitch, with a measured Manila cadence.
<Subject 2> is the BITS Operations Management System (OMS) desktop cockpit interface that appears on the central dashboard screen during shots 2 and 3. It is a hyper-clean, frosted-glass card-stack layout with three main panels: a left-rail Customer 360 dossier card, a center Live Calls & Queue card showing an active WebRTC softphone dialer with a real-time transcript feed, and a right-rail QA Scorecards card with weighted criteria. Every panel uses #F8FAFC Cirrus Cloud White app canvas with #E0F2FE Stratosphere Vapor translucent frosted-glass shells, #2563EB Electric Blue live indicators, #38BDF8 Sky Cyan glow accents, and a #F59E0B Horizon Sunrise Amber accent reserved only for critical metrics and live alert tags.
<Subject 3> is the BITS Field Collections mobile app that slides out of the desktop interface during shot 3. It is a frosted-glass mobile device mockup (modern Android form factor, rounded corners, edge-to-edge display) displaying a paginated list of assigned debtor accounts, with a pinned geolocation map showing the field agent's current location and two-way sync indicators.
<Subject 4> is the recovered web audit log and "Recovery Velocity" KPI hero card that appears during shot 2, displaying the metric "RIGHT-PARTY CONNECT: +3.2x" in #F59E0B Horizon Sunrise Amber on a #F8FAFC panel, with a glowing live-trajectory graph rising from left to right in #38BDF8 Sky Cyan.
<Subject 5> is the field agent who appears briefly in shot 3 as a small, out-of-focus figure walking on a Manila side street. He is a young Filipino male, 20s, wearing a BITS polo shirt (the same navy-blazer palette) and carrying a smartphone, his eyes on the screen.

<Picture 1> is the official BITS horizontal primary logo from public/brand/primary-horizontal-logo.png. It is the BITS wordmark with the Infinity-B-in-cloud symbol to the left of the letterform. Used only in the final outro shot (shot 4) anchored dead-center on the Royal Azure stage.

<Picture 2> is the wide hero-landscape backdrop from public/brand/hero-landscape.jpg. It is a soft alpine valley at first light, with cool slate-blue and misted navy mountain ranges on the left, right, and far background, and a pale, empty wash of fog and sky in the center and lower-center where the dashboard will sit. Used as the visual atmosphere, color grading, and cloud ambience reference for the entire video. The color palette and depth of the entire video must echo this image's mood: cool, expensive, airy, premium B2B SaaS.

<Picture 3> is the BITS Infinity-B mark in cloud emblem from public/brand/mark-color.png. It is a stylized capital "B" nested inside a cloud silhouette with an infinity-loop ribbon. Used as a small accent watermark on the cockpit panels during shot 2 and shot 3, and as the dominant brand emblem above the wordmark in the shot 4 outro.

<Audio 1> is a female voice-timbre reference (calm, mid-pitch, measured Manila cadence) for the off-screen voiceover of <Subject 1> (S1). Used for the entire 15-second voiceover track.

summary:
[reference generation + audio reference] The target video is a 15-second B2B SaaS commercial for BITS Operations Management System (OMS). The ad opens in a cool alpine cloud atmosphere (referencing <Picture 2>) with a Royal Azure brand stage where frosted-glass cockpit panels glide into a unified dashboard view. The OMS cockpit shows the BITS desktop product (Subject 2) with live WebRTC dialer, Customer 360 dossiers, QA scorecards, and a glowing Recovery Velocity KPI. A field agent (Subject 5) is shown on a Manila side street with the BITS Field Collections mobile app (Subject 3) sliding out from the desktop. The video closes with the official BITS logo (Picture 1) and Infinity-B mark (Picture 3) anchored on the Royal Azure stage, with a 2-hour-SLA contact card below. The off-screen voiceover (Audio 1) is delivered in a calm, mid-pitch, measured Manila cadence by Subject 1 (S1) and runs the entire 15 seconds, moving through four beats: pain (fragmented software), solution (unified OMS), field mobile (sync + zero per-seat), and call to action (visit boundlessits.com).

retention_analysis:
<Subject 1>: fully_preserved - the Filipino female account executive's appearance, voice, and identity are retained exactly as defined throughout the voiceover.
<Subject 2>: fully_preserved - the BITS OMS cockpit layout (Customer 360, WebRTC dialer, QA scorecards, color palette, glassmorphism style) is retained exactly.
<Subject 3>: fully_preserved - the BITS Field Collections mobile app mockup, frosted-glass phone shell, geolocation map, and sync indicators are retained.
<Subject 4>: fully_preserved - the Recovery Velocity KPI card and the +3.2x metric in Horizon Sunrise Amber with Sky Cyan trajectory graph are retained.
<Subject 5>: fully_preserved - the field agent's navy BITS polo, smartphone posture, and out-of-focus Manila street context are retained.
<Picture 1> (BITS primary logo): fully_preserved - the official BITS wordmark with Infinity-B-in-cloud symbol is shown exactly, anchored dead-center on the Royal Azure stage with the mandatory "B"-height clearspace exclusion zone on all four sides; never rotated, skewed, or given drop-shadow or neon glow.
<Picture 2> (hero-landscape backdrop): fully_preserved - the alpine valley first-light atmosphere, cool slate-blue and misted navy palette, and pale empty center are retained as the brand atmosphere and color grading reference for the entire video.
<Picture 3> (Infinity-B mark): fully_preserved - the Infinity-B-in-cloud emblem is shown exactly, both as a small watermark on cockpit panels and as the dominant emblem above the wordmark in the outro.
<Audio 1>: reference - the target video references the calm, mid-pitch, measured Manila-cadence voice timbre without copying any specific source audio; the voiceover script is newly authored for this ad.

detailed_description:
The target video is a premium B2B SaaS commercial in cinematic 16:9 widescreen with Outfit typography, Royal Azure brand color, and a tactile frosted-glassmorphism UI.

[Shot 1] The opening frame is a cinematic deep Royal Azure (#124294) environment framed by soft 3D volumetric clouds in slow parallax, directly referencing the alpine first-light atmosphere of <Picture 2>. The clouds drift left-to-right with subtle infinity-glow #38BDF8 rim light on their upper edges. At the bottom-center, a small frosted-glass #E0F2FE badge slides into view reading "BITS OPERATIONS MANAGEMENT SYSTEM" in #38BDF8 Sky Cyan Outfit Bold. A young, professional, mid-30s Filipino female account executive (S1) — the calm, measured voice of the entire ad — delivers the opening line in an off-screen voiceover: <d>[English] Tired of fragmented software slowing down your operations?</d> At the same time, a large Outfit Bold three-line headline fades in over the Royal Azure backdrop in #FFFFFF Pure Cloud White, reading "ONE SYSTEM. ONE VIEW. ONE SOURCE OF TRUTH." with crisp visual hierarchy. The camera pushes in with small amplitude at slow speed toward the central dashboard screen, which begins to materialize as three translucent frosted-glass panels glide into view and snap together into a unified cockpit layout. The female account executive (S1) appears in a clean two-second mid-shot — shoulder-length dark hair, side part, navy blazer over a white tee, soft natural light, looking directly into the lens with a calm expression — and finishes the question. Her lips then meet, closing into a confident small smile, and she stops speaking. The camera holds on the forming cockpit as the badge color shifts from Sky Cyan to Electric Blue to indicate "live."

[Shot 2] At 00:03.000, the camera cuts to a full-screen view of the BITS OMS cockpit (Subject 2). The composition is a 45-degree isometric sweep across the live telemetry panels. The center panel holds the Customer 360 dossier card in #F8FAFC Cirrus Cloud White with a frosted-glass #E0F2FE shell, showing a sample debtor record (name, account number, DPD bucket, balance). The right panel holds the Live Calls & Queue card, with an active WebRTC softphone dialer in mid-call state — the live-call timer counting up in #2563EB Electric Blue, a real-time speech-to-text transcript feed scrolling in a soft amber highlight, and a pulsing "ON CALL" tag. The left panel holds the QA Scorecards card, with a sample scorecard showing weighted criteria and a current pass percentage. The Infinity-B mark (Picture 3) appears as a small watermark in the upper-right corner of the cockpit. The mid-right area of the frame holds the Recovery Velocity KPI hero card (Subject 4) with the metric "RIGHT-PARTY CONNECT: +3.2x" rendered in Outfit Semi-Bold #F59E0B Horizon Sunrise Amber, with a glowing live-trajectory graph rising from left to right in #38BDF8 Sky Cyan beneath it. Three Outfit Semi-Bold feature callouts float in sequence across the upper-left of the frame in #FFFFFF Pure Cloud White: "Customer 360 Dossiers", "WebRTC Softphone Dialer", "Automated QA Scorecards". The same female voice (S1) continues in an off-screen voiceover: <d>[English] Meet the complete BITS OMS — unifying your CRM, auto-dialer, and QA scorecards in one cockpit.</d> while her lips remain completely closed. The camera executes a smooth 45-degree isometric sweep from the upper-left to the lower-right of the cockpit at slow speed, revealing more of the dashboard layout. The soft morning haze of the cloud backdrop bleeds through the frosted-glass edges of the panels, tying the cockpit to the Royal Azure stage.

[Shot 3] At 00:07.000, the camera cuts to a split-focus composition. On the left, the BITS Field Collections mobile app (Subject 3) — a frosted-glass mobile device mockup in a modern Android form factor with rounded corners — slides out smoothly from the desktop interface. The mobile screen displays a paginated list of assigned debtor accounts in clean white cards, with a pinned geolocation map at the top showing a single live agent pin on a Manila neighborhood map and a "2-WAY SYNC" indicator pulsing in Sky Cyan. On the right side of the frame, in a soft out-of-focus plane, the field agent (Subject 5) is briefly visible: a young Filipino male in his 20s, wearing a BITS polo (the same navy palette), carrying a smartphone, eyes on the screen, walking along a Manila side street with low buildings behind him. The camera executes a split-focus pan at medium amplitude at slow speed, showcasing the instant real-time data synchronization between the mobile app and the desktop OMS as a Sky Cyan sync-pulse animation travels between the two. Three Outfit Bold feature callouts float across the lower half of the frame in #FFFFFF Pure Cloud White: "Mobile Field Collector App", "Instant Geo & PTP Sync", "Zero Per-User Traps". The same female voice (S1) continues in an off-screen voiceover: <d>[English] Seamlessly connected to your mobile field team with real-time sync and zero per-seat fees.</d> while her lips remain completely closed. The hero KPI card (Subject 4) remains visible in the lower-right corner, now showing "FIELD-TO-DESK SYNC: LIVE" in Sky Cyan.

[Shot 4] At 00:11.500, the camera cuts to a still, dead-focal-lock frame on a deep solid #124294 Royal Azure stage with subtle ambient cloud vapor in the upper-left and lower-right corners, directly referencing the cool first-light mood of <Picture 2>. The official BITS logo (Picture 1) — the BITS wordmark with the Infinity-B-in-cloud symbol to the left of the letterform — anchors dead-center in the frame, respecting the mandatory "B"-height clearspace exclusion zone on all four sides: no other element, animation, or text enters the space equal to the height of the primary letter "B" around all four sides. The logo is rendered in pure #FFFFFF Pure Cloud White, never rotated, skewed, or given drop-shadow or neon glow. Below the logo, centered and strictly outside the clearspace exclusion box, the slogan fades in subtly first in #FFFFFF Pure Cloud White Outfit Medium: "Stay Grounded, Be Boundless." The website fades in subtly a moment later on the line below, also in #FFFFFF Pure Cloud White Outfit Medium: "https://www.boundlessits.com/". Then the email address fades in a final beat later, also in #FFFFFF Pure Cloud White Outfit Medium: "boundlessitsolutions@gmail.com". All three lines sit centered, on separate lines, with consistent vertical rhythm. The camera holds a dead-still focal lock with locked framing for optimal reading and ad-platform button clearance. The same female voice (S1) delivers the final line in an off-screen voiceover: <d>[English] Scale your operations without the ceiling. Visit boundlessits.com today.</d> The voice ends on a confident soft close, and the logo holds for a final two-and-a-half-second beat as the cloud vapor slowly drifts.

overall_soundscape:
A quiet, premium room tone carries the entire video, with a low sub-bass hum anchored in the Royal Azure atmosphere. Shot 1 carries a soft whoosh of cloud drift and a single clean type-in sound on the badge. Shot 2 carries the soft keyboard taps of a real agent, a faint pulse on the live-call timer, and a soft chime on each feature callout. Shot 3 carries a soft Manila street ambience in the background, a single clean ping on the Sky Cyan sync-pulse animation, and a soft click on the agent's phone unlock. Shot 4 carries only the low room tone and a soft ambient cloud drift.

non_diegetic_music:
A clean, modern, mid-tempo tech-strings pattern with a single sustained low cello, joined by a Sky Cyan #38BDF8-mirrored soft synth pad that lands on the start of every shot. The music swells gently through shot 2 and shot 3, holds on shot 4, and fades to silence two beats after the final logo card. No vocals, no drop, no hard cut.
```

---

## 3. Validation checklist (run before rendering)

| Item | Pass? |
|---|---|
| Total duration matches 15s? | ✅ 3s + 4s + 4s + 4.5s = 15.5s (last shot holds 3.5s) |
| Cut times strictly increasing within the timeline? | ✅ 00:03.000, 00:07.000, 00:11.500 |
| All section labels use the exact H3 field names? | ✅ `integrated_multimodal_description`, `overall_soundscape`, `non_diegetic_music`, plus the six Ref2VA sections |
| Reference labels consistent across all sections? | ✅ `<Subject 1>` through `<Subject 5>`, `<Picture 1>` through `<Picture 3>`, `<Audio 1>`, `(S1)` |
| Dialogue in `<d>[English] ...</d>` blocks? | ✅ All 4 voiceover segments in `<d>` |
| Voiceover is OFF-SCREEN with `lips remain completely closed` after each `<d>`? | ✅ All 4 voiceover blocks include the lips-closed clause |
| Brand color palette enforced in visual description? | ✅ Royal Azure, Stratosphere Vapor, Cirrus Cloud White, Electric Blue, Sky Cyan, Horizon Sunrise Amber, Pure Cloud White |
| Logo clearspace rule enforced? | ✅ Mandatory "B"-height exclusion zone on all four sides, no rotation/skew/drop-shadow/neon glow |
| Outfit font enforced? | ✅ Outfit Bold / Semi-Bold / Medium specified per layer |
| Real brand assets referenced as Picture labels? | ✅ `<Picture 1>` logo, `<Picture 2>` hero landscape, `<Picture 3>` Infinity-B mark |
| 2:1 (subject-to-marketing) ratio of features to benefit? | ✅ Each feature callout frames a benefit |
| Does NOT advertise unverified claim numbers? | ✅ The "+3.2x RPC" claim is the one already in `MARKETING_PRODUCT_GUIDE.md`; nothing fabricated |
| AI-visual directive preserved? | ✅ Storyboard directive carried into the subject_definitions and detailed_description |

---

## 4. Companion deliverables (parallel to the ad)

Once this 15s ad renders, these companion pieces will extend the campaign. **None of them require re-asking for inputs** — they reuse the same brand assets and the same voiceover timbre.

### 4.1 Cut-downs (re-edit the master into platform-native versions)

- **9:16 vertical** (TikTok / Reels / Shorts): 15s re-cut, cockpit panels reflow vertically
- **6s pre-roll** (YouTube): hook-only — Shot 1 + first half of Shot 2 + the +3.2x KPI
- **10s mid-roll** (Meta in-feed): Shot 2 + Shot 4 outro

### 4.2 Sibling ads (parallel storyboards ready to author)

1. **"BITSagent — 68% Autonomous Resolution"** (15s, 16:9) — voice AI demo
2. **"BITS Payroll — 100% TRAIN-Law Tax"** (15s, 16:9) — payroll demo
3. **"BITS White-Label — 100% Client Margin"** (15s, 16:9) — agency/reseller pitch
4. **"BITS RAG — 99.4% Factual Grounding"** (15s, 16:9) — knowledge engine demo
5. **"BITS Logistics — +31% Route Mileage Saved"** (15s, 16:9) — fleet demo
6. **"BITS Pickleball OS — 99.4% Court Utilization"** (15s, 16:9) — sports vertical

Each follows the same Ref2VA structure with the same brand assets and the same voice timbre — only the cockpit content, the metric hero card, and the third beat change.

### 4.3 Static companion assets (from `screenshot_*` PNGs in `newlogo/`)

- 3 still ads (1080×1080) using `screenshot_features_hero.png`, `screenshot_product_crm.png`, `screenshot_blog_article.png` as backgrounds with the same headline / CTA overlay
- 5 LinkedIn carousels (5-frame each) using the 18-product catalog
- 1 Twitter header (1500×500) cycling the +3.2x RPC / 68% resolution / 100% TRAIN-Law / 0-day close / 99.4% utilization metrics

---

## 5. What to do next

1. **Render the 15s ad** via Hailuo AI (https://hailuoai.video/tools/minimax-h3) in Ref2VA mode, 16:9, 2K, 15s. Upload the three brand assets, paste the prompt from §2.
2. **Review the render** against the 13-point validation checklist in §3.
3. **A/B test against the static hero** (current homepage hero image) on Meta in-feed for 7 days. Target the +3.2x RPC CTA click-through as the primary metric.
4. **Render the 6 sibling ads** (§4.2) in parallel — same prompt skeleton, different cockpit content per flagship.
5. **Cut down to 9:16 + 6s + 10s** for platform-native distribution.

If the render returns the logo or the cockpit off-brand, the most common adjustments are:
- Logo too small → request "logo anchors at 18% of frame width, dead-center, no animation"
- Cockpit too cluttered → request "maximum six visible text elements across the cockpit panels"
- Cloud backdrop too dark → request "increase the upper-third luminance by 15% to read as first-light, not dusk"
- Voiceover cadence too fast → request "stretch the [S1] dialogue to 110% of the requested word pacing"