import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1', 'localhost', 'backend'], //(allowed image hosts for dev)
    remotePatterns: [
      { protocol: 'http', hostname: 'backend', port: '8000' },
      { protocol: 'http', hostname: 'localhost', port: '8000' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
    ],
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
