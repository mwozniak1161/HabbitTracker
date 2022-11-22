import styled from "styled-components";
import { colors } from "./Colors";

export const AddHabbitForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 12px;
`;

export const AddFormField = styled.div`
  margin: 12px;
  text-align: left;
  width: 100%;
  font-size: 20px;
  font-weight: 400;
  @media (min-width: 768px) {
    width: calc(50% - 32px);
  }
`;

export const Input = styled.input`
  font-size: 16px;
  line-height: 28px;
  padding: 4px 8px;
  width: 100%;
  min-height: 40px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(88 88 88 / 0.5);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(1, 1, 1, 0.4) 0px 0px 3px 1px;
`;

type SubmitProps = "start" | "habbit"

export const Submit = styled.button.attrs(
 (props: { variant: SubmitProps}) => props
)`
display:flex;
justify-content: center;
  border: 0px;
  outline: 0px;
  border-radius: 12px;
  padding: 12px;
  font-size: 20px;
  width: 100%;
  max-width: ${(props) => (props.variant==='start' ? "600px" : "260px")};
  margin: 24px auto;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  background-color: ${colors.green.primary};
  transition: all 0.2s;
  box-shadow: 0px 0px 3px .2px #000000;
  &:hover{
    background-color: rgb(36, 105, 41);
  }
  &:active{
    box-shadow:0px 0px 0px 0px #000;
  }
`;