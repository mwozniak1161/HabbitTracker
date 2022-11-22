import styled from "styled-components";
import {
  MdAssignmentTurnedIn,
  MdTextSnippet,
  MdCalendarToday,
} from "react-icons/md";
import { motion } from "framer-motion";

const FeaturesStyled = styled.div`
  height: 60vh;
  margin: 16vh 0;
`;

const FeaturesList = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 6vh;
`;

const FeaturesItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 16ch;
  padding: 20px;
`;

export const Features = () => {
  return (
    <FeaturesStyled>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.6, ease: "linear"},
        }}
      >
        Core functionalities
      </motion.h1>
      <FeaturesList initial={{ opacity: 0 , y: 10}}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: .6, ease: "linear", delay:.2 },
        }}>
        <FeaturesItem>
          <MdAssignmentTurnedIn size="32px" />
          Daily habbits tracking
        </FeaturesItem>
        <FeaturesItem>
          <MdTextSnippet size="32px" />
          Managing habbits
        </FeaturesItem>
        <FeaturesItem>
          <MdCalendarToday size="32px" />
          Checking progress
        </FeaturesItem>
      </FeaturesList>
    </FeaturesStyled>
  );
};
