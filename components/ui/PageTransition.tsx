"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// ============================================
// Page Transition — انتقال سينمائي بين الصفحات
// Fade + slide up مع overlay sweep
// ============================================
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname}>
        {/* Overlay — شريط بينزل ويطلع */}
        <motion.div
          className="fixed inset-0 z-[9999] bg-[var(--bg-primary)]"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ transformOrigin: "top" }}
        />

        {/* المحتوى — fade + slide up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
