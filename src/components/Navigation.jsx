"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Code,
  Server,
  Smartphone,
  Brain,
  BookOpen,
  Users,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    {
      name: "Specializations",
      href: "#specializations",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Technical Interviews",
          href: "#technical-interviews",
          icon: Users,
          available: true,
        },
        {
          name: "Coding Assessments",
          href: "#coding-assessments",
          icon: Code,
          available: true,
        },
        {
          name: "Certification Exams",
          href: "#certification-exams",
          icon: BookOpen,
          comingSoon: true,
        },
        {
          name: "Competitive Programming",
          href: "#competitive-programming",
          icon: Brain,
          comingSoon: true,
        },
      ],
    },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Contact", href: "#contact" },
  ];

  const handleDropdownToggle = (itemName) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation - Floating */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={cn("fixed top-4 m-auto  z-50 hidden lg:block", className)}
      >
        <div className="glass-dark rounded-full border border-white/20 shadow-2xl backdrop-blur-lg">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <div className="flex items-center space-x-1 mr-8">
              <div>
                <img
                  src="/images/logo.svg"
                  alt="PrepMaster"
                  className="w-12 h-12 filter invert "
                />
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                PrepMaster
              </span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              {navigationItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setActiveDropdown(item.name)
                  }
                  onMouseLeave={closeDropdown}
                >
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        "text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-medium text-sm",
                        "hover:bg-white/10 px-4 py-2 rounded-lg"
                      )}
                      onClick={() =>
                        item.hasDropdown && handleDropdownToggle(item.name)
                      }
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={cn(
                            "ml-1 h-4 w-4 transition-transform duration-200",
                            activeDropdown === item.name && "rotate-180"
                          )}
                        />
                      )}
                    </Button>
                  </motion.div>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 glass-dark rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="py-2">
                          {item.dropdownItems?.map((dropdownItem) => {
                            const IconComponent = dropdownItem.icon;
                            return (
                              <motion.a
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className={cn(
                                  "flex items-center px-4 py-3 hover:bg-white/10 transition-colors duration-200",
                                  dropdownItem.comingSoon &&
                                    "opacity-60 cursor-not-allowed"
                                )}
                                whileHover={{ x: 4 }}
                                onClick={closeDropdown}
                              >
                                <div className="flex items-center space-x-3 flex-1">
                                  <div className="p-2 rounded-lg bg-yellow-400/20">
                                    <IconComponent className="h-4 w-4 text-yellow-400" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="text-white font-medium text-sm">
                                      {dropdownItem.name}
                                    </div>
                                    {dropdownItem.comingSoon && (
                                      <div className="text-xs text-gray-400">
                                        Coming Soon
                                      </div>
                                    )}
                                    {dropdownItem.available && (
                                      <div className="text-xs text-green-400">
                                        Available Now
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </motion.a>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 ml-8"
            >
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-yellow-400 text-sm font-medium"
              >
                Login
              </Button>
              <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-white/10"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <img
                  src="/images/logo.svg"
                  alt="PrepMaster"
                  className="w-6 h-6 filter invert"
                />
              </div>
              <span className="text-white  text-lg ">PrepMasterz®</span>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-black/95 backdrop-blur-lg border-t border-white/10"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="space-y-4">
                  {navigationItems.map((item) => (
                    <div key={item.name}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10 hover:text-yellow-400"
                        onClick={() => {
                          if (item.hasDropdown) {
                            handleDropdownToggle(item.name);
                          } else {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                      >
                        {item.name}
                        {item.hasDropdown && (
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform duration-200",
                              activeDropdown === item.name && "rotate-180"
                            )}
                          />
                        )}
                      </Button>

                      {/* Mobile Dropdown */}
                      <AnimatePresence>
                        {item.hasDropdown && activeDropdown === item.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 mt-2 space-y-2"
                          >
                            {item.dropdownItems?.map((dropdownItem) => {
                              const IconComponent = dropdownItem.icon;
                              return (
                                <a
                                  key={dropdownItem.name}
                                  href={dropdownItem.href}
                                  className={cn(
                                    "flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors duration-200",
                                    dropdownItem.comingSoon &&
                                      "opacity-60 cursor-not-allowed"
                                  )}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <IconComponent className="h-4 w-4 text-yellow-400" />
                                  <span className="text-white text-sm">
                                    {dropdownItem.name}
                                  </span>
                                  {dropdownItem.comingSoon && (
                                    <span className="text-xs text-gray-400 ml-auto">
                                      Soon
                                    </span>
                                  )}
                                </a>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Mobile CTA Buttons */}
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <Button
                      variant="ghost"
                      className="w-full text-gray-300 hover:text-yellow-400"
                    >
                      Login
                    </Button>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold">
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navigation;
