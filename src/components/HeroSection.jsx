"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Play,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronDown,
  Search,
} from "lucide-react";
import { useGSAP, gsapAnimations } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

const HeroSection = ({ className }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const { animate, animateFrom } = useGSAP();

  useEffect(() => {
    // Animate elements on mount
    if (sectionRef.current) {
      const tl = gsapAnimations.staggerFadeInUp(".hero-animate", 0.2);

      // Animate stats with delay
      gsapAnimations.fadeInUp(".hero-stats", 0.8);

      // Animate floating elements
      animate(".hero-float", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }
  }, [animate]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Search query:", searchQuery);
  };

  const stats = [
    { label: "Active Learners", value: "10K+", icon: Users },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Expert Rating", value: "4.9", icon: Star },
    { label: "Certifications", value: "50+", icon: Award },
  ];

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        className
      )}
      style={{ y, opacity }}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-1000",
            isVideoLoaded ? "opacity-100" : "opacity-0"
          )}
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Fallback Background */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-animate inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/20 text-sm text-white/90"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>Recognized as a top innovator in skill-driven platforms</span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hero-animate text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
            >
              <span className="text-white text-shadow">
                The Smartest Way To
              </span>
              <br />
              <span className="text-gradient text-shadow">
                Navigate The Future
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="hero-animate text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Harness intelligent systems to optimize, predict, and
              scale—seamlessly. Master the skills that matter with our
              cutting-edge learning platform.
            </motion.p>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="hero-animate max-w-2xl mx-auto"
          >
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter a use case..."
                  className="w-full pl-12 pr-32 py-4 rounded-full glass border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent backdrop-blur-lg text-lg"
                />
                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  className="absolute right-2 rounded-full font-bold"
                >
                  Explore Solutions
                </Button>
              </div>
            </form>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Button
              variant="brand"
              size="xl"
              className="font-bold group"
              icon={
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              }
              iconPosition="right"
            >
              Get Started Free
            </Button>

            <Button
              variant="brand-glass"
              size="xl"
              className="font-medium group"
              icon={
                <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
              }
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="hero-stats grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-xl p-4 sm:p-6 border border-white/20 group hover:border-brand-primary/50 transition-all duration-300"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="p-2 rounded-lg bg-brand-primary/20 group-hover:bg-brand-primary group-hover:text-black transition-all duration-300">
                      <IconComponent className="h-5 w-5 text-brand-primary group-hover:text-black" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 text-center">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-white/70 hover:text-brand-primary transition-colors cursor-pointer"
          >
            <span className="text-sm font-medium">Discover More</span>
            <ChevronDown className="h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="hero-float absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="hero-float absolute top-3/4 right-1/4 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="hero-float absolute bottom-1/4 left-1/3 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl"
        />
      </div>
    </motion.section>
  );
};

export default HeroSection;
