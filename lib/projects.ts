export type ProjectCategory = "education" | "healthcare" | "realestate" | "restaurant" | "corporate" | "ecommerce";

export interface Bilingual {
  ar: string;
  en: string;
}

export interface Portal {
  id: string;
  name: Bilingual;
  icon: string;
  description: Bilingual;
  screenshots: string[];
  url?: string;
}

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: Bilingual;
  categoryColor: string;
  name: Bilingual;
  client: Bilingual;
  year: number;
  status: "live" | "in-progress";
  description: Bilingual;
  techStack: string[];
  features: Bilingual[];
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

export const categories: { value: ProjectCategory | "all"; label: Bilingual; color?: string }[] = [
  { value: "all", label: { ar: "الكل", en: "All" } },
  { value: "education", label: { ar: "التعليم", en: "Education" }, color: "#4ADE80" },
  { value: "healthcare", label: { ar: "الرعاية الصحية", en: "Healthcare" }, color: "#38BDF8" },
  { value: "realestate", label: { ar: "العقارات", en: "Real Estate" }, color: "#C9A84C" },
  { value: "restaurant", label: { ar: "المطاعم", en: "Restaurants" }, color: "#F97316" },
  { value: "corporate", label: { ar: "الشركات", en: "Corporate" }, color: "#A78BFA" },
  { value: "ecommerce", label: { ar: "التجارة الإلكترونية", en: "E-commerce" }, color: "#F472B6" },
];

export const projects: Project[] = [
  {
    id: "1",
    slug: "alnakhla-school",
    category: "education",
    categoryLabel: { ar: "التعليم", en: "Education" },
    categoryColor: "#4ADE80",
    name: { ar: "أكاديمية النخلة الدولية", en: "Al-Nakhla International Academy" },
    client: { ar: "أكاديمية النخلة الدولية", en: "Al-Nakhla International Academy" },
    year: 2026,
    status: "live",
    description: {
      ar: "منصة مدرسية متكاملة مع بوابة طلاب، تتبع العلامات، لوحة تواصل أولياء الأمور، ومساعد واجبات بالذكاء الاصطناعي.",
      en: "Full school website with student portal, grade tracking, parent communication dashboard, and AI-powered homework assistant.",
    },
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      { ar: "بوابة الطلاب", en: "Student portal" },
      { ar: "تتبع العلامات", en: "Grade tracking" },
      { ar: "لوحة أولياء الأمور", en: "Parent dashboard" },
      { ar: "مساعد واجبات ذكي", en: "AI homework helper" },
      { ar: "تتبع الحافلات المباشر", en: "Live bus tracking" },
      { ar: "نظام الحضور والغياب", en: "Attendance system" },
      { ar: "٥ بوابات مستخدمين", en: "5 user portals" },
    ],
    coverImage: "/showcase/school-cover.png",
    portals: [
      {
        id: "school-website",
        name: { ar: "الموقع الرئيسي", en: "Public Website" },
        icon: "Globe",
        description: {
          ar: "موقع المدرسة العام مع القبول والأخبار والفعاليات.",
          en: "Public-facing school website with admissions, news, and events.",
        },
        screenshots: ["/showcase/school-cover.png"],
        url: "/demos/school",
      },
      {
        id: "school-student",
        name: { ar: "بوابة الطالب", en: "Student Portal" },
        icon: "GraduationCap",
        description: {
          ar: "تتبع العلامات والواجبات والجدول والحضور للطلاب.",
          en: "Grade tracking, assignments, schedule, and attendance for students.",
        },
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/student",
      },
      {
        id: "school-teacher",
        name: { ar: "بوابة المعلم", en: "Teacher Portal" },
        icon: "BookOpen",
        description: {
          ar: "إدارة الصفوف والتقييم وخطط الدروس وأدوات التواصل.",
          en: "Class management, grading, lesson plans, and communication tools.",
        },
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/teacher",
      },
      {
        id: "school-parent",
        name: { ar: "بوابة ولي الأمر", en: "Parent Portal" },
        icon: "Users",
        description: {
          ar: "متابعة تقدم الطفل ودفع الرسوم والتواصل مع المعلمين.",
          en: "Child progress tracking, fee payments, and teacher communication.",
        },
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/parent",
      },
      {
        id: "school-admin",
        name: { ar: "لوحة الإدارة", en: "Admin Dashboard" },
        icon: "LayoutDashboard",
        description: {
          ar: "تحكم إداري كامل — المستخدمون والتقارير والإعدادات والتحليلات.",
          en: "Full administrative control — users, reports, settings, and analytics.",
        },
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/school/ar/portal/admin",
      },
    ],
  },
  {
    id: "2",
    slug: "alhayat-hospital",
    category: "healthcare",
    categoryLabel: { ar: "الرعاية الصحية", en: "Healthcare" },
    categoryColor: "#38BDF8",
    name: { ar: "مستشفى الحياة", en: "Al-Hayat Hospital" },
    client: { ar: "مركز الحياة الطبي", en: "Al-Hayat Medical Center" },
    year: 2026,
    status: "live",
    description: {
      ar: "منصة إدارة مستشفى متكاملة مع بوابة مرضى، حجز مواعيد، سجلات طبية، ولوحة تحكم إدارية.",
      en: "Complete hospital management platform with patient portal, appointment booking, medical records, and administrative dashboard.",
    },
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      { ar: "بوابة المرضى", en: "Patient portal" },
      { ar: "حجز المواعيد", en: "Appointment booking" },
      { ar: "السجلات الطبية", en: "Medical records" },
      { ar: "إدارة الوصفات", en: "Prescription management" },
      { ar: "نظام الفوترة", en: "Billing system" },
      { ar: "لوحة تحكم الإدارة", en: "Admin dashboard" },
      { ar: "قاعدة بيانات ١٢ طبيب", en: "12 doctors database" },
    ],
    coverImage: "/showcase/hospital-cover.png",
    portals: [
      {
        id: "hospital-website",
        name: { ar: "الموقع الرئيسي", en: "Public Website" },
        icon: "Globe",
        description: {
          ar: "موقع المستشفى مع الأقسام والأطباء وحجز المواعيد.",
          en: "Hospital website with departments, doctors, and appointment booking.",
        },
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/hospital",
      },
      {
        id: "hospital-patient",
        name: { ar: "بوابة المريض", en: "Patient Portal" },
        icon: "Heart",
        description: {
          ar: "السجلات الطبية والمواعيد والوصفات والفوترة للمرضى.",
          en: "Medical records, appointments, prescriptions, and billing for patients.",
        },
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/hospital/ar/portal/patient",
      },
      {
        id: "hospital-admin",
        name: { ar: "لوحة الأطباء والإدارة", en: "Admin & Doctors Dashboard" },
        icon: "LayoutDashboard",
        description: {
          ar: "إدارة المستشفى — الجداول والسجلات والموظفين والتحليلات.",
          en: "Hospital management — scheduling, records, staff, and analytics.",
        },
        screenshots: ["/showcase/school-demo.png"],
        url: "/demos/hospital/ar/portal/admin",
      },
    ],
  },
  {
    id: "3",
    slug: "luxe-estates",
    category: "realestate",
    categoryLabel: { ar: "العقارات", en: "Real Estate" },
    categoryColor: "#C9A84C",
    name: { ar: "لوكس للعقارات", en: "Luxe Estates" },
    client: { ar: "مجموعة لوكس العقارية", en: "Luxe Properties Group" },
    year: 2026,
    status: "in-progress",
    description: {
      ar: "منصة عقارات فاخرة مع جولات افتراضية، ملفات الوكلاء، حاسبة التمويل، ونظام إدارة علاقات العملاء.",
      en: "Luxury property listings platform with virtual tours, agent profiles, mortgage calculator, and property management CRM.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Mapbox", "Supabase"],
    features: [
      { ar: "قوائم العقارات", en: "Property listings" },
      { ar: "جولات افتراضية", en: "Virtual tours" },
      { ar: "ملفات الوكلاء", en: "Agent profiles" },
      { ar: "حاسبة التمويل", en: "Mortgage calculator" },
      { ar: "إدارة العملاء المحتملين", en: "Lead management CRM" },
      { ar: "لوحة التحليلات", en: "Analytics dashboard" },
    ],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "luxe-website",
        name: { ar: "الموقع الرئيسي", en: "Public Website" },
        icon: "Globe",
        description: {
          ar: "قوائم العقارات والجولات الافتراضية وملفات الوكلاء.",
          en: "Property listings, virtual tours, and agent profiles.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "luxe-management",
        name: { ar: "إدارة العقارات", en: "Property Management" },
        icon: "LayoutDashboard",
        description: {
          ar: "إدارة العملاء وتتبع العملاء المحتملين وإدارة العقارات والتحليلات.",
          en: "CRM, lead tracking, property management, and analytics.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
  {
    id: "4",
    slug: "zaytouna-restaurant",
    category: "restaurant",
    categoryLabel: { ar: "المطاعم", en: "Restaurants" },
    categoryColor: "#F97316",
    name: { ar: "مطعم الزيتونة", en: "Zaytouna Restaurant" },
    client: { ar: "مجموعة الزيتونة", en: "Zaytouna Group" },
    year: 2026,
    status: "in-progress",
    description: {
      ar: "منصة مطعم عصرية مع قائمة رقمية، حجز طاولات، طلب إلكتروني، تتبع التوصيل، وإدارة المطبخ.",
      en: "Modern restaurant platform with digital menu, table reservations, online ordering, delivery tracking, and kitchen management.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Socket.io"],
    features: [
      { ar: "قائمة رقمية", en: "Digital menu" },
      { ar: "حجز الطاولات", en: "Table reservations" },
      { ar: "الطلب الإلكتروني", en: "Online ordering" },
      { ar: "تتبع التوصيل", en: "Delivery tracking" },
      { ar: "لوحة المطبخ", en: "Kitchen dashboard" },
      { ar: "إدارة المخزون", en: "Inventory management" },
    ],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "zaytouna-website",
        name: { ar: "الموقع الرئيسي", en: "Public Website" },
        icon: "Globe",
        description: {
          ar: "موقع المطعم مع القائمة والحجوزات والطلب الإلكتروني.",
          en: "Restaurant website with menu, reservations, and online ordering.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "zaytouna-dashboard",
        name: { ar: "لوحة المطعم", en: "Restaurant Dashboard" },
        icon: "LayoutDashboard",
        description: {
          ar: "إدارة المطبخ والطلبات والمخزون وتتبع التوصيل.",
          en: "Kitchen management, orders, inventory, and delivery tracking.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
  {
    id: "5",
    slug: "nexus-corp",
    category: "corporate",
    categoryLabel: { ar: "الشركات", en: "Corporate" },
    categoryColor: "#A78BFA",
    name: { ar: "شركة نيكسس", en: "Nexus Corp" },
    client: { ar: "مجموعة نيكسس للتكنولوجيا", en: "Nexus Technologies" },
    year: 2026,
    status: "in-progress",
    description: {
      ar: "موقع شركة مع عرض خدمات، ملفات الفريق، مدونة، بوابة التوظيف، ولوحة إدارة الموارد البشرية.",
      en: "Corporate website with services showcase, team profiles, blog, careers portal, and internal HR management dashboard.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "Prisma"],
    features: [
      { ar: "عرض الخدمات", en: "Services showcase" },
      { ar: "ملفات الفريق", en: "Team profiles" },
      { ar: "نظام المدونة", en: "Blog system" },
      { ar: "بوابة التوظيف", en: "Careers portal" },
      { ar: "لوحة الموارد البشرية", en: "HR dashboard" },
      { ar: "تتبع المشاريع", en: "Project tracking" },
    ],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "nexus-website",
        name: { ar: "الموقع الرئيسي", en: "Public Website" },
        icon: "Globe",
        description: {
          ar: "موقع الشركة مع الخدمات والفريق والمدونة والتوظيف.",
          en: "Corporate website with services, team, blog, and careers.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "nexus-employee",
        name: { ar: "بوابة الموظف", en: "Employee Portal" },
        icon: "Users",
        description: {
          ar: "أدوات الموارد البشرية وسجلات الدوام وتتبع المشاريع والتواصل الداخلي.",
          en: "HR tools, timesheets, project tracking, and internal communication.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "nexus-admin",
        name: { ar: "لوحة الإدارة", en: "Admin Dashboard" },
        icon: "LayoutDashboard",
        description: {
          ar: "لوحة إدارة كاملة — إدارة الموارد البشرية والتحليلات والإعدادات.",
          en: "Full admin panel — HR management, analytics, and settings.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
  {
    id: "6",
    slug: "souq-digital",
    category: "ecommerce",
    categoryLabel: { ar: "التجارة الإلكترونية", en: "E-commerce" },
    categoryColor: "#F472B6",
    name: { ar: "سوق ديجيتال", en: "Souq Digital" },
    client: { ar: "سوق ديجيتال ذ.م.م", en: "Souq Digital LLC" },
    year: 2026,
    status: "in-progress",
    description: {
      ar: "منصة تجارة إلكترونية متكاملة مع كتالوج منتجات، سلة تسوق، دفع آمن، تتبع طلبات، ولوحة تحكم التاجر.",
      en: "Full-featured e-commerce platform with product catalog, cart system, checkout flow, order tracking, and merchant dashboard.",
    },
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    features: [
      { ar: "كتالوج المنتجات", en: "Product catalog" },
      { ar: "سلة التسوق", en: "Shopping cart" },
      { ar: "دفع آمن", en: "Secure checkout" },
      { ar: "تتبع الطلبات", en: "Order tracking" },
      { ar: "لوحة تحكم التاجر", en: "Merchant dashboard" },
      { ar: "نظام المخزون", en: "Inventory system" },
      { ar: "التحليلات", en: "Analytics" },
    ],
    coverImage: "/showcase/school-demo.png",
    portals: [
      {
        id: "souq-storefront",
        name: { ar: "واجهة المتجر", en: "Storefront" },
        icon: "Store",
        description: {
          ar: "واجهة المتجر مع الكتالوج والسلة والدفع.",
          en: "Customer-facing store with catalog, cart, and checkout.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "souq-vendor",
        name: { ar: "بوابة البائع", en: "Vendor Portal" },
        icon: "ShoppingBag",
        description: {
          ar: "إدارة المنتجات والطلبات وتحليلات البائع.",
          en: "Product management, orders, and seller analytics.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
      {
        id: "souq-admin",
        name: { ar: "لوحة الإدارة", en: "Admin Dashboard" },
        icon: "LayoutDashboard",
        description: {
          ar: "إدارة المنصة — البائعون والطلبات والمستخدمون والتحليلات.",
          en: "Platform management — vendors, orders, users, and analytics.",
        },
        screenshots: ["/showcase/school-demo.png"],
      },
    ],
  },
];
