import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export function useGSAP() {
  const contextRef = useRef(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {});
    return () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, []);

  const animate = useCallback((targets, vars) => {
    if (contextRef.current) {
      return contextRef.current.add(() => gsap.to(targets, vars));
    }
    return gsap.to(targets, vars);
  }, []);

  const animateFrom = useCallback((targets, vars) => {
    if (contextRef.current) {
      return contextRef.current.add(() => gsap.from(targets, vars));
    }
    return gsap.from(targets, vars);
  }, []);

  const animateFromTo = useCallback((targets, fromVars, toVars) => {
    if (contextRef.current) {
      return contextRef.current.add(() =>
        gsap.fromTo(targets, fromVars, toVars)
      );
    }
    return gsap.fromTo(targets, fromVars, toVars);
  }, []);

  const timeline = useCallback((vars) => {
    if (contextRef.current) {
      return contextRef.current.add(() => gsap.timeline(vars));
    }
    return gsap.timeline(vars);
  }, []);

  const set = useCallback((targets, vars) => {
    if (contextRef.current) {
      return contextRef.current.add(() => gsap.set(targets, vars));
    }
    return gsap.set(targets, vars);
  }, []);

  const killTweensOf = useCallback((targets) => {
    gsap.killTweensOf(targets);
  }, []);

  const refresh = useCallback(() => {
    if (typeof window !== "undefined" && window.ScrollTrigger) {
      window.ScrollTrigger.refresh();
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
    if (typeof window === "undefined") return;

    const element = elementRef.current;
    if (!element) return;

    // Dynamically import ScrollTrigger
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const tl = animation();

      if (tl) {
        ScrollTrigger.create({
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

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    });
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
  fadeInUp: (element, delay = 0) =>
    gsap.fromTo(
      element,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
      }
    ),

  fadeInLeft: (element, delay = 0) =>
    gsap.fromTo(
      element,
      { opacity: 0, x: -60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
      }
    ),

  fadeInRight: (element, delay = 0) =>
    gsap.fromTo(
      element,
      { opacity: 0, x: 60 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay,
        ease: "power2.out",
      }
    ),

  scaleIn: (element, delay = 0) =>
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay,
        ease: "back.out(1.7)",
      }
    ),

  slideInFromBottom: (element, delay = 0) =>
    gsap.fromTo(
      element,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay,
        ease: "power3.out",
      }
    ),

  staggerFadeInUp: (elements, stagger = 0.1) =>
    gsap.fromTo(
      elements,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        ease: "power2.out",
      }
    ),

  parallaxMove: (element, yPercent = -50) =>
    gsap.to(element, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }),

  countUp: (element, endValue, duration = 2) => {
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
  },
};

export default useGSAP;
