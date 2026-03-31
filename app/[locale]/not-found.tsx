"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ============================================
// 404 Page — صفحة مش موجودة
// تصميم سينمائي مع glitch effect
// ============================================
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-primary)]/[0.05] rounded-full blur-[150px]" />

      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* الرقم الكبير */}
        <motion.h1
          className="text-[150px] md:text-[200px] font-display font-bold tracking-tighter leading-none text-white/[0.03]"
          animate={{ opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          404
        </motion.h1>

        {/* النص */}
        <div className="-mt-20">
          <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
            الصفحة غير موجودة
          </h2>
          <p className="text-base text-[var(--text-tertiary)] mb-8 font-body">
            يبدو أن هذه الصفحة غير موجودة أو تم نقلها.
          </p>

          <Link href="/">
            <motion.button
              className="px-8 py-3.5 rounded-full bg-white text-black text-sm font-medium font-body hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-shadow"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              العودة للرئيسية
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
