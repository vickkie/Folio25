import React, { useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import usePut from "../../../../hooks/usePut";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PasswordSettings = () => {
  const { postData, isLoading, error, errorMessage, updateStatus } = usePut("user/updateCred");
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authData) {
      navigate("/login");
    }
  }, [authData, navigate]);

  useEffect(() => {
    if (error) {
      const message = typeof errorMessage === "string" ? errorMessage : "An error occurred. Please try again.";
      toast.error(message), { duration: 6000 };
      // console.log(isLoading);
    }
    if (updateStatus === 200) {
      toast.success("Password updated successfully!");
      // console.log(isLoading);
    }
  }, [error, errorMessage, updateStatus, isLoading]);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      postData({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        userId: authData?._id,
      });
    },
  });

  return (
    <div className="password-form profile-wrap">
      <form onSubmit={formik.handleSubmit} className="changePassForm">
        <div className="form-group">
          <label htmlFor="current-password">Current password</label>
          <input type="password" id="current-password" {...formik.getFieldProps("currentPassword")} />
          {formik.touched.currentPassword && formik.errors.currentPassword ? (
            <div className="error">{formik.errors.currentPassword}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="new-password">New password</label>
          <input type="password" id="new-password" {...formik.getFieldProps("newPassword")} />
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <div className="error">{formik.errors.newPassword}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm new password</label>
          <input type="password" id="confirm-password" {...formik.getFieldProps("confirmPassword")} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="error">{formik.errors.confirmPassword}</div>
          ) : null}
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="update-btn" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update password"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default PasswordSettings;
