"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { Bus, MapPin, Clock, Phone, Navigation2, CheckCircle2 } from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

export default function BusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const b = dict.portals.parent.bus;
  const isRTL = locale === "ar";

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";
  const cardTitleClass = isRTL
    ? "font-arabic-display text-lg font-bold text-[var(--color-navy)]"
    : "font-serif text-lg font-bold text-[var(--color-navy)]";
  const bigETAClass = isRTL
    ? "font-arabic-display text-5xl md:text-6xl font-bold gold-text"
    : "font-serif text-7xl font-bold gold-text";

  const driverAvatar =
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80";

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{b.hero.title}</p>
        <h1 className={h1Class}>{b.hero.subtitle}</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">{b.hero.note}</p>
      </div>

      {/* ETA banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-navy)] text-white p-8 mb-8 relative overflow-hidden"
      >
        <div
          className="absolute top-0 end-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10"
          style={{ background: "#C19A4B" }}
        />
        <div className="absolute top-0 start-0 w-20 h-20 border-t-2 border-s-2 border-[var(--color-gold)]" />
        <div className="relative grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs tracking-widest text-green-400">
                Live
              </span>
            </div>
            <p className="text-xs tracking-widest text-[var(--color-gold)] mb-2">
              {b.arrival.label}
            </p>
            <div className={bigETAClass}>{b.arrival.minutes}</div>
            <p className="text-sm text-white/70 mt-2">{b.arrival.location}</p>
          </div>
          <div className="bg-white/5 p-6 border-s-2 border-[var(--color-gold)]">
            <p className="text-xs tracking-wider text-[var(--color-gold-light)] mb-3">
              {b.details.title}
            </p>
            <div className="space-y-2 text-sm">
              {b.details.items.map((item) => (
                <div key={item.label}>
                  {item.label}:{" "}
                  <span className="font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div
          className="lg:col-span-2 bg-white border border-[var(--color-border)] overflow-hidden relative"
          style={{ minHeight: 500 }}
        >
          <div className="absolute inset-0 bg-[var(--color-cream)]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(#E8E4D8 1px, transparent 1px), linear-gradient(90deg, #E8E4D8 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="absolute top-1/4 left-0 right-0 h-1 bg-[var(--color-border)] opacity-60" />
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-[var(--color-border)] opacity-60" />
            <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-[var(--color-border)] opacity-60" />
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-[var(--color-border)] opacity-60" />

            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 500"
              preserveAspectRatio="none"
            >
              <path
                d="M 100 50 Q 200 120 250 200 T 350 300 T 480 420"
                stroke="#C19A4B"
                strokeWidth="4"
                strokeDasharray="8,4"
                fill="none"
              />
            </svg>

            {/* School marker */}
            <div className="absolute top-[10%] left-[16%] flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-[var(--color-forest)] border-2 border-white shadow-lg" />
              <div className="text-[10px] font-semibold mt-1 bg-white px-2 py-0.5 shadow">
                {b.timeline.stops[0].name}
              </div>
            </div>

            {/* Current bus position */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-[52%] left-[56%] flex flex-col items-center"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[var(--color-gold)] animate-ping" />
                <div className="relative w-12 h-12 rounded-full bg-[var(--color-gold)] flex items-center justify-center shadow-xl">
                  <Bus className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Home marker */}
            <div className="absolute bottom-[10%] right-[12%] flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[var(--color-navy)] border-2 border-white shadow-lg flex items-center justify-center">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <div className="text-[10px] font-semibold mt-1 bg-white px-2 py-0.5 shadow">
                {b.timeline.stops[b.timeline.stops.length - 1].name}
              </div>
            </div>
          </div>

          <div className="absolute top-4 end-4 bg-white shadow-lg">
            <button
              className="block p-3 border-b border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              className="block p-3 hover:bg-[var(--color-cream)]"
              aria-label="Zoom out"
            >
              −
            </button>
          </div>
        </div>

        {/* Timeline + driver */}
        <div className="space-y-6">
          <div className="bg-white border border-[var(--color-border)] p-6">
            <p className="text-xs tracking-wider text-[var(--color-gold)] mb-3">
              {b.driver.title}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-[var(--color-gold)] shrink-0"
                style={{ backgroundImage: `url('${driverAvatar}')` }}
              />
              <div>
                <div
                  className={`text-lg font-bold text-[var(--color-navy)] ${
                    isRTL ? "font-arabic-display" : "font-serif"
                  }`}
                >
                  {b.driver.name}
                </div>
                <div className="text-xs text-[var(--color-gold)] font-semibold">
                  ★ {b.driver.rating} · {b.driver.experience}
                </div>
              </div>
            </div>
            <button className="w-full btn-outline !py-3 text-xs">
              <Phone className="w-4 h-4" />
              {b.driver.callLabel}
            </button>
          </div>

          <div className="bg-white border border-[var(--color-border)] p-6">
            <h3 className={`${cardTitleClass} mb-5`}>{b.timeline.title}</h3>
            <div className="relative">
              <div className="absolute start-2.5 top-2 bottom-2 w-0.5 bg-[var(--color-border)]" />
              {b.timeline.stops.map((r) => (
                <div key={r.name} className="relative ps-8 pb-5 last:pb-0">
                  <div
                    className={`absolute start-0 top-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                      r.status === "done"
                        ? "bg-green-600"
                        : r.status === "current"
                          ? "bg-[var(--color-gold)] animate-pulse"
                          : "bg-[var(--color-border)]"
                    }`}
                  >
                    {r.status === "done" && (
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <div
                      className={`text-sm font-semibold ${
                        r.status === "current"
                          ? "text-[var(--color-gold)]"
                          : "text-[var(--color-navy)]"
                      }`}
                    >
                      {r.name}
                    </div>
                    <div className="text-xs text-[var(--color-ink-soft)] flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {r.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
