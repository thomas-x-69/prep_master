import { useEffect, useRef, useCallback } from "react";

let gsap = null;
let ScrollTrigger = null;

// Initialize GSAP only on client side
if (typeof window !== "undefined") {
  import("gsap").then((gsapModule) => {
    gsap = gsapModule.gsap || gsapModule.default;

    import("gsap/ScrollTrigger").then((scrollTriggerModule) => {
      ScrollTrigger =
        scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
      gsap.registerPlugin(ScrollTrigger);
    });
  });
}

export function useGSAP() {
  const contextRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && gsap) {
      contextRef.current = gsap.context(() => {});
      return () => {
        if (contextRef.current) {
          contextRef.current.revert();
        }
      };
    }
  }, []);

  const animate = useCallback((targets, vars) => {
    if (typeof window !== "undefined" && gsap) {
      if (contextRef.current) {
        return contextRef.current.add(() => gsap.to(targets, vars));
      }
      return gsap.to(targets, vars);
    }
    return null;
  }, []);

  const animateFrom = useCallback((targets, vars) => {
    if (typeof window !== "undefined" && gsap) {
      if (contextRef.current) {
        return contextRef.current.add(() => gsap.from(targets, vars));
      }
      return gsap.from(targets, vars);
    }
    return null;
  }, []);

  const animateFromTo = useCallback((targets, fromVars, toVars) => {
    if (typeof window !== "undefined" && gsap) {
      if (contextRef.current) {
        return contextRef.current.add(() =>
          gsap.fromTo(targets, fromVars, toVars)
        );
      }
      return gsap.fromTo(targets, fromVars, toVars);
    }
    return null;
  }, []);

  const timeline = useCallback((vars) => {
    if (typeof window !== "undefined" && gsap) {
      if (contextRef.current) {
        return contextRef.current.add(() => gsap.timeline(vars));
      }
      return gsap.timeline(vars);
    }
    return null;
  }, []);

  const set = useCallback((targets, vars) => {
    if (typeof window !== "undefined" && gsap) {
      if (contextRef.current) {
        return contextRef.current.add(() => gsap.set(targets, vars));
      }
      return gsap.set(targets, vars);
    }
    return null;
  }, []);

  const killTweensOf = useCallback((targets) => {
    if (typeof window !== "undefined" && gsap) {
      gsap.killTweensOf(targets);
    }
  }, []);

  const refresh = useCallback(() => {
    if (typeof window !== "undefined" && ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }, []);

  return {
    animate,
    animateFrom,
    animateFromTo,
    timeline,
    set,
    killTweensOf,
    refresh,
    context: contextRef.current,
  };
}

export function useScrollTrigger(animation, config = {}, deps = []) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !gsap || !ScrollTrigger) return;

    const element = elementRef.current;
    if (!element) return;

    let scrollTriggerInstance = null;

    const initScrollTrigger = () => {
      const tl = animation();

      if (tl) {
        scrollTriggerInstance = ScrollTrigger.create({
          trigger: config.trigger || element,
          start: config.start || "top 80%",
          end: config.end || "bottom 20%",
          scrub: config.scrub || false,
          pin: config.pin || false,
          markers: config.markers || false,
          animation: tl,
          onUpdate: config.onUpdate,
          onComplete: config.onComplete,
          onStart: config.onStart,
        });
      }
    };

    // If GSAP is already loaded, initialize immediately
    if (gsap && ScrollTrigger) {
      initScrollTrigger();
    } else {
      // Otherwise wait for it to load
      const checkGSAP = setInterval(() => {
        if (gsap && ScrollTrigger) {
          clearInterval(checkGSAP);
          initScrollTrigger();
        }
      }, 100);

      return () => {
        clearInterval(checkGSAP);
        if (scrollTriggerInstance) {
          scrollTriggerInstance.kill();
        }
      };
    }

    return () => {
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }
    };
  }, deps);

  return elementRef;
}

export function useIntersectionObserver(callback, options = {}) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [callback, options]);

  return elementRef;
}

// Predefined animations
export const gsapAnimations = {
  fadeInUp: (element, delay = 0) => {
    if (typeof window !== "undefined" && gsap) {
      return gsap.fromTo(
        element,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
        }
      );
    }
    return null;
  },

  fadeInLeft: (element, delay = 0) => {
    if (typeof window !== "undefined" && gsap) {
      return gsap.fromTo(
        element,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
        }
      );
    }
    return null;
  },

  fadeInRight: (element, delay = 0) => {
    if (typeof window !== "undefined" && gsap) {
      return gsap.fromTo(
        element,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
        }
      );
    }
    return null;
  },

  scaleIn: (element, delay = 0) => {
    if (typeof window !== "undefined" && gsap) {
      return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay,
          ease: "back.out(1.7)",
        }
      );
    }
    return null;
  },

  slideInFromBottom: (element, delay = 0) => {
    if (typeof window !== "undefined" && gsap) {
      return gsap.fromTo(
        element,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay,
          ease: "power3.out",
        }
      );
    }
    return null;
  },

  staggerFadeInUp: (elements, stagger = 0.1) => {
    if (typeof window !== "undefined" && gsap) {
      return gsap.fromTo(
        elements,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger,
          ease: "power2.out",
        }
      );
    }
    return null;
  },

  parallaxMove: (element, yPercent = -50) => {
    if (typeof window !== "undefined" && gsap && ScrollTrigger) {
      return gsap.to(element, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    return null;
  },

  countUp: (element, endValue, duration = 2) => {
    if (typeof window !== "undefined" && gsap) {
      const obj = { value: 0 };
      return gsap.to(obj, {
        value: endValue,
        duration,
        onUpdate: () => {
          if (element instanceof Element) {
            element.textContent = Math.round(obj.value).toString();
          }
        },
        ease: "power2.out",
      });
    }
    return null;
  },
};

export default useGSAP;
