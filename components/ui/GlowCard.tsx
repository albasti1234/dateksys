"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`card relative overflow-hidden ${className}`}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
    >
      {/* Spotlight glow */}
      <div
        className="pointer-events-none absolute transition-opacity duration-500"
        style={{
          left: position.x - 200,
          top: position.y - 200,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--color-accent-dim) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[20px] transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--color-accent-dim), transparent 40%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}