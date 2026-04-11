"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, CheckCircle2, XCircle, Sparkles, Users, Scan } from "lucide-react";

const students = [
  { id: 1, name: "Ahmad Khalil", photo: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&q=80", detected: true },
  { id: 2, name: "Leila Al-Masri", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", detected: true },
  { id: 3, name: "Omar Nasser", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", detected: true },
  { id: 4, name: "Dana Khouri", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", detected: true },
  { id: 5, name: "Karim Haddad", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80", detected: true },
  { id: 6, name: "Nour Mansour", photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80", detected: false },
  { id: 7, name: "Samir Al-Ali", photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80", detected: true },
  { id: 8, name: "Maya Toukan", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", detected: true },
];

export default function SmartAttendancePage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  const present = students.filter((s) => s.detected).length;
  const absent = students.length - present;

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
          <p className="section-label">AI-Powered</p>
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-navy)]">Smart Attendance</h1>
        <p className="text-[var(--color-ink-soft)] mt-2">Grade 10-A · Mathematics · April 11, 2026</p>
      </div>

      {!scanned ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-navy)] text-white p-10 lg:p-16 text-center relative overflow-hidden mb-8">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-10" style={{ background: "#C19A4B" }} />
          <div className="relative max-w-2xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-8 border-4 border-[var(--color-gold)] flex items-center justify-center">
              <Camera className="w-10 h-10 text-[var(--color-gold)]" />
            </div>
            <h2 className="font-serif text-4xl font-bold mb-4">Scan the classroom</h2>
            <p className="text-white/70 mb-10 leading-relaxed">Take a quick photo of your classroom. Our AI will automatically detect and mark students present in under 5 seconds.</p>
            <button onClick={handleScan} disabled={scanning} className="px-10 py-4 bg-[var(--color-gold)] text-white font-bold uppercase tracking-wider text-sm hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50 inline-flex items-center gap-3">
              {scanning ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Scanning classroom...
                </>
              ) : (
                <>
                  <Scan className="w-5 h-5" />
                  Start Smart Scan
                </>
              )}
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Results summary */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-green-600 text-white p-6">
              <CheckCircle2 className="w-6 h-6 mb-3" />
              <div className="font-serif text-4xl font-bold">{present}</div>
              <div className="text-xs uppercase tracking-wider">Present</div>
            </div>
            <div className="bg-red-600 text-white p-6">
              <XCircle className="w-6 h-6 mb-3" />
              <div className="font-serif text-4xl font-bold">{absent}</div>
              <div className="text-xs uppercase tracking-wider">Absent</div>
            </div>
            <div className="bg-[var(--color-navy)] text-white p-6">
              <Users className="w-6 h-6 mb-3" />
              <div className="font-serif text-4xl font-bold">{students.length}</div>
              <div className="text-xs uppercase tracking-wider">Total Enrolled</div>
            </div>
          </motion.div>

          {/* Students grid */}
          <div className="bg-white border border-[var(--color-border)] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-[var(--color-navy)]">Student Detection Results</h3>
              <button onClick={() => setScanned(false)} className="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold)]">Scan Again</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {students.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} className="relative">
                  <div className="aspect-square bg-cover bg-center" style={{ backgroundImage: `url('${s.photo}')` }}>
                    <div className={`absolute inset-0 ${s.detected ? "bg-green-500/20" : "bg-red-500/40"}`} />
                    <div className={`absolute top-2 end-2 w-8 h-8 rounded-full flex items-center justify-center ${s.detected ? "bg-green-500" : "bg-red-500"}`}>
                      {s.detected ? <CheckCircle2 className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
                    </div>
                  </div>
                  <div className="p-3 bg-white border border-[var(--color-border)] border-t-0">
                    <div className="text-sm font-semibold text-[var(--color-navy)] truncate">{s.name}</div>
                    <div className={`text-[10px] font-bold uppercase tracking-wider ${s.detected ? "text-green-600" : "text-red-600"}`}>
                      {s.detected ? "Present" : "Not detected"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button className="mt-6 btn-primary w-full justify-center">
              Confirm & Save Attendance
            </button>
          </div>
        </>
      )}
    </div>
  );
}
