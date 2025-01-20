/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      enabled: true
    },
  },
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com']
  }
}

module.exports = nextConfig 