import React from "react";
import "./css/footerCTA.css";
import data from "../../assets/json/uzidata.json";

export const FooterCTA = () => {
  return (
    <section className="footer-cta-section">
      <div className="padding-global large">
        <div className="w-layout-blockcontainer containerx w-container">
          <div className="footer-cta-grid">
            {/* Top Left */}
            <div className="footer-cta-top-left">
              <div className="footer-cta-title">
                <h1 className="heading-1-no-anim">
                  Let&apos;s create great <span className="font-ivyora">things together</span>
                </h1>
              </div>
              <div className="footer-line-vertical left"></div>
            </div>

            {/* Top Right */}
            <div className="footer-cta-top-right">
              <div className="footer-line-horizontal top"></div>
              <div className="footer-line-vertical right"></div>
            </div>

            {/* Bottom Left */}
            <div className="footer-cta-bottom-left">
              <a href={`mailto:${data?.email}`} className="footer-banner-link">
                {data?.email}
              </a>
              <a href={`tel:${data?.tel}`} className="footer-banner-link">
                {data?.tel}
              </a>
            </div>

            {/* Bottom Right */}
            <div className="footer-cta-bottom-right">
              <div className="footer-line-horizontal bottom"></div>
              <div className="socials-buttons">
                <a
                  href={`${data?.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-networks instagram transit"
                  aria-label="instagram"
                  style={{ backgroundColor: "rgba(1, 1, 1, 0)" }}
                >
                  <img
                    src="/svg/instagram.svg"
                    alt="Instagram"
                    className="social-img"
                    data-label=""
                    style={{ filter: "invert(0%)" }}
                  />
                </a>

                <a
                  href={`${data?.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-networks github transit"
                  aria-label="github"
                  style={{ backgroundColor: "rgba(1, 1, 1, 0)" }}
                >
                  <img
                    src="svg/icons8-github.svg"
                    alt="Github icon"
                    className="social-img"
                    data-label=""
                    style={{ filter: "invert(0%)" }}
                  />
                </a>

                <a
                  href={`${data?.linktree}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-networks linktree transit"
                  aria-label="linktree"
                  style={{ backgroundColor: "rgba(1, 1, 1, 0)" }}
                >
                  <img
                    src="svg/linktree.svg"
                    alt="Linktree icon"
                    className="social-img"
                    data-label=""
                    style={{ filter: "invert(0%)" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
