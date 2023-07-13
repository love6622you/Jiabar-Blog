/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "floatui.com",
      "images.unsplash.com",
      "dev-to-uploads.s3.amazonaws.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "plus.unsplash.com"
    ]
  }
};

module.exports = nextConfig;
