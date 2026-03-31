"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

// ============================================
// Lenis Provider — سكرول سلس سينمائي
// بعطي إحساس "buttery smooth" للسكرول
// ============================================
export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08, // سرعة التتبع — أقل = أسلس
        duration: 1.4, // مدة الـ animation
        smoothWheel: true,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
