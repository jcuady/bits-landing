import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Building2,
  Target,
  Settings,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const crmNav: NavSection[] = [
  {
    title: "Overview",
    items: [{ href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Records",
    items: [
      { href: "/app/leads", label: "Leads", icon: UserPlus },
      { href: "/app/contacts", label: "Contacts", icon: Users },
      { href: "/app/companies", label: "Companies", icon: Building2 },
      { href: "/app/opportunities", label: "Opportunities", icon: Target },
    ],
  },
  {
    title: "Admin",
    items: [
      { href: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];
