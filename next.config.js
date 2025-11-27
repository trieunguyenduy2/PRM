/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // RẤT QUAN TRỌNG: ép Next.js chỉ dùng Pages Router, không dùng App Router
    appDir: false,
  },
};

module.exports = nextConfig;
