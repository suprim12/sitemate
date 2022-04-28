/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  env: {
    MONGO_URI:
      'mongodb+srv://admin:pass@cluster0.5doio.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  },
};

module.exports = nextConfig;
