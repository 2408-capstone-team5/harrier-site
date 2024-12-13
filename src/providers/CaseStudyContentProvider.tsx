import { useEffect, useState, createContext, ReactNode } from "react";
import introduction from "../assets/content/introduction.md";
import problemDomain from "../assets/content/problem-domain.md";
import design from "../assets/content/design.md";
import implementation from "../assets/content/implementation.md";
import futureWork from "../assets/content/future-work.md";
import citations from "../assets/content/citations.md";

interface CaseStudyContentContextProps {
  CaseStudy: string[];
}

const CaseStudyContentContext =
  createContext<CaseStudyContentContextProps | null>(null);

const CaseStudyContentProvider = ({ children }: { children: ReactNode }) => {
  const [caseStudy, setCaseStudy] = useState<string[]>();
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
        if (Array.isArray(content) && content.length) {
          setCaseStudy(content);
        }
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
    <CaseStudyContentContext.Provider
      value={{
        CaseStudy: caseStudy,
      }}
    >
      {children}
    </CaseStudyContentContext.Provider>
  );
};

export { CaseStudyContentProvider, CaseStudyContentContext };
