import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  useEffect(() => {
    handleLogout();
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data in context
    setAuthData(null);

    // Clear localStorage
    localStorage.removeItem("authData");

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; Max-Age=-99999999; path=/`;
    });
    // console.log("Cookies cleared.");

    // Clear session storage
    sessionStorage.clear();
    // console.log("Session storage cleared.");

    // Redirect to login page
    navigate("/login");
  };

  return null;
}
