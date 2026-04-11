"use client";

import PortalShell, { NavItem } from "@/components/portal/PortalShell";
import {
  LayoutDashboard,
  GraduationCap,
  Calendar,
  CreditCard,
  MessageSquare,
  Bus,
  Sparkles,
  FileText,
  Settings,
} from "lucide-react";

const nav: NavItem[] = [
  { href: "/portal/parent", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/parent/grades", label: "Grades & Reports", icon: GraduationCap },
  { href: "/portal/parent/attendance", label: "Attendance", icon: Calendar },
  { href: "/portal/parent/fees", label: "Fees & Payments", icon: CreditCard, badge: "Due" },
  { href: "/portal/parent/messages", label: "Messages", icon: MessageSquare, badge: 3 },
  { href: "/portal/parent/bus", label: "Bus Tracking", icon: Bus },
  { href: "/portal/parent/homework", label: "AI Homework Helper", icon: Sparkles },
  { href: "/portal/parent/documents", label: "Documents", icon: FileText },
  { href: "/portal/parent/settings", label: "Settings", icon: Settings },
];

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      nav={nav}
      role="Parent Portal"
      user={{
        name: "Rania Al-Masri",
        email: "rania.almasri@email.com",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
