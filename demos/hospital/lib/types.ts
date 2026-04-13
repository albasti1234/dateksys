// ============================================
// Al-Hayat Hospital — Type Definitions
// ============================================
// Strict types. No `any`. No implicit types.

export type Locale = "ar" | "en";

export type Localized = {
  ar: string;
  en: string;
};

// ━━ Department ━━
export type Department = {
  id: string;
  name: Localized;
  description: Localized;
  icon: string;
  doctorCount: number;
  color: string;
};

// ━━ Doctor ━━
export type Doctor = {
  id: string;
  name: Localized;
  title: Localized;
  departmentId: string;
  avatar: string;
  bio: Localized;
  qualifications: string[];
  languages: string[];
  availableDays: string[];
  rating: number;
  yearsExperience: number;
};

// ━━ Service ━━
export type Service = {
  id: string;
  name: Localized;
  description: Localized;
  icon: string;
  available24h: boolean;
};

// ━━ Insurance Company ━━
export type InsuranceCompany = {
  id: string;
  name: Localized;
  logo: string;
};

// ━━ Appointment ━━
export type AppointmentStatus = "upcoming" | "completed" | "cancelled";

export type Appointment = {
  id: string;
  patientName: string;
  doctorId: string;
  departmentId: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
};

// ━━ Medical Record ━━
export type RecordType = "lab" | "radiology" | "diagnosis" | "note";
export type RecordStatus = "normal" | "abnormal" | "pending";

export type MedicalRecord = {
  id: string;
  type: RecordType;
  title: Localized;
  date: string;
  doctorId: string;
  details: string;
  status: RecordStatus;
};

// ━━ Prescription ━━
export type PrescriptionStatus = "active" | "completed" | "renewal-requested";

export type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  doctorId: string;
  startDate: string;
  endDate: string;
  status: PrescriptionStatus;
  refillsRemaining: number;
};

// ━━ Invoice ━━
export type InvoiceStatus = "paid" | "pending" | "overdue";

export type Invoice = {
  id: string;
  description: Localized;
  amount: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  insuranceCoverage?: number;
};

// ━━ Message ━━
export type MessageDirection = "sent" | "received";

export type Message = {
  id: string;
  doctorId: string;
  content: string;
  timestamp: string;
  direction: MessageDirection;
  read: boolean;
};

// ━━ Testimonial ━━
export type Testimonial = {
  id: string;
  name: Localized;
  treatment: Localized;
  quote: Localized;
  avatar: string;
  rating: number;
};

// ━━ News Article ━━
export type NewsArticle = {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  content: Localized;
  category: Localized;
  image: string;
  date: string;
  author: Localized;
};

// ━━ FAQ Item ━━
export type FAQItem = {
  id: string;
  question: Localized;
  answer: Localized;
  category: string;
};

// ━━ Career/Job ━━
export type Career = {
  id: string;
  title: Localized;
  department: Localized;
  type: "full-time" | "part-time" | "contract";
  location: Localized;
  description: Localized;
  requirements: string[];
  postedDate: string;
};

// ━━ Timeline Event ━━
export type TimelineEvent = {
  id: string;
  year: string;
  title: Localized;
  description: Localized;
};

// ━━ Admin Stats ━━
export type AdminStats = {
  todayAppointments: number;
  todayPatients: number;
  erVisits: number;
  admissions: number;
  revenue: number;
  bedsOccupied: number;
  totalBeds: number;
  waitingPatients: number;
  satisfactionRate: number;
};
