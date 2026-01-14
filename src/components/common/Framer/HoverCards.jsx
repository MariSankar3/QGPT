import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPANDED_WIDTH = 418
const EXPANDED_WIDTH_XL = 500

const BASE_WIDTH = 200
const BASE_WIDTH_XL = 250

const BREAKPOINT = 1536

const BASE_IMG_HEIGHT = 80;
const EXPANDED_IMG_HEIGHt = 160;
const BASE_TITLE_SIZE = 16;
const EXPANDED_TITLE_SIZE = 20;

export default function HoverCards({ cards }) {
  const [active, setActive] = useState(0);
  const [baseWidth, setBaseWidth] = useState(200);
  const [expandedWidth, setExpandedWidth] = useState(418);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth > BREAKPOINT) {
        setBaseWidth(BASE_WIDTH_XL);
        setExpandedWidth(EXPANDED_WIDTH_XL);
      } else {
        setBaseWidth(BASE_WIDTH);
        setExpandedWidth(EXPANDED_WIDTH);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex overflow-hidden flex-1 w-full gap-[16px]">
      {cards.map((card, i) => {
        const isActive = active === i;
        return (
          <motion.div
            key={i}
            className="h-[56vh] max-h-[56vh] rounded-[40px] px-[20px] py-[24px] lg:p-[24px] flex flex-col cursor-pointer border border-[#B0B0B0] shadow-[0px_10px_20px_0px_#0000000A] overflow-hidden"
            onMouseEnter={() => setActive(i)}
            animate={{
              width: isActive ? expandedWidth : baseWidth,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
          >
            <motion.div
              className="overflow-hidden w-full"
              animate={{ height: isActive ? EXPANDED_IMG_HEIGHt : BASE_IMG_HEIGHT }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover rounded-[30px]"
              />
            </motion.div>

            <motion.div
              className="text-[15px] font-bold py-2"
              animate={{
                fontSize: isActive ? EXPANDED_TITLE_SIZE : BASE_TITLE_SIZE,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            >
              {card.title}
            </motion.div>
            <div className="flex flex-1">
              <motion.div
                className="text-[13px] leading-[1.25] pr-1 [@media(min-width:1440px)]: leading-[25px]"
                style={{ maskImage: isActive ? 'none' : 'linear-gradient(to bottom, black 70%, transparent)' }}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  height: isActive ? "auto" : "2lh"
                }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.35 },
                  height: { duration: 0.35 }
                }}
              >
                {card.text}
              </motion.div>
            </div>



            <AnimatePresence>
              {
                <motion.div
                  className="shrink-0 font-roboto text-[20px] mt-2 px-2 flex flex-col justify-end "
                >
                  <div className="flex items-center gap-[8px]">
                    {card.position} {isActive && <div className="text-[14px] font-thin uppercase">//step</div>}
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
