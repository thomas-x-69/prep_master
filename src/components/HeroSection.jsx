"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Noise from "@/components/Noise";
import { cn } from "@/lib/utils";

const HeroSection = ({ className }) => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      console.log("Video loaded successfully");
      setIsVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = (e) => {
      console.error("Video failed to load:", e);
      setVideoError(true);
      setIsVideoLoaded(false);
    };

    const handleCanPlay = () => {
      console.log("Video can start playing");
      setIsVideoLoaded(true);
    };

    // Add event listeners
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);

    // Try to load and play the video
    video.load();

    // Attempt to play (with error handling for autoplay policies)
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.log("Auto-play was prevented:", error);
        // Video will still show, just won't autoplay
      });
    }

    // Cleanup
    return () => {
      if (video) {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("error", handleError);
      }
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
  };

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden bg-black",
        className
      )}
      style={{ y, opacity }}
    >
      {/* Video Background Layer (z-0) */}
      <div className="absolute inset-0 z-0">
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            style={{
              opacity: isVideoLoaded ? 0.7 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
            <source src="/videos/hero-bg.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      {/* Fallback Background */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          isVideoLoaded && !videoError ? "opacity-0" : "opacity-100"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        {/* Static background pattern as fallback */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,226,77,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,226,77,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Noise Effect Layer (z-10) - On top of video */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={3}
          patternAlpha={12}
        />
      </div>

      {/* Dark Overlay Layer (z-20) - On top of noise */}
      <div className="absolute inset-0 z-20 bg-black/40" />

      {/* Content Layer (z-30) - On top of everything */}
      <div className="relative z-30 container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 lg:pt-0 mt-20">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/20 text-sm text-white/90"
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <span>
              Recognized as a top innovator in tech preparation platforms
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight text-white text-shadow">
                The Smartest Way To
                <br />
                Navigate{" "}
                <span className="text-yellow-400 font-playfair italic">
                  The Future
                </span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              Master technical interviews, ace coding exams, and
              <br />
              prepare for your dream tech career—seamlessly.
            </motion.p>
          </div>

          {/* Search Bar */}

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
          >
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">
                10K+
              </div>
              <div className="text-sm text-gray-300">Interview Questions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">
                500+
              </div>
              <div className="text-sm text-gray-300">Coding Challenges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">
                95%
              </div>
              <div className="text-sm text-gray-300">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">
                50K+
              </div>
              <div className="text-sm text-gray-300">Students Placed</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements (z-25) - Between overlay and content */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
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
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"
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
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-blue-400/5 rounded-full blur-3xl"
        />
      </div>
    </motion.section>
  );
};

export default HeroSection;
