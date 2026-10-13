# Facebook Post — Operations 360 · Field Operations

> **SYSTEM_AUDIT.md §58 — copy corrected before publication.**
>
> This file asserted six capabilities that do not exist in this build: a predictive
> and progressive dialer, a browser softphone, QA scorecards with **playback**,
> supervisor **listen and barge**, **role-based access**, and a **full audit log on
> every action**. There is no telephony (zero `RTCPeerConnection` / `getUserMedia` /
> SDP), no audio pipeline, and no audit table. RBAC is the sharpest one: §50 and §51
> both recorded that `requireCrmUser()` **authenticates and never authorizes** — there
> is no role matrix anywhere in the codebase.
>
> Rewritten below to what ships in `app/(crm)`. The GPS field app is **retained** —
> it is an out-of-repo product line this repository cannot adjudicate (§8).

**Asset:** `oms-field-fb-4x5-uhd.jpg` (2160 × 2700, 4:5) · fallback `oms-field-fb-4x5.jpg` (1080 × 1350)
**Branding:** `public/images/hero-sky-bg.jpg` cloud plate, hero azure gradient (#1362df → #2377f3 → #3c8bf6 → #5ea2f9), hero sunbreak bloom + sapphire vignette, glass card (white/18 fill, white/36 border, backdrop-blur), hero CTA pattern (white pill, electric-blue arrow), reverse BITS logo.
**No AI-generated imagery** — mockup removed, so the graphic is your real brand assets plus real type.

---

## Graphic copy

- Eyebrow: Operations 360 · Field Operations
- Headline: Your Field Team. / Your Back Office. / One System.
- Sub: One platform for field visits, account history, and quality checks.
- CTA: Book a Consultation
- What is included: Field app with GPS and photos · Same account history everywhere · Automated promise-to-pay tracking and broken-PPT reallocation · QA scorecards, coaching logs and action plans · Server-side session checks and database row-level security

---

## Primary caption

Your field team and your back office now work in one system.

Operations 360 covers both sides of the job:

The field team gets a mobile app with GPS-tagged visits, photos, and promise-to-pay updates. Same account history the office team sees.

The back office gets delinquency-day tracking, dynamic work queues, disposition codes with required note fields, payment receipt recording, and QA scorecards with coaching logs.

Everything lands on the same account. Access is gated by a server-side session check on every request, with database row-level security underneath.

Philippines-based. Cloud or on-premises.

www.boundlessits.com

#FieldOperations #Operations360 #Collections #BPO #CallCenterSoftware #CRM #Philippines

---

## Short caption

Field visits and account history in one system.

Operations 360 gives your field team a mobile app with GPS-tagged visits and photos, and your back office PTP automation, QA scoring, and real-time dashboards — all on the same account record.

Philippines-based. Cloud or on-premises.

www.boundlessits.com

---

## Notes

- No performance percentages. Every capability listed above is one that ships in this
  repository — see SYSTEM_AUDIT.md §58. Do not reinstate dialer, softphone, playback,
  listen/barge, role-based access, or audit-log lines without building them first.
- Plain language throughout, matching the BITS brand direction of straightforward words.
- Pin: `https://www.boundlessits.com/products/collections`
- Post 9–11am or 7–9pm Philippine time.