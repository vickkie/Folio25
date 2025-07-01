import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePost from "../hooks/usePost";
import "./SignUp.css";
import NavBar from "../Navbar/NavBar";
import Menu from "../Menu/Menu";
import toast, { Toaster } from "react-hot-toast";
import commonPasswords from "../../assets/json/commonPassword.json";
import { EyeIcon, Home } from "lucide-react";
import { EyeOff } from "lucide-react";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/build/css/intlTelInput.css";
import useGet from "../hooks/useGet";
import MaintainanceLoad from "../Loading/Maintainance";
import Loading from "../Loading/Loading";
const companyName = import.meta.env.VITE_COMPANY_NAME;

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const referralCodeFromUrl = query.get("refCode") || "";

  // fetch the maintenance status mode
  const {
    data: maintainanceData,
    isLoading: statusLoading,
    error: statusError,
    statusCode,
  } = useGet("sitestatus/site-status/auth");

  const { postData, isLoading, error, updateStatus, errorMessage } = usePost("register");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = useRef(null);
  const [phone, setPhone] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isValidPhone2, setIsValidPhone2] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [maintainance, setMaintainance] = useState(false);

  useEffect(() => {
    if (maintainanceData?.status === "offline") {
      setMaintainance(true);
    }
  }, [maintainanceData]);

  const formik = useFormik({
    initialValues: {
      fname: "",
      sname: "",
      email: "",
      phone: phone,
      password: "",
      confirmPassword: "",
      termsAccepted: false,
      referralCode: referralCodeFromUrl,
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("Required"),
      sname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        )
        .notOneOf(commonPasswords, "Please choose a more secure password.")
        .required("Required field"),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required field"),
      termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
      referralCode: Yup.string().optional(),
    }),
    onSubmit: (values) => {
      const formData = {
        username: values.fname,
        email: values.email.toLowerCase(),
        password: values.password,
        firstname: values.fname,
        lastname: values.sname,
        phone: phone, // Using the phone number from IntlTelInput
        referralCode: values.referralCode,
      };

      if (isValidPhone && maintainanceData?.status !== "offline") {
        postData(formData);
      }
    },
  });

  useEffect(() => {
    if (updateStatus === 201) {
      toast.success("Account created successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [updateStatus, navigate]);

  useEffect(() => {
    if (error) {
      const message = typeof errorMessage === "string" ? errorMessage : "An error occurred. Please try again.";
      toast.error(message, { duration: 6000 });
    }
  }, [error, errorMessage, updateStatus]);

  const toggleEyeIcon = () => {
    setIsPasswordVisible(!isPasswordVisible);
    if (inputRef.current) {
      inputRef.current.type = isPasswordVisible ? "password" : "text";
    }
  };

  useEffect(() => {
    setIsValidPhone(isValidPhone);
  }, [isValidPhone, setIsValidPhone]);

  const validatePhoneNumber = (value) => {
    const digitsOnly = /^[0-9\+]*$/;

    if (!digitsOnly.test(value)) {
      setErrorMessages("Phone number must contain only digits.");
      setPhone("");
    } else if (value.length < 10) {
      setErrorMessages("Phone number must be at least 10 digits.");
      setPhone("");
    } else {
      setErrorMessages("");
      setPhone(value);
    }
  };

  return (
    <div className="accountSignUpWrapper">
      <NavBar />
      <Menu />
      <Toaster />
      <div className="Homelink" title="Home" onClick={() => navigate("/")}>
        <Home />
      </div>
      <div className="signUpImage">
        <div className="overlay-bg">
          <h2 className="overlayText-bg">Invest Smart, Grow Secure</h2>
        </div>
      </div>
      <div className="signup-container">
        <div style={{ position: "relative", textAlign: "center" }}>
          <img
            src="/images/svg/companylego-Namegreen.svg"
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
            {companyName || " Company Name"}
          </h1>
        </div>
        <div className="welcome-msg">Create Your Account</div>
        {error && <div className="error-message">{errorMessage}</div>}
        {statusLoading && <Loading size={80} />}

        {!statusLoading && maintainance && (
          <>
            <div className="welcome-msg">We are currently under maintainance</div>
            <div className="welcome-msg">Thankyou for your patience</div>
            {error && <div className="error-message">{errorMessage}</div>}
            <MaintainanceLoad size={300} />
          </>
        )}

        {!statusLoading && maintainanceData?.status !== "offline" && (
          <>
            <form onSubmit={formik.handleSubmit}>
              <div className="namesHolder">
                <div className="flexHolder">
                  <div className="labelHolder">
                    <div className="label">First Name</div>
                    {formik.touched.fname && formik.errors.fname ? (
                      <div className="error-message">{formik.errors.fname}</div>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    name="fname"
                    placeholder="First Name"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className={`inputBtn ${
                      formik.touched.fname && formik.errors.fname
                        ? "input-error"
                        : formik.touched.fname && !formik.errors.fname
                        ? "input-success"
                        : ""
                    }`}
                  />
                </div>
                <div className="flexHolder">
                  <div className="labelHolder">
                    <div className="label">Second Name</div>
                    {formik.touched.sname && formik.errors.sname ? (
                      <div className="error-message">{formik.errors.sname}</div>
                    ) : null}
                  </div>
                  <input
                    type="text"
                    name="sname"
                    placeholder="Second Name"
                    value={formik.values.sname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                    className={`inputBtn ${
                      formik.touched.sname && formik.errors.sname
                        ? "input-error"
                        : formik.touched.sname && !formik.errors.sname
                        ? "input-success"
                        : ""
                    }`}
                  />
                </div>
              </div>

              <div className="labelHolder">
                <div className="label">
                  Email <span className="info">(You can't change this address)</span>{" "}
                </div>
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
                <div className="label">
                  Phone Number <span className="info">(Can't be changed)</span>
                </div>

                {!isValidPhone2 && formik.touched.phone && <div className="warning">Invalid</div>}
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error-message">{formik.errors.phone}</div>
                ) : null}
              </div>
              <IntlTelInput
                value={phone}
                preferredCountries={["ke"]}
                initOptions={{ initialCountry: "ke" }}
                onChangeNumber={(value) => {
                  validatePhoneNumber(value);
                }}
                onChange={(value) => {
                  setPhone(value);
                  formik.setFieldValue("phone", value);
                }}
                onChangeValidity={(status) => {
                  setIsValidPhone(status);
                  setIsValidPhone2(status);
                }}
                usePreciseValidation={true}
                onBlur={() => formik.setFieldTouched("phone", true)}
                containerClassName={`intl-tel-input ${
                  formik.touched.phone && formik.errors.phone ? "input-error" : ""
                }`}
                inputClassName="inputBtn"
                required
              />

              <div className="labelHolder">
                <div className="label">Password</div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="error-message">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="inputContainer passEye">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  ref={inputRef}
                  placeholder="at least 6 characters"
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

                <div type="button" onClick={toggleEyeIcon} className="eyeToggle">
                  {isPasswordVisible ? <EyeIcon size={18} /> : <EyeOff size={18} />}
                </div>
              </div>

              <div className="labelHolder">
                <div className="label">Confirm Password</div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="error-message">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className={`inputBtn ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword
                    ? "input-error"
                    : formik.touched.confirmPassword && !formik.errors.confirmPassword
                    ? "input-success"
                    : ""
                }`}
              />

              <div className="labelHolder">
                <div className="label"> Referral code</div>
              </div>
              <input
                type="text"
                name="referralCode"
                value={formik.values.referralCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`inputBtn ${
                  formik.touched.referralCode && formik.errors.referralCode
                    ? "input-error"
                    : formik.touched.confirmPassword && !formik.errors.referralCode
                    ? "input-success"
                    : ""
                }`}
              />

              <label className="checkmarkLabel">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formik.values.termsAccepted}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <span className="baseSized">
                  I agree to the{" "}
                  <a href={"/terms"} className="linkColor underline">
                    terms and conditions
                  </a>
                </span>
              </label>
              {formik.touched.termsAccepted && formik.errors.termsAccepted ? (
                <div className="error-message">{formik.errors.termsAccepted}</div>
              ) : null}

              <button type="submit" className="submitBtn" disabled={isLoading}>
                <div className="centertext">{isLoading ? "Creating Account..." : "Create Account"}</div>
              </button>

              <div className="signInOption">
                Already have an account?{" "}
                <Link to="/login" className="login-link">
                  <span className="underline">Log in</span>
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
