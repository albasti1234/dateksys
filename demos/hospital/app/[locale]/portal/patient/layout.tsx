"use client";

import { use, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  Pill,
  Receipt,
  MessageCircle,
  User,
  Settings,
} from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { seedDemoData, useAppointments, useMessages, usePrescriptions } from "@/lib/hospitalStore";
import PortalShell from "@/components/portal/PortalShell";

export default function PatientPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient;
  const pathname = usePathname();

  // Seed demo data on first load
  useEffect(() => {
    seedDemoData();
  }, []);

  const appointments = useAppointments();
  const messages = useMessages();
  const prescriptions = usePrescriptions();

  const upcomingCount = appointments.filter((a) => a.status === "upcoming").length;
  const unreadCount = messages.filter((m) => !m.read && m.direction === "received").length;
  const activeRx = prescriptions.filter((rx) => rx.status === "active").length;

  const basePath = `/${locale}/portal/patient`;

  const nav = [
    { href: basePath, label: p.nav.dashboard, icon: LayoutDashboard },
    { href: `${basePath}/appointments`, label: p.nav.appointments, icon: CalendarDays, badge: upcomingCount || undefined },
    { href: `${basePath}/records`, label: p.nav.records, icon: FileText },
    { href: `${basePath}/prescriptions`, label: p.nav.prescriptions, icon: Pill, badge: activeRx || undefined },
    { href: `${basePath}/bills`, label: p.nav.bills, icon: Receipt },
    { href: `${basePath}/messages`, label: p.nav.messages, icon: MessageCircle, badge: unreadCount || undefined },
    { href: `${basePath}/profile`, label: p.nav.profile, icon: User },
    { href: `${basePath}/settings`, label: p.nav.settings, icon: Settings },
  ];

  const userName = locale === "ar" ? "فاطمة العمري" : "Fatima Al-Omari";
  const userInitials = locale === "ar" ? "فع" : "FA";

  return (
    <PortalShell
      nav={nav}
      locale={locale}
      dict={p}
      userName={userName}
      userInitials={userInitials}
    >
      {children}
    </PortalShell>
  );
}
