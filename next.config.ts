import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'cdn.sanity.io'},
      {protocol: 'https', hostname: 'images.unsplash.com'},
      {protocol: 'https', hostname: 'i.vimeocdn.com'},
      {protocol: 'https', hostname: 'i.ytimg.com'}
    ]
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    // V19 §6: the dedicated Cosmetic PR page replaces the PR service page —
    // no competing duplicate PR page.
    return [{source: '/services/pr', destination: '/cosmetic-pr', permanent: true}]
  }
}

export default nextConfig
