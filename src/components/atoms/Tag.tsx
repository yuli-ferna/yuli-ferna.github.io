import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const Tag = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  // move to a hook
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 800);
  }, [window.innerWidth])
  
  return (
    <motion.div
      initial={{
        boxShadow: "none"
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "2px 3px var(--color-bg-default)"
      }}
      whileTap={{
        scale: isMobile ? 1.2 : 0.9,
        boxShadow: isMobile ? "2px 3px var(--color-bg-default)" : "none" 
      }}
      className={`flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2.5 px-2.5 py-1 rounded-[50px] bg-container-primary border border-primary text-primary hover:bg-container-paper/10 hover:backdrop-blur-2xl dark:hover:bg-primary/50 hover:text-container-paper hover:border-container-paper  bg-mix-blend-plus-darker cursor-pointer ${className}`}
    >
      <p
        className={`flex-grow-0 flex-shrink-0 text-[13px] text-left`}
      >
        {text}
      </p>
    </motion.div>
  );
}
export default Tag;