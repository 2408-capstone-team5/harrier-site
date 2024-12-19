import { useContext, useState } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { CaseStudyContentContext } from "@/providers/CaseStudyContentProvider";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import { Link } from "react-router-dom";

const StickySidebar = () => {
  return (
    <div className="flex">
      <div className="w-1/4">
        {/* Sticky Sidebar */}
        <div className="sticky top-10 bg-gray-200 p-4">
          <h2>Sticky Sidebar</h2>
          <p>
            This sidebar will stick to the top of the viewport when scrolling
            down.
          </p>
        </div>
      </div>

      <div className="w-3/4 p-4">
        {/* Content */}
        <p>
          Scroll down to see the sticky sidebar in action. It will stay fixed
          within the viewport while you scroll.
        </p>
        <div style={{ height: "200vh" }}></div>{" "}
        {/* Add extra height to enable scrolling */}
      </div>
    </div>
  );
};

export default function CaseStudyHomePage() {
  const viewportWideEnough = useViewportWidth();
  const { chapters } = useContext(CaseStudyContentContext) ?? {};
  const [activePage, setActivePage] = useState<string>(
    chapters?.[0]?.name || "",
  );

  return (
    <>
      {/* <StickySidebar /> */}
      <div className="sticky top-[76px] z-10 mx-auto flex bg-tertiary">
        <nav
          id="case-study-page-nav"
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

      <div className="top-[152px] flex">
        <div
          className={`flex-[12] ${viewportWideEnough ? "" : "hidden"} sticky`}
        >
          hi
        </div>
        <main
          id="case-study-content"
          className="flex-[60] flex-row bg-quaternary p-10 pt-12"
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
          className={`flex-[14] ${viewportWideEnough ? "" : "hidden"} sticky top-4 pr-4 pt-12`}
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
