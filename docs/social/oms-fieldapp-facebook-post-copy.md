# Facebook Post — Operations 360 Field App

**Asset:** `oms-fieldapp-fb-4x5-uhd.jpg` (2160×2700) · `oms-fieldapp-fb-4x5.jpg` (1080×1350)
**Format:** 4:5 portrait, single image
**Theme:** Run your field team from one mobile app

**On-graphic contact details:** `bits_inquiries@boundlessits.com` · `boundlessits.com`
These are the only contact details that exist in the codebase (`lib/site.ts` → `site.inquiryEmail`, `site.url`). No phone number or street address is published anywhere in the repo, so none was invented for the graphic. Add one if a real line becomes available.

---

## Primary caption

Your technicians are already carrying the answers to your operations questions.
They just do not have anywhere to put them.

The Operations 360 Field App turns every visit into a record your office can use. The technician opens the app, confirms the account, logs the visit with the location and time attached, adds photos if the job needs them, and sets the promise to pay before leaving the site.

Back at the office, the account is already updated. No re-keying. No calling the field to ask what happened. No notes sitting in a truck at night.

GPS tagged. Photo proof. Works offline when the signal does not.

Field service runs on the same account as your back office and your call floor. That is the whole point.

**Book a consultation and we will walk you through the field app on your own workflow.**

Questions: bits_inquiries@boundlessits.com

---

## Short caption

Your technician logs the visit from the phone. Location, time, photos, promise to pay. The office sees it the moment it happens.

That is Operations 360.

GPS tagged. Photo proof. Works offline.

**Book a consultation** — bits_inquiries@boundlessits.com

---

## Alt text

Facebook post for Operations 360. Deep blue gradient sky background with white clouds. BITS logo at the top left and a white "Book a Consultation" button at the top right. Large white headline reads "Run Your Field Team From One Mobile App" with a supporting line about logging visits in the field and keeping the office and call floor on the same account. Three pill labels read GPS tagged, Photo proof, and Works offline. A tilted smartphone mockup rises from the bottom right showing a dark navy Operations 360 app screen with the BITS logo in the app bar, a glowing cyan map pin, and a row of photo thumbnails. A white card overlaps the phone reading "Visit logged - Back office updated" with three checkmarked lines. A dark contact bar at the bottom left shows bits_inquiries@boundlessits.com and boundlessits.com.

---

## First comment

Ask about the field app: location tagging, photo evidence, offline capture, and disposition logging at the point of service. We will map it to how your team actually works.

---

## Posting notes

- The graphic already carries the email and website, so the post body does not need a link. Facebook downranks posts with outbound links. If you want the click, put the URL in the first comment anyway.
- Suggested CTA button: **Book Now** or **Learn More**
- Recommended publish window: Tuesday to Thursday, 9:00 to 11:00 AM local.
- Reply to the first ten comments within the first hour. Comment velocity extends reach.

---

## Claim check

| Claim | Status |
|---|---|
| GPS tagged visits | Supported, field app feature |
| Photo proof / optional photos | Supported, field app feature |
| Works offline | Supported, field app capability |
| Promise to pay set on the spot (PTP) | Supported, field app feature |
| Back office sees the same account | Supported — same Supabase table read by both surfaces; **not** "server-side account scoping" (no tenancy exists) |
| `bits_inquiries@boundlessits.com` | Real, `lib/site.ts` → `site.inquiryEmail` |
| `boundlessits.com` | Real, `lib/site.ts` → `site.url` |
| "That is the whole point" | Positioning line, not a metric |

No customer results, percentages, or time-saved figures are used. The visit card is illustrative UI text, not a reported outcome.

---

## Production notes

- Device render: MiniMax image model, 9:16 at 2K, prompted with an explicit ban on lettering, wordmarks and logo marks. The model produced a clean empty app-bar slot.
- The studio-white backdrop is removed in-page with a border-seeded flood fill, so interior white UI survives.
- The BITS lockup inside the phone is the real `public/brand/logo-reverse.png`, placed at 33.56% / 27.12% of the device box and rotated −10.5° to match the screen's perspective. The AI never draws the logo.
- Layout is on a single grid: `--m: 76px` governs the logo, visit card and contact bar; logo and CTA share one optical centreline at y = 88; headline, subhead and chips share one optical centre at x = 540.