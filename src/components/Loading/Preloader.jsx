import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sliceColors = ["#111", "#111", "#111", "#111"];

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
        width: "100%",
        display: "flex",
        flexDirection: "row-reverse",
        backgroundColor: "transparent",
        overflow: "hidden",
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
            backgroundColor: "var(--primary)",
            margin: 1,
            borderRadius: 16,
            height: "100vh", // make it tall
          }}
        />
      ))}
    </motion.div>
  );
};

export default Preloader;
