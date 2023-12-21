/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable server-side rendering
  ssr: false,
  experimental: {
    render: {
      staticMarkup: false,
      staticOptimization: false,
    },
    reactMode: "concurrent",
  },
  reactStrictMode: true,
  devIndicators: {
    autoPrerender: false,
  },
};

module.exports = nextConfig;
