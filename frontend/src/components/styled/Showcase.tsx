import styled from "styled-components";
import { motion } from "framer-motion";

export const ShowcaseGifStyled = styled.img.attrs(
  (props: { zoomed: boolean }) => props
)`
  cursor: ${(props) => (props.zoomed ? "zoom-out" : "zoom-in")};
  position: ${(props) => (props.zoomed ? "fixed" : "absolute")};
  height: ${(props) => (props.zoomed ? "auto" : "169px")};
  max-height: 100vh;
  object-fit: contain;
  max-width: 100vw;
  width: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  box-shadow: 0px 0px 6px 3px #888;
    @media (min-width: 768px) {
  height: ${(props) => (props.zoomed ? "auto" : "393px")};
  }
  &:hover{
    box-shadow: 0px 0px 6px 3px #333;
  }
  transition: 0.2s ease-in-out all;
  z-index: 99;
`;

export const ShowcaseWrapper = styled(motion.span).attrs(
  (props: { zoomed: boolean }) => props
)`
  position: relative;
  display: flex;
  height: 169px;
  width: 300px;
  transition: 0.2s ease-in-out all;
  margin: 20px auto;
  @media (min-width: 768px) {
      height: 393px;
      width: 700px;
  }
`;

export const ZoomIconWrapper = styled.span.attrs(
  (props: { zoomed: boolean }) => props
)`
  display: flex;
    margin:auto;
`;