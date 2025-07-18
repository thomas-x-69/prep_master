"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ArrowUpRight,
  Heart,
  Code,
  Server,
  Smartphone,
  Brain,
  BookOpen,
  Users,
  Award,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Specializations",
      links: [
        { name: "Frontend Development", href: "#frontend", available: true },
        { name: "Backend Development", href: "#backend", comingSoon: true },
        { name: "Mobile Development", href: "#mobile", comingSoon: true },
        { name: "AI & Machine Learning", href: "#ai", comingSoon: true },
      ],
    },
    {
      title: "Platform",
      links: [
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Resources", href: "#resources" },
        { name: "Documentation", href: "#docs" },
        { name: "API", href: "#api" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#about" },
        { name: "Careers", href: "#careers" },
        { name: "Blog", href: "#blog" },
        { name: "Press Kit", href: "#press" },
        { name: "Contact", href: "#contact" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "#help" },
        { name: "Community", href: "#community" },
        { name: "Status", href: "#status" },
        { name: "Privacy Policy", href: "#privacy" },
        { name: "Terms of Service", href: "#terms" },
      ],
    },
  ];

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "YouTube", href: "#", icon: Youtube },
    { name: "Instagram", href: "#", icon: Instagram },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Learners" },
    { icon: BookOpen, value: "500+", label: "Courses" },
    { icon: Award, value: "50+", label: "Certifications" },
    { icon: Globe, value: "120+", label: "Countries" },
  ];

  return (
    <footer
      className={cn("relative bg-black text-white overflow-hidden", className)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,226,77,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,226,77,0.02)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      </div>

      <div className="relative">
        {/* Stats Bar */}
        <div className="border-b border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="p-2 rounded-lg bg-brand-primary/20 text-brand-primary group-hover:bg-brand-primary group-hover:text-black transition-all duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-primary to-yellow-400 flex items-center justify-center">
                  <span className="text-black font-bold text-xl">P</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl tracking-tight">
                    PrepMaster
                  </span>
                  <span className="text-gray-400 text-sm leading-none">
                    Learn. Practice. Master.
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-gray-300 leading-relaxed max-w-md"
              >
                Harness intelligent systems to optimize, predict, and
                scale—seamlessly. The smartest way to navigate the future of
                technology and advance your career.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 text-gray-300 hover:text-brand-primary transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">hello@prepmaster.dev</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-brand-primary transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-brand-primary transition-colors">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </motion.div>

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <h4 className="text-white font-semibold mb-3">Stay Updated</h4>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-sm"
                  />
                  <Button variant="brand" size="sm" className="font-medium">
                    Subscribe
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * sectionIndex }}
                  className="space-y-4"
                >
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className={cn(
                            "text-sm transition-colors duration-200 flex items-center group",
                            link.comingSoon
                              ? "text-gray-500 cursor-not-allowed"
                              : "text-gray-300 hover:text-brand-primary"
                          )}
                        >
                          <span className="flex-1">{link.name}</span>
                          {link.comingSoon && (
                            <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded-full ml-2">
                              Soon
                            </span>
                          )}
                          {link.available && (
                            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                          )}
                          {!link.comingSoon && !link.available && (
                            <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-gray-400 text-sm"
              >
                <span>© {currentYear} PrepMaster. Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>by the PrepMaster Team</span>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-4"
              >
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-brand-primary hover:text-black transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </motion.div>

              {/* Additional Links */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-6 text-sm text-gray-400"
              >
                <a
                  href="#privacy"
                  className="hover:text-brand-primary transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#terms"
                  className="hover:text-brand-primary transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#cookies"
                  className="hover:text-brand-primary transition-colors"
                >
                  Cookies
                </a>
                <a
                  href="#security"
                  className="hover:text-brand-primary transition-colors"
                >
                  Security
                </a>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-3 bg-brand-primary text-black rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUpRight className="h-5 w-5 rotate-45 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
