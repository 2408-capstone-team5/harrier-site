import React, { createContext, useState, ReactNode } from "react";

export interface Section {
  name: string;
  sectionId: string;
}

interface SectionsState {
  sections: Section[];
  setSections?: React.Dispatch<React.SetStateAction<Section[]>>;
}

const SectionsStateContext = createContext<SectionsState>({ sections: [] });

const SectionsStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sections] = useState<Section[]>([
    { name: "Introduction", sectionId: "introduction" },
    { name: "Problem Domain", sectionId: "problem-domain" },
    { name: "Use Case", sectionId: "use-case" },
    { name: "Implementation", sectionId: "implementation" },
    { name: "Future Work", sectionId: "future-work" },
    { name: "References", sectionId: "references" },
  ]);

  return (
    <SectionsStateContext.Provider value={{ sections }}>
      {children}
    </SectionsStateContext.Provider>
  );
};

export { SectionsStateProvider, SectionsStateContext };