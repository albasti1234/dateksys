"use client";

import { use } from "react";
import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
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
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const icons = [
  LayoutDashboard,
  Users,
  BookOpen,
  Camera,
  ClipboardList,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
];

export default function TeacherLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);

  const nav: NavItem[] = dict.portals.teacher.nav.map((item, i) => ({
    href: `/${locale}${item.href}`,
    label: item.label,
    icon: icons[i],
    ...(i === 4 ? { badge: 5 } : {}),
    ...(i === 6 ? { badge: 2 } : {}),
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
        roleLabel: dict.portals.common.roles.teacher,
      }}
      user={{
        name: locale === "ar" ? "د. ريم الزعبي" : "Dr. Reem Al-Zoubi",
        email: "reem.alzoubi@alnakhla.edu.jo",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
