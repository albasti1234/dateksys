export type ProjectCategory = "education" | "healthcare" | "realestate" | "restaurant" | "corporate" | "ecommerce";

export interface Project {
  id: string;
  slug: string;
  category: ProjectCategory;
  categoryLabel: string;
  categoryColor: string;
  name: string;
  client: string;
  year: number;
  status: "live" | "in-progress" | "completed";
  description: string;
  url?: string;
  techStack: string[];
  features: string[];
  website: {
    screenshots: string[];
    url?: string;
  };
  dashboard: {
    screenshots: string[];
    url?: string;
  };
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
    url: "/demos/school",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Student portal", "Grade tracking", "Parent dashboard", "AI homework helper", "Live bus tracking", "Attendance system", "4 user portals"],
    website: {
      screenshots: ["/showcase/school-demo.png"],
      url: "/demos/school",
    },
    dashboard: {
      screenshots: ["/showcase/school-demo.png"],
      url: "/demos/school/ar/portal/admin",
    },
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
    url: "/demos/hospital",
    techStack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: ["Patient portal", "Appointment booking", "Medical records", "Prescription management", "Billing system", "Admin dashboard", "12 doctors database"],
    website: {
      screenshots: ["/showcase/school-demo.png"],
      url: "/demos/hospital",
    },
    dashboard: {
      screenshots: ["/showcase/school-demo.png"],
      url: "/demos/hospital/ar/portal/admin",
    },
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
    website: { screenshots: ["/showcase/school-demo.png"] },
    dashboard: { screenshots: ["/showcase/school-demo.png"] },
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
    website: { screenshots: ["/showcase/school-demo.png"] },
    dashboard: { screenshots: ["/showcase/school-demo.png"] },
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
    website: { screenshots: ["/showcase/school-demo.png"] },
    dashboard: { screenshots: ["/showcase/school-demo.png"] },
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
    website: { screenshots: ["/showcase/school-demo.png"] },
    dashboard: { screenshots: ["/showcase/school-demo.png"] },
  },
];
