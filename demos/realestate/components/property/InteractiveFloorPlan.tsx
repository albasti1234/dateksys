"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { FloorPlanRoom } from "@/lib/types";
import { fadeUp, viewport, SILK } from "@/lib/animations";

export default function InteractiveFloorPlan({
  locale,
  rooms,
  onRoomClick,
}: {
  locale: Locale;
  rooms: FloorPlanRoom[];
  onRoomClick?: (roomId: string) => void;
}) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  const totalArea = rooms.reduce((sum, r) => sum + r.area, 0);

  const handleClick = (roomId: string) => {
    setActiveRoom(roomId);
    onRoomClick?.(roomId);
  };

  return (
    <section className="py-24 lg:py-32 bg-surface-warm">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, ease: SILK }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">
              {isRTL ? "المخطط التفاعلي" : "INTERACTIVE FLOOR PLAN"}
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h2 className={fontHeading}>
              {isRTL ? "استكشف " : "Explore the "}
              <em className="italic text-gold">{isRTL ? "المساحات" : "Spaces"}</em>
            </h2>
            <p className="text-text-secondary text-sm">
              {totalArea}m² {isRTL ? "مساحة إجمالية" : "Total Living Space"}
            </p>
          </div>
        </motion.div>

        {/* Floor plan SVG */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewport}
          transition={{ duration: 0.8, ease: SILK }}
          className="bg-white p-8 lg:p-12 border border-border"
        >
          <svg viewBox="0 0 800 500" className="w-full" xmlns="http://www.w3.org/2000/svg">
            {/* Grid lines */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="800" height="500" fill="url(#grid)" />

            {rooms.map((room) => {
              const isActive = activeRoom === room.id;
              const isHovered = hoveredRoom === room.id;

              return (
                <g
                  key={room.id}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                  onClick={() => handleClick(room.id)}
                >
                  <path
                    d={room.path}
                    fill={isActive || isHovered ? "rgba(184,149,106,0.12)" : "rgba(0,0,0,0.01)"}
                    stroke={isActive ? "#B8956A" : isHovered ? "#B8956A" : "rgba(0,0,0,0.1)"}
                    strokeWidth={isActive ? 2.5 : isHovered ? 2 : 1}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Room labels */}
            {rooms.map((room) => {
              // Calculate center from path bounding box
              const coords = room.path.match(/[\d.]+/g)?.map(Number) || [];
              const xs = coords.filter((_, i) => i % 2 === 0);
              const ys = coords.filter((_, i) => i % 2 === 1);
              const cx = xs.length ? (Math.min(...xs) + Math.max(...xs)) / 2 : 0;
              const cy = ys.length ? (Math.min(...ys) + Math.max(...ys)) / 2 : 0;

              return (
                <g key={`label-${room.id}`} className="pointer-events-none">
                  <text
                    x={cx}
                    y={cy - 6}
                    textAnchor="middle"
                    className="text-[11px] font-medium"
                    fill={activeRoom === room.id ? "#B8956A" : "#3A3A3A"}
                  >
                    {room.label[locale]}
                  </text>
                  <text
                    x={cx}
                    y={cy + 10}
                    textAnchor="middle"
                    className="text-[9px]"
                    fill="#A0A0A0"
                  >
                    {room.area}m²
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* Room legend */}
        <div className="mt-8 flex flex-wrap gap-4">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => handleClick(room.id)}
              className={`px-4 py-2 text-[11px] tracking-wider uppercase transition-all ${
                activeRoom === room.id
                  ? "bg-gold text-white"
                  : "bg-white border border-border text-text-secondary hover:border-gold hover:text-gold"
              }`}
            >
              {room.label[locale]} · {room.area}m²
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
