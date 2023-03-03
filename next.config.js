/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { reactRemoveProperties: true },
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
