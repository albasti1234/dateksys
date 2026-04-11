import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Isolate this project from parent node_modules
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
