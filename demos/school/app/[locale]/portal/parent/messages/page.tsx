"use client";

import { motion } from "framer-motion";
import { Search, Send, Paperclip, MoreVertical } from "lucide-react";
import { useState } from "react";

const conversations = [
  { id: 1, name: "Dr. James Wilson", role: "Mathematics Teacher", avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80", lastMessage: "Leila did exceptionally well on her algebra test. Congratulations!", time: "2h ago", unread: 2, online: true },
  { id: 2, name: "Ms. Lina Haddad", role: "English Literature", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", lastMessage: "Could we schedule a brief call to discuss her essay?", time: "5h ago", unread: 1, online: false },
  { id: 3, name: "Principal's Office", role: "Administration", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80", lastMessage: "Reminder: Parent-Teacher Conference on April 15th", time: "1d ago", unread: 0, online: true },
  { id: 4, name: "Dr. Amira Saleh", role: "Arabic Teacher", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", lastMessage: "Thank you for attending the reading session.", time: "2d ago", unread: 0, online: false },
  { id: 5, name: "School Nurse", role: "Health Office", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80", lastMessage: "Leila's annual health check is complete.", time: "3d ago", unread: 0, online: true },
];

const messages = [
  { from: "them", text: "Hi Rania, I wanted to personally reach out regarding Leila's performance in our recent algebra unit.", time: "10:15 AM" },
  { from: "them", text: "She's been showing remarkable improvement and dedication. Her problem-solving approach is really impressive.", time: "10:16 AM" },
  { from: "me", text: "Thank you so much for letting me know, Dr. Wilson. We've been working on her confidence in math at home.", time: "10:32 AM" },
  { from: "them", text: "It shows! Leila did exceptionally well on her algebra test. Congratulations! I've attached a copy of her graded test for your review.", time: "12:45 PM" },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(1);

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Sidebar — conversations list */}
      <div className="w-96 bg-white border-e border-[var(--color-border)] flex flex-col">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h1 className="font-serif text-2xl font-bold text-[var(--color-navy)] mb-4">Messages</h1>
          <div className="flex items-center gap-2 bg-[var(--color-cream)] px-4 py-2.5">
            <Search className="w-4 h-4 text-[var(--color-ink-soft)]" />
            <input type="text" placeholder="Search conversations..." className="flex-1 bg-transparent text-sm focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full p-4 flex items-start gap-3 text-start border-b border-[var(--color-border-soft)] transition-colors ${selected === c.id ? "bg-[var(--color-cream)]" : "hover:bg-[var(--color-cream)]/50"}`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url('${c.avatar}')` }} />
                {c.online && <div className="absolute bottom-0 end-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-semibold text-sm text-[var(--color-navy)] truncate">{c.name}</div>
                  <div className="text-[10px] text-[var(--color-ink-soft)] shrink-0">{c.time}</div>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[var(--color-gold)] mb-1">{c.role}</div>
                <div className="text-xs text-[var(--color-ink-soft)] truncate">{c.lastMessage}</div>
              </div>
              {c.unread > 0 && <div className="shrink-0 w-5 h-5 rounded-full bg-[var(--color-gold)] text-white text-[10px] font-bold flex items-center justify-center">{c.unread}</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 bg-[var(--color-cream)] flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-[var(--color-border)] p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&q=80')" }} />
          <div className="flex-1">
            <div className="font-serif text-lg font-bold text-[var(--color-navy)]">Dr. James Wilson</div>
            <div className="text-xs text-[var(--color-gold)] uppercase tracking-wider">Mathematics Teacher · Online</div>
          </div>
          <button className="p-2 text-[var(--color-ink-soft)]"><MoreVertical className="w-5 h-5" /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[60%] p-4 ${m.from === "me" ? "bg-[var(--color-navy)] text-white" : "bg-white border border-[var(--color-border)]"}`}>
                <p className={`text-sm leading-relaxed ${m.from === "me" ? "text-white" : "text-[var(--color-ink)]"}`}>{m.text}</p>
                <div className={`text-[10px] mt-2 ${m.from === "me" ? "text-white/50" : "text-[var(--color-ink-soft)]"}`}>{m.time}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-[var(--color-border)] p-4 flex items-center gap-3">
          <button className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-gold)]"><Paperclip className="w-5 h-5" /></button>
          <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-3 bg-[var(--color-cream)] focus:outline-none focus:bg-white transition-colors text-sm" />
          <button className="p-3 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)] transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
