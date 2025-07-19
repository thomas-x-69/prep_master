import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";

const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "255, 226, 77"; // Yellow accent color from the theme
const MOBILE_BREAKPOINT = 768;

const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor
      )
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleMouseMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    const handleClick = (e) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} relative overflow-hidden`}
      style={{ ...style, position: "relative", overflow: "hidden" }}
    >
      {children}
    </div>
  );
};

const GlobalSpotlight = () => null; // Disabled for static design

const BentoCardGrid = ({ children, gridRef }) => (
  <div
    className="bento-section grid gap-3 p-4 max-w-7xl mx-auto select-none relative"
    style={{ fontSize: "clamp(1rem, 0.9rem + 0.5vw, 1.5rem)" }}
    ref={gridRef}
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const MagicBento = ({
  cardData,
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
  gridLayout = "auto",
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  if (!cardData || cardData.length === 0) {
    return null;
  }

  return (
    <>
      <style>
        {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
            --glow-color: ${glowColor};
            --border-color: rgba(255, 255, 255, 0.1);
            --background-dark: rgba(255, 255, 255, 0.05);
            --white: hsl(0, 0%, 100%);
            --yellow-primary: rgba(255, 226, 77, 1);
            --yellow-glow: rgba(255, 226, 77, 0.2);
            --yellow-border: rgba(255, 226, 77, 0.8);
          }
          
          .card-responsive {
            grid-template-columns: 1fr;
            width: 100%;
            gap: 1rem;
          }
          
          @media (min-width: 640px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(2, minmax(240px, auto));
              gap: 1.5rem;
            }
            
            .card-responsive .card:nth-child(1) {
              grid-column: span 2;
              grid-row: span 1;
            }
            
            .card-responsive .card:nth-child(2) {
              grid-column: span 1;
              grid-row: span 1;
            }
            
            .card-responsive .card:nth-child(3) {
              grid-column: span 1;
              grid-row: span 2;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: span 1;
              grid-row: span 1;
            }
            
            .card-responsive .card:nth-child(5) {
              grid-column: span 1;
              grid-row: span 1;
            }
            
            .card-responsive .card:nth-child(6) {
              grid-column: span 2;
              grid-row: span 1;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 2px;
            background: linear-gradient(45deg, 
                rgba(${glowColor}, 0.6) 0%,
                rgba(${glowColor}, 0.3) 25%,
                transparent 50%,
                rgba(${glowColor}, 0.3) 75%,
                rgba(${glowColor}, 0.6) 100%);
            background-size: 400% 400%;
            animation: borderGlow 3s ease-in-out infinite;
            border-radius: inherit;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: subtract;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
          }
          
          @keyframes borderGlow {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }
          
          .card--border-glow {
            position: relative;
            overflow: hidden;
          }
          
          .card--border-glow::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(${glowColor}, 0.1), 
                transparent);
            transition: left 0.5s;
            z-index: 1;
          }
          
          .card--border-glow:hover::before {
            left: 100%;
          }
          
          .card-gradient {
            background: linear-gradient(135deg, 
                rgba(255, 255, 255, 0.1) 0%, 
                rgba(255, 255, 255, 0.05) 100%);
          }
          
          .card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
                0 20px 40px rgba(0, 0, 0, 0.3), 
                0 0 50px rgba(${glowColor}, 0.2),
                inset 0 1px 0 rgba(255, 255, 255, 0.1);
          }
          
          .card--coming-soon {
            opacity: 0.7;
            filter: grayscale(0.3);
          }
          
          .card--coming-soon:hover {
            opacity: 0.9;
            filter: grayscale(0.1);
            transform: translateY(-4px) scale(1.01);
          }
          
          .card--coming-soon .card__header .badge--coming-soon {
            background: linear-gradient(45deg, #6b7280, #9ca3af);
            animation: pulse 2s infinite;
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          .text-clamp-1 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .text-clamp-2 {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          @media (max-width: 639px) {
            .card-responsive {
              grid-template-columns: 1fr;
              gap: 0.75rem;
            }
            
            .card-responsive .card {
              width: 100%;
              min-height: 180px;
            }
          }
        `}
      </style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="card-responsive grid">
          {cardData.map((card, index) => {
            const baseClassName = `card group flex flex-col justify-between relative min-h-[240px] w-full p-6 rounded-2xl border border-solid font-light overflow-hidden transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] ${
              enableBorderGlow ? "card--border-glow" : ""
            } ${card.comingSoon ? "card--coming-soon" : ""}`;

            const cardStyle = {
              background: card.gradient
                ? `linear-gradient(135deg, ${card.gradient
                    .split(" ")[0]
                    .replace("from-", "")
                    .replace("/", " / ")}, ${card.gradient
                    .split(" ")[1]
                    .replace("to-", "")
                    .replace("/", " / ")}), rgba(255, 255, 255, 0.05)`
                : "rgba(255, 255, 255, 0.05)",
              borderColor: card.comingSoon
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(255, 255, 255, 0.1)",
              color: "var(--white)",
              backdropFilter: "blur(20px)",
              boxShadow: card.comingSoon
                ? "0 4px 16px rgba(0, 0, 0, 0.1)"
                : "0 8px 32px rgba(0, 0, 0, 0.2)",
            };

            if (enableStars) {
              return (
                <ParticleCard
                  key={index}
                  className={baseClassName}
                  style={cardStyle}
                  disableAnimations={shouldDisableAnimations}
                  particleCount={particleCount}
                  glowColor={glowColor}
                  enableTilt={enableTilt}
                  clickEffect={clickEffect}
                  enableMagnetism={enableMagnetism}
                >
                  <div className="card__header flex justify-between items-start gap-3 relative text-white mb-4 z-10">
                    {card.icon && (
                      <div
                        className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                          card.comingSoon
                            ? "bg-gray-500/20 text-gray-400"
                            : "bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black"
                        }`}
                      >
                        {card.icon}
                      </div>
                    )}
                    {card.badge && (
                      <span
                        className={`px-3 py-1 text-xs font-bold rounded-full shadow-lg ${
                          card.comingSoon
                            ? "bg-gradient-to-r from-gray-500 to-gray-600 text-gray-200 badge--coming-soon"
                            : "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black animate-pulse"
                        }`}
                      >
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <div className="card__content flex flex-col relative text-white flex-1 z-10">
                    <h3
                      className={`card__title font-bold text-xl mb-3 transition-colors duration-300 ${
                        card.comingSoon
                          ? "group-hover:text-gray-300"
                          : "group-hover:text-yellow-400"
                      } ${textAutoHide ? "text-clamp-1" : ""}`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`card__description text-sm leading-6 mb-4 ${
                        card.comingSoon ? "text-gray-400" : "text-gray-300"
                      } ${textAutoHide ? "text-clamp-2" : ""}`}
                    >
                      {card.description}
                    </p>
                    {card.stats && (
                      <div className="mt-auto pt-4 border-t border-white/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <div
                              className={`text-2xl font-bold transition-transform duration-300 group-hover:scale-110 ${
                                card.comingSoon
                                  ? "text-gray-400"
                                  : "text-yellow-400"
                              }`}
                            >
                              {card.stats.value}
                            </div>
                            <div className="text-sm text-gray-400">
                              {card.stats.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </ParticleCard>
              );
            }

            return (
              <div
                key={index}
                className={baseClassName}
                style={cardStyle}
                ref={(el) => {
                  if (!el) return;

                  const handleMouseMove = (e) => {
                    if (shouldDisableAnimations) return;

                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    if (enableTilt) {
                      const rotateX = ((y - centerY) / centerY) * -8;
                      const rotateY = ((x - centerX) / centerX) * 8;

                      gsap.to(el, {
                        rotateX,
                        rotateY,
                        duration: 0.1,
                        ease: "power2.out",
                        transformPerspective: 1000,
                      });
                    }

                    if (enableMagnetism) {
                      const magnetX = (x - centerX) * 0.03;
                      const magnetY = (y - centerY) * 0.03;

                      gsap.to(el, {
                        x: magnetX,
                        y: magnetY,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }
                  };

                  const handleMouseLeave = () => {
                    if (shouldDisableAnimations) return;

                    if (enableTilt) {
                      gsap.to(el, {
                        rotateX: 0,
                        rotateY: 0,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }

                    if (enableMagnetism) {
                      gsap.to(el, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                      });
                    }
                  };

                  const handleClick = (e) => {
                    if (!clickEffect || shouldDisableAnimations) return;

                    const rect = el.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const maxDistance = Math.max(
                      Math.hypot(x, y),
                      Math.hypot(x - rect.width, y),
                      Math.hypot(x, y - rect.height),
                      Math.hypot(x - rect.width, y - rect.height)
                    );

                    const ripple = document.createElement("div");
                    ripple.style.cssText = `
                      position: absolute;
                      width: ${maxDistance * 2}px;
                      height: ${maxDistance * 2}px;
                      border-radius: 50%;
                      background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
                      left: ${x - maxDistance}px;
                      top: ${y - maxDistance}px;
                      pointer-events: none;
                      z-index: 1000;
                    `;

                    el.appendChild(ripple);

                    gsap.fromTo(
                      ripple,
                      {
                        scale: 0,
                        opacity: 1,
                      },
                      {
                        scale: 1,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.out",
                        onComplete: () => ripple.remove(),
                      }
                    );
                  };

                  el.addEventListener("mousemove", handleMouseMove);
                  el.addEventListener("mouseleave", handleMouseLeave);
                  el.addEventListener("click", handleClick);
                }}
              >
                <div className="card__header flex justify-between items-start gap-3 relative text-white mb-4">
                  {card.icon && (
                    <div className="p-3 rounded-xl bg-yellow-400/20 text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                      {card.icon}
                    </div>
                  )}
                  {card.badge && (
                    <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-bold rounded-full">
                      {card.badge}
                    </span>
                  )}
                </div>
                <div className="card__content flex flex-col relative text-white flex-1">
                  <h3
                    className={`card__title font-bold text-xl mb-3 group-hover:text-yellow-400 transition-colors duration-300 ${
                      textAutoHide ? "text-clamp-1" : ""
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`card__description text-sm leading-6 text-gray-300 mb-4 ${
                      textAutoHide ? "text-clamp-2" : ""
                    }`}
                  >
                    {card.description}
                  </p>
                  {card.stats && (
                    <div className="mt-auto pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-yellow-400">
                            {card.stats.value}
                          </div>
                          <div className="text-sm text-gray-400">
                            {card.stats.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
