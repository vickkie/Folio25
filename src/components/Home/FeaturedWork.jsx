import React, { useEffect, useRef, useState } from "react";
import featuredWork from "../../assets/json/featuredWork.json";
import "./css/featuredWork.css";
import gsap from "gsap";

export const FeaturedWork = () => {
  const wrapperRef = useRef(null);

  const [isWide, setIsWide] = useState(window.innerWidth > 697);

  useEffect(() => {
    const handleResize = () => {
      setIsWide(window.innerWidth > 697);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const projects = wrapperRef.current?.querySelectorAll(".feature-inner-wrapper");

    if (!projects) return;

    const timelines = [];

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

      const projectTexts = project.querySelectorAll(".feature-expla-info");
      projectTexts.forEach((text) => {
        tl.fromTo(text, { color: fadeWhite }, { color: fadeBlack, duration: 0.5, ease: "none" }, "start");
      });

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();

      project.addEventListener("mouseenter", onEnter);
      project.addEventListener("mouseleave", onLeave);

      // Save cleanup references
      timelines.push({ project, onEnter, onLeave });
    });

    // Cleanup listeners when layout changes (on resize)
    return () => {
      timelines.forEach(({ project, onEnter, onLeave }) => {
        project.removeEventListener("mouseenter", onEnter);
        project.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [isWide, featuredWork]);

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
                <use xlinkHref="/svg/sprite.svg#sharp-arrow"></use>
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
          FEATURED WO
          <span className="slunt">R</span>K
        </div>
        <div className="feature-svg">
          <svg role="button">
            <use xlinkHref="/svg/sprite.svg#sharp-arrow"></use>
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
