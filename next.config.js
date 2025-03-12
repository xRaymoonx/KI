/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true, // Schnellere Minifizierung durch SWC

  // Image-Optimierung
  images: {
    domains: ["cdn-icons-png.flaticon.com", "deine-domain.com"], // Erlaubte Bild-Hosts
    deviceSizes: [320, 420, 768, 1024, 1200], // Optimierte Image-Skalierungen
    formats: ["image/avif", "image/webp"], // Moderne Bildformate für bessere Kompression
  },

  // Optimiertes Laden von Modulen
  modularizeImports: {
    "react-icons": {
      transform: "react-icons/{{member}}",
    },
  },

  // Caching-Optimierung für schnellere Seitenladezeiten
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

  // Verbesserte SSR & ISR (Incremental Static Regeneration)
  output: "standalone", // Reduziert Build-Größe für einfache Bereitstellung
  trailingSlash: true, // Bessere URL-Struktur für SEO
  experimental: {
    appDir: true, // Falls der Next.js App Router genutzt wird
  },
};

module.exports = nextConfig;