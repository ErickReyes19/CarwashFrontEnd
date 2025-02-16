/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TZ: "America/Tegucigalpa",
  },
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  productionBrowserSourceMaps: false,
};

export default nextConfig;
