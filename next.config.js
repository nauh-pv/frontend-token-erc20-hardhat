// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // ✅ Nếu đang sử dụng App Router với thư mục `app/`
  },
};

module.exports = nextConfig;
