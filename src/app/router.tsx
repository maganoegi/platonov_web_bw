import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { HomePage } from "../pages/HomePage";
import { AboutPage } from "../pages/AboutPage";
import { WorkPage } from "../pages/WorkPage";
import { ContactPage } from "../pages/ContactPage";

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/work", element: <WorkPage /> },
      { path: "/contact", element: <ContactPage /> }
    ]
  }
]);
