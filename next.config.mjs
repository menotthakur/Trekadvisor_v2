/** @type {import('next').NextConfig} */
const nextConfig = {
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
