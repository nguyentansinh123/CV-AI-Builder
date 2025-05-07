import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
      allowedOrigins: [
        'localhost:3000',
        '127.0.0.1:3000',
        'gcszqqt9-3000.aue.devtunnels.ms',
      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w0mlmrgwbziwquaq.public.blob.vercel-storage.com"
      },
      {
        protocol: "https",
        hostname: "2sxjqtx62tc7njhe.public.blob.vercel-storage.com"
      }
    ]
  }
};

export default nextConfig;