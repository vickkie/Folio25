import React, { useEffect, useRef, useState } from "react";
import featuredWork from "../../assets/json/featuredWork.json";
import "./css/featuredWork.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export const FeaturedWork = () => {
  const wrapperRef = useRef(null);
  const [isWide, setIsWide] = useState(window.innerWidth > 697);
  const [retrigger, setRetrigger] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 697);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useGSAP(() => {
    if (!wrapperRef.current) return;

    // scroll trigger on wrapper
    gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top 90%",
        end: "bottom 10%",
        scrub: false,
        // markers: true,
        onEnter: () => {
          // console.log("entered scroll zone");
          setRetrigger(true);
        },
        onLeave: () => {
          // setRetrigger(false);
        },
      },
    });

    const projects = wrapperRef.current.querySelectorAll(".feature-inner-wrapper");
    if (!projects) return;

    projects.forEach((project) => {
      const fadeBlack = "rgb(255, 255, 255)";
      const fadeMain = "rgb(20, 207, 147)";
      const fadeWhite = "rgb(0, 0, 0)";

      const tl = gsap.timeline({ paused: true });

      tl.addLabel("start", 0).fromTo(
        project,
        { backgroundColor: fadeBlack },
        { backgroundColor: fadeMain, duration: 0.5, ease: "none" },
        "start"
      );

      const texts = project.querySelectorAll(".feature-expla-info");
      texts.forEach((text) => {
        tl.fromTo(text, { color: fadeWhite }, { color: fadeBlack, duration: 0.5, ease: "none" }, "start");
      });

      const enter = () => tl.play();
      const leave = () => tl.reverse();

      project.addEventListener("mouseenter", enter);
      project.addEventListener("mouseleave", leave);

      // Cleanup
      return () => {
        project.removeEventListener("mouseenter", enter);
        project.removeEventListener("mouseleave", leave);
      };
    });
  }, [isWide, retrigger]);

  const FeatureText = ({ item }) => (
    <div className="feature-expla">
      <div className="feature-outer-wrapper">
        <a href={item.link} className="feature-inner-wrapper">
          <div className="feature-expla-info">
            <div className="feature-info-head">
              <div>{item.title}</div>
            </div>
            <div className="feature-case-no">
              <span>{item.caseNumber}</span>
            </div>
            <div className="feature-services">{item.services}</div>
          </div>
          <div className="feature-info-bottom">
            <div className="feature-year">{item.year}</div>
            <div className="feature-view">
              <svg role="button">
                <use xlinkHref="/svg/sprite.svg#sharp-arrow" />
              </svg>
            </div>
          </div>
        </a>
      </div>
    </div>
  );

  const FeatureImage = ({ item, index }) => (
    <div className="feature-image">
      <img src={item.image} alt={`Image ${index + 1}`} className="lozad fit-image" />
    </div>
  );

  return (
    <section className="feature-work white-section" ref={wrapperRef}>
      <div className="feature-header">
        <div className="feature-head">
          FEATURED WO<span className="slunt">R</span>K
        </div>
        <div className="feature-svg">
          <svg role="button">
            <use xlinkHref="/svg/sprite.svg#sharp-arrow" />
          </svg>
        </div>
      </div>

      <div className="feature-wrapper">
        {Array.isArray(featuredWork) &&
          featuredWork
            .filter((item) => item.showcase)
            .map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div className="feature-row" key={index}>
                  {isWide ? (
                    isEven ? (
                      <>
                        <FeatureText item={item} />
                        <FeatureImage item={item} index={index} />
                      </>
                    ) : (
                      <>
                        <FeatureImage item={item} index={index} />
                        <FeatureText item={item} />
                      </>
                    )
                  ) : (
                    <>
                      <FeatureText item={item} />
                      <FeatureImage item={item} index={index} />
                    </>
                  )}
                </div>
              );
            })}
      </div>

      <div>
        <a href="work" className="service-contact transit">
          <button className="contact-service">
            <span data-text="Projects ➺">More Work</span>
          </button>
        </a>
      </div>
    </section>
  );
};
