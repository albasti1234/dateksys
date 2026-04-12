"use client";

import { useEffect, useState } from "react";
import type {
  Appointment,
  MedicalRecord,
  Prescription,
  Invoice,
  Message,
} from "./types";

// ============================================
// Al-Hayat Hospital demo state — appointments,
// medical records, prescriptions, invoices, messages.
// Uses localStorage for the demo; identical interface
// could wrap a real API for production.
// ============================================

const APPOINTMENTS_KEY = "alhayat:appointments";
const RECORDS_KEY = "alhayat:medical-records";
const PRESCRIPTIONS_KEY = "alhayat:prescriptions";
const INVOICES_KEY = "alhayat:invoices";
const MESSAGES_KEY = "alhayat:messages";
const SEEDED_KEY = "alhayat:seeded";

const EVENT = "alhayat:store-changed";

const isClient = () => typeof window !== "undefined";

function broadcast() {
  if (isClient()) {
    window.dispatchEvent(new CustomEvent(EVENT));
  }
}

// ─────────────────── Generic helpers ───────────────────

function getItems<T>(key: string): T[] {
  if (!isClient()) return [];
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveItem<T>(key: string, item: T): void {
  if (!isClient()) return;
  try {
    const existing = getItems<T>(key);
    localStorage.setItem(key, JSON.stringify([item, ...existing]));
    broadcast();
  } catch (err) {
    console.error(`Failed to save to ${key}:`, err);
  }
}

function useItems<T>(key: string): T[] {
  const [items, setItems] = useState<T[]>([]);
  useEffect(() => {
    setItems(getItems<T>(key));
    const handler = () => setItems(getItems<T>(key));
    window.addEventListener(EVENT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVENT, handler);
      window.removeEventListener("storage", handler);
    };
  }, [key]);
  return items;
}

// ─────────────────── Appointments ───────────────────

export function getAppointments(): Appointment[] {
  return getItems<Appointment>(APPOINTMENTS_KEY);
}

export function saveAppointment(
  appointment: Omit<Appointment, "id" | "createdAt">
): Appointment {
  const record: Appointment = {
    ...appointment,
    id: `APT-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  saveItem(APPOINTMENTS_KEY, record);
  return record;
}

export function useAppointments(): Appointment[] {
  return useItems<Appointment>(APPOINTMENTS_KEY);
}

// ─────────────────── Medical Records ───────────────────

export function getMedicalRecords(): MedicalRecord[] {
  return getItems<MedicalRecord>(RECORDS_KEY);
}

export function saveMedicalRecord(record: MedicalRecord): void {
  saveItem(RECORDS_KEY, record);
}

export function useMedicalRecords(): MedicalRecord[] {
  return useItems<MedicalRecord>(RECORDS_KEY);
}

// ─────────────────── Prescriptions ───────────────────

export function getPrescriptions(): Prescription[] {
  return getItems<Prescription>(PRESCRIPTIONS_KEY);
}

export function savePrescription(prescription: Prescription): void {
  saveItem(PRESCRIPTIONS_KEY, prescription);
}

export function usePrescriptions(): Prescription[] {
  return useItems<Prescription>(PRESCRIPTIONS_KEY);
}

// ─────────────────── Invoices ───────────────────

export function getInvoices(): Invoice[] {
  return getItems<Invoice>(INVOICES_KEY);
}

export function saveInvoice(invoice: Invoice): void {
  saveItem(INVOICES_KEY, invoice);
}

export function useInvoices(): Invoice[] {
  return useItems<Invoice>(INVOICES_KEY);
}

// ─────────────────── Messages ───────────────────

export function getMessages(): Message[] {
  return getItems<Message>(MESSAGES_KEY);
}

export function saveMessage(
  message: Omit<Message, "id" | "timestamp">
): Message {
  const record: Message = {
    ...message,
    id: `MSG-${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
  saveItem(MESSAGES_KEY, record);
  return record;
}

export function useMessages(): Message[] {
  return useItems<Message>(MESSAGES_KEY);
}

// ─────────────────── Seed Demo Data ───────────────────

export function seedDemoData(): void {
  if (!isClient()) return;
  if (localStorage.getItem(SEEDED_KEY)) return;

  // 3 upcoming appointments
  const appointments: Appointment[] = [
    {
      id: "APT-DEMO-001",
      patientName: "محمد علي الشمايلة",
      doctorId: "dr-ahmad-mansour",
      departmentId: "cardiology",
      date: "2026-04-20",
      time: "09:30",
      status: "upcoming",
      notes: "فحص دوري للقلب — متابعة بعد تركيب الدعامة",
      createdAt: "2026-04-01T08:00:00Z",
    },
    {
      id: "APT-DEMO-002",
      patientName: "محمد علي الشمايلة",
      doctorId: "dr-faisal-tarawneh",
      departmentId: "internal-medicine",
      date: "2026-04-22",
      time: "11:00",
      status: "upcoming",
      notes: "متابعة مستوى السكر التراكمي والضغط",
      createdAt: "2026-04-02T10:00:00Z",
    },
    {
      id: "APT-DEMO-003",
      patientName: "محمد علي الشمايلة",
      doctorId: "dr-khaled-abu-zeid",
      departmentId: "orthopedics",
      date: "2026-05-03",
      time: "14:00",
      status: "upcoming",
      notes: "آلام في الركبة اليمنى — تقييم أولي",
      createdAt: "2026-04-05T09:00:00Z",
    },
  ];

  // 5 medical records
  const records: MedicalRecord[] = [
    {
      id: "REC-DEMO-001",
      type: "lab",
      title: { ar: "تحليل دم شامل (CBC)", en: "Complete Blood Count (CBC)" },
      date: "2026-03-15",
      doctorId: "dr-faisal-tarawneh",
      details:
        "الهيموجلوبين: ١٤.٢ جم/دل | كريات الدم البيضاء: ٧٢٠٠ | الصفائح: ٢٥٠,٠٠٠ — جميع القيم ضمن الحدود الطبيعية",
      status: "normal",
    },
    {
      id: "REC-DEMO-002",
      type: "lab",
      title: {
        ar: "فحص السكر التراكمي (HbA1c)",
        en: "Hemoglobin A1c Test",
      },
      date: "2026-03-15",
      doctorId: "dr-faisal-tarawneh",
      details:
        "السكر التراكمي: ٧.٨٪ — أعلى من المعدل الطبيعي. يُنصح بتعديل جرعة الميتفورمين ومراجعة النظام الغذائي",
      status: "abnormal",
    },
    {
      id: "REC-DEMO-003",
      type: "radiology",
      title: {
        ar: "صورة أشعة سينية للصدر",
        en: "Chest X-Ray",
      },
      date: "2026-02-20",
      doctorId: "dr-nour-haddad",
      details:
        "الرئتان سليمتان بدون ارتشاح أو انصباب. حجم القلب طبيعي. لا يوجد كسور في الأضلاع",
      status: "normal",
    },
    {
      id: "REC-DEMO-004",
      type: "diagnosis",
      title: {
        ar: "تشخيص ارتفاع ضغط الدم",
        en: "Hypertension Diagnosis",
      },
      date: "2026-01-10",
      doctorId: "dr-faisal-tarawneh",
      details:
        "ارتفاع ضغط الدم من الدرجة الأولى — ١٤٥/٩٢. تم وصف أملوديبين ٥ ملغ يومياً مع نظام غذائي قليل الملح",
      status: "abnormal",
    },
    {
      id: "REC-DEMO-005",
      type: "note",
      title: {
        ar: "ملاحظات المتابعة الدورية",
        en: "Routine Follow-up Notes",
      },
      date: "2026-03-20",
      doctorId: "dr-ahmad-mansour",
      details:
        "المريض بحالة مستقرة بعد عملية تركيب الدعامة. يلتزم بالأدوية الموصوفة. ضغط الدم تحت السيطرة. الموعد القادم بعد شهر",
      status: "normal",
    },
  ];

  // 4 prescriptions
  const prescriptions: Prescription[] = [
    {
      id: "RX-DEMO-001",
      medication: "أسبرين ٨١ ملغ (Aspirin 81mg)",
      dosage: "٨١ ملغ",
      frequency: "مرة واحدة يومياً بعد الغداء",
      doctorId: "dr-ahmad-mansour",
      startDate: "2026-01-15",
      endDate: "2026-07-15",
      status: "active",
      refillsRemaining: 3,
    },
    {
      id: "RX-DEMO-002",
      medication: "ميتفورمين ٥٠٠ ملغ (Metformin 500mg)",
      dosage: "٥٠٠ ملغ",
      frequency: "مرتين يومياً بعد الأكل",
      doctorId: "dr-faisal-tarawneh",
      startDate: "2026-02-01",
      endDate: "2026-08-01",
      status: "active",
      refillsRemaining: 4,
    },
    {
      id: "RX-DEMO-003",
      medication: "أملوديبين ٥ ملغ (Amlodipine 5mg)",
      dosage: "٥ ملغ",
      frequency: "مرة واحدة يومياً صباحاً",
      doctorId: "dr-faisal-tarawneh",
      startDate: "2026-01-10",
      endDate: "2026-07-10",
      status: "active",
      refillsRemaining: 2,
    },
    {
      id: "RX-DEMO-004",
      medication: "أموكسيسيللين ٥٠٠ ملغ (Amoxicillin 500mg)",
      dosage: "٥٠٠ ملغ",
      frequency: "ثلاث مرات يومياً لمدة ٧ أيام",
      doctorId: "dr-lina-husseini",
      startDate: "2026-03-01",
      endDate: "2026-03-07",
      status: "completed",
      refillsRemaining: 0,
    },
  ];

  // 6 invoices in JOD
  const invoices: Invoice[] = [
    {
      id: "INV-DEMO-001",
      description: {
        ar: "كشفية استشاري قلب + تخطيط قلب",
        en: "Cardiology consultation + ECG",
      },
      amount: 65,
      date: "2026-03-20",
      dueDate: "2026-04-20",
      status: "paid",
      insuranceCoverage: 80,
    },
    {
      id: "INV-DEMO-002",
      description: {
        ar: "تحاليل مخبرية شاملة (CBC + HbA1c + وظائف كلى)",
        en: "Lab tests (CBC + HbA1c + Kidney function)",
      },
      amount: 45,
      date: "2026-03-15",
      dueDate: "2026-04-15",
      status: "paid",
      insuranceCoverage: 70,
    },
    {
      id: "INV-DEMO-003",
      description: {
        ar: "صورة أشعة سينية للصدر",
        en: "Chest X-Ray",
      },
      amount: 30,
      date: "2026-02-20",
      dueDate: "2026-03-20",
      status: "paid",
    },
    {
      id: "INV-DEMO-004",
      description: {
        ar: "كشفية استشاري باطني + متابعة سكري",
        en: "Internal medicine consultation + diabetes follow-up",
      },
      amount: 50,
      date: "2026-04-01",
      dueDate: "2026-05-01",
      status: "pending",
      insuranceCoverage: 80,
    },
    {
      id: "INV-DEMO-005",
      description: {
        ar: "كشفية استشاري عظام + صورة أشعة للركبة",
        en: "Orthopedic consultation + knee X-ray",
      },
      amount: 75,
      date: "2026-04-05",
      dueDate: "2026-05-05",
      status: "pending",
      insuranceCoverage: 80,
    },
    {
      id: "INV-DEMO-006",
      description: {
        ar: "أدوية — صيدلية المستشفى (شهر آذار)",
        en: "Medications — Hospital pharmacy (March)",
      },
      amount: 38,
      date: "2026-03-01",
      dueDate: "2026-03-31",
      status: "overdue",
    },
  ];

  // 8 messages with dr-ahmad-mansour
  const messages: Message[] = [
    {
      id: "MSG-DEMO-001",
      doctorId: "dr-ahmad-mansour",
      content: "السلام عليكم دكتور، حبيت أسأل عن نتائج فحص القلب الأخير",
      timestamp: "2026-03-20T09:00:00Z",
      direction: "sent",
      read: true,
    },
    {
      id: "MSG-DEMO-002",
      doctorId: "dr-ahmad-mansour",
      content:
        "وعليكم السلام أبو علي. النتائج ممتازة والحمد لله. الدعامة شغالة بشكل ممتاز وتدفق الدم طبيعي",
      timestamp: "2026-03-20T09:15:00Z",
      direction: "received",
      read: true,
    },
    {
      id: "MSG-DEMO-003",
      doctorId: "dr-ahmad-mansour",
      content: "الحمد لله. هل لازم أستمر على الأسبرين نفس الجرعة؟",
      timestamp: "2026-03-20T09:18:00Z",
      direction: "sent",
      read: true,
    },
    {
      id: "MSG-DEMO-004",
      doctorId: "dr-ahmad-mansour",
      content:
        "نعم، استمر على الأسبرين ٨١ ملغ يومياً بعد الأكل. ولا تنسى المشي نص ساعة يومياً",
      timestamp: "2026-03-20T09:22:00Z",
      direction: "received",
      read: true,
    },
    {
      id: "MSG-DEMO-005",
      doctorId: "dr-ahmad-mansour",
      content: "إن شاء الله دكتور. الموعد الجاي متى بالزبط؟",
      timestamp: "2026-03-20T09:25:00Z",
      direction: "sent",
      read: true,
    },
    {
      id: "MSG-DEMO-006",
      doctorId: "dr-ahmad-mansour",
      content:
        "موعدك يوم ٢٠ نيسان الساعة ٩:٣٠ صباحاً. لا تنسى تعمل فحص دم قبل الموعد بيومين",
      timestamp: "2026-03-20T09:28:00Z",
      direction: "received",
      read: true,
    },
    {
      id: "MSG-DEMO-007",
      doctorId: "dr-ahmad-mansour",
      content: "تمام دكتور، الله يعطيك العافية",
      timestamp: "2026-03-20T09:30:00Z",
      direction: "sent",
      read: true,
    },
    {
      id: "MSG-DEMO-008",
      doctorId: "dr-ahmad-mansour",
      content: "الله يعافيك. أي سؤال لا تتردد. سلامتك",
      timestamp: "2026-03-20T09:32:00Z",
      direction: "received",
      read: false,
    },
  ];

  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  localStorage.setItem(PRESCRIPTIONS_KEY, JSON.stringify(prescriptions));
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  localStorage.setItem(SEEDED_KEY, "true");
  broadcast();
}
