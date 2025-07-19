import { Inter } from "next/font/google";
import "./globals.css";
import { generateMetadata } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = generateMetadata(
  "PrepMaster - The Smartest Way To Navigate The Future",
  "Harness intelligent systems to optimize, predict, and scale—seamlessly. Master the skills that matter with our cutting-edge learning platform for Frontend, Backend, Mobile, and AI development.",
  "/images/og-image.jpg",
  "https://prepmaster.dev"
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFE24D" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/videos/hero-bg.mp4"
          as="video"
          type="video/mp4"
        />

        {/* SEO and Social Media Tags */}
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />

        {/* Additional Meta Tags */}
        <meta name="author" content="PrepMaster Team" />
        <meta name="creator" content="PrepMaster" />
        <meta name="publisher" content="PrepMaster" />
        <meta name="format-detection" content="telephone=no" />

        {/* Open Graph Tags */}
        <meta property="og:site_name" content="PrepMaster" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Tags */}
        <meta name="twitter:creator" content="@prepmaster" />
        <meta name="twitter:site" content="@prepmaster" />

        {/* PWA Tags */}
        <meta name="application-name" content="PrepMaster" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="PrepMaster" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#FFE24D" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "PrepMaster",
              description:
                "The smartest way to navigate the future of technology. Master Frontend, Backend, Mobile, and AI development with our cutting-edge learning platform.",
              url: "https://prepmaster.dev",
              logo: "https://prepmaster.dev/images/logo.svg",
              foundingDate: "2024",
              founders: [
                {
                  "@type": "Person",
                  name: "PrepMaster Team",
                },
              ],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+1-555-123-4567",
                contactType: "customer service",
                email: "hello@prepmaster.dev",
              },
              sameAs: [
                "https://github.com/prepmaster",
                "https://twitter.com/prepmaster",
                "https://linkedin.com/company/prepmaster",
              ],
              offers: {
                "@type": "EducationalOccupationalCredential",
                name: "Technology Skills Certification",
                description:
                  "Comprehensive certification programs in Frontend, Backend, Mobile, and AI development",
                provider: {
                  "@type": "Organization",
                  name: "PrepMaster",
                },
              },
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-black text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-brand-primary text-black px-4 py-2 rounded-lg font-medium z-50"
        >
          Skip to main content
        </a>

        {/* Main content */}
        <div className="relative min-h-screen">{children}</div>

        {/* Global Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent FOUC (Flash of Unstyled Content)
              document.documentElement.classList.add('js-enabled');
              
              // Performance monitoring
              if ('performance' in window && 'measure' in window.performance) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log('Page Load Time:', pageLoadTime + 'ms');
                  }, 0);
                });
              }
              
              // Error boundary for client-side errors
              window.addEventListener('error', function(e) {
                console.error('Global error:', e.error);
              });
              
              window.addEventListener('unhandledrejection', function(e) {
                console.error('Unhandled promise rejection:', e.reason);
              });
            `,
          }}
        />

        {/* Development tools - only in development */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 left-4 z-50 opacity-30 hover:opacity-100 transition-opacity">
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded">
              <div>DEV MODE</div>
              <div className="block sm:hidden">Mobile</div>
              <div className="hidden sm:block md:hidden">Tablet</div>
              <div className="hidden md:block lg:hidden">Desktop SM</div>
              <div className="hidden lg:block xl:hidden">Desktop MD</div>
              <div className="hidden xl:block 2xl:hidden">Desktop LG</div>
              <div className="hidden 2xl:block">Desktop XL</div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
