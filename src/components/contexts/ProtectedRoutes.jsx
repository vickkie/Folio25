import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authData")) {
      console.log("authData", authData);
    }
    if (!authData || authData.status !== "active" || !authData.TOKEN) {
      console.log("Unauthorized or inactive user");
      navigate("/login");
      console.log(authData);
    } else {
      console.log("welcome");
    }
  }, [authData, navigate]);

  // Render the children components if authenticated
  return authData && authData.status === "active" ? <Outlet /> : null;
};

export default ProtectedRoutes;
