import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xvrfaziclgnczuiddifr.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
