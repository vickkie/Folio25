// hooks/useGsapMagic.js
import { useEffect } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function useGsapMagic({
  splitText = false,
  splitSelector = ".splitchars",
  hoverZoom = false,
  zoomSelectors = [".projectImage2-inner img", ".otherImage-inner img"],
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(SplitText, ScrollTrigger);

    // === SPLIT TEXT MAGIC ===
    if (splitText) {
      const elements = document.querySelectorAll(splitSelector);

      elements.forEach((el) => {
        const split = new SplitText(el, {
          type: "chars",
          charsClass: "otherchars",
        });

        gsap.set(el, { overflow: "hidden" });

        gsap.from(split.chars, {
          y: "100%",
          opacity: 0,
          stagger: 0.03,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        });
      });
    }

    // === HOVER ZOOM MAGIC ===
    if (hoverZoom) {
      const elements = zoomSelectors.flatMap((sel) => Array.from(document.querySelectorAll(sel)));

      elements.forEach((el) => {
        const zoom = () => {
          gsap.to(el, {
            duration: 1.5,
            ease: "expo.out",
            scale: 1.1,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
          });
        };

        const reset = () => {
          gsap.to(el, {
            duration: 1.5,
            ease: "expo.out",
            scale: 1,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
          });
        };

        el.addEventListener("mouseenter", zoom);
        el.addEventListener("mouseleave", reset);

        // Clean up listeners
        return () => {
          el.removeEventListener("mouseenter", zoom);
          el.removeEventListener("mouseleave", reset);
        };
      });
    }
  }, [splitText, splitSelector, hoverZoom, zoomSelectors]);
}
