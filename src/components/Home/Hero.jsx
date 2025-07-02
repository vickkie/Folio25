import React from "react";
import "../Home/css/Hero.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SvgIcon from "./Fragments/Svg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="blob"></div>
        <div className="leftGrid">
          <div className="leftGridInner flexhero c-title">
            <div className="c-title">
              <div className="totalTop margin-20">
                <div className="top-creative">
                  <span className="top-h2">Creative</span>
                </div>
                <div className="bottom-creative">
                  <span className="top-h2 sluntcode  d-flex align-center">
                    {" "}
                    <SvgIcon />
                  </span>

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
