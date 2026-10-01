import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const brandDir = path.join(rootDir, "public", "brand");
const publicDir = path.join(rootDir, "public");
const appDir = path.join(rootDir, "app");

// Helper to construct a standard multi-resolution ICO file containing PNG streams
function buildIcoFile(imageBuffers) {
  // imageBuffers: Array of { width: number, height: number, buffer: Buffer }
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
  console.log("=== Generating BITS Brand Favicons, App Icons & Google Logo Assets ===");

  // 1. Source Emblem: Trimmed high-resolution BITS Cloud & Infinity Ribbon Emblem
  const emblemSourcePath = path.join(rootDir, "newlogo", "pure_brand_emblem_trimmed.png");
  const emblemBuf = await fs.readFile(emblemSourcePath);
  const emblemMeta = await sharp(emblemBuf).metadata();
  console.log(`Loaded source emblem: ${emblemMeta.width}x${emblemMeta.height}`);

  // 2. Generate Square Transparent Icon Generator Function
  async function createTransparentSquare(targetSize, innerRatio = 0.88) {
    const targetInnerSize = Math.round(targetSize * innerRatio);
    const resizedEmblem = await sharp(emblemBuf)
      .resize({
        width: targetInnerSize,
        height: targetInnerSize,
        fit: "inside",
      })
      .toBuffer({ resolveWithObject: true });

    const left = Math.round((targetSize - resizedEmblem.info.width) / 2);
    const top = Math.round((targetSize - resizedEmblem.info.height) / 2);

    return sharp({
      create: {
        width: targetSize,
        height: targetSize,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: resizedEmblem.data, left, top }])
      .png({ quality: 100, compressionLevel: 9 })
      .toBuffer();
  }

  // 3. Generate resolutions: 512, 192, 48, 32, 16
  const icon512 = await createTransparentSquare(512, 0.88);
  const icon192 = await createTransparentSquare(192, 0.88);
  const icon48 = await createTransparentSquare(48, 0.90);
  const icon32 = await createTransparentSquare(32, 0.92);
  const icon16 = await createTransparentSquare(16, 0.92);

  // Write PNG icons
  await fs.writeFile(path.join(publicDir, "icon.png"), icon512);
  await fs.writeFile(path.join(publicDir, "icon-512.png"), icon512);
  await fs.writeFile(path.join(publicDir, "icon-192.png"), icon192);
  await fs.writeFile(path.join(publicDir, "icon-48.png"), icon48);
  await fs.writeFile(path.join(publicDir, "favicon.png"), icon48);
  await fs.writeFile(path.join(appDir, "icon.png"), icon512);
  console.log("✓ Generated icon.png, icon-512.png, icon-192.png, icon-48.png, favicon.png");

  // 4. Generate Multi-Resolution favicon.ico (16, 32, 48)
  const icoBuffer = buildIcoFile([
    { width: 48, height: 48, buffer: icon48 },
    { width: 32, height: 32, buffer: icon32 },
    { width: 16, height: 16, buffer: icon16 },
  ]);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
  await fs.writeFile(path.join(appDir, "favicon.ico"), icoBuffer);
  console.log("✓ Generated multi-resolution favicon.ico (16px, 32px, 48px) in public/ and app/");

  // 5. Generate Apple Touch Icon (180x180) - Solid Apple Squircle with Hero Sky Blue & Cyan Glow
  // Note: iOS does not support transparency on home screen icons. We use the hero sky canvas.
  const appleSize = 180;
  const svgAppleBg = `
    <svg width="${appleSize}" height="${appleSize}" viewBox="0 0 ${appleSize} ${appleSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="appleSky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#124294" />
          <stop offset="50%" stop-color="#1b5bc6" />
          <stop offset="100%" stop-color="#2563eb" />
        </linearGradient>
        <radialGradient id="appleBloom" cx="50%" cy="25%" r="65%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.45" />
          <stop offset="60%" stop-color="#2563eb" stop-opacity="0.15" />
          <stop offset="100%" stop-color="#124294" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="${appleSize}" height="${appleSize}" fill="url(#appleSky)" />
      <rect width="${appleSize}" height="${appleSize}" fill="url(#appleBloom)" />
    </svg>
  `;
  const appleBg = await sharp(Buffer.from(svgAppleBg)).png().toBuffer();
  // For the Apple icon, use the white cloud mark (from public/brand/mark.png) for high-contrast luxury feel
  const markWhiteBuf = await fs.readFile(path.join(brandDir, "mark.png"));
  const appleMark = await sharp(markWhiteBuf)
    .resize({ width: 130, height: 130, fit: "inside" })
    .toBuffer({ resolveWithObject: true });
  const appleLeft = Math.round((appleSize - appleMark.info.width) / 2);
  const appleTop = Math.round((appleSize - appleMark.info.height) / 2);

  const appleIconFinal = await sharp(appleBg)
    .composite([{ input: appleMark.data, left: appleLeft, top: appleTop }])
    .png({ quality: 100 })
    .toBuffer();

  await fs.writeFile(path.join(publicDir, "apple-icon.png"), appleIconFinal);
  await fs.writeFile(path.join(appDir, "apple-icon.png"), appleIconFinal);
  console.log("✓ Generated iOS Apple Touch Icon (180x180) in public/ and app/");

  // 6. Generate Android PWA Maskable Icon & mark-tile.png (512x512)
  const tileBg = await sharp(Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pwaSky" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#124294" />
          <stop offset="55%" stop-color="#1b5ec4" />
          <stop offset="100%" stop-color="#2563eb" />
        </linearGradient>
        <radialGradient id="pwaGlow" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.45" />
          <stop offset="100%" stop-color="#124294" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="512" height="512" rx="114" ry="114" fill="url(#pwaSky)" />
      <rect width="512" height="512" rx="114" ry="114" fill="url(#pwaGlow)" />
    </svg>
  `)).png().toBuffer();

  const tileMark = await sharp(markWhiteBuf)
    .resize({ width: 340, height: 340, fit: "inside" })
    .toBuffer({ resolveWithObject: true });
  const tileLeft = Math.round((512 - tileMark.info.width) / 2);
  const tileTop = Math.round((512 - tileMark.info.height) / 2);

  const finalTile = await sharp(tileBg)
    .composite([{ input: tileMark.data, left: tileLeft, top: tileTop }])
    .png({ quality: 100 })
    .toBuffer();

  await fs.writeFile(path.join(brandDir, "mark-tile.png"), finalTile);
  console.log("✓ Generated public/brand/mark-tile.png (512x512)");

  // 7. Generate Google Search Console & Knowledge Panel Organization Logo (logo-google.png)
  // Google recommends a 512x512 square with high contrast on white background
  const googleLogoBg = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  }).png().toBuffer();

  // Emblem + BITS text centered on white background
  const emblemForGoogle = await sharp(emblemBuf)
    .resize({ width: 300, height: 300, fit: "inside" })
    .toBuffer({ resolveWithObject: true });

  const emblemGLeft = Math.round((512 - emblemForGoogle.info.width) / 2);
  const emblemGTop = 64;

  const svgBitsText = `
    <svg width="512" height="120" viewBox="0 0 512 120" xmlns="http://www.w3.org/2000/svg">
      <text x="256" y="60" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="900" font-size="52" fill="#0A1E4A" letter-spacing="4">BITS</text>
      <text x="256" y="94" text-anchor="middle" font-family="Plus Jakarta Sans, sans-serif" font-weight="600" font-size="18" fill="#1D4ED8" letter-spacing="6">BOUNDLESS IT SOLUTIONS</text>
    </svg>
  `;
  const bitsTextBuf = await sharp(Buffer.from(svgBitsText)).png().toBuffer();

  const googleLogo = await sharp(googleLogoBg)
    .composite([
      { input: emblemForGoogle.data, left: emblemGLeft, top: emblemGTop },
      { input: bitsTextBuf, left: 0, top: 350 },
    ])
    .png({ quality: 100 })
    .toBuffer();

  await fs.writeFile(path.join(brandDir, "logo-google.png"), googleLogo);
  console.log("✓ Generated public/brand/logo-google.png (512x512) for Google Search Console");

  console.log("=== All Favicons, App Icons, and Google Assets Generated Successfully! ===");
}

run().catch((err) => {
  console.error("Error generating brand assets:", err);
  process.exit(1);
});
