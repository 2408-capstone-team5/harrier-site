import { useEffect, useState, useRef } from "react";
// import { Eye } from "lucide-react";
import { Section } from "../Section";
export default function CaseStudyPage() {
  const sections: Section[] = [
    { name: "Introduction", id: 1, urlFormatted: "introduction" },
    {
      name: "Problem Domain",
      id: 2,
      urlFormatted: "problem-domain",
    },
    { name: "Use Case", id: 3, urlFormatted: "use-case" },
    {
      name: "Implementation",
      id: 4,
      urlFormatted: "implementation",
    },
    { name: "Future Work", id: 5, urlFormatted: "future-work" },
    { name: "References", id: 6, urlFormatted: "references" },
  ];

  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [navVisible, setNavVisible] = useState<boolean>(true);
  const sectionRefs = useRef<{ [key: string]: HTMLElement }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: [0, 0.5, 1],
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      let maxIntersectionRatio = 0;
      let mostVisibleSectionId = activeSection;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > maxIntersectionRatio) {
          maxIntersectionRatio = entry.intersectionRatio;
          mostVisibleSectionId = entry.target.id;
        }
      });

      if (mostVisibleSectionId !== activeSection) {
        setActiveSection(mostVisibleSectionId);
        window.history.replaceState(null, "", `#${mostVisibleSectionId}`);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [activeSection]);

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

  const registerSectionRef = (id: string) => (element: HTMLElement | null) => {
      if (element) {
        sectionRefs.current[id] = element;
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
                key={title.id}
                section={title}
                registerRef={registerSectionRef}
              />
              <br />
              {idx === sections.length - 1 ? null : (
                <div className="h-0.5 bg-primary rounded-full mx-auto w-1/6 nice-line"></div>
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
              <div className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-primary rounded-full nice-line"></div>
              <ul className="p-0 font-mono">
                {sections.map((section) => (
                  <li key={section.id} className="my-3">
                    <a
                      href={`#${section.urlFormatted}`}
                      // onClick={(event) =>
                      //   handleClick(event, `${section.urlFormatted}`)
                      // }
                      className={`flex items-center ${activeSection === section.urlFormatted ? "font-extrabold text-center text-primary" : ""} truncate`}
                    >
                      {/* {activeSection === section.urlFormatted && (
                        <span className="mr-1">
                          <Eye />
                        </span>
                      )} */}
                      {section.name}
                    </a>
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
