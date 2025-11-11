import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  output: "standalone",
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.coverr.co",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SUPPORTED_LOCALES: "en,ar,fa",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
