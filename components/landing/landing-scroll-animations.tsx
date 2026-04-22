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

      const showcaseSection = document.querySelector<HTMLElement>("#showcase");

      if (showcaseSection) {
        gsap.fromTo(
          "#showcase h2",
          {
            y: 250,
            skewY: 7,
          },
          {
            y: 0,
            skewY: 0,
            duration: 1.3,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: "#showcase",
              start: "100px bottom",
              once: false,
            },
          },
        );

        gsap.fromTo(
          "#showcase-desc",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.7,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: "#showcase",
              start: "100px bottom",
              once: false,
            },
          },
        );

        gsap.fromTo(
          "#showcase-img",
          {
            y: 170,
          },
          {
            y: -100,
            ease: "none",
            scrollTrigger: {
              trigger: "#showcase",
              start: "180px bottom",
              end: "70% top",
              scrub: 0.7,
            },
          },
        );

        gsap.fromTo(
          ".showcase-desc-stagger",
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            duration: 1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: "#showcase",
              start: "60% bottom",
              end: "70% top",
              scrub: true,
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return null;
}
