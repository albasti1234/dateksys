"use client";
import { type ReactNode } from "react";

interface BrowserFrameProps {
  url?: string;
  children: ReactNode;
  className?: string;
}

export default function BrowserFrame({ url = "dateksys.com", children, className = "" }: BrowserFrameProps) {
  return (
    <div className={`rounded-xl overflow-hidden ${className}`} style={{ border: "1px solid rgba(255,255,255,0.05)", background: "#0C0C12" }}>
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: "rgba(20,20,28,0.8)", backdropFilter: "blur(8px)", borderColor: "rgba(255,255,255,0.05)" }}>
        <div className="flex gap-1.5">
          <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#FEBC2E]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 ml-3 px-3 py-1 rounded-md" style={{ background: "rgba(6,6,10,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-[10px] font-mono" style={{ color: "rgba(240,237,230,0.25)" }}>
            {url}
          </span>
        </div>
      </div>
      {/* Content */}
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
