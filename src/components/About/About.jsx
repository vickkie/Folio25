import React, { useState, useEffect, lazy, Suspense } from "react";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";
import Numbers from "./Numbers";
import Styles from "./css/about.module.css";
import Hero from "./Hero";
import Lenis from "@studio-freight/lenis";

import Story from "./Story";

import Menu from "../Menu/Menu";
import Loading from "../Loading/Loading";

const About = () => {
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

  return (
    <>
      <NavBar />
      <Menu />
      <Hero />
      <Numbers />
      <Story />

      <Footer />
    </>
  );
};

export default About;
