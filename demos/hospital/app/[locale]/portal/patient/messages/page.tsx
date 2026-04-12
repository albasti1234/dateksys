"use client";

import { use, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { useMessages, saveMessage } from "@/lib/hospitalStore";
import { doctors } from "@/lib/data";

export default function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const p = dict.portals.patient.messages;
  const isRTL = locale === "ar";

  const messages = useMessages();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // The demo messages are all with dr-ahmad-mansour
  const chatDoctorId = "dr-ahmad-mansour";
  const chatDoctor = doctors.find((d) => d.id === chatDoctorId);

  const chatMessages = messages
    .filter((m) => m.doctorId === chatDoctorId)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages.length]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    saveMessage({
      doctorId: chatDoctorId,
      content: trimmed,
      direction: "sent",
      read: true,
    });
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleTimeString(locale === "ar" ? "ar-JO" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Chat header */}
      <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center gap-3 shrink-0">
        <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
          {locale === "ar" ? "أم" : "AM"}
        </div>
        <div>
          <div className="font-semibold text-ink text-sm">
            {p.with} {chatDoctor?.name[locale]}
          </div>
          <div className="text-xs text-ink-muted">
            {chatDoctor?.title[locale]}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50">
        {chatMessages.length === 0 ? (
          <div className="text-center py-16 text-ink-muted text-sm">
            {p.noMessages}
          </div>
        ) : (
          chatMessages.map((msg, i) => {
            const isSent = msg.direction === "sent";
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className={`flex ${isSent ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                    isSent
                      ? "bg-teal text-white rounded-ee-md"
                      : "bg-white border border-gray-200 text-ink rounded-es-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  <div
                    className={`text-[10px] mt-1 ${
                      isSent ? "text-white/70" : "text-ink-muted"
                    } ${isSent ? "text-end" : "text-start"}`}
                  >
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input area */}
      <div className="bg-white border-t border-gray-200 px-5 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={p.typeMessage}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-ink placeholder-ink-muted focus:outline-none focus:border-teal transition-colors"
            dir={isRTL ? "rtl" : "ltr"}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center hover:bg-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <Send className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
