"use client";

import PortalShell, { NavItem } from "@/components/portal/PortalShell";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Camera,
  ClipboardList,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";

const nav: NavItem[] = [
  { href: "/portal/teacher", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/teacher/classes", label: "My Classes", icon: Users },
  { href: "/portal/teacher/gradebook", label: "Gradebook", icon: BookOpen },
  { href: "/portal/teacher/attendance", label: "Smart Attendance", icon: Camera },
  { href: "/portal/teacher/assignments", label: "Assignments", icon: ClipboardList, badge: 5 },
  { href: "/portal/teacher/schedule", label: "Schedule", icon: Calendar },
  { href: "/portal/teacher/messages", label: "Messages", icon: MessageSquare, badge: 2 },
  { href: "/portal/teacher/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/portal/teacher/settings", label: "Settings", icon: Settings },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      nav={nav}
      role="Teacher Portal"
      user={{
        name: "Dr. James Wilson",
        email: "james.wilson@alnakhla-academy.edu.jo",
        avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
