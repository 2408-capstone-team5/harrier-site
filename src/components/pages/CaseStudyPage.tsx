import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CaseStudyContentContext } from "@/providers/CaseStudyContentProvider";
import CaseStudySection from "./CaseStudySection";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
// } from "@/components/ui/pagination";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

export default function CaseStudyPage() {
  const { headers, caseStudy } = useContext(CaseStudyContentContext) ?? {};

  const content = caseStudy?.join("\n\n") ?? "";
  console.log({ headers });
  //   const location = useLocation();

  //   useEffect(() => {
  //     const pathParts = location.pathname.split("#");
  //     if (pathParts.length > 1) {
  //       const sectionId = pathParts[1].split("-")[0];
  //       setActivePage(sectionId);
  //     }
  //   }, [location]);

  return (
    <>
      <div className="flex flex-row">
        <main id="case-study-container" className="flex-1">
          <CaseStudySection markdown={content} />
        </main>
        <nav
          id="on-this-page"
          className="sticky top-[27vh] z-10 pl-5 pt-5 h-screen overflow-auto"
        >
          <h4 className="text-sm font-bold">On this page</h4>
          {/* <ul className="text-sm p-0">
            {CaseStudy?.headers &&
              CaseStudy.headers
                .find((header) => header.id === activePage)
                ?.subsections.map((subHeader) => (
                  <li key={subHeader.id} className="my-2">
                    <Link
                      to={`#${activePage}-${subHeader.urlEncoded}`}
                      className={`flex items-center truncate ${
                        activeSubSection === subHeader.id ? "text-primary" : ""
                      }`}
                      onClick={() => {
                        setActiveSubSection(subHeader.id);
                      }}
                    >
                      {subHeader.name}
                    </Link>
                  </li>
                ))}
          </ul> */}
        </nav>
      </div>
      {/* 
      <div>
        <TooltipProvider>
          <Pagination>
            <PaginationContent>
              {CaseStudy?.headers?.map((header, idx) => (
                <Tooltip key={header.id}>
                  <TooltipTrigger asChild>
                    <PaginationItem>
                      <PaginationLink
                        href={`#${header.id}`}
                        onClick={() => setActivePage(header.id)}
                        className={
                          activePage === header.id ? "text-primary" : ""
                        }
                      >
                        {idx}
                      </PaginationLink>
                    </PaginationItem>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div>{header.name}</div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </PaginationContent>
          </Pagination>
        </TooltipProvider>
      </div> */}
    </>
  );
}
