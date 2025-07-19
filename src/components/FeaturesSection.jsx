"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import MagicBento from "@/components/MagicBento";
import {
  Brain,
  Target,
  Users,
  Trophy,
  Zap,
  TrendingUp,
  BookOpen,
  Smartphone,
  Play,
  Award,
  MessageSquare,
  Timer,
  CheckCircle,
  Star,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FeaturesSection = ({ className }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Main feature cards data - focused and compact
  const featureCards = [
    {
      title: "Realistic Mock Interviews",
      description:
        "Practice with industry-standard interview formats and get instant feedback from our AI interviewer.",
      icon: <MessageSquare className="h-6 w-6" />,
      badge: "Live Practice",
      color: "rgba(255, 255, 255, 0.05)",
      stats: { value: "1000+", label: "Daily Sessions" },
      gradient: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Expert-Curated Content",
      description:
        "Learn from industry professionals with content reviewed by engineers from top tech companies.",
      icon: <Award className="h-6 w-6" />,
      badge: "Premium",
      color: "rgba(255, 255, 255, 0.05)",
      stats: { value: "500+", label: "Expert Contributors" },
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
    {
      title: "25,000+ Questions",
      description:
        "Massive question bank covering all difficulty levels from beginner to expert across multiple programming languages and topics.",
      icon: <BookOpen className="h-6 w-6" />,
      badge: "Massive Bank",
      color: "rgba(255, 255, 255, 0.05)",
      stats: { value: "25K+", label: "Questions Available" },
      gradient: "from-red-500/20 to-rose-500/20",
    },
    {
      title: "Difficulty Levels & Timing",
      description:
        "Questions categorized by Easy, Medium, Hard, and Expert levels with accurate time estimates for realistic practice.",
      icon: <Timer className="h-6 w-6" />,
      badge: "Structured",
      color: "rgba(255, 255, 255, 0.05)",
      stats: { value: "4", label: "Difficulty Levels" },
      gradient: "from-indigo-500/20 to-purple-500/20",
    },
    {
      title: "Topic-Based Review",
      description:
        "Comprehensive review system organized by topics, algorithms, data structures, and company-specific question patterns.",
      icon: <Target className="h-6 w-6" />,
      badge: "Organized",
      color: "rgba(255, 255, 255, 0.05)",
      stats: { value: "50+", label: "Topic Categories" },
      gradient: "from-teal-500/20 to-blue-500/20",
    },
    {
      title: "Adaptive Learning System",
      description:
        "AI-powered system that adapts to your learning pace and identifies weak areas for targeted practice.",
      icon: <Brain className="h-6 w-6" />,
      badge: "Coming Soon",
      color: "rgba(255, 255, 255, 0.05)",
      stats: { value: "AI", label: "Powered Learning" },
      gradient: "from-purple-500/20 to-pink-500/20",
      comingSoon: true,
    },
  ];

  const testimonialStats = [
    {
      value: "98%",
      label: "Pass Rate",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      value: "87%",
      label: "Job Offer Rate",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      value: "2x",
      label: "Faster Preparation",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      value: "50K+",
      label: "Success Stories",
      icon: <Star className="h-5 w-5" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="features"
      className={cn(
        "relative py-20 lg:py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden",
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,226,77,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,226,77,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/20 text-sm text-yellow-400 font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Platform Features</span>
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Built For Your
              <br />
              <span className="text-gradient">Success Journey</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines cutting-edge technology with
              proven methodologies to deliver the most effective preparation
              experience.
            </p>
          </motion.div>
        </div>

        {/* Magic Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="relative">
            <MagicBento
              cardData={featureCards}
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={false}
              enableBorderGlow={true}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={true}
              spotlightRadius={350}
              particleCount={6}
              glowColor="255, 226, 77"
            />
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 lg:p-12 border border-white/10 backdrop-blur-lg">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8">
              Trusted by Top Performers
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {testimonialStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="mt-8 pt-8 border-t border-white/10"
            >
              <p className="text-lg text-gray-300 italic">
                "Join thousands of successful candidates who've accelerated
                their careers with PrepMaster"
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
