"use client";

import PortalShell, { NavItem } from "@/components/portal/PortalShell";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  Sparkles,
  Trophy,
  Library,
  MessageSquare,
  Settings,
} from "lucide-react";

const nav: NavItem[] = [
  { href: "/portal/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/student/homework", label: "Homework", icon: BookOpen, badge: 4 },
  { href: "/portal/student/grades", label: "My Grades", icon: GraduationCap },
  { href: "/portal/student/schedule", label: "Schedule", icon: Calendar },
  { href: "/portal/student/ai-helper", label: "AI Study Buddy", icon: Sparkles },
  { href: "/portal/student/achievements", label: "Achievements", icon: Trophy },
  { href: "/portal/student/library", label: "Library", icon: Library },
  { href: "/portal/student/messages", label: "Messages", icon: MessageSquare },
  { href: "/portal/student/settings", label: "Settings", icon: Settings },
];

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      nav={nav}
      role="Student Portal"
      user={{
        name: "Leila Al-Masri",
        email: "leila.almasri@student.alnakhla.edu.jo",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
