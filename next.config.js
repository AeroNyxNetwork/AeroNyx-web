/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'ru', 'zh-Hant', 'zh-Hans', 'ja', 'ko', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
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
