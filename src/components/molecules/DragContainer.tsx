
import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import SkillContainer from "./SkillContainer";
import { useTranslations } from "../../i18n/utils";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

export default function DragConstraints({ lang }) {
  const constraintsRef = useRef<HTMLDivElement>(null)
  const t = useTranslations(lang)
  const skillsList = t("skills")["skillsList"];
  const positions = [
    "min-[1320px]:top-60 min-[1320px]:left-115",
    "min-[1320px]:bottom-15 min-[1320px]:left-20",
    "min-[1320px]:top-10 min-[1320px]:left-220",
    "min-[1320px]:bottom-8 min-[1320px]:left-220",
  ]
  useEffect(() => {
    if (constraintsRef.current) {
      const safeToAnimate = window.matchMedia('(prefers-reduced-motion: no-preference)')
        .matches;

      if (!safeToAnimate || window.innerWidth < 800) {
        return;
      }

      let browsers = document.querySelectorAll('.skill-item');

      if (!browsers) {
        return;
      }

      Draggable.create(".skill-item", {
        type: "x,y",
        bounds: constraintsRef.current,
        edgeResistance: 1,
        inertia: false,
        onDragStart: function () {
          this.target.className = this.target.className + " shadow-lg/80";
        },
        onDragEnd: function () {
          this.target.className = this.target.className.replace(" shadow-lg/80", "");
        }
      });
    }
  }
    , [constraintsRef]);
  return (
    <div
      ref={constraintsRef}
      className="w-fit h-fit md:w-[98.5vw] lg:h-screen flex flex-col md:flex-row flex-wrap items-center justify-center gap-5 relative overflow-hidden pb-50 pt-10">
      <div className="flex flex-col items-center justify-center gap-4 pt-10 pb-10 w-80 min-[1320px]:absolute min-[1320px]:top-20 min-[1320px]:left-15">
        <h1 className="title flex flex-row gap-4 align-center">
          {t("skills")["title"]}
          <motion.svg
            initial={{
              rotate: 0
            }}
            animate={{
              y: [-30, -10, -30],
              transition: { duration: 1, repeat: Infinity, ease: "anticipate" }
            }}
            whileHover={{ rotate: [20, 0, -20, 0, 20], transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } }}
            whileTap={{ scale: 0.8, transition: { duration: 0.5 } }}
            className="w-10 h-10 md:w-20 md:h-20"
            width="68" height="68" viewBox="0 0 68 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M64.77 22.6525H45.3262V25.9037H42.0962V29.1338H38.8663V32.3638H35.615V9.71125H38.8663V3.23H35.615V0H32.385V3.23H29.1338V9.71125H25.9037V16.1925H22.6737V22.6525H3.23V25.9037H0V29.1338H3.23V32.3638H6.48125V35.615H12.9625V38.845H16.1925V45.3262H19.4225V42.0962H25.9037V38.845H32.385V42.0962H29.1338V45.3262H25.9037V48.5563H22.6737V51.8075H19.4225V55.0375H16.1925V58.2887H12.9625V61.5188H9.71125V58.2887H6.48125V64.7487H9.71125V68H16.1925V64.7487H19.4225V61.5188H25.9037V58.2887H29.1338V55.0375H32.385V51.8075H35.615V42.0962H38.8663V45.3262H42.0962V48.5563H45.3262V51.8075H48.5775V55.0375H51.8075V58.2887H55.0375V64.7487H51.8075V68H58.2887V64.7487H61.5188V58.2887H58.2887V51.8075H55.0375V45.3262H51.8075V38.845H55.0375V35.615H48.5775V38.845H35.615V35.615H45.3262V32.3638H48.5775V29.1338H61.5188V32.3638H64.77V29.1338H68V25.9037H64.77V22.6525ZM29.1338 35.615H22.6737V32.3638H16.1925V29.1338H9.71125V25.9037H25.9037V29.1338H29.1338V35.615Z" fill="var(--color-text-primary)" />
            <path d="M55.0377 32.3639H61.5189V35.6152H55.0377V32.3639ZM48.5777 61.5189H51.8077V64.7489H48.5777V61.5189ZM42.0964 58.2889H48.5777V61.5189H42.0964V58.2889ZM42.0964 16.1927H45.3264V22.6527H42.0964V16.1927ZM38.8664 55.0377H42.0964V58.2889H38.8664V55.0377ZM38.8664 9.71143H42.0964V16.1927H38.8664V9.71143ZM35.6152 51.8077H38.8664V55.0377H35.6152V51.8077ZM12.9627 45.3264H16.1927V51.8077H12.9627V45.3264ZM9.71143 51.8077H12.9627V58.2889H9.71143V51.8077Z" fill="var(--color-text-primary)" />
          </motion.svg>
        </h1>
        <p className="md:max-w-60 text-lg">
          {t("skills")["description"]}
        </p>
      </div>

      {skillsList.map((skill, index) => {
        
        return <SkillContainer title={skill.name} skills={skill.items} position={positions[index]} />
      })}
    </div>
  )
}
