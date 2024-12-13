import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function CaseStudySection({ markdown }: { markdown: string }) {
  return (
    <div id="case-study-content " className="mx-9">
      <MarkdownRenderer markdown={markdown || "no content"} />
    </div>
  );
}
