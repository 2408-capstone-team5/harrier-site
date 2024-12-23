import { useContext, useState } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { CaseStudyContentContext } from "@/providers/CaseStudyContentProvider";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import { Link } from "react-router-dom";

export default function CaseStudyHomePage() {
  const viewportWideEnough = useViewportWidth();
  const { chapters } = useContext(CaseStudyContentContext) ?? {};
  const [activePage, setActivePage] = useState<string>(
    chapters?.[0]?.name || "",
  );
  const [activeSection] = useState<string>("");

  return (
    <>
      <div className="sticky top-[76px] z-10 mx-auto flex bg-tertiary">
        <nav
          id="case-study-pages-nav"
          className={`mx-auto flex w-fit justify-center py-3 ${viewportWideEnough ? "" : "hidden"}`}
        >
          <div className="flex flex-row gap-4 rounded-full bg-quaternary/85 p-0.5">
            {chapters?.map((chapter, idx) => {
              return (
                <Link
                  to="#"
                  key={`${idx}.${chapter.name}`}
                  onClick={() => setActivePage(chapter.name)}
                  className="relative"
                >
                  <div
                    className={`overflow-hidden whitespace-nowrap rounded-full p-4 text-xl font-medium ${chapter.name === activePage ? "bg-tertiary text-quaternary/85" : "bg:quaternary/85 text-tertiary"}`}
                  >
                    {chapter.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      <div id="content-container" className="flex flex-wrap">
        <div
          className={`flex-[12] ${viewportWideEnough ? "" : "hidden"} sticky`}
          id="filler"
        ></div>
        <main
          id="case-study-content"
          className="flex-[60] flex-row bg-quaternary p-10 pt-12"
        >
          <article className="">
            <CaseStudyPage
              markdown={
                chapters?.find(({ name }) => name === activePage)?.content ||
                "no content"
              }
            />
          </article>
        </main>
        <div
          className={`flex-[14] ${viewportWideEnough ? "" : "hidden"} pr-4 pt-12`}
        >
          <nav className={`sticky top-[200px]`} id="on-this-page">
            <h3 className="mb-6 text-2xl font-normal text-tertiary">
              On this page
            </h3>
            <div className="flex">
              <ul>
                {chapters
                  ?.find(({ name }) => name === activePage)
                  ?.subheaders.filter((item) => +item.level === 2)
                  .map((item) => {
                    return (
                      <li
                        onClick={() => {
                          const el = document.getElementById(item.id);
                          console.log({ item });

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
                        className={`relative inline-block rounded-r-sm border-l-4 border-quinary py-2 pl-6 pr-4 text-gray-500 ${activeSection === "'" ? "border-primary bg-primary/40" : ""} hover:font-semibold hover:text-tertiary`}
                        key={item.id}
                      >
                        {item.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
