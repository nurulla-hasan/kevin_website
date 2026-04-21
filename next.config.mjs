/** @type {import('next').NextConfig} */

// Use env so you can change host/port/protocol per environment
const API_PROTOCOL = process.env.NEXT_PUBLIC_API_PROTOCOL || "http";
const API_HOST     = process.env.NEXT_PUBLIC_API_HOST     || "10.10.20.13";
const API_PORT     = process.env.NEXT_PUBLIC_API_PORT     || "5000";

const nextConfig = {
  images: {
    // Modern formats when available
    formats: ['image/avif', 'image/webp'],

    // Prefer remotePatterns over domains; more precise & supports ports/paths
    remotePatterns: [
      // Your backend uploads (env-configurable)
      {
        protocol: API_PROTOCOL, // "http" or "https"
        hostname: API_HOST, // e.g. "10.10.20.13"
        port: API_PORT, // e.g. "5000"
        pathname: '/uploads/**',
      },
      // Add the backend.yourtradesource.com hostname
      {
        protocol: 'http',
        hostname: 'backend.yourtradesource.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'backend.yourtradesource.com',
        pathname: '/**',
      },
      // Local dev fallbacks
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      },

      // CDNs / third-parties you already use
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '10.10.20.13',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '10.10.20.34',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '5f05bcd58f5a.ngrok-free.app',
        pathname: '/**',
      },
      // Placeholder image service
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
