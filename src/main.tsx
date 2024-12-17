import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CaseStudyContentProvider } from "../src/providers/CaseStudyContentProvider";
// import ErrorBoundary from "./components/ErrorBoundary";
import GetStartedPage from "./components/pages/GetStartedPage";
import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage";
import CaseStudyHomePage from "./components/pages/CaseStudyHomePage";
import NotFoundPage from "./components/pages/NotFoundPage";
import "./index.css";

// const GetStartedPage = lazy(() => import("./components/pages/GetStartedPage"));

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <CaseStudyContentProvider>
      {/* <ErrorBoundary> */}
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "/",
            element: <Layout />,
            errorElement: <div>generic error</div>,
            children: [
              {
                index: true,
                element: <HomePage />,
              },
              {
                path: "case-study",
                element: <CaseStudyHomePage />,
                errorElement: <NotFoundPage />,
              },
              {
                path: "get-started",
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <GetStartedPage />
                  </Suspense>
                ),
              },
              {
                path: "*",
                element: <NotFoundPage />,
              },
            ],
          },
        ])}
      />
      {/* </ErrorBoundary> */}
    </CaseStudyContentProvider>
  </StrictMode>,
);
