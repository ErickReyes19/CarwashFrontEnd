/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    TZ: "America/Tegucigalpa",
  },
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  productionBrowserSourceMaps: false,
  cleanDistDir: true, // Limpia la carpeta .next antes de compilar
  eslint: {
    ignoreDuringBuilds: true, // Evita errores de ESLint en producción
  },
  experimental: {
    outputFileTracingRoot: __dirname, // Mejora la trazabilidad en despliegues
  },
};

export default nextConfig;
