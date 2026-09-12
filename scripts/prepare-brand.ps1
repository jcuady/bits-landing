$ErrorActionPreference = "Stop"
$root = "c:\Users\jcuad\OneDrive\Documents\BITS"

$cs = @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public static class Img {
    public static Rectangle ContentBounds(Bitmap bmp) {
        int minX = bmp.Width, minY = bmp.Height, maxX = -1, maxY = -1;
        BitmapData data = bmp.LockBits(new Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
        int stride = data.Stride;
        byte[] px = new byte[stride * bmp.Height];
        System.Runtime.InteropServices.Marshal.Copy(data.Scan0, px, 0, px.Length);
        bmp.UnlockBits(data);
        for (int y = 0; y < bmp.Height; y++) {
            int row = y * stride;
            for (int x = 0; x < bmp.Width; x++) {
                if (px[row + x * 4 + 3] > 10) {
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }
        if (maxX < 0) return new Rectangle(0, 0, bmp.Width, bmp.Height);
        return new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
    }

    public static void TrimSave(string src, string dst, int maxDim) {
        using (Bitmap bmp = new Bitmap(src)) {
            Rectangle b = ContentBounds(bmp);
            using (Bitmap crop = bmp.Clone(b, bmp.PixelFormat)) {
                SaveScaled(crop, dst, maxDim);
            }
        }
    }

    public static void SaveScaled(Bitmap bmp, string dst, int maxDim) {
        double scale = 1.0;
        if (maxDim > 0 && Math.Max(bmp.Width, bmp.Height) > maxDim)
            scale = (double)maxDim / Math.Max(bmp.Width, bmp.Height);
        int w = Math.Max(1, (int)Math.Round(bmp.Width * scale));
        int h = Math.Max(1, (int)Math.Round(bmp.Height * scale));
        using (Bitmap outBmp = new Bitmap(w, h, PixelFormat.Format32bppArgb)) {
            using (Graphics g = Graphics.FromImage(outBmp)) {
                g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                g.SmoothingMode = SmoothingMode.HighQuality;
                g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                g.DrawImage(bmp, 0, 0, w, h);
            }
            outBmp.Save(dst, ImageFormat.Png);
        }
    }

    public static void IconOnBackground(string src, string dst, int size, string hex) {
        using (Bitmap bmp = new Bitmap(src)) {
            Rectangle b = ContentBounds(bmp);
            using (Bitmap crop = bmp.Clone(b, bmp.PixelFormat))
            using (Bitmap outBmp = new Bitmap(size, size, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(outBmp)) {
                    g.Clear(ColorTranslator.FromHtml(hex));
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.SmoothingMode = SmoothingMode.HighQuality;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    int pad = (int)(size * 0.06);
                    int inner = size - pad * 2;
                    double scale = Math.Min((double)inner / crop.Width, (double)inner / crop.Height);
                    int w = (int)Math.Round(crop.Width * scale);
                    int h = (int)Math.Round(crop.Height * scale);
                    g.DrawImage(crop, (size - w) / 2, (size - h) / 2, w, h);
                }
                outBmp.Save(dst, ImageFormat.Png);
            }
        }
    }

    public static void OgImage(string logoSrc, string dst) {
        int W = 1200, H = 630;
        using (Bitmap logo = new Bitmap(logoSrc)) {
            Rectangle b = ContentBounds(logo);
            using (Bitmap crop = logo.Clone(b, logo.PixelFormat))
            using (Bitmap outBmp = new Bitmap(W, H, PixelFormat.Format32bppArgb)) {
                using (Graphics g = Graphics.FromImage(outBmp)) {
                    g.Clear(ColorTranslator.FromHtml("#06162F"));
                    g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    g.SmoothingMode = SmoothingMode.HighQuality;
                    g.PixelOffsetMode = PixelOffsetMode.HighQuality;
                    double scale = Math.Min(620.0 / crop.Width, 300.0 / crop.Height);
                    int w = (int)Math.Round(crop.Width * scale);
                    int h = (int)Math.Round(crop.Height * scale);
                    g.DrawImage(crop, (W - w) / 2, (H - h) / 2 - 10, w, h);
                }
                outBmp.Save(dst, ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $cs -ReferencedAssemblies System.Drawing

New-Item -ItemType Directory -Force -Path "$root\public\brand" | Out-Null

[Img]::TrimSave("$root\Primary Horizontal Logo.png",        "$root\public\brand\logo-horizontal.png", 1400)
[Img]::TrimSave("$root\White Reverse Horizontal Logo.png",  "$root\public\brand\logo-reverse.png",    1400)
[Img]::TrimSave("$root\navy only.png",                      "$root\public\brand\logo-navy.png",       1400)
[Img]::TrimSave("$root\White only.png",                     "$root\public\brand\logo-white.png",      1400)
[Img]::TrimSave("$root\Icon  Brand Mark Only.png",          "$root\public\brand\mark.png",             640)

# Favicons: transparent PNG for modern browsers, navy-backed for apple-touch
[Img]::TrimSave("$root\APP ICON.png", "$root\app\icon.png", 512)
[Img]::IconOnBackground("$root\APP ICON.png", "$root\app\apple-icon.png", 180, "#071A36")

# Open Graph image
[Img]::OgImage("$root\White Reverse Horizontal Logo.png", "$root\public\og.png")

Get-ChildItem "$root\public\brand", "$root\app\icon.png", "$root\app\apple-icon.png", "$root\public\og.png" | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Output "$($_.Name): $($img.Width)x$($img.Height) $([math]::Round($_.Length/1KB))KB"
    $img.Dispose()
}
