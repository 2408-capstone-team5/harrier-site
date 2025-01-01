import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { PageNavigationContext } from "@/providers/PageNavigation";

import ActiveCaseStudyPage from "./ActiveCaseStudyPage";

export default function CaseStudyHomePage() {
  const viewportWideEnough = useViewportWidth();
  const pageContext = useContext(PageNavigationContext);

  if (!pageContext) {
    throw new Error(
      "Make sure the component you want to use the context in is wrapped within the provider component",
    );
  }

  const {
    pages,
    activePage,
    setActivePage,
    activeSubheader,
    setActiveSubheader,
  } = pageContext;

  return (
    <>
      <div
        id="nav-case-study-pages-container"
        className="sticky top-[76px] z-10 mx-auto flex bg-tertiary"
      >
        <nav
          id="nav-case-study-pages"
          className={`mx-auto flex w-fit justify-center py-3 ${viewportWideEnough ? "" : "hidden"}`}
        >
          <div className="flex flex-row gap-4 rounded-full bg-quaternary/85 p-0.5">
            {pages?.map((page, pageIdx) => {
              return (
                <NavLink
                  to={`${page.id}`}
                  key={`${page.id}`}
                  onClick={() => {
                    setActivePage(pageIdx);
                    setActiveSubheader(null);
                    window.scrollTo(0, 0);
                  }}
                  className="relative"
                >
                  <div
                    className={`overflow-hidden whitespace-nowrap rounded-full p-4 text-xl font-medium ${pageIdx === activePage ? "bg-tertiary text-quaternary/85" : "bg:quaternary/85 text-tertiary"}`}
                  >
                    {page.name}
                  </div>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>

      <div id="page-content-container" className="flex flex-wrap">
        <div
          aria-hidden="true"
          className={`flex-[12] ${viewportWideEnough ? "" : "hidden"} sticky`}
          id="filler"
        ></div>
        <main
          id="case-study-content"
          className="prose max-w-none flex-[60] flex-row p-10 pt-12"
        >
          <ActiveCaseStudyPage activePage={activePage} />
        </main>
        <div
          className={`flex-[12] ${viewportWideEnough ? "" : "hidden"} pr-4 pt-12`}
        >
          <nav className={`sticky top-[170px]`} id="on-this-page">
            <h3 className="mb-6 text-2xl font-semibold text-tertiary">
              On this page
            </h3>
            <div className="text-gray-30">
              <ul>
                {pages[activePage].subheaders?.map(
                  (subheader, subheaderIdx) => {
                    return (
                      <li
                        onClick={() => {
                          setActiveSubheader(subheaderIdx);

                          const el = document.getElementById(subheader.id);
                          if (el) {
                            const offset = 164;
                            const bodyRect =
                              document.body.getBoundingClientRect().top;
                            const elementRect = el.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                        className={`relative inline-block rounded-r-sm border-l-4 py-2 pl-6 pr-4 ${activeSubheader === subheaderIdx ? "border-primary bg-primary/45 font-semibold" : "text-gray-400"}`}
                        key={subheader.id}
                      >
                        <NavLink
                          to={`#${subheader.id}`}
                          className="relative flex flex-row no-underline"
                        >
                          {subheader.name}
                          {/* <span className="absolute bottom-0 left-0 h-[2px] w-full scale-x-0 transform rounded-full bg-current transition-transform duration-500 ease-in-out group-hover:scale-x-100"></span> */}
                        </NavLink>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
