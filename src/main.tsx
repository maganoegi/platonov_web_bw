import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { I18nProvider } from "./i18n/I18nProvider";

// Import legacy CSS verbatim (order matters; keep same cascade as old)
import "./styles/index.css";
import "./styles/hi.css";
import "./styles/snakebtn.css";
import "./styles/flip.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </React.StrictMode>
);
