"use client";

import { use, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, MessageSquare, Users, Megaphone } from "lucide-react";
import type { Locale } from "@/i18n/config";

interface Contact {
  id: number;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  avatar: string;
  lastMessage: { ar: string; en: string };
  time: string;
  unread: number;
  type: "teacher" | "group" | "announcement";
}

interface ChatMessage {
  from: "student" | "other";
  text: { ar: string; en: string };
  time: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: { ar: "د. ريم الزعبي", en: "Dr. Reem Al-Zoubi" },
    role: { ar: "الرياضيات", en: "Mathematics" },
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    lastMessage: { ar: "أحسنتِ يا ليلى، واصلي!", en: "Well done Leila, keep it up!" },
    time: "10:30",
    unread: 1,
    type: "teacher",
  },
  {
    id: 2,
    name: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khatib" },
    role: { ar: "اللغة العربية", en: "Arabic" },
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    lastMessage: { ar: "لا تنسي واجب التعبير", en: "Don't forget the essay homework" },
    time: "9:15",
    unread: 0,
    type: "teacher",
  },
  {
    id: 3,
    name: { ar: "أ. فادي العموش", en: "Mr. Fadi Al-Amoush" },
    role: { ar: "العلوم", en: "Science" },
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80",
    lastMessage: { ar: "التقرير كان ممتازاً", en: "The report was excellent" },
    time: "أمس",
    unread: 0,
    type: "teacher",
  },
  {
    id: 4,
    name: { ar: "Ms. Emily Carter", en: "Ms. Emily Carter" },
    role: { ar: "اللغة الإنجليزية", en: "English" },
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80",
    lastMessage: { ar: "Great work on the essay!", en: "Great work on the essay!" },
    time: "أمس",
    unread: 0,
    type: "teacher",
  },
  {
    id: 5,
    name: { ar: "مجموعة الصف ٦-أ", en: "Class 6-A Group" },
    role: { ar: "مجموعة", en: "Group" },
    avatar: "",
    lastMessage: { ar: "من عنده ملخص العلوم؟", en: "Anyone have the science summary?" },
    time: "11:00",
    unread: 3,
    type: "group",
  },
  {
    id: 6,
    name: { ar: "إعلانات المدرسة", en: "School Announcements" },
    role: { ar: "إعلانات", en: "Announcements" },
    avatar: "",
    lastMessage: { ar: "عطلة يوم الأحد القادم", en: "Holiday next Sunday" },
    time: "8:00",
    unread: 1,
    type: "announcement",
  },
];

const initialMessages: ChatMessage[] = [
  {
    from: "other",
    text: {
      ar: "صباح الخير يا ليلى! كيف حالك؟ أريد أن أسألك عن واجب الكسور.",
      en: "Good morning Leila! How are you? I wanted to ask about the fractions homework.",
    },
    time: "10:15",
  },
  {
    from: "student",
    text: {
      ar: "صباح النور يا دكتورة! أنا بخير الحمد لله. الواجب كان صعب شوي، خصوصاً السؤال الخامس.",
      en: "Good morning! I'm fine, thanks. The homework was a bit hard, especially question 5.",
    },
    time: "10:18",
  },
  {
    from: "other",
    text: {
      ar: "السؤال الخامس عن تبسيط الكسور. تذكّري أن تقسمي البسط والمقام على العامل المشترك الأكبر. جرّبي مرة ثانية.",
      en: "Question 5 is about simplifying fractions. Remember to divide the numerator and denominator by the greatest common factor. Try again.",
    },
    time: "10:22",
  },
  {
    from: "student",
    text: {
      ar: "أها فهمت! طيب حاولت وطلع الجواب ٣/٤. هل هذا صحيح؟",
      en: "Oh I see! OK I tried and got 3/4. Is that correct?",
    },
    time: "10:25",
  },
  {
    from: "other",
    text: {
      ar: "أحسنتِ يا ليلى، واصلي! الجواب صحيح. ممتازة!",
      en: "Well done Leila, keep it up! The answer is correct. Excellent!",
    },
    time: "10:30",
  },
];

export default function StudentMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [selected, setSelected] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;

    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;

    setMessages((prev) => [
      ...prev,
      { from: "student", text: { ar: text, en: text }, time },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const activeContact = contacts[selected];

  const h1Class = isRTL
    ? "font-arabic-display text-xl font-bold text-[var(--color-navy)] mb-4 leading-[1.4]"
    : "font-serif text-xl font-bold text-[var(--color-navy)] mb-4";

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Contact sidebar */}
      <div className="w-80 lg:w-96 bg-white border-e border-[var(--color-border)] flex flex-col">
        <div className="p-5 border-b border-[var(--color-border)]">
          <h1 className={h1Class}>
            {locale === "ar" ? "الرسائل" : "Messages"}
          </h1>
          <div className="flex items-center gap-2 bg-[var(--color-cream)] px-3 py-2">
            <Search className="w-4 h-4 text-[var(--color-ink-soft)]" />
            <input
              type="text"
              placeholder={locale === "ar" ? "بحث..." : "Search..."}
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {contacts.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setSelected(i)}
              className={`w-full p-4 flex items-start gap-3 text-start border-b border-[var(--color-border-soft)] transition-colors ${
                selected === i
                  ? "bg-[var(--color-cream)]"
                  : "hover:bg-[var(--color-cream)]/50"
              }`}
            >
              <div className="relative shrink-0">
                {c.type === "teacher" ? (
                  <div
                    className="w-11 h-11 rounded-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${c.avatar}')` }}
                  />
                ) : c.type === "group" ? (
                  <div className="w-11 h-11 rounded-full bg-[var(--color-navy)] flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                    <Megaphone className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="font-semibold text-sm text-[var(--color-navy)] truncate">
                    {c.name[locale]}
                  </div>
                  <div className="text-[10px] text-[var(--color-ink-soft)] shrink-0 num">
                    {c.time}
                  </div>
                </div>
                <div className="text-[10px] tracking-wider text-[var(--color-gold)] mb-0.5">
                  {c.role[locale]}
                </div>
                <div className="text-xs text-[var(--color-ink-soft)] truncate">
                  {c.lastMessage[locale]}
                </div>
              </div>
              {c.unread > 0 && (
                <div className="shrink-0 w-5 h-5 rounded-full bg-[var(--color-gold)] text-white text-[10px] font-bold flex items-center justify-center num">
                  {c.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-[var(--color-cream)] flex flex-col min-w-0">
        {/* Chat header */}
        <div className="bg-white border-b border-[var(--color-border)] p-5 flex items-center gap-4">
          {activeContact.type === "teacher" ? (
            <div
              className="w-11 h-11 rounded-full bg-cover bg-center shrink-0"
              style={{ backgroundImage: `url('${activeContact.avatar}')` }}
            />
          ) : activeContact.type === "group" ? (
            <div className="w-11 h-11 rounded-full bg-[var(--color-navy)] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full bg-[var(--color-gold)] flex items-center justify-center shrink-0">
              <Megaphone className="w-5 h-5 text-white" />
            </div>
          )}
          <div className="flex-1">
            <div
              className={`text-lg font-bold text-[var(--color-navy)] ${
                isRTL ? "font-arabic-display" : "font-serif"
              }`}
            >
              {activeContact.name[locale]}
            </div>
            <div className="text-xs text-[var(--color-gold)] tracking-wider">
              {activeContact.role[locale]}
              {activeContact.type === "teacher" && (
                <span className="text-[var(--color-ink-soft)]">
                  {" "}
                  · {locale === "ar" ? "متصل" : "Online"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {selected === 0 ? (
            <>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex ${
                    msg.from === "student" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[65%] p-4 ${
                      msg.from === "student"
                        ? "bg-[var(--color-navy)] text-white"
                        : "bg-white border border-[var(--color-border)]"
                    }`}
                  >
                    <p
                      className={`text-sm ${
                        isRTL ? "leading-[2]" : "leading-relaxed"
                      } ${
                        msg.from === "student"
                          ? "text-white"
                          : "text-[var(--color-ink)]"
                      }`}
                    >
                      {msg.text[locale]}
                    </p>
                    <div
                      className={`text-[10px] mt-2 num ${
                        msg.from === "student"
                          ? "text-white/50"
                          : "text-[var(--color-ink-soft)]"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-[var(--color-ink-soft)]">
              <MessageSquare className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">
                {locale === "ar"
                  ? "اختاري محادثة لعرضها"
                  : "Select a conversation to view"}
              </p>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-[var(--color-border)] p-4 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              locale === "ar" ? "اكتبي رسالتك..." : "Type your message..."
            }
            className="flex-1 px-4 py-3 bg-[var(--color-cream)] focus:outline-none focus:bg-white transition-colors text-sm"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className={`w-4 h-4 ${isRTL ? "-scale-x-100" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
