/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow this Next.js app to be served from a sub-path if needed,
  // e.g. under /app/ while the main Vite SPA serves everything else.
  // Remove basePath if both apps are merged under one domain.
  // basePath: '/app',

  // Allow images from Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "applyza.com",
      },
    ],
  },

  // Ensure trailing slashes match the Vite SPA convention
  trailingSlash: false,

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
