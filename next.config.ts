import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 64, 128, 256],
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
module.exports = {
  allowedDevOrigins: ['169.254.166.44:3000'],
}
module.exports = {
  allowedDevOrigins: ['169.254.166.44'],
}