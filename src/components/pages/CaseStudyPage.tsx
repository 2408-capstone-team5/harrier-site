import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  // PaginationNext,
  // PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useContext, useState } from "react";
import { CaseStudyContentContext } from "@/providers/CaseStudyContentProvider";
import CaseStudySection from "@/components/pages/CaseStudySection";

export default function CaseStudyPage() {
  const contentHeaders = useContext(CaseStudyContentContext)?.ContentHeaders;
  const [activePage, setActivePage] = useState("");
  const [activeSubSection, setActiveSubSection] = useState("");
  console.log({ contentHeaders });
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <main id="case-study-container" className="flex flex-row mx-4">
          <div id="article-content" className="flex-[50]">
            <CaseStudySection sectionContent={"some more content"} />
          </div>
          <nav
            id="navigate-this-page"
            className="sticky flex-[50] top-0 h-screen"
          >
            {/* <div className="nice-line absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-quinary rounded-full"></div> */}
            <ul className="absolute left-2 top-1/4 bottom-1/4 p-0 font-mono">
              {contentHeaders?.find(header => header.id === activePage)?.subsections.map((subHeader) => (
                <li key={subHeader.id} className="my-2">
                  <Link
                    to={`#${subHeader.id}`}
                    className={`flex items-center truncate ${activeSubSection === subHeader.id ? "text-blue-500" : ""}`}
                    onClick={() => {
                      setActiveSubSection(subHeader.id);
                    }}
                  >
                    {subHeader.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </main>
      </div>
      <TooltipProvider>
        <Pagination>
          <PaginationContent>
            {contentHeaders?.map((header, idx) => (
              <Tooltip key={header.id}>
                <TooltipTrigger asChild>
                  <PaginationItem>
                    <PaginationLink
                      href={`#${header.id}`}
                      onClick={() => setActivePage(header.id)}
                      className={activePage === header.id ? "text-blue-500" : ""}
                    >
                      {idx}
                    </PaginationLink>
                  </PaginationItem>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{header.name}</div>
                  {/* <div>
                    {section.subSections.map((subSection) => (
                      <div key={subSection.sectionId}>{subSection.name}</div>
                    ))}
                  </div> */}
                </TooltipContent>
              </Tooltip>
            ))}
          </PaginationContent>
        </Pagination>
      </TooltipProvider>
    </>
  );
}
