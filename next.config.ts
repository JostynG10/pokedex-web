import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["raw.githubusercontent.com"], // Agrega el dominio permitido
  },
};

export default nextConfig;
