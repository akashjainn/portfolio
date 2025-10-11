const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow embedding this portfolio in same-origin only (not needed for our use-case),
          // but we control framing via CSP frame-ancestors below. Remove legacy X-Frame-Options to avoid conflicts.
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions-Policy kept minimal (no powerful features needed here)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Relax COOP/COEP so cross-origin iframes can render without COEP violations
          // (we are not using SharedArrayBuffer/COOP-isolation here)
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'unsafe-none' },
          // Allow loading cross-origin images used by previews
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
          // Basic CSP suitable for static portfolio content
          {
            key: 'Content-Security-Policy',
            value: [
              // Defaults
              "default-src 'self'",
              // Scripts and styles for Next.js + inline styles from Tailwind JIT in dev
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts and images (allow data URIs for generated placeholders)
              "img-src 'self' data: blob: https:",
              "font-src 'self' https://fonts.gstatic.com",
              // API/connect permissions
              "connect-src 'self' https://vitals.vercel-insights.com",
              // Allow iframes from our project sites only
              "frame-src 'self' https://propsage-web.vercel.app https://stocksense-taupe.vercel.app https://land-safe.vercel.app http://localhost:3000 http://localhost:3001",
              // Who may embed THIS site (we can keep strict)
              "frame-ancestors 'self'",
              // Misc
              "base-uri 'self'",
              "form-action 'self'"
            ].join('; ')
          }
        ]
      }
    ]
  },
  
  // Performance budgets
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Add performance hints for production bundles
      config.performance = {
        hints: 'warning',
        maxAssetSize: 250000, // 250kb
        maxEntrypointSize: 500000, // 500kb
      }
    }
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)