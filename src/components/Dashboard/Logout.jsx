import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
const BACKEND_URL = import.meta.env.VITE_BACKEND_PORT;

export default function Logout() {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  useEffect(() => {
    handleLogout();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      // Call backend to clear httpOnly cookie
      const response = await fetch(`${BACKEND_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });
      console.log(response, "response");
    } catch (e) {
      console.warn("Logout API failed", e);
    }

    // Clear frontend stuff
    setAuthData(null);
    localStorage.removeItem("authData");
    sessionStorage.clear();

    // Redirect
    navigate("/login");
  };

  return null;
}
