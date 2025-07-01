import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./top-bar.module.css";
import BottomSheet from "./BottomSheet";
import { Bell, Search, User, X, Menu, ChevronLeftCircleIcon } from "lucide-react";
import NotificationSystem from "../Notification/NoticationSystem";
const companyName = import.meta.env.VITE_COMPANY_NAME;

export default function TopBar({ isExpanded, setIsExpanded }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const navigate = useNavigate();
  const { authData, setAuthData } = useContext(AuthContext);
  const location = useLocation(); // Get the current route

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsExpanded(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [setIsExpanded]);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");
    if (storedAuthData) {
      setAuthData(JSON.parse(storedAuthData));
    }
  }, []);

  useEffect(() => {
    if (authData) {
      localStorage.setItem("authData", JSON.stringify(authData));
    }
  }, [authData]);

  useEffect(() => {
    if (!authData) {
      navigate("/login");
    }
  }, [authData, navigate]);

  const handleLogout = () => {
    navigate("/logout");
  };

  const ProfilePicture = () => {
    // <img src={authData.profilePicture} alt="Profile" />;
    return (
      <div className={styles.profileImgWrapper}>
        {authData?.profilePicture ? (
          <div className={styles.profileImg2} style={{ backgroundImage: `url(${authData.profilePicture})` }}></div>
        ) : (
          <img src="/images/userDefault.png" alt="Profile" />
        )}
      </div>
    );
  };

  // Function to render the appropriate label based on the route
  const renderRouteLabel = () => {
    switch (location.pathname) {
      case "/dashboard":
        return `Welcome, ${authData?.username || "Guest"}`;
      case "/transactions":
        return "Transactions";
      case "/profile":
        return "Profile";
      case "/settings":
        return "Settings";
      case "/referrals":
        return "Referrals";
      case "/payments/deposit":
        return "Deposit";
      case "/payments/withdraw":
        return "Withdraw";
      case "/wallet":
        return "Wallet";
      default:
        return `${companyName}`;
    }
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.logo}>
        <div
          className={`${styles.toggleButtonx} ${isMobile ? styles.mobileToggle : ""}`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronLeftCircleIcon /> : <Menu />}
        </div>
        {/* Conditionally render the label based on the current route */}
        <span>{renderRouteLabel()}</span>
      </div>
      <div className={styles.rightSection}>
        {isSearchOpen ? (
          <div className={styles.searchInputContainer}>
            <input type="text" placeholder="Search..." className={styles.searchInput} />
            <button
              className={[styles.closeSearch, styles.iconButton].join(" ")}
              onClick={() => setIsSearchOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <button className={[styles.iconButton, styles.searchGlass].join(" ")} onClick={() => setIsSearchOpen(true)}>
            <Search size={20} />
          </button>
        )}

        <div className={styles.iconEmail} onClick={() => setIsSheetOpen(true)}>
          <div className={styles.userProfilepic} onClick={() => setIsSheetOpen(true)}>
            <ProfilePicture />
          </div>

          <div className={styles.emailNmae}>
            <div className={styles.emailx}>
              {authData?.email
                ? authData.email.split("@")[0].substring(0, 13) +
                  (authData.email.split("@")[0].length > 13 ? "..." : "") +
                  "@" +
                  authData.email.split("@")[1]
                : ""}
            </div>
          </div>
        </div>

        <div>
          <NotificationSystem userId={authData?._id} />
        </div>
      </div>

      <BottomSheet isOpen={isSheetOpen} handleLogout={handleLogout} onClose={() => setIsSheetOpen(false)} />
    </div>
  );
}
