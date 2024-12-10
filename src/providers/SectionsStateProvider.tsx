import React, { createContext, useState, ReactNode, useEffect } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Section {
  name: string;
  sectionId?: string;
  subSections: Section[];
}

interface SectionsState {
  sections: Section[];
  setSections?: React.Dispatch<React.SetStateAction<Section[]>>;
}

const SectionsStateContext = createContext<SectionsState>({ sections: [] });

const parseMarkdownToSections = (markdown: string): Section[] => {
  const lines = markdown.split("\n");
  const sections: Section[] = [];
  const stack: Section[] = [];

  lines.forEach((line) => {
    const match = line.match(/^(#{1,3})\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const name = match[2];
      const sectionId = name.toLowerCase().replace(/\s+/g, "-");

      const newSection: Section = { name, sectionId, subSections: [] };

      if (level === 1) {
        sections.push(newSection);
        stack.length = 1;
        stack[0] = newSection;
      } else {
        const parent = stack[level - 2];
        parent.subSections.push(newSection);
        stack[level - 1] = newSection;
      }
    }
  });

  return sections;
};

const SectionsStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    const loadSections = async () => {
      const filePath = path.join(process.cwd(), "public", "content", "design.md");
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { content } = matter(fileContents);
      console.log(content);
      const parsedSections = parseMarkdownToSections(content);
      setSections(parsedSections);
    };

    loadSections();
  }, []);

  return (
    <SectionsStateContext.Provider value={{ sections }}>
      {children}
    </SectionsStateContext.Provider>
  );
};

export { SectionsStateProvider, SectionsStateContext };
