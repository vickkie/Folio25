import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "../Navbar/NavBar";
import Footer from "../Footer/Footer";
import BlogListing from "./BlogListing";
import Menu from "../Menu/Menu";
import Prefooter from "../About/Prefooter";

export default function Blog() {
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
      <BlogListing />
      <Prefooter background="var(--lightteal)" color="var(--black)" />
      <Footer />
    </div>
  );
}
