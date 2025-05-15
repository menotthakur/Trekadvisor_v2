/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages config
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Trekadvisor_v2' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Trekadvisor_v2' : '',
};

export default nextConfig;
