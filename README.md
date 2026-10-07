# BITS — Boundless IT Solutions
> **Sovereign Enterprise Software, Operations 360 (OMS) & Collections CRM**  
> Sub-350ms predictive dialing, automated PTP promise tracking, GPS field telemetry, and speech AI compliance with zero per-seat licensing fees.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)

---

## 📖 Complete Documentation
For the full architectural breakdown, Supabase schema, API keys, brandbook, product catalog, and user personas, please read our master guide:

👉 **[docs/FULL_SYSTEM_DOCUMENTATION.md](./docs/FULL_SYSTEM_DOCUMENTATION.md)**

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js `20.x` or higher
- npm `10.x` or higher

### 2. Installation
```bash
git clone https://github.com/jcuady/bits-landing.git
cd bits-landing
npm install
```

### 3. Environment Configuration
Copy the template environment variables:
```bash
cp .env.example .env.local
```
Add your credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://jvseyttzlobelrnzmfyf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
RESEND_API_KEY=re_your_resend_api_key_here
CONTACT_INBOX=boundlessitsolutions@gmail.com
CONTACT_FROM=BITS Inquiries <onboarding@resend.dev>
NEXT_PUBLIC_SITE_URL=https://bits-landing.vercel.app
```

### 4. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3847](http://localhost:3847)** in your browser.

---

## 🛠️ Verification & Testing Commands

```bash
# Type check the codebase
npx tsc --noEmit

# Production build and static page generation test
npm run build

# Headless multi-device responsive audit across 11 viewports
npm run test:responsive

# Capture fresh high-resolution Playwright screenshots
node scripts/capture-hero-operations360.mjs
```

---

## 🏗️ Architecture Overview

- **`app/(marketing)`**: High-converting public acquisition platform featuring the daytime azure sky canvas, static photorealistic clouds, and the pinned OPERATIONS 360 cockpit.
- **`app/(crm)/app`**: Authenticated Operations Management System (OMS) and Collections CRM with real-time PTP tracking, telephony HUD, and GPS field telemetry.
- **`components/sections`**: Modular enterprise sections (Hero, HeroProduct, TrustStrip, ProductFamilies, SolutionFinder, etc.).
- **`public/brand`**: Production brand assets, official infinity "B" marks, and squircle emblems.
- **`scripts`**: Automated verification and database migration tooling.

---

## 📄 License & Proprietary Notice
© 2026 Boundless IT Solutions (BITS). All rights reserved. Sovereign Enterprise Architecture.
