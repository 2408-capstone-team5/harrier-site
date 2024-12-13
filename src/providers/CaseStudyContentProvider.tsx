import { useEffect, useState, createContext, ReactNode } from "react";
import MarkdownIt from "markdown-it";

// Interface for a Page
interface Page {
  id: string;
  content: string;
}

// Interface for a Header
interface Header {
  id: string;
  name: string;
  subsections: Header[];
  urlEncoded: string;
}

// CaseStudy interface combining both pages and headers
export interface CaseStudy {
  pages: Page[];
  headers: Header[];
}

// Context interface for the CaseStudy content
interface CaseStudyContentContextProps {
  CaseStudy: CaseStudy | null;
}

const CaseStudyContentContext =
  createContext<CaseStudyContentContextProps | null>(null);

// Function to generate the Table of Contents (TOC) and Pages
const generateTOC = (markdown: string): Header => {
  const md = new MarkdownIt();
  const tokens = md.parse(markdown, {});
  const headers: Header[] = [];
  const stack: Header[] = [];

  tokens.forEach((token, index) => {
    if (token.type === "heading_open") {
      const level = parseInt(token.tag.slice(1), 10);
      const headingContent = tokens[index + 1]?.content || "";
      const name = headingContent.trim();
      const id = name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]/g, "");
      const urlEncoded = encodeURIComponent(id);

      const section: Header = { id, name, subsections: [], urlEncoded };

      if (level === 1) {
        headers.push(section);
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
          stack.length = 4;
          stack[3] = section;
        }
      }
    }
  });
  return headers[0];
};

const CaseStudyContentProvider = ({ children }: { children: ReactNode }) => {
  const [contentHeaders, setContentHeaders] = useState<Header[] | null>(null);
  const [contentSections, setContentSections] = useState<Page[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const res = await Promise.all([
          fetch("/content/introduction.md"),
          fetch("/content/problem-domain.md"),
          fetch("/content/design.md"),
          fetch("/content/implementation.md"),
          fetch("/content/future-work.md"),
          fetch("/content/citations.md"),
        ]);

        if (!res.every((r) => r.ok)) {
          throw new Error("Failed to fetch the markdown files");
        }

        const markdown = await Promise.all(res.map((r) => r.text()));

        const headers = markdown.map((md) => generateTOC(md));
        const pages = markdown.map((md, idx) => ({
          id: `${headers[idx].id}`,
          content: md,
        }));

        setContentHeaders(headers.flat());
        setContentSections(pages);
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
        CaseStudy: {
          pages: contentSections || [],
          headers: contentHeaders || [],
        },
      }}
    >
      {children}
    </CaseStudyContentContext.Provider>
  );
};

export { CaseStudyContentProvider, CaseStudyContentContext };
