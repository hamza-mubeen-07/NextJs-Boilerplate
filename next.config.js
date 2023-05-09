/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'es'], // Add the locales you need
  },
};

module.exports = nextConfig;
