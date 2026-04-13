"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { categories, type ProjectCategory } from "@/lib/projects";

interface FilterBarProps {
  active: ProjectCategory | "all";
  onChange: (value: ProjectCategory | "all") => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [200, 400], [0, 1]);

  return (
    <motion.div
      ref={ref}
      className="sticky top-0 z-40 py-4"
      style={{ backdropFilter: "blur(16px)" }}
    >
      {/* Background that fades in on scroll */}
      <motion.div
        className="absolute inset-0 border-b"
        style={{
          opacity: bgOpacity,
          background: "rgba(6,6,10,0.8)",
          borderColor: "rgba(255,255,255,0.05)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1 justify-start md:justify-center">
          {categories.map((cat) => {
            const isActive = active === cat.value;
            return (
              <motion.button
                key={cat.value}
                onClick={() => onChange(cat.value)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-colors"
                style={{
                  background: isActive
                    ? `${cat.color || "rgba(139,123,244,1)"}14`
                    : "rgba(255,255,255,0.03)",
                  border: isActive
                    ? `1px solid ${cat.color || "#8B7BF4"}50`
                    : "1px solid rgba(255,255,255,0.06)",
                  color: isActive
                    ? cat.color || "#8B7BF4"
                    : "rgba(240,237,230,0.5)",
                  fontFamily: "var(--font-dm-sans)",
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `${cat.color || "#8B7BF4"}08`,
                      border: `1px solid ${cat.color || "#8B7BF4"}30`,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {cat.color && (
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: cat.color }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
