import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
  Code,
  Server,
  Smartphone,
  Brain,
  Cloud,
  Puzzle,
  CheckCircle,
  Clock,
  ArrowRight,
  PlayCircle,
  FileText,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChromaGrid = ({
  items,
  className = "",
  radius = 400,
  damping = 0.35,
  fadeOut = 0.8,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const defaultSpecializations = [
    {
      icon: Code,
      title: "Frontend",
      subtitle: "React, JavaScript, CSS",
      borderColor: "#FFE24D",
      gradient:
        "linear-gradient(145deg, rgba(255, 226, 77, 0.2), rgba(0, 0, 0, 0.8))",
      status: "available",
      testCount: "250+",
      duration: "30 min",
    },
    {
      icon: Server,
      title: "Backend",
      subtitle: "Node.js, APIs, Databases",
      borderColor: "#10B981",
      gradient:
        "linear-gradient(145deg, rgba(16, 185, 129, 0.15), rgba(0, 0, 0, 0.8))",
      status: "coming-soon",
      testCount: "180+",
      duration: "35 min",
    },
    {
      icon: Smartphone,
      title: "Mobile",
      subtitle: "React Native, Flutter",
      borderColor: "#06B6D4",
      gradient:
        "linear-gradient(145deg, rgba(6, 182, 212, 0.15), rgba(0, 0, 0, 0.8))",
      status: "coming-soon",
      testCount: "120+",
      duration: "40 min",
    },
    {
      icon: Brain,
      title: "AI/ML",
      subtitle: "Python, TensorFlow",
      borderColor: "#8B5CF6",
      gradient:
        "linear-gradient(145deg, rgba(139, 92, 246, 0.15), rgba(0, 0, 0, 0.8))",
      status: "coming-soon",
      testCount: "90+",
      duration: "45 min",
    },
    {
      icon: Cloud,
      title: "Cloud",
      subtitle: "AWS, Docker, DevOps",
      borderColor: "#F59E0B",
      gradient:
        "linear-gradient(145deg, rgba(245, 158, 11, 0.15), rgba(0, 0, 0, 0.8))",
      status: "coming-soon",
      testCount: "160+",
      duration: "35 min",
    },
    {
      icon: Puzzle,
      title: "Algorithms",
      subtitle: "Data Structures, Logic",
      borderColor: "#EF4444",
      gradient:
        "linear-gradient(145deg, rgba(239, 68, 68, 0.15), rgba(0, 0, 0, 0.8))",
      status: "coming-soon",
      testCount: "300+",
      duration: "25 min",
    },
  ];

  const data = items?.length ? items : defaultSpecializations;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto ${className}`}
      style={{
        "--r": `${radius}px`,
        "--x": "50%",
        "--y": "50%",
      }}
    >
      {data.map((specialization, i) => {
        const IconComponent = specialization.icon;
        const isAvailable = specialization.status === "available";

        return (
          <article
            key={i}
            onMouseMove={handleCardMove}
            className={cn(
              "group relative flex flex-col w-full h-64 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer",
              "glass border border-white/10 hover:border-white/30",
              isAvailable ? "hover:scale-[1.02]" : "opacity-70"
            )}
            style={{
              "--card-border": specialization.borderColor || "transparent",
              background: specialization.gradient,
              "--spotlight-color": isAvailable
                ? "rgba(255, 226, 77, 0.1)"
                : "rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* Spotlight Effect */}
            <div
              className={cn(
                "absolute inset-0 pointer-events-none transition-opacity duration-500 z-20",
                isAvailable ? "opacity-0 group-hover:opacity-100" : "opacity-0"
              )}
              style={{
                background:
                  "radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex-1 p-6 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={cn(
                    "p-3 rounded-xl backdrop-blur-sm border transition-all duration-300",
                    isAvailable
                      ? "bg-yellow-400/20 border-yellow-400/30 group-hover:bg-yellow-400/30"
                      : "bg-white/5 border-white/10"
                  )}
                >
                  <IconComponent
                    className={cn(
                      "h-6 w-6 transition-colors duration-300",
                      isAvailable ? "text-yellow-400" : "text-white/60"
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "flex items-center space-x-1 px-2 py-1 text-xs font-bold rounded-full border transition-all duration-300",
                    isAvailable
                      ? "bg-yellow-400/20 text-yellow-400 border-yellow-400/30"
                      : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                  )}
                >
                  {isAvailable ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      <span>Live</span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-3 w-3" />
                      <span>Soon</span>
                    </>
                  )}
                </div>
              </div>

              {/* Title & Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300">
                  {specialization.title}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {specialization.subtitle}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium">
                      {specialization.testCount}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-yellow-400" />
                    <span className="text-white/80">
                      {specialization.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button
                size="sm"
                className={cn(
                  "w-full font-bold transition-all duration-300 rounded-lg",
                  isAvailable
                    ? "bg-yellow-400 text-black hover:bg-yellow-500 hover:scale-105"
                    : "bg-white/10 text-white/60 cursor-not-allowed border border-white/20"
                )}
                disabled={!isAvailable}
              >
                {isAvailable ? (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Start Test
                  </>
                ) : (
                  <>
                    <Clock className="mr-2 h-4 w-4" />
                    Notify Me
                  </>
                )}
              </Button>
            </div>

            {/* Available Indicator */}
            {isAvailable && (
              <div className="absolute top-3 right-3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50" />
            )}
          </article>
        );
      })}

      {/* Mask Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: "grayscale(0.8) brightness(0.9)",
          WebkitBackdropFilter: "grayscale(0.8) brightness(0.9)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.05) 30%,rgba(0,0,0,0.15)45%,rgba(0,0,0,0.25)60%,rgba(0,0,0,0.35)75%,rgba(0,0,0,0.50)88%,rgba(0,0,0,0.8) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.05) 30%,rgba(0,0,0,0.15)45%,rgba(0,0,0,0.25)60%,rgba(0,0,0,0.35)75%,rgba(0,0,0,0.50)88%,rgba(0,0,0,0.8) 100%)",
        }}
      />

      {/* Fade Overlay */}
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: "grayscale(0.8) brightness(0.9)",
          WebkitBackdropFilter: "grayscale(0.8) brightness(0.9)",
          background: "rgba(0,0,0,0.001)",
          maskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 15%,rgba(0,0,0,0.65)30%,rgba(0,0,0,0.50)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.25)75%,rgba(0,0,0,0.15)88%,transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(circle var(--r) at var(--x) var(--y),rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.8) 15%,rgba(0,0,0,0.65)30%,rgba(0,0,0,0.50)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.25)75%,rgba(0,0,0,0.15)88%,transparent 100%)",
          opacity: 1,
        }}
      />
    </div>
  );
};

export default ChromaGrid;
