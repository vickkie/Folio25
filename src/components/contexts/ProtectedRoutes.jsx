import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  const storedAuthData = localStorage.getItem("authData");
  const localAuthData = storedAuthData ? JSON.parse(storedAuthData) : null;

  const userData = authData ? authData : localAuthData ? localAuthData : null;

  useEffect(() => {
    if (!userData || userData?.status !== "active" || !userData?.TOKEN) {
      console.log("No auth data, redirecting to login");
      navigate("/login");
      console.log(authData, "authData");
    }
  }, [authData, navigate]);

  return userData && userData?.status === "active" ? <Outlet /> : null;
};

export default ProtectedRoutes;
