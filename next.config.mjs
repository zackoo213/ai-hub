// next.config.mjs
/** @type {import('next').NextConfig} */
export default {
  // Static export for GitHub Pages
  output: 'export',
  trailingSlash: true,

  // Pages can't run image optimization
  images: { unoptimized: true },

  // keep your existing tolerances
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  // IMPORTANT: no basePath / assetPrefix for a custom domain at the root
};
