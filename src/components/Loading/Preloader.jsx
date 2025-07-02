// Preloader.js
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sliceColors = ["var(--primary)", "var(--primary)", "var(--primary)", "var(--primary)"];

const Preloader = ({ done }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (done) {
      const timeout = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [done]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: done ? "-100%" : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "row-reverse",
        backgroundColor: "var(--background, #fff)",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {sliceColors.map((color, i) => (
        <motion.div
          key={i}
          initial={{ y: 0 }}
          animate={{ y: done ? "-100%" : 0 }}
          transition={{
            duration: 1 + i * 0.15,
            ease: "easeInOut",
          }}
          style={{
            flex: 1,
            backgroundColor: color,
            margin: 1,
            borderRadius: 16,
            height: "100vh",
          }}
        />
      ))}
    </motion.div>
  );
};

export default Preloader;
