// ============================================
// Dar Al-Maskan — Property & Agent Data
// ============================================

import type { Property, Agent, Neighborhood, Testimonial, JournalArticle } from "./types";

// ━━ Properties ━━
export const properties: Property[] = [
  {
    id: "1",
    slug: "villa-serene",
    title: { ar: "فيلا سيرين", en: "Villa Serene" },
    tagline: { ar: "حيث الصمت أبلغ من صخب المدينة", en: "Where silence speaks louder than the city" },
    location: { ar: "عبدون، عمّان", en: "Abdoun, Amman" },
    neighborhood: "abdoun",
    price: 2800000,
    type: "villa",
    status: "for-sale",
    bedrooms: 5,
    bathrooms: 4,
    area: 680,
    lotSize: 1200,
    floors: 2,
    yearBuilt: 2024,
    garage: 3,
    hasPool: true,
    features: [
      { ar: "منزل ذكي", en: "Smart Home" },
      { ar: "مسبح إنفينيتي", en: "Infinity Pool" },
      { ar: "سينما منزلية", en: "Home Cinema" },
      { ar: "قبو نبيذ", en: "Wine Cellar" },
      { ar: "مصعد", en: "Elevator" },
      { ar: "ألواح شمسية", en: "Solar Panels" },
      { ar: "تدفئة أرضية", en: "Underfloor Heating" },
      { ar: "شحن سيارات كهربائية", en: "EV Charging" },
    ],
    description: {
      ar: "فيلا فاخرة في قلب عبدون تجمع بين العمارة الحديثة والراحة المطلقة. تطل على تلال عمّان مع إطلالات بانورامية خلابة.",
      en: "A luxury villa in the heart of Abdoun combining modern architecture with absolute comfort. Overlooking Amman's hills with breathtaking panoramic views.",
    },
    story: {
      ar: "تجلس فيلا سيرين على تلة هادئة في عبدون، حيث يتسلل ضوء الصباح عبر جدران زجاجية من الأرض حتى السقف، ونسيم المساء يحمل عبق الياسمين من الحديقة أدناه. صممها المعماري الحائز على جوائز كريم رشيد، كل غرفة بُنيت كإطار — للضوء، للمنظر، للحظات التي تجعل المنزل وطناً.",
      en: "Villa Serene sits on a quiet hilltop in Abdoun, where the morning sun pours through walls of glass and the evening breeze carries the scent of jasmine from the garden below. Designed by award-winning architect Karim Rashid, every room was conceived as a frame — for light, for view, for the moments that make a house a home.",
    },
    images: [],
    panoramas: [],
    floorPlan: [],
    hotspotImages: [],
    agent: "1",
  },
  {
    id: "2",
    slug: "the-penthouse",
    title: { ar: "البنتهاوس في أبراج أزور", en: "The Penthouse at Azure Towers" },
    tagline: { ar: "فوق المدينة، فوق التوقعات", en: "Above the city, above expectations" },
    location: { ar: "الرابية، عمّان", en: "Rabieh, Amman" },
    neighborhood: "rabieh",
    price: 4200000,
    type: "penthouse",
    status: "for-sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 520,
    floors: 1,
    yearBuilt: 2025,
    garage: 2,
    hasPool: false,
    features: [
      { ar: "إطلالة ٣٦٠° على المدينة", en: "360° City Views" },
      { ar: "سطح خاص", en: "Private Rooftop" },
      { ar: "جدران زجاج ذكي", en: "Smart Glass Walls" },
      { ar: "غرفة نبيذ", en: "Wine Room" },
      { ar: "خدمة كونسيرج", en: "Concierge Service" },
    ],
    description: {
      ar: "بنتهاوس استثنائي في الطابق الأخير من أبراج أزور بإطلالة كاملة على عمّان.",
      en: "An exceptional penthouse on the top floor of Azure Towers with a complete view of Amman.",
    },
    story: {
      ar: "على ارتفاع ٢٢ طابقاً فوق أفق عمّان، البنتهاوس في أبراج أزور ليس مجرد شقة — إنه عالم خاص معلق بين السماء والمدينة.",
      en: "Twenty-two floors above Amman's skyline, The Penthouse at Azure Towers isn't just an apartment — it's a private world suspended between sky and city.",
    },
    images: [],
    panoramas: [],
    hotspotImages: [],
    agent: "2",
  },
  {
    id: "3",
    slug: "garden-estate",
    title: { ar: "ضيعة الحديقة", en: "The Garden Estate" },
    tagline: { ar: "حيث تنتهي المدينة ويبدأ الهدوء", en: "Where the city ends and tranquility begins" },
    location: { ar: "دابوق، عمّان", en: "Dabouq, Amman" },
    neighborhood: "dabouq",
    price: 3500000,
    type: "villa",
    status: "for-sale",
    bedrooms: 7,
    bathrooms: 6,
    area: 950,
    lotSize: 2500,
    floors: 3,
    yearBuilt: 2023,
    garage: 4,
    hasPool: true,
    features: [
      { ar: "ملعب تنس", en: "Tennis Court" },
      { ar: "بيت ضيافة", en: "Guest House" },
      { ar: "بستان زيتون", en: "Olive Grove" },
      { ar: "سكن للخدم", en: "Staff Quarters" },
      { ar: "حديقة يابانية", en: "Japanese Garden" },
    ],
    description: {
      ar: "ضيعة فاخرة على مساحة ٢٥٠٠ متر في دابوق محاطة بأشجار الزيتون والصنوبر.",
      en: "A luxurious estate on 2,500m² in Dabouq surrounded by olive and pine trees.",
    },
    story: {
      ar: "ضيعة الحديقة ليست منزلاً — إنها عالم مصغر. ٢٥٠٠ متر مربع من الخضرة والحجر والهدوء، حيث يستيقظ أطفالك على زقزقة العصافير لا على ضجيج المرور.",
      en: "The Garden Estate isn't a home — it's a micro-world. 2,500 square meters of greenery, stone, and silence, where your children wake to birdsong, not traffic.",
    },
    images: [],
    panoramas: [],
    hotspotImages: [],
    agent: "1",
  },
  {
    id: "4",
    slug: "modern-loft",
    title: { ar: "لوفت أربن ٤٢", en: "Urban Loft 42" },
    tagline: { ar: "حيث التاريخ يلتقي بالمعاصرة", en: "Where heritage meets modernity" },
    location: { ar: "جبل عمّان، الدوار الأول", en: "Jabal Amman, 1st Circle" },
    neighborhood: "jabal-amman",
    price: 480000,
    type: "apartment",
    status: "for-sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 165,
    yearBuilt: 2024,
    hasPool: false,
    features: [
      { ar: "خرسانة مكشوفة", en: "Exposed Concrete" },
      { ar: "أسقف ١٢ متر", en: "12m Ceilings" },
      { ar: "سطح مشترك", en: "Rooftop Access" },
      { ar: "حي تراثي", en: "Heritage District" },
    ],
    description: {
      ar: "لوفت عصري في قلب جبل عمّان التاريخي مع أسقف عالية وتصميم صناعي أنيق.",
      en: "A modern loft in the heart of historic Jabal Amman with high ceilings and elegant industrial design.",
    },
    story: {
      ar: "في بناء حجري عمره ثمانون عاماً في الدوار الأول، حيث كانت نوافذه تطل على عمّان وهي لا تزال قرية — اليوم، نفس النوافذ تؤطر أفقاً مختلفاً تماماً.",
      en: "In an eighty-year-old stone building at the First Circle, where its windows once overlooked Amman as a village — today, those same windows frame an entirely different skyline.",
    },
    images: [],
    panoramas: [],
    hotspotImages: [],
    agent: "2",
  },
  {
    id: "5",
    slug: "sky-residence",
    title: { ar: "سكاي ريزيدنس", en: "Sky Residence" },
    tagline: { ar: "حيث تبدأ السماء من شرفتك", en: "Where the sky begins at your balcony" },
    location: { ar: "دير غبار، عمّان", en: "Deir Ghbar, Amman" },
    neighborhood: "deir-ghbar",
    price: 1200000,
    type: "apartment",
    status: "for-sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 280,
    yearBuilt: 2025,
    garage: 2,
    hasPool: false,
    features: [
      { ar: "الطابق ٢٢", en: "Floor 22" },
      { ar: "كونسيرج", en: "Concierge" },
      { ar: "نادي رياضي وسبا", en: "Gym & Spa" },
      { ar: "موقف تحت الأرض", en: "Underground Parking" },
    ],
    description: {
      ar: "شقة فاخرة في الطابق ٢٢ في دير غبار مع خدمات فندقية متكاملة.",
      en: "A luxury apartment on floor 22 in Deir Ghbar with full hotel-grade services.",
    },
    story: {
      ar: "سكاي ريزيدنس ليست مجرد عنوان — إنها أسلوب حياة. خدمة كونسيرج على مدار الساعة، سبا خاص، ونادي رياضي بإطلالة على المدينة.",
      en: "Sky Residence isn't just an address — it's a lifestyle. Round-the-clock concierge, a private spa, and a gym overlooking the city.",
    },
    images: [],
    panoramas: [],
    hotspotImages: [],
    agent: "1",
  },
  {
    id: "6",
    slug: "olive-hill",
    title: { ar: "تلة الزيتون", en: "Olive Hill Compound" },
    tagline: { ar: "حيث تتنفس الأرض", en: "Where the land breathes" },
    location: { ar: "ناعور، عمّان", en: "Na'ur, Amman" },
    neighborhood: "naur",
    price: 1800000,
    type: "villa",
    status: "for-sale",
    bedrooms: 6,
    bathrooms: 5,
    area: 750,
    lotSize: 3000,
    floors: 2,
    yearBuilt: 2024,
    garage: 3,
    hasPool: true,
    features: [
      { ar: "مزرعة عضوية", en: "Organic Farm" },
      { ar: "إسطبل خيول", en: "Horse Stable" },
      { ar: "طريق خاص", en: "Private Road" },
      { ar: "إطلالة جبلية", en: "Mountain Views" },
      { ar: "بئر ماء خاص", en: "Private Well" },
    ],
    description: {
      ar: "مجمع فلل على ٣٠٠٠ متر في ناعور مع مزرعة عضوية وإسطبل خيول وإطلالات جبلية.",
      en: "A villa compound on 3,000m² in Na'ur with an organic farm, horse stable, and mountain views.",
    },
    story: {
      ar: "تلة الزيتون هي الحلم الذي لم تعرف أنك تحلم به — حيث يستيقظ أطفالك ليجمعوا البيض من الدجاج، وتنتهي أمسياتك بنار مخيم تحت سماء صافية.",
      en: "Olive Hill is the dream you didn't know you had — where your children wake to collect eggs from the chickens, and your evenings end with a campfire under clear skies.",
    },
    images: [],
    panoramas: [],
    hotspotImages: [],
    agent: "2",
  },
];

// ━━ Agents ━━
export const agents: Agent[] = [
  {
    id: "1",
    name: { ar: "ليلى الحسيني", en: "Layla Al-Husseini" },
    title: { ar: "مديرة العقارات الفاخرة", en: "Luxury Properties Director" },
    phone: "+962 79 555 0001",
    email: "layla@darmaskan.jo",
    whatsapp: "+962795550001",
    image: "/demos/realestate/images/agents/layla.webp",
    yearsExperience: 15,
    bio: {
      ar: "١٥ عاماً من الخبرة في سوق العقارات الفاخرة في عمّان. متخصصة في الفلل والعقارات عالية القيمة.",
      en: "15 years of experience in Amman's luxury real estate market. Specializing in villas and high-value properties.",
    },
    languages: ["Arabic", "English", "French"],
    specialties: [
      { ar: "فلل فاخرة", en: "Luxury Villas" },
      { ar: "عقارات استثمارية", en: "Investment Properties" },
    ],
  },
  {
    id: "2",
    name: { ar: "كريم نصّار", en: "Karim Nassar" },
    title: { ar: "مستشار العقارات السكنية", en: "Residential Properties Consultant" },
    phone: "+962 79 555 0002",
    email: "karim@darmaskan.jo",
    whatsapp: "+962795550002",
    image: "/demos/realestate/images/agents/karim.webp",
    yearsExperience: 10,
    bio: {
      ar: "١٠ سنوات في سوق العقارات مع تركيز على الشقق الفاخرة والبنتهاوسات في غرب عمّان.",
      en: "10 years in real estate focusing on luxury apartments and penthouses in West Amman.",
    },
    languages: ["Arabic", "English"],
    specialties: [
      { ar: "شقق فاخرة", en: "Premium Apartments" },
      { ar: "بنتهاوس", en: "Penthouses" },
    ],
  },
];

// ━━ Neighborhoods ━━
export const neighborhoods: Neighborhood[] = [
  { id: "abdoun", name: { ar: "عبدون", en: "Abdoun" }, description: { ar: "أرقى أحياء عمّان السكنية", en: "Amman's most prestigious residential district" }, center: { lat: 31.954, lng: 35.878 }, propertyCount: 12, avgPrice: 2500000, image: "" },
  { id: "rabieh", name: { ar: "الرابية", en: "Rabieh" }, description: { ar: "هدوء وفخامة بين التلال", en: "Quiet luxury among the hills" }, center: { lat: 31.985, lng: 35.843 }, propertyCount: 8, avgPrice: 1800000, image: "" },
  { id: "dabouq", name: { ar: "دابوق", en: "Dabouq" }, description: { ar: "ضواحي فاخرة محاطة بالطبيعة", en: "Luxurious suburbs surrounded by nature" }, center: { lat: 32.008, lng: 35.822 }, propertyCount: 6, avgPrice: 3000000, image: "" },
  { id: "deir-ghbar", name: { ar: "دير غبار", en: "Deir Ghbar" }, description: { ar: "حياة عصرية في قلب عمّان", en: "Modern living in the heart of Amman" }, center: { lat: 31.968, lng: 35.862 }, propertyCount: 15, avgPrice: 900000, image: "" },
  { id: "jabal-amman", name: { ar: "جبل عمّان", en: "Jabal Amman" }, description: { ar: "تراث وثقافة ومعاصرة", en: "Heritage, culture, and modernity" }, center: { lat: 31.951, lng: 35.908 }, propertyCount: 5, avgPrice: 600000, image: "" },
  { id: "naur", name: { ar: "ناعور", en: "Na'ur" }, description: { ar: "ريف عمّان الهادئ", en: "Amman's peaceful countryside" }, center: { lat: 31.873, lng: 35.831 }, propertyCount: 4, avgPrice: 1500000, image: "" },
];

// ━━ Testimonials ━━
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: { ar: "سامر القاسم", en: "Samer Al-Qasem" },
    role: { ar: "مالك منزل في عبدون", en: "Homeowner in Abdoun" },
    quote: {
      ar: "لم يبيعونا منزلاً — بل ساعدونا في إيجاد المكان الذي نبني فيه ذكرياتنا القادمة. الاحترافية والاهتمام بأدق التفاصيل جعل التجربة استثنائية.",
      en: "They didn't sell us a house — they helped us find the place where we'd build our next memories. The professionalism and attention to the smallest details made the experience exceptional.",
    },
    image: "",
    neighborhood: "abdoun",
    rating: 5,
  },
  {
    id: "2",
    name: { ar: "دينا الرفاعي", en: "Dina Al-Rifai" },
    role: { ar: "مستثمرة عقارية", en: "Real Estate Investor" },
    quote: {
      ar: "دار المسكن ليسوا وسطاء — إنهم شركاء حقيقيون في كل قرار. فهمهم العميق للسوق وصدقهم جعلني أثق بهم في كل استثماراتي.",
      en: "Dar Al-Maskan aren't brokers — they're true partners in every decision. Their deep market understanding and honesty made me trust them with all my investments.",
    },
    image: "",
    neighborhood: "rabieh",
    rating: 5,
  },
  {
    id: "3",
    name: { ar: "طارق الأحمد", en: "Tariq Al-Ahmad" },
    role: { ar: "مالك بنتهاوس في الرابية", en: "Penthouse Owner in Rabieh" },
    quote: {
      ar: "الجولة الافتراضية ٣٦٠° أقنعتني قبل أن أزور العقار شخصياً. هذا المستوى من التقنية غير موجود عند أي شركة أخرى في الأردن.",
      en: "The 360° virtual tour convinced me before I even visited the property in person. This level of technology doesn't exist at any other company in Jordan.",
    },
    image: "",
    neighborhood: "rabieh",
    rating: 5,
  },
];

// ━━ Journal Articles ━━
export const journalArticles: JournalArticle[] = [
  {
    id: "1",
    slug: "art-of-choosing-neighborhood",
    title: { ar: "فن اختيار الحي المناسب", en: "The Art of Choosing a Neighborhood" },
    excerpt: { ar: "كيف تختار الحي الذي يناسب أسلوب حياتك وليس فقط ميزانيتك.", en: "How to choose a neighborhood that suits your lifestyle, not just your budget." },
    category: { ar: "دليل", en: "Guide" },
    image: "/demos/realestate/images/journal/neighborhood.webp",
    date: "2026-03-15",
    readTime: 8,
  },
  {
    id: "2",
    slug: "5-details-luxury-home",
    title: { ar: "٥ تفاصيل تحدد المنزل الفاخر", en: "5 Details That Define a Luxury Home" },
    excerpt: { ar: "ليس المساحة ولا السعر — بل التفاصيل الصغيرة التي تفرق بين منزل عادي ومنزل استثنائي.", en: "Not the size or price — but the small details that separate an ordinary home from an exceptional one." },
    category: { ar: "نمط حياة", en: "Lifestyle" },
    image: "/demos/realestate/images/journal/luxury-details.webp",
    date: "2026-02-28",
    readTime: 6,
  },
  {
    id: "3",
    slug: "investment-guide-amman",
    title: { ar: "دليل الاستثمار: أحياء عمّان الصاعدة", en: "Investment Guide: Amman's Rising Districts" },
    excerpt: { ar: "تحليل شامل لأكثر المناطق نمواً في عمّان وأفضل الفرص الاستثمارية لعام ٢٠٢٦.", en: "Comprehensive analysis of Amman's fastest-growing areas and best investment opportunities for 2026." },
    category: { ar: "استثمار", en: "Investment" },
    image: "/demos/realestate/images/journal/investment.webp",
    date: "2026-01-20",
    readTime: 12,
  },
];

// ━━ Helpers ━━
export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getAgent(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US")}`;
}
