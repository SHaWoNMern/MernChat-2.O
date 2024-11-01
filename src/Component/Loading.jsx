import React from "react";
import Lottie from "lottie-react";
import animationData from "./json-animate/animatemassage.json";

const LottieAnimation = () => (
  <div className="w-20 h-20">
    <Lottie animationData={animationData} loop={true} />
  </div>
);
function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center animate-slideIn">
      <LottieAnimation />
    </div>
  );
}
export default Loading;
