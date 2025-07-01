import React from "react";
import "./Loading.css";
const Loading = ({ isLoading }) => {
  return (
    <div className={`preloader ${isLoading ? "" : "hide"}`} id="preloader">
      <figure className="preloader--icon">
        <img className="skip-lazy" src="/svg/preloader.svg" width="50" height="50" alt="LOading" />
      </figure>
    </div>
  );
};

export default Loading;
