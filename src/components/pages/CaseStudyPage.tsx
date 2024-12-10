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
import {
  SectionsStateContext,
  Section,
} from "@/providers/SectionsStateProvider";

import CaseStudySection from "@/components/pages/CaseStudySection";

export default function CaseStudyPage() {
  const { sections }: { sections: Section[] } =
    useContext(SectionsStateContext);
  const [activeSection, setActiveSection] = useState(0);
  const [activeSubSection, setActiveSubSection] = useState("");

  const renderSubSections = (subSections: Section[], sectionIndex: number) => {
    return subSections.map((subSection) => (
      <li key={subSection.sectionId} className="my-3">
        <Link
          to={`#${sections[sectionIndex].sectionId}-${subSection.sectionId}`}
          className={`flex items-center truncate ${activeSubSection === subSection.sectionId ? "text-blue-500" : ""}`}
          onClick={() => {
            setActiveSubSection(subSection.sectionId || "");
            setActiveSection(sectionIndex);
          }}
        >
          {subSection.name}
        </Link>
      </li>
    ));
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <main id="case-study-container" className="flex flex-row mx-4">
          <div id="article-content" className="flex-[50]">
            <CaseStudySection section={sections[activeSection]} />
          </div>
          <nav
            id="navigate-this-page"
            className="sticky flex-[50] top-0 h-screen"
          >
            <div className="nice-line absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-quinary rounded-full"></div>
            <ul className="absolute left-2 top-1/4 bottom-1/4 p-0 font-mono">
              {renderSubSections(
                sections[activeSection].subSections,
                activeSection,
              )}
            </ul>
          </nav>
        </main>
      </div>
      <TooltipProvider>
        <Pagination>
          <PaginationContent>
            {sections.map((section, idx) => (
              <Tooltip key={section.sectionId}>
                <TooltipTrigger asChild>
                  <PaginationItem>
                    <PaginationLink
                      href={`#${section.sectionId}`}
                      onClick={() => setActiveSection(idx)}
                      className={activeSection === idx ? "text-blue-500" : ""}
                    >
                      {idx + 1}
                    </PaginationLink>
                  </PaginationItem>
                </TooltipTrigger>
                <TooltipContent>
                  <div>{section.name}</div>
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
