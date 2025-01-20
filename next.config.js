/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      enabled: true
    },
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com', 'utfs.io']
  }
}

module.exports = nextConfig