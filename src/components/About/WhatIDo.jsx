import React, { useState, useEffect } from "react";
import Styles from "./css/about.module.css";
import "./css/expertise.css";
import aboutData from "../../assets/json/about.json";

const WhatIDo = () => {
  const [expertise, setExpertise] = useState(null);

  useEffect(() => {
    // Assuming `aboutData` is an array with expertise nested
    const found = aboutData.find((item) => item.expertise);
    if (found && found.expertise) {
      setExpertise(found.expertise);
    }
  }, []);

  if (!expertise) return <div>Loading...</div>;

  const { title, design = [], development = [], misc = [], tools = {}, frameworks = {} } = expertise;
  const softwareAndTech = tools["Software and Tech"] || {};

  return (
    <>
      <div className="belowAbouthero">
        <div className="tppl">
          <div className="worksline"></div>
          <div className=""></div>
          <div className=""></div>
        </div>
        <div className="tpcn">
          <div className="belowLeftHero">
            <span className="inlineTxt">Expertise</span>
          </div>
          <div className="belowLeftCenter">
            <span className="inlineTxt"></span>
          </div>
          <div className="belowRightHero">
            <div className="arrangeTabs">
              <span className="inlineTxt">(◕‿◕)</span>
            </div>
          </div>
        </div>
        <div className="tpbl"></div>
      </div>

      <div className={Styles.aboutHero}>
        <h3 className={Styles.aboutHeader}>{title}</h3>
        <div className="expertiseRight">
          {/* Design Section */}
          {design.length > 0 && (
            <div className="section design">
              <div className="secHead">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 40 40">
                  <path
                    fill="url(#a)"
                    d="M20 3.75c-4.58-5-12-5-16.57 0a13.68 13.68 0 0 0 0 18.13L20 40l16.57-18.12a13.7 13.7 0 0 0 0-18.13c-4.58-5-12-5-16.57 0"
                  ></path>
                  <defs>
                    <linearGradient id="a" x1="20" x2="20" y1="0" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FC9696"></stop>
                      <stop offset="1" stopColor="#F28EB7"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <h3> Design</h3>
              </div>
              <ul>
                {design.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Development Section */}
          {development.length > 0 && (
            <div className="section development">
              <div className="secHead">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 40 40">
                  <path
                    fill="url(#c)"
                    d="M36.56 16.87 20 0 3.43 16.87a12.08 12.08 0 0 0 0 16.87 11.56 11.56 0 0 0 11.39 3.06L13.6 40h12.8l-1.22-3.2c3.93 1.09 8.3.08 11.39-3.06a12.08 12.08 0 0 0 0-16.87z"
                  ></path>
                  <defs>
                    <linearGradient id="c" x1="20" x2="20" y1="0" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7E61BB"></stop>
                      <stop offset="1" stopColor="#6796D4"></stop>
                    </linearGradient>
                  </defs>
                </svg>

                <h3>Development</h3>
              </div>
              <ul>
                {development.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Misc Section */}
          {misc.length > 0 && (
            <div className="section misc">
              <div className="secHead">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 40 40">
                  <path fill="url(#d)" d="M20 0 0 20l20 20 20-20z"></path>
                  <defs>
                    <linearGradient id="d" x1="20" x2="20" y1="0" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FC9696"></stop>
                      <stop offset="1" stopColor="#F7B579"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <h3>Misc</h3>
              </div>
              <ul>
                {misc.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Misc Section */}
          {frameworks.length > 0 && (
            <div className="section frameworks">
              <div className="secHead">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="icon" viewBox="0 0 40 40">
                  <path
                    fill="url(#b)"
                    d="M31.12 13.94c.15-.74.22-1.5.22-2.29C31.34 5.22 26.24 0 19.95 0A11.54 11.54 0 0 0 8.51 11.65c0 .8.08 1.57.23 2.32A11.61 11.61 0 0 0 0 25.3c0 6.44 5.11 11.66 11.41 11.66 1.23 0 2.42-.2 3.53-.57L13.56 40h12.62l-1.42-3.72c1.2.44 2.49.68 3.83.68 6.3 0 11.41-5.22 11.41-11.66 0-5.54-3.8-10.18-8.88-11.36"
                  ></path>
                  <defs>
                    <linearGradient id="b" x1="20" x2="20" y1="0" y2="40" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7AC0AD"></stop>
                      <stop offset="1" stopColor="#C3DB92"></stop>
                    </linearGradient>
                  </defs>
                </svg>
                <h3>Most used</h3>
              </div>
              <ul>
                {frameworks.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools Section */}
          {Object.keys(softwareAndTech).length > 0 && (
            <div className="section tools">
              <h3>✺ Software & Tech</h3>
              <ul>
                {Object.entries(softwareAndTech).map(([category, items], i) => (
                  <li key={i}>
                    <strong>{category}</strong> – {items.join(", ")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WhatIDo;
