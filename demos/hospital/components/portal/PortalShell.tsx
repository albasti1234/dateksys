"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Bell,
  Globe,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import type { Locale } from "@/i18n/config";

/* ============================================
   Portal Shell — sidebar + topbar for hospital portals
   Light theme: white sidebar, teal accents, gray-50 main
   ============================================ */

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
};

type PortalDict = {
  nav: Record<string, string>;
  [k: string]: unknown;
};

export default function PortalShell({
  children,
  nav,
  locale,
  dict,
  userName,
  userInitials,
}: {
  children: ReactNode;
  nav: NavItem[];
  locale: Locale;
  dict: PortalDict;
  userName: string;
  userInitials: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isRTL = locale === "ar";

  const otherLocale: Locale = locale === "ar" ? "en" : "ar";
  const switchHref = pathname
    ? pathname.replace(/^\/(ar|en)/, `/${otherLocale}`)
    : `/${otherLocale}`;
  const homeHref = `/${locale}`;

  const hospitalName = locale === "ar" ? "المركز الطبي الملكي" : "Royal Medical Center";
  const switchLabel = locale === "ar" ? "English" : "العربية";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 start-0 h-screen w-[260px] bg-white border-e border-gray-200 shadow-sm z-50 transition-transform duration-300 flex flex-col ${
          sidebarOpen
            ? "translate-x-0"
            : isRTL
              ? "translate-x-full lg:translate-x-0"
              : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo / brand */}
        <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
          <Link href={homeHref} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-teal flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <span className="font-bold text-sm text-ink">{hospitalName}</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-ink-muted"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const normalizedHref = item.href.replace(/\/$/, "");
            const normalizedPath = pathname?.replace(/\/$/, "") ?? "";
            const active = normalizedPath === normalizedHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5 ${
                  active
                    ? "bg-teal/10 text-teal font-semibold"
                    : "text-ink-soft hover:bg-gray-100 hover:text-ink"
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge != null && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-teal text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: language + logout */}
        <div className="px-5 py-4 border-t border-gray-200 space-y-1">
          <Link
            href={switchHref}
            className="flex items-center gap-3 px-2 py-2 text-sm text-ink-muted hover:text-teal transition-colors rounded-lg"
            lang={otherLocale}
          >
            <Globe className="w-4 h-4" />
            <span>{switchLabel}</span>
          </Link>
          <Link
            href={homeHref}
            className="flex items-center gap-3 px-2 py-2 text-sm text-ink-muted hover:text-ink transition-colors rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>{dict.nav.logout}</span>
          </Link>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16 flex items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-ink"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={switchHref}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-soft hover:text-teal transition-colors border border-gray-200 rounded-lg"
              lang={otherLocale}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{switchLabel}</span>
            </Link>

            <button
              className="relative p-2 text-ink-soft hover:text-teal transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-rose" />
            </button>

            <div className="hidden lg:flex items-center gap-3 ps-3 border-s border-gray-200">
              <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
                {userInitials}
              </div>
              <span className="text-sm font-semibold text-ink">{userName}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
