"use client";

import { motion, useTransform } from "framer-motion";
import { useMagneticCursor } from "@/hooks/useMagneticCursor";

// ============================================
// Magnetic Cursor — كرسور مخصص سينمائي
// دائرة بتتبع الماوس + بتكبر عند hover
// ملاحظة: بختفي على الموبايل تلقائياً
// ============================================
export default function MagneticCursor() {
  const { x, y, isHovering } = useMagneticCursor();

  // حجم الكرسور — بتكبر عند hover
  const size = useTransform(isHovering, [0, 1], [12, 48]);
  const opacity = useTransform(isHovering, [0, 1], [0.5, 0.15]);

  return (
    <>
      {/* الكرسور الرئيسي — النقطة */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden lg:block rounded-full bg-white mix-blend-difference"
        style={{
          x,
          y,
          width: size,
          height: size,
          translateX: "-50%",
          translateY: "-50%",
          opacity,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* الحلقة الخارجية — بتتأخر شوي */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden lg:block rounded-full border border-white/20"
        style={{
          x,
          y,
          width: 40,
          height: 40,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
