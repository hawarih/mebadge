/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you'll use
  }
}

const withNextIntl = require('next-intl/plugin')(
  './src/i18n.ts'
)

module.exports = withNextIntl(nextConfig) 