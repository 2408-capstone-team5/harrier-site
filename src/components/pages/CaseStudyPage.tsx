import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function CaseStudyPage({ markdown }: { markdown: string }) {
  return <MarkdownRenderer markdown={markdown} />;
}
