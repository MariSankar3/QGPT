import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function SlideUpText({
  items,
  interval = 2000,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    startTimer();

    const handleVisibility = () => {
      if (document.hidden) {
        stopTimer(); // ⏸ pause
      } else {
        startTimer(); // ▶ resume
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [interval, items?.length]);

  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
        height: "var(--slide-height)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          style={{
            display: "block",
            lineHeight: "inherit",
            whiteSpace: "normal",
          }}
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
