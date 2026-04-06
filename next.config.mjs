/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.wisewin.ca',
        pathname: '/**',
      },
    ],
  },
}
export default nextConfig
