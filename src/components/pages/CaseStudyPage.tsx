import { useEffect, useState, useRef } from "react";
// import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

import { Section } from "../Section";
export default function CaseStudyPage() {
  const sections: Section[] = [
    { name: "Introduction", sectionId: "introduction" },
    {
      name: "Problem Domain",
    
      sectionId: "problem-domain",
    },
    { name: "Use Case", sectionId: "use-case" },
    {
      name: "Implementation",
      sectionId: "implementation",
    },
    { name: "Future Work", sectionId: "future-work" },
    { name: "References", sectionId: "references" },
  ];

  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [navVisible, setNavVisible] = useState<boolean>(true);
  const isScrollingRef = useRef(false);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeSection}`);
  }, [activeSection]);

  const registerSectionRef = (id: string) => (element: HTMLElement | null) => {
    if (element) {
      sectionRefs.current[id] = element;
    }
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      isScrollingRef.current = true;
      window.history.replaceState(null, "", `#${sectionId}`);
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        isScrollingRef.current = false;
        setActiveSection(sectionId);
      }, 500);
    }
  };

  return (
    <div>
      <main id="case-study-container" className="flex flex-row mx-4">
        <div id="article-content" className="flex-[85] m-4">
          {sections.map((title, idx) => (
            <>
              <br />
              <Section
                section={title}
                registerRef={registerSectionRef}
              />
              {idx === sections.length - 1 ? (
                <div className="h-24"></div>
              ) : (
                <div className="nice-line h-0.5 bg-quinary rounded-full mx-auto w-2/6"></div>
              )}
            </>
          ))}
        </div>
        {navVisible && (
          <div className="relative flex-[15]">
            <nav
              id="navigate-this-page"
              className="sticky top-0 h-screen overflow-y-auto flex flex-col justify-center pl-4"
            >
              <div className="nice-line absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-quinary rounded-full"></div>
              <ul className="p-0 font-mono">
                {sections.map((section) => (
                  <li key={section.sectionId} className="my-3">
                    <Link
                      to={`#${section.sectionId}`}
                      onClick={(event) =>
                        handleNavClick(event, `${section.sectionId}`)
                      }
                      className={`flex items-center ${activeSection === section.sectionId ? "font-extrabold text-center text-primary" : ""} truncate`}
                    >
                      {/* {activeSection === section.urlFormatted && (
                        <span className="mr-1">
                          <Eye />
                        </span>
                      )} */}
                      {section.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </main>
    </div>
  );
}
