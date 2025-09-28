import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */



const nextConfig = {
  images: {
    domains: ['127.0.0.1', 'localhost', 'backend', 'images.pexels.com'],
    remotePatterns: [
      { 
        protocol: 'http', 
        hostname: 'backend', 
        port: '8000',
        pathname: '/media/**',
      },
      { 
        protocol: 'http', 
        hostname: 'localhost', 
        port: '8000',
        pathname: '/media/**',
      },
      { 
        protocol: 'http', 
        hostname: '127.0.0.1', 
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete
    // even if ESLint errors are present.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:8000/api/:path*',
      },
    ];
  },
  output: "standalone",
};

module.exports = nextConfig;


export default nextConfig;
