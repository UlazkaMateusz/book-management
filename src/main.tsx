import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";

document.getElementsByTagName("html")[0].dataset.bsTheme = "dark";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
