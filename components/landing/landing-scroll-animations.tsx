"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function LandingScrollAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
        gsap.from(section.querySelectorAll("[data-stagger]"), {
          y: 24,
          opacity: 0,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-discover-text]").forEach((headline) => {
        gsap.fromTo(
          headline,
          {
            yPercent: 55,
            opacity: 0.35,
            rotate: -5,
          },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headline,
              start: "top 96%",
              end: "bottom 50%",
              scrub: 2,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
