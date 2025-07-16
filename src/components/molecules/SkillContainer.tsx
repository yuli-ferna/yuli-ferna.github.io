import SkillElem from "../atoms/SkillElem";
import { motion } from "framer-motion";

interface SkillContainerProps {
  title: string;
  skills: string[];
  position?: string;
}

const SkillContainer = ({ title, skills, position }: SkillContainerProps) => {

  return (
    <motion.div
      translate="no"
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.8
      }}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 2, type: "spring", bounce: 0.2 }}
      className={`skill-item min-[1320px]:absolute ${position} w-[365px] h-fit min-h-[335px] rounded-[20px] dark:bg-[#7d5260] bg-pink-400/80 backdrop-blur-2xl border-[3px] border-primary relative flex flex-col pl-4 pr-4 pt-14 pb-6 gap-4 cursor-grab`}>
      <svg
        width="362"
        height="3"
        viewBox="0 0 362 3"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-7.5 stroke-primary"
        preserveAspectRatio="none"
      >
        <path d="M0 1.5H362" stroke-width="3"></path>
      </svg>
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-5 top-2 stroke-primary"
        preserveAspectRatio="none"
      >
        <circle cx="8" cy="7.5" r="6" fill="none" stroke-width="3"></circle>
      </svg>
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-10 top-2 stroke-primary"
        preserveAspectRatio="none"
      >
        <circle cx="8" cy="7.5" r="6" fill="none" stroke-width="3"></circle>
      </svg>
      <svg
        width="16"
        height="15"
        viewBox="0 0 16 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-15 top-2 stroke-primary"
        preserveAspectRatio="none"
      >
        <circle cx="8" cy="7.5" r="6" fill="none" stroke-width="3"></circle>
      </svg>
      <p className="text-3xl text-left text-[#ffd8e4]">{title}</p>
      <div
        className="flex flex-wrap justify-start items-start gap-2 gap-y-4 flex-1"
      >
        {skills.map((skill, index) => (
          <SkillElem key={`${skill}-${index}`} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export default SkillContainer;