"use client";

import { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ============================================
// Live bus tracking map — Leaflet + OpenStreetMap
// ============================================
// Real map of Amman, animated bus marker following a polyline route
// from the school (Abu Nseir) to a home neighborhood.

// Real Amman coordinates — Abu Nseir area down to Sweifieh
const ROUTE: [number, number][] = [
  [32.0496, 35.9019], // Abu Nseir (School)
  [32.045, 35.905],
  [32.04, 35.91],
  [32.035, 35.913],
  [32.028, 35.915],
  [32.02, 35.914],
  [32.012, 35.912],
  [32.004, 35.91],
  [31.996, 35.905],
  [31.988, 35.9], // Sweifieh
  [31.982, 35.895], // Home
];

const STOPS: { pos: [number, number]; labelAr: string; labelEn: string }[] = [
  {
    pos: [32.0496, 35.9019],
    labelAr: "المدرسة",
    labelEn: "School",
  },
  {
    pos: [32.028, 35.915],
    labelAr: "تقاطع شارع مكة",
    labelEn: "Mecca St. intersection",
  },
  {
    pos: [32.004, 35.91],
    labelAr: "دوار الأمير راشد",
    labelEn: "Prince Rashid Circle",
  },
  {
    pos: [31.982, 35.895],
    labelAr: "منزلكم",
    labelEn: "Your home",
  },
];

// Linear interpolation between two points
function lerp(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

// Position along full polyline given progress 0..1
function positionOnRoute(progress: number): [number, number] {
  const segments = ROUTE.length - 1;
  const total = progress * segments;
  const segIdx = Math.min(Math.floor(total), segments - 1);
  const segT = total - segIdx;
  return lerp(ROUTE[segIdx], ROUTE[segIdx + 1], segT);
}

// Gold-themed bus icon
function createBusIcon() {
  return L.divIcon({
    className: "custom-bus-icon",
    html: `
      <div style="
        width: 44px;
        height: 44px;
        background: #C19A4B;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          background: #C19A4B;
          opacity: 0.4;
          animation: busPulse 1.5s infinite;
        "></div>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="position: relative; z-index: 1;">
          <path d="M8 6v6"/>
          <path d="M15 6v6"/>
          <path d="M2 12h19.6"/>
          <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/>
          <circle cx="7" cy="18" r="2"/>
          <path d="M9 18h5"/>
          <circle cx="16" cy="18" r="2"/>
        </svg>
      </div>
      <style>
        @keyframes busPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.6); opacity: 0; }
        }
      </style>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
  });
}

function createStopIcon(color: string, isSchool = false) {
  return L.divIcon({
    className: "custom-stop-icon",
    html: `
      <div style="
        width: ${isSchool ? 28 : 20}px;
        height: ${isSchool ? 28 : 20}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      "></div>
    `,
    iconSize: [isSchool ? 28 : 20, isSchool ? 28 : 20],
    iconAnchor: [isSchool ? 14 : 10, isSchool ? 14 : 10],
  });
}

export default function BusMap({
  locale,
}: {
  locale: "ar" | "en";
}) {
  const [progress, setProgress] = useState(0.45); // Start at ~45% of route
  const [position, setPosition] = useState<[number, number]>(() =>
    positionOnRoute(0.45)
  );
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 90_000; // 90 seconds to complete full journey from start
    const initialProgress = 0.45;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }
      const elapsed = timestamp - startTimeRef.current;
      const newProgress = Math.min(
        initialProgress + (elapsed / duration) * (1 - initialProgress),
        1
      );
      setProgress(newProgress);
      setPosition(positionOnRoute(newProgress));

      if (newProgress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const busIcon = createBusIcon();
  const schoolIcon = createStopIcon("#2D8659", true);
  const stopIcon = createStopIcon("#C19A4B");
  const homeIcon = createStopIcon("#0F2C5C", true);

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[32.015, 35.908]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ minHeight: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Route polyline — completed */}
        <Polyline
          positions={ROUTE.slice(
            0,
            Math.ceil(progress * (ROUTE.length - 1)) + 1
          )}
          pathOptions={{
            color: "#C19A4B",
            weight: 5,
            opacity: 0.85,
          }}
        />

        {/* Route polyline — upcoming (dashed) */}
        <Polyline
          positions={ROUTE.slice(
            Math.ceil(progress * (ROUTE.length - 1))
          )}
          pathOptions={{
            color: "#0F2C5C",
            weight: 4,
            opacity: 0.5,
            dashArray: "8, 8",
          }}
        />

        {/* Stop markers */}
        {STOPS.map((stop, i) => {
          const icon =
            i === 0
              ? schoolIcon
              : i === STOPS.length - 1
                ? homeIcon
                : stopIcon;
          return (
            <Marker key={i} position={stop.pos} icon={icon}>
              <Popup>
                <strong>
                  {locale === "ar" ? stop.labelAr : stop.labelEn}
                </strong>
              </Popup>
            </Marker>
          );
        })}

        {/* Destination radius */}
        <CircleMarker
          center={STOPS[STOPS.length - 1].pos}
          radius={24}
          pathOptions={{
            color: "#0F2C5C",
            fillColor: "#0F2C5C",
            fillOpacity: 0.1,
            weight: 1,
          }}
        />

        {/* Live bus position */}
        <Marker position={position} icon={busIcon}>
          <Popup>
            <strong>
              {locale === "ar" ? "الباص ٠٧" : "Bus 07"} · Live
            </strong>
            <br />
            {locale === "ar" ? "السرعة: ٣٥ كم/س" : "Speed: 35 km/h"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
