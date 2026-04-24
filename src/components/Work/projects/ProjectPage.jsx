import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectContent from "./ProjectContent";
import pagesData from "../../../assets/json/allWorks.json";
import ErrorBoundary from "../../ErrorBoundary";
import NavBar from "../../Navbar/NavBar";
import Footer from "../../Footer/Footer";
import Styles from "../css/about.module.css";
import Hero from "../Hero";
import Lenis from "@studio-freight/lenis";

import Menu from "../../Menu/Menu";
import "../css/projects.css";

const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [currentPageData, setCurrentPageData] = useState(null);
  const [dataState, setDataState] = useState("LOADING");
  const [nextSlug, setNextSlug] = useState(null);
  const [nextPageData, setNextPageData] = useState(null);
  useEffect(() => {
    const page = pagesData.find((p) => p.id === slug);

    if (page) {
      setCurrentPageData(page);
      setDataState("SUCCESS");

      // figure out next page
      const currentIndex = pagesData.findIndex((p) => p.id === slug);
      const nextIndex = (currentIndex + 1) % pagesData.length;
      const nextPage = pagesData[nextIndex];
      const nextPageData = pagesData[nextIndex];

      setNextSlug(nextPage.id);
      setNextPageData(nextPageData?.previewImage);
    } else {
      setDataState("ERROR");
    }
  }, [slug]);

  const errorHere = () => {
    throw new Error("Simulated error for testing");
  };

  return (
    <ErrorBoundary>
      <>
        <NavBar />
        <Menu />
        {dataState === "SUCCESS" && currentPageData && (
          <ProjectContent pageData={currentPageData} nextPage={nextSlug} nextPageData={nextPageData} />
        )}

        {dataState === "ERROR" && (
          <div>
            {/* Show error without throwing function-in-JSX */}
            <div>Error occurred: Project not found</div>
          </div>
        )}
        <Footer />
      </>
    </ErrorBoundary>
  );
};

export default ProjectPage;
