/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'], // Add the locales you need
  },
};

module.exports = nextConfig;
