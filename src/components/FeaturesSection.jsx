"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FeatureCard } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
} from "lucide-react";
import { useScrollTrigger, useGSAP } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

const FeaturesSection = ({ className }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const mainFeatures = [
    {
      id: "ai-powered",
      title: "AI-Powered Learning",
      description:
        "Personalized curriculum that adapts to your learning style and pace for maximum efficiency.",
      icon: <Brain className="h-6 w-6" />,
      highlight: true,
      stats: { value: "94%", label: "Faster Learning" },
    },
    {
      id: "hands-on",
      title: "Hands-On Projects",
      description:
        "Build real-world applications and create a portfolio that showcases your skills to employers.",
      icon: <Code className="h-6 w-6" />,
      highlight: false,
      stats: { value: "200+", label: "Project Templates" },
    },
    {
      id: "mentorship",
      title: "Expert Mentorship",
      description:
        "Get guidance from industry professionals and receive personalized feedback on your progress.",
      icon: <Users className="h-6 w-6" />,
      highlight: false,
      stats: { value: "50+", label: "Expert Mentors" },
    },
    {
      id: "certification",
      title: "Industry Certifications",
      description:
        "Earn recognized certifications that validate your skills and boost your career prospects.",
      icon: <Trophy className="h-6 w-6" />,
      highlight: true,
      stats: { value: "15+", label: "Cert Partners" },
    },
  ];

  const supportFeatures = [
    {
      title: "Lightning Fast",
      description: "Optimized platform for seamless learning experience",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      title: "Secure & Private",
      description:
        "Your data and progress are protected with enterprise-grade security",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: "Progress Tracking",
      description: "Detailed analytics to monitor your learning journey",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Mobile Ready",
      description: "Learn anywhere, anytime with our mobile-optimized platform",
      icon: <Smartphone className="h-5 w-5" />,
    },
    {
      title: "Global Community",
      description: "Connect with learners and professionals worldwide",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      title: "Rich Resources",
      description: "Access to comprehensive libraries and documentation",
      icon: <BookOpen className="h-5 w-5" />,
    },
  ];

  const testimonialStats = [
    {
      value: "98%",
      label: "Completion Rate",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      value: "4.9",
      label: "Average Rating",
      icon: <Star className="h-5 w-5" />,
    },
    {
      value: "72h",
      label: "Avg. Time to Job",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      value: "$85K",
      label: "Avg. Salary Boost",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  const { animate } = useGSAP();

  // GSAP ScrollTrigger animation
  const animationRef = useScrollTrigger(
    () => {
      const tl = animate.timeline();

      tl.from(".feature-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".feature-main-card",
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".feature-support-card",
          {
            y: 60,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );

      return tl;
    },
    {
      trigger: sectionRef.current,
      start: "top 80%",
      end: "bottom 20%",
    }
  );

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
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,226,77,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,226,77,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="feature-title space-y-6"
          >
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/20 text-sm text-brand-primary font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Platform Features</span>
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              Everything You Need To
              <br />
              <span className="text-gradient">Succeed & Excel</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive platform combines cutting-edge technology with
              proven learning methodologies to accelerate your professional
              growth.
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
              className="feature-main-card"
            >
              <FeatureCard
                variant={feature.highlight ? "neon" : "glass"}
                className={cn(
                  "group relative overflow-hidden h-full",
                  feature.highlight && "border-brand-primary/30"
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
                          ? "bg-brand-primary text-black"
                          : "bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary group-hover:text-black"
                      )}
                    >
                      {feature.icon}
                    </div>

                    {feature.highlight && (
                      <div className="px-3 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white text-xs font-bold rounded-full">
                        Most Popular
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300">
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
                        <div className="text-2xl font-bold text-brand-primary">
                          {feature.stats.value}
                        </div>
                        <div className="text-sm text-gray-400">
                          {feature.stats.label}
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-brand-primary hover:bg-brand-primary hover:text-black group"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                className="feature-support-card"
              >
                <FeatureCard
                  variant="glass"
                  className="group text-left hover:border-white/30 transition-all duration-300"
                >
                  <div className="p-6 space-y-4">
                    <div className="p-2 rounded-lg bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-300 w-fit">
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
          <div className="glass rounded-2xl p-8 lg:p-12 border border-white/10 mb-12">
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
                    <div className="p-3 rounded-full bg-brand-primary/20 text-brand-primary">
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

          {/* Final CTA */}
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Start Your Learning Journey Today
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Join the community of forward-thinking professionals who are
              shaping the future of technology
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="brand"
                size="xl"
                className="font-bold group"
                icon={<Target className="h-5 w-5" />}
              >
                Start Free Trial
              </Button>

              <Button variant="brand-glass" size="xl" className="font-medium">
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
