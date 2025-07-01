import React from "react";
import "../Home/css/Hero.css";
import AvatarSection from "./Fragments/Avatar";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="blob"></div>
        <div className="leftGrid">
          <div className="leftGridInner flexhero c-title">
            <div className="c-title">
              <div className="totalTop">
                <div className="top-creative">
                  <span className="top-h2">Creative</span>
                </div>
                <div className="bottom-creative">
                  <span className="top-h2 sluntcode margin-20">Visual</span>
                  <span className="top-h2 mt-12">Developer</span>
                </div>
              </div>
            </div>

            {/* <div className="herosubPhrase flexhero">Your journey to excellence starts here.</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
