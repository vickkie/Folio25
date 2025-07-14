import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const authData = localStorage.getItem("authData");
  const storedAuthData = JSON.parse(authData);

  useEffect(() => {
    if (!storedAuthData || storedAuthData.status !== "active" || !storedAuthData.TOKEN) {
      navigate("/login");
    } else {
      console.log("welcome");
    }
  }, [storedAuthData, navigate]);

  // Render the children components if authenticated
  return storedAuthData && storedAuthData.status === "active" ? <Outlet /> : null;
};

export default ProtectedRoutes;
