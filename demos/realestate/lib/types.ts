// ============================================
// Dar Al-Maskan — Type Definitions
// ============================================

export type Locale = "ar" | "en";
export type Localized = { ar: string; en: string };

// ━━ Property ━━
export interface Property {
  id: string;
  slug: string;
  title: Localized;
  tagline: Localized;
  location: Localized;
  neighborhood: string;
  price: number;
  type: "villa" | "apartment" | "penthouse" | "land";
  status: "for-sale" | "for-rent" | "sold";
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSize?: number;
  floors?: number;
  yearBuilt: number;
  garage?: number;
  hasPool: boolean;
  features: Localized[];
  description: Localized;
  story: Localized;
  images: string[];
  panoramas: PanoramaScene[];
  floorPlan?: FloorPlanRoom[];
  hotspotImages: HotspotImage[];
  agent: string;
}

// ━━ Panorama ━━
export interface PanoramaScene {
  id: string;
  name: Localized;
  image: string;
  thumbnail: string;
  hotspots: PanoramaHotspot[];
}

export interface PanoramaHotspot {
  id: string;
  pitch: number;
  yaw: number;
  type: "info" | "navigate";
  icon: string;
  title: Localized;
  description?: Localized;
  brand?: string;
  origin?: string;
  detailImage?: string;
  targetScene?: string;
}

// ━━ Floor Plan ━━
export interface FloorPlanRoom {
  id: string;
  label: Localized;
  area: number;
  path: string;
  panoramaId?: string;
}

// ━━ Hotspot Gallery ━━
export interface HotspotImage {
  id: string;
  image: string;
  room: Localized;
  hotspots: ImageHotspot[];
}

export interface ImageHotspot {
  id: string;
  x: number;
  y: number;
  category: "material" | "fixture" | "appliance" | "feature";
  title: Localized;
  brand: string;
  description: Localized;
  origin: string;
  detailImage?: string;
}

// ━━ Agent ━━
export interface Agent {
  id: string;
  name: Localized;
  title: Localized;
  phone: string;
  email: string;
  whatsapp: string;
  image: string;
  yearsExperience: number;
  bio: Localized;
  languages: string[];
  specialties: Localized[];
}

// ━━ Neighborhood ━━
export interface Neighborhood {
  id: string;
  name: Localized;
  description: Localized;
  center: { lat: number; lng: number };
  propertyCount: number;
  avgPrice: number;
  image: string;
}

// ━━ Testimonial ━━
export interface Testimonial {
  id: string;
  name: Localized;
  role: Localized;
  quote: Localized;
  image: string;
  neighborhood: string;
  rating: number;
}

// ━━ Journal ━━
export interface JournalArticle {
  id: string;
  slug: string;
  title: Localized;
  excerpt: Localized;
  category: Localized;
  image: string;
  date: string;
  readTime: number;
}
