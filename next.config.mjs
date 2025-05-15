/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages config
  output: 'export',
  distDir: 'out',
  basePath: process.env.NODE_ENV === 'production' ? '/Trekadvisor_v2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Trekadvisor_v2' : '',
  trailingSlash: true,
  
  // Increase timeout for API calls
  serverRuntimeConfig: {
    timeout: 30000,
  },
  
  // Custom image domains and remotePatterns
  images: {
    domains: ['localhost'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
    ],
  },
};

export default nextConfig;
