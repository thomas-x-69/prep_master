"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FeatureCard } from "@/components/ui/card";
import {
  Brain,
  Target,
  Users,
  Trophy,
  Zap,
  Shield,
  TrendingUp,
  BookOpen,
  Code,
  Smartphone,
  Globe,
  Sparkles,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FeaturesSection = ({ className }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const mainFeatures = [
    {
      id: "ai-powered",
      title: "AI-Powered Intelligence",
      description:
        "Advanced algorithms that learn from your data patterns to provide predictive insights and automated solutions.",
      icon: <Brain className="h-6 w-6" />,
      highlight: true,
      stats: { value: "94%", label: "Accuracy Rate" },
    },
    {
      id: "real-time",
      title: "Real-Time Processing",
      description:
        "Lightning-fast data processing and analysis that delivers insights when you need them most.",
      icon: <Zap className="h-6 w-6" />,
      highlight: false,
      stats: { value: "<1ms", label: "Response Time" },
    },
    {
      id: "scalable",
      title: "Infinite Scalability",
      description:
        "Infrastructure that grows with your business, from startup to enterprise scale without limits.",
      icon: <TrendingUp className="h-6 w-6" />,
      highlight: false,
      stats: { value: "99.9%", label: "Uptime SLA" },
    },
    {
      id: "security",
      title: "Enterprise Security",
      description:
        "Bank-grade security protocols and compliance standards to protect your most valuable data.",
      icon: <Shield className="h-6 w-6" />,
      highlight: true,
      stats: { value: "SOC2", label: "Certified" },
    },
  ];

  const supportFeatures = [
    {
      title: "Global Deployment",
      description:
        "Deploy anywhere in the world with our global infrastructure",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "24/7 Support",
      description:
        "Round-the-clock expert support for mission-critical operations",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "API Integration",
      description: "Seamless integration with existing systems and workflows",
      icon: <Code className="h-5 w-5" />,
    },
    {
      title: "Mobile Ready",
      description: "Access your insights from any device, anywhere, anytime",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      title: "Documentation",
      description:
        "Comprehensive guides and resources for rapid implementation",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Success Stories",
      description: "Proven results across industries and use cases",
      icon: <Trophy className="h-5 w-5" />,
    },
  ];

  const testimonialStats = [
    {
      value: "99%",
      label: "Customer Satisfaction",
      icon: <Star className="h-5 w-5" />,
    },
    {
      value: "50%",
      label: "Cost Reduction",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      value: "10x",
      label: "Performance Boost",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      value: "24/7",
      label: "Monitoring",
      icon: <Clock className="h-5 w-5" />,
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
              <span>Technology Features</span>
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Built For The
              <br />
              <span className="text-gradient">Future Of Work</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our platform combines cutting-edge technology with proven
              methodologies to deliver solutions that scale with your ambitions.
            </p>
          </motion.div>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <FeatureCard
                variant={feature.highlight ? "neon" : "glass"}
                className={cn(
                  "group relative overflow-hidden h-full",
                  feature.highlight && "border-yellow-400/30"
                )}
                highlight={feature.highlight}
              >
                <div className="relative z-10 p-6 lg:p-8 h-full flex flex-col">
                  {/* Icon & Title */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={cn(
                        "p-3 rounded-xl transition-all duration-300 group-hover:scale-110",
                        feature.highlight
                          ? "bg-yellow-400 text-black"
                          : "bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black"
                      )}
                    >
                      {feature.icon}
                    </div>

                    {feature.highlight && (
                      <div className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-yellow-400">
                          {feature.stats.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {feature.stats.label}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </FeatureCard>
            </motion.div>
          ))}
        </div>

        {/* Support Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <FeatureCard
                  variant="glass"
                  className="group text-left hover:border-white/30 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    <div className="p-2 rounded-lg bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300 w-fit">
                      {feature.icon}
                    </div>

                    <h4 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h4>

                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </FeatureCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 lg:p-12 border border-white/10">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-8">
              Trusted by Industry Leaders
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {testimonialStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-yellow-400/20 text-yellow-400">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
