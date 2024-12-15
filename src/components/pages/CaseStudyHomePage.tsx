import { useContext, useState } from "react";
import { useViewportWidth } from "@/hooks/useViewportWidth";
import { CaseStudyContentContext } from "@/providers/CaseStudyContentProvider";
import CaseStudyPage from "@/components/pages/CaseStudyPage";
import { Link } from "react-router-dom";
import { Separator } from "@radix-ui/react-separator";

export default function CaseStudyHomePage() {
  const viewportWideEnough = useViewportWidth();
  const { chapters } = useContext(CaseStudyContentContext) ?? {};
  const [activePage, setActivePage] = useState<string>(
    chapters?.[0]?.name || "",
  );

  return (
    <>
      <div>
        <nav
          id="case-study-page-nav"
          className={`mx-auto flex w-fit justify-center py-8 ${viewportWideEnough ? "" : "hidden"}`}
        >
          <div className="flex flex-row gap-4 rounded-full bg-quaternary/85 p-0.5">
            {chapters?.map((chapter, idx) => {
              return (
                <Link
                  to="#"
                  key={`${idx}.${chapter.name}`}
                  onClick={() => setActivePage(chapter.name)}
                >
                  <div
                    className={`underline-offset-6 overflow-hidden whitespace-nowrap rounded-full p-4 text-xl font-medium hover:underline ${chapter.name === activePage ? "bg-tertiary text-quaternary/85" : "bg:quaternary/85 text-tertiary"}`}
                  >
                    {chapter.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>
        <main
          id="case-study-content"
          className="flex flex-row gap-2 bg-quaternary py-16 pl-10 pr-6"
        >
          <article className="flex-[80]">
            <CaseStudyPage
              markdown={
                chapters?.find(({ name }) => name === activePage)?.content ||
                "no content"
              }
            />
          </article>
          <Separator
            orientation="vertical"
            className={`mx-2 h-56 border-l border-quinary ${viewportWideEnough ? "" : "hidden"}`}
          />
          <nav
            className={`flex-[20] ${viewportWideEnough ? "" : "hidden"} sticky top-16 mt-4`}
          >
            <h3 className="mb-2 text-lg font-bold">On This Page</h3>
            {chapters
              ?.find(({ name }) => name === activePage)
              ?.subheaders.filter((item) => +item.level === 2)
              .map((item, index) => (
                <div key={index} className={`pl-${item.level * 2} py-1`}>
                  <Link
                    to={`#${item.name.replace(/\s+/g, "-").toLowerCase()}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
          </nav>
        </main>
      </div>
    </>
  );
}
