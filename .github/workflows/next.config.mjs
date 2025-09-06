// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'ai-hub'; // <- your repo name

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // needed for GitHub Pages (static HTML)
  trailingSlash: true,         // safer paths on Pages
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },

  // keep your current settings:
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
