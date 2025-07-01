import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "../Navbar/NavBar";
import Menu from "../Menu/Menu";
import "./css/extras.css";
import { Link } from "react-router-dom";

export default function NotFound() {
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

  {
    return (
      <div>
        <NavBar />
        <Menu />
        <section className="error-content">
          <p className="error-text">404</p>
          <p className="midFont">OOPS, PAGE NOT FOUND</p>

          <div className="backHome">
            <Link to="/">Back to homepage</Link>
          </div>
        </section>
      </div>
    );
  }
}
