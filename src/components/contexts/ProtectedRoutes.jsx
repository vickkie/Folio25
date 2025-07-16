import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_PORT;

const isAccessTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token);
    const expDate = new Date(exp * 1000);

    // Log in a human-readable format
    // console.log(expDate.toLocaleString(), "← token expires at");

    const now = Date.now() / 1000;
    return exp < now;
  } catch (err) {
    console.error("Token decode error:", err);
    return true;
  }
};

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { authData, setAuthData } = useContext(AuthContext);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const storedAuthData = localStorage.getItem("authData");
  const localAuthData = storedAuthData ? JSON.parse(storedAuthData) : null;

  const userData = authData || localAuthData || null;

  useEffect(() => {
    const checkAuth = async () => {
      if (!userData || userData.status !== "active" || !userData.TOKEN) {
        console.log("Missing or invalid auth data. Redirecting to login...");
        navigate("/login");
        return;
      }

      const isExpired = isAccessTokenExpired(userData.TOKEN);

      if (isExpired) {
        // console.log("Access token expired. Trying to refresh...");

        try {
          const res = await axios.post(`${BACKEND_URL}/api/refresh-token`, {}, { withCredentials: true });

          setAuthData(res.data.user);

          localStorage.setItem("authData", JSON.stringify(res.data.user));
        } catch (err) {
          console.error("Refreshing authentication failed. Logging out...");

          setAuthData(null);
          navigate("/logout");
          navigate("/login", { state: { message: "Session expired. Please login again." } });
          return;
        }
      }

      setCheckingAuth(false);
    };

    checkAuth();
  }, [authData, navigate]);

  if (checkingAuth) return null;

  return userData && userData.status === "active" ? <Outlet /> : null;
};

export default ProtectedRoutes;
