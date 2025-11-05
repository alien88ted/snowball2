import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const nextPackage = require('next/package.json')
const nextMajorVersion = parseInt(nextPackage.version.split('.')[0] || '0', 10)
const enableTurbopackConfig = Number.isFinite(nextMajorVersion) && nextMajorVersion >= 16

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  ...(enableTurbopackConfig ? { turbopack: {} } : {}),
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }
    return config
  },
}

export default nextConfig
