import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { colors } from "./Colors";
import StartPageBg from "../../assets/img/startpage.svg";
import StartLayout from "../StartLayout";

interface PageProps {
  children?: React.ReactNode;
}

export const Page = ({ children }: PageProps) => {
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])
  return (
    <PageStyled
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          ease: [0.9, 1, 0.5, 1],
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "linear",
          delay: 0.1,
        },
      }}
    >
      {children}
    </PageStyled>
  );
};

export const StartPage = () => {
  return (
    <StartPageStyled
      exit={{
        opacity: 0,
        transition: {
          duration: 0.6,
          ease: [1, 0.04, 0.83, 0.67],
          delay: 0.3,
        },
      }}
    >
      <StartLayout />
    </StartPageStyled>
  );
};

const PageStyled = styled(motion.div)`
  flex: 14;
  width: 84vw;
  position: "relative";
  margin-bottom:100px;
  @media (max-width: 768px) {
    margin-bottom: 10vh;
  }
`;

const StartPageBgAnimation = keyframes`
  0% {background-position: 55% 0%};
  25% {background-position: 65% 10%};
  50% {background-position: 55% 20%}
  75% { background-position: 45% 10%}
  100% {background-position: 55% 0%};
`;

export const StartPageStyled = styled(motion.div)`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: white;
  background-color: ${colors.gray.dark};
  background-image: url(${StartPageBg});
  background-size: 130vw 140vh;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  animation: ${StartPageBgAnimation} 30s linear infinite;
  overflow-y: hidden;
`;
