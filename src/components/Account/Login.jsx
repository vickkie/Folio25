import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect info
  const redirectTo = location.state?.redirect || "/dashboard";

  // fetch the maintenance status mode
  const {
    data: maintainanceData,
    isLoading: statusLoading,
    error: statusError,
    statusCode,
  } = useGet("sitestatus/site-status/auth");

  const { postData, responseData, updateStatus, isLoading, error, errorMessage } = usePost("login");
  const { setAuthData } = useContext(AuthContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);

  const [maintainance, setMaintainance] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    if (maintainanceData?.status === "offline") {
      setMaintainance(true);
    }
  }, [maintainanceData]);

  function generateRandomSecret() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 32; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const setRememberMeCookie = (email, password) => {
    const secretKey = generateRandomSecret(); // Generating a new secret for each session
    const encryptedEmail = CryptoJS.AES.encrypt(email, secretKey).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();

    // Store the secret in memory (only for this session)
    sessionStorage.setItem("encryptionSecret", secretKey);
    document.cookie = `uzitrake=${encryptedEmail}|${encryptedPassword}; max-age=604800; path=/`;
  };

  useEffect(() => {
    if (!autoLoginAttempted) {
      const cookies = document.cookie.split("; ").find((row) => row.startsWith("uzitrake="));
      if (cookies) {
        const [encryptedEmail, encryptedPassword] = cookies.split("=")[1].split("|");

        const secret = sessionStorage.getItem("encryptionSecret");
        if (!secret) {
          console.warn("Encryption secret is missing from sessionStorage.");
          // Optionally clear the cookie here to prevent future issues
          document.cookie = "uzitrake=; Max-Age=0; path=/";
          return; // Stop further processing
        }

        try {
          const decryptedEmail = CryptoJS.AES.decrypt(encryptedEmail, secret).toString(CryptoJS.enc.Utf8);
          const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, secret).toString(CryptoJS.enc.Utf8);

          // Automatically log in with decrypted credentials
          postData({ email: decryptedEmail, password: decryptedPassword });
          setAutoLoginAttempted(true);
        } catch (error) {
          console.error("Error decrypting stored credentials:", error);
          // Clear the invalid cookie
          document.cookie = "rememberMe=; Max-Age=0; path=/";
        }
      }
    }
  }, [postData, autoLoginAttempted]);

  useEffect(() => {
    if (updateStatus === 200) {
      setAuthData(responseData);
      navigate(redirectTo);
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
        console.log(processedValues);

        postData(processedValues);

        if (rememberMe) {
          setRememberMeCookie(processedValues.email, processedValues.password);
        }
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
      console.log(errorMessage, responseData);
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
            <div className="welcome-msg">Welcome Back Uzi</div>
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
              <div className="login-options">
                <label>
                  <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                  Remember Me
                </label>
                <Link to="/forgot-password" className="forgot-password-link">
                  Forgot Password?
                </Link>
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
    </div>
  );
};

export default Login;
