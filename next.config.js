/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'localhost:3008',
          },
        ],
        destination: 'http://localhost:3000/:path*',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  transpilePackages: ['react-apexcharts', 'apexcharts']
}

module.exports = nextConfig
