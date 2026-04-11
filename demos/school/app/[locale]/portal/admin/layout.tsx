"use client";

import PortalShell, { NavItem } from "@/components/portal/PortalShell";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  BarChart3,
  Bus,
  Calendar,
  Settings,
} from "lucide-react";

const nav: NavItem[] = [
  { href: "/portal/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/portal/admin/students", label: "Students", icon: Users },
  { href: "/portal/admin/teachers", label: "Teachers", icon: GraduationCap },
  { href: "/portal/admin/classes", label: "Classes", icon: BookOpen },
  { href: "/portal/admin/finance", label: "Finance", icon: CreditCard },
  { href: "/portal/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/portal/admin/transport", label: "Transportation", icon: Bus },
  { href: "/portal/admin/calendar", label: "School Calendar", icon: Calendar },
  { href: "/portal/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      nav={nav}
      role="Admin Dashboard"
      user={{
        name: "Dr. Sarah Haddad",
        email: "sarah.haddad@alnakhla-academy.edu.jo",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
