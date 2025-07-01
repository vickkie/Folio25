// Dashboard.js
import React from "react";

import DashboardLayout from "./Layout/DashboardLayout"; // Use of Layout
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className={styles.dashboardGrid}></div>
    </DashboardLayout>
  );
};

export default Dashboard;
