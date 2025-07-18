"use client";

import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { SpecializationCard } from "@/components/ui/card";
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
  TrendingUp,
  Users,
} from "lucide-react";
import { useGSAP, gsapAnimations, useScrollTrigger } from "@/hooks/useGSAP";
import { cn } from "@/lib/utils";

const SpecializationsSection = ({ className }) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { animate } = useGSAP();

  const specializations = [
    {
      id: "frontend",
      title: "Frontend Development",
      description:
        "Master modern frontend technologies and frameworks. Build responsive, interactive web applications.",
      icon: <Code className="h-8 w-8" />,
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
      featured: true,
      comingSoon: false,
      stats: {
        courses: 25,
        students: "5.2K",
        rating: 4.9,
      },
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "backend",
      title: "Backend Development",
      description:
        "Build scalable server-side applications and APIs. Master databases and cloud architecture.",
      icon: <Server className="h-8 w-8" />,
      technologies: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
      featured: false,
      comingSoon: true,
      stats: {
        courses: 30,
        students: "Soon",
        rating: "N/A",
      },
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description:
        "Create native and cross-platform mobile applications for iOS and Android.",
      icon: <Smartphone className="h-8 w-8" />,
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      featured: false,
      comingSoon: true,
      stats: {
        courses: 20,
        students: "Soon",
        rating: "N/A",
      },
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "ai",
      title: "AI & Machine Learning",
      description:
        "Dive into artificial intelligence and machine learning. Build intelligent systems.",
      icon: <Brain className="h-8 w-8" />,
      technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain"],
      featured: false,
      comingSoon: true,
      stats: {
        courses: 35,
        students: "Soon",
        rating: "N/A",
      },
      color: "from-orange-500 to-red-500",
    },
  ];

  // GSAP ScrollTrigger animation
  const animationRef = useScrollTrigger(
    () => {
      const tl = animate.timeline();

      tl.from(".spec-title", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          ".spec-subtitle",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .from(
          ".spec-card",
          {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
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

  useEffect(() => {
    if (isInView && sectionRef.current) {
      // Additional floating animations for cards
      animate(".spec-card", {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3,
      });
    }
  }, [isInView, animate]);

  return (
    <section
      ref={sectionRef}
      id="specializations"
      className={cn(
        "relative py-20 lg:py-32 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden",
        className
      )}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="spec-title">
              <span className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border border-white/20 text-sm text-brand-primary font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Our Specializations</span>
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Master The Skills That
                <br />
                <span className="text-gradient">Shape Tomorrow</span>
              </h2>
            </div>

            <p className="spec-subtitle text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choose your path and accelerate your career with our
              comprehensive, industry-aligned specialization tracks designed by
              experts.
            </p>
          </motion.div>
        </div>

        {/* Specialization Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16"
        >
          {specializations.map((spec, index) => (
            <motion.div
              key={spec.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="spec-card"
            >
              <SpecializationCard
                variant="glass"
                className={cn(
                  "group relative overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-500",
                  spec.featured &&
                    "ring-2 ring-brand-primary/50 border-brand-primary/30",
                  !spec.comingSoon && "hover:scale-105 cursor-pointer"
                )}
                comingSoon={spec.comingSoon}
                featured={spec.featured}
              >
                {/* Gradient Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500",
                    spec.color
                  )}
                />

                <div className="relative z-10 p-6 lg:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={cn(
                        "p-3 rounded-xl bg-gradient-to-br transition-all duration-300 group-hover:scale-110",
                        spec.color
                      )}
                    >
                      <div className="text-white">{spec.icon}</div>
                    </div>

                    {spec.featured && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                        <CheckCircle className="h-3 w-3" />
                        <span>Available Now</span>
                      </div>
                    )}

                    {spec.comingSoon && (
                      <div className="flex items-center space-x-2 px-3 py-1 bg-brand-primary text-black text-xs font-bold rounded-full">
                        <Clock className="h-3 w-3" />
                        <span>Coming Soon</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-brand-primary transition-colors duration-300">
                      {spec.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed">
                      {spec.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {spec.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/10 text-white text-xs rounded-full border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {spec.stats.courses}
                      </div>
                      <div className="text-xs text-gray-400">Courses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {spec.stats.students}
                      </div>
                      <div className="text-xs text-gray-400">Students</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">
                        {spec.stats.rating}
                      </div>
                      <div className="text-xs text-gray-400">Rating</div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-4">
                    {spec.featured ? (
                      <Button
                        variant="brand"
                        className="w-full font-bold group"
                        icon={
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        }
                        iconPosition="right"
                      >
                        Start Learning Now
                      </Button>
                    ) : (
                      <Button
                        variant="brand-outline"
                        className="w-full font-medium opacity-50 cursor-not-allowed"
                        disabled
                      >
                        Notify Me When Available
                      </Button>
                    )}
                  </div>
                </div>
              </SpecializationCard>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white">
              Ready to Level Up Your Skills?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Join thousands of developers who are already mastering the future
              of technology
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="brand"
                size="xl"
                className="font-bold group"
                icon={<Target className="h-5 w-5" />}
              >
                View All Courses
              </Button>

              <Button
                variant="brand-glass"
                size="xl"
                className="font-medium group"
                icon={<Users className="h-5 w-5" />}
              >
                Join Community
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecializationsSection;
