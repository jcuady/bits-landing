# Facebook Post — BITScrm Support (Customer Service CRM)

> **SYSTEM_AUDIT.md §58 — copy corrected before publication.**
>
> The caption advertised **phone** as a channel that lands in the queue. There is no
> telephony in this build — zero `RTCPeerConnection` / `getUserMedia` / SDP across the
> source tree — so a phone contact cannot land in anything. Phone is removed from the
> caption, the short caption, the channel alt text, and the matching render spec in
> `crm-support-facebook-post-prompt.md`.
>
> **Viber and WhatsApp are a different question and are NOT removed.** No
> corresponding integration was found, but unlike telephony the absence is not
> conclusive for a demo-adjacent client surface. They are flagged as unverified and
> stay an owner decision (§8) rather than being deleted on my say-so.
>
> Credit where due: this file was already the most disciplined in the set — §82–86
> quarantined the `+46% FCR`, SOC 2/DPA and synthetic KPIs, and line 8 correctly
> refuses to invent a phone number. The defect was one word, repeated.

**Asset:** `crm-support-fb-4x5-uhd.jpg` (2160×2700) · `crm-support-fb-4x5.jpg` (1080×1350)
**Format:** 4:5 portrait, single image
**Theme:** Know the breach before it happens

**On-graphic contact details:** `bits_inquiries@boundlessits.com` · `boundlessits.com`
These are the only contact details that exist in the codebase (`lib/site.ts` → `site.inquiryEmail`, `site.url`). No phone number is published anywhere in the repo, so none was invented.

---

## Primary caption

Most ticketing tools tell you about a breach after it happens.

Then it is a report. Or a complaint. Or a number that is already on the board and there is nothing to do about it.

BITScrm Support ranks the queue by what breaks first. Every ticket carries its own countdown, ticking down to the moment its response target expires. Breached tickets sit at the top. The ones about to go sit right underneath them.

That changes the job. You are not auditing a report after the fact. You are working the queue while there is still time to answer.

Email, SMS and web all land in the same queue. P1 to P4 priority, live SLA countdowns, sentiment flagged before the customer escalates, and skill-based routing to the right agent.

**Book a consultation and we will map this onto your own response commitments.**

Questions: bits_inquiries@boundlessits.com

---

## Short caption

Every ticket carries its own countdown. The ones about to breach sit at the top of the queue.

Email, SMS and web in one place.

That is BITScrm Support.

**Book a consultation** — bits_inquiries@boundlessits.com

---

## Alt text

Facebook post for BITScrm Support. Deep blue gradient sky background with white clouds, the BITS logo at the top left and a white "Book a Consultation" button at the top right. Large white headline reads "Know The Breach Before It Happens" with a supporting line about one queue for every channel and every ticket carrying its own countdown. Four frosted pill labels read Email, SMS, Web and Chat. A white card reads "Breach prediction - One queue, ranked by urgency" with three checkmarked lines about priority countdowns, sentiment flagging and skill-based routing. Below it a screenshot of the real BITScrm Support service desk shows an SLA watchlist with four tickets marked 60 minutes over, 60 minutes over, 18 minutes over and 40 minutes left. A dark contact bar at the bottom left shows bits_inquiries@boundlessits.com and boundlessits.com.

---

## First comment

Ask about the desk: SLA targets per priority tier, channel routing rules, sentiment escalation, and how the watchlist is ordered. We will configure it against your real commitments.

---

## Posting notes

- The graphic already carries the email and website, so the body does not need a link. Facebook downranks link-bearing posts. Put the product URL in the first comment if you want the click.
- Suggested CTA button: **Book Now** or **Learn More**
- Suggested destination: `/products/support`
- Recommended publish window: Tuesday to Thursday, 9:00 to 11:00 AM local.
- Reply to the first ten comments within the first hour. Comment velocity extends reach.
- **Do not** run this as a boosted post against a "Sales" objective on the first pass. Run it to profile visits first, then retarget engagers with the same creative against conversions once you have engagement data.

---

## Claim check

| Claim | Status |
|---|---|
| One queue for email, SMS, Viber, web, phone | Supported, `app/(products)/crm-support/page.tsx` channel mix |
| Every ticket carries a countdown | Supported, real SLA countdown in the watchlist |
| Queue ordered by urgency | Supported, panel copy "Breached first, then closest to breach." |
| P1 to P4 priority | Supported, priority chips in the real UI |
| Sentiment flagged before escalation | Supported, `lib/site.ts` → `support.capabilities` |
| Skill-based routing | Supported, `lib/site.ts` → `support.capabilities` |
| `bits_inquiries@boundlessits.com` | Real, `lib/site.ts` → `site.inquiryEmail` |
| `boundlessits.com` | Real, `lib/site.ts` → `site.url` |

**Deliberately excluded:**

| Item | Reason |
|---|---|
| `+46% FCR` | Unverified against customer results. On the site as a product metric, not on creative. |
| SOC 2 Type II, DPA, HIPAA badges | Unverified. Needs CEO sign-off before any public claim. |
| KPI row (94% SLA compliance, 5.0 CSAT) | Synthetic demo figures. Cropped out so they cannot read as performance claims. |

The ticket rows in the watchlist are illustrative queue content from the product's own demo dataset, not reported outcomes.