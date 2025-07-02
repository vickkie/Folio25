import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Preloader from "./Preloader";

export default function PageTransition() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Intercept clicks on internal links
  useEffect(() => {
    const onClick = (e) => {
      const anchor = e.target.closest("a");
      if (anchor && anchor.hostname === window.location.hostname && !anchor.hasAttribute("data-no-preload")) {
        e.preventDefault();
        setLoading(true);
        navigate(anchor.pathname + anchor.search);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);

  // Stop loader after location changes
  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => setLoading(false), 500); // Adjust if you have real data fetching
      return () => clearTimeout(t);
    }
  }, [location, loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <Outlet />
    </>
  );
}
