"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Grip, ZoomIn } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { SILK } from "@/lib/animations";

interface HotspotData {
  id: string;
  pitch: number;
  yaw: number;
  title: { ar: string; en: string };
  brand: string;
  origin: string;
  description: { ar: string; en: string };
  specs: string[];
  image: string;
}

interface PanoramaScene {
  id: string;
  name: { ar: string; en: string };
  image: string;
  hotspots: HotspotData[];
}

declare global {
  interface Window {
    pannellum: {
      viewer: (container: HTMLElement, config: Record<string, unknown>) => {
        on: (event: string, cb: () => void) => void;
        destroy: () => void;
      };
    };
  }
}

export default function PanoramaViewer({
  scenes,
  locale,
  initialScene,
}: {
  scenes: PanoramaScene[];
  locale: Locale;
  initialScene?: string;
}) {
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<ReturnType<typeof window.pannellum.viewer> | null>(null);
  const [activeScene, setActiveScene] = useState(initialScene || scenes[0]?.id);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pannellumLoaded, setPannellumLoaded] = useState(false);
  const isRTL = locale === "ar";
  const fontHeading = isRTL ? "font-[var(--font-arabic-heading)]" : "font-[var(--font-heading)]";

  // Load pannellum from CDN
  useEffect(() => {
    if (window.pannellum) {
      setPannellumLoaded(true);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.onload = () => setPannellumLoaded(true);
    document.head.appendChild(script);

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
      }
    };
  }, []);

  const initViewer = useCallback(() => {
    if (!viewerRef.current || !window.pannellum) return;

    const scene = scenes.find((s) => s.id === activeScene);
    if (!scene) return;

    if (viewerInstance.current) {
      viewerInstance.current.destroy();
    }

    viewerRef.current.innerHTML = "";
    setIsLoading(true);

    viewerInstance.current = window.pannellum.viewer(viewerRef.current, {
      type: "equirectangular",
      panorama: scene.image,
      autoLoad: true,
      autoRotate: -1,
      autoRotateStopDelay: 3000,
      compass: false,
      showControls: false,
      hfov: 110,
      minHfov: 50,
      maxHfov: 120,
      friction: 0.15,
      mouseZoom: true,
      hotSpots: scene.hotspots.map((h) => ({
        pitch: h.pitch,
        yaw: h.yaw,
        type: "custom",
        cssClass: "custom-hotspot-gold",
        createTooltipFunc: () => {},
        clickHandlerFunc: () => setActiveHotspot(h),
      })),
    });

    viewerInstance.current.on("load", () => setIsLoading(false));
  }, [activeScene, scenes]);

  useEffect(() => {
    if (pannellumLoaded) {
      initViewer();
    }
  }, [pannellumLoaded, initViewer]);

  if (!scenes.length) return null;

  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold" />
            <span className="section-label">
              {isRTL ? "جولة افتراضية ٣٦٠°" : "360° VIRTUAL TOUR"}
            </span>
          </div>
          <h2 className={fontHeading}>
            {isRTL ? "تجوّل في " : "Walk Through "}
            <em className="italic text-gold">{isRTL ? "كل غرفة" : "Every Room"}</em>
          </h2>
          <p className="text-text-secondary mt-2 max-w-lg text-sm font-light">
            {isRTL
              ? "استكشف هذا العقار بزاوية ٣٦٠°. انقر على العلامات الذهبية لاكتشاف المواد والتجهيزات."
              : "Explore this property in full 360°. Click the golden markers to discover materials and fixtures."}
          </p>
        </div>

        {/* Panorama container */}
        <div className="relative w-full aspect-[21/9] md:aspect-[2/1] bg-black overflow-hidden rounded-2xl">
          {/* Loading */}
          {isLoading && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                <span className="text-white/40 text-sm tracking-wider">
                  {isRTL ? "جاري التحميل..." : "Loading panorama..."}
                </span>
              </div>
            </div>
          )}

          {/* Pannellum */}
          <div ref={viewerRef} className="absolute inset-0 z-10" />

          {/* Room navigation */}
          <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/70 to-transparent pt-12 pb-4 px-6">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {scenes.map((scene) => (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(scene.id)}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-[11px] tracking-wider uppercase font-medium transition-all duration-300 ${
                    activeScene === scene.id
                      ? "bg-gold text-white"
                      : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {scene.name[locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="absolute top-4 start-4 z-20 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 pointer-events-none flex items-center gap-3">
            <Grip className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white/40 text-[10px] tracking-wider">
              {isRTL ? "اسحب للنظر · اضغط على العلامات الذهبية" : "DRAG TO LOOK · CLICK GOLD MARKERS"}
            </span>
          </div>
        </div>
      </div>

      {/* Hotspot detail panel */}
      <AnimatePresence>
        {activeHotspot && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveHotspot(null)}
            />
            <motion.div
              className="fixed top-0 end-0 bottom-0 z-[101] w-full max-w-md bg-white shadow-2xl overflow-y-auto"
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={() => setActiveHotspot(null)}
                className="absolute top-6 end-6 z-10 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center hover:bg-black/10 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {activeHotspot.image && (
                <div className="aspect-[4/3] bg-surface-warm overflow-hidden">
                  <img
                    src={activeHotspot.image}
                    alt={activeHotspot.title[locale]}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-8">
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-medium">
                  {isRTL ? "تفاصيل المواد" : "MATERIAL DETAIL"}
                </span>
                <h3 className={`text-2xl mt-3 mb-4 ${fontHeading}`}>
                  {activeHotspot.title[locale]}
                </h3>
                <div className="w-12 h-px bg-gold/30 mb-6" />
                <p className="text-text-body text-[15px] leading-relaxed mb-6 font-light">
                  {activeHotspot.description[locale]}
                </p>

                {(activeHotspot.brand || activeHotspot.origin) && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {activeHotspot.brand && (
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
                          {isRTL ? "العلامة" : "Brand"}
                        </span>
                        <p className="text-text-heading font-medium mt-1">{activeHotspot.brand}</p>
                      </div>
                    )}
                    {activeHotspot.origin && (
                      <div>
                        <span className="text-[10px] tracking-[0.2em] uppercase text-text-muted">
                          {isRTL ? "المنشأ" : "Origin"}
                        </span>
                        <p className="text-text-heading font-medium mt-1">{activeHotspot.origin}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeHotspot.specs.length > 0 && (
                  <div className="space-y-2">
                    {activeHotspot.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-text-body">
                        <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
