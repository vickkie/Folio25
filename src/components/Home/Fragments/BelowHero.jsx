import React, { useState, useEffect } from "react";
import "../css/BelowHero.css";
import data from "../../../assets/json/uzidata.json";

export const BelowHero = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {data && (
        <div className="belowHeroWrapper">
          <section>
            <div className="intro-port">
              <div className="intro-port-menu">
                <div className="top-border"></div>
                <div className="bottom-border"></div>
                <div className="guide-line" line-triggery=".frame__line__low"></div>

                <div className="name-gmt">
                  <div className="dim-header">Location</div>
                  <div>
                    GMT+3(<span className="time">{time}</span>, KE)
                  </div>
                </div>

                <div className="work-status">
                  <div className="dim-header">Status</div>
                  <div className="status">
                    {data.status}
                    <svg
                      height="15px"
                      width="15px"
                      className="-blink"
                      viewBox="0 0 31.955 31.955"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          fill="#26c406"
                          d="M27.25,4.655C20.996-1.571,10.88-1.546,4.656,4.706C-1.571,10.96-1.548,21.076,4.705,27.3c6.256,6.226,16.374,6.203,22.597-0.051C33.526,20.995,33.505,10.878,27.25,4.655z"
                        ></path>
                        <path
                          fill="#26c406"
                          d="M13.288,23.896l-1.768,5.207c2.567,0.829,5.331,0.886,7.926,0.17l-0.665-5.416C17.01,24.487,15.067,24.5,13.288,23.896zM8.12,13.122l-5.645-0.859c-0.741,2.666-0.666,5.514,0.225,8.143l5.491-1.375C7.452,17.138,7.426,15.029,8.12,13.122zM28.763,11.333l-4.965,1.675c0.798,2.106,0.716,4.468-0.247,6.522l5.351,0.672C29.827,17.319,29.78,14.193,28.763,11.333zM11.394,2.883l1.018,5.528c2.027-0.954,4.356-1.05,6.442-0.288l1.583-5.137C17.523,1.94,14.328,1.906,11.394,2.883z"
                        ></path>
                        <circle fill="#26c406" cx="15.979" cy="15.977" r="6.117"></circle>
                      </g>
                    </svg>
                  </div>
                  <br />
                  {data.locationDetail}
                </div>

                <div className="lets-connect">
                  <div className="dim-header">Socials</div>
                  <div className="intro-insta">{data.socials?.instagram}</div>
                  <div className="intro-whats">{data.socials?.dribbble}</div>
                </div>

                <div className="signature s1">
                  <span>{data.signature}</span>
                </div>
              </div>

              <div className="designer-desc">
                <div className="dev-forlio">
                  <svg width="17" height="17" className="starsvg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <use xlinkHref="#star-pair" />
                  </svg>
                  <span>
                    <span className="italic"> &nbsp;(dev)&nbsp;</span>
                    <span>{data.forlio}</span>
                  </span>
                  <div className="spacing-arrow">
                    <div className="spacing-arrow-inner"></div>
                  </div>
                  <span>{data.year}</span>
                </div>

                <div className="dev-header">
                  {data.introGreeting}
                  <br />A <span className="tomato">{data.role}</span> <br />
                  Based in {data.baseLocation}
                </div>

                <div className="head-desc">
                  {data.descriptions.map((desc, index) => (
                    <div key={index} className={`desc-${index + 1}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0V12" stroke="var(--bright-thistle)" strokeWidth="2" strokeMiterlimit="10" />
                        <path d="M12 6H0" stroke="var(--bright-thistle)" strokeWidth="2" strokeMiterlimit="10" />
                      </svg>
                      <span>{desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="work-areas">
                <div className="design-areas">
                  <span>MY WORK AREAS</span>
                  <span className="works-svg">
                    <svg viewBox="0 0 419 227" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M264.027 227L209.5 171.94L154.973 227H0V196.089H152.103L21.0458 118.813L36.3516 91.766L167.409 169.043L91.8357 35.7404L118.621 20.2851L194.194 153.587V0H224.806V153.587L301.336 20.2851L327.164 35.7404L251.591 169.043L382.648 91.766L397.954 118.813L266.897 196.089H419V227H264.027Z"
                        fill="black"
                      ></path>
                    </svg>
                  </span>
                </div>

                <div className="work-areas-spans">
                  <span data-cursor="-medium -opaque" className="stick-fill" data-cursor-stick>
                    FRONTEND DEVELOPMENT
                  </span>
                  <span data-cursor="-medium -exclusion" data-magnetic>
                    UX/UI design
                  </span>
                  <span data-cursor="-medium -opaque" className="stick-fill" data-cursor-stick>
                    Branding
                  </span>
                  <span data-cursor="-medium -exclusion" className="magnetic">
                    Backend
                  </span>
                  <span data-cursor="-medium -opaque" className="stick-fill" data-cursor-stick>
                    WEB MAINTAINANCE
                  </span>
                  <span data-cursor="-medium -exclusion" data-magnetic>
                    Mobile apps
                  </span>
                  <span data-cursor="-medium -opaque" className="stick-fill" data-cursor-stick>
                    E-commerce web
                  </span>
                  <span data-cursor="-medium -exclusion" data-magnetic>
                    WEB REBRANDING
                  </span>
                  <span data-cursor="-medium -opaque" className="stick-fill" data-cursor-stick>
                    IT consultancy
                  </span>
                </div>
              </div>

              {/* <div className="proof-experience">
                <div className="top-border"></div>
                <div className="years-xp">
                  <span className="xp-head">4+</span>
                  <span className="xp-footer">YEARS X-PERIENCE</span>
                </div>
                <div className="projects-xp">
                  <span className="xp-head">10+</span>
                  <span className="xp-footer">PROFFESIONAL PROJECTS</span>
                </div>
                <div className="more-xp">
                  <span className="xp-head">3</span>
                  <span className="xp-footer">DESIGN AWARDS</span>
                </div>
              </div> */}

              <div className="designer-image">
                <svg height="100%" viewBox="0 0 464 463" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <clipPath id="e-letter">
                    <path d="M426.794 276.327L349.999 353.122C347.867 355.254 344.424 355.254 342.306 353.122C340.174 350.991 340.174 347.547 342.306 345.429L419.088 268.647C439.598 248.137 439.598 214.877 419.088 194.366L342.292 117.571C340.16 115.439 340.16 111.996 342.292 109.878V109.878C344.42 107.749 347.871 107.749 349.999 109.878L426.781 186.659C428.954 188.832 431.277 190.772 433.695 192.494C446.39 201.445 463.908 192.153 463.908 176.616V51.7481C463.908 23.1753 440.746 0 412.16 0H52.6832C24.0967 0 0.935059 23.1616 0.935059 51.7481V411.252C0.935059 439.825 24.0967 463 52.6832 463H412.187C440.76 463 463.935 439.838 463.935 411.252V286.411C463.935 270.861 446.39 261.555 433.695 270.519C431.277 272.228 428.967 274.168 426.808 276.327H426.794Z" />
                  </clipPath>
                  <image
                    clipPath="url(#e-letter)"
                    xlinkHref="images/my_memoji.png"
                    alt="Image"
                    width="100%"
                    className="e-letter"
                  />
                </svg>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
