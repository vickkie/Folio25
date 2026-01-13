import React, { useEffect, useState } from "react";
import Styles from "./css/about.module.css";
import "./css/extras.css";

const Extra = () => {
  const [extras, setExtras] = useState([]);

  const extraStats = [
    {
      id: "github",
      data: [
        "1330 followers",
        "69 public repos",
        "142 total stars",
        "735 contributions last year",
        "142 all-time stargazers",
      ],
      url: "https://github.com/vickkie",
    },
    {
      id: "codepen",
      data: ["8.1k total views", "12 pens", "42 likes", "10 followers"],
      url: "https://codepen.io/uzitrake",
    },
    {
      id: "interests",
      data: [
        "Car enthusiast",
        "Loves dogs more than people",
        "Addicted to UI motion design",
        "Can quote Mr. Robot episodes from memory",
        "Will trade code for ramen",
      ],
      url: "none",
    },
  ];

  useEffect(() => {
    setExtras(extraStats);
  }, []);

  return (
    <>
      <div className="belowAbouthero">
        <div className="tppl">
          <div className="worksline"></div>
        </div>
        <div className="tpcn">
          <div className="belowLeftHero">
            <span className="inlineTxt">4Fun</span>
          </div>
          <div className="belowRightHero"></div>
        </div>
        <div className="tpbl"></div>
      </div>

      <div className={Styles.aboutHero}>
        <h3 className={Styles.aboutHeader}>Extras</h3>

        <div className="experienceGrid">
          {extras.map((section) => (
            <div className="playRight experienceGrid" key={section.id}>
              <div className="playRight-inner">
                <div className="playRight-inner-header">
                  <div className="playField">{section.id.toUpperCase()}</div>
                  {section.url !== "none" && (
                    <div className="playVisit">
                      <a href={section.url} className="highlight-linkkx" target="_blank" rel="noreferrer">
                        <div className="link">Visit</div>
                        <div>
                          <svg
                            class="new-tab"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden=""
                          >
                            <path
                              d="M18.3327 10.4167V15.8334C18.3327 16.4965 18.0693 17.1323 17.6005 17.6012C17.1316 18.07 16.4957 18.3334 15.8327 18.3334H4.16602C3.50297 18.3334 2.86709 18.07 2.39825 17.6012C1.92941 17.1323 1.66602 16.4965 1.66602 15.8334V4.16675C1.66602 3.50371 1.92941 2.86782 2.39825 2.39898C2.86709 1.93014 3.50297 1.66675 4.16602 1.66675H9.58268C9.69319 1.66675 9.79917 1.71065 9.87731 1.78879C9.95545 1.86693 9.99935 1.97291 9.99935 2.08341V2.91675C9.99935 3.02725 9.95545 3.13324 9.87731 3.21138C9.79917 3.28952 9.69319 3.33341 9.58268 3.33341H4.16602C3.945 3.33341 3.73304 3.42121 3.57676 3.57749C3.42048 3.73377 3.33268 3.94573 3.33268 4.16675V15.8334C3.33268 16.0544 3.42048 16.2664 3.57676 16.4227C3.73304 16.579 3.945 16.6667 4.16602 16.6667H15.8327C16.0537 16.6667 16.2657 16.579 16.4219 16.4227C16.5782 16.2664 16.666 16.0544 16.666 15.8334V10.4167C16.666 10.3062 16.7099 10.2003 16.7881 10.1221C16.8662 10.044 16.9722 10.0001 17.0827 10.0001H17.916C18.0265 10.0001 18.1325 10.044 18.2106 10.1221C18.2888 10.2003 18.3327 10.3062 18.3327 10.4167ZM17.8604 1.66675H13.8059C13.7125 1.66673 13.6211 1.69441 13.5435 1.74629C13.4658 1.79818 13.4053 1.87192 13.3695 1.95821C13.3338 2.0445 13.3244 2.13945 13.3427 2.23105C13.3609 2.32266 13.4059 2.4068 13.4719 2.47283L14.6154 3.61675C14.6936 3.69489 14.7375 3.80087 14.7375 3.91137C14.7375 4.02188 14.6936 4.12786 14.6154 4.206L9.65468 9.16675C9.57654 9.24489 9.53265 9.35087 9.53265 9.46137C9.53265 9.57188 9.57654 9.67786 9.65468 9.756L10.2438 10.3452C10.322 10.4233 10.428 10.4672 10.5385 10.4672C10.649 10.4672 10.755 10.4233 10.8331 10.3452L15.7938 5.38433C15.872 5.30619 15.978 5.2623 16.0885 5.2623C16.199 5.2623 16.305 5.30619 16.3831 5.38433L17.5265 6.52775C17.5926 6.59381 17.6768 6.63879 17.7684 6.657C17.86 6.67521 17.955 6.66582 18.0413 6.63004C18.1276 6.59426 18.2014 6.53368 18.2532 6.45598C18.3051 6.37827 18.3327 6.28692 18.3327 6.1935V2.139C18.3327 2.01375 18.2829 1.89363 18.1944 1.80507C18.1058 1.7165 17.9857 1.66675 17.8604 1.66675Z"
                              fill="#111111"
                            ></path>
                          </svg>
                        </div>
                      </a>
                    </div>
                  )}
                </div>

                <ul className={Styles.statsList}>
                  {section.data.map((item, i) => (
                    <li key={i}>◕ {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Extra;
