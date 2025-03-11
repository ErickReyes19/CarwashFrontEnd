import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TZ: "America/Tegucigalpa",
  },
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  productionBrowserSourceMaps: false,
  cleanDistDir: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    outputFileTracingRoot: path.dirname(new URL(import.meta.url).pathname), // Usar import.meta.url en lugar de __dirname
  },
};

export default nextConfig;
