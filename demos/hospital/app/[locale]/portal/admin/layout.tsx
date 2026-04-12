"use client";

import { use, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  UserCog,
  DollarSign,
  BarChart3,
  Settings,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { seedDemoData } from "@/lib/hospitalStore";
import PortalShell from "@/components/portal/PortalShell";

export default function AdminPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const a = dict.portals.admin;

  useEffect(() => {
    seedDemoData();
  }, []);

  const basePath = `/${locale}/portal/admin`;

  const nav = [
    { href: basePath, label: a.nav.dashboard, icon: LayoutDashboard },
    { href: `${basePath}/patients`, label: a.nav.patients, icon: Users },
    { href: `${basePath}/appointments`, label: a.nav.appointments, icon: CalendarDays },
    { href: `${basePath}/staff`, label: a.nav.staff, icon: UserCog },
    { href: `${basePath}/finance`, label: a.nav.finance, icon: DollarSign },
    { href: `${basePath}/reports`, label: a.nav.reports, icon: BarChart3 },
    { href: `${basePath}/settings`, label: a.nav.settings, icon: Settings },
  ];

  const userName = locale === "ar" ? "د. سامر الرشيد" : "Dr. Samer Al-Rashid";
  const userInitials = locale === "ar" ? "سر" : "SR";

  return (
    <PortalShell
      nav={nav}
      locale={locale}
      dict={a}
      userName={userName}
      userInitials={userInitials}
    >
      {children}
    </PortalShell>
  );
}
