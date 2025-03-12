/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn-icons-png.flaticon.com", "deine-domain.com"], // Erlaubte Bild-Hosts
    deviceSizes: [320, 420, 768, 1024, 1200],
    formats: ["image/avif", "image/webp"],
  },
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
  },
};

module.exports = nextConfig;