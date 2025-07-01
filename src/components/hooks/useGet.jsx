import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useGet = (endpoint, requiresAuth = false, token = null) => {
  const backendUrl = import.meta.env.VITE_BACKEND_PORT;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const isDevelopment = process.env.NODE_ENV === "development";
  const [statusCode, setStatusCode] = useState(null);

  // Function to handle the API call
  const handleApiCall = useCallback(() => {
    const url = isDevelopment ? `/api/${endpoint}` : `${backendUrl}/api/${endpoint}`;
    // console.log("Fetching data from:", url);

    const headers = {};

    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (requiresAuth) {
      // console.warn("Authorization is required but no token was provided.");
    }

    return axios.get(url, {
      headers,
      validateStatus: (status) => status >= 200 && status < 300,
    });
  }, [endpoint, backendUrl, isDevelopment, requiresAuth, token]);

  const handleSuccess = (response) => {
    setData(response.data); // Save the fetched data
    setErrorMessage(null);
    setStatusCode(response?.status);
    setError(false);
  };

  const handleError = (error) => {
    const message = error.response?.data?.message || error.message || "An error occurred";
    setErrorMessage(message);
    setStatusCode(error.response?.status || null);
    setError(true);
  };

  const handleFinally = () => {
    setIsLoading(false);
  };

  // Function to trigger refetch manually
  const refetch = () => {
    setIsLoading(true);
    handleApiCall().then(handleSuccess).catch(handleError).finally(handleFinally);
  };

  useEffect(() => {
    if (endpoint) {
      refetch();
    }
  }, [endpoint, token]);

  return { data, isLoading, error, errorMessage, statusCode, refetch };
};

export default useGet;
