import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  //   BreadcrumbLink,
  //   BreadcrumbList,
  //   BreadcrumbPage,
  //   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// const CaseStudySectionsMenu = () => {
//   const [activeSectionIndex, setActiveSectionIndex] = useState(0);

//   const sections = [
//     { title: "these", slug: "these" },
//     { title: "are", slug: "are" },
//     { title: "the", slug: "the" },
//     { title: "different", slug: "different" },
//     { title: "case", slug: "case" },
//     { title: "study", slug: "study" },
//     { title: "sections", slug: "sections" },
//     { title: "we", slug: "we" },
//     { title: "are", slug: "are" },
//     { title: "writing", slug: "writing" },
//   ];

//   return (
//     <div className="w-64 border-r p-4 bg-white">
//       <ScrollArea className="h-[calc(100vh-100px)]">
//         <div className="space-y-2">
//           {sections.map((section, index) => (
//             <Button
//               key={section.slug}
//               variant={activeSectionIndex === index ? "outline" : "default"}
//               className="w-full justify-start"
//               onClick={() => setActiveSectionIndex(index)}
//             >
//               {section.title}
//             </Button>
//           ))}
//         </div>
//       </ScrollArea>
//     </div>
//   );
// };

const OnThisPageNavigation = ({
  headings,
}: {
  headings: { id: string; title: string }[];
}) => {
  const [activeHeading, setActiveHeading] = useState(headings[0]?.id || "");

  return (
    <div className="w-1/6 p-4 border-l bg-white sticky top-12 h-screen overflow-y-auto">
      <h3 className="text-lg font-semibold mb-4">On This Page</h3>
      <ScrollArea className="h-[calc(100vh-100px)]">
        <nav>
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block py-2 px-3 rounded ${
                activeHeading === heading.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              }`}
              onClick={() => setActiveHeading(heading.id)}
            >
              {heading.title}
            </a>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export const CaseStudyPage = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  const pageHeadings = [
    { id: "overview-summary", title: "Summary" },
    { id: "overview-context", title: "Context" },
    { id: "challenge-details", title: "Challenge Details" },
  ];

  // Function to update breadcrumbs based on the current section
  const updateBreadcrumbs = (section: string) => {
    setBreadcrumbs((prevBreadcrumbs) => {
      const newBreadcrumbs = [...prevBreadcrumbs];
      const lastBreadcrumb = newBreadcrumbs[newBreadcrumbs.length - 1];
      if (lastBreadcrumb !== section) {
        newBreadcrumbs.push(section);
      }
      return newBreadcrumbs;
    });
  };

  // Intersection Observer callback
  const handleIntersect = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute("id");
        if (sectionId) {
          updateBreadcrumbs(sectionId);
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <>
      <Breadcrumb>
        {breadcrumbs.map((breadcrumb, index) => (
          <BreadcrumbItem key={index}>{breadcrumb}</BreadcrumbItem>
        ))}
      </Breadcrumb>
      <h1 className="text-3xl text-center font-bold mb-8">Case Study</h1>
      <div className="flex h-100">
        {/* <CaseStudySectionsMenu /> */}

        <div className="flex-grow overflow-auto p-8">
          <section
            id="overview-summary"
            className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Overview Summary</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nunc
              nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit.
            </p>
          </section>
          <section
            id="overview-context"
            className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Overview Context</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nunc
              nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit.
            </p>
          </section>
          <section
            id="challenge-details"
            className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Challenge Details</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed tincidunt, nunc
              nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit. Sed tincidunt, nunc nec
              ultricies bibendum, nunc velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed tincidunt, nunc nec ultricies
              bibendum, nunc velit. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed tincidunt, nunc nec ultricies bibendum, nunc
              velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed tincidunt, nunc nec ultricies bibendum, nunc velit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt,
              nunc nec ultricies bibendum, nunc velit.
            </p>
          </section>
        </div>

        {/* Right Side "On This Page" Navigation */}
        <OnThisPageNavigation headings={pageHeadings} />
      </div>
    </>
  );
};

export default CaseStudyPage;
