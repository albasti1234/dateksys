"use client";

import { use, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus,
  Users,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Search,
  X,
  Navigation,
} from "lucide-react";
import { getDictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";

type BusRoute = {
  id: string;
  routeName: { ar: string; en: string };
  driver: { ar: string; en: string };
  driverPhone: string;
  bus: string;
  students: number;
  capacity: number;
  areas: { ar: string; en: string }[];
  status: "active" | "inactive" | "maintenance";
  morningPickup: string;
  afternoonDrop: string;
};

const seedRoutes: BusRoute[] = [
  {
    id: "BUS-01",
    routeName: { ar: "خط أبو نصير - تلاع العلي", en: "Abu Nseir - Tla'a Al-Ali" },
    driver: { ar: "أبو محمد الزيود", en: "Abu Mohammad Al-Zyoud" },
    driverPhone: "+962 79 100 2001",
    bus: "H-4521",
    students: 32,
    capacity: 40,
    areas: [
      { ar: "أبو نصير", en: "Abu Nseir" },
      { ar: "شفا بدران", en: "Shafa Badran" },
      { ar: "تلاع العلي", en: "Tla'a Al-Ali" },
    ],
    status: "active",
    morningPickup: "6:30",
    afternoonDrop: "14:15",
  },
  {
    id: "BUS-02",
    routeName: { ar: "خط الصويفية - عبدون", en: "Sweifieh - Abdoun" },
    driver: { ar: "أبو أحمد الحوامدة", en: "Abu Ahmad Al-Hawamdeh" },
    driverPhone: "+962 77 200 3002",
    bus: "H-7832",
    students: 28,
    capacity: 40,
    areas: [
      { ar: "الصويفية", en: "Sweifieh" },
      { ar: "الشميساني", en: "Shmeisani" },
      { ar: "عبدون", en: "Abdoun" },
      { ar: "أم أذينة", en: "Um Uthaina" },
    ],
    status: "active",
    morningPickup: "6:45",
    afternoonDrop: "14:30",
  },
  {
    id: "BUS-03",
    routeName: { ar: "خط خلدا - الدوار السابع", en: "Khalda - 7th Circle" },
    driver: { ar: "أبو عمر المعايطة", en: "Abu Omar Al-Maaitah" },
    driverPhone: "+962 78 300 4003",
    bus: "H-2198",
    students: 35,
    capacity: 40,
    areas: [
      { ar: "خلدا", en: "Khalda" },
      { ar: "الجاردنز", en: "Gardens" },
      { ar: "الدوار السابع", en: "7th Circle" },
    ],
    status: "active",
    morningPickup: "6:30",
    afternoonDrop: "14:15",
  },
  {
    id: "BUS-04",
    routeName: { ar: "خط دابوق - الفحيص", en: "Dabouq - Fuheis" },
    driver: { ar: "أبو سامر القطاونة", en: "Abu Samer Al-Qatawneh" },
    driverPhone: "+962 79 400 5004",
    bus: "H-5467",
    students: 22,
    capacity: 35,
    areas: [
      { ar: "دابوق", en: "Dabouq" },
      { ar: "الفحيص", en: "Fuheis" },
      { ar: "ماركا", en: "Marj Al-Hamam" },
    ],
    status: "active",
    morningPickup: "6:15",
    afternoonDrop: "14:45",
  },
  {
    id: "BUS-05",
    routeName: { ar: "خط الجبيهة - صويلح", en: "Jubeiha - Sweileh" },
    driver: { ar: "أبو خالد الطوالبة", en: "Abu Khaled Al-Tawalbe" },
    driverPhone: "+962 77 500 6005",
    bus: "H-9013",
    students: 38,
    capacity: 40,
    areas: [
      { ar: "الجبيهة", en: "Jubeiha" },
      { ar: "صويلح", en: "Sweileh" },
      { ar: "طبربور", en: "Tabarbour" },
    ],
    status: "active",
    morningPickup: "6:20",
    afternoonDrop: "14:20",
  },
  {
    id: "BUS-06",
    routeName: { ar: "خط الرابية - دير غبار", en: "Rabieh - Deir Ghbar" },
    driver: { ar: "أبو يزن الحياري", en: "Abu Yazan Al-Hayari" },
    driverPhone: "+962 78 600 7006",
    bus: "H-3345",
    students: 18,
    capacity: 35,
    areas: [
      { ar: "الرابية", en: "Rabieh" },
      { ar: "دير غبار", en: "Deir Ghbar" },
      { ar: "الكرسي", en: "Al-Kursi" },
    ],
    status: "active",
    morningPickup: "6:40",
    afternoonDrop: "14:10",
  },
  {
    id: "BUS-07",
    routeName: { ar: "خط المقابلين - ماركا", en: "Muqabalein - Marka" },
    driver: { ar: "أبو فادي النوايسة", en: "Abu Fadi Al-Nawaiseh" },
    driverPhone: "+962 79 700 8007",
    bus: "H-6721",
    students: 0,
    capacity: 40,
    areas: [
      { ar: "المقابلين", en: "Muqabalein" },
      { ar: "ماركا الشمالية", en: "North Marka" },
    ],
    status: "inactive",
    morningPickup: "—",
    afternoonDrop: "—",
  },
  {
    id: "BUS-08",
    routeName: { ar: "خط الهاشمي الشمالي", en: "North Hashmi" },
    driver: { ar: "أبو حسين الحراحشة", en: "Abu Hussein Al-Harahsheh" },
    driverPhone: "+962 77 800 9008",
    bus: "H-1156",
    students: 0,
    capacity: 35,
    areas: [
      { ar: "الهاشمي الشمالي", en: "North Hashmi" },
      { ar: "الأشرفية", en: "Ashrafiyeh" },
    ],
    status: "maintenance",
    morningPickup: "—",
    afternoonDrop: "—",
  },
];

const statusFilters = [
  { key: "all" as const, ar: "الكل", en: "All" },
  { key: "active" as const, ar: "نشط", en: "Active" },
  { key: "inactive" as const, ar: "متوقف", en: "Inactive" },
  { key: "maintenance" as const, ar: "صيانة", en: "Maintenance" },
];

export default function AdminTransportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const isRTL = locale === "ar";

  const [filter, setFilter] = useState<"all" | "active" | "inactive" | "maintenance">("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const searchLower = search.toLowerCase().trim();
  const filtered = seedRoutes.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (searchLower) {
      const hay = (
        r.routeName.ar + " " + r.routeName.en + " " +
        r.driver.ar + " " + r.driver.en + " " +
        r.areas.map((a) => a.ar + " " + a.en).join(" ") + " " + r.bus
      ).toLowerCase();
      if (!hay.includes(searchLower)) return false;
    }
    return true;
  });

  const activeRoutes = seedRoutes.filter((r) => r.status === "active");
  const totalStudents = activeRoutes.reduce((s, r) => s + r.students, 0);
  const totalCapacity = seedRoutes.reduce((s, r) => s + r.capacity, 0);

  const h1Class = isRTL
    ? "font-arabic-display text-3xl md:text-4xl font-bold text-[var(--color-navy)] leading-[1.4]"
    : "font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]";

  const T = {
    title: { ar: "إدارة النقل المدرسي", en: "Transportation Management" },
    subtitle: { ar: "إدارة خطوط الباصات والسائقين", en: "Bus routes & driver management" },
    stats: {
      routes: { ar: "خطوط نشطة", en: "Active Routes" },
      students: { ar: "طلبة مسجّلون", en: "Registered Students" },
      buses: { ar: "إجمالي الباصات", en: "Total Buses" },
      occupancy: { ar: "نسبة الإشغال", en: "Occupancy Rate" },
    },
    search: { ar: "ابحث بالمنطقة أو السائق أو رقم الباص...", en: "Search by area, driver, or bus number..." },
    headers: {
      route: { ar: "الخط", en: "Route" },
      driver: { ar: "السائق", en: "Driver" },
      bus: { ar: "رقم الباص", en: "Bus #" },
      students: { ar: "الطلبة", en: "Students" },
      areas: { ar: "المناطق", en: "Areas" },
      schedule: { ar: "المواعيد", en: "Schedule" },
      status: { ar: "الحالة", en: "Status" },
    },
    statusLabel: {
      active: { ar: "نشط", en: "Active" },
      inactive: { ar: "متوقف", en: "Inactive" },
      maintenance: { ar: "صيانة", en: "Maintenance" },
    },
    morning: { ar: "صباحاً", en: "AM Pickup" },
    afternoon: { ar: "ظهراً", en: "PM Drop" },
    callDriver: { ar: "اتصل بالسائق", en: "Call Driver" },
    callingDriver: { ar: "جارٍ فتح الهاتف...", en: "Opening phone app..." },
    empty: { ar: "لا يوجد خطوط مطابقة", en: "No matching routes" },
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">{T.title[locale]}</p>
        <h1 className={h1Class}>{T.subtitle[locale]}</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard label={T.stats.routes[locale]} value={`${activeRoutes.length}`} color="#0F2C5C" icon={Bus} locale={locale} />
        <StatCard label={T.stats.students[locale]} value={`${totalStudents}`} color="#2D8659" icon={Users} locale={locale} />
        <StatCard label={T.stats.buses[locale]} value={`${seedRoutes.length}`} color="#C19A4B" icon={Bus} locale={locale} />
        <StatCard label={T.stats.occupancy[locale]} value={`${Math.round((totalStudents / totalCapacity) * 100)}%`} color="#4A90E2" icon={Navigation} locale={locale} />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[260px] flex items-center gap-2 bg-white border border-[var(--color-border)] px-4 py-3">
          <Search className="w-4 h-4 text-[var(--color-ink-soft)] shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={T.search[locale]}
            className="flex-1 bg-transparent focus:outline-none text-sm"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-[var(--color-ink-soft)] hover:text-[var(--color-navy)]">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Status tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
              filter === f.key
                ? "bg-[var(--color-navy)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-ink-soft)] hover:bg-[var(--color-cream)]"
            }`}
          >
            {f[locale]}
          </button>
        ))}
      </div>

      {/* Route cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full p-16 text-center text-[var(--color-ink-soft)] bg-white border border-[var(--color-border)]">
            {T.empty[locale]}
          </div>
        ) : (
          filtered.map((route, i) => {
            const pct = route.capacity > 0 ? Math.round((route.students / route.capacity) * 100) : 0;
            return (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-[var(--color-border)] p-6 hover:border-[var(--color-gold)] hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Bus className="w-5 h-5 text-[var(--color-gold)]" />
                      <h3 className={`text-lg font-bold text-[var(--color-navy)] ${isRTL ? "font-arabic-display" : "font-serif"}`}>
                        {route.routeName[locale]}
                      </h3>
                    </div>
                    <div className="text-xs text-[var(--color-ink-soft)] font-mono">{route.id} · {route.bus}</div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold tracking-wider ${
                      route.status === "active"
                        ? "bg-green-50 text-green-700"
                        : route.status === "maintenance"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {route.status === "active" && <CheckCircle2 className="w-3 h-3" />}
                    {route.status === "maintenance" && <AlertCircle className="w-3 h-3" />}
                    {T.statusLabel[route.status][locale]}
                  </span>
                </div>

                {/* Driver */}
                <div className="flex items-center gap-3 mb-4 p-3 bg-[var(--color-cream)]">
                  <div className="w-10 h-10 bg-[var(--color-navy)] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[var(--color-gold)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[var(--color-navy)] text-sm">{route.driver[locale]}</div>
                    <div className="text-xs text-[var(--color-ink-soft)] num">{route.driverPhone}</div>
                  </div>
                  <button
                    onClick={() => {
                      window.open(`tel:${route.driverPhone.replace(/\s/g, "")}`, "_self");
                      setToast(T.callingDriver[locale]);
                    }}
                    className="shrink-0 w-9 h-9 bg-[var(--color-gold)] flex items-center justify-center text-white hover:bg-[var(--color-gold-dark)] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                </div>

                {/* Areas */}
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[var(--color-gold)] shrink-0 mt-0.5" />
                  <div className="flex flex-wrap gap-1">
                    {route.areas.map((a) => (
                      <span key={a.en} className="inline-flex px-2 py-1 text-[10px] font-semibold bg-[var(--color-cream)] text-[var(--color-navy)]">
                        {a[locale]}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Schedule + Capacity */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                  <div className="text-xs text-[var(--color-ink-soft)]">
                    {route.status === "active" && (
                      <>
                        <span className="num">{route.morningPickup}</span> {T.morning[locale]} · <span className="num">{route.afternoonDrop}</span> {T.afternoon[locale]}
                      </>
                    )}
                  </div>
                  <div className="text-xs font-bold text-[var(--color-navy)] num">
                    {route.students}/{route.capacity}
                  </div>
                </div>
                {route.status === "active" && (
                  <div className="mt-2 h-2 bg-[var(--color-cream)] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className={`h-full ${pct > 90 ? "bg-red-500" : pct > 75 ? "bg-amber-500" : "bg-[#2D8659]"}`}
                    />
                  </div>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 start-1/2 -translate-x-1/2 z-[60] bg-[var(--color-navy)] text-white px-6 py-4 shadow-xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-[var(--color-gold)]" />
            <span className="font-semibold">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({
  label, value, color, icon: Icon, locale,
}: {
  label: string; value: string; color: string; icon: typeof Bus; locale: Locale;
}) {
  const isRTL = locale === "ar";
  return (
    <div className="bg-white p-6 border border-[var(--color-border)] relative overflow-hidden">
      <div className="absolute top-0 end-0 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: color }} />
      <div className="relative">
        <Icon className="w-5 h-5 mb-3" style={{ color }} />
        <div className={`text-4xl font-bold text-[var(--color-navy)] mb-1 ${isRTL ? "font-arabic-display" : "font-serif"}`}>{value}</div>
        <div className="text-[10px] tracking-wider font-semibold text-[var(--color-ink-soft)]">{label}</div>
      </div>
    </div>
  );
}
