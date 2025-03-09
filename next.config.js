/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Add explicit CSS configuration
  webpack(config) {
    return config;
  },
  // Ensure static assets are handled correctly
  images: {
    domains: ['api.placeholder'],
  },
}

module.exports = nextConfig
