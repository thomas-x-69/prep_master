"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChromaGrid from "@/components/ChromaGrid";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Target,
  Users,
  Star,
  TrendingUp,
  Award,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SpecializationsSection = ({ className }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="specializations"
      className={cn(
        "relative py-16 lg:py-20 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden",
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,226,77,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,226,77,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-full glass border border-white/20 text-sm text-yellow-400 font-medium mb-4 shadow-lg">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>Skill Assessment Tests</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Test Your Skills In
              <br />
              <span className="text-gradient">Technology Areas</span>
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Challenge yourself with comprehensive tests. Start with Frontend
              Development - more areas coming soon!
            </p>
          </motion.div>
        </div>

        {/* ChromaGrid Specializations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-[70vh] mb-12"
        >
          <ChromaGrid
            radius={300}
            damping={0.3}
            fadeOut={0.9}
            ease="power3.out"
          />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-12"
        >
          <div className="glass rounded-xl p-6 border border-white/10 shadow-2xl">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">25K+</div>
                <div className="text-xs text-gray-400">Tests Taken</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">250+</div>
                <div className="text-xs text-gray-400">Questions</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">98%</div>
                <div className="text-xs text-gray-400">Pass Rate</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">4.9★</div>
                <div className="text-xs text-gray-400">Quality</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl font-bold text-white">
              Ready to Test Your Skills?
            </h3>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300">
                <Target className="h-4 w-4 mr-2" />
                Start Frontend Test
              </Button>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-xl border-2 hover:border-white/40 transition-all duration-300"
              >
                View All Tests
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
