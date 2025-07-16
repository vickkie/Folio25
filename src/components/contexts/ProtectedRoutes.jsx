import React, { useContext, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    if (!authData || authData.status !== "active" || !authData.TOKEN) {
      navigate("/login");
    }
  }, [authData, navigate]);

  return authData && authData.status === "active" ? <Outlet /> : null;
};

export default ProtectedRoutes;
