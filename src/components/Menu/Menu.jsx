import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [urlstate, seturlState] = useState("FAILED");

  useEffect(() => {
    const isBrowser =
      typeof window !== "undefined" &&
      typeof window.document !== "undefined" &&
      typeof window.document.createElement !== "undefined";
    const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

    let currentUrl = new URL(window.location.href);

    if (isBrowser && ABSOLUTE_URL_REGEX.test(currentUrl)) {
      seturlState("PASSED");
    } else {
      // console.log("failed");
      return;
    }
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    const mainlinks = document.querySelectorAll(".navlinks-wrapper li a");
    const links = document.querySelectorAll(".menu-item-wrapper a");

    // ?special case
    const home = links[0];
    const home2 = mainlinks[0];

    links.forEach((link, i) => {
      const linkpath = link.innerHTML.toLowerCase();

      const currentCutpath = `/${linkpath}`;
      if (currentCutpath == "/home") {
        home.classList.add("active-link");
      }

      if (currentCutpath == path) {
        link.classList.add("active-link");
        home.classList.remove("active-link");
      }
    });

    mainlinks.forEach((link, i) => {
      const linkpath = link.innerHTML.toLowerCase();

      const currentCutpath = `/${linkpath}`;
      if (currentCutpath == "/home") {
        home2.classList.add("active-page");
      }

      if (currentCutpath == path) {
        link.classList.add("active-page");
        home2.classList.remove("active-page");
      }
    });
  }, []);

  return (
    <div className="menu-dropdown-list" data-lenis-prevent="true">
      <div className="navbar-menu">
        <div className="navbar-menu-inner">
          <div className="navbar-menu-grid">
            <div className="menu-item-wrapper">
              <Link to="/">HOME</Link>
            </div>

            <div className="menu-item-wrapper">
              <Link to="/about">ABOUT</Link>
            </div>
            <div className="menu-item-wrapper">
              <Link to="/work">Work</Link>
            </div>
            <div className="menu-item-wrapper">
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div className="registerLogin">
            <div
              className="joinUs boxMenu"
              onClick={() => {
                navigate("/login");
              }}
            >
              <div className="menuBoxText">Enter</div>
            </div>
          </div>

          <div className="navbar-menu-grid2">
            <div className="menu-item-wrapper">
              <a href="/insights">Insights</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
