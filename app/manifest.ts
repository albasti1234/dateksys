import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DatekSys — Enterprise IT Infrastructure",
    short_name: "DatekSys",
    description:
      "Enterprise networking, data centers, security systems, and custom software development in Amman, Jordan.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090B",
    theme_color: "#0EA5E9",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
