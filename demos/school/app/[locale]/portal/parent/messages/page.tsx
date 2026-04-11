"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Search, Send, Paperclip, MoreVertical } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

const avatars = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
  "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
];

export default function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const m = dict.portals.parent.messages;
  const isRTL = locale === "ar";
  const [selected, setSelected] = useState(0);

  const h1Class = isRTL
    ? "font-arabic-display text-2xl font-bold text-[var(--color-navy)] mb-4 leading-[1.4]"
    : "font-serif text-2xl font-bold text-[var(--color-navy)] mb-4";

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Sidebar */}
      <div className="w-96 bg-white border-e border-[var(--color-border)] flex flex-col">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h1 className={h1Class}>{m.hero.title}</h1>
          <div className="flex items-center gap-2 bg-[var(--color-cream)] px-4 py-2.5">
            <Search className="w-4 h-4 text-[var(--color-ink-soft)]" />
            <input
              type="text"
              placeholder={m.searchPlaceholder}
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {m.conversations.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setSelected(i)}
              className={`w-full p-4 flex items-start gap-3 text-start border-b border-[var(--color-border-soft)] transition-colors ${
                selected === i
                  ? "bg-[var(--color-cream)]"
                  : "hover:bg-[var(--color-cream)]/50"
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${avatars[i % avatars.length]}')`,
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-sm text-[var(--color-navy)] truncate">
                    {c.name}
                  </div>
                  <div className="text-[10px] text-[var(--color-ink-soft)] shrink-0">
                    {c.time}
                  </div>
                </div>
                <div className="text-[10px] tracking-wider text-[var(--color-gold)] mb-1">
                  {c.role}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)] truncate">
                  {c.lastMessage}
                </div>
              </div>
              {c.unread > 0 && (
                <div className="shrink-0 w-5 h-5 rounded-full bg-[var(--color-gold)] text-white text-[10px] font-bold flex items-center justify-center">
                  {c.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 bg-[var(--color-cream)] flex flex-col min-w-0">
        <div className="bg-white border-b border-[var(--color-border)] p-5 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full bg-cover bg-center shrink-0"
            style={{ backgroundImage: `url('${avatars[0]}')` }}
          />
          <div className="flex-1">
            <div
              className={`text-lg font-bold text-[var(--color-navy)] ${
                isRTL ? "font-arabic-display" : "font-serif"
              }`}
            >
              {m.activeHeader.name}
            </div>
            <div className="text-xs text-[var(--color-gold)] tracking-wider">
              {m.activeHeader.role} · {m.activeHeader.online}
            </div>
          </div>
          <button className="p-2 text-[var(--color-ink-soft)]">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {m.activeMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex ${
                msg.from === "parent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[60%] p-4 ${
                  msg.from === "parent"
                    ? "bg-[var(--color-navy)] text-white"
                    : "bg-white border border-[var(--color-border)]"
                }`}
              >
                <p
                  className={`text-sm ${
                    isRTL ? "leading-[2]" : "leading-relaxed"
                  } ${
                    msg.from === "parent"
                      ? "text-white"
                      : "text-[var(--color-ink)]"
                  }`}
                >
                  {msg.text}
                </p>
                <div
                  className={`text-[10px] mt-2 ${
                    msg.from === "parent"
                      ? "text-white/50"
                      : "text-[var(--color-ink-soft)]"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white border-t border-[var(--color-border)] p-4 flex items-center gap-3">
          <button className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-gold)]">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder={m.inputPlaceholder}
            className="flex-1 px-4 py-3 bg-[var(--color-cream)] focus:outline-none focus:bg-white transition-colors text-sm"
          />
          <button className="p-3 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)] transition-colors">
            <Send className={`w-4 h-4 ${isRTL ? "-scale-x-100" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
