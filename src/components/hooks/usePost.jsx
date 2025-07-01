import { useState, useEffect } from "react";
import axios from "axios";

const usePost = (endpoint, requiresAuth = false, token = null) => {
  const backendUrl = import.meta.env.VITE_BACKEND_PORT;
  let [updateStatus, setUpdateStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const isDevelopment = process.env.NODE_ENV === "development";

  const handleApiCall = () => {
    //* this commented section is  for testin this using proxy- dont remove
    const url = isDevelopment ? `/api/${endpoint}` : `${backendUrl}/api/${endpoint}`;
    // const url = `${backendUrl}/api/${endpoint}`;

    console.log(url);
    // Create a headers object
    const headers = {};

    // Check if authorization is required and token is provided
    if (requiresAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    } else if (requiresAuth) {
      // console.warn("Authorization is required but no token was provided.");
    }

    return axios.post(url, data, {
      headers,
      validateStatus: (status) => status >= 200 && status < 300,
    });
  };

  const handleSuccess = (response) => {
    setUpdateStatus(response.status);
    setResponseData(response.data);
    const message = response?.data?.message || response.message;
    setErrorMessage(message);
  };

  const handleError = (error) => {
    const message = error.response?.data?.message || error.message || "An error occurred";
    setErrorMessage(message);
    setError(true);
    setUpdateStatus(null);
    // console.log(error);
  };

  const handleFinally = () => {
    setIsLoading(false);
  };

  const updateData = () => {
    if (!data) return;

    setIsLoading(true);
    setError(false);
    setErrorMessage(null);

    handleApiCall().then(handleSuccess).catch(handleError).finally(handleFinally);
  };

  useEffect(() => {
    if (endpoint && data) {
      updateData();
    }
  }, [endpoint, data]);

  const postData = (data) => {
    // console.log(data);
    setData(data);
  };

  return { responseData, updateStatus, isLoading, error, errorMessage, postData };
};

export default usePost;
