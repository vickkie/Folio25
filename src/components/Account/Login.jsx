import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import usePost from "../hooks/usePost";
import { AuthContext } from "../contexts/AuthContext";
import "./Login.css";

import NavBar from "../Navbar/NavBar";
import Menu from "../Menu/Menu";
import { EyeIcon, Home } from "lucide-react";
import { EyeOff } from "lucide-react";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_PORT;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect info
  const redirectTo = location.state?.redirect || "/dashboard";
  const message = location.state?.message || "";

  const { postData, responseData, updateStatus, isLoading, error, errorMessage } = usePost("login");
  const { setAuthData } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);

  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedAuthData = localStorage.getItem("authData");

    // if (!storedAuthData) {
    //   console.log("No local auth, trying refresh token");
    // No local auth, try refresh token
    axios
      .post(`${BACKEND_URL}/api/refresh-token`, {}, { withCredentials: true })
      .then((res) => {
        setAuthData(res.data?.user);
        navigate("/dashboard");
      })
      .catch(() => {
        // console.log("Refresh token expired or missing");
        if (location.pathname !== "/login") {
          navigate("/login", {
            state: {
              message: "Session expired, please login again",
            },
          });
        }
      });
    // }
  }, []);

  useEffect(() => {
    if (updateStatus === 200) {
      setAuthData(responseData);

      navigate(redirectTo);
    }
  }, [updateStatus, responseData, navigate]);

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
      const processedValues = {
        ...values,
        rememberMe,
        email: values.email.toLowerCase(),
      };

      postData(processedValues);
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
      // console.log(errorMessage, responseData);
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
      <div className="loginImage">
        <div className="overlay-bg">
          <h2 className="overlayText-bg">Please sleep dude!</h2>
        </div>
      </div>
      <div className="login-container">
        <div style={{ position: "relative", textAlign: "center" }}>
          <img
            src="/svg/logo-clear.png"
            alt="Company Logo"
            style={{ display: "block", height: "30px", width: "auto" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling.style.display = "block";
            }}
          />
          <h1
            className="loginHeader"
            style={{
              display: "none",
            }}
          >
            uzitrake
          </h1>
        </div>

        <>
          <div className="welcome-msg">Welcome Back Uzi</div>
          {error && <div className="error-message">{errorMessage}</div>}
          {message && <div className="error-message">{message}</div>}
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
            <div className="login-options">
              <label>
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                Remember Me
              </label>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="login-submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="signup-prompt">
              <div className="div-divider">
                <div className="line-or">or use</div>
              </div>
            </div>

            <div className="terminal-list">
              <Link to="/terminal" className="terminal-link">
                <span className="linkColor consoel">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-terminal"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 7l5 5l-5 5" />
                    <path d="M12 19l7 0" />
                  </svg>
                </span>
                <div className="terminal-here">Terminal</div>
              </Link>
            </div>
          </form>
        </>
      </div>
    </div>
  );
};

export default Login;
