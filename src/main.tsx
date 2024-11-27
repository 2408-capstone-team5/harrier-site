import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";
import CaseStudyPage from "./pages/CaseStudyPage";
import GetStartedPage from "./pages/GetStartedPage.tsx";
import NotFoundPage from "./pages/NotFoundPage";

import "./index.css";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Layout />,
          errorElement: <NotFoundPage />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: "team",
              element: <TeamPage />,
            },
            {
              path: "case-study",
              element: <CaseStudyPage />,
            },
            {
              path: "get-started",
              element: <GetStartedPage />,
            },
            {
              path: "*",
              element: <NotFoundPage />,
            },
          ],
        },
      ])}
    />
  </StrictMode>
);
