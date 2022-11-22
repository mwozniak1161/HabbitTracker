import Footer from "./Footer";
import Welcome from "./Welcome";
import { StartLoginForm } from "./StartSignIn";
import { StartRegisterForm } from "./StartSignUp";
import { Features } from "./styled/Features";
import { StartFormsWrapper } from "./styled/StartForm";
import StartTryAsGuest from "./StartTryAsGuest";
import InViewAnimate from "./InViewAnimate";

const StartLayout = () => {
  const fadeInAnimaiton = {
    hidden: {
      opacity: 0,
      y: `10`,
    },
    visible: {
      opacity: 1,
      y: `0`,
      transition: {
        duration: 2,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  return (
    <>
      <Welcome />
      <InViewAnimate animations={fadeInAnimaiton}>
        <StartFormsWrapper>
          <StartLoginForm />
          <StartRegisterForm />
          <h3 style={{ width: "100%", margin: "6vh 0" }}>
            <b>or</b>
          </h3>
          <StartTryAsGuest />
        </StartFormsWrapper>
      </InViewAnimate>
      <InViewAnimate animations={fadeInAnimaiton}>
        <Features />
      </InViewAnimate>
      <Footer />
    </>
  );
};

export default StartLayout;
