"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { useState } from "react";

const categories = ["All", "Campus", "Academics", "Sports", "Arts", "Events"];

const images = [
  { src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80", cat: "Campus", title: "Main Building" },
  { src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80", cat: "Academics", title: "Mathematics Class" },
  { src: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80", cat: "Sports", title: "Basketball Championship" },
  { src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&q=80", cat: "Arts", title: "Spring Concert" },
  { src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", cat: "Events", title: "International Day" },
  { src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80", cat: "Academics", title: "Robotics Lab" },
  { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80", cat: "Campus", title: "Library" },
  { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80", cat: "Academics", title: "Graduation Day" },
  { src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80", cat: "Campus", title: "Early Years Garden" },
  { src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80", cat: "Academics", title: "Library Reading" },
  { src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80", cat: "Campus", title: "Main Entrance" },
  { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80", cat: "Events", title: "Science Fair" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? images : images.filter((i) => i.cat === filter);

  return (
    <>
      <PageHero label="Gallery" title="Life at Al-Nakhla" subtitle="A visual journey through our campus, classrooms, and community moments." breadcrumbs={[{ label: "Gallery" }]} />

      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${filter === c ? "bg-[var(--color-navy)] text-white" : "bg-[var(--color-cream)] text-[var(--color-ink-soft)] hover:bg-[var(--color-navy)] hover:text-white"}`}>{c}</button>
            ))}
          </div>

          {/* Masonry-like grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.src}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
                className={`group relative overflow-hidden cursor-pointer ${i % 5 === 0 ? "md:row-span-2" : ""}`}
                style={{ minHeight: i % 5 === 0 ? 480 : 240 }}
              >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${img.src}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-navy)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 start-0 end-0 p-5 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-gold-light)]">{img.cat}</span>
                  <h3 className="font-serif text-lg font-bold mt-1">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
