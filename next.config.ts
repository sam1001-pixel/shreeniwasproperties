import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/rentals',
        destination: '/properties?purpose=rent',
        permanent: true,
      },
      {
        source: '/buy',
        destination: '/properties?purpose=sale',
        permanent: true,
      },
      {
        source: '/commercial',
        destination: '/properties?purpose=commercial_lease',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
