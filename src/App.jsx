import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/Home/Home";
import About from "./components/About/About";

import Contact from "./components/Contact/Contact";
import ScrollToTop from "./components/Extras/ScrollTop";

import ResetPassword from "./components/Account/ResetPassword";
import ForgotPassword from "./components/Account/ForgotPasword";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./components/contexts/AuthContext";
import ProtectedRoutes from "./components/contexts/ProtectedRoutes";
import Loading from "./components/Loading/Loading";
import useGet from "./components/hooks/useGet";
import LottieLoad from "./components/Loading/LottieLoad";

// Lazy load the Dashboard component for speed
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));

const Login = lazy(() => import("./components/Account/Login"));
const Profile = lazy(() => import("./components/Dashboard/Components/Profile/Profile"));

const Logout = lazy(() => import("./components/Dashboard/Logout"));

const Blogs = lazy(() => import("./components/Blogs/Blog"));
const BlogPost = lazy(() => import("./components/Blogs/BlogPost"));
const NotFound = React.lazy(() => import("./components/Extras/404"));
const Cookies = React.lazy(() => import("./components/Extras/Cookies"));

const MaintenancePage = React.lazy(() => import("./components/Extras/Maintainance"));
const Privacy = React.lazy(() => import("./components/Extras/Privacy"));

const companyName = import.meta.env.VITE_COMPANY_NAME;

function App() {
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

  // Main app rendering if site is online
  return (
    <ErrorBoundary>
      <AuthProvider>
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
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
