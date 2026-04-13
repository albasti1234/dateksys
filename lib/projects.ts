export type ProjectCategory = "education" | "healthcare" | "realestate" | "restaurant" | "corporate" | "ecommerce";

export interface Portal {
  id: string;
  name: string;        // Arabic name
  nameEn: string;      // English name
  icon: string;        // Lucide icon name
  description: string;
  screenshots: string[];
  url?: string;
}

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  categoryColor: string;
  name: string;
  client: string;
  year: number;
  status: "live" | "in-progress";
  description: string;
  techStack: string[];
  features: string[];
  coverImage: string;
  portals: Portal[];
}

export const categoryColors: Record<ProjectCategory, string> = {
  education: "#4ADE80",
  healthcare: "#38BDF8",
  realestate: "#C9A84C",
  restaurant: "#F97316",
  corporate: "#A78BFA",
  ecommerce: "#F472B6",
};

export const categories: { value: ProjectCategory | "all"; label: string; color?: string }[] = [
  { value: "all", label: "All" },
  { value: "education", label: "Education", color: "#4ADE80" },
  { value: "healthcare", label: "Healthcare", color: "#38BDF8" },
  { value: "realestate", label: "Real Estate", color: "#C9A84C" },
  { value: "restaurant", label: "Restaurants", color: "#F97316" },
  { value: "corporate", label: "Corporate", color: "#A78BFA" },
  { value: "ecommerce", label: "E-commerce", color: "#F472B6" },
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "alnoor-school",
    category: "education",
    categoryLabel: "Education",
    categoryColor: "#4ADE80",
    name: "Al-Noor International School",
    client: "Al-Noor Academy",
    year: 2026,
    status: "live",
    description: "Full school website with student portal, grade tracking, parent communication dashboard, and AI-powered homework assistant.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Student portal", "Grade tracking", "Parent dashboard", "AI homework helper", "Live bus tracking", "Attendance system", "5 user portals"],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "school-website",
        name: "الموقع الرئيسي",
        nameEn: "Public Website",
        icon: "Globe",
        description: "Public-facing school website with admissions, news, and events.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school",
      },
      {
        id: "school-student",
        name: "بوابة الطالب",
        nameEn: "Student Portal",
        icon: "GraduationCap",
        description: "Grade tracking, assignments, schedule, and attendance for students.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/student",
      },
      {
        id: "school-teacher",
        name: "بوابة المعلم",
        nameEn: "Teacher Portal",
        icon: "BookOpen",
        description: "Class management, grading, lesson plans, and communication tools.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/teacher",
      },
      {
        id: "school-parent",
        name: "بوابة ولي الأمر",
        nameEn: "Parent Portal",
        icon: "Users",
        description: "Child progress tracking, fee payments, and teacher communication.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/parent",
      },
      {
        id: "school-admin",
        name: "لوحة الإدارة",
        nameEn: "Admin Dashboard",
        icon: "LayoutDashboard",
        description: "Full administrative control — users, reports, settings, and analytics.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/admin",
      },
    ],
  },
  {
    id: "2",
    slug: "alhayat-hospital",
    category: "healthcare",
    categoryLabel: "Healthcare",
    categoryColor: "#38BDF8",
    name: "Al-Hayat Hospital",
    client: "Al-Hayat Medical Center",
    year: 2026,
    status: "live",
    description: "Complete hospital management platform with patient portal, appointment booking, medical records, and administrative dashboard.",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Patient portal", "Appointment booking", "Medical records", "Prescription management", "Billing system", "Admin dashboard", "12 doctors database"],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "hospital-website",
        name: "الموقع الرئيسي",
        nameEn: "Public Website",
        icon: "Globe",
        description: "Hospital website with departments, doctors, and appointment booking.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/hospital",
      },
      {
        id: "hospital-patient",
        name: "بوابة المريض",
        nameEn: "Patient Portal",
        icon: "Heart",
        description: "Medical records, appointments, prescriptions, and billing for patients.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/hospital/ar/portal/patient",
      },
      {
        id: "hospital-admin",
        name: "لوحة الأطباء والإدارة",
        nameEn: "Admin & Doctors Dashboard",
        icon: "LayoutDashboard",
        description: "Hospital management — scheduling, records, staff, and analytics.",
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/hospital/ar/portal/admin",
      },
    ],
  },
  {
    id: "3",
    slug: "luxe-estates",
    category: "realestate",
    categoryLabel: "Real Estate",
    categoryColor: "#C9A84C",
    name: "Luxe Estates",
    client: "Luxe Properties Group",
    year: 2026,
    status: "in-progress",
    description: "Luxury property listings platform with virtual tours, agent profiles, mortgage calculator, and property management CRM.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Mapbox", "Supabase"],
    features: ["Property listings", "Virtual tours", "Agent profiles", "Mortgage calculator", "Lead management CRM", "Analytics dashboard"],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "luxe-website",
        name: "الموقع الرئيسي",
        nameEn: "Public Website",
        icon: "Globe",
        description: "Property listings, virtual tours, and agent profiles.",
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "luxe-management",
        name: "إدارة العقارات",
        nameEn: "Property Management",
        icon: "LayoutDashboard",
        description: "CRM, lead tracking, property management, and analytics.",
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
  {
    id: "4",
    slug: "zaytouna-restaurant",
    category: "restaurant",
    categoryLabel: "Restaurants",
    categoryColor: "#F97316",
    name: "Zaytouna Restaurant",
    client: "Zaytouna Group",
    year: 2026,
    status: "in-progress",
    description: "Modern restaurant platform with digital menu, table reservations, online ordering, delivery tracking, and kitchen management.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Socket.io"],
    features: ["Digital menu", "Table reservations", "Online ordering", "Delivery tracking", "Kitchen dashboard", "Inventory management"],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "zaytouna-website",
        name: "الموقع الرئيسي",
        nameEn: "Public Website",
        icon: "Globe",
        description: "Restaurant website with menu, reservations, and online ordering.",
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "zaytouna-dashboard",
        name: "لوحة المطعم",
        nameEn: "Restaurant Dashboard",
        icon: "LayoutDashboard",
        description: "Kitchen management, orders, inventory, and delivery tracking.",
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
  {
    id: "5",
    slug: "nexus-corp",
    category: "corporate",
    categoryLabel: "Corporate",
    categoryColor: "#A78BFA",
    name: "Nexus Corp",
    client: "Nexus Technologies",
    year: 2026,
    status: "in-progress",
    description: "Corporate website with services showcase, team profiles, blog, careers portal, and internal HR management dashboard.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Prisma"],
    features: ["Services showcase", "Team profiles", "Blog system", "Careers portal", "HR dashboard", "Project tracking"],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "nexus-website",
        name: "الموقع الرئيسي",
        nameEn: "Public Website",
        icon: "Globe",
        description: "Corporate website with services, team, blog, and careers.",
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "nexus-employee",
        name: "بوابة الموظف",
        nameEn: "Employee Portal",
        icon: "Users",
        description: "HR tools, timesheets, project tracking, and internal communication.",
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "nexus-admin",
        name: "لوحة الإدارة",
        nameEn: "Admin Dashboard",
        icon: "LayoutDashboard",
        description: "Full admin panel — HR management, analytics, and settings.",
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
  {
    id: "6",
    slug: "souq-digital",
    category: "ecommerce",
    categoryLabel: "E-commerce",
    categoryColor: "#F472B6",
    name: "Souq Digital",
    client: "Souq Digital LLC",
    year: 2026,
    status: "in-progress",
    description: "Full-featured e-commerce platform with product catalog, cart system, checkout flow, order tracking, and merchant dashboard.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    features: ["Product catalog", "Shopping cart", "Secure checkout", "Order tracking", "Merchant dashboard", "Inventory system", "Analytics"],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "souq-storefront",
        name: "واجهة المتجر",
        nameEn: "Storefront",
        icon: "Store",
        description: "Customer-facing store with catalog, cart, and checkout.",
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "souq-vendor",
        name: "بوابة البائع",
        nameEn: "Vendor Portal",
        icon: "ShoppingBag",
        description: "Product management, orders, and seller analytics.",
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "souq-admin",
        name: "لوحة الإدارة",
        nameEn: "Admin Dashboard",
        icon: "LayoutDashboard",
        description: "Platform management — vendors, orders, users, and analytics.",
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
];
