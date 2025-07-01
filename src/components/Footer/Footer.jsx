import React, { useState, useEffect } from "react";
import "./Footer.css";
const companyName = "vickkie";
import data from "../../assets/json/uzidata.json";

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [email, setEmail] = useState("");
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [formStatus, setFormStatus] = useState(""); // "success" or "error"

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubscribeClick = (e) => {
    e.preventDefault();

    if (!isEmailVisible) {
      setIsEmailVisible(true);
    } else {
      if (email) {
        //Api call here
        const isSuccess = true; // Change based on your logic

        if (isSuccess) {
          setFormStatus("success");
        } else {
          setFormStatus("error");
        }
      }
    }
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const renderSectionContent = (section, items) => (
    <div className={`LinksBox ${section}`}>
      <div className="linkHeader" onClick={() => isSmallScreen && toggleSection(section)}>
        {section.charAt(0).toUpperCase() + section.slice(1)}
        <div className="toggledownsvg">
          <svg viewBox="0 0 24 24" fill="none" width="25px" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
      </div>
      <ul className={`linkList ${isSmallScreen && expandedSection !== section ? "collapsed" : "open"}`}>
        {items.map((item, index) => (
          <li key={index}>
            <a href={item?.link} className="footerlink">
              {item?.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="footer">
      <div className="footer-div-1">
        <div className="footer-div-1-headline">
          <h4 className="StayUpdated">ABOUT ME</h4>
          <div className="body-text b3 regular">
            Approaching all things design with a distinct blend of play and minimalism, seamlessly. Developing worldwide
            projects from Kenya since 2018.
          </div>
        </div>
        <div className="footer-div-1-form">
          <div className="form-footer w-form">
            <div className="nameMe">Vickkie</div>
          </div>
        </div>
      </div>
      <div className="footerDivWrapper">
        <div className="logo">
          <img className="companyFooterLogo" src="/svg/logo-clear.png" alt="Company Logo" />
        </div>
        {renderSectionContent("forlio map", [
          { label: "About Me", link: "/about" },
          { label: "Works", link: "/services" },
          { label: "Contact", link: "/contact" },
          { label: "Login", link: "/login" },
        ])}

        {renderSectionContent("resources", [
          { label: "Insights", link: "/insights" },
          { label: "Cookie policy", link: "/cookies" },
          { label: "Privacy policy", link: "/privacy" },
        ])}
        {renderSectionContent("socials", [
          { label: "Facebook", link: `${data?.facebook}` },
          { label: "Twitter", link: `${data?.twitter}` },
          { label: "LinkedIn", link: `${data?.linkedin}` },
          { label: "Instagram", link: `${data?.instagram}` },
        ])}
      </div>
      <p className="bottomRights">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
