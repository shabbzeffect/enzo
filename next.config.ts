import type { NextConfig } from "next";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME;

const cloudinaryPattern = cloudName
  ? {
      protocol: "https" as const,
      hostname: "res.cloudinary.com",
      pathname: `/${cloudName}/**`,
    }
  : null;

const placeholdPattern = {
  protocol: "https" as const,
  hostname: "placehold.co",
};

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      ...(cloudinaryPattern ? [cloudinaryPattern] : []),
      placeholdPattern,
    ],
  },
};

export default nextConfig;
