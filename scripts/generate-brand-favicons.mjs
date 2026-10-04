import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const brandDir = path.join(rootDir, "public", "brand");
const publicDir = path.join(rootDir, "public");
const appDir = path.join(rootDir, "app");

// Helper to construct a standard multi-resolution ICO file containing PNG streams
function buildIcoFile(imageBuffers) {
  const count = imageBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + count * 16;
  const directoryEntries = [];

  for (const img of imageBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count (0 if >= 8bpp)
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size of image data
    entry.writeUInt32LE(offset, 12); // file offset
    directoryEntries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...directoryEntries, ...imageBuffers.map((img) => img.buffer)]);
}

async function run() {
  console.log("=== Generating BITS Ultra-HD Brand Favicons for Google Search Console & Web ===");

  // 1. Source: Master APP ICON.png (1254x1254)
  const appIconPath = path.join(rootDir, "APP ICON.png");
  const appIconBuf = await fs.readFile(appIconPath);

  // Extract the squircle: bounds left=113, top=118, size=1028
  const cropped = await sharp(appIconBuf)
    .extract({ left: 113, top: 118, width: 1028, height: 1028 })
    .resize(1024, 1024)
    .toBuffer();

  // Antialiased squircle mask (Apple superellipse ratio: rx=224, ry=224)
  const maskSvg = Buffer.from(`
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <rect width="1024" height="1024" rx="224" ry="224" fill="#ffffff" />
    </svg>
  `);

  const masterSquircle = await sharp(cropped)
    .composite([{ input: maskSvg, blend: "dest-in" }])
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  // Save master 1024x1024 squircle to public/brand/
  await fs.writeFile(path.join(brandDir, "brand-icon-1024.png"), masterSquircle);
  console.log("✓ Created master squircle asset: public/brand/brand-icon-1024.png (1024x1024)");

  // Helper to generate resized PNG
  async function generateSize(size) {
    return sharp(masterSquircle)
      .resize(size, size, { kernel: "lanczos3" })
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();
  }

  // 2. Generate Google Search Console & Web sizes (multiples of 48px required by Google)
  const icon512 = await generateSize(512);
  const icon192 = await generateSize(192);
  const icon144 = await generateSize(144);
  const icon96 = await generateSize(96);
  const icon48 = await generateSize(48);
  const icon32 = await generateSize(32);
  const icon16 = await generateSize(16);

  // 3. Write web standard & Googlebot sizes to public/
  await fs.writeFile(path.join(publicDir, "icon.png"), icon512);
  await fs.writeFile(path.join(publicDir, "icon-512.png"), icon512);
  await fs.writeFile(path.join(publicDir, "icon-192.png"), icon192);
  await fs.writeFile(path.join(publicDir, "icon-144.png"), icon144);
  await fs.writeFile(path.join(publicDir, "icon-96.png"), icon96);
  await fs.writeFile(path.join(publicDir, "icon-48.png"), icon48);
  await fs.writeFile(path.join(publicDir, "favicon.png"), icon48);

  // 4. Write Next.js App Router app/icon.png (Next.js automatically renders <link rel="icon" ...>)
  await fs.writeFile(path.join(appDir, "icon.png"), icon512);
  console.log("✓ Generated app/icon.png & public/icon-*.png (48, 96, 144, 192, 512px)");

  // 5. Generate Multi-Resolution favicon.ico (16, 32, 48px)
  const icoBuffer = buildIcoFile([
    { width: 48, height: 48, buffer: icon48 },
    { width: 32, height: 32, buffer: icon32 },
    { width: 16, height: 16, buffer: icon16 },
  ]);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
  await fs.writeFile(path.join(appDir, "favicon.ico"), icoBuffer);
  console.log("✓ Generated multi-resolution favicon.ico (16px, 32px, 48px) in public/ and app/");

  // 6. Generate Apple Touch Icon (180x180)
  // iOS Apple Touch Icon: Needs solid background (no transparent corners) or standard squircle
  const appleIcon = await sharp(cropped)
    .resize(180, 180, { kernel: "lanczos3" })
    .png({ quality: 100 })
    .toBuffer();
  await fs.writeFile(path.join(publicDir, "apple-icon.png"), appleIcon);
  await fs.writeFile(path.join(appDir, "apple-icon.png"), appleIcon);
  console.log("✓ Generated Apple Touch Icon (180x180) in public/ and app/");

  // 7. Update public/brand/mark-tile.png (512x512)
  await fs.writeFile(path.join(brandDir, "mark-tile.png"), icon512);
  console.log("✓ Updated public/brand/mark-tile.png (512x512)");

  // 8. Generate Google Search Console & Schema.org Organization Logo (512x512)
  // Google recommends a 512x512 square with high contrast
  const googleLogoBg = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  }).png().toBuffer();

  const squircleForGoogle = await sharp(masterSquircle)
    .resize(310, 310, { kernel: "lanczos3" })
    .toBuffer({ resolveWithObject: true });

  const gLeft = Math.round((512 - squircleForGoogle.info.width) / 2);
  const gTop = 50;

  const svgBitsText = `
    <svg width="512" height="120" viewBox="0 0 512 120" xmlns="http://www.w3.org/2000/svg">
      <text x="256" y="55" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="50" fill="#071126" letter-spacing="4">BITS</text>
      <text x="256" y="90" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="16" fill="#1D4ED8" letter-spacing="5">BOUNDLESS IT SOLUTIONS</text>
    </svg>
  `;
  const textBuf = await sharp(Buffer.from(svgBitsText)).png().toBuffer();

  const googleLogo = await sharp(googleLogoBg)
    .composite([
      { input: squircleForGoogle.data, left: gLeft, top: gTop },
      { input: textBuf, left: 0, top: 370 },
    ])
    .png({ quality: 100 })
    .toBuffer();

  await fs.writeFile(path.join(brandDir, "logo-google.png"), googleLogo);
  console.log("✓ Generated public/brand/logo-google.png (512x512) for Google Search Console");

  console.log("=== Favicon generation completed successfully! ===");
}

run().catch((err) => {
  console.error("Error generating brand assets:", err);
  process.exit(1);
});
