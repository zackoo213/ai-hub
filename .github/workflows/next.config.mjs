const isProd = process.env.NODE_ENV === 'production';
const repo = 'ai-hub';
export default {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
  images: { unoptimized: true },
};
