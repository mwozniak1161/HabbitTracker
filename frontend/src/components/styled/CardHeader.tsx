import React, { FC } from "react";
import { CardHeader, CardTop } from "./Card";
import { colors } from "./Colors";

interface CardHeaderStyledProps {
  text: string;
  bgColor?: "red" | "blue" | "gray" | "green";
}

const CardHeaderStyled: FC<CardHeaderStyledProps> = ({ text, bgColor = "gray" }) => {
  return (
    <>
      <CardTop bg={colors[bgColor].dark} />
      <CardHeader bg={colors[bgColor].primary}>{text}</CardHeader>
    </>
  );
};

export default CardHeaderStyled;
