import { useEffect, useState } from "react";
// import { Eye } from "lucide-react";
export type Section = { name: string; id: number; urlFormatted: string };

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
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = document.querySelectorAll("article");
      let currentSection = "introduction";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
      window.history.replaceState(null, "", `#${currentSection}`);
    };

    const handleResize = () => {
      setIsNavVisible(window.innerWidth >= 800);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isScrolling]);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
  ) => {
    event.preventDefault();
    setIsScrolling(true);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
      setTimeout(() => {
        setIsScrolling(false);
        window.history.replaceState(null, "", `#${sectionId}`);
      }, 500); // Adjust timeout duration as needed
    }
  };

  return (
    <div>
      <main id="case-study-container" className="flex flex-row mx-4">
        <div id="article-content" className="flex-[85] m-4">
          {sections.map((title, idx) => (
            <>
              <Section key={title.id} section={title} />
              <br />
              {idx === sections.length - 1 ? null : (
                <div className="h-0.5 bg-sky-400 rounded-full mx-auto w-1/6 nice-line"></div>
              )}
            </>
          ))}
        </div>
        {isNavVisible && (
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
                      onClick={(event) =>
                        handleClick(event, `${section.urlFormatted}`)
                      }
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

const Section = ({ section }: { section: Section }) => {
  return (
    <article id={`${section.urlFormatted}`} className="">
      <h2 className="font-bold text-xl">{section.name}</h2>
      <h3 className="font-bold text-l">Subheading {section.name}.1</h3>
      <p className="">
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
      <h3 className="font-bold text-l">Subheading {section.name}.2</h3>
      <p className="">
        enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua.
      </p>
      <h3 className="font-bold text-l">Subheading {section.name}.3</h3>
      <p className="">
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </article>
  );
};
