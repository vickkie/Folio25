import React from "react";
import "./css/maintainance.css";

const MaintenancePage = () => {
  return (
    <div className="maintenance-page">
      <div className="left-section"></div>
      <div className="right-section"></div>

      <div className="top-section">
        <div className="top-header">Website under maintenance</div>
        <div className="lower-header">
          The site is currently down for maintenance. Please check back later. Thankyou
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
