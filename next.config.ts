import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/scroll-hero-animation",
  assetPrefix: "/scroll-hero-animation/",
};

export default nextConfig;