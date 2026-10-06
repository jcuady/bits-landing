import { chromium } from "playwright";

async function check() {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3847/");
  const info = await page.evaluate(() => {
    const nav = document.querySelector('nav[aria-label="Operations 360 Features"]');
    if (!nav) return { error: "nav not found" };
    const p1 = nav.parentElement; // top frosted console
    const p2 = p1 ? p1.parentElement : null; // stickyDeckRef?
    const p3 = p2 ? p2.parentElement : null; // scrollContainerRef?
    
    const hierarchy = [];
    let cur = nav;
    while (cur && cur !== document.body) {
      const s = window.getComputedStyle(cur);
      hierarchy.push({
        tag: cur.tagName,
        id: cur.id,
        className: cur.className.substring(0, 50),
        position: s.position,
        top: s.top,
        overflow: s.overflow,
        transform: s.transform,
      });
      cur = cur.parentElement;
    }

    return { hierarchy };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
}

check();
