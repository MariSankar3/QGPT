import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function RotatingText({ words = [], interval = 2500, className = "" }) {
  const [index, setIndex] = useState(0);
  const [height, setHeight] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const measureHeight = () => {
      if (!containerRef.current) return;
      let max = 0;
      containerRef.current.querySelectorAll(".word").forEach((el) => {
        if (el.offsetHeight > max) max = el.offsetHeight;
      });
      setHeight(max);
    };

    measureHeight();
    window.addEventListener("resize", measureHeight);
    return () => window.removeEventListener("resize", measureHeight);
  }, [words]);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);

    const handleVisibility = () => {
      if (document.hidden) clearInterval(id);
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [words.length, interval]);

  return (
    <span
      ref={containerRef}
      className="inline-block relative overflow-hidden align-bottom"
      style={{ height }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ y: { duration: 0.5, ease: "easeOut" }, opacity: { duration: 0.3 } }}
          className={`block word ${className}`}
          style={{ whiteSpace: "normal", lineHeight: "inherit" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
