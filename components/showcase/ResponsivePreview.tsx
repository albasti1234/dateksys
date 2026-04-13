"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Tablet, Smartphone } from "lucide-react";

type DeviceSize = "desktop" | "tablet" | "mobile";

const devices: { value: DeviceSize; icon: typeof Monitor; label: string }[] = [
  { value: "desktop", icon: Monitor, label: "Desktop" },
  { value: "tablet", icon: Tablet, label: "Tablet" },
  { value: "mobile", icon: Smartphone, label: "Mobile" },
];

const deviceWidths: Record<DeviceSize, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

interface ResponsivePreviewProps {
  children: React.ReactNode;
}

export default function ResponsivePreview({ children }: ResponsivePreviewProps) {
  const [device, setDevice] = useState<DeviceSize>("desktop");

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Device toggle */}
      <div className="flex items-center justify-end gap-1 mb-4">
        {devices.map(({ value, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setDevice(value)}
            className="p-2 rounded-md transition-colors"
            style={{
              background: device === value ? "rgba(139,123,244,0.12)" : "transparent",
              color: device === value ? "#8B7BF4" : "rgba(240,237,230,0.3)",
            }}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Preview container */}
      <div className="flex-1 flex items-start justify-center overflow-auto">
        <motion.div
          animate={{ width: deviceWidths[device] }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{ maxWidth: "100%" }}
          className={
            device === "mobile"
              ? "rounded-[2rem] overflow-hidden border-[3px]"
              : device === "tablet"
                ? "rounded-xl overflow-hidden border-2"
                : ""
          }
          {...(device !== "desktop" && {
            style: {
              maxWidth: "100%",
              width: deviceWidths[device],
              borderColor: "rgba(255,255,255,0.08)",
            },
          })}
        >
          {device === "mobile" && (
            <div
              className="h-6 flex items-center justify-center"
              style={{ background: "#0C0C12" }}
            >
              <div
                className="w-20 h-1.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.1)" }}
              />
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </div>
  );
}
