import React from "react";
// import styles from "./css/about.module.css";
import "./css/aboutHero.css";

export default function Hero() {
  return (
    <>
      <div className="aboutHero">
        <div className="aboutheroinner">
          <div className="aboutRight">
            <span className="worksHero">WORKS</span>
          </div>
          <div className="aboutLeft">
            <div className="aboutLeftExpla"></div>
          </div>
        </div>
      </div>
      <div className="belowAbouthero">
        <div className="tppl">
          <div className="worksline"></div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="tpcn">
          <div className="belowLeftHero">
            <span className="inlineTxt">@2018-25</span>
          </div>
          <div className="belowLeftCenter">
            <span className="inlineTxt">[works]</span>
          </div>
          <div className="belowRightHero">
            <div className="arrangeTabs">
              <span className="inlineTxt">Final</span>
            </div>
          </div>
        </div>
        <div className="tpbl"></div>
      </div>
    </>
  );
}
