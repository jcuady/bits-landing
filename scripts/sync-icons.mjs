import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const tilePath = path.join(rootDir, "public", "brand", "mark-tile.png");

async function syncIcons() {
  const tileBuf = await fs.readFile(tilePath);

  // App directory icons (Next.js automatically discovers these)
  await fs.writeFile(path.join(rootDir, "app", "icon.png"), tileBuf);
  await fs.writeFile(path.join(rootDir, "app", "apple-icon.png"), tileBuf);

  // Public directory icons
  await fs.writeFile(path.join(rootDir, "public", "icon.png"), tileBuf);
  await fs.writeFile(path.join(rootDir, "public", "apple-icon.png"), tileBuf);

  // 192x192 icon for manifest
  const icon192 = await sharp(tileBuf).resize(192, 192).png().toBuffer();
  await fs.writeFile(path.join(rootDir, "public", "icon-192.png"), icon192);

  console.log("✓ Synchronized app and public icons with new revamp cloud branding!");
}

syncIcons().catch(console.error);
