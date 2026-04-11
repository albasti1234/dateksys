"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Upload, Send, Bot, User } from "lucide-react";

const quickSubjects = ["Mathematics", "Science", "English", "Arabic", "History", "Physics", "Chemistry"];

const exampleChat = [
  { from: "user", text: "My daughter is stuck on this algebra problem: Solve for x: 2x + 5 = 17" },
  { from: "ai", text: "Great question! Let me guide her through this step by step — I'll explain the approach without just giving the answer.\n\n**Step 1: Isolate the variable term**\nWe want to get 'x' alone on one side. Start by subtracting 5 from both sides:\n2x + 5 - 5 = 17 - 5\n2x = 12\n\n**Step 2: Solve for x**\nNow divide both sides by 2:\n2x ÷ 2 = 12 ÷ 2\nx = 6\n\n**How to check:** Substitute x = 6 back into the original: 2(6) + 5 = 12 + 5 = 17 ✓\n\n💡 **Tip for your daughter:** The key is to always do the same operation to both sides of the equation. What questions does she have about this approach?" },
];

export default function HomeworkHelperPage() {
  const [messages, setMessages] = useState(exampleChat);
  const [input, setInput] = useState("");

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
              <p className="section-label">AI Homework Helper</p>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-navy)]">
              Learning companion for your child
            </h1>
            <p className="text-sm text-[var(--color-ink-soft)] mt-1 max-w-2xl">
              Our AI guides students through problems step-by-step — it explains the approach rather than giving direct answers. Perfect for homework support.
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-cream)] border border-[var(--color-border)]">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">AI Online</span>
          </div>
        </div>
      </div>

      {/* Quick subjects */}
      <div className="bg-white border-b border-[var(--color-border)] px-6 lg:px-8 py-4 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          <span className="text-xs uppercase tracking-wider text-[var(--color-ink-soft)] me-2">Quick topics:</span>
          {quickSubjects.map((s) => (
            <button key={s} className="px-4 py-1.5 text-xs font-semibold bg-[var(--color-cream)] hover:bg-[var(--color-navy)] hover:text-white border border-[var(--color-border)] transition-all">{s}</button>
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
              <div className={`max-w-[75%] p-5 ${m.from === "user" ? "bg-[var(--color-navy)] text-white" : "bg-white border border-[var(--color-border)]"}`}>
                <p className={`text-sm leading-relaxed whitespace-pre-line ${m.from === "user" ? "text-white" : "text-[var(--color-ink)]"}`}>{m.text}</p>
              </div>
              {m.from === "user" && (
                <div className="w-10 h-10 shrink-0 rounded-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80')" }} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white border-t border-[var(--color-border)] p-5">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <button className="p-3 text-[var(--color-ink-soft)] hover:text-[var(--color-gold)] transition-colors" aria-label="Upload">
            <Upload className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question or describe the problem..."
            className="flex-1 px-5 py-3 bg-[var(--color-cream)] focus:outline-none focus:bg-white transition-colors text-sm"
          />
          <button className="p-3 bg-[var(--color-navy)] text-white hover:bg-[var(--color-navy-dark)] transition-colors" aria-label="Send">
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-[var(--color-ink-soft)] text-center mt-3 max-w-4xl mx-auto">
          AI responses are designed to guide learning, not replace it. Built with pedagogical safeguards.
        </p>
      </div>
    </div>
  );
}
