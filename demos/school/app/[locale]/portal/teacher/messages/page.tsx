"use client";

import { use, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Search,
  Send,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

interface Contact {
  id: number;
  name: { ar: string; en: string };
  role: { ar: string; en: string };
  avatar: string;
  online: boolean;
  lastMsg: { ar: string; en: string };
  lastTime: string;
  unread: number;
}

interface Message {
  id: number;
  from: "teacher" | "contact";
  text: { ar: string; en: string };
  time: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: { ar: "ليلى الحوراني", en: "Leila Al-Hourani" },
    role: { ar: "ولية أمر طالبة", en: "Parent of student" },
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    online: true,
    lastMsg: {
      ar: "شكراً لك د. ريم، سأتابع الموضوع",
      en: "Thank you Dr. Reem, I'll follow up on this",
    },
    lastTime: "10:30",
    unread: 0,
  },
  {
    id: 2,
    name: { ar: "أ. لمى الخطيب", en: "Ms. Lama Al-Khateeb" },
    role: { ar: "زميلة - قسم اللغة العربية", en: "Colleague — Arabic Dept." },
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face",
    online: true,
    lastMsg: {
      ar: "هل حضرت اجتماع المنهج أمس؟",
      en: "Did you attend yesterday's curriculum meeting?",
    },
    lastTime: "9:15",
    unread: 1,
  },
  {
    id: 3,
    name: { ar: "الإدارة", en: "Administration" },
    role: { ar: "إدارة المدرسة", en: "School Admin" },
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&crop=face",
    online: false,
    lastMsg: {
      ar: "يرجى تسليم ملفات الاعتماد قبل الخميس",
      en: "Please submit accreditation files before Thursday",
    },
    lastTime: "Yesterday",
    unread: 2,
  },
  {
    id: 4,
    name: { ar: "رانيا الحوراني", en: "Rania Al-Hourani" },
    role: { ar: "ولية أمر - نور الحوراني", en: "Parent — Nour Al-Hourani" },
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
    online: false,
    lastMsg: {
      ar: "كيف مستوى نور في الرياضيات هذا الفصل؟",
      en: "How is Nour doing in math this semester?",
    },
    lastTime: "Yesterday",
    unread: 0,
  },
  {
    id: 5,
    name: { ar: "قسم تقنية المعلومات", en: "IT Department" },
    role: { ar: "الدعم الفني", en: "Technical Support" },
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    online: true,
    lastMsg: {
      ar: "تم تسجيل طلب صيانة السبورة الذكية",
      en: "Smartboard maintenance request has been logged",
    },
    lastTime: "Apr 10",
    unread: 0,
  },
];

const chatMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      from: "contact",
      text: {
        ar: "السلام عليكم د. ريم، أردت الاستفسار عن علامات ليلى في اختبار الرياضيات الأخير.",
        en: "Hello Dr. Reem, I wanted to ask about Leila's grades on the last math test.",
      },
      time: "10:05",
    },
    {
      id: 2,
      from: "teacher",
      text: {
        ar: "وعليكم السلام. ليلى حصلت على ٨٥ من ١٠٠، وهي نتيجة جيدة جداً. تحتاج فقط لتحسين في الكسور العشرية.",
        en: "Hello. Leila scored 85/100, which is very good. She just needs improvement in decimal fractions.",
      },
      time: "10:12",
    },
    {
      id: 3,
      from: "contact",
      text: {
        ar: "هل تنصحين بتمارين إضافية في المنزل؟",
        en: "Do you recommend extra exercises at home?",
      },
      time: "10:20",
    },
    {
      id: 4,
      from: "teacher",
      text: {
        ar: "نعم، سأرسل لكِ ورقة عمل إضافية عبر المنصة اليوم. يمكنها التدرب ٢٠ دقيقة يومياً.",
        en: "Yes, I'll send you an extra worksheet through the platform today. She can practice 20 minutes daily.",
      },
      time: "10:25",
    },
    {
      id: 5,
      from: "contact",
      text: {
        ar: "شكراً لك د. ريم، سأتابع الموضوع",
        en: "Thank you Dr. Reem, I'll follow up on this",
      },
      time: "10:30",
    },
  ],
  2: [
    {
      id: 1,
      from: "contact",
      text: {
        ar: "صباح الخير د. ريم، هل حضرت اجتماع المنهج أمس؟",
        en: "Good morning Dr. Reem, did you attend yesterday's curriculum meeting?",
      },
      time: "9:00",
    },
    {
      id: 2,
      from: "teacher",
      text: {
        ar: "صباح النور أ. لمى. نعم حضرت، تم مناقشة تحديث المنهج للفصل القادم.",
        en: "Good morning Ms. Lama. Yes I did, we discussed updating the curriculum for next semester.",
      },
      time: "9:10",
    },
    {
      id: 3,
      from: "contact",
      text: {
        ar: "هل تغيّر شيء بخصوص التقييم المشترك بين الأقسام؟",
        en: "Did anything change regarding the cross-department assessment?",
      },
      time: "9:15",
    },
  ],
  3: [
    {
      id: 1,
      from: "contact",
      text: {
        ar: "تذكير: يرجى من جميع المعلمين تسليم ملفات الاعتماد الأكاديمي قبل يوم الخميس.",
        en: "Reminder: All teachers must submit academic accreditation files before Thursday.",
      },
      time: "Yesterday",
    },
    {
      id: 2,
      from: "contact",
      text: {
        ar: "يرجى تسليم ملفات الاعتماد قبل الخميس",
        en: "Please submit accreditation files before Thursday",
      },
      time: "Yesterday",
    },
  ],
  4: [
    {
      id: 1,
      from: "contact",
      text: {
        ar: "مساء الخير، كيف مستوى نور في الرياضيات هذا الفصل؟",
        en: "Good evening, how is Nour doing in math this semester?",
      },
      time: "Yesterday",
    },
    {
      id: 2,
      from: "teacher",
      text: {
        ar: "مساء النور. نور طالبة مجتهدة، مستواها ممتاز. تحسّنت كثيراً في حل المسائل الكلامية.",
        en: "Good evening. Nour is a diligent student, her level is excellent. She has improved a lot in word problems.",
      },
      time: "Yesterday",
    },
  ],
  5: [
    {
      id: 1,
      from: "teacher",
      text: {
        ar: "السلام عليكم، السبورة الذكية في قاعة ٢٠٣ لا تعمل بشكل صحيح منذ يومين.",
        en: "Hello, the smartboard in Room 203 hasn't been working properly for two days.",
      },
      time: "Apr 10",
    },
    {
      id: 2,
      from: "contact",
      text: {
        ar: "تم تسجيل طلب صيانة السبورة الذكية. سيحضر فني خلال يومي عمل.",
        en: "Smartboard maintenance request has been logged. A technician will visit within two business days.",
      },
      time: "Apr 10",
    },
  ],
};

export default function MessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const isRTL = locale === "ar";

  const [activeContact, setActiveContact] = useState(1);
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [localMessages, setLocalMessages] = useState(chatMessages);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeContact, localMessages]);

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  const T = {
    label: { ar: "الرسائل", en: "Messages" },
    subtitle: {
      ar: "تواصل مع أولياء الأمور والزملاء",
      en: "Communicate with parents and colleagues",
    },
    searchPlaceholder: { ar: "بحث في المحادثات...", en: "Search conversations..." },
    inputPlaceholder: { ar: "اكتب رسالتك...", en: "Type your message..." },
    online: { ar: "متصل", en: "Online" },
    offline: { ar: "غير متصل", en: "Offline" },
    back: { ar: "رجوع", en: "Back" },
  };

  const filteredContacts = search
    ? contacts.filter(
        (c) =>
          c.name[locale].toLowerCase().includes(search.toLowerCase()) ||
          c.role[locale].toLowerCase().includes(search.toLowerCase())
      )
    : contacts;

  const currentContact = contacts.find((c) => c.id === activeContact)!;
  const currentMessages = localMessages[activeContact] || [];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      from: "teacher",
      text: { ar: inputText, en: inputText },
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setLocalMessages((prev) => ({
      ...prev,
      [activeContact]: [...(prev[activeContact] || []), newMsg],
    }));
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <p className="section-label mb-3">{T.label[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </motion.div>

      {/* Two-pane layout */}
      <div className="border border-[var(--color-border)] bg-white flex h-[600px] overflow-hidden">
        {/* Left: contact list */}
        <div
          className={`w-full md:w-80 lg:w-96 border-e border-[var(--color-border)] flex flex-col shrink-0 ${
            showMobileChat ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Search */}
          <div className="p-4 border-b border-[var(--color-border)]">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={T.searchPlaceholder[locale]}
                className="w-full ps-10 pe-4 py-2.5 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none text-sm transition-colors"
              />
            </div>
          </div>

          {/* Contact list */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveContact(c.id);
                  setShowMobileChat(true);
                }}
                className={`w-full p-4 flex items-center gap-3 text-start border-b border-[var(--color-border)] transition-colors ${
                  activeContact === c.id
                    ? "bg-[var(--color-cream)]"
                    : "hover:bg-[var(--color-cream)]"
                }`}
              >
                <div className="relative shrink-0">
                  <div
                    className="w-11 h-11 rounded-full bg-cover bg-center border border-[var(--color-border)]"
                    style={{ backgroundImage: `url('${c.avatar}')` }}
                  />
                  {c.online && (
                    <div className="absolute bottom-0 end-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-[var(--color-navy)] truncate">
                      {c.name[locale]}
                    </span>
                    <span className="text-[10px] text-[var(--color-ink-soft)] num shrink-0">
                      {c.lastTime}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)] truncate mt-0.5">
                    {c.role[locale]}
                  </div>
                  <div className="text-xs text-[var(--color-ink-soft)] truncate mt-1">
                    {c.lastMsg[locale]}
                  </div>
                </div>
                {c.unread > 0 && (
                  <div className="w-5 h-5 bg-[var(--color-gold)] text-white text-[10px] font-bold flex items-center justify-center rounded-full shrink-0 num">
                    {c.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: chat area */}
        <div
          className={`flex-1 flex flex-col ${
            showMobileChat ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Chat header */}
          <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
            <button
              onClick={() => setShowMobileChat(false)}
              className="md:hidden p-1"
            >
              {isRTL ? (
                <ArrowRight className="w-5 h-5 text-[var(--color-navy)]" />
              ) : (
                <ArrowLeft className="w-5 h-5 text-[var(--color-navy)]" />
              )}
            </button>
            <div
              className="w-10 h-10 rounded-full bg-cover bg-center border border-[var(--color-border)]"
              style={{ backgroundImage: `url('${currentContact.avatar}')` }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[var(--color-navy)] text-sm">
                {currentContact.name[locale]}
              </div>
              <div className="text-[10px] text-[var(--color-ink-soft)] flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentContact.online ? "bg-emerald-500" : "bg-gray-300"
                  }`}
                />
                {currentContact.online
                  ? T.online[locale]
                  : T.offline[locale]}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--color-cream)]">
            {currentMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex ${
                  msg.from === "teacher" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 text-sm ${
                    isRTL ? "leading-[2]" : "leading-relaxed"
                  } ${
                    msg.from === "teacher"
                      ? "bg-[var(--color-navy)] text-white"
                      : "bg-white border border-[var(--color-border)] text-[var(--color-ink)]"
                  }`}
                >
                  <p>{msg.text[locale]}</p>
                  <div
                    className={`text-[10px] mt-1 num ${
                      msg.from === "teacher"
                        ? "text-white/60"
                        : "text-[var(--color-ink-soft)]"
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[var(--color-border)] flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={T.inputPlaceholder[locale]}
              className="flex-1 px-4 py-3 bg-[var(--color-cream)] border border-[var(--color-border)] focus:border-[var(--color-gold)] focus:outline-none text-sm transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-11 h-11 bg-[var(--color-navy)] flex items-center justify-center text-white hover:bg-[var(--color-navy)]/90 transition-colors disabled:opacity-40"
            >
              <Send
                className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
