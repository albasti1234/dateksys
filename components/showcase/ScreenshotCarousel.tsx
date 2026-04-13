"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ScreenshotCarouselProps {
  screenshots: string[];
  alt: string;
}

export default function ScreenshotCarousel({ screenshots, alt }: ScreenshotCarouselProps) {
  const [current, setCurrent] = useState(0);
  const hasMultiple = screenshots.length > 1;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  useEffect(() => {
    if (!hasMultiple) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [hasMultiple, next]);

  return (
    <div className="relative w-full aspect-[16/10] overflow-hidden">
      {/* Progress bar */}
      {hasMultiple && (
        <div className="absolute top-0 left-0 right-0 z-10 h-0.5" style={{ background: "rgba(255,255,255,0.05)" }}>
          <motion.div
            key={current}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 4, ease: "linear" }}
            className="h-full origin-left"
            style={{ background: "#8B7BF4" }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <Image
            src={screenshots[current] || "/showcase/school-demo.png"}
            alt={`${alt} screenshot ${current + 1}`}
            fill
            sizes="800px"
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot navigation */}
      {hasMultiple && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className="w-1.5 h-1.5 rounded-full transition-all duration-200"
              style={{
                background: idx === current ? "#8B7BF4" : "rgba(240,237,230,0.3)",
                transform: idx === current ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
