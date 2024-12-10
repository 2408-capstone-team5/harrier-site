import { Section } from "@/providers/SectionsStateProvider";

export default function CaseStudySection({ section }: { section: Section }) { 
  return (
    <article className="flex items-center justify-center h-full"> 
      <h2 className="text-xl font-bold mb-4">{section.name}</h2>
      {section.subSections.map(subSection => <div>{subSection.name}</div>)}
    </article>
  )
}