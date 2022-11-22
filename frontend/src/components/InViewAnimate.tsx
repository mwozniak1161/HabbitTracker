import { useAnimation, Variant, Variants } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

interface NecessaryVariants {
  [key : string] : Variant,
  hidden : Variant,
  visible:  Variant
}

const InViewAnimate: React.FC<{
  children: React.ReactNode
  animations: NecessaryVariants
}> = ({ children, animations }) => {
  const ctrls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={ctrls}
      variants={animations}
    >
      {children}
    </motion.section>
  );
};

export default InViewAnimate;
