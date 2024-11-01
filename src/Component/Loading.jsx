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
    <div>
      <div className="fixed inset-0 flex items-center justify-center animate-bounce">
        <LottieAnimation />
        <h1 className="text-3xl font-bold block">
          Hang tight—your chat is loading!
        </h1>
      </div>
    </div>
  );
}
export default Loading;
