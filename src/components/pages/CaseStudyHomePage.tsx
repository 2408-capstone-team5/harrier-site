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

  return (
    <>
      <div className="sticky top-[76px] z-50 mx-auto flex bg-tertiary">
        <nav
          id="case-study-page-nav"
          className={`sticky top-16 mx-auto flex w-fit justify-center py-8 ${viewportWideEnough ? "" : "hidden"}`}
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

      <div className="flex">
        <div
          className={`flex-1 ${viewportWideEnough ? "hidden lg:flex lg:flex-[2] xl:flex-[3]" : "hidden"}`}
        ></div>
        <main
          id="case-study-content"
          className="flex-[76] flex-row bg-quaternary p-10 pt-16"
        >
          <article>
            <CaseStudyPage
              markdown={
                chapters?.find(({ name }) => name === activePage)?.content ||
                "no content"
              }
            />
          </article>
        </main>
        <nav
          className={`flex-[15] ${viewportWideEnough ? "" : "hidden"} sticky top-[140px] pr-4 pt-16`}
          id="on-this-page"
        >
          <h3 className="mb-6 text-2xl font-normal text-tertiary">
            On this page
          </h3>
          <div className="flex">
            <div>
              {chapters
                ?.find(({ name }) => name === activePage)
                ?.subheaders.filter((item) => +item.level === 2)
                .map((item) => (
                  <Link
                    to={`#${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                    className="relative inline-block rounded-r-sm border-l-4 border-quinary py-2 pl-6 pr-4 text-gray-500 hover:border-primary hover:bg-primary/30 hover:font-semibold hover:text-tertiary"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
