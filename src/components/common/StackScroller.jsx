import { useRef } from "react";
import { useLenis } from "lenis/react";

function StackScroller({ children }) {
  const sections = useRef([]);

  useLenis(({ scroll }) => {
    const vh = window.innerHeight;

    sections.current.forEach((section, index) => {
      if (!section) return;

      const start = index * vh;
      const end = start + vh;

      const progress = Math.min(
        Math.max((scroll - start) / vh, 0),
        1
      );

      section.style.transform = `
        translateY(${(1 - progress) * 100}vh)
      `;
    });
  });

  return (
    <div className={`relative h-[${children.length * 100}vh]`}>
      <div className="fixed inset-0">
        {children.map((child, i) => (
          <div
            key={i}
            ref={el => (sections.current[i] = el)}
            className="absolute inset-0 will-change-transform"
            style={{ zIndex: children.length - i }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
