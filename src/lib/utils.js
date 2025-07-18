import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDelay(index, baseDelay = 0.1) {
  return `${baseDelay + index * 0.1}s`;
}

export function generateStaggerDelay(index, stagger = 0.1) {
  return index * stagger;
}

export function debounce(func, wait) {
  let timeout = null;

  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;

  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function getRandomDelay(min = 0, max = 1) {
  return Math.random() * (max - min) + min;
}

export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

export function lerp(start, end, factor) {
  return start + factor * (end - start);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(value, inMin, inMax, outMin, outMax) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

// Animation utilities
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const slideInFromBottom = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
};

// Device detection
export function isMobile() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
}

export function isTablet() {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  }
  return false;
}

export function isDesktop() {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 1024;
  }
  return false;
}

// URL utilities
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;
}

// SEO utilities
export function generateMetadata(title, description, image, url) {
  const baseUrl = getBaseUrl();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: url || baseUrl,
      siteName: "PrepMaster",
      images: [
        {
          url: image || `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || `${baseUrl}/images/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
