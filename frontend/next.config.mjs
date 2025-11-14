/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,   // ⛔ Ignore ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true,   // ⛔ Ignore TS errors during build
  },
};

export default nextConfig;
