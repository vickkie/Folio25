import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import usePost from "../hooks/usePost";
import { AuthContext } from "../contexts/AuthContext";
import "./Login.css";
import CryptoJS from "crypto-js";
import NavBar from "../Navbar/NavBar";
import Menu from "../Menu/Menu";
import { EyeIcon, Home } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import useGet from "../hooks/useGet";
import MaintainanceLoad from "../Loading/Maintainance";
import LottieLoad from "../Loading/LottieLoad";
const companyName = import.meta.env.VITE_COMPANY_NAME;

const LoginTrader = () => {
  const navigate = useNavigate();

  // fetch the maintenance status mode
  const {
    data: maintainanceData,
    isLoading: statusLoading,
    error: statusError,
    statusCode,
  } = useGet("sitestatus/site-status/auth");

  const { postData, responseData, updateStatus, isLoading, error, errorMessage } = usePost("login/trader");
  const { setAuthData } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);

  const [maintainance, setMaintainance] = useState(false);

  useEffect(() => {
    if (maintainanceData?.status === "offline") {
      setMaintainance(true);
    }
  }, [maintainanceData]);

  useEffect(() => {
    if (updateStatus === 200) {
      setAuthData(responseData);
      navigate("/login");
    }
  }, [updateStatus, responseData, setAuthData, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(1, "At least 1 characters required").required("Required"),
    }),
    onSubmit: (values) => {
      if (maintainanceData?.status !== "offline") {
        // Ensure email is in lowercase before submitting
        const processedValues = {
          ...values,
          email: values.email.toLowerCase(),
        };

        postData(processedValues);
      }
    },
  });

  //toggle password visibility

  const toggleEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (inputRef.current) {
      inputRef.current.type = isPasswordVisible ? "text" : "password";
    }
  };

  useEffect(() => {
    if (error) {
      const message = typeof errorMessage === "string" ? errorMessage : "An error occurred. Please try again.";
      toast.error(message, { duration: 6000 });
    }
  }, [error, errorMessage, updateStatus, responseData, setAuthData]);

  return (
    <div className="accountLoginWraaper">
      <NavBar />
      <Menu />
      <Toaster />
      <div
        className="Homelink"
        title="Home"
        onClick={() => {
          navigate("/");
        }}
      >
        <Home />
      </div>

      <div className="login-container">
        <h1 className="loginHeader">{companyName}</h1>

        {statusLoading && <LottieLoad size={80} />}
        {!statusLoading && maintainance && (
          <>
            <div className="welcome-msg">We are currently under maintainance</div>
            <div className="welcome-msg">Thankyou for your patience</div>
            {error && <div className="error-message">{errorMessage}</div>}
            <MaintainanceLoad size={300} />
          </>
        )}

        {!statusLoading && !maintainance && (
          <>
            <div className="welcome-msg">Trader Login</div>
            {error && <div className="error-message">{errorMessage}</div>}
            <form onSubmit={formik.handleSubmit}>
              <div className="labelHolder">
                <div className="label">Email</div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="error-message">{formik.errors.email}</div>
                ) : null}
              </div>
              <input
                type="email"
                name="email"
                placeholder="email@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                disabled={maintainance}
                className={`inputBtn ${
                  formik.touched.email && formik.errors.email
                    ? "input-error"
                    : formik.touched.email && !formik.errors.email
                    ? "input-success"
                    : ""
                }`}
              />
              <div className="labelHolder">
                <div className="label">Password</div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="error-message">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="inputContainer">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="at least 8 characters"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={maintainance}
                  required
                  className={`inputBtn ${
                    formik.touched.password && formik.errors.password
                      ? "input-error"
                      : formik.touched.password && !formik.errors.password
                      ? "input-success"
                      : ""
                  }`}
                />
                <div type="button" onClick={toggleEyeIcon} aria-label="password toggle" className="eyeToggle">
                  {isPasswordVisible ? <EyeIcon size={18} /> : <EyeOff size={18} />}
                </div>
              </div>

              <button
                type="submit"
                className="login-submit"
                disabled={isLoading || maintainance}
                onClick={() => {
                  console.log("clicked");
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </>
        )}
      </div>
      <div className="loginImage2">
        <div className="overlay-bg">
          <h2 className="overlayText-bg">Investing for you, managed by us</h2>
        </div>
      </div>
    </div>
  );
};

export default LoginTrader;
