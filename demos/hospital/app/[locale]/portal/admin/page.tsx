"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CalendarDays,
  DollarSign,
  BedDouble,
  Clock,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { departments, doctors } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4 },
  }),
};

const weeklyData = [
  { day: "Mon", dayAr: "الاثنين", appointments: 28, revenue: 4200 },
  { day: "Tue", dayAr: "الثلاثاء", appointments: 35, revenue: 5100 },
  { day: "Wed", dayAr: "الأربعاء", appointments: 42, revenue: 6400 },
  { day: "Thu", dayAr: "الخميس", appointments: 31, revenue: 4800 },
  { day: "Fri", dayAr: "الجمعة", appointments: 12, revenue: 1500 },
  { day: "Sat", dayAr: "السبت", appointments: 25, revenue: 3800 },
  { day: "Sun", dayAr: "الأحد", appointments: 30, revenue: 4500 },
];

const todayAppointments = [
  { time: "08:30", patient: { ar: "أحمد الخالدي", en: "Ahmad Al-Khalidi" }, doctorId: "dr-ahmad-mansour", dept: "cardiology", status: "completed" },
  { time: "09:00", patient: { ar: "سمير العبادي", en: "Samir Al-Abadi" }, doctorId: "dr-faisal-tarawneh", dept: "internal-medicine", status: "completed" },
  { time: "10:15", patient: { ar: "ليلى الحسن", en: "Layla Al-Hassan" }, doctorId: "dr-rania-qasem", dept: "obstetrics", status: "in-progress" },
  { time: "11:00", patient: { ar: "عمر الصالح", en: "Omar Al-Saleh" }, doctorId: "dr-khaled-abu-zeid", dept: "orthopedics", status: "scheduled" },
  { time: "11:30", patient: { ar: "نادية البكري", en: "Nadia Al-Bakri" }, doctorId: "dr-lina-husseini", dept: "pediatrics", status: "scheduled" },
];

const deptPerformance = [
  { id: "cardiology", patients: 145 },
  { id: "orthopedics", patients: 120 },
  { id: "internal-medicine", patients: 165 },
  { id: "pediatrics", patients: 110 },
  { id: "obstetrics", patients: 95 },
  { id: "emergency", patients: 200 },
];

export default function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = use(params);
  const locale: Locale = raw === "en" ? "en" : "ar";
  const dict = getDictionary(locale);
  const t = dict.portals.admin.dashboard;
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  // Map department performance data for Recharts
  const deptChartData = deptPerformance.map(dp => {
    const dept = departments.find(d => d.id === dp.id);
    return {
      name: dept ? dept.name[locale] : dp.id,
      patients: dp.patients,
      fill: dept?.color || "#8884d8",
    };
  });

  const kpis = [
    {
      label: t.totalPatients,
      value: "4,247",
      trend: "+12%",
      icon: Users,
      color: "bg-teal/10 text-teal",
    },
    {
      label: t.todayAppointments,
      value: "142",
      trend: "+5%",
      icon: CalendarDays,
      color: "bg-accent/10 text-navy",
    },
    {
      label: t.monthlyRevenue,
      value: isRTL ? "125K د.أ" : "125K JOD",
      trend: "+18%",
      icon: DollarSign,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: t.occupancyRate,
      value: "82%",
      trend: "-2%",
      icon: BedDouble,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  const statusColors: Record<string, string> = {
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    "in-progress": "bg-accent text-navy border-accent",
    scheduled: "bg-gray-100 text-ink-soft border-gray-200",
  };

  const statusLabels: Record<string, Record<string, string>> = {
    completed: { ar: "مكتمل", en: "Completed" },
    "in-progress": { ar: "جارٍ", en: "In Progress" },
    scheduled: { ar: "مجدول", en: "Scheduled" },
  };

  return (
    <div className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className={`text-3xl font-bold text-navy ${fontHeading}`}>
            {t.title}
          </h1>
          <p className="text-sm text-ink-muted mt-1">
            {isRTL ? "أهلاً بك في لوحة تحكم الإدارة" : "Welcome to the administration dashboard"}
          </p>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          const isPositive = kpi.trend.startsWith("+");
          return (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-bl-full pointer-events-none -z-0 group-hover:scale-110 transition-transform" />
              <div className="relative z-10 flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                  {kpi.trend}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-3xl font-bold text-navy mb-1">{kpi.value}</p>
                <p className="text-sm font-medium text-ink-soft">{kpi.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
        >
          <h2 className={`text-xl font-bold text-navy mb-6 ${fontHeading}`}>
            {isRTL ? "إحصائيات المواعيد الأسبوعية" : "Weekly Appointment Stats"}
          </h2>
          <div className="h-[350px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAppointments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F4C5C" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0F4C5C" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey={isRTL ? "dayAr" : "day"} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="appointments" 
                  name={isRTL ? "المواعيد" : "Appointments"}
                  stroke="#0F4C5C" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAppointments)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Dept Bar Chart Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col"
        >
          <h2 className={`text-xl font-bold text-navy mb-6 ${fontHeading}`}>
            {isRTL ? "أداء الأقسام" : "Departments Performance"}
          </h2>
          <div className="flex-1 min-h-[350px]" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptChartData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  width={100}
                  tick={{ fill: '#4B5563', fontSize: 11 }}
                />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar 
                  dataKey="patients" 
                  name={isRTL ? "المرضى" : "Patients"}
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Today's Appointments List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className={`text-xl font-bold text-navy ${fontHeading}`}>
              {t.todayAppointments}
            </h2>
            <button className="text-sm font-semibold text-teal hover:underline">{isRTL ? "عرض الكل" : "View All"}</button>
          </div>
          <div className="p-2">
            {todayAppointments.map((apt, i) => {
              const doc = doctors.find((d) => d.id === apt.doctorId);
              const dept = departments.find((d) => d.id === apt.dept);
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-navy">{apt.time.split(':')[0]}</span>
                    <span className="text-[10px] font-semibold text-ink-muted">{apt.time.split(':')[1]}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-navy truncate">
                      {apt.patient[locale]}
                    </p>
                    <p className="text-xs font-medium text-ink-muted truncate mt-0.5">
                      {doc?.name[locale]} &middot; {dept?.name[locale]}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[apt.status]}`}
                  >
                    {statusLabels[apt.status][locale]}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Placeholder for other Admin Tools (e.g., Doctors List or Tasks) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-navy rounded-2xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-center"
        >
           <div className="absolute inset-0 bg-gradient-to-t from-teal/20 to-transparent mix-blend-overlay" />
           <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                 <DollarSign className="w-10 h-10 text-accent" />
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 ${fontHeading}`}>{isRTL ? "إدارة المالية والفواتير" : "Finance & Billing Management"}</h3>
              <p className="text-white/80 mb-8 max-w-sm mx-auto">{isRTL ? "الوصول السريع إلى التقارير المالية المتكاملة ونظام الفوترة الخاص بالمركز." : "Quick access to comprehensive financial reports and the center's billing system."}</p>
              <button className="px-8 py-3 rounded-full bg-accent text-navy font-bold hover:bg-white transition-colors">
                 {isRTL ? "فتح النظام المالي" : "Open Financial System"}
              </button>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
