import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import App_v1 from "./App_v1";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <App_v1 /> */}
  </React.StrictMode>
);
