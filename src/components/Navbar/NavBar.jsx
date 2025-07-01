import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import gsap from "gsap";
const companyName = import.meta.env.VITE_COMPANY_NAME;

const NavBar = React.forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setDeviceWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    // Clean up by setting overflow back to auto when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    menuOpen ? closeMenu() : openMenu();
  };

  function openMenu() {
    let menu = document.querySelector(".menu-dropdown-list");

    let animate = gsap.timeline();

    animate.to(menu, {
      y: "110svh",
      duration: 0.6,
    });
  }
  function closeMenu() {
    let menu = document.querySelector(".menu-dropdown-list");

    let animate = gsap.timeline();

    animate.to(menu, {
      y: "0",
      duration: 0.6,
    });
  }

  return (
    <>
      <nav className="navbar">
        <div
          style={{ position: "relative", textAlign: "center", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src="/svg/vickkie.svg"
            alt="Company Logo"
            style={{ display: "block", height: "2em", width: "auto" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "block";
            }}
          />
          <h1
            className="loginHeader"
            style={{
              display: "none",
            }}
          >
            Vickkie
          </h1>
        </div>

        {deviceWidth > 867 && (
          <>
            <div className="navlinks-wrapper">
              <ul>
                <li>
                  <Link to="/work">Work</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="auth-buttons"></div>
          </>
        )}
      </nav>
      {deviceWidth < 867 && (
        <div className="menuButton">
          <svg
            className={`ham hamRotate ham4 ${menuOpen ? "active" : ""}`}
            viewBox="0 0 100 100"
            width="50"
            onClick={toggleMenu}
          >
            <path
              className="line top"
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
            />
            <path className="line middle" d="m 70,50 h -40" />
            <path
              className="line bottom"
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
            />
          </svg>
        </div>
      )}
      {menuOpen && deviceWidth < 868 && (
        <>
          <div
            className="overlay"
            style={{
              transform: menuOpen ? "scale(1)" : "scale(0)",
            }}
          ></div>
        </>
      )}
    </>
  );
});

export default NavBar;
