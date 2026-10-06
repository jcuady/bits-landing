import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

async function fixAdminSecurity() {
  const adminImg = path.join("public", "images", "features", "admin-security.jpg");
  const logoImg = path.join("public", "brand", "logo-horizontal.png");

  const adminImgBuf = await fs.readFile(adminImg);
  const logoImgBuf = await fs.readFile(logoImg);

  const meta = await sharp(adminImgBuf).metadata();
  console.log("admin-security dimensions:", meta.width, meta.height);

  const patchWidth = 620;
  const patchHeight = 82;

  const logoResized = await sharp(logoImgBuf)
    .resize({ height: 44, fit: "inside" })
    .toBuffer();

  const logoMeta = await sharp(logoResized).metadata();

  const svgText = `
    <svg width="${patchWidth}" height="${patchHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#F8FAFC" />
      <text x="${logoMeta.width + 24}" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="bold" fill="#0F172A">Admin Center</text>
      <text x="${logoMeta.width + 160}" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="16" fill="#94A3B8">|</text>
      <text x="${logoMeta.width + 176}" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#475569">Sovereign Security &amp; RBAC</text>
    </svg>
  `;

  const patchBg = await sharp(Buffer.from(svgText)).png().toBuffer();

  const compositePatch = await sharp(patchBg)
    .composite([
      { input: logoResized, left: 12, top: Math.round((patchHeight - logoMeta.height) / 2) }
    ])
    .png()
    .toBuffer();

  const finalJpg = await sharp(adminImgBuf)
    .composite([
      { input: compositePatch, left: 0, top: 0 }
    ])
    .jpeg({ quality: 95 })
    .toBuffer();

  await fs.writeFile(adminImg, finalJpg);

  const webpPath = path.join("public", "images", "features", "admin-security.webp");
  await sharp(finalJpg).webp({ quality: 90 }).toFile(webpPath);
  console.log("✓ Successfully branded admin-security with authentic BITS 3D cloud logo!");
}

fixAdminSecurity().catch(console.error);
