import { motion } from "framer-motion";

export default function FloatText({ children, className = "", amplitude = 4, duration = 3 }) {
  return (
    <motion.span
      animate={{ y: [-amplitude, amplitude, -amplitude], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: duration, ease: "easeInOut", repeat: Infinity }}
      className={className}
      style={{ display: "inline-block" }}
    >
      {children}
    </motion.span>
  );
}
