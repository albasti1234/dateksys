"use client";

import { use } from "react";
import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
import {
  LayoutDashboard,
  FileText,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  BarChart3,
  Bus,
  Calendar,
  Settings,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { usePendingCount } from "@/lib/applicationsStorage";

const icons = [
  LayoutDashboard,
  FileText,
  Users,
  GraduationCap,
  BookOpen,
  CreditCard,
  BarChart3,
  Bus,
  Calendar,
  Settings,
];

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);

  const pending = usePendingCount();

  const nav: NavItem[] = dict.portals.admin.nav.map((item, i) => ({
    href: `/${locale}${item.href}`,
    label: item.label,
    icon: icons[i],
    // Applications nav item is always at index 1 — show pending count as badge
    ...(i === 1 && pending > 0 ? { badge: pending } : {}),
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
        roleLabel: dict.portals.common.roles.admin,
      }}
      user={{
        name: locale === "ar" ? "د. سارة حدّاد" : "Dr. Sarah Haddad",
        email: "sarah.haddad@alnakhla.edu.jo",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
