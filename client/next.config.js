/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable server-side rendering
  render: {
    staticMarkup: false,
    staticOptimization: false,
  },
  ssr: false,
};

module.exports = nextConfig;
