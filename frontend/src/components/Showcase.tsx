import React, { useState } from "react";
import ShowcaseGif from "../assets/img/showcase.gif";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import { ShowcaseGifStyled, ShowcaseWrapper, ZoomIconWrapper } from "./styled/Showcase";

const Showcase = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const ZoomIconStyles = {
    height: "48px",
    width: "48px",
    zIndex: 100,
    color: "#111",
    transform: "translate(-50%, -50%)",
    top:"50%",
    left:"50%",
    position: isZoomed ? ("fixed" as const) : ("absolute" as const),
    cursor: isZoomed ? "zoom-out" : "zoom-in",
    opacity:0.5,
  };

  return (
    <ShowcaseWrapper initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1,           transition: { delay: 0.3 },
}}>
      <ShowcaseGifStyled
        src={ShowcaseGif}
        alt="Click to zoom in/out"
        onClick={() => {
          setIsZoomed(!isZoomed);
        }}
        zoomed={isZoomed}
      />
      <ZoomIconWrapper onClick={() => {
          setIsZoomed(!isZoomed);
        }}>
        {isZoomed ? (
          <MdZoomOut style={ZoomIconStyles} />
        ) : (
          <MdZoomIn style={ZoomIconStyles} />
        )}
      </ZoomIconWrapper>
    </ShowcaseWrapper>
  );
};

export default Showcase;
