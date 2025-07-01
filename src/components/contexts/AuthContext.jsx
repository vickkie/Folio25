import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children, clientDetails }) => {
  const [authData, setAuthData] = useState(() => {
    // Load from localStorage or use initial client details
    const storedAuthData = localStorage.getItem("authData");
    return storedAuthData ? JSON.parse(storedAuthData) : { client: clientDetails };
  });

  // Store authData in localStorage whenever it changes
  useEffect(() => {
    if (authData) {
      localStorage.setItem("authData", JSON.stringify(authData));
    }
  }, [authData]);

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
};
