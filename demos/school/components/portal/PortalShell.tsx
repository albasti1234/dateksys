"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

// ============================================
// Portal Shell — shared sidebar + topbar layout
// Used by Parent, Teacher, Student, Admin portals
// ============================================

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
};

export default function PortalShell({
  children,
  nav,
  user,
  role,
}: {
  children: ReactNode;
  nav: NavItem[];
  user: { name: string; email: string; avatar: string };
  role: string;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] flex">
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed lg:sticky top-0 start-0 h-screen w-[280px] bg-[var(--color-navy)] text-white z-50 transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 48 48" className="h-10 w-10" fill="none">
              <defs>
                <linearGradient id="sbgold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D4B26A" />
                  <stop offset="100%" stopColor="#A07E34" />
                </linearGradient>
              </defs>
              <path d="M24 4 L40 10 L40 24 Q40 36 24 44 Q8 36 8 24 L8 10 Z" fill="#0F2C5C" stroke="url(#sbgold)" strokeWidth="1" />
              <g stroke="url(#sbgold)" strokeWidth="1.5" strokeLinecap="round" fill="none">
                <path d="M24 32 L24 18" />
                <path d="M24 22 Q18 18 14 20" />
                <path d="M24 22 Q30 18 34 20" />
                <path d="M24 18 Q19 14 16 15" />
                <path d="M24 18 Q29 14 32 15" />
              </g>
            </svg>
            <div className="leading-tight">
              <div className="font-serif font-bold text-base">Al-Nakhla</div>
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-gold-light)]">
                {role}
              </div>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/70">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User info */}
        <div className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-full bg-cover bg-center border-2"
              style={{ backgroundImage: `url('${user.avatar}')`, borderColor: "#C19A4B" }}
            />
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-sm truncate">{user.name}</div>
              <div className="text-xs text-white/50 truncate">{user.email}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== "/portal/parent" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-6 py-3 text-sm transition-all ${
                  active
                    ? "text-[var(--color-gold-light)] bg-white/5"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {active && (
                  <div
                    className="absolute start-0 top-0 bottom-0 w-1"
                    style={{ background: "#C19A4B" }}
                  />
                )}
                <Icon className="w-4 h-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                    style={{ background: "#C19A4B", color: "white" }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-2 py-2 text-sm text-white/60 hover:text-white transition-colors">
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ms-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-[var(--color-border)] h-16 flex items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-[var(--color-navy)]">
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden lg:flex items-center gap-2 max-w-md flex-1">
              <Search className="w-4 h-4 text-[var(--color-ink-soft)]" />
              <input
                type="text"
                placeholder="Search students, classes, reports..."
                className="flex-1 bg-transparent focus:outline-none text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-soft)]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-navy)] transition-colors">
              <Bell className="w-5 h-5" />
              <span
                className="absolute top-1 end-1 w-2 h-2 rounded-full"
                style={{ background: "#C19A4B" }}
              />
            </button>
            <div className="hidden lg:flex items-center gap-3 ps-3 border-s border-[var(--color-border)]">
              <div
                className="w-9 h-9 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url('${user.avatar}')` }}
              />
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[var(--color-navy)]">{user.name.split(" ")[0]}</div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--color-gold)]">{role}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
