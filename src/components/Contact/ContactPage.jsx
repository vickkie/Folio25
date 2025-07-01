import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import toast, { Toaster } from "react-hot-toast";
import "./form.css";

const ContactPage = () => {
  // Validation Schema for contact form
  const contactValidationSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().matches(/^\d+$/, "Phone number is not valid"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().max(400, "Message cannot exceed 400 characters").required("Message is required"),
  });

  // Validation Schema for subscription form
  const subscriptionSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  // Contact form submission handler
  const handleContactSubmit = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, "contactMessages"), {
        ...values,
        submittedAt: new Date().toISOString(),
      });

      toast.success("Message sent successfully!");
      resetForm();
    } catch (error) {
      toast.error("Failed to send the message");
    }
  };

  // Newsletter subscription handler
  const handleSubscribe = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, "subscribers"), {
        email: values.email,
        subscribedAt: new Date().toISOString(),
      });
      toast.success("Subscribed successfully!");
      resetForm();
    } catch (error) {
      console.error("Error subscribing to the newsletter: ", error);
      toast.error("Failed to subscribe");
    }
  };

  // Function to determine field border color based on error and touched status
  const getBorderColor = (name, touched, errors) => {
    if (touched[name] && errors[name]) {
      return "0.0058vw solid var(--red)";
    }
    return;
  };

  const clearConsole = () => {
    console.clear();
  };

  return (
    <section className="contact-page-sec">
      <div className="contact-container">
        {/* Newsletter Subscription Form */}
        <div className="custom-row contactDetails">
          <div className="ourNewsLetters">
            <Formik
              initialValues={{ email: "" }}
              validationSchema={subscriptionSchema}
              onSubmit={() => {
                handleSubscribe();
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="fieldsHolder">
                  <div className="emailHolderinner">
                    <div className="emailHeader">Our newsletter</div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="emailLetter"
                      style={{ border: getBorderColor("email", touched, errors) }}
                    />
                    <button type="submit" className="emailSubmit" disabled={isSubmitting}>
                      Subscribe
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* Contact Form */}
        <div className="custom-row contactForm">
          <div className="contact-page-form">
            <h2>Get in Touch</h2>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
              }}
              validationSchema={contactValidationSchema}
              onSubmit={handleContactSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className="custom-row">
                    <div className="custom-col gridy">
                      <div className="single-input-field">
                        <Field
                          type="text"
                          name="firstname"
                          placeholder="First Name"
                          style={{ border: getBorderColor("firstname", touched, errors) }}
                        />
                      </div>
                      <div className="single-input-field">
                        <Field
                          type="text"
                          name="lastname"
                          placeholder="Last Name"
                          style={{ border: getBorderColor("lastname", touched, errors) }}
                        />
                      </div>
                    </div>
                    <div className="custom-col gridy">
                      <div className="single-input-field">
                        <Field
                          type="email"
                          name="email"
                          placeholder="E-mail"
                          style={{ border: getBorderColor("email", touched, errors) }}
                        />
                      </div>
                      <div className="phoneRow">
                        <div className="single-input-field">
                          <Field
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            style={{ border: getBorderColor("phone", touched, errors) }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="custom-col">
                      <div className="single-input-field">
                        <Field
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          style={{ border: getBorderColor("subject", touched, errors) }}
                        />
                      </div>
                    </div>
                    <div className="custom-col">
                      <div className="single-input-field">
                        <Field
                          as="textarea"
                          name="message"
                          placeholder="Type Your Message"
                          maxLength={400}
                          style={{ border: getBorderColor("message", touched, errors) }}
                        />
                      </div>
                    </div>
                    <div className="submitContact">
                      <div className="startButton">
                        <div className="button-wrapper">
                          <button type="submit" className="btn-link btn-link-cta -xxl" disabled={isSubmitting}>
                            <span className="btn-border"></span>
                            <span className="btn-ripple">
                              <span></span>
                            </span>
                            <span className="btn-title">
                              <span data-text="Submit message">Submit message</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
};

export default ContactPage;
