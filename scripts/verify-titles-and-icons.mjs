async function test() {
  console.log("=== Verifying Live Rendered Page Titles & Icon Headers ===");

  const urls = [
    { name: "Homepage", url: "http://localhost:3847/" },
    { name: "BITSagent Page", url: "http://localhost:3847/bitsagent" },
    { name: "BITScrm Page", url: "http://localhost:3847/bitscrm" },
    { name: "Products CRM Suite", url: "http://localhost:3847/products/crm" },
    { name: "Enterprise Demo", url: "http://localhost:3847/demo" },
    { name: "Compliance & Legal", url: "http://localhost:3847/legal" },
  ];

  for (const item of urls) {
    try {
      const res = await fetch(item.url);
      const html = await res.text();
      const titleMatch = html.match(/<title>(.*?)<\/title>/);
      const title = titleMatch ? titleMatch[1] : "NOT FOUND";
      console.log(`✓ [${item.name}] (${item.url})\n   Title (${title.length} chars): "${title}"\n`);
    } catch (err) {
      console.error(`✗ Failed to fetch ${item.url}:`, err.message);
    }
  }

  console.log("--- Head Icon & Favicon Tags on Homepage ---");
  const homeRes = await fetch("http://localhost:3847/");
  const homeHtml = await homeRes.text();
  const iconMatches = [...homeHtml.matchAll(/<link[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/gi)];
  for (const m of iconMatches) {
    console.log("  ", m[0]);
  }

  const themeMatch = homeHtml.match(/<meta[^>]*name=["']theme-color["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  console.log("\n--- Theme Color Meta ---");
  console.log("  ", themeMatch ? themeMatch[0] : "None");

  const gscMatch = homeHtml.match(/<meta[^>]*name=["']google-site-verification["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  console.log("\n--- Google Site Verification Meta ---");
  console.log("  ", gscMatch ? gscMatch[0] : "None");

  // Verify asset files are reachable over HTTP
  console.log("\n--- HTTP Asset Reachability Check ---");
  const assetsToCheck = [
    "/favicon.ico",
    "/favicon.png",
    "/icon.png",
    "/icon-48.png",
    "/icon-192.png",
    "/icon-512.png",
    "/apple-icon.png",
    "/brand/logo-google.png",
    "/brand/logo-horizontal.png",
    "/brand/logo-white.png",
    "/brand/mark.png",
    "/brand/mark-tile.png",
  ];

  for (const asset of assetsToCheck) {
    const assetRes = await fetch(`http://localhost:3847${asset}`);
    const ct = assetRes.headers.get("content-type");
    const len = assetRes.headers.get("content-length") || "unknown";
    const status = assetRes.status;
    console.log(`  ${status === 200 ? "✓" : "✗"} ${asset} -> HTTP ${status} (${ct}, ${len} bytes)`);
  }
}

test();
