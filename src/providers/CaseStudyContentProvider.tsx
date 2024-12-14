import { useEffect, useState, createContext, ReactNode } from "react";
import introduction from "../assets/content/introduction.md";
import problemDomain from "../assets/content/problem-domain.md";
import design from "../assets/content/design.md";
import implementation from "../assets/content/implementation.md";
import futureWork from "../assets/content/future-work.md";
import citations from "../assets/content/citations.md";

interface Header {
  level: string;
  name: string;
}

interface CaseStudyContentContextProps {
  caseStudy: string[] | null;
  headers: Header[] | null;
}

const CaseStudyContentContext =
  createContext<CaseStudyContentContextProps | null>(null);

const CaseStudyContentProvider = ({ children }: { children: ReactNode }) => {
  const [caseStudy, setCaseStudy] = useState<string[] | null>(null);
  const [headers, setHeaders] = useState<Header[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const content = await Promise.all([
          (await fetch(introduction)).text(),
          (await fetch(problemDomain)).text(),
          (await fetch(design)).text(),
          (await fetch(implementation)).text(),
          (await fetch(futureWork)).text(),
          (await fetch(citations)).text(),
        ]);

        const headers: Header[] = content.flatMap((md) => {
          const headerRegex = /^(#{1,6})\s+(.*)$/gm;
          const matches = [...md.matchAll(headerRegex)];
          return matches.map((match) => ({
            level: match[1].length.toString(),
            name: match[2].trim().replace(/\*\*/g, ""),
          }));
        });

        const groupedHeaders: Header[] = headers.reduce((acc, header) => {
          if (header.level === "1") {
            acc.push(header);
          } else {
            const lastHeader = acc[acc.length - 1];
            if (!lastHeader.subheaders) {
              lastHeader.subheaders = [];
            }
            lastHeader.subheaders.push(header);
          }
          return acc;
        }, []);

        setCaseStudy(content);
        setHeaders(headers);
      } catch (err) {
        setError("Failed to load the case study markdown.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarkdown();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <CaseStudyContentContext.Provider value={{ caseStudy, headers }}>
      {children}
    </CaseStudyContentContext.Provider>
  );
};

export { CaseStudyContentProvider, CaseStudyContentContext };
