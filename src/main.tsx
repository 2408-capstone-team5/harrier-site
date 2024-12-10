import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/Layout";
import HomePage from "./components/pages/HomePage.tsx";
import TeamPage from "./components/pages/TeamPage.tsx";
import CaseStudyPage from "./components/pages/CaseStudyPage.tsx";
import GetStartedPage from "./components/pages/GetStartedPage.tsx";
import NotFoundPage from "./components/pages/NotFoundPage.tsx";
import CaseStudySection from "./components/pages/CaseStudySection.tsx";
import { SectionsStateProvider } from "@/providers/SectionsStateProvider.tsx";
import "./index.css";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <SectionsStateProvider>
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
              children: [
                {
                  path: ":sectionId",
                  element: <CaseStudySection section={{name: 'hi', sectionId: "hi", subSections: []}} />,
                }
            ]
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
    </ SectionsStateProvider>
  </StrictMode>
);
