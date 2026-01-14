import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'
import './App.css'
import Separator from './components/common/Separator'
import SlideUpText from './components/common/SlideUpText'
import FloatText from './components/common/FloatText'
import { useLenis } from 'lenis/react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeInText from './components/common/FadeInText'
import { cn } from './helpers/utils'
import Header from './components/common/Header/header'
import JoinCohort from './components/common/JoinCohort/JoinCohort'
import ResponsiveSection from './components/common/ResponsiveSection'
import HorizontalScroll from './components/common/Framer/HorizontalScrollContainer'
import { HiChevronRight } from 'react-icons/hi2'
import { MAX_WIDTH } from './components/constants/css-classes'
import youImg from "../public/assets/images/you.png";
import mdImg from "../public/assets/images/md.png";
import aidImg from "../public/assets/images/aid.png";


gsap.registerPlugin(useGSAP)

function App() {
  const location = useLocation()
  useLenis();

  const container = useRef();
  const hrCardContainer = useRef();
  const [currentCard, setCurrentCard] = useState(1)

  const FIRST_ANIM_DURATION = 0.25;
  const SECOND_ANIM_DURATION = 0.4;
  const FADE_DELAY = 0.05;

  const CARD_MOVE_DURATION = 0.25;
  const CARD_SLIDE_STEP_DURATION = 0.25;

  const THIRD_SECTION_FADE_DURATION = 0.3;
  const SECTION_FOUR_SLIDE_DURATION = 0.3;
  const SECTION_FIVE_DURATION = 0.3;
  const SECTION_SIX_DURATION = 0.6;

  let scrollTrigger = null



  useGSAP(() => {

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const t1 = gsap.timeline();

    t1.addLabel("firstAnim");

    t1.to(".home-section", {
      height: 0,
      autoAlpha: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: FIRST_ANIM_DURATION,
      ease: "none",
    }, "firstAnim");

    t1.fromTo(
      ".second-section .hero-img",
      { autoAlpha: 0.85, },
      { autoAlpha: 1, duration: FIRST_ANIM_DURATION, ease: "none" },
      "firstAnim"
    );

    t1.fromTo(
      ".second-section-content",
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: FIRST_ANIM_DURATION - FADE_DELAY,
        delay: FADE_DELAY,
        ease: "none",
      },
      "firstAnim"
    );

    t1.fromTo(
      ".header",
      { background: "#12121200" },
      {
        background: "linear-gradient(to bottom, rgba(18,18,18,1), rgba(18,18,18,0.85), transparent)",
        duration: FIRST_ANIM_DURATION - FADE_DELAY,
        delay: FADE_DELAY,
        ease: "none",
      },
      "firstAnim"
    );


    t1.addLabel("secondAnim", ">+=0.15");

    t1.to(".second-section-content", {
  autoAlpha: 0,
  y: -40,
  scale: 0.98,
  // filter: "blur(10px)",
  height: 0,
  padding: 0,
  duration: SECOND_ANIM_DURATION / 2,
  // ease: "sine.out",
  // stagger: 0.8,
}, "secondAnim");


    mm.add("(min-width: 1024px)", () => {
      t1.to(".second-section", {
        height: "20lvh",
        padding: 0,
        ease: "none",
        duration: SECOND_ANIM_DURATION,
      }, "secondAnim");
    });

    mm.add("(max-width: 1023px)", () => {
      t1.to(".second-section", {
        height: "10lvh",
        padding: 0,
        ease: "none",
        duration: SECOND_ANIM_DURATION,
      }, "secondAnim");
    });

    mm.add("(min-width: 1024px)", () => {
      t1.fromTo(
        ".second-section .hero-img",
        { backgroundPosition: "50% 100%", },
        { backgroundPosition: "50% 50%", duration: FIRST_ANIM_DURATION, ease: "none" },
        "secondAnim"
      );
    });

    mm.add("(max-width: 1023px)", () => {
      t1.fromTo(
        ".second-section .hero-img",
        { backgroundPosition: "0% 0%", },
        { backgroundPosition: "50% 20%", duration: FIRST_ANIM_DURATION, ease: "none" },
        "secondAnim"
      );
    });


    const GAP = 32;
    const TOTAL_CARDS = 3;
    const DELAY_BETWEEN = 0.2;

    mm.add("(min-width: 1024px)", () => {
      for (let i = 1; i < TOTAL_CARDS; i++) {
        const labelName = `cardAnim${i}`;

        t1.addLabel(labelName, `+=${DELAY_BETWEEN}`);

        t1.to(".card", {
          yPercent: "-=100",   
          y: `-=${GAP}`,       
          duration: CARD_MOVE_DURATION,
          ease: "none",
          onUpdate: () => {
            const yPercent = gsap.getProperty(".card", "yPercent");
            const current = Math.abs(Math.round(yPercent / 100)) + 1;
            setCurrentCard(current);
          },
        }, labelName);
      }
    })



    mm.add("(max-width: 1023px)", () => {
      for (let i = 1; i < TOTAL_CARDS; i++) {
        const labelName = `cardAnim${i}`;

        t1.addLabel(labelName, `+=${DELAY_BETWEEN}`);

        if (i === TOTAL_CARDS - 1) {
          t1.to(".third-section-header", {
            duration: CARD_MOVE_DURATION,
            position: "static",
            overflow: "hidden",
            delay: 0.1,
            yPercent: -100,
          }, labelName).to(".third-section-header", {
            height: 0,
            maxHeight: 0,
            duration: CARD_MOVE_DURATION
          });
        }

        t1.to(".card", {
          yPercent: "-=100",   
          y: `-=${GAP}`,       
          duration: CARD_MOVE_DURATION,
          ease: "none",
          onUpdate: () => {
            const yPercent = gsap.getProperty(".card", "yPercent");
            const current = Math.abs(Math.round(yPercent / 100)) + 1;
            setCurrentCard(current);
          },
        }, labelName);


      }
    })

    t1.addLabel("thirdAnim", ">+=0.35");

    t1.to(".section-four", {
      y: "-=100%",
      boxShadow: "0px -20px 40px rgba(0,0,0,0.3)",
      duration: SECTION_FOUR_SLIDE_DURATION,
      ease: "none",
    }, "thirdAnim");

    t1.addLabel("inBetweenAnim", ">")

    t1.to(
      ".second-section, .second-section-content, .hero-img",
      {
        height: 0,
        autoAlpha: 0,
        padding: 0,
        duration: SECTION_FIVE_DURATION,
        ease: "none",
      },
      "inBetweenAnim"
    );


    t1.fromTo(
      ".header",
      { background: "linear-gradient(to bottom, rgba(18,18,18,1), rgba(18,18,18,0.85), transparent)" },
      {
        background: "#121212",
        duration: FIRST_ANIM_DURATION - FADE_DELAY,
        delay: FADE_DELAY,
        ease: "none",
      },
      "inBetweenAnim"
    );

    t1.fromTo(".join-cohort", {
      y: "-100%"
    }, {
      y: "0%",
      duration: SECTION_FIVE_DURATION + 0.1,
      ease: "none",
    }, "inBetweenAnim");

    t1.addLabel("fourthAnim", ">");

    t1.to(".third-section", {
      height: 0,
      autoAlpha: 0,
      padding: 0,
      duration: SECTION_FIVE_DURATION,
      ease: "none",
    }, "fourthAnim")

    t1.to(".section-four", {
      height: 0,
      boxShadow: "none",
      duration: SECTION_FIVE_DURATION,
      ease: "none",
      padding: 0,
    }, "fourthAnim")



    t1.fromTo(".join-cohort",
      {
        y: "-100%",
        duration: SECTION_FIVE_DURATION,
        ease: "none",
      },
      {
        y: "0%",
        duration: SECTION_FIVE_DURATION,
        ease: "none",
      }
      , "fourthAnim");

    t1.addLabel("fifthAnim", ">+=0.25");

    t1.to(".join-cohort", {
      autoAlpha: 0.6,
      y: "-30vh",
      duration: 0.1,
      ease: "none",
    }, "fifthAnim");

    scrollTrigger = ScrollTrigger.create({
      trigger: container.current,
      start: "top top",
      end: "max",
      pin: true,
      scrub: true,
      animation: t1,
      // snap: "labelsDirectional",
      // pinSpacing: false,
      // invalidateOnRefresh: true,
    });



  }, { scope: container });

  return (

    <div ref={container} className={cn('container mx-auto', MAX_WIDTH)}>
      <Header />
      <div className={cn('mx-auto', MAX_WIDTH)}>
        <Home />
      </div>
      <Second />
      <div className={cn('mx-auto', MAX_WIDTH)}>
        <Third currentCard={currentCard} />
      </div>
      <div className={cn('mx-auto', MAX_WIDTH)}>
        <Fourth hrCardContainer={hrCardContainer} />
        <JoinCohort className="max-[600px]:translate-y-[-10vh]" />
      </div>
      {/* <div  className={cn('mx-auto max-[600px]:translate-y-[-5vh]', MAX_WIDTH)}> */}
  
{/* </div> */}
    </div>
  )
}

// const Home = () => {
//   return <div className='home-section h-lvh pb-[40px] xl:pb-[68px] px-[42px] flex flex-col'>
//     {/* Home */}
//     <div className='shrink-0 h-[59px] lg:h-[99px] w-full'>
//     </div>
//     <Separator className={"shrink-0"} />
//     <div className='flex-1 flex flex-col justify-center'>
//       <div className='flex flex-col lg:flex-row items-center lg:px-[40px] gap-[80px] md:gap-[40px] lg:gap-[100px] lg:gap-[0px]'>
//         <div className='flex-1'>
//           <div className="flex-1 text-right">
//             <SlideUpText
//               items={[
//                 "Glucose spike between MD visits?",
//                 "Regaining weight after a brief loss?",
//                 "Not meeting your metabolic goals?",
//                 "Wish you had a doctor always on?",
//               ]}
//               interval={3000}
//               className=" text-[30px] max-[380px]:text-[20px] max-[380px]:mt-[50px] md:text-[32px] text-center lg:text-left
//                [--slide-height:3em] [--slide-height:1lh]"
//             />
//           </div>
//         </div>
//         <div className='flex-1 flex justify-center'>
//           <div className='relative dr-img-container max-w-[clamp(200px,40vw,464px)]'>
//             <img src="/assets/images/dr-sara-mohan.png" alt="" className='w-full h-full object-cover' />
//             <div className='absolute top-[50%] -translate-y-[200%] -right-[48px] lg:-right-[34px]'>
//                <div>
//                 <FadeInText>
//                   <FloatText amplitude={6} duration={2} className="text-[14px] lg:text-[22px] font-medium text-white leading-[16px] lg:leading-[21px]">
//                     Dr. Sara Mohan <br />
//                     <span className='text-[11px] lg:text-[16px] font-light'>Your AI Doctor</span>
//                   </FloatText>
//                 </FadeInText>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Separator className={"shrink-0"} />
//       <FadeInText className='flex justify-center'>
//         <div className='text-center py-[32px] font-medium text-[20px] lg:text-[34px] lg:leading-[40px] max-w-[1012px]'>
//           Now you can have your own AI Doctor that is always on, always yours, and outcome focused
//         </div>
//       </FadeInText>
//     </div>
//   </div>
// }
const Home = () => {
  return <div className='home-section h-lvh pb-[30px] xl:pb-[0px] px-[42px] flex flex-col bg-[#1]'  >
    {/* Home */}
    <div className='shrink-0 h-[59px] lg:h-[99px] w-full'>
    </div>
    <Separator className={"shrink-0"} />
    <div className='flex-1 flex flex-col justify-center [@media(min-width:1441px)]:scale-[1] '>
      <div className='flex flex-col lg:flex-row items-center lg:px-[40px] gap-[60px] md:gap-[40px] lg:gap-[100px] lg:gap-[0px] [@media(min-width:1440px)]:mt-[40px]'>
        <div className='flex-1'>
          <div className="flex-1 text-right md:ml-[20px]">
  <SlideUpText
    items={[
      "Glucose spike between MD visits?",
      "Regaining weight after a brief loss?",
      "Not meeting your metabolic goals?",
      "Wish you had a doctor always on?",
    ]}
    interval={3000}
    className=" text-[30px] max-[380px]:text-[20px] max-[380px]:mt-[50px] md:text-[32px] text-center lg:text-left
               [--slide-height:3em] [--slide-height:1lh]"
  />
</div>

        </div>
        <div className='flex-1 flex justify-center'>
          <div className='relative dr-img-container max-[380px]:mt-[-55px] max-w-[304px] md:max-w-[340px] lg:max-w-[464px]'>
            <img src="/assets/images/dr-sara-mohan.png" alt="" className='w-full h-full object-cover' />
            <div className='absolute top-[50%] -translate-y-[200%] -right-[20px]'>
              <div>
                <FadeInText>
                  <FloatText amplitude={4} duration={2} className="text-[14px] sm:text-[16px] lg:text-[20px] font-medium text-white leading-[18px]">
                    Dr. Sara Mohan <br />
                    <span className='text-[11px] lg:text-[13px] font-light'>Your AI Doctor</span>
                  </FloatText>
                </FadeInText>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator className={"shrink-0"} />


      
      <FadeInText className='flex justify-center'>
        <div className='text-center py-[32px] font-medium text-[20px] lg:text-[32px] lg:leading-[40px] max-w-[1012px]  [@media(min-width:1440px)]:mt-[15px]'>
          Now you can have your own AI Doctor that is always on, always yours, and outcome focused
        </div>
      </FadeInText>
    </div>
  </div>
}

const Second = () => {
  return <div className="z-[2] second-section relative h-lvh flex flex-col gap-[25px] bg-[#121212]">
    {/* IMAGE SECTION */}
   <div
      className="
      relative
      flex-1
      w-full
      hero-img
      md:bg-[url('/assets/images/subbanner.png')]
      bg-[url('/assets/images/mobileview.png')]
      bg-cover
      bg-no-repeat
      bg-[50%_10%]
      sm:bg-[50%_55%]
      shadow-[0_0_60px_20px_rgba(18,18,18,0.6)_inset]
      max-w-[1912px]
      mx-auto
    "
    >
      {/* Bottom fade: image → content */}
      <div
        className="
        pointer-events-none
        absolute inset-0
        bg-[linear-gradient(to_bottom,_transparent_75%,_#121212_100%)]
      "
      />
    </div>

    {/* CONTENT SECTION */}
    <div
      className={cn("relative z-[1] -mt-[80px]  [@media(max-width:360px)]:-mt-[140px] bg-[linear-gradient(to_bottom,_transparent_0%,_#121212_45%)] flex flex-col justify-center text-center py-[28px] px-[42px] lg:px-[100px] second-section-content mx-auto ", MAX_WIDTH)
      }
    >
      <img
    src={mdImg}
    alt="MD"
    className="absolute bottom-[110%] left-[10%] w-[170px] md:w-[90] hidden md:block"
  />
  <img
    src={youImg}
    alt="You"
    className="absolute translate-x-1/2 bottom-[100%] left-[47%] w-[10px] md:w-[65px] hidden md:block "
  />
  
  <img
    src={aidImg}
    alt="AI Doctor"
    className="absolute bottom-[110%] right-[10%] w-[120px] md:w-[160px] hidden md:block"
  />
      <div className='text-center w-full flex justify-center'>
        <h2 className="
      text-[24px]
      lg:text-[36px]
      xl:text-[50px]
      font-extrabold
      lg:mb-[24px]
      mb-[16px]
      max-w-[280px]
      sm:max-w-full
      text-center
      [@media(max-width:360px)]:mt-[90px]
    ">
          Your care with human MD and AI Doctor
        </h2>
      </div>

      <p className="
      text-[16px]
      lg:text-[20px]
      max-w-[800px]
      lg:max-w-[1360px]
      mx-auto
      [@media(max-width:360px)]:text-[13px]
    ">
        If you are living with diabetes, hypertension, or weight struggles, you know how unpredictable the numbers can feel — progress one week, setbacks the next, and no clear sense of what actually helps. ChronicGPT changes that. Your human doctor sets your goals, and your personal AI Doctor learns your body in real time — watching your sleep, meals, glucose, activity, and medications to guide you with simple, clinical-grade decisions every day. It turns confusion into clarity, patterns into progress, and setbacks into signals you can finally understand.
      </p>
    </div>
  </div>

}

// const Third = ({ currentCard }) => {
//   return <ResponsiveSection className='z-[3] relative h-lvh third-section mx-[10px] text-black bg-[#FFF] overflow-hidden'>
//     <div className='flex flex-col lg:flex-row gap-8 md:gap-4 lg:gap-6 3xl:gap-8'>
//       <div className='max-h-[calc(80lvh-20px)]
//         md:max-h-[calc(80lvh-40px)]
//         lg:max-h-[calc(80lvh-80px)]
//         3xl:max-h-[calc(80lvh-120px)]
//         flex-1 flex flex-col justify-between gap-[20px]
//         relative z-[1] bg-white shadow-lg lg:shadow-none lg:bg-transparent lg:static -mx-[16px] -mt-[20px] px-[16px] py-[24px] lg:mx-0 lg:mt-0 lg:px-0 lg:py-0  
//         third-section-header
//         '>
//         <div className='flex flex-col gap-2 justify-between'>
//           <div className='text-[40px] font-medium '>
//             How it works
//           </div>
//           <div className='font-semibold'>
//             Your AI Doctor combines three layers of intelligence  <br /> to give you continuous, clinician-guided care.
//           </div>
//         </div>
//         <div className='flex flex-row justify-between items-center lg:items-start lg:flex-col gap-[16px]'>
//           <div className='flex items-center font-roboto font-medium text-[#121212] text-[32px] gap-[4px] leading-[32px]'>
//             <div>{String(currentCard).padStart(2, "0")}</div> <div className='text-[22px] text-[#121212]/60'>/ 03</div>
//           </div>
//           <div className="flex gap-2">
//             {Array.from({ length: 3 }).map((_, index) => (
//               <div
//                 key={index}
//                 className={cn(
//                   "h-[4px] transition-all duration-300 ease-out",
//                   currentCard === index + 1
//                     ? "w-[88px] bg-[#06040A]"
//                     : "w-[12px] bg-[#06040A]/50"
//                 )}
//               />
//             ))}
//           </div>

//         </div>

//       </div>
//       <div className='flex-1 cards-carousel-container flex flex-col gap-[32px]'>
//         <Card
//           index="01"
//           image="/assets/images/card-1.jpg"
//           title="Your AI Doctor studies the way your body behaves"
//           className="first-card"
//         >
//           It watches your sleep quality, meals, glucose swings, hydration, medication timing, activity, and stress patterns. Over time, it builds a living model of your physiology, spotting subtle patterns that even good doctors can’t see between visits. This is how it understands why your numbers move the way they do, and what will help you stabilize them.
//         </Card>

//         <Card
//           index="02"
//           image="/assets/images/card-2.png"
//           title="Behind every insight is real clinical reasoning."
//           className="second-card"
//         >
//           Your AI Doctor evaluates risk the way a careful physician would: rising morning glucose, changing blood pressure trends, sleep debt, medication conflicts, missed doses, unusual heart-rate shifts, and more. When something looks concerning, it flags it early — and your human doctor reviews your clinical trace to confirm the right next step. You get the vigilance of a medical team that never goes off duty.
//         </Card>

//         <Card
//           index="03"
//           image="/assets/images/card-3.png"
//           title="Clear explanations. Simple actions. No jargon."
//           className="third-card"
//         >
//           Your AI Doctor turns complex data into practical daily guidance:
//           “Your numbers look stable — keep the same routine today.”
//           “Take a lighter dinner tonight; your glucose stayed elevated longer than usual.”
//           “Focus on hydration for the next 24 hours — it will help bring your pressure down.”
//           Every message is personalized, medically grounded, and aimed at keeping you steady, confident, and in control.
//         </Card>

//       </div>
//     </div>
//   </ResponsiveSection>
// }

const Third = ({ currentCard }) => {
  return <ResponsiveSection className='z-[3] relative h-dvh third-section mx-[10px] text-black bg-[#FFF] overflow-hidden'>
    <div className='flex flex-col lg:flex-row gap-5 md:gap-4 lg:gap-6 3xl:gap-8'>
      <div className='max-h-[calc(80dvh-20px)]
        md:max-h-[calc(80dvh-40px)]
        lg:max-h-[calc(80dvh-80px)]
        3xl:max-h-[calc(80dvh-120px)]
        flex-1 flex flex-col justify-between gap-[20px]
        relative z-[1] bg-white lg:bg-transparent lg:static -mx-[16px] -mt-[20px] px-[16px]  py-[24px] pb-[8px] sm:py-[24px]max-[380px]:py-[15px] sm:pb-[0px] lg:mx-0 lg:mt-0 lg:px-0 lg:py-0  
        '>
        <div className='flex flex-col gap-2 justify-between'>
          <div className='text-[40px] font-medium  max-[380px]:text-[24px]'>
            How it works
          </div>
          <div className='font-semibold max-[380px]:text-[13px] sm:w-[60%] '>
            Your AI Doctor combines three layers of intelligence to give you continuous, clinician-guided care.
          </div>
        </div>
        
        <div className='flex flex-row justify-between items-center lg:items-start lg:flex-col gap-[16px]'>
          <div className='flex items-center font-roboto font-medium text-[#121212] text-[32px] gap-[4px] leading-[32px] max-[380px]:text-[23px]'>
            <div>{String(currentCard).padStart(2, "0")}</div> <div className='text-[22px] text-[#121212]/60'>/ 03</div>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-[4px] transition-all duration-300 ease-out",
                  currentCard === index + 1
                    ? "w-[88px] bg-[#06040A]"
                    : "w-[12px] bg-[#06040A]/50"
                )}
              />
            ))}
          </div>

        </div>

      </div>
      <div className='flex-1 cards-carousel-container flex flex-col gap-[30px]  xl:gap-[32px]'>
        <Card
          index="01"
          image="/assets/images/card-1.jpg"
          title="Your AI Doctor studies the way your body behaves"
          className="first-card [@media(min-width:1440px)]:mt-[42px] "
          
        >
          It watches your sleep quality, meals, glucose swings, hydration, medication timing, activity, and stress patterns. Over time, it builds a living model of your physiology, spotting subtle patterns that even good doctors can’t see between visits. This is how it understands why your numbers move the way they do, and what will help you stabilize them.
        </Card>

        <Card
          index="02"
          image="/assets/images/card-2.png"
          title="Behind every insight is real clinical reasoning."
          className="second-card"
        >
          Your AI Doctor evaluates risk the way a careful physician would: rising morning glucose, changing blood pressure trends, sleep debt, medication conflicts, missed doses, unusual heart-rate shifts, and more. When something looks concerning, it flags it early — and your human doctor reviews your clinical trace to confirm the right next step. You get the vigilance of a medical team that never goes off duty.
        </Card>

        <Card
          index="03"
          image="/assets/images/card-3.png"
          title="Clear explanations. Simple actions. No jargon."
          className="third-card"
        >
          Your AI Doctor turns complex data into practical daily guidance:
          “Your numbers look stable — keep the same routine today.”
          “Take a lighter dinner tonight; your glucose stayed elevated longer than usual.”
          “Focus on hydration for the next 24 hours — it will help bring your pressure down.”
          Every message is personalized, medically grounded, and aimed at keeping you steady, confident, and in control.
        </Card>

      </div>
    </div>
  </ResponsiveSection>
}



const Fourth = ({ hrCardContainer }) => {


  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const [showNav, setShowNav] = useState(true);

  const updateButtons = () => {
    const el = hrCardContainer.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;

    // hide buttons if no scrolling possible
    const canScroll = el.scrollWidth > el.clientWidth;
    setShowNav(canScroll);

    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft < maxScroll);
  };


  const scrollCards = (dir) => {
    const container = hrCardContainer.current;
    if (!container) return;

    const cardWidth = container.firstChild?.offsetWidth || 300;
    const gap = 24; // matches gap-[24px]
    const scrollAmount = cardWidth + gap;

    container.scrollBy({
      left: dir === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    // Progress update after scroll movement
    setTimeout(() => {
      const maxScroll = container.scrollWidth - container.clientWidth;
      setProgress((container.scrollLeft / maxScroll) * 100);
    }, 300);
  };

  useEffect(() => {
    const el = hrCardContainer.current;
    if (!el) return;

    updateButtons(); // check first render
    const handleScroll = () => {
      const maxScroll = el.scrollWidth - el.clientWidth;
      const ratio = el.scrollLeft / maxScroll;
      setProgress(ratio * 100);
      updateButtons();
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);


  return <ResponsiveSection className='h-dvh relative z-[4] text-[#121212] bg-[#F1F1F1] section-four flex flex-col gap-[10px] md:gap-[16px] lg:gap-[28px] 3xl:gap-[36px] bg-[#F1F1F1] mx-[10px] overflow-hidden'>
    <div className='flex flex-col lg:flex-row gap-2 sm:mt-3 [@media(min-width:1440px)]:mt-[20px] [@media(min-width:1440px)]:mb-[35px]'>
      <h2 className='flex-1 text-[40px] leading-[52px]  font-medium max-[380px]:text-[24px] max-[380px]:leading-[28px]'>
        Real clinical outcomes, felt in your everyday life
      </h2>
      <p className='flex-1 text-[16px] leading-[24px] font-medium max-[380px]:text-[13px] max-[380px]:leading-[20px]'>
        You choose one or more improvement programs. Your AI Doctor works in the background every day — helping you feel the changes in ways that matter: steadier energy, calmer mornings, smoother rhythms, and more restorative nights.
      </p>
    </div>
    <div className='flex flex-col-reverse lg:flex-col justify-between gap-[24px] [@media(max-width:391px)]:gap-[10px] [@media(min-width:1440px)]:gap-[65px]'  >
      <div className={cn('flex gap-[24px] hr-card-container pb-[8px] overflow-auto hide-scrollbar', canNext)} ref={hrCardContainer}>
        <HorizontalCard
          title="Mornings stop feeling unpredictable"
          img={"/assets/images/hr-card-1.jpg"}
          className="hr-card-1"
        >
          Instead of waking up already behind, you start the day more steady — clear-headed, less groggy, and without the crashes that used to set the tone.
        </HorizontalCard>
        <HorizontalCard
          title="Sleep becomes restorative"
          img={"/assets/images/hr-card-2.jpg"}
          className="hr-card-2"
        >
          Your AI Doctor helps you adjust your evenings, nutrition, timing, and recovery.
          You fall asleep easier, wake up less, and start feeling rested in a way you haven’t in years.
        </HorizontalCard>
        <HorizontalCard
          title="Meals stop derailing your day"
          img={"/assets/images/hr-card-3.jpg"}
          className="hr-card-3"
        >
          You quickly learn which foods and timings work for your physiology.
          Post-meal crashes shrink, late-evening glucose stays quieter, and eating stops feeling like guesswork.
        </HorizontalCard>
        <HorizontalCard
          title="Energy feels smoother, not spiky"
          img={"/assets/images/hr-card-4.jpg"}
          className="hr-card-4"
        >
          Instead of sharp highs and lows, your days develop a smoother rhythm.
          Lifting groceries, climbing stairs, focusing at work — everything feels more doable.
        </HorizontalCard>
        <HorizontalCard
          title="Healthy routines finally stick"
          img={"/assets/images/hr-card-8.jpg"}
          className="hr-card-8"
        >
          Because your AI Doctor guides you in real time, habits stop slipping through cracks. Hydration, movement, medication timing, sleep routines — they become easier, more automatic, and more consistent.
        </HorizontalCard>
      </div>
      <div className='flex p-2 max-[380px]:p-1 justify-between flex flex-row-reverse lg:flex-row items-center w-full'>
        <div className="bg-[#06040A]/20 w-[200px] h-[4px] ">
          <div style={{ width: `${progress}%` }}
            className={cn("progress-bar bg-[#06040A] h-full w-fit")}></div>
        </div>


        <div className='cursor-pointer '>
          <button
            onClick={() => scrollCards("prev")}
            className="p-[10px] max-[380px]:p-[4px] border-[1px] border-[#121212] text-[#121212] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            disabled={!canPrev}

          >
            <HiChevronRight className='-rotate-180' size={"24px"} />
          </button>
          <button
            onClick={() => scrollCards("next")}
            className="-translate-x-[1px] p-[10px] max-[380px]:p-[4px] border-[1px] border-[#121212] text-[#121212] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            disabled={!canNext}

          >
            <HiChevronRight size={"24px"} />
          </button>
        </div>
      </div>
    </div>
  </ResponsiveSection>
}

const FourthV2 = ({ hrCardContainer }) => {
  return <ResponsiveSection className='h-lvh relative z-[4] text-[#121212] bg-[#F1F1F1] section-four flex flex-col gap-[10px] md:gap-[16px] lg:gap-[28px] 3xl:gap-[36px] bg-[#F1F1F1] mx-[10px] rounded-[60px] overflow-hidden'>
    <div className='flex gap-2'>
      <h2 className='flex-1 text-[40px] leading-[52px] font-medium'>
        Real clinical outcomes, <br /> felt in your everyday life
      </h2>
      <p className='flex-1 text-[16px] leading-[24px] font-medium'>
        You choose one or more improvement programs. Your AI Doctor works in the background every day — helping you feel the changes in ways that matter: steadier energy, calmer mornings, smoother rhythms, and more restorative nights.
      </p>
    </div>

    <HorizontalScroll>
      <HorizontalCard
        title="Mornings stop feeling unpredictable"
        img={"/assets/images/hr-card-1.jpg"}
        className="hr-card-1"
      >
        Instead of waking up already behind, you start the day more steady — clear-headed, less groggy, and without the crashes that used to set the tone.
      </HorizontalCard>
      <HorizontalCard
        title="Sleep becomes restorative"
        img={"/assets/images/hr-card-2.jpg"}
        className="hr-card-2"
      >
        Your AI Doctor helps you adjust your evenings, nutrition, timing, and recovery.
        You fall asleep easier, wake up less, and start feeling rested in a way you haven’t in years.
      </HorizontalCard>
      <HorizontalCard
        title="Meals stop derailing your day"
        img={"/assets/images/hr-card-3.jpg"}
        className="hr-card-3"
      >
        You quickly learn which foods and timings work for your physiology.
        Post-meal crashes shrink, late-evening glucose stays quieter, and eating stops feeling like guesswork.
      </HorizontalCard>
      <HorizontalCard
        title="Energy feels smoother, not spiky"
        img={"/assets/images/hr-card-4.jpg"}
        className="hr-card-4"
      >
        Instead of sharp highs and lows, your days develop a smoother rhythm.
        Lifting groceries, climbing stairs, focusing at work — everything feels more doable.
      </HorizontalCard>
      <HorizontalCard
        title="Healthy routines finally stick"
        img={"/assets/images/hr-card-8.jpg"}
        className="hr-card-8"
      >
        Because your AI Doctor guides you in real time, habits stop slipping through cracks. Hydration, movement, medication timing, sleep routines — they become easier, more automatic, and more consistent.
      </HorizontalCard>
    </HorizontalScroll>
  </ResponsiveSection>
}

const Card = ({
  index,
  image,
  title,
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        card
  card-carousel
  flex flex-col
  overflow-auto

  bg-[#F1F1F1]
  rounded-[30px]
  lg:rounded-[50px]

  p-[10px]
  md:p-[20px]
  lg:p-[30px]
  3xl:p-[40px]

  gap-[8px]
  md:gap-[10px]
  lg:gap-[16px]
  3xl:gap-[32px]

  h-[550px]
  [@media(max-width:361px)]:h-[400px]
  [@media(max-width:391px)]:h-[490px]

  max-h-[calc(80lvh-20px)]
  md:max-h-[calc(80lvh-40px)]
  lg:max-h-[calc(80lvh-80px)]
  3xl:max-h-[calc(80lvh-120px)]

  [@media(min-width:1440px)]:leading-[35px]
        ${className}
      `}
    >
      {/* Image */}
      <div className="img-container rounded-[20px] h-[212px] [@media(max-width:361px)]:h-[152px] overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col [@media(max-width:391px)]:gap-[0px] gap-[8px] lg:gap-[16px] 3xl:gap-[20px]">
        <div className="font-light text-[32px] text-[#121212]">
          {index}
        </div>

        <div className="flex flex-col gap-[4px] 3xl:gap-[8px]">
          <div className="font-bold text-[20px] text-[#121212]">
            {title}
          </div>

          <div className="text-[16px] text-[#121212] [@media(max-width:361px)]:text-[12px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}


const HorizontalCard = ({ img, title, className, children }) => (
  <div className={cn('hr-card min-w-[320px] max-w-[320px] [@media(max-width:391px)]:h-[365px] c2xl:min-w-auto 2xl:h-[450px] bg-white flex flex-col gap-[20px] p-[20px] rounded-[40px] [@media(min-width:1440px)]:h-[440px] [@media(min-width:1440px)]:gap-[20px]', className)}>
    <div className='img-container w-[280px] h-[152px] rounded-[20px] overflow-hidden'>
      <img src={img} alt="" className='w-full h-full object-cover' />
    </div>
    <div className='flex flex-col gap-[4px]'>
      <h3 className='font-bold text-[22px] leading-[28px]'>
        {title}
      </h3>
      <p className='text-[16px] [@media(min-width:1440px)]:leading-7'>
        {children}
      </p>
    </div>
  </div>
)

export default App
