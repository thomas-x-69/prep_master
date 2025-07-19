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
  Users,
  BookOpen,
  Award,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Footer = ({ className }) => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Solutions",
      links: [
        { name: "AI Automation", href: "#ai-automation", available: true },
        {
          name: "Data Intelligence",
          href: "#data-intelligence",
          available: true,
        },
        { name: "Cloud Infrastructure", href: "#cloud", available: true },
        { name: "Edge Computing", href: "#edge", available: true },
      ],
    },
    {
      title: "Technology",
      links: [
        { name: "Platform", href: "#platform" },
        { name: "Security", href: "#security" },
        { name: "Integrations", href: "#integrations" },
        { name: "APIs", href: "#apis" },
        { name: "Documentation", href: "#docs" },
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
    { icon: Users, value: "1M+", label: "Active Users" },
    { icon: BookOpen, value: "500+", label: "Solutions" },
    { icon: Award, value: "99.9%", label: "Uptime" },
    { icon: Globe, value: "50+", label: "Countries" },
  ];

  return (
    <footer
      className={cn("relative bg-black text-white overflow-hidden", className)}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl" />
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
                      <div className="p-2 rounded-lg bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
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
                <div className="relative">
                  <div className="w-10 h-10 bg-white rounded-sm flex items-center justify-center transform rotate-45">
                    <div className="w-8 h-8 bg-black rounded-sm transform -rotate-45 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                        <path d="M2 17L12 22L22 17" />
                        <path d="M2 12L12 17L22 12" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-xl tracking-tight">
                    Nexora®
                  </span>
                  <span className="text-gray-400 text-sm leading-none">
                    Navigate The Future
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
                technology and advance your organization.
              </motion.p>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">contact@nexora.ai</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-colors">
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
                    className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                  />
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium text-sm px-4">
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
                          className="text-sm text-gray-300 hover:text-yellow-400 transition-colors duration-200 flex items-center group"
                        >
                          <span className="flex-1">{link.name}</span>
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
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
                <span>© {currentYear} Nexora. Made with</span>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span>by the Nexora Team</span>
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
                      className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 group"
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
                  className="hover:text-yellow-400 transition-colors"
                >
                  Privacy
                </a>
                <a
                  href="#terms"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Terms
                </a>
                <a
                  href="#cookies"
                  className="hover:text-yellow-400 transition-colors"
                >
                  Cookies
                </a>
                <a
                  href="#security"
                  className="hover:text-yellow-400 transition-colors"
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
          className="fixed bottom-8 right-8 p-3 bg-yellow-400 text-black rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 group"
          aria-label="Scroll to top"
        >
          <ArrowUpRight className="h-5 w-5 rotate-45 group-hover:scale-110 transition-transform" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
