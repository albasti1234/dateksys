"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { SILK } from "@/lib/animations";

export default function FilterBar({
  locale,
  dict,
  activeType,
  onTypeChange,
}: {
  locale: Locale;
  dict: Dictionary["properties"];
  activeType: string;
  onTypeChange: (type: string) => void;
}) {
  const filters = [
    { key: "all", label: dict.filterAll },
    { key: "villa", label: dict.filterVilla },
    { key: "apartment", label: dict.filterApartment },
    { key: "penthouse", label: dict.filterPenthouse },
    { key: "land", label: dict.filterLand },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: SILK }}
      className="flex flex-wrap gap-3"
    >
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onTypeChange(f.key)}
          className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
            activeType === f.key
              ? "bg-gold text-white"
              : "bg-transparent text-text-secondary border border-border hover:border-gold hover:text-gold"
          }`}
        >
          {f.label}
        </button>
      ))}
    </motion.div>
  );
}
