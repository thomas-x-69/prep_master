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
          name: "Frontend Development",
          href: "#frontend",
          icon: Code,
          available: true,
        },
        {
          name: "Backend Development",
          href: "#backend",
          icon: Server,
          comingSoon: true,
        },
        {
          name: "Mobile Development",
          href: "#mobile",
          icon: Smartphone,
          comingSoon: true,
        },
        {
          name: "AI & Machine Learning",
          href: "#ai",
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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "glass-dark shadow-xl border-b border-white/10"
          : "bg-transparent",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-brand-primary to-yellow-400 flex items-center justify-center">
                <span className="text-black font-bold text-lg lg:text-xl">
                  P
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg lg:text-xl tracking-tight">
                  PrepMaster
                </span>
                <span className="text-gray-400 text-xs leading-none">
                  Learn. Practice. Master.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
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
                      "text-gray-300 hover:text-brand-primary transition-colors duration-200 font-medium",
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
                                <div className="p-2 rounded-lg bg-brand-primary/20">
                                  <IconComponent className="h-4 w-4 text-brand-primary" />
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

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:flex items-center space-x-4"
          >
            <Button variant="brand-outline" size="sm" className="text-sm">
              Login
            </Button>
            <Button variant="brand" size="sm" className="text-sm font-bold">
              Get Started
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-dark border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navigationItems.map((item) => (
                  <div key={item.name}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-white/10 hover:text-brand-primary"
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
                                <IconComponent className="h-4 w-4 text-brand-primary" />
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
                  <Button variant="brand-outline" className="w-full">
                    Login
                  </Button>
                  <Button variant="brand" className="w-full font-bold">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
