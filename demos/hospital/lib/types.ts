export type Locale = "ar" | "en";

export type Department = {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: string;
  doctorCount: number;
  color: string;
};

export type Doctor = {
  id: string;
  name: { ar: string; en: string };
  title: { ar: string; en: string };
  departmentId: string;
  avatar: string;
  bio: { ar: string; en: string };
  qualifications: string[];
  languages: string[];
  availableDays: string[];
  rating: number;
  yearsExperience: number;
};

export type Service = {
  id: string;
  name: { ar: string; en: string };
  description: { ar: string; en: string };
  icon: string;
  available24h: boolean;
};

export type InsuranceCompany = {
  id: string;
  name: { ar: string; en: string };
  logo: string;
};

export type Appointment = {
  id: string;
  patientName: string;
  doctorId: string;
  departmentId: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
  createdAt: string;
};

export type MedicalRecord = {
  id: string;
  type: "lab" | "radiology" | "diagnosis" | "note";
  title: { ar: string; en: string };
  date: string;
  doctorId: string;
  details: string;
  status: "normal" | "abnormal" | "pending";
};

export type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  doctorId: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "renewal-requested";
  refillsRemaining: number;
};

export type Invoice = {
  id: string;
  description: { ar: string; en: string };
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  insuranceCoverage?: number;
};

export type Message = {
  id: string;
  doctorId: string;
  content: string;
  timestamp: string;
  direction: "sent" | "received";
  read: boolean;
};
