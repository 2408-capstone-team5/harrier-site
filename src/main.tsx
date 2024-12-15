import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage.tsx";
import CaseStudyHomePage from "./components/pages/CaseStudyHomePage.tsx";
import GetStartedPage from "./components/pages/GetStartedPage.tsx";
import NotFoundPage from "./components/pages/NotFoundPage.tsx";
// import CaseStudyPage from "./components/pages/CaseStudyPage.tsx";
import { CaseStudyContentProvider } from "@/providers/CaseStudyContentProvider.tsx";
import "./index.css";
createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <CaseStudyContentProvider>
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
                path: "case-study",
                element: <CaseStudyHomePage />,
                // children: [
                //   {
                //     path: ":page",
                //     element: <CaseStudyPage page={page} />,
                //   },
                // ],
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
    </CaseStudyContentProvider>
  </StrictMode>,
);
