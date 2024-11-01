import React from "react";
import Lottie from "lottie-react";
import useranimate from "../Component/json-animate/icons8-natural-user-interface-2.json";
import developericon from "../Component/json-animate/icons8-developer.json";
import userinterface from "../Component/json-animate/icons8-life-cycle.json";

// Define a mapping of animations
const animations = {
  user: useranimate,
  developer: developericon,
  interface: userinterface,
};

const LottieAnimation = ({
  animationKey,
  width = "100px",
  height = "100px",
  loop = true,
}) => {
  const animationData = animations[animationKey];

  return (
    <div style={{ width, height }}>
      {animationData ? (
        <Lottie animationData={animationData} loop={loop} />
      ) : (
        <p>Animation not found</p> 
      )}
    </div>
  );
};

export default LottieAnimation;
