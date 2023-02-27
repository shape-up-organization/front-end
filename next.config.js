/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: { reactRemoveProperties: true },
  output: 'standalone',
}

module.exports = nextConfig
