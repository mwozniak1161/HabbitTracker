import Showcase from "./Showcase";
import { WelcomeStyled, WelcomeTryHeader } from "./styled/Welcome";
import { motion } from "framer-motion";

const Welcome = () => {
  return (
    <WelcomeStyled>
      <motion.h1
        initial={{ opacity: 0 , y: -10}}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: .6, ease: "linear", delay:.2 },
        }}
      >
        Habbit Tracker App
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{
          y: -5,
          opacity: 1,
          transition: { duration: 0.5, ease: "linear", delay: 0.3 },
        }}
      >
        This app allows you to track your habbits
      </motion.h3>
      <Showcase />
      <WelcomeTryHeader initial={{ opacity: 0 , y: -10}}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: .6, ease: "linear" },
        }}>Try it now!</WelcomeTryHeader>
    </WelcomeStyled>
  );
};

export default Welcome;
