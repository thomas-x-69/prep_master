"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { Button } from "@/components/ui/button";
import {
  Code,
  Server,
  Smartphone,
  Brain,
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkles,
  Target,
  Database,
  Cpu,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SpecializationsSection = ({ className }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const solutions = [
    {
      id: "ai-automation",
      title: "AI-Powered Automation",
      description:
        "Transform your workflows with intelligent automation that learns and adapts to your business needs.",
      icon: <Brain className="h-8 w-8" />,
      features: [
        "Machine Learning Models",
        "Process Optimization",
        "Predictive Analytics",
        "Smart Decision Making",
      ],
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "data-intelligence",
      title: "Data Intelligence Platform",
      description:
        "Unlock insights from your data with our comprehensive analytics and visualization platform.",
      icon: <Database className="h-8 w-8" />,
      features: [
        "Real-time Analytics",
        "Custom Dashboards",
        "Data Integration",
        "Advanced Reporting",
      ],
      color: "from-green-500 to-emerald-500",
      gradient: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
    },
    {
      id: "cloud-infrastructure",
      title: "Cloud Infrastructure",
      description:
        "Scale seamlessly with our robust cloud solutions designed for modern enterprises.",
      icon: <Server className="h-8 w-8" />,
      features: [
        "Auto Scaling",
        "High Availability",
        "Security First",
        "Cost Optimization",
      ],
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
    },
    {
      id: "edge-computing",
      title: "Edge Computing Solutions",
      description:
        "Bring processing power closer to your data sources for lightning-fast response times.",
      icon: <Cpu className="h-8 w-8" />,
      features: [
        "Low Latency",
        "Real-time Processing",
        "IoT Integration",
        "Distributed Computing",
      ],
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="solutions"
      className={cn(
        "relative py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden",
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
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
            <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/20 text-sm text-yellow-400 font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Our Solutions</span>
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Intelligent Solutions That
              <br />
              <span className="text-gradient">Drive Results</span>
            </h2>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover how our cutting-edge technology solutions can transform
              your business and unlock new possibilities for growth and
              innovation.
            </p>
          </motion.div>
        </div>

        {/* ScrollStack Solutions */}
        <div className="h-screen">
          <ScrollStack
            itemDistance={150}
            itemScale={0.05}
            itemStackDistance={40}
            stackPosition="25%"
            scaleEndPosition="15%"
            baseScale={0.9}
            rotationAmount={2}
            blurAmount={1}
          >
            {solutions.map((solution, index) => (
              <ScrollStackItem
                key={solution.id}
                itemClassName={cn(
                  "glass border border-white/10 group hover:border-white/30 transition-all duration-500",
                  solution.gradient
                )}
              >
                <div className="relative z-10 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={cn(
                        "p-4 rounded-xl bg-gradient-to-br transition-all duration-300 group-hover:scale-110",
                        solution.color
                      )}
                    >
                      <div className="text-white">{solution.icon}</div>
                    </div>

                    <div className="flex items-center space-x-2 px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                      <CheckCircle className="h-3 w-3" />
                      <span>Available Now</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 mb-4">
                        {solution.title}
                      </h3>

                      <p className="text-gray-300 leading-relaxed text-lg">
                        {solution.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3">
                      {solution.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2 text-sm text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8">
                    <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold group w-full lg:w-auto px-8">
                      Explore Solution
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Join forward-thinking organizations who are already leveraging
              intelligent systems to drive innovation and growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg">
                <Target className="h-5 w-5 mr-2" />
                Get Started Today
              </Button>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg"
              >
                <Globe className="h-5 w-5 mr-2" />
                Schedule Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
