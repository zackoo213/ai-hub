// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'ai-hub'; // 👈 name of your repo

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // needed for static export
  trailingSlash: true,         // safer on Pages
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
