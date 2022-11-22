import React, { FC, ReactNode } from "react";
import styled from "styled-components";

const Habbit = styled.li`
  padding: 12px;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #666;
  width: 100%;
`;

interface HabbitListProps {
  ref: React.RefObject<HTMLUListElement>;
}

export const HabbitList = styled.ul<HabbitListProps>`
  display: flex;
  flex-direction: column;
`;

export const HabbitInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px;
  width: 95%;
  @media (max-width: 768px) {
    width: 80%;
  }
`;


export const HabbitOptionsList = styled.ul`
  box-shadow: 0px 0px 4px 0.5px #333;
  background: white;
  list-style-type: none;
  position: relative;
  border-radius: 12px;
  top: 4px;
`;

export const HabbitOption = styled.li`
  width: 200px;
  padding: 4px;
  border-top: 1px solid #3333;
`;

export const HabbitOptionsArrow = styled.div`
  box-shadow: 2px 2px 2px 0.1px #333;
  background-color: white;
  height: 8px;
  width: 8px;
  position: absolute;
  transform: rotate(45deg);
  right: 16px;
`;



interface HabbitOptionsProps {
  children: ReactNode;
  className?: string;
}

interface NoHabbitsProps {
  className?: string;
}

export const HabbitOptions = React.forwardRef(
  (
    { children, className }: HabbitOptionsProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div className={className} ref={ref}>
        <HabbitOptionsList>{children}</HabbitOptionsList>
        <HabbitOptionsArrow />
      </div>
    );
  }
);

export const HabbitOptionsStyled = styled(HabbitOptions)`
  z-index: 2;
  position: absolute;
  bottom: -30px;
  left: -12px;
  transform: translate(-100%, -60px) translateX(48px);
`;

export const NoHabbits: FC<NoHabbitsProps> = ({ className }) => {
  return <h3 className={className}>No habbits here</h3>;
};

export const NoHabbitsStyled = styled(NoHabbits)`
  padding: 20px;
  font-weight: 600;
`;

export default Habbit;
