"use client";

import { Phone, Clock, Mail } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

export default function TopBar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary["topBar"];
}) {
  return (
    <div className="bg-navy-dark text-white text-xs">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
        {/* Emergency */}
        <div className="flex items-center gap-2 text-rose font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose" />
          </span>
          <Phone className="w-3 h-3" />
          <span>{dict.emergency}</span>
          <a
            href="tel:065249036"
            className="text-white font-bold hover:underline"
            dir="ltr"
          >
            {dict.emergencyPhone}
          </a>
        </div>

        {/* Working hours + Email (hidden on small screens) */}
        <div className="hidden md:flex items-center gap-6 text-white/80">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {dict.workingHours}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3 h-3" />
            <a
              href={`mailto:${dict.email}`}
              className="hover:text-white transition-colors"
            >
              {dict.email}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
