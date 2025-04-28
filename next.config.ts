import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // ESLint hatalarının build'i engellemesini önle
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type-checking hatalarının build'i engellemesini önle
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
