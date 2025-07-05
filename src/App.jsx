// App.js
import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import ScrollToTop from "./components/Extras/ScrollTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoutes from "./components/contexts/ProtectedRoutes";
import Loading from "./components/Loading/Loading";
import Preloader from "./components/Loading/Preloader";

// Lazy-loaded pages
const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const Login = lazy(() => import("./components/Account/Login"));
const Logout = lazy(() => import("./components/Dashboard/Logout"));
const Blogs = lazy(() => import("./components/Blogs/Blog"));
const BlogPost = lazy(() => import("./components/Blogs/BlogPost"));
const ForgotPassword = lazy(() => import("./components/Account/ForgotPasword"));
const ResetPassword = lazy(() => import("./components/Account/ResetPassword"));
const Cookies = lazy(() => import("./components/Extras/Cookies"));
const Privacy = lazy(() => import("./components/Extras/Privacy"));
const NotFound = lazy(() => import("./components/Extras/404"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Profile = lazy(() => import("./components/Dashboard/Components/Profile/Profile"));
const Work = lazy(() => import("./components/Work/Work"));

function App() {
  const [preloadDone, setPreloadDone] = useState(false);

  useEffect(() => {
    // lock body scroll until preloader finishes
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setPreloadDone(true);
      document.body.style.overflow = "auto";
    }, 1400);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          {/* Preloader covers full body */}
          <Preloader done={preloadDone} />

          {/* Main content slides in from bottom */}
          <motion.div
            style={{
              position: preloadDone ? "relative" : "absolute",
              top: 0,
              left: 0,
              width: "100%",
              minHeight: "100vh",
              zIndex: preloadDone ? 1 : -1,
            }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: preloadDone ? 0 : 100, opacity: preloadDone ? 1 : 0 }}
            transition={{ delay: preloadDone ? 0.3 : 0, duration: 0.8, ease: "easeOut" }}
          >
            <Suspense fallback={<Loading />}>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/work" element={<Work />} />
                <Route path="/projects" element={<Work />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/insights" element={<Blogs />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/insights/:id" element={<BlogPost />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset" element={<ResetPassword />} />
                <Route path="/cookies" element={<Cookies />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </motion.div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
