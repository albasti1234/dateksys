import type { NextConfig } from "next";
import path from "path";

// ============================================
// Dar Al-Maskan — Next.js Config (Static Export)
// ============================================

const projectRoot = path.join(__dirname);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  outputFileTracingRoot: projectRoot,
  turbopack: {
    root: projectRoot,
  },

  basePath: "/demos/realestate",
  assetPrefix: "/demos/realestate",

  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
