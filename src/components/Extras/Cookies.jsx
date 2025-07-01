import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import NavBar from "../Navbar/NavBar";
import Menu from "../Menu/Menu";
import Footer from "../Footer/Footer";
import "./css/extras.css";
import termsDefinitions from "../../assets/json/termsDefinitions.json";
import { Link } from "react-router-dom";

export default function Privacy() {
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
      <div className="policyPage">
        <div className="HeroPrivacy">
          <div className="error-text">
            <div>COOKIES POLICY</div>
          </div>
        </div>
        <div className="policyDetails">
          <div className="policySuperheader">
            This Cookies Policy ("Cookies Policy") describes cookies and other technologies that TradingView, Inc.
            ("TradingView", "we", "us" or "our") uses on its website ("Site") and the choices that users have. This
            Cookies Policy is a part of TradingView’s Privacy Policy.
          </div>
          <div className="subSection2">
            When you first visit the Site, you will be asked to consent to the use of cookies in accordance with this
            Cookies Policy. Note that if you accept, we will store them on your computer.
          </div>

          <div className="subSection2midHeader">What is a cookie?</div>
          <div className="subSection2">
            A 'cookie' is a piece of information that is sent to your browser by a website you visit. The Site uses
            first party cookies (those set by a website that is being visited by the user at the time. For example,
            cookies via www.tradingview.com) as well as third-party cookies (set by a different domain), as described
            below.
          </div>
          <div className="subSection2">
            Cookies can be stored on your computer for various periods of time. They can be in a form of either "session
            cookies" or "persistent cookies." A session cookie only lasts as long as the browser session and is
            automatically deleted when you close your browser. A persistent cookie lasts long after your browser is
            closed and will remain until it expires (as determined by the third party in charge of placing it) or until
            you delete the cookie. Persistent cookies are used to help sites recognize and identify your computer when
            you open your browser and surf the Internet again.
          </div>
          <div className="subSection2">
            The data collected through cookies may include information about the IP (Internet Protocol) address of your
            device, browser type, language, operating system, the state or country from which you have accessed the
            Site, the date and the time of your visit(s), the number of links you click on this Site, the functions you
            use, the searches you request, and the data you have saved while on this Site. TradingView may use the
            information collected for a variety of necessary, legitimate purposes, including user authentication, user
            interface customization, security, research and analysis to improve the functionality of our Site, and
            advertising (for more information on how we use your data, please read our Privacy Policy).
          </div>

          <div className="subSection2midHeader">How do we use cookies?</div>
          <div className="subSection2">
            The following sets out how we use different categories of cookies, as well as information on your options
            for managing your settings for the data collected by these technologies:
          </div>

          <div className="subSection2">
            <span className="heavy">Necessary cookies</span>: These cookies are used to provide users with services
            available through a Site and to use some of its features, such as the ability to log-in and access secure
            areas, provide pop-up notices, and accept language from sign-up forms. These cookies are essential for using
            and navigating a Site. Without them, basic functions of our Site would not work. Because these cookies are
            strictly necessary to deliver our Site’s essential services, you cannot refuse them.
          </div>
          <div className="subSection2">
            <span className="heavy">Performance/Analytics cookies</span>: These cookies are used to recognize and count
            the number of Site visitors, gather statistics regarding how visitors move around the Site (including number
            of page views and the amount time spent on each page) and for conversion tracking and click hotspots. This
            helps us improve the way our Site works and general user experience. For example, these cookies allow us to
            ensure that users are able to find what they need easily.
          </div>
          <div className="subSection2">
            <span className="heavy">Other third party cookies</span>: On some parts of the Site, including, but not
            limited, to news widgets, we use content provided by other websites(third parties). These third party sites
            are able to set their own cookies in some cases. Note that we have no control over these third-party
            cookies. You can turn them off by disabling them on your browser.
          </div>

          <div className="subSection2midHeader">Web beacons</div>
          <div className="subSection2">
            Web beacons, also called tracking pixels, are tiny graphics with unique identifiers that allow us to track
            usage patterns, count users who have visited a particular page, advertising impressions and clicks (ad
            reactions), etc. Web beacons can only collect limited information, including a cookie number, time and date
            of a page view, and a description of the page on which the web beacon resides. These beacons do not carry
            any personal data and are only used to track the effectiveness of this Site and to show advertisements based
            on user interests. We use web beacons in connection with Google Analytics and advertising services as well
            as our Snowplow Tracker. The information generated relating to our Site is used for various necessary and
            legitimate purposes, including the creation of reports on the use of this site as well as the development,
            testing, and improvement of services. Google will store information of users’ actions on the TradingView
            Site and it will be collected by Google services. For more information on Google’s use of data for marketing
            and analytics purposes
          </div>
          <div className="subSection2midHeader">Changes</div>
          <div className="subSection2">
            We may change the type of third party service providers that place cookies on our Site and amend this
            Cookies Policy at any time by posting the amended version on our Site. Unless additional notice or consent
            is required by applicable laws, this will serve as your official notification of these changes.
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
