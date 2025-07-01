import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../../assets/json/maintainance.json";

export default function MaintainanceLoad({ size }) {
  return (
    <div>
      <Lottie
        autoplay
        loop
        src={loadingAnimation}
        options={{ animationData: loadingAnimation }}
        style={{ height: `${size}px`, width: `${size}px` }}
      />
    </div>
  );
}
