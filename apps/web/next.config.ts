import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/u/**',
      },
    ],

    // TODO: If the image load more than seven second, it will throw timeout error on nextjs image optimisation server (Nextjs 15).
    unoptimized: true,
  },
}

export default nextConfig
