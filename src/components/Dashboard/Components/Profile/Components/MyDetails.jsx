import React, { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import usePut from "../../../../hooks/usePut";
import { AuthContext } from "../../../../contexts/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const MyDetails = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { postData, isLoading, errorMessage, updateStatus, responseData } = usePut("user/updateProfile");
  const { setAuthData } = useContext(AuthContext);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    location: Yup.string().required("Location is required"),
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
  });

  useEffect(() => {
    if (errorMessage && updateStatus !== 200) {
      toast.error(typeof errorMessage === "string" ? errorMessage : "An error occurred. Please try again.", {
        duration: 6000,
      });
    }
    if (updateStatus === 200 && formSubmitted) {
      toast.success(responseData?.message || "Profile updated successfully!");
      setAuthData((prevData) => ({
        ...prevData,
        ...responseData,
      }));
      setIsEditing(false);
      setFormSubmitted(false);
    }
  }, [errorMessage, updateStatus, responseData, formSubmitted, setAuthData]);

  if (!user) return <div>Loading...</div>;

  const updateProfile = async (values) => {
    setFormSubmitted(true);
    try {
      await postData(values);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      {isEditing ? (
        <Formik
          initialValues={{
            username: user.username || "",
            location: user.location || "",
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            userId: user._id,
            TOKEN: user.TOKEN,
          }}
          validationSchema={validationSchema}
          onSubmit={updateProfile}
        >
          {({ errors, touched }) => (
            <div className="profile-wrap">
              <Form className="my-details-form">
                {/* Input fields in edit mode */}

                <div className="profile-settings-inner">
                  <div className="form-group">
                    <label>Username</label>
                    <Field
                      type="text"
                      name="username"
                      className={touched.username && errors.username ? "input-error" : ""}
                    />
                    {touched.username && errors.username && <div className="error">{errors.username}</div>}
                  </div>

                  <div className="form-group">
                    <label>First Name</label>
                    <Field
                      type="text"
                      name="firstname"
                      className={touched.firstname && errors.firstname ? "input-error" : ""}
                    />
                    {touched.firstname && errors.firstname && <div className="error">{errors.firstname}</div>}
                  </div>

                  <div className="form-group">
                    <label>Last Name</label>
                    <Field
                      type="text"
                      name="lastname"
                      className={touched.lastname && errors.lastname ? "input-error" : ""}
                    />
                    {touched.lastname && errors.lastname && <div className="error">{errors.lastname}</div>}
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <Field
                      type="text"
                      name="location"
                      className={touched.location && errors.location ? "input-error" : ""}
                    />
                    {touched.location && errors.location && <div className="error">{errors.location}</div>}
                  </div>
                </div>
                <div className="form-actions">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                  </button>
                  <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)} disabled={isLoading}>
                    Cancel
                  </button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      ) : (
        <div className="profile-wrap">
          <div className="plainHeader">
            <div className="plainHead">Profile settings</div>
            <div className="form-actions flex-center">
              <button className="editButton " type="button" onClick={() => setIsEditing(true)} disabled={isLoading}>
                <svg viewBox="0 0 24 24" height="1rem" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                    fill="#0F0F0F"
                  />
                </svg>
                <div>Edit Profile</div>
              </button>
            </div>
          </div>
          <div className="plainDetails">
            <div className="form-group">
              <label>Username</label>
              <span>{user.username}</span>
            </div>

            <div className="form-group">
              <label>First Name</label>
              <span>{user.firstname}</span>
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <span>{user.lastname}</span>
            </div>

            <div className="form-group">
              <label>Location</label>
              <span>{user.location}</span>
            </div>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default MyDetails;
