import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SecurityLogoProps {
  className?: string;
  size?: number;
}

/**
 * Bangko Sentral ng Pilipinas (BSP) - Official Seal
 * Regulatory Authority for Philippine Banking, Financing, and Collections Conduct
 */
export function BspLogo({ className, size = 52 }: SecurityLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative flex shrink-0 items-center justify-center", className)}
    >
      <Image
        src="/brand/bsp-seal.svg"
        alt="Bangko Sentral ng Pilipinas (BSP) Official Seal"
        width={size}
        height={size}
        className="size-full object-contain drop-shadow-xs"
        unoptimized
      />
    </div>
  );
}

/**
 * National Privacy Commission (NPC) - Official Logo
 * Republic Act 10173 (Data Privacy Act of 2012)
 */
export function NpcLogo({ className, size = 52 }: SecurityLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative flex shrink-0 items-center justify-center", className)}
    >
      <Image
        src="/brand/npc-logo.svg"
        alt="National Privacy Commission (NPC) Official Logo"
        width={size}
        height={size}
        className="size-full object-contain drop-shadow-xs"
        unoptimized
      />
    </div>
  );
}

/**
 * Securities and Exchange Commission (SEC) Philippines - Official Logo
 * SEC MC No. 18 (2019) Unfair Debt Collection Practices Prohibition
 */
export function SecLogo({ className, size = 52 }: SecurityLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative flex shrink-0 items-center justify-center", className)}
    >
      <Image
        src="/brand/sec-logo.svg"
        alt="Securities and Exchange Commission (SEC) Philippines Official Logo"
        width={size}
        height={size}
        className="size-full object-contain drop-shadow-xs"
        unoptimized
      />
    </div>
  );
}

/**
 * Credit Information Corporation (CIC) - Official Seal
 * RA 9510 (Credit Information System Act - CISA)
 */
export function CicLogo({ className, size = 52 }: SecurityLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative flex shrink-0 items-center justify-center", className)}
    >
      <Image
        src="/brand/cic-logo.svg"
        alt="Credit Information Corporation (CIC) Official Seal"
        width={size}
        height={size}
        className="size-full object-contain drop-shadow-xs"
        unoptimized
      />
    </div>
  );
}

/**
 * International Organization for Standardization (ISO) - Official Logo
 * ISO/IEC 27001 Information Security Management Systems
 */
export function Iso27001Logo({ className, size = 52 }: SecurityLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative flex shrink-0 items-center justify-center", className)}
    >
      <Image
        src="/brand/iso-logo.svg"
        alt="International Organization for Standardization (ISO) Official Logo"
        width={size}
        height={size}
        className="size-full rounded-md object-contain shadow-xs"
        unoptimized
      />
    </div>
  );
}

/**
 * Department of Information and Communications Technology (DICT) - Official Seal
 * Government Cloud First Policy & National Cybersecurity Framework
 */
export function DictLogo({ className, size = 52 }: SecurityLogoProps) {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("relative flex shrink-0 items-center justify-center", className)}
    >
      <Image
        src="/brand/dict-logo.svg"
        alt="Department of Information and Communications Technology (DICT) Official Seal"
        width={size}
        height={size}
        className="size-full object-contain drop-shadow-xs"
        unoptimized
      />
    </div>
  );
}

// Aliases for backward compatibility if referenced elsewhere
export const IsoLogo = Iso27001Logo;
export const Soc2Logo = Iso27001Logo;
export const Aes256Logo = DictLogo;
export const PciDssLogo = CicLogo;
