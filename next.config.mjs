/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  webpack: (config, { dev, isServer }) => {
    // Handle GSAP for SSR
    config.externals = config.externals || [];

    if (isServer) {
      config.externals.push({
        gsap: "gsap",
        "gsap/ScrollTrigger": "gsap/ScrollTrigger",
      });
    }

    // Optimize video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/videos/",
          outputPath: "static/videos/",
          name: "[name].[hash].[ext]",
        },
      },
    });

    // Optimize SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Modern build optimizations
  poweredByHeader: false,
  reactStrictMode: true,

  // Video and asset optimization
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirect and rewrites
  async redirects() {
    return [
      // Add any redirects here if needed
    ];
  },

  // Environment variables
  env: {
    SITE_URL: process.env.SITE_URL || "https://prepmaster.dev",
    APP_NAME: "PrepMaster",
    APP_DESCRIPTION:
      "The smartest way to navigate the future of your tech career",
  },

  // Output configuration
  output: "standalone",

  // Disable x-powered-by header
  poweredByHeader: false,

  // Compression
  compress: true,

  // Build optimization
  generateBuildId: async () => {
    // You can return any string here, but it's recommended to return a hash
    return process.env.BUILD_ID || `build-${Date.now()}`;
  },
};

export default nextConfig;
