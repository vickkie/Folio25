import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ClarityStats from "./components/ClarityStats";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <Router>
  <>
    <ClarityStats />
    <App />
  </>
);
