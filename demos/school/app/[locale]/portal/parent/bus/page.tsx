"use client";

import { motion } from "framer-motion";
import { Bus, MapPin, Clock, Phone, Navigation2, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const driver = {
  name: "Ahmad Khalil",
  phone: "+962 79 123 4567",
  rating: 4.9,
  experience: 8,
  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
};

const route = [
  { stop: "School Campus", time: "2:45 PM", status: "done" },
  { stop: "Al-Rabiah Gate", time: "2:58 PM", status: "done" },
  { stop: "Sweifieh Circle", time: "3:10 PM", status: "done" },
  { stop: "7th Circle", time: "3:22 PM", status: "current" },
  { stop: "Abu Nseir Gate", time: "3:35 PM", status: "pending" },
  { stop: "Your Home", time: "3:42 PM", status: "pending" },
];

export default function BusPage() {
  const [eta, setEta] = useState("7 min");

  useEffect(() => {
    const t = setInterval(() => setEta((prev) => prev), 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <p className="section-label mb-3">Live Bus Tracking</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Bus 07 · Afternoon Route</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">Real-time location and ETA updates</p>
      </div>

      {/* ETA banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-navy)] text-white p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10" style={{ background: "#C19A4B" }} />
        <div className="absolute top-0 start-0 w-20 h-20 border-t-2 border-s-2 border-[var(--color-gold)]" />
        <div className="relative grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-green-400">Live</span>
            </div>
            <p className="text-xs uppercase tracking-widest text-[var(--color-gold)] mb-2">Arriving in</p>
            <div className="font-serif text-7xl font-bold gold-text">{eta}</div>
            <p className="text-sm text-white/70 mt-2">Bus is currently at 7th Circle · 3 stops away from your home</p>
          </div>
          <div className="bg-white/5 p-6 border-s-2 border-[var(--color-gold)]">
            <p className="text-xs uppercase tracking-wider text-[var(--color-gold-light)] mb-2">Bus Details</p>
            <div className="space-y-2 text-sm">
              <div>Bus Number: <span className="font-bold">JO-07-3456</span></div>
              <div>Capacity: <span className="font-bold">25 students</span></div>
              <div>Currently onboard: <span className="font-bold">18 students</span></div>
              <div>Route: <span className="font-bold">Afternoon · North</span></div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map placeholder */}
        <div className="lg:col-span-2 bg-white border border-[var(--color-border)] overflow-hidden relative" style={{ minHeight: 500 }}>
          <div className="absolute inset-0 bg-[var(--color-cream)]">
            {/* Faux map grid */}
            <div className="absolute inset-0" style={{
              backgroundImage: "linear-gradient(#E8E4D8 1px, transparent 1px), linear-gradient(90deg, #E8E4D8 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

            {/* Streets */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-[var(--color-border)] opacity-60" />
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-[var(--color-border)] opacity-60" />
            <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-[var(--color-border)] opacity-60" />
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-[var(--color-border)] opacity-60" />

            {/* Route path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="none">
              <path d="M 100 50 Q 200 120 250 200 T 350 300 T 480 420" stroke="#C19A4B" strokeWidth="4" strokeDasharray="8,4" fill="none" />
            </svg>

            {/* Stops markers */}
            <div className="absolute top-[10%] left-[16%] flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-[var(--color-forest)] border-2 border-white shadow-lg" />
              <div className="text-[10px] font-semibold mt-1 bg-white px-2 py-0.5 shadow">School</div>
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
              <div className="text-[10px] font-semibold mt-2 bg-[var(--color-navy)] text-white px-3 py-1 shadow">Bus 07 · Live</div>
            </motion.div>

            {/* Home marker */}
            <div className="absolute bottom-[10%] right-[12%] flex flex-col items-center">
              <div className="w-6 h-6 rounded-full bg-[var(--color-navy)] border-2 border-white shadow-lg flex items-center justify-center">
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <div className="text-[10px] font-semibold mt-1 bg-white px-2 py-0.5 shadow">Your Home</div>
            </div>
          </div>

          {/* Map controls */}
          <div className="absolute top-4 end-4 bg-white shadow-lg">
            <button className="block p-3 border-b border-[var(--color-border-soft)] hover:bg-[var(--color-cream)]" aria-label="Zoom in">+</button>
            <button className="block p-3 hover:bg-[var(--color-cream)]" aria-label="Zoom out">−</button>
          </div>
          <button className="absolute bottom-4 end-4 px-4 py-2 bg-white shadow-lg text-xs font-semibold flex items-center gap-2 hover:bg-[var(--color-cream)]">
            <Navigation2 className="w-4 h-4" />
            Center map
          </button>
        </div>

        {/* Route timeline + driver */}
        <div className="space-y-6">
          {/* Driver card */}
          <div className="bg-white border border-[var(--color-border)] p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-[var(--color-gold)]" style={{ backgroundImage: `url('${driver.avatar}')` }} />
              <div>
                <div className="font-serif text-lg font-bold text-[var(--color-navy)]">{driver.name}</div>
                <div className="text-xs text-[var(--color-gold)] font-semibold">★ {driver.rating} · {driver.experience} years</div>
              </div>
            </div>
            <button className="w-full btn-outline !py-3 text-xs">
              <Phone className="w-4 h-4" />
              Call Driver
            </button>
          </div>

          {/* Route timeline */}
          <div className="bg-white border border-[var(--color-border)] p-6">
            <h3 className="font-serif text-lg font-bold text-[var(--color-navy)] mb-5">Route Timeline</h3>
            <div className="relative">
              <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[var(--color-border)]" />
              {route.map((r, i) => (
                <div key={r.stop} className="relative ps-8 pb-5 last:pb-0">
                  <div
                    className={`absolute left-0 top-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
                      r.status === "done"
                        ? "bg-green-600"
                        : r.status === "current"
                        ? "bg-[var(--color-gold)] animate-pulse"
                        : "bg-[var(--color-border)]"
                    }`}
                  >
                    {r.status === "done" && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${r.status === "current" ? "text-[var(--color-gold)]" : "text-[var(--color-navy)]"}`}>{r.stop}</div>
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
