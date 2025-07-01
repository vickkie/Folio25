import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePost from "../hooks/usePost";
import styles from "./ResetPassword.module.css";
import commonPasswords from "../../assets/json/commonPassword.json";

const ResetPassword = () => {
  const [resetToken, setResetToken] = useState(null);
  const navigate = useNavigate();
  const { postData, isLoading, error, errorMessage, responseData, updateStatus } = usePost("user/reset-password");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("rt");
    if (token) {
      setResetToken(token);
    } else {
      navigate("/forgot-password"); // Redirect if resetToken is missing
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .notOneOf(commonPasswords, "This password is too common. Please choose a more secure password.")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      if (resetToken) {
        postData({ resetToken, password: values.password });
      }
    },
  });

  return (
    <div className={styles.resetPasswordWrapper}>
      <div className={styles.resetPasswordContainer}>
        <h1 className={styles.headerTop}>Reset Password</h1>
        {error && <div className={styles.successMessage}>{errorMessage}</div>}

        {updateStatus === 200 && <div className={styles.successMessage}>{errorMessage}</div>}

        <form className={styles.resetForm} onSubmit={formik.handleSubmit}>
          <div className={styles.labelHolder}>
            <div className={styles.label}>New Password</div>
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.errorMessage}>{formik.errors.password}</div>
            ) : null}
          </div>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={`${styles.inputBtn} ${
              formik.touched.password && formik.errors.password
                ? styles.inputError
                : formik.touched.password && !formik.errors.password
                ? styles.inputSuccess
                : ""
            }`}
          />

          <div className={styles.labelHolder}>
            <div className={styles.label}>Confirm Password</div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className={styles.errorMessage}>{formik.errors.confirmPassword}</div>
            ) : null}
          </div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className={`${styles.inputBtn} ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? styles.inputError
                : formik.touched.confirmPassword && !formik.errors.confirmPassword
                ? styles.inputSuccess
                : ""
            }`}
          />

          <button type="submit" className={styles.resetPasswordSubmit} disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>

          <div className={styles.remembered}>
            Remembered your password? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
