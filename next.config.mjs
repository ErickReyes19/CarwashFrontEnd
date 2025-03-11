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
  typescript: {
    ignoreBuildErrors: true, 
  },
  experimental: {
    turboMode: true,
  },
};

export default nextConfig;
