// next.config.mjs
const isProd = process.env.NODE_ENV === 'production';
const repo = 'ai-hub'; // ⬅️ mets exactement le nom de TON repo

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique pour GitHub Pages
  output: 'export',
  // URLs finissant par / (évite des 404 sur Pages)
  trailingSlash: true,
  // Préfixes nécessaires pour un "project page" (…/ai-hub/)
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',

  // Images Next sans optimisation serveur (obligatoire sur Pages)
  images: { unoptimized: true },

  // Tu gardes tes réglages existants
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
