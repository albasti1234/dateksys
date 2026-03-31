"use client";

import { motion } from "framer-motion";

export default function ScrollIndicator({ label = "Scroll" }: { label?: string }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <div className="relative w-6 h-10 rounded-full border-2 border-border flex items-start justify-center p-1.5">
        <motion.div
          className="w-1 h-2 rounded-full bg-accent"
          animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted font-body">
        {label}
      </span>
    </motion.div>
  );
}
