"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

// Dynamically import GSAP to prevent SSR issues
const GSAPProvider = dynamic(
  () =>
    import("gsap/dist/gsap").then(() => {
      if (typeof window !== "undefined") {
        const { gsap } = require("gsap");
        const { ScrollTrigger } = require("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        return { default: () => null };
      }
      return { default: () => null };
    }),
  { ssr: false }
);

export default function HomePage() {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger on mount
    if (typeof window !== "undefined") {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh();
      });
    }

    // Cleanup function
    return () => {
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return (
    <>
      <GSAPProvider />

      {/* Navigation */}
      <Navigation className={"ml-[20%]"} />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Specializations Section */}
        <SpecializationsSection />

        {/* Features Section with Magic Bento */}
        <FeaturesSection />

        {/* About Section */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

// About Section Component
function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            >
              Empowering The Next Generation of
              <br />
              <span className="text-gradient">Tech Professionals</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              At PrepMaster, we believe that preparation is the key to success.
              Our mission is to provide the most comprehensive and effective
              preparation platform for technical interviews, coding assessments,
              and career advancement in the technology industry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  5+
                </div>
                <div className="text-gray-300">Years Perfecting Prep</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  50K+
                </div>
                <div className="text-gray-300">Successful Placements</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  98%
                </div>
                <div className="text-gray-300">Pass Rate</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="pt-8"
            >
              <p className="text-lg text-gray-400 italic">
                "The smartest way to navigate your tech career future"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
