import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias["pg-cloudflare"] = false;
    config.resolve.alias["pg-native"] = false;
    return config;
  },
};

export default nextConfig;
