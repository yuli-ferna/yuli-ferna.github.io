
import { motion } from "framer-motion"

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.5
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    }
  },
}
const EducationAndCertificate = () => {
  return (
    <motion.svg
      initial={{
        rotate: 0
      }}
      animate={{
        y: [-30, -10, -30],
        transition: { duration: 1, repeat: Infinity, ease: "anticipate" }
      }}
      whileHover={{ rotate: [20, 0, -20, 0, 20], transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" } }}
      whileTap={{ scale: 0.9 }}
      className="draw-me cursor-pointer"
      width="103"
      height="103"
      viewBox="0 0 103 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M98.1075 76.0268H93.1828V80.9193H103V61.3172H98.1075V76.0268ZM98.1075 46.5753H103V51.5H98.1075V46.5753ZM0 2.44629V80.9193H49.0537V76.0268H4.8925V7.33878H98.1075V36.7903H103V2.44629H0ZM93.1828 51.5H98.1075V56.3925H93.1828V51.5Z"
        className="fill-primary draw-me"></path>
      <path
        d="M93.1828 41.683H98.1075V46.5755H93.1828V41.683ZM88.2903 66.2099H78.4731V71.1024H73.5806V76.0271H68.6559V71.1024H63.7634V66.2099H53.9462V56.3927H49.0537V71.1024H53.9462V100.554H63.7634V95.6292H68.6559V90.7368H73.5806V95.6292H78.4731V100.554H88.2903V71.1024H93.1828V56.3927H88.2903V66.2099ZM93.1828 22.0809V12.2637H78.4731V17.1562H88.2903V22.0809H93.1828ZM83.3656 41.683H88.2903V56.3927H83.3656V41.683Z"
        className="fill-primary draw-me"></path>
      <path
        d="M78.4731 56.3923H83.3656V61.317H78.4731V56.3923ZM78.4731 36.7901H83.3656V41.6826H78.4731V36.7901ZM88.2903 31.8654V41.6826H93.1828V26.9729H78.4731V31.8654H88.2903ZM63.7635 61.317H78.4731V66.2095H63.7635V61.317ZM73.5806 22.0804H78.4731V26.9729H73.5806V22.0804ZM68.656 17.1558H73.5806V22.0804H68.656V17.1558ZM63.7635 31.8654H78.4731V36.7901H63.7635V31.8654ZM63.7635 22.0804H68.656V26.9729H63.7635V22.0804ZM58.871 56.3923H63.7635V61.317H58.871V56.3923ZM58.871 36.7901H63.7635V41.6826H58.871V36.7901ZM53.9463 41.6826H58.871V56.3923H53.9463V41.6826Z"
        className="fill-primary draw-me"></path>
      <path
        d="M53.946 31.8656H63.7632V26.9731H49.0535V41.6828H53.946V31.8656ZM44.1288 51.5H49.0535V56.3925H44.1288V51.5ZM44.1288 41.6828H49.0535V46.5753H44.1288V41.6828ZM39.2363 46.5753H44.1288V51.5H39.2363V46.5753Z"
        className="fill-primary draw-me"></path>
      <path
        d="M63.7636 17.1562V12.2637H9.81738V71.1024H44.1293V66.2099H14.7099V17.1562H63.7636Z"
        className="fill-primary draw-me"></path>
      <path
        d="M19.6348 41.6827H34.3445V46.5752H19.6348V41.6827ZM19.6348 22.0806H34.3445V36.7903H19.6348V22.0806ZM19.6348 51.4999H34.3445V56.3924H19.6348V51.4999Z"
        className="fill-primary draw-me"></path>
    </motion.svg>)
};

export default EducationAndCertificate;