/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 🚀 não falhar no build por erros de ESLint
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
