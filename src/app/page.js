"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SpecializationsSection from "@/components/SpecializationsSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Star,
  Clock,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  Sparkles,
} from "lucide-react";

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
      <Navigation />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Specializations Section */}
        <SpecializationsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Additional Sections */}
        <AboutSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
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
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/20 text-sm text-brand-primary font-medium"
            >
              <Sparkles className="h-4 w-4" />
              <span>About PrepMaster</span>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            >
              Empowering The Next Generation of
              <br />
              <span className="text-gradient">Tech Leaders</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 leading-relaxed"
            >
              At PrepMaster, we believe that the future belongs to those who
              never stop learning. Our mission is to democratize access to
              cutting-edge technology education and empower individuals to
              master the skills that drive innovation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  5+
                </div>
                <div className="text-gray-300">Years of Innovation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  50+
                </div>
                <div className="text-gray-300">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  95%
                </div>
                <div className="text-gray-300">Job Placement Rate</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Section Component
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer at Google",
      content:
        "PrepMaster transformed my career. The frontend specialization gave me the skills to land my dream job at Google.",
      avatar: "/images/testimonial-1.jpg",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Full Stack Engineer at Microsoft",
      content:
        "The quality of instruction and hands-on projects is unmatched. I went from beginner to expert in just 6 months.",
      avatar: "/images/testimonial-2.jpg",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Mobile Developer at Spotify",
      content:
        "Coming soon! Can't wait for the mobile development track. The frontend course was incredible.",
      avatar: "/images/testimonial-3.jpg",
      rating: 5,
    },
  ];

  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            What Our <span className="text-gradient">Students Say</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Join thousands of successful developers who've transformed their
            careers with PrepMaster
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="glass rounded-xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-brand-primary fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div>
                  <div className="text-white font-semibold">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section Component
function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Access to free courses",
        "Community support",
        "Basic projects",
        "Learning resources",
      ],
      cta: "Get Started",
      variant: "secondary",
    },
    {
      name: "Pro",
      price: "$49",
      period: "/month",
      description: "Most popular for serious learners",
      features: [
        "All frontend courses",
        "Expert mentorship",
        "Advanced projects",
        "Job placement support",
        "Certification",
      ],
      cta: "Start Pro Trial",
      variant: "primary",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For teams and organizations",
      features: [
        "All specializations",
        "Team management",
        "Custom content",
        "Priority support",
        "Analytics dashboard",
      ],
      cta: "Contact Sales",
      variant: "secondary",
    },
  ];

  return (
    <section id="pricing" className="relative py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Choose Your <span className="text-gradient">Learning Path</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Flexible pricing options designed to accelerate your career growth
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`glass rounded-xl p-8 border relative ${
                plan.popular
                  ? "border-2 border-brand-primary"
                  : "border-white/10"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-primary text-black px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-brand-primary mb-2">
                  {plan.price}
                  {plan.period && (
                    <span className="text-lg text-gray-400">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>

                <ul className="space-y-3 text-gray-300 mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-brand-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={
                    plan.variant === "primary" ? "brand" : "brand-outline"
                  }
                  className="w-full font-bold"
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section Component
function CTASection() {
  return (
    <section className="relative py-20 lg:py-32 bg-gradient-to-r from-brand-primary to-yellow-400 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black"
          >
            Ready to Master the Future?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-black/80 leading-relaxed"
          >
            Join thousands of developers who are already shaping tomorrow's
            technology. Start your journey today and unlock unlimited
            possibilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <button className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 transition-colors flex items-center space-x-2 group">
              <span>Start Learning Now</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="border-2 border-black text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-black hover:text-white transition-colors">
              Schedule Demo
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
