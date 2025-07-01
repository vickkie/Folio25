import React, { useState, useEffect } from "react";
import {
  Home,
  Settings,
  HelpCircle,
  WalletMinimal,
  ChevronLeftCircle,
  LucideLayoutDashboard,
  LogInIcon,
  ChartBarBig,
  UsersRoundIcon,
  HandCoins,
} from "lucide-react";
import styles from "./DashboardLayout.module.css";
import TopBar from "../Components/TopBar/TopBar";
import { useNavigate } from "react-router-dom";
const companyName = import.meta.env.VITE_COMPANY_NAME;
const chaturl = "";

const menuItems = [
  { icon: LucideLayoutDashboard, name: "Dashboard", route: "/dashboard" },
  { icon: Settings, name: "Settings", route: "/profile" },
  { icon: LogInIcon, name: "Logout", route: "/logout" },
  { icon: HelpCircle, name: "Help", route: "/help" },
];

export default function DashboardLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsExpanded(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <div
        className={`${styles.overlayForMenu} ${isExpanded && isMobile ? styles.active : ""}`}
        onClick={() => setIsExpanded(false)}
      ></div>

      <div className={styles.Dashcontainer}>
        <div
          className={`${styles.drawer} ${isExpanded ? styles.expanded : ""} ${isMobile ? styles.mobile : ""} ${
            isMobile && isExpanded ? styles.mobileExpanded : ""
          }`}
        >
          <nav className={styles.nav}>
            {isExpanded ? (
              <div className={styles.expandedLOgo}>
                <img src="/images/svg/companylogo-white.svg" className={styles.dashLogo} />
                <div className={styles.logoName}>{companyName}</div>
              </div>
            ) : (
              <div className={styles.logoImg}>
                <img src="/images/svg/companylogo.svg" className={styles.dashLogo} />
              </div>
            )}

            <div className={styles.buttonWrapper}>
              <button
                className={`${styles.toggleButton} ${isMobile ? styles.mobileToggle : ""}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <ChevronLeftCircle /> : ""}
              </button>
            </div>
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={styles.navItem}
                onClick={() => {
                  if (item.name !== "Help") {
                    navigate(item.route);
                  } else {
                    window.open(item.route, "_blank"); // Opens in a new tab or window
                  }
                }}
              >
                <item.icon className={styles.icon} />
                {isExpanded && <span className={styles.RouteName}>{item.name}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.content}>
          <TopBar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          {children}
        </div>
      </div>
    </>
  );
}
