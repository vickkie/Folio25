import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { motion } from "framer-motion";

import ScrollToTop from "./components/Extras/ScrollTop";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoutes from "./components/contexts/ProtectedRoutes";
import Loading from "./components/Loading/Loading";
import Preloader from "./components/Loading/Preloader";

// Lazy-loaded components
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
const MaintenancePage = lazy(() => import("./components/Extras/Maintainance"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Profile = lazy(() => import("./components/Dashboard/Components/Profile/Profile"));

function App() {
  const [preloadDone, setPreloadDone] = useState(false);

  // simulate preload duration
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPreloadDone(true);
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);

  const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/contact", element: <Contact /> },
    { path: "/login", element: <Login /> },
    { path: "/logout", element: <Logout /> },
    { path: "/insights", element: <Blogs /> },
    { path: "/insights/:id", element: <BlogPost /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/reset", element: <ResetPassword /> },
    { path: "/cookies", element: <Cookies /> },
    { path: "/privacy", element: <Privacy /> },
  ];

  const protectedRoutes = [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/profile", element: <Profile /> },
  ];

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div style={{ overflow: "hidden" }}>
            {/* Preloader stacked at top */}
            <Preloader done={preloadDone} />

            {/* Main content comes in from below */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: preloadDone ? 0 : 100, opacity: preloadDone ? 1 : 0 }}
              transition={{ delay: preloadDone ? 0.3 : 0, duration: 0.8, ease: "easeOut" }}
            >
              <Suspense fallback={<Loading />}>
                <ScrollToTop />
                <Routes>
                  {routes.map((route) => (
                    <Route key={route.path} path={route.path} element={route.element} />
                  ))}
                  <Route element={<ProtectedRoutes />}>
                    {protectedRoutes.map((route) => (
                      <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </motion.div>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
