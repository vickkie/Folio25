import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children, clientDetails }) => {
  const [authData, setAuthData] = useState(null);

  // Load authData from localStorage on mount
  useEffect(() => {
    try {
      const storedAuthData = localStorage.getItem("authData");
      if (storedAuthData) {
        setAuthData(JSON.parse(storedAuthData));
      } else {
        // setAuthData({ client: clientDetails });
      }
    } catch (err) {
      console.error("Failed to parse authData from localStorage:", err);
      setAuthData({ client: clientDetails });
    }
  }, []);

  // Sync to localStorage whenever authData changes
  useEffect(() => {
    if (authData) {
      try {
        localStorage.setItem("authData", JSON.stringify(authData));
      } catch (err) {
        console.error("Failed to save authData to localStorage:", err);
      }
    }
  }, [authData]);

  return <AuthContext.Provider value={{ authData, setAuthData }}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
