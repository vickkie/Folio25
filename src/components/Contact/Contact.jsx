// src/components/Services.jsx

import React, { useEffect } from "react";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";
import Menu from "../Menu/Menu";
import Lenis from "@studio-freight/lenis";
import "./contact.css";
import ContactPage from "./ContactPage";
import Hero from "./Hero";
import { FooterCTA } from "../Home/FooterCTA";

// const OtherWaysToContact = lazy(() => import("./OtherWaysToContact"));

const Contact = () => {
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
    <div>
      <NavBar />
      <Menu />

      <Hero />
      <div className="contactSubbody">
        <ContactPage />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
