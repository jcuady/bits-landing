import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const newlogoDir = path.join(rootDir, "newlogo");
const brandDir = path.join(rootDir, "public", "brand");

async function main() {
  console.log("==> Building Full Production Revamp Brand Assets...");

  // Read Source Files
  const src2Buf = await fs.readFile(path.join(newlogoDir, "2.png"));
  const src3Buf = await fs.readFile(path.join(newlogoDir, "3.png"));
  const src4Buf = await fs.readFile(path.join(newlogoDir, "4.png"));

  const trimmed2 = await sharp(src2Buf).trim().toBuffer();
  const trimmed3 = await sharp(src3Buf).trim().toBuffer();
  const trimmed4 = await sharp(src4Buf).trim().toBuffer();

  const meta2 = await sharp(trimmed2).metadata();
  const meta3 = await sharp(trimmed3).metadata();
  const meta4 = await sharp(trimmed4).metadata();

  console.log(`Source 2.png (Mark): ${meta2.width}x${meta2.height}`);
  console.log(`Source 3.png (Horizontal): ${meta3.width}x${meta3.height}`);
  console.log(`Source 4.png (Stacked): ${meta4.width}x${meta4.height}`);

  // 1. REVERSE LOGO (for Dark Surfaces: Footer, dark client headers, modals, etc.)
  // Pure white wordmark + 3D chrome/silver cloud mark
  const reverseLogo = await sharp(trimmed3)
    .resize({ width: 1400, withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  const reverseMeta = await sharp(reverseLogo).metadata();
  console.log(`Reverse Logo: ${reverseMeta.width}x${reverseMeta.height}`);
  await fs.writeFile(path.join(brandDir, "logo-reverse.png"), reverseLogo);
  await fs.writeFile(path.join(brandDir, "logo-white.png"), reverseLogo);

  // 2. HORIZONTAL & NAVY LOGO (for Light Surfaces: Main Header, Auth, Settings, etc.)
  // WCAG AAA Compliance:
  // - Wordmark ("BITS" & "Boundless IT Solutions"): Deep sovereign navy (#090E1D) -> Contrast > 18.7:1 on #ffffff
  // - Cloud-Infinity Mark: Signature sapphire brand gradient with luminous specular highlights
  const { data: raw3, info: raw3Info } = await sharp(trimmed3).raw().toBuffer({ resolveWithObject: true });
  const w3 = raw3Info.width;
  const h3 = raw3Info.height;
  const horizBuf = Buffer.alloc(raw3.length);

  for (let y = 0; y < h3; y++) {
    for (let x = 0; x < w3; x++) {
      const idx = (y * w3 + x) * 4;
      const a = raw3[idx + 3];
      if (a === 0) continue;

      if (x >= 850) {
        // Deep sovereign navy (#090E1D) for typography
        horizBuf[idx] = 9;
        horizBuf[idx + 1] = 14;
        horizBuf[idx + 2] = 29;
        horizBuf[idx + 3] = a;
      } else {
        // Sculpted sapphire cloud mark with specular sheen
        const lum = (raw3[idx] * 0.299 + raw3[idx + 1] * 0.587 + raw3[idx + 2] * 0.114) / 255;
        let r, g, b;
        if (lum < 0.72) {
          const t = lum / 0.72;
          r = Math.round(10 + t * 27);   // 10 -> 37
          g = Math.round(20 + t * 79);   // 20 -> 99
          b = Math.round(55 + t * 180);  // 55 -> 235 (#2563EB)
        } else {
          const t = (lum - 0.72) / 0.28;
          r = Math.round(37 + t * 135);  // 37 -> 172
          g = Math.round(99 + t * 110);  // 99 -> 209
          b = Math.round(235 + t * 20);  // 235 -> 255 (#ACD1FF)
        }
        horizBuf[idx] = r;
        horizBuf[idx + 1] = g;
        horizBuf[idx + 2] = b;
        horizBuf[idx + 3] = a;
      }
    }
  }

  const horizLogo = await sharp(horizBuf, { raw: { width: w3, height: h3, channels: 4 } })
    .resize({ width: 1400, withoutEnlargement: true })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  const horizMeta = await sharp(horizLogo).metadata();
  console.log(`Horizontal Logo: ${horizMeta.width}x${horizMeta.height}`);
  await fs.writeFile(path.join(brandDir, "logo-horizontal.png"), horizLogo);
  await fs.writeFile(path.join(brandDir, "logo-navy.png"), horizLogo);

  // 3. STANDALONE 3D CLOUD-INFINITY MARK (mark.png)
  const markStandalone = await sharp(trimmed2)
    .resize({ width: 512, height: 512, fit: "inside" })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();
  await fs.writeFile(path.join(brandDir, "mark.png"), markStandalone);

  // 4. APP ICON / TILE (mark-tile.png, public/icon.png, public/apple-icon.png)
  // Premium dark squircle container with radial glow & subtle dual border
  const tileSize = 512;
  const tileRadius = 114;
  const svgTileBg = `
    <svg width="${tileSize}" height="${tileSize}" viewBox="0 0 ${tileSize} ${tileSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ambientGlow" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stop-color="#1D4ED8" stop-opacity="0.38" />
          <stop offset="55%" stop-color="#0F172A" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#030712" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="tileBase" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0F1D42" />
          <stop offset="48%" stop-color="#080E24" />
          <stop offset="100%" stop-color="#020510" />
        </linearGradient>
        <linearGradient id="tileBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.48" />
          <stop offset="50%" stop-color="#2563EB" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#1E293B" stop-opacity="0.65" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="${tileSize - 4}" height="${tileSize - 4}" rx="${tileRadius}" ry="${tileRadius}" fill="url(#tileBase)" stroke="url(#tileBorder)" stroke-width="3" />
      <rect x="2" y="2" width="${tileSize - 4}" height="${tileSize - 4}" rx="${tileRadius}" ry="${tileRadius}" fill="url(#ambientGlow)" />
    </svg>
  `;

  const tileBg = await sharp(Buffer.from(svgTileBg)).png().toBuffer();
  const markForTile = await sharp(trimmed2)
    .resize({ width: 336, height: 336, fit: "inside" })
    .toBuffer();
  const markMeta = await sharp(markForTile).metadata();
  const tileLeft = Math.round((tileSize - markMeta.width) / 2);
  const tileTop = Math.round((tileSize - markMeta.height) / 2);

  const finalTile = await sharp(tileBg)
    .composite([{ input: markForTile, left: tileLeft, top: tileTop }])
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  await fs.writeFile(path.join(brandDir, "mark-tile.png"), finalTile);
  await fs.writeFile(path.join(rootDir, "public", "icon.png"), finalTile);
  await fs.writeFile(path.join(rootDir, "public", "apple-icon.png"), finalTile);

  // Favicon 32x32 & 48x48
  const fav32 = await sharp(finalTile).resize(32, 32).png().toBuffer();
  await fs.writeFile(path.join(rootDir, "public", "favicon.png"), fav32);

  // 5. STACKED LOGOS (from 4.png)
  // Reverse (dark surfaces)
  const stackedReverse = await sharp(trimmed4)
    .resize({ width: 800, withoutEnlargement: true })
    .png({ quality: 100 })
    .toBuffer();
  await fs.writeFile(path.join(brandDir, "logo-stacked-reverse.png"), stackedReverse);

  // Stacked for light surfaces
  const { data: raw4, info: raw4Info } = await sharp(trimmed4).raw().toBuffer({ resolveWithObject: true });
  const w4 = raw4Info.width;
  const h4 = raw4Info.height;
  const stackedBuf = Buffer.alloc(raw4.length);

  for (let y = 0; y < h4; y++) {
    for (let x = 0; x < w4; x++) {
      const idx = (y * w4 + x) * 4;
      const a = raw4[idx + 3];
      if (a === 0) continue;

      if (y >= 785) {
        // Typography in stacked logo below y=785: Deep sovereign navy
        stackedBuf[idx] = 9;
        stackedBuf[idx + 1] = 14;
        stackedBuf[idx + 2] = 29;
        stackedBuf[idx + 3] = a;
      } else {
        // Cloud mark in stacked logo: Sapphire brand sheen
        const lum = (raw4[idx] * 0.299 + raw4[idx + 1] * 0.587 + raw4[idx + 2] * 0.114) / 255;
        let r, g, b;
        if (lum < 0.72) {
          const t = lum / 0.72;
          r = Math.round(10 + t * 27);
          g = Math.round(20 + t * 79);
          b = Math.round(55 + t * 180);
        } else {
          const t = (lum - 0.72) / 0.28;
          r = Math.round(37 + t * 135);
          g = Math.round(99 + t * 110);
          b = Math.round(235 + t * 20);
        }
        stackedBuf[idx] = r;
        stackedBuf[idx + 1] = g;
        stackedBuf[idx + 2] = b;
        stackedBuf[idx + 3] = a;
      }
    }
  }

  const stackedLight = await sharp(stackedBuf, { raw: { width: w4, height: h4, channels: 4 } })
    .resize({ width: 800, withoutEnlargement: true })
    .png({ quality: 100 })
    .toBuffer();
  await fs.writeFile(path.join(brandDir, "logo-stacked.png"), stackedLight);

  console.log("✓ All Revamp Brand Assets Successfully Built!");
}

main().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
