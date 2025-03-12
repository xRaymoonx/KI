/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Bildoptimierung für externe Domains
  images: {
    domains: ["cdn-icons-png.flaticon.com", "deine-domain.com"], // Ersetze "deine-domain.com" mit deiner echten Domain
    deviceSizes: [320, 420, 768, 1024, 1200],
    formats: ["image/avif", "image/webp"],
  },

  // Modularer Import für kleinere Bundle-Größe
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
  },

  // Caching-Optimierung für bessere Performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
        ],
      },
    ];
  },

  // Automatische Dateierweiterungen für Imports
  pageExtensions: ["ts", "tsx", "js", "jsx"],

  // Verbesserte Performance & stabiler Build
  output: "standalone",
  trailingSlash: false, // False für saubere URLs ohne "/"
};

module.exports = nextConfig;