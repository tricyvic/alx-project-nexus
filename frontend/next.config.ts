import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1'], // or your deployed backend domain
  },
};

module.exports = nextConfig;


export default nextConfig;
