"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Property, Agent } from "@/lib/types";
import PropertyHero from "@/components/property/PropertyHero";
import PropertyStory from "@/components/property/PropertyStory";
import PanoramaViewer from "@/components/property/PanoramaViewer";
import InteractiveFloorPlan from "@/components/property/InteractiveFloorPlan";
import RoomGallery from "@/components/property/RoomGallery";
import PropertySpecs from "@/components/property/PropertySpecs";
import MortgageCalculator from "@/components/property/MortgageCalculator";
import AgentCard from "@/components/property/AgentCard";
import SimilarProperties from "@/components/property/SimilarProperties";

export default function PropertyDetailClient({
  locale,
  dict,
  property,
  agent,
  similar,
}: {
  locale: Locale;
  dict: Dictionary;
  property: Property | undefined;
  agent: Agent | undefined;
  similar: Property[];
}) {
  const isRTL = locale === "ar";
  const prefix = `/${locale}`;
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const panoramaRef = useRef<HTMLDivElement>(null);

  const scrollToPanorama = useCallback((roomId: string) => {
    panoramaRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            {isRTL ? "العقار غير موجود" : "Property Not Found"}
          </h1>
          <Link href={`${prefix}/properties`} className="text-gold hover:underline">
            {isRTL ? "العودة للعقارات" : "Back to Properties"}
          </Link>
        </div>
      </div>
    );
  }

  // Build room gallery data from panorama scenes
  const roomGalleryData = property.panoramas.map((scene) => ({
    id: scene.id,
    name: scene.name,
    images: [] as string[],
    hasPanorama: true,
  }));

  return (
    <>
      {/* Back button */}
      <div className="absolute top-24 start-8 md:start-16 lg:start-24 z-20">
        <Link
          href={`${prefix}/properties`}
          className="inline-flex items-center gap-2 text-white/60 text-sm hover:text-white transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          {dict.common.back}
        </Link>
      </div>

      {/* 1. Hero */}
      <PropertyHero locale={locale} property={property} />

      {/* 2. Story */}
      <PropertyStory locale={locale} dict={dict.propertyDetail} property={property} />

      {/* 3. 360° Panorama Viewer */}
      {property.panoramas.length > 0 && (
        <div ref={panoramaRef}>
          <PanoramaViewer
            scenes={property.panoramas.map((p) => ({
              id: p.id,
              name: p.name,
              image: p.image,
              hotspots: p.hotspots
                .filter((h) => h.type === "info")
                .map((h) => ({
                  id: h.id,
                  pitch: h.pitch,
                  yaw: h.yaw,
                  title: h.title,
                  brand: h.brand || "",
                  origin: h.origin || "",
                  description: h.description || { ar: "", en: "" },
                  specs: [],
                  image: h.detailImage || "",
                })),
            }))}
            locale={locale}
          />
        </div>
      )}

      {/* 4. Interactive Floor Plan */}
      {property.floorPlan && property.floorPlan.length > 0 && (
        <InteractiveFloorPlan
          locale={locale}
          rooms={property.floorPlan}
          onRoomClick={scrollToPanorama}
        />
      )}

      {/* 5. Room-by-Room Gallery */}
      {roomGalleryData.length > 0 && (
        <RoomGallery
          locale={locale}
          rooms={roomGalleryData}
          onViewPanorama={scrollToPanorama}
        />
      )}

      {/* 6. Specs */}
      <PropertySpecs locale={locale} dict={dict.propertyDetail} property={property} />

      {/* 7. Mortgage Calculator */}
      <MortgageCalculator locale={locale} dict={dict.propertyDetail} propertyPrice={property.price} />

      {/* 8. Agent + Schedule Viewing */}
      {agent && <AgentCard locale={locale} dict={dict.propertyDetail} agent={agent} />}

      {/* 9. Similar Properties */}
      <SimilarProperties locale={locale} dict={dict.propertyDetail} properties={similar} />
    </>
  );
}
