import { Link } from "react-router-dom";
import { useContext } from "react";
import { SectionsStateContext, Section } from "@/providers/SectionsStateProvider";

export default function CaseStudyPage() {
  const { sections } : { sections: Section[] } = useContext(SectionsStateContext)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <main id="case-study-container" className="flex flex-row mx-4">
        <div id="article-content" className="flex-[85]">
          {sections.map((section, idx) => (
            <div
              key={section.sectionId}
              id={section.sectionId}
              className="mb-8"
            >
              <article
                key={section.sectionId}
                id={`${section.sectionId}`}
                // ref={registerRef(section.sectionId)}
                className="p-4 rounded-lg mb-6"
              >
                <h2 className="font-bold text-2xl mb-4">{section.name}</h2>
                <h3 className="font-semibold text-xl mb-2">{section.name} A</h3>
                <p className="mb-4">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum. lorem ipsum dolor sit
                  amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <h3 className="font-semibold text-xl mb-2">{section.name} B</h3>
                <p className="mb-4">
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                  in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum. lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua.
                </p>
                <h3 className="font-semibold text-xl mb-2">{section.name} C</h3>
                <p className="mb-4">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </article>
              {idx < sections.length - 1 && (
                <div className="nice-line h-0.5 bg-quinary rounded-full mx-auto w-2/6"></div>
              )}
            </div>
          ))}
        </div>
        <nav
          id="navigate-this-page"
          className="sticky flex-[15] top-0 h-screen"
        >
          <div className="nice-line absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-quinary rounded-full"></div>
          <ul className="absolute left-2 top-1/4 bottom-1/4 p-0 font-mono">
            {sections.map((section) => (
              <li key={section.sectionId} className="my-3">
                <Link
                  to={`#${section.sectionId}`} 
                  className={`flex items-center truncate`}
                >
                  {section.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
