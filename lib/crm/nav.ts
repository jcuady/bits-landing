import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  Building2,
  Target,
  Kanban,
  CheckSquare,
  MessagesSquare,
  Megaphone,
  Workflow,
  Filter,
  FileInput,
  FileText,
  BarChart3,
  UserCog,
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
    title: "RevOps",
    items: [
      { href: "/app/pipelines", label: "Pipelines", icon: Kanban },
      { href: "/app/tasks", label: "Tasks", icon: CheckSquare },
      { href: "/app/conversations", label: "Conversations", icon: MessagesSquare },
      { href: "/app/campaigns", label: "Campaigns", icon: Megaphone },
      { href: "/app/automations", label: "Automations", icon: Workflow },
      { href: "/app/funnels", label: "Funnels", icon: Filter },
      { href: "/app/forms", label: "Forms", icon: FileInput },
      { href: "/app/templates", label: "Templates", icon: FileText },
    ],
  },
  {
    title: "Admin",
    items: [
      { href: "/app/reports", label: "Reports", icon: BarChart3 },
      { href: "/app/team", label: "Team", icon: UserCog },
      { href: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];
