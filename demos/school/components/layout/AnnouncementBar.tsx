"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Phone, Globe } from "lucide-react";

// ============================================
// Top Announcement Bar
// Rotating messages with contact info
// ============================================

const messages = [
  "🎓 Admissions for 2026-2027 Academic Year Now Open — Apply Today",
  "📅 Open House Event — Saturday, May 3rd from 10 AM to 2 PM",
  "🏆 Al-Nakhla Ranked Top 5 International Schools in Jordan 2025",
];

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 5000);
    return () => clearInterval(t);
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-[var(--color-navy-dark)] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-between text-xs">
        {/* Left — contact */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+96265551234"
            className="flex items-center gap-1.5 text-white/70 hover:text-[var(--color-gold)] transition-colors"
          >
            <Phone className="w-3 h-3" />
            <span>+962 6 555 1234</span>
          </a>
          <div className="w-px h-3 bg-white/20" />
          <div className="flex items-center gap-1.5 text-white/70">
            <Calendar className="w-3 h-3" />
            <span>Sun-Thu · 8AM - 4PM</span>
          </div>
        </div>

        {/* Center — rotating announcement */}
        <div className="flex-1 text-center px-4">
          <span
            key={idx}
            className="inline-block text-[var(--color-gold-light)] font-medium animate-[fadeIn_0.5s_ease]"
          >
            {messages[idx]}
          </span>
        </div>

        {/* Right — language + close */}
        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-1.5 text-white/70 hover:text-[var(--color-gold)] transition-colors">
            <Globe className="w-3 h-3" />
            <span>عربي</span>
          </button>
          <button
            onClick={() => setVisible(false)}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Close announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
