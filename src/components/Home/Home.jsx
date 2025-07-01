import Hero from "./Hero";
import React, { useEffect, useRef, forwardRef } from "react";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import "./css/Home.css";
import gsap from "gsap";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BelowHero } from "./Fragments/BelowHero";

import Menu from "../Menu/Menu";
import { FeaturedWork } from "./FeaturedWork";
import { FooterCTA } from "./FooterCTA";

const Home = forwardRef((props, ref) => {
  const homeRef = useRef(null);

  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);

  //throw new Error("This is a test error!");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function for the scroll
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
      <NavBar ref={ref} />
      <Menu />
      <div ref={homeRef}>
        <Hero />
        <BelowHero />
        <FeaturedWork />
        <FooterCTA></FooterCTA>
        <Footer />
      </div>
    </>
  );
});

export default Home;
