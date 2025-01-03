import { useContext, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { PageNavigationContext } from "@/providers/PageNavigation";

export default function CaseStudyHomePage() {
  const viewportWideEnough = useViewportWidth();
  const pageContext = useContext(PageNavigationContext);
  const location = useLocation();

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

  useEffect(() => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    const pageId = path.split("/").pop();
    const subheaderId = hash ? hash.substring(1) : null;
    const pageIndex = pages.findIndex((page) => page.id === pageId);
    console.log(location);

    if (pageIndex !== -1) {
      setActivePage(pageIndex);
      if (subheaderId) {
        const subheaderIndex = pages[pageIndex].subheaders?.findIndex(
          (subheader) => subheader.id === subheaderId,
        );
        if (subheaderIndex !== -1) {
          setActiveSubheader(subheaderIndex);
        }
      }
    }

    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 164
        console.log({offsetPosition})
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  }, [location, pages, setActivePage, setActiveSubheader]);

  return (
    <div className="w-full">
      <div
        id="case-study-nav-container"
        className="sticky top-[76px] z-10 mx-auto flex bg-harrierBLACK"
      >
        <nav
          id="case-study-nav"
          className={`mx-auto flex w-fit justify-center py-3 ${viewportWideEnough ? "" : "hidden"}`}
        >
          <div className="flex flex-row gap-4 rounded-full bg-harrierWHITE/85 p-0.5">
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
                    className={`overflow-hidden whitespace-nowrap rounded-full p-4 text-xl font-medium ${pageIdx === activePage ? "bg-harrierBLACK text-harrierWHITE/85" : "bg:quaternary/85 text-harrierBLACK"}`}
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
          className="prose max-w-none flex-[60] flex-row overflow-y-auto p-10 pt-12"
        >
          <Outlet />
        </main>
        <div
          id="on-this-page-container"
          className={`w-[210px] ${viewportWideEnough ? "" : "hidden"} pr-4 pt-12`}
        >
          <nav className={`sticky top-[170px]`} id="on-this-page">
            <h3 className="mb-6 text-2xl font-semibold text-harrierBLACK">
              On this page
            </h3>
            <div>
              <ul>
                {pages[activePage].subheaders?.map(
                  (subheader, subheaderIdx) => {
                    return (
                      <li
                        onClick={() => {
                          setActiveSubheader(subheaderIdx);

                          const el = document.getElementById(subheader.id);
                          if (el) {
                            const offsetPosition = el.getBoundingClientRect().top + window.scrollY - 164;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        }}
                        className={`relative inline-block rounded-r-sm border-l-4 py-2 pl-6 pr-4 ${activeSubheader === subheaderIdx ? "border-harrierBLUE bg-harrierBLUE/50 font-semibold" : "text-gray-400"}`}
                        key={subheader.id}
                      >
                        <NavLink
                          to={`#${subheader.id}`}
                          className="relative flex flex-row no-underline"
                        >
                          {subheader.name}
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
    </div>
  );
}
