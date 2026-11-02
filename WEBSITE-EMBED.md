# Adding AiRA to www.boundlessits.com (for the website developer)

One script tag, no library, no build step. Put it once in the site-wide layout, just before `</body>`
(in a Next.js app: `app/layout.tsx` with `next/script`, or `pages/_app.tsx`; in plain HTML: every page's footer).

```html
<script src="https://aira.boundlessits.com/widget.js" defer></script>
```

Next.js (App Router), inside `<body>` of `app/layout.tsx`:

```tsx
import Script from "next/script";
<Script src="https://aira.boundlessits.com/widget.js" strategy="afterInteractive" />
```

It adds: a chat bubble (bottom right) with a call button, a top bar with "Call +63 956 845 7404",
and a footer strip with the same number. Phone link: `tel:+639568457404`.

Optional switches on the script tag: `data-topbar="0"` hides the top bar, `data-footer="0"` hides the footer strip.
If the site already has its own header/footer number, use both switches and keep only the bubble.

Checks
- Deploy, open https://www.boundlessits.com, hard refresh (Ctrl+Shift+R): bubble appears; "What does BITS do?" gets an answer.
- If nothing appears and the browser console shows a CSP error, allow `https://aira.boundlessits.com` in
  `script-src` and `connect-src` (check `next.config.js` / `vercel.json` headers).
- The chat only accepts pages from https://www.boundlessits.com, https://boundlessits.com and https://aira.boundlessits.com.
  A preview URL (for example *.vercel.app) will load the bubble but chat messages will be refused; test on the real domain.

To remove: delete the script tag. Nothing else on the site is touched. Questions: AiRA chat service runs on the BITS local server.
