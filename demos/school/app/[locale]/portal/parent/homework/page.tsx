"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Upload, Send, Bot } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function HomeworkHelperPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const h = dict.portals.parent.homework;
  const isRTL = locale === "ar";
  const [input, setInput] = useState("");

  const messages = [
    { from: "user" as const, text: h.chat.student },
    { from: "ai" as const, text: h.chat.ai },
  ];

  const parentAvatar =
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80";

  const h1Class = isRTL
    ? "font-arabic-display text-2xl md:text-3xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]";

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-border)] p-6 lg:p-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="section-label">{h.hero.title}</p>
            </div>
            <h1 className={h1Class}>{h.hero.subtitle}</h1>
            <p
              className={`text-sm text-[var(--color-ink-soft)] mt-1 max-w-2xl ${
                isRTL ? "leading-[2]" : "leading-relaxed"
              }`}
            >
              {h.hero.description}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-cream)] border border-[var(--color-border)]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider">
              {h.online}
            </span>
          </div>
        </div>
      </div>

      {/* Quick topics */}
      <div className="bg-white border-b border-[var(--color-border)] px-6 lg:px-8 py-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs tracking-wider text-[var(--color-ink-soft)] me-2">
            {h.topicsTitle}:
          </span>
          {h.topics.map((s) => (
            <button
              key={s}
              className="px-4 py-1.5 text-xs font-semibold bg-[var(--color-cream)] hover:bg-[var(--color-navy)] hover:text-white border border-[var(--color-border)] transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[var(--color-cream)]">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${m.from === "user" ? "justify-end" : ""}`}
            >
              {m.from === "ai" && (
                <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold-dark)] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`max-w-[75%] p-5 ${
                  m.from === "user"
                    ? "bg-[var(--color-navy)] text-white"
                    : "bg-white border border-[var(--color-border)]"
                }`}
              >
                <p
                  className={`text-sm whitespace-pre-line ${
                    isRTL ? "leading-[2]" : "leading-relaxed"
                  } ${
                    m.from === "user"
                      ? "text-white"
                      : "text-[var(--color-ink)]"
                  }`}
                >
                  {m.text}
                </p>
              </div>
              {m.from === "user" && (
                <div
                  className="w-10 h-10 shrink-0 rounded-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${parentAvatar}')` }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[var(--color-border)] p-5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button
            className="p-3 text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors"
            aria-label={h.input.upload}
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={h.input.placeholder}
            className="flex-1 px-5 py-3 bg-[var(--color-cream)] focus:outline-none focus:bg-white transition-colors text-sm"
          />
          <button
            className="p-3 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)] transition-colors"
            aria-label={h.input.send}
          >
            <Send className={`w-5 h-5 ${isRTL ? "-scale-x-100" : ""}`} />
          </button>
        </div>
        <p className="text-[10px] text-[var(--color-ink-soft)] text-center mt-3 max-w-4xl mx-auto">
          {h.disclaimer}
        </p>
      </div>
    </div>
  );
}
