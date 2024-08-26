import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store.ts";
import { router } from "./router.ts";

document.getElementsByTagName("html")[0].dataset.bsTheme = "dark";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div>
        <RouterProvider router={router}></RouterProvider>
      </div>
    </Provider>
  </React.StrictMode>,
);
