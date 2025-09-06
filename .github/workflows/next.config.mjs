// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Génère du statique pour GitHub Pages
  output: 'export',
  // Évite des 404 sur Pages
  trailingSlash: true,

  // Next/Image sans optimisation côté serveur (obligatoire sur Pages)
  images: { unoptimized: true },

  // Garde tes réglages existants
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // IMPORTANT : pas de basePath / assetPrefix pour un domaine custom
  // basePath: '',
  // assetPrefix: '',
};

export default nextConfig;
