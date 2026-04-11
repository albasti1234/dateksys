"use client";

import { use } from "react";
import PortalShell, { type NavItem } from "@/components/portal/PortalShell";
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
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const icons = [
  LayoutDashboard,
  GraduationCap,
  Calendar,
  CreditCard,
  MessageSquare,
  Bus,
  Sparkles,
  FileText,
  Settings,
];

export default function ParentLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);

  const nav: NavItem[] = dict.portals.parent.nav.map((item, i) => ({
    href: `/${locale}${item.href}`,
    label: item.label,
    icon: icons[i],
    ...(i === 3 ? { badge: locale === "ar" ? "مستحقّة" : "Due" } : {}),
    ...(i === 4 ? { badge: 3 } : {}),
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
        roleLabel: dict.portals.common.roles.parent,
      }}
      user={{
        name: locale === "ar" ? "رانيا الحوراني" : "Rania Al-Hourani",
        email: "rania.alhourani@email.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      }}
    >
      {children}
    </PortalShell>
  );
}
