import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePost from "../hooks/usePost";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const { postData, isLoading, error, errorMessage, updateStatus } = usePost("user/forgot-password");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: (values) => {
      postData(values);
    },
  });

  return (
    <div className={styles.forgotPasswordWrapper}>
      <div className={styles.forgotPasswordContainer}>
        <h1 className={styles.headerTop}>Password recovery</h1>
        {error && updateStatus !== null && <div className={styles.successMessage}>{errorMessage}</div>}

        {updateStatus === 200 && <div className={styles.successMessage}>{errorMessage}</div>}

        <form className={styles.resetForm} onSubmit={formik.handleSubmit}>
          <div className={styles.inputWrapshit}>
            <div className={styles.labelHolder}>
              <div className={styles.label}></div>
              {formik.touched.email && formik.errors.email ? (
                <div className={styles.errorMessage}>{formik.errors.email}</div>
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
              className={`${styles.inputBtn} ${
                formik.touched.email && formik.errors.email
                  ? styles.inputError
                  : formik.touched.email && !formik.errors.email
                  ? styles.inputSuccess
                  : ""
              }`}
            />
          </div>

          <button type="submit" className={styles.forgotPasswordSubmit} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

          <div className={styles.remembered}>
            Remembered your password ? <a href="/login">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
