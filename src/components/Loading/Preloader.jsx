"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sliceCount = 4;
const sliceColors = ["var(--primary)", "var(--primary)", "var(--primary)", "var(--primary)"];
const logoWidth = 100; // Adjust as needed

const Preloader = ({ done, logoSrc }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    if (done) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = ""; // Re-enable scroll
      }, 1000);
      return () => clearTimeout(timeout);
    }

    // Cleanup just in case
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        zIndex: 9999,
        backgroundColor: "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: sliceCount }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 0 }}
            animate={{ y: done ? "-100%" : 0 }}
            transition={{ duration: 1 + i * 0.15, ease: "easeInOut" }}
            style={{
              flex: 1,
              backgroundColor: sliceColors[i],
              margin: 1,
              borderRadius: 16,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i === 1 && (
              <motion.img
                src={logoSrc || "/images/uzileft.png"}
                alt="Logo Left"
                initial={{ y: 0 }}
                animate={{ y: done ? "-100%" : 0 }}
                transition={{ duration: 1 + i * 0.15, ease: "easeInOut" }}
                style={{
                  width: `${logoWidth}px`,
                  objectFit: "contain",
                  position: "absolute",
                  right: 1,
                }}
              />
            )}
            {i === 2 && (
              <motion.img
                src={logoSrc || "/images/uziright.png"}
                alt="Logo Right"
                initial={{ y: 0 }}
                animate={{ y: done ? "-100%" : 0 }}
                transition={{ duration: 1 + i * 0.15, ease: "easeInOut" }}
                style={{
                  width: `${logoWidth}px`,
                  objectFit: "contain",
                  position: "absolute",
                  left: 1,
                }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Preloader;
