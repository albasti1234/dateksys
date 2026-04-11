"use client";

import { use } from "react";
import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
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
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const icons = [
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  Sparkles,
  Trophy,
  Library,
  MessageSquare,
  Settings,
];

export default function StudentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);

  const nav: NavItem[] = dict.portals.student.nav.map((item, i) => ({
    href: `/${locale}${item.href}`,
    label: item.label,
    icon: icons[i],
    ...(i === 1 ? { badge: 4 } : {}),
  }));

  return (
    <PortalShell
      nav={nav}
      locale={locale}
      brandName={locale === "ar" ? "النخلة" : "Al-Nakhla"}
      dict={{
        signOut: dict.portals.common.signOut,
        search: dict.portals.common.search,
        switchLanguageLabel: dict.portals.common.switchLanguageLabel,
        roleLabel: dict.portals.common.roles.student,
      }}
      user={{
        name: locale === "ar" ? "ليلى الحوراني" : "Leila Al-Hourani",
        email: "leila.alhourani@student.alnakhla.edu.jo",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
