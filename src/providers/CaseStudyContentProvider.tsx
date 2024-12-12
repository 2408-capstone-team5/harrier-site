import { useEffect, useState, createContext, ReactNode } from "react";
import MarkdownIt from "markdown-it";

// Define the structure of the Table of Contents (TOC)
export interface ContentHeading {
  id: string;
  name: string;
  subsections: ContentHeading[];
}

const parseTOCMarkdownToObject = (markdown: string): ContentHeading[] => {
  const md = new MarkdownIt();
  const tokens = md.parse(markdown, {});
  const toc: ContentHeading[] = [];
  const stack: ContentHeading[] = [];

  tokens.forEach((token) => {
    if (token.type === "heading_open") {
      const level = parseInt(token.tag.slice(1), 10);
      const headingContent = tokens[tokens.indexOf(token) + 1].content;
      const name = headingContent.replace(/\d+\.?/g, "").trim(); // currently this just removes all numbers and periods from the string
      const id = headingContent.toLowerCase().replace(/ /g, "-");

      const section: ContentHeading = { id, name, subsections: [] };

      if (level === 1) {
        toc.push(section);
        stack.length = 1;
        stack[0] = section;
      } else if (level === 2) {
        if (stack.length >= 1) {
          stack[0].subsections.push(section);
          stack.length = 2;
          stack[1] = section;
        }
      } else if (level === 3) {
        if (stack.length >= 2) {
          stack[1].subsections.push(section);
          stack.length = 3;
          stack[2] = section;
        }
      } else if (level === 4) {
        if (stack.length >= 3) {
          stack[2].subsections.push(section);
        }
      }
    }
  });

  return toc;
};

interface CaseStudyContentContextProps {
  ContentHeaders: ContentHeading[] | null;
}

const CaseStudyContentContext =
  createContext<CaseStudyContentContextProps | null>(null);

const CaseStudyContentProvider = ({ children }: { children: ReactNode }) => {
  const [contentHeaders, setContentHeaders] = useState<ContentHeading[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const response = await fetch("/content/toc.md");

        if (!response.ok) {
          throw new Error("Failed to fetch the markdown file");
        }

        const markdownContent = await response.text();
        const toc = parseTOCMarkdownToObject(markdownContent);
        setContentHeaders(toc);
      } catch (err) {
        setError("Failed to load the table of contents.");
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
    <CaseStudyContentContext.Provider value={{ ContentHeaders: contentHeaders }}>
      {children}
    </CaseStudyContentContext.Provider>
  );
};

export { CaseStudyContentProvider, CaseStudyContentContext };
