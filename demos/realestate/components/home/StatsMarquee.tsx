"use client";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export default function StatsMarquee({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["home"]["stats"];
}) {
  const items = [
    { value: "250+", label: dict.properties },
    { value: "$2.4", label: dict.sales },
    { value: "15", label: dict.years },
    { value: "98%", label: dict.satisfaction },
  ];

  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-4 whitespace-nowrap">
      <span className="text-gold/20">◆</span>
      <span>
        {item.value} {item.label}
      </span>
    </span>
  ));

  return (
    <div className="py-8 overflow-hidden border-y border-border">
      <div
        className="flex gap-16 animate-marquee"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        <div className="flex gap-16 shrink-0 text-[clamp(1.5rem,3vw,2.5rem)] text-charcoal/[0.06] font-normal">
          {row}
        </div>
        <div className="flex gap-16 shrink-0 text-[clamp(1.5rem,3vw,2.5rem)] text-charcoal/[0.06] font-normal" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
