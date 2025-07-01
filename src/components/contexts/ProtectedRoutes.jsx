import React, { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const authData = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData || !authData.authData || authData.authData.status !== "active" || !authData.authData.TOKEN) {
      console.log("Unauthorized or inactive user");
      navigate("/login");
    } else {
    }
  }, [authData, navigate]);

  // Render the children components if authenticated
  return authData && authData.authData && authData.authData.status === "active" ? <Outlet /> : null;
};

export default ProtectedRoutes;
