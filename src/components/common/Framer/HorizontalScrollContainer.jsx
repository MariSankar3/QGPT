import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const HorizontalScroll = ({ children, gap = 24, speed = 1 }) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  // const isHovering = useRef(false);

  // useEffect(() => {
  //   const el = containerRef.current;
  //   if (!el) return;

  //   const enter = () => (isHovering.current = true);
  //   const leave = () => (isHovering.current = false);

  //   el.addEventListener("mouseenter", enter);
  //   el.addEventListener("mouseleave", leave);

  //   return () => {
  //     el.removeEventListener("mouseenter", enter);
  //     el.removeEventListener("mouseleave", leave);
  //   };
  // }, []);

  useEffect(() => {
    const onWheel = (e) => {
      if (!isHovering.current) return;

      e.preventDefault();

      const maxScroll =
        el.scrollWidth - el.clientWidth;

      const next = x.get() - e.deltaY * speed;
      x.set(Math.max(-maxScroll, Math.min(0, next)));
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        className="flex"
        style={{ x, gap }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HorizontalScroll;
