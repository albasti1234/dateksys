"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const cards = [
  { id: 1, gradient: "from-[#4ADE80]/40 to-[#4ADE80]/10", top: "8%", right: "4%", rotate: -6, delay: 0, depth: 1.2 },
  { id: 2, gradient: "from-[#38BDF8]/40 to-[#38BDF8]/10", top: "28%", right: "18%", rotate: 4, delay: 0.8, depth: 0.8 },
  { id: 3, gradient: "from-[#A78BFA]/40 to-[#A78BFA]/10", top: "52%", right: "2%", rotate: -3, delay: 1.6, depth: 1.5 },
  { id: 4, gradient: "from-[#F97316]/40 to-[#F97316]/10", top: "72%", right: "14%", rotate: 5, delay: 2.4, depth: 0.6 },
];

export default function FloatingPreviewCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="hidden lg:block absolute inset-0 pointer-events-auto"
    >
      <style>{`
        @keyframes card-float-1 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes card-float-2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-16px); } }
        @keyframes card-float-3 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes card-float-4 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
      `}</style>
      {cards.map((card, idx) => {
        const tx = useTransform(mouseX, [-0.5, 0.5], [-12 * card.depth, 12 * card.depth]);
        const ty = useTransform(mouseY, [-0.5, 0.5], [-8 * card.depth, 8 * card.depth]);

        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 + card.delay * 0.15 }}
            style={{
              position: "absolute",
              top: card.top,
              right: card.right,
              rotate: card.rotate,
              x: tx,
              y: ty,
              animation: `card-float-${idx + 1} ${3 + idx * 0.5}s ease-in-out infinite`,
            }}
            className="w-[160px] lg:w-[180px]"
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}
            >
              {/* Mini browser chrome */}
              <div
                className="flex items-center gap-1.5 px-2.5 py-1.5 border-b"
                style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(20,20,28,0.6)" }}
              >
                <div className="flex gap-1">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FF5F57]/60" />
                  <div className="w-[6px] h-[6px] rounded-full bg-[#FEBC2E]/60" />
                  <div className="w-[6px] h-[6px] rounded-full bg-[#28C840]/60" />
                </div>
                <div
                  className="flex-1 ml-1 h-3.5 rounded"
                  style={{ background: "rgba(6,6,10,0.4)", border: "1px solid rgba(255,255,255,0.04)" }}
                />
              </div>
              {/* Gradient placeholder */}
              <div className={`h-[100px] bg-gradient-to-br ${card.gradient}`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
